import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * State badge — reusable primitive for product state + tier flags.
 * Spec: /ux/09-interactions/playground.html (badges section).
 *
 *  coming   (gold)   — Coming soon (Protect Review, Steward, future launches)
 *  live     (moss)   — Live now
 *  interest (teal)   — Register interest (Insurance, Steward waitlist)
 *  soon     (stone)  — muted coming-soon for tier cards
 *  premium  (gold)   — HoWA+ tier flag (no border, italic-feel premium tag)
 */
type State = "coming" | "live" | "interest" | "soon" | "premium";

export interface StateBadgeProps {
  state: State;
  children?: React.ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center gap-1.5 font-sans text-[10px] " +
  "tracking-[0.2em] uppercase py-1 px-2.5";

const variants: Record<State, string> = {
  coming: "border border-house-gold text-house-gold bg-house-gold/10 before:content-['●'] before:text-[8px]",
  live: "border border-house-moss text-house-moss bg-house-moss/10 before:content-['✓'] before:text-[9px]",
  interest: "border border-howa-teal text-howa-teal bg-howa-teal/5 before:content-['◈'] before:text-[10px]",
  soon: "border border-house-stone text-house-stone bg-house-stone/5 opacity-60",
  premium:
    "border-0 p-0 text-house-gold text-[9px] tracking-[0.22em] " +
    "before:content-['◆'] before:text-[8px] before:mr-0.5",
};

const defaultLabels: Record<State, string> = {
  coming: "Coming soon",
  live: "Live now",
  interest: "Register interest",
  soon: "Coming",
  premium: "HoWA+",
};

export function StateBadge({ state, children, className }: StateBadgeProps) {
  return (
    <span className={cn(base, variants[state], className)}>
      {children ?? defaultLabels[state]}
    </span>
  );
}
