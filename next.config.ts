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
  images: {
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
      { source: "/protect/review", destination: "/protect/home-protection", permanent: true },
      { source: "/insurance", destination: "/protect/insurance", permanent: true },
      { source: "/press", destination: "/news", permanent: true },
      // Journal renamed to The Hearth (2026-05-14)
      { source: "/journal", destination: "/the-hearth", permanent: true },
      { source: "/journal/:slug*", destination: "/the-hearth/:slug*", permanent: true },
      // Sign-in moved to external accounts subdomain
      { source: "/sign-in", destination: "https://accounts.willowalexander.co.uk/", permanent: true },
      // Booking is a modal triggered by `#open-booking-form` from any page;
      // legacy /book-consultation now redirects to homepage with the trigger.
      { source: "/book-consultation", destination: "/#open-booking-form", permanent: true },
      // WP long-tail SEO catalogue
      ...wpLongTailRedirects,
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
