"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/commerce/CartContext";

/**
 * ProductRailCard — homepage "Fresh from the shelves" card. The product image
 * bleeds into a burgundy info block (name, price) with a one-click add-to-basket.
 * Single-variant → adds straight to the cart; multi-variant → routes to the PDP
 * to choose options; catalog-mode / no-variant → no button.
 */
export function ProductRailCard({
  name,
  price,
  image,
  href,
  handle,
  variantId,
  multiVariant = false,
  inStock = true,
}: {
  name: string;
  price: string;
  image: string | null;
  href: string;
  handle: string;
  variantId?: string;
  multiVariant?: boolean;
  inStock?: boolean;
}) {
  const { add, buyable, busy } = useCart();
  const [added, setAdded] = React.useState(false);

  async function handleAdd() {
    if (!variantId || !inStock) return;
    await add(variantId, { handle, title: name, price, image: image ?? "" }, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  const btnBase =
    "mt-4 block w-full border py-2.5 text-center font-sans text-[11px] tracking-[0.18em] uppercase no-underline transition-colors";

  return (
    <div className="group flex flex-col overflow-hidden" style={{ background: "var(--ins-accent)" }}>
      <Link href={href} className="block no-underline">
        <div className="relative aspect-square w-full overflow-hidden bg-house-cream-dark">
          {image ? (
            <Image src={image} alt={name} fill sizes="(min-width:640px) 22vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4 text-house-cream">
        <Link href={href} className="no-underline">
          <p className="font-sans text-[15px] leading-tight text-house-cream group-hover:text-house-gold-light">{name}</p>
        </Link>
        <p className="mt-1 font-sans text-[14px] text-house-cream/75">{price}</p>

        {buyable && multiVariant ? (
          <Link href={href} className={`${btnBase} border-house-cream/45 text-house-cream hover:bg-house-cream/10`}>
            Choose options
          </Link>
        ) : buyable && variantId ? (
          <button
            type="button"
            onClick={handleAdd}
            disabled={!inStock || busy}
            className={`${btnBase} border-house-cream/50 text-house-cream hover:bg-house-cream hover:text-[color:var(--ins-accent)] disabled:opacity-60`}
          >
            {!inStock ? "Sold out" : added ? "Added ✓" : "Add to basket"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
