import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { Accordion } from "@/components/primitives/Accordion";
import { Gallery, type GalleryImage } from "@/components/primitives/Gallery";
import type { Service } from "@/lib/services-data";
import { SERVICE_AREAS } from "@/lib/services-data/sub-services";
import s from "./ServiceDetail.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { BookingFlowStrip } from "@/components/marketing/BookingFlowStrip";
import { ServiceCtaRow } from "@/components/marketing/ServiceCtaRow";
import { SafetyBoundary } from "@/components/marketing/HowaModules";

const PUBLIC = path.join(process.cwd(), "public");
// Services / sub-services without their own photography fall back to the
// "Coming Soon" placeholder, with a "Service Coming Soon" label over it.
const COMING_SOON = "/services/service-placeholder.webp";
const PLACEHOLDER_HERO = COMING_SOON;
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
  afterHero,
}: {
  service: Service;
  /**
   * Rendered immediately after the hero. The directive's detail-page order puts
   * availability, provider and price at section 2, directly beneath the hero,
   * so the truth band is injected here rather than stacked above the hero (or
   * dumped at the foot of the page).
   */
  afterHero?: React.ReactNode;
}) {

  const heroImage = fileOr(service.heroImage, PLACEHOLDER_HERO);
  // No real photography => this service isn't live yet. Same signal that drives
  // the "Service Coming Soon" image overlay. When true we suppress the
  // book-this-service CTA and point people at services they can actually book.
  const soon = heroImage === COMING_SOON;
  const galleryRaw =
    PLACEHOLDER_GALLERY_BY_SERVICE[service.slug] ?? PLACEHOLDER_GALLERY_BY_SERVICE.gardening;
  const gallery = galleryRaw.map((g) => ({ ...g, src: fileOr(g.src, PLACEHOLDER_GALLERY) }));

  return (
    <div className={s.page}>
      {/* 1. Hero — image hero always shows (coming-soon services fall back to
          the "Service Coming Soon" placeholder so the top never sits bare). */}
      {service.heroImage || soon ? (
        <section className={s.heroImageSection}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={service.headline}
            className={s.heroImage}
          />
          <div className={s.heroScrim} aria-hidden="true" />
          <div className={s.heroCopyOnImage}>
            <p className={s.heroEyLight}>{service.eyebrow}</p>
            <h1 className={s.heroTitleLight}>
              {withEm(service.headline, service.headlineEm)}
            </h1>
            <p className={s.heroLedeLight}>{service.lede}</p>
            <div className={s.heroCtas}>
              {soon ? (
                <>
                  <span className={s.btnFilled} style={{ cursor: "default" }}>
                    Service Coming Soon
                  </span>
                  <Link href="/services" className={s.btnGhostLight}>
                    Book another service →
                  </Link>
                </>
              ) : (
                <>
                  <Link href="#open-booking-form" className={s.btnFilled}>
                    Book through HoWA
                  </Link>
                  <Link href="/services" className={s.btnGhostLight}>
                    See live care
                  </Link>
                </>
              )}
            </div>
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
                    Book through HoWA
                  </Link>
                  <Link href="/services" className={s.btnGhost}>
                    See live care
                  </Link>
                  
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {afterHero}

      {/* 2. REMOVED: the trust badge strip.
          It rendered SERVICE_TRUST_BADGES — "House & Garden 'The List'",
          "Guild of Master Craftsmen", "Carbon Neutral Certified", "Fully
          Insured & Accredited", "Safe Contractor Approved" — identically on
          every service, regardless of which company actually does the work. So
          window cleaning and gutter clearing claimed a gardening directory
          listing and a craftsmen's guild membership.

          The directive: "No generic rating, national coverage or badge wall
          without attributable evidence." These may well be real for a specific
          operating business; if so they belong on that provider's evidenced
          fact pack (business name, approved scope, service area, evidence
          checked, review date), not blanket-applied across four companies. */}

      {/* 3. REMOVED: the "Meet our gardeners" partner carousel.
          It rendered PLACEHOLDER_PARTNERS — invented businesses (GreenThumb
          London, Heritage Tree Care, ClearView London, Pristine London,
          TopDown Maintenance and others) presented as real House Approved
          providers, under the claim that every one of them "has been vetted,
          insured, and meets the standard we'd hold ourselves to". None exist.

          It also contradicted the page directly above it: the truth band names
          ONE responsible seller for the service, while this listed four
          competing companies for the same work.

          The directive allows no part of this: a service names its provider
          (STEP 07 s4), House Approved is "not an open directory", and proof
          requires "business name, approved scope, service area, evidence
          checked, review date and profile link" with "no generic rating,
          national coverage or badge wall without attributable evidence". The
          real launch partners are a fact-gated set handled in STEP 14; they do
          not belong here as invented filler. */}

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

      {!soon ? <ServiceCtaRow service={service.name} /> : null}

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
              // Coming-soon subs show the placeholder + tag on the card so they
              // don't read as live before you click through.
              const img = sub.comingSoon ? COMING_SOON : fileOr(requested, COMING_SOON);
              const soon = img === COMING_SOON;
              return (
                <Link
                  key={sub.slug}
                  href={`/services/${service.slug}/${sub.slug}`}
                  className={s.subCard}
                >
                  <div className={s.subImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={sub.name} />
                    {soon ? <span className={s.comingSoonTag}>Service Coming Soon</span> : null}
                  </div>
                  <div className={s.subBody}>
                    <h3 className={s.subName}>{sub.name}</h3>
                    <p className={s.subBlurb}>{sub.lede}</p>
                    <span className={s.subCta}>{soon ? "Coming soon" : "See detail"} →</span>
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

      {/* 6. Gallery */}
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

      {/* REMOVED: <BookedAndRemembered />. The page was saying the same thing
          three times: this promise band, the BookingFlowStrip immediately below
          it ("Booked, delivered, remembered"), and the truth band's Home Record
          note under the hero. The directive's detail-page order allows one "how
          it works" (section 6) and one service-specific Home Record behaviour
          (section 9). The truth band now carries the Home Record copy, and it
          reflects the real write-back mode rather than a fixed promise, so the
          flow strip below is the only "how it works" left. */}

      {/* 6. How it works: choose -> confirm -> attend -> evidence/record */}
      <BookingFlowStrip />

      {/* 7. Booking — two-block CTA */}
      <section className={s.booking}>
        <div className={s.bookingGrid}>
          <article className={s.bookingCard}>
            <p className={s.bookingEy}>One-off &amp; pay-as-you-go</p>
            <h3 className={s.bookingTitle}>
              Book one-off care <em>through HoWA.</em>
            </h3>
            <p className={s.bookingBlurb}>
              Single visits, seasonal jobs, or a one-off tidy, booked through
              HoWA. Visit notes, photos, products used, costs and next reminders
              are saved to your Home Record. No subscription required.
            </p>
            {soon ? (
              <div className={s.heroCtas}>
                <span className={s.btnFilled} style={{ cursor: "default" }}>
                  Service Coming Soon
                </span>
                <Link href="/services" className={s.btnGhost}>
                  Book another service →
                </Link>
              </div>
            ) : (
              <Link href="#open-booking-form" className={s.btnFilled}>
                Book through HoWA
              </Link>
            )}
          </article>

          <article className={s.bookingCardNavy}>
            <p className={s.bookingEyLight}>Recurring care</p>
            <h3 className={s.bookingTitleLight}>
              Subscriptions only available <em>through Steward.</em>
            </h3>
            <p className={s.bookingBlurbLight}>
              Weekly, fortnightly, or seasonal {service.name.toLowerCase()} plans
              are managed through HoWA Steward. One invoice, one contact, one
              system that remembers.
            </p>
            <Link href="/howa/steward" className={s.btnGhostLight}>
              Learn about Steward
            </Link>
          </article>
        </div>
        <p className={s.bookingBlurb} style={{ textAlign: "center", maxWidth: "62ch", margin: "clamp(20px,3vw,32px) auto 0" }}>
          The named provider shown before you confirm is responsible for its
          contract and delivery. House Approved describes the standard and
          operating framework around the introduction. No unapproved hands.
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

      {/* 9. Service areas — brown band */}
      <section className={s.areas}>
        <p className={s.areasEy}>Where we work</p>
        <div className={s.areasList}>
          {SERVICE_AREAS.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
        <p className={s.areasFoot}>
          Not listed?{" "}
          <Link href="/contact" className={s.areasLink}>Write to us.</Link>{" "}
          We're expanding.
        </p>
      </section>

      {/* Safety boundary (launch read section 34/36) */}
      <SafetyBoundary className="bg-house-cream border-t border-house-brown/8" />

      {/* 10. Closing */}
      <section className={s.closing}>
        <FlowerWatermark color="gold" side="right" opacity={0.18} />
        <p className={s.closingStatement}>
          <em>A well-kept home</em> starts with one conversation.
        </p>
        {soon ? (
          <Link href="/services" className={s.btnFilled}>
            Book another service →
          </Link>
        ) : (
          <Link href="#open-booking-form" className={s.btnFilled}>
            Book through HoWA
          </Link>
        )}
        <p className={s.closingNote}>
          We are proud founding partners of HoWA, which handles our online
          bookings and keeps your appointment, notes, invoices and service
          history in one Home Record.
        </p>
      </section>
    </div>
  );
}
