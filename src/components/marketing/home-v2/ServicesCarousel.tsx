"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import s from "./services-carousel.module.css";

interface ServiceCard {
  slug: string;
  name: string;
  tagline: string;
  imageSrc: string;
  href: string;
}

const SERVICES: ServiceCard[] = [
  {
    slug: "gardening",
    name: "Gardening",
    tagline: "Planting and maintenance by gardeners who know the difference between a bay and a laurel.",
    imageSrc: "/services/gardening.png",
    href: "/services/gardening",
  },
  {
    slug: "window-cleaning",
    name: "Window cleaning",
    tagline: "Pure-water pole, carbon-neutral fleet, no streaks. Federation-certified.",
    imageSrc: "/services/window-cleaning.png",
    href: "/services/window-cleaning",
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    tagline: "Trained, uniformed teams using organic products. Battery-powered, fragrance-free on request.",
    imageSrc: "/services/cleaning.png",
    href: "/services/cleaning",
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter cleaning",
    tagline: "SkyVac vacuum-pole system with camera inspection. Photos filed to your record.",
    imageSrc: "/services/gutter-cleaning.png",
    href: "/services/gutter-cleaning",
  },
];

export function ServicesCarousel({ heading, eyebrow }: { heading?: string; eyebrow?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
      setIndex(i);
    }
  };
  const prev = () => scrollTo(Math.max(0, index - 1));
  const next = () => scrollTo(Math.min(SERVICES.length - 1, index + 1));

  return (
    <div className={s.wrap}>
      <header className={s.head}>
        <div>
          {eyebrow && <div className={s.eyebrow}>{eyebrow}</div>}
          {heading && <h3 className={s.heading}>{heading}</h3>}
        </div>
        <div className={s.controls} aria-label="Carousel controls">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous service"
            className={s.controlBtn}
          >
            <ChevronLeft size={18} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index === SERVICES.length - 1}
            aria-label="Next service"
            className={s.controlBtn}
          >
            <ChevronRight size={18} strokeWidth={1.6} />
          </button>
        </div>
      </header>

      <div ref={trackRef} className={s.track}>
        {SERVICES.map((svc) => (
          <article key={svc.slug} className={s.card}>
            <div className={s.cardImg}>
              <Image
                src={svc.imageSrc}
                alt={svc.name}
                width={800}
                height={600}
                sizes="(min-width: 1100px) 40vw, 90vw"
              />
            </div>
            <div className={s.cardCopy}>
              <h4 className={s.cardName}>{svc.name}</h4>
              <p className={s.cardTagline}>{svc.tagline}</p>
              <Link href={svc.href} className={s.cardCta}>
                Book →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className={s.dots} role="tablist" aria-label="Carousel position">
        {SERVICES.map((svc, i) => (
          <button
            key={svc.slug}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to ${svc.name}`}
            onClick={() => scrollTo(i)}
            className={`${s.dot} ${i === index ? s.dotActive : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
