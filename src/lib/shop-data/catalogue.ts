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
  houseApproved: boolean;
  lede: string;
  body: string;
  sku: string;
  inStock: boolean;
  onSale: boolean;
}

export interface CatalogueCollection {
  handle: string;
  title: string;
  productCount: number;
}

const data = catalogueData as {
  products: CatalogueProduct[];
  collections: CatalogueCollection[];
};

export const CATALOGUE_PRODUCTS = data.products;
export const CATALOGUE_COLLECTIONS = data.collections;

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
