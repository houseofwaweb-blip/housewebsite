import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { MonthTimeline } from "@/components/marketing/MonthTimeline";
import { TestimonialBand } from "@/components/marketing/TestimonialCard";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";

export const metadata = {
  title: "HoWA+",
  description:
    "The connected membership for a home you mean to keep. £16.99/month. Living record, Companion diagnostic, member pricing, and more.",
};

const FEATURES = [
  {
    title: "10% Off All House Services",
    description: "Auto-applied at checkout. Gardening, cleaning, windows, gutters, design packages, and product bundles. This is a benefit of HoWA+, but it is not the purpose. The purpose is intelligence.",
  },
  {
    title: "Full Dashboard Continuity & Task Centre",
    description: "Every service, review, booking, and purchase filed to one record that grows with the home. Tasks, seasonal prompts, and reminders surface what matters before it becomes a problem. No meaningful journey ends as an orphan enquiry.",
    linkHref: "/howa/how-it-works",
    linkLabel: "How it works →",
  },
  {
    title: "Companion Diagnostic (Full)",
    description: "The full Companion. Capture home type, rooms, priorities, style, budget, and household context. AI repair scan and instant quote. AI design moodboards. Every result saves to the home record, even before purchase.",
    linkHref: "/howa/companion",
    linkLabel: "See the Companion →",
  },
  {
    title: "Richer Documents & Home Logbook",
    description: "Invoices, certificates, photos, contractor notes, paint colours, appliance details. The home logbook that every trade can reference. Saved guides and seasonal reminders you can action or defer.",
  },
  {
    title: "Priority Booking & The Hearth",
    description: "Priority booking across all House services and approved partners. Full editorial access to The Hearth magazine: long-form writing on homes, gardens, design, and the craft of looking after a place properly.",
    linkHref: "/journal",
    linkLabel: "Browse the Hearth →",
  },
  {
    title: "Carbon Offset Fund & Early Access",
    description: "A personal carbon offset fund tracked against your household. Early access to new HoWA features, exclusive House events and drops, and Protect Review introductions via Provenance.",
  },
];

const TESTIMONIALS = [
  {
    quote: "We used to keep everything in a folder under the stairs. Now HoWA knows what was done, when, and by whom. The Companion caught a valve leak we'd have ignored for months.",
    name: "Catherine M.",
    homeType: "4-bed Victorian, Clapham",
  },
  {
    quote: "The member pricing alone pays for itself. We had the gutters done, windows cleaned, and a garden tidy all in the first month. Saved about forty pounds on what we'd have paid calling around.",
    name: "James & Sarah T.",
    homeType: "3-bed Edwardian, Dulwich",
  },
  {
    quote: "I photograph everything now. The Companion told me the crack above the kitchen door was settlement, not structural. Saved me a surveyor's call-out fee and a week of worry.",
    name: "David R.",
    homeType: "2-bed cottage, Oxfordshire",
  },
];

export default function HowaPlusPage() {
  return (
    <article className="text-house-brown">
      {/* 1. Hero — House editorial zone */}
      <section className="bg-house-cream px-[5vw] pt-[12vh] pb-16">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>HoWA+</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em] mt-4">
            The membership for a home you <em>mean to keep.</em>
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            HoWA+ is the paid continuity layer. Full dashboard, full Companion, full Hearth editorial access. A living record that remembers what was done, a task centre that tracks what is due, and priority booking across every House service. The intelligence case first. The savings follow.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              href="/api/howa-bounce?source=plus-hero"
              className="inline-block px-8 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Start HoWA+ — £16.99/month
            </Link>
            <GhostLink href="/howa/companion">Try the Companion first</GhostLink>
          </div>
          <p className="font-sans text-[12px] text-house-brown/70 mt-4">
            Cancel anytime. Your record stays with you.
          </p>
        </div>
      </section>

      {/* 2. Transition band */}
      <div
        className="relative text-center px-[5vw] py-[42px] border-t border-house-brown/10 border-b border-house-brown/8"
        style={{ background: "linear-gradient(180deg, var(--house-cream) 0%, var(--house-white) 100%)" }}
      >
        <span aria-hidden="true" className="block w-[120px] h-px mx-auto mb-[14px] bg-house-gold opacity-60" />
        <span aria-hidden="true" className="absolute top-[34px] left-1/2 -translate-x-1/2 font-display text-house-gold text-[18px] leading-none">·</span>
        <p className="font-sans italic text-[15px] text-house-brown/70 tracking-[0.04em]">
          The House introduces.
          <span className="not-italic font-sans text-[11px] tracking-[0.08em] uppercase text-howa-teal ml-2.5 pl-2.5 border-l border-house-brown/20">
            HoWA+ connects
          </span>
        </p>
      </div>

      {/* 3. Feature grid */}
      <section className="bg-house-white px-[5vw] py-16">
        <div className="max-w-[1100px] mx-auto">
          <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal mb-2">
            What you get
          </span>
          <h2 className="font-sans font-normal text-[clamp(28px,3.4vw,40px)] leading-[1.12] tracking-[-0.01em] text-house-brown mb-10">
            Six things that change how your home is{" "}
            <em className="italic font-light text-howa-teal">looked after.</em>
          </h2>
          <FeatureGrid features={FEATURES} />
        </div>
      </section>

      {/* 4. A month in HoWA+ */}
      <section className="px-[5vw] py-16 border-t border-house-brown/8" style={{ background: "var(--howa-paper, #f4efe4)" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal mb-2">
            A month with HoWA+
          </span>
          <h2 className="font-sans font-normal text-[clamp(28px,3.4vw,40px)] leading-[1.12] tracking-[-0.01em] text-house-brown mb-10">
            What stewardship{" "}
            <em className="italic font-light text-howa-teal">actually looks like.</em>
          </h2>
          <MonthTimeline />
        </div>
      </section>

      {/* 5. Social proof */}
      <TestimonialBand testimonials={TESTIMONIALS} counter={247} />

      {/* 6. Comparison table */}
      <section className="bg-house-white px-[5vw] py-16 border-t border-house-brown/8">
        <div className="max-w-[960px] mx-auto">
          <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal mb-2">
            Compare
          </span>
          <h2 className="font-sans font-normal text-[clamp(28px,3.4vw,40px)] leading-[1.12] tracking-[-0.01em] text-house-brown mb-10">
            Free, HoWA+, and{" "}
            <em className="italic font-light text-howa-teal">Steward.</em>
          </h2>
          <ComparisonTable />
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="bg-howa-navy text-house-cream px-[5vw] py-20">
        <div className="max-w-[720px] mx-auto text-center">
          <p className="font-display italic text-[clamp(20px,2.8vw,28px)] leading-[1.35] text-house-cream/80 mb-8">
            A well-kept home isn&apos;t a list of repairs. It&apos;s a system that remembers, recommends, and connects — so you don&apos;t have to.
          </p>
          <Link
            href="/api/howa-bounce?source=plus-footer"
            className="inline-block px-10 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Start HoWA+ — £16.99/month
          </Link>
          <div className="mt-5">
            <GhostLink href="/howa/faq" dark>
              Questions? Read the FAQ →
            </GhostLink>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-brown/70 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}
