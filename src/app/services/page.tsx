import Image from "next/image";
import Link from "next/link";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";

/**
 * /services — landing page, locked variant: A. Four Disciplines.
 * Spec: /ux/04-services/variant-A.html + _commercial.css.
 *
 * Order:
 *   1. Hero A (cream, centred, two CTAs)
 *   2. Four-discipline grid (white tiles, 4:5 portrait images)
 *   3. Transition band (gold line + italic label bridging House → HoWA)
 *   4. HoWA Steward Plans ladder (4 plans, House Essential featured navy)
 *   5. Brief builder band (Companion quote mock — 2-col)
 *   6. FAQ list (static Q/A, no accordion)
 *   7. Closing poem + CTA
 *   8. Italic house tagline
 */

export const metadata = {
  title: "Services",
  description:
    "Four disciplines of home care — gardening, window cleaning, cleaning, gutter cleaning — to one House standard. One-off or on a Steward plan.",
};

const SERVICES_GRID = [
  { slug: "gardening", name: "Gardeners", image: "/services/subbrands/gardeners.jpg", href: "/services/gardening" },
  { slug: "cleaning", name: "Cleaners", image: "/services/subbrands/cleaners.jpg", href: "/services/cleaning" },
  { slug: "window-cleaning", name: "Window\nCleaners", image: "/services/subbrands/window-cleaner.jpg", href: "/services/window-cleaning" },
  { slug: "handyman", name: "Handyman", image: "/services/subbrands/handyman.jpg", href: "/services/handyman" },
  { slug: "housekeeping", name: "Housekeeping", image: "/services/subbrands/housekeeping.jpg", href: "/services" },
  { slug: "removals", name: "Removals", image: "/services/subbrands/removals.jpg", href: "/services/removals" },
  { slug: "electrical", name: "Electrical", image: "/services/subbrands/electrical.jpg", href: "/services" },
  { slug: "dog-walking", name: "Dog\nWalking", image: "/services/subbrands/dog-walking.jpg", href: "/services" },
];

const PLANS = [
  {
    tier: "Apartment",
    name: "Apartment Plan",
    priceFrom: "£160",
    inclusions: [
      "Weekly cleaning",
      "Monthly windows",
      "Seasonal deep clean",
      "HoWA record & reminders",
    ],
    featured: false,
  },
  {
    tier: "Recommended",
    name: "House Essential",
    priceFrom: "£280",
    inclusions: [
      "Weekly cleaning",
      "Monthly windows",
      "Fortnightly gardening",
      "Spring + autumn gutters",
      "HoWA record & reminders",
    ],
    featured: true,
  },
  {
    tier: "Comprehensive",
    name: "House Comprehensive",
    priceFrom: "£440",
    inclusions: [
      "Everything in Essential, plus",
      "Weekly gardening in season",
      "Quarterly deep clean",
      "Priority scheduling",
    ],
    featured: false,
  },
  {
    tier: "Premium",
    name: "House Premium",
    priceFrom: "£640",
    inclusions: [
      "Everything in Comprehensive",
      "Daily availability",
      "Weekly windows",
      "Dedicated House team",
    ],
    featured: false,
  },
];

const BRIEF_STEPS = [
  {
    num: "I.",
    label: "Property",
    val: (
      <>
        Victorian terrace, SE3 ·{" "}
        <em className="italic text-howa-teal">3 bedrooms, garden</em>
      </>
    ),
  },
  {
    num: "II.",
    label: "Priorities",
    val: (
      <>
        Cleaning, gardening,{" "}
        <em className="italic text-howa-teal">gutters before winter</em>
      </>
    ),
  },
  { num: "III.", label: "Rhythm", val: <>Weekly cleaning · fortnightly garden</> },
  { num: "IV.", label: "Budget", val: <>£280 / month</> },
  {
    num: "V.",
    label: "Recommendation",
    val: (
      <em className="italic text-howa-teal">
        House Essential · starting Monday
      </em>
    ),
  },
];

const FAQ = [
  {
    q: "Can I book one-off, or only on a plan?",
    a: "Either. Plans hold a rhythm; one-offs sit alongside without a commitment.",
  },
  {
    q: "Who actually comes to the home?",
    a: "House-owned teams where we operate directly, House Approved contractors elsewhere.",
  },
  {
    q: "What writes into HoWA?",
    a: "Visits, notes, photographs on request, products used, team assigned.",
  },
  {
    q: "Do you cover my postcode?",
    a: "London + Home Counties at launch. Register interest for other regions.",
  },
];

