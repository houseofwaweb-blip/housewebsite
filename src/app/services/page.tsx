import Image from "next/image";
import Link from "next/link";
import s from "./services.module.css";
import { FaqList } from "@/components/marketing/FaqList";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";
import { ServiceCarousel } from "./ServiceCarousel";
import fs from "node:fs";
import path from "node:path";

// Services without their own photography fall back to the "Coming Soon"
// placeholder, with a "Service Coming Soon" label over it.
const COMING_SOON = "/services/service-placeholder.webp";
function imgOr(p?: string): string {
  if (!p || p.startsWith("http")) return p || COMING_SOON;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", p.replace(/^\//, ""))) ? p : COMING_SOON;
  } catch {
    return COMING_SOON;
  }
}

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
 *   5. Brief builder — Assistant mock
 *   6. FAQ
 *   7. Closing
 */

export const metadata = {
  title: "Home and garden services",
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
      "Moves briefed by your record, with packers who handle period interiors with care. The Living Record makes the unpack at the other end clean and quick.",
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

export default async function ServicesLanding() {
  const sections = await getPageSections("services");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const servicesHead = sections.get("services");
  const plansHead = sections.get("plans");
  const brief = sections.get("brief");
  const faqHead = sections.get("faq");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const serviceCards = cmsCards(servicesHead, SERVICES, (c, base) => ({
    slug: base?.slug ?? "",
    name: pick(c.title, base?.name ?? ""),
    tagline: pick(c.label, base?.tagline ?? ""),
    body: pick(c.body, base?.body ?? ""),
    image: pick(c.imageUrl, base?.image ?? ""),
    href: pick(c.ctaHref, base?.href ?? "#"),
    state: base?.state ?? ("live" as const),
  }));
  const planCards = cmsCards(plansHead, PLANS, (c, base) => ({
    name: pick(c.title, base?.name ?? ""),
    priceFrom: pick(c.value, base?.priceFrom ?? ""),
    inclusions: c.items && c.items.length ? c.items : base?.inclusions ?? [],
    featured: base?.featured ?? false,
  }));
  const briefLines = cmsCards(brief, BRIEF_LINES, (c, base) => ({
    num: pick(c.label, base?.num ?? ""),
    label: pick(c.title, base?.label ?? ""),
    value: pick(c.body ?? c.value, base?.value ?? ""),
    highlight: base?.highlight ?? false,
  }));
  const faqItems = cmsCards(faqHead, FAQ, (c, base) => ({
    q: pick(c.title, base?.q ?? ""),
    a: pick(c.body, base?.a ?? ""),
  }));

  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "The House · Services")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Care as craft,")}{" "}
              <em>{cms(hero, "headlineEm", "season after season.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "The practical work of looking after a house and garden, held to one House standard. Gardens cut and planted, windows and sills cleared, gutters seen to before the weather turns, small repairs put right. Delivered by House of Willow Alexander and the people we approve, booked through HoWA, and written back to your Home Record so the house remembers what was done.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "#open-booking-form")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Book online through HoWA")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/contact")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "Call the House")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
            <p className={s.heroMicro}>Online bookings create or update your Home Record.</p>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={cms(hero, "imageUrl", "/home-v4/plus-benefit-1.webp")}
            alt={cms(
              hero,
              "imageAlt",
              "A hand cleaning a sash window in golden-hour light, with a plant on the sill inside",
            )}
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
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Same standard. Same hands twice.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Held in your record, surfaced when it matters.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Service carousel — all subbrands, live + coming-soon */}
      <section className={s.services}>
        <header className={s.servicesHead}>
          <p className={s.servicesEy}>{cms(servicesHead, "eyebrow", "The disciplines")}</p>
          <h2 className={s.servicesTitle}>
            {cms(servicesHead, "headline", "The hands that")}{" "}
            <em>{cms(servicesHead, "headlineEm", "keep a house in good order.", "headline")}</em>
          </h2>
          <p className={s.servicesLede}>
            {cms(
              servicesHead,
              "body",
              "Nine disciplines, one way of working. Four are live now. The rest open through 2026 as we approve the people we would have in our own homes.",
            )}
          </p>
        </header>
        <ServiceCarousel
          cards={serviceCards.map((svc) => {
            const cardImg = imgOr(svc.image);
            return { ...svc, image: cardImg, soon: cardImg === COMING_SOON };
          })}
        />
        <p className={s.servicesFootnote}>
          {cms(
            servicesHead,
            "caption",
            "Scroll for more. Further disciplines open through 2026 as we approve the people behind them.",
          )}
        </p>
      </section>

      {/* 4. Steward Plans ladder */}
      <section id="plans" className={s.plans}>
        <header className={s.plansHead}>
          <p className={s.plansEy}>
            {cms(plansHead, "eyebrow", "HoWA Steward · ")}
            <span className={s.plansEyHighlight}>
              {cms(plansHead, "subheadline", "Available with Steward only")}
            </span>
          </p>
          <h2 className={s.plansTitle}>
            {cms(plansHead, "headline", "Care, on a rhythm")}{" "}
            <em>{cms(plansHead, "headlineEm", "the home can trust.", "headline")}</em>
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
          {planCards.map((p) => (
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
          <p className={s.briefEy}>{cms(brief, "eyebrow", "The Assistant · in two minutes")}</p>
          <h2 className={s.briefTitle}>
            {cms(brief, "headline", "Tell us about the home.")}{" "}
            <em>{cms(brief, "headlineEm", "HoWA proposes the plan.", "headline")}</em>
          </h2>
          <p className={s.briefLede}>
            {cms(
              brief,
              "body",
              "A short conversation and the Assistant sketches a plan that fits the home, the rhythm, and the budget. Adjust before booking, or book straight in.",
            )}
          </p>
          <Link href={cms(brief, "ctaHref", "/howa/assistant")} className={s.btnFilled}>
            {cms(brief, "ctaLabel", "Try the Assistant")}
          </Link>
        </div>
        <div className={s.briefMock}>
          <p className={s.briefMockTitle}>A worked example</p>
          <ul className={s.briefMockList}>
            {briefLines.map((line) => (
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
            <p className={s.faqEy}>{cms(faqHead, "eyebrow", "Questions")}</p>
            <h2 className={s.faqTitle}>
              {cms(faqHead, "headline", "What people")}{" "}
              <em>{cms(faqHead, "headlineEm", "usually", "headline")}</em>{" "}
              {cms(faqHead, "subheadline", "ask.")}
            </h2>
          </header>
          <FaqList items={faqItems} />
        </div>
      </section>

      {/* 7. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>
          {cms(closing, "eyebrow", "The quiet discipline of looking after a place.")}
        </p>
        <p className={s.closingStatement}>
          <em>{cms(closing, "headlineEm", "Booked, briefed, and remembered.", "headline")}</em>
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "#open-booking-form")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Book a service")}
          </Link>
          <Link href={cms(closing, "cta2Href", "/howa")} className={s.closingBtnGhost}>
            {cms(closing, "cta2Label", "See HoWA")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
