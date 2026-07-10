import Image from "next/image";
import Link from "next/link";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";

/**
 * Homepage — House of HoWA (launch read section 4).
 *
 * Leads with HoWA Score as the product moment, then the Home Record, the
 * Household, and services as proof rails. Willow Alexander appears only as the
 * founding partner family. Design system (cream ground, Didot display, gold
 * ink) is unchanged.
 */

export const metadata = {
  title: { absolute: "House of HoWA | The home, finally known" },
  description:
    "House of HoWA is the institution behind HoWA, the Home Operating System that gives every home a living record, a HoWA Score and practical next actions.",
};

const SCORE_REFLECTS = [
  "Record completeness",
  "Maintenance rhythm",
  "Evidence strength",
  "Risk readiness",
  "Efficiency and utilities",
  "Future stewardship",
];

const HOUSEHOLD = [
  { role: "The Gardener", line: "reads gardens, seasons and planting." },
  { role: "The Handyman", line: "helps you understand the fix before you book it." },
  { role: "The Designer", line: "turns one photo into a direction." },
  { role: "The Surveyor", line: "turns worry into a clear next step." },
  { role: "The Archivist", line: "turns documents into dates, reminders and evidence." },
  { role: "The Housekeeper", line: "keeps the everyday home in order." },
  { role: "The Steward", line: "protects the home before failure." },
];

const FLOW = ["Booked", "Delivered", "Remembered", "Home Record", "HoWA Score"];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-gold-ink hover:text-house-gold-ink";

