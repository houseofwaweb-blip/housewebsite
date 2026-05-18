import Image from "next/image";
import s from "./shop.module.css";
import { CATALOGUE_PRODUCTS, CATALOGUE_COLLECTIONS, CATALOGUE_BRANDS } from "@/lib/shop-data/catalogue";
import { ShopBrowser } from "./ShopBrowser";

export const metadata = {
  title: "Shop — Objects worth keeping.",
  description:
    "Curated objects from the House of Willow Alexander. Tools, home, and wear — each House Approved for craft, provenance, and lasting use.",
};

export default function ShopPage() {
  return (
    <div className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>The House · Shop</p>
            <h1 className={s.heroTitle}>
              Objects worth <em>keeping.</em>
            </h1>
            <p className={s.heroLede}>
              Curated tools, homewares and small objects — each chosen for
              craft, provenance and lasting use. Verified by the House,
              written back to your home record through HoWA.
            </p>
            <p className={s.heroCount}>
              {CATALOGUE_PRODUCTS.length} pieces
            </p>
            <div className={s.heroNotice}>
              <p>
                A preview of the House Shop. The full edit is being staged for
                launch — pieces below are browsable now, with checkout opening
                soon.
              </p>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src="/home-v4/house-temperaments-still-life.png"
            alt="Still life of curated objects from the House"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* Gallery Wall browser */}
      <ShopBrowser
        products={CATALOGUE_PRODUCTS}
        collections={CATALOGUE_COLLECTIONS.filter((c) => c.productCount >= 5)}
        brands={CATALOGUE_BRANDS.filter((b) => b.count >= 3)}
      />
    </div>
  );
}
