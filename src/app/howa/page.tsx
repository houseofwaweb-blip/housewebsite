import Link from "next/link";
import s from "./howa.module.css";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { SoftwareApplicationJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import { V6Testimonial } from "./V6Sections";
import { V4Hero } from "./v4/_components/V4Hero";
import { V4Portrait } from "./v4/_components/V4Portrait";
import { V4Bands } from "./v4/_components/V4Bands";
import { V4WhyHere } from "./v4/_components/V4WhyHere";
import { V4Record } from "./v4/_components/V4Record";
import { V4WhatItDoes } from "./v4/_components/V4WhatItDoes";
import { V4Demo } from "./v4/_components/V4Demo";
import { V4Tiers } from "./v4/_components/V4Tiers";
import { V4Matrix } from "./v4/_components/V4Matrix";
import { V4Score } from "./v4/_components/V4Score";
import { V4Security } from "./v4/_components/V4Security";
import { V4Fulfilment, V4Managed } from "./v4/_components/V4Fulfilment";
import { V4Partners } from "./v4/_components/V4Partners";
import { V4Faq, V4Cta } from "./v4/_components/V4Closing";
import { V4MobileCta } from "./v4/_components/V4MobileCta";
import { V4GetApp } from "./v4/_components/V4GetApp";

/**
 * /howa Overview — the address-first "v4" homepage ported from the finalised
 * askhowa.co.uk new-site handover (New HoWA Section Handovers/). Section order
 * mirrors V4Home.tsx; the askhowa V5Header/SiteFooter are dropped (the House
 * global chrome wraps this page). CTAs route to /howa/coming-soon; the reused
 * demo + testimonial come from the shared HoWA components.
 *
 * Mobile re-sequences via `order-*` (product hook leads); `lg:order-none`
 * restores desktop source order.
 */

export const metadata = {
  title: { absolute: "HoWA | The Home Intelligence OS for house and garden" },
  description:
    "Enter your address. In sixty seconds, HoWA builds the first portrait of your home, what it is, what matters, what can wait, and what to do next.",
};

const HouseMark = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11 12 3l9 8" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M10 21v-6h4v6" />
  </svg>
);

export default function HowaPage() {
  return (
    <main className="skin-v4 howa-surface relative overflow-x-hidden bg-[#fbfaf5]">
      <SoftwareApplicationJsonLd url={`${env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/howa`} />
      <MetaViewContent contentId="howa_overview" contentName="HoWA overview" contentCategory="howa_marketing" />

      <div className={s.subbar}>
        <div className={s.subbarBrand}>HoWA</div>
        <nav className={s.subbarNav}>
          <a href="#does">How it works</a>
          <a href="#record">The record</a>
          <a href="#tiers">Tiers</a>
          <a href="#security">Security</a>
        </nav>
        <div className={s.subbarRight}>
          <span className={s.coveredBy}>
            <span className={s.coveredMark}>{HouseMark}</span>
Created from <em>House of HoWA</em>
          </span>
          <Link href="/howa/coming-soon" className={s.subbarCta}>
            Join waitlist
          </Link>
        </div>
      </div>

      {/* Desktop = source order; mobile re-sequences so the product hook leads. */}
      <div className="flex flex-col">
        <div className="order-1 lg:order-none"><V4Hero /></div>
        <div className="order-1 lg:order-none"><V4Portrait /></div>
        <div className="order-3 lg:order-none"><V4Bands /></div>
        <div className="order-2 lg:order-none"><V4WhyHere /></div>
        <div className="order-2 lg:order-none"><V4Record /></div>
        <div className="order-2 lg:order-none"><V4WhatItDoes /></div>
        <div className="order-2 lg:order-none"><V4Demo /></div>

        <div className="order-3 lg:order-none"><V4Tiers /></div>
        <div className="order-3 lg:order-none"><V4Matrix /></div>
        <div className="order-3 lg:order-none"><V4Score /></div>
        <div className="order-3 lg:order-none"><V4Security /></div>
        <div className="order-3 lg:order-none"><V4Fulfilment /></div>
        <div className="order-3 lg:order-none"><V4Managed /></div>

        <div className="order-3 lg:order-none"><V4Partners /></div>
        <div className="order-3 lg:order-none"><V6Testimonial /></div>
        <div className="order-3 lg:order-none"><V4GetApp /></div>
        <div className="order-3 lg:order-none"><V4Faq /></div>
        <div className="order-3 lg:order-none"><V4Cta /></div>
      </div>

      {/* clear the fixed mobile CTA bar so the footer can scroll above it */}
      <div className="h-20 lg:hidden" aria-hidden />
      <V4MobileCta />
    </main>
  );
}
