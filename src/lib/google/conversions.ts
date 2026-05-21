"use client";

/**
 * Google Ads conversion firing with Enhanced Conversions.
 *
 * Each named conversion (lead, schedule, registration) corresponds to a
 * Conversion Action created by the PPC team inside Google Ads. The
 * Conversion Label produced there is read from the relevant env var.
 *
 * Enhanced Conversions: before each conversion event, we set hashed PII
 * via `gtag('set', 'user_data', { sha256_email_address, sha256_phone_number, ... })`.
 * Google uses this to match the conversion against signed-in Google
 * users whose cookies were blocked by iOS/ITP/ad-blockers — typically
 * recovering 20–30% of otherwise-lost attribution.
 *
 * Consent Mode v2 governs whether the conversion is actually counted vs
 * modelled. Either way we fire the event — Google handles the rest.
 */

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

type ConversionName = "lead" | "schedule" | "registration";

function labelFor(name: ConversionName): string | undefined {
  switch (name) {
    case "lead":
      return process.env.NEXT_PUBLIC_GADS_CONVERSION_LEAD;
    case "schedule":
      return process.env.NEXT_PUBLIC_GADS_CONVERSION_SCHEDULE;
    case "registration":
      return process.env.NEXT_PUBLIC_GADS_CONVERSION_REGISTRATION;
  }
}

interface GtagWindow {
  gtag?: (
    command: "event" | "set" | "config" | "consent" | "js",
    eventNameOrAction: string,
    params?: Record<string, unknown> | Date,
  ) => void;
  dataLayer?: unknown[];
}

function gtag(): GtagWindow["gtag"] | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as GtagWindow).gtag;
}

/**
 * SHA-256 hash, lowercase hex, of a normalised string. Uses the browser's
 * native SubtleCrypto so no dependency or polyfill is needed.
 */
async function sha256(value: string): Promise<string> {
  const normalised = value.trim().toLowerCase();
  const buffer = new TextEncoder().encode(normalised);
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** UK phone → E.164 (best-effort). */
function normalisePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+44${digits.slice(1)}`;
  if (digits.startsWith("44")) return `+${digits}`;
  return digits;
}

export interface ConversionUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  postcode?: string;
}

export interface TrackConversionArgs {
  /** Conversion type — maps to one of the configured conversion labels. */
  name: ConversionName;
  /** Form-submitted user data. Hashed before transmission. */
  userData?: ConversionUserData;
  /** Conversion value (e.g. expected lead value). */
  value?: number;
  /** ISO 4217 currency code. Default GBP. */
  currency?: string;
  /** Unique ID per conversion. Used by Google for de-duplication. */
  transactionId?: string;
}

/**
 * Fire a Google Ads conversion event with Enhanced Conversions.
 * No-op when Google Ads ID or conversion label is missing.
 */
export async function trackGoogleAdsConversion({
  name,
  userData,
  value,
  currency = "GBP",
  transactionId,
}: TrackConversionArgs): Promise<void> {
  const g = gtag();
  const label = labelFor(name);
  if (!g || !ADS_ID || !label) return;

  // Set hashed user_data BEFORE firing the conversion event — gtag uses
  // the most recent set() call as the Enhanced Conversions payload.
  if (userData) {
    const hashed: Record<string, string> = {};
    if (userData.email) hashed.sha256_email_address = await sha256(userData.email);
    if (userData.phone)
      hashed.sha256_phone_number = await sha256(normalisePhone(userData.phone));
    if (userData.firstName)
      hashed.sha256_first_name = await sha256(userData.firstName);
    if (userData.lastName)
      hashed.sha256_last_name = await sha256(userData.lastName);
    if (userData.postcode)
      hashed.sha256_postal_code = await sha256(
        userData.postcode.replace(/\s+/g, ""),
      );
    if (Object.keys(hashed).length > 0) {
      g("set", "user_data", hashed);
    }
  }

  g("event", "conversion", {
    send_to: `${ADS_ID}/${label}`,
    ...(value !== undefined ? { value } : {}),
    currency,
    ...(transactionId ? { transaction_id: transactionId } : {}),
  });
}
