"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { CinemaPlayer } from "@/components/cinema/CinemaPlayer";
import {
  WORK_FILTERS,
  WORK_POSTS,
  type WorkPost,
  type WorkDiscipline,
} from "@/lib/house-at-work";

/**
 * HouseAtWork — "The House at work" proof carousel (final September brief §1).
 *
 * One reusable component: the homepage mixes all four disciplines with filters;
 * a service/design page passes that discipline's posts and showFilters={false}.
 *
 * Reels play via the Cinema-style YouTube player (Plyr) in a centred overlay —
 * House-branded still + gold play button at rest, clean playback on click, no
 * Instagram chrome and nothing heavy hosted on the site. The card's only link is
 * the relevant service/design page. Horizontal scroll-snap (proximity, so it
 * slides smoothly), a drag/click progress bar and prev/next arrows.
 */

const DISCIPLINE_LABEL: Record<WorkDiscipline, string> = {
  gardeners: "Gardeners",
  gardens: "Gardens",
  cleaners: "Cleaners",
  "window-cleaners": "Window Cleaners",
};

interface HouseAtWorkProps {
  posts?: ReadonlyArray<WorkPost>;
  showFilters?: boolean;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  className?: string;
}

export function HouseAtWork({
  posts = WORK_POSTS,
  showFilters = true,
  eyebrow = "The House",
  heading = "The House at work.",
  intro = "Our people, our projects and the everyday work of looking after homes and gardens.",
  className,
}: HouseAtWorkProps) {
  const [filter, setFilter] = React.useState<WorkDiscipline | "all">("all");
  const [open, setOpen] = React.useState<WorkPost | null>(null);
  const [showBar, setShowBar] = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLSpanElement>(null);
  const draggingRef = React.useRef(false);

  const shown =
    showFilters && filter !== "all"
      ? posts.filter((p) => p.discipline === filter)
      : posts;

  // Position the progress bar by writing to the DOM directly (no React state per
  // scroll frame), so scrolling and dragging stay smooth even with many cards.
  const measure = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const scrollable = max > 1;
    setShowBar((prev) => (prev === scrollable ? prev : scrollable));
    const thumb = thumbRef.current;
    if (!scrollable || !thumb) return;
    const w = (el.clientWidth / el.scrollWidth) * 100;
    const left = (el.scrollLeft / max) * (100 - w);
    thumb.style.width = `${w}%`;
    thumb.style.left = `${left}%`;
  }, []);

  React.useEffect(() => {
    measure();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
    // Re-measure when the visible set changes (filter switch).
  }, [measure, shown.length]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Drag / click the bar to scroll — set scrollLeft directly (instant, smooth).
  const seek = (clientX: number) => {
    const barEl = barRef.current;
    const el = trackRef.current;
    if (!barEl || !el) return;
    const rect = barEl.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    el.scrollLeft = frac * (el.scrollWidth - el.clientWidth);
  };
  const onBarPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seek(e.clientX);
  };
  const onBarPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) seek(e.clientX);
  };
  const onBarPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  // Modal: close on Escape, lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <section
      aria-label="The House at work"
      className={cn(
        "border-t border-house-line bg-house-cream px-[5vw] py-[clamp(44px,6vw,88px)]",
        className,
      )}
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Header */}
        <div className="max-w-[52ch]">
          <p className="font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-ink">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[clamp(30px,3.4vw,52px)] leading-[1.04] text-house-brown text-balance">
            {heading}
          </h2>
          <p className="mt-4 max-w-[46ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-house-brown/75">
            {intro}
          </p>
        </div>

        {/* Filters */}
        {showFilters ? (
          <div role="tablist" aria-label="Filter by discipline" className="mt-7 flex flex-wrap gap-2">
            {WORK_FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "border px-4 py-2 font-sans text-[14px] tracking-[0.08em] transition-colors",
                    active
                      ? "border-house-brown bg-house-brown text-house-cream"
                      : "border-house-brown/25 text-house-brown/80 hover:border-house-brown/60",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        ) : null}

        {/* Track */}
        <div
          ref={trackRef}
          className="mt-7 flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shown.map((post) => {
            const playable = post.media === "reel" && Boolean(post.youtubeId);
            return (
              <article
                key={post.id}
                data-card
                className="flex shrink-0 basis-[82%] snap-start flex-col min-[560px]:basis-[46%] lg:basis-[31%] xl:basis-[23.5%]"
              >
                {/* Media */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(min-width:1280px) 24vw, (min-width:1024px) 31vw, (min-width:560px) 46vw, 82vw"
                    className="object-cover"
                  />
                  {playable ? (
                    <button
                      type="button"
                      onClick={() => setOpen(post)}
                      aria-label={`Play: ${post.caption}`}
                      className="absolute inset-0 grid place-items-center bg-house-black/10 transition-colors hover:bg-house-black/25"
                    >
                      <span
                        aria-hidden
                        className="is-round grid h-14 w-14 place-items-center rounded-full border border-house-cream/80 bg-house-black/40 text-house-cream backdrop-blur-sm transition-colors group-hover:border-house-gold"
                      >
                        &#9654;
                      </span>
                    </button>
                  ) : null}
                </div>

                {/* Caption */}
                <div className="mt-3 flex flex-1 flex-col">
                  <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink">
                    {DISCIPLINE_LABEL[post.discipline]}
                    {post.location ? <span className="text-house-stone"> · {post.location}</span> : null}
                  </p>
                  <p className="mt-2 font-sans text-[16px] leading-[1.5] text-house-brown/85">
                    {post.caption}
                  </p>
                  {/* mt-auto pins the link row to the card bottom so every card's
                      service link aligns, whatever the caption length. */}
                  <div className="mt-auto flex items-center gap-4 pt-3">
                    <Link
                      href={post.serviceHref}
                      className="font-sans text-[13px] tracking-[0.1em] uppercase text-house-brown underline underline-offset-[3px] hover:text-house-gold-ink"
                    >
                      {post.serviceLabel} &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Slider controls — a smooth drag/click progress bar with prev/next
            arrows on the same row, directly under the cards. */}
        {showBar ? (
          <div className="mt-5 flex items-center gap-4">
            <div
              ref={barRef}
              onPointerDown={onBarPointerDown}
              onPointerMove={onBarPointerMove}
              onPointerUp={onBarPointerUp}
              onPointerCancel={onBarPointerUp}
              aria-hidden="true"
              className="relative flex-1 cursor-pointer touch-none select-none py-2.5"
            >
              <div className="relative h-[3px] w-full overflow-hidden bg-house-brown/12">
                <span
                  ref={thumbRef}
                  className="absolute top-0 h-full bg-house-gold-ink"
                  style={{ width: "30%", left: "0%" }}
                />
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Previous"
                className="is-round grid h-10 w-10 place-items-center rounded-full border border-house-brown/30 text-house-brown transition-colors hover:border-house-brown hover:bg-house-brown hover:text-house-cream"
              >
                <span aria-hidden>&larr;</span>
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Next"
                className="is-round grid h-10 w-10 place-items-center rounded-full border border-house-brown/30 text-house-brown transition-colors hover:border-house-brown hover:bg-house-brown hover:text-house-cream"
              >
                <span aria-hidden>&rarr;</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Reel player — centred, House-branded (Cinema Plyr), YouTube-hosted. */}
      {open && open.youtubeId ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-house-black/85 px-[5vw] py-[6vh]"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.caption}
        >
          <div className="relative w-full max-w-[440px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute -top-11 right-0 font-sans text-[13px] tracking-[0.16em] uppercase text-house-cream/80 hover:text-house-cream"
            >
              Close &times;
            </button>
            <CinemaPlayer youtubeId={open.youtubeId} orientation="portrait" className="overflow-hidden" />
            <p className="mt-3 text-center font-sans text-[14px] leading-[1.5] text-house-cream/80">
              {DISCIPLINE_LABEL[open.discipline]} &middot; {open.caption}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
