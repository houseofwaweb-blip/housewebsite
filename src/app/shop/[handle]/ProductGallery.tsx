"use client";

import * as React from "react";
import Image from "next/image";
import { shopifyImage } from "@/lib/commerce/shopify-image";
import s from "./product.module.css";

/**
 * ProductGallery — thumbnail rail (left) + large main image.
 * Clicking a thumbnail swaps the main image. Single-image products
 * render just the main image with no rail. On mobile the rail moves
 * below the main image as a horizontal strip (CSS column-reverse).
 */
export function ProductGallery({
  images,
  whyChosen,
}: {
  images: Array<{ src: string; alt: string }>;
  /** "Why the House chose it" — shown as a seal on the image + plaque beneath. */
  whyChosen?: string;
}) {
  const [active, setActive] = React.useState(0);
  if (!images.length) return null;

  const multi = images.length > 1;
  const main = images[Math.min(active, images.length - 1)];

  return (
    <div className={s.galleryCol}>
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
                  src={shopifyImage(img.src, 200)}
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
            src={shopifyImage(main.src, 1400)}
            alt={main.alt}
            width={1400}
            height={1750}
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className={s.mainImg}
          />
          {whyChosen ? (
            <span className={`${s.imgSeal} is-round`} aria-hidden="true">
              <span className={s.sealTop}>The House</span>
              <span className={s.sealMark}>&#10022;</span>
              <span className={s.sealBot}>Chosen</span>
            </span>
          ) : null}
        </div>
      </div>

      {whyChosen ? (
        <figure className={s.plaque}>
          <figcaption className={s.plaqueHead}>
            <span className={s.plaqueMark} aria-hidden="true">&#10022;</span>
            <span className={s.plaqueLabel}>Why the House chose it</span>
          </figcaption>
          <p className={s.plaqueText}>{whyChosen}</p>
        </figure>
      ) : null}
    </div>
  );
}
