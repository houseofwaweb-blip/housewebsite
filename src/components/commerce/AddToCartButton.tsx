"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

/**
 * AddToCartButton — an inline add-to-basket button for editorial placements
 * (the featured "piece this week", the product slider) where QuickAdd's
 * hover-overlay styling doesn't fit.
 *
 * - Single-variant + in stock → real add-to-basket (optimistic toast + drawer).
 * - Multi-variant / no variant / catalog mode → falls back to a link to the PDP.
 */
export function AddToCartButton({
  handle,
  title,
  price,
  image,
  variantId,
  multiVariant,
  inStock = true,
  className = "",
  label = "Add to basket",
}: {
  handle: string;
  title: string;
  price: string;
  image: string;
  variantId?: string;
  multiVariant?: boolean;
  inStock?: boolean;
  className?: string;
  label?: string;
}) {
  const { add, buyable, busy } = useCart();
  const [added, setAdded] = React.useState(false);

  // Catalog mode, multi-variant, or no variant → send them to the PDP.
  if (!buyable || multiVariant || !variantId) {
    return (
      <Link href={`/shop/${handle}`} className={className}>
        {!buyable ? "View piece →" : multiVariant ? "Choose options →" : "View piece →"}
      </Link>
    );
  }

  const soldOut = !inStock;

  async function handleAdd() {
    if (soldOut || !variantId) return;
    await add(variantId, { handle, title, price, image }, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button type="button" onClick={handleAdd} disabled={soldOut || busy} className={className}>
      {soldOut ? "Sold out" : added ? "Added ✓" : label}
    </button>
  );
}
