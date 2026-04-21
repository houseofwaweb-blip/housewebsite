"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * ProgressBar — 2px gold fill on a brown-tint track.
 * Spec: /ux/09-interactions/playground.html (progress section).
 *
 * Two modes:
 *   - `value` prop: controlled (0–100).
 *   - `scroll` prop: auto-tracks document scroll progress (reading progress).
 *
 * Transitions smoothly via --t-xslow (750ms).
 */
export interface ProgressBarProps {
  /** 0–100. Ignored when `scroll` is true. */
  value?: number;
  /** If true, binds to window scroll and reflects percentage through page. */
  scroll?: boolean;
  label?: string;
  /** Optional right-aligned value, e.g. "IV / XII". */
  note?: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function ProgressBar({
  value = 0,
  scroll = false,
  label,
  note,
  className,
  dark,
}: ProgressBarProps) {
  const [scrollPct, setScrollPct] = React.useState(0);

  React.useEffect(() => {
    if (!scroll) return;
    const handler = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (max <= 0) {
        setScrollPct(0);
        return;
      }
      setScrollPct(Math.min(100, Math.max(0, (h.scrollTop / max) * 100)));
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [scroll]);

  const pct = scroll ? scrollPct : Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex flex-col gap-2", className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}>
      <div
        className={cn(
          "relative w-full h-[2px]",
          dark ? "bg-house-cream/15" : "bg-house-brown/10",
        )}
      >
        <div
          className="absolute left-0 top-0 h-full bg-house-gold transition-[width] duration-[var(--t-xslow)] ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {(label || note) && (
        <div
          className={cn(
            "flex items-baseline justify-between font-sans text-[10px] tracking-[0.2em] uppercase",
            dark ? "text-house-cream/55" : "text-house-stone",
          )}
        >
          <span>{label}</span>
          <span className="font-sans italic text-[13px] normal-case tracking-normal">{note}</span>
        </div>
      )}
    </div>
  );
}
