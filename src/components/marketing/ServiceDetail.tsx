import Link from "next/link";
import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { Accordion } from "@/components/primitives/Accordion";
import { Gallery, type GalleryImage } from "@/components/primitives/Gallery";
import type { Service } from "@/lib/services-data";
import { CoverageMap } from "@/components/house/CoverageMap";
import s from "./ServiceDetail.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { getServiceBusiness, HOWA_BOOK_URL } from "@/lib/service-businesses";

const PUBLIC = path.join(process.cwd(), "public");
const PLACEHOLDER_HERO = "/services/subbrands/handyman.webp";
const COMING_SOON = "/services/service-placeholder.webp";
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

/** Splits a headline at `em` and italicises the tail. */
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

/** Real action shots per service, shown in the "delivered by" band. */
type ActionShot = { src: string; alt: string; w: number; h: number };
const ACTION_SHOTS: Record<string, ActionShot> = {
  gardening: { src: "/services/photos/gardening/gardening-team-action.jpg", alt: "A Willow Alexander gardener raking a prepared seedbed", w: 3210, h: 4012 },
  "window-cleaning": { src: "/services/photos/window-cleaning/window-cleaning-team-action.jpg", alt: "A window cleaner reaching an upper sash with a pure-water pole", w: 3017, h: 5364 },
  cleaning: { src: "/services/photos/cleaning/cleaning-team-action.jpg", alt: "A cleaner working through a room to a high standard", w: 2048, h: 1638 },
  "gutter-cleaning": { src: "/services/photos/gutter-cleaning/gutter-cleaning-team-action.jpg", alt: "A team clearing a gutter line from the ground", w: 1365, h: 2048 },
  handyman: { src: "/services/photos/handyman/handyman-team-action.jpg", alt: "A handyperson at work on a repair", w: 4000, h: 6000 },
};

export type ServiceDetailMode = "book" | "quote";

/**
 * ServiceDetail — the rich service page template. Aug 2026 eComm/Insurance
 * refocus: the layout, sections and images are kept, but the House no longer
 * books in-site. Every CTA now links out — "Book via HoWA" (howa.co.uk) or
 * "Visit" the relevant Willow Alexander service business. No in-site booking
 * form, no companion/AI doorway, no HoWA-product advert.
 */
