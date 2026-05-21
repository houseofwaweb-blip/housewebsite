/**
 * Client-side Sentry init. Next.js 15+ replaces the old
 * `sentry.client.config.ts` with this file in the project root.
 *
 * Runs once when the first client bundle hydrates. We respect the user's
 * measurement consent (see lib/consent) — without consent, Sentry is not
 * initialised at all. ICO position: error monitoring is a "legitimate
 * interest" but using it without consent for personalised debugging
 * crosses the line, so we treat it as measurement and require opt-in.
 *
 * The session-replay integration is intentionally omitted at launch —
 * it captures form input by default and would require GDPR DPIA work
 * we haven't done yet.
 */

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

function hasMeasurementConsent(): boolean {
  if (typeof document === "undefined") return false;
  // Match lib/consent encoding: e1f{0,1}m{0,1}k{0,1}|<iso>.
  // Only the `m` (measurement) flag matters here.
  const match = /(?:^|; )wa-consent=([^;]+)/.exec(document.cookie);
  if (!match) return false;
  const flag = /m([01])/.exec(decodeURIComponent(match[1]));
  return flag?.[1] === "1";
}

if (dsn && hasMeasurementConsent()) {
  Sentry.init({
    dsn,
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
    // Low sampling in prod — Sentry pricing is per-event.
    tracesSampleRate: process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 0.1 : 1.0,
    // Don't capture cancelled fetches caused by route changes — noisy.
    ignoreErrors: ["AbortError", /ResizeObserver loop/i],
  });
}

// Required for Next.js to know this file ran. Re-export the navigation
// instrumentation so Sentry can wire up router transitions.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
