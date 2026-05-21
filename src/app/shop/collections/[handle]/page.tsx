import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard, type ProductCardData } from "@/components/commerce/ProductCard";
import { getShopCollection, getShopCollections } from "@/lib/shop-data/source";
import { COLLECTIONS, PRODUCTS } from "@/lib/shop-data";
import s from "./collection.module.css";

type ResolvedCollection = {
  title: string;
  products: ProductCardData[];
};

async function resolveCollection(handle: string): Promise<ResolvedCollection | null> {
  // Prefer hand-curated local collections (e.g. "house-approved")
  const local = COLLECTIONS.find((c) => c.handle === handle);
  if (local) {
    const products = local.productHandles
      .map((h) => PRODUCTS.find((p) => p.handle === h))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    return { title: local.title, products };
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
  const collection = await resolveCollection(handle);
  if (!collection) return { title: "Collection not found" };
  return {
    title: `${collection.title} — Shop`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = await resolveCollection(handle);
  if (!collection) notFound();

  const products = collection.products;
  const otherCollections = await getShopCollections();

  return (
    <div className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <Link href="/shop" className={s.crumbLink}>Shop</Link>
          <span className={s.crumbSep}>/</span>
          <span>{collection.title}</span>
        </nav>
        <p className={s.heroEy}>The House · Shop</p>
        <h1 className={s.heroTitle}>
          {collection.title}.
        </h1>
        <p className={s.heroCount}>
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
      </section>

      {/* Product grid */}
      <section className={s.grid}>
        <div className={s.gridInner}>
          {products.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

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
            .filter((c, i, a) => c.handle !== handle && a.findIndex((x) => x.handle === c.handle) === i)
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
    ...COLLECTIONS.map((c) => c.handle),
    ...sourced.map((c) => c.handle),
  ];
  return Array.from(new Set(all)).map((handle) => ({ handle }));
}