export function ServiceDetail({
  service,
}: {
  service: Service;
  mode?: ServiceDetailMode;
}) {
  const partners = ({
    gardening: { plural: "gardeners", singular: "gardener" },
    "window-cleaning": { plural: "window cleaners", singular: "window cleaner" },
    cleaning: { plural: "cleaners", singular: "cleaner" },
    "gutter-cleaning": { plural: "gutter specialists", singular: "gutter specialist" },
    handyman: { plural: "handypeople", singular: "handyperson" },
  } as Record<string, { plural: string; singular: string }>)[service.slug] ?? { plural: "team", singular: "professional" };
  const partnerName = partners.plural;
  const partnerNameSingular = partners.singular;

  const heroImage = fileOr(service.heroImage, PLACEHOLDER_HERO);

  const galleryRaw = PLACEHOLDER_GALLERY_BY_SERVICE[service.slug];
  const gallery = (galleryRaw ?? []).map((g) => ({ ...g, src: fileOr(g.src, PLACEHOLDER_GALLERY) }));

  const action = ACTION_SHOTS[service.slug];

  const biz = getServiceBusiness(service.slug);
  const bizUrl = biz?.bookUrl ?? "/services";
  const bizName = biz?.business ?? "the service business";
  const bizShort = biz ? biz.business.replace("Willow Alexander ", "") : "the business";

  return (
    <div className={s.page}>
      {/* 1. Hero — split */}
      <section className={s.heroSplit}>
        <div className={s.heroSplitCopy}>
          <div className={s.heroSplitCopyInner}>
            <p className={s.heroEy}>{service.eyebrow}</p>
            <h1 className={s.heroTitle}>{withEm(service.headline, service.headlineEm)}</h1>
            <p className={s.heroLede}>{service.lede}</p>
            <div className={s.heroCtas}>
              <a href={HOWA_BOOK_URL} target="_blank" rel="noopener noreferrer" className={s.btnFilled}>
                Book via HoWA
              </a>
              <a href={bizUrl} target="_blank" rel="noopener noreferrer" className={s.btnGhost}>
                Visit {bizName}
              </a>
            </div>
            <p className={s.heroLede} style={{ fontSize: 13, opacity: 0.85, marginTop: 14, paddingTop: 0, borderTop: "none" }}>
              Delivered by {bizName}. Book online through HoWA, or on their own site.
            </p>
          </div>
        </div>
        <div className={s.heroSplitVisual}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt={service.headline} className={s.heroSplitImg} />
        </div>
      </section>

      {/* 2. Trust strip */}
      {service.trustBadges.length > 0 ? (
        <section className={s.trust}>
          {service.trustBadges.map((badge) => (
            <span key={badge} className={s.trustItem}>{badge}</span>
          ))}
        </section>
      ) : null}

      {/* 2b. Book near the top */}
      <section className="border-b border-house-brown/10 px-[5vw] py-[clamp(28px,3.5vw,48px)]" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="mb-1.5 font-sans text-[11px] tracking-[0.26em] uppercase text-house-gold-ink">
              Ready when you are
            </p>
            <h2 className="font-display text-[clamp(20px,2.4vw,30px)] leading-[1.15] text-house-brown">
              Book {service.name.toLowerCase()} with {bizShort}.
            </h2>
            <p className="mt-2 max-w-[52ch] font-sans text-[14px] leading-[1.55] text-house-stone">
              Prices, availability and booking are handled online through HoWA, or on {bizShort}&rsquo;s own site.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={HOWA_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110"
            >
              Book via HoWA
            </a>
            <a
              href={bizUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold"
            >
              Visit {bizName}
            </a>
          </div>
        </div>
      </section>

      {/* 3. Delivered by the business */}
      <section className="px-[5vw] py-[clamp(48px,7vw,96px)] bg-house-forest">
        <div className="mx-auto grid max-w-[1180px] items-center gap-[clamp(28px,5vw,64px)] lg:grid-cols-2">
          <div>
            <p className="font-sans text-[11px] tracking-[0.26em] uppercase text-house-gold-light mb-4">
              {bizName}
            </p>
            <h2 className="font-display text-[clamp(26px,3.6vw,44px)] leading-[1.1] text-house-cream mb-5">
              Delivered by dedicated <em>{partnerName}.</em>
            </h2>
            <p className="font-sans text-[15px] leading-[1.65] text-[rgba(245,240,232,0.82)] max-w-[54ch]">
              Every {partnerNameSingular} is vetted, insured and briefed on your
              home before they arrive. You deal with a real team across London and
              Kent, not a directory of strangers.
            </p>
            <div className="mt-8">
              <a
                href={HOWA_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-8 py-4 no-underline transition-[filter] hover:brightness-110"
              >
                Book via HoWA →
              </a>
            </div>
          </div>
          {action ? (
            <Image
              src={action.src}
              alt={action.alt}
              width={action.w}
              height={action.h}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-auto w-full"
            />
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-house-gold-dark/50 bg-[rgba(245,240,232,0.06)]">
              <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-cream/40">Action shot</span>
            </div>
          )}
        </div>
      </section>

      {/* 4. What's included + How it works */}
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

      {/* 4c. Where we work */}
      <section className="px-[5vw] py-[clamp(40px,5vw,72px)] border-t border-house-brown/10" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1100px]">
          <CoverageMap />
        </div>
      </section>

      {/* 5. Sub-services carousel — cards link out to the business */}
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
              const requested = sub.image ?? `/services/photos/${service.slug}/${sub.slug}-hero.webp`;
              const img = fileOr(requested, service.heroImage ?? PLACEHOLDER_HERO);
              return (
                <a
                  key={sub.slug}
                  href={biz?.businessUrl ?? bizUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.subCard}
                >
                  <div className={s.subImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={sub.name} />
                  </div>
                  <div className={s.subBody}>
                    <h3 className={s.subName}>{sub.name}</h3>
                    <p className={s.subBlurb}>{sub.lede}</p>
                    <span className={s.subCta}>Visit →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* 6. Gallery */}
      {gallery.length > 0 ? (
        <section className={s.gallery}>
          <header className={s.galleryHead}>
            <p className={s.galleryEy}>Recent work</p>
            <h2 className={s.galleryTitle}>
              From the <em>field.</em>
            </h2>
          </header>
          <Gallery images={gallery} columns={3} aspectRatio="4/3" />
        </section>
      ) : null}

      {/* 7. Booking — two-block CTA */}
      <section className={s.booking}>
        <div className={s.bookingGrid}>
          <article className={s.bookingCard}>
            <p className={s.bookingEy}>One-off &amp; pay-as-you-go</p>
            <h3 className={s.bookingTitle}>
              Book one-off <em>care.</em>
            </h3>
            <p className={s.bookingBlurb}>
              Single visits, seasonal jobs, or a one-off tidy. Book online through
              HoWA in a couple of minutes, no subscription required.
            </p>
            <div className={s.heroCtas}>
              <a href={HOWA_BOOK_URL} target="_blank" rel="noopener noreferrer" className={s.btnFilled}>
                Book via HoWA
              </a>
              <a href={bizUrl} target="_blank" rel="noopener noreferrer" className={s.btnGhost}>
                Visit {bizName} →
              </a>
            </div>
          </article>

          <article className={s.bookingCardNavy}>
            <p className={s.bookingEyLight}>Recurring care</p>
            <h3 className={s.bookingTitleLight}>
              One-off or <em>on a rhythm.</em>
            </h3>
            <p className={s.bookingBlurbLight}>
              Weekly, fortnightly, or seasonal {service.name.toLowerCase()}, kept in
              its proper rhythm. Arrange it with {bizShort}, or online through HoWA.
            </p>
            <a href={HOWA_BOOK_URL} target="_blank" rel="noopener noreferrer" className={s.btnGhostLight}>
              Book via HoWA
            </a>
          </article>
        </div>
        <p className={s.bookingBlurb} style={{ textAlign: "center", maxWidth: "62ch", margin: "clamp(20px,3vw,32px) auto 0" }}>
          Delivered by {bizName} across London and Kent. Booking is handled online
          through HoWA, or on their own site.
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

      {/* 10. Closing */}
      <section className={s.closing}>
        <FlowerWatermark color="gold" side="right" opacity={0.18} />
        <p className={s.closingStatement}>
          <em>A well-kept home</em> starts with one booking.
        </p>
        <div className={s.heroCtas} style={{ justifyContent: "center", marginInline: "auto" }}>
          <a href={HOWA_BOOK_URL} target="_blank" rel="noopener noreferrer" className={s.btnFilled}>
            Book via HoWA
          </a>
          <a href={bizUrl} target="_blank" rel="noopener noreferrer" className={s.btnGhost}>
            Visit {bizName}
          </a>
        </div>
        <p className={s.closingNote}>
          {service.name} is delivered by {bizName}. Book online through HoWA, or on
          their own site.
        </p>
      </section>
    </div>
  );
}
