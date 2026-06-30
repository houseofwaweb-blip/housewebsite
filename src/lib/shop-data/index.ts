/**
 * Shop data types + helpers.
 *
 * NOTE (2026-06-23): the original placeholder PRODUCTS and COLLECTIONS seed
 * arrays were retired. Products, inventory and collections now come from
 * Shopify (see src/lib/commerce/shopify.ts and src/lib/shop-data/source.ts),
 * with Sanity for editorial overlays. The demo arrays below are intentionally
 * empty so nothing shadows the live Shopify collections (e.g. a stale local
 * "garden" collection was overriding the real "garden-outdoor" one). The
 * exports remain so existing imports keep compiling.
 */

import type { ProductCardData } from "@/components/commerce/ProductCard";

export interface ShopProduct extends ProductCardData {
  lede: string;
  body: string;
  /** Shopify product vendor (the maker/supplier). */
  brand?: string;
  /** "Why the House chose it", editorial endorsement vs the House standards. */
  whyChosen?: string;
  /** Optional per-product SEO overrides (Shopify "Search engine listing"). */
  seoTitle?: string;
  seoDescription?: string;
  images: Array<{ src: string; alt: string }>;
  careNotes?: string;
  materials?: string;
  dimensions?: string;
  delivery?: string;
  relatedHandles?: string[];
}

export interface ShopCollection {
  handle: string;
  title: string;
  description: string;
  image?: string;
  productHandles: string[];
}

// Retired — see file header. Live data comes from Shopify.
export const PRODUCTS: ShopProduct[] = [];

// Retired — see file header. Live collections come from Shopify.
export const COLLECTIONS: ShopCollection[] = [];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function findProduct(handle: string): ShopProduct | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function findCollection(handle: string): ShopCollection | undefined {
  return COLLECTIONS.find((c) => c.handle === handle);
}

export function getRelatedProducts(handles: string[]): ShopProduct[] {
  return handles.map((h) => findProduct(h)).filter(Boolean) as ShopProduct[];
}
