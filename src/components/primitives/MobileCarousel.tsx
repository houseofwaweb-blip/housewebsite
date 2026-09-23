"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * MobileCarousel — a grid on desktop, an app-style horizontal carousel on phones.
 *
 * Below `sm` the children lay out as a scroll-snapping horizontal track (each
 * card ~80% wide so the next one peeks), with a small scroll-position bar beneath
 * so people know to slide. At `sm` and up it becomes a normal CSS grid: each
 * item wrapper uses `sm:contents` so the CARD itself becomes the direct grid
 * child (equal-height rows keep working exactly as before).
 *
 * `gridClassName` supplies the `sm:`/`lg:`/`xl:` grid-cols; the base (mobile)
 * track styling is applied here.
 */
export function MobileCarousel({
  children,
  gridClassName,
  itemClassName = "basis-[80%] min-[420px]:basis-[64%]",
  ariaLabel,
}: {
  children: React.ReactNode;
  gridClassName?: string;
  /** Mobile track item width (ignored at sm+ where items become grid children). */
  itemClassName?: string;
  ariaLabel?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);
  const [thumb, setThumb] = React.useState({ w: 30, left: 0 });

  const measure = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 8) {
      setShow(false);
      return;
    }
    const w = Math.max(14, (el.clientWidth / el.scrollWidth) * 100);
    const left = (el.scrollLeft / max) * (100 - w);
    setShow(true);
    setThumb({ w, left });
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

  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div role="group" aria-label={ariaLabel}>
      <div
        ref={ref}
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "sm:grid sm:snap-none sm:gap-4 sm:overflow-visible sm:pb-0",
          gridClassName,
        )}
      >
        {items.map((child, i) => (
          <div key={i} className={cn("shrink-0 snap-start", itemClassName, "sm:contents")}>
            {child}
          </div>
        ))}
      </div>

      {/* Scroll-position bar — phones only, shown only when the track overflows */}
      <div className={cn("mt-3 h-[3px] w-full overflow-hidden bg-house-brown/12 sm:hidden", show ? "block" : "hidden")} aria-hidden>
        <div
          className="h-full bg-house-gold-ink transition-[margin-left,width] duration-100 ease-out"
          style={{ width: `${thumb.w}%`, marginLeft: `${thumb.left}%` }}
        />
      </div>
    </div>
  );
}
