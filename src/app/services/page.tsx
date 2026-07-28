import Image from "next/image";
import Link from "next/link";
import s from "./services.module.css";
import { FaqList } from "@/components/marketing/FaqList";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";
import { ServiceCarousel } from "./ServiceCarousel";
import { HouseStandardStrip } from "@/components/marketing/HouseStandardStrip";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { HeroServiceFinder } from "@/components/marketing/HeroServiceFinder";
import { REQUESTABLE_SERVICES, SERVICE_GROUPS } from "@/lib/services-data/requestable";
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
 * /services — the service index (REVISIONS v3 §5).
 *
 * v3 reverses the earlier four-service limitation. That limit existed to stop
 * dead "coming soon" categories, but it must not stop the House presenting a
 * credible whole-home offer fulfilled through House teams AND disclosed HoWA
 * Approved professionals.
 *
 * §5 requires this page to carry: a service and postcode finder; the full live
 * catalogue; problem-led help for people who do not know the service name; a
 * clear distinction between House teams and HoWA Approved professionals; a
 * price method on every service; one-off and recurring frequency; proof,
 * coverage and reviews; how the booking is managed through HoWA; and a final
 * finder plus telephone route.
 *
 * CTA language is the customer's action ("Find a service", "See prices and
 * availability", "Describe a problem"). Never "Book through HoWA" (§5, §11).
 */

export const metadata = {
  title: "Home and garden services",
  description:
    "Garden care, cleaning and housekeeping, window and gutter cleaning, handyman and repairs, clearance and specialist garden work. Delivered by House teams and named HoWA Approved professionals, booked and managed through HoWA.",
};

const STAT_COLS = [
  { value: "1", label: "House standard" },
  { value: "17", label: "Published standards" },
  { value: "1", label: "Calendar to trust" },
  { value: "No", label: "Unapproved hands" },
];

const SERVICES = [
  {
    slug: "gardening",
    name: "Gardening",
    tagline: "Lawn, beds, and seasonal care.",
    body:
      "Routine cuts, hedge work, planting plans and seasonal tidies, by gardeners who know the difference between cutting back and cutting down.",
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
      "A regular team that learns the home: surfaces, finishes, what to use, what to leave. Same hands twice. Filed to your record after every visit.",
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
    // v3 §5 — handyman work is live, delivered through disclosed HoWA Approved
    // professionals. It has full pricing and sub-services, so it must not sit
    // behind a "coming soon" card.
    state: "live" as const,
  },
  {
    slug: "housekeeping",
    name: "Housekeeping",
    tagline: "A discreet, ongoing presence.",
    body:
      "Daily or weekly housekeeping, laundry, linen, kitchen, light cooking, for households that prefer the home kept beautifully without managing it.",
    image: "/services/subbrands/housekeeping.webp",
    href: "/services/housekeeping",
    state: "live" as const,
  },
  {
    slug: "removals",
    name: "Removals",
    tagline: "Moves, briefed by the record.",
    body:
      "Moves briefed by your record, with packers who handle period interiors with care. The Living Record makes the unpack at the other end clean and quick.",
    image: "/services/subbrands/removals.webp",
    href: "/services/removals",
    state: "live" as const,
  },
  {
    slug: "energy",
    name: "Energy & Electrical",
    tagline: "EICRs, EV chargers, retrofit advice.",
    body:
      "Vetted electricians, EICRs filed to your HoWA record, and energy-efficiency planning so the home performs as well as it looks.",
    image: "/services/subbrands/electrical.webp",
    href: "/services/energy",
    state: "live" as const,
  },
  {
    slug: "pet-care",
    name: "Pet Care",
    tagline: "Dog walking, sitting and check-ins.",
    body:
      "Vetted walkers and sitters who know the door codes, the leash habits, and the after-walk routine.",
    image: "/services/subbrands/dog-walking.webp",
    href: "/services/pet-care",
    state: "live" as const,
  },
];

/**
 * Formerly the deferred, "coming soon" services. Every service in the index is
 * now presented as live and bookable, so this list is empty by design: nothing
 * on the site should tell a customer to come back later when we would happily
 * take the job today.
 *
 * The export is kept because `/services/[slug]` still consults it as its last
 * resolution step before 404ing. Emptying it here retires the coming-soon page
 * type without unpicking that route's fallback chain.
 */
export const SOON_SERVICE_CARDS: Array<{
  slug: string;
  name: string;
  tagline: string;
  body: string;
  image: string;
}> = [];

