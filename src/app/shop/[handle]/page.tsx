import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PRODUCTS, findProduct, getRelatedProducts } from "@/lib/shop-data";
import { getShopProduct } from "@/lib/shop-data/source";
import { getProductByHandle } from "@/lib/cms/products";
import { getProductVariants } from "@/lib/shop-data/shopify-catalogue";
import { ProductBuy } from "./ProductBuy";
import { ProductGallery } from "./ProductGallery";
import { ProductCopy } from "./ProductCopy";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/lib/seo/jsonLd";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { env } from "@/lib/env";
import s from "./product.module.css";

// "£48" → 48, "£1,250.50" → 1250.5. Falls back to 0 for non-numeric strings
// (which would be a data bug — Sentry alert in production).
function parsePrice(p: string): number {
  const n = Number(p.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/**
 * Resolve a product by handle. Precedence: the 8 curated showpieces
 * (deepest editorial content) → Sanity (the 501-product catalogue) →
 * static JSON fallback (handled inside getShopProduct).
 */
async function resolveProduct(handle: string) {
  const local = findProduct(handle);
  if (local) return local;
  const cat = await getShopProduct(handle);
  if (!cat) return null;
  return {
    ...cat,
    relatedHandles: [] as string[],
    careNotes: undefined,
    materials: undefined,
    dimensions: undefined,
    delivery: undefined,
  };
}

/**
 * schema.org availability value derived from our internal status. Drives
 * the Product JSON-LD so the structured data matches the UI.
 */
function toSchemaAvailability(status?: string): "InStock" | "OutOfStock" | "PreOrder" {
  switch (status) {
    case "in_stock":
      return "InStock";
    case "preorder":
      return "PreOrder";
    case "out_of_stock":
    case "discontinued":
      return "OutOfStock";
    case "available_soon":
    default:
      return "PreOrder";
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const p = await resolveProduct(handle);
  if (!p) return { title: "Product not found" };
  const baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const productUrl = `${baseUrl}/shop/${p.handle}`;
  // OG image needs an absolute URL — relative paths break sharing on Meta,
  // X, LinkedIn etc. p.image is either absolute (Sanity CDN) or a relative
  // /partners/*.jpg from the hardcoded fallback.
  const ogImage = p.image?.startsWith("http") ? p.image : `${baseUrl}${p.image}`;
  // Prefer the per-product "Search engine listing" set in Shopify; fall back
  // to the product title / first line of the description when none is set.
  const metaTitle = p.seoTitle?.trim() ? p.seoTitle : `${p.title} — Shop`;
  const ogTitle = p.seoTitle?.trim() ? p.seoTitle : p.title;
  const metaDescription = p.seoDescription?.trim() ? p.seoDescription : p.lede;
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: productUrl },
    openGraph: {
      type: "website",
      url: productUrl,
      title: ogTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage, alt: p.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await resolveProduct(handle);
  if (!product) notFound();

  const variants = await getProductVariants(handle);
  const related = getRelatedProducts(product.relatedHandles ?? []);
  const baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const productUrl = `${baseUrl}/shop/${product.handle}`;

  // Pull availability from Sanity if we have it (the static fallback
  // doesn't carry an explicit status field — defaults to PreOrder).
  const sanityProduct = await getProductByHandle(handle);
  const availability = toSchemaAvailability(sanityProduct?.availability);

  const breadcrumbItems = [
    { name: "Shop", href: "/shop" },
    ...(product.collection
      ? [{ name: product.collection, href: `/shop/collections/${product.collection.toLowerCase()}` }]
      : []),
    { name: product.title, href: `/shop/${product.handle}` },
  ];

  return (
    <div className={s.page}>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductJsonLd
        name={product.title}
        description={product.lede}
        image={product.image}
        url={productUrl}
        sku={product.handle}
        price={parsePrice(product.price)}
        availability={availability}
      />
      <MetaViewContent
        contentId={product.handle}
        contentName={product.title}
        contentCategory={product.collection}
        value={parsePrice(product.price)}
      />
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className={s.crumbs}>
        <Link href="/shop" className={s.crumbLink}>Shop</Link>
        {product.collection ? (
          <>
            <span className={s.crumbSep}>/</span>
            <Link
              href={`/shop/collections/${product.collection.toLowerCase()}`}
              className={s.crumbLink}
            >
              {product.collection}
            </Link>
          </>
        ) : null}
        <span className={s.crumbSep}>/</span>
        <span>{product.title}</span>
      </nav>

      {/* PDP — gallery left, buy column right (DESIGN.md <PDPLayout />) */}
      <div className={s.pdp}>
        <ProductGallery images={product.images} />

        <div className={s.buy}>
          {product.collection || product.houseApproved ? (
            <div className={s.eyebrowRow}>
              {product.collection ? (
                <span className={s.collection}>{product.collection}</span>
              ) : null}
              {product.houseApproved ? (
                <span className={s.seal}>House Approved</span>
              ) : null}
            </div>
          ) : null}

          <h1 className={s.name}>{product.title}</h1>

          <div className={s.price}>
            {product.compareAtPrice ? (
              <span className={s.compare}>{product.compareAtPrice}</span>
            ) : null}
            {product.price}
          </div>

          {variants.length > 0 ? (
            <ProductBuy
              variants={variants}
              product={{
                handle: product.handle,
                title: product.title,
                price: product.price,
                image: product.image,
              }}
            />
          ) : (
            <div className="mb-9">
              <span className={s.comingSoon}>Coming soon</span>
            </div>
          )}

          <ProductCopy product={product} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 ? (
        <section className={s.related}>
          <header className={s.relatedHead}>
            <p className={s.relatedEy}>You might also consider</p>
            <h2 className={s.relatedTitle}>
              From the same <em>world.</em>
            </h2>
          </header>
          <div className={s.relatedGrid}>
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
          <Link href="/shop" className={s.relatedFootLink}>
            All products
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      ) : null}
    </div>
  );
}

// Pages not listed here (the 500+ Sanity/catalogue products) render on first
// request and are then cached. dynamicParams defaults to true.
export const revalidate = 3600;

// Prebuild only the curated showpieces at build time. Prebuilding all 500+
// products exhausted build memory; the rest are served on-demand via ISR.
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}
