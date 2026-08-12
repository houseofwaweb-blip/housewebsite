import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { Accordion } from "@/components/primitives/Accordion";
import { Gallery } from "@/components/primitives/Gallery";
import { ServiceCtaRow } from "@/components/marketing/ServiceCtaRow";
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
  const hasAbout = Boolean(view.aboutBody) || view.whyChoose.length > 0;
  const hasVisuals = Boolean(view.workImage);
  const hasIncluded = view.included.length > 0;
  const hasFaq = view.faq.length > 0;
  const hasRelated = Boolean(view.related && view.related.items.length > 0);

  return (
    <div className={s.page}>
      {/* 1. Hero — split */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <nav aria-label="Breadcrumb" className={s.heroEy}>
              {view.breadcrumb.map((c, i) => (
                <span key={c.href}>
                  {i > 0 ? <span className={s.crumbSep}>·</span> : null}
                  <Link href={c.href} className={s.crumbLink}>{c.label}</Link>
                </span>
              ))}
            </nav>

            <h1 className={s.heroTitle}>
              {view.name}<em>.</em>
            </h1>
            <p className={s.heroLede}>{view.lede}</p>
            <p className={s.heroLede} style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px" }}>
              {quote
                ? "Priced by the job. Send a photograph or two and we come back within one working day."
                : "Enter your postcode for prices and availability."}
            </p>
            <div className={s.heroCtas}>
              <Link href="#open-booking-form" className={s.btnFilled}>
                Book this service
              </Link>
              <Link href="/services" className={s.btnGhost}>
                Not sure? Browse all services
              </Link>
            </div>
            <p className={s.heroLede} style={{ fontSize: 13, opacity: 0.85, marginTop: 12 }}>
              {quote
                ? "Delivered by a House team or a named House Approved professional, disclosed before you commit. Booking and scheduling powered by HoWA."
                : "Delivered by House of Willow Alexander. Booking and scheduling powered by HoWA."}
            </p>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={view.heroImage}
            alt={view.name}
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
          eyebrow="Enquire"
          headline={`Ask about ${view.name.toLowerCase()}.`}
          body="Tell us about your home and what you need. We come back to you personally, usually within one working day. Or book online in a couple of minutes."
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
      <ServiceCtaRow service={view.name} />

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
