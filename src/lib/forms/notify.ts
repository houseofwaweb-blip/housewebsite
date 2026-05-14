import "server-only";
import { env } from "@/lib/env";
import { sendEmail } from "@/lib/email";
import type { FormType } from "./schemas";

/**
 * Form submission → inbox routing.
 *
 *   - consultation  → CONTACT_INBOX_DESIGN  (falls back to DEFAULT)
 *   - waitlist      → CONTACT_INBOX_DEFAULT (Alex triages by product)
 *   - contact       → topic-routed: press → _PRESS, partnership/general/etc → _DEFAULT
 *   - newsletter    → no notification (subscribers sync to ESP separately)
 *
 * Each notification carries:
 *   - Plain-text body so it's readable in any mail client.
 *   - Reply-To set to the submitter's email so hitting "Reply" works.
 *   - subject prefix like "[HoWA · consultation]" for inbox filtering.
 *
 * Failure is logged but never thrown — the submission is already persisted
 * to Supabase. We can replay notifications from the DB if needed.
 */

interface Submission {
  // Common fields across forms — narrowed per form type below.
  [k: string]: unknown;
  email?: string;
  name?: string;
}

function inbox(category: "default" | "design" | "services" | "protect" | "shop" | "press"): string {
  const map = {
    default: env.CONTACT_INBOX_DEFAULT,
    design: env.CONTACT_INBOX_DESIGN ?? env.CONTACT_INBOX_DEFAULT,
    services: env.CONTACT_INBOX_SERVICES ?? env.CONTACT_INBOX_DEFAULT,
    protect: env.CONTACT_INBOX_PROTECT ?? env.CONTACT_INBOX_DEFAULT,
    shop: env.CONTACT_INBOX_SHOP ?? env.CONTACT_INBOX_DEFAULT,
    press: env.CONTACT_INBOX_PRESS ?? env.CONTACT_INBOX_DEFAULT,
  } as const;
  return map[category];
}

function formatBody(submission: Submission): string {
  return Object.entries(submission)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`)
    .join("\n");
}

export async function notifyFormSubmission(
  type: FormType,
  submission: Submission,
): Promise<void> {
  const email = typeof submission.email === "string" ? submission.email : undefined;
  const name = typeof submission.name === "string" ? submission.name : "—";

  let to: string;
  let subject: string;

  switch (type) {
    case "consultation":
      to = inbox("design");
      subject = `[HoWA · consultation] ${name}`;
      break;
    case "waitlist": {
      const product = typeof submission.product === "string" ? submission.product : "?";
      to = inbox("default");
      subject = `[HoWA · waitlist · ${product}] ${name}`;
      break;
    }
    case "contact": {
      const topic = typeof submission.topic === "string" ? submission.topic : "general";
      to = topic === "press" ? inbox("press") : inbox("default");
      subject = `[HoWA · contact · ${topic}] ${name}`;
      break;
    }
    case "newsletter":
      // Newsletter signups go to the ESP, not an inbox. Nothing to do.
      return;
    default:
      return;
  }

  await sendEmail({
    to,
    subject,
    text: formatBody(submission),
    replyTo: email,
  });
}
