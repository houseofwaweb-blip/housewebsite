import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import s from "./interiors.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";

/**
 * /services/interiors — the Interiors service (doc §10 Interiors).
 *
 * Consultation-led, NOT instant booking. Cream/white world with gold.
 * Ported from the /design/interiors page (imagery + portfolio retained) and
 * restructured to the doc's Interiors shape:
 *   portfolio -> design stages -> budget -> scope -> enquiry form.
 *
 * Deliberately carries no HoWA "Assistant" section: Assistant is a retired HoWA
 * tier and HoWA is not a product on this site. The route into the studio is an
 * enquiry, held by the House.
 */

export const metadata: Metadata = {
  title: "Interiors",
  description:
    "Consultation-led interior design, held by the House. Portfolio, design stages, budget guidance and scope, then a personal enquiry, every scheme House Approved.",
};

const STAT_COLS = [
  { value: "1:1", label: "Designer access" },
  { value: "3", label: "Ways to begin" },
  { value: "House", label: "Approved studio" },
  { value: "0", label: "Cookie-cutter schemes" },
];

const STAGES = [
  {
    name: "Consultation",
    body: "We start with a conversation about the room, how you live in it, and what you want it to become. No brief is too early.",
  },
  {
    name: "Concept & moodboard",
    body: "Palette, layout and material direction, worked out in plaster, paint, joinery and the light a room actually gets.",
  },
  {
    name: "Sourcing & specification",
    body: "Furniture, finishes and fabric, curated to the scheme with a clear, shoppable specification and honest pricing.",
  },
  {
    name: "Styling & install",
    body: "The scheme brought together in the room, considered down to the last placement, so it reads as one whole.",
  },
];

const PLANS = [
  {
    name: "The House Edit",
    tagline: "A 90-minute studio session.",
    price: "Priced on enquiry",
    inclusions: [
      "A 90-minute one-to-one online styling session",
      "Thoughtful guidance on palette, layout and sourcing",
      "A personalised PDF moodboard with curated links",
      "10% House Store discount",
    ],
    image: "/design/interiors/project-living-room.webp",
    featured: true,
  },
  {
    name: "Additions to Your Edit",
    tagline: "Room-by-room top-ups.",
    price: "Priced on enquiry",
    inclusions: [
      "A shoppable moodboard",
      "Sourcing per room",
      "A material pack: swatches, samples, scents",
      "A 30-minute follow-up call",
    ],
    image: "/design/interiors/project-bedroom.webp",
    featured: false,
  },
  {
    name: "The Full House Edit",
    tagline: "A whole-home brief, fully held.",
    price: "Priced on enquiry",
    inclusions: [
      "An initial 90-minute consultation",
      "Moodboards for up to three rooms",
      "Sourcing for two rooms",
      "A tactile material pack posted to you",
      "A 30-minute follow-up call",
      "15% House Store discount",
    ],
    image: "/design/interiors/project-detail.webp",
    featured: false,
  },
];

const PROJECTS = [
  {
    src: "/design/interiors/project-living-room.webp",
    caption: "Herts Living Room",
    alt: "Herts living room: layered textures, muted palette, natural light",
    span: "tall" as const,
  },
  {
    src: "/design/interiors/project-bedroom.webp",
    caption: "Buckingham Bedroom",
    alt: "Buckingham bedroom: deep green walls, brass accents, linen bedding",
    span: undefined,
  },
  {
    src: "/design/interiors/project-dining.webp",
    caption: "Herts Dining",
    alt: "Herts dining room: warm timber, candlelight, considered table setting",
    span: undefined,
  },
  {
    src: "/design/interiors/project-tunbridge-1.webp",
    caption: "Tunbridge Wells I",
    alt: "Tunbridge Wells: period drawing room with restored mouldings",
    span: undefined,
  },
  {
    src: "/design/interiors/project-tunbridge-2.webp",
    caption: "Tunbridge Wells II",
    alt: "Tunbridge Wells: layered sitting room with heritage palette",
    span: "wide" as const,
  },
];

