import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { Accordion } from "@/components/primitives/Accordion";
import { Gallery, type GalleryImage } from "@/components/primitives/Gallery";
import type { Service } from "@/lib/services-data";
import { getQuotePractical } from "@/lib/services-data/requestable-detail";
import { CoverageMap } from "@/components/house/CoverageMap";
import s from "./ServiceDetail.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { ServiceCtaRow } from "@/components/marketing/ServiceCtaRow";

const PUBLIC = path.join(process.cwd(), "public");
/**
 * `service-placeholder.webp` is a photograph of a handwritten "Coming Soon"
 * card. Every service in the catalogue is open for business, so that image
 * must never be served as a hero. It is kept only as the last-resort fallback
 * for a sub-service tile whose photograph is genuinely missing, where the
 * alternative is a broken image.
 */
const COMING_SOON = "/services/service-placeholder.webp";
/** Neutral House hero for anything without its own photography. */
const PLACEHOLDER_HERO = "/services/subbrands/handyman.webp";
const PLACEHOLDER_GALLERY = COMING_SOON;

function fileOr(localPath: string | undefined, fallback: string) {
  if (!localPath) return fallback;
  if (localPath.startsWith("http")) return localPath;
  const abs = path.join(PUBLIC, localPath.replace(/^\//, ""));
  try {
    return fs.existsSync(abs) ? localPath : fallback;
  } catch {
    return fallback;
  }
}

/** Splits a headline at `em` and italicises the tail in the lander-framework
 *  gold-italic style. If `em` is missing or absent from `text`, renders plain. */
function withEm(text: string, em?: string) {
  if (!em || !text.includes(em)) return text;
  const [head, ...rest] = text.split(em);
  return (
    <>
      {head}
      <em>{em}</em>
      {rest.join(em)}
    </>
  );
}

/**
 * ServiceDetail — top-level service page template, lander framework.
 *
 * Section order:
 *   1. Hero — full-bleed image with scrim OR text-only
 *   2. Trust strip
 *   3. Partner carousel (dark)
 *   4. What's included + How it works (2-column)
 *   5. Sub-services — horizontal scroll-snap carousel
 *   6. Gallery — recent work
 *   7. Booking — two-block CTA (one-off vs Steward)
 *   8. FAQ — accordion
 *   9. Service areas — brown band
 *  10. Closing CTA
 */

/** Sub-service tile images on the parent service's horizontal scroller.
 *  Resolution order: this map → /services/photos/{parent}/{sub}-hero.webp → placeholder. */
const SUB_SERVICE_IMAGES: Record<string, string> = {};

const PLACEHOLDER_GALLERY_BY_SERVICE: Record<string, GalleryImage[]> = {
  gardening: [
    { src: "/services/photos/gardening-gallery-1.webp", alt: "Gardener mowing alongside a herbaceous border in golden evening light", caption: "London · 2025" },
    { src: "/services/photos/gardening-gallery-2.webp", alt: "Gardener planting in a lush mixed border", caption: "SW London · 2025" },
    { src: "/services/photos/gardening-gallery-3.webp", alt: "Lawn detail with mature trees", caption: "Home Counties · 2025" },
  ],
  "window-cleaning": [
    { src: "/services/photos/window-cleaning-gallery-1.webp", alt: "Pure water pole on sash window", caption: "London · 2025" },
    { src: "/services/photos/window-cleaning-gallery-2.webp", alt: "Window cleaning detail", caption: "London · 2025" },
    { src: "/services/photos/window-cleaning-gallery-3.webp", alt: "Upper-floor pole and reach clean", caption: "London · 2025" },
  ],
  cleaning: [
    { src: "/services/photos/cleaning-gallery-1.webp", alt: "Cleaning team on site", caption: "London · 2025" },
    { src: "/services/photos/cleaning-gallery-2.webp", alt: "Bathroom detail, surface-appropriate cleaning", caption: "London · 2025" },
    { src: "/services/photos/cleaning-gallery-3.webp", alt: "House-standard products laid out", caption: "London · 2025" },
  ],
  "gutter-cleaning": [
    { src: "/services/photos/gutter-cleaning-gallery-1.webp", alt: "SkyVac at the gutterline", caption: "London · 2025" },
    { src: "/services/photos/gutter-cleaning-gallery-2.webp", alt: "Downpipe inspection and clear", caption: "London · 2025" },
    { src: "/services/photos/gutter-cleaning-gallery-3.webp", alt: "Gutter line condition report", caption: "London · 2025" },
  ],
};


/**
 * Practical details + exclusions per service (DIRECTIVE §08 module 3 — "What is
 * included" must cover duration, materials, access, parking, and exclusions).
 * Falls back to sensible generics for services without a specific entry.
 */
const PRACTICAL: Record<string, { duration: string; materials: string; access: string; parking: string; excluded: string[] }> = {
  gardening: {
    duration: "Half a day to a full day, by the size of the garden.",
    materials: "Green waste removed or composted; you supply plants unless quoted.",
    access: "Side or rear access to the garden.",
    parking: "A space near the property helps for tools and waste.",
    excluded: ["Tree work needing a certified arborist", "Design and planting plans (see Design)", "Hard landscaping and construction"],
  },
  "window-cleaning": {
    duration: "Usually under an hour for a typical home.",
    materials: "Pure-water reach-and-wash; no chemicals on the glass.",
    access: "Clear access to the windows, front and back.",
    parking: "On-street or drive parking near the property.",
    excluded: ["High-level interior glass needing scaffold", "Conservatory roof valeting (quoted separately)", "Painting or repairs to frames"],
  },
  cleaning: {
    duration: "Two to four hours for a regular clean, by the size of the home.",
    materials: "House-standard, fragrance-free products; we can use yours.",
    access: "Someone home, or a key or entry arrangement.",
    parking: "A nearby space for the team.",
    excluded: ["Exterior windows (see Window Cleaning)", "Clearance and heavy waste removal", "Specialist stone or upholstery restoration"],
  },
  "gutter-cleaning": {
    duration: "Around an hour for a typical house.",
    materials: "Ground-based vacuum; no ladders where they can be avoided.",
    access: "Clear ground access along the gutter line.",
    parking: "A space near the property for the equipment.",
    excluded: ["Gutter repairs or replacement", "Roof tile or fascia repairs", "Internal downpipe works"],
  },
};

/**
 * `mode` controls how the page asks for the business.
 *
 *   "book"  — we can price and schedule it now. Instant-booking CTAs.
 *   "quote" — a real service the House arranges but cannot price from a
 *             postcode alone (roofing, plumbing, landscaping and the rest of
 *             the wider catalogue). Same template, same sections, same weight;
 *             the CTAs ask for a request instead of a booking.
 *
 * REVISIONS v3 §4 module 3 forbids dead "coming soon" cards. A quote-mode page
 * is the opposite of a dead end: it is a full service page that captures a
 * named, segmentable lead. It must never render the "Service Coming Soon"
 * treatment, and it must never borrow another service's gallery photographs.
 */
export type ServiceDetailMode = "book" | "quote";

export function ServiceDetail({
  service,
  mode = "book",
}: {
  service: Service;
  mode?: ServiceDetailMode;
}) {
  const quote = mode === "quote";
  const partners = ({
    gardening:         { plural: "gardeners",          singular: "gardener" },
    "window-cleaning": { plural: "window cleaners",    singular: "window cleaner" },
    cleaning:          { plural: "cleaners",           singular: "cleaner" },
    "gutter-cleaning": { plural: "gutter specialists", singular: "gutter specialist" },
    handyman:          { plural: "handypeople",        singular: "handyperson" },
    removals:          { plural: "movers",             singular: "mover" },
    energy:            { plural: "electricians",       singular: "electrician" },
    "pet-care":        { plural: "pet carers",         singular: "pet carer" },
  } as Record<string, { plural: string; singular: string }>)[service.slug] ?? { plural: "partners", singular: "partner" };
  const partnerName = partners.plural;
  const partnerNameSingular = partners.singular;

  const heroImage = fileOr(service.heroImage, PLACEHOLDER_HERO);
  /**
   * There is no longer a "coming soon" state on a service page. Every service
   * in the catalogue is presented as live and can be booked: a thin photo
   * library is a photography gap, not a trading status, and it should never
   * have been the signal that decided whether a customer was allowed to buy.
   * Kept as a constant so the intent is explicit rather than the branches
   * silently disappearing.
   */
  const soon = false;

  // Only show a gallery where the photographs are actually OF this service.
  // The old fallback quietly served the gardening gallery to any unknown slug,
  // which would put lawn photographs on a roofing page.
  const galleryRaw = PLACEHOLDER_GALLERY_BY_SERVICE[service.slug];
  const gallery = (galleryRaw ?? []).map((g) => ({ ...g, src: fileOr(g.src, PLACEHOLDER_GALLERY) }));

  // The four launch services have hand-written practical detail here; the
  // wider catalogue carries its own alongside its page content. Either way the
  // "Good to know" block is real rather than generic.
  const practical = PRACTICAL[service.slug] ??
    getQuotePractical(service.slug) ?? {
      duration: "By property and scope.",
      materials: "Provided by the team unless quoted.",
      access: "Reasonable access to the work area.",
      parking: "A nearby space helps.",
      excluded: [] as string[],
    };

  // DIRECTIVE §08/§16 — a plain price-method line in the hero (method varies by
  // service; the exact price is confirmed by postcode in the booking flow).
  const firstPrice = service.packages[0]?.price ?? "";
  const priceMethod = quote
    ? "Enter your postcode to start the booking. Some jobs are priced on the spot, others after a quick look."
    : service.slug === "window-cleaning"
      ? "Priced by property. Enter your postcode for an exact price."
      : service.slug === "gutter-cleaning"
        ? "Fixed by property. Enter your postcode for your price."
        : firstPrice
          ? `${firstPrice.charAt(0).toUpperCase()}${firstPrice.slice(1)}. Enter your postcode for a visit price.`
          : "See prices and availability by postcode.";

  // DIRECTIVE §07 — a persona is a LITERAL doorway into a House outcome, not a
  // character-led product. Text-first (no dollhouse imagery, per the guardrail):
  // name the familiar problem, state the HoWA capability plainly, offer one
  // action. Only where it genuinely helps scope the request (Gardener /
  // Handyman); other services book directly.
  const doorway = (
    {
      gardening: {
        eyebrow: "The Gardener",
        problem: "What does your garden need?",
        capability:
          "Use the Gardener to scan your garden, identify the work and reach the right quote or estimate route, no guesswork before you book.",
        cta: "Scan my garden",
      },
      handyman: {
        eyebrow: "The Handyman",
        problem: "What is causing the problem?",
        capability:
          "Use the Handyman to describe the issue, understand how urgent it is and book the right House repair.",
        cta: "Diagnose the problem",
      },
    } as Record<string, { eyebrow: string; problem: string; capability: string; cta: string }>
  )[service.slug];

  return (
    <div className={s.page}>
      {/* 1. Hero — image hero always shows (coming-soon services fall back to
          the "Service Coming Soon" placeholder so the top never sits bare). */}
      {service.heroImage || soon ? (
        // Split hero (unified across all service pages): copy on cream left,
        // image cropped into the right column. Matches the sub-service and
        // leaf-service templates so the section reads as one system.
        <section className={s.heroSplit}>
          <div className={s.heroSplitCopy}>
            <div className={s.heroSplitCopyInner}>
              <p className={s.heroEy}>{service.eyebrow}</p>
              <h1 className={s.heroTitle}>
                {withEm(service.headline, service.headlineEm)}
              </h1>
              <p className={s.heroLede}>{service.lede}</p>
              {!soon ? (
                <p className={s.heroLede} style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px", paddingTop: 0, borderTop: "none" }}>
                  {priceMethod}
                </p>
              ) : null}
              <div className={s.heroCtas}>
                {soon ? (
                  <>
                    <span className={s.btnFilled} style={{ cursor: "default" }}>
                      Service Coming Soon
                    </span>
                    <Link href="/services" className={s.btnGhost}>
                      Book another service →
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="#open-booking-form" className={s.btnFilled}>
                      See prices &amp; availability
                    </Link>
                    <a href="tel:08000478738" className={s.btnGhost}>
                      Call the House
                    </a>
                    {service.recurring ? (
                      <span className={s.stewardBadge}>Recurring available</span>
                    ) : null}
                  </>
                )}
              </div>
              {/* DIRECTIVE §08 — provider disclosure in the hero. */}
              {!soon ? (
                <p className={s.heroLede} style={{ fontSize: 13, opacity: 0.85, marginTop: 14, paddingTop: 0, borderTop: "none" }}>
                  {quote ? "Delivered by a House team or a named HoWA Approved professional, disclosed before you commit. Booking and Home Record powered by HoWA." : "Delivered by House of Willow Alexander. Booking, scheduling and Home Record powered by HoWA."}
                </p>
              ) : null}
            </div>
          </div>
          <div className={s.heroSplitVisual}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt={service.headline} className={s.heroSplitImg} />
            {soon ? <span className={s.comingSoonTag}>Service Coming Soon</span> : null}
          </div>
        </section>
      ) : (
        <section className={s.heroTextSection}>
          <div className={s.heroTextInner}>
            <p className={s.heroEy}>{service.eyebrow}</p>
            <h1 className={s.heroTitle}>
              {withEm(service.headline, service.headlineEm)}
            </h1>
            <p className={s.heroLede}>{service.lede}</p>
            {!soon ? (
              <p className={s.heroLede} style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px" }}>
                {priceMethod}
              </p>
            ) : null}
            <div className={s.heroCtas}>
              {soon ? (
                <>
                  <span className={s.btnFilled} style={{ cursor: "default" }}>
                    Service Coming Soon
                  </span>
                  <Link href="/services" className={s.btnGhost}>
                    Book another service →
                  </Link>
                </>
              ) : (
                <>
                  <Link href="#open-booking-form" className={s.btnFilled}>
                    See prices &amp; availability
                  </Link>
                  <a href="tel:08000478738" className={s.btnGhost}>
                    Call the House
                  </a>
                  {service.recurring ? (
                    <span className={s.stewardBadge}>Recurring available</span>
                  ) : null}
                </>
              )}
            </div>
            {/* DIRECTIVE §08 — provider disclosure in the hero. */}
            {!soon ? (
              <p className={s.heroLede} style={{ fontSize: 13, opacity: 0.85, marginTop: 14 }}>
                {quote ? "Delivered by a House team or a named HoWA Approved professional, disclosed before you commit. Booking and Home Record powered by HoWA." : "Delivered by House of Willow Alexander. Booking, scheduling and Home Record powered by HoWA."}
              </p>
            ) : null}
          </div>
        </section>
      )}

      {/* 2. Trust strip */}
      {service.trustBadges.length > 0 ? (
        <section className={s.trust}>
          {service.trustBadges.map((badge) => (
            <span key={badge} className={s.trustItem}>{badge}</span>
          ))}
        </section>
      ) : null}

      {/* 2b. Booking, near the top of the page.
          Most visitors who already know they want this service should not have
          to scroll the whole page to act. Two routes, side by side: start the
          booking, or send details and let the House come back. The fuller
          enquiry form still sits further down for anyone who reads first. */}
      <section className="border-b border-house-brown/10 px-[5vw] py-[clamp(28px,3.5vw,48px)]" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="mb-1.5 font-sans text-[11px] tracking-[0.26em] uppercase text-house-gold-ink">
              Ready when you are
            </p>
            <h2 className="font-display text-[clamp(20px,2.4vw,30px)] leading-[1.15] text-house-brown">
              Book {service.name.toLowerCase()} in a few minutes.
            </h2>
            <p className="mt-2 max-w-[52ch] font-sans text-[14px] leading-[1.55] text-house-stone">
              {priceMethod}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="#open-booking-form"
              className="inline-flex items-center justify-center whitespace-nowrap border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110"
            >
              Book now
            </Link>
            <Link
              href="#service-enquiry"
              className="inline-flex items-center justify-center whitespace-nowrap border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold"
            >
              Send details
            </Link>
            <a
              href="tel:08000478738"
              className="inline-flex items-center justify-center whitespace-nowrap border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold"
            >
              Call
            </a>
          </div>
        </div>
      </section>

      {/* 2c. The enquiry form itself, high on the page (this is in addition to
          the fuller one further down, which stays for readers who scroll). */}
      <div id="service-enquiry-top" className="scroll-mt-24">
        <EnquiryForm
          defaultService={service.slug}
          sourcePage={`/services/${service.slug}`}
          eyebrow={service.name}
          headline={`Get a price for ${service.name.toLowerCase()}.`}
          body="Tell us the postcode and a little about the job. If you can add a photograph or two it usually saves a visit. We reply within one working day."
          buttonLabel="Send my details"
          successMessage="Thank you. Your request is with the House and we will come back to you within one working day."
        />
      </div>

      {/* 3. Delivered by our own teams (DIRECTIVE §02/§03/§07).
          House of Willow Alexander delivers services with its own teams, not a
          third-party contractor directory. The House's own team is never
          labelled "HoWA Approved" (§03); a named external HoWA Approved
          professional is disclosed only where one genuinely does the work. */}
      {soon ? null : (
        <section className="px-[5vw] py-[clamp(48px,7vw,96px)] bg-house-forest">
          <div className="mx-auto max-w-[900px] text-center">
            <p className="font-sans text-[11px] tracking-[0.26em] uppercase text-house-gold-light mb-4">
              Our team
            </p>
            <h2 className="font-display text-[clamp(26px,3.6vw,44px)] leading-[1.1] text-house-cream mb-5">
              Delivered by our own <em>{partnerName}.</em>
            </h2>
            <p className="font-sans text-[15px] leading-[1.65] text-[rgba(245,240,232,0.82)] max-w-[58ch] mx-auto">
              Every {partnerNameSingular} who works for the House is held to our
              standard, vetted, insured and briefed on your home before they
              arrive. You deal with the House, not a directory of strangers, and
              the visit, notes and next steps are kept in your home record.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a
                href="#open-booking-form"
                className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-8 py-4 no-underline transition-[filter] hover:brightness-110"
              >
                Book a service →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 4. What's included + How it works */}
      <section className={s.what}>
        <div className={s.whatInner}>
          <div className={s.whatCol}>
            <p className={s.whatEy}>What's included</p>
            <h2 className={s.whatTitle}>Every <em>visit.</em></h2>
            <ul className={s.whatList}>
              {service.sections.included.map((inc) => (
                <li key={inc}>{inc}</li>
              ))}
            </ul>
          </div>
          <div className={s.whatCol}>
            <p className={s.whatEy}>How it works</p>
            <h2 className={s.whatTitle}>From first message <em>to first visit.</em></h2>
            <ol className={s.whatSteps}>
              {service.sections.how.map((step, i) => (
                <li key={step}>
                  <span className={s.whatStepN}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 4b. Good to know — duration, materials, access, parking, exclusions
          (DIRECTIVE §08 module 3 completeness). */}
      {!soon ? (
        <section className="px-[5vw] py-[clamp(40px,5vw,72px)] border-t border-house-brown/10" style={{ background: "var(--color-house-cream)" }}>
          <div className="mx-auto max-w-[1180px] grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">Good to know</p>
              <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 m-0">
                {[["Duration", practical.duration], ["Materials", practical.materials], ["Access", practical.access], ["Parking", practical.parking]].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown mb-1">{k}</dt>
                    <dd className="font-sans text-[14px] leading-[1.55] text-house-stone m-0">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {practical.excluded.length ? (
              <div className="lg:border-l lg:border-house-brown/12 lg:pl-8">
                <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-house-stone mb-4">Not included</p>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {practical.excluded.map((e) => (
                    <li key={e} className="font-sans text-[14px] leading-[1.5] text-house-stone flex gap-2.5"><span aria-hidden>·</span><span>{e}</span></li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {!soon ? <ServiceCtaRow service={service.name} /> : null}

      {/* 6. Persona doorway (DIRECTIVE §07/§08 module 6) — literal, contextual,
          one action; placed after What's included / How the visit works. */}
      {!soon && doorway ? (
        <section className="px-[5vw] py-[clamp(40px,5vw,72px)]" style={{ background: "var(--color-house-white)" }}>
          <div className="mx-auto max-w-[900px] border border-house-brown/12 bg-house-cream p-8 md:p-10 text-center">
            <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-house-gold-ink mb-3">
              {doorway.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.08] text-house-brown mb-4">
              {doorway.problem}
            </h2>
            <p className="font-sans text-[15px] leading-[1.6] text-house-stone max-w-[54ch] mx-auto mb-7">
              {doorway.capability}
            </p>
            <Link href="#open-booking-form" className={s.btnFilled}>
              {doorway.cta}
            </Link>
          </div>
        </section>
      ) : null}

      {/* 5. Sub-services carousel */}
      {service.subServices.length > 0 ? (
        <section className={s.sub}>
          <header className={s.subHead}>
            <p className={s.subEy}>Our {service.name.toLowerCase()} services</p>
            <h2 className={s.subTitle}>
              Everything under <em>{service.name.toLowerCase()}.</em>
            </h2>
          </header>
          <div className={s.subScroller}>
            {service.subServices.map((sub) => {
              const requested =
                SUB_SERVICE_IMAGES[`${service.slug}/${sub.slug}`] ??
                sub.image ??
                `/services/photos/${service.slug}/${sub.slug}-hero.webp`;
              // v4 §5 — every sub-service is live and bookable. Where a tile has
              // no photograph of its own, fall back to the parent service hero
              // (contextual), never the "Coming Soon" placeholder card, and
              // never a coming-soon tag or label.
              const img = fileOr(requested, service.heroImage ?? PLACEHOLDER_HERO);
              return (
                <Link
                  key={sub.slug}
                  href={`/services/${service.slug}/${sub.slug}`}
                  className={s.subCard}
                >
                  <div className={s.subImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={sub.name} />
                  </div>
                  <div className={s.subBody}>
                    <h3 className={s.subName}>{sub.name}</h3>
                    <p className={s.subBlurb}>{sub.lede}</p>
                    <span className={s.subCta}>See detail →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Closing CTA for the sub-services carousel. Only render it when that
          carousel actually appeared — otherwise it stacks directly on the CTA
          after "How it works" above, producing a duplicate block on services
          with no sub-services (e.g. gutter cleaning). */}
      {!soon && service.subServices.length > 0 ? (
        <ServiceCtaRow service={service.name} />
      ) : null}

      {/* 6. Gallery — only where we hold photographs of THIS service. */}
      {gallery.length > 0 ? (
      <section className={s.gallery}>
        <header className={s.galleryHead}>
          <p className={s.galleryEy}>Recent work</p>
          <h2 className={s.galleryTitle}>
            From the <em>field.</em>
          </h2>
        </header>
        <Gallery
          images={gallery}
          columns={3}
          aspectRatio="4/3"
        />
      </section>
      ) : null}

      {/* Home Record benefit (DIRECTIVE §08 module 08) — what the House keeps
          after a visit. Reassurance, not a HoWA product pitch: a powered-by-HoWA
          note and ONE light link to the /howa explainer (House-first, one hop);
          no howa.co.uk push mid-journey (§01). */}
      {!soon ? (
        <section className="px-[5vw] py-[clamp(48px,6vw,88px)]" style={{ background: "var(--color-house-cream)" }}>
          <div className="mx-auto max-w-[1000px] grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="font-sans text-[11px] tracking-[0.26em] uppercase text-house-gold-ink mb-3">Your home record</p>
              <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown mb-4">
                Every visit, <em>remembered.</em>
              </h2>
              <p className="font-sans text-[15px] leading-[1.6] text-house-stone mb-5">
                After each visit, the House keeps the details with your home, so
                nothing is lost and the next visit picks up where the last one
                left off.
              </p>
              <p className="font-sans text-[13px] text-house-stone/80">
                Powered by HoWA.{" "}
                <Link href="/howa" className="text-house-gold-ink underline underline-offset-2">
                  How the House uses HoWA →
                </Link>
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 list-none p-0 m-0">
              {[
                "Before-and-after photographs of the work",
                "Notes on what was done and what to watch",
                "Products and materials used in your home",
                "Costs and invoices, kept in one place",
                "Recommendations and the next thing due",
                "Your full service history over time",
              ].map((item) => (
                <li key={item} className="flex gap-3 font-sans text-[14px] leading-[1.5] text-house-brown">
                  <span aria-hidden className="text-house-gold-ink">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Enquiry form — prefilled with this service. Placed after the gallery
          so the contact form is prominent, not buried at the foot of a long page. */}
      {!soon ? (
        <div id="service-enquiry" className="scroll-mt-24">
          <EnquiryForm
            defaultService={service.slug}
            sourcePage={`/services/${service.slug}`}
            eyebrow="Enquire"
            headline={`Ask about ${service.name.toLowerCase()}.`}
            body="Tell us about your home and what you need. We come back to you personally, usually within one working day. Or book online in a couple of minutes."
          />
        </div>
      ) : null}

      {/* The old BookingFlowStrip ("What happens when you book / Booked,
          delivered, remembered") was removed here: it duplicated the "Your home
          record, every visit remembered" block above and the service's own "How
          it works" steps, and it came from the earlier change-brief deck rather
          than v3/v4. v3 §08 asks for the Home Record benefit block, which stays.
          The page keeps plenty of booking CTAs without it. */}

      {/* 7. Booking — two-block CTA. In quote mode the same two blocks ask for
          a request rather than a booking, so the page keeps its shape. */}
      <section className={s.booking}>
        <div className={s.bookingGrid}>
          <article className={s.bookingCard}>
            <p className={s.bookingEy}>One-off &amp; pay-as-you-go</p>
            <h3 className={s.bookingTitle}>
              Book one-off <em>care.</em>
            </h3>
            <p className={s.bookingBlurb}>
              {quote ? (
                <>
                  Start the booking and tell us about the job. Where we can price
                  it straight away we will, and where the job needs a look first
                  we come back within one working day. No obligation either way.
                </>
              ) : (
                <>
                  Single visits, seasonal jobs, or a one-off tidy, booked through
                  HoWA. Visit notes, photos, products used, costs and next reminders
                  are saved to your Home Record. No subscription required.
                </>
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href="#open-booking-form" className={s.btnFilled}>
                Book a service
              </Link>
              <Link href="#service-enquiry" className={s.btnGhost}>
                Send details instead →
              </Link>
            </div>
          </article>

          <article className={s.bookingCardNavy}>
            <p className={s.bookingEyLight}>
              {quote ? "Prefer to talk" : "Recurring care"}
            </p>
            <h3 className={s.bookingTitleLight}>
              {quote ? (<>Speak to <em>the House.</em></>) : (<>One-off or <em>on a rhythm.</em></>)}
            </h3>
            <p className={s.bookingBlurbLight}>
              {quote ? (
                <>
                  Some jobs are quicker to explain than to type. Call us and we
                  will tell you straight away what is involved, what it is likely
                  to cost and when we can get to you.
                </>
              ) : (
                <>
                  Weekly, fortnightly, or seasonal {service.name.toLowerCase()} plans,
                  kept in their proper rhythm. One invoice, one contact, one system
                  that remembers. Book directly, no membership required.
                </>
              )}
            </p>
            {quote ? (
              <a href="tel:08000478738" className={s.btnGhostLight}>
                Call 0800 047 8738
              </a>
            ) : (
              <Link href="#open-booking-form" className={s.btnGhostLight}>
                Book a plan
              </Link>
            )}
          </article>
        </div>
        <p className={s.bookingBlurb} style={{ textAlign: "center", maxWidth: "62ch", margin: "clamp(20px,3vw,32px) auto 0" }}>
          {quote ? (
            <>
              Depending on the job and where you are, this is carried out by a
              House of Willow Alexander team or by a named HoWA Approved
              professional. You are always told which, and who they are, before
              you pay or commit to anything.
            </>
          ) : (
            <>
              Delivered by our own teams across London and the South East. Where a
              specialist is genuinely needed, we introduce a named HoWA Approved
              professional, disclosed up front. No unapproved hands.
            </>
          )}
        </p>
      </section>

      {/* 8. FAQ */}
      {service.faq.length > 0 ? (
        <section className={s.faq}>
          <header className={s.faqHead}>
            <p className={s.faqEy}>Questions</p>
            <h2 className={s.faqTitle}>
              Before you <em>book.</em>
            </h2>
          </header>
          <div className={s.faqInner}>
            <Accordion
              items={service.faq.map((f, i) => ({
                id: `faq-${i}`,
                summary: f.q,
                body: <p>{f.a}</p>,
              }))}
            />
          </div>
        </section>
      ) : null}

      {!soon ? <ServiceCtaRow service={service.name} /> : null}

      {/* 9. Coverage map + postcode checker (DIRECTIVE §08 — coverage and a
          postcode check on the service page). */}
      <section className="px-[5vw] py-[clamp(48px,6vw,88px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1100px]">
          <CoverageMap />
        </div>
      </section>

      {/* 10. Closing */}
      <section className={s.closing}>
        <FlowerWatermark color="gold" side="right" opacity={0.18} />
        <p className={s.closingStatement}>
          <em>A well-kept home</em> starts with one conversation.
        </p>
        <div className={s.heroCtas} style={{ justifyContent: "center" }}>
          <Link href="#open-booking-form" className={s.btnFilled}>
            Book a service
          </Link>
          <a href="tel:08000478738" className={s.btnGhost}>
            Call 0800 047 8738
          </a>
        </div>
        <p className={s.closingNote}>
          We use HoWA, the Home Intelligence that handles our online bookings and
          keeps your appointment, notes, invoices and service history in one Home
          Record.
        </p>
      </section>
    </div>
  );
}
