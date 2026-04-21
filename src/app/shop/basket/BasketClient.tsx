"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/commerce/CartContext";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ProductCard } from "@/components/commerce/ProductCard";
import { findProduct, PRODUCTS } from "@/lib/shop-data";

const HOUSE_NOTES: Record<string, { text: string; pairingHandle?: string; pairingReason?: string }> = {
  "heritage-secateurs": {
    text: "These secateurs pair beautifully with the Copper Watering Can. Both develop a living patina over the seasons, and they're from the same English workshop.",
    pairingHandle: "copper-watering-can",
    pairingReason: "Patina companion piece",
  },
  "copper-watering-can": {
    text: "Copper develops a natural verdigris over time. If you prefer to keep it bright, a gentle polish with lemon and salt works beautifully.",
    pairingHandle: "heritage-secateurs",
    pairingReason: "From the same workshop",
  },
  "linen-garden-apron": {
    text: "This linen gets softer with every wash. The pockets are sized for secateurs in the left, phone in the right, twine in the middle.",
    pairingHandle: "heritage-secateurs",
    pairingReason: "Garden essential",
  },
  "waxed-stockman-coat": {
    text: "Re-wax annually to keep the water resistance. We recommend the same wax dressing used by the maker — available in the shop soon.",
  },
};

export function BasketClient() {
  const { lines, count, subtotal, updateQty, remove, add, openDrawer } = useCart();

  const suggested = PRODUCTS.filter(
    (p) => !lines.some((l) => l.handle === p.handle),
  ).slice(0, 4);

  if (lines.length === 0) {
    return (
      <article className="bg-house-cream text-house-brown">
        <section className="px-[5vw] py-[12vh] text-center max-w-[600px] mx-auto">
          <h1 className="em-accent font-display font-medium text-[clamp(36px,5vw,52px)] leading-[1.08] mb-4">
            Your basket is <em>empty.</em>
          </h1>
          <p className="font-sans text-[16px] text-house-stone leading-[1.6] mb-8">
            Nothing here yet. Browse the shop to find objects worth keeping.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Browse the shop
          </Link>
        </section>
      </article>
    );
  }

  return (
    <article className="bg-house-cream text-house-brown">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="px-[5vw] pt-4 pb-2 font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone"
      >
        <Link href="/shop" className="no-underline hover:text-house-gold transition-colors">
          Shop
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-house-brown">Your basket</span>
      </nav>

      {/* Two-column layout */}
      <section className="max-w-[1200px] mx-auto px-[5vw] pb-16 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-start">
        {/* Left: items */}
        <div>
          <h1 className="em-accent font-display font-medium text-[clamp(32px,4vw,48px)] leading-[1.08] mb-1">
            Your <em>Basket.</em>
          </h1>
          <p className="font-sans text-[13px] text-house-stone mb-8">
            {count} {count === 1 ? "piece" : "pieces"}, curated by you.
          </p>

          {lines.map((line) => {
            const note = HOUSE_NOTES[line.handle];
            const pairing = note?.pairingHandle ? findProduct(note.pairingHandle) : null;
            const alreadyInCart = pairing && lines.some((l) => l.handle === pairing.handle);

            return (
              <div key={line.handle} className="py-6 border-t border-house-brown/8">
                {/* Item row */}
                <div className="grid grid-cols-[100px_1fr_auto] max-md:grid-cols-[80px_1fr] gap-4 items-start">
                  <div className="w-full aspect-[4/5] bg-house-cream-dark overflow-hidden">
                    <Image
                      src={line.image}
                      alt={line.title}
                      width={200}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold mb-0.5">
                      {line.collection}
                      {line.houseApproved ? " · House Approved" : ""}
                    </span>
                    <span className="block font-display font-medium text-[17px] mb-0.5">
                      {line.title}
                    </span>
                    <div className="flex items-center gap-2.5 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQty(line.handle, line.quantity - 1)}
                        className="w-7 h-7 border border-house-brown/15 bg-transparent text-[14px] flex items-center justify-center cursor-pointer hover:border-house-gold transition-colors duration-[var(--t-base)]"
                      >
                        −
                      </button>
                      <span className="font-sans text-[13px] min-w-[20px] text-center">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(line.handle, line.quantity + 1)}
                        className="w-7 h-7 border border-house-brown/15 bg-transparent text-[14px] flex items-center justify-center cursor-pointer hover:border-house-gold transition-colors duration-[var(--t-base)]"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.handle)}
                      className="mt-2.5 font-sans text-[10px] tracking-[0.14em] uppercase text-house-stone bg-transparent border-0 cursor-pointer hover:text-house-brown transition-colors duration-[var(--t-base)]"
                    >
                      Remove
                    </button>
                  </div>
                  <span className="font-display font-medium text-[17px] max-md:col-start-2 max-md:row-start-1 max-md:text-right">
                    {line.price}
                  </span>
                </div>

                {/* House note */}
                {note ? (
                  <div className="bg-house-white border border-house-brown/8 p-4 mt-3.5 flex gap-3.5 items-start">
                    <div className="flex-shrink-0 w-7 h-7 border border-house-gold flex items-center justify-center font-display italic text-[12px] text-house-gold">
                      H
                    </div>
                    <div>
                      <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-house-gold mb-1">
                        House note
                      </div>
                      <p className="font-sans text-[12px] leading-[1.5] text-house-stone">
                        {note.text}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Pairing suggestion */}
                {pairing && !alreadyInCart ? (
                  <div className="bg-house-cream-dark p-3.5 mt-2.5 flex gap-3 items-center hover:bg-house-cream transition-colors duration-[var(--t-base)] cursor-pointer">
                    <div className="w-11 h-14 flex-shrink-0 overflow-hidden bg-house-stone">
                      <Image
                        src={pairing.image}
                        alt={pairing.title}
                        width={88}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-display font-medium text-[13px]">
                        {pairing.title}
                      </div>
                      <div className="font-sans text-[11px] text-house-stone italic mt-0.5">
                        {note?.pairingReason}
                      </div>
                    </div>
                    <span className="font-display font-medium text-[13px] mr-2.5">
                      {pairing.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        add({
                          handle: pairing.handle,
                          title: pairing.title,
                          price: pairing.price,
                          image: pairing.image,
                          collection: pairing.collection ?? "",
                          houseApproved: pairing.houseApproved,
                        });
                      }}
                      className="font-sans text-[10px] tracking-[0.14em] uppercase text-house-gold border border-house-gold px-3.5 py-1.5 bg-transparent cursor-pointer whitespace-nowrap transition-all duration-[var(--t-base)] hover:bg-house-gold hover:text-white"
                    >
                      Add
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Right: sticky summary */}
        <div className="md:sticky md:top-[80px]">
          <div className="bg-house-white border border-house-brown/8 p-7">
            <h3 className="font-display font-medium text-[18px] mb-5">
              Order summary
            </h3>
            <div className="flex justify-between font-sans text-[13px] py-1.5 border-b border-house-brown/4">
              <span className="text-house-stone">Subtotal ({count} {count === 1 ? "piece" : "pieces"})</span>
              <span>£{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-sans text-[13px] py-1.5 border-b border-house-brown/4">
              <span className="text-house-stone">Delivery</span>
              <span>Complimentary</span>
            </div>
            <div className="flex justify-between font-sans text-[13px] py-1.5">
              <span className="text-house-stone">Gift wrapping</span>
              <span>—</span>
            </div>
            <div className="flex justify-between items-baseline pt-3.5 mt-2 border-t border-house-brown/12">
              <span className="font-display font-medium text-[16px]">Total</span>
              <span className="font-display font-medium text-[16px]">£{subtotal.toFixed(0)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-4 mt-5 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold text-center no-underline transition-colors duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Proceed to checkout
            </Link>
            <Link
              href="/shop"
              className="block text-center mt-3 font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone no-underline hover:text-house-brown transition-colors duration-[var(--t-base)]"
            >
              Continue shopping
            </Link>
          </div>

          {/* HoWA+ upsell */}
          <div className="bg-howa-navy text-house-cream p-5 mt-4">
            <div className="font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold-light mb-1">
              HoWA+ · £16.99 /month
            </div>
            <h4 className="font-display font-medium text-[16px] mb-1">
              Save 10% on every order.
            </h4>
            <p className="font-sans text-[12px] leading-[1.5] text-house-cream/65 mb-2">
              Priority access to new collections, free next-day delivery, and 10% off everything.
            </p>
            <div className="font-display font-medium text-[15px] text-house-gold-light">
              You'd save £{(subtotal * 0.1).toFixed(0)} on this order.
            </div>
            <Link
              href="/howa/plans"
              className="inline-block mt-2 font-sans text-[10px] tracking-[0.16em] uppercase text-house-gold-light no-underline border-b border-dotted border-house-gold-light pb-0.5 hover:border-solid transition-all"
            >
              Learn about HoWA+ →
            </Link>
          </div>

          {/* Trust */}
          <div className="flex flex-col gap-2 mt-4 pt-3.5 border-t border-house-brown/6">
            {["House Approved quality", "Complimentary delivery", "28-day returns", "Secure checkout via Shopify"].map(
              (t) => (
                <span key={t} className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.12em] uppercase text-house-stone">
                  <span className="is-round w-[5px] h-[5px] bg-house-gold" />
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Suggested products */}
      {suggested.length > 0 ? (
        <section className="px-[5vw] py-16 bg-house-white border-t border-house-brown/10">
          <div className="max-w-[1200px] mx-auto">
            <Eyebrow>You might also like</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(24px,3vw,32px)] leading-[1.15] mt-2 mb-6">
              From the same <em>collections.</em>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {suggested.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
