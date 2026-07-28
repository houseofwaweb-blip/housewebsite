/**
 * Shopify CDN image sizing — a pure, dependency-free helper safe to import from
 * BOTH server and client components. (It lives outside `shopify.ts`, which is
 * `server-only` because it holds the Storefront token; importing that into a
 * client component would break the build.)
 *
 * We bypass Vercel's image optimizer (next.config `images.unoptimized`), so the
 * URL we render is exactly what the browser downloads. Shopify's CDN resizes for
 * free via a `width` query param (and negotiates WebP by Accept header), so
 * sizing here keeps product-image payloads small without touching Vercel's
 * image-optimization quota. No-op for empty or non-Shopify URLs.
 */
export function shopifyImage(url: string | undefined | null, width: number): string {
  if (!url || !url.includes("cdn.shopify.com")) return url ?? "";
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}width=${width}`;
}
