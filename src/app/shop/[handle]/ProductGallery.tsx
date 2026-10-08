"use client";

import * as React from "react";
import Image from "next/image";
import s from "./product.module.css";

/**
 * ProductGallery — the product imagery.
 *
 * Desktop (>768px): a thumbnail rail beside a large main image; clicking a
 * thumbnail swaps the main image. The "Why the House chose it" plaque sits
 * beneath (desktop only; on mobile it is rendered below the buy box by the
 * page so the price + Add to basket come first — Fix 3).
 *
 * Mobile (<=768px): no thumbnail rail. The images are a single swipeable
 * gallery with dots (scroll-snap), so the first screen is just the product
 * photo, then the title/price/buttons from the buy box underneath.
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
  const [mobileActive, setMobileActive] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const onTrackScroll = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setMobileActive(Math.max(0, Math.min(images.length - 1, i)));
  }, [images.length]);

  if (!images.length) return null;

  const multi = images.length > 1;
  const main = images[Math.min(active, images.length - 1)];

  const seal = whyChosen ? (
    <span className={`${s.imgSeal} is-round`} aria-hidden="true">
      <span className={s.sealTop}>The House</span>
      <span className={s.sealMark}>&#10022;</span>
      <span className={s.sealBot}>Chosen</span>
    </span>
  ) : null;

  return (
    <div className={s.galleryCol}>
      {/* Desktop: thumbnail rail + main image */}
      <div className={`${s.gallery} ${s.galleryDesktop}`}>
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
                <Image src={img.src} alt="" width={160} height={160} className={s.thumbImg} />
              </button>
            ))}
          </div>
        ) : null}

        <div className={s.mainWrap}>
          {/* No `priority` here: this desktop image is display:none on mobile,
              so preloading it would waste bandwidth on phones (140/154 of the
              paid clicks). The mobile LCP image (slide 0 below) carries priority
              instead. On desktop this still loads eagerly, high in the DOM. */}
          <Image
            src={main.src}
            alt={main.alt}
            width={1400}
            height={1750}
            sizes="52vw"
            className={s.mainImg}
          />
          {seal}
        </div>
      </div>

      {/* Mobile: swipeable gallery with dots (no thumbnail strip) */}
      <div className={s.mobileGallery}>
        <div
          className={s.mobileTrack}
          ref={trackRef}
          onScroll={onTrackScroll}
          role="group"
          aria-label="Product images, swipe to browse"
        >
          {images.map((img, i) => (
            <div className={s.mobileSlide} key={img.src + i}>
              <Image
                src={img.src}
                alt={img.alt}
                width={1400}
                height={1750}
                priority={i === 0}
                sizes="100vw"
                className={s.mobileSlideImg}
              />
              {i === 0 ? seal : null}
            </div>
          ))}
        </div>
        {multi ? (
          <div className={s.dots} aria-hidden="true">
            {images.map((img, i) => (
              <span key={img.src + i} className={i === mobileActive ? `${s.dot} ${s.dotOn}` : s.dot} />
            ))}
          </div>
        ) : null}
      </div>

      {/* Why the House chose it — desktop only (mobile renders it below the buy box). */}
      {whyChosen ? (
        <figure className={`${s.plaque} ${s.plaqueDesktop}`}>
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
