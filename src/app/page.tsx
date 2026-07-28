import Image from "next/image";
import Link from "next/link";
import s from "./home-v5/home-v5.module.css";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { shopifyProvider } from "@/lib/commerce/shopify";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { HeroServiceFinder } from "@/components/marketing/HeroServiceFinder";
import { SampleDesignShowcase } from "@/components/design/SampleDesignShowcase";

/**
 * Homepage — REVISIONS v4.
 *
 * v4 supersedes v3's homepage instructions. v3 pushed the page towards a
 * service directory; v4's correction is NOT to hide services again, but to
 * make the homepage the front door to the WHOLE House. It must answer three
 * questions on arrival: what is the House, what can it help me with, and where
 * do I go next.
 *
 * Module order is v4 §4, exactly:
 *   1  Utility strip
 *   2  Whole-House hero
 *   3  "How can the House help?" destination chooser
 *   4  Popular services (a curated snapshot, not the catalogue)
 *   5  Editorial feature from The Hearth
 *   6  The House runs on HoWA
 *   7  Design
 *   8  Insurance
 *   9  The Shop
 *   10 Why the House
 *   11 Founders and House story
 *   12 Final chooser
 *
 * v4 §7 also governs RHYTHM: alternate full-width editorial imagery, compact
 * commercial card groups, product-interface sections, human photography and
 * quiet text-led moments. Never stack several grids of equal cards.
 *
 * Deliberately NOT here (v4 §5 "Remove from the homepage"): the full service
 * catalogue, long grids of near-identical service cards, coming-soon
 * categories, maintenance plans, and repeated postcode forms in several
 * sections. There is exactly ONE postcode check on this page, in module 4.
 */

export const metadata = {
  title: { absolute: "House of Willow Alexander | Services, design, insurance, goods and The Hearth" },
  description:
    "Home and garden services, thoughtful design, insurance, considered goods and Home Intelligence, brought together by House of Willow Alexander and managed through HoWA.",
};

/**
 * v4 §3 module 3 — the destination chooser. This is the primary navigation
 * device on the homepage: six strong image-led cards, all visible on desktop,
 * a labelled swipe rail on mobile. Never an auto-rotating carousel, because
 * important destinations must not disappear before they have been read.
 *
 * Copy is v4's table verbatim.
 */
const DESTINATIONS = [
  {
    want: "Care for my home or garden",
    title: "Services",
    line: "Trusted practical help for the home and garden.",
    cta: "Find a service",
    href: "/services",
    image: "/services/photos/gardening/lawn-care-hero.webp",
    alt: "Two House gardeners mowing and clearing a large lawn",
  },
  {
    want: "Design a room or garden",
    title: "Design",
    line: "Begin with HoWA intelligence and continue with a human designer.",
    cta: "Explore Design",
    href: "/design",
    image: "/home-v4/design-portrait.webp",
    alt: "A considered interior scheme by the House design studio",
  },
  {
    want: "Protect my home or pet",
    title: "Insurance",
    line: "Dedicated Home Insurance and Pet Insurance journeys.",
    cta: "Explore Insurance",
    href: "/insurance",
    image: "/home-v4/protect-insurance.webp",
    alt: "An Edwardian London townhouse at golden hour",
  },
  {
    want: "Find something for my home",
    title: "The Shop",
    line: "Considered goods chosen for the work and pleasure of home.",
    cta: "Shop the House",
    href: "/shop",
    image: "/shop/rooms/kitchen.webp",
    alt: "A kitchen dressed with House-selected pieces",
  },
  {
    want: "Read and be inspired",
    title: "The Hearth",
    line: "Stories, gardens, recipes, objects and the culture of home.",
    cta: "Enter The Hearth",
    href: "/the-hearth",
    image: "/home-v4/pillar-3.webp",
    alt: "An editorial still life from The Hearth",
  },
  {
    want: "Understand and manage my home",
    title: "HoWA",
    line: "The Home Intelligence app used by the House.",
    cta: "Explore HoWA",
    href: "/howa",
    image: "/home-v4/howa-app-showcase.webp",
    alt: "The HoWA app shown on three phones",
  },
];

/**
 * v4 §3 module 4 — a CURATED SNAPSHOT of six live services, not the catalogue.
 * Every card carries a name, a scope line, a price method, a coverage cue and
 * a direct action. The full catalogue lives on /services and in the mega-menu.
 */