export default async function ServicesLanding() {
  const nlBlock = await getNewsletterBlock("services");
  return (
    <>
      {/* 1. Hero A */}
      <section className="bg-house-cream text-center px-[5vw] pt-[88px] pb-10">
        <span className="block font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold mb-[18px]">
          The House · Services
        </span>
        <h1 className="em-accent mx-auto max-w-[1100px] mb-4 font-display font-medium text-[clamp(56px,7vw,104px)] leading-[1.02] tracking-[-0.01em] text-house-brown">
          The quiet standard <em>of care.</em>
        </h1>
        <p className="mx-auto max-w-[620px] mb-9 font-sans italic text-[22px] leading-[1.55] text-house-stone">
          Every discipline of home care, kept to one House standard. Book
          one-off, or let HoWA plan the rhythm.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/book-consultation"
            className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline bg-transparent text-house-brown border border-house-brown transition-all duration-[var(--t-base)] ease-out hover:bg-house-brown hover:text-house-cream"
          >
            Book one-off
          </Link>
          <Link
            href="/api/howa-bounce?source=services-hero"
            className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Start a plan
          </Link>
        </div>
      </section>

      {/* 2. Services grid (desktop) / carousel (mobile) */}
      <section className="bg-house-cream px-[5vw] pt-6 pb-20">
        {/* Desktop: 4-column grid */}
        <div className="hidden sm:grid mx-auto max-w-[1280px] grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES_GRID.map((svc) => (
            <Link
              key={svc.slug}
              href={svc.href}
              className="group relative block aspect-[3/4] overflow-hidden no-underline"
            >
              <Image
                src={svc.image}
                alt={svc.name.replace("\n", " ")}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* Dark overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5 transition-opacity duration-[var(--t-slow)] group-hover:from-black/60" />
              {/* Didot title */}
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-display font-medium text-[clamp(24px,2.5vw,34px)] leading-[1.1] text-white whitespace-pre-line tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                  {svc.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div
          className="flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-[5vw] px-[5vw]"
          style={{ scrollbarWidth: "none" }}
        >
          {SERVICES_GRID.map((svc) => (
            <Link
              key={svc.slug}
              href={svc.href}
              className="group relative flex-none w-[70vw] aspect-[3/4] snap-start overflow-hidden no-underline"
            >
              <Image
                src={svc.image}
                alt={svc.name.replace("\n", " ")}
                fill
                sizes="70vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h3 className="font-display font-medium text-[28px] leading-[1.1] text-white whitespace-pre-line tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                  {svc.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Transition band — House → HoWA */}
      <div
        className="relative text-center px-[5vw] py-[42px] border-t border-house-brown/10 border-b border-house-brown/8"
        style={{
          background:
            "linear-gradient(180deg, var(--house-cream) 0%, var(--house-white) 100%)",
        }}
      >
        <span
          aria-hidden="true"
          className="block w-[120px] h-px mx-auto mb-[14px] bg-house-gold opacity-60"
        />
        <span
          aria-hidden="true"
          className="absolute top-[34px] left-1/2 -translate-x-1/2 font-display text-house-gold text-[18px] leading-none"
        >
          ·
        </span>
        <p className="font-sans italic text-[15px] text-house-stone tracking-[0.04em]">
          Book one-off.{" "}
          <em className="not-italic font-sans text-[11px] tracking-[0.08em] uppercase text-howa-teal ml-2 pl-[10px] border-l border-house-brown/20">
            Or bundle through HoWA
          </em>
        </p>
      </div>

      {/* 4. HoWA Steward Plans ladder */}
      <section className="bg-house-white px-[5vw] pt-[72px] pb-[88px]">
        <div className="text-center mb-12">
          <span className="block mb-[14px] font-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal">
            HoWA · Steward Plans
          </span>
          <h2 className="font-sans font-normal text-[clamp(32px,3.4vw,44px)] leading-[1.12] tracking-[-0.015em] text-house-brown mb-[10px]">
            Care, on a{" "}
            <em className="italic font-light text-howa-teal">
              rhythm the home can trust.
            </em>
          </h2>
          <p className="mx-auto max-w-[620px] font-sans text-[15px] text-house-brown/70">
            Bundle the services into a plan. HoWA holds the calendar, remembers
            what&apos;s due, and sends the right hands at the right time.
          </p>
        </div>

        <div className="mx-auto max-w-[1180px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => {
            const isFeatured = p.featured;
            const isLast = i === PLANS.length - 1;
            return (
              <div
                key={p.name}
                className={
                  isFeatured
                    ? "relative z-10 bg-howa-navy text-house-cream border border-howa-navy p-7 pt-8 pb-8 flex flex-col lg:-translate-y-[10px] shadow-[0_20px_50px_rgba(30,42,58,0.15)]"
                    : `relative bg-white text-house-brown border border-house-brown/18 ${
                        isLast ? "" : "lg:border-r-0"
                      } p-7 pt-8 pb-8 flex flex-col`
                }
              >
                <span
                  className={
                    isFeatured
                      ? "font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-[10px]"
                      : "font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-[10px]"
                  }
                >
                  {p.tier}
                </span>
                <h4
                  className={`font-display font-medium text-[24px] mb-1.5 ${
                    isFeatured ? "text-house-cream" : "text-house-brown"
                  }`}
                >
                  {p.name}
                </h4>
                <div
                  className={`font-sans text-[13px] mb-4 ${
                    isFeatured ? "text-house-cream/65" : "text-house-stone"
                  }`}
                >
                  from{" "}
                  <strong
                    className={`font-medium text-[18px] ${
                      isFeatured ? "text-house-gold-light" : "text-house-brown"
                    }`}
                  >
                    {p.priceFrom}
                  </strong>{" "}
                  / month
                </div>
                <ul
                  className={`flex-1 list-none pl-[14px] text-[12.5px] leading-[1.8] ${
                    isFeatured ? "text-house-cream/85" : "text-house-brown"
                  }`}
                >
                  {p.inclusions.map((inc) => (
                    <li
                      key={inc}
                      className={`relative py-[1px] before:content-['—'] before:absolute before:-left-[14px] ${
                        isFeatured
                          ? "before:text-house-gold-light"
                          : "before:text-house-gold"
                      }`}
                    >
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-[18px]">
                  <Link
                    href="/api/howa-bounce?source=services-plan"
                    className={
                      isFeatured
                        ? "inline-block font-sans text-[11px] tracking-[0.16em] uppercase px-[18px] py-[9px] no-underline text-white bg-house-gold border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
                        : "inline-block font-sans text-[11px] tracking-[0.16em] uppercase px-[18px] py-[9px] no-underline text-house-brown border border-house-brown/50 transition-all duration-[var(--t-base)] ease-out hover:bg-house-brown hover:text-house-cream"
                    }
                  >
                    Configure →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Brief builder band — Quick Quote */}
      <section className="bg-house-white px-[5vw] pt-[72px] pb-[96px] border-t border-house-brown/8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
        <div>
          <span className="block mb-5 font-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal">
            HoWA · Quick Quote
          </span>
          <h2 className="font-sans font-normal text-[clamp(32px,3.4vw,44px)] leading-[1.12] tracking-[-0.015em] text-house-brown mb-[14px]">
            A plan shaped{" "}
            <em className="italic font-light text-howa-teal">
              around this home.
            </em>
          </h2>
          <p className="max-w-[480px] mb-[26px] font-sans text-[16px] leading-[1.65] text-house-brown/70">
            A short Companion captures the property, household, and care
            rhythm. HoWA proposes the right plan and holds the calendar.
          </p>
          <Link
            href="/api/howa-bounce?source=services-brief"
            className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Start the Companion
          </Link>
        </div>

        <div
          className="relative bg-howa-paper border border-house-brown/20 p-6"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 31px, rgba(48,35,28,0.04) 31px 32px)",
          }}
        >
          {BRIEF_STEPS.map((step, i) => (
            <div
              key={step.label}
              className={`flex gap-[14px] py-[14px] ${
                i === BRIEF_STEPS.length - 1
                  ? ""
                  : "border-b border-dashed border-house-brown/20"
              }`}
            >
              <span className="min-w-[20px] font-sans italic text-[16px] text-house-gold">
                {step.num}
              </span>
              <div>
                <div className="mb-1 font-sans text-[10px] tracking-[0.18em] uppercase text-house-stone">
                  {step.label}
                </div>
                <div className="font-sans text-[17px] leading-[1.3] text-house-brown">
                  {step.val}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-house-white px-[5vw] py-[72px] border-t border-house-brown/8">
        <div className="text-center mb-10">
          <h2 className="font-sans font-normal text-[34px] tracking-[-0.015em] text-house-brown">
            Before you book,{" "}
            <em className="italic font-light text-howa-teal">
              some questions.
            </em>
          </h2>
        </div>
        <div className="mx-auto max-w-[780px]">
          {FAQ.map((f, i) => (
            <div
              key={f.q}
              className={`flex gap-6 items-baseline py-[18px] border-t border-house-brown/12 ${
                i === FAQ.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="flex-1 font-sans text-[20px] text-house-brown">
                {f.q}
              </div>
              <div className="max-w-[260px] font-sans text-[13px] leading-[1.6] text-house-stone">
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Closing poem + CTA */}
      <section className="bg-house-cream px-[5vw] py-[88px] text-center border-t border-house-brown/8">
        <p className="mx-auto max-w-[640px] mb-7 font-display italic text-[24px] leading-[1.3] text-house-brown">
          A well-kept home isn&apos;t a pile of bookings.{" "}
          <em className="italic text-house-stone">
            It&apos;s a rhythm someone else remembers.
          </em>
        </p>
        <Link
          href="/api/howa-bounce?source=services-closing"
          className="inline-block px-[30px] py-[15px] font-sans text-[13px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Start your plan
        </Link>
      </section>

      {/* 8. Newsletter */}
      <NewsletterInline variant={nlBlock?.variant ?? "cream"} sourcePage="/services" {...(nlBlock ?? {})} />

      {/* 9. Italic tagline */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-sans italic text-[14px] text-house-stone tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </>
  );
}
