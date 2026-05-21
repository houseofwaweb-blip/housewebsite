import "server-only";
import { sanityFetch } from "./fetch";
import { servicesReady } from "@/lib/env";

/**
 * Shop product queries against Sanity.
 *
 * Catalogue-only at launch — these are presentation-layer queries that
 * mirror the existing static `woo-catalogue.json` shape so the swap is
 * a drop-in replacement. When Shopify is wired later, this whole module
 * gets replaced with the equivalent Shopify Storefront client calls and
 * pages don't change.
 *
 * Every function is failure-tolerant: returns null / [] on Sanity
 * outage so the rest of the site keeps rendering.
 */

export interface SanityProduct {
  _id: string;
  title: string;
  handle: string;
  lede: string | null;
  body: unknown[] | null;
  collection: string | null;
  brand: string | null;
  houseApproved: boolean;
  priceMinor: number;
  compareAtMinor: number | null;
  currency: string;
  sku: string | null;
  availability:
    | "available_soon"
    | "in_stock"
    | "preorder"
    | "out_of_stock"
    | "discontinued";
  onSale: boolean;
  primaryImageUrl: string | null;
  primaryImageAlt: string | null;
  galleryUrls: Array<{ url: string; alt: string | null }>;
  careNotes: string | null;
  materials: string | null;
  dimensions: string | null;
  delivery: string | null;
  relatedHandles: string[];
  sourceWooSlug: string | null;
}

// GROQ projection — keep this in lockstep with SanityProduct above.
const PRODUCT_PROJECTION = /* groq */ `
  _id,
  title,
  "handle": handle.current,
  lede,
  body,
  collection,
  brand,
  houseApproved,
  priceMinor,
  compareAtMinor,
  currency,
  sku,
  availability,
  onSale,
  "primaryImageUrl": primaryImage.asset->url,
  "primaryImageAlt": primaryImage.alt,
  "galleryUrls": gallery[]{
    "url": asset->url,
    "alt": alt
  },
  careNotes,
  materials,
  dimensions,
  delivery,
  "relatedHandles": relatedProducts[]->handle.current,
  sourceWooSlug
`;

/** All products. Default ordering: House Approved first, then title. */
export async function getAllProducts(): Promise<SanityProduct[]> {
  if (!servicesReady.sanity) return [];
  try {
    return await sanityFetch<SanityProduct[]>({
      query: /* groq */ `*[_type == "product"] | order(houseApproved desc, title asc){${PRODUCT_PROJECTION}}`,
      tags: ["product"],
    });
  } catch (e) {
    console.error("[cms/products] getAllProducts", e);
    return [];
  }
}

/** Single product by handle. */
export async function getProductByHandle(
  handle: string,
): Promise<SanityProduct | null> {
  if (!servicesReady.sanity) return null;
  try {
    return await sanityFetch<SanityProduct | null>({
      query: /* groq */ `*[_type == "product" && handle.current == $handle][0]{${PRODUCT_PROJECTION}}`,
      params: { handle },
      tags: [`product:${handle}`, "product"],
    });
  } catch (e) {
    console.error("[cms/products] getProductByHandle", handle, e);
    return null;
  }
}

/** All product handles (for sitemap + static generation). */
export async function getAllProductHandles(): Promise<string[]> {
  if (!servicesReady.sanity) return [];
  try {
    const rows = await sanityFetch<Array<{ handle: string }>>({
      query: /* groq */ `*[_type == "product" && defined(handle.current)]{"handle": handle.current}`,
      tags: ["product"],
    });
    return rows.map((r) => r.handle);
  } catch {
    return [];
  }
}

/** Distinct collection names with product counts. */
export async function getCollectionsWithCounts(): Promise<
  Array<{ name: string; count: number }>
> {
  if (!servicesReady.sanity) return [];
  try {
    const rows = await sanityFetch<Array<{ name: string; count: number }>>({
      query: /* groq */ `
        *[_type == "product" && defined(collection)] {
          collection
        } | order(collection asc) {
          "name": collection,
          "count": count(*[_type == "product" && collection == ^.collection])
        }
      `,
      tags: ["product"],
    });
    // De-duplicate — the GROQ above repeats rows; reduce to unique names
    const seen = new Map<string, number>();
    for (const row of rows) {
      if (row.name && !seen.has(row.name)) seen.set(row.name, row.count);
    }
    return Array.from(seen, ([name, count]) => ({ name, count }));
  } catch (e) {
    console.error("[cms/products] getCollectionsWithCounts", e);
    return [];
  }
}

/** Products in a collection. Collection slugified for URL stability. */
export async function getProductsByCollection(
  collectionSlug: string,
): Promise<SanityProduct[]> {
  if (!servicesReady.sanity) return [];
  try {
    return await sanityFetch<SanityProduct[]>({
      query: /* groq */ `
        *[_type == "product" && lower(collection) == lower($collection) ||
          _type == "product" && lower(collection) match $collectionMatch]
        | order(houseApproved desc, title asc)
        {${PRODUCT_PROJECTION}}
      `,
      params: {
        collection: collectionSlug.replace(/-/g, " "),
        collectionMatch: `${collectionSlug.replace(/-/g, " ")}*`,
      },
      tags: ["product"],
    });
  } catch (e) {
    console.error("[cms/products] getProductsByCollection", collectionSlug, e);
    return [];
  }
}

/** Source-of-truth WP slug → new handle map, for redirect generation. */
export async function getWooSlugMap(): Promise<
  Array<{ wooSlug: string; handle: string }>
> {
  if (!servicesReady.sanity) return [];
  try {
    return await sanityFetch<Array<{ wooSlug: string; handle: string }>>({
      query: /* groq */ `*[_type == "product" && defined(sourceWooSlug) && defined(handle.current)]{
        "wooSlug": sourceWooSlug,
        "handle": handle.current
      }`,
      tags: ["product"],
    });
  } catch {
    return [];
  }
}
