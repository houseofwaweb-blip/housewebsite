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

const HOWA_APP_LIVE = process.env.HOWA_APP_LIVE === "true";
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

  // ── 2. HoWA fallback flag ────────────────────────────────────────────────
  // When product app isn't live, route Start HoWA CTAs to coming-soon.
  // CTAs will use the path `/api/howa-bounce` which we rewrite here.
  if (!HOWA_APP_LIVE && nextUrl.pathname.startsWith("/api/howa-bounce")) {
    url.pathname = "/howa/coming-soon";
    return NextResponse.redirect(url, 302);
  }

  // ── 3. Content Security Policy ───────────────────────────────────────────
  // Per Next.js 16 docs: per-request nonce, strict-dynamic.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Whitelist of origins we actually call
  const cspDirectives = [
    `default-src 'self'`,
    `img-src 'self' data: blob: https://cdn.sanity.io https://cdn.shopify.com`,
    `font-src 'self' data:`,
    // script-src: nonce + strict-dynamic allows child-of-nonce scripts
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com`,
    `style-src 'self' 'unsafe-inline'`,
    `connect-src 'self' https://*.supabase.co https://*.myshopify.com https://*.sanity.io https://cdn.sanity.io https://*.upstash.io https://challenges.cloudflare.com https://*.sentry.io`,
    `frame-src 'self' https://challenges.cloudflare.com`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `upgrade-insecure-requests`,
  ];
  // Report-only mode for dev; enforce in prod
  const cspHeader = cspDirectives.join("; ");

  const response = NextResponse.next({
    request: {
      headers: (() => {
        const h = new Headers(request.headers);
        h.set("x-nonce", nonce);
        h.set(
          process.env.NODE_ENV === "production"
            ? "content-security-policy"
            : "content-security-policy-report-only",
          cspHeader,
        );
        return h;
      })(),
    },
  });

  // Also set on the outgoing response so browsers enforce it
  response.headers.set(
    process.env.NODE_ENV === "production"
      ? "content-security-policy"
      : "content-security-policy-report-only",
    cspHeader,
  );

  // Additional security headers
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
