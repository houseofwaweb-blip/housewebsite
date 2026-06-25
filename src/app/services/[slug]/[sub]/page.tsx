import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/primitives/Accordion";
import { BeforeAfter } from "@/components/primitives/BeforeAfter";
import { Gallery } from "@/components/primitives/Gallery";
import { SERVICES, SERVICE_ORDER, type ServiceSlug } from "@/lib/services-data";
import s from "./sub-service.module.css";

const PUBLIC = path.join(process.cwd(), "public");
// Sub-services without their own photography get the "Coming Soon" placeholder
// with a "Service Coming Soon" label over the hero.
const COMING_SOON = "/services/service-placeholder.webp";
const PLACEHOLDER_HERO = COMING_SOON;
const PLACEHOLDER_GALLERY_TILE = "/services/photos/placeholders/gallery-4x3-v2.webp";
const PLACEHOLDER_BA = "/services/photos/placeholders/before-after-3x2-v2.webp";

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
 *   - Housekeeper upsell band
 *   - Service areas brown band
 *   - Partner carousel
 */

const PARENT_GALLERY: Record<string, Array<{ src: string; alt: string; caption?: string }>> = {
  gardening: [
    { src: "/services/photos/gardening-gallery-1.webp", alt: "Gardener at work", caption: "London · 2025" },
    { src: "/services/photos/gardening-gallery-2.webp", alt: "Mature herbaceous border", caption: "Home Counties · 2025" },
    { src: "/services/photos/gardening-gallery-3.webp", alt: "Lawn detail", caption: "Surrey · 2024" },
  ],
  "window-cleaning": [
    { src: "/services/photos/window-cleaning-gallery-1.webp", alt: "Pure water pole on sash window", caption: "London · 2025" },
    { src: "/services/photos/window-cleaning-gallery-2.webp", alt: "Window cleaning detail", caption: "London · 2025" },
    { src: "/services/photos/window-cleaning-gallery-3.webp", alt: "Upper floor cleaning", caption: "London · 2025" },
  ],
  cleaning: [
    { src: "/services/photos/cleaning-gallery-1.webp", alt: "Cleaning team on site", caption: "London · 2025" },
    { src: "/services/photos/cleaning-gallery-2.webp", alt: "Bathroom detail", caption: "London · 2025" },
    { src: "/services/photos/cleaning-gallery-3.webp", alt: "House-approved products", caption: "Brand · 2025" },
  ],
  "gutter-cleaning": [
    { src: "/services/photos/gutter-cleaning-gallery-1.webp", alt: "SkyVac in action", caption: "London · 2025" },
    { src: "/services/photos/gutter-cleaning-gallery-2.webp", alt: "Equipment detail", caption: "London · 2025" },
    { src: "/services/photos/gutter-cleaning-gallery-3.webp", alt: "Downpipe inspection", caption: "London · 2025" },
  ],
};

