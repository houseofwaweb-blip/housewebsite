import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";
import { Accordion } from "@/components/primitives/Accordion";
import { Gallery, type GalleryImage } from "@/components/primitives/Gallery";
import { PartnerCarousel, type PartnerCardData } from "./PartnerCarousel";
import type { Service } from "@/lib/services-data";
import { SERVICE_AREAS } from "@/lib/services-data/sub-services";

/**
 * ServiceDetail — top-level service page template.
 * Spec: variant-A Four Disciplines + WP /service/{slug}/ content patterns.
 *
 * Sections (in order):
 *   1. Hero — headline + lede + two CTAs
 *   2. Trust strip — accreditation badges
 *   3. What we do — included + how-it-works
 *   4. Sub-services grid — cards to child pages
 *   5. Meet our partners — horizontal carousel
 *   6. Packages — pricing ladder
 *   7. FAQ — accordion
 *   8. Service areas
 *   9. Closing CTA
 */

const SANITY_CDN = "https://cdn.sanity.io/images/a9t8u8nh/production";

/** Map sub-service keys to Sanity CDN image URLs */
const SUB_SERVICE_IMAGES: Record<string, string> = {
  "gardening/lawn-care": `${SANITY_CDN}/027700c20d7a27faacb0dbdf0786e58a24d410f2-1280x1920.jpg?w=680&h=510&fit=crop&auto=format`,
  "gardening/hedge-trimming": `${SANITY_CDN}/5e7c5edb601a265b8ffaa2524a6077ca154549f1-800x1200.jpg?w=680&h=510&fit=crop&auto=format`,
  "gardening/planting": `${SANITY_CDN}/58a9482699c396a1a5aec3c7437289600b44483e-1200x800.jpg?w=680&h=510&fit=crop&auto=format`,
  "gardening/seasonal-care": `${SANITY_CDN}/af45facea4d6320a56b52c75b39083cc92191ee9-959x1200.jpg?w=680&h=510&fit=crop&auto=format`,
  "gardening/garden-clearance": `${SANITY_CDN}/af45facea4d6320a56b52c75b39083cc92191ee9-959x1200.jpg?w=680&h=510&fit=crop&auto=format`,
  "gardening/lawn-treatment": `${SANITY_CDN}/cef7faeec075e5dec3991ebdb49ec985a4c9b14f-933x1400.jpg?w=680&h=510&fit=crop&auto=format`,
  "gardening/turfing": `${SANITY_CDN}/cef7faeec075e5dec3991ebdb49ec985a4c9b14f-933x1400.jpg?w=680&h=510&fit=crop&auto=format`,
  "gardening/tree-surgery": `${SANITY_CDN}/5e7c5edb601a265b8ffaa2524a6077ca154549f1-800x1200.jpg?w=680&h=510&fit=crop&auto=format`,
  "gardening/pressure-washing": `${SANITY_CDN}/1a8ab322bd3023e504522b9adb90dfd4ffa35e9c-1400x933.jpg?w=680&h=510&fit=crop&auto=format`,
  "gardening/fencing": `${SANITY_CDN}/1a8ab322bd3023e504522b9adb90dfd4ffa35e9c-1400x933.jpg?w=680&h=510&fit=crop&auto=format`,
};

