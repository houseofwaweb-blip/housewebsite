import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import wpLongTail from "@/lib/services-data/wp-long-tail.json";
import { getCmsSitemapEntries } from "@/lib/sitemap-slugs";

/**
 * Sitemap. Static routes + WP long-tail catalogue.
 * Spec: PLAN.md §15 Finding O4.
 *
 * Once Sanity + Shopify are wired up, fetch slugs and append:
 *   - partner docs      → /partners/[slug]
 *   - article docs      → /the-hearth/[slug]
 *   - newsItem docs     → /news/[slug]
 *   - musing docs       → /musings/[slug]
 *   - recipe docs       → /recipes/[slug]
 *   - servicePackage    → /howa/plans#[slug]
 *   - Shopify products  → /shop/[handle]
 *   - Shopify collections → /shop/collections/[handle]
 *   - stewardPlan docs  → /steward-plans/[slug]
 *
 * Split into /sitemap-{type}.xml once any bucket exceeds ~1000 URLs.
 *
 * CMS slugs are merged via getCmsSitemapEntries() — that helper is failure-
 * tolerant, so a Sanity or Shopify outage will degrade the sitemap to
 * static + WP long-tail rather than 500ing the whole route.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    // ---- Homepage ----
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },

    // ---- The House ----
    { url: `${base}/the-house`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/the-house/philosophy`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/standards`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/proof`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/sustainability`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/artwork`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // ---- HoWA ----
    { url: `${base}/howa`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/howa/assistant`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/howa/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/howa/plans`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/howa/plus`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/howa/steward`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/howa/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // ---- Design ----
    { url: `${base}/design`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/interiors`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/gardens`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/studios`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // ---- Services (4 launch) ----
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services/gardening`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/window-cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/gutter-cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // ---- Steward Plans (managed recurring care) ----
    { url: `${base}/steward-plans`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },

    // ---- Protect ----
    { url: `${base}/protect`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/protect/home-protection`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/protect/insurance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // ---- Shop ----
    { url: `${base}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.8 },

    // ---- The Hearth (Journal + free reading) ----
    { url: `${base}/the-hearth`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/musings`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/recipes`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },

    // ---- Partners ----
    { url: `${base}/partners`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // ---- Utility ----
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/house-credit`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/gift-cards`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // ---- Legal ----
    { url: `${base}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // ---- WP long-tail SEO catalogue (175 service-area pages) ----
  const longTailRoutes: MetadataRoute.Sitemap = (
    wpLongTail as Array<{ slug: string }>
  ).map((e) => ({
    url: `${base}/services/local/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const cmsRoutes = await getCmsSitemapEntries(base);

  return [...staticRoutes, ...longTailRoutes, ...cmsRoutes];
}
