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
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { Button } from "@/components/primitives/Button";
import { PortableText } from "@/components/cms/PortableText";
import type { PortableTextBlock } from "@portabletext/types";

/**
 * /services/[slug]
 *
 * Resolution order:
 *   1. Local services-data (for the 4 launch services, hardcoded).
 *   2. Sanity `service` doc matching the slug.
 *   3. 404.
 *
 * Once Sanity authors the 4 services, delete the local dataset or keep
 * it as a safety net. Both shapes are compatible.
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
  if (!service) return { title: "Service not found" };
  return {
    title: service.seo?.title ?? service.name,
    description: service.seo?.description ?? service.lede,
  };
}

const CTA_LABEL: Record<ServicePackage["cta"], string> = {
  bookNow: "Book now",
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

  // 1. Local data — 4 launch services
  if (isLocalSlug(slug)) {
    return <ServiceDetail service={SERVICES[slug]} />;
  }

  // 2. Sanity fallback
  const service = await loadSanityService(slug);
  if (!service) notFound();

  return (
    <article className="bg-house-cream text-house-brown">
      <section className="px-[5vw] py-[14vh]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1.1fr_minmax(360px,480px)] gap-16 items-end">
          <div>
            <Eyebrow>{service.hero?.eyebrow ?? "Service"}</Eyebrow>
            <h1 className="font-display text-[clamp(44px,6vw,80px)] font-medium leading-[1.05] tracking-[-0.01em] mt-4">
              {service.hero?.headline ?? service.name}
            </h1>
            <p className="font-sans text-[20px] leading-[1.6] text-house-brown/80 mt-8 max-w-[54ch]">
              {service.lede}
            </p>
            <div className="flex gap-4 mt-10">
              <Button variant="gold" href={`/book-consultation?service=${slug}`}>
                Book this service
              </Button>
              {service.recurring ? <StateBadge state="live">Steward-ready</StateBadge> : null}
            </div>
          </div>
          {service.hero?.image ? (
            <Image
              src={urlFor(service.hero.image).width(960).height(1200).url()}
              alt={service.hero.image.alt ?? service.hero.imageAlt ?? ""}
              width={960}
              height={1200}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="w-full h-auto"
              priority
            />
          ) : null}
        </div>
      </section>

      {service.sections?.map((section, i) => {
        if (section.kind === "included" || section.kind === "how") {
          return (
            <section key={i} className="px-[5vw] py-16 border-t border-house-brown/10">
              <div className="max-w-[960px] mx-auto">
                <Eyebrow>
                  {section.kind === "included" ? "What's included" : "How it works"}
                </Eyebrow>
                {section.heading ? (
                  <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-medium leading-[1.15] mt-4">
                    {section.heading}
                  </h2>
                ) : null}
                <ul
                  className={`mt-8 grid gap-3 ${
                    section.kind === "how" ? "md:grid-cols-1" : "md:grid-cols-2"
                  }`}
                >
                  {section.bullets?.map((b, j) => (
                    <li
                      key={j}
                      className="font-sans text-[17px] leading-[1.55] pl-5 relative before:content-['·'] before:absolute before:left-0 before:text-house-gold before:text-[24px] before:leading-none"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        }
        if (section.kind === "richText" && section.body) {
          return (
            <section key={i} className="px-[5vw] py-16 border-t border-house-brown/10">
              <div className="max-w-[720px] mx-auto">
                <PortableText value={section.body} />
              </div>
            </section>
          );
        }
        return null;
      })}

      {service.linkedPackages?.length ? (
        <section className="px-[5vw] py-20 bg-white border-t border-house-brown/10">
          <div className="max-w-[1280px] mx-auto">
            <Eyebrow>Packages</Eyebrow>
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-medium leading-[1.15] mt-4 mb-12">
              How we price {service.name.toLowerCase()}.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.linkedPackages.map((pkg) => (
                <div key={pkg._id} className="border border-house-brown/12 p-8 flex flex-col">
                  <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-2">
                    {pkg.tier === "steward"
                      ? "Steward plan"
                      : pkg.tier === "care"
                        ? "Care plan"
                        : "One-off"}
                  </div>
                  <h3 className="font-display text-[26px] font-medium leading-[1.2]">
                    {pkg.name}
                  </h3>
                  <div className="font-display text-[22px] text-house-brown/80 mt-2">
                    {pkg.price}
                  </div>
                  {pkg.bestFor ? (
                    <p className="font-sans italic text-[14px] text-house-brown/60 mt-3">
                      Best for {pkg.bestFor}
                    </p>
                  ) : null}
                  <ul className="mt-6 space-y-2 flex-1">
                    {pkg.inclusions.map((inc, k) => (
                      <li
                        key={k}
                        className="font-sans text-[15px] leading-[1.5] pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                      >
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      variant="outline"
                      href={`/book-consultation?service=${slug}&package=${pkg.slug}`}
                    >
                      {CTA_LABEL[pkg.cta]}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.availableAreas?.length ? (
        <section className="px-[5vw] py-14 bg-house-brown text-house-cream">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-2 font-sans">
                Coverage
              </div>
              <div className="font-sans text-[18px]">
                Available across: {service.availableAreas.join(", ")}.
              </div>
            </div>
            <Link
              href="/contact"
              className="font-sans text-[11px] tracking-[0.2em] uppercase underline underline-offset-4"
            >
              Not your area? Write to us →
            </Link>
          </div>
        </section>
      ) : null}
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}
