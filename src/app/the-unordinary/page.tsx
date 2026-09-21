import Link from "next/link";
import Image from "next/image";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";

/**
 * /the-unordinary — The unOrdinary campaign world (brief §26), built from the
 * HoWA Cinema / Bureau handover. The House's cinematic world between House and
 * HoWA: campaign films, the Bureau characters, and product/service moments.
 * Contained, dark (Midnight), distinct from House Cinema (/cinema, which stays
 * in the nav for real House films). Launch films are IN PRODUCTION.
 */

const MIDNIGHT = "#102A39";
const CREAM = "#F4F4F2";
const GOLD = "#C9A96B";

export const metadata = {
  title: { absolute: "The unOrdinary | House of Willow Alexander" },
  description:
    "Ordinary homes. Particular people. Films from the unOrdinary world of the House and HoWA: extraordinary attention to the everyday life of home.",
};

const FILMS = [
  {
    n: "01",
    title: "The Post Room",
    still: "/howa/cinema/bureau-post-room.webp",
    premise:
      "Bills, renewals and household correspondence arrive all the time. The Post Room follows what happens when one important detail is noticed, understood and kept somewhere useful.",
    cta: "How the House keeps the details",
    href: "/how-it-works",
  },
  {
    n: "02",
    title: "Two Files",
    still: "/howa/cinema/bureau-two-files.webp",
    premise:
      "Moving home should not mean starting from nothing. The property keeps its useful history, while the preferences and routines that belong to your household move with you.",
    cta: "Home Record and Household Memory",
    href: "/my-house",
  },
  {
    n: "03",
    title: "The Garden Would Like a Word",
    still: "/howa/cinema/bureau-garden.webp",
    premise:
      "A garden is always giving you clues. A change in a plant, a branch out of place or the turn of a season can all point towards what needs attention next.",
    cta: "Ask HoWA about your garden",
    href: "/howa/ask",
  },
  {
    n: "04",
    title: "The House at Enquiries",
    still: "/howa/cinema/bureau-enquiries.webp",
    premise:
      "A home is more than an address. Its condition, care, records and history can build a clearer picture of what is known, what needs attention and what may be worth doing next.",
    cta: "Explore HoWA",
    href: "/howa",
  },
];

function InProductionChip() {
  return (
    <span
      className="absolute left-3 top-3 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.14em] backdrop-blur-sm"
      style={{ color: "rgba(244,244,242,0.8)", background: "rgba(16,42,57,0.7)", border: "1px solid rgba(244,244,242,0.25)" }}
    >
      In production
    </span>
  );
}

