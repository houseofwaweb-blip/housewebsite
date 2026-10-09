/**
 * Client-side Klaviyo helpers.
 *
 * Consent + timing model (fixed Oct 2026): klaviyo.js is loaded only after
 * marketing consent (see consent/loaders/Klaviyo.tsx). Until it loads,
 * `window.klaviyo` is NOT a usable queue — the `company_id` loader does not
 * adopt a plain array we might create, so anything pushed early is lost. So we
 * keep OUR OWN in-memory queue and only ever hand calls to the REAL Klaviyo
 * object: the loader calls `flushKlaviyoQueue()` from its `onLoad`, and any
 * call made after that goes straight through. With no marketing consent the
 * script never loads, the real object never appears, the queue is never
 * flushed, and nothing is sent — exactly the gating we want.
 */

type KlaviyoMethod = "track" | "identify" | "trackViewedItem";
type QueuedCall =
  | ["track", string, Record<string, unknown>]
  | ["identify", Record<string, unknown>]
  | ["trackViewedItem", Record<string, unknown>];

interface KlaviyoObject {
  track?: (event: string, properties?: Record<string, unknown>) => unknown;
  identify?: (properties: Record<string, unknown>) => unknown;
  trackViewedItem?: (item: Record<string, unknown>) => unknown;
  push?: (args: unknown[]) => void;
}

declare global {
  interface Window {
    klaviyo?: KlaviyoObject;
  }
}

// Holds calls fired before klaviyo.js has finished loading. Module scope, so it
// survives client-side navigation within a session and is drained on load.
const pending: QueuedCall[] = [];

/**
 * The loaded Klaviyo SDK, or null if klaviyo.js hasn't initialised yet. The SDK
 * exposes methods (track/identify); our own pre-load state never assigns
 * window.klaviyo, so the presence of these methods means it's genuinely ready.
 */
function realKlaviyo(): KlaviyoObject | null {
  if (typeof window === "undefined") return null;
  const kl = window.klaviyo;
  // We never assign window.klaviyo ourselves any more, so if it exists with any
  // of the SDK's call methods, klaviyo.js has initialised it.
  if (
    kl &&
    (typeof kl.track === "function" ||
      typeof kl.identify === "function" ||
      typeof kl.push === "function")
  ) {
    return kl;
  }
  return null;
}

function send(kl: KlaviyoObject, call: QueuedCall): void {
  try {
    const verb = call[0] as KlaviyoMethod;
    const args = call.slice(1);
    const fn = (kl as unknown as Record<string, unknown>)[verb];
    if (typeof fn === "function") {
      (fn as (...a: unknown[]) => unknown).apply(kl, args);
    } else if (typeof kl.push === "function") {
      // Fallback to the array/queue API for any verb without a direct method.
      kl.push(call as unknown as unknown[]);
    }
  } catch {
    /* tracking must never throw into the caller */
  }
}

/**
 * Flush everything queued before klaviyo.js loaded. Called from the loader's
 * `onLoad` (next/script), once `window.klaviyo` is the real SDK. Safe to call
 * repeatedly and safe to call when nothing is queued.
 */
export function flushKlaviyoQueue(): void {
  const kl = realKlaviyo();
  if (!kl) return;
  while (pending.length) send(kl, pending.shift() as QueuedCall);
}

function enqueueOrSend(call: QueuedCall): void {
  if (typeof window === "undefined") return;
  const kl = realKlaviyo();
  if (kl) {
    // Script already loaded (this page, or a previous one in the session) —
    // drain anything still queued first to preserve order, then send this call.
    if (pending.length) flushKlaviyoQueue();
    send(kl, call);
  } else {
    // Not loaded yet (or no consent). Hold it; flushed on load, dropped if the
    // visitor never consents (the script never loads).
    pending.push(call);
  }
}

/** Track a custom Klaviyo metric (e.g. "Added to Cart", "Viewed Product"). */
export function klaviyoTrack(event: string, properties: Record<string, unknown> = {}): void {
  enqueueOrSend(["track", event, properties]);
}

/**
 * Record a product view for Klaviyo's "recently viewed" / browse-abandonment
 * catalog matching. `ItemId` should be the Shopify product id so it lines up
 * with the Shopify-synced Klaviyo catalog.
 */
export function klaviyoTrackViewedItem(item: Record<string, unknown>): void {
  enqueueOrSend(["trackViewedItem", item]);
}

/** Associate the current browser with a profile once an email is known. */
export function klaviyoIdentify(properties: Record<string, unknown>): void {
  enqueueOrSend(["identify", properties]);
}
