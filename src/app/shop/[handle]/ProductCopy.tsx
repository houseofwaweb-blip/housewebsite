"use client";

import { Accordion } from "@/components/primitives/Accordion";
import type { ShopProduct } from "@/lib/shop-data";

/**
 * ProductCopy — sticky left-column copy stack for the Lookbook layout.
 * All spacing values use explicit pixels matching the approved mockup.
 */
export function ProductCopy({ product: p }: { product: ShopProduct }) {
  const details = [
    p.careNotes && { id: "care", summary: "Care notes", body: <p>{p.careNotes}</p> },
    p.materials && { id: "materials", summary: "Materials", body: <p>{p.materials}</p> },
    p.dimensions && { id: "dimensions", summary: "Dimensions", body: <p>{p.dimensions}</p> },
    p.delivery && { id: "delivery", summary: "Delivery & returns", body: <p>{p.delivery} Returns accepted within 30 days in original condition.</p> },
  ].filter(Boolean) as Array<{ id: string; summary: string; body: React.ReactNode }>;

  return (
    <div
      className={[
        "md:sticky md:top-[58px] md:h-fit md:max-h-[calc(100vh-58px)] md:overflow-y-auto md:border-r md:border-house-brown/8",
        "max-md:static max-md:max-h-none max-md:overflow-visible max-md:border-b max-md:border-house-brown/8",
        "px-[5vw] py-[48px]",
      ].join(" ")}
    >
      <p className="font-display italic text-[24px] leading-[1.45] text-house-stone mb-[24px] max-w-[480px]">
        {p.lede}
      </p>

      <p className="font-sans text-[15px] leading-[1.75] text-house-brown/85 mb-[20px] max-w-[480px]">
        {p.body}
      </p>

      {p.delivery ? (
        <p className="font-sans text-[12px] text-house-stone mb-[20px]">
          {p.delivery}
        </p>
      ) : null}

      {details.length > 0 ? <Accordion items={details} /> : null}

      <div className="mt-[28px] pt-[24px] border-t border-house-brown/10">
        <div className="font-display font-medium text-[24px] mb-[14px]">
          {p.price}
        </div>
        <span
          aria-label="Available soon"
          className="inline-block px-[18px] py-[10px] font-sans text-[11px] tracking-[0.24em] uppercase text-house-stone/80 bg-house-cream-dark border border-house-brown/10"
        >
          Available soon
        </span>
      </div>
    </div>
  );
}
