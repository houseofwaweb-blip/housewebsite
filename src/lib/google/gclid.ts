"use client";

/**
 * GCLID + click-ID capture for cross-session attribution.
 *
 * When someone clicks a Google Ad, the destination URL gets a `?gclid=...`
 * parameter (or `?gbraid=...` / `?wbraid=...` for iOS app-to-web flows).
 * If they bounce and return days later through organic / direct, the
 * original click ID needs to follow them so the eventual conversion still
 * attributes to the right campaign.
 *
 * gtag.js stores its own copy in `_gcl_aw` but we capture ours as well so:
 *   - server-side conversion uploads can include it later
 *   - the value survives if the user clears Google's cookies but keeps ours
 *   - we can include it in form submissions for the CRM trail
 *
 * 90-day window matches Google Ads' default conversion attribution window.
 */

const STORAGE_KEY = "wa_click_ids";
const COOKIE_NAME = "wa_click_ids";
const MAX_AGE_DAYS = 90;

export interface ClickIds {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  msclkid?: string;
  // First-touch marketing attribution — the campaign + page they first landed
  // on. Captured once and kept, so it survives navigation to a form later.
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt: string;
}

/**
 * Run once on page load. Reads any click IDs from the URL and persists
 * them. If a new gclid arrives, it overwrites the previous one — last
 * click wins, consistent with Google Ads attribution behaviour.
 */
export function captureClickIds(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const existing = readClickIds();

  // Click IDs — last-touch (a fresh ad click overwrites the previous one).
  const incoming: Partial<ClickIds> = {};
  const gclid = params.get("gclid");
  const gbraid = params.get("gbraid");
  const wbraid = params.get("wbraid");
  const fbclid = params.get("fbclid");
  const msclkid = params.get("msclkid");
  if (gclid) incoming.gclid = gclid;
  if (gbraid) incoming.gbraid = gbraid;
  if (wbraid) incoming.wbraid = wbraid;
  if (fbclid) incoming.fbclid = fbclid;
  if (msclkid) incoming.msclkid = msclkid;

  // UTM + landing page + referrer — FIRST-touch (only recorded once, so the
  // original source follows the visitor through to the form they submit).
  const firstTouch: Partial<ClickIds> = {};
  if (!existing?.landingPage) {
    firstTouch.landingPage = window.location.href.slice(0, 600);
    if (document.referrer) firstTouch.referrer = document.referrer.slice(0, 600);
    const utm = (key: string) => params.get(key)?.slice(0, 200) || undefined;
    firstTouch.utmSource = utm("utm_source");
    firstTouch.utmMedium = utm("utm_medium");
    firstTouch.utmCampaign = utm("utm_campaign");
    firstTouch.utmTerm = utm("utm_term");
    firstTouch.utmContent = utm("utm_content");
  }

  // Nothing new to record.
  if (existing && Object.keys(incoming).length === 0 && Object.keys(firstTouch).length === 0) {
    return;
  }

  const merged: ClickIds = {
    ...(existing ?? {}),
    ...firstTouch,
    ...incoming,
    capturedAt: new Date().toISOString(),
  };

  const encoded = JSON.stringify(merged);
  try {
    window.localStorage.setItem(STORAGE_KEY, encoded);
  } catch {
    // localStorage may be disabled; cookie below still works
  }
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(encoded)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

/** Read persisted click IDs. Prefers localStorage; falls back to cookie. */
export function readClickIds(): ClickIds | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ClickIds;
  } catch {
    // fall through to cookie
  }
  const match = new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`).exec(document.cookie);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as ClickIds;
  } catch {
    return null;
  }
}

/** Convenience: just the gclid. */
export function getGclid(): string | undefined {
  return readClickIds()?.gclid;
}
