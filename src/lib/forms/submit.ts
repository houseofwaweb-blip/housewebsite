import "server-only";
import { NextRequest, NextResponse, after } from "next/server";
import { ZodError } from "zod";
import { formRegistry, type FormType } from "./schemas";
import { verifyTurnstileToken } from "./turnstile";
import { checkFormRateLimit } from "@/lib/rate-limit";
import { getSupabaseAnonClient } from "@/lib/supabase/server";
import { notifyFormSubmission } from "./notify";
import { subscribeToNewsletter, subscribeToWaitlist, trackEvent, type InterestSurface, SURFACE_TO_INTEREST } from "@/lib/klaviyo";
import { sendMetaCapiEvent, extractMetaIdentifiers, type MetaEventName } from "@/lib/meta/capi";
import { readConsentFromCookieHeader } from "@/lib/consent";
import { randomUUID } from "node:crypto";

// Form-type → Meta standard event mapping. Lead is the catch-all for
// commercial intent; newsletter uses CompleteRegistration; the booking
// form uses Schedule (Meta's specific intent for booking forms).
const FORM_TYPE_TO_META_EVENT: Record<FormType, MetaEventName> = {
  contact: "Lead",
  consultation: "Schedule",
  waitlist: "Lead",
  newsletter: "CompleteRegistration",
};

/**
 * Shared form submission handler.
 * Called by /api/forms/[type]/route.ts for each form type.
 *
 * Pipeline: validate → rate-limit → turnstile → insert → respond.
 */
