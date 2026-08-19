import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PRODUCTS, findProduct } from "@/lib/shop-data";
import { getShopProduct, getShopProducts } from "@/lib/shop-data/source";
import { RecentlyViewed } from "./RecentlyViewed";
import { HomeRecordButton } from "@/components/commerce/HomeRecordButton";
import { getProductByHandle } from "@/lib/cms/products";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import Image from "next/image";
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
  const metaTitle = p.seoTitle?.trim() ? p.seoTitle : `${p.title} | Shop`;
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

  // Recommended: real pieces from the same collection, topped up with other
  // House goods so the rail is always full. (relatedHandles is legacy/empty now.)
  const catalogue = await getShopProducts().catch(() => []);
  const sameCollection = catalogue.filter(
    (p) => p.handle !== product.handle && p.image && p.collection === product.collection,
  );
  let related = sameCollection.slice(0, 4);
  if (related.length < 4) {
    const fill = catalogue
      .filter((p) => p.handle !== product.handle && p.image && !related.some((r) => r.handle === p.handle))
      .slice(0, 4 - related.length);
    related = [...related, ...fill];
  }

  // The "fitted/hung/cleaned/maintained" cross-sell only makes sense for larger
  // installable/maintainable goods, not a mug or a book (brief slide 9).
  const cat = `${product.collection ?? ""}`.toLowerCase();
  const serviceable = /furnitur|lighting|soft.?furnish|outdoor|curtain|blind|shelv|wardrobe|\brug|mirror|cabinet|table|sofa|bed\b/.test(cat);
  const baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const productUrl = `${baseUrl}/shop/${product.handle}`;

  // Pull availability from Sanity if we have it (the static fallback
  // doesn't carry an explicit status field — defaults to PreOrder).
  const sanityProduct = await getProductByHandle(handle);
  const availability = toSchemaAvailability(sanityProduct?.availability);

  // Maker + delivery/stock surfaced near the title (spec §12 PDP order 2).
  const maker = product.brand?.trim();
  const inStock =
    "inStock" in product && typeof product.inStock === "boolean"
      ? product.inStock
      : availability === "InStock";
  // Pre-launch framing: the store is not live to buy yet, so in-stock items read
  // simply "In stock" (no "ready to send") and everything else reads "Available
  // at launch", matching the product page's purchase button.
  const deliveryStatus = inStock
    ? "In stock · Available at launch"
    : availability === "OutOfStock"
      ? "Currently unavailable"
      : "Available at launch";

  // Related editorial for the store→magazine cross-link (spec §12 PDP order 8).
  const hearth = await getLatestHearthArticles(3).catch(() => []);
  const hearthStories = hearth.filter((a) => a.image).slice(0, 3);

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
        <ProductGallery images={product.images} whyChosen={product.whyChosen} />

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

          {maker ? (
            <p className="mt-1.5 font-sans text-[18px] text-house-stone">
              By <span className="text-house-brown">{maker}</span>
            </p>
          ) : null}

          <div className={s.price}>
            {product.compareAtPrice ? (
              <span className={s.compare}>{product.compareAtPrice}</span>
            ) : null}
            {product.price}
          </div>

          {/* Delivery + stock, surfaced up front (not only in the accordion) */}
          <div className="mb-6 flex items-center gap-2 font-sans text-[18px] text-house-stone">
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 is-round"
              style={{
                background: inStock ? "var(--house-gold-ink)" : "var(--color-house-stone)",
              }}
            />
            {deliveryStatus}
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
            <div className="mb-3">
              {/* Buy action stand-in until checkout is live — same size as the
                  Home Record button, distinct colour (brand brown vs gold) */}
              <span className="inline-flex w-full items-center justify-center gap-2 border border-house-brown bg-house-brown px-6 py-4 font-sans text-[14px] tracking-[0.18em] uppercase text-house-cream">
                Available at launch
              </span>
            </div>
          )}

          {/* Save / wishlist into the Home Record (brief slide 9/10) */}
          <div className="mb-9">
            <HomeRecordButton
              handle={product.handle}
              title={product.title}
              price={product.price}
              image={product.image}
            />
            <p className="mt-2 font-sans text-[18px] leading-[1.5] text-house-stone">
              Save it to your Home Record to keep its details, care notes and warranty in one place.
            </p>
          </div>

          <ProductCopy product={product} />

          {/* Sustainability / provenance evidence (spec §12 PDP order 5). We do
              NOT invent eco claims — this surfaces only what is verifiable: the
              named maker, the House Approved standard the piece was judged
              against, and its care/repairability position. Product-specific
              material claims appear only when the data carries them. */}
          <div className="mt-7 border-t border-house-brown/12 pt-6">
            <p className="font-sans text-[14px] tracking-[0.22em] uppercase text-house-gold-ink mb-3">
              Sustainability &amp; provenance
            </p>
            <ul className="m-0 p-0 list-none space-y-3">
              {maker ? (
                <li className="font-sans text-[18px] leading-[1.6] text-house-brown/85">
                  <span className="text-house-stone">Maker.</span> Made by {maker}, a named
                  supplier we can trace and stand behind.
                </li>
              ) : null}
              {product.houseApproved ? (
                <li className="font-sans text-[18px] leading-[1.6] text-house-brown/85">
                  <span className="text-house-stone">House Approved.</span> Judged against
                  our standard for craft, provenance and honest materials before it earned a
                  place here.
                </li>
              ) : null}
              <li className="font-sans text-[18px] leading-[1.6] text-house-brown/85">
                <span className="text-house-stone">Made to last.</span> Chosen so it can be
                mended and kept rather than replaced, which is the most sustainable choice a
                household can make.
              </li>
              {product.careNotes?.trim() ? (
                <li className="font-sans text-[18px] leading-[1.6] text-house-brown/85">
                  <span className="text-house-stone">Care.</span> {product.careNotes.trim()}
                </li>
              ) : null}
            </ul>
          </div>

          {/* Warranty, care, supplier, replacement — what the Home Record keeps
              for this object (brief slide 9/10). Supplier is real product data;
              the rest is framed as what HoWA stores at and after purchase. */}
          <div className="mt-7 border-t border-house-brown/12 pt-6">
            <p className="font-sans text-[14px] tracking-[0.22em] uppercase text-house-gold-ink mb-3">
              Kept in your Home Record
            </p>
            <dl className="m-0 space-y-2.5">
              {[
                ["Supplier", product.brand?.trim() || "House Approved maker"],
                ["Care", product.careNotes?.trim() || "Surface-appropriate care notes, saved with the item."],
                ["Warranty", "Receipt and any warranty stored at purchase."],
                ["Replacement", "HoWA reminds you when it is due for renewal."],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 font-sans text-[18px] leading-[1.5]">
                  <dt className="w-[92px] shrink-0 text-house-stone">{k}</dt>
                  <dd className="m-0 text-house-brown">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Secondary CTA (brief slide 9) — present on every product, but the
              wording adapts: installable/maintainable goods get the fitting line,
              everything else gets a calmer House-services line (a mug isn't
              "fitted or cleaned"). */}
          <p className="mt-6 font-sans text-[18px] leading-[1.6] text-house-stone">
            {serviceable
              ? "Need this fitted, hung, cleaned or maintained? "
              : "Planning work on your home? "}
            <a href="#open-booking-form" className="text-house-gold-ink underline underline-offset-[3px]">
              Book a service
            </a>{" "}
            and it is kept in your Home Record.
          </p>
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

      {/* Related editorial story (spec §12 PDP order 8) — the contextual route
          from an object into The Hearth. */}
      {hearthStories.length > 0 ? (
        <section className="px-[5vw] py-[clamp(44px,6vw,80px)] border-t border-house-brown/8">
          <div className="max-w-[1180px] mx-auto">
            <header className="mb-8">
              <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-house-gold-ink mb-2">
                From The Hearth
              </p>
              <h2 className="font-display italic text-[clamp(27px,2.8vw,39px)] leading-[1.05] text-house-brown">
                Read around it.
              </h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
              {hearthStories.map((a) => (
                <Link key={a.slug} href={`/the-hearth/${a.slug}`} className="group block no-underline">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-house-cream-dark mb-3">
                    <Image
                      src={a.image}
                      alt={a.imageAlt ?? a.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  {a.category ? (
                    <p className="font-sans text-[8px] tracking-[0.24em] uppercase text-house-gold-ink mb-1.5">
                      {a.category}
                    </p>
                  ) : null}
                  <p className="font-display text-[21px] leading-[1.2] text-house-brown group-hover:text-house-gold-ink transition-colors">
                    {a.title}
                  </p>
                  {a.dek ? (
                    <p className="font-sans text-[18px] leading-[1.6] text-house-stone mt-1.5 line-clamp-2">
                      {a.dek}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* The customer's own browsing history */}
      <RecentlyViewed
        current={{
          handle: product.handle,
          title: product.title,
          price: product.price,
          image: product.image,
        }}
      />
    </div>
  );
}

// Pages not listed here (the 500+ Sanity/catalogue products) render on first
// request and are then cached. dynamicParams defaults to true.
export const revalidate = 604800;

// Prebuild only the curated showpieces at build time. Prebuilding all 500+
// products exhausted build memory; the rest are served on-demand via ISR.
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}
