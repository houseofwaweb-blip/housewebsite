import Image from "next/image";
import Link from "next/link";
import s from "./services.module.css";
import { FaqList } from "@/components/marketing/FaqList";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";
import { ServiceCarousel } from "./ServiceCarousel";
import { HouseStandardStrip } from "@/components/marketing/HouseStandardStrip";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { LIVE_SERVICES as TRUTH_LIVE_SERVICES } from "@/lib/truth";
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
 * /services — the high-intent and SEO demand hub.
 *
 * Directive v2 STEP 06 removes this page from primary navigation: visitors
 * arrive through the relevant Household member, search, paid campaigns, direct
 * URLs and the Household panel's utility link. It stays useful to a visitor who
 * lands here before understanding the wider brand.
 *
 * Four live services only: gardening, cleaning, window cleaning, gutter
 * clearing. A fifth appears only when its complete launch gate passes, and
 * future services never sit inside the live grid to pad the range.
 *
 * Section order (fixed by STEP 06):
 *   1. Hero and postcode check
 *   2. Live care cards
 *   3. How booking works
 *   4. Named provider and House Approved proof
 *   5. Repeat frequency explanation
 *   6. What is remembered — service-specific
 *   7. Future / register-interest services, visually separate
 *   8. Professional route
 *   9. FAQ and contact
 *
 * Deleted per STEP 06: the Steward Plans ladder and the Apartment/Essential/
 * Comprehensive/Premium bundles, the Assistant brief builder, and the stats
 * strip, whose "17 House standards" and discipline counts were unverified.
 */

export const metadata = {
  title: "House Services | Booked through HoWA, delivered by a named provider",
  description:
    "Practical care for home and garden. Check availability at your address. Every live service shows the provider, scope and price or quotation route before you commit.",
};

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
      "A regular team that learns the home: surfaces, finishes, what to use, what to leave. Same hands twice, with the visit and the agreed scope kept against the home.",
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
      "Daily or weekly housekeeping, laundry, linen, kitchen, light cooking, for households that prefer the home kept beautifully without managing it.",
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

/** The deferred services, exposed so /services/[slug] can render a coming-soon
 *  page for them instead of 404ing (they're linked from here + the footer). */
export const SOON_SERVICE_CARDS = SERVICES.filter((sv) => sv.state === "soon").map((sv) => ({
  slug: sv.slug,
  name: sv.name,
  tagline: sv.tagline,
  body: sv.body,
  image: sv.image,
}));

const FAQ = [
  {
    q: "Can I book one-off, or on a regular rhythm?",
    a: "Either. Choose weekly, fortnightly, monthly or seasonal frequency when you book an available service, or book a single visit with no commitment.",
  },
  {
    q: "Who actually comes to the home?",
    a: "The named provider shown before you confirm. You see the business responsible for the work, the agreed scope and the price or quotation basis, and that provider remains responsible for its contract and delivery unless checkout states otherwise.",
  },
  {
    q: "What writes into HoWA?",
    a: "It depends on the service and the provider's workflow, so each live service states its own position rather than us promising the same of all four. Where the workflow supports it, photographs, notes, invoice and next-care information return to the Home Record. Your confirmation and documents can be saved to it either way.",
  },
  {
    q: "Do you cover my postcode?",
    a: "Check your address and the House will tell you. Coverage is shown from live availability for the service you choose rather than a blanket region, and where nobody covers you yet you can register interest instead.",
  },
];

// Real field photography (brief slide 5/7/8) — real crew + a real van, shown as
// a contained grid, not a full-bleed band. Does not touch the brand still-life
// category cards (those are brand assets).
const BOOKING_STEPS = [
  { t: "Booked", d: "Choose the service, the provider and the time through HoWA. You see the business responsible, the scope and the price or quotation basis before you confirm." },
  { t: "Done", d: "The named professional completes the agreed work to the published House standard. They remain responsible for their contract and delivery." },
  { t: "Remembered", d: "Where the workflow supports it, photographs, notes, invoice and next-care information return to the Home Record. Your confirmation and documents can be saved to it either way." },
];

// Service-specific, because a blanket write-back promise is not true of all
// four. Each line states only what that service's workflow actually supports.
const REMEMBERED = [
  { name: "Gardening", line: "The visit, the season's plan and any photographs the gardener takes. Planting notes build up over time." },
  { name: "Cleaning", line: "The visit and the agreed scope. Notes on finishes and what to use, so the same hands can return." },
  { name: "Window cleaning", line: "The visit date and the round, so the next clean is scheduled rather than remembered by you." },
  { name: "Gutter clearing", line: "The clear, the downpipe check and any flagged works list, with photographs where the provider supplies them." },
];

