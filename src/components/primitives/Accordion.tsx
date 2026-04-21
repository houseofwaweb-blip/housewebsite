"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Accordion — FAQ-style expandable rows.
 * Spec: /ux/09-interactions/playground.html (other section → accordion).
 *
 * Closed → open: the "+" mark rotates 45° (becomes ×), the body
 * animates from `grid-template-rows: 0fr → 1fr` so content expands
 * smoothly without measuring its height. All transitions --t-slow.
 *
 * Pass an array of items; only one open at a time unless `multi`.
 */

export interface AccordionItem {
  id: string;
  summary: React.ReactNode;
  body: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple rows open simultaneously. */
  multi?: boolean;
  /** Start with this id open. */
  defaultOpen?: string;
  dark?: boolean;
  className?: string;
}

export function Accordion({ items, multi = false, defaultOpen, dark, className }: AccordionProps) {
  const [open, setOpen] = React.useState<Set<string>>(
    () => new Set(defaultOpen ? [defaultOpen] : []),
  );

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(multi ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(item.id);
        const bodyId = `${item.id}-body`;
        return (
          <div
            key={item.id}
            className={cn(
              "border-t",
              i === items.length - 1 && "border-b",
              dark ? "border-house-cream/15" : "border-house-brown/12",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={bodyId}
              onClick={() => toggle(item.id)}
              className={cn(
                "w-full flex items-center justify-between gap-6 text-left",
                "py-5 px-0 bg-transparent border-0 cursor-pointer",
                "font-sans text-[20px] leading-[1.3]",
                "transition-colors duration-[var(--t-base)] ease-out",
                dark ? "text-house-cream hover:text-house-gold-light" : "text-house-brown hover:text-house-gold",
              )}
            >
              <span>{item.summary}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "shrink-0 font-display text-[28px] leading-none text-house-gold",
                  "transition-all duration-[var(--t-slow)] ease-out",
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </button>

            {/* Grid-row expand pattern — 0fr→1fr avoids measuring height */}
            <div
              id={bodyId}
              role="region"
              className={cn(
                "grid transition-[grid-template-rows] duration-[var(--t-slow)] ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div
                className={cn(
                  "overflow-hidden transition-[opacity,padding] duration-[var(--t-slow)] ease-out",
                  isOpen ? "opacity-100 pb-5" : "opacity-0 pb-0",
                )}
              >
                <div
                  className={cn(
                    "font-sans text-[16px] leading-[1.6] max-w-[640px]",
                    dark ? "text-house-cream/80" : "text-house-stone",
                  )}
                >
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
