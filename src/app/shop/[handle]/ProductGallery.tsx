"use client";

import * as React from "react";
import Image from "next/image";
import s from "./product.module.css";

/**
 * ProductGallery — thumbnail rail (left) + large main image.
 * Clicking a thumbnail swaps the main image. Single-image products
 * render just the main image with no rail. On mobile the rail moves
 * below the main image as a horizontal strip (CSS column-reverse).
 */
export function ProductGallery({
  images,
}: {
  images: Array<{ src: string; alt: string }>;
}) {
  const [active, setActive] = React.useState(0);
  if (!images.length) return null;

  const multi = images.length > 1;
  const main = images[Math.min(active, images.length - 1)];

  return (
    <div className={s.gallery}>
      {multi ? (
        <div className={s.thumbs} role="list" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              role="listitem"
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={i === active ? `${s.thumb} ${s.thumbActive}` : s.thumb}
            >
              <Image
                src={img.src}
                alt=""
                width={160}
                height={160}
                className={s.thumbImg}
              />
            </button>
          ))}
        </div>
      ) : null}

      <div className={s.mainWrap}>
        <Image
          src={main.src}
          alt={main.alt}
          width={1400}
          height={1750}
          priority
          sizes="(max-width: 900px) 100vw, 52vw"
          className={s.mainImg}
        />
      </div>
    </div>
  );
}
