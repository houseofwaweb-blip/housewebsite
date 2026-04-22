import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PRODUCTS, findProduct, getRelatedProducts } from "@/lib/shop-data";
import { CATALOGUE_PRODUCTS, findCatalogueProduct } from "@/lib/shop-data/catalogue";
import { ProductGallery } from "./ProductGallery";
import { ProductCopy } from "./ProductCopy";
import { AddToBasketButton } from "./AddToBasketButton";

/**
 * /shop/[handle] — Lookbook product detail (approved direction).
 *
 * Layout:
 *   1. Breadcrumb
 *   2. Full-bleed landscape hero (21:9 desktop, 16:9 mobile)
 *   3. Purchase bar (title | price | CTA on one line, wraps on mobile)
 *   4. Story split:
 *        Left (sticky): italic lede → body → delivery → HoWA+ → accordion → bottom CTA
 *        Right (scrolls): vertical image stack (desktop) / peek-carousel (mobile)
 *      On mobile: copy comes first, carousel below the accordion
 *   5. Related products
 */

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

  return (
    <article className="bg-house-white text-house-brown">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="px-[5vw] pt-3 pb-2 font-sans text-[11px] tracking-[0.18em] uppercase text-house-stone"
      >
        <Link href="/shop" className="no-underline hover:text-house-gold transition-colors">
          Shop
        </Link>
        {product.collection ? (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/shop/collections/${product.collection.toLowerCase()}`}
              className="no-underline hover:text-house-gold transition-colors"
            >
              {product.collection}
            </Link>
          </>
        ) : null}
        <span className="mx-2">/</span>
        <span className="text-house-brown">{product.title}</span>
      </nav>

      {/* 1. Hero landscape */}
      <div className="relative w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={2800}
          height={1200}
          priority
          sizes="100vw"
          className="w-full h-auto aspect-[21/9] max-md:aspect-[16/9] object-cover"
        />
        {product.houseApproved ? (
          <span className="absolute top-4 left-4 md:top-5 md:left-5 font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold bg-white/92 px-3 py-1.5 border border-house-gold/30 z-10">
            House Approved
          </span>
        ) : null}
      </div>

      {/* 2. Purchase bar — matches mockup: 20px vertical padding */}
      <div className="flex flex-wrap items-center justify-between gap-[20px] px-[5vw] py-[20px] border-b border-house-brown/10 bg-house-white">
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          {product.collection ? (
            <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold">
              {product.collection}
            </span>
          ) : null}
          <h1 className="font-display font-medium text-[clamp(22px,3vw,30px)] leading-[1.15] tracking-[-0.005em]">
            {product.title}
          </h1>
        </div>
        <span className="font-display font-medium text-[clamp(20px,2.6vw,26px)]">
          {product.compareAtPrice ? (
            <>
              <span className="line-through text-house-stone/60 text-[0.8em] mr-2">
                {product.compareAtPrice}
              </span>
              {product.price}
            </>
          ) : (
            product.price
          )}
        </span>
        <span className="max-md:w-full max-md:order-3 inline-block text-center px-8 py-3.5 font-sans text-[12px] tracking-[0.18em] uppercase text-house-stone/60 bg-house-cream-dark border border-house-brown/10 cursor-not-allowed">
          Coming soon
        </span>
      </div>

      {/* 3. Story split — sticky copy left + scrolling gallery right */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1400px] mx-auto">
        {/* Copy — order 1 on both mobile and desktop */}
        <div className="order-1">
          <ProductCopy product={product} />
        </div>
        {/* Gallery — order 2 on both; on desktop this is the right column */}
        <div className="order-2 overflow-hidden">
          <ProductGallery images={product.images} />
        </div>
      </div>

      {/* 4. Related */}
      {related.length > 0 ? (
        <section className="px-[5vw] py-16 bg-house-cream border-t border-house-brown/10">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-baseline justify-between mb-8 gap-4">
              <div>
                <Eyebrow>You might also consider</Eyebrow>
                <h2 className="font-display font-medium text-[28px] leading-[1.2] mt-2">
                  From the same world.
                </h2>
              </div>
              <GhostLink href="/shop">All products</GhostLink>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {related.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

export function generateStaticParams() {
  const localHandles = PRODUCTS.map((p) => p.handle);
  const catHandles = CATALOGUE_PRODUCTS.map((p) => p.handle);
  const all = [...new Set([...localHandles, ...catHandles])];
  return all.map((handle) => ({ handle }));
}
