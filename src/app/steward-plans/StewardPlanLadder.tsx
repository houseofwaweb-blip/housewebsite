"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { StewardPlan } from "@/lib/steward-data";

/**
 * StewardPlanLadder — tabbed plan comparison on navy background.
 * Desktop: 3-col grid. Mobile: horizontal peek-carousel.
 * Featured (recommended) card lifts and uses cream bg on desktop.
 */
export function StewardPlanLadder({
  homeGardenPlans,
  apartmentPlans,
}: {
  homeGardenPlans: StewardPlan[];
  apartmentPlans: StewardPlan[];
}) {
  const [tab, setTab] = React.useState<"hg" | "apt">("hg");
  const plans = tab === "hg" ? homeGardenPlans : apartmentPlans;

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center gap-0 mt-[32px] mb-[48px]">
        <button
          type="button"
          onClick={() => setTab("hg")}
          className={`px-[24px] md:px-[32px] py-[12px] font-sans text-[12px] tracking-[0.18em] uppercase border border-house-cream/20 transition-all duration-[var(--t-base)] ease-out cursor-pointer ${
            tab === "hg"
              ? "bg-house-cream/10 text-house-cream border-house-cream/30"
              : "bg-transparent text-house-cream/60"
          }`}
          style={{ borderRight: "none" }}
        >
          Home &amp; Garden+
        </button>
        <button
          type="button"
          onClick={() => setTab("apt")}
          className={`px-[24px] md:px-[32px] py-[12px] font-sans text-[12px] tracking-[0.18em] uppercase border border-house-cream/20 transition-all duration-[var(--t-base)] ease-out cursor-pointer ${
            tab === "apt"
              ? "bg-house-cream/10 text-house-cream border-house-cream/30"
              : "bg-transparent text-house-cream/60"
          }`}
        >
          Apartment+
        </button>
      </div>

      {/* Desktop: 3-col grid */}
      <div className="hidden md:grid md:grid-cols-3 max-w-[1180px] mx-auto items-stretch">
        {plans.map((p) => (
          <PlanCard key={p.slug} plan={p} />
        ))}
      </div>

      {/* Mobile: peek carousel */}
      <div className="flex md:hidden overflow-x-auto [scroll-snap-type:x_mandatory] [-webkit-overflow-scrolling:touch] pb-[24px]">
        {plans.map((p) => (
          <div
            key={p.slug}
            className="shrink-0 w-[85vw] [scroll-snap-align:start] first:ml-[5vw] mr-[12px] last:mr-[5vw]"
          >
            <PlanCard plan={p} mobile />
          </div>
        ))}
      </div>
    </>
  );
}

function PlanCard({ plan: p, mobile }: { plan: StewardPlan; mobile?: boolean }) {
  const isFeatured = p.featured && !mobile;

  return (
    <div
      className={
        isFeatured
          ? "relative bg-house-cream text-house-brown border border-house-gold md:-translate-y-[16px] shadow-[0_24px_60px_rgba(0,0,0,0.4)] z-10 flex flex-col overflow-hidden"
          : "relative bg-house-cream/6 text-house-cream border border-house-gold/20 flex flex-col overflow-hidden"
      }
    >
      {isFeatured ? (
        <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-house-gold text-white font-sans text-[10px] tracking-[0.22em] px-[14px] py-[5px] z-20">
          RECOMMENDED
        </span>
      ) : null}
      {p.featured && mobile ? (
        <span className="absolute top-[12px] right-[12px] bg-house-gold text-white font-sans text-[9px] tracking-[0.22em] px-[10px] py-[4px] z-20">
          RECOMMENDED
        </span>
      ) : null}

      <Image
        src={p.image}
        alt={p.name}
        width={800}
        height={500}
        sizes="(max-width: 768px) 85vw, 33vw"
        className="w-full aspect-[16/10] object-cover"
      />

      <div className="flex flex-col flex-1 px-[28px] pt-[24px] pb-[36px]">
        <span className={`font-sans text-[10px] tracking-[0.22em] uppercase mb-[12px] ${isFeatured ? "text-house-gold" : "text-house-gold-light"}`}>
          {p.tier}
        </span>
        <h4 className={`font-display font-medium text-[28px] tracking-[-0.005em] mb-[4px] ${isFeatured ? "text-house-brown" : "text-house-cream"}`}>
          {p.tier}
        </h4>
        <div className={`font-sans text-[13px] mb-[22px] ${isFeatured ? "text-house-stone" : "text-house-cream/60"}`}>
          from <strong className={`font-medium text-[22px] ${isFeatured ? "text-house-brown" : "text-house-gold-light"}`}>{p.priceLabel}</strong> / month
        </div>
        <ul className={`list-none pl-[16px] text-[13.5px] leading-[1.85] flex-1 ${isFeatured ? "text-house-brown" : "text-house-cream/78"}`}>
          {p.inclusions.map((inc) => (
            <li key={inc} className={`relative py-[2px] before:content-['—'] before:absolute before:-left-[16px] ${isFeatured ? "before:text-house-gold" : "before:text-house-gold-light"}`}>
              {inc}
            </li>
          ))}
        </ul>
        <div className="mt-[22px]">
          <Link
            href={`/steward-plans/${p.slug}`}
            className={
              isFeatured
                ? "inline-block font-sans text-[11px] tracking-[0.16em] uppercase px-[20px] py-[10px] no-underline text-white bg-house-gold border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
                : "inline-block font-sans text-[11px] tracking-[0.16em] uppercase px-[20px] py-[10px] no-underline text-house-cream border border-house-cream/35 transition-all duration-[var(--t-base)] ease-out hover:bg-house-cream/10"
            }
          >
            Subscribe →
          </Link>
        </div>
      </div>
    </div>
  );
}
