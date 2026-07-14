import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import wpLongTail from "./src/lib/services-data/wp-long-tail.json";

interface LongTailEntry {
  slug: string;
}

/**
 * 301s for the WP long-tail SEO catalogue.
 *
 * The old WP site exposed each locality+task combo at the root, e.g.
 * `/handyman-cat-flap-installation-in-bexley`. To preserve link equity we
 * 301 each of those to the new structured URL `/services/local/<same-slug>`.
 *
 * Also: `/protect/review` → `/protect/home-protection` (renamed 2026-05-05).
 * Also: `/insurance` → `/protect/insurance` (consolidated 2026-05-05).
 */
const wpLongTailRedirects = (wpLongTail as LongTailEntry[]).map((e) => ({
  source: `/${e.slug}`,
  destination: `/services/local/${e.slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  // Allow the dev server's runtime (HMR + React Refresh) to be reached from
  // other devices on the LAN — without this, accessing the site via the
  // machine's IP (e.g. for same-WiFi demos) loads the HTML but blocks the
  // dev runtime, leaving the page non-interactive. localhost is allowed by
  // default; LAN IPs must be listed.
  allowedDevOrigins: ["192.168.1.149", "192.168.1.*", "*.local"],
  images: {
    // Vercel Image Optimization quota was exhausted (402
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED), which broke every uncached
    // image site-wide. Our assets are already pre-optimized: /public files are
    // right-sized WebP, Sanity URLs carry ?w=&auto=format (transformed free by
    // Sanity's CDN), and service photos are sharp-resized WebP. So we bypass
    // the Vercel optimizer entirely — images serve directly, no per-transform
    // billing, no outage. Revert (remove this line) if the plan is upgraded.
    unoptimized: true,
    // Keep optimized images cached for 31 days (default is only 4h). On a
    // low-traffic site the optimizer function goes cold and RE-optimizes every
    // few idle hours — that's the 8-17s "images take ages to appear" cold path.
    // A long TTL means each image/size is optimized once and then served from
    // the edge cache, so real visitors almost never hit the slow path.
    //
    // Safe because: /public assets are immutable (change the filename when you
    // swap one), and Sanity/Shopify images use content-hashed CDN URLs that
    // change when the asset changes — so nothing goes stale for the user's
    // content workflow.
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      // Live WordPress CDN — used by the Hearth until we migrate images into Sanity
      { protocol: "https", hostname: "willowalexander.co.uk", pathname: "/wp-content/**" },
      // Sanity asset CDN
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Shopify image CDN
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
  async redirects() {
    return [
      // Structural moves
      // "Marketplace" is the public label for the Shop.
      { source: "/marketplace", destination: "/shop", permanent: true },
      { source: "/marketplace/:path*", destination: "/shop/:path*", permanent: true },
      // The House overview hub was retired; the section's de-facto overview is
      // the About page, so the bare route lands there (301, 2026-06-26).
      { source: "/the-house", destination: "/the-house/about", permanent: true },
      // The Assistant is retired as a public product/tier/route (Directive v2
      // STEP 03): free is simply HoWA, and the address start lives on the
      // bridge. Companion points straight at /howa so we never chain redirects.
      { source: "/howa/assistant", destination: "/howa", permanent: true },
      { source: "/howa/companion", destination: "/howa", permanent: true },
      // HoWA+ retired; the consumer continuity tier is now Housekeeper (2026-06-18)
      { source: "/howa/plus", destination: "/howa/housekeeper", permanent: true },
      { source: "/protect/review", destination: "/protect/home-protection", permanent: true },
      { source: "/insurance", destination: "/protect/insurance", permanent: true },
      { source: "/press", destination: "/news", permanent: true },
      // Journal renamed to The Hearth (2026-05-14)
      { source: "/journal", destination: "/the-hearth", permanent: true },
      { source: "/journal/:slug*", destination: "/the-hearth/:slug*", permanent: true },
      // WordPress content types → new sections. Slugs were preserved in the
      // migration, so article/recipe/service URLs land on their exact new page.
      { source: "/howa-living", destination: "/the-hearth", permanent: true },
      { source: "/howa-living/:slug*", destination: "/the-hearth/:slug*", permanent: true },
      { source: "/recipe", destination: "/recipes", permanent: true },
      { source: "/recipe/:slug*", destination: "/recipes/:slug*", permanent: true },
      { source: "/service", destination: "/services", permanent: true },
      { source: "/service/:path*", destination: "/services/:path*", permanent: true },
      // Advice articles weren't migrated 1:1 yet — soft-land on the Hearth hub
      // (302) rather than hard-404 the old URLs / their backlinks.
      { source: "/advice", destination: "/the-hearth", permanent: false },
      { source: "/advice/:slug*", destination: "/the-hearth", permanent: false },
      // Legacy WordPress pages → their new homes.
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/our-story", destination: "/the-house/about", permanent: true },
      { source: "/accreditations", destination: "/the-house/standards", permanent: true },
      { source: "/sustainability", destination: "/the-house/sustainability", permanent: true },
      { source: "/garden-design", destination: "/design/gardens", permanent: true },
      { source: "/garden-design-3", destination: "/design/gardens", permanent: true },
      { source: "/interior-design", destination: "/design/interiors", permanent: true },
      { source: "/interior-design-2", destination: "/design/interiors", permanent: true },
      { source: "/interior-design-5", destination: "/design/interiors", permanent: true },
      { source: "/how-it-works", destination: "/howa/how-it-works", permanent: true },
      { source: "/join-howa", destination: "/howa", permanent: true },
      { source: "/howa-membership", destination: "/howa/housekeeper", permanent: true },
      { source: "/house-member-subscriptions", destination: "/howa/housekeeper", permanent: true },
      { source: "/howa-services", destination: "/services", permanent: true },
      { source: "/luxury-home-concierge", destination: "/howa", permanent: true },
      { source: "/the-house-companion", destination: "/howa/assistant", permanent: true },
      { source: "/house-companion-1", destination: "/howa/assistant", permanent: true },
      { source: "/house-plans", destination: "/steward-plans", permanent: true },
      { source: "/house-plans/property-managers", destination: "/steward-plans", permanent: true },
      { source: "/home-and-garden-services-subscriptions-packages", destination: "/steward-plans", permanent: true },
      { source: "/home-garden-subscriptions-how-works", destination: "/steward-plans", permanent: true },
      { source: "/commercial-property-management", destination: "/services", permanent: true },
      { source: "/airbnb-and-short-let", destination: "/services", permanent: true },
      { source: "/in-the-press", destination: "/news", permanent: true },
      { source: "/magazine", destination: "/the-hearth", permanent: true },
      { source: "/insurance-by-the-house", destination: "/protect/insurance", permanent: true },
      { source: "/home-protection-risk-reduction", destination: "/protect/home-protection", permanent: true },
      { source: "/privacy-policy", destination: "/legal/privacy", permanent: true },
      { source: "/cookie-policy", destination: "/legal/cookies", permanent: true },
      { source: "/gift-cards-2", destination: "/gift-cards", permanent: true },
      // Legacy WooCommerce shop pages → the marketplace.
      { source: "/shop-all", destination: "/shop", permanent: true },
      { source: "/sale", destination: "/shop", permanent: true },
      { source: "/basket", destination: "/shop", permanent: true },
      { source: "/checkout", destination: "/shop", permanent: true },
      { source: "/my-account", destination: "https://accounts.willowalexander.co.uk/", permanent: true },
      { source: "/:s([^/]*-shop)", destination: "/shop", permanent: true },
      // Sign-in moved to external accounts subdomain
      { source: "/sign-in", destination: "https://accounts.willowalexander.co.uk/", permanent: true },
      // Booking is a modal triggered by `#open-booking-form` from any page;
      // legacy /book-consultation now redirects to homepage with the trigger.
      { source: "/book-consultation", destination: "/#open-booking-form", permanent: true },
      // WP long-tail SEO catalogue
      ...wpLongTailRedirects,
      // WooCommerce → new shop URL mapping. The migration preserves slugs
      // 1:1, so external backlinks to any of these legacy patterns land on
      // the correct new product or collection. Permanent 301s pass equity.
      { source: "/product/:slug*", destination: "/shop/:slug*", permanent: true },
      { source: "/shop/product/:slug*", destination: "/shop/:slug*", permanent: true },
      // Nested WooCommerce category URLs (e.g. /product-category/outdoor-living/
      // garden-furniture) map to the FLAT child collection (the last segment),
      // since new-site collections are single-level. Must precede the generic
      // rule below, which would otherwise produce a 2-level path that 404s.
      { source: "/product-category/:a/:b/:c", destination: "/shop/collections/:c", permanent: true },
      { source: "/product-category/:a/:b", destination: "/shop/collections/:b", permanent: true },
      { source: "/product-category/:slug*", destination: "/shop/collections/:slug*", permanent: true },
      // Old WooCommerce product URLs carried the category in the path
      // (/shop/<category>/<product>); the new shop is flat (/shop/<handle>).
      // Redirect to the last segment. The (?!collections|rooms) guard keeps the
      // real /shop/collections/<handle> route AND the static room images
      // (/shop/rooms/<name>.webp) working. The `:handle([^/.]+)` constraint
      // excludes any segment with a file extension, so static assets under
      // /shop/<dir>/ (e.g. .webp images) are never swallowed by this redirect.
      { source: "/shop/:category((?!collections|rooms)[^/]+)/page/:n", destination: "/shop", permanent: true },
      { source: "/shop/:category((?!collections|rooms)[^/]+)/:handle([^/.]+)", destination: "/shop/:handle", permanent: true },
      // Old / alternate service slugs → the launch service hubs.
      { source: "/services/cleaners", destination: "/services/cleaning", permanent: true },
      { source: "/services/gardeners", destination: "/services/gardening", permanent: true },
      { source: "/services/window-cleaner", destination: "/services/window-cleaning", permanent: true },
      { source: "/services/gutter-cleaners", destination: "/services/gutter-cleaning", permanent: true },
      // (Handyman renders its own coming-soon page like removals/energy/pet-care,
      //  so it is NOT redirected to the hub — the nav links straight to it.)
      // Legacy location × service SEO pages that weren't migrated 1:1 (the
      // migrated set is handled by wp-long-tail above, which wins by order).
      // Route by service keyword to the right hub; anything else → /services.
      // These are LAST so the exact long-tail slugs match first.
      { source: "/:s([^/]*window[^/]*-in-[^/]*)", destination: "/services/window-cleaning", permanent: true },
      { source: "/:s([^/]*gutter[^/]*-in-[^/]*)", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/:s([^/]*garden[^/]*-in-[^/]*)", destination: "/services/gardening", permanent: true },
      { source: "/:s([^/]*clean[^/]*-in-[^/]*)", destination: "/services/cleaning", permanent: true },
      { source: "/:s([^/]*-in-[^/]*)", destination: "/services", permanent: true },
    ];
  },
  async headers() {
    // Security headers applied to every route. CSP is intentionally
    // wide on script-src because we load third-party measurement tags
    // (GA4, Clarity, Meta, Pinterest, Sentry, Vercel) — all of which are
    // user-gated via the consent system but still need to load from
    // their respective CDNs when enabled. Narrow only with caution; a
    // too-tight CSP silently breaks pixels and the cookie scan.
    // ServiceOS / OBF (the "Book through HoWA" booking widget) loads its client
    // script from accounts.willowalexander.co.uk and talks to *.serviceos.com.
    // These must be allowed in script/connect/frame/style/form or the widget
    // silently fails to open.
    const OBF = "https://accounts.willowalexander.co.uk https://willowalexander.serviceos.com https://*.serviceos.com";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.willowalexander.co.uk https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://connect.facebook.net https://s.pinimg.com https://ct.pinterest.com https://challenges.cloudflare.com https://*.sentry.io https://va.vercel-scripts.com https://static.klaviyo.com https://*.klaviyo.com`,
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.willowalexander.co.uk`,
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      `connect-src 'self' ${OBF} https://*.sanity.io https://cdn.sanity.io https://*.shopify.com https://*.supabase.co wss://*.supabase.co https://*.upstash.io https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://*.g.doubleclick.net https://www.google.com https://www.google.co.uk https://www.clarity.ms https://*.clarity.ms https://*.facebook.com https://ct.pinterest.com https://*.ingest.sentry.io https://vitals.vercel-insights.com https://va.vercel-scripts.com https://a.klaviyo.com https://static.klaviyo.com https://*.klaviyo.com`,
      `frame-src 'self' ${OBF} https://challenges.cloudflare.com https://www.facebook.com`,
      "frame-ancestors 'none'",
      `form-action 'self' ${OBF}`,
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      // Belt-and-braces noindex for admin / preview surfaces, in addition to
      // robots.txt disallow. Stops staging URLs being indexed if shared.
      {
        source: "/studio/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/preview/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

/**
 * Sentry wrapper. No-ops at build time when SENTRY_AUTH_TOKEN isn't set
 * (local dev, contributors without org access). In CI/Vercel with the
 * token + org/project set, this uploads source maps + injects release
 * tags so client stack traces map back to readable source.
 */
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Delete source map files from .next/ after uploading them to Sentry, so
  // they're not served publicly. This is the default in @sentry/nextjs 10+
  // but we set it explicitly to make the intent obvious.
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  // Silence the noisy build-time progress logs unless we ask for them.
  silent: !process.env.CI,
  // No telemetry to Sentry's own usage tracker.
  telemetry: false,
});
