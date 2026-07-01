"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";

export type Slide = {
  handle: string;
  title: string;
  price: string;
  image: string;
  alt: string;
  excerpt?: string;
  houseApproved?: boolean;
  variantId?: string;
  multiVariant?: boolean;
  inStock?: boolean;
};

/**
 * ProductSlider — one piece at a time: text on the left, image on the right,
 * navigated with arrows / dots. A slower, editorial rhythm than a grid.
 */
export function ProductSlider({ title, slides }: { title: string; slides: Slide[] }) {
  const [i, setI] = React.useState(0);
  if (slides.length === 0) return null;
  const n = slides.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);
  const s = slides[i];

  const arrow =
    "w-10 h-10 flex items-center justify-center border border-house-brown/20 text-house-brown hover:border-house-gold hover:text-house-gold-ink transition-colors cursor-pointer";

  return (
    <section className="px-[5vw] py-[clamp(44px,5.5vw,80px)] border-b border-house-brown/8">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-end justify-between mb-9">
          <h2 className="font-display italic text-[clamp(22px,2.6vw,32px)] text-house-brown">{title}</h2>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous piece" className={arrow}>←</button>
            <button type="button" onClick={() => go(1)} aria-label="Next piece" className={arrow}>→</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-[clamp(24px,4vw,60px)] items-center">
          {/* Text — left */}
          <div className="order-2 md:order-1">
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink mb-4">
              {s.houseApproved ? "House Approved" : "From the collection"}
            </p>
            <h3 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.08] text-house-brown mb-3">
              {s.title}
            </h3>
            <p className="font-sans text-[16px] text-house-stone mb-5">{s.price}</p>
            {s.excerpt ? (
              <p className="font-sans text-[15px] leading-[1.7] text-house-brown/70 max-w-[46ch] mb-7 line-clamp-3">
                {s.excerpt}{" "}
                <Link href={`/shop/${s.handle}`} className="text-house-gold-ink no-underline whitespace-nowrap hover:text-house-brown">
                  Read more →
                </Link>
              </p>
            ) : null}
            <div>
              <AddToCartButton
                handle={s.handle}
                title={s.title}
                price={s.price}
                image={s.image}
                variantId={s.variantId}
                multiVariant={s.multiVariant}
                inStock={s.inStock}
                className="inline-flex items-center justify-center font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-7 py-3.5 no-underline transition-colors hover:bg-house-gold-dark hover:border-house-gold-dark disabled:opacity-70 cursor-pointer"
              />
            </div>
          </div>

          {/* Image — right */}
          <Link
            href={`/shop/${s.handle}`}
            className="group order-1 md:order-2 relative aspect-[4/5] block overflow-hidden bg-house-cream-dark no-underline"
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
            />
          </Link>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-9">
          {slides.map((slide, k) => (
            <button
              key={slide.handle}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Go to piece ${k + 1}`}
              aria-current={k === i}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-house-gold" : "w-1.5 bg-house-brown/25 hover:bg-house-brown/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
