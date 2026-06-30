"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/commerce/CartContext";

export function BasketClient() {
  const { lines, count, subtotal, updateQty, remove, buyable } = useCart();

  if (lines.length === 0) {
    return (
      <article className="bg-house-cream text-house-brown">
        <section className="px-[5vw] py-[12vh] text-center max-w-[600px] mx-auto">
          <h1 className="font-display font-medium text-[clamp(36px,5vw,52px)] leading-[1.08] mb-4">
            Your basket is <em className="italic">empty.</em>
          </h1>
          <p className="font-sans text-[16px] text-house-stone leading-[1.6] mb-8">
            Browse the curation. Anything you add will appear here, ready to check out.
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

  const qtyBtn =
    "w-7 h-7 border border-house-brown/15 bg-transparent text-[14px] flex items-center justify-center cursor-pointer hover:border-house-gold transition-colors duration-[var(--t-base)]";

  return (
    <article className="bg-house-cream text-house-brown">
      <nav aria-label="Breadcrumb" className="px-[5vw] pt-4 pb-2 font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone">
        <Link href="/shop" className="no-underline hover:text-house-gold-dark transition-colors">Shop</Link>
        <span className="mx-1.5">/</span>
        <span className="text-house-brown">Basket</span>
      </nav>

      <section className="max-w-[1200px] mx-auto px-[5vw] pb-16 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-start">
        {/* Items */}
        <div>
          <h1 className="font-display font-medium text-[clamp(32px,4vw,48px)] leading-[1.08] mb-1">
            Your <em className="italic">basket.</em>
          </h1>
          <p className="font-sans text-[13px] text-house-stone mb-8">
            {count} {count === 1 ? "item" : "items"}
          </p>

          {lines.map((line) => (
            <div key={line.id} className="py-6 border-t border-house-brown/8">
              <div className="grid grid-cols-[100px_1fr_auto] max-md:grid-cols-[80px_1fr] gap-4 items-start">
                <Link href={`/shop/${line.handle}`} className="block w-full aspect-[4/5] bg-house-cream-dark overflow-hidden">
                  {line.image ? (
                    <Image src={line.image} alt={line.title} width={200} height={250} className="w-full h-full object-cover" />
                  ) : null}
                </Link>
                <div>
                  <Link href={`/shop/${line.handle}`} className="block font-display font-medium text-[17px] mb-1 no-underline text-house-brown hover:text-house-gold-dark transition-colors">
                    {line.title}
                  </Link>
                  <div className="flex items-center gap-2.5 mt-2">
                    <button type="button" aria-label="Decrease quantity" onClick={() => updateQty(line.id, line.quantity - 1)} className={qtyBtn}>−</button>
                    <span className="font-sans text-[13px] min-w-[20px] text-center">{line.quantity}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => updateQty(line.id, line.quantity + 1)} className={qtyBtn}>+</button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.id)}
                    className="mt-2.5 font-sans text-[10px] tracking-[0.14em] uppercase text-house-stone bg-transparent border-0 cursor-pointer hover:text-house-brown transition-colors duration-[var(--t-base)]"
                  >
                    Remove
                  </button>
                </div>
                <span className="font-display font-medium text-[17px] max-md:col-start-2 max-md:row-start-1 max-md:text-right">
                  {line.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="md:sticky md:top-[80px]">
          <div className="bg-house-white border border-house-brown/8 p-7">
            <h3 className="font-display font-medium text-[18px] mb-4">Summary</h3>
            <div className="flex justify-between items-baseline font-sans text-[13px] py-2 border-b border-house-brown/8">
              <span className="text-house-stone">Subtotal</span>
              <span className="font-display font-medium text-[18px]">{subtotal}</span>
            </div>
            <p className="font-sans text-[11px] text-house-stone mt-2 mb-5">
              Shipping &amp; taxes calculated at checkout.
            </p>
            {buyable ? (
              <Link
                href="/shop/checkout"
                className="block w-full py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold text-center no-underline transition-colors duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
              >
                Checkout
              </Link>
            ) : (
              <p className="block w-full py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-house-stone border border-house-brown/15 text-center">
                Checkout available at launch
              </p>
            )}
            <Link
              href="/shop"
              className="block text-center mt-3 font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone no-underline hover:text-house-brown transition-colors duration-[var(--t-base)]"
            >
              Continue browsing
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
