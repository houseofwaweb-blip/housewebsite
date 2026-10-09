/**
 * Client-side Klaviyo helpers. Safe no-ops when klaviyo.js isn't loaded
 * (e.g. the visitor hasn't granted marketing consent — see the Klaviyo
 * consent loader). Uses the universal push-queue API so it works whether
 * the modern `window.klaviyo` object or the legacy `_learnq` queue is present.
 */

type KlaviyoArgs = unknown[];

type KlaviyoQueue = { push: (args: KlaviyoArgs) => void };

declare global {
  interface Window {
    // Before klaviyo.js loads this is a plain array; klaviyo.js replaces it
    // with its SDK object on load and replays whatever was queued. Both expose
    // `.push`, so we can always push to it.
    klaviyo?: KlaviyoArgs[] | KlaviyoQueue;
    _learnq?: KlaviyoArgs[] | KlaviyoQueue;
  }
}

function push(args: KlaviyoArgs): void {
  if (typeof window === "undefined") return;
  // Queue onto `window.klaviyo`, creating the array if the consent-gated
  // klaviyo.js hasn't executed yet. This is Klaviyo's documented pattern:
  // klaviyo.js adopts a pre-existing `window.klaviyo` array and replays every
  // queued call on load, so an event fired *before* the script finishes (e.g.
  // add-to-cart on the same page where cookies were just accepted) is never
  // dropped. NB: the previous `_klOnsite` fallback was a dead queue klaviyo.js
  // never drained, which silently lost those early events (notably "Added to
  // Cart"), while later "Viewed Product" views survived because the script had
  // loaded by then. Fixed Oct 2026.
  try {
    const kl = (window.klaviyo = window.klaviyo || []);
    kl.push(args);
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
