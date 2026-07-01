"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/commerce/CartContext";

/**
 * CheckoutClient — on-site review-and-pay step. Shows the order, then hands
 * off to Shopify's hosted checkout for the actual card entry (Shopify owns
 * PCI). A brief transition overlay makes the redirect feel intentional.
 *
 * Card details are NEVER entered on this page — payment happens on Shopify's
 * secure hosted checkout, reached via the cart's checkoutUrl.
 */
export function CheckoutClient() {
  const { lines, count, subtotal, checkout, checkoutUrl, buyable, busy } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  // Empty basket — nothing to check out.
  if (lines.length === 0) {
    return (
      <article className="bg-house-cream text-house-brown">
        <section className="px-[5vw] py-[12vh] text-center max-w-[600px] mx-auto">
          <h1 className="font-display font-medium text-[clamp(36px,5vw,52px)] leading-[1.08] mb-4">
            Your basket is <em className="italic">empty.</em>
          </h1>
          <p className="font-sans text-[16px] text-house-stone leading-[1.6] mb-8">
            There is nothing to check out yet. Browse the curation and add a piece or two.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-4 font-sans text-[15px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Browse the shop
          </Link>
        </section>
      </article>
    );
  }

  function handlePay() {
    if (!buyable || !checkoutUrl) return;
    setRedirecting(true);
    // Brief calm transition, then hand off to Shopify's hosted checkout.
    window.setTimeout(() => checkout(), 700);
  }

  return (
    <article className="bg-house-cream text-house-brown">
      <nav aria-label="Breadcrumb" className="px-[5vw] pt-4 pb-2 font-sans text-[12px] tracking-[0.14em] uppercase text-house-stone">
        <Link href="/shop" className="no-underline hover:text-house-gold-ink transition-colors">Shop</Link>
        <span className="mx-1.5">/</span>
        <Link href="/shop/basket" className="no-underline hover:text-house-gold-ink transition-colors">Basket</Link>
        <span className="mx-1.5">/</span>
        <span className="text-house-brown">Checkout</span>
      </nav>

      <section className="max-w-[1200px] mx-auto px-[5vw] pb-16 grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 items-start">
        {/* Order review */}
        <div>
          <h1 className="font-display font-medium text-[clamp(32px,4vw,48px)] leading-[1.08] mb-1">
            Review your <em className="italic">order.</em>
          </h1>
          <p className="font-sans text-[15px] text-house-stone mb-8">
            {count} {count === 1 ? "item" : "items"}
            <span className="mx-2 text-house-brown/30">·</span>
            <Link href="/shop/basket" className="underline underline-offset-4 decoration-house-brown/30 hover:decoration-house-gold transition-colors">
              Edit basket
            </Link>
          </p>

          {lines.map((line) => (
            <div key={line.id} className="py-5 border-t border-house-brown/8 grid grid-cols-[88px_1fr_auto] gap-4 items-start">
              <Link href={`/shop/${line.handle}`} className="block w-full aspect-[4/5] bg-house-cream-dark overflow-hidden">
                {line.image ? (
                  <Image src={line.image} alt={line.title} width={180} height={225} className="w-full h-full object-cover" />
                ) : null}
              </Link>
              <div>
                <Link href={`/shop/${line.handle}`} className="block font-display font-medium text-[17px] mb-1 no-underline text-house-brown hover:text-house-gold-ink transition-colors">
                  {line.title}
                </Link>
                <p className="font-sans text-[15px] text-house-stone">
                  Quantity {line.quantity}
                </p>
              </div>
              <span className="font-display font-medium text-[17px] text-right">
                {line.price}
              </span>
            </div>
          ))}
          <div className="border-t border-house-brown/8" />
        </div>

        {/* Summary + pay */}
        <div className="md:sticky md:top-[100px]">
          <div className="bg-house-white border border-house-brown/8 p-7">
            <h3 className="font-display font-medium text-[18px] mb-4">Order summary</h3>
            <div className="flex justify-between items-baseline font-sans text-[15px] py-2 border-b border-house-brown/8">
              <span className="text-house-stone">Subtotal</span>
              <span className="font-display font-medium text-[18px]">{subtotal}</span>
            </div>
            <p className="font-sans text-[12px] text-house-stone mt-2 mb-6 leading-[1.6]">
              Shipping &amp; taxes are calculated at the secure payment step.
            </p>

            {buyable ? (
              <button
                type="button"
                onClick={handlePay}
                disabled={busy || redirecting || !checkoutUrl}
                className="block w-full py-4 font-sans text-[15px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold text-center transition-colors duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light disabled:opacity-60 disabled:cursor-wait cursor-pointer"
              >
                {redirecting ? "Redirecting…" : busy ? "Updating…" : "Continue to secure payment"}
              </button>
            ) : (
              <p className="block w-full py-4 font-sans text-[15px] tracking-[0.18em] uppercase text-house-stone border border-house-brown/15 text-center">
                Checkout available at launch
              </p>
            )}

            <p className="flex items-center justify-center gap-2 mt-4 font-sans text-[12px] text-house-stone">
              <span aria-hidden="true">🔒</span>
              Payment is taken securely. We never see your card details.
            </p>

            <Link
              href="/shop/basket"
              className="block text-center mt-4 font-sans text-[12px] tracking-[0.14em] uppercase text-house-stone no-underline hover:text-house-brown transition-colors duration-[var(--t-base)]"
            >
              Return to basket
            </Link>
          </div>
        </div>
      </section>

      {/* Handoff transition */}
      {redirecting ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-house-cream/95 backdrop-blur-sm"
        >
          <span className="font-display italic text-[clamp(24px,3vw,34px)] text-house-brown animate-pulse">
            Taking you to secure checkout…
          </span>
          <span className="mt-3 font-sans text-[12px] tracking-[0.18em] uppercase text-house-stone">
            One moment
          </span>
        </div>
      ) : null}
    </article>
  );
}
