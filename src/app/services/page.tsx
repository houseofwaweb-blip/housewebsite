import Image from "next/image";
import Link from "next/link";
import s from "./services.module.css";
import { FaqList } from "@/components/marketing/FaqList";

/**
 * /services — landing page in the lander framework.
 *
 * Per CLAUDE.md launch decisions: 4 services only — Gardening, Window
 * Cleaning, Cleaning, Gutter Cleaning. Handyman / Removals / Energy /
 * Pet care all deferred.
 *
 * Section order:
 *   1. Hero — image right, copy left (cream)
 *   2. Stats strip
 *   3. Four service cards
 *   4. Steward Plans ladder — 4 plans, House Essential featured
 *   5. Brief builder — Companion mock
 *   6. FAQ
 *   7. Closing
 */

export const metadata = {
  title: "Services — The quiet standard of care.",
  description:
    "Four disciplines of home care — gardening, window cleaning, cleaning, gutter cleaning — to one House standard. One-off or on a Steward plan.",
};

const STAT_COLS = [
  { value: "4", label: "Disciplines at launch" },
  { value: "17", label: "House standards" },
  { value: "1", label: "Calendar to trust" },
  { value: "0", label: "Sub-contracted finish" },
];

const SERVICES = [
  {
    slug: "gardening",
    name: "Gardening",
    tagline: "Lawn, beds, and seasonal care.",
    body:
      "Routine cuts, hedge work, planting plans and seasonal tidies — by gardeners who know the difference between cutting back and cutting down.",
    image: "/services/subbrands/gardeners.webp",
    href: "/services/gardening",
    state: "live" as const,
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    tagline: "Spotless glass, frames, and sills.",
    body:
      "Pure-water reach-and-wash on the outside, traditional cloth on the inside, with a sash-window method that respects the original timber.",
    image: "/services/subbrands/window-cleaner.webp",
    href: "/services/window-cleaning",
    state: "live" as const,
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    tagline: "Domestic cleaning, properly briefed.",
    body:
      "A regular team that learns the home — surfaces, finishes, what to use, what to leave. Same hands twice. Filed to your record after every visit.",
    image: "/services/subbrands/cleaners.webp",
    href: "/services/cleaning",
    state: "live" as const,
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    tagline: "Pre-winter clears and downpipe checks.",
    body:
      "Reach-and-vac from the ground for safety, with a borescope check on the downpipes and a flagged works list if anything else needs doing.",
    image: "/services/subbrands/gutter-cleaning.webp",
    href: "/services/gutter-cleaning",
    state: "live" as const,
  },
  {
    slug: "handyman",
    name: "Handyman",
    tagline: "Small jobs, properly done.",
    body:
      "A trusted set of hands for the long list. Shelves, fixes, draught-proofing, tile replacements, the things that bother you.",
    image: "/services/subbrands/handyman.webp",
    href: "/services/handyman",
    state: "soon" as const,
  },
  {
    slug: "housekeeping",
    name: "Housekeeping",
    tagline: "A discreet, ongoing presence.",
    body:
      "Daily or weekly housekeeping — laundry, linen, kitchen, light cooking — for households that prefer the home kept beautifully without managing it.",
    image: "/services/subbrands/housekeeping.webp",
    href: "/services/housekeeping",
    state: "soon" as const,
  },
  {
    slug: "removals",
    name: "Removals",
    tagline: "Moves, briefed by the record.",
    body:
      "House-owned moves with packers who handle period interiors with care. The Living Record makes the unpack at the other end clean and quick.",
    image: "/services/subbrands/removals.webp",
    href: "/services/removals",
    state: "soon" as const,
  },
  {
    slug: "energy",
    name: "Energy & Electrical",
    tagline: "EICRs, EV chargers, retrofit advice.",
    body:
      "Vetted electricians, EICRs filed to your HoWA record, and energy-efficiency planning so the home performs as well as it looks.",
    image: "/services/subbrands/electrical.webp",
    href: "/services/energy",
    state: "soon" as const,
  },
  {
    slug: "pet-care",
    name: "Pet Care",
    tagline: "Dog walking, sitting and check-ins.",
    body:
      "House-approved walkers and sitters who know the door codes, the leash habits, and the after-walk routine.",
    image: "/services/subbrands/dog-walking.webp",
    href: "/services/pet-care",
    state: "soon" as const,
  },
];

