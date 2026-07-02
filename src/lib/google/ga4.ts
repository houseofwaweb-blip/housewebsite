/**
 * GA4 custom event helper (client-side).
 *
 * Fires named GA4 events through the same gtag.js instance that
 * GoogleTagSetup loads. Consent Mode v2 governs whether an event is counted
 * or only modelled — we always fire; Google handles the rest. No-op when
 * gtag isn't present (dev / no GA id / before the script initialises), so it
 * can never break the UX.
 *
 * Event taxonomy (GA4 standard recommended names, matched to GTM Enhanced
 * Ecommerce so reporting is continuous across the WP→Vercel cutover):
 *   - generate_lead    — service / design / consultation enquiries
 *   - register_interest — waitlist / register-interest (kept separate from leads)
 *   - sign_up          — newsletter
 *   - view_item / add_to_cart / begin_checkout — shop funnel
 *   - phone_call / email_click — contact intent (fired by GaClickEvents)
 *   - booking_intent   — clicks on Book / Start CTAs (data-ga-event)
 * purchase is intentionally absent: it happens on Shopify's hosted checkout
 * and must be configured on the Shopify side against the same measurement ID.
 */

type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>,
) => void;

function gtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: GtagFn }).gtag;
}

/** Parse a numeric amount out of a formatted price like "£30" or "30.00". */
export function parseAmount(price?: string | number | null): number | undefined {
  if (typeof price === "number") return Number.isFinite(price) ? price : undefined;
  if (!price) return undefined;
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

export function gaEvent(name: string, params: Record<string, unknown> = {}): void {
  const g = gtag();
  if (!g) return;
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") clean[k] = v;
  }
  try {
    g("event", name, clean);
  } catch {
    /* analytics must never break the page */
  }
}
