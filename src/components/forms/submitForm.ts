"use client";

import type { FormType } from "@/lib/forms/schemas";
import {
  trackLead,
  trackCompleteRegistration,
  trackSchedule,
} from "@/lib/meta/pixel";
import { trackGoogleAdsConversion } from "@/lib/google/conversions";
import { readClickIds } from "@/lib/google/gclid";
import { gaEvent } from "@/lib/google/ga4";

/**
 * Thin client-side wrapper around the /api/forms/[type] endpoint.
 * Shared by every form component so error handling stays consistent.
 *
 * On a successful submit, fires the matching Meta browser pixel event
 * with the eventID returned by the server — Meta dedupes against the
 * CAPI event the server fired with the same ID. Browser-side fbq() adds
 * the rich client context (_fbp, _fbc) that the server side can't see.
 */
export async function submitForm(
  type: FormType,
  payload: Record<string, unknown>,
): Promise<{ ok: true; already?: boolean } | { ok: false; error: string }> {
  try {
    // Attach first-touch attribution (UTM + landing + click IDs) to every
    // submission so the sales trail / CRM sees where the enquiry came from.
    const tracking = readClickIds() ?? undefined;
    const res = await fetch(`/api/forms/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, tracking }),
    });
    const body = (await res.json()) as {
      ok: boolean;
      error?: string;
      already?: boolean;
      metaEventId?: string;
    };
    if (res.ok && body.ok) {
      if (!body.already) {
        if (body.metaEventId) fireMetaPixelEvent(type, body.metaEventId);
        void fireGoogleAdsConversion(type, payload, body.metaEventId);
        fireGa4FormEvent(type, payload);
      }
      return { ok: true, already: body.already };
    }
    const code = body.error ?? `http-${res.status}`;
    const message = mapErrorCode(code);
    return { ok: false, error: message };
  } catch {
    return { ok: false, error: "Network trouble. Please try again in a moment." };
  }
}

async function fireGoogleAdsConversion(
  type: FormType,
  payload: Record<string, unknown>,
  transactionId: string | undefined,
) {
  const name = mapToConversionName(type);
  if (!name) return;
  const email = typeof payload.email === "string" ? payload.email : undefined;
  const phone = typeof payload.phone === "string" ? payload.phone : undefined;
  const nameField = typeof payload.name === "string" ? payload.name : undefined;
  const [firstName, ...rest] = nameField?.split(" ") ?? [];
  const lastName = rest.length > 0 ? rest.join(" ") : undefined;
  const postcode = typeof payload.postcode === "string" ? payload.postcode : undefined;

  await trackGoogleAdsConversion({
    name,
    userData: { email, phone, firstName, lastName, postcode },
    transactionId,
  });
}

function mapToConversionName(
  type: FormType,
): "lead" | "schedule" | "registration" | undefined {
  switch (type) {
    case "consultation":
      return "schedule";
    case "contact":
    case "waitlist":
      return "lead";
    case "newsletter":
      return "registration";
  }
}

/**
 * GA4 conversion events, with actual service enquiries kept separate from
 * register-interest / waitlist signups:
 *   - contact / consultation → `generate_lead` (real enquiries + booking requests)
 *   - waitlist               → `register_interest` (distinct event, by product)
 *   - newsletter             → `sign_up`
 */
function fireGa4FormEvent(type: FormType, payload: Record<string, unknown>) {
  const str = (k: string) => (typeof payload[k] === "string" ? (payload[k] as string) : undefined);
  switch (type) {
    case "contact":
      gaEvent("generate_lead", {
        lead_type: "enquiry",
        form_type: "contact",
        topic: str("topic"),
        service: str("serviceType"),
      });
      return;
    case "consultation":
      gaEvent("generate_lead", {
        lead_type: "booking",
        form_type: "consultation",
        service: str("serviceType"),
      });
      return;
    case "waitlist":
      gaEvent("register_interest", {
        product: str("product"),
        source_page: str("sourcePage"),
      });
      return;
    case "newsletter":
      gaEvent("sign_up", { method: "newsletter" });
      return;
  }
}

function fireMetaPixelEvent(type: FormType, eventID: string) {
  switch (type) {
    case "consultation":
      trackSchedule({ eventID });
      return;
    case "newsletter":
      trackCompleteRegistration({
        registrationMethod: "newsletter",
        eventID,
      });
      return;
    case "contact":
    case "waitlist":
      trackLead({ eventID });
      return;
  }
}

function mapErrorCode(code: string): string {
  switch (code) {
    case "validation":
      return "Please check the fields above.";
    case "rate-limited":
      return "You've sent a few of these recently. Try again in ten minutes.";
    case "verification-failed":
      return "We couldn't verify your browser. Refresh and try again.";
    case "insert-failed":
      return "Something went wrong saving your message. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
