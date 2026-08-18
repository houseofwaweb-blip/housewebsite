import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/primitives/Accordion";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { HouseStandardStrip } from "@/components/marketing/HouseStandardStrip";
import { ServiceCtaRow } from "@/components/marketing/ServiceCtaRow";

/**
 * /services/home-and-garden — the bundled recurring-care edition (doc §10
 * "Home & Garden"). Colour: var(--color-service-home-garden) (House gold).
 *
 * This is the master/bundled edition, not a default: gardening, window
 * cleaning, cleaning and repairs coordinated as one recurring plan, on one
 * schedule, with one point of contact and one Home Record. Recurring care is
 * framed as a booking rhythm, never a subscription tier. Every service is live
 * and bookable; there is no "coming soon" state.
 */

const ACCENT = "var(--color-service-home-garden)";

export const metadata: Metadata = {
  title: "Home & Garden",
  description:
    "One coordinated plan for the whole home and garden. Gardening, window cleaning, cleaning and repairs on one schedule, one point of contact, one record. Held to the House standard.",
};

const PHONE_DISPLAY = "0800 047 8738";
const PHONE_HREF = "tel:08000478738";

const DISCIPLINES = [
  {
    name: "Gardening",
    image: "/services/photos/gardening-hero.webp",
    blurb: "Seasonal maintenance, borders, lawns and waste handling, kept to a rhythm that suits the garden.",
  },
  {
    name: "Window cleaning",
    image: "/services/photos/window-cleaning-hero.webp",
    blurb: "Interior and exterior glass on a regular cycle, with reach-and-wash for upper floors where access allows.",
  },
  {
    name: "Cleaning",
    image: "/services/photos/cleaning-hero.webp",
    blurb: "A regular household clean, room by room, with products chosen for the surfaces and the people in the home.",
  },
  {
    name: "Repairs",
    image: "/services/photos/handyman-hero.webp",
    blurb: "The small jobs a home always gathers, handled by a vetted professional and logged against your record.",
  },
];

const INCLUDED = [
  "The services you choose, coordinated onto one schedule",
  "One point of contact for the whole plan, not a different number per trade",
  "One Home Record, so every visit, note and invoice sits in one place",
  "Rated professionals, reviewed by clients after each visit",
  "Change, pause or stop the rhythm whenever you like, with no lock-in",
];

const NOT_INCLUDED = [
  "Materials, parts and green waste beyond the agreed plan, always itemised in your price.",
  "Regulated works needing separate certification, referred to a named specialist.",
  "One-off deep cleans, end-of-tenancy or major garden projects, quoted separately.",
  "VAT treatment is shown in your price summary, never hidden.",
];

const STEPS = [
  {
    title: "Choose your services",
    body: "Pick the disciplines your home needs, from one to all four. Tell us your postcode so we can show real availability.",
  },
  {
    title: "We build one schedule",
    body: "We coordinate the visits into a single rhythm, weekly, fortnightly or seasonal, so the home is looked after without you managing it.",
  },
  {
    title: "One point of contact",
    body: "A single person holds the plan. No repeating yourself to a different trade each time something needs arranging.",
  },
  {
    title: "One record, kept for you",
    body: "Every visit, note and invoice lands in your Home Record, so the history of the home stays in one place, powered by HoWA.",
  },
];

const FAQ = [
  {
    q: "Is this a subscription I have to commit to?",
    a: "No. Home & Garden is a coordinated plan, not a locked contract. You set the rhythm, and you can change, pause or stop it whenever you like. You only ever pay for visits that happen.",
  },
  {
    q: "Can I start with just one or two services?",
    a: "Yes. Begin with whatever the home needs most, then add disciplines when it suits you. The plan is built around you, not a fixed bundle.",
  },
  {
    q: "How is a coordinated plan priced?",
    a: "Each service is priced on its own clear basis, per visit, per hour or per team, and shown before you confirm. Because the visits are coordinated, we will talk through the annual economics with you so you can see the value across the year before anything recurring is agreed.",
  },
  {
    q: "Who actually does the work?",
    a: "Vetted, rated professionals working through the House, each reviewed by clients after the visit. The same standard applies to every discipline in the plan.",
  },
  {
    q: "What areas do you cover?",
    a: "We work across London and Kent and are expanding. Enter your postcode to see availability, or write to us if your area is not yet listed.",
  },
];

