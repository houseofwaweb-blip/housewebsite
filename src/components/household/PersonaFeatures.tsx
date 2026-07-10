"use client";

import { useState } from "react";
import type { PersonaFeature } from "./personaData";

/**
 * "Inside the room" accordions. CSS-only smooth expand via the
 * grid-template-rows 1fr/0fr trick. First item open by default. Accent drives
 * the "+" toggle and the open item's left rule.
 */
export function PersonaFeatures({ features, accent }: { features: PersonaFeature[]; accent: string }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-6 border-t border-[#1a241d]/10">
      {features.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.t} className="border-b border-[#1a241d]/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-display text-[19px] leading-tight text-[#1a241d]">{f.t}</span>
              <span
                aria-hidden
                className="is-round flex h-6 w-6 shrink-0 items-center justify-center text-[16px] leading-none transition-transform duration-200"
                style={{
                  color: accent,
                  background: `${accent}1a`,
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-all duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  className="mb-4 border-l-2 pl-4 text-[14.5px] leading-[1.55] text-[#3a352c]/90"
                  style={{ borderColor: accent }}
                >
                  {f.d}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
