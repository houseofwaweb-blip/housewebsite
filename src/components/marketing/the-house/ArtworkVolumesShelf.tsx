"use client";

import Link from "next/link";
import { useState } from "react";

type Volume = {
  /** Beeton-style colour name */
  name: string;
  /** Service brand */
  brand: string;
  /** Hex colour for the spine */
  colour: string;
  /** Foil/text colour on the spine */
  foil: string;
  /** Story line revealed on hover */
  story: string;
  /** Link target */
  href: string;
};

const VOLUMES: Volume[] = [
  {
    name: "Gardeners Green",
    brand: "Gardening",
    colour: "#3a4a35",
    foil: "#d4c79b",
    story: "The colour of craft and landscape — where the House began.",
    href: "/services/gardening",
  },
  {
    name: "Cleaners Blue",
    brand: "Cleaning",
    colour: "#2e4055",
    foil: "#d4d8e0",
    story: "Calm, trustworthy, clear. Quiet diligence in every room.",
    href: "/services/cleaning",
  },
  {
    name: "Handyman Burgundy",
    brand: "Handyman",
    colour: "#5a2533",
    foil: "#e8c97a",
    story: "Sturdy, traditional, architectural. The hands that hold a home together.",
    href: "/services/handyman",
  },
  {
    name: "Window Cleaners Aubergine",
    brand: "Window cleaning",
    colour: "#3e2649",
    foil: "#e0d4a8",
    story: "Refined, deep, jewel-toned. Light, made true.",
    href: "/services/window-cleaning",
  },
  {
    name: "Dog Walkers Teal",
    brand: "Dog walking",
    colour: "#2a4f54",
    foil: "#e8d99c",
    story: "Pastoral, companionable. Care for the whole household.",
    href: "/services/dog-walking",
  },
  {
    name: "Removals Magenta",
    brand: "Removals",
    colour: "#7a2540",
    foil: "#f0d49b",
    story: "Bold, energetic, forward-moving. The chapter that begins elsewhere.",
    href: "/services/removals",
  },
  {
    name: "Home & Garden Gold",
    brand: "The master edition",
    colour: "#7a6028",
    foil: "#f5e6b8",
    story: "The master edition — the volume that holds them all.",
    href: "/the-house",
  },
];

/**
 * Interactive Beeton-style shelf of seven coloured "volumes". Hover any
 * spine to lift it slightly and reveal its story; click to follow the
 * link. The whole row reads as a moving library — what the brand
 * actually is at street level (the electric fleet) made tangible.
 */
export function ArtworkVolumesShelf() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="bg-house-cream-dark px-[5vw] py-20 md:py-24">
      <div className="max-w-[1240px] mx-auto">
        {/* Shelf */}
        <div
          className="relative flex items-end justify-center gap-2 md:gap-3 mb-10"
          onMouseLeave={() => setHovered(null)}
        >
          {VOLUMES.map((v, i) => {
            const isHovered = hovered === i;
            const isAnyHovered = hovered !== null;
            return (
              <Link
                key={v.name}
                href={v.href}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                aria-label={`${v.name} — ${v.brand}`}
                className="group relative flex-1 max-w-[80px] md:max-w-[110px] no-underline transition-transform duration-300 ease-out"
                style={{
                  height: "clamp(280px, 36vw, 460px)",
                  transform: isHovered
                    ? "translateY(-14px)"
                    : isAnyHovered
                      ? "translateY(2px)"
                      : "translateY(0)",
                  transitionDelay: isHovered || !isAnyHovered ? "0ms" : "60ms",
                }}
              >
                {/* Spine */}
                <div
                  className="w-full h-full relative shadow-[0_8px_28px_-12px_rgba(48,35,28,0.45)] transition-shadow duration-300 group-hover:shadow-[0_18px_36px_-14px_rgba(48,35,28,0.6)]"
                  style={{ backgroundColor: v.colour }}
                >
                  {/* Top + bottom hairline bands — Beeton spine detail */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: v.foil, opacity: 0.5 }}
                  />
                  <div
                    className="absolute top-2 left-0 right-0 h-px"
                    style={{ backgroundColor: v.foil, opacity: 0.3 }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: v.foil, opacity: 0.5 }}
                  />
                  <div
                    className="absolute bottom-2 left-0 right-0 h-px"
                    style={{ backgroundColor: v.foil, opacity: 0.3 }}
                  />

                  {/* Title — vertical, foil colour */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ color: v.foil }}
                  >
                    <p
                      className="font-display italic text-[11px] md:text-[13px] tracking-[0.04em] whitespace-nowrap text-center"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {v.name}
                    </p>
                  </div>

                  {/* House mark (small floral motif suggestion) */}
                  <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: v.foil, opacity: 0.5 }}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Shelf line */}
        <div
          aria-hidden="true"
          className="h-[2px] bg-gradient-to-b from-house-brown/15 to-house-brown/30 -mt-10 mb-4 shadow-[0_2px_6px_-2px_rgba(48,35,28,0.3)]"
        />

        {/* Caption — fades to active volume's story when one is hovered */}
        <div className="min-h-[68px] text-center max-w-[640px] mx-auto">
          {hovered === null ? (
            <p className="font-sans italic text-[14px] leading-[1.6] text-house-brown/55">
              Hover any volume to read its story · click to follow it.
            </p>
          ) : (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <p
                className="font-sans text-[10px] tracking-[0.32em] uppercase mb-2"
                style={{ color: VOLUMES[hovered].colour }}
              >
                {VOLUMES[hovered].brand}
              </p>
              <p className="font-display italic text-[18px] leading-[1.4] text-house-brown">
                {VOLUMES[hovered].story}
              </p>
            </div>
          )}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
