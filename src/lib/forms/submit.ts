import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { formRegistry, type FormType } from "./schemas";
import { verifyTurnstileToken } from "./turnstile";
import { checkFormRateLimit } from "@/lib/rate-limit";
import { getSupabaseAnonClient } from "@/lib/supabase/server";

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

  return NextResponse.json({ ok: true });
}
