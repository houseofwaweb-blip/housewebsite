"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * BeforeAfter — draggable comparison slider.
 * "After" fills the container; "Before" is clipped from the right via
 * `clip-path: inset()`, controlled by a draggable gold handle.
 *
 * Touch + pointer events. prefers-reduced-motion disables the handle
 * entrance animation but keeps the drag functional.
 */
export interface BeforeAfterProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  /** Initial split position 0–100. Default 50 (centre). */
  initial?: number;
  aspectRatio?: string;
  className?: string;
}

export function BeforeAfter({
  before,
  after,
  initial = 50,
  aspectRatio = "3/2",
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = React.useState(initial);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const updatePosition = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(2, Math.min(98, pct)));
  }, []);

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const onPointerUp = React.useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative select-none touch-none overflow-hidden cursor-col-resize",
        className,
      )}
      style={{ aspectRatio }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
    >
      {/* After (full background) */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />

      {/* Before (clipped from right) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.22em] uppercase text-white bg-house-brown/60 px-2.5 py-1 pointer-events-none">
        Before
      </span>
      <span className="absolute top-4 right-4 font-sans text-[10px] tracking-[0.22em] uppercase text-white bg-house-gold/80 px-2.5 py-1 pointer-events-none">
        After
      </span>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-house-gold pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Grab circle */}
        <div className="is-round absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-house-gold border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center pointer-events-auto cursor-col-resize">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-white"
          >
            <path d="M4 8L1 5M4 8L1 11M4 8H12M12 8L15 5M12 8L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
