/**
 * Next.js 16 Proxy (formerly middleware.ts).
 *
 * Responsibilities, in order:
 *   1. Canonical URL enforcement (apex host, lowercase, no trailing slash)
 *   2. HoWA fallback flag — when HOWA_APP_LIVE=false, rewrite Start HoWA
 *      CTAs to /howa/coming-soon (PLAN.md §15 E1)
 *   3. Content Security Policy with per-request nonce (PLAN.md §15 S6)
 *   4. Redirect map lookup (to be wired once Sanity is live)
 *
 * Reference: DESIGN.md Part J.4 (canonical) + PLAN.md §15 pre-code findings
 */
import { NextResponse, type NextRequest } from "next/server";

const SITE_HOST = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4000",
).host;

export const config = {
  matcher: [
    // Match everything except static assets + API routes (API has own auth)
    "/((?!_next/static|_next/image|favicon.ico|fonts|brand|patterns|robots.txt|sitemap.xml|studio).*)",
  ],
};

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const url = nextUrl.clone();

  // ── 1. Canonical URL enforcement ─────────────────────────────────────────
  let needsRedirect = false;

  // www → apex
  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.slice(4);
    needsRedirect = true;
  }

  // Trailing slash → no trailing slash (except root)
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    needsRedirect = true;
  }

  // Uppercase path segments → lowercase
  // Preserve exact query strings
  const lower = url.pathname.toLowerCase();
  if (lower !== url.pathname) {
    url.pathname = lower;
    needsRedirect = true;
  }

  if (needsRedirect) {
    return NextResponse.redirect(url, 301);
  }

  // ── 2. Security headers + CSP ─────────────────────────────────────────
  // HoWA fallback is handled by /api/howa-bounce itself (route enforces
  // source whitelist + env.HOWA_APP_LIVE check), so the proxy doesn't
  // short-circuit it any more — doing so leaked attacker-controlled
  // query params past the route's whitelist.
  const response = NextResponse.next();

  // ServiceOS booking widget — mounted globally in root layout, opens
  // on click of any `#open-booking-form` anchor. The widget sets cookies,
  // makes XHR requests to its API, and may iframe checkout.
  const obfHosts = "https://accounts.willowalexander.co.uk https://willowalexander.serviceos.com https://*.serviceos.com";

  // CSP — enforced (not report-only). `unsafe-eval` retained in dev only
  // (Next.js / React 19 use eval() for source-map reconstruction in the
  // dev overlay and for some server-component HMR plumbing); stripped in
  // prod. `unsafe-inline` retained on script-src because Next.js inlines
  // hydration scripts. A nonce pattern would let us drop unsafe-inline;
  // see PLAN.md §15 S6 for the spec.
  const isDev = process.env.NODE_ENV !== "production";
  const scriptEval = isDev ? " 'unsafe-eval'" : "";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${scriptEval} https://challenges.cloudflare.com ${obfHosts}`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ${obfHosts}`,
    `img-src 'self' data: blob: https://cdn.sanity.io https://cdn.shopify.com https://willowalexander.co.uk ${obfHosts}`,
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src 'self' https://*.supabase.co https://*.sanity.io https://cdn.sanity.io https://*.upstash.io https://challenges.cloudflare.com https://*.sentry.io ${obfHosts}`,
    `frame-src 'self' https://challenges.cloudflare.com ${obfHosts}`,
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    // Both shapes: legacy report-uri (still respected by most browsers) and
    // modern report-to (Chrome/Edge). See /api/csp-report/route.ts.
    "report-uri /api/csp-report",
    "report-to csp-endpoint",
  ].join("; ");

  response.headers.set("content-security-policy", csp);
  // Reporting API endpoint group — paired with `report-to csp-endpoint` above.
  response.headers.set(
    "reporting-endpoints",
    'csp-endpoint="/api/csp-report"',
  );
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("x-frame-options", "DENY");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "permissions-policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  // Avoid an unused warning until we wire up the redirect map
  void SITE_HOST;

  return response;
}