const PARENT_BEFORE_AFTER: Record<string, { before: string; after: string }> = {
  gardening: {
    before: "/services/photos/gardening-before.webp",
    after: "/services/photos/gardening-after.webp",
  },
  "window-cleaning": {
    before: "/services/photos/window-cleaning-before.webp",
    after: "/services/photos/window-cleaning-after.webp",
  },
  cleaning: {
    before: "/services/photos/cleaning-before.webp",
    after: "/services/photos/cleaning-after.webp",
  },
  "gutter-cleaning": {
    before: "/services/photos/gutter-cleaning-before.webp",
    after: "/services/photos/gutter-cleaning-after.webp",
  },
};

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
  const heroImage = fileOr(requestedHero, PLACEHOLDER_HERO);
  const heroSoon = heroImage === COMING_SOON;

  const baRaw = PARENT_BEFORE_AFTER[parent.slug];
  const ba = baRaw
    ? {
        before: fileOr(baRaw.before, PLACEHOLDER_BA),
        after: fileOr(baRaw.after, PLACEHOLDER_BA),
      }
    : null;

  const gallery = (PARENT_GALLERY[parent.slug] ?? []).map((g) => ({
    ...g,
    src: fileOr(g.src, PLACEHOLDER_GALLERY_TILE),
  }));

  const hasAbout = Boolean(service.body) || Boolean(service.whyChoose?.length);
  const hasIncluded = Boolean(service.included?.length);
  const hasVisuals = Boolean(ba || gallery.length > 0);
  const hasFaq = Boolean(service.faq?.length);
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
            <div className={s.heroCtas}>
              {heroSoon ? (
                <span className={s.btnFilled} style={{ cursor: "default" }}>
                  Service Coming Soon
                </span>
              ) : (
                <Link href="#open-booking-form" className={s.btnFilled}>
                  Book {service.name.toLowerCase()}
                </Link>
              )}
              <Link href={`/services/${parent.slug}`} className={s.btnGhost}>
                {heroSoon ? "Book another service" : `All ${parent.name.toLowerCase()}`}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
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
          {heroSoon ? <span className={s.comingSoonTag}>Service Coming Soon</span> : null}
        </div>
      </section>

      {/* 2. About + Why choose */}
      {hasAbout ? (
        <section className={s.about}>
          <div className={s.aboutGrid}>
            {service.body ? (
              <div className={s.aboutCol}>
                <p className={s.sectionEy}>About this service</p>
                <h2 className={s.sectionTitle}>
                  What you can <em>expect.</em>
                </h2>
                <p className={s.aboutBody}>{service.body}</p>
              </div>
            ) : null}
            {service.whyChoose?.length ? (
              <div className={s.aboutCol}>
                <p className={s.sectionEy}>Why choose us</p>
                <h2 className={s.sectionTitle}>
                  The House <em>standard.</em>
                </h2>
                <ul className={s.list}>
                  {service.whyChoose.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* 3. What's included */}
      {hasIncluded ? (
        <section className={s.included}>
          <header className={s.sectionHead}>
            <p className={s.sectionEy}>What's included</p>
            <h2 className={s.sectionTitle}>
              Every <em>visit.</em>
            </h2>
          </header>
          <ul className={s.includedList}>
            {service.included!.map((inc) => (
              <li key={inc}>{inc}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* 4. From the work — before/after + gallery */}
      {hasVisuals ? (
        <section className={s.work}>
          <header className={s.sectionHead}>
            <p className={s.sectionEy}>From the work</p>
            <h2 className={s.sectionTitle}>
              The visible <em>difference.</em>
            </h2>
            <p className={s.sectionLede}>
              Every job is photographed and filed to your HoWA record. Drag
              the handle below to see a recent transformation.
            </p>
          </header>
          {ba ? (
            <div className={s.workBeforeAfter}>
              <BeforeAfter
                before={{ src: ba.before, alt: `${service.name}, before` }}
                after={{ src: ba.after, alt: `${service.name}, after` }}
                aspectRatio="3/2"
              />
            </div>
          ) : null}
          {gallery.length > 0 ? (
            <div className={s.workGallery}>
              <Gallery
                images={gallery.map((g) => ({
                  ...g,
                  caption: `${service.name} · ${g.caption?.split(" · ")[0] ?? "London"}`,
                }))}
                columns={3}
                aspectRatio="4/3"
              />
            </div>
          ) : null}
        </section>
      ) : null}

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
              items={service.faq!.map((f, i) => ({
                id: `sub-faq-${i}`,
                summary: f.q,
                body: <p>{f.a}</p>,
              }))}
            />
          </div>
        </section>
      ) : null}

      {/* 6. Related */}
      {hasRelated ? (
        <section className={s.related}>
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
        </section>
      ) : null}

      {/* 7. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>Ready when you are</p>
        <p className={s.closingStatement}>
          {heroSoon ? (
            <><em>{service.name}</em> is coming soon.</>
          ) : (
            <>Book <em>{service.name.toLowerCase()}.</em></>
          )}
        </p>
        <p className={s.closingLede}>
          A short consultation, a fair quote, and a team that arrives when we
          said they would.
        </p>
        <div className={s.closingCtas}>
          {heroSoon ? (
            <span className={s.btnFilled} style={{ cursor: "default" }}>
              Service Coming Soon
            </span>
          ) : (
            <Link href="#open-booking-form" className={s.btnFilled}>
              Book through HoWA
            </Link>
          )}
          <Link href={heroSoon ? "/services" : `/services/${parent.slug}`} className={s.btnGhost}>
            {heroSoon ? "Book another service" : `Back to ${parent.name.toLowerCase()}`}
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
