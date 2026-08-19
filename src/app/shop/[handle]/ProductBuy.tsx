"use client";

import * as React from "react";
import { useCart } from "@/components/commerce/CartContext";
import { gaEvent, parseAmount } from "@/lib/google/ga4";
import type { ProductVariant } from "@/lib/shop-data/shopify-catalogue";

/**
 * ProductBuy — variant picker (when >1), a quantity stepper, and the
 * add-to-basket CTA combined into one bordered row (House of Hackney
 * style: [ − qty + ][ Add to basket ]). In catalog mode (SHOP_BUYABLE
 * off) it collapses to a calm "Available at launch" label.
 */
export function ProductBuy({
  variants,
  product,
}: {
  variants: ProductVariant[];
  product: { handle: string; title: string; price: string; image: string };
}) {
  const { add, busy, buyable } = useCart();
  const firstAvailable = variants.find((v) => v.availableForSale) ?? variants[0];
  const [variantId, setVariantId] = React.useState(firstAvailable?.id ?? "");
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  const selected = variants.find((v) => v.id === variantId) ?? firstAvailable;
  const multi = variants.length > 1;

  // GA4 view_item — once per product view. Same measurement ID as the WP site
  // so shop reporting stays continuous across the cutover.
  React.useEffect(() => {
    gaEvent("view_item", {
      currency: "GBP",
      value: parseAmount(product.price),
      items: [
        { item_id: product.handle, item_name: product.title, price: parseAmount(product.price) },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.handle]);

  if (!selected) {
    return (
      <span className="font-sans text-[18px] tracking-[0.16em] uppercase text-house-stone">
        Unavailable
      </span>
    );
  }

  const soldOut = !selected.availableForSale;

  // Catalog mode — browse only, no purchasing yet.
  if (!buyable) {
    return (
      <div className="mb-3">
        {/* Buy action stand-in until checkout is live — same size as the Home
            Record button below it, distinct colour (brand brown vs gold) */}
        <span className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 font-sans text-[14px] tracking-[0.18em] uppercase text-house-cream bg-house-brown border border-house-brown">
          Available at launch
        </span>
      </div>
    );
  }

  async function handleAdd() {
    if (!selected || soldOut) return;
    await add(
      selected.id,
      {
        handle: product.handle,
        title: product.title,
        price: selected.price || product.price,
        image: product.image,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  const stepBtn =
    "w-9 h-11 flex items-center justify-center text-[21px] text-house-brown/70 hover:text-house-brown transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer select-none";

  return (
    <div className="flex flex-col gap-5 mb-9">
      {multi ? (
        <label className="flex flex-col gap-2">
          <span className="font-sans text-[14px] tracking-[0.18em] uppercase text-house-stone">
            Option
          </span>
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="font-sans text-[18px] text-house-brown bg-house-white border border-house-brown/20 px-4 py-3 cursor-pointer focus:border-house-gold focus:outline-none"
            aria-label="Choose an option"
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                {v.title}
                {v.availableForSale ? "" : " (sold out)"}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      {/* Combined quantity + add-to-basket row */}
      <div className="flex items-stretch border border-house-brown/25">
        <div className="flex items-center shrink-0 border-r border-house-brown/25">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className={stepBtn}
          >
            −
          </button>
          <span className="w-7 text-center font-sans text-[18px] text-house-brown tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className={stepBtn}
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut || busy}
          className="flex-1 px-6 font-sans text-[14px] tracking-[0.22em] uppercase text-house-brown bg-house-gold-ink border-0 transition-[filter] duration-[var(--t-base)] ease-out hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {soldOut ? "Sold out" : busy ? "Adding…" : added ? "Added ✓" : "Add to basket"}
        </button>
      </div>
    </div>
  );
}
