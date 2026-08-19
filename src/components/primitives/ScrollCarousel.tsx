"use client";

import * as React from "react";

/**
 * ScrollCarousel — wraps a horizontally-scrolling row (the caller supplies the
 * scroller className, e.g. an overflow-x + scroll-snap track) and adds desktop
 * arrow controls. The audit flagged that the sub-service rows scrolled with only
 * a thin scrollbar, so most cards were invisible to mouse-only users.
 *
 * - Arrows show only when the content actually overflows, and each disables
 *   (fades out) at its end of the track.
 * - Square buttons, per the House sharp-corner rule (no border-radius).
 * - Below md we rely on native swipe + the scrollbar, so no overlay arrows.
 * - Children are server-rendered and passed straight through, so callers stay
 *   server components.
 */
export function ScrollCarousel({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = React.useState(false);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const measure = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 4;
    setOverflows(overflow);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  React.useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.85, 320), behavior: "smooth" });
  };

  return (
    <div className="relative" role="group" aria-label={ariaLabel}>
      <div ref={ref} className={className}>
        {children}
      </div>

      {overflows ? (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => nudge(-1)}
            disabled={atStart}
            className="absolute left-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-house-brown/20 bg-house-cream text-[20px] text-house-brown shadow-[0_2px_10px_rgba(48,35,28,0.12)] transition-opacity duration-200 hover:bg-house-cream-light disabled:pointer-events-none disabled:opacity-0 md:flex"
          >
            <span aria-hidden>&larr;</span>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => nudge(1)}
            disabled={atEnd}
            className="absolute right-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-house-brown/20 bg-house-cream text-[20px] text-house-brown shadow-[0_2px_10px_rgba(48,35,28,0.12)] transition-opacity duration-200 hover:bg-house-cream-light disabled:pointer-events-none disabled:opacity-0 md:flex"
          >
            <span aria-hidden>&rarr;</span>
          </button>
        </>
      ) : null}
    </div>
  );
}
