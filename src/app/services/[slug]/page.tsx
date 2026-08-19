import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/cms/fetch";
import { serviceBySlugQuery } from "@/lib/cms/queries";
import { urlFor } from "@/lib/cms/image";
import { SERVICES, SERVICE_ORDER, type ServiceSlug } from "@/lib/services-data";
import { getAllServiceSlugs } from "@/lib/cms/services";
import { ServiceDetail } from "@/components/marketing/ServiceDetail";
import { SingleServiceDetail } from "@/components/marketing/SingleServiceDetail";
import { REQUESTABLE_SERVICES } from "@/lib/services-data/requestable";
import { getSingleServiceView } from "@/lib/services-data/requestable-detail";
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

/**
 * Standard services never present a "survey". Every service rendered through
 * ServiceDetail is a normal booking: postcode, availability and price ("book"
 * mode). Where a job genuinely cannot be instant-priced (e.g. removals), the
 * BookingPanel intake asks for a quote instead, in booking language, never a
 * survey. Survey / design-commission wording lives on the design pages, which
 * do not route through here.
 */

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
  const singleView = getSingleServiceView(slug);
  if (singleView) {
    return { title: singleView.name, description: singleView.lede };
  }
  const service = await loadSanityService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.seo?.title ?? service.name,
    description: service.seo?.description ?? service.lede,
  };
}

const CTA_LABEL: Record<ServicePackage["cta"], string> = {
  bookNow: "Book a service",
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
        <ServiceDetail service={local} mode="book" />
      </>
    );
  }

  // 1b. Wider catalogue — services the House arranges but cannot price from a
  // postcode. These are LEAF services (no sub-services of their own), so they
  // render through the shared single-service template, the same layout as a
  // sub-service page like /services/gardening/garden-clearance, rather than the
  // richer category template. Category pages (gardening, cleaning …) keep
  // ServiceDetail because they genuinely have sub-services to carousel.
  const singleView = getSingleServiceView(slug);
  if (singleView) {
    return (
      <>
        <ServiceJsonLd
          name={singleView.name}
          description={singleView.lede}
          url={`${baseUrl}/services/${slug}`}
          serviceType={singleView.name}
        />
        <MetaViewContent
          contentId={slug}
          contentName={singleView.name}
          contentCategory="service"
          contentType="product"
        />
        <SingleServiceDetail view={singleView} />
      </>
    );
  }

  // 2. Sanity fallback — lander framework
  const service = await loadSanityService(slug);

  // 3. Coming-soon services (linked from the index + footer, no full page yet)
  if (!service) {
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
            {/* DIRECTIVE §08 — a price method in the hero. */}
            <p className={s.heroLede} style={{ fontSize: 16, fontWeight: 600, margin: "0 0 14px" }}>
              Enter your postcode for prices and availability.
            </p>
            <div className={s.heroCtas}>
              <Link href="#open-booking-form" className={s.btnFilled}>
                See prices &amp; availability
              </Link>
              {service.recurring ? (
                <span className={s.heroBadge}>Recurring available</span>
              ) : null}
            </div>
            {/* DIRECTIVE §08 — provider disclosure in the hero. */}
            <p className={s.heroLede} style={{ fontSize: 15, opacity: 0.85, marginTop: 12 }}>
              Delivered by House of Willow Alexander. Booking, scheduling and Home Record powered by HoWA.
            </p>
          </div>
        </div>
        {service.hero?.image ? (
          <div className={s.heroVisual}>
            <Image
              src={urlFor(service.hero.image).width(1600).height(1200).url()}
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
                    ? "Recurring plan"
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
                Available across London and Kent.
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

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  // v3 §5 — the wider catalogue gets real, prerendered service URLs too.
  const quoteable = REQUESTABLE_SERVICES.filter((s) => !s.bookable).map((s) => s.slug);
  return Array.from(new Set([...slugs, ...quoteable])).map((slug) => ({ slug }));
}
