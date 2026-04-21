import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Eyebrow — small-caps sans label above a headline.
 * Spec: DESIGN.md Part C · "Eyebrow / kicker"
 */
type Colour = "gold" | "teal" | "stone" | "cream";

const colours: Record<Colour, string> = {
  gold: "text-house-gold",
  teal: "text-howa-teal",
  stone: "text-house-stone",
  cream: "text-house-cream/85",
};

export function Eyebrow({
  children,
  colour = "gold",
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  colour?: Colour;
  className?: string;
  as?: "span" | "div" | "p";
}) {
  return (
    <Tag
      className={cn(
        "font-sans text-[11px] font-normal tracking-[0.22em] uppercase",
        colours[colour],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
