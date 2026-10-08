/**
 * Shopify CDN image helpers for the product gallery (the LCP element).
 *
 * The site runs next/image with `images.unoptimized: true` (to avoid the Vercel
 * optimizer cold-path), which means next/image serves the raw full-size source
 * with no srcset — a large hero image and a slow LCP on mobile. For product
 * imagery we instead use a plain <img> with a Shopify-CDN srcset: Shopify
 * resizes to the requested `width` on its global CDN and auto-negotiates
 * WebP/AVIF from the Accept header. Smaller, right-sized, still off the Vercel
 * optimizer. Non-Shopify URLs (Sanity, local fallbacks) are returned untouched.
 */

const DEFAULT_WIDTHS = [320, 480, 640, 768, 960, 1200, 1400];

export function isShopifyImage(src: string): boolean {
  return src.includes("cdn.shopify.com");
}

/** A single resized Shopify CDN URL. Returns src unchanged for non-Shopify. */
export function shopifyWidth(src: string, width: number): string {
  if (!isShopifyImage(src)) return src;
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}width=${width}`;
}

/** A responsive srcset of Shopify CDN widths. Empty string for non-Shopify. */
export function shopifySrcSet(src: string, widths: number[] = DEFAULT_WIDTHS): string {
  if (!isShopifyImage(src)) return "";
  return widths.map((w) => `${shopifyWidth(src, w)} ${w}w`).join(", ");
}
