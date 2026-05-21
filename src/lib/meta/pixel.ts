"use client";

/**
 * Browser-side Meta Pixel helpers.
 *
 * The pixel itself is mounted by <MetaPixel /> in the root layout and only
 * loads when the user has granted `marketing` consent. Once loaded, fbq()
 * is on window.
 *
 * These helpers wrap fbq() with:
 *   - A consent check so accidental calls before opt-in are no-ops.
 *   - Optional eventID dedup with the server-side CAPI event of the same name.
 *   - Light typing on the event payload to keep param shapes consistent.
 */

interface FbqWindow {
  fbq?: (
    track: "track" | "trackCustom",
    eventName: string,
    params?: Record<string, unknown>,
    options?: { eventID?: string },
  ) => void;
}

function fbq(): FbqWindow["fbq"] | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as FbqWindow).fbq;
}

/** Read our consent cookie to confirm marketing is granted. */
function hasMarketingConsent(): boolean {
  if (typeof document === "undefined") return false;
  const match = /(?:^|; )wa-consent=([^;]+)/.exec(document.cookie);
  if (!match) return false;
  const flag = /k([01])/.exec(decodeURIComponent(match[1]));
  return flag?.[1] === "1";
}

function safeTrack(
  event: string,
  params?: Record<string, unknown>,
  eventID?: string,
) {
  const f = fbq();
  if (!f || !hasMarketingConsent()) return;
  f("track", event, params ?? {}, eventID ? { eventID } : undefined);
}

// ---------------------------------------------------------------------------
// Standard events
// ---------------------------------------------------------------------------

export function trackViewContent(args: {
  contentId: string;
  contentName: string;
  contentType?: "product" | "product_group";
  contentCategory?: string;
  value?: number;
  currency?: string;
  eventID?: string;
}) {
  safeTrack(
    "ViewContent",
    {
      content_ids: [args.contentId],
      content_name: args.contentName,
      content_type: args.contentType ?? "product",
      ...(args.contentCategory ? { content_category: args.contentCategory } : {}),
      ...(args.value !== undefined ? { value: args.value } : {}),
      ...(args.currency ? { currency: args.currency } : { currency: "GBP" }),
    },
    args.eventID,
  );
}

export function trackSearch(args: { searchString: string; eventID?: string }) {
  safeTrack(
    "Search",
    { search_string: args.searchString },
    args.eventID,
  );
}

export function trackLead(args?: { value?: number; currency?: string; eventID?: string }) {
  safeTrack(
    "Lead",
    {
      currency: args?.currency ?? "GBP",
      ...(args?.value !== undefined ? { value: args.value } : {}),
    },
    args?.eventID,
  );
}

export function trackCompleteRegistration(args?: {
  registrationMethod?: string;
  eventID?: string;
}) {
  safeTrack(
    "CompleteRegistration",
    args?.registrationMethod
      ? { content_name: args.registrationMethod }
      : undefined,
    args?.eventID,
  );
}

export function trackContact(args?: { eventID?: string }) {
  safeTrack("Contact", undefined, args?.eventID);
}

export function trackSchedule(args?: { eventID?: string }) {
  safeTrack("Schedule", undefined, args?.eventID);
}

/** Custom event escape hatch. Use sparingly — standard events optimise better. */
export function trackCustom(
  eventName: string,
  params?: Record<string, unknown>,
  eventID?: string,
) {
  const f = fbq();
  if (!f || !hasMarketingConsent()) return;
  f("trackCustom", eventName, params ?? {}, eventID ? { eventID } : undefined);
}
