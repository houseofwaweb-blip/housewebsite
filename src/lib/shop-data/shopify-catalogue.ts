import "server-only";
import { cache } from "react";
import { env } from "@/lib/env";
import type {
  CatalogueProduct,
  CatalogueCollection,
  CatalogueBrand,
} from "./catalogue";

/**
 * Live Shopify catalogue loader.
 *
 * One Storefront API request fetches all collections (with their products)
 * plus the full product list, then derives everything the shop pages need
 * in the existing `CatalogueProduct` shape — so `source.ts` can swap to
 * Shopify without touching any page.
 *
 * Read-only: never writes to the store. Cached per-request via React
 * `cache()` and across requests via the Next fetch cache (revalidate 1 week).
 */

const API_VERSION = "2025-04";

/** The 11 top-level categories. Sub-collections (tag-driven) are everything else. */
const MAIN_COLLECTION_HANDLES = new Set([
  "apparel", "home-accessories", "household-essentials", "gardening",
  "outdoor-living", "pet-care", "gifts-stationery", "books",
  "soft-furnishings", "furniture-storage", "lighting",
]);

const CAT_FIELDS = /* GraphQL */ `
  fragment CatFields on Product {
    handle
    title
    description
    seo { title description }
    vendor
    availableForSale
    tags
    featuredImage { url altText }
    images(first: 8) { nodes { url altText } }
    priceRange { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount currencyCode } }
    variants(first: 2) { nodes { id sku } }
    whyChosen: metafield(namespace: "howa", key: "editorialCopy") { value }
    houseApprovedMeta: metafield(namespace: "howa", key: "houseApproved") { value }
  }
`;

// Collections fetch only product HANDLES, not full product data. Full product
// records come once each from PRODUCTS_QUERY; we join them back by handle. This
// avoids re-sending every product's description + images for each of the ~45
// collections it belongs to — the duplication that blew the response past
// Next's 2MB data-cache limit (the "items over 2MB can not be cached" error).
const COLLECTIONS_QUERY = /* GraphQL */ `
  query ShopCollections {
    collections(first: 100) {
      nodes {
        handle
        title
        products(first: 250) { nodes { handle } }
      }
    }
  }
`;

