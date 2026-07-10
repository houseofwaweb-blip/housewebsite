import Image from "next/image";
import Link from "next/link";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { HowaHeroDemo } from "@/components/marketing/HowaHeroDemo";
import { HouseholdDoors } from "@/components/marketing/HouseholdDoors";

/**
 * Homepage — House of HoWA.
 *
 * Applies the Homepage Copy & Structure amend: the House is the brand, service,
 * partner and editorial layer (not an "institution"); HoWA is the operating
 * system that remembers the work. Order: Hero → Founding service family →
 * Booked. Delivered. Remembered. → HoWA Score → Home Record → Household →
 * Housekeeper & Steward → House Approved → The Hearth → Final CTA.
 */

export const metadata = {
  title: { absolute: "House of HoWA | A new House for home stewardship" },
  description:
    "House of HoWA brings together trusted home services, approved partners and the HoWA Home Operating System, so every home can be cared for, recorded and remembered.",
};

const SERVICE_FAMILY = [
  { name: "Willow Alexander Gardeners", line: "Garden maintenance, seasonal care and outdoor rhythm.", href: "/services/gardening", img: "/services/subbrands/gardeners.webp" },
  { name: "Willow Alexander Gardens", line: "Garden design, planting, landscaping and outdoor transformation.", href: "/design/gardens", img: "/design/gardens/full-design.webp" },
  { name: "Willow Alexander Cleaners", line: "Considered cleaning for homes that need regular care.", href: "/services/cleaning", img: "/services/subbrands/cleaners.webp" },
  { name: "Willow Alexander Window Cleaners", line: "Reliable window care, recorded as part of the home's maintenance rhythm.", href: "/services/window-cleaning", img: "/services/subbrands/window-cleaner.webp" },
  { name: "Willow Alexander Handyman", line: "Repairs, fixes, small works and practical help around the home.", href: "/services/handyman", img: "/services/subbrands/handyman.webp" },
  { name: "Willow Alexander Removals", line: "Careful moving, preparation, handover and home transition support.", href: "/services/removals", img: "/services/subbrands/removals.webp" },
];

const REMEMBERED = [
  "A garden visit can become seasonal notes and a next-care reminder.",
  "A window clean can become part of the maintenance rhythm.",
  "A handyman repair can become proof, cost history and a warranty note.",
  "A move can become a home handover record.",
  "A design brief can become project memory.",
];

const FLOW = ["Booked", "Delivered", "Remembered", "Home Record", "HoWA Score"];

const SCORE_REFLECTS = [
  "Record completeness",
  "Maintenance rhythm",
  "Evidence strength",
  "Risk readiness",
  "Efficiency and utilities",
  "Future stewardship",
];