const POPULAR_SERVICES = [
  { name: "Garden care", href: "/services/gardening", scope: "Lawns, borders and hedges kept in order through the season.", price: "From £95 per visit", method: "Per visit", image: "/services/photos/gardening/garden-tidy-hero.webp" },
  { name: "Cleaning and housekeeping", href: "/services/cleaning", scope: "A cleaner who learns your home and holds it to the same standard.", price: "From £95 per visit", method: "Per visit", image: "/services/photos/cleaning/regular-cleaning-hero.webp" },
  { name: "Window cleaning", href: "/services/window-cleaning", scope: "Reach-and-wash exterior cleaning, with interiors on request.", price: "From £42 per visit", method: "Per visit", image: "/services/photos/window-cleaning/one-off-window-cleaning-hero.webp" },
  { name: "Gutter cleaning", href: "/services/gutter-cleaning", scope: "Vacuum-cleared from the ground, with before and after photographs.", price: "From £120", method: "Fixed for most homes", image: "/services/photos/gutter-cleaning-hero.webp" },
  { name: "Handyman and repairs", href: "/services/handyman", scope: "Hourly and half-day visits for the jobs that have been waiting.", price: "From £60 per hour", method: "Hourly", image: "/services/photos/handyman-hero.webp" },
  { name: "Clearance and seasonal work", href: "/services/gardening/garden-clearance", scope: "An overgrown garden cut back, cleared and the waste licensed away.", price: "Priced from photographs", method: "Estimate", image: "/services/photos/gardening/garden-clearance-hero.webp" },
];

/**
 * v4 §3 module 10 — "Why the House". Commercial reassurance, stated as proof
 * rather than another abstract brand manifesto.
 */
const PROOF_POINTS = [
  { k: "Real teams, named providers", v: "A House of Willow Alexander team, or a named HoWA Approved professional. You are told which, and who, before you commit." },
  { k: "Published standards", v: "The standard every provider works to is written down and applied consistently, not implied by a badge." },
  { k: "Vetting and cover", v: "Identity and reference checked, and covered by public liability insurance." },
  { k: "Real work, real photography", v: "The photographs on this site are our own crews, vans and gardens. Nothing is stock." },
  { k: "Clear pricing", v: "Every service carries a price method: fixed, from, per visit, estimate or survey. No hidden call-out fees." },
  { k: "Managed in HoWA", v: "Booking, rescheduling, messages, documents and your Home Record, all in one place." },
];

// v4 §3 module 9 — a seasonal edit and a small number of strong products,
// rather than a generic marketplace grid.
const SHOP_EDIT = [
  { name: "Kitchen", handle: "kitchen", image: "/shop/rooms/kitchen.webp" },
  { name: "Living Room", handle: "living-room", image: "/shop/rooms/living-room.webp" },
  { name: "Garden & Outdoor", handle: "garden-outdoor", image: "/shop/rooms/garden.webp" },
];

const PRODUCTS = [
  { name: "Dark Grey Chunky Knit Throw", price: "£89.00", image: "https://cdn.shopify.com/s/files/1/1006/9449/1462/files/handmade-dark-grey-chunky-knit-throw.jpg", href: "/shop/collections/soft-furnishings" },
  { name: "Soft Furnishings", price: "The collection", image: null, href: "/shop/collections/soft-furnishings" },
  { name: "Home Accessories", price: "The collection", image: null, href: "/shop/collections/home-accessories" },
];

const HEARTH_FALLBACK = [
  { title: "A guide to seasonal planting", dek: "What to put in the ground now so the garden earns its keep in spring.", image: "/home-v4/pillar-1.webp" },
  { title: "How to read a house survey", dek: "The findings that matter, and the ones that read worse than they are.", image: "/home-v4/pillar-2.webp" },
  { title: "The art of the considered interior", dek: "Why the best rooms look as though nobody tried.", image: "/home-v4/pillar-3.webp" },
  { title: "Five things your boiler is telling you", dek: "The noises worth acting on before the cold arrives.", image: "/home-v4/pillar-4.webp" },
];

function formatMoney(m: { amount: string; currencyCode: string }) {
  const sym = m.currencyCode === "GBP" ? "£" : m.currencyCode === "USD" ? "$" : "";
  return `${sym}${Number(m.amount).toFixed(2)}`;
}

