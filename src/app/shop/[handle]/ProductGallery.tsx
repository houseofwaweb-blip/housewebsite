"use client";

import Image from "next/image";

/**
 * ProductGallery — right-column image stack (desktop) / horizontal
 * peek-carousel (mobile) for the Lookbook layout.
 *
 * Desktop: simple vertical flex-col, overflow-hidden (no scrollbar).
 * Mobile: horizontal scroll-snap at 85vw per image, peek from right.
 * Gold hairline dividers between images on desktop only.
 */
export function ProductGallery({
  images,
}: {
  images: Array<{ src: string; alt: string }>;
}) {
  return (
    <div
      className={[
        /* Desktop: vertical stack, overflow hidden — NO scrollbar */
        "md:flex md:flex-col md:overflow-hidden",
        /* Mobile: horizontal carousel with snap */
        "max-md:flex max-md:flex-row max-md:overflow-x-auto max-md:[scroll-snap-type:x_mandatory] max-md:[-webkit-overflow-scrolling:touch]",
      ].join(" ")}
    >
      {images.map((img, i) => (
        <div key={img.src} className="max-md:shrink-0 max-md:w-[85vw] max-md:[scroll-snap-align:start] max-md:first:ml-[5vw] max-md:mr-[3vw] max-md:last:mr-[5vw]">
          {/* Gold hairline divider — desktop only, not before first image */}
          {i > 0 ? (
            <div aria-hidden="true" className="h-px bg-house-gold/20 max-md:hidden" />
          ) : null}
          <Image
            src={img.src}
            alt={img.alt}
            width={1400}
            height={1750}
            sizes="(max-width: 768px) 85vw, 50vw"
            className="w-full h-auto object-cover max-md:aspect-[4/5]"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
