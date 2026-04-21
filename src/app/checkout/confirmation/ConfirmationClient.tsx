"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/commerce/CartContext";

export function ConfirmationClient() {
  const { lines, subtotal } = useCart();

  return (
    <article className="bg-house-cream text-house-brown">
      <div className="max-w-[680px] mx-auto px-[5vw] py-14 text-center">
        {/* Animated check */}
        <div className="is-round w-14 h-14 border-2 border-house-gold mx-auto mb-6 flex items-center justify-center [animation:howa-bump_var(--t-xslow)_var(--ease-settle)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-house-gold">
            <polyline points="6 12 10 16 18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="em-accent font-display font-medium text-[clamp(28px,4vw,44px)] leading-[1.1] mb-1.5">
          Thank <em>you.</em>
        </h1>
        <p className="font-sans text-[15px] text-house-stone leading-[1.55] mb-8">
          Your order has been placed. A confirmation email is on its way.
        </p>

        {/* Order card */}
        {lines.length > 0 ? (
          <div className="bg-house-white border border-house-brown/8 p-7 text-left mb-6">
            <div className="flex justify-between items-baseline mb-4 pb-3 border-b border-house-brown/6">
              <h3 className="font-display font-medium text-[16px]">Order summary</h3>
              <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-house-gold">
                HoWA-{new Date().getFullYear()}-{String(Date.now()).slice(-5)}
              </span>
            </div>

            {lines.map((line) => (
              <div key={line.handle} className="flex gap-3.5 py-2.5 border-b border-house-brown/4 last:border-b-0">
                <div className="w-12 h-[60px] flex-shrink-0 overflow-hidden bg-house-cream">
                  <Image
                    src={line.image}
                    alt={line.title}
                    width={96}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="font-display font-medium text-[13px]">{line.title}</span>
                  <span className="block font-sans text-[10px] text-house-stone mt-0.5">
                    {line.collection} · Qty: {line.quantity}
                  </span>
                </div>
                <span className="font-display font-medium text-[13px] flex items-center">{line.price}</span>
              </div>
            ))}

            <div className="mt-3 pt-3 border-t border-house-brown/8">
              <div className="flex justify-between font-sans text-[13px] py-0.5">
                <span className="text-house-stone">Subtotal</span>
                <span>£{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-sans text-[13px] py-0.5">
                <span className="text-house-stone">Delivery</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between items-baseline pt-2.5 mt-1.5 border-t border-house-brown/8">
                <span className="font-display font-medium text-[16px]">Total paid</span>
                <span className="font-display font-medium text-[16px]">£{subtotal.toFixed(0)}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Delivery details */}
        <div className="bg-house-white border border-house-brown/8 p-6 text-left mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold mb-1.5">Delivering to</div>
            <p className="font-sans text-[13px] leading-[1.5]">Your delivery address</p>
          </div>
          <div>
            <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold mb-1.5">Delivery method</div>
            <p className="font-sans text-[13px] leading-[1.5]">Standard delivery<br />3–5 working days, tracked</p>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-house-white border border-house-brown/8 p-6 text-left mb-6">
          <h3 className="font-display font-medium text-[15px] mb-3">What happens next</h3>
          {[
            { n: "1.", text: "Confirmation email sent to your inbox with order details and tracking link." },
            { n: "2.", text: "Your items are carefully packed at our partner workshops. Most orders ship within 24 hours." },
            { n: "3.", text: "You'll receive a dispatch notification with live tracking when your order leaves." },
          ].map((step) => (
            <div key={step.n} className="flex gap-3 py-2">
              <span className="font-display italic text-[13px] text-house-gold flex-shrink-0 w-5">{step.n}</span>
              <span className="font-sans text-[13px] text-house-stone leading-[1.5]">{step.text}</span>
            </div>
          ))}
        </div>

        {/* HoWA+ upsell */}
        <div className="bg-howa-navy text-house-cream p-6 text-left mb-6">
          <div className="font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold-light mb-1.5">
            HoWA+ · You'd have saved £{(subtotal * 0.1).toFixed(0)}
          </div>
          <h4 className="font-display font-medium text-[18px] mb-1">
            Next time, save 10%.
          </h4>
          <p className="font-sans text-[13px] leading-[1.5] text-house-cream/65 mb-3">
            HoWA+ members get 10% off every order, free next-day delivery, priority access to new collections, and your home's living record in HoWA.
          </p>
          <Link
            href="/howa/plans"
            className="inline-block px-6 py-2.5 font-sans text-[11px] tracking-[0.16em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-colors duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Explore HoWA+
          </Link>
        </div>

        {/* CTAs */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/shop"
            className="px-8 py-3.5 font-sans text-[11px] tracking-[0.18em] uppercase text-white bg-house-gold no-underline transition-colors duration-[var(--t-base)] hover:bg-house-gold-light"
          >
            Continue shopping
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3.5 font-sans text-[11px] tracking-[0.18em] uppercase text-house-brown border border-house-brown/25 no-underline transition-all duration-[var(--t-base)] hover:border-house-gold hover:text-house-gold"
          >
            Track your order
          </Link>
        </div>

        <p className="mt-10 font-display italic text-[15px] text-house-stone">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}