export default async function HomePage() {
  // Four stories: one lead plus three secondaries at varied scale (v4 §3.5).
  const hearthArticles = await getLatestHearthArticles(4).catch(() => []);
  const shopProducts = await shopifyProvider.listFeaturedProducts(3).catch(() => []);
  const marketCards = shopProducts.length
    ? shopProducts.slice(0, 3).map((p) => ({
        name: p.title,
        price: formatMoney(p.price),
        image: p.images[0]?.url ?? null,
        href: `/shop/${p.handle}`,
      }))
    : PRODUCTS;

  const stories = hearthArticles.length >= 4
    ? hearthArticles.slice(0, 4).map((a) => ({
        title: a.title,
        dek: a.dek ?? "",
        href: `/the-hearth/${a.slug}`,
        image: a.image,
        alt: a.imageAlt ?? a.title,
      }))
    : HEARTH_FALLBACK.map((f) => ({
        title: f.title,
        dek: f.dek,
        href: "/the-hearth",
        image: f.image,
        alt: f.title,
      }));
  const [lead, ...secondary] = stories;

  return (
    <div className={s.page}>
      {/* 1. Utility strip (v4 §3 module 1). Coverage and telephone sit here;
          Search, Basket and My Home in HoWA live in the sticky header a few
          pixels above, so repeating them would duplicate them on the same
          screen and scroll away. */}
      <div className="border-b border-house-brown/10 bg-house-cream-dark/40 px-[5vw] py-2">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
          <p className="m-0 font-sans text-[12px] tracking-[0.06em] text-house-stone">
            Covering London and the South East
          </p>
          <a href="tel:08000478738" className="font-sans text-[12px] tracking-[0.06em] text-house-brown no-underline hover:text-house-gold-ink">
            0800 047 8738
          </a>
        </div>
      </div>

      {/* 2. Whole-House hero (v4 §3 module 2). The headline may be emotional,
          but the supporting line must state literally what the House offers,
          and both must be visible without scrolling. No service catalogue and
          no large postcode form on the first screen. */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <FlowerWatermark color="gold" side="left" opacity={0.16} className="!top-auto bottom-[-12%] h-[74%]" />
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>House of Willow Alexander</p>
            <h1 className={s.heroTitle}>
              That feeling<br />
              <em>you call home.</em>
            </h1>
            <p className={s.heroLede}>
              Home and garden services, thoughtful design, insurance, considered
              goods and Home Intelligence, brought together by House of Willow
              Alexander and managed through HoWA.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#house-help" className={s.btnFilled} style={{ justifyContent: "center", textAlign: "center" }}>
                What does your home need?
              </a>
              <a href="#popular-services" className={s.btnGhost} style={{ justifyContent: "center", textAlign: "center" }}>
                Explore the House
              </a>
            </div>
            <p className={s.heroBookingNote}>
              <a href="https://accounts.willowalexander.co.uk/">Open My Home in HoWA</a>, or{" "}
              <a href="tel:08000478738">call the House directly</a>.
            </p>
          </div>
        </div>
        <div className={s.heroVisual}>
          <div className={s.heroVisualFrame}>
            <Image
              src="/home-v4/hero-georgian-london.webp"
              alt="A refined sage-green Georgian London townhouse with a classical portico entrance, urn planters and a hedge-lined front garden"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 3. "How can the House help?" destination chooser (v4 §3 module 3).
          Six image-led cards, all visible on desktop, a labelled swipe rail on
          mobile. Static, never auto-rotating. */}
      <section id="house-help" className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-10 max-w-[680px] text-center">
            <h2 className="mb-4 font-display text-[clamp(28px,3.4vw,46px)] leading-[1.06] text-house-brown">
              How can the House help?
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Choose what you need now, or simply explore the different ways we
              care for the life of the home.
            </p>
          </div>

          {/* Mobile: labelled horizontal rail with position cues. Desktop: a
              fixed grid where all six are visible at once. */}
          <p className="mb-3 font-sans text-[11px] tracking-[0.2em] uppercase text-house-stone/70 lg:hidden">
            Swipe for all six
          </p>
          <div className="-mx-[5vw] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[5vw] pb-3 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.title}
                href={d.href}
                className="group flex w-[78vw] shrink-0 snap-start flex-col border border-house-brown/12 bg-house-cream no-underline transition-colors hover:border-house-gold sm:w-[52vw] lg:w-auto"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                  <Image
                    src={d.image}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 1024px) 31vw, 78vw"
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="mb-2 font-sans text-[11px] tracking-[0.18em] uppercase text-house-gold-ink">
                    {d.want}
                  </p>
                  <h3 className="mb-2.5 font-display text-[26px] leading-tight text-house-brown">{d.title}</h3>
                  <p className="mb-6 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{d.line}</p>
                  <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">
                    {d.cta} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular services (v4 §3 module 4) — a curated snapshot of six, with
          the one postcode check this page is allowed. */}
      <section id="popular-services" className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-[620px]">
              <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The Services</p>
              <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
                Practical help, <em>beautifully handled.</em>
              </h2>
              <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
                Book trusted care for the home and garden, or tell the House what
                is happening and we will guide you to the right help.
              </p>
            </div>
            {/* The single postcode / service check on the homepage. */}
            <div className="w-full lg:w-[420px]">
              <HeroServiceFinder />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {POPULAR_SERVICES.map((svc) => (
              <Link
                key={svc.name}
                href={svc.href}
                className="group flex flex-col border border-house-brown/12 bg-house-white no-underline transition-colors hover:border-house-gold"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                  <Image
                    src={svc.image}
                    alt={svc.name}
                    fill
                    sizes="(min-width: 1024px) 31vw, 100vw"
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 bg-house-cream/92 px-2.5 py-1 font-sans text-[11px] tracking-[0.14em] uppercase text-house-brown">
                    {svc.method}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-display text-[21px] leading-tight text-house-brown">{svc.name}</h3>
                  <p className="mb-4 flex-1 font-sans text-[14px] leading-[1.55] text-house-stone">{svc.scope}</p>
                  <p className="mb-1 font-sans text-[15px] text-house-brown">{svc.price}</p>
                  <p className="mb-5 font-sans text-[12px] text-house-stone/80">Available across London and the South East</p>
                  <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">
                    See prices &amp; availability →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-11 grid max-w-[380px] gap-3 sm:max-w-[620px] sm:grid-cols-2">
            <Link href="/services" className={s.btnFilled} style={{ justifyContent: "center", textAlign: "center" }}>
              View all services
            </Link>
            <Link href="/services#help-me-choose" className={s.btnGhost} style={{ justifyContent: "center", textAlign: "center" }}>
              Tell us what you need <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Editorial feature from The Hearth (v4 §3 module 5). Composed like
          an editorial front page: one dominant lead with a large image, then
          secondaries at varied scale. Never a row of interchangeable cards. */}
      <section className="px-[5vw] py-[clamp(52px,6.5vw,100px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 max-w-[640px]">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">From The Hearth</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Notes on the life <em>of the home.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Stories, observations and useful knowledge for the way we live,
              gather, cultivate and care for the places we call home.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
            {/* Lead story — large editorial image, dominant scale. */}
            <Link href={lead.href} className="group flex flex-col no-underline">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-house-cream-dark">
                <Image
                  src={lead.image}
                  alt={lead.alt}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.02]"
                />
              </div>
              <h3 className="mt-6 font-display text-[clamp(24px,2.8vw,38px)] leading-[1.12] text-house-brown transition-colors group-hover:text-house-gold-ink">
                {lead.title}
              </h3>
              {lead.dek ? (
                <p className="mt-3 max-w-[54ch] font-sans text-[16px] leading-[1.6] text-house-stone">{lead.dek}</p>
              ) : null}
              <span className="mt-4 font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink">
                Read the story →
              </span>
            </Link>

            {/* Secondaries — varied scale, stacked against the lead. */}
            <div className="flex flex-col gap-6">
              {secondary.map((story, i) => (
                <Link
                  key={story.title}
                  href={story.href}
                  className={
                    i === 0
                      ? "group flex flex-col no-underline"
                      : "group grid grid-cols-[100px_1fr] items-start gap-4 no-underline sm:grid-cols-[132px_1fr]"
                  }
                >
                  <div
                    className={
                      i === 0
                        ? "relative aspect-[16/9] w-full overflow-hidden bg-house-cream-dark"
                        : "relative aspect-square w-full overflow-hidden bg-house-cream-dark"
                    }
                  >
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 40vw, 100vw" : "132px"}
                      className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className={i === 0 ? "mt-4" : undefined}>
                    <h3
                      className={
                        i === 0
                          ? "font-display text-[22px] leading-tight text-house-brown transition-colors group-hover:text-house-gold-ink"
                          : "font-display text-[18px] leading-tight text-house-brown transition-colors group-hover:text-house-gold-ink"
                      }
                    >
                      {story.title}
                    </h3>
                    {i === 0 && story.dek ? (
                      <p className="mt-2 font-sans text-[15px] leading-[1.55] text-house-stone">{story.dek}</p>
                    ) : null}
                    <span className="mt-2 inline-block font-sans text-[11px] tracking-[0.18em] uppercase text-house-gold-ink">
                      Continue reading →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Subject routes into the archive. */}
          <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-house-brown/12 pt-7">
            <Link href="/the-hearth" className={s.btnGhost}>
              Enter The Hearth <span aria-hidden className={s.arrow}>→</span>
            </Link>
            {[
              { label: "Interiors", href: "/the-hearth/category/interiors-and-styling" },
              { label: "Gardens", href: "/the-hearth/category/gardens-and-exteriors" },
              { label: "Food and hosting", href: "/recipes" },
              { label: "Objects and materials", href: "/the-hearth/category/colour-and-materials" },
            ].map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="font-sans text-[13px] text-house-stone no-underline underline-offset-4 hover:text-house-brown hover:underline"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The House runs on HoWA (v4 §3 module 6) — genuine application
          imagery, practical customer benefits, no tier or membership
          comparison. */}
      <section className="bg-house-forest py-[clamp(56px,7vw,104px)]">
        <div className="mx-auto max-w-[1240px] px-[5vw]">
          <div className="grid gap-[clamp(28px,5vw,72px)] lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-house-gold-light)", margin: "0 0 14px", fontWeight: 500 }}>
                The app behind every booking
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(28px,3.8vw,50px)", lineHeight: 1.08, color: "var(--color-house-cream)", margin: "0 0 20px" }}>
                The House runs on <em>HoWA.</em>
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.65, color: "rgba(245,240,232,0.86)", maxWidth: "56ch", margin: "0 0 28px" }}>
                HoWA is the Home Intelligence app we use to manage every customer
                relationship. Quotes, bookings, appointments, messages,
                photographs, invoices and completed work remain connected to your
                home in one intelligent record.
              </p>

              <div className="grid gap-3 sm:max-w-[420px]">
                <a
                  href="https://accounts.willowalexander.co.uk/"
                  className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110"
                >
                  Open My Home in HoWA <span aria-hidden>→</span>
                </a>
                <Link
                  href="/howa"
                  className="inline-flex items-center justify-center gap-2 border border-house-gold-dark/60 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-gold-ink hover:text-house-brown"
                >
                  See how the House uses HoWA <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                { t: "Quotes and bookings", b: "The price, the scope and the slot, agreed and held in one place." },
                { t: "Appointments and messages", b: "Confirmed times, arrival updates and a direct line to the team coming." },
                { t: "Documents and payments", b: "Invoices, receipts, certificates and warranties, filed against the address." },
                { t: "Your connected Home Record", b: "What has been done, what it cost, and what the home needs next." },
              ].map((f) => (
                <div key={f.t} className="border-t border-house-gold-dark/40 pt-4">
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 19, lineHeight: 1.2, color: "var(--color-house-cream)", margin: "0 0 6px" }}>{f.t}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55, color: "rgba(245,240,232,0.75)", margin: 0 }}>{f.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The "Three ways HoWA works for your home" bands, ported from the
            live howa.co.uk component (V4Bands / three-ways-handover). Full-bleed
            edge to edge: it sits OUTSIDE the max-w content above so the strip
            spans the whole viewport, the one place colour lives, exactly as on
            howa.co.uk. Each tinted cutaway house bleeds off the RIGHT edge and
            dissolves into the band colour via an #RRGGBBAA gradient (fade to the
            SAME colour at zero alpha, ending ~45%, never to `transparent`). Copy
            on the left, straddling pill above. Steward is the anchor with a gold
            name accent. No CTAs on the bands (removed by request); the section's
            own buttons above lead into HoWA. howa-surface opts the pill out of
            the global border-radius:0 reset so it renders round. */}
        <div className="howa-surface relative mt-[clamp(48px,6vw,84px)]">
            {/* Header pill straddling the top boundary of the strip. */}
            <span className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-house-gold/30 bg-house-cream px-7 py-3 font-display text-[clamp(16px,1.6vw,24px)] italic leading-none text-house-brown shadow-[0_10px_28px_-12px_rgba(60,40,15,0.4)]">
              Three ways HoWA works for your home.
            </span>

            <div className="flex snap-x snap-mandatory overflow-x-auto bg-[#1d2a40] [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
              {[
                { num: "I", name: "Free", tagline: "The house, seen.", desc: "Awareness, and what to do about it.", points: ["Instant address portrait", "Ask HoWA", "Repair, garden & room scans"], bg: "#5f6a49", image: "tier-band-assistant-v2" },
                { num: "II", name: "Housekeeper", tagline: "The house, in order.", desc: "Every detail. Every task. Perfectly handled.", points: ["Full logbook", "Maintenance & garden calendar", "Renewal & warranty reminders"], bg: "#b56a5c", image: "tier-band-housekeeper-v3" },
                { num: "III", name: "Steward", tagline: "The house, protected before failure.", desc: "Intelligence and control, before things go wrong.", points: ["HoWA Score & risk register", "Predictive maintenance", "Sensor & smart-meter interpretation"], bg: "#1d2a40", image: "tier-band-steward-v2", accent: "#c5a960" },
              ].map((m) => (
                <article
                  key={m.name}
                  className="relative min-h-[420px] w-[88%] shrink-0 snap-center overflow-hidden text-[#f3ede0] transition-transform duration-[420ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:z-20 hover:scale-[1.025] lg:-ml-px lg:min-h-[clamp(440px,42vw,560px)] lg:w-auto lg:first:ml-0"
                  style={{ background: m.bg }}
                >
                  {/* House fills the right side and bleeds off the edge. */}
                  <div className="absolute inset-y-0 right-0 w-[58%] opacity-95" style={{ background: m.bg }}>
                    <Image
                      src={`/home-v4/${m.image}.webp`}
                      alt={`${m.name} mode, a cutaway Georgian house.`}
                      fill
                      sizes="(max-width: 1024px) 60vw, 22vw"
                      className="object-cover object-left"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to right, ${m.bg} 0%, ${m.bg}00 45%)` }}
                    />
                  </div>

                  {/* Copy */}
                  <div className="relative z-10 flex h-full max-w-[62%] flex-col px-7 py-9 lg:px-8 lg:py-11">
                    <div className="mb-4 flex items-baseline gap-3">
                      <span className="font-display text-[27px] italic leading-none text-[#f3ede0]/70">{m.num}.</span>
                      <h3 className="font-display text-[clamp(23px,1.8vw,30px)] leading-[1.05]">
                        <span className="italic" style={m.accent ? { color: m.accent } : undefined}>{m.name}</span>
                      </h3>
                    </div>
                    <p className="mb-4 mt-1 font-display text-[clamp(18px,1.5vw,23px)] italic text-[#f3ede0]">{m.tagline}</p>
                    <p className="mb-6 max-w-[230px] font-sans text-[16px] leading-[1.5] text-[#f3ede0]/95">{m.desc}</p>
                    <ul className="mb-7 list-none space-y-2 p-0">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 font-sans text-[15.5px] text-[#f3ede0]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#f3ede0]/70" aria-hidden>
                            <circle cx="12" cy="12" r="9" />
                            <path d="M8.5 12.5l2.5 2.5 4.5-5" />
                          </svg>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
      </section>

      {/* 7. Design (v4 §3 module 7) — interior and garden together, keeping the
          distinction between HoWA mapping and human continuation. */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Design</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Design begins with <em>a clearer understanding.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              The room or garden is first scanned and mapped in HoWA. You receive
              an initial design direction and an indicative budget. From there the
              work continues with a named human designer.
            </p>
          </div>
          {/* AI Design · Powered by HoWA — the live scan-to-design animation
              (the same one at /design/sample) shown inline, so the promise is
              demonstrated on the homepage rather than only described. */}
          <div className="mb-12">
            <p className="mb-4 text-center font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
              AI Design · Powered by HoWA
            </p>
            <SampleDesignShowcase />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { title: "Interior Design", body: "Scan the room and see a first direction before the first consultation. Continued by Delve Interiors.", href: "/design/interiors", image: "/design/interiors/project-bedroom.webp", cta: "Explore Interior Design" },
              { title: "Garden Design", body: "Map the garden for a first concept and an indicative budget before the full plan. Continued by Willow Alexander Gardens.", href: "/design/gardens", image: "/design/gardens/projects/contemporary-tiered-garden-design/01.webp", cta: "Explore Garden Design" },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="group flex flex-col border border-house-brown/12 bg-house-white no-underline transition-colors hover:border-house-gold">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                  <Image src={card.image} alt={card.title} fill sizes="(min-width: 768px) 44vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="mb-2 font-display text-[24px] leading-tight text-house-brown">{card.title}</h3>
                  <p className="mb-6 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{card.body}</p>
                  <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">{card.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Insurance (v4 §3 module 8) — two immediate choices, each with its
          own image, explanation and dedicated page. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-10 max-w-[660px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Insurance</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Protection for home <em>and those who live there.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              The House introduces you to an authorised partner. The regulated
              advice, the quotation and the policy come from them, not from us.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Home Insurance",
                body: "For period homes, non-standard construction, valuable contents and households that do not fit a comparison-site form.",
                href: "/insurance/home",
                cta: "Explore Home Insurance",
                image: "/home-v4/protect-insurance.webp",
                alt: "An Edwardian London townhouse at golden hour",
                pos: "center",
              },
              {
                title: "Pet Insurance",
                body: "For dogs, cats and the animals that make a house a home. Lifetime, time-limited and accident-only cover explained plainly.",
                href: "/insurance/pet",
                cta: "Explore Pet Insurance",
                image: "/services/subbrands/dog-walking.webp",
                alt: "A dog lead, waste-bag holder and travel bowl laid out on a wooden table",
                pos: "bottom",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex flex-col border border-house-brown/12 bg-house-cream no-underline transition-colors hover:border-house-gold"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                  <Image src={card.image} alt={card.alt} fill sizes="(min-width: 768px) 44vw, 100vw" style={{ objectPosition: card.pos }} className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="mb-2 font-display text-[24px] leading-tight text-house-brown">{card.title}</h3>
                  <p className="mb-6 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{card.body}</p>
                  <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">
                    {card.cta} →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-[70ch] text-center font-sans text-[12px] leading-[1.5] text-house-stone/80">
            House of Willow Alexander is an introducer only and does not provide,
            arrange or advise on insurance. Cover is arranged and provided by an
            authorised, FCA-regulated insurance partner.
          </p>
        </div>
      </section>

      {/* 9. The Shop (v4 §3 module 9) — an edited retail world: a seasonal edit
          and a small number of strong products. */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-[560px]">
              <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The Shop</p>
              <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
                Chosen for <em>the House.</em>
              </h2>
              <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
                Useful and beautiful things for the work and pleasure of keeping
                a home. Every object earns its place.
              </p>
            </div>
            <Link href="/shop" className={s.btnGhost}>
              Shop the House <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>

          {/* The seasonal edit: three rooms. */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SHOP_EDIT.map((r) => (
              <Link
                key={r.handle}
                href={`/shop/collections/${r.handle}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-house-cream-dark no-underline"
              >
                <Image src={r.image} alt={r.name} fill sizes="(min-width: 640px) 31vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]" />
                <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,19,13,0.72), rgba(26,19,13,0.05) 55%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                  <p className="font-display text-[clamp(18px,1.8vw,26px)] leading-[1.1] text-white">{r.name}</p>
                  <p className="mt-1.5 font-sans text-[12px] tracking-[0.2em] uppercase text-white/80 transition-colors group-hover:text-white">
                    Shop the room →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* A small number of strong products. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {marketCards.map((p) => (
              <Link key={p.name} href={p.href} className={s.productCard}>
                <div className={s.productImg}>
                  {p.image ? <Image src={p.image} alt={p.name} fill sizes="(min-width: 640px) 31vw, 100vw" /> : null}
                </div>
                <div className={s.productBody}>
                  <p className={s.productName}>{p.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Why the House (v4 §3 module 10) — proof, not manifesto. Real
           photography of real crews, alongside the plain facts. */}
      <section className="bg-house-forest px-[5vw] py-[clamp(52px,7vw,104px)]">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-center" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-house-gold-light)", margin: "0 0 14px", fontWeight: 500 }}>
            Why the House
          </p>
          <h2 className="text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(26px,3.6vw,44px)", lineHeight: 1.1, color: "var(--color-house-cream)", margin: "0 0 clamp(28px,4vw,52px)" }}>
            Real people, real standards, <em>one remembered home.</em>
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {[
              { src: "/services/photos/vans/asher-349.webp", alt: "A liveried House of Willow Alexander electric van" },
              { src: "/services/photos/gardening/lawn-care-work.webp", alt: "A House gardener mowing a lawn in a walled garden" },
              { src: "/services/photos/window-cleaning/gutter-cleaning-work.webp", alt: "A House gutter cleaner guiding a reach-and-vac pole up to the roofline" },
              { src: "/services/photos/cleaning/regular-cleaning-work.webp", alt: "A House cleaner in Willow Alexander livery wiping down a kitchen worktop" },
            ].map((t) => (
              <div key={t.src} className="relative aspect-[4/5] overflow-hidden bg-house-forest">
                <Image src={t.src} alt={t.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>

          <dl className="mt-[clamp(32px,4.5vw,56px)] grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF_POINTS.map((p) => (
              <div key={p.k} className="border-t border-house-gold-dark/40 pt-4">
                <dt className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-light">{p.k}</dt>
                <dd className="m-0 mt-2 font-sans text-[14px] leading-[1.6] text-[rgba(245,240,232,0.82)]">{p.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-[clamp(28px,4vw,48px)] flex justify-center">
            <Link
              href="/the-house/how-we-choose"
              className="inline-flex items-center justify-center gap-2 border border-house-gold-dark/60 px-9 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-gold-ink hover:text-house-brown"
            >
              How we choose the people who care for your home <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. The founders and House story (v4 §3 module 11) — humanity and
           provenance, without repeating the About page.

           PHOTOGRAPHY GAP: v4 asks for genuine photography of Samuel and Alex
           here. No founder portraits exist in the repo yet, and v3 §7 forbids
           substituting generated people or stock, so the origin photograph is
           used until they land. */}
      <section className="px-[5vw] py-[clamp(52px,6.5vw,100px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-[clamp(28px,4.5vw,64px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
            <Image
              src="/home/origin-studio.webp"
              alt="The original Willow Alexander garden studio: soil, seasons and a single electric van"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The founders</p>
            <h2 className="mb-5 font-display text-[clamp(26px,3.2vw,42px)] leading-[1.08] text-house-brown">
              Samuel Collett and <em>Alexander Lloyd Oakley.</em>
            </h2>
            <p className="mb-4 max-w-[56ch] font-sans text-[16px] leading-[1.7] text-house-stone">
              House of Willow Alexander began with the practical care of real
              homes and gardens. That work revealed how fragmented the experience
              of looking after a home had become.
            </p>
            <p className="mb-7 max-w-[56ch] font-sans text-[16px] leading-[1.7] text-house-stone">
              HoWA was created in response, and today the House uses it to give
              customers a more connected way to book, understand and care for
              their homes.
            </p>
            <Link href="/the-house/about" className={s.btnGhost}>
              Our story <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Final chooser (v4 §3 module 12) — one simple decision, four ways
           to act. */}
      <section className={s.closing}>
        <FlowerWatermark color="white" side="right" opacity={0.14} />
        <p className={s.closingStatement}>
          What does your home <em>need next?</em>
        </p>
        <div className="mx-auto mt-8 grid w-full max-w-[380px] gap-3 sm:max-w-[760px] sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/services" className={s.btnFilled} style={{ justifyContent: "center", textAlign: "center" }}>
            Find a<br />service
          </Link>
          <Link href="#house-help" className={s.btnGhostDark} style={{ justifyContent: "center", textAlign: "center" }}>
            Explore the House
          </Link>
          <a href="tel:08000478738" className={s.btnGhostDark} style={{ justifyContent: "center", textAlign: "center" }}>
            Call the House
          </a>
          <a href="https://accounts.willowalexander.co.uk/" className={s.btnGhostDark} style={{ justifyContent: "center", textAlign: "center" }}>
            Open My Home in HoWA
          </a>
        </div>
      </section>
    </div>
  );
}
