"use client";

import { useEffect, useState } from "react";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;
type ChapterIdx = (typeof ROMAN)[number];

const CHAPTER_TITLES: Record<ChapterIdx, string> = {
  I: "A name like a dedication",
  II: "Where the House first took shape",
  III: "The Victorian discovery",
  IV: "The chromatic library",
  V: "Studio becomes institution",
  VI: "The modern insignia",
  VII: "Hand-drawn notes",
  VIII: "A living universe",
  IX: "Beauty as responsibility",
  X: "Rooted, growing",
};

/**
 * Sticky right-rail chapter index + thin top progress bar.
 *
 * Tracks scroll position against `[data-chapter]` markers in the page,
 * highlights the active chapter, and lets the reader jump between them.
 * Hidden under 1100px (mobile/tablet — saves real estate).
 */
export function ArtworkProgressRail() {
  const [active, setActive] = useState<ChapterIdx | null>("I");
  const [progress, setProgress] = useState(0);
  // The rail floats over both light and dark sections. When a dark section
  // (data-tone="dark") sits behind it, flip the rail to light ink so it
  // stays legible instead of dark-on-dark.
  const [darkBg, setDarkBg] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]"),
    );
    const darkSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-tone="dark"]'),
    );

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, window.scrollY / Math.max(1, total))));
      // Is a dark section behind the rail's vertical centre?
      const mid = window.innerHeight / 2;
      let dark = false;
      for (const el of darkSections) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          dark = true;
          break;
        }
      }
      setDarkBg(dark);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport.
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.boundingClientRect.top < best.boundingClientRect.top) {
            best = e;
          }
        }
        if (best) {
          const ch = (best.target as HTMLElement).dataset.chapter as ChapterIdx;
          setActive(ch);
        }
      },
      { rootMargin: "-30% 0% -55% 0%", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Thin top progress bar — gold against cream */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-house-brown/8 z-[60] pointer-events-none"
      >
        <div
          className="h-full bg-house-gold transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Right-rail chapter index — desktop only */}
      <nav
        aria-label="Chapter index"
        className="hidden xl:block fixed right-7 top-1/2 -translate-y-1/2 z-[50] pointer-events-auto"
      >
        <ol className="flex flex-col gap-2">
          {ROMAN.map((r) => {
            const isActive = active === r;
            return (
              <li key={r}>
                <a
                  href={`#chapter-${r.toLowerCase()}`}
                  className="group flex items-center gap-3 py-1.5"
                >
                  <span
                    className={
                      "font-display italic text-[14px] tabular-nums w-6 text-right transition-colors duration-200 " +
                      (isActive
                        ? darkBg
                          ? "text-house-gold-dark"
                          : "text-house-gold-dark"
                        : darkBg
                          ? "text-house-cream/55 group-hover:text-house-cream/85"
                          : "text-house-brown/45 group-hover:text-house-brown/75")
                    }
                  >
                    {r}.
                  </span>
                  <span
                    aria-hidden="true"
                    className={
                      "h-px transition-all duration-300 ease-out " +
                      (isActive
                        ? darkBg
                          ? "w-10 bg-house-gold"
                          : "w-10 bg-house-gold-dark"
                        : darkBg
                          ? "w-5 bg-house-cream/40 group-hover:w-8 group-hover:bg-house-cream/65"
                          : "w-5 bg-house-brown/30 group-hover:w-8 group-hover:bg-house-brown/55")
                    }
                  />
                  <span
                    className={
                      "font-sans text-[12px] tracking-[0.2em] uppercase transition-colors duration-200 whitespace-nowrap " +
                      (isActive
                        ? darkBg
                          ? "text-house-cream font-medium"
                          : "text-house-brown font-medium"
                        : darkBg
                          ? "text-house-cream/60 group-hover:text-house-cream"
                          : "text-house-brown/60 group-hover:text-house-brown")
                    }
                  >
                    {CHAPTER_TITLES[r]}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