/**
 * REVISIONS v3 §9 — the named monthly plan ladder ("Apartment Plan", "House
 * Essential", "House Comprehensive", "House Premium") is REMOVED. v3 forbids
 * maintenance plans, ongoing plans, House maintenance memberships, and Steward
 * or Housekeeper service plans on the House site, along with any plan that is
 * not operationally live, priced, staffed and contractually defined.
 *
 * Recurring care is now presented as what it actually is: a booking frequency
 * chosen inside the service. These are frequencies, not memberships, and none
 * of them requires a subscription of any kind.
 */
const FREQUENCIES = [
  {
    name: "One-off visit",
    lede: "A single booking, for a single job.",
    body: "A tidy before guests, a clean between tenants, a gutter clear before winter. Priced for the visit, with nothing to cancel afterwards.",
    examples: ["Garden tidy", "One-off clean", "End-of-tenancy clean", "Gutter clear"],
  },
  {
    name: "Regular service",
    lede: "The same work, on a rhythm you set.",
    body: "Weekly, fortnightly or monthly, with the same team where we can manage it. Change the frequency, pause it or stop it whenever you like.",
    examples: ["Weekly cleaning", "Fortnightly garden care", "Monthly window cleaning"],
  },
  {
    name: "Seasonal care",
    lede: "Work that only makes sense at certain times of year.",
    body: "Booked once, then remembered for you. HoWA holds the date and tells you when it is coming round again, so it does not get missed.",
    examples: ["Spring and autumn gutters", "Hedge cutting in season", "Spring clean", "Winter garden prep"],
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
    a: "Our own teams where we operate directly. Where we don't, a named HoWA Approved professional, disclosed up front and held to the same standard.",
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

// Real field photography (brief slide 5/7/8) — real crew + a real van, shown as
// a contained grid, not a full-bleed band. Does not touch the brand still-life
// category cards (those are brand assets).
const REAL_WORK = [
  { src: "/services/photos/vans/asher-348.webp", alt: "A liveried House of Willow Alexander electric van" },
  { src: "/services/photos/gardening/garden-clearance-hero.webp", alt: "Gardening team clearing a garden" },
  { src: "/services/photos/window-cleaning/regular-window-cleaning-hero.webp", alt: "Window cleaning in progress" },
  { src: "/services/photos/cleaning/regular-cleaning-hero.webp", alt: "Home cleaning in progress" },
];

export default async function ServicesLanding() {
  const sections = await getPageSections("services");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const servicesHead = sections.get("services");
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
  // v3 §9 — the plan ladder is gone, so there are no plan cards to hydrate from
  // Sanity. The frequency block is static by design: a booking frequency is not
  // an editable product.
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
          <FlowerWatermark color="gold" side="left" opacity={0.16} className="!top-auto bottom-[-12%] h-[74%]" />
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
                "Gardens that grow character, homes that hold heart. The practical work of looking after a house and garden, held to one House standard. Lawns cut and beds planted, windows and sills cleared, gutters seen to before the weather turns, small repairs put right. Delivered by House of Willow Alexander's own teams, booked and written back to your Home Record so the house remembers what was done.",
              )}
            </p>
            {/* DIRECTIVE §08 #1 — a literal service + postcode finder leads the
                services index, with the price/availability promise. */}
            <HeroServiceFinder />
            <div className={s.heroCtas} style={{ marginTop: 16 }}>
              <a href="tel:08000478738" className={s.btnGhost}>
                {cms(hero, "cta2Label", "Call the House")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </a>
            </div>
            <p className={s.heroMicro}>Enter a postcode for coverage and your price. Bookings create or update your Home Record.</p>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={cms(hero, "imageUrl", "/services/photos/window-cleaning/regular-window-cleaning-hero.webp")}
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

      {/* 3. The full live catalogue (v3 §5 requirement 2). */}
      <section id="service-catalogue" className={s.services}>
        <header className={s.servicesHead}>
          <p className={s.servicesEy}>{cms(servicesHead, "eyebrow", "The catalogue")}</p>
          <h2 className={s.servicesTitle}>
            {cms(servicesHead, "headline", "The hands that")}{" "}
            <em>{cms(servicesHead, "headlineEm", "keep a house in good order.", "headline")}</em>
          </h2>
          <p className={s.servicesLede}>
            {cms(
              servicesHead,
              "body",
              "The whole home and garden, from one House. Some work is done by our own teams; some is done by a named HoWA Approved professional. You are always told which before you commit.",
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
          Do not see the job you need? Describe it below and the House will tell
          you who does it, what it costs and when we can come.
        </p>
      </section>

      {/* 3b. Who actually turns up (v3 §5 requirement 4) — the distinction
          between a House team and a disclosed HoWA Approved professional,
          stated plainly rather than buried in small print. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1080px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Who turns up</p>
          <h2 className="mb-8 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            Two kinds of hands, <em>one standard.</em>
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="border border-house-brown/15 bg-house-cream p-8">
              <h3 className="mb-3 font-display text-[22px] leading-tight text-house-brown">A House of Willow Alexander team</h3>
              <p className="mb-4 font-sans text-[15px] leading-[1.6] text-house-stone">
                Our own employed crews, in our own liveried electric vans,
                trained to the House standard. Most garden, cleaning, window and
                gutter work across our core postcodes is done this way.
              </p>
              <p className="font-sans text-[14px] leading-[1.55] text-house-brown">
                Delivered by House of Willow Alexander. Booking, scheduling and
                Home Record powered by HoWA.
              </p>
            </article>
            <article className="border border-house-brown/15 bg-house-cream p-8">
              <h3 className="mb-3 font-display text-[22px] leading-tight text-house-brown">A named HoWA Approved professional</h3>
              <p className="mb-4 font-sans text-[15px] leading-[1.6] text-house-stone">
                For specialist and wider-area work, a vetted professional we
                have approved and named. You are told who they are before you
                pay or commit, never after.
              </p>
              <p className="font-sans text-[14px] leading-[1.55] text-house-brown">
                Delivered by a named HoWA Approved professional. Booked and
                managed through HoWA.
              </p>
            </article>
          </div>
          <p className="mt-6 max-w-[70ch] font-sans text-[14px] leading-[1.6] text-house-stone/85">
            HoWA manages the booking and the operating record. It is not the
            physical service provider, and it never appears at your door.
          </p>
        </div>
      </section>

      {/* 3b-ii. Everything the House can arrange (v3 §5 requirement 2 + §4
          module 3). The full whole-home catalogue, grouped. Services we fulfil
          link to their page; the rest link to a named request page with a form,
          because a customer we cannot serve this week is still a lead worth
          capturing. Nothing here is a dead card and nothing says "coming
          soon". */}
      <section id="everything" className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
            Everything the House can arrange
          </p>
          <h2 className="mb-4 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            If it belongs to the home, <em>ask us about it.</em>
          </h2>
          <p className="mb-11 max-w-[64ch] font-sans text-[16px] leading-[1.65] text-house-stone">
            Some of this we do ourselves and you can see the price now. The rest
            we arrange through professionals we have approved. Either way, tell
            us what you need and you will have a real answer within one working
            day, including an honest no if that is the answer.
          </p>

          <div className="grid gap-x-10 gap-y-11 md:grid-cols-2">
            {SERVICE_GROUPS.map((group) => (
              <div key={group}>
                <h3 className="mb-4 border-b border-house-brown/20 pb-2 font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink">
                  {group}
                </h3>
                <ul className="m-0 grid list-none gap-0 p-0">
                  {REQUESTABLE_SERVICES.filter((sv) => sv.group === group).map((sv) => (
                    <li key={sv.slug} className="border-b border-house-brown/10 last:border-b-0">
                      <Link
                        href={sv.href ?? `/services/${sv.slug}`}
                        className="group flex items-baseline justify-between gap-4 py-3 no-underline"
                      >
                        <span className="font-sans text-[16px] leading-[1.4] text-house-brown transition-colors group-hover:text-house-gold-ink">
                          {sv.name}
                        </span>
                        <span className="shrink-0 font-sans text-[11px] tracking-[0.16em] uppercase text-house-stone/75 transition-colors group-hover:text-house-gold-ink">
                          "See prices"
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-11 max-w-[64ch] font-sans text-[14px] leading-[1.6] text-house-stone/85">
            Where a job is carried out by a named HoWA Approved professional
            rather than a House team, you are told who they are before you pay
            or commit to anything.
          </p>
        </div>
      </section>

      {/* 3c. Help me choose (v3 §5 requirement 3) — problem-led help for
          customers who do not know the service name. */}
      <section id="help-me-choose" className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1080px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Help me choose</p>
          <h2 className="mb-4 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            You do not have to know <em>what it is called.</em>
          </h2>
          <p className="mb-9 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-house-stone">
            Most people do not arrive knowing whether they need softwashing or
            jet washing, a tidy or a clearance. Describe the problem in your own
            words and we will name it for you.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: "Describe a problem", b: "Tell us what is wrong, in plain words. We will tell you which service it is and what it costs.", href: "#open-booking-form", cta: "Describe a problem" },
              { t: "Diagnose an issue", b: "Photograph the repair and have it identified before anyone books a survey visit.", href: "/services/handyman", cta: "Diagnose the problem" },
              { t: "Scan the garden", b: "Have the garden read back to you, then turn what it finds into a visit or a design brief.", href: "/services/gardening", cta: "Scan my garden" },
            ].map((c) => (
              <Link
                key={c.t}
                href={c.href}
                className="group flex flex-col border border-house-brown/15 bg-house-white p-7 no-underline transition-colors hover:border-house-gold"
              >
                <h3 className="mb-2.5 font-display text-[21px] leading-tight text-house-brown">{c.t}</h3>
                <p className="mb-7 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{c.b}</p>
                <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">
                  {c.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HouseStandardStrip />

      {/* Real teams on the road — real field photography (brief slide 5/7/8) on a
          forest-green House ground (moodboard section colour) */}
      <section className="px-[5vw] py-[clamp(48px,7vw,96px)] bg-house-forest">
        <div className="mx-auto max-w-[1200px]">
          <p
            className="text-center"
            style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-house-gold-light)", margin: "0 0 14px", fontWeight: 500 }}
          >
            On the road
          </p>
          <h2
            className="text-center"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(26px,3.4vw,42px)", lineHeight: 1.1, color: "var(--color-house-cream)", margin: "0 0 clamp(28px,4vw,52px)" }}
          >
            Real teams. Real vans. <em>One House standard.</em>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {REAL_WORK.map((t) => (
              <div key={t.src} className="relative aspect-[4/5] overflow-hidden bg-house-forest">
                <Image src={t.src} alt={t.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-[clamp(32px,4vw,52px)] flex justify-center">
            <Link href="#open-booking-form" className={s.btnFilled}>
              Book a service
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Frequency, not membership (v3 §9). */}
      <section id="plans" className={s.plans}>
        <header className={s.plansHead}>
          <p className={s.plansEy}>
            How often ·{" "}
            <span className={s.plansEyHighlight}>Not a membership</span>
          </p>
          <h2 className={s.plansTitle}>
            Choose how often, <em>not which plan to join.</em>
          </h2>
          <p className={s.plansLede}>
            There is no House maintenance plan to sign up to and no subscription
            to hold. You choose a service, then choose how often you want it.
            That is the whole arrangement, and you can change it at any point.
          </p>
        </header>
        <div className="mx-auto grid max-w-[1180px] gap-5 px-[5vw] md:grid-cols-3">
          {FREQUENCIES.map((f) => (
            <article key={f.name} className="flex flex-col border border-house-brown/15 bg-house-white p-8">
              <h3 className="mb-2 font-display text-[24px] leading-tight text-house-brown">{f.name}</h3>
              <p className="mb-3 font-sans text-[15px] leading-[1.5] text-house-brown">{f.lede}</p>
              <p className="mb-6 flex-1 font-sans text-[14px] leading-[1.6] text-house-stone">{f.body}</p>
              <ul className="m-0 mb-7 grid list-none gap-1.5 p-0">
                {f.examples.map((e) => (
                  <li key={e} className="flex gap-2.5 font-sans text-[14px] leading-[1.45] text-house-stone">
                    <span aria-hidden className="text-house-gold-ink">·</span>
                    {e}
                  </li>
                ))}
              </ul>
              <Link href="/services#service-catalogue" className={s.btnGhostDark}>
                See prices &amp; availability →
              </Link>
            </article>
          ))}
        </div>
        <p className={s.plansFootnote}>
          Every service carries its own price method: fixed, from, per visit,
          estimate or survey. Booking, scheduling and your Home Record are
          powered by HoWA.
        </p>
      </section>

      {/* 5. Brief builder */}
      <section className={s.brief}>
        <div className={s.briefCopy}>
          <p className={s.briefEy}>{cms(brief, "eyebrow", "Tell us what you need · in two minutes")}</p>
          <h2 className={s.briefTitle}>
            {cms(brief, "headline", "Tell us about the home.")}{" "}
            <em>{cms(brief, "headlineEm", "We'll shape the plan.", "headline")}</em>
          </h2>
          <p className={s.briefLede}>
            {cms(
              brief,
              "body",
              "A short conversation and the House shapes a plan that fits the home, the rhythm, and the budget. Adjust before booking, or book straight in.",
            )}
          </p>
          <Link href={cms(brief, "ctaHref", "#open-booking-form")} className={s.btnFilled}>
            {cms(brief, "ctaLabel", "Book a service")}
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
        <FlowerWatermark color="white" side="right" opacity={0.13} />
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