export default async function HomePage() {
  const hearthArticles = await getLatestHearthArticles(3).catch(() => []);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* 1. Hero — full width, text left, image right */}
      <section className="relative grid lg:grid-cols-2 border-b border-house-brown/8">
        <div className="relative flex flex-col justify-center px-[5vw] py-20 lg:py-24 lg:pr-14">
          <FlowerWatermark color="gold" side="left" opacity={0.1} />
          <div className="relative z-10">
            <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">
              House of HoWA
            </p>
            <h1 className="font-display text-[clamp(42px,5.4vw,80px)] leading-[1.0] tracking-[-0.015em] text-house-black max-w-[13ch]">
              The home, <em className="italic">finally known.</em>
            </h1>
            <p className="font-display italic text-[clamp(19px,2.1vw,28px)] leading-[1.35] text-house-brown/85 mt-6 max-w-[30ch]">
              Your house is trying to tell you something. House of HoWA is where
              it is heard.
            </p>
            <p className="font-sans text-[17px] leading-[1.65] text-house-brown/80 mt-5 max-w-[48ch]">
              Start with your address. HoWA builds the first portrait of your
              home, gives it a living Score, and turns what it finds into clear
              next actions: save this, check that, book the right help, protect
              what matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/howa/assistant" className={ctaPrimary}>
                Start with my address
              </Link>
              <Link href="/howa-score" className={ctaSecondary}>
                Meet the HoWA Score
              </Link>
            </div>
            <p className="font-sans text-[13px] tracking-[0.02em] text-house-stone mt-6">
              The House sets the standard. HoWA remembers the home.
            </p>
          </div>
        </div>
        <div className="relative min-h-[54vh] lg:min-h-[84vh] bg-house-cream-dark">
          <Image
            src="/howa/features.webp"
            alt="House of HoWA: the home, finally known"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* 2. The Score is the first thing you understand */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1000px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
            The HoWA Score
          </p>
          <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-black max-w-[20ch] mb-6">
            The Score is the first thing you understand.
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[62ch]">
            A home can be valuable and still be unmanaged. Documents sit in
            drawers. Services disappear into invoices. Repairs live in WhatsApp
            threads. Small risks wait quietly until they cost money. HoWA gives
            the home one clear measure of readiness: a living Score that improves
            as the home becomes more known.
          </p>
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 mt-8 max-w-[640px]">
            {SCORE_REFLECTS.map((r) => (
              <li
                key={r}
                className="font-sans text-[16px] text-house-brown/85 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold-ink"
              >
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <Link href="/howa-score" className={ctaSecondary}>
              See how the Score works →
            </Link>
          </div>
        </div>
      </section>

      {/* Score dashboard visual */}
      <section className="px-[5vw] py-12 max-w-[1080px] mx-auto">
        <div className="relative aspect-[16/9] overflow-hidden bg-house-cream-dark border border-house-brown/10">
          <Image
            src="/howa/score-dashboard.webp"
            alt="A HoWA Score dashboard: one living number for a home well kept"
            fill
            sizes="(min-width:1024px) 1020px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* 3. One address. One record. */}
      <section className="px-[5vw] py-20 max-w-[820px] mx-auto text-center">
        <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.1] text-house-black mb-6">
          One address. One record. <em className="italic">A home that remembers.</em>
        </h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/80">
          The Home Record is the living memory of the address. Rooms, assets,
          documents, jobs, costs, photographs, warranties, visits, plans and
          concerns all return to one place. The record belongs to the home, not
          to one person&apos;s inbox.
        </p>
      </section>

      {/* 4. Meet the Household */}
      <section className="px-[5vw] py-16 bg-house-brown text-house-cream">
        <div className="max-w-[1000px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-light mb-4">
            The Household
          </p>
          <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-cream max-w-[18ch] mb-6">
            Meet the <em className="italic">Household.</em>
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-cream/80 max-w-[62ch] mb-9">
            Most people don&apos;t arrive looking for a Home Operating System.
            They arrive with a garden, a crack, a quote, a room, a document, a
            leak, a repair or a service they need to book. Start with the
            specialist you need today, free.
          </p>
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 mb-10">
            {HOUSEHOLD.map((h) => (
              <li key={h.role} className="font-sans text-[16px] leading-[1.5] text-house-cream/85">
                <span className="text-house-gold-light">{h.role}</span> {h.line}
              </li>
            ))}
          </ul>
          <Link
            href="/household"
            className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline hover:brightness-110 transition-[filter]"
          >
            Meet the Household →
          </Link>
        </div>
      </section>

      {/* Meet the Household visual */}
      <section className="px-[5vw] py-12 max-w-[1200px] mx-auto">
        <div className="relative aspect-[16/9] overflow-hidden bg-house-cream-dark">
          <Image
            src="/howa/homepage-household.webp"
            alt="Meet the Household: seven ways into one home record"
            fill
            sizes="(min-width:1024px) 1140px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* 5. Services are proof, not the pitch */}
      <section className="px-[5vw] py-20 max-w-[1000px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
          Services
        </p>
        <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-black max-w-[22ch] mb-5">
          The House does the work. <em className="italic">HoWA remembers it.</em>
        </h2>
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[62ch] mb-10">
          Gardens, windows, cleaning, gutters, design, repairs and approved
          partner services become more valuable when the outcome is saved to the
          Home Record. A visit is not just booked and delivered. It is
          remembered.
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-10">
          {FLOW.map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="font-sans text-[13px] tracking-[0.12em] uppercase text-house-brown/80 border border-house-brown/15 px-3 py-1.5">
                {step}
              </span>
              {i < FLOW.length - 1 ? (
                <span aria-hidden className="text-house-gold-ink">→</span>
              ) : null}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { n: "Gardening", h: "/services/gardening", i: "/services/photos/gardening-hero.webp" },
            { n: "Window cleaning", h: "/services/window-cleaning", i: "/services/photos/window-cleaning-hero.webp" },
            { n: "Cleaning", h: "/services/cleaning", i: "/services/photos/cleaning-hero.webp" },
            { n: "Gutter cleaning", h: "/services/gutter-cleaning", i: "/services/photos/gutter-cleaning-hero.webp" },
          ].map((sv) => (
            <Link
              key={sv.n}
              href={sv.h}
              className="group relative block aspect-[4/5] overflow-hidden bg-house-cream-dark no-underline"
            >
              <Image
                src={sv.i}
                alt={sv.n}
                fill
                sizes="(min-width:768px) 22vw, 50vw"
                className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(26,19,13,0.72), rgba(26,19,13,0.05) 55%)" }}
              />
              <span className="absolute inset-x-0 bottom-0 p-3 font-display text-[18px] leading-tight text-white">
                {sv.n}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="#open-booking-form" className={ctaPrimary}>
            Book through HoWA
          </a>
          <Link href="/services" className={ctaSecondary}>
            See all services →
          </Link>
        </div>
      </section>

      {/* 6. What happens in the first minute */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[820px] mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,3.2vw,42px)] leading-[1.1] text-house-black mb-5">
            What happens in the first minute
          </h2>
          <p className="font-sans text-[18px] leading-[1.7] text-house-brown/80 mb-4">
            Type your address. HoWA introduces your home back to you: public
            property facts where available, a first Home Portrait, a provisional
            HoWA Score and one useful next action.
          </p>
          <p className="font-display italic text-[20px] text-house-brown/85 mb-8">
            No forms. No drawer hunt. No starting from zero.
          </p>
          <Link href="/howa/assistant" className={ctaPrimary}>
            Start free
          </Link>
        </div>
      </section>

      {/* From the Hearth — editorial teaser */}
      {hearthArticles.length > 0 ? (
        <section className="px-[5vw] py-16 max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-2">
                The Hearth
              </p>
              <h2 className="font-display italic text-[clamp(24px,2.8vw,36px)] text-house-black">
                Notes for a home that remembers.
              </h2>
            </div>
            <Link href="/the-hearth" className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink no-underline hidden sm:block">
              Read the Hearth →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {hearthArticles.slice(0, 3).map((a) => (
              <Link key={a.slug} href={`/the-hearth/${a.slug}`} className="group block no-underline">
                <div className="relative aspect-[4/3] overflow-hidden bg-house-cream-dark mb-4">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-display text-[22px] leading-[1.15] text-house-black group-hover:text-house-gold-ink transition-colors">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Speak to the House — lead capture into the Home Record */}
      <EnquiryForm
        sourcePage="/"
        eyebrow="Speak to the House"
        headline="Tell us what the home needs."
        body="A service, a design brief, a partner conversation or a question about HoWA. Choose a service below, or leave it as a general enquiry. We reply personally."
      />
    </div>
  );
}