export default function InteriorsServicePage() {
  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <FlowerWatermark color="gold" side="left" opacity={0.16} className="!top-auto bottom-[-12%] h-[74%]" />
          <div className={s.heroCopyInner}>
            <nav aria-label="Breadcrumb" className={s.breadcrumb}>
              <Link href="/services">Services</Link>
              <span aria-hidden className={s.breadcrumbSep}>/</span>
              <span className={s.breadcrumbHere}>Interiors</span>
            </nav>
            <p className={s.heroEy}>Services · Interiors</p>
            <h1 className={s.heroTitle}>
              Consciously designed <em>interiors.</em>
            </h1>
            <p className={s.heroLede}>
              Rooms read for the people who live in them, not decorated at them.
              Worked out in plaster, paint, joinery and the light a room actually
              gets, with a House Approved studio who know period fabric and how a
              home wears over years. This is a considered, consultation-led
              service, so we begin with a conversation, not a checkout.
            </p>
            <div className={s.heroCtas}>
              <Link href="#interiors-enquiry" className={s.btnFilled}>
                Start an enquiry
              </Link>
              <Link href="#portfolio" className={s.btnGhost}>
                See our work
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src="/design/interiors/project-tunbridge-1.webp"
            alt="Tunbridge Wells interior: restored period drawing room with garden light"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>Beauty. Balance. Intention.</p>
          <p className={s.statsLedeLine2}>Every scheme through a House Approved studio.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Portfolio */}
      <section id="portfolio" className={s.projects}>
        <header className={s.sectionHead}>
          <p className={s.sectionEy}>Our work</p>
          <h2 className={s.sectionTitle}>
            Rooms that <em>remember their people.</em>
          </h2>
        </header>
        <div className={s.projectsGrid}>
          {PROJECTS.map((p, i) => (
            <figure
              key={p.src}
              className={`${s.projectCard} ${p.span === "tall" ? s.projectTall : ""} ${p.span === "wide" ? s.projectWide : ""}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={1024}
                height={1024}
                sizes="(min-width: 1024px) 33vw, 100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                priority={i < 2}
              />
              <figcaption className={s.projectCaption}>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 4. Design stages */}
      <section className={s.stages}>
        <header className={s.sectionHead}>
          <p className={s.sectionEy}>How the work moves</p>
          <h2 className={s.sectionTitle}>
            From first conversation <em>to finished room.</em>
          </h2>
          <p className={s.sectionLede}>
            A clear, unhurried path. You see the thinking at every stage and
            nothing is ordered until the scheme is right.
          </p>
        </header>
        <div className={s.stagesGrid}>
          {STAGES.map((stage, i) => (
            <div key={stage.name} className={s.stageCard}>
              <span className={s.stageNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={s.stageName}>{stage.name}</h3>
              <p className={s.stageBody}>{stage.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Budget + scope */}
      <section className={s.scope}>
        <header className={s.sectionHead}>
          <p className={s.sectionEy}>Budget and scope</p>
          <h2 className={s.sectionTitle}>
            Three ways <em>to begin.</em>
          </h2>
        </header>
        <p className={s.budgetNote}>
          Design fees are priced on enquiry and confirmed in writing before any
          work begins. Furniture, finishes and trades are quoted separately and
          always agreed with you before anything is ordered. We will talk openly
          about budget in your consultation, so the scheme is shaped around what
          you want to spend, never the other way round.
        </p>
        <div className={s.plansGrid}>
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={`${s.planCard} ${p.featured ? s.planCardFeatured : ""}`}
            >
              <div className={s.planImage}>
                <Image
                  src={p.image}
                  alt={p.name}
                  width={780}
                  height={585}
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {p.featured ? <span className={s.planRibbon}>Most chosen</span> : null}
              </div>
              <div className={s.planBody}>
                <h3 className={s.planName}>{p.name}</h3>
                <p className={s.planTagline}>{p.tagline}</p>
                <p className={s.planPrice}>{p.price}</p>
                <ul className={s.planList}>
                  {p.inclusions.map((inc) => (
                    <li key={inc}>{inc}</li>
                  ))}
                </ul>
                <Link href="#interiors-enquiry" className={s.planCta}>
                  Enquire about this →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Quote */}
      <section className={s.quote}>
        <p className={s.quoteText}>
          <em>
            “A home that carries you. Not a statement you have to keep up with.”
          </em>
        </p>
        <p className={s.quoteAttribution}>The House brief · 2025</p>
      </section>

      {/* 7. Enquiry form — the consultation-led route in (no instant booking) */}
      <div id="interiors-enquiry" className="scroll-mt-24">
        <EnquiryForm
          defaultService="design-interiors"
          sourcePage="/services/interiors"
          eyebrow="Begin the conversation"
          headline="Tell us about the room."
          body="Share the space, your ambition, timeline and a sense of budget. We read every enquiry personally and come back to you to arrange a consultation, usually within one working day."
          buttonLabel="Send enquiry"
        />
      </div>

      {/* 8. Newsletter */}
      <NewsletterInline variant="cream" sourcePage="/services/interiors" />
    </div>
  );
}
