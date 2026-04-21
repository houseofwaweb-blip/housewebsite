import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Gallery — responsive image grid (desktop) → horizontal scroll-snap
 * carousel (mobile). Native CSS, no JS carousel library.
 *
 * Desktop: 3-col grid by default (configurable).
 * Mobile:  single-row horizontal scroll with snap-x snap-mandatory.
 *          Partial peek of the next image signals "swipe for more".
 *
 * Each image optionally has a caption below it.
 */
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  /** Desktop columns. Default 3. */
  columns?: 2 | 3 | 4;
  /** Image aspect ratio. Default "4/3". */
  aspectRatio?: string;
  className?: string;
}

const COL_CLASSES = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
} as const;

export function Gallery({
  images,
  columns = 3,
  aspectRatio = "4/3",
  className,
}: GalleryProps) {
  if (!images.length) return null;

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop: grid */}
      <div className={cn("hidden md:grid gap-4", COL_CLASSES[columns])}>
        {images.map((img) => (
          <GalleryItem key={img.src} image={img} aspectRatio={aspectRatio} />
        ))}
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-[5vw] px-[5vw] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-house-brown/15">
        {images.map((img) => (
          <div key={img.src} className="shrink-0 w-[85vw] snap-start">
            <GalleryItem image={img} aspectRatio={aspectRatio} />
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryItem({
  image,
  aspectRatio,
}: {
  image: GalleryImage;
  aspectRatio: string;
}) {
  return (
    <figure className="m-0">
      <div
        className="relative w-full overflow-hidden bg-house-cream-dark"
        style={{ aspectRatio }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, 85vw"
          className="object-cover"
        />
      </div>
      {image.caption ? (
        <figcaption className="mt-2 font-sans text-[11px] tracking-[0.04em] text-house-stone italic">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
