"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HomepageV3, ProtectBlockData } from "@/lib/cms/homepage-v3";
import s from "./protect-block.module.css";

/**
 * Section 4 — "Care that pre-empts" carousel.
 *
 * One horizontal scroll-snap track combining:
 *  - Insurance (lead — wider card)
 *  - Protection Review (from CMS)
 *  - 4 launch services (Gardening / Window cleaning / Cleaning / Gutter cleaning)
 *
 * Cards extend off the right edge so the user knows there's more to swipe to.
 * Arrows + dots for keyboard / mouse nav. "View all services" link beneath.
 */

type Card =
  | {
      kind: "insurance" | "protect";
      label: string;
      headline: string;
      body: string;
      imageUrl?: string;
      imageAlt?: string;
      ctaLabel?: string;
      ctaHref?: string;
    }
  | {
      kind: "service";
      label: string;
      headline: string;
      body: string;
      imageSrc: string;
      ctaHref: string;
    };

const SERVICE_CARDS: Card[] = [
  {
    kind: "service",
    label: "Service",
    headline: "Gardening",
    body: "Planting and seasonal care by gardeners who know the difference between a bay and a laurel.",
    imageSrc: "/services/subbrands/gardeners.jpg",
    ctaHref: "/services/gardening",
  },
  {
    kind: "service",
    label: "Service",
    headline: "Window cleaning",
    body: "Pure-water pole, carbon-neutral fleet, no streaks. Federation-certified.",
    imageSrc: "/services/subbrands/window-cleaner.jpg",
    ctaHref: "/services/window-cleaning",
  },
  {
    kind: "service",
    label: "Service",
    headline: "Cleaning",
    body: "Trained, uniformed teams using organic products. Battery-powered, fragrance-free on request.",
    imageSrc: "/services/subbrands/cleaners.jpg",
    ctaHref: "/services/cleaning",
  },
  {
    kind: "service",
    label: "Service",
    headline: "Gutter cleaning",
    body: "SkyVac vacuum-pole system with camera inspection. Photos filed to your record.",
    imageSrc: "/services/subbrands/gutter-cleaning.webp",
    ctaHref: "/services/gutter-cleaning",
  },
];

function buildCards(data: HomepageV3): Card[] {
  const cards: Card[] = [];
  const insurance = data.protectBlocks?.find((b) => /insurance/i.test(b.label)) ?? data.protectBlocks?.[0];
  const review   = data.protectBlocks?.find((b) => /protection|review/i.test(b.label)) ?? data.protectBlocks?.[1];
  if (insurance) cards.push(toCMSCard(insurance, "insurance"));
  if (review)    cards.push(toCMSCard(review, "protect"));
  cards.push(...SERVICE_CARDS);
  return cards;
}
function toCMSCard(b: ProtectBlockData, kind: "insurance" | "protect"): Card {
  return {
    kind,
    label: b.label,
    headline: b.headline,
    body: b.body,
    imageUrl: b.imageUrl,
    imageAlt: b.imageAlt,
    ctaLabel: b.ctaLabel,
    ctaHref: b.ctaHref,
  };
}

export function ProtectBlock({ data }: { data: HomepageV3 }) {
  const cards = buildCards(data);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      // index = number of leftmost full card scrolled past
      let cumulative = 0;
      let i = 0;
      for (; i < track.children.length; i++) {
        const el = track.children[i] as HTMLElement;
        if (cumulative + el.offsetWidth / 2 > track.scrollLeft) break;
        cumulative += el.offsetWidth + 16;
      }
      setIndex(i);
      // Max index = first card index where scroll-end aligns
      const visible = track.clientWidth;
      const total = track.scrollWidth;
      const trackEndScroll = total - visible;
      let mIdx = cards.length - 1;
      cumulative = 0;
      for (let j = 0; j < track.children.length; j++) {
        const el = track.children[j] as HTMLElement;
        if (cumulative >= trackEndScroll) { mIdx = j; break; }
        cumulative += el.offsetWidth + 16;
      }
      setMaxIndex(mIdx);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [cards.length]);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.children[i] as HTMLElement | undefined;
    if (el) track.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  };
  const prev = () => scrollTo(Math.max(0, index - 1));
  const next = () => scrollTo(Math.min(cards.length - 1, index + 1));

  return (
    <section className={s.protect}>
      <header className={s.head}>
        <div>
          <h2 className={s.title}>Care curated by the House</h2>
        </div>
        <div className={s.controls}>
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous"
            className={s.controlBtn}
          >
            <ChevronLeft size={18} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Next"
            className={s.controlBtn}
          >
            <ChevronRight size={18} strokeWidth={1.6} />
          </button>
        </div>
      </header>

      <div ref={trackRef} className={s.track}>
        {cards.map((card, i) => (
          <article
            key={`${card.kind}-${i}`}
            className={`${s.card} ${card.kind === "insurance" ? s.cardLead : ""}`}
          >
            <div className={s.cardImg}>
              {card.kind === "service" ? (
                <Image
                  src={card.imageSrc}
                  alt={card.headline}
                  width={600}
                  height={800}
                  sizes="(min-width: 1100px) 25vw, 80vw"
                />
              ) : card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt ?? card.label}
                  width={card.kind === "insurance" ? 1200 : 600}
                  height={card.kind === "insurance" ? 675 : 800}
                  sizes={card.kind === "insurance" ? "(min-width: 1100px) 50vw, 80vw" : "(min-width: 1100px) 25vw, 80vw"}
                />
              ) : null}
            </div>
            <div className={s.cardCopy}>
              <div className={s.cardLabel}>{card.label}</div>
              <h3 className={s.cardHeadline}>{card.headline}</h3>
              <p className={s.cardBody}>{card.body}</p>
              {card.kind !== "service" && card.ctaLabel && card.ctaHref && (
                <Link href={card.ctaHref} className={card.kind === "insurance" ? s.cardCtaPrimary : s.cardCtaSecondary}>
                  {card.ctaLabel} →
                </Link>
              )}
              {card.kind === "service" && (
                <Link href={card.ctaHref} className={s.cardCtaSecondary}>
                  Book →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      <footer className={s.foot}>
        <div className={s.dots} role="tablist" aria-label="Carousel position">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to card ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`${s.dot} ${i === index ? s.dotActive : ""}`}
            />
          ))}
        </div>
        <Link href="/services" className={s.viewAll}>
          View all services →
        </Link>
      </footer>
    </section>
  );
}
