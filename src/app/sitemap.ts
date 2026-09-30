import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import wpLongTail from "@/lib/services-data/wp-long-tail.json";
import { allLocationSlugs } from "@/lib/services-data/locations";
import { getCmsSitemapEntries } from "@/lib/sitemap-slugs";
import { SERVICES, SERVICE_ORDER, type ServiceSlug } from "@/lib/services-data";
import {
  SPECIALIST_SLUGS,
  EVERYDAY_SPECIALIST_SLUGS,
  BUSINESS_SPECIALIST_SUB_SLUGS,
} from "@/lib/insurance/specialist-pages";
import { GUIDE_SLUGS } from "@/lib/insurance/guides";
import { GARDEN_PROJECTS } from "@/lib/gardens-projects";

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
    { url: `${base}/the-house/proof`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/the-house/artwork`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // ---- HoWA ----
    { url: `${base}/howa`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/howa/ask`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/howa/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/howa/plans`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/howa/steward`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/howa/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/howa/house-customers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // ---- Design ----
    { url: `${base}/design`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/interiors`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/design/gardens`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // ---- Services ----
    // The hub; all main service pages are generated below from SERVICE_ORDER
    // (every /services/[slug] is an indexable canonical page). The standalone
    // /services/home-and-garden route is added there too.
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },


    // ---- Insurance & Cover ----
    // /protect/* now 301/307 to /insurance/*, so the canonical /insurance pages
    // are listed here (never the redirecting /protect URLs). Dynamic covers
    // (specialist / everyday / business / guides) are appended below.
    { url: `${base}/insurance`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/insurance/everyday`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/insurance/private-client`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/insurance/business`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/insurance/home-protection`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/insurance/how-this-works`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/insurance/claims-and-help`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/insurance/speak-to-a-specialist`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/insurance/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },

    // ---- Shop ----
    { url: `${base}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/shop/all`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/shop/collections`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },

    // ---- The Hearth (Journal + free reading) ----
    { url: `${base}/the-hearth`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/musings`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/recipes`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },

    // ---- Utility & editorial (live pages; /house-credit + /gift-cards removed —
    //      they now redirect, so they must not appear here) ----
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/my-house`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/offers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/cinema`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/the-unordinary`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // ---- Legal ----
    { url: `${base}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/delivery`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/returns`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // ---- Service × town local pages (152: 4 launch services × 38 towns) ----
  const locationRoutes: MetadataRoute.Sitemap = allLocationSlugs().map((slug) => ({
    url: `${base}/services/local/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // ---- WP long-tail SEO catalogue: ONLY the live ones. The rest render
  //      noindex ("coming soon" doorway pages), so they must not be in the
  //      sitemap (audit: 175 noindex URLs listed). ----
  const longTailRoutes: MetadataRoute.Sitemap = (
    wpLongTail as Array<{ slug: string; live?: boolean }>
  )
    .filter((e) => e.live)
    .map((e) => ({
      url: `${base}/services/local/${e.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    }));

  // ---- Garden design case studies (/design/gardens/projects/[slug]) ----
  const gardenProjectRoutes: MetadataRoute.Sitemap = GARDEN_PROJECTS.map((p) => ({
    url: `${base}/design/gardens/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // ---- Insurance covers (specialist property, everyday, business, guides) ----
  const insurancePaths = [
    ...SPECIALIST_SLUGS.map((s) => `/insurance/${s}`),
    ...EVERYDAY_SPECIALIST_SLUGS.map((s) => `/insurance/everyday/${s}`),
    ...BUSINESS_SPECIALIST_SUB_SLUGS.map((s) => `/insurance/business/${s}`),
    ...GUIDE_SLUGS.map((s) => `/insurance/guides/${s}`),
  ];
  const insuranceRoutes: MetadataRoute.Sitemap = insurancePaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // ---- Service sub-services (/services/[slug]/[sub]) ----
  const subServiceRoutes: MetadataRoute.Sitemap = SERVICE_ORDER.flatMap((slug: ServiceSlug) =>
    (SERVICES[slug]?.subServices ?? []).map((sub) => ({
      url: `${base}/services/${slug}/${sub.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  );

  // ---- Main service pages (every /services/[slug] is indexable) ----
  const serviceRoutes: MetadataRoute.Sitemap = [
    ...SERVICE_ORDER.map((slug) => `/services/${slug}`),
    "/services/home-and-garden",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // ---- The Hearth category pages ----
  const HEARTH_CATEGORY_SLUGS = [
    "colour-and-materials",
    "design-and-architecture",
    "gardens-and-exteriors",
    "heritage-and-culture",
    "interiors-and-styling",
    "trends-and-inspiration",
  ];
  const hearthCategoryRoutes: MetadataRoute.Sitemap = HEARTH_CATEGORY_SLUGS.map((s) => ({
    url: `${base}/the-hearth/category/${s}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // CMS/Shopify slugs, minus URLs that 404 or redirect (audit #5): two derived
  // collections with no page, and the duplicate "-2" wreath musing (301s to the
  // canonical post).
  const cmsRoutes = (await getCmsSitemapEntries(base)).filter((e) => {
    const u = e.url;
    // Non-product / back-office collections that must never be indexed.
    if (u.endsWith("/shop/collections/services")) return false;
    if (u.endsWith("/shop/collections/migration-review")) return false;
    if (u.endsWith("/shop/collections/gift-cards")) return false;
    if (u.endsWith("/shop/collections/gift-card")) return false;
    if (u.includes("-foraged-seasonal-blooms-2")) return false;
    return true;
  });

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...hearthCategoryRoutes,
    ...insuranceRoutes,
    ...subServiceRoutes,
    ...gardenProjectRoutes,
    ...locationRoutes,
    ...longTailRoutes,
    ...cmsRoutes,
  ];
}
