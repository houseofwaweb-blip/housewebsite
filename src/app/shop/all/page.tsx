import Link from "next/link";
import s from "../shop.module.css";
import {
  getShopProducts,
  getShopCollections,
  getShopBrands,
} from "@/lib/shop-data/source";
import { ShopBrowser } from "../ShopBrowser";
import { HouseStandardStrip } from "@/components/marketing/HouseStandardStrip";

/** The 11 top-level categories — the only collections shown in the filter rail. */
const MAIN_CATEGORY_HANDLES = new Set([
  "apparel", "home-accessories", "household-essentials", "gardening",
  "outdoor-living", "pet-care", "gifts-stationery", "books",
  "soft-furnishings", "furniture-storage", "lighting",
]);

export const metadata = {
  title: { absolute: "All products | The House Marketplace" },
  description:
    "Every House Approved object in one place. Filter by category, brand and House Approved seal.",
};

export default async function ShopAllPage() {
  const [products, collections, brands] = await Promise.all([
    getShopProducts(),
    getShopCollections(),
    getShopBrands(),
  ]);
  return (
    <div className={s.page}>
      <section className="border-b border-house-brown/8 px-[5vw] pt-10 pb-7 text-center">
        <div className="max-w-[760px] mx-auto">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-house-gold-dark mb-3">
            The House · Marketplace
          </p>
          <h1 className="font-display text-[clamp(28px,3vw,44px)] leading-[1.05] tracking-[-0.01em] text-house-brown">
            All products.
          </h1>
          <Link
            href="/shop"
            className="inline-block font-sans text-[11px] tracking-[0.18em] uppercase text-house-gold-dark mt-4 no-underline border-b border-house-gold/40 pb-1"
          >
            ← Shop by room
          </Link>
        </div>
      </section>

      <HouseStandardStrip />

      <ShopBrowser
        products={products}
        collections={collections.filter((c) => MAIN_CATEGORY_HANDLES.has(c.handle))}
        brands={brands.filter((b) => b.count >= 3)}
      />
    </div>
  );
}
