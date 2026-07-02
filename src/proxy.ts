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

  // ── 2. WP legacy URL catch-all ────────────────────────────────────────
  // The explicit redirect map (next.config.ts → wpLongTailRedirects)
  // covers the long-tail service-area pages. This handles the URL
  // *shapes* that WP/WooCommerce produce automatically but we never
  // explicitly enumerated — category archives, ?p=123 query params,
  // /wp-admin probes, /feed/ endpoints, etc.
  //
  // Preserves SEO equity by 301ing to the closest live page rather
  // than 404ing. /wp-* admin probes get 404 instead — those are bots,
  // not real users, and we don't want to confirm WP existence.
  const legacy = wpLegacyRedirect(url);
  if (legacy) return legacy;

  // ── 3. Security headers + CSP ─────────────────────────────────────────
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

  // Third-party measurement + marketing tags. All are consent-gated at runtime,
  // but the CSP must ALLOW them to load from their CDNs / send beacons when
  // consent is granted. This proxy CSP is the one that actually reaches the
  // browser (it overrides next.config.ts headers()), so these hosts MUST live
  // here — keep in sync with next.config.ts. Omitting them silently blocks
  // GA4, Clarity, Meta Pixel, etc. for every visitor.
  const measureScript =
    "https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://connect.facebook.net https://s.pinimg.com https://ct.pinterest.com https://cdn-cookieyes.com https://va.vercel-scripts.com";
  const measureConnect =
    "https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.clarity.ms https://*.clarity.ms https://*.facebook.com https://ct.pinterest.com https://log.cookieyes.com https://vitals.vercel-insights.com https://va.vercel-scripts.com";

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${scriptEval} https://challenges.cloudflare.com ${measureScript} ${obfHosts}`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ${obfHosts}`,
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sanity.io https://cdn.sanity.io https://*.shopify.com https://*.upstash.io https://challenges.cloudflare.com https://*.sentry.io https://*.ingest.sentry.io ${measureConnect} ${obfHosts}`,
    `frame-src 'self' https://challenges.cloudflare.com https://www.facebook.com ${obfHosts}`,
    "frame-ancestors 'none'",
    `form-action 'self' ${obfHosts}`,
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

/**
 * Map a legacy WP URL shape to a 301/404 response, or null if no match.
 * Shapes covered (in order of specificity):
 *
 *   /wp-admin/*, /wp-login.php, /xmlrpc.php, /wp-json/*
 *       → 404 (these are bot probes; respond with not-found rather than
 *         redirect, so we don't confirm a WP install ever existed)
 *   /wp-content/*
 *       → 301 to homepage (these may be real image hotlinks from old shares)
 *   /feed, /feed/*, /comments/feed
 *       → 301 to /the-hearth (RSS, now lives on the Hearth)
 *   /author/<name>
 *       → 301 to /the-house/about
 *   /category/<slug>, /cat/<slug>
 *       → 301 to /the-hearth (best-guess: most WP categories were editorial)
 *   /tag/<slug>
 *       → 301 to /the-hearth (same rationale)
 *   /?p=<n>, /?page_id=<n>, /?cat=<n>, /?tag=<n>
 *       → 301 to homepage (ID-based, we can't recover the destination)
 *
 * NB: 301s lose POST bodies. Anything POSTing to a WP URL is a bot, so
 * that's fine.
 */
function wpLegacyRedirect(url: URL): NextResponse | null {
  const { pathname, searchParams } = url;
  const home = new URL("/", url);

  // Admin / API probes → 404 (don't redirect bots)
  if (
    pathname.startsWith("/wp-admin") ||
    pathname.startsWith("/wp-login") ||
    pathname === "/xmlrpc.php" ||
    pathname.startsWith("/wp-json")
  ) {
    return new NextResponse(null, { status: 404 });
  }

  // Hotlinked WP uploads → homepage (broken image is better than 404 for a
  // user who clicked an old link from somewhere)
  if (pathname.startsWith("/wp-content/")) {
    return NextResponse.redirect(home, 301);
  }

  // Feeds → Hearth
  if (
    pathname === "/feed" ||
    pathname.startsWith("/feed/") ||
    pathname === "/comments/feed" ||
    pathname.startsWith("/comments/feed/")
  ) {
    return NextResponse.redirect(new URL("/the-hearth", url), 301);
  }

  // Author archives → About
  if (pathname.startsWith("/author/")) {
    return NextResponse.redirect(new URL("/the-house/about", url), 301);
  }

  // Category / tag archives → Hearth (editorial best-guess)
  if (
    pathname.startsWith("/category/") ||
    pathname.startsWith("/cat/") ||
    pathname.startsWith("/tag/")
  ) {
    return NextResponse.redirect(new URL("/the-hearth", url), 301);
  }

  // Legacy query-string IDs at root → homepage
  if (
    pathname === "/" &&
    (searchParams.has("p") ||
      searchParams.has("page_id") ||
      searchParams.has("cat") ||
      searchParams.has("tag"))
  ) {
    return NextResponse.redirect(home, 301);
  }

  return null;
}
