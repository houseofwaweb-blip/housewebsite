import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { Accordion } from "@/components/primitives/Accordion";
import { ScrollCarousel } from "@/components/primitives/ScrollCarousel";
import { Gallery, type GalleryImage } from "@/components/primitives/Gallery";
import { basisPhrase, serviceEnquiryOptions, type Service } from "@/lib/services-data";
import s from "./ServiceDetail.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { ServiceCtaRow } from "@/components/marketing/ServiceCtaRow";
import { HouseStandardStrip } from "@/components/marketing/HouseStandardStrip";
import { ServiceWordmark } from "@/components/marketing/ServiceWordmark";
import { LOCATION_SERVICE_SLUGS, townLinksForService, type LocationServiceSlug } from "@/lib/services-data/locations";
import { BookingPanel } from "@/components/services/BookingPanel";
import { buildBookingUrl } from "@/components/booking/postcode";
import { SERVICEOS_SERVICE_ID } from "@/lib/serviceos-links";

const PUBLIC = path.join(process.cwd(), "public");
// Generic still-life fallback used only when a service's own photography is not
// yet on disk. There is no "coming soon" state: every service is live and
// bookable, so a missing file is a photography gap, never a trading status.
const PLACEHOLDER_HERO = "/services/service-placeholder.webp";
const PLACEHOLDER_GALLERY = "/services/service-placeholder.webp";

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
 * ServiceDetail — top-level (category) service page template, rebuilt to the
 * rebuild specification §10.
 *
 * `mode`:
 *   "book"  — priced from a postcode. Primary CTA: "See times and prices".
 *   "quote" — priced on the job. Primary CTA: "Get a quote". Never a survey;
 *             survey wording is reserved for design commissions.
 *
 * Section order (doc §10):
 *   1. Hero + booking panel (7/5 split, service preselected)
 *   2. What we can help with
 *   3. What is included / not included
 *   4. Pricing and frequency
 *   5. How the visit works
 *   6. Meet the House standard
 *   7. Recent verified reviews
 *   8. Service area and availability
 *   9. FAQs
 *  10. Related service / cover / article
 *  11. Final CTA
 */

export type ServiceDetailMode = "book" | "quote";

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
    { src: "/services/photos/cleaning-gallery-3.webp", alt: "House-approved products laid out", caption: "London · 2025" },
  ],
  "gutter-cleaning": [
    { src: "/services/photos/gutter-cleaning-gallery-1.webp", alt: "SkyVac at the gutterline", caption: "London · 2025" },
    { src: "/services/photos/gutter-cleaning-gallery-2.webp", alt: "Downpipe inspection and clear", caption: "London · 2025" },
    { src: "/services/photos/gutter-cleaning-gallery-3.webp", alt: "Gutter line condition report", caption: "London · 2025" },
  ],
};

