"use client";

import Link from "next/link";
import { useState } from "react";

type Node = {
  id: string;
  name: string;
  description: string;
  href?: string;
  /** Position on the diagram, percentages of the canvas. */
  x: number;
  y: number;
  /** Visual treatment — emphasises the role in the ecosystem. */
  tone: "core" | "child" | "hearth" | "howa" | "future";
};

const NODES: Node[] = [
  {
    id: "house",
    name: "House of Willow Alexander",
    description: "The institution. The editorial centre. The mother brand.",
    href: "/the-house",
    x: 50,
    y: 50,
    tone: "core",
  },
  {
    id: "services",
    name: "The Service Brands",
    description: "The coloured volumes. Specialist, bold, unmistakable.",
    href: "/services",
    x: 22,
    y: 26,
    tone: "child",
  },
  {
    id: "garden-marketplace",
    name: "Home & Garden",
    description: "The marketplace, the lifestyle universe, the curated home.",
    href: "/shop",
    x: 78,
    y: 26,
    tone: "child",
  },
  {
    id: "hearth",
    name: "The Hearth",
    description: "Lifestyle magazine. Where the pattern becomes atmosphere.",
    href: "/the-hearth",
    x: 22,
    y: 76,
    tone: "hearth",
  },
  {
    id: "howa",
    name: "HoWA & Housekeeper",
    description: "The modern intelligence of the House. Luminous, instrument-like.",
    href: "/howa",
    x: 78,
    y: 76,
    tone: "howa",
  },
  {
    id: "future",
    name: "Future categories",
    description: "Homeware. Textiles. Academy. Retail pods. AI design tools.",
    x: 50,
    y: 95,
    tone: "future",
  },
];

const TONE_STYLES: Record<Node["tone"], { bg: string; text: string; border: string; ring: string }> = {
  core: {
    bg: "bg-house-brown",
    text: "text-house-cream",
    border: "border-house-gold",
    ring: "ring-house-gold/40",
  },
  child: {
    bg: "bg-house-cream",
    text: "text-house-brown",
    border: "border-house-brown/25",
    ring: "ring-house-brown/15",
  },
  hearth: {
    bg: "bg-[#fbf6ec]",
    text: "text-house-brown",
    border: "border-[#7a6028]/30",
    ring: "ring-[#7a6028]/20",
  },
  howa: {
    bg: "bg-[#f5f0e8]",
    text: "text-house-brown",
    border: "border-house-brown/25",
    ring: "ring-house-brown/15",
  },
  future: {
    bg: "bg-transparent",
    text: "text-house-brown/55",
    border: "border-house-brown/25 border-dashed",
    ring: "ring-house-brown/10",
  },
};

/**
 * Visual ecosystem — House at the centre, with the four siblings around
 * it (Services, Home & Garden, The Hearth, HoWA), and the dashed
 * "future categories" node on the horizon below. Connecting lines drawn
 * via SVG so they scale.
 */
export function ArtworkEcosystem() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-house-cream px-[5vw] py-24 md:py-32">
      <div className="max-w-[1080px] mx-auto">
        <header className="text-center max-w-[640px] mx-auto mb-16">
          <p className="font-sans text-[14px] tracking-[0.32em] uppercase text-house-gold-ink mb-5">
            The Ecosystem
          </p>
          <h3 className="font-display font-medium text-[clamp(31px,3.4vw,45px)] leading-[1.15] tracking-[-0.005em] text-house-brown">
            A living, design-led <em className="text-house-gold-ink">universe.</em>
          </h3>
          <p className="font-sans text-[19px] leading-[1.7] text-house-brown/72 mt-6">
            Threaded together by name, colour, pattern, story. Nothing stands alone.
            Everything belongs.
          </p>
        </header>

        {/* Diagram — fixed aspect so positions hold */}
        <div className="relative aspect-[16/10] w-full">
          {/* Connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 625"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {NODES.filter((n) => n.id !== "house").map((n) => {
              const isFuture = n.tone === "future";
              return (
                <line
                  key={n.id}
                  x1={500}
                  y1={312}
                  x2={(n.x / 100) * 1000}
                  y2={(n.y / 100) * 625}
                  stroke="#30231c"
                  strokeOpacity={hovered && hovered !== n.id && hovered !== "house" ? 0.08 : 0.18}
                  strokeWidth={hovered === n.id ? 1.2 : 0.6}
                  strokeDasharray={isFuture ? "3 4" : undefined}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "all 0.3s ease" }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {NODES.map((n) => {
            const t = TONE_STYLES[n.tone];
            const isCore = n.tone === "core";
            const isHovered = hovered === n.id;
            const dim = !!hovered && !isHovered;
            const inner = (
              <div
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                className={
                  "absolute -translate-x-1/2 -translate-y-1/2 px-5 py-4 border " +
                  "transition-all duration-300 ease-out " +
                  `${t.bg} ${t.text} ${t.border} ` +
                  (isHovered ? `ring-4 ${t.ring} z-10 ` : "ring-0 ") +
                  (dim ? "opacity-50 " : "opacity-100 ") +
                  (isCore ? "max-w-[260px]" : "max-w-[200px]")
                }
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <p
                  className={
                    "font-sans text-[14px] tracking-[0.28em] uppercase mb-1.5 " +
                    (isCore ? "text-house-gold-light" : "text-house-gold-ink/80")
                  }
                >
                  {n.tone === "core"
                    ? "the institution"
                    : n.tone === "child"
                      ? "sibling"
                      : n.tone === "hearth"
                        ? "voice"
                        : n.tone === "howa"
                          ? "intelligence"
                          : "horizon"}
                </p>
                <p
                  className={
                    "font-display italic " +
                    (isCore ? "text-[21px] md:text-[25px] leading-[1.2]" : "text-[19px] md:text-[19px] leading-[1.25]")
                  }
                >
                  {n.name}
                </p>
                <p
                  className={
                    "font-sans text-[18px] leading-[1.5] mt-2 " +
                    (isCore ? "text-house-cream/80" : "text-house-brown/65")
                  }
                >
                  {n.description}
                </p>
              </div>
            );
            return n.href ? (
              <Link key={n.id} href={n.href} className="no-underline">
                {inner}
              </Link>
            ) : (
              <div key={n.id}>{inner}</div>
            );
          })}
        </div>

        <p className="text-center font-sans italic text-[18px] text-house-brown/55 mt-10">
          Tap any sibling to enter that world.
        </p>
      </div>
    </div>
  );
}
