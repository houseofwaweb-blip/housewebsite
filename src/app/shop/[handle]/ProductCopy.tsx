"use client";

import Link from "next/link";
import { Accordion } from "@/components/primitives/Accordion";
import { useCart } from "@/components/commerce/CartContext";
import type { ShopProduct } from "@/lib/shop-data";

/**
 * ProductCopy — sticky left-column copy stack for the Lookbook layout.
 * All spacing values use explicit pixels matching the approved mockup.
 */
export function ProductCopy({ product: p }: { product: ShopProduct }) {
  const { add, openDrawer } = useCart();

  function handleAdd() {
    add({
      handle: p.handle,
      title: p.title,
      price: p.price,
      image: p.images[0]?.src ?? p.image,
      collection: p.collection ?? "",
      houseApproved: p.houseApproved,
    });
    openDrawer();
  }

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

      <div className="bg-house-cream border border-house-gold/25 px-[18px] py-[14px] mb-[24px]">
        <p className="font-sans text-[13px] text-house-brown">
          <span className="font-medium text-house-gold">HoWA+ members</span>{" "}
          save 10% on every order.{" "}
          <Link
            href="/howa/plans"
            className="underline decoration-house-gold underline-offset-[3px] hover:text-house-gold transition-colors"
          >
            Join for £16.99/mo
          </Link>
        </p>
      </div>

      {details.length > 0 ? <Accordion items={details} /> : null}

      <div className="mt-[28px] pt-[24px] border-t border-house-brown/10">
        <div className="font-display font-medium text-[24px] mb-[14px]">
          {p.price}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="w-full max-w-[360px] py-[16px] font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light cursor-pointer"
        >
          Add to basket
        </button>
      </div>
    </div>
  );
}
