import "server-only";
import { env } from "@/lib/env";

/**
 * Email send wrapper. Brevo Transactional API via raw fetch (no SDK —
 * keeps the bundle lean and avoids a runtime dependency that breaks every
 * time the SDK ships a major version).
 *
 * Chose Brevo over Resend because the rest of the WA stack (Call Handler,
 * ServiceOS Agent) already uses it — one provider, one sender domain to
 * verify, one usage dashboard.
 *
 * Behaviour:
 *   - BREVO_API_KEY unset → no-op, logs that it would have sent. Lets dev
 *     work without an account and lets the form pipeline keep flowing even
 *     when ops haven't wired email yet.
 *   - BREVO_API_KEY set → real send. Failure logs but does not throw —
 *     the form submission has already been persisted to Supabase, so we
 *     never want a notification failure to surface a 500 to the user.
 */

export interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
  /** Optional HTML body. If omitted, sends text-only. */
  html?: string;
  /** Override the from address. Defaults to env.BREVO_FROM_EMAIL. */
  from?: string;
  /** Override the from display name. Defaults to env.BREVO_FROM_NAME. */
  fromName?: string;
  /** Override the Reply-To. Useful for contact forms (reply goes to user). */
  replyTo?: string;
}

export interface SendEmailResult {
  ok: boolean;
  /** Brevo's messageId when ok. */
  id?: string;
  /** Failure detail when !ok. Never thrown — caller decides what to do. */
  error?: string;
  /** True when we skipped because no API key is configured. */
  skipped?: boolean;
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (!env.BREVO_API_KEY) {
    console.log(
      `[email:skipped] to=${input.to} subject=${JSON.stringify(input.subject)} — BREVO_API_KEY not set`,
    );
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        // Brevo uses `api-key` header, not `Authorization: Bearer`. Easy to
        // get wrong — both Call Handler and ServiceOS Agent burned a few
        // minutes on this when they wired it up.
        "api-key": env.BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: input.from ?? env.BREVO_FROM_EMAIL,
          name: input.fromName ?? env.BREVO_FROM_NAME,
        },
        to: [{ email: input.to }],
        subject: input.subject,
        textContent: input.text,
        ...(input.html ? { htmlContent: input.html } : {}),
        ...(input.replyTo ? { replyTo: { email: input.replyTo } } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "<no body>");
      console.error(`[email:failed] ${res.status} — ${detail.slice(0, 240)}`);
      return { ok: false, error: `brevo-${res.status}` };
    }

    const json = (await res.json().catch(() => ({}))) as { messageId?: string };
    return { ok: true, id: json.messageId };
  } catch (e) {
    console.error("[email:exception]", e);
    return { ok: false, error: "network" };
  }
}
