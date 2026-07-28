"use client";

import { useState } from "react";
import { SampleDesignReveal, type SampleData } from "./SampleDesignReveal";

/**
 * SampleDesignShowcase — the Interior / Garden toggle around the reveal. The
 * reveal is keyed by discipline so switching remounts it and replays the
 * animation from the top.
 */
const INTERIOR: SampleData = {
  discipline: "Interior",
  productName: "HoWA First Interior Design",
  price: "£400",
  roomLabel: "A living room · London",
  image: "/design/interiors/project-living-room.webp",
  imageAlt: "A living room being read for a first design direction",
  dimW: "4.2m wide",
  dimH: "2.6m ceiling",
  zones: ["Conversation", "Reading nook", "Media wall"],
  palette: [
    { name: "Clay", hex: "#b7a08b", note: "Plaster paint" },
    { name: "Oak", hex: "#9c7a4e", note: "Natural" },
    { name: "Flax", hex: "#d8cdb8", note: "Linen" },
    { name: "Aged brass", hex: "#a8894f", note: "Fittings" },
    { name: "Ink", hex: "#2c3038", note: "Accent" },
  ],
  budgetLo: 9000,
  budgetHi: 13500,
  brief: [
    "A calm, plaster-toned scheme that lets the room's light do the work.",
    "Furniture re-planned around conversation, with a quiet reading nook by the window.",
    "Natural oak, flax linen and aged brass: warm, and made to wear well.",
    "A media wall built into joinery, not bolted on.",
  ],
  continueLabel: "Continue with Delve →",
  continueHref: "/design/interiors",
};

const GARDEN: SampleData = {
  discipline: "Garden",
  productName: "HoWA First Garden Design",
  price: "£400",
  roomLabel: "A garden · South London",
  image: "/design/gardens/full-design.webp",
  imageAlt: "A garden being read for a first concept and indicative budget",
  dimW: "9m wide",
  dimH: "14m deep",
  zones: ["Terrace dining", "Lawn", "Deep borders"],
  palette: [
    { name: "Sandstone", hex: "#c9bba3", note: "Sawn paving" },
    { name: "Corten", hex: "#8a5a3b", note: "Steel edging" },
    { name: "Yew", hex: "#3b4a34", note: "Structure" },
    { name: "Birch", hex: "#d9d2c4", note: "Multi-stem" },
    { name: "Lavender", hex: "#7e7ba6", note: "Planting" },
  ],
  budgetLo: 12000,
  budgetHi: 28000,
  brief: [
    "A calm, low-maintenance garden that works from the terrace to the back boundary.",
    "A sandstone terrace for dining, a clean lawn, and deep borders for year-round structure.",
    "Naturalistic planting in yew, grasses and lavender, held with corten edging.",
    "Built to mature well and ask little to stay right.",
  ],
  continueLabel: "Continue with Willow Alexander →",
  continueHref: "/design/gardens",
};

export function SampleDesignShowcase() {
  const [discipline, setDiscipline] = useState<"Interior" | "Garden">("Interior");
  const data = discipline === "Interior" ? INTERIOR : GARDEN;

  return (
    <div>
      <div className="flex gap-2 mb-6" role="tablist" aria-label="Sample design discipline">
        {(["Interior", "Garden"] as const).map((d) => {
          const active = d === discipline;
          return (
            <button
              key={d}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setDiscipline(d)}
              className={`font-sans text-[12px] tracking-[0.16em] uppercase px-5 py-3 border transition-colors ${
                active
                  ? "text-house-brown bg-house-gold-ink border-house-gold-dark"
                  : "text-house-stone bg-house-white border-house-brown/20 hover:border-house-gold"
              }`}
            >
              {d} design
            </button>
          );
        })}
      </div>

      <SampleDesignReveal key={discipline} data={data} />
    </div>
  );
}