const PLACEHOLDER_GALLERY: Record<string, GalleryImage[]> = {
  gardening: [
    { src: `${SANITY_CDN}/027700c20d7a27faacb0dbdf0786e58a24d410f2-1280x1920.jpg?w=800&auto=format`, alt: "Gardener mowing alongside a beautiful herbaceous border in golden evening light", caption: "London · 2025" },
    { src: `${SANITY_CDN}/58a9482699c396a1a5aec3c7437289600b44483e-1200x800.jpg?w=800&auto=format`, alt: "Gardener planting in a lush mixed border with topiary and perennials", caption: "SW London · 2025" },
    { src: `${SANITY_CDN}/1a8ab322bd3023e504522b9adb90dfd4ffa35e9c-1400x933.jpg?w=800&auto=format`, alt: "Two Willow Alexander gardeners with the branded van outside a Tudor home", caption: "Home Counties · 2025" },
    { src: `${SANITY_CDN}/cef7faeec075e5dec3991ebdb49ec985a4c9b14f-933x1400.jpg?w=800&auto=format`, alt: "Gardener with leaf blower on a large estate lawn under mature trees", caption: "Estate grounds · 2024" },
    { src: `${SANITY_CDN}/5e7c5edb601a265b8ffaa2524a6077ca154549f1-800x1200.jpg?w=800&auto=format`, alt: "Gardener trimming hedges with professional equipment in dappled light", caption: "London · 2024" },
    { src: `${SANITY_CDN}/af45facea4d6320a56b52c75b39083cc92191ee9-959x1200.jpg?w=800&auto=format`, alt: "Autumn garden clearance — collecting leaves on a pristine lawn with hydrangeas", caption: "London · Autumn 2024" },
  ],
  "window-cleaning": [
    { src: "/partners/project-1.jpg", alt: "Georgian sash restoration clean", caption: "Notting Hill · 2025" },
    { src: "/partners/project-3.jpg", alt: "Full-house exterior clean", caption: "Chelsea · 2024" },
    { src: "/partners/project-5.jpg", alt: "Commercial frontage clean", caption: "Fulham · 2024" },
  ],
  cleaning: [
    { src: "/partners/project-2.jpg", alt: "End-of-tenancy deep clean", caption: "Kensington · 2025" },
    { src: "/partners/project-4.jpg", alt: "Post-renovation dust removal", caption: "Hampstead · 2024" },
    { src: "/partners/project-6.jpg", alt: "Seasonal spring clean", caption: "Dulwich · 2024" },
  ],
  "gutter-cleaning": [
    { src: "/partners/project-1.jpg", alt: "Vacuum-pole gutter clear", caption: "Bromley · 2025" },
    { src: "/partners/project-5.jpg", alt: "Before and after — fascia and gutter", caption: "Blackheath · 2024" },
    { src: "/partners/project-3.jpg", alt: "Downpipe inspection", caption: "Greenwich · 2024" },
  ],
};

const PLACEHOLDER_PARTNERS: Record<string, PartnerCardData[]> = {
  gardening: [
    { slug: "willow-alexander-gardens", name: "Willow Alexander Gardens", type: "design-studio", shortBio: "Planting schemes and landscapes rooted in the garden's existing character.", specialties: ["Naturalistic planting", "Seasonal plans"], houseApprovedSeal: true },
    { slug: "greenthumb-london", name: "GreenThumb London", type: "craftsman", shortBio: "Lawn and hedge specialists. Weekly and seasonal.", specialties: ["Lawn care", "Hedging"] },
    { slug: "heritage-tree-care", name: "Heritage Tree Care", type: "craftsman", shortBio: "Arboriculture and canopy management.", specialties: ["Tree surgery", "Crown reduction"] },
    { slug: "the-plant-people", name: "The Plant People", type: "craftsman", shortBio: "Seasonal planting and container schemes.", specialties: ["Planting", "Containers"] },
  ],
  "window-cleaning": [
    { slug: "clearview-london", name: "ClearView London", type: "craftsman", shortBio: "Pure-water pole specialists. Up to four storeys.", specialties: ["Residential", "Commercial"] },
    { slug: "federation-certified", name: "Federation-certified", type: "craftsman", shortBio: "FWC members. Insured and vetted.", specialties: ["FWC"] },
    { slug: "shine-brigade", name: "Shine Brigade", type: "craftsman", shortBio: "Residential and commercial window care.", specialties: ["Interior", "Exterior"] },
  ],
  cleaning: [
    { slug: "house-standard-cleaning", name: "House Standard Cleaning", type: "craftsman", shortBio: "Weekly and fortnightly domestic care.", specialties: ["Domestic", "Weekly"] },
    { slug: "pristine-london", name: "Pristine London", type: "craftsman", shortBio: "Deep clean specialists. End-of-tenancy and seasonal.", specialties: ["Deep clean"] },
    { slug: "green-clean-co", name: "Green Clean Co.", type: "craftsman", shortBio: "Eco-friendly products and methods.", specialties: ["Eco-friendly"] },
  ],
  "gutter-cleaning": [
    { slug: "topdown-maintenance", name: "TopDown Maintenance", type: "craftsman", shortBio: "Vacuum-pole gutter care and inspection.", specialties: ["Vacuum-pole"] },
    { slug: "roofline-pro", name: "Roofline Pro", type: "craftsman", shortBio: "Gutters, fascias, and soffits.", specialties: ["Fascias", "Soffits"] },
  ],
};

