import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getShopCollection,
  getShopCollections,
  getShopProducts,
} from "@/lib/shop-data/source";
import { COLLECTIONS, PRODUCTS } from "@/lib/shop-data";
import type { CatalogueProduct } from "@/lib/shop-data/catalogue";
import SHOP_NAV from "@/lib/shop-data/shop-nav.generated.json";
import { ShopBrowser } from "../../ShopBrowser";
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
    const products = (await getShopProducts()).filter((p) => p.houseApproved);
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
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const mainCat = NAV.find((c) => c.handle === handle);
  if (mainCat) return { title: `${mainCat.title} | Shop` };
  const collection = await resolveCollection(handle);
  if (!collection) return { title: "Collection not found" };
  return {
    title: `${collection.title} | Shop`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const mainCat = NAV.find((c) => c.handle === handle);

  // ── Main category page: full filter rail (Brand · Price · Stock · Sort),
  //    scoped to this category, with the sub-categories as navigation links. ──
  if (mainCat) {
    const all = await getShopProducts();
    const products = all.filter((p) => p.collectionHandles?.includes(handle));
    if (products.length === 0) notFound();

    const brands = deriveBrands(products);

    return (
      <div className={s.page}>
        <section className={s.hero}>
          <nav aria-label="Breadcrumb" className={s.crumbs}>
            <Link href="/shop" className={s.crumbLink}>Shop</Link>
            <span className={s.crumbSep}>/</span>
            <span>{mainCat.title}</span>
          </nav>
          <p className={s.heroEy}>The House · Shop</p>
          <h1 className={s.heroTitle}>{mainCat.title}.</h1>
        </section>

        <ShopBrowser
          products={products}
          collections={[]}
          brands={brands}
          subNav={mainCat.subs}
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
  const otherCollections = await getShopCollections();
  const parentCat = NAV.find((c) => c.subs.some((sub) => sub.handle === handle));
  const brands = deriveBrands(products);

  return (
    <div className={s.page}>
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
          <span>{collection.title}</span>
        </nav>
        <p className={s.heroEy}>The House · Shop</p>
        <h1 className={s.heroTitle}>
          {collection.title}.
        </h1>
      </section>

      {/* Full filter rail (no categories section), scoped to this product type */}
      <ShopBrowser products={products} collections={[]} brands={brands} />

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
