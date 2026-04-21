import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * Sitemap. Static routes at launch.
 * Spec: PLAN.md §15 Finding O4.
 *
 * Once Sanity + Shopify are wired up, fetch slugs and append:
 *   - partner docs      → /partners/[slug]
 *   - article docs      → /journal/[slug]
 *   - service docs      → /services/[slug]
 *   - servicePackage    → /howa/plans#[slug]
 *   - Shopify products  → /shop/[handle]
 *   - Shopify collections → /shop/collections/[handle]
 *
 * Split into /sitemap-{type}.xml once any bucket exceeds ~1000 URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/the-house`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/the-house/philosophy`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/standards`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/proof`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/sustainability`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/howa`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/howa/companion`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/howa/plans`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/howa/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/design`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/interiors`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/gardens`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services/gardening`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/window-cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/gutter-cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/protect`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/book-consultation`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  return staticRoutes;
}
