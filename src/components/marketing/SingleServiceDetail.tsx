import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { Accordion } from "@/components/primitives/Accordion";
import { Gallery } from "@/components/primitives/Gallery";
import { ServiceCtaRow } from "@/components/marketing/ServiceCtaRow";
import { BookingPanel } from "@/components/services/BookingPanel";
import { buildBookingUrl } from "@/components/booking/postcode";
import { SERVICEOS_SERVICE_ID } from "@/lib/serviceos-links";
import { serviceAccent } from "@/components/services/service-meta";
import s from "@/app/services/[slug]/[sub]/sub-service.module.css";

/**
 * SingleServiceDetail — the shared "single service" template.
 *
 * This is the layout the sub-service pages already used (e.g.
 * /services/gardening/garden-clearance): split hero with breadcrumb, About +
 * Why choose, one work shot, inline enquiry, What's included, FAQ, Related, and
 * a closing enquiry. It is the right shape for a LEAF service, one that has no
 * children of its own.
 *
 * Both render through it now, so they look identical:
 *   - real sub-services under a parent category (/services/[slug]/[sub]);
 *   - the standalone catalogue services (landscaping, roofing, plumbing …) that
 *     are leaf services in their own right (/services/[slug], quote mode).
 *
 * The parent CATEGORY pages (gardening, cleaning …) keep the richer
 * ServiceDetail template, because they genuinely have sub-services to list.
 */

export interface SingleServiceRelated {
  heading: string;
  title: string;
  items: Array<{ name: string; href: string; blurb: string }>;
}

export interface SingleServiceView {
  name: string;
  lede: string;
  heroImage: string;
  /** "book" prices from a postcode; "quote" is priced on the job. */
  mode: "book" | "quote";
  /** Breadcrumb trail, e.g. Services · Garden. */
  breadcrumb: Array<{ label: string; href: string }>;
  aboutBody?: string;
  whyChoose: string[];
  /** Omit to hide the "From the work" section (no photography of this service). */
  workImage?: string;
  gallery: Array<{ src: string; alt: string; caption?: string }>;
  included: string[];
  faq: Array<{ q: string; a: string }>;
  related?: SingleServiceRelated;
  /** serviceType slug prefilled into the enquiry form. */
  enquiryService: string;
  enquirySource: string;
  backHref: string;
  backLabel: string;
}

