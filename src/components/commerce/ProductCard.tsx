import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * ProductCard — the commerce grid tile.
 *
 * Design intent: Aesop meets Net-a-Porter.
 * - Big image (4:5 portrait, fills the card)
 * - Quiet type below: title in Didot, price in Effra, optional badge
 * - No "Add to cart" on the grid. The CTA is the card itself (full-card link).
 * - Hover: image breathes (1.02 scale), title shifts gold
 * - "House Approved" seal if flagged
 * - Compare-at price shown struck-through when on sale
 *
 * Playground patterns used: card lift (subtle), image zoom, title-to-gold.
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
}

export function ProductCard({
  product,
  className,
}: {
  product: ProductCardData;
  className?: string;
}) {
  return (
    <Link
      href={`/shop/${product.handle}`}
      className={cn(
        "group flex flex-col no-underline",
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
          <span className="absolute top-3 left-3 font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold bg-white/90 px-2.5 py-1 border border-house-gold/30">
            House Approved
          </span>
        ) : null}
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-1">
        {product.collection ? (
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-house-gold">
            {product.collection}
          </span>
        ) : null}
        <h3 className="font-display font-medium text-[18px] leading-[1.25] text-house-brown transition-colors duration-[var(--t-slow)] ease-out group-hover:text-house-gold">
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
    </Link>
  );
}
