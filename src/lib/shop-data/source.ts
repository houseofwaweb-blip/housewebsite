import "server-only";
import {
  getAllProducts,
  getProductByHandle,
  getProductsByCollection,
  getCollectionsWithCounts,
  type SanityProduct,
} from "@/lib/cms/products";
import {
  CATALOGUE_PRODUCTS,
  CATALOGUE_COLLECTIONS,
  CATALOGUE_BRANDS,
  findCatalogueProduct,
  getCatalogueCollection,
  type CatalogueProduct,
  type CatalogueCollection,
  type CatalogueBrand,
} from "./catalogue";
import { loadShopifyCatalogue } from "./shopify-catalogue";

/**
 * Unified shop-data source. Precedence: live Shopify (the system of record
 * for products/inventory now) → Sanity → static WooCommerce JSON dump
 * (dev / outage). Pages call these functions and don't need to know which
 * source is live.
 *
 * The return shape matches the existing `CatalogueProduct` interface so
 * downstream rendering doesn't change.
 */

/** Map a Sanity product back onto the static catalogue shape. */
function sanityToCatalogue(p: SanityProduct): CatalogueProduct {
  const price =
    typeof p.priceMinor === "number"
      ? formatPrice(p.priceMinor, p.currency)
      : "";
  const compareAtPrice =
    typeof p.compareAtMinor === "number"
      ? formatPrice(p.compareAtMinor, p.currency)
      : undefined;
  const images =
    p.galleryUrls?.length > 0
      ? p.galleryUrls.map((g) => ({
          src: g.url,
          alt: g.alt ?? p.title,
        }))
      : p.primaryImageUrl
        ? [{ src: p.primaryImageUrl, alt: p.primaryImageAlt ?? p.title }]
        : [];
  return {
    handle: p.handle,
    title: p.title,
    price,
    compareAtPrice,
    image: p.primaryImageUrl ?? images[0]?.src ?? "",
    images,
    collection: p.collection ?? "Uncategorised",
    houseApproved: p.houseApproved,
    lede: p.lede ?? "",
    body: typeof p.body === "string" ? p.body : portableToPlain(p.body),
    brand: p.brand ?? "",
    sku: p.sku ?? "",
    inStock: p.availability === "in_stock",
    onSale: p.onSale,
  };
}

function formatPrice(minor: number, currency: string): string {
  const major = (minor / 100).toFixed(2).replace(/\.00$/, "");
  if (currency === "GBP") return `£${major}`;
  if (currency === "USD") return `$${major}`;
  if (currency === "EUR") return `€${major}`;
  return `${major} ${currency}`;
}

/**
 * Coerce Portable Text body into a plain string for the legacy
 * CatalogueProduct shape. Once detail pages render Portable Text
 * directly (separate refactor), this can drop the conversion.
 */
function portableToPlain(body: unknown[] | null): string {
  if (!Array.isArray(body)) return "";
  return body
    .filter((b): b is { _type: "block"; children?: Array<{ text?: string }> } =>
      typeof b === "object" && b !== null && (b as { _type?: string })._type === "block",
    )
    .map((block) => (block.children ?? []).map((c) => c.text ?? "").join(""))
    .filter(Boolean)
    .join("\n\n");
}

// ───── Marketplace visibility ─────────────────────────────────────────────

/**
 * Service / care / design "plans" (Apartment+, Home & Garden+, The Full House
 * Edit, and the design plan products) are sold on their own pages — Design,
 * Steward Plans, Protect — not in the marketplace grid (brief slide 9: separate
 * care plans from the product grid). They are HIDDEN from every marketplace
 * listing but stay fully buyable at /shop/{handle}, so their own pages can link
 * straight to a working product page. getShopProduct() is intentionally NOT
 * filtered.
 */
const PLAN_TITLE = /apartment\s*\+|home\s*&\s*garden\s*\+|full house edit|\bplans?\b/i;
function isPlanProduct(p: CatalogueProduct): boolean {
  return PLAN_TITLE.test(p.title);
}
function isPlanCollection(c: CatalogueCollection): boolean {
  return /plan|apartment\+|home-?\s*&?-?\s*garden-?\s*\+/i.test(`${c.handle} ${c.title}`);
}

// ───── Public API (server-side only) ──────────────────────────────────────

/** All marketplace products. Shopify-first, then Sanity, then static. Plans hidden. */
export async function getShopProducts(): Promise<CatalogueProduct[]> {
  const shopify = await loadShopifyCatalogue();
  if (shopify && shopify.products.length > 0) return shopify.products.filter((p) => !isPlanProduct(p));
  const sanity = await getAllProducts();
  if (sanity.length > 0) return sanity.map(sanityToCatalogue).filter((p) => !isPlanProduct(p));
  return CATALOGUE_PRODUCTS.filter((p) => !isPlanProduct(p));
}

/** Single product by handle. Shopify-first, then Sanity, then static. */
export async function getShopProduct(
  handle: string,
): Promise<CatalogueProduct | null> {
  const shopify = await loadShopifyCatalogue();
  const hit = shopify?.byHandle.get(handle);
  if (hit) return hit;
  const sanity = await getProductByHandle(handle);
  if (sanity) return sanityToCatalogue(sanity);
  return findCatalogueProduct(handle) ?? null;
}

/** Products in a collection by slug. Shopify-first, then Sanity, then static. */
export async function getShopCollection(
  collectionSlug: string,
): Promise<CatalogueProduct[]> {
  const shopify = await loadShopifyCatalogue();
  const hit = shopify?.collectionProducts.get(collectionSlug);
  if (hit && hit.length > 0) return hit.filter((p) => !isPlanProduct(p));
  const sanity = await getProductsByCollection(collectionSlug);
  if (sanity.length > 0) return sanity.map(sanityToCatalogue).filter((p) => !isPlanProduct(p));
  return getCatalogueCollection(collectionSlug).filter((p) => !isPlanProduct(p));
}

/**
 * Collection summary — name + count. Sanity-first, static fallback.
 *
 * Returns the shape used by /shop/collections (page tiles): each row has
 * `handle` (URL-safe slug), `title` (display name), `productCount`.
 */
export async function getShopCollections(): Promise<CatalogueCollection[]> {
  const shopify = await loadShopifyCatalogue();
  if (shopify && shopify.collections.length > 0) return shopify.collections.filter((c) => !isPlanCollection(c));
  const sanity = await getCollectionsWithCounts();
  if (sanity.length > 0) {
    return sanity.map((c) => ({
      handle: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: c.name,
      productCount: c.count,
    }));
  }
  return CATALOGUE_COLLECTIONS;
}

/** Brand list. Shopify vendors first, then the static brand list. */
export async function getShopBrands(): Promise<CatalogueBrand[]> {
  const shopify = await loadShopifyCatalogue();
  if (shopify && shopify.brands.length > 0) return shopify.brands;
  return CATALOGUE_BRANDS;
}
