import Link from "next/link";
import Image from "next/image";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";

/**
 * /howa/design — HoWA design entry (Sept HoWA review v2, Step 10 / COPY 11.2).
 * Release state: transition. The AI design tool is not live, so the page
 * explains what it will do (marked "In development"), never shows a working
 * upload/result, labels any concept "AI concept · For discussion", and routes
 * the primary action to the real professional-brief enquiry (COPY 18 fallback).
 */

export const metadata = {
  title: { absolute: "Design with HoWA | House of Willow Alexander" },
  description:
    "Show HoWA the space and tell it what you want to change. Explore a direction, refine what matters and keep a brief you can take to a House design professional.",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3 font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-dark">
      <span aria-hidden="true" className="inline-block h-px w-8 bg-house-gold-dark/60" />
      {children}
    </p>
  );
}

const INPUTS = [
  { label: "Which space?", help: "The room or garden you want to explore." },
  { label: "What would you like to change?", help: "The outcome you are after, in your own words." },
  { label: "Photographs", help: "Add images you have permission to use. Check for people, private documents and access details before uploading." },
  { label: "Measurements you know", help: "Add dimensions you know. Mark estimates as estimates; a professional verifies measurements before work." },
  { label: "Budget range, if useful", help: "A planning preference, not a quote. Leave it blank or discuss it with a professional." },
  { label: "Things to keep", help: "Pieces, features or planting you want to design around." },
  { label: "Practical constraints", help: "Access, timing, permissions or anything the design must work with." },
];

export default function HowaDesignPage() {
  return (
    <main className="howa-surface relative overflow-x-hidden bg-house-cream text-house-brown">
      <MetaViewContent contentId="howa_design" contentName="HoWA design" contentCategory="howa_marketing" />

      {/* Hero */}
      <section className="border-b border-house-brown/10 bg-[#f6efe7]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-[5vw] py-[clamp(44px,6vw,84px)] lg:grid-cols-[1fr_1fr]">
          <div className="max-w-[52ch]">
            <Eyebrow>
              <span>HoWA · Design</span>
              <span className="inline-block border border-house-gold-dark/40 px-2 py-0.5 text-[10px] text-house-gold-dark">In development</span>
            </Eyebrow>
            <h1 className="font-display text-[clamp(36px,4.8vw,60px)] leading-[1.02]">
              Show HoWA the space. Tell it what you want to change.
            </h1>
            <p className="mt-6 font-sans text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-house-brown/80">
              Bring a photograph, the measurements you know and a little about how
              the space needs to work. Explore a direction, refine what matters
              and keep a brief you can take to a professional.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link href="/design#routes" className="booknow-button w-full whitespace-nowrap text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-125 sm:w-auto">
                Choose a design specialist
              </Link>
              <Link href="/contact" className="w-full whitespace-nowrap text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/40 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-brown sm:w-auto">
                Speak to a designer
              </Link>
            </div>
            <p className="mt-5 font-sans text-[14px] leading-[1.5] text-house-brown/60">
              HoWA design is being prepared for this account. You can still start a
              professional design brief with the House today.
            </p>
          </div>
          <figure className="relative m-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image src="/howa/sept/howa-design-tray.webp" alt="A design tray: fabric swatches, garden photographs and a planting brief beside a model home" fill priority sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
              <span className="absolute left-3 top-3 bg-house-cream/95 px-3 py-1 font-sans text-[11px] tracking-[0.1em] uppercase text-house-brown/70">AI concept · For discussion</span>
            </div>
          </figure>
        </div>
      </section>

      {/* What you'll share */}
      <section className="mx-auto max-w-[1280px] px-[5vw] py-[clamp(48px,6vw,88px)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.72fr] lg:gap-14">
          <div>
            <Eyebrow>What you will share</Eyebrow>
            <h2 className="max-w-[24ch] font-display text-[clamp(28px,3.4vw,44px)] leading-[1.08]">
              A direction to explore, from what you already have.
            </h2>
            <p className="mt-6 max-w-[54ch] font-sans text-[17px] leading-[1.6] text-house-brown/75">
              A few photographs, the measurements you know and a note on how the
              space needs to work. HoWA lays them out like a designer&rsquo;s tray,
              ready to shape into a direction.
            </p>
          </div>
          <figure className="relative m-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f1ebe5]">
              <Image src="/howa/new/dollhouse-hero-2.webp" alt="The HoWA Doll's House, the home you already have, ready to explore a direction for" fill sizes="(max-width: 1024px) 100vw, 460px" className="object-contain" />
            </div>
          </figure>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden border border-house-brown/12 bg-house-brown/12 sm:grid-cols-2 lg:grid-cols-3">
          {INPUTS.map((i) => (
            <div key={i.label} className="bg-house-cream p-6">
              <h3 className="font-display text-[19px]">{i.label}</h3>
              <p className="mt-2 font-sans text-[14px] leading-[1.5] text-house-brown/75">{i.help}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The result + handoff */}
      <section className="border-y border-house-brown/10 bg-[#f6efe7]">
        <div className="mx-auto grid max-w-[1280px] items-start gap-10 px-[5vw] py-[clamp(48px,6vw,88px)] lg:grid-cols-[0.85fr_1fr] lg:gap-14">
          <figure className="relative m-0">
            <div className="relative aspect-[3/2] w-full overflow-hidden border border-house-brown/12">
              <Image src="/howa/new/life-artwork.webp" alt="Two people carrying a large framed artwork through a light room, settling a finished scheme into place" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
            </div>
            <figcaption className="mt-3 font-sans text-[13px] leading-[1.5] text-house-brown/55">
              From a saved direction to a finished room, kept in your Home Record.
            </figcaption>
          </figure>
          <div className="grid gap-10">
          <div>
            <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.08]">A direction to explore.</h2>
            <p className="mt-4 font-sans text-[17px] leading-[1.6] text-house-brown/80">
              What HoWA returns is a starting point, always labelled{" "}
              <strong className="font-semibold">AI concept &middot; For discussion</strong>. Save a direction, refine the idea, or prepare a
              professional brief when you are ready.
            </p>
            <p className="mt-4 font-sans text-[15px] leading-[1.55] text-house-brown/60">
              A HoWA concept is a starting point for discussion. Professional
              review is needed before relying on it for dimensions, construction,
              installation or a final project budget.
            </p>
          </div>
          <div>
            <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.08]">Ready to take this further?</h2>
            <p className="mt-4 font-sans text-[17px] leading-[1.6] text-house-brown/80">
              Choose the ideas to share, check the brief and select the
              professional route. The specialist will review what is feasible and
              confirm the scope and price of their service.
            </p>
            <p className="mt-4 font-sans text-[15px] leading-[1.55] text-house-brown/60">
              When the work is complete, add the confirmed finishes and supplied
              care information to your Home Record.
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link href="/design#routes" className="booknow-button w-full whitespace-nowrap text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-125 sm:w-auto">
                Choose a design specialist
              </Link>
              <Link href="/design/gardens" className="w-full whitespace-nowrap text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/40 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-brown sm:w-auto">
                See garden design
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
