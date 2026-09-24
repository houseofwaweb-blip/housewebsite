"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
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
 * Reels are YouTube-hosted and play IN PLACE inside the card (no popup, nothing
 * heavy hosted on the site). House-branded still + gold play button at rest;
 * on click the card swaps to a clean YouTube player (nocookie, modest chrome).
 * Cards are 9:16 so vertical reels fit with no letterboxing. The card's only
 * link is the relevant service/design page. Horizontal scroll-snap (proximity),
 * with a smooth drag/click progress bar and prev/next arrows.
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
  const [playing, setPlaying] = React.useState<string | null>(null);
  const [showBar, setShowBar] = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLSpanElement>(null);
  const draggingRef = React.useRef(false);

  const shown =
    showFilters && filter !== "all"
      ? posts.filter((p) => p.discipline === filter)
      : posts;

  // Stop any playing reel when the filter changes (content swaps out).
  React.useEffect(() => {
    setPlaying(null);
  }, [filter]);

  // Position the progress bar via direct DOM writes (no React state per scroll
  // frame), so scrolling and dragging stay smooth even with many cards.
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
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
            const isPlaying = playing === post.id && playable;
            // Reels use their own frame (small, accurate) as the cover; photos
            // fall back to the `image` field.
            const cover =
              post.media === "reel" && post.youtubeId
                ? `/home/house-at-work/${post.youtubeId}.jpg`
                : post.image;
            return (
              <article
                key={post.id}
                data-card
                className="flex shrink-0 basis-[72%] snap-start flex-col min-[560px]:basis-[42%] lg:basis-[28%] xl:basis-[21%]"
              >
                {/* Media — 9:16 so vertical reels fit with no letterboxing. */}
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-house-black">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${post.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white`}
                      title={post.alt}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <Image
                        src={cover}
                        alt={post.alt}
                        fill
                        sizes="(min-width:1280px) 22vw, (min-width:1024px) 28vw, (min-width:560px) 42vw, 72vw"
                        className="object-cover"
                      />
                      {playable ? (
                        <button
                          type="button"
                          onClick={() => setPlaying(post.id)}
                          aria-label={`Play: ${post.caption}`}
                          className="absolute inset-0 grid place-items-center bg-house-black/10 transition-colors hover:bg-house-black/25"
                        >
                          <span
                            aria-hidden
                            className="is-round grid h-12 w-12 place-items-center rounded-full border border-house-cream/80 bg-house-black/40 text-house-cream backdrop-blur-sm"
                          >
                            &#9654;
                          </span>
                        </button>
                      ) : null}
                    </>
                  )}
                </div>

                {/* Category tag + service link (no description line). */}
                <div className="mt-3 flex flex-1 flex-col">
                  <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink">
                    {DISCIPLINE_LABEL[post.discipline]}
                    {post.location ? <span className="text-house-stone"> · {post.location}</span> : null}
                  </p>
                  <div className="mt-auto pt-2">
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
          <div className="mt-5 flex items-center gap-3">
            <div
              ref={barRef}
              onPointerDown={onBarPointerDown}
              onPointerMove={onBarPointerMove}
              onPointerUp={onBarPointerUp}
              onPointerCancel={onBarPointerUp}
              aria-hidden="true"
              className="relative flex-1 cursor-pointer touch-none select-none py-2"
            >
              <div className="relative h-[2px] w-full overflow-hidden bg-house-brown/12">
                <span
                  ref={thumbRef}
                  className="absolute top-0 h-full bg-house-gold-ink"
                  style={{ width: "30%", left: "0%" }}
                />
              </div>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Previous"
                className="is-round grid h-8 w-8 place-items-center rounded-full border border-house-brown/25 text-[13px] text-house-brown transition-colors hover:border-house-brown hover:bg-house-brown hover:text-house-cream"
              >
                <span aria-hidden>&larr;</span>
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Next"
                className="is-round grid h-8 w-8 place-items-center rounded-full border border-house-brown/25 text-[13px] text-house-brown transition-colors hover:border-house-brown hover:bg-house-brown hover:text-house-cream"
              >
                <span aria-hidden>&rarr;</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