const APPROVED_BENEFITS = [
  "Be discovered by homeowners through HoWA",
  "Receive jobs with better context",
  "Work under a trusted House standard",
  "Build proof through completed work",
  "Contribute to the customer's Home Record",
  "Grow with a platform, not a directory",
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-gold-ink hover:text-house-gold-ink";

export default async function HomePage() {
  const hearthArticles = await getLatestHearthArticles(3).catch(() => []);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* 1. Hero — full width, text left, phone demo right */}
      <section className="relative grid lg:grid-cols-2 border-b border-house-brown/8">
        <div className="relative flex flex-col justify-center px-[5vw] py-20 lg:py-24 lg:pr-14">
          <FlowerWatermark color="gold" side="left" opacity={0.1} />
          <div className="relative z-10">
            <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">
              House of HoWA
            </p>
            <h1 className="font-display text-[clamp(40px,5vw,74px)] leading-[1.02] tracking-[-0.015em] text-house-black max-w-[15ch]">
              A new House for <em className="italic">home stewardship.</em>
            </h1>
            <p className="font-sans text-[17px] leading-[1.65] text-house-brown/80 mt-6 max-w-[50ch]">
              Trusted services, approved partners and the HoWA Home Operating
              System, working together so every home can be cared for, recorded
              and remembered.
            </p>
            <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 mt-4 max-w-[50ch]">
              Book a garden visit. Clean the windows. Repair the thing that has
              been waiting. Start a design brief. However you enter, the work is
              saved into one Home Record and reflected in your HoWA Score.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#open-booking-form" className={ctaPrimary}>
                Book through HoWA
              </a>
              <Link href="/howa/assistant" className={ctaSecondary}>
                Start with your address
              </Link>
            </div>
            <p className="font-sans text-[13px] tracking-[0.02em] text-house-stone mt-6">
              The House sets the standard. HoWA remembers the home.
            </p>
          </div>
        </div>
        <HowaHeroDemo />
      </section>

      {/* 2. Founding service family */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-b border-house-brown/8">
        <div className="max-w-[1300px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
            The founding service family
          </p>
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-black max-w-[22ch] mb-5">
            Willow Alexander began with real work in real homes.
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[64ch] mb-10">
            The Willow Alexander service family becomes the founding proof network
            of House of HoWA: the first teams working through the House standard
            and into the HoWA Home Record. Over time, approved professionals and
            partner brands will sit alongside them.
          </p>
          <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_FAMILY.map((s) => (
              <Link key={s.name} href={s.href} className="group block no-underline">
                <div className="relative aspect-[4/5] overflow-hidden bg-house-cream border border-house-brown/10">
                  <Image
                    src={s.img}
                    alt={s.name}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="font-display text-[20px] leading-[1.2] text-house-black group-hover:text-house-gold-ink transition-colors mt-4">
                  {s.name}
                </h3>
                <p className="font-sans text-[14px] leading-[1.55] text-house-brown/70 mt-1.5 max-w-[36ch]">
                  {s.line}
                </p>
                <span className="inline-block font-sans text-[12px] tracking-[0.14em] uppercase text-house-gold-ink mt-3">
                  View →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/services" className={ctaPrimary}>
              Explore services
            </Link>
            <a href="#open-booking-form" className={ctaSecondary}>
              Book through HoWA
            </a>
          </div>
        </div>
      </section>

      {/* 3. Booked. Delivered. Remembered. */}
      <section className="px-[5vw] py-20 max-w-[1000px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
          Service, up into HoWA
        </p>
        <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-black max-w-[22ch] mb-5">
          Booked. Delivered. <em className="italic">Remembered.</em>
        </h2>
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[62ch] mb-9">
          Most home services end when the job is done. House of HoWA is built so
          the job becomes part of the home. Every service becomes more valuable
          when it is remembered.
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-10">
          {FLOW.map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="font-sans text-[13px] tracking-[0.12em] uppercase text-house-brown/80 border border-house-brown/15 px-3 py-1.5">
                {step}
              </span>
              {i < FLOW.length - 1 ? <span aria-hidden className="text-house-gold-ink">→</span> : null}
            </span>
          ))}
        </div>
        <ul className="grid gap-y-3 sm:grid-cols-2 gap-x-10 mb-10">
          {REMEMBERED.map((r) => (
            <li key={r} className="font-sans text-[16px] leading-[1.55] text-house-brown/85 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold-ink">
              {r}
            </li>
          ))}
        </ul>
        <p className="font-display italic text-[20px] leading-[1.4] text-house-brown/85 mb-8 max-w-[40ch]">
          The work is real. The people are real. HoWA keeps the record.
        </p>
        <a href="#open-booking-form" className={ctaPrimary}>
          Book through HoWA
        </a>
      </section>

      {/* 4. The HoWA Score */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1300px] mx-auto grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
              The HoWA Score
            </p>
            <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-black max-w-[20ch] mb-6">
              The Score shows how well your home is being held.
            </h2>
            <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[54ch]">
              A home can be valuable and still be unmanaged. Documents sit in
              drawers. Services disappear into invoices. Repairs live in WhatsApp
              threads. Small risks wait quietly until they cost money. The HoWA
              Score gives the home one clear measure of readiness: a living Score
              that improves as the home becomes more known.
            </p>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 mt-8">
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
                Meet the HoWA Score →
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-house-cream border border-house-brown/12">
            <Image
              src="/howa/score-dashboard.webp"
              alt="A HoWA Score dashboard: one living number for a home well kept, with what matters first"
              fill
              sizes="(min-width:1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. One address. One record. */}
      <section className="px-[5vw] py-20 max-w-[820px] mx-auto text-center">
        <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.1] text-house-black mb-6">
          One address. One record. <em className="italic">A home that remembers.</em>
        </h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/80">
          The Home Record is the living memory of the address. Rooms, assets,
          documents, jobs, costs, photographs, warranties, visits, plans and
          concerns all return to one place. The record belongs to the home, not
          to one person&apos;s inbox. Every useful action should leave the home
          clearer than it was before.
        </p>
        <div className="mt-8">
          <Link href="/howa/assistant" className={ctaPrimary}>
            Start with your address
          </Link>
        </div>
      </section>

      {/* 6. Meet the Household — cutaway-house cards */}
      <section className="howa-surface px-[5vw] py-16 max-w-[1360px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
          The Household
        </p>
        <h2 className="font-display text-[clamp(30px,4vw,54px)] leading-[1.05] text-house-black max-w-[18ch] mb-5">
          Meet the Household.
        </h2>
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[68ch] mb-3">
          Nobody wakes up wanting a home intelligence layer. People wake up with
          a garden that needs reading, a tap that is dripping, a room they want
          to redesign, a quote they do not trust or a drawer full of documents
          they keep meaning to sort. So HoWA meets people through the Household.
        </p>
        <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[68ch] mb-10">
          The first doors are free because they solve real household moments. The
          Housekeeper and Steward are the two you employ when the home needs
          continuity.
        </p>
        <HouseholdDoors />
        <div className="mt-10">
          <Link href="/household" className={ctaSecondary}>
            Meet the whole Household →
          </Link>
        </div>
      </section>

      {/* 7. Housekeeper & Steward — two depths of care */}
      <section className="px-[5vw] py-20 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
          Housekeeper and Steward
        </p>
        <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-black max-w-[20ch] mb-10">
          The two depths of care.
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="border-t border-house-brown/15 pt-6">
            <h3 className="font-display text-[26px] leading-[1.15] text-house-black mb-3">
              The Housekeeper keeps the home in order.
            </h3>
            <p className="font-sans text-[16px] leading-[1.65] text-house-brown/78">
              For the household that wants everything kept in rhythm: documents
              filed, tasks remembered, costs stored, seasonal work planned and the
              monthly picture made clear.
            </p>
          </div>
          <div className="border-t border-house-brown/15 pt-6">
            <h3 className="font-display text-[26px] leading-[1.15] text-house-black mb-3">
              The Steward watches the whole home.
            </h3>
            <p className="font-sans text-[16px] leading-[1.65] text-house-brown/78">
              For the homeowner who wants the long view: risk, evidence,
              approvals, annual reporting, smart-home instruments and protection
              before failure.
            </p>
          </div>
        </div>
        <p className="font-display italic text-[19px] leading-[1.45] text-house-brown/85 mt-9 max-w-[60ch]">
          Assistant helps you see. Housekeeper helps you stay ahead. Steward
          protects before failure.
        </p>
        <div className="mt-7">
          <Link href="/howa/plans" className={ctaSecondary}>
            See memberships →
          </Link>
        </div>
      </section>

      {/* 8. House Approved — partner recruitment */}
      <section className="px-[5vw] py-16 bg-house-black text-house-cream border-t border-house-brown/20">
        <div className="max-w-[1100px] mx-auto grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-light mb-4">
              For trusted professionals
            </p>
            <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-cream max-w-[16ch] mb-5">
              Become House Approved.
            </h2>
            <p className="font-sans text-[16px] leading-[1.7] text-house-cream/80 max-w-[56ch] mb-4">
              House of HoWA is building a trusted network of service providers,
              contractors, designers, specialists and partner brands who want to
              work inside a higher standard of home care.
            </p>
            <p className="font-sans text-[15px] leading-[1.65] text-house-cream/70 max-w-[56ch]">
              This is not a lead-gen directory. It is a standard, a service layer
              and a platform relationship.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/partners"
                className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-black bg-house-gold-light border border-house-gold-light px-6 py-3 no-underline transition-[filter] hover:brightness-105"
              >
                Apply to become House Approved
              </Link>
              <Link
                href="/partners"
                className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-light hover:text-house-gold-light"
              >
                Partner with the House
              </Link>
            </div>
          </div>
          <ul className="grid gap-3">
            {APPROVED_BENEFITS.map((b) => (
              <li key={b} className="font-sans text-[15px] leading-[1.5] text-house-cream/85 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold-light">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. From the Hearth — editorial teaser */}
      {hearthArticles.length > 0 ? (
        <section className="px-[5vw] py-16 max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-2">
                The Hearth
              </p>
              <h2 className="font-display italic text-[clamp(24px,2.8vw,36px)] text-house-black">
                Editorial that helps the home move.
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

      {/* 10. Final CTA — start where your home needs you */}
      <section className="px-[5vw] py-20 bg-house-cream-dark border-t border-house-brown/8 text-center">
        <div className="max-w-[760px] mx-auto">
          <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.1] text-house-black mb-6">
            Start where your home needs you.
          </h2>
          <p className="font-sans text-[18px] leading-[1.7] text-house-brown/80 mb-8">
            Book a service. Start with your address. Meet the Household. Apply to
            become House Approved. However you enter, the aim is the same: your
            home becomes easier to understand, easier to care for and harder to
            forget.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#open-booking-form" className={ctaPrimary}>
              Book through HoWA
            </a>
            <Link href="/howa/assistant" className={ctaSecondary}>
              Start with your address
            </Link>
          </div>
        </div>
      </section>

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
