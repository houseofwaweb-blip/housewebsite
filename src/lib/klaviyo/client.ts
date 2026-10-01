/**
 * Client-side Klaviyo helpers. Safe no-ops when klaviyo.js isn't loaded
 * (e.g. the visitor hasn't granted marketing consent — see the Klaviyo
 * consent loader). Uses the universal push-queue API so it works whether
 * the modern `window.klaviyo` object or the legacy `_learnq` queue is present.
 */

type KlaviyoArgs = unknown[];

declare global {
  interface Window {
    klaviyo?: { push: (args: KlaviyoArgs) => void };
    _learnq?: { push: (args: KlaviyoArgs) => void };
    /** Klaviyo's onsite queue — drained by klaviyo.js once it loads. */
    _klOnsite?: KlaviyoArgs[];
  }
}

function push(args: KlaviyoArgs): void {
  if (typeof window === "undefined") return;
  const k = window.klaviyo ?? window._learnq;
  if (k && typeof k.push === "function") {
    try {
      k.push(args);
    } catch {
      /* tracking must never throw into the caller */
    }
    return;
  }
  // klaviyo.js hasn't finished loading yet (e.g. "Viewed Product" fires on a
  // product-page mount just as the consent-gated script is still fetching).
  // Queue to Klaviyo's own _klOnsite array, which klaviyo.js drains on load, so
  // the event isn't dropped. Without this, the first on-load event is lost.
  try {
    (window._klOnsite = window._klOnsite || []).push(args);
  } catch {
    /* tracking must never throw into the caller */
  }
}

/** Track a custom Klaviyo metric (e.g. "Added to Cart", "Viewed Product"). */
export function klaviyoTrack(event: string, properties: Record<string, unknown> = {}): void {
  push(["track", event, properties]);
}

/**
 * Record a product view for Klaviyo's "recently viewed" / browse-abandonment
 * catalog matching. `ItemId` should be the Shopify product id so it lines up
 * with the Shopify-synced Klaviyo catalog.
 */
export function klaviyoTrackViewedItem(item: Record<string, unknown>): void {
  push(["trackViewedItem", item]);
}

/** Associate the current browser with a profile once an email is known. */
export function klaviyoIdentify(properties: Record<string, unknown>): void {
  push(["identify", properties]);
}
