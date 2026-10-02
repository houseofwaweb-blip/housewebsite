/**
 * Cookie consent state.
 *
 * Four categories per UK ICO / PECR guidance + IAB TCF v2 alignment:
 *   - essential   — always on. Site can't work without these.
 *                   Session, security/CSRF, the consent cookie itself, and the
 *                   ServiceOS BookingWidget (strictly necessary: it only runs
 *                   when the visitor clicks "Book", a service they requested, so
 *                   it must not be blocked by declining optional categories).
 *   - functional  — preferences and other embedded tools.
 *                   Default OFF until granted.
 *   - measurement — first-party understanding of the site. GA4, Microsoft
 *                   Clarity, Vercel Analytics, Speed Insights, Sentry.
 *                   Default OFF until granted.
 *   - marketing   — advertising + retargeting pixels. Meta Pixel,
 *                   Pinterest Tag, LinkedIn Insight, Google Ads.
 *                   Default OFF until granted.
 *
 * Splitting analytics into measurement vs marketing matches modern
 * tech-company CMPs (Vercel, Linear, Notion, GitHub). A privacy-conscious
 * visitor can let us understand the site without consenting to be
 * retargeted on Instagram.
 *
 * Persistence:
 *   - localStorage `wa-consent` — fast client-side read.
 *   - cookie `wa-consent` (SameSite=Lax, 12 months) — so server components
 *     can read the choice on the next request without a hydration flash.
 *
 * Encoding is a tight `e1f0m0k0` style string:
 *   e = essential, f = functional, m = measurement, k = marKeting
 *   (k rather than `m` again to avoid collision; rather than `a` because
 *   the old encoding used `a` for analytics — distinct letter forces a
 *   clean migration: pre-existing visitors with `e1f0a0` won't decode
 *   and will be re-prompted, which is the correct behaviour after a
 *   schema change.)
 */

export type ConsentCategory =
  | "essential"
  | "functional"
  | "measurement"
  | "marketing";

export interface Consent {
  essential: true;
  functional: boolean;
  measurement: boolean;
  marketing: boolean;
  /** ISO timestamp of the choice — handy for audit + re-prompt logic. */
  decidedAt: string;
  /** Banner version the choice was given under (for evidence + re-prompts). */
  version: number;
}

const COOKIE_NAME = "wa-consent";
const STORAGE_KEY = "wa-consent";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/**
 * Consent banner version. Bump this whenever the disclosure materially changes,
 * which invalidates every stored choice and re-prompts all visitors once.
 * v2 (2 Oct 2026): advertising / Google Ads is now disclosed in the banner, so
 * every v1 choice (given before advertising was named) must be re-collected to
 * be valid under UK PECR / ICO guidance.
 */
export const CONSENT_VERSION = 2;

function encode(c: Consent): string {
  return `v${CONSENT_VERSION}|e1f${c.functional ? 1 : 0}m${c.measurement ? 1 : 0}k${c.marketing ? 1 : 0}|${c.decidedAt}`;
}

function decode(raw: string): Consent | null {
  const match = /^v(\d+)\|e1f([01])m([01])k([01])\|(.+)$/.exec(raw);
  if (!match) return null;
  // A choice from an older banner version is no longer valid — re-prompt.
  if (Number(match[1]) !== CONSENT_VERSION) return null;
  return {
    essential: true,
    functional: match[2] === "1",
    measurement: match[3] === "1",
    marketing: match[4] === "1",
    decidedAt: match[5],
    version: CONSENT_VERSION,
  };
}

/**
 * Read from localStorage. Client-only. Returns null pre-decision.
 *
 * Memoised by raw stored string so successive calls without an
 * intervening write return the SAME object reference — required for
 * React's `useSyncExternalStore` to avoid an infinite render loop.
 */
let cachedRaw: string | null | undefined = undefined;
let cachedValue: Consent | null = null;
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  cachedValue = raw ? decode(raw) : null;
  return cachedValue;
}

export type ConsentChoice = Omit<Consent, "essential" | "decidedAt" | "version">;

/** Persist to both localStorage and cookie. Client-only. */
export function writeConsent(input: ConsentChoice): Consent {
  const consent: Consent = {
    essential: true,
    functional: input.functional,
    measurement: input.measurement,
    marketing: input.marketing,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  if (typeof window === "undefined") return consent;
  const encoded = encode(consent);
  try {
    window.localStorage.setItem(STORAGE_KEY, encoded);
  } catch {
    // localStorage may be disabled (private mode etc) — cookie still works
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encoded}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("wa-consent-changed", { detail: consent }));
  return consent;
}

/** Convenience: accept all non-essential. */
export function acceptAll(): Consent {
  return writeConsent({ functional: true, measurement: true, marketing: true });
}

/** Convenience: reject everything non-essential. */
export function rejectAll(): Consent {
  return writeConsent({ functional: false, measurement: false, marketing: false });
}

/** Read from a Cookie header string (for server components / route handlers). */
export function readConsentFromCookieHeader(cookieHeader: string | null | undefined): Consent | null {
  if (!cookieHeader) return null;
  const match = new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`).exec(cookieHeader);
  if (!match) return null;
  return decode(decodeURIComponent(match[1]));
}