export default function TheUnordinaryPage() {
  return (
    <main style={{ background: MIDNIGHT, color: CREAM }} className="relative overflow-x-hidden">
      <MetaViewContent contentId="the_unordinary" contentName="The unOrdinary" contentCategory="house_marketing" />

      {/* Hero — full-bleed still, copy at the base */}
      <section className="relative min-h-[80vh] w-full">
        <Image src="/howa/cinema/bureau-enquiries.webp" alt="The Bureau enquiry counter, clerks examining a model house by lamplight" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #102A39 0%, rgba(16,42,57,0.55) 45%, rgba(16,42,57,0.25) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1240px] px-[5vw] pb-[clamp(40px,6vw,88px)]">
            <p className="font-sans text-[12px] tracking-[0.24em] uppercase" style={{ color: GOLD }}>The unOrdinary</p>
            <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(38px,6vw,84px)] leading-[1.0]">
              Ordinary homes. Particular people.
            </h1>
            <p className="mt-5 max-w-[52ch] font-sans text-[clamp(17px,1.5vw,21px)] leading-[1.55]" style={{ color: "rgba(244,244,242,0.85)" }}>
              Meet the people, habits and homes that make ordinary life anything
              but. Films from the unOrdinary world of the House and HoWA.
            </p>
            <Link href="#films" className="mt-8 inline-block px-6 py-3 font-sans text-[12px] tracking-[0.16em] uppercase no-underline transition-[filter] hover:brightness-95" style={{ background: CREAM, color: "#17241C" }}>
              Watch the films ↓
            </Link>
          </div>
        </div>
      </section>

      {/* The Bureau intro */}
      <section className="border-y" style={{ borderColor: "rgba(244,244,242,0.1)" }}>
        <div className="mx-auto max-w-[760px] px-[5vw] py-[clamp(56px,8vw,96px)] text-center">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase" style={{ color: GOLD }}>The Bureau</p>
          <h2 className="mt-4 font-display text-[clamp(30px,4vw,52px)] leading-[1.08]">Every home has a case.</h2>
          <p className="mt-5 font-sans text-[18px] leading-[1.65]" style={{ color: "rgba(244,244,242,0.85)" }}>
            The Bureau is a fictional world created for the unOrdinary films,
            giving the details of everyday home life extraordinary, cinematic
            attention.
          </p>
          <p className="mt-4 font-sans text-[16px] leading-[1.6]" style={{ color: "rgba(244,244,242,0.65)" }}>
            Our first Bureau films are currently in production. Each begins with a
            familiar part of looking after a home, seen through the unOrdinary
            world of the House and HoWA.
          </p>
        </div>
      </section>

      {/* The four films — alternating scenes */}
      <div id="films" className="scroll-mt-20">
        {FILMS.map((f, i) => {
          const imageLeft = i % 2 === 0;
          const img = (
            <div className="relative aspect-video w-full overflow-hidden" style={{ border: "1px solid rgba(244,244,242,0.12)", boxShadow: "0 30px 80px -50px rgba(0,0,0,0.7)" }}>
              <Image src={f.still} alt={`${f.title} — a scene from the Bureau`} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
              <InProductionChip />
            </div>
          );
          const copy = (
            <div className="max-w-[500px]">
              <p className="font-sans text-[12px] tracking-[0.22em] uppercase" style={{ color: GOLD }}>Film {f.n}</p>
              <h3 className="mt-3 font-display text-[clamp(28px,3.4vw,44px)] leading-[1.08]">{f.title}</h3>
              <p className="mt-4 font-sans text-[17px] leading-[1.6]" style={{ color: "rgba(244,244,242,0.8)" }}>{f.premise}</p>
              <Link href={f.href} className="mt-5 inline-block font-sans text-[14px] underline underline-offset-4 no-underline hover:opacity-80" style={{ color: GOLD }}>
                {f.cta} →
              </Link>
            </div>
          );
          return (
            <section key={f.n} className="border-t" style={{ borderColor: "rgba(244,244,242,0.1)" }}>
              <div className="mx-auto grid max-w-[1200px] items-center gap-[clamp(28px,4vw,64px)] px-[5vw] py-[clamp(48px,6vw,88px)] lg:grid-cols-2">
                {imageLeft ? (<>{img}{copy}</>) : (<><div className="lg:order-2">{img}</div><div className="lg:order-1">{copy}</div></>)}
              </div>
            </section>
          );
        })}
      </div>

      {/* Close */}
      <section className="border-t" style={{ borderColor: "rgba(244,244,242,0.1)" }}>
        <div className="mx-auto max-w-[820px] px-[5vw] py-[clamp(56px,8vw,104px)] text-center">
          <h2 className="mx-auto max-w-[22ch] font-display text-[clamp(28px,3.6vw,48px)] leading-[1.08]">
            The work gets done. The home remembers.
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] font-sans text-[17px] leading-[1.6]" style={{ color: "rgba(244,244,242,0.8)" }}>
            The House takes care of the jobs. HoWA gets to know how you live.
            Property, design, horticulture, home care, risk and technology all
            contribute to the way a home is understood.
          </p>
          <div className="mx-auto mt-8 flex max-w-[520px] flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/howa" className="w-full whitespace-nowrap px-6 py-3 text-center font-sans text-[12px] tracking-[0.16em] uppercase no-underline transition-[filter] hover:brightness-95 sm:w-auto" style={{ background: CREAM, color: "#17241C" }}>
              See how HoWA works
            </Link>
            <Link href="/cinema" className="w-full whitespace-nowrap px-6 py-3 text-center font-sans text-[12px] tracking-[0.16em] uppercase no-underline transition-colors sm:w-auto" style={{ color: CREAM, border: "1px solid rgba(244,244,242,0.35)" }}>
              Watch House Cinema
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
