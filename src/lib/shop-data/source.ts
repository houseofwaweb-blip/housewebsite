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

/**
 * Unified shop-data source. Prefers Sanity; falls back to the static
 * WooCommerce JSON dump when Sanity is empty (pre-migration, dev, or
 * outage). Pages call these functions and don't need to know which
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

// ───── Public API (server-side only) ──────────────────────────────────────

/** All products. Sanity-first, static fallback. */
export async function getShopProducts(): Promise<CatalogueProduct[]> {
  const sanity = await getAllProducts();
  if (sanity.length > 0) return sanity.map(sanityToCatalogue);
  return CATALOGUE_PRODUCTS;
}

/** Single product by handle. Sanity-first, static fallback. */
export async function getShopProduct(
  handle: string,
): Promise<CatalogueProduct | null> {
  const sanity = await getProductByHandle(handle);
  if (sanity) return sanityToCatalogue(sanity);
  return findCatalogueProduct(handle) ?? null;
}

/** Products in a collection by slug. Sanity-first, static fallback. */
export async function getShopCollection(
  collectionSlug: string,
): Promise<CatalogueProduct[]> {
  const sanity = await getProductsByCollection(collectionSlug);
  if (sanity.length > 0) return sanity.map(sanityToCatalogue);
  return getCatalogueCollection(collectionSlug);
}

/**
 * Collection summary — name + count. Sanity-first, static fallback.
 *
 * Returns the shape used by /shop/collections (page tiles): each row has
 * `handle` (URL-safe slug), `title` (display name), `productCount`.
 */
export async function getShopCollections(): Promise<CatalogueCollection[]> {
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

/** Brand list. Falls through to static since brand field is light in Sanity. */
export async function getShopBrands(): Promise<CatalogueBrand[]> {
  return CATALOGUE_BRANDS;
}
