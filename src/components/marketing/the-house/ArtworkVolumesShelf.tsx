"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SERVICES, type ServiceSlug } from "@/lib/services-data";

type Volume = {
  /** Beeton-style colour name */
  name: string;
  /** Service brand */
  brand: string;
  /** Hex colour for the spine — used for the caption tag */
  colour: string;
  /** Path to the spine artwork (portrait 1:3 PNG/WebP) */
  spine: string;
  /** Story line revealed on hover */
  story: string;
  /** Link target */
  href: string;
};

// Six service-backed volumes read their colour from services-data so the
// brand palette has a single source of truth. The master gold edition is
// artwork-only (no service slug) so it carries its own hex.
const serviceColour = (slug: ServiceSlug) =>
  SERVICES[slug].colour ?? "#3a4a35";

const VOLUMES: Volume[] = [
  {
    name: "Gardeners Green",
    brand: "Gardening",
    colour: serviceColour("gardening"),
    spine: "/the-house/artwork/spines/spine-gardeners-green.webp",
    story: "The colour of craft and landscape, where the House began.",
    href: "/services/gardening",
  },
  {
    name: "Cleaners Blue",
    brand: "Cleaning",
    colour: serviceColour("cleaning"),
    spine: "/the-house/artwork/spines/spine-cleaners-blue.webp",
    story: "Calm, trustworthy, clear. Quiet diligence in every room.",
    href: "/services/cleaning",
  },
  {
    name: "Handyman Burgundy",
    brand: "Handyman",
    colour: serviceColour("handyman"),
    spine: "/the-house/artwork/spines/spine-handyman-burgundy.webp",
    story: "Sturdy, traditional, architectural. The hands that hold a home together.",
    href: "/services/handyman",
  },
  {
    name: "Window Cleaners Aubergine",
    brand: "Window cleaning",
    colour: serviceColour("window-cleaning"),
    spine: "/the-house/artwork/spines/spine-window-aubergine.webp",
    story: "Refined, deep, jewel-toned. Light, made true.",
    href: "/services/window-cleaning",
  },
  {
    name: "Dog Walkers Teal",
    brand: "Dog walking",
    colour: serviceColour("pet-care"),
    spine: "/the-house/artwork/spines/spine-dog-walkers-teal.webp",
    story: "Pastoral, companionable. Care for the whole household.",
    href: "/services/pet-care",
  },
  {
    name: "Removals Magenta",
    brand: "Removals",
    colour: serviceColour("removals"),
    spine: "/the-house/artwork/spines/spine-removals-magenta.webp",
    story: "Bold, energetic, forward-moving. The chapter that begins elsewhere.",
    href: "/services/removals",
  },
  {
    name: "Home & Garden Gold",
    brand: "The master edition",
    colour: "#7a6028",
    spine: "/the-house/artwork/spines/spine-home-garden-gold.webp",
    story: "The master edition, the volume that holds them all.",
    href: "/the-house",
  },
];

/**
 * Interactive Beeton-style shelf of seven coloured volumes. Each spine is
 * a real piece of artwork (foil-stamped on cloth, designed off-platform).
 * Hover any spine to lift it; click to follow the link. The whole row
 * reads as a moving library — what the brand is at street level (the
 * electric fleet) made tangible.
 */
export function ArtworkVolumesShelf() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="bg-house-cream-dark px-[5vw] py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto">
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
                aria-label={`${v.name}, ${v.brand}`}
                className="group relative flex-1 max-w-[110px] md:max-w-[150px] no-underline transition-transform duration-300 ease-out"
                style={{
                  height: "clamp(330px, 42vw, 540px)",
                  aspectRatio: "1 / 3",
                  transform: isHovered
                    ? "translateY(-18px)"
                    : isAnyHovered
                      ? "translateY(2px)"
                      : "translateY(0)",
                  transitionDelay: isHovered || !isAnyHovered ? "0ms" : "60ms",
                }}
              >
                <div className="relative w-full h-full shadow-[0_10px_32px_-14px_rgba(48,35,28,0.45)] transition-shadow duration-300 group-hover:shadow-[0_22px_44px_-16px_rgba(48,35,28,0.65)]">
                  <Image
                    src={v.spine}
                    alt={`${v.name}, Beeton-style book spine`}
                    fill
                    sizes="(min-width: 768px) 150px, 110px"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Shelf line — the bookshelf the volumes sit on */}
        <div
          aria-hidden="true"
          className="h-[3px] bg-gradient-to-b from-house-brown/20 to-house-brown/40 -mt-4 mb-6 shadow-[0_3px_8px_-2px_rgba(48,35,28,0.35)]"
        />

        {/* Caption — story line for the hovered volume */}
        <div className="min-h-[72px] text-center max-w-[640px] mx-auto">
          {hovered === null ? (
            <p className="font-display italic text-[15px] leading-[1.6] text-house-brown/60">
              The seven coloured volumes, the moving anthology of expertise.
            </p>
          ) : (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <p
                className="font-sans text-[10px] tracking-[0.32em] uppercase mb-2 font-medium"
                style={{ color: VOLUMES[hovered].colour }}
              >
                {VOLUMES[hovered].brand}
              </p>
              <p className="font-display italic text-[19px] leading-[1.4] text-house-brown">
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
