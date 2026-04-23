"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * PartnerCarousel — horizontal scroll carousel of partner cards.
 *
 * Scroll-snap on mobile (swipe), arrow buttons on desktop.
 * Each card: type label, name, bio, specialty tags, House Approved badge,
 * "View profile →" link. Cards are 85vw on mobile, 380px on desktop.
 *
 * Ends with a "More partners joining" ghost tile + "Become a partner" link.
 * "See all House Approved partners" link below the carousel.
 *
 * Scales to any number of partners. Designed for the design marketplace.
 */

export interface PartnerCardData {
  slug: string;
  name: string;
  type: string;
  shortBio: string;
  specialties?: string[];
  houseApprovedSeal?: boolean;
}

interface Props {
  partners: PartnerCardData[];
  heading: string;
  headingEm?: string;
  lede?: string;
  /** Render on dark background (brown band). Cards stay white. */
  dark?: boolean;
  className?: string;
}

function typeLabel(t: string): string {
  switch (t) {
    case "design-studio": return "Design Studio";
    case "interior-designer": return "Interior Designer";
    case "craftsman": return "Craftsman";
    case "brand-partner": return "Partner";
    default: return "Partner";
  }
}

export function PartnerCarousel({ partners, heading, headingEm, lede, dark = false, className }: Props) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  const check = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  React.useEffect(() => {
    check();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [check]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.querySelector("[data-card]")?.clientWidth ?? 380;
    el.scrollBy({ left: dir === "right" ? w + 24 : -(w + 24), behavior: "smooth" });
  };

  return (
    <section className={cn(dark ? "bg-house-brown px-[5vw] py-[88px]" : "bg-house-cream px-[5vw] py-[88px]", className)}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <span className={cn("block font-sans text-[11px] tracking-[0.22em] uppercase mb-3", dark ? "text-house-gold-light" : "")} style={dark ? undefined : { color: "var(--house-gold-dark)" }}>
              Our designers
            </span>
            <h2 className={cn("font-display font-medium text-[clamp(28px,3.6vw,46px)] leading-[1.1] tracking-[-0.01em]", dark && "text-house-cream")}>
              {headingEm ? (
                <>{heading.split(headingEm)[0]}<em className="italic">{headingEm}</em>{heading.split(headingEm)[1] ?? ""}</>
              ) : heading}
            </h2>
            {lede && (
              <p className={cn("font-sans text-[16px] leading-[1.65] mt-3 max-w-[52ch]", dark ? "text-house-cream/65" : "text-house-brown/70")}>{lede}</p>
            )}
          </div>
          {/* Scroll arrows (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <button type="button" onClick={() => scroll("left")} disabled={!canLeft} aria-label="Scroll left"
              className={cn("w-10 h-10 flex items-center justify-center border text-[18px] transition-all duration-[var(--t-base)]",
                dark
                  ? (canLeft ? "border-house-cream/30 text-house-cream hover:border-house-cream cursor-pointer" : "border-house-cream/10 text-house-cream/20 cursor-default")
                  : (canLeft ? "border-house-brown/20 text-house-brown hover:border-house-brown cursor-pointer" : "border-house-brown/8 text-house-brown/20 cursor-default")
              )}>
              &larr;
            </button>
            <button type="button" onClick={() => scroll("right")} disabled={!canRight} aria-label="Scroll right"
              className={cn("w-10 h-10 flex items-center justify-center border text-[18px] transition-all duration-[var(--t-base)]",
                dark
                  ? (canRight ? "border-house-cream/30 text-house-cream hover:border-house-cream cursor-pointer" : "border-house-cream/10 text-house-cream/20 cursor-default")
                  : (canRight ? "border-house-brown/20 text-house-brown hover:border-house-brown cursor-pointer" : "border-house-brown/8 text-house-brown/20 cursor-default")
              )}>
              &rarr;
            </button>
          </div>
        </div>

        {/* Card strip */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-[5vw] px-[5vw] md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {partners.map((p) => (
            <Link
              key={p.slug}
              href={`/partners/${p.slug}`}
              data-card
              className="group flex-none w-[85vw] sm:w-[380px] snap-start bg-house-white border border-house-brown/10 p-8 no-underline flex flex-col transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(48,35,28,0.08)] hover:border-[var(--house-gold-dark)]"
            >
              {/* Type + seal */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--house-gold-dark)" }}>
                  {typeLabel(p.type)}
                </span>
                {p.houseApprovedSeal && (
                  <span className="font-sans text-[9px] tracking-[0.16em] uppercase text-house-moss border border-house-moss/30 px-2 py-0.5">
                    House Approved
                  </span>
                )}
              </div>

              {/* Name + gold rule */}
              <h3 className="font-display font-medium text-[26px] leading-[1.15] text-house-brown mb-1">
                {p.name}
              </h3>
              <div className="h-px w-7 mb-4 transition-[width] duration-[var(--t-slow)] ease-out group-hover:w-16" style={{ background: "var(--house-gold-dark)" }} />

              {/* Bio */}
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-5 flex-1">
                {p.shortBio}
              </p>

              {/* Tags */}
              {p.specialties && p.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.specialties.slice(0, 4).map((s) => (
                    <span key={s} className="font-sans text-[10px] tracking-[0.06em] text-house-brown/55 border border-house-brown/12 px-2 py-0.5">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <span className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.16em] uppercase" style={{ color: "var(--house-gold-dark)" }}>
                View profile
                <span className="inline-block transition-transform duration-[var(--t-slow)] ease-out group-hover:translate-x-2">&rarr;</span>
              </span>
            </Link>
          ))}

          {/* Ghost tile */}
          <div key="__ghost" className={cn(
            "flex-none w-[85vw] sm:w-[320px] snap-start border border-dashed p-8 flex flex-col items-center justify-center text-center",
            dark ? "border-house-cream/20" : "border-house-brown/15"
          )}>
            <p className={cn("font-display italic text-[17px] mb-3", dark ? "text-house-cream/40" : "text-house-brown/40")}>
              More partners joining soon.
            </p>
            <Link
              href="/contact"
              className={cn(
                "font-sans text-[11px] tracking-[0.16em] uppercase no-underline pb-px border-b transition-colors",
                dark ? "border-house-cream/25 text-house-cream/50 hover:text-house-cream" : "border-house-brown/30 text-house-brown/50 hover:text-house-brown"
              )}
            >
              Become a partner &rarr;
            </Link>
          </div>
        </div>

        {/* See all link */}
        <div className="mt-8 text-center">
          <Link
            href="/partners"
            className={cn(
              "inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.18em] uppercase no-underline pb-1 border-b transition-[color,border-style] duration-[var(--t-slow)] ease-out hover:border-dotted",
              dark ? "text-house-gold-light border-house-gold-light" : ""
            )}
            style={dark ? undefined : { color: "var(--house-gold-dark)", borderColor: "var(--house-gold-dark)" }}
          >
            See all House Approved partners
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