const PLANS = [
  {
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

const BRIEF_LINES = [
  { num: "I.", label: "Property", value: "Victorian terrace, SE3 · 3 bedrooms, garden" },
  { num: "II.", label: "Priorities", value: "Cleaning, gardening, gutters before winter" },
  { num: "III.", label: "Rhythm", value: "Weekly cleaning · fortnightly garden" },
  { num: "IV.", label: "Budget", value: "£280 / month" },
  { num: "V.", label: "Recommendation", value: "House Essential · starting Monday", highlight: true },
];

const FAQ = [
  {
    q: "Can I book one-off, or only on a plan?",
    a: "Either. Plans hold a rhythm; one-offs sit alongside without a commitment.",
  },
  {
    q: "Who actually comes to the home?",
    a: "House-owned teams where we operate directly, House Approved contractors elsewhere — same standards either way.",
  },
  {
    q: "What writes into HoWA?",
    a: "Visits, notes, photographs on request, products used, team assigned. Filed to the home record automatically.",
  },
  {
    q: "Do you cover my postcode?",
    a: "London + Home Counties at launch. Register interest for other regions.",
  },
];

export default function ServicesLanding() {
  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>The House · Services</p>
            <h1 className={s.heroTitle}>
              The quiet standard <em>of care.</em>
            </h1>
            <p className={s.heroLede}>
              Every discipline of home care, kept to one House standard.
              Book one-off, or let HoWA hold the rhythm of the year.
            </p>
            <div className={s.heroCtas}>
              <Link href="#open-booking-form" className={s.btnFilled}>
                Book one-off
              </Link>
              <Link href="#plans" className={s.btnGhost}>
                Start a plan
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src="/home-v4/plus-benefit-1.png"
            alt="A hand cleaning a sash window in golden-hour light, with a plant on the sill inside"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>Same standard. Same hands twice.</p>
          <p className={s.statsLedeLine2}>Held in your record, surfaced when it matters.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Service carousel — all subbrands, live + coming-soon */}
      <section className={s.services}>
        <header className={s.servicesHead}>
          <p className={s.servicesEy}>The Sub-Brands</p>
          <h2 className={s.servicesTitle}>
            The hands that <em>look after the home.</em>
          </h2>
          <p className={s.servicesLede}>
            Nine disciplines, one House standard. Four live at launch — the
            rest opening through 2026 as we onboard partners we trust.
          </p>
        </header>
        <div className={s.servicesCarousel}>
          {SERVICES.map((svc) => (
            <Link
              key={svc.slug}
              href={svc.href}
              className={`${s.serviceCard} ${svc.state === "soon" ? s.serviceCardSoon : ""}`}
              data-state={svc.state}
            >
              <div className={s.serviceImage}>
                <Image
                  src={svc.image}
                  alt={svc.name}
                  width={780}
                  height={975}
                  sizes="(min-width: 1024px) 320px, 80vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span className={s.serviceState}>
                  {svc.state === "live" ? "Available now" : "Coming soon"}
                </span>
              </div>
              <div className={s.serviceBody}>
                <h3 className={s.serviceName}>{svc.name}</h3>
                <p className={s.serviceTagline}>{svc.tagline}</p>
                <p className={s.serviceText}>{svc.body}</p>
                <span className={s.serviceCta}>
                  {svc.state === "live" ? `See ${svc.name.toLowerCase()} →` : "Register interest →"}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className={s.servicesFootnote}>
          Scroll for more — handyman, housekeeping, removals, energy and
          pet care all opening in 2026.
        </p>
      </section>

      {/* 4. Steward Plans ladder */}
      <section id="plans" className={s.plans}>
        <header className={s.plansHead}>
          <p className={s.plansEy}>
            HoWA Steward · <span className={s.plansEyHighlight}>Available with Steward only</span>
          </p>
          <h2 className={s.plansTitle}>
            Care, on a rhythm <em>the home can trust.</em>
          </h2>
          <p className={s.plansLede}>
            Steward Plans bundle the services into a recurring rhythm. HoWA
            holds the calendar, remembers what's due, and sends the right hands
            at the right time. <strong>Open to HoWA Steward customers only —</strong>{" "}
            <Link href="/howa/steward" className={s.plansLink}>
              learn about Steward →
            </Link>
          </p>
        </header>
        <div className={s.plansGrid}>
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={`${s.planCard} ${p.featured ? s.planCardFeatured : ""}`}
            >
              {p.featured ? (
                <span className={s.planRibbon}>Recommended</span>
              ) : null}
              <h3 className={s.planName}>{p.name}</h3>
              <div className={s.planPrice}>
                <span className={s.planPriceFrom}>From</span>
                <span className={s.planPriceAmount}>{p.priceFrom}</span>
                <span className={s.planPriceUnit}>/ month</span>
              </div>
              <ul className={s.planList}>
                {p.inclusions.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
              <Link
                href="/howa/steward"
                className={p.featured ? s.btnFilled : s.btnGhostDark}
              >
                Open with Steward →
              </Link>
            </article>
          ))}
        </div>
        <p className={s.plansFootnote}>
          Plans require an active Steward subscription. Adjust the rhythm any
          month from your HoWA dashboard. Not yet a Steward customer?{" "}
          <Link href="/howa/steward" className={s.plansLink}>
            Read about Steward
          </Link>
          .
        </p>
      </section>

      {/* 5. Brief builder */}
      <section className={s.brief}>
        <div className={s.briefCopy}>
          <p className={s.briefEy}>The Companion · in two minutes</p>
          <h2 className={s.briefTitle}>
            Tell us about the home. <em>HoWA proposes the plan.</em>
          </h2>
          <p className={s.briefLede}>
            A short conversation and the Companion sketches a plan that fits
            the home, the rhythm, and the budget. Adjust before booking, or
            book straight in.
          </p>
          <Link href="/howa/companion" className={s.btnFilled}>
            Try the Companion
          </Link>
        </div>
        <div className={s.briefMock}>
          <p className={s.briefMockTitle}>A worked example</p>
          <ul className={s.briefMockList}>
            {BRIEF_LINES.map((line) => (
              <li
                key={line.num}
                className={`${s.briefMockLine} ${line.highlight ? s.briefMockHighlight : ""}`}
              >
                <span className={s.briefMockNum}>{line.num}</span>
                <span className={s.briefMockLabel}>{line.label}</span>
                <span className={s.briefMockValue}>{line.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className={s.faqSection}>
        <div className={s.faqInner}>
          <header className={s.faqHead}>
            <p className={s.faqEy}>Questions</p>
            <h2 className={s.faqTitle}>
              What people <em>usually</em> ask.
            </h2>
          </header>
          <FaqList items={FAQ} />
        </div>
      </section>

      {/* 7. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>The quiet discipline of looking after a place.</p>
        <p className={s.closingStatement}>
          <em>Booked, briefed, and remembered.</em>
        </p>
        <div className={s.closingCtas}>
          <Link href="#open-booking-form" className={s.closingBtnFilled}>
            Book a service
          </Link>
          <Link href="/howa" className={s.closingBtnGhost}>
            See HoWA →
          </Link>
        </div>
      </section>
    </div>
  );
}
