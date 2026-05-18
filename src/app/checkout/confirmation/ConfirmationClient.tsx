"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/commerce/CartContext";
import s from "./confirmation.module.css";

export function ConfirmationClient() {
  const { lines, subtotal } = useCart();

  // Stable order reference — generated once on mount, never re-derived.
  // The previous inline `Date.now()` call broke SSR/hydration because the
  // server and the client rendered different values, throwing a hydration
  // warning and showing a flickering reference. This is a placeholder
  // until checkout returns a real order ID from Shopify.
  const [orderRef, setOrderRef] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer client-only ID generation to avoid hydration mismatch. Will be replaced by real order ID from Shopify.
    setOrderRef(`HoWA-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`);
  }, []);

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <div className={s.checkRing}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <polyline
              points="6 12 10 16 18 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className={s.eyebrow}>Order confirmed</p>
        <h1 className={s.title}>
          Thank <em>you.</em>
        </h1>
        <p className={s.lede}>
          Your order has been placed. A confirmation email is on its way.
        </p>

        {lines.length > 0 ? (
          <div className={s.card}>
            <div className={s.cardHead}>
              <h3 className={s.cardTitle}>Order summary</h3>
              <span className={s.orderRef} suppressHydrationWarning>
                {orderRef ?? " "}
              </span>
            </div>

            {lines.map((line) => (
              <div key={line.handle} className={s.line}>
                <div className={s.lineImage}>
                  <Image
                    src={line.image}
                    alt={line.title}
                    width={96}
                    height={120}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className={s.lineBody}>
                  <span className={s.lineName}>{line.title}</span>
                  <span className={s.lineMeta}>
                    {line.collection} · Qty: {line.quantity}
                  </span>
                </div>
                <span className={s.linePrice}>{line.price}</span>
              </div>
            ))}

            <div className={s.totals}>
              <div className={s.totalRow}>
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(0)}</span>
              </div>
              <div className={s.totalRow}>
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div className={s.totalFinal}>
                <span>Total paid</span>
                <span>£{subtotal.toFixed(0)}</span>
              </div>
            </div>
          </div>
        ) : null}

        <div className={s.delivery}>
          <div>
            <p className={s.deliveryLabel}>Delivering to</p>
            <p className={s.deliveryValue}>Your delivery address</p>
          </div>
          <div>
            <p className={s.deliveryLabel}>Delivery method</p>
            <p className={s.deliveryValue}>Standard delivery<br />3–5 working days, tracked</p>
          </div>
        </div>

        <div className={s.next}>
          <h3 className={s.nextTitle}>What happens next</h3>
          {[
            { n: "01.", text: "Confirmation email sent to your inbox with order details and tracking link." },
            { n: "02.", text: "Your items are carefully packed at our partner workshops. Most orders ship within 24 hours." },
            { n: "03.", text: "You'll receive a dispatch notification with live tracking when your order leaves." },
          ].map((step) => (
            <div key={step.n} className={s.nextStep}>
              <span className={s.nextStepN}>{step.n}</span>
              <span className={s.nextStepText}>{step.text}</span>
            </div>
          ))}
        </div>

        <div className={s.upsell}>
          <p className={s.upsellEy}>HoWA+ · You'd have saved £{(subtotal * 0.1).toFixed(0)}</p>
          <h4 className={s.upsellTitle}>
            Next time, <em>save 10%.</em>
          </h4>
          <p className={s.upsellBody}>
            HoWA+ members get 10% off every order, free next-day delivery,
            priority access to new collections, and your home's living record
            in HoWA.
          </p>
          <Link href="/howa/plus" className={s.upsellCta}>
            Explore HoWA+
          </Link>
        </div>

        <div className={s.ctas}>
          <Link href="/shop" className={s.btnFilled}>
            Continue shopping
          </Link>
          <Link href="/shop" className={s.btnGhost}>
            Track your order
          </Link>
        </div>

        <p className={s.tagline}>
          Ownership is passive. <em>Stewardship is intentional.</em>
        </p>
      </div>
    </div>
  );
}
