import type { NextConfig } from "next";
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
      // WP long-tail SEO catalogue
      ...wpLongTailRedirects,
    ];
  },
};

export default nextConfig;