export function SingleServiceDetail({ view }: { view: SingleServiceView }) {
  const quote = view.mode === "quote";
  const accent = serviceAccent(view.enquiryService);
  const hasAbout = Boolean(view.aboutBody) || view.whyChoose.length > 0;
  const hasVisuals = Boolean(view.workImage);
  const hasIncluded = view.included.length > 0;
  const hasFaq = view.faq.length > 0;
  const hasRelated = Boolean(view.related && view.related.items.length > 0);

  return (
    <div className={s.page}>
      {/* 1. Hero + booking panel — 7/5 split, in line with ServiceDetail (§10) */}
      <section className="bg-house-cream px-[5vw] pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,6vw,96px)] border-b border-house-brown/10">
        <div className="mx-auto grid max-w-[1280px] items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-12">
          {/* Left — copy, proof, still-life (7 cols) */}
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="mb-6 font-sans text-[14px] tracking-[0.24em] uppercase text-house-gold-ink">
              {view.breadcrumb.map((c, i) => (
                <span key={c.href}>
                  {i > 0 ? <span aria-hidden className="mx-2 text-house-stone">/</span> : null}
                  <Link href={c.href} className="no-underline text-house-gold-ink hover:text-house-brown">
                    {c.label}
                  </Link>
                </span>
              ))}
            </nav>

            <h1 className="mb-5 font-hearth-serif font-normal text-[clamp(43px,5.4vw,77px)] leading-[1.04] tracking-[-0.018em] text-house-brown">
              {view.name}<em className="italic text-house-gold-ink">.</em>
            </h1>
            <p className="mb-6 max-w-[54ch] border-t border-house-brown/15 pt-5 font-sans text-[20px] leading-[1.65] text-house-brown/75">
              {view.lede}
            </p>

            {/* Key proof — service area only. No review score is shown: a rating
                renders only from a live, attributable source (§7.4, §27), and none
                is wired in yet, so we do not print a placeholder figure. */}
            <ul className="m-0 flex flex-wrap gap-x-8 gap-y-3 list-none p-0">
              <li className="font-sans text-[17px] text-house-brown/80">
                <span className="mr-2 text-house-gold-ink" aria-hidden>◆</span>
                Serving London and Kent
              </li>
            </ul>

            {/* Service colour / still-life frame */}
            <div className="mt-8 overflow-hidden border" style={{ borderColor: accent }}>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={view.heroImage}
                  alt={view.name}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </div>

            <p className="mt-5 font-sans text-[16px] leading-[1.55] text-house-brown/70">
              {quote
                ? "Delivered by a House team or a named House Approved professional, disclosed before you commit. Booking and Home Record powered by HoWA."
                : "Delivered by House of Willow Alexander. Booking, scheduling and Home Record powered by HoWA."}
            </p>
          </div>

          {/* Right — booking panel (5 cols), shared with ServiceDetail */}
          <BookingPanel
            serviceName={view.name}
            slug={view.enquiryService}
            accent={accent}
            mode={view.mode}
          />
        </div>
      </section>

      {/* 2. About + Why choose */}
      {hasAbout ? (
        <section className={s.about}>
          <div className={s.aboutGrid}>
            {view.aboutBody ? (
              <div className={s.aboutCol}>
                <p className={s.sectionEy}>About this service</p>
                <h2 className={s.sectionTitle}>
                  What you can <em>expect.</em>
                </h2>
                <p className={s.aboutBody}>{view.aboutBody}</p>
              </div>
            ) : null}
            {view.whyChoose.length > 0 ? (
              <div className={s.aboutCol}>
                <p className={s.sectionEy}>Why choose us</p>
                <h2 className={s.sectionTitle}>
                  The House <em>standard.</em>
                </h2>
                <ul className={s.list}>
                  {view.whyChoose.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* 3. From the work — one real shot, where we have it */}
      {hasVisuals ? (
        <section className={s.work}>
          <header className={s.sectionHead}>
            <p className={s.sectionEy}>From the work</p>
            <h2 className={s.sectionTitle}>
              Our team, <em>on the job.</em>
            </h2>
            <p className={s.sectionLede}>
              A recent {view.name.toLowerCase()} visit. Every job is photographed
              and filed to your HoWA record.
            </p>
          </header>
          <div className={s.workBeforeAfter}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 2", overflow: "hidden" }}>
              <Image
                src={view.workImage as string}
                alt={`${view.name}, our team at work`}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          {view.gallery.length >= 1 ? (
            <div className={s.workGallery}>
              <Gallery
                images={view.gallery}
                columns={view.gallery.length >= 3 ? 3 : 2}
                aspectRatio="4/3"
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* 4. Enquiry form */}
      <div id="service-enquiry" className="scroll-mt-24">
        <EnquiryForm
          defaultService={view.enquiryService}
          sourcePage={view.enquirySource}
          eyebrow="Ask the House"
          headline={`Prefer to ask about ${view.name.toLowerCase()} first?`}
          body="Tell us a little about your home and what you need, and the House will come back to you, usually within one working day. Or book online in a couple of minutes."
        />
      </div>

      {/* 5. What's included */}
      {hasIncluded ? (
        <section className={s.included}>
          <header className={s.sectionHead}>
            <p className={s.sectionEy}>What&apos;s included</p>
            <h2 className={s.sectionTitle}>
              Every <em>visit.</em>
            </h2>
          </header>
          <ul className={s.includedList}>
            {view.included.map((inc) => (
              <li key={inc}>{inc}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Single booking CTA */}
      <ServiceCtaRow
        service={view.name}
        bookHref={buildBookingUrl("", SERVICEOS_SERVICE_ID[view.enquiryService])}
      />

      {/* 6. FAQ */}
      {hasFaq ? (
        <section className={s.faq}>
          <header className={s.sectionHead}>
            <p className={s.sectionEy}>Questions</p>
            <h2 className={s.sectionTitle}>
              About <em>{view.name.toLowerCase()}.</em>
            </h2>
          </header>
          <div className={s.faqInner}>
            <Accordion
              items={view.faq.map((f, i) => ({
                id: `single-faq-${i}`,
                summary: f.q,
                body: <p>{f.a}</p>,
              }))}
            />
          </div>
        </section>
      ) : null}

      {/* 7. Related — over this service's own photo behind a black gradient. */}
      {hasRelated ? (
        <section className={s.related}>
          <div className={s.relatedBg}>
            <Image
              src={view.workImage ?? view.heroImage}
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div aria-hidden className={s.relatedScrim} />
          <div className={s.relatedInner}>
            <header className={s.sectionHead}>
              <p className={s.sectionEy}>{view.related!.heading}</p>
              <h2 className={s.sectionTitle}>{view.related!.title}</h2>
            </header>
            <div className={s.relatedGrid}>
              {view.related!.items.map((item) => (
                <Link key={item.href} href={item.href} className={s.relatedCard}>
                  <h3 className={s.relatedName}>{item.name}</h3>
                  <p className={s.relatedBlurb}>{item.blurb}</p>
                  <span className={s.relatedCta}>See detail →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 8. Closing enquiry form */}
      <div className="scroll-mt-24">
        <EnquiryForm
          defaultService={view.enquiryService}
          sourcePage={view.enquirySource}
          eyebrow="Still deciding?"
          headline={`Talk to us about ${view.name.toLowerCase()}.`}
          body="Prefer to ask before you book? Tell us about your home and we'll come back to you personally, usually within one working day."
        />
      </div>

      <section className={s.closing}>
        <p className={s.closingKicker}>Ready when you are</p>
        <p className={s.closingStatement}>
          Book <em>{view.name.toLowerCase()}.</em>
        </p>
        <p className={s.closingLede}>
          A short consultation, a fair quote, and a team that arrives when we
          said they would.
        </p>
        <div className={s.closingCtas}>
          <Link href="#open-booking-form" className={s.btnFilled}>
            Book a service
          </Link>
          <Link href={view.backHref} className={s.btnGhost}>
            {view.backLabel}
            <span aria-hidden="true" className={s.btnArrow}>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
