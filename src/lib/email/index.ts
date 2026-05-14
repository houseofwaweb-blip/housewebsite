import "server-only";
import { env } from "@/lib/env";

/**
 * Email send wrapper. Resend via raw fetch (no SDK — keeps the bundle lean
 * and avoids a runtime dependency that breaks every time Resend ships a
 * major version).
 *
 * Behaviour:
 *   - RESEND_API_KEY unset → no-op, logs that it would have sent. Lets dev
 *     work without an account and lets the form pipeline keep flowing even
 *     when ops haven't wired email yet.
 *   - RESEND_API_KEY set → real send. Failure logs but does not throw —
 *     the form submission has already been persisted to Supabase, so we
 *     never want a notification failure to surface a 500 to the user.
 */

export interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
  /** Optional HTML body. If omitted, Resend sends text-only. */
  html?: string;
  /** Override the from address. Defaults to EMAIL_FROM. */
  from?: string;
  /** Override the Reply-To. Useful for contact forms (reply goes to user). */
  replyTo?: string;
}

export interface SendEmailResult {
  ok: boolean;
  /** Resend's message id when ok. */
  id?: string;
  /** Failure detail when !ok. Never thrown — caller decides what to do. */
  error?: string;
  /** True when we skipped because no API key is configured. */
  skipped?: boolean;
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (!env.RESEND_API_KEY) {
    console.log(
      `[email:skipped] to=${input.to} subject=${JSON.stringify(input.subject)} — RESEND_API_KEY not set`,
    );
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: input.from ?? env.EMAIL_FROM,
        to: input.to,
        subject: input.subject,
        text: input.text,
        ...(input.html ? { html: input.html } : {}),
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "<no body>");
      console.error(`[email:failed] ${res.status} — ${detail.slice(0, 240)}`);
      return { ok: false, error: `resend-${res.status}` };
    }

    const json = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: json.id };
  } catch (e) {
    console.error("[email:exception]", e);
    return { ok: false, error: "network" };
  }
}
