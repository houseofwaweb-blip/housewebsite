import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { Accordion } from "@/components/primitives/Accordion";
import { BeforeAfter } from "@/components/primitives/BeforeAfter";
import { Gallery } from "@/components/primitives/Gallery";
import { SERVICES, SERVICE_ORDER, type ServiceSlug } from "@/lib/services-data";
import { SERVICE_AREAS, SERVICE_TRUST_BADGES } from "@/lib/services-data/sub-services";

/**
 * /services/[slug]/[sub] — sub-service detail page.
 *
 * Sections:
 *   1. Breadcrumb + hero (focused headline + description)
 *   2. Why choose us (4 bullets)
 *   3. What's included
 *   4. Trust strip
 *   5. HoWA+ upsell band
 *   6. FAQ (if available)
 *   7. Related sub-services
 *   8. Service areas
 *   9. Book CTA
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
    title: `${result.sub.name} — ${result.parent.name}`,
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
  const siblings = parent.subServices.filter((s) => s.slug !== service.slug).slice(0, 6);

  return (
    <article className="bg-house-cream text-house-brown">
      {/* 1. Breadcrumb + Hero */}
      <section className="px-[5vw] pt-[88px] pb-14">
        <div className="max-w-[820px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-house-stone">
            <Link href="/services" className="no-underline hover:text-house-gold transition-colors">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/services/${parent.slug}`} className="no-underline hover:text-house-gold transition-colors">
              {parent.name}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-house-brown">{service.name}</span>
          </nav>

          <Eyebrow>{parent.eyebrow}</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(40px,5.5vw,72px)] leading-[1.08] tracking-[-0.01em] mt-4">
            {service.name}.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            {service.lede}
          </p>
          <div className="mt-8">
            <Link
              href={`/book-consultation?service=${parent.slug}&sub=${service.slug}`}
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Book now
            </Link>
          </div>
        </div>
      </section>

      {/* 1b. Before/After + Gallery */}
      <section className="px-[5vw] py-14 bg-white border-t border-house-brown/10">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <div>
              <Eyebrow>The difference</Eyebrow>
              <h2 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-4">
                Before &amp; after.
              </h2>
              <p className="font-sans italic text-[15px] text-house-stone leading-[1.55]">
                Drag the handle to see the transformation. Every job is photographed and filed to your HoWA record.
              </p>
            </div>
            <BeforeAfter
              before={{ src: "/partners/project-4.jpg", alt: `${service.name} — before` }}
              after={{ src: "/partners/project-1.jpg", alt: `${service.name} — after` }}
              aspectRatio="3/2"
            />
          </div>

          <Eyebrow>Recent work</Eyebrow>
          <h2 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-6">
            From the field.
          </h2>
          <Gallery
            images={[
              { src: "/partners/project-1.jpg", alt: `${service.name} example 1`, caption: `${service.name} · London` },
              { src: "/partners/project-2.jpg", alt: `${service.name} example 2`, caption: `${service.name} · Home Counties` },
              { src: "/partners/project-3.jpg", alt: `${service.name} example 3`, caption: `${service.name} · South East` },
            ]}
            columns={3}
            aspectRatio="4/3"
          />
        </div>
      </section>

      {/* 2. Extended description + Why choose */}
      {(service.body || service.whyChoose) ? (
        <section className="px-[5vw] py-16 bg-white border-t border-house-brown/10">
          <div className="max-w-[820px] mx-auto grid md:grid-cols-2 gap-12">
            {service.body ? (
              <div>
                <Eyebrow>About this service</Eyebrow>
                <p className="font-sans text-[17px] leading-[1.65] text-house-brown/90 mt-4">
                  {service.body}
                </p>
              </div>
            ) : null}
            {service.whyChoose?.length ? (
              <div>
                <Eyebrow>Why choose us</Eyebrow>
                <ul className="flex flex-col gap-3 mt-4">
                  {service.whyChoose.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* 3. What's included */}
      {service.included?.length ? (
        <section className="px-[5vw] py-16 border-t border-house-brown/10">
          <div className="max-w-[820px] mx-auto">
            <Eyebrow>What&apos;s included</Eyebrow>
            <h2 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-6">
              Every visit.
            </h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {service.included.map((inc) => (
                <li
                  key={inc}
                  className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                >
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 4. Trust strip */}
      <section className="bg-house-white border-t border-b border-house-brown/10 px-[5vw] py-5">
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-8 text-center">
          {SERVICE_TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-house-stone"
            >
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* 5. HoWA+ upsell band */}
      <section className="bg-howa-navy text-house-cream px-[5vw] py-16">
        <div className="max-w-[820px] mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <span className="block mb-3 font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light">
              HoWA+ Membership
            </span>
            <h3 className="font-sans font-normal text-[clamp(24px,2.8vw,34px)] leading-[1.15] tracking-[-0.01em] text-house-cream mb-3">
              Book, track, and save — all in one place.
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-cream/70 max-w-[46ch]">
              HoWA+ members get 10% off every service booking, reminders when
              care is due, and a living record of every visit.
            </p>
          </div>
          <Link
            href="/howa/plans"
            className="inline-block shrink-0 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Join HoWA+ — £16.99/mo
          </Link>
        </div>
      </section>

      {/* 6. FAQ */}
      {service.faq?.length ? (
        <section className="bg-house-white px-[5vw] py-[72px] border-t border-house-brown/10">
          <div className="max-w-[760px] mx-auto">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-8">
              About {service.name.toLowerCase()}.
            </h2>
            <Accordion
              items={service.faq.map((f, i) => ({
                id: `sub-faq-${i}`,
                summary: f.q,
                body: <p>{f.a}</p>,
              }))}
            />
          </div>
        </section>
      ) : null}

      {/* 7. Related sub-services */}
      {siblings.length > 0 ? (
        <section className="px-[5vw] py-16 border-t border-house-brown/10">
          <div className="max-w-[1200px] mx-auto">
            <Eyebrow>Other {parent.name.toLowerCase()} services</Eyebrow>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {siblings.map((sib) => (
                <Link
                  key={sib.slug}
                  href={`/services/${parent.slug}/${sib.slug}`}
                  className="group flex flex-col bg-white border border-house-brown/12 p-5 no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5 hover:border-house-gold"
                >
                  <h3 className="font-display font-medium text-[20px] leading-[1.2] text-house-brown group-hover:text-house-gold transition-colors duration-[var(--t-slow)] ease-out mb-2">
                    {sib.name}
                  </h3>
                  <p className="font-sans italic text-[14px] leading-[1.55] text-house-stone">
                    {sib.lede}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 8. Service areas */}
      <section className="px-[5vw] py-12 bg-house-brown text-house-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-3 font-sans">
            Where we offer {service.name.toLowerCase()}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-[16px] text-house-cream/90">
            {SERVICE_AREAS.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Book CTA */}
      <section className="bg-house-cream px-[5vw] py-14 text-center">
        <p className="mx-auto max-w-[520px] mb-6 font-sans italic text-[20px] leading-[1.4] text-house-brown">
          Ready to book {service.name.toLowerCase()}?
        </p>
        <Link
          href={`/book-consultation?service=${parent.slug}&sub=${service.slug}`}
          className="inline-block px-[30px] py-[15px] font-sans text-[13px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Book now
        </Link>
        <p className="mt-6">
          <GhostLink href={`/services/${parent.slug}`}>
            Back to {parent.name.toLowerCase()}
          </GhostLink>
        </p>
      </section>
    </article>
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
