import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/cms/fetch";
import { serviceBySlugQuery } from "@/lib/cms/queries";
import { urlFor } from "@/lib/cms/image";
import { SERVICES, SERVICE_ORDER, type ServiceSlug } from "@/lib/services-data";
import { SOON_SERVICE_CARDS } from "../page";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { getAllServiceSlugs } from "@/lib/cms/services";
import { ServiceDetail } from "@/components/marketing/ServiceDetail";
import { PortableText } from "@/components/cms/PortableText";
import type { PortableTextBlock } from "@portabletext/types";
import { ServiceJsonLd } from "@/lib/seo/jsonLd";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { env } from "@/lib/env";
import s from "./service-fallback.module.css";

/**
 * /services/[slug]
 *
 * Resolution order:
 *   1. Local services-data (for the 4 launch services, hardcoded). Renders via ServiceDetail.
 *   2. Sanity `service` doc matching the slug. Renders below in lander framework.
 *   3. 404.
 */

interface ServicePackage {
  _id: string;
  name: string;
  slug: string;
  tier: "one-off" | "care" | "steward";
  price: string;
  inclusions: string[];
  bestFor?: string;
  cta: "bookNow" | "payNow" | "quoteEntry" | "applicationOnly" | "waitlist";
}

interface ServiceSection {
  kind: "included" | "how" | "faq" | "richText";
  heading?: string;
  bullets?: string[];
  body?: PortableTextBlock[];
}

interface ServiceDoc {
  name: string;
  category: string;
  lede: string;
  hero?: {
    eyebrow?: string;
    headline?: string;
    image?: { asset: { _ref: string }; alt: string };
    imageAlt?: string;
  };
  sections?: ServiceSection[];
  recurring?: boolean;
  availableAreas?: string[];
  linkedPackages?: ServicePackage[];
  seo?: { title?: string; description?: string; noindex?: boolean };
}

async function loadSanityService(slug: string): Promise<ServiceDoc | null> {
  return sanityFetch<ServiceDoc | null>({
    query: serviceBySlugQuery,
    params: { slug },
    tags: [`service:${slug}`, "type:service"],
  });
}

