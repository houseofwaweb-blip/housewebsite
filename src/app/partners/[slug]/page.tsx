import type { Metadata } from "next";
import { isApprovedPartner } from "@/lib/truth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/cms/fetch";
import { partnerBySlugQuery } from "@/lib/cms/queries";
import { urlFor } from "@/lib/cms/image";
import { PortableText } from "@/components/cms/PortableText";
import type { PortableTextBlock } from "@portabletext/types";
import {
  LAUNCH_PARTNERS,
  PARTNER_ORDER,
  type LaunchPartner,
  type PartnerSlug,
} from "@/lib/partners-data";
import { getAllPartnerSlugs } from "@/lib/cms/partners";
import s from "./partner.module.css";

/**
 * /partners/[slug] — lander framework.
 *
 * Order:
 *   1. Hero — full-bleed cover, cream copy bottom-left over scrim
 *   2. Designer block — portrait + bio
 *   3. Services (optional)
 *   4. Packages ladder — 3-up, featured middle
 *   5. Projects — 3-col grid
 *   6. FAQ
 *   7. Closing CTA
 */

interface SanityPartnerDoc {
  name: string;
  type: "design-studio" | "interior-designer" | "craftsman" | "brand-partner";
  shortBio: string;
  longBio?: PortableTextBlock[];
  founderPortrait?: { asset: { _ref: string }; alt: string };
  heroImage?: { asset: { _ref: string }; alt: string };
  portfolio?: Array<{
    title: string;
    year?: string;
    location?: string;
    image: { asset: { _ref: string } };
    alt: string;
    caption?: string;
  }>;
  specialties?: string[];
  serviceAreas?: string[];
  website?: string;
  instagram?: string;
  houseApprovedSeal?: boolean;
  seo?: { title?: string; description?: string; noindex?: boolean };
}

function isLocalSlug(slug: string): slug is PartnerSlug {
  return PARTNER_ORDER.includes(slug as PartnerSlug);
}

