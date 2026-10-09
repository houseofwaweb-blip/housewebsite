import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getShopCollection,
  getShopCollections,
  getShopCollectionMeta,
  getShopProducts,
} from "@/lib/shop-data/source";
import { COLLECTIONS, PRODUCTS } from "@/lib/shop-data";
import type { CatalogueProduct } from "@/lib/shop-data/catalogue";
import SHOP_NAV from "@/lib/shop-data/shop-nav.generated.json";
import { ShopBrowser } from "../../ShopBrowser";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonLd";
import s from "./collection.module.css";

/** Brand list with counts, derived from a product set (for the filter rail). */
function deriveBrands(products: CatalogueProduct[]) {
  const counts = new Map<string, number>();
  for (const p of products) {
    if (p.brand) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

type ShopNavCategory = { title: string; handle: string; subs: { title: string; handle: string }[] };
const NAV = SHOP_NAV as ShopNavCategory[];

// Parse a ?page value into a positive integer, defaulting to 1.
function parsePageParam(sp: Record<string, string | string[] | undefined>): number {
  const raw = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const n = parseInt(raw ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

// Optional full-bleed editorial banner at the top of a collection page, keyed by
// handle. Only collections listed here get one; everything else renders as before.
const COLLECTION_HERO: Record<string, { src: string; alt: string }> = {
  "seasonal-home-edit": {
    src: "/shop/collections/seasonal-home-edit-hero.webp",
    alt: "An autumn sitting room by firelight, with candles, a reed diffuser, a textured table lamp and dried thistles",
  },
};

// Back-office / non-product collections kept in Shopify but never public
// (mirror of the list in ../page.tsx). A direct hit 404s so they can't be
// indexed or linked. NB: gift-cards is NOT hidden — it's a real, populated
// collection (14 gift-card products) and the target of the /gift-cards route.
const HIDDEN_COLLECTION_HANDLES = new Set([
  "services",
  "migration-review",
  "migration",
  "migration_review",
]);
const isHiddenCollection = (handle: string) =>
  HIDDEN_COLLECTION_HANDLES.has(handle) || /migration[-_ ]?review/i.test(handle);

/** Plain-text first line of a Shopify descriptionHtml, for meta fallbacks. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

type ResolvedCollection = {
  title: string;
  products: CatalogueProduct[];
};

async function resolveCollection(handle: string): Promise<ResolvedCollection | null> {
  // Prefer hand-curated local collections (e.g. "house-approved")
  const local = COLLECTIONS.find((c) => c.handle === handle);
  if (local) {
    const products: CatalogueProduct[] = local.productHandles
      .map((h) => PRODUCTS.find((p) => p.handle === h))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({
        handle: p.handle,
        title: p.title,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        image: p.image,
        images: p.images,
        collection: p.collection ?? local.title,
        houseApproved: p.houseApproved ?? false,
        lede: p.lede ?? "",
        body: p.body ?? "",
        brand: "",
        sku: "",
        inStock: true,
        onSale: false,
      }));
    return { title: local.title, products };
  }
  // "House Approved" is a virtual collection: the curated seal lives on a
  // product metafield, not a Shopify collection (COLLECTIONS is empty), so
  // build it from every product carrying the seal. Without this the nav,
  // footer, and shop-rail "view all" links to /shop/collections/house-approved
  // all 404. Mirrors the House Approved rail on the shop landing page.
  if (handle === "house-approved") {
    // The whole shop is "House Approved" (the seal is a highlight, not a gate —
    // see the shop copy "Each thing here is House Approved"). Prefer sealed
    // products; if none are flagged in the active source (the seal metafield
    // isn't populated in the static catalogue), fall back to the full
    // catalogue rather than 404 the nav/footer/shop links.
    const all = await getShopProducts();
    const sealed = all.filter((p) => p.houseApproved);
    const products = sealed.length > 0 ? sealed : all;
    if (products.length > 0) return { title: "House Approved", products };
  }
  // Fall back to Sanity (or static catalogue beneath it)
  const sourced = await getShopCollection(handle);
  if (sourced.length > 0) {
    // Use the collection display name from the first product
    return { title: sourced[0].collection, products: sourced };
  }
  return null;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { handle } = await params;
  if (isHiddenCollection(handle)) return { title: "Not found", robots: { index: false, follow: false } };

  // Prefer the Shopify collection's own "Search engine listing" (seo.title /
  // seo.description), then its intro paragraph, then the display title.
  const meta = await getShopCollectionMeta(handle);
  const mainCat = NAV.find((c) => c.handle === handle);
  const displayTitle =
    mainCat?.title ?? meta?.title ?? (await resolveCollection(handle))?.title;
  if (!displayTitle) return { title: "Collection not found" };

  // Bare title; the root layout template appends " | House of Willow Alexander".
  const title = meta?.seoTitle?.trim() || displayTitle;
  const description =
    meta?.seoDescription?.trim() ||
    (meta?.descriptionHtml ? stripHtml(meta.descriptionHtml).slice(0, 155) : undefined);
  // Self-referencing canonical: a paginated page (?page=N) canonicalises to
  // itself, not to page 1, so each page's products get indexed (Search Console
  // audit, Part 1.1). Page 1 keeps the bare collection URL.
  const pageNum = parsePageParam(await searchParams);
  const canonical =
    pageNum > 1 ? `/shop/collections/${handle}?page=${pageNum}` : `/shop/collections/${handle}`;
  const brandedTitle = `${title} | House of Willow Alexander`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { url: canonical, title: brandedTitle, description },
    twitter: { title: brandedTitle, description },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { handle } = await params;
  if (isHiddenCollection(handle)) notFound();
  const pageNum = parsePageParam(await searchParams);
  const basePath = `/shop/collections/${handle}`;
  const mainCat = NAV.find((c) => c.handle === handle);
  const meta = await getShopCollectionMeta(handle);
  const intro = meta?.descriptionHtml ? (
    <section className="px-[5vw] pb-2">
      <div
        className="mx-auto max-w-[920px] text-center font-sans text-[17.5px] leading-[1.7] text-house-brown/85 [&_a]:underline [&_a]:underline-offset-2 [&_p]:mb-3 [&_h2]:font-display [&_h2]:text-[clamp(22px,3vw,30px)] [&_h2]:leading-[1.2] [&_h2]:text-house-black [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-[clamp(18px,2.4vw,23px)] [&_h3]:leading-[1.25] [&_h3]:text-house-black [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:mx-auto [&_ul]:max-w-[56ch] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-left [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: meta.descriptionHtml }}
      />
    </section>
  ) : null;

  // ── Main category page: full filter rail (Brand · Price · Stock · Sort),
  //    scoped to this category, with the sub-categories as navigation links. ──
  if (mainCat) {
    const all = await getShopProducts();
    const products = all.filter((p) => p.collectionHandles?.includes(handle));
    if (products.length === 0) notFound();

    const brands = deriveBrands(products);

    return (
      <div className={s.page}>
        <BreadcrumbJsonLd
          items={[
            { name: "Shop", href: "/shop" },
            { name: mainCat.title, href: basePath },
          ]}
        />
        <section className={s.hero}>
          <nav aria-label="Breadcrumb" className={s.crumbs}>
            <Link href="/shop" className={s.crumbLink}>Shop</Link>
            <span className={s.crumbSep}>/</span>
            <span>{mainCat.title}</span>
          </nav>
          <p className={s.heroEy}>The House · Shop</p>
          <h1 className={s.heroTitle}>{mainCat.title}.</h1>
        </section>

        {intro}

        <ShopBrowser
          products={products}
          collections={[]}
          brands={brands}
          subNav={mainCat.subs}
          basePath={basePath}
          initialPage={pageNum}
        />
      </div>
    );
  }

  // ── Sub-collection / product-type page: the same filter rail as the main
  //    categories (Search · Brand · Price · Stock · Sort), minus the
  //    product-type/categories section — you're already inside one. ──
  const collection = await resolveCollection(handle);
  if (!collection) notFound();

  const products = collection.products;
  // Prefer the collection's OWN name (Shopify meta) over resolveCollection's
  // fallback, which uses the first product's primary collection — that made the
  // Autumn Edit show "Home Accessories". The seasonal-home-edit title is now
  // correct in Shopify ("The Autumn Home Edit"), so the earlier code override
  // was removed (Alex, 9 Oct).
  const displayTitle = meta?.title?.trim() || collection.title;
  const heroBanner = COLLECTION_HERO[handle];
  const otherCollections = await getShopCollections();
  const parentCat = NAV.find((c) => c.subs.some((sub) => sub.handle === handle));
  const brands = deriveBrands(products);
  // Breadcrumb trail mirrors the visible crumbs: Shop / [parent] / this.
  const crumbItems = [
    { name: "Shop", href: "/shop" },
    ...(parentCat
      ? [{ name: parentCat.title, href: `/shop/collections/${parentCat.handle}` }]
      : []),
    { name: displayTitle, href: basePath },
  ];

  return (
    <div className={s.page}>
      <BreadcrumbJsonLd items={crumbItems} />
      {heroBanner ? (
        <div className={s.banner}>
          <div className={s.bannerInner}>
            <Image
              src={heroBanner.src}
              alt={heroBanner.alt}
              fill
              priority
              sizes="(max-width: 1120px) 100vw, 1120px"
              className={s.bannerImg}
            />
          </div>
        </div>
      ) : null}

      {/* Hero */}
      <section className={s.hero}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <Link href="/shop" className={s.crumbLink}>Shop</Link>
          <span className={s.crumbSep}>/</span>
          {parentCat ? (
            <>
              <Link href={`/shop/collections/${parentCat.handle}`} className={s.crumbLink}>
                {parentCat.title}
              </Link>
              <span className={s.crumbSep}>/</span>
            </>
          ) : null}
          <span>{displayTitle}</span>
        </nav>
        <p className={s.heroEy}>The House · Shop</p>
        <h1 className={s.heroTitle}>
          {displayTitle}.
        </h1>
      </section>

      {intro}

      {/* Full filter rail (no categories section), scoped to this product type */}
      <ShopBrowser
        products={products}
        collections={[]}
        brands={brands}
        basePath={basePath}
        initialPage={pageNum}
      />

      {/* Other collections */}
      <section className={s.others}>
        <header className={s.othersHead}>
          <p className={s.othersEy}>Other collections</p>
          <h2 className={s.othersTitle}>
            More worth <em>keeping.</em>
          </h2>
        </header>
        <div className={s.othersList}>
          {[
            ...COLLECTIONS.map((c) => ({ handle: c.handle, title: c.title })),
            ...otherCollections.map((c) => ({ handle: c.handle, title: c.title })),
          ]
            .filter((c, i, a) =>
              c.handle !== handle &&
              // hide back-office collections (kept in Shopify, not public)
              !["services", "migration-review", "migration", "migration_review"].includes(c.handle) &&
              !/migration[-_ ]?review/i.test(c.title) &&
              !/^services$/i.test(c.title) &&
              a.findIndex((x) => x.handle === c.handle) === i,
            )
            .slice(0, 8)
            .map((c) => (
              <Link
                key={c.handle}
                href={`/shop/collections/${c.handle}`}
                className={s.othersChip}
              >
                {c.title}
              </Link>
            ))}
        </div>
        <Link href="/shop/collections" className={s.othersFootLink}>
          All collections
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const sourced = await getShopCollections();
  const all = [
    "house-approved", // virtual collection (curated seal, not a Shopify collection)
    ...NAV.map((c) => c.handle),
    ...COLLECTIONS.map((c) => c.handle),
    ...sourced.map((c) => c.handle),
  ];
  return Array.from(new Set(all)).map((handle) => ({ handle }));
}