function isLocalSlug(slug: string): slug is ServiceSlug {
  return SERVICE_ORDER.includes(slug as ServiceSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (isLocalSlug(slug)) {
    const local = SERVICES[slug];
    return {
      title: local.name,
      description: local.lede,
    };
  }
  const service = await loadSanityService(slug);
  if (!service) {
    const soon = SOON_SERVICE_CARDS.find((c) => c.slug === slug);
    if (soon) {
      return {
        title: `${soon.name} (coming soon)`,
        description: `${soon.tagline} ${soon.body}`,
      };
    }
    return { title: "Service not found" };
  }
  return {
    title: service.seo?.title ?? service.name,
    description: service.seo?.description ?? service.lede,
  };
}

const CTA_LABEL: Record<ServicePackage["cta"], string> = {
  bookNow: "Book through HoWA",
  payNow: "Pay now",
  quoteEntry: "Get a quote",
  applicationOnly: "Apply to join",
  waitlist: "Register interest",
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

  // 1. Local data — 4 launch services
  if (isLocalSlug(slug)) {
    const local = SERVICES[slug];
    return (
      <>
        <ServiceJsonLd
          name={local.name}
          description={local.lede}
          url={`${baseUrl}/services/${slug}`}
          serviceType={local.name}
        />
        <MetaViewContent
          contentId={slug}
          contentName={local.name}
          contentCategory="service"
          contentType="product"
        />
        <ServiceDetail service={local} />
      </>
    );
  }

  // 2. Sanity fallback — lander framework
  const service = await loadSanityService(slug);

  // 3. Coming-soon services (linked from the index + footer, no full page yet)
  if (!service) {
    const soon = SOON_SERVICE_CARDS.find((c) => c.slug === slug);
    if (soon) return <ComingSoonService card={soon} />;
    notFound();
  }

  return (
    <div className={s.page}>
      <ServiceJsonLd
        name={service.name}
        description={service.lede}
        url={`${baseUrl}/services/${slug}`}
        serviceType={service.category}
        image={
          service.hero?.image
            ? urlFor(service.hero.image).width(1200).height(800).url()
            : undefined
        }
        areaServed={service.availableAreas?.[0] ?? "London"}
      />
      <MetaViewContent
        contentId={slug}
        contentName={service.name}
        contentCategory={service.category ?? "service"}
        contentType="product"
      />
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{service.hero?.eyebrow ?? "Service"}</p>
            <h1 className={s.heroTitle}>
              {service.hero?.headline ?? service.name}
            </h1>
            <p className={s.heroLede}>{service.lede}</p>
            <div className={s.heroCtas}>
              <Link href="#open-booking-form" className={s.btnFilled}>
                Book this service
              </Link>
              {service.recurring ? (
                <span className={s.heroBadge}>Steward-ready</span>
              ) : null}
            </div>
          </div>
        </div>
        {service.hero?.image ? (
          <div className={s.heroVisual}>
            <Image
              src={urlFor(service.hero.image).width(960).height(1200).url()}
              alt={service.hero.image.alt ?? service.hero.imageAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        ) : null}
      </section>

      {/* Sections */}
      {service.sections?.map((section, i) => {
        if (section.kind === "included" || section.kind === "how") {
          return (
            <section key={i} className={s.list}>
              <header className={s.listHead}>
                <p className={s.listEy}>
                  {section.kind === "included" ? "What's included" : "How it works"}
                </p>
                {section.heading ? (
                  <h2 className={s.listTitle}>{section.heading}</h2>
                ) : null}
              </header>
              <ul className={s.listItems}>
                {section.bullets?.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </section>
          );
        }
        if (section.kind === "richText" && section.body) {
          return (
            <section key={i} className={s.rich}>
              <div className={s.richInner}>
                <PortableText value={section.body} />
              </div>
            </section>
          );
        }
        return null;
      })}

      {/* Packages */}
      {service.linkedPackages?.length ? (
        <section className={s.packages}>
          <header className={s.packagesHead}>
            <p className={s.packagesEy}>Packages</p>
            <h2 className={s.packagesTitle}>
              How we price <em>{service.name.toLowerCase()}.</em>
            </h2>
          </header>
          <div className={s.packagesGrid}>
            {service.linkedPackages.map((pkg) => (
              <article key={pkg._id} className={s.packageCard}>
                <p className={s.packageTier}>
                  {pkg.tier === "steward"
                    ? "Steward plan"
                    : pkg.tier === "care"
                      ? "Care plan"
                      : "One-off"}
                </p>
                <h3 className={s.packageName}>{pkg.name}</h3>
                <p className={s.packagePrice}>{pkg.price}</p>
                {pkg.bestFor ? (
                  <p className={s.packageBest}>Best for {pkg.bestFor}</p>
                ) : null}
                <ul className={s.packageList}>
                  {pkg.inclusions.map((inc, k) => (
                    <li key={k}>{inc}</li>
                  ))}
                </ul>
                <Link href="#open-booking-form" className={s.packageCta}>
                  {CTA_LABEL[pkg.cta]}
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Service areas */}
      {service.availableAreas?.length ? (
        <section className={s.areas}>
          <div className={s.areasInner}>
            <div>
              <p className={s.areasEy}>Coverage</p>
              <p className={s.areasList}>
                Available across: {service.availableAreas.join(", ")}.
              </p>
            </div>
            <Link href="/contact" className={s.areasLink}>
              Not your area? Write to us →
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}

/** Coming-soon page for a deferred service: still informative, still captures
 *  interest, never a 404. */
function ComingSoonService({
  card,
}: {
  card: { slug: string; name: string; tagline: string; body: string; image: string };
}) {
  return (
    <div className={s.page}>
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>Coming soon</p>
            <h1 className={s.heroTitle}>{card.name}</h1>
            <p className={s.heroLede}>
              {card.tagline} {card.body}
            </p>
            <div className={s.heroCtas}>
              <Link href="/services" className={s.btnGhost}>
                Browse live services →
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={card.image}
            alt={card.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <EnquiryForm
        defaultService="general"
        sourcePage={`/services/${card.slug}`}
        eyebrow="Register interest"
        headline={`${card.name} is coming to the House.`}
        body={`We are bringing ${card.name.toLowerCase()} to the House. Leave your details and we will tell you the moment it opens, and answer anything in the meantime.`}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  const soon = SOON_SERVICE_CARDS.map((c) => c.slug);
  return Array.from(new Set([...slugs, ...soon])).map((slug) => ({ slug }));
}
