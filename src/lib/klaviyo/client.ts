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
  }
}

/** Track a custom Klaviyo metric (e.g. "Added to Cart"). */
export function klaviyoTrack(event: string, properties: Record<string, unknown> = {}): void {
  push(["track", event, properties]);
}

/** Associate the current browser with a profile once an email is known. */
export function klaviyoIdentify(properties: Record<string, unknown>): void {
  push(["identify", properties]);
}