const PRODUCTS_QUERY = /* GraphQL */ `
  ${CAT_FIELDS}
  query ShopProducts($cursor: String) {
    products(first: 100, after: $cursor) {
      nodes { ...CatFields }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

interface MoneyV {
  amount: string;
  currencyCode: string;
}
interface SfProduct {
  handle: string;
  title: string;
  description: string;
  seo: { title: string | null; description: string | null } | null;
  vendor: string;
  availableForSale: boolean;
  tags: string[];
  featuredImage: { url: string; altText: string | null } | null;
  images: { nodes: Array<{ url: string; altText: string | null }> };
  priceRange: { minVariantPrice: MoneyV };
  compareAtPriceRange: { minVariantPrice: MoneyV };
  variants: { nodes: Array<{ id: string; sku: string | null }> };
  whyChosen: { value: string | null } | null;
  houseApprovedMeta: { value: string | null } | null;
}
interface CatalogueData {
  collections: {
    // Collections carry only product handles now; full records join via byHandle.
    nodes: Array<{ handle: string; title: string; products: { nodes: Array<{ handle: string }> } }>;
  };
}

function money(m: MoneyV): string {
  const n = parseFloat(m.amount);
  if (!Number.isFinite(n)) return "";
  const body = n.toFixed(2).replace(/\.00$/, "");
  if (m.currencyCode === "GBP") return `£${body}`;
  if (m.currencyCode === "USD") return `$${body}`;
  if (m.currencyCode === "EUR") return `€${body}`;
  return `${body} ${m.currencyCode}`;
}

function firstLine(desc: string, max = 150): string {
  const line = (desc ?? "").split("\n").map((l) => l.trim()).find(Boolean) ?? "";
  return line.length > max ? `${line.slice(0, max - 1).trimEnd()}…` : line;
}

function mapProduct(p: SfProduct, collection: string): CatalogueProduct {
  const price = money(p.priceRange.minVariantPrice);
  const compareAmount = parseFloat(p.compareAtPriceRange?.minVariantPrice?.amount ?? "0");
  const priceAmount = parseFloat(p.priceRange.minVariantPrice.amount);
  const onSale = Number.isFinite(compareAmount) && compareAmount > priceAmount;
  const imageNodes =
    p.images.nodes.length > 0
      ? p.images.nodes
      : p.featuredImage
        ? [p.featuredImage]
        : [];
  return {
    handle: p.handle,
    title: p.title,
    price,
    compareAtPrice: onSale ? money(p.compareAtPriceRange.minVariantPrice) : undefined,
    image: p.featuredImage?.url ?? imageNodes[0]?.url ?? "",
    images: imageNodes.map((i) => ({ src: i.url, alt: i.altText ?? p.title })),
    collection,
    houseApproved: p.houseApprovedMeta?.value === "true",
    whyChosen: p.whyChosen?.value || undefined,
    lede: firstLine(p.description),
    body: p.description ?? "",
    seoTitle: p.seo?.title || undefined,
    seoDescription: p.seo?.description || undefined,
    brand: p.vendor ?? "",
    sku: p.variants.nodes[0]?.sku ?? "",
    inStock: p.availableForSale,
    onSale,
    variantId: p.variants.nodes[0]?.id,
    multiVariant: p.variants.nodes.length > 1,
  };
}

export interface ShopifyCatalogue {
  products: CatalogueProduct[];
  byHandle: Map<string, CatalogueProduct>;
  collections: CatalogueCollection[];
  collectionProducts: Map<string, CatalogueProduct[]>;
  brands: CatalogueBrand[];
}

/**
 * Load + derive the full catalogue from Shopify. Returns null if Shopify
 * isn't configured or the request fails, so callers can fall back.
 * Memoised per request.
 */
export const loadShopifyCatalogue = cache(async (): Promise<ShopifyCatalogue | null> => {
  if (!env.SHOPIFY_STORE_DOMAIN || !env.SHOPIFY_STOREFRONT_TOKEN) return null;
  try {
    const endpoint = `https://${env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;
    const sf = async (query: string, variables: Record<string, unknown> = {}) => {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_TOKEN as string,
        },
        body: JSON.stringify({ query, variables }),
        next: { tags: ["shopify:catalogue"], revalidate: 604800 },
      });
      if (!res.ok) return null;
      const json = (await res.json()) as { data?: unknown };
      return json.data ?? null;
    };

    const colData = (await sf(COLLECTIONS_QUERY)) as CatalogueData | null;
    if (!colData) return null;
    const collectionNodes = colData.collections.nodes;

    // Every product, paginated (the store has 500+; one page caps at 250).
    const allProducts: SfProduct[] = [];
    let cursor: string | null = null;
    do {
      const pd = (await sf(PRODUCTS_QUERY, { cursor })) as
        | { products: { nodes: SfProduct[]; pageInfo: { hasNextPage: boolean; endCursor: string } } }
        | null;
      if (!pd) break;
      allProducts.push(...pd.products.nodes);
      cursor = pd.products.pageInfo.hasNextPage ? pd.products.pageInfo.endCursor : null;
    } while (cursor && allProducts.length < 5000);

    // A product's category label = its MAIN collection (not one of the 45 tag
    // sub-collections), so tiles and the filter rail show "Lighting", not
    // "Ceiling Lights". Sub-collection pages still work via collectionProducts.
    const handleToCollection = new Map<string, string>();
    // ALL main-category handles a product is in (a product can be in several).
    const handleToCollectionHandles = new Map<string, string[]>();
    for (const c of collectionNodes) {
      if (!MAIN_COLLECTION_HANDLES.has(c.handle)) continue;
      for (const p of c.products.nodes) {
        if (!handleToCollection.has(p.handle)) handleToCollection.set(p.handle, c.title);
        const arr = handleToCollectionHandles.get(p.handle) ?? [];
        if (!arr.includes(c.handle)) arr.push(c.handle);
        handleToCollectionHandles.set(p.handle, arr);
      }
    }

    const products = allProducts.map((p) => {
      const mapped = mapProduct(p, handleToCollection.get(p.handle) ?? "");
      mapped.collectionHandles = handleToCollectionHandles.get(p.handle) ?? [];
      return mapped;
    });
    const byHandle = new Map(products.map((p) => [p.handle, p]));

    const collections: CatalogueCollection[] = collectionNodes.map((c) => ({
      handle: c.handle,
      title: c.title,
      productCount: c.products.nodes.length,
    }));
    // Join collection product handles back to the full records from byHandle
    // (rather than re-mapping duplicated embedded data, which we no longer fetch).
    const collectionProducts = new Map<string, CatalogueProduct[]>(
      collectionNodes.map((c) => [
        c.handle,
        c.products.nodes
          .map((n) => byHandle.get(n.handle))
          .filter((p): p is CatalogueProduct => Boolean(p)),
      ]),
    );

    const brandCounts = new Map<string, number>();
    for (const p of products) {
      if (p.brand) brandCounts.set(p.brand, (brandCounts.get(p.brand) ?? 0) + 1);
    }
    const brands: CatalogueBrand[] = [...brandCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return { products, byHandle, collections, collectionProducts, brands };
  } catch {
    return null;
  }
});

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: string;
}

const VARIANTS_QUERY = /* GraphQL */ `
  query ProductVariants($handle: String!) {
    product(handle: $handle) {
      variants(first: 50) {
        nodes { id title availableForSale price { amount currencyCode } }
      }
    }
  }
`;

/** A product's purchasable variants (for the add-to-basket / variant picker). */
export const getProductVariants = cache(async (handle: string): Promise<ProductVariant[]> => {
  if (!env.SHOPIFY_STORE_DOMAIN || !env.SHOPIFY_STOREFRONT_TOKEN) return [];
  try {
    const res = await fetch(
      `https://${env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: VARIANTS_QUERY, variables: { handle } }),
        next: { tags: [`variants:${handle}`], revalidate: 604800 },
      },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as {
      data?: { product?: { variants?: { nodes?: Array<{ id: string; title: string; availableForSale: boolean; price: MoneyV }> } } };
    };
    const nodes = json.data?.product?.variants?.nodes ?? [];
    return nodes.map((v) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      price: money(v.price),
    }));
  } catch {
    return [];
  }
});
