import { readClickIds } from "@/lib/google/gclid";

/**
 * getAttribution — reads the inbound campaign/source parameters from the URL so
 * a form submission can be attributed (email vs social vs print vs QR). Spec:
 * the enquiry record must carry silent source attribution. Client-only; returns
 * an empty object on the server. Only the known marketing keys are captured, to
 * avoid sweeping arbitrary query data into the record.
 */
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "source", "gclid", "fbclid"] as const;

export function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) out[key] = value.slice(0, 200);
  }
  return out;
}

/**
 * Ad-source attribution → Shopify order attributes.
 *
 * Captures where a visitor came from on their FIRST page of the session
 * (landing page + UTMs), keeps it in sessionStorage for the session, and hands
 * it to the cart on Add to basket so it rides onto the Shopify order (visible
 * under the order's "Additional details").
 *
 * Click ids (gclid / gbraid / wbraid) are NOT captured here — they're already
 * captured, consent-gated, by ClickIdCapture → lib/google/gclid.ts (Marketing
 * category only). We read them back via readClickIds() and attach them to the
 * cart only when MARKETING consent is currently granted (the caller passes it
 * in), so a later consent withdrawal also stops them being attached.
 */

const ATTR_KEY = "wa-attribution";

interface Attribution {
  landingPage: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ts: string;
}

/**
 * Store first-touch attribution for the session. Idempotent: once set, later
 * internal navigations don't overwrite it, so we keep the real entry point.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(ATTR_KEY)) return;
    const p = new URLSearchParams(window.location.search);
    const g = (k: string) => p.get(k)?.trim() || undefined;
    const data: Attribution = {
      landingPage: window.location.pathname + window.location.search,
      referrer: document.referrer || undefined,
      utmSource: g("utm_source"),
      utmMedium: g("utm_medium"),
      utmCampaign: g("utm_campaign"),
      ts: new Date().toISOString(),
    };
    window.sessionStorage.setItem(ATTR_KEY, JSON.stringify(data));
  } catch {
    /* sessionStorage can throw in private mode; attribution is best-effort */
  }
}

/**
 * Build the Shopify cart attribute list: landing page + UTMs always; click ids
 * only when marketing consent is granted.
 */
export function getAttributionAttributes(
  marketingConsent: boolean,
): Array<{ key: string; value: string }> {
  if (typeof window === "undefined") return [];
  const attrs: Array<{ key: string; value: string }> = [];
  const push = (key: string, value?: string | null) => {
    if (value) attrs.push({ key, value: String(value).slice(0, 255) });
  };
  try {
    const raw = window.sessionStorage.getItem(ATTR_KEY);
    if (raw) {
      const d = JSON.parse(raw) as Attribution;
      push("landing_page", d.landingPage);
      push("utm_source", d.utmSource);
      push("utm_medium", d.utmMedium);
      push("utm_campaign", d.utmCampaign);
      push("referrer", d.referrer);
    }
  } catch {
    /* ignore */
  }
  if (marketingConsent) {
    const ids = readClickIds();
    if (ids) {
      push("gclid", ids.gclid);
      push("gbraid", ids.gbraid);
      push("wbraid", ids.wbraid);
    }
  }
  return attrs;
}
