import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * robots.txt for the marketing site.
 *
 * Default rule: allow user-facing pages; disallow machine/admin paths and the
 * crawl traps that inflate edge requests when several bots crawl at once
 * (2026-09 usage anomaly: /shop filtered/paginated URLs + WordPress probe paths).
 *
 *  - /api/, /studio/, /howa/coming-soon  -> no SEO value
 *  - /shop?*  (and other query-string listings) -> faceted/sort/paginated crawl
 *    traps; the canonical /shop and /shop/[handle] pages stay indexable
 *  - /wp-json/, /wp-admin/, /wp-login.php, /xmlrpc.php, /wp-content/ -> old
 *    WooCommerce/WordPress endpoints bots keep probing (all 404 now)
 *
 * Junk SEO scrapers (no traffic value) are disallowed outright. robots.txt is
 * advisory — bots that ignore it are hard-blocked in the Vercel Firewall (see
 * VERCEL-FIREWALL-RULES handover).
 */
export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

  const machineAndTraps = [
    "/api/",
    "/studio/",
    "/howa/coming-soon",
    // Crawl traps: query-string listing variants (filters, sort, pagination).
    "/shop?",
    "/*?sort=",
    "/*?filter=",
    "/*?page=",
    // Old WordPress / WooCommerce probe paths (all 404).
    "/wp-json/",
    "/wp-admin/",
    "/wp-login.php",
    "/xmlrpc.php",
    "/wp-content/",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: machineAndTraps,
      },
      {
        // No traffic value; block outright (Firewall enforces for bots that
        // ignore robots.txt).
        userAgent: [
          "SEranking",
          "SEranking-backlinks",
          "shapbot",
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "DataForSeoBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
