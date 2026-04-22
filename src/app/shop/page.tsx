import { Eyebrow } from "@/components/primitives/Eyebrow";
import { CATALOGUE_PRODUCTS, CATALOGUE_COLLECTIONS, CATALOGUE_BRANDS } from "@/lib/shop-data/catalogue";
import { ShopBrowser } from "./ShopBrowser";

export const metadata = {
  title: "Shop",
  description:
    "Curated objects from the House of Willow Alexander. Tools, home, and wear — each House Approved for craft, provenance, and lasting use.",
};

export default function ShopPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      {/* Compact hero */}
      <section className="text-center px-[5vw] pt-12 pb-8">
        <Eyebrow>The House · Shop</Eyebrow>
        <h1 className="em-accent font-display font-medium text-[clamp(32px,4.5vw,52px)] leading-[1.08] mt-2">
          Objects worth <em>keeping.</em>
        </h1>
        <p className="font-sans text-[12px] text-house-stone mt-1.5">
          {CATALOGUE_PRODUCTS.length} pieces
        </p>
        <div className="mt-6 mx-auto max-w-[480px] bg-house-white border border-house-gold/20 px-5 py-3.5 text-center">
          <p className="font-sans italic text-[13px] text-house-stone leading-[1.5]">
            Our curation is undergoing some renovations. You&apos;ll be able to order from us again soon.
          </p>
        </div>
      </section>

      {/* Gallery Wall browser */}
      <ShopBrowser
        products={CATALOGUE_PRODUCTS}
        collections={CATALOGUE_COLLECTIONS.filter((c) => c.productCount >= 5)}
        brands={CATALOGUE_BRANDS.filter((b) => b.count >= 3)}
      />
    </article>
  );
}
