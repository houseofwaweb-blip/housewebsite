import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";
import { Accordion } from "@/components/primitives/Accordion";
import { Gallery, type GalleryImage } from "@/components/primitives/Gallery";
import { PartnerCarousel, type PartnerTile } from "./PartnerCarousel";
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

const PLACEHOLDER_PARTNERS: Record<string, PartnerTile[]> = {
  gardening: [
    { name: "Willow Alexander Gardens", subtitle: "London & Home Counties", houseApproved: true, href: "/partners/willow-alexander-gardens" },
    { name: "GreenThumb London", subtitle: "Lawn & hedge specialists" },
    { name: "Heritage Tree Care", subtitle: "Arboriculture" },
    { name: "The Plant People", subtitle: "Seasonal planting" },
  ],
  "window-cleaning": [
    { name: "ClearView London", subtitle: "Pure-water pole specialists" },
    { name: "Federation-certified", subtitle: "FWC members" },
    { name: "Shine Brigade", subtitle: "Residential & commercial" },
  ],
  cleaning: [
    { name: "House Standard Cleaning", subtitle: "Weekly & fortnightly" },
    { name: "Pristine London", subtitle: "Deep clean specialists" },
    { name: "Green Clean Co.", subtitle: "Eco-friendly products" },
  ],
  "gutter-cleaning": [
    { name: "TopDown Maintenance", subtitle: "Vacuum-pole gutter care" },
    { name: "Roofline Pro", subtitle: "Gutters, fascias, soffits" },
  ],
};

export function ServiceDetail({ service: s }: { service: Service }) {
  const partnerName = {
    gardening: "gardeners",
    "window-cleaning": "window cleaners",
    cleaning: "cleaners",
    "gutter-cleaning": "gutter specialists",
  }[s.slug] ?? "partners";

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
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-house-stone"
              >
                {badge}
              </span>
            ))}
          </div>
        </section>
      ) : null}

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

      {/* 4. Sub-services grid */}
      {s.subServices.length > 0 ? (
        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto">
            <Eyebrow>Our {s.name.toLowerCase()} services</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-10 max-w-[24ch]">
              Everything under <em>{s.name.toLowerCase()}</em>.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {s.subServices.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/services/${s.slug}/${sub.slug}`}
                  className="group flex flex-col bg-white border border-house-brown/12 p-6 no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5 hover:border-house-gold"
                >
                  <h3 className="font-display font-medium text-[22px] leading-[1.2] text-house-brown group-hover:text-house-gold transition-colors duration-[var(--t-slow)] ease-out mb-2">
                    {sub.name}
                  </h3>
                  <p className="font-sans italic text-[15px] leading-[1.55] text-house-stone">
                    {sub.lede}
                  </p>
                  <span className="mt-auto pt-4 font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold">
                    See detail →
                  </span>
                </Link>
              ))}
            </div>
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

      {/* 5. Meet our partners */}
      <PartnerCarousel
        heading={`Meet our ${partnerName}.`}
        headingEm="House Approved and vetted."
        lede={`Every ${partnerName.slice(0, -1)} who works through the House has been vetted, insured, and meets the standard we\u2019d hold ourselves to. The marketplace is growing.`}
        partners={PLACEHOLDER_PARTNERS[s.slug] ?? []}
      />

      {/* 6. Packages */}
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[1200px] mx-auto">
          <Eyebrow>Packages</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.8vw,42px)] leading-[1.15] mt-3 mb-10 max-w-[24ch]">
            How we price <em>{s.name.toLowerCase()}</em>.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {s.packages.map((pkg) => (
              <div
                key={pkg.slug}
                className={`relative border p-8 flex flex-col ${
                  pkg.tier === "steward"
                    ? "bg-howa-navy text-house-cream border-house-gold/30"
                    : "bg-white border-house-brown/10"
                }`}
              >
                <div
                  className={`font-sans text-[10px] tracking-[0.22em] uppercase mb-2 ${
                    pkg.tier === "steward" ? "text-house-gold-light" : "text-house-gold"
                  }`}
                >
                  {pkg.tier === "steward"
                    ? "Steward plan"
                    : pkg.tier === "care"
                      ? "Care plan"
                      : "One-off"}
                </div>
                <h3
                  className={`font-display font-medium text-[24px] leading-[1.2] mb-1 ${
                    pkg.tier === "steward" ? "text-house-cream" : "text-house-brown"
                  }`}
                >
                  {pkg.name}
                </h3>
                <div
                  className={`font-display text-[22px] mb-4 ${
                    pkg.tier === "steward" ? "text-house-cream/85" : "text-house-brown/85"
                  }`}
                >
                  {pkg.price}
                </div>
                {pkg.bestFor ? (
                  <p
                    className={`font-sans italic text-[14px] leading-[1.5] mb-4 ${
                      pkg.tier === "steward" ? "text-house-cream/65" : "text-house-stone"
                    }`}
                  >
                    Best for {pkg.bestFor}.
                  </p>
                ) : null}
                <ul className="flex flex-col gap-2 flex-1 mb-6">
                  {pkg.inclusions.map((inc) => (
                    <li
                      key={inc}
                      className={`relative pl-4 font-sans text-[14px] leading-[1.55] before:content-['—'] before:absolute before:left-0 ${
                        pkg.tier === "steward"
                          ? "text-house-cream/85 before:text-house-gold-light"
                          : "text-house-brown/90 before:text-house-gold"
                      }`}
                    >
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {pkg.cta === "waitlist" ? (
                    <StateBadge state="interest">Register interest</StateBadge>
                  ) : (
                    <Link
                      href={`/book-consultation?service=${s.slug}&package=${pkg.slug}`}
                      className={`inline-block font-sans text-[11px] tracking-[0.18em] uppercase px-5 py-3 no-underline transition-all duration-[var(--t-base)] ease-out ${
                        pkg.tier === "steward"
                          ? "text-house-cream border border-house-cream/45 hover:bg-house-cream hover:text-house-brown"
                          : "text-house-brown border border-house-brown/80 hover:bg-house-brown hover:text-house-cream"
                      }`}
                    >
                      {pkg.cta === "quoteEntry" ? "Get a quote" : "Book now"}
                    </Link>
                  )}
                </div>
              </div>
            ))}
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
