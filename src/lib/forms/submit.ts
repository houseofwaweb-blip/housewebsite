import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { formRegistry, type FormType } from "./schemas";
import { verifyTurnstileToken } from "./turnstile";
import { checkFormRateLimit } from "@/lib/rate-limit";
import { getSupabaseAnonClient } from "@/lib/supabase/server";
import { notifyFormSubmission } from "./notify";
import { subscribeToNewsletter, subscribeToWaitlist, trackEvent, type InterestSurface, SURFACE_TO_INTEREST } from "@/lib/klaviyo";
import { sendMetaCapiEvent, extractMetaIdentifiers, type MetaEventName } from "@/lib/meta/capi";
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
  const { turnstileToken: _t, honey: _h, sourcePage, ...rest } = parsed as Record<
    string,
    unknown
  > & { turnstileToken: string; honey?: string; sourcePage?: string };

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

  // Fire-and-forget notification. The submission is already persisted, so
  // a failed email never surfaces as a 500 — we'd rather lose the alert
  // than fail the user's form. Caller doesn't await.
  void notifyFormSubmission(type, parsed as Record<string, unknown>).catch(() => {
    // notify already logs internally
  });

  // Newsletter signups also push to Klaviyo for interest-based segmentation.
  // Same fire-and-forget pattern — Supabase row is the source of truth.
  if (type === "newsletter") {
    const p = parsed as {
      email: string;
      name?: string;
      interests?: string[];
      sourcePage?: string;
    };
    const surfaces = (p.interests ?? []) as InterestSurface[];

    void subscribeToNewsletter({
      email: p.email,
      firstName: p.name,
      surfaces,
      sourcePage: p.sourcePage,
    }).catch(() => {
      // klaviyo client already logs internally
    });

    // Post a custom event so Alex can build interest-aware welcome flows in
    // the Klaviyo dashboard ("if event.interest_tags contains 'design',
    // send Garden Design welcome series"). Without this they'd only have
    // the list-add trigger, which can't see the interest tags.
    const interestTags = Array.from(
      new Set(surfaces.flatMap((s) => SURFACE_TO_INTEREST[s] ?? [])),
    );
    void trackEvent({
      email: p.email,
      metric: "Marketing Site Newsletter Signup",
      properties: {
        surfaces,
        interest_tags: interestTags,
        signup_page: p.sourcePage,
      },
    }).catch(() => {});
  }

  // HoWA app waitlist also subscribes to the shared Klaviyo list with a
  // `tier_interest` profile property (matches askhowa.co.uk), so launch
  // segments/flows work across both sites. Supabase row is the source of truth.
  if (type === "waitlist") {
    const w = parsed as {
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
    if (w.product === "howa_app") {
      void subscribeToWaitlist({
        email: w.email,
        firstName: w.firstName,
        lastName: w.lastName,
        postcode: w.postcode,
        tier: w.tier,
        propertyType: w.propertyType,
        note: w.note,
        sourcePage: w.sourcePage,
      }).catch(() => {
        // klaviyo client logs internally
      });
      void trackEvent({
        email: w.email,
        metric: "HoWA Waitlist Signup",
        properties: { tier_interest: w.tier ?? "Undecided", signup_page: w.sourcePage },
      }).catch(() => {});
    }
  }

  // Meta Conversions API fire — server-side complement to the browser
  // pixel. Returns an event_id so the client can fire fbq() with the
  // matching eventID and Meta dedupes the two signals.
  const metaEventName = FORM_TYPE_TO_META_EVENT[type];
  const metaEventId = randomUUID();
  const submission = parsed as Record<string, unknown>;
  const metaIdentifiers = extractMetaIdentifiers(req);
  const eventSourceUrl = req.headers.get("referer") ?? undefined;
  // Fire-and-forget — never block the form response on Meta's API.
  void sendMetaCapiEvent({
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

  return NextResponse.json({ ok: true, metaEventId });
}
