import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * TransitionMoment — the signature House → HoWA visual handoff.
 * Spec: /ux/09-interactions/playground.html (transition section) +
 *       /ux/09-interactions/transition-moment.html (full-page version).
 *
 * Layout:
 *   House (cream, Didot, italic accent)   ← children.house
 *   Band  (gradient + ornament + label)
 *   HoWA  (white, Effra, teal accent)     ← children.howa
 *
 * Use when you need to make the product-vs-brand relationship legible in
 * a single slab, e.g. on the homepage between editorial and HoWA product.
 */
export interface TransitionMomentProps {
  /** House-side content (Didot, editorial). */
  house: React.ReactNode;
  /** HoWA-side content (Effra, operational). */
  howa: React.ReactNode;
  /** Italic label in the band. Wrap product tag in `<em>` for the sans-serif treatment. */
  label?: React.ReactNode;
  className?: string;
}

export function TransitionMoment({ house, howa, label, className }: TransitionMomentProps) {
  return (
    <section
      className={cn(
        "border border-house-brown/10 bg-white overflow-hidden",
        className,
      )}
    >
      {/* House side */}
      <div className="bg-house-cream text-house-brown px-9 py-10">{house}</div>

      {/* Band */}
      <div className="bg-[linear-gradient(180deg,var(--house-cream)_0%,#ffffff_100%)] px-9 py-7 flex flex-col items-center gap-3">
        {/* Ornament: line — dot — line */}
        <div className="flex items-center gap-[14px]" aria-hidden="true">
          <span className="w-9 h-px bg-house-gold" />
          <span className="w-1 h-1 is-round bg-house-gold" />
          <span className="w-9 h-px bg-house-gold" />
        </div>
        {label ? (
          <p className="font-sans italic text-[14px] text-house-stone tracking-[0.02em]">
            {label}
          </p>
        ) : null}
      </div>

      {/* HoWA side */}
      <div className="bg-white text-house-brown border-t border-house-brown/8 px-9 py-10">
        {howa}
      </div>
    </section>
  );
}

/** Small helper for the tag inside the label (e.g. "The House | HoWA"). */
export function TransitionTag({ children }: { children: React.ReactNode }) {
  return (
    <em className="not-italic font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal border-l border-house-stone/40 pl-3 ml-3">
      {children}
    </em>
  );
}
