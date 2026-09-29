import "server-only";
import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/cms/client";
import { env } from "@/lib/env";

/**
 * Sitemap slug fetchers for Sanity + Shopify content.
 *
 * Each fetcher is wrapped in try/catch and returns [] on failure. The
 * sitemap is built on every cron / on-demand revalidation, and a single
 * upstream blip should never blank the whole sitemap — better to ship a
 * sitemap missing the newest /the-hearth article than no sitemap at all.
 *
 * When the relevant env keys aren't set (dev without Sanity/Shopify), we
 * short-circuit and return [] without hitting the network.
 */

type SitemapEntry = MetadataRoute.Sitemap[number];

interface Slug {
  slug: string;
  _updatedAt?: string;
}

interface ShopifyHandle {
  handle: string;
  updatedAt?: string;
}

async function fetchSanitySlugs(type: string): Promise<Slug[]> {
  if (!env.SANITY_PROJECT_ID) return [];
  try {
    const query = `*[_type == $type && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt }`;
    return await sanityClient.fetch<Slug[]>(query, { type });
  } catch (e) {
    console.warn(`[sitemap] failed to fetch Sanity slugs for ${type}:`, e instanceof Error ? e.message : e);
    return [];
  }
}

/**
 * Product handles are stored under `handle.current` (a slug field), not
 * `slug.current` like other content types — needs its own fetcher.
 * Includes a per-collection slug derivation so the /shop/collections/<slug>
 * URLs end up in the sitemap too without a separate document type.
 */
async function fetchSanityProductHandles(): Promise<{
  products: Slug[];
  collections: Slug[];
}> {
  if (!env.SANITY_PROJECT_ID) return { products: [], collections: [] };
  try {
    const [products, collectionRows] = await Promise.all([
      sanityClient.fetch<Slug[]>(
        `*[_type == "product" && defined(handle.current) && !(_id in path("drafts.**"))]{ "slug": handle.current, _updatedAt }`,
      ),
      sanityClient.fetch<Array<{ collection: string; _updatedAt: string }>>(
        `*[_type == "product" && defined(collection)]{ collection, _updatedAt } | order(_updatedAt desc)`,
      ),
    ]);
    // De-duplicate collections by slug; keep the most recent _updatedAt
    const seen = new Map<string, string>();
    for (const row of collectionRows) {
      const slug = row.collection.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      if (!seen.has(slug)) seen.set(slug, row._updatedAt);
    }
    const collections: Slug[] = Array.from(seen, ([slug, _updatedAt]) => ({ slug, _updatedAt }));
    return { products, collections };
  } catch (e) {
    console.warn(`[sitemap] failed to fetch Sanity product handles:`, e instanceof Error ? e.message : e);
    return { products: [], collections: [] };
  }
}

async function fetchShopifyHandles(): Promise<{
  products: ShopifyHandle[];
  collections: ShopifyHandle[];
}> {
  if (!env.SHOPIFY_STORE_DOMAIN || !env.SHOPIFY_STOREFRONT_TOKEN) {
    return { products: [], collections: [] };
  }
  try {
    // 250 is the Storefront API page max, and there are ~481 products — so we
    // MUST paginate, or the sitemap silently drops everything past the first
    // page (Google Shopping brief, Task 3). Products page through by cursor;
    // collections fit in one page.
    const endpoint = `https://${env.SHOPIFY_STORE_DOMAIN}/api/2025-04/graphql.json`;
    const call = (query: string) =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_TOKEN!,
        },
        body: JSON.stringify({ query }),
        next: { tags: ["sitemap:shopify"], revalidate: 604800 },
      });

    const products: ShopifyHandle[] = [];
    let cursor: string | null = null;
    // Cap the loop so a pagination bug can't spin forever (50 pages = 12,500).
    for (let i = 0; i < 50; i++) {
      const after: string = cursor ? `, after: ${JSON.stringify(cursor)}` : "";
      const res = await call(`query {
        products(first: 250${after}) {
          pageInfo { hasNextPage endCursor }
          nodes { handle updatedAt }
        }
      }`);
      if (!res.ok) throw new Error(`Shopify ${res.status}`);
      const json = (await res.json()) as {
        data?: { products?: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: ShopifyHandle[] } };
      };
      const page = json.data?.products;
      if (!page) break;
      products.push(...page.nodes);
      if (!page.pageInfo.hasNextPage || !page.pageInfo.endCursor) break;
      cursor = page.pageInfo.endCursor;
    }

    const colRes = await call(`query {
      collections(first: 250) { nodes { handle updatedAt } }
    }`);
    const colJson = colRes.ok
      ? ((await colRes.json()) as { data?: { collections?: { nodes: ShopifyHandle[] } } })
      : { data: undefined };

    return {
      products,
      collections: colJson.data?.collections?.nodes ?? [],
    };
  } catch (e) {
    console.warn(`[sitemap] failed to fetch Shopify handles:`, e instanceof Error ? e.message : e);
    return { products: [], collections: [] };
  }
}

/**
 * Fetch every CMS / commerce slug in parallel and shape them into sitemap entries.
 */
export async function getCmsSitemapEntries(base: string): Promise<SitemapEntry[]> {
  // servicePackage docs are intentionally not surfaced as standalone URLs —
  // they render as anchors on /howa/plans, not their own pages. Add them
  // here only if we ever publish per-package landing pages.
  // partner docs are intentionally NOT surfaced — the /partners route tree is
  // retired (Aug-17 spec has no partners page; the House owns its service
  // brands rather than listing third-party providers).
  const [articles, musings, newsItems, recipes, stewardPlans, shopify, sanityProducts] =
    await Promise.all([
      fetchSanitySlugs("article"),
      fetchSanitySlugs("musing"),
      fetchSanitySlugs("newsItem"),
      fetchSanitySlugs("recipe"),
      fetchSanitySlugs("stewardPlan"),
      fetchShopifyHandles(),
      fetchSanityProductHandles(),
    ]);

  const toEntry = (
    path: string,
    slug: string,
    updatedAt: string | undefined,
    changeFrequency: SitemapEntry["changeFrequency"],
    priority: number,
  ): SitemapEntry => ({
    url: `${base}${path}/${slug}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency,
    priority,
  });

  return [
    ...articles.map((a) => toEntry("/the-hearth", a.slug, a._updatedAt, "monthly", 0.6)),
    ...musings.map((m) => toEntry("/musings", m.slug, m._updatedAt, "monthly", 0.5)),
    ...newsItems.map((n) => toEntry("/news", n.slug, n._updatedAt, "monthly", 0.5)),
    ...recipes.map((r) => toEntry("/recipes", r.slug, r._updatedAt, "monthly", 0.5)),
    ...stewardPlans.map((s) => toEntry("/steward-plans", s.slug, s._updatedAt, "monthly", 0.5)),
    ...shopify.products.map((p) =>
      toEntry("/shop", p.handle, p.updatedAt, "weekly", 0.7),
    ),
    ...shopify.collections.map((c) =>
      toEntry("/shop/collections", c.handle, c.updatedAt, "weekly", 0.6),
    ),
    // Sanity-backed catalogue (when Shopify isn't live)
    ...sanityProducts.products.map((p) =>
      toEntry("/shop", p.slug, p._updatedAt, "weekly", 0.6),
    ),
    ...sanityProducts.collections.map((c) =>
      toEntry("/shop/collections", c.slug, c._updatedAt, "weekly", 0.5),
    ),
  ];
}

