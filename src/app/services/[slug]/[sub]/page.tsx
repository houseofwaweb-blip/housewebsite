import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/primitives/Accordion";
import { Gallery } from "@/components/primitives/Gallery";
import { SERVICE_CONTENT_DEFAULTS } from "@/lib/services-data/service-content-defaults";
import { ServiceCtaRow } from "@/components/marketing/ServiceCtaRow";
import { SERVICES, SERVICE_ORDER, type ServiceSlug } from "@/lib/services-data";
import { buildBookingUrl } from "@/components/booking/postcode";
import { SERVICEOS_SERVICE_ID } from "@/lib/serviceos-links";
import s from "./sub-service.module.css";

const PUBLIC = path.join(process.cwd(), "public");
// Sub-services without their own photography get the "Coming Soon" placeholder
// with a "Service Coming Soon" label over the hero.
const COMING_SOON = "/services/service-placeholder.webp";
// v4 §5 — no coming-soon sub-services. The neutral House still-life stands in
// where a photograph is missing; the "Coming Soon" card image must never be a hero.
const PLACEHOLDER_HERO = "/services/subbrands/handyman.webp";

/** Return the path if the file exists in /public, otherwise the fallback. */
function fileOr(localPath: string, fallback: string) {
  if (!localPath || localPath.startsWith("http")) return localPath || fallback;
  const abs = path.join(PUBLIC, localPath.replace(/^\//, ""));
  try {
    return fs.existsSync(abs) ? localPath : fallback;
  } catch {
    return fallback;
  }
}

/**
 * /services/[slug]/[sub] — lander framework.
 *
 * Section order (cream / cream-dark alternation):
 *   1. Hero — split, copy left + image right
 *   2. About + Why choose — cream-dark, 2-col editorial
 *   3. What's included — cream, 2-col list
 *   4. From the work — cream-dark, before/after + gallery
 *   5. FAQ — cream, accordion
 *   6. Related sub-services — cream-dark, 3-up
 *   7. Closing — cream, centered CTA
 *
 * What we deliberately do NOT include (lives on the parent /services/[slug]):
 *   - Trust strip
 *   - Recurring-care / House Offers band
 *   - Service areas brown band
 *   - Partner carousel
 */

function findSubService(parentSlug: string, subSlug: string) {
  if (!SERVICE_ORDER.includes(parentSlug as ServiceSlug)) return null;
  const parent = SERVICES[parentSlug as ServiceSlug];
  const sub = parent.subServices.find((s) => s.slug === subSlug);
  if (!sub) return null;
  return { parent, sub };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}): Promise<Metadata> {
  const { slug, sub } = await params;
  const result = findSubService(slug, sub);
  if (!result) return { title: "Service not found" };
  return {
    title: `${result.sub.name}, ${result.parent.name}`,
    description: result.sub.lede,
  };
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const result = findSubService(slug, sub);
  if (!result) notFound();

  const { parent, sub: service } = result;
  const siblings = parent.subServices.filter((sib) => sib.slug !== service.slug).slice(0, 6);

  const requestedHero =
    service.image ?? `/services/photos/${parent.slug}/${service.slug}-hero.webp`;
  // Every sub-service is live and bookable. Where a photograph is missing, the
  // neutral House still-life stands in; there is no "coming soon" state.
  const heroImage = fileOr(requestedHero, PLACEHOLDER_HERO);

  // One real shot of the team on this service (brief: replace the before/after
  // slider + the generic re-captioned gallery with a single static image).
  // Falls back to the sub-service hero, which is already the correct subject.
  const workImage = fileOr(
    `/services/photos/${parent.slug}/${service.slug}-work.webp`,
    heroImage,
  );

  // The other real shots of this service (correct per sub, not the generic
  // parent gallery) — only the tiles that actually exist are shown.
  const gallery = [1, 2, 3]
    .map((n) => fileOr(`/services/photos/${parent.slug}/${service.slug}-gallery-${n}.webp`, COMING_SOON))
    .filter((src) => src !== COMING_SOON)
    .map((src, i) => ({ src, alt: `${service.name}, recent work ${i + 1}`, caption: `${service.name} · London` }));

  // Resolve content with a fallback to service-level defaults so every LIVE
  // sub-service page renders the same complete flow, even when the sub-service
  // data is just a name + lede. A sub-service's own content always wins;
  // `included` + `faq` inherit from the parent service, `body` + `whyChoose`
  // from SERVICE_CONTENT_DEFAULTS. (Coming-soon subs stay minimal — gated on
  // !heroSoon below.)
  const defaults = SERVICE_CONTENT_DEFAULTS[parent.slug];
  // ServiceOS deep-link, preselected to THIS sub-service where we have a
  // matching id (falls back to a fresh booking otherwise). No postcode field in
  // the leaf hero, so the visitor enters it in the flow. Rendered as a plain <a>
  // (full navigation) below so the OBF re-initialises and reads the service_id.
  const bookHref = buildBookingUrl(
    "",
    SERVICEOS_SERVICE_ID[service.slug] ?? SERVICEOS_SERVICE_ID[parent.slug],
  );
  const aboutBody = service.body ?? defaults?.body ?? parent.lede;
  const whyChoose = service.whyChoose?.length ? service.whyChoose : (defaults?.whyChoose ?? []);
  const included = service.included?.length ? service.included : parent.sections.included;
  const faq = service.faq?.length ? service.faq : parent.faq;

  const hasAbout = Boolean(aboutBody) || whyChoose.length > 0;
  const hasIncluded = included.length > 0;
  const hasVisuals = workImage !== COMING_SOON;
  const hasFaq = faq.length > 0;
  const hasRelated = siblings.length > 0;

  return (
    <div className={s.page}>
      {/* 1. Hero — split */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <nav aria-label="Breadcrumb" className={s.heroEy}>
              <Link href="/services" className={s.crumbLink}>Services</Link>
              <span className={s.crumbSep}>·</span>
              <Link href={`/services/${parent.slug}`} className={s.crumbLink}>
                {parent.name}
              </Link>
            </nav>

            <h1 className={s.heroTitle}>
              {service.name}<em>.</em>
            </h1>
            <p className={s.heroLede}>{service.lede}</p>
            {/* DIRECTIVE §08 — a price method in the hero. */}
            <p className={s.heroLede} style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px" }}>
              Enter your postcode for prices and availability.
            </p>
            <div className={s.heroCtas}>
              <a href={bookHref} className={s.btnFilled}>
                Book this service
              </a>
              <Link href="/contact" className={s.btnGhost}>
                Not sure? Ask the House
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
            {/* DIRECTIVE §08 — provider disclosure in the hero. */}
            <p className={s.heroLede} style={{ fontSize: 13, opacity: 0.85, marginTop: 12 }}>
              Delivered by House of Willow Alexander. Booking, scheduling and Home Record powered by HoWA.
            </p>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={heroImage}
            alt={service.name}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* 2. About + Why choose */}
      {hasAbout ? (
        <section className={s.about}>
          <div className={s.aboutGrid}>
            {aboutBody ? (
              <div className={s.aboutCol}>
                <p className={s.sectionEy}>About this service</p>
                <h2 className={s.sectionTitle}>
                  What you can <em>expect.</em>
                </h2>
                <p className={s.aboutBody}>{aboutBody}</p>
              </div>
            ) : null}
            {whyChoose.length > 0 ? (
              <div className={s.aboutCol}>
                <p className={s.sectionEy}>Why choose us</p>
                <h2 className={s.sectionTitle}>
                  The House <em>standard.</em>
                </h2>
                <ul className={s.list}>
                  {whyChoose.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* 3. From the work — a single real shot of the team on this service */}
      {hasVisuals ? (
        <section className={s.work}>
          <header className={s.sectionHead}>
            <p className={s.sectionEy}>From the work</p>
            <h2 className={s.sectionTitle}>
              Our team, <em>on the job.</em>
            </h2>
            <p className={s.sectionLede}>
              A recent {service.name.toLowerCase()} visit. Every job is photographed
              and filed to your HoWA record.
            </p>
          </header>
          <div className={s.workBeforeAfter}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 2", overflow: "hidden" }}>
              <Image
                src={workImage}
                alt={`${service.name}, our team at work`}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          {gallery.length >= 1 ? (
            <div className={s.workGallery}>
              <Gallery
                images={gallery}
                columns={gallery.length >= 3 ? 3 : 2}
                aspectRatio="4/3"
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* 4. Enquiry form — conversion point right after the work photos. */}
      <div id="service-enquiry" className="scroll-mt-24">
        <EnquiryForm
          defaultService={parent.slug}
          sourcePage={`/services/${parent.slug}/${service.slug}`}
          eyebrow="Request a callback"
          headline={`Prefer a callback about ${service.name.toLowerCase()}?`}
          body="Leave your number and a little about your home, and the House will call you back, usually within one working day. Or book online in a couple of minutes."
        />
      </div>

      {/* 5. What's included */}
      {hasIncluded ? (
        <section className={s.included}>
          <header className={s.sectionHead}>
            <p className={s.sectionEy}>What's included</p>
            <h2 className={s.sectionTitle}>
              Every <em>visit.</em>
            </h2>
          </header>
          <ul className={s.includedList}>
            {included.map((inc) => (
              <li key={inc}>{inc}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Single booking CTA — after What's included, before the FAQ. */}
      <ServiceCtaRow service={service.name} bookHref={bookHref} />

      {/* 5. FAQ */}
      {hasFaq ? (
        <section className={s.faq}>
          <header className={s.sectionHead}>
            <p className={s.sectionEy}>Questions</p>
            <h2 className={s.sectionTitle}>
              About <em>{service.name.toLowerCase()}.</em>
            </h2>
          </header>
          <div className={s.faqInner}>
            <Accordion
              items={faq.map((f, i) => ({
                id: `sub-faq-${i}`,
                summary: f.q,
                body: <p>{f.a}</p>,
              }))}
            />
          </div>
        </section>
      ) : null}

      {/* 6. Related — over this service's own photo behind a black gradient. */}
      {hasRelated ? (
        <section className={s.related}>
          <div className={s.relatedBg}>
            <Image
              src={workImage}
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div aria-hidden className={s.relatedScrim} />
          <div className={s.relatedInner}>
            <header className={s.sectionHead}>
              <p className={s.sectionEy}>
                Other {parent.name.toLowerCase()} services
              </p>
              <h2 className={s.sectionTitle}>
                Everything under <em>{parent.name.toLowerCase()}.</em>
              </h2>
            </header>
            <div className={s.relatedGrid}>
              {siblings.map((sib) => (
                <Link
                  key={sib.slug}
                  href={`/services/${parent.slug}/${sib.slug}`}
                  className={s.relatedCard}
                >
                  <h3 className={s.relatedName}>{sib.name}</h3>
                  <p className={s.relatedBlurb}>{sib.lede}</p>
                  <span className={s.relatedCta}>See detail →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 9. Closing enquiry form */}
      <div className="scroll-mt-24">
        <EnquiryForm
          defaultService={parent.slug}
          sourcePage={`/services/${parent.slug}/${service.slug}`}
          eyebrow="Still deciding?"
          headline={`Talk to us about ${service.name.toLowerCase()}.`}
          body="Prefer to ask before you book? Tell us about your home and we'll come back to you personally, usually within one working day."
        />
      </div>

      <section className={s.closing}>
        <p className={s.closingKicker}>Ready when you are</p>
        <p className={s.closingStatement}>
          Book <em>{service.name.toLowerCase()}.</em>
        </p>
        <p className={s.closingLede}>
          A short consultation, a fair quote, and a team that arrives when we
          said they would.
        </p>
        <div className={s.closingCtas}>
          <a href={bookHref} className={s.btnFilled}>
            Book a service
          </a>
          <Link href={`/services/${parent.slug}`} className={s.btnGhost}>
            Back to {parent.name.toLowerCase()}
            <span aria-hidden="true" className={s.btnArrow}>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  const result: Array<{ slug: string; sub: string }> = [];
  for (const slug of SERVICE_ORDER) {
    const svc = SERVICES[slug];
    for (const sub of svc.subServices) {
      result.push({ slug, sub: sub.slug });
    }
  }
  return result;
}