export default function HomeAndGardenPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* 1. Hero + planning panel — 7/5 split */}
      <section className="bg-house-cream px-[5vw] pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,6vw,96px)] border-b border-house-brown/10">
        <div className="mx-auto grid max-w-[1280px] items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-12">
          {/* Left — copy, proof, still-life (7 cols) */}
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="mb-6 font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink">
              <Link href="/services" className="no-underline text-house-gold-ink hover:text-house-brown">
                Services
              </Link>
              <span aria-hidden className="mx-2 text-house-stone">/</span>
              <span className="text-house-brown/70">Home &amp; Garden</span>
            </nav>

            <p className="mb-5 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">
              Services · Home &amp; Garden
            </p>
            <h1 className="mb-5 font-hearth-serif font-normal text-[clamp(40px,5.4vw,74px)] leading-[1.04] tracking-[-0.018em] text-house-brown [&_em]:italic [&_em]:text-house-gold-ink">
              One plan for the <em>whole home and garden.</em>
            </h1>
            <p className="mb-6 max-w-[54ch] border-t border-house-brown/15 pt-5 font-sans text-[17px] leading-[1.65] text-house-brown/75">
              Gardening, window cleaning, cleaning and repairs, coordinated as a
              single recurring plan. One schedule, one point of contact and one
              record, so the whole property is looked after without you holding
              all the threads. Held to the same House standard as every service
              we arrange.
            </p>

            <ul className="m-0 flex flex-wrap gap-x-8 gap-y-3 list-none p-0">
              <li className="font-sans text-[14px] text-house-brown/80">
                <span className="mr-2 text-house-gold-ink" aria-hidden>◆</span>
                Four disciplines, one coordinated plan
              </li>
              <li className="font-sans text-[14px] text-house-brown/80">
                <span className="mr-2 text-house-gold-ink" aria-hidden>◆</span>
                No lock-in, change the rhythm anytime
              </li>
              <li className="font-sans text-[14px] text-house-brown/80">
                <span className="mr-2 text-house-gold-ink" aria-hidden>◆</span>
                Serving London and Kent
              </li>
            </ul>

            {/* Service colour / still-life frame */}
            <div className="mt-8 overflow-hidden border p-2" style={{ borderColor: ACCENT, background: ACCENT }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/services/photos/gardening-hero.webp"
                alt="A well-kept garden and home, cared for on one coordinated plan"
                className="block aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          {/* Right — planning panel (5 cols) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="border border-house-brown/15 bg-house-cream-light p-[clamp(24px,2.4vw,34px)]">
              <p className="mb-1 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
                Plan your care
              </p>
              <h2 className="mb-6 font-hearth-serif text-[clamp(22px,2.4vw,28px)] leading-tight text-house-brown">
                See times and prices.
              </h2>

              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block font-sans text-[12px] tracking-[0.12em] uppercase text-house-brown/70">
                    Plan
                  </label>
                  <div className="flex items-center gap-3 border border-house-brown/15 bg-house-cream px-4 py-3">
                    <span aria-hidden className="inline-block h-3 w-3 shrink-0" style={{ background: ACCENT }} />
                    <span className="font-sans text-[15px] text-house-brown">Home &amp; Garden</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="hg-postcode" className="mb-1.5 block font-sans text-[12px] tracking-[0.12em] uppercase text-house-brown/70">
                    Your postcode
                  </label>
                  <input
                    id="hg-postcode"
                    name="postcode"
                    type="text"
                    inputMode="text"
                    autoComplete="postal-code"
                    placeholder="e.g. SW1A 1AA"
                    className="w-full border border-house-brown/25 bg-house-white px-4 py-3 font-sans text-[15px] text-house-brown placeholder:text-house-brown/40 focus:border-house-gold focus:outline-none"
                  />
                </div>

                <Link href="#open-booking-form" className="inline-flex items-center justify-center bg-house-gold-ink px-5 py-3.5 font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
                  See times and prices
                </Link>
              </div>

              <p className="mt-4 font-sans text-[14px] leading-[1.5] text-house-brown/70">
                Prefer to talk?{" "}
                <a href={PHONE_HREF} className="text-house-gold-ink underline underline-offset-[3px] hover:text-house-brown">
                  Call {PHONE_DISPLAY}
                </a>
              </p>

              <p className="mt-5 border-t border-house-brown/12 pt-4 font-sans text-[12px] tracking-[0.14em] uppercase text-house-brown/55">
                Powered by HoWA
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* 2. What's included — the four disciplines, coordinated */}
      <section className="bg-house-cream px-[5vw] py-[clamp(56px,6vw,96px)] border-b border-house-brown/10">
        <header className="mx-auto mb-[clamp(32px,4vw,52px)] max-w-[720px] text-center">
          <p className="mb-3.5 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">
            What&apos;s in the plan
          </p>
          <h2 className="font-hearth-serif text-[clamp(30px,3.6vw,50px)] leading-[1.1] text-house-brown [&_em]:italic [&_em]:text-house-gold-ink">
            Four disciplines, <em>one household rhythm.</em>
          </h2>
        </header>
        <div className="mx-auto grid max-w-[1160px] gap-[clamp(16px,1.8vw,24px)] sm:grid-cols-2 lg:grid-cols-4">
          {DISCIPLINES.map((d) => (
            <article key={d.name} className="flex flex-col overflow-hidden border border-house-brown/10 bg-house-cream-light">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-6">
                <h3 className="font-hearth-serif text-[21px] leading-tight text-house-brown">{d.name}</h3>
                <p className="font-sans text-[15px] leading-[1.55] text-house-brown/70">{d.blurb}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-[clamp(40px,5vw,64px)] grid max-w-[1080px] gap-[clamp(28px,4vw,56px)] md:grid-cols-2">
          <div>
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Included as standard</p>
            <h3 className="mb-5 font-hearth-serif text-[clamp(22px,2.4vw,28px)] leading-tight text-house-brown">
              Everything <em className="italic text-house-gold-ink">coordinated.</em>
            </h3>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {INCLUDED.map((inc) => (
                <li key={inc} className="relative pl-6 font-sans text-[15px] leading-[1.55] text-house-brown/75">
                  <span aria-hidden className="absolute left-0 text-house-gold-ink">◆</span>
                  {inc}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Not included as standard</p>
            <h3 className="mb-5 font-hearth-serif text-[clamp(22px,2.4vw,28px)] leading-tight text-house-brown">
              Clear <em className="italic text-house-gold-ink">before you plan.</em>
            </h3>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {NOT_INCLUDED.map((inc) => (
                <li key={inc} className="relative pl-6 font-sans text-[15px] leading-[1.55] text-house-brown/75">
                  <span aria-hidden className="absolute left-0 text-house-brown/40">—</span>
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="bg-house-cream-dark/50 px-[5vw] py-[clamp(56px,6vw,96px)] border-b border-house-brown/10">
        <header className="mx-auto mb-[clamp(32px,4vw,52px)] max-w-[720px] text-center">
          <p className="mb-3.5 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">
            How it works
          </p>
          <h2 className="font-hearth-serif text-[clamp(30px,3.6vw,50px)] leading-[1.1] text-house-brown [&_em]:italic [&_em]:text-house-gold-ink">
            One plan, <em>quietly kept.</em>
          </h2>
        </header>
        <ol className="mx-auto grid max-w-[1080px] list-none gap-[clamp(16px,2vw,28px)] p-0 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t border-house-brown/18 pt-5">
              <span className="font-hearth-serif italic text-[22px] leading-none text-house-gold-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2.5 mb-2 font-hearth-serif text-[20px] leading-tight text-house-brown">{step.title}</h3>
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/72">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-[clamp(28px,3vw,40px)] max-w-[64ch] text-center font-sans text-[15px] leading-[1.65] text-house-brown/70">
          Recurring care is a rhythm, not a tier. Set it weekly, fortnightly or
          seasonal; there is nothing to lock into and you can change, pause or
          stop it whenever you like. Any minimum booking values and extras are
          shown before you confirm.
        </p>
      </section>

      <ServiceCtaRow service="Home & Garden" mode="book" />

      {/* 4. House standard */}
      <HouseStandardStrip />

      {/* 5. FAQs */}
      <section className="bg-house-cream px-[5vw] py-[clamp(56px,6vw,96px)] border-b border-house-brown/10">
        <header className="mx-auto mb-[clamp(28px,3vw,44px)] max-w-[720px] text-center">
          <p className="mb-3.5 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Questions</p>
          <h2 className="font-hearth-serif text-[clamp(30px,3.6vw,50px)] leading-[1.1] text-house-brown [&_em]:italic [&_em]:text-house-gold-ink">
            Before you <em>plan.</em>
          </h2>
        </header>
        <div className="mx-auto max-w-[820px]">
          <Accordion
            items={FAQ.map((f, i) => ({
              id: `hg-faq-${i}`,
              summary: f.q,
              body: <p>{f.a}</p>,
            }))}
          />
        </div>
      </section>

      {/* Enquiry form — the phone/enquiry alternative to instant booking */}
      <div id="service-enquiry" className="scroll-mt-24">
        <EnquiryForm
          defaultService="general"
          sourcePage="/services/home-and-garden"
          eyebrow="Enquire"
          headline="Ask about a Home & Garden plan."
          body="Tell us about your home and garden and what you would like looked after. We come back to you personally, usually within one working day, or you can plan online in a couple of minutes."
        />
      </div>

      {/* 6. Final CTA */}
      <section className="relative overflow-hidden bg-house-brown px-[5vw] py-[clamp(64px,7vw,104px)] text-center">
        <FlowerWatermark color="gold" side="right" opacity={0.18} />
        <p className="relative z-10 mx-auto mb-8 max-w-[24ch] font-hearth-serif text-[clamp(26px,3.4vw,42px)] leading-[1.2] text-house-cream [&_em]:italic [&_em]:text-house-gold-light">
          <em>One conversation,</em> and the whole home is looked after.
        </p>
        <Link
          href="#open-booking-form"
          className="relative z-10 inline-flex items-center bg-house-gold-ink px-7 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110"
        >
          See times and prices
        </Link>
        <p className="relative z-10 mx-auto mt-6 max-w-[52ch] font-sans text-[14px] leading-[1.6] text-house-cream/65">
          Booking, scheduling and your Home Record are powered by HoWA, so every
          visit, note, invoice and service history stays in one place.
        </p>
      </section>
    </div>
  );
}
