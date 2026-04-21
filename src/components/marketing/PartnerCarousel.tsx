"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/primitives/Eyebrow";

/**
 * PartnerCarousel — "Meet our [Gardeners / Cleaners / etc.]" section.
 * Designed for the service marketplace model: a horizontal scrollable strip
 * of partner/supplier tiles, each with a logo + name + short line.
 *
 * For launch we show placeholder tiles. Once real suppliers onboard, swap in
 * logo images + detail hrefs. Scroll is native (no JS carousel library).
 *
 * Overscroll hint: the container clips and the last card peeks, signalling
 * more content to the right.
 */

export interface PartnerTile {
  name: string;
  href?: string;
  logo?: string;
  subtitle?: string;
  houseApproved?: boolean;
}

export interface PartnerCarouselProps {
  heading: string;
  headingEm?: string;
  lede?: string;
  partners: PartnerTile[];
  className?: string;
}

export function PartnerCarousel({
  heading,
  headingEm,
  lede,
  partners,
  className,
}: PartnerCarouselProps) {
  return (
    <section className={cn("bg-house-white px-[5vw] py-20 border-t border-house-brown/10", className)}>
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-10">
          <Eyebrow>Our partners</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,44px)] leading-[1.15] mt-3">
            {heading}
            {headingEm ? (
              <>
                {" "}
                <em className="italic font-normal">{headingEm}</em>
              </>
            ) : null}
          </h2>
          {lede ? (
            <p className="font-sans italic text-[16px] leading-[1.55] text-house-stone mt-3 max-w-[60ch]">
              {lede}
            </p>
          ) : null}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-[5vw] px-[5vw] snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-house-brown/15">
          {partners.map((p) => {
            const content = (
              <div
                className={cn(
                  "shrink-0 w-[260px] snap-start border border-house-brown/12 p-6 flex flex-col items-center text-center",
                  "transition-all duration-[var(--t-slow)] ease-out",
                  p.href && "hover:-translate-y-0.5 hover:border-house-gold cursor-pointer",
                )}
              >
                {p.logo ? (
                  <div className="relative w-[120px] h-[60px] mb-4">
                    <Image
                      src={p.logo}
                      alt={`${p.name} logo`}
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-[120px] h-[60px] mb-4 bg-house-cream border border-house-brown/8 flex items-center justify-center">
                    <span className="font-sans text-[14px] text-house-brown/40">Logo</span>
                  </div>
                )}
                <h3 className="font-display font-medium text-[18px] leading-[1.2] text-house-brown mb-1">
                  {p.name}
                </h3>
                {p.subtitle ? (
                  <p className="font-sans italic text-[13px] text-house-stone">
                    {p.subtitle}
                  </p>
                ) : null}
                {p.houseApproved ? (
                  <span className="mt-3 font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold border border-house-gold px-2 py-[2px]">
                    House Approved
                  </span>
                ) : null}
              </div>
            );

            if (p.href) {
              return (
                <Link key={p.name} href={p.href} className="no-underline shrink-0">
                  {content}
                </Link>
              );
            }
            return <div key={p.name} className="shrink-0">{content}</div>;
          })}

          {/* "More coming" ghost tile */}
          <div className="shrink-0 w-[260px] snap-start border border-dashed border-house-brown/15 p-6 flex flex-col items-center justify-center text-center opacity-60">
            <span className="font-sans italic text-[15px] text-house-stone">
              More partners joining soon.
            </span>
            <Link
              href="/contact"
              className="mt-3 font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold no-underline border-b border-house-gold pb-[1px]"
            >
              Become a partner →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
