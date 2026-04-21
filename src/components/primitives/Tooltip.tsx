"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Tooltip — hover/focus-activated label sitting above the trigger.
 * Spec: /ux/09-interactions/playground.html (tooltip section).
 *
 * Uses `role="tooltip"` + `aria-describedby` so screen readers pick it up.
 * Slides up 4px and fades in over --t-slow. Pointer-events none so it
 * never blocks clicks. Reserved for genuinely helpful context (why
 * something is "House Approved", what "HoWA+" unlocks, etc.).
 */
export interface TooltipProps {
  /** The short label shown in the tooltip bubble. */
  content: React.ReactNode;
  children: React.ReactElement;
  /** Placement — only "top" supported today; API future-proofed. */
  placement?: "top";
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const tipId = React.useId();

  return (
    <span className={cn("relative inline-flex group focus-within:z-10", className)}>
      {React.cloneElement(children as React.ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": tipId,
      })}
      <span
        id={tipId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 translate-y-1",
          "whitespace-nowrap px-2.5 py-1.5",
          "bg-house-brown text-house-cream",
          "font-sans text-[11px] tracking-[0.04em]",
          "opacity-0 transition-all duration-[var(--t-slow)] ease-out",
          "group-hover:opacity-100 group-hover:translate-y-0",
          "group-focus-within:opacity-100 group-focus-within:translate-y-0",
        )}
      >
        {content}
      </span>
    </span>
  );
}
