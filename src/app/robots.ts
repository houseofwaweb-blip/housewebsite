import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * robots.txt for the marketing site.
 *  - Allow everything user-facing by default
 *  - Disallow /api/ (machine endpoints, no SEO value)
 *  - Disallow /studio (Sanity admin)
 *  - Disallow /howa/coming-soon (fallback page, shouldn't compete with live /howa)
 *  - Point at the sitemap
 */
export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/", "/howa/coming-soon"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
