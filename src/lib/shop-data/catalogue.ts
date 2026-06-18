/**
 * WooCommerce catalogue — read-only product data for the brochure shop.
 * No cart, no buy button. Browse and browse only.
 *
 * Products loaded from the transformed WooCommerce JSON dump.
 * When Shopify is wired, this file gets replaced with Storefront API calls.
 */
import catalogueData from "./woo-catalogue.json";

export interface CatalogueProduct {
  handle: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  images: Array<{ src: string; alt: string }>;
  collection: string;
  /** All main-category handles this product belongs to (for accurate filtering). */
  collectionHandles?: string[];
  houseApproved: boolean;
  lede: string;
  body: string;
  /** Shopify "Search engine listing" overrides (per-product SEO). Optional —
      falls back to title/lede when a product has none set. */
  seoTitle?: string;
  seoDescription?: string;
  brand: string;
  sku: string;
  inStock: boolean;
  onSale: boolean;
  /** Shopify default variant GID — enables one-click add from the grid. */
  variantId?: string;
  /** True when the product has more than one variant (size/colour) — the
      grid card shows "Choose options" → product page instead of quick-add. */
  multiVariant?: boolean;
}

export interface CatalogueCollection {
  handle: string;
  title: string;
  productCount: number;
}

export interface CatalogueBrand {
  name: string;
  count: number;
}

const data = catalogueData as {
  products: CatalogueProduct[];
  collections: CatalogueCollection[];
  brands: CatalogueBrand[];
};

export const CATALOGUE_PRODUCTS = data.products;
export const CATALOGUE_COLLECTIONS = data.collections;
export const CATALOGUE_BRANDS = data.brands;

export function findCatalogueProduct(handle: string): CatalogueProduct | undefined {
  return CATALOGUE_PRODUCTS.find((p) => p.handle === handle);
}

export function getCatalogueCollection(handle: string): CatalogueProduct[] {
  const collection = CATALOGUE_COLLECTIONS.find((c) => c.handle === handle);
  if (!collection) return [];
  return CATALOGUE_PRODUCTS.filter(
    (p) => p.collection.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") === handle,
  );
}

export function getCatalogueCollectionByTitle(title: string): CatalogueProduct[] {
  return CATALOGUE_PRODUCTS.filter((p) => p.collection === title);
}

export function searchCatalogue(query: string): CatalogueProduct[] {
  const q = query.toLowerCase();
  return CATALOGUE_PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.lede.toLowerCase().includes(q),
  );
}
