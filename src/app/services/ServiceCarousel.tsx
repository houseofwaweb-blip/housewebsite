"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./services.module.css";

/**
 * ServiceCarousel — one-row, scroll-snap slider of sub-brand cards.
 *
 * The cards were already a horizontal scroll-snap strip, but with no visible
 * affordance a half-peeking card just reads as "cut off." This adds explicit
 * controls — prev/next arrows + position bars — that work on touch and desktop,
 * mirroring PartnerCarousel's scroll logic. Image resolution stays server-side
 * (it touches the filesystem), so cards arrive already resolved.
 */

export interface ServiceCardData {
  slug: string;
  name: string;
  tagline: string;
  body: string;
  href: string;
  state: "live" | "soon";
  /** Resolved public path — real photo or the Coming Soon placeholder. */
  image: string;
  /** True when `image` fell back to the Coming Soon placeholder. */
  soon: boolean;
}

export function ServiceCarousel({ cards }: { cards: ServiceCardData[] }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);
  const [active, setActive] = React.useState(0);

  const step = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 1;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap || "24") || 24;
    return (card?.offsetWidth ?? 300) + gap;
  }, []);

  const check = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    setActive(Math.min(cards.length - 1, Math.round(el.scrollLeft / step())));
  }, [step, cards.length]);

  React.useEffect(() => {
    check();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [check]);

  const nudge = (dir: -1 | 1) =>
    scrollRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  const goTo = (i: number) =>
    scrollRef.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <div className={s.carouselWrap}>
      <div className={s.servicesCarousel} ref={scrollRef}>
        {cards.map((svc) => (
          <Link
            key={svc.slug}
            href={svc.href}
            data-card
            className={`${s.serviceCard} ${svc.state === "soon" ? s.serviceCardSoon : ""}`}
            data-state={svc.state}
          >
            <div className={s.serviceImage}>
              <Image
                src={svc.image}
                alt={svc.name}
                width={780}
                height={975}
                sizes="(min-width: 1024px) 320px, 80vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* v4 §5 — no coming-soon service categories. Every service in
                  the catalogue is open for business; a thin photo library is a
                  photography gap, not a trading status. */}
              <span className={s.serviceState}>Available now</span>
            </div>
            <div className={s.serviceBody}>
              <h3 className={s.serviceName}>{svc.name}</h3>
              <p className={s.serviceTagline}>{svc.tagline}</p>
              <p className={s.serviceText}>{svc.body}</p>
              <span className={s.serviceCta}>
                {svc.state === "live" ? `See ${svc.name.toLowerCase()} →` : "Register interest →"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className={s.carouselControls}>
        <button
          type="button"
          className={s.carouselArrow}
          onClick={() => nudge(-1)}
          disabled={!canLeft}
          aria-label="Previous services"
        >
          &larr;
        </button>
        <div className={s.carouselDots}>
          {cards.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              className={`${s.carouselDot} ${i === active ? s.carouselDotActive : ""}`}
              aria-label={`Go to ${c.name}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className={s.carouselArrow}
          onClick={() => nudge(1)}
          disabled={!canRight}
          aria-label="Next services"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
