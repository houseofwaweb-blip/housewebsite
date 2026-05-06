import Image from "next/image";
import Link from "next/link";
import { getWPProducts, formatPrice } from "@/lib/commerce/wp-preview";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import s from "./shop-journal-pair.module.css";

/**
 * Shop + Journal teaser pair, low on the homepage.
 *
 * Shop pulls from WP/WC preview API while the Shopify migration is in
 * flight. Journal pulls from the Sanity-backed Hearth Magazine — same
 * source as /journal — so the homepage teaser and the magazine stay
 * in sync.
 */
export async function ShopJournalPair() {
  const [products, articles] = await Promise.all([
    getWPProducts(3),
    getLatestHearthArticles(3),
  ]);

  return (
    <section aria-label="Shop and Journal" className={s.section}>
      <div className={s.inner}>
        {/* ---- Shop column ---- */}
        <div className={s.col}>
          <header className={s.colHead}>
            <h2 className={s.colTitle}>From the Shop</h2>
            <Link href="/shop" className={s.colLink}>
              Browse all →
            </Link>
          </header>

          {products.length ? (
            <div className={s.shopGrid}>
              {products.map((p) => (
                <Link key={p.id} href={p.permalink} className={s.product}>
                  <div className={s.productImg}>
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.imageAlt ?? p.name}
                        width={400}
                        height={400}
                        sizes="(min-width: 1100px) 18vw, 30vw"
                      />
                    ) : null}
                  </div>
                  <div className={s.productMeta}>
                    <p className={s.productName}>{p.name}</p>
                    <p className={s.productPrice}>{formatPrice(p.priceMinor, p.currency)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className={s.productEmpty}>Shop loading…</p>
          )}
        </div>

        <div aria-hidden="true" className={s.divider} />

        {/* ---- Journal column ---- */}
        <div className={s.col}>
          <header className={s.colHead}>
            <h2 className={s.colTitle}>From The Hearth</h2>
            <Link href="/journal" className={s.colLink}>
              Read all →
            </Link>
          </header>

          {articles.length ? (
            <ul className={s.journalList}>
              {articles.map((a) => (
                <li key={a.slug} className={s.journalItem}>
                  <Link href={`/journal/${a.slug}`} className={s.journalLink}>
                    <p className={s.journalDate}>
                      {a.category}
                      {a.publishedAt && (
                        <>
                          {" · "}
                          {new Date(a.publishedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </>
                      )}
                    </p>
                    <h3 className={s.journalTitle}>{a.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.productEmpty}>Journal loading…</p>
          )}
        </div>
      </div>
    </section>
  );
}
