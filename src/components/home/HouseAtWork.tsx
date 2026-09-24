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
 * One reusable component:
 *   - Homepage: all four disciplines mixed, with filters.
 *   - A service/design page: pass that discipline's `posts` and `showFilters={false}`
 *     so it opens on its own relevant content.
 *
 * Instagram is the content SOURCE; the section keeps the House's own type,
 * spacing and card treatment. Photos and reels (still + play, played only on
 * selection, no autoplay). Horizontal scroll-snap: ~3-4 cards on desktop, one
 * card with a peek of the next on mobile. Prev/next controls, native swipe and
 * keyboard operation. Selected content stays visible (no external feed embed).
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
  const [bar, setBar] = React.useState({ show: false, w: 30, left: 0 });
  const trackRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);

  const shown =
    showFilters && filter !== "all"
      ? posts.filter((p) => p.discipline === filter)
      : posts;

  const hasPlaceholder = shown.some((p) => p.placeholder);

  // Reset any playing reel when the filter changes (content is swapped out).
  React.useEffect(() => {
    setPlaying(null);
  }, [filter]);

  // Measure scroll position so a progress bar can show how far along the track
  // the viewer is — the clearest signal that this row slides.
  const measure = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 1) {
      setBar((b) => (b.show ? { show: false, w: 30, left: 0 } : b));
      return;
    }
    const w = (el.clientWidth / el.scrollWidth) * 100;
    const left = (el.scrollLeft / max) * (100 - w);
    setBar({ show: true, w, left });
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

  // Drag / click the progress bar to scroll the track to that position.
  const seek = (clientX: number, smooth: boolean) => {
    const barEl = barRef.current;
    const el = trackRef.current;
    if (!barEl || !el) return;
    const rect = barEl.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: frac * max, behavior: smooth ? "smooth" : "auto" });
  };
  const onBarPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seek(e.clientX, true);
  };
  const onBarPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) seek(e.clientX, false);
  };
  const onBarPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
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
          <div
            role="tablist"
            aria-label="Filter by discipline"
            className="mt-7 flex flex-wrap gap-2"
          >
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

        {hasPlaceholder ? (
          <p className="mt-4 font-sans text-[13px] italic text-house-stone">
            Placeholder imagery, shown to preview the layout. To be replaced with
            selected Instagram posts and reels.
          </p>
        ) : null}

        {/* Track */}
        <div
          ref={trackRef}
          className="mt-7 flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shown.map((post) => (
            <article
              key={post.id}
              data-card
              className="flex shrink-0 basis-[82%] snap-start flex-col min-[560px]:basis-[46%] lg:basis-[31%] xl:basis-[23.5%]"
            >
              {/* Media */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
                {post.media === "reel" && playing === post.id && post.video ? (
                  isEmbed(post.video) ? (
                    <iframe
                      src={post.video}
                      title={post.alt}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={post.video}
                      poster={post.image}
                      controls
                      autoPlay
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )
                ) : (
                  <>
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(min-width:1280px) 24vw, (min-width:1024px) 31vw, (min-width:560px) 46vw, 82vw"
                      className="object-cover"
                    />
                    {post.media === "reel" ? (
                      <button
                        type="button"
                        onClick={() => setPlaying(post.id)}
                        aria-label={`Play: ${post.caption}`}
                        className="absolute inset-0 grid place-items-center bg-house-black/10 transition-colors hover:bg-house-black/20"
                      >
                        <span
                          aria-hidden
                          className="is-round grid h-14 w-14 place-items-center rounded-full border border-house-cream/80 bg-house-black/40 text-house-cream backdrop-blur-sm"
                        >
                          &#9654;
                        </span>
                      </button>
                    ) : null}
                  </>
                )}
              </div>

              {/* Caption */}
              <div className="mt-3 flex flex-1 flex-col">
                <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink">
                  {DISCIPLINE_LABEL[post.discipline]}
                  {post.location ? (
                    <span className="text-house-stone"> · {post.location}</span>
                  ) : null}
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
          ))}
        </div>

        {/* Slider controls — a scroll-progress bar with prev/next arrows on the
            same row, directly under the cards, so the row clearly reads as a
            slider (and stays operable by keyboard). */}
        {bar.show ? (
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
                  className="absolute top-0 h-full bg-house-gold-ink"
                  style={{ width: `${bar.w}%`, left: `${bar.left}%` }}
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
    </section>
  );
}

/** Treat a video URL as an embed (iframe) when it isn't a direct video file. */
function isEmbed(url: string): boolean {
  return !/\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url);
}
