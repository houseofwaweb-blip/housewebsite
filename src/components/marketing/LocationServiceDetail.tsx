import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { Accordion } from "@/components/primitives/Accordion";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { BookingPanel } from "@/components/services/BookingPanel";
import { ServiceWordmark } from "@/components/marketing/ServiceWordmark";
import { buildBookingUrl } from "@/components/booking/postcode";
import { SERVICEOS_SERVICE_ID } from "@/lib/serviceos-links";
import { serviceEnquiryOptions } from "@/lib/services-data";
import {
  LOCATION_SERVICES,
  siblingServicesInTown,
  townRegion,
  type LocationPage,
} from "@/lib/services-data/locations";

const PUBLIC = path.join(process.cwd(), "public");
const PLACEHOLDER = "/services/service-placeholder.webp";

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

/**
 * LocationServiceDetail — a service × town local-SEO page (e.g. "Gardening in
 * Bromley"). Modeled on the live willowalexandergardeners.co.uk local pages:
 * postcode in the H1, an intro anchored to the town's character, the real
 * booking panel (postcode prefilled), what we cover here, a local proof line,
 * how it works, a "Request a <Town> quote" form, FAQs, cross-links to the other
 * launch services in the same town, and a closing CTA.
 */
export function LocationServiceDetail({ page }: { page: LocationPage }) {
  const { service, serviceSlug, town } = page;
  const cfg = LOCATION_SERVICES[serviceSlug];
  const postcodes = town.postcodes.join(", ");
  const pc0 = town.postcodes[0];
  const region = townRegion(town);
  const accent = service.colour ?? "var(--color-house-brown)";
  const heroImage = fileOr(service.heroImage, PLACEHOLDER);

  const cover =
    service.subServices.length > 0
      ? service.subServices.map((s) => s.name)
      : service.sections.included;

  const priced = service.packages.filter((p) => p.tier !== "steward");
  const fromPrice = priced[0]?.price ?? service.packages[0]?.price;

  const siblings = siblingServicesInTown(serviceSlug, town.slug);
  const bookHref = buildBookingUrl(pc0, SERVICEOS_SERVICE_ID[serviceSlug]);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* 1. Hero + booking panel — 7/5 split, same architecture as the service page */}
      <section className="bg-house-cream px-[5vw] pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,6vw,96px)] border-b border-house-brown/10">
        <div className="mx-auto grid max-w-[1280px] items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="mb-6 font-sans text-[14px] tracking-[0.24em] uppercase text-house-gold-ink">
              <Link href="/services" className="no-underline text-house-gold-ink hover:text-house-brown">
                Services
              </Link>
              <span aria-hidden className="mx-2 text-house-stone">/</span>
              <Link href={`/services/${serviceSlug}`} className="no-underline text-house-gold-ink hover:text-house-brown">
                {service.name}
              </Link>
              <span aria-hidden className="mx-2 text-house-stone">/</span>
              <span className="text-house-brown/70">{town.name}</span>
            </nav>

            <ServiceWordmark slug={serviceSlug} className="mb-5" />

            <h1 className="mb-5 font-hearth-serif font-normal text-[clamp(38px,4.8vw,68px)] leading-[1.05] tracking-[-0.018em] text-house-brown">
              {service.name} in {town.name}{" "}
              <span className="text-house-gold-ink">({postcodes})</span>
            </h1>

            <p className="mb-6 max-w-[54ch] border-t border-house-brown/15 pt-5 font-sans text-[20px] leading-[1.65] text-house-brown/75">
              {cfg.verb} across {town.name}. For the {town.character} of {pc0},
              booked and recorded through HoWA.
            </p>

            <ul className="m-0 flex flex-wrap gap-x-8 gap-y-3 list-none p-0">
              {fromPrice ? (
                <li className="font-sans text-[17px] text-house-brown/80">
                  <span className="mr-2 text-house-gold-ink" aria-hidden>◆</span>
                  {fromPrice}
                </li>
              ) : null}
              <li className="font-sans text-[17px] text-house-brown/80">
                <span className="mr-2 text-house-gold-ink" aria-hidden>◆</span>
                Covering {town.name} and {region === "Kent" ? "north Kent" : "south London"}
              </li>
            </ul>

            <div className="mt-8 overflow-hidden border" style={{ borderColor: accent }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={`${service.name} in ${town.name}`}
                className="block aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          <BookingPanel
            serviceName={service.name}
            slug={serviceSlug}
            accent={accent}
            mode="book"
            fromPrice={fromPrice}
            initialPostcode={pc0}
          />
        </div>
      </section>

      {/* Trust strip */}
      {service.trustBadges.length > 0 ? (
        <section className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-house-brown/10 bg-house-cream-light px-[5vw] py-5">
          {service.trustBadges.map((badge) => (
            <span key={badge} className="font-sans text-[13px] tracking-[0.2em] uppercase text-house-brown/60">
              {badge}
            </span>
          ))}
        </section>
      ) : null}

      {/* 2. What we cover in <Town> */}
      <section className="px-[5vw] py-[clamp(48px,6vw,88px)] border-b border-house-brown/10">
        <div className="mx-auto max-w-[1080px]">
          <header className="mb-10 max-w-[640px]">
            <p className="mb-3 font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-ink">
              In {town.name}
            </p>
            <h2 className="font-hearth-serif text-[clamp(29px,3.2vw,44px)] leading-[1.1] text-house-brown">
              What we cover in {town.name}.
            </h2>
          </header>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {cover.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-t border-house-brown/10 py-3.5 font-sans text-[17px] leading-[1.5] text-house-brown/85"
              >
                <span aria-hidden className="mt-[7px] text-[9px] text-house-gold-ink">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Local proof */}
      <section className="px-[5vw] py-[clamp(48px,6vw,88px)] border-b border-house-brown/10 bg-house-cream-light">
        <div className="mx-auto grid max-w-[1080px] items-center gap-[clamp(24px,4vw,56px)] md:grid-cols-2">
          <div className="overflow-hidden border" style={{ borderColor: accent }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt={`${cfg.proofLabel} in ${town.name}`} className="block aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <p className="mb-3 font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-ink">
              {cfg.proofLabel} · {town.name}
            </p>
            <h2 className="mb-5 font-hearth-serif text-[clamp(27px,3vw,40px)] leading-[1.12] text-house-brown">
              Local work, held to the House standard.
            </h2>
            <p className="font-sans text-[19px] leading-[1.7] text-house-brown/78">
              Our own team, working across {town.name} and {region === "Kent" ? "north Kent" : "south London"}.
              Every visit is photographed and filed to your Home Record, so the
              history of your {cfg.noun} stays in one place.
            </p>
          </div>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="px-[5vw] py-[clamp(48px,6vw,88px)] border-b border-house-brown/10">
        <div className="mx-auto max-w-[1080px]">
          <header className="mb-10 max-w-[640px]">
            <p className="mb-3 font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-ink">
              How it works
            </p>
            <h2 className="font-hearth-serif text-[clamp(29px,3.2vw,44px)] leading-[1.1] text-house-brown">
              From first message to first visit.
            </h2>
          </header>
          <ol className="grid gap-px bg-house-brown/10 sm:grid-cols-2 lg:grid-cols-4">
            {service.sections.how.map((step, i) => (
              <li key={step} className="bg-house-cream px-6 py-7">
                <p className="mb-3 font-display italic text-[19px] text-house-gold-ink">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-sans text-[17px] leading-[1.55] text-house-brown/85">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Request a <Town> quote */}
      <div id="service-enquiry" className="scroll-mt-24">
        <EnquiryForm
          defaultService={serviceSlug}
          sourcePage={`/services/local/${page.slug}`}
          eyebrow={`In ${town.name}`}
          headline={`Request ${/^[AEIOU]/i.test(town.name) ? "an" : "a"} ${town.name} quote.`}
          body={`Tell us about your ${cfg.noun} in ${town.name} and the House will come back to you with a clear, itemised quote, usually within one working day. Or book online in a couple of minutes.`}
          serviceOptions={serviceEnquiryOptions(service)}
          baseServiceType={serviceSlug}
        />
      </div>

      {/* 6. FAQs */}
      {service.faq.length > 0 ? (
        <section className="px-[5vw] py-[clamp(48px,6vw,88px)] border-b border-house-brown/10 bg-house-cream-light">
          <div className="mx-auto max-w-[820px]">
            <header className="mb-8">
              <p className="mb-3 font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-ink">
                Questions
              </p>
              <h2 className="font-hearth-serif text-[clamp(29px,3.2vw,44px)] leading-[1.1] text-house-brown">
                {service.name} in {town.name}.
              </h2>
            </header>
            <Accordion
              items={service.faq.map((f, i) => ({
                id: `loc-faq-${i}`,
                summary: f.q,
                body: <p>{f.a}</p>,
              }))}
            />
          </div>
        </section>
      ) : null}

      {/* 7. Also available in <Town> — the internal mesh */}
      <section className="px-[5vw] py-[clamp(48px,6vw,88px)] border-b border-house-brown/10">
        <div className="mx-auto max-w-[1080px]">
          <header className="mb-10 max-w-[640px]">
            <p className="mb-3 font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-ink">
              More from the House in {town.name}
            </p>
            <h2 className="font-hearth-serif text-[clamp(29px,3.2vw,44px)] leading-[1.1] text-house-brown">
              Also available in {town.name}.
            </h2>
          </header>
          <div className="grid gap-6 sm:grid-cols-3">
            {siblings.map((sib) => (
              <Link
                key={sib.href}
                href={sib.href}
                className="group block overflow-hidden border border-house-brown/12 bg-house-cream no-underline text-house-brown transition-colors hover:border-house-brown/30"
              >
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fileOr(sib.image, PLACEHOLDER)}
                    alt={`${sib.name} in ${town.name}`}
                    className="block aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-hearth-serif text-[22px] leading-[1.15] text-house-brown">
                    {sib.name} in {town.name}
                  </h3>
                  <p className="mb-4 font-sans text-[15px] leading-[1.5] text-house-brown/70">
                    {sib.verb}.
                  </p>
                  <span className="font-sans text-[13px] tracking-[0.2em] uppercase text-house-gold-ink">
                    See {town.name} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Closing CTA */}
      <section className="bg-house-brown px-[5vw] py-[clamp(52px,6vw,96px)] text-center text-house-cream">
        <div className="mx-auto max-w-[680px]">
          <p className="mb-5 font-sans text-[14px] tracking-[0.32em] uppercase text-house-gold-light">
            Looking after homes in {town.name}
          </p>
          <h2 className="font-hearth-serif text-[clamp(31px,3.6vw,50px)] leading-[1.08]">
            {service.name} in {town.name}, booked in two minutes.
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={bookHref}
              className="inline-block border border-house-cream bg-house-cream px-7 py-4 font-sans text-[16px] tracking-[0.2em] uppercase text-house-brown no-underline transition-colors hover:bg-house-gold hover:border-house-gold"
            >
              See times &amp; prices
            </a>
            <Link
              href={`/services/${serviceSlug}`}
              className="font-sans text-[16px] tracking-[0.2em] uppercase text-house-cream/85 underline decoration-house-gold-light underline-offset-4 hover:text-house-cream"
            >
              All {service.name.toLowerCase()} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
