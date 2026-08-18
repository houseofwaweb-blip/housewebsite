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
