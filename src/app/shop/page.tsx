import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CATALOGUE_PRODUCTS, CATALOGUE_COLLECTIONS } from "@/lib/shop-data/catalogue";

export const metadata = {
  title: "Shop",
  description:
    "Curated objects from the House of Willow Alexander. Tools, home, and wear — each House Approved for craft, provenance, and lasting use.",
};

const FEATURED_LIMIT = 8;
const GRID_LIMIT = 24;

export default function ShopPage() {
  const featured = CATALOGUE_PRODUCTS.filter((p) => p.houseApproved).slice(0, FEATURED_LIMIT);
  const allProducts = CATALOGUE_PRODUCTS.slice(0, GRID_LIMIT);
  const topCollections = CATALOGUE_COLLECTIONS.slice(0, 8);

  return (
    <article className="bg-house-white text-house-brown">
      {/* 1. Hero */}
      <section className="bg-house-cream px-[5vw] pt-[12vh] pb-14">
        <div className="max-w-[880px] mx-auto text-center">
          <Eyebrow>The House · Shop</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(48px,6.5vw,88px)] leading-[1.04] tracking-[-0.01em] mt-4">
            Objects worth <em>keeping</em>.
          </h1>
          <p className="font-sans text-[18px] leading-[1.6] text-house-brown/70 mt-6 max-w-[56ch] mx-auto">
            Every piece in the House store has been selected for craft,
            provenance, and the kind of use a real home puts things through.
            No fast turnover. Nothing disposable.
          </p>
        </div>

        {/* Collection strip */}
        <nav className="mt-10 flex justify-center flex-wrap gap-6">
          <Link
            href="/shop"
            className="font-sans text-[11px] tracking-[0.2em] uppercase no-underline text-house-gold border-b border-house-gold pb-0.5"
          >
            All
          </Link>
          {topCollections.map((c) => (
            <Link
              key={c.handle}
              href={`/shop/collections/${c.handle}`}
              className="font-sans text-[11px] tracking-[0.2em] uppercase no-underline text-house-brown hover:text-house-gold transition-colors duration-[var(--t-base)] ease-out"
            >
              {c.title}
            </Link>
          ))}
        </nav>
      </section>

      {/* 2. Featured — House Approved */}
      {featured.length > 0 ? (
        <section className="px-[5vw] py-16 border-t border-house-brown/10">
          <div className="max-w-[1320px] mx-auto">
            <div className="flex items-baseline justify-between mb-8 gap-4">
              <div>
                <Eyebrow>House Approved</Eyebrow>
                <h2 className="font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-2">
                  The mark of the House.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {featured.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 3. Full grid */}
      <section className="px-[5vw] py-16 bg-house-cream border-t border-house-brown/10">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex items-baseline justify-between mb-10 gap-4">
            <div>
              <Eyebrow>Everything</Eyebrow>
              <h2 className="font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-2">
                The full collection.
              </h2>
            </div>
            <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-house-stone">
              {CATALOGUE_PRODUCTS.length} pieces
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {allProducts.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
          {CATALOGUE_PRODUCTS.length > GRID_LIMIT ? (
            <div className="text-center mt-12">
              <Link
                href="/shop/collections/home-accessories"
                className="inline-block px-8 py-3.5 font-sans text-[11px] tracking-[0.18em] uppercase text-house-brown border border-house-brown/30 no-underline transition-all duration-[var(--t-base)] ease-out hover:border-house-gold hover:text-house-gold"
              >
                Browse all {CATALOGUE_PRODUCTS.length} pieces →
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {/* 4. Collections nav */}
      <section className="px-[5vw] py-16 border-t border-house-brown/10">
        <div className="max-w-[1200px] mx-auto">
          <Eyebrow>Collections</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {topCollections.map((c) => (
              <Link
                key={c.handle}
                href={`/shop/collections/${c.handle}`}
                className="group flex flex-col bg-house-cream border border-house-brown/10 p-7 no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5 hover:border-house-gold"
              >
                <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-2">
                  {c.productCount} {c.productCount === 1 ? "piece" : "pieces"}
                </span>
                <h3 className="font-display font-medium text-[24px] leading-[1.2] text-house-brown group-hover:text-house-gold transition-colors duration-[var(--t-slow)] ease-out">
                  {c.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Editorial band */}
      <section className="px-[5vw] py-20 bg-house-brown text-house-cream">
        <div className="max-w-[720px] mx-auto text-center">
          <Eyebrow colour="cream">From the Hearth</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-4">
            The things we <em>write about</em>.
          </h2>
          <p className="font-sans text-[16px] leading-[1.65] text-house-cream/70 mb-8">
            Every object in the House store has a story. The Hearth tells it —
            how it was made, who made it, and why it deserves a place in
            someone&apos;s home.
          </p>
          <GhostLink href="/journal" dark>
            Read the Hearth
          </GhostLink>
        </div>
      </section>

      {/* 6. Closing */}
      <div className="text-center border-t border-house-brown/10 bg-house-white px-5 py-6">
        <p className="font-display italic text-[14px] text-house-stone tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}
