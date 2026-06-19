import s from "./shop.module.css";
import {
  getShopProducts,
  getShopCollections,
  getShopBrands,
} from "@/lib/shop-data/source";
import { ShopBrowser } from "./ShopBrowser";

/** The 11 top-level categories — the only collections shown in the filter rail. */
const MAIN_CATEGORY_HANDLES = new Set([
  "apparel", "home-accessories", "household-essentials", "gardening",
  "outdoor-living", "pet-care", "gifts-stationery", "books",
  "soft-furnishings", "furniture-storage", "lighting",
]);

export const metadata = {
  title: { absolute: "The House Marketplace | Home, garden and household essentials" },
  description:
    "Curated objects from the House of Willow Alexander. Tools, home, and wear — each House Approved for craft, provenance, and lasting use.",
};

export default async function ShopPage() {
  const [products, collections, brands] = await Promise.all([
    getShopProducts(),
    getShopCollections(),
    getShopBrands(),
  ]);
  return (
    <div className={s.page}>
      {/* Header — minimal, straight to product (DSM-style). On desktop, pad
          left by the sidebar width so the title centres over the product grid,
          not the whole page. */}
      <section className="border-b border-house-brown/8 px-[5vw] md:pl-[240px] md:pr-8 pt-10 pb-7 text-center">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-house-gold mb-3">
          The House · Marketplace
        </p>
        <h1 className="font-display text-[clamp(30px,3.4vw,48px)] leading-[1.05] tracking-[-0.01em] text-house-brown">
          Objects with a place{" "}
          <em className="italic" style={{ fontFamily: "var(--font-hearth-serif)" }}>
            in the House.
          </em>
        </h1>
        <p className="font-sans text-[13.5px] text-house-stone max-w-[480px] mx-auto mt-4 leading-[1.6]">
          An edited cabinet, not a catalogue. Each thing here is House Approved,
          chosen for how it is made, how long it lasts, and whether it can be
          mended rather than replaced. Tools, linens, garden kit and household
          goods we have used, trust, and would keep.
        </p>
      </section>

      {/* Gallery Wall browser — sidebar shows main categories only (not the
          45 tag sub-collections, House Approved, Services, Migration Review). */}
      <ShopBrowser
        products={products}
        collections={collections.filter((c) => MAIN_CATEGORY_HANDLES.has(c.handle))}
        brands={brands.filter((b) => b.count >= 3)}
      />
    </div>
  );
}
