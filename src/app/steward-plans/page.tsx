import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { HOME_GARDEN_PLANS, APARTMENT_PLANS } from "@/lib/steward-data";
import { StewardPlanLadder } from "./StewardPlanLadder";
import { StewardCalculator } from "./StewardCalculator";

/**
 * /steward-plans — full page.
 * Approved mockup: /ux/12-house-plans/steward-plans.html
 *
 * Fonts: Didot (font-display) for headlines, Effra (font-sans) for body.
 * NOT Cormorant/Jost — those are Hearth only.
 *
 * Order:
 *   1. Hero (lifestyle image + navy overlay)
 *   2. Four pillars on navy
 *   3. Plan ladder (tabs: Home & Garden+ / Apartment+) — on navy
 *   4. Transition band (navy → cream)
 *   5. How it works (cream)
 *   6. Editorial image band (Consciously Cared For)
 *   7. What's included (white, 6 service cards)
 *   8. Trust strip
 *   9. Calculator (white)
 *  10. House Steward membership band (navy-deep)
 *  11. Closing
 */

export const metadata = {
  title: "Steward Plans",
  description:
    "Bundle your home services into a single monthly Steward Plan. Gardening, cleaning, windows, gutters — managed through HoWA. Available to House Steward members.",
};

export default function StewardPlansPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      {/* 1. HERO — lifestyle image with navy overlay */}
      <section className="relative min-h-[560px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://willowalexander.co.uk/wp-content/uploads/2025/12/house-plans-house-of-willow-alexander.jpg"
          alt="A well-kept home and garden"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,43,0.75)_0%,rgba(21,30,43,0.5)_40%,rgba(21,30,43,0.85)_100%)]" />
        <div className="relative z-10 text-center px-[5vw] py-[96px] max-w-[880px] mx-auto text-house-cream">
          <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-[20px]">
            HoWA · Steward Plans
          </span>
          <h1 className="font-display font-medium text-[clamp(36px,6.5vw,80px)] leading-[1.04] tracking-[-0.015em] mb-[16px]">
            Steward Plans.{" "}
            <em className="italic font-normal">
              Care on a rhythm the home can trust.
            </em>
          </h1>
          <p className="font-sans text-[18px] leading-[1.65] text-house-cream/75 max-w-[620px] mx-auto mb-[36px]">
            Bundle your home services into a single monthly plan. HoWA holds
            the calendar, remembers what&apos;s due, and sends the right hands
            at the right time. One invoice. One standard. One House.
          </p>
          <div className="flex flex-col sm:flex-row gap-[12px] justify-center items-center">
            <Link
              href="#plans"
              className="inline-block w-full sm:w-auto text-center px-[32px] py-[14px] font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              See the plans
            </Link>
            <Link
              href="#calculator"
              className="inline-block w-full sm:w-auto text-center px-[32px] py-[14px] font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream border border-house-cream/45 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-cream hover:text-house-brown"
            >
              Build your own
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FOUR PILLARS on navy */}
      <section className="bg-howa-navy px-[5vw] py-[72px] border-t border-house-cream/6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-[48px]">
            <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-[12px]">
              What a Steward Plan does
            </span>
            <h2 className="font-display font-normal text-[36px] text-house-cream tracking-[-0.015em] mb-[10px]">
              One system. <em className="italic text-house-gold-light">Four quiet jobs.</em>
            </h2>
            <p className="font-sans text-[15px] text-house-cream/60 max-w-[560px] mx-auto">
              Whether it&apos;s an apartment or a five-bedroom house, the system does the same four things.
            </p>
          </div>

          {/* Desktop: 4-col grid. Mobile: horizontal peek-carousel */}
          <div className="hidden md:grid md:grid-cols-4 border-t border-b border-house-gold/25">
            {PILLARS.map((p, i) => (
              <div key={p.title} className={`px-[22px] pt-[28px] pb-[30px] ${i < 3 ? "border-r border-house-gold/18" : ""}`}>
                <div className="font-display italic text-[12px] tracking-[0.18em] uppercase text-house-gold-light mb-[10px]">{p.roman}</div>
                <div className="font-sans text-[20px] font-medium text-house-cream mb-[8px]">{p.title}</div>
                <div className="font-sans text-[13px] leading-[1.65] text-house-cream/60">{p.desc}</div>
              </div>
            ))}
          </div>
          {/* Mobile carousel */}
          <div className="flex md:hidden overflow-x-auto [scroll-snap-type:x_mandatory] [-webkit-overflow-scrolling:touch] pb-[12px]">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="shrink-0 w-[80vw] [scroll-snap-align:start] first:ml-[5vw] mr-[12px] last:mr-[5vw] border border-house-gold/18 px-[22px] pt-[28px] pb-[30px]"
              >
                <div className="font-display italic text-[12px] tracking-[0.18em] uppercase text-house-gold-light mb-[10px]">{p.roman}</div>
                <div className="font-sans text-[20px] font-medium text-house-cream mb-[8px]">{p.title}</div>
                <div className="font-sans text-[13px] leading-[1.65] text-house-cream/60">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PLAN LADDER — on navy, tabs switch categories */}
      <section id="plans" className="bg-howa-navy px-[5vw] pt-0 pb-[80px] border-t border-house-gold/15">
        <div className="text-center pt-[64px] mb-[24px]">
          <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-[12px]">
            Choose your plan
          </span>
          <h2 className="font-display font-medium text-[clamp(28px,3.8vw,44px)] text-house-cream mb-[10px]">
            Two categories. <em className="italic font-normal text-house-gold-light">Three tiers each.</em>
          </h2>
          <p className="font-sans text-[15px] text-house-cream/60 max-w-[560px] mx-auto">
            Home &amp; Garden+ for houses with outdoor space. Apartment+ for flats. Pick the tier that matches your rhythm.
          </p>
        </div>
        <StewardPlanLadder
          homeGardenPlans={HOME_GARDEN_PLANS}
          apartmentPlans={APARTMENT_PLANS}
        />
      </section>

      {/* 4. TRANSITION BAND */}
      <div className="relative text-center px-[5vw] py-[42px]" style={{ background: "linear-gradient(180deg, var(--howa-navy) 0%, var(--house-cream) 100%)" }}>
        <span className="block w-[120px] h-px mx-auto mb-[14px] bg-house-gold opacity-60" />
        <p className="font-display italic text-[15px] text-house-stone tracking-[0.04em]">
          The House defines the standard.{" "}
          <em className="not-italic font-sans text-[11px] tracking-[0.08em] uppercase text-howa-teal ml-[8px] pl-[10px] border-l border-house-brown/20">
            HoWA holds the rhythm
          </em>
        </p>
      </div>

      {/* 5. HOW IT WORKS */}
      <section className="bg-house-cream px-[5vw] py-[72px]">
        <div className="max-w-[1080px] mx-auto">
          <div className="text-center mb-[48px]">
            <Eyebrow className="block mb-[12px]">How it works</Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.8vw,44px)] mb-[10px]">
              Three steps to a <em className="italic font-normal">plan that runs itself.</em>
            </h2>
            <p className="font-sans text-[15px] text-house-stone max-w-[560px] mx-auto">
              From first conversation to first visit, typically within a week.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {STEPS.map((s) => (
              <div key={s.n} className="border-t-2 border-house-gold pt-[20px]">
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-[8px]">{s.n}</div>
                <h4 className="font-display font-medium text-[22px] mb-[8px]">{s.title}</h4>
                <p className="font-sans text-[14px] text-house-stone leading-[1.6]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL IMAGE BAND */}
      <section className="relative overflow-hidden">
        <Image
          src="https://willowalexander.co.uk/wp-content/uploads/2025/12/consciously-cared-for.jpg"
          alt="Consciously cared for"
          width={2800}
          height={933}
          sizes="100vw"
          className="w-full aspect-[21/7] max-md:aspect-[16/9] object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,30,43,0.7)_0%,transparent_60%)] flex items-center px-[5vw]">
          <div className="max-w-[480px]">
            <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-[12px]">
              The Steward Standard
            </span>
            <h2 className="font-display font-medium text-[clamp(24px,3.4vw,40px)] text-house-cream mb-[12px]">
              Consciously <em className="italic font-normal">cared for.</em>
            </h2>
            <p className="font-sans text-[15px] text-house-cream/80 leading-[1.65]">
              Every team is vetted, insured, and trained to the House standard.
              Carbon neutral as standard. Products House-approved. The care is
              the whole point.
            </p>
          </div>
        </div>
      </section>

      {/* 7. WHAT'S INCLUDED — service cards */}
      <section className="bg-house-white px-[5vw] py-[72px] border-t border-house-brown/10">
        <div className="max-w-[1080px] mx-auto">
          <div className="text-center mb-[40px]">
            <Eyebrow className="block mb-[12px]">What&apos;s in every plan</Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.4vw,42px)] mb-[10px]">
              Six disciplines, <em className="italic font-normal">one standard.</em>
            </h2>
          </div>
          {/* Desktop grid, mobile carousel */}
          <div className="hidden md:grid md:grid-cols-3 gap-[28px]">
            {SERVICES.map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </div>
          <div className="flex md:hidden overflow-x-auto [scroll-snap-type:x_mandatory] [-webkit-overflow-scrolling:touch] pb-[12px]">
            {SERVICES.map((s) => (
              <div key={s.name} className="shrink-0 w-[75vw] [scroll-snap-align:start] first:ml-[5vw] mr-[12px] last:mr-[5vw]">
                <ServiceCard service={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TRUST STRIP */}
      <div className="flex flex-wrap justify-center gap-[16px] md:gap-[28px] px-[5vw] py-[20px] border-t border-b border-house-brown/10 bg-house-cream">
        {TRUST.map((t) => (
          <span key={t} className="font-sans text-[10px] tracking-[0.2em] uppercase text-house-stone">{t}</span>
        ))}
      </div>

      {/* 9. CALCULATOR */}
      <section id="calculator" className="bg-house-white px-[5vw] py-[72px] border-t border-house-brown/10">
        <div className="text-center mb-[48px]">
          <Eyebrow className="block mb-[12px]">Or build your own</Eyebrow>
          <h2 className="font-display font-medium text-[clamp(28px,3.4vw,42px)] mb-[10px]">
            Not sure which plan? <em className="italic font-normal">Start here.</em>
          </h2>
          <p className="font-sans text-[15px] text-house-stone max-w-[560px] mx-auto">
            Select the services you need. We&apos;ll match you to the right Steward Plan and show your monthly cost.
          </p>
        </div>
        <StewardCalculator />
      </section>

      {/* 10. HOUSE STEWARD MEMBERSHIP */}
      <section className="howa-grid-bg bg-howa-navy-deep text-house-cream px-[5vw] py-[72px] text-center">
        <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-[14px]">
          House Steward
        </span>
        <h2 className="font-display font-normal text-[clamp(24px,3.4vw,40px)] tracking-[-0.01em] mb-[10px]">
          These plans are available to <em className="italic text-house-gold-light">House Steward members.</em>
        </h2>
        <p className="font-sans text-[15px] text-house-cream/70 max-w-[560px] mx-auto mb-[28px] leading-[1.65]">
          House Steward is the recurring managed-care membership that unlocks
          Steward Plans. One membership, every plan, priority scheduling, a
          dedicated House contact.
        </p>
        <div className="flex flex-wrap justify-center gap-[10px] md:gap-[24px] mb-[28px]">
          {["Access to all plans", "Priority scheduling", "Dedicated House contact", "Quarterly reviews", "One monthly invoice"].map((b) => (
            <span key={b} className="font-sans text-[11px] md:text-[12px] tracking-[0.14em] uppercase text-house-cream/65 border border-house-cream/20 px-[10px] md:px-[14px] py-[5px] md:py-[6px]">{b}</span>
          ))}
        </div>
        <Link
          href="/book-consultation"
          className="inline-block px-[32px] py-[14px] font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Become a House Steward
        </Link>
      </section>

      {/* 11. CLOSING */}
      <section className="bg-house-cream px-[5vw] py-[88px] text-center border-t border-house-brown/8">
        <p className="font-display italic text-[clamp(20px,3vw,24px)] text-house-brown leading-[1.3] max-w-[640px] mx-auto mb-[28px]">
          A well-kept home isn&apos;t a pile of bookings.{" "}
          <em className="text-house-stone">It&apos;s a rhythm someone else remembers.</em>
        </p>
        <Link
          href="/book-consultation"
          className="inline-block px-[32px] py-[14px] font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Start your Steward Plan
        </Link>
      </section>

      <div className="text-center border-t border-house-brown/10 bg-house-cream px-[20px] py-[20px]">
        <p className="font-display italic text-[14px] text-house-stone tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}

/* ---- Static data ---- */

const PILLARS = [
  { roman: "I. Schedule", title: "Holds the calendar.", desc: "Every service scheduled on a rhythm you set. HoWA sends the right team at the right time." },
  { roman: "II. Remember", title: "Nothing falls through.", desc: "Every visit logged: who came, what they did, what they noticed. The record compounds." },
  { roman: "III. Coordinate", title: "One invoice, every trade.", desc: "No chasing three different companies. One plan, one monthly payment, one House standard." },
  { roman: "IV. Improve", title: "Gets better with time.", desc: "HoWA learns the home. Seasonal patterns, wear points, preferences. The plan adapts." },
];

const STEPS = [
  { n: "01", title: "Tell us about the home.", body: "Postcode, property type, what you'd like done. Five minutes through the consultation form or the HoWA Companion." },
  { n: "02", title: "We propose a plan.", body: "A fixed monthly quote — by the home, not by the hour. Itemised, transparent, no surprises. Adjust until it's right." },
  { n: "03", title: "We arrive when we said.", body: "Vetted, insured teams. Text before arrival. Photographs in your HoWA record after. One monthly payment covers everything." },
];

const SERVICES = [
  { name: "Gardening", desc: "Seasonal pruning, weeding, lawn care, and planting by horticulturally trained gardeners.", freq: "Weekly or fortnightly" },
  { name: "Cleaning", desc: "Full domestic clean — kitchens, bathrooms, living spaces. Surface-appropriate, fragrance-free on request.", freq: "Weekly · 2–3 hours" },
  { name: "Window cleaning", desc: "Pure-water pole system, frames and sills included. Up to four storeys from the ground.", freq: "Monthly" },
  { name: "Gutter cleaning", desc: "Vacuum-pole gutter clear, photographic record, downpipe check, condition report.", freq: "Bi-annual" },
  { name: "Deep cleaning", desc: "Quarterly deep clean — behind furniture, inside ovens, descale, skirting, light switches.", freq: "Quarterly · 4 hours" },
  { name: "HoWA record", desc: "Every visit logged — team, notes, photographs, products used. The living memory of your home's care.", freq: "Always on" },
];

const TRUST = [
  "House & Garden 'The List'",
  "Guild of Master Craftsmen",
  "Carbon Neutral Certified",
  "Fully Insured & Accredited",
  "Safe Contractor Approved",
];

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <div className="border border-house-brown/12 px-[24px] py-[28px] transition-all duration-[var(--t-slow)] ease-out hover:border-house-gold hover:-translate-y-0.5">
      <div className="font-display font-medium text-[20px] mb-[6px]">{service.name}</div>
      <div className="font-sans text-[14px] text-house-stone leading-[1.55]">{service.desc}</div>
      <div className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold mt-[10px]">{service.freq}</div>
    </div>
  );
}