export async function handleFormSubmission(
  req: NextRequest,
  type: FormType,
): Promise<NextResponse> {
  try {
  const entry = formRegistry[type];
  if (!entry) {
    return NextResponse.json({ ok: false, error: "unknown-form" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  let parsed;
  try {
    parsed = entry.schema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: "validation", issues: err.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  // Honeypot — if present, silently 200 so bots don't learn.
  if ("honey" in parsed && parsed.honey) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = await checkFormRateLimit(`${type}:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "rate-limited" },
      { status: 429, headers: { "retry-after": String(Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000))) } },
    );
  }

  const turnstile = await verifyTurnstileToken(parsed.turnstileToken, ip);
  if (!turnstile.ok) {
    return NextResponse.json(
      { ok: false, error: "verification-failed", reason: turnstile.reason },
      { status: 403 },
    );
  }

  // Strip client-only fields before insert.
  const { turnstileToken: _t, honey: _h, tracking: _tr, sourcePage, ...rest } = parsed as Record<
    string,
    unknown
  > & { turnstileToken: string; honey?: string; tracking?: unknown; sourcePage?: string };

  const row: Record<string, unknown> = { ...rest, source_page: sourcePage ?? null };

  // snake_case mapping for columns that differ from camelCase inputs.
  if ("serviceType" in row) {
    row.service_type = row.serviceType;
    delete row.serviceType;
  }
  if ("preferredDates" in row) {
    row.preferred_dates = row.preferredDates;
    delete row.preferredDates;
  }
  // `interests` is form-only — used downstream by Klaviyo, not a Supabase
  // column on `newsletter_subscribers`. Strip before insert.
  if ("interests" in row) delete row.interests;

  // HoWA waitlist extras aren't top-level columns on `waitlist_interests` —
  // fold them into the existing `context` jsonb and strip the top-level keys.
  // They're still read from `parsed` for the Klaviyo subscribe below.
  if (entry.table === "waitlist_interests") {
    const extras: Record<string, unknown> = {};
    for (const k of ["firstName", "lastName", "postcode", "tier", "propertyType", "note"]) {
      if (k in row) {
        extras[k] = row[k];
        delete row[k];
      }
    }
    if (Object.keys(extras).length) {
      row.context = { ...((row.context as Record<string, unknown>) ?? {}), ...extras };
    }
  }

  const supabase = getSupabaseAnonClient();
  let { error } = await supabase.from(entry.table).insert(row);

  // If name column doesn't exist yet, retry without it
  if (error && entry.table === "newsletter_subscribers" && error.code === "PGRST204") {
    delete row.name;
    const retry = await supabase.from(entry.table).insert(row);
    error = retry.error;
  }

  if (error) {
    // Unique violation on newsletter is fine (already subscribed).
    if (entry.table === "newsletter_subscribers" && error.code === "23505") {
      return NextResponse.json({ ok: true, already: true });
    }
    return NextResponse.json(
      { ok: false, error: "insert-failed" },
      { status: 500 },
    );
  }

  // Meta event id up front so the client can dedupe against the CAPI event.
  const metaEventName = FORM_TYPE_TO_META_EVENT[type];
  const metaEventId = randomUUID();
  const submission = parsed as Record<string, unknown>;
  const metaIdentifiers = extractMetaIdentifiers(req);
  const eventSourceUrl = req.headers.get("referer") ?? undefined;
  // The Meta CAPI leg ships hashed PII + IP + user-agent to Meta. Only fire it
  // when the visitor granted MARKETING consent (the browser pixel is already
  // gated by the MetaPixel loader). Without this a user who rejected marketing
  // still has their identifiers sent server-side — a GDPR/PECR exposure.
  const marketingConsent =
    readConsentFromCookieHeader(req.headers.get("cookie"))?.marketing === true;

  // Post-response side effects: inbox email, Klaviyo, Meta CAPI. These MUST run
  // inside after() — a plain fire-and-forget promise is killed when the response
  // returns on Vercel's serverless runtime. The submission is already persisted
  // to Supabase, so none of these can fail the user's form.
  after(async () => {
    await notifyFormSubmission(type, submission).catch(() => {});

    if (type === "newsletter") {
      const p = submission as {
        email: string;
        name?: string;
        interests?: string[];
        sourcePage?: string;
      };
      const surfaces = (p.interests ?? []) as InterestSurface[];
      await subscribeToNewsletter({
        email: p.email,
        firstName: p.name,
        surfaces,
        sourcePage: p.sourcePage,
      }).catch(() => {});
      const interestTags = Array.from(
        new Set(surfaces.flatMap((s) => SURFACE_TO_INTEREST[s] ?? [])),
      );
      await trackEvent({
        email: p.email,
        metric: "Marketing Site Newsletter Signup",
        properties: { surfaces, interest_tags: interestTags, signup_page: p.sourcePage },
      }).catch(() => {});
    }

    if (type === "waitlist") {
      const w = submission as {
        email: string;
        product: string;
        firstName?: string;
        lastName?: string;
        postcode?: string;
        tier?: string;
        propertyType?: string;
        note?: string;
        sourcePage?: string;
      };
      // Every register-interest (insurance, protect, HoWA app, service, etc.)
      // lands in Klaviyo. One list keeps it simple; the `product` property on
      // the event lets Alex build a segment/flow per interest type in Klaviyo.
      await subscribeToWaitlist({
        email: w.email,
        product: w.product,
        firstName: w.firstName,
        lastName: w.lastName,
        postcode: w.postcode,
        tier: w.tier,
        propertyType: w.propertyType,
        note: w.note,
        sourcePage: w.sourcePage,
      }).catch(() => {});
      await trackEvent({
        email: w.email,
        metric: "Register Interest",
        properties: {
          product: w.product,
          tier_interest: w.tier ?? undefined,
          signup_page: w.sourcePage,
        },
      }).catch(() => {});
    }

    if (marketingConsent) {
      await sendMetaCapiEvent({
        eventName: metaEventName,
        eventSourceUrl: eventSourceUrl ?? "",
        eventId: metaEventId,
        userData: {
          email: typeof submission.email === "string" ? submission.email : undefined,
          phone: typeof submission.phone === "string" ? submission.phone : undefined,
          firstName: typeof submission.name === "string"
            ? String(submission.name).split(" ")[0]
            : undefined,
          lastName: typeof submission.name === "string" && String(submission.name).includes(" ")
            ? String(submission.name).split(" ").slice(1).join(" ")
            : undefined,
          postcode: typeof submission.postcode === "string" ? submission.postcode : undefined,
          ...metaIdentifiers,
        },
      }).catch(() => {});
    }
  });

  return NextResponse.json({ ok: true, metaEventId });
  } catch (err) {
    // Defense-in-depth: any unhandled throw returns clean JSON (never a bare
    // 500, which the client shows as "Network trouble"). The submission may
    // not have persisted, so surface a retryable error.
    console.error("[forms:submit] unhandled error", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
