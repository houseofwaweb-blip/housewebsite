import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { QuickAdd } from "./QuickAdd";

/**
 * ProductCard — the commerce grid tile.
 *
 * Design intent: Aesop meets Net-a-Porter.
 * - Big image (4:5 portrait, fills the card)
 * - Quiet type below: title in Didot, price in Effra, optional badge
 * - Quick-add on hover (DESIGN.md: "single-click add-to-cart"): single-variant
 *   products add in one click; multi-variant show "Choose options" → PDP.
 *   Hidden in catalog mode. See QuickAdd.
 * - Whole card is a stretched link to the product page; the quick-add button
 *   sits above it so its clicks are its own (valid HTML, no button-in-anchor).
 * - Hover: image breathes (1.02 scale), title shifts gold, card lifts
 * - "House Approved" seal if flagged
 * - Compare-at price shown struck-through when on sale
 */

export interface ProductCardData {
  handle: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  imageAlt?: string;
  houseApproved?: boolean;
  collection?: string;
  /** Shopify default variant GID — enables one-click add. */
  variantId?: string;
  /** More than one variant → "Choose options" instead of quick-add. */
  multiVariant?: boolean;
  inStock?: boolean;
}

export function ProductCard({
  product,
  className,
}: {
  product: ProductCardData;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col",
        "transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark mb-4">
        <Image
          src={product.image}
          alt={product.imageAlt || product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-all duration-[var(--t-xslow)] ease-out group-hover:scale-[1.02]"
        />
        {product.houseApproved ? (
          <span className="absolute top-3 left-3 z-20 font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold-dark bg-white/90 px-2.5 py-1 border border-house-gold/30">
            House Approved
          </span>
        ) : null}

        {/* Quick-add — above the stretched link */}
        <QuickAdd
          handle={product.handle}
          title={product.title}
          price={product.price}
          image={product.image}
          variantId={product.variantId}
          multiVariant={product.multiVariant}
          inStock={product.inStock}
        />
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-1">
        {product.collection ? (
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-house-gold-dark">
            {product.collection}
          </span>
        ) : null}
        <h3 className="font-display font-medium text-[18px] leading-[1.25] text-house-brown transition-colors duration-[var(--t-slow)] ease-out group-hover:text-house-gold-dark">
          {product.title}
        </h3>
        <div className="font-sans text-[14px] text-house-stone">
          {product.compareAtPrice ? (
            <>
              <span className="line-through text-house-stone/60 mr-2">
                {product.compareAtPrice}
              </span>
              <span className="text-house-brown">{product.price}</span>
            </>
          ) : (
            <span>{product.price}</span>
          )}
        </div>
      </div>

      {/* Stretched link to the product page (whole card) */}
      <Link
        href={`/shop/${product.handle}`}
        aria-label={product.title}
        className="absolute inset-0 z-10"
      />
    </div>
  );
}
