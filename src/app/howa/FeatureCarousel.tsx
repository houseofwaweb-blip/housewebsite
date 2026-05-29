"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./howa.module.css";

type Feature = {
  name: string;
  desc: string;
  image: string;
};

export function FeatureCarousel({ features }: { features: Feature[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(`.${s.feature}`));
    if (cards.length === 0) return;

    const trackRect = track.getBoundingClientRect();
    const trackLeft = trackRect.left + track.clientLeft;
    let nearest = 0;
    let nearestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (dist < nearestDist) {
        nearest = i;
        nearestDist = dist;
      }
    });
    setActive(nearest);
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      track.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(`.${s.feature}`));
    const card = cards[index];
    if (!card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    track.scrollBy({
      left: cardRect.left - trackRect.left - track.clientLeft,
      behavior: "smooth",
    });
  };

  const prev = () => scrollTo(Math.max(0, active - 1));
  const next = () => scrollTo(Math.min(features.length - 1, active + 1));

  return (
    <>
      <div className={s.featureCarousel} ref={trackRef}>
        {features.map((f) => (
          <article key={f.name} className={s.feature}>
            <div className={s.featureImage}>
              <Image
                src={f.image}
                alt={f.name}
                width={600}
                height={400}
                sizes="(max-width: 900px) 80vw, 32vw"
              />
            </div>
            <h3 className={s.featureName}>{f.name}</h3>
            <p className={s.featureDesc}>{f.desc}</p>
          </article>
        ))}
      </div>

      <div className={s.carouselControls}>
        <button
          type="button"
          className={s.carouselArrow}
          onClick={prev}
          disabled={atStart}
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className={s.carouselDots} role="tablist" aria-label="Features">
          {features.map((f, i) => (
            <button
              key={f.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={f.name}
              className={`${s.carouselDot} ${i === active ? s.carouselDotActive : ""}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>

        <div className={s.carouselCount}>
          <span className={s.carouselCountActive}>
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className={s.carouselCountSlash}>/</span>
          <span>{String(features.length).padStart(2, "0")}</span>
        </div>

        <button
          type="button"
          className={s.carouselArrow}
          onClick={next}
          disabled={atEnd}
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </>
  );
}