const REAL_WORK = [
  { src: "/services/photos/vans/asher-348.webp", alt: "A liveried House of HoWA electric van" },
  { src: "/services/photos/gardening/garden-clearance-hero.webp", alt: "Gardening team clearing a garden" },
  { src: "/services/photos/window-cleaning/regular-window-cleaning-hero.webp", alt: "Window cleaning in progress" },
  { src: "/services/photos/cleaning/regular-cleaning-hero.webp", alt: "Home cleaning in progress" },
];

export default async function ServicesLanding() {
  const sections = await getPageSections("services");
  const hero = sections.get("hero");
  const servicesHead = sections.get("services");
  const faqHead = sections.get("faq");
  const closing = sections.get("closing");

  const serviceCards = cmsCards(servicesHead, SERVICES, (c, base) => ({
    slug: base?.slug ?? "",
    name: pick(c.title, base?.name ?? ""),
    tagline: pick(c.label, base?.tagline ?? ""),
    body: pick(c.body, base?.body ?? ""),
    image: pick(c.imageUrl, base?.image ?? ""),
    href: pick(c.ctaHref, base?.href ?? "#"),
    state: base?.state ?? ("live" as const),
  }));
  // The live grid is driven by the single truth layer, never by this file's
  // local list or by the CMS adding a card. resolveStatus() downgrades any
  // service missing a seller, coverage, price route or bookability, so it drops
  // out of the grid by itself rather than needing anyone to remember. A fifth
  // service appears here only once its launch gate passes.
  //
  // Status and route come from truth; the longer selling copy is still editable
  // in this file / the CMS and is matched on by slug.
  const liveCards = TRUTH_LIVE_SERVICES.map((svc) => {
    const copy = serviceCards.find((c) => c.href === svc.canonicalRoute);
    return {
      slug: svc.id,
      name: svc.publicName,
      tagline: copy?.tagline ?? svc.line ?? "",
      body: copy?.body ?? svc.line ?? "",
      image: copy?.image ?? svc.image ?? COMING_SOON,
      href: svc.canonicalRoute,
      state: "live" as const,
    };
  });
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
            <p className={s.heroEy}>{cms(hero, "eyebrow", "House Services")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Practical care for")}{" "}
              <em>{cms(hero, "headlineEm", "home and garden.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(hero, "body", "Choose the work the home needs and check availability at your address.")}
            </p>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body2",
                "Every live service shows the provider, scope, price or quotation route before you commit. Bookings are managed through HoWA so the appointment and useful records stay connected to the home.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "#open-booking-form")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Check my postcode")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/contact")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "Speak to the House")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
            <p className={s.heroMicro}>Booked through HoWA. Delivered by a named provider shown before you confirm.</p>
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

      {/* 2. Live care cards — the four live services ONLY. Future services are
          held back to section 7 so the range is never padded out. */}
      <section className={s.services}>
        <header className={s.servicesHead}>
          <p className={s.servicesEy}>{cms(servicesHead, "eyebrow", "Live care")}</p>
          <h2 className={s.servicesTitle}>
            {cms(servicesHead, "headline", "The hands that")}{" "}
            <em>{cms(servicesHead, "headlineEm", "keep a house in good order.", "headline")}</em>
          </h2>
          <p className={s.servicesLede}>
            {cms(
              servicesHead,
              "body",
              "Each of these is live where your postcode is covered. Check your address and the House will show the named provider, the scope and the price or quotation route before you commit.",
            )}
          </p>
        </header>
        <ServiceCarousel
          cards={liveCards.map((svc) => {
            const cardImg = imgOr(svc.image);
            return { ...svc, image: cardImg, soon: false };
          })}
        />
      </section>

      {/* 3. How booking works */}
      <section className={s.services}>
        <header className={s.servicesHead}>
          <p className={s.servicesEy}>How booking works</p>
          <h2 className={s.servicesTitle}>
            Booked, <em>then remembered.</em>
          </h2>
        </header>
        <ol className={s.howGrid}>
          {BOOKING_STEPS.map((step, i) => (
            <li key={step.t} className={s.howCard}>
              <span className={s.howNum}>{["I.", "II.", "III."][i]}</span>
              <h3 className={s.howTitle}>{step.t}</h3>
              <p className={s.howBody}>{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Named provider and House Approved proof — the disclosure the
          directive fixes word for word. */}
      <section className={s.providerSection}>
        <div className={s.providerInner}>
          <h2 className={s.providerTitle}>Booked through HoWA. Delivered by a named provider.</h2>
          <p className={s.providerBody}>
            Before you confirm, you will see the business responsible for the
            work, the agreed scope and the price or quotation basis.
          </p>
          <p className={s.providerBody}>
            House of HoWA sets the standard around the introduction and the
            experience. The provider remains responsible for its contract and
            delivery unless checkout states otherwise.
          </p>
          <Link href="/house-approved" className={s.btnGhost}>
            What House Approved means
            <span aria-hidden="true" className={s.btnArrow}>→</span>
          </Link>
        </div>
        <div className={s.providerVisual}>
          <Image
            src="/the-house/house-approved-van.webp"
            alt="A liveried House of HoWA van outside a home"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* 5. Repeat frequency — replaces the deleted Steward Plans ladder. The
          frequency is chosen inside the booking journey, not sold as a bundle. */}
      <section className={s.services}>
        <header className={s.servicesHead}>
          <p className={s.servicesEy}>Repeat care</p>
          <h2 className={s.servicesTitle}>
            Need <em>regular care?</em>
          </h2>
          <p className={s.servicesLede}>
            Choose weekly, fortnightly, monthly or seasonal frequency when
            booking an available service. The named provider remains responsible
            for the service. HoWA keeps the appointments and supported records
            connected to the home.
          </p>
        </header>
        <ul className={s.freqRow}>
          {["Weekly", "Fortnightly", "Monthly", "Seasonal"].map((f) => (
            <li key={f} className={s.freqChip}>{f}</li>
          ))}
        </ul>
      </section>

      {/* 6. What is remembered — service-specific, never a blanket promise. */}
      <section className={s.services}>
        <header className={s.servicesHead}>
          <p className={s.servicesEy}>What is remembered</p>
          <h2 className={s.servicesTitle}>
            Kept with the home, <em>service by service.</em>
          </h2>
          <p className={s.servicesLede}>
            What returns to the Home Record depends on the service and the
            provider's workflow. Each live service states its own position rather
            than promising the same of all four.
          </p>
        </header>
        <ul className={s.rememberGrid}>
          {REMEMBERED.map((r) => (
            <li key={r.name} className={s.rememberCard}>
              <h3 className={s.rememberName}>{r.name}</h3>
              <p className={s.rememberBody}>{r.line}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Future / register-interest services — visually separate from live
          care, so the range never looks larger than it is. */}
      <section className={s.futureSection}>
        <header className={s.servicesHead}>
          <p className={s.servicesEy}>Not yet open</p>
          <h2 className={s.servicesTitle}>
            In build, <em>not yet bookable.</em>
          </h2>
          <p className={s.servicesLede}>
            These are not available to book. Register interest and the House will
            write to you when a named provider covers your address.
          </p>
        </header>
        <ul className={s.futureGrid}>
          {SOON_SERVICE_CARDS.map((sv) => (
            <li key={sv.slug} className={s.futureCard}>
              <h3 className={s.futureName}>{sv.name}</h3>
              <p className={s.futureBody}>{sv.tagline}</p>
              <Link href={`/services/${sv.slug}`} className={s.futureLink}>
                Register interest →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Professional route */}
      <section className={s.services}>
        <header className={s.servicesHead}>
          <p className={s.servicesEy}>For professionals</p>
          <h2 className={s.servicesTitle}>
            House Approved is <em>not for everyone.</em>
          </h2>
          <p className={s.servicesLede}>
            It is for designers, craftspeople and service businesses whose work
            the House is prepared to stand behind. Approval is selective.
            Providers remain independent, choose the work they accept and are
            presented by name.
          </p>
          <div className={s.heroCtas}>
            <Link href="/become-a-house-pro" className={s.btnFilled}>Apply for Approval</Link>
            <Link href="/house-approved" className={s.btnGhost}>
              What the mark means
              <span aria-hidden="true" className={s.btnArrow}>→</span>
            </Link>
          </div>
        </header>
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
              Book through HoWA
            </Link>
          </div>
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
            {cms(closing, "ctaLabel", "Book through HoWA")}
          </Link>
          <Link href={cms(closing, "cta2Href", "/howa")} className={s.closingBtnGhost}>
            {cms(closing, "cta2Label", "See HoWA")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
