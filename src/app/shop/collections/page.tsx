import Link from "next/link";
import { COLLECTIONS } from "@/lib/shop-data";
import { getShopCollections } from "@/lib/shop-data/source";
import s from "./collections-index.module.css";

export const metadata = {
  title: "Collections | Shop",
  description:
    "Every curated edit in the House Shop. The House Selection, garden, home, and the categories that follow.",
};

type CollectionListItem = {
  handle: string;
  title: string;
  count: number;
  featured?: boolean;
};

// Back-office collections — kept in Shopify, hidden from the public shop.
const HIDDEN_HANDLES = new Set(["services", "migration-review", "migration", "migration_review"]);
function isHidden(c: { handle: string; title: string }): boolean {
  return (
    HIDDEN_HANDLES.has(c.handle) ||
    /migration[-_ ]?review/i.test(c.title) ||
    /^services$/i.test(c.title)
  );
}

async function getAllCollections(): Promise<CollectionListItem[]> {
  const local: CollectionListItem[] = COLLECTIONS.map((c) => ({
    handle: c.handle,
    title: c.title,
    count: c.productHandles.length,
    featured: c.handle === "house-approved",
  }));
  const localHandles = new Set(local.map((c) => c.handle));
  const sourced = await getShopCollections();
  const catalogue: CollectionListItem[] = sourced
    .filter((c) => !localHandles.has(c.handle))
    .map((c) => ({
      handle: c.handle,
      title: c.title,
      count: c.productCount,
      featured: false,
    }));
  // Featured first, then by count descending. Hidden back-office collections
  // (services, migration-review) are filtered out of the public list.
  return [...local, ...catalogue]
    .filter((c) => !isHidden(c))
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.count - a.count;
    });
}

export default async function CollectionsIndexPage() {
  const collections = await getAllCollections();
  const totalPieces = collections.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <Link href="/shop" className={s.crumbLink}>Shop</Link>
          <span className={s.crumbSep}>/</span>
          <span>Collections</span>
        </nav>
        <p className={s.heroEy}>The House · Shop</p>
        <h1 className={s.heroTitle}>
          Curated <em>collections.</em>
        </h1>
        <p className={s.heroLede}>
          Every category in the House Shop, gathered as edits. Start with what
          we mark as Chosen by the House.
        </p>
        <p className={s.heroCount}>
          {collections.length} collections · {totalPieces} pieces
        </p>
      </section>

      {/* Collections grid */}
      <section className={s.grid}>
        <div className={s.gridInner}>
          {collections.map((c) => (
            <Link
              key={c.handle}
              href={`/shop/collections/${c.handle}`}
              className={`${s.card} ${c.featured ? s.cardFeatured : ""}`}
            >
              {c.featured ? (
                <span className={s.cardRibbon}>Featured</span>
              ) : null}
              <h3 className={s.cardTitle}>{c.title}</h3>
              <p className={s.cardCount}>
                {c.count} {c.count === 1 ? "piece" : "pieces"}
              </p>
              <span className={s.cardCta}>Browse →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