async function loadSanityPartner(slug: string): Promise<SanityPartnerDoc | null> {
  return sanityFetch<SanityPartnerDoc | null>({
    query: partnerBySlugQuery,
    params: { slug },
    tags: [`partner:${slug}`, "type:partner"],
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (isLocalSlug(slug)) {
    const p = LAUNCH_PARTNERS[slug];
    return { title: p.name, description: p.shortBio };
  }
  const partner = await loadSanityPartner(slug);
  if (!partner) return { title: "Partner not found" };
  return {
    title: partner.seo?.title ?? partner.name,
    description: partner.seo?.description ?? partner.shortBio,
    robots: partner.seo?.noindex ? { index: false, follow: true } : undefined,
  };
}

const TYPE_LABEL: Record<SanityPartnerDoc["type"], string> = {
  "design-studio": "Design studio",
  "interior-designer": "Interior designer",
  craftsman: "Craftsman",
  "brand-partner": "Brand partner",
};

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // STEP 14 fact gate: publish only what has been approved. Checked before both
  // the local and the Sanity lookups, because a partner profile can exist in
  // either and an unapproved one must fail closed. /partners/house-ai was
  // publishing from local data and /partners/jessica-durling-mcmahon from Sanity,
  // neither of them approved.
  if (!isApprovedPartner(slug)) notFound();

  if (isLocalSlug(slug)) {
    return <LocalPartnerPage partner={LAUNCH_PARTNERS[slug]} />;
  }

  const partner = await loadSanityPartner(slug);
  if (!partner) notFound();

  return <SanityPartnerPage partner={partner} />;
}

/** Splits `raw` at the `em` substring and italicises the tail. */
function withEm(raw: string, em?: string) {
  if (!em || !raw.includes(em)) return raw;
  const [head, ...rest] = raw.split(em);
  return (
    <>
      {head}
      <em>{em}</em>
      {rest.join(em)}
    </>
  );
}

function LocalPartnerPage({ partner: p }: { partner: LaunchPartner }) {
  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroImage}>
          <Image
            src={p.heroImage}
            alt={p.heroCaption}
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.heroScrim} aria-hidden="true" />
        <div className={s.heroCopy}>
          <p className={s.heroEy}>{p.heroEyebrow}</p>
          <h1 className={s.heroTitle}>
            {withEm(p.heroHeadline, p.heroHeadlineEm)}
          </h1>
          <p className={s.heroSub}>{p.heroSub}</p>
          <div className={s.heroCtas}>
            <a href="#designer" className={s.btnGhostLight}>
              Meet the studio
            </a>
            <Link href="#open-booking-form" className={s.btnFilledLight}>
              Start a brief →
            </Link>
          </div>
        </div>
        <span className={s.heroCaption}>{p.heroCaption}</span>
      </section>

      {/* 2. Designer block */}
      <section id="designer" className={s.designer}>
        <div className={s.designerPortrait}>
          <Image
            src={p.portraitImage}
            alt={`${p.name} portrait`}
            fill
            sizes="(min-width: 1024px) 320px, 80vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <div className={s.designerCopy}>
          <div className={s.designerSeal}>
            <span className={s.designerSealEy}>
              {p.houseApprovedSeal ? "House Approved partner" : p.typeLabel}
            </span>
            {p.houseApprovedSeal ? (
              <span className={s.designerSealMark}>■ House Approved</span>
            ) : null}
          </div>
          <h2 className={s.designerName}>{p.name}.</h2>
          <p className={s.designerRole}>{p.role}</p>
          {p.type !== "brand-partner" ? (
            <p
              style={{
                fontFamily: "var(--font-hearth-serif)",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--color-house-gold-ink)",
                margin: "12px 0 0",
              }}
            >
              Proud to partner with HoWA, who handles all our bookings.
            </p>
          ) : null}
          {p.longBio.map((para, i) => (
            <p
              key={i}
              className={i === 0 ? s.designerLede : s.designerBio}
            >
              {para}
            </p>
          ))}
          <div className={s.designerMeta}>
            <Meta label="Founded" value={p.founded} />
            <Meta label="Based" value={p.basedIn} />
            <Meta label="Recent" value={p.recent} />
          </div>
        </div>
      </section>

      {/* 3. Services (optional) */}
      {p.services && p.services.length > 0 ? (
        <section className={s.services}>
          <header className={s.servicesHead}>
            <p className={s.servicesEy}>Services provided</p>
            <h2 className={s.servicesTitle}>
              What {p.name.split(" ")[0]} <em>offers.</em>
            </h2>
          </header>
          <div className={s.servicesGrid}>
            {p.services.map((svc) => (
              <article key={svc.name} className={s.serviceCard}>
                <h3 className={s.serviceName}>{svc.name}</h3>
                <p className={s.servicePrice}>{svc.price}</p>
                <p className={s.serviceBlurb}>{svc.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* 4. Packages ladder */}
      <section className={s.packages}>
        <header className={s.packagesHead}>
          <p className={s.packagesEy}>HoWA · Package Ladder</p>
          <h2 className={s.packagesTitle}>
            {p.packagesHeading}
            {p.packagesHeadingEm ? <> <em>{p.packagesHeadingEm}</em></> : null}
          </h2>
          <p className={s.packagesLede}>{p.packagesLede}</p>
        </header>
        <div className={s.packagesGrid}>
          {p.packages.map((pkg) => (
            <article
              key={pkg.tier}
              className={`${s.packageCard} ${pkg.featured ? s.packageCardFeatured : ""}`}
            >
              <p className={s.packageTier}>{pkg.tier}</p>
              <h3 className={s.packageName}>{pkg.name}</h3>
              <p className={s.packagePrice}>
                from <strong>{pkg.priceFrom}</strong> · {pkg.priceUnit}
              </p>
              <p className={s.packageBestFor}>{pkg.bestFor}</p>
              <ul className={s.packageList}>
                {pkg.inclusions.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
              <Link href="#open-booking-form" className={s.packageCta}>
                {pkg.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Projects */}
      <section className={s.projects}>
        <header className={s.projectsHead}>
          <p className={s.projectsEy}>Recent work</p>
          <h2 className={s.projectsTitle}>
            {p.projectsHeading}
            {p.projectsHeadingEm ? <> <em>{p.projectsHeadingEm}</em></> : null}
          </h2>
        </header>
        <div className={s.projectsGrid}>
          {p.projects.map((proj) => {
            const inner = (
              <>
                <div className={s.projectImage}>
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className={s.projectCaption}>{proj.caption}</p>
                <h3 className={s.projectTitle}>{proj.title}</h3>
                <p className={s.projectMeta}>{proj.meta}</p>
              </>
            );
            return proj.href ? (
              <Link key={proj.title} href={proj.href} className={s.projectCard}>
                {inner}
              </Link>
            ) : (
              <article key={proj.title} className={s.projectCard}>
                {inner}
              </article>
            );
          })}
        </div>
      </section>

      {/* 6. FAQ */}
      <section className={s.faq}>
        <header className={s.faqHead}>
          <h2 className={s.faqTitle}>
            Before you commission, <em>some questions.</em>
          </h2>
        </header>
        <div className={s.faqList}>
          {p.faq.map((f) => (
            <div key={f.q} className={s.faqRow}>
              <h3 className={s.faqQ}>{f.q}</h3>
              <p className={s.faqA}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>{p.name}</p>
        <p className={s.closingStatement}>
          {withEm(p.closingLine, p.closingLineEm)}
        </p>
        <div className={s.closingCtas}>
          <Link href="#open-booking-form" className={s.btnFilled}>
            Start a brief
          </Link>
          <Link href="/partners" className={s.btnGhost}>
            All partners
            <span aria-hidden="true" className={s.btnArrow}>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className={s.designerMetaItem}>
      <span className={s.designerMetaLabel}>{label}</span>
      <span className={s.designerMetaValue}>{value}</span>
    </div>
  );
}

/* Sanity fallback — minimal lander-style profile for authored partners */
function SanityPartnerPage({ partner }: { partner: SanityPartnerDoc }) {
  return (
    <div className={s.page}>
      <section className={s.simpleHero}>
        <div className={s.simpleHeroCopy}>
          <p className={s.heroEy}>{TYPE_LABEL[partner.type]}</p>
          <h1 className={s.simpleHeroTitle}>{partner.name}.</h1>
          <p className={s.simpleHeroLede}>{partner.shortBio}</p>
          {partner.houseApprovedSeal ? (
            <span className={s.designerSealMark}>■ House Approved</span>
          ) : null}
        </div>
        {partner.heroImage ? (
          <div className={s.simpleHeroImage}>
            <Image
              src={urlFor(partner.heroImage).width(960).height(1200).url()}
              alt={partner.heroImage.alt}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}
      </section>

      {partner.longBio?.length ? (
        <section className={s.simpleBody}>
          <div className={s.simpleBodyInner}>
            <PortableText value={partner.longBio} />
          </div>
        </section>
      ) : null}
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPartnerSlugs();
  return slugs.map((slug) => ({ slug }));
}