export function ServiceDetail({ service: s }: { service: Service }) {
  const partnerName = ({
    gardening: "gardeners",
    "window-cleaning": "window cleaners",
    cleaning: "cleaners",
    "gutter-cleaning": "gutter specialists",
    handyman: "handypeople",
    removals: "movers",
  } as Record<string, string>)[s.slug] ?? "partners";

  return (
    <article className="bg-house-cream text-house-brown">
      {/* 1. Hero — full-bleed if heroImage, text-only otherwise */}
      {s.heroImage ? (
        <section className="relative min-h-[85vh] flex items-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.heroImage}
            alt={s.headline}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 px-[5vw] pb-[8vh] max-w-[880px]">
            <span className="block mb-4 font-sans text-[11px] tracking-[0.22em] uppercase text-white/70">
              {s.eyebrow}
            </span>
            <h1 className="font-display font-medium text-[clamp(44px,7vw,84px)] leading-[1.02] tracking-[-0.015em] text-white">
              {s.headline}
            </h1>
            <p className="font-sans text-[17px] leading-[1.65] text-white/80 mt-6 max-w-[56ch]">
              {s.lede}
            </p>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Link
                href={`/book-consultation?service=${s.slug}`}
                className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
              >
                Book {s.name.toLowerCase()}
              </Link>
              <Link
                href="/api/howa-bounce?source=service-hero"
                className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white border border-white/50 px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-white hover:text-house-brown"
              >
                Start a plan
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="px-[5vw] pt-[12vh] pb-14">
          <div className="max-w-[980px] mx-auto">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
              {s.headline}
            </h1>
            <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[58ch]">
              {s.lede}
            </p>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Link
                href={`/book-consultation?service=${s.slug}`}
                className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
              >
                Book {s.name.toLowerCase()}
              </Link>
              <Link
                href="/api/howa-bounce?source=service-hero"
                className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown border border-house-brown px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-brown hover:text-house-cream"
              >
                Start a plan
              </Link>
              {s.recurring ? <StateBadge state="live">Steward-ready</StateBadge> : null}
            </div>
          </div>
        </section>
      )}

      {/* 2. Trust strip */}
      {s.trustBadges.length > 0 ? (
        <section className="bg-house-white border-t border-b border-house-brown/10 px-[5vw] py-6">
          <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-8 text-center">
            {s.trustBadges.map((badge) => (
              <span
                key={badge}
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-house-brown/50"
              >
                {badge}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* 2b. Partners — moved up, dark band */}
      <PartnerCarousel
        heading={`Meet our ${partnerName}.`}
        headingEm={partnerName + "."}
        lede={`Every ${partnerName.slice(0, -1)} who works through the House has been vetted, insured, and meets the standard we'd hold ourselves to.`}
        partners={PLACEHOLDER_PARTNERS[s.slug] ?? []}
        dark
      />

      {/* 3. What we do */}
      <section className="px-[5vw] py-16 bg-white border-b border-house-brown/10">
        <div className="max-w-[980px] mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <Eyebrow>What&apos;s included</Eyebrow>
            <h2 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-6">
              Every visit.
            </h2>
            <ul className="flex flex-col gap-2.5">
              {s.sections.included.map((inc) => (
                <li
                  key={inc}
                  className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                >
                  {inc}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-6">
              From first message to first visit.
            </h2>
            <ol className="flex flex-col gap-4">
              {s.sections.how.map((step, i) => (
                <li key={step} className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
                  <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[16px] leading-[1.55] text-house-brown/90">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Sub-services — horizontal scroll carousel with images */}
      {s.subServices.length > 0 ? (
        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto">
            <Eyebrow>Our {s.name.toLowerCase()} services</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-10 max-w-[24ch]">
              Everything under <em>{s.name.toLowerCase()}</em>.
            </h2>
          </div>
          <div
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-[5vw] px-[5vw]"
            style={{ scrollbarWidth: "none" }}
          >
            {s.subServices.map((sub) => {
              const img = SUB_SERVICE_IMAGES[`${s.slug}/${sub.slug}`];
              return (
                <Link
                  key={sub.slug}
                  href={`/services/${s.slug}/${sub.slug}`}
                  className="group flex-none w-[80vw] sm:w-[340px] snap-start bg-white border border-house-brown/10 overflow-hidden no-underline flex flex-col transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(48,35,28,0.08)] hover:border-[var(--house-gold-dark)]"
                >
                  {img ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={sub.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-howa-paper flex items-center justify-center">
                      <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-house-brown/25">{sub.name}</span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-medium text-[22px] leading-[1.2] text-house-brown mb-2 transition-colors duration-[var(--t-slow)] group-hover:text-[var(--house-gold-dark)]">
                      {sub.name}
                    </h3>
                    <p className="font-sans text-[14px] leading-[1.55] text-house-brown/70 flex-1">
                      {sub.lede}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.16em] uppercase" style={{ color: "var(--house-gold-dark)" }}>
                      See detail
                      <span className="inline-block transition-transform duration-[var(--t-slow)] ease-out group-hover:translate-x-2">&rarr;</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* 4b. Gallery — recent work */}
      <section className="px-[5vw] pb-16">
        <div className="max-w-[1280px] mx-auto">
          <Eyebrow>Recent work</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-8">
            From the <em>field</em>.
          </h2>
          <Gallery
            images={PLACEHOLDER_GALLERY[s.slug] ?? PLACEHOLDER_GALLERY.gardening}
            columns={3}
            aspectRatio="4/3"
          />
        </div>
      </section>

      {/* 5. Booking — two-block CTA (replaces old packages grid) */}
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6">
          {/* One-off booking via HoWA */}
          <div className="bg-white border border-house-brown/10 p-10 flex flex-col">
            <span className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: "var(--house-gold-dark)" }}>
              One-off &amp; pay-as-you-go
            </span>
            <h3 className="font-display font-medium text-[clamp(24px,3vw,32px)] leading-[1.15] text-house-brown mb-4">
              Book one-off care through HoWA.
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-8 flex-1">
              Single visits, seasonal jobs, or a one-off tidy. Book through HoWA and the work is logged to your home record. No subscription required.
            </p>
            <Link
              href={`/book-consultation?service=${s.slug}`}
              className="inline-block self-start font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Book {s.name.toLowerCase()}
            </Link>
          </div>

          {/* Subscriptions via Steward */}
          <div className="bg-howa-navy text-house-cream border border-house-gold/30 p-10 flex flex-col"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent 0 39px, rgba(184,148,62,0.04) 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, rgba(184,148,62,0.04) 39px 40px)",
            }}
          >
            <span className="block font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-light mb-4">
              Recurring care
            </span>
            <h3 className="font-display font-medium text-[clamp(24px,3vw,32px)] leading-[1.15] text-house-cream mb-4">
              Subscriptions only available through Steward.
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-cream/70 mb-8 flex-1">
              Weekly, fortnightly, or seasonal {s.name.toLowerCase()} plans are managed through HoWA Steward. One invoice, one contact, one system that remembers.
            </p>
            <Link
              href="/howa/steward"
              className="inline-block self-start font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream border border-house-cream/45 px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-cream hover:text-house-brown"
            >
              Learn about Steward
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      {s.faq.length > 0 ? (
        <section className="bg-house-white px-[5vw] py-[72px] border-t border-house-brown/10">
          <div className="max-w-[760px] mx-auto">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-8">
              Before you <em>book</em>.
            </h2>
            <Accordion
              items={s.faq.map((f, i) => ({
                id: `faq-${i}`,
                summary: f.q,
                body: <p>{f.a}</p>,
              }))}
            />
          </div>
        </section>
      ) : null}

      {/* 8. Service areas */}
      <section className="px-[5vw] py-14 bg-house-brown text-house-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-3 font-sans">
            Where we work
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-[16px] text-house-cream/90">
            {SERVICE_AREAS.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
          <p className="mt-6 font-sans italic text-[14px] text-house-cream/60">
            Not listed? <Link href="/contact" className="underline underline-offset-4 decoration-house-gold-light">Write to us.</Link> We're expanding.
          </p>
        </div>
      </section>

      {/* 9. Closing CTA */}
      <section className="bg-house-cream px-[5vw] py-[72px] text-center border-t border-house-brown/10">
        <p className="mx-auto max-w-[640px] mb-7 font-sans italic text-[22px] leading-[1.35] text-house-brown">
          A well-kept home starts with one conversation.
        </p>
        <Link
          href={`/book-consultation?service=${s.slug}`}
          className="inline-block px-[30px] py-[15px] font-sans text-[13px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Book a consultation
        </Link>
      </section>
    </article>
  );
}
