"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

/**
 * QuickAdd — the grid-card add-to-basket affordance.
 *
 * - Single-variant products: one-click "Add to basket" (optimistic toast +
 *   drawer, handled by CartContext.add).
 * - Multi-variant products: "Choose options" → product page (can't pick a
 *   size/colour from a grid tile).
 * - Hidden entirely in catalog mode (SHOP_BUYABLE off).
 *
 * Sits above the card's stretched link (z-20) so its clicks are its own.
 * Reveals on hover (desktop) and stays visible on touch.
 */
export function QuickAdd({
  handle,
  title,
  price,
  image,
  variantId,
  multiVariant,
  inStock = true,
}: {
  handle: string;
  title: string;
  price: string;
  image: string;
  variantId?: string;
  multiVariant?: boolean;
  inStock?: boolean;
}) {
  const { add, buyable, busy } = useCart();
  const [added, setAdded] = React.useState(false);

  if (!buyable) return null;

  const wrap =
    "absolute inset-x-0 bottom-0 z-20 p-2.5 opacity-0 translate-y-2 transition-all duration-[var(--t-base)] ease-out group-hover:opacity-100 group-hover:translate-y-0 max-md:opacity-100 max-md:translate-y-0";
  const base =
    "block w-full py-2.5 text-center font-sans text-[12px] tracking-[0.18em] uppercase no-underline transition-colors duration-[var(--t-base)] ease-out";

  // Multi-variant → send them to the product page to pick options.
  if (multiVariant) {
    return (
      <div className={wrap}>
        <Link
          href={`/shop/${handle}`}
          className={`${base} text-house-brown bg-house-white/95 border border-house-brown/15 hover:border-house-gold`}
        >
          Choose options
        </Link>
      </div>
    );
  }

  if (!variantId) return null;
  const soldOut = !inStock;

  async function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (soldOut || !variantId) return;
    await add(variantId, { handle, title, price, image }, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className={wrap}>
      <button
        type="button"
        onClick={handleAdd}
        disabled={soldOut || busy}
        className={`${base} text-white bg-house-gold border border-house-gold hover:bg-house-gold-light disabled:opacity-70 cursor-pointer`}
      >
        {soldOut ? "Sold out" : added ? "Added ✓" : "Add to basket"}
      </button>
    </div>
  );
}
