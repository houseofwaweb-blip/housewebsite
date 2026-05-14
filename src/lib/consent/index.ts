/**
 * Cookie consent state.
 *
 * Three categories per UK ICO / PECR guidance:
 *   - essential  — always on. Site can't work without these.
 *                  Includes session, security/CSRF, the consent cookie itself.
 *   - functional — preferences and embedded tools. The ServiceOS BookingWidget
 *                  sets cookies in this category. Default OFF until granted.
 *   - analytics  — measurement. Vercel Analytics, future Web Vitals beacons.
 *                  Default OFF until granted.
 *
 * Persistence:
 *   - localStorage `wa-consent` — fast client-side read.
 *   - cookie `wa-consent` (SameSite=Lax, 12 months) — so server components
 *     can read the choice on the next request without a hydration flash.
 *
 * Encoding is a tight `e1f0a0` style string ("e"=essential, "f"=functional,
 * "a"=analytics, followed by 1/0). Saves bytes vs JSON, easy to grep.
 */

export type ConsentCategory = "essential" | "functional" | "analytics";

export interface Consent {
  essential: true; // always granted, included for shape consistency
  functional: boolean;
  analytics: boolean;
  /** ISO timestamp of the choice — handy for audit + re-prompt logic. */
  decidedAt: string;
}

const COOKIE_NAME = "wa-consent";
const STORAGE_KEY = "wa-consent";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months

function encode(c: Consent): string {
  return `e1f${c.functional ? 1 : 0}a${c.analytics ? 1 : 0}|${c.decidedAt}`;
}

function decode(raw: string): Consent | null {
  const match = /^e1f([01])a([01])\|(.+)$/.exec(raw);
  if (!match) return null;
  return {
    essential: true,
    functional: match[1] === "1",
    analytics: match[2] === "1",
    decidedAt: match[3],
  };
}

/** Read from localStorage. Client-only. Returns null pre-decision. */
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return decode(raw);
  } catch {
    return null;
  }
}

/** Persist to both localStorage and cookie. Client-only. */
export function writeConsent(input: Omit<Consent, "essential" | "decidedAt">): Consent {
  const consent: Consent = {
    essential: true,
    functional: input.functional,
    analytics: input.analytics,
    decidedAt: new Date().toISOString(),
  };
  if (typeof window === "undefined") return consent;
  const encoded = encode(consent);
  try {
    window.localStorage.setItem(STORAGE_KEY, encoded);
  } catch {
    // localStorage may be disabled (private mode etc) — cookie still works
  }
  // SameSite=Lax — we never need this on cross-site POSTs.
  // Secure flag in prod only (localhost would refuse it).
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encoded}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  // Broadcast so other components react without polling.
  window.dispatchEvent(new CustomEvent("wa-consent-changed", { detail: consent }));
  return consent;
}

/** Convenience: accept all non-essential. */
export function acceptAll(): Consent {
  return writeConsent({ functional: true, analytics: true });
}

/** Convenience: reject everything non-essential. */
export function rejectAll(): Consent {
  return writeConsent({ functional: false, analytics: false });
}

/** Read from a Cookie header string (for server components / route handlers). */
export function readConsentFromCookieHeader(cookieHeader: string | null | undefined): Consent | null {
  if (!cookieHeader) return null;
  const match = new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`).exec(cookieHeader);
  if (!match) return null;
  return decode(decodeURIComponent(match[1]));
}
