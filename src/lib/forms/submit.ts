import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { formRegistry, type FormType } from "./schemas";
import { verifyTurnstileToken } from "./turnstile";
import { checkFormRateLimit } from "@/lib/rate-limit";
import { getSupabaseAnonClient } from "@/lib/supabase/server";
import { notifyFormSubmission } from "./notify";
import { subscribeToNewsletter, trackEvent, type InterestSurface, SURFACE_TO_INTEREST } from "@/lib/klaviyo";

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

  return NextResponse.json({ ok: true });
}
