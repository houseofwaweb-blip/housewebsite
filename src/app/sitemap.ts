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
    // v4 §6 — customer standards page. Replaces any "House Approved Partners"
    // page; professional recruitment lives on the HoWA site.
    { url: `${base}/the-house/how-we-choose`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/artwork`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // ---- HoWA (REVISIONS v3 §6) ----
    // Only the House-context page belongs to this site. Every /howa/* product
    // page (plans, tiers, Assistant, Steward, FAQ) 301s to howa.co.uk, so
    // listing them here would advertise redirects.
    { url: `${base}/howa`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },

    // ---- Design ----
    { url: `${base}/design`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/interiors`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/gardens`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/studios`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // ---- Services (v3 §5: the whole-home catalogue, not four) ----
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services/gardening`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/window-cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/gutter-cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/services/handyman`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // v3 §9 — /steward-plans is removed and 301s to /services. It must not be
    // indexed, linked from the footer, or left on old service cards.

    // ---- Insurance (v3 §8: hub + two dedicated journeys) ----
    { url: `${base}/insurance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/insurance/home`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/insurance/pet`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

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