export function ServiceDetail({
  service,
  mode = "book",
}: {
  service: Service;
  mode?: ServiceDetailMode;
}) {
  const quote = mode === "quote";

  const heroImage = fileOr(service.heroImage, PLACEHOLDER_HERO);
  // Service colour comes from the data layer (never a hardcoded hex here); it
  // frames the still-life and accents the panel. Falls back to House brown so
  // services without a brand volume still render on-palette.
  const accent = service.colour ?? "var(--color-house-brown)";

  const galleryRaw =
    PLACEHOLDER_GALLERY_BY_SERVICE[service.slug] ?? PLACEHOLDER_GALLERY_BY_SERVICE.gardening;
  const gallery = galleryRaw.map((g) => ({ ...g, src: fileOr(g.src, PLACEHOLDER_GALLERY) }));

  // Pricing — the retired "steward" tier never reaches the customer. Recurring
  // care is presented as a booking frequency, not a subscription tier.
  const priced = service.packages.filter((p) => p.tier !== "steward");
  const fromPrice = priced[0]?.price ?? service.packages[0]?.price;

  const primaryLabel = quote ? "Get a quote" : "See times and prices";
  const nameLower = service.name.toLowerCase();

  const pkgCtaLabel = (cta: "bookNow" | "quoteEntry" | "waitlist") => {
    if (cta === "quoteEntry") return "Get a quote";
    if (cta === "waitlist") return "Register interest";
    return primaryLabel;
  };
  // Package CTAs open the ServiceOS booking platform with THIS service already
  // picked (deep-link), except "waitlist" which routes to the on-page callback
  // form. bookNow/quoteEntry must be a full-page <a> nav (below) so the OBF
  // re-initialises and reads the service_id.
  const pkgCtaHref = (cta: "bookNow" | "quoteEntry" | "waitlist") =>
    cta === "waitlist"
      ? "#service-enquiry"
      : buildBookingUrl("", SERVICEOS_SERVICE_ID[service.slug]);

  return (
    <div className={s.page}>
      {/* 1. Hero + booking panel — 7/5 split, House cream first. Dark House
          pattern hung down one side of the cream ground (deck treatment). */}
      <section className="relative overflow-hidden bg-house-cream px-[5vw] pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,6vw,96px)] border-b border-house-brown/10">
        <FlowerWatermark variant="pattern" color="brown" side="right" opacity={0.1} />
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-12">
          {/* Left — copy, proof, still-life (7 cols) */}
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="mb-6 font-sans text-[14px] tracking-[0.24em] uppercase text-house-gold-ink">
              <Link href="/services" className="no-underline text-house-gold-ink hover:text-house-brown">
                Services
              </Link>
              <span aria-hidden className="mx-2 text-house-stone">/</span>
              <span className="text-house-brown/70">{service.name}</span>
            </nav>

            {/* Official service wordmark (spec §10) — the Willow Alexander-owned
                brand behind this service. Renders only where artwork exists. */}
            <ServiceWordmark slug={service.slug} className="mb-5" />

            <h1 className="mb-5 font-hearth-serif font-normal text-[clamp(43px,5.4vw,77px)] leading-[1.04] tracking-[-0.018em] text-house-brown [&_em]:italic [&_em]:text-house-gold-ink">
              {withEm(service.headline, service.headlineEm)}
            </h1>
            <p className="mb-6 max-w-[54ch] border-t border-house-brown/15 pt-5 font-sans text-[20px] leading-[1.65] text-house-brown/75">
              {service.lede}
            </p>

            {/* Key proof — evidence, not decorative badges (doc §7.4). No review
                score is shown here: a rating renders only from a live, attributable
                source, and there is none wired in yet, so we do not print a figure. */}
            <ul className="m-0 flex flex-wrap gap-x-8 gap-y-3 list-none p-0">
              {fromPrice ? (
                <li className="font-sans text-[17px] text-house-brown/80">
                  <span className="mr-2 text-house-gold-ink" aria-hidden>◆</span>
                  {fromPrice}
                </li>
              ) : null}
              <li className="font-sans text-[17px] text-house-brown/80">
                <span className="mr-2 text-house-gold-ink" aria-hidden>◆</span>
                Serving London and Kent
              </li>
            </ul>

            {/* Service colour / still-life frame */}
            <div
              className="mt-8 overflow-hidden border"
              style={{ borderColor: accent }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={service.headline}
                className="block aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          {/* Right — booking panel (5 cols), shared with the leaf template */}
          <BookingPanel
            serviceName={service.name}
            slug={service.slug}
            accent={accent}
            mode={mode}
            fromPrice={fromPrice}
          />
        </div>
      </section>

      {/* Trust strip */}
      {service.trustBadges.length > 0 ? (
        <section className={s.trust}>
          {service.trustBadges.map((badge) => (
            <span key={badge} className={s.trustItem}>{badge}</span>
          ))}
        </section>
      ) : null}

      {/* 2. What we can help with */}
      {service.subServices.length > 0 ? (
        <section className={s.sub}>
          <header className={s.subHead}>
            <p className={s.subEy}>What we can help with</p>
            <h2 className={s.subTitle}>
              Everything under <em>{nameLower}.</em>
            </h2>
          </header>
          <ScrollCarousel className={s.subScroller} ariaLabel={`${nameLower} services`}>
            {service.subServices.map((sub) => {
              const requested = sub.image ?? `/services/photos/${service.slug}/${sub.slug}-hero.webp`;
              const img = fileOr(requested, PLACEHOLDER_HERO);
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
          </ScrollCarousel>
        </section>
      ) : null}

      {/* 3. What is included / not included */}
      <section className={s.what}>
        <div className={s.whatInner}>
          <div className={s.whatCol}>
            <p className={s.whatEy}>What&apos;s included</p>
            <h2 className={s.whatTitle}>Every <em>visit.</em></h2>
            <ul className={s.whatList}>
              {service.sections.included.map((inc) => (
                <li key={inc}>{inc}</li>
              ))}
            </ul>
          </div>
          <div className={s.whatCol}>
            <p className={s.whatEy}>What&apos;s not included</p>
            <h2 className={s.whatTitle}>So there are <em>no surprises.</em></h2>
            <ul className={s.whatList}>
              <li>Materials, parts and waste disposal unless stated, always itemised in your price.</li>
              <li>Regulated works needing separate certification are referred to a named specialist.</li>
              <li>Anything beyond the agreed scope is quoted and agreed before we start.</li>
              <li>VAT treatment is shown in your price summary, never hidden.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Pricing and frequency — offer-card treatment: the service still-life
          fades into a dark house-brown box, packages read in cream and gold on
          the dark ground (matches OfferCard, spec §7.3 card family 4). */}
      {priced.length > 0 ? (
        <section className={s.booking}>
          <div className="mx-auto max-w-[1120px] overflow-hidden border border-house-gold/30 bg-house-brown text-house-cream">
            {/* Visual header — still-life fading into the box */}
            <div className="relative w-full overflow-hidden bg-house-ink h-[clamp(200px,24vw,300px)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Scrim — fades the image into the house-brown ground */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to top, rgba(48,35,28,1) 0%, rgba(48,35,28,0.78) 30%, rgba(48,35,28,0.28) 66%, rgba(48,35,28,0) 100%)",
                }}
              />
              <div className="absolute inset-x-[clamp(24px,4vw,48px)] bottom-[clamp(20px,3vw,32px)] z-20">
                <p className="font-sans text-[13px] tracking-[0.32em] uppercase text-house-gold-light">
                  Pricing and frequency
                </p>
                <h2 className="mt-2.5 font-hearth-serif text-[clamp(27px,2.8vw,37px)] leading-[1.1] text-house-cream [&_em]:italic [&_em]:text-house-gold-light">
                  How we price <em>{nameLower}.</em>
                </h2>
              </div>
            </div>

            {/* Packages, on the dark ground */}
            <div className="p-[clamp(28px,4vw,48px)]">
              <div
                className="grid gap-[clamp(24px,2.6vw,40px)]"
                style={{ gridTemplateColumns: `repeat(${Math.min(priced.length, 3)}, 1fr)` }}
              >
                {priced.map((pkg) => (
                  <article key={pkg.slug} className="flex flex-col gap-3 border-t border-house-cream/15 pt-6">
                    <p className="font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-light">
                      How you&apos;re charged
                    </p>
                    <h3 className="font-hearth-serif text-[clamp(23px,2.2vw,29px)] leading-[1.15] text-house-cream">
                      {pkg.name}
                    </h3>
                    <p className="font-sans text-[23px] font-medium text-house-cream">{basisPhrase(pkg.basis)}</p>
                    {pkg.bestFor ? (
                      <p className="font-sans text-[17px] text-house-cream/65">Best for {pkg.bestFor}</p>
                    ) : null}
                    <ul className="m-0 mt-1 flex list-none flex-col gap-2 p-0">
                      {pkg.inclusions.map((inc) => (
                        <li key={inc} className="flex gap-2.5 font-sans text-[17px] leading-[1.5] text-house-cream/90">
                          <span
                            aria-hidden="true"
                            className="mt-[0.5em] block h-[5px] w-[5px] shrink-0 rotate-45 bg-house-gold-light"
                          />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={pkgCtaHref(pkg.cta)}
                      className="mt-auto inline-block self-start bg-house-gold px-6 py-3 font-sans text-[13px] tracking-[0.16em] uppercase text-house-brown no-underline transition hover:brightness-110"
                    >
                      {pkgCtaLabel(pkg.cta)}
                    </a>
                  </article>
                ))}
              </div>
              <p className="mt-[clamp(24px,3vw,36px)] max-w-[64ch] font-sans text-[18px] leading-[1.65] text-house-cream/75">
                Book a one-off, or set a regular rhythm, weekly, fortnightly or seasonal.
                There is no subscription to hold; change, pause or stop it whenever you
                like. Minimum booking values and any extras are shown before you confirm.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* 5. How the visit works — contained split, copy left / image right, brown panel.
          Gold House pattern hung off the copy-side edge (the homepage brown moment). */}
      <section className="relative overflow-hidden bg-house-brown px-[5vw] py-[clamp(56px,7vw,112px)] border-b border-house-brown/10">
        <FlowerWatermark variant="pattern" color="gold" side="left" opacity={0.2} />
        <div className="relative z-10 mx-auto grid max-w-[1180px] items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* Copy — header left, the steps underneath */}
          <div className="text-house-chalk lg:order-1">
            <p className="font-sans text-[13px] tracking-[0.22em] uppercase text-house-gold-light">
              How the visit works
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,2.8vw,2.8rem)] leading-[1.05] text-house-chalk">
              From first message to first visit.
            </h2>
            <ol className="mt-9 grid gap-6">
              {service.sections.how.map((step, i) => (
                <li key={step} className="flex gap-5">
                  <span className="font-display text-[1.5rem] leading-none text-house-gold-light w-9 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[19px] leading-relaxed text-house-chalk/90">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          {/* Image — top right of the section */}
          <div className="relative aspect-[16/11] w-full overflow-hidden lg:order-2 lg:self-start" style={{ border: "1px solid rgba(190,169,106,0.35)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/home-v4/booking-lifestyle.webp"
              alt="A Willow Alexander Home & Garden van outside a client's home, the door open onto a warm interior"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <ServiceCtaRow
        service={service.name}
        mode={mode}
        bookHref={buildBookingUrl("", SERVICEOS_SERVICE_ID[service.slug])}
      />

      {/* 6. Meet the House standard */}
      <HouseStandardStrip />

      {/* 7. Request a callback — high-intent capture placed mid-page so it is
          easy to reach without scrolling to the foot of the page. */}
      <div id="service-enquiry" className="scroll-mt-24">
        <EnquiryForm
          defaultService={service.slug}
          sourcePage={`/services/${service.slug}`}
          eyebrow="Ask the House"
          headline={`Prefer to ask about ${nameLower} first?`}
          body="Tell us a little about your home and what you need, and the House will come back to you, usually within one working day. Or book online in a couple of minutes."
          serviceOptions={serviceEnquiryOptions(service)}
          baseServiceType={service.slug}
        />
      </div>

      {/* 8. Service area — "where we work" + (for launch services) the town
          links that make the service × town local pages crawlable from here,
          all in ONE band so it isn't two location sections back to back. */}
      <section className={s.areas}>
        <p className={s.areasEy}>Where we work</p>
        <div className={s.areasList}>
          <span>London and Kent</span>
        </div>
        {(LOCATION_SERVICE_SLUGS as readonly string[]).includes(service.slug) ? (
          <ul className="mt-6 flex max-w-[1000px] flex-wrap gap-x-5 gap-y-2.5 list-none p-0">
            {townLinksForService(service.slug as LocationServiceSlug).map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="font-sans text-[15px] text-house-cream/70 underline decoration-house-cream/25 underline-offset-4 hover:text-house-cream hover:decoration-house-gold-light"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <p className={s.areasFoot}>
          Outside the area?{" "}
          <Link href="/contact" className={s.areasLink}>Write to us.</Link>{" "}
          We&apos;re expanding.
        </p>
      </section>

      {/* 9. FAQs */}
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

      {/* 10. Related service / cover / article */}
      <section className={s.gallery}>
        <header className={s.galleryHead}>
          <p className={s.galleryEy}>Also from the House</p>
          <h2 className={s.galleryTitle}>
            One House, <em>many hands.</em>
          </h2>
        </header>
        <div className="mx-auto grid max-w-[1080px] gap-4 md:grid-cols-3">
          <Link href="/services" className="group flex flex-col border border-house-brown/15 bg-house-cream-light p-7 no-underline transition-colors hover:border-house-gold">
            <p className="mb-2 font-sans text-[13px] tracking-[0.2em] uppercase text-house-gold-ink">Service</p>
            <h3 className="mb-2.5 font-hearth-serif text-[24px] leading-tight text-house-brown">More home and garden care</h3>
            <p className="mb-6 flex-1 font-sans text-[18px] leading-[1.55] text-house-brown/70">Browse every discipline the House keeps in good order, held to one standard.</p>
            <span className="font-sans text-[13px] tracking-[0.2em] uppercase text-house-gold-ink group-hover:text-house-brown">See all services →</span>
          </Link>
          <Link href="/insurance" className="group flex flex-col border border-house-brown/15 bg-house-cream-light p-7 no-underline transition-colors hover:border-house-gold">
            <p className="mb-2 font-sans text-[13px] tracking-[0.2em] uppercase text-house-gold-ink">Cover</p>
            <h3 className="mb-2.5 font-hearth-serif text-[24px] leading-tight text-house-brown">Insurance and cover</h3>
            <p className="mb-6 flex-1 font-sans text-[18px] leading-[1.55] text-house-brown/70">Cover for the house and everyone who lives in it, a House proposition.</p>
            <span className="font-sans text-[13px] tracking-[0.2em] uppercase text-house-gold-ink group-hover:text-house-brown">Explore cover →</span>
          </Link>
          <Link href="/the-hearth" className="group flex flex-col border border-house-brown/15 bg-house-cream-light p-7 no-underline transition-colors hover:border-house-gold">
            <p className="mb-2 font-sans text-[13px] tracking-[0.2em] uppercase text-house-gold-ink">Read</p>
            <h3 className="mb-2.5 font-hearth-serif text-[24px] leading-tight text-house-brown">From the magazine</h3>
            <p className="mb-6 flex-1 font-sans text-[18px] leading-[1.55] text-house-brown/70">Guides and ideas for looking after a home and garden, well.</p>
            <span className="font-sans text-[13px] tracking-[0.2em] uppercase text-house-gold-ink group-hover:text-house-brown">Read the Hearth →</span>
          </Link>
        </div>
      </section>

      {/* Recent work gallery */}
      <section className={s.gallery} style={{ borderTop: "none" }}>
        <header className={s.galleryHead}>
          <p className={s.galleryEy}>Recent work</p>
          <h2 className={s.galleryTitle}>
            From the <em>field.</em>
          </h2>
        </header>
        <Gallery images={gallery} columns={3} aspectRatio="4/3" />
      </section>

      {/* 11. Final CTA */}
      <section className={s.closing}>
        <FlowerWatermark color="gold" side="right" opacity={0.18} />
        <p className={s.closingStatement}>
          <em>A well-kept home</em> starts with one conversation.
        </p>
        <Link href="#open-booking-form" className={s.btnFilled}>
          {primaryLabel}
        </Link>
        <p className={s.closingNote}>
          Booking, scheduling and your Home Record are powered by HoWA, so your
          appointment, notes, invoices and service history stay in one place.
        </p>
      </section>
    </div>
  );
}
