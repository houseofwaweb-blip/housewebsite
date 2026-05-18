import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PRODUCTS, findProduct, getRelatedProducts } from "@/lib/shop-data";
import { CATALOGUE_PRODUCTS, findCatalogueProduct } from "@/lib/shop-data/catalogue";
import { ProductGallery } from "./ProductGallery";
import { ProductCopy } from "./ProductCopy";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import s from "./product.module.css";

// "£48" → 48, "£1,250.50" → 1250.5. Falls back to 0 for non-numeric strings
// (which would be a data bug — Sentry alert in production).
function parsePrice(p: string): number {
  const n = Number(p.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function resolveProduct(handle: string) {
  const local = findProduct(handle);
  if (local) return local;
  const cat = findCatalogueProduct(handle);
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const p = resolveProduct(handle);
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.title} — Shop`,
    description: p.lede,
    openGraph: {
      type: "website",
      title: p.title,
      description: p.lede,
      images: [{ url: p.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = resolveProduct(handle);
  if (!product) notFound();

  const related = getRelatedProducts(product.relatedHandles ?? []);
  const baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const productUrl = `${baseUrl}/shop/${product.handle}`;

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
        availability="InStock"
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

      {/* Hero landscape */}
      <div className={s.hero}>
        <Image
          src={product.image}
          alt={product.title}
          width={2800}
          height={1200}
          priority
          sizes="100vw"
          className={s.heroImage}
        />
        {product.houseApproved ? (
          <span className={s.heroSeal}>House Approved</span>
        ) : null}
      </div>

      {/* Purchase bar */}
      <div className={s.bar}>
        <div className={s.barTitle}>
          {product.collection ? (
            <span className={s.barCollection}>{product.collection}</span>
          ) : null}
          <h1 className={s.barName}>{product.title}</h1>
        </div>
        <div className={s.barPrice}>
          {product.compareAtPrice ? (
            <>
              <span className={s.barCompare}>{product.compareAtPrice}</span>
              {product.price}
            </>
          ) : (
            product.price
          )}
        </div>
        <span className={s.barCta}>Coming soon</span>
      </div>

      {/* Story split */}
      <div className={s.story}>
        <div className={s.storyCopy}>
          <ProductCopy product={product} />
        </div>
        <div className={s.storyGallery}>
          <ProductGallery images={product.images} />
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

export function generateStaticParams() {
  const localHandles = PRODUCTS.map((p) => p.handle);
  const catHandles = CATALOGUE_PRODUCTS.map((p) => p.handle);
  const all = [...new Set([...localHandles, ...catHandles])];
  return all.map((handle) => ({ handle }));
}
