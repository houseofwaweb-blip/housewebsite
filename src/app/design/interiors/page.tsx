import Image from "next/image";
import Link from "next/link";
import s from "./interiors.module.css";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /design/interiors — lander framework.
 *
 * Section order:
 *   1. Hero — Tunbridge interior right, copy left
 *   2. Stats strip
 *   3. Three plans — Edit, Additions, Full Edit
 *   4. Projects gallery — asymmetric editorial grid
 *   5. Quote
 *   6. Assistant split — start with the Assistant
 *   7. Newsletter
 */

export const metadata = {
  title: "Interiors — Consciously designed.",
  description:
    "Consciously designed interiors through The House Edit. Digital plans, full-home edits, and styling sessions — every scheme House Approved.",
};

const STAT_COLS = [
  { value: "3", label: "Plans to begin" },
  { value: "1:1", label: "Designer access" },
  { value: "15%", label: "House Store discount" },
  { value: "0", label: "Cookie-cutter schemes" },
];

const PLANS = [
  {
    name: "The House Edit",
    tagline: "A 90-minute studio session.",
    price: "£295",
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
    tagline: "À-la-carte top-ups.",
    price: "from £195",
    inclusions: [
      "Shoppable moodboard",
      "Sourcing per room",
      "Material pack — swatches, samples, scents",
      "30-minute follow-up call",
    ],
    image: "/design/interiors/project-bedroom.webp",
  },
  {
    name: "The Full House Edit",
    tagline: "A whole-home brief, fully held.",
    price: "from £795",
    inclusions: [
      "Initial 90-minute consultation",
      "Moodboards for up to three rooms",
      "Sourcing for two rooms",
      "A tactile material pack posted to you",
      "30-minute follow-up call",
      "15% House Store discount",
    ],
    image: "/design/interiors/project-detail.webp",
  },
];

const STUDIOS = [
  {
    slug: "delve-interiors",
    name: "Delve Interiors",
    type: "Interiors studio",
    location: "London & South East",
    blurb: "Considered schemes, quiet palettes, careful detailing. Listed homes and period flats.",
    image: "/design/interiors/project-detail.webp",
    status: "live" as const,
  },
  {
    slug: "jessica-durling-mcmahon",
    name: "Jessica Durling-McMahon",
    type: "Interior designer",
    location: "London & Cotswolds",
    blurb: "Layered rooms with confident colour, antiques properly used, and a deep love of textile.",
    image: "/design/interiors/project-dining.webp",
    status: "live" as const,
  },
  {
    name: "More studios joining",
    type: "Coming soon",
    blurb: "We grow the collective only when the next person we'd quietly recommend to a friend turns up.",
    status: "soon" as const,
  },
  {
    name: "Apply to the collective",
    type: "Interiors studios",
    blurb: "We review applications from studios working in the UK. House Approved is a standard, not a label.",
    status: "apply" as const,
  },
];

const PROJECTS = [
  {
    src: "/design/interiors/project-living-room.webp",
    caption: "Herts Living Room",
    alt: "Herts living room — layered textures, muted palette, natural light",
    span: "tall",
  },
  {
    src: "/design/interiors/project-bedroom.webp",
    caption: "Buckingham Bedroom",
    alt: "Buckingham bedroom — deep green walls, brass accents, linen bedding",
  },
  {
    src: "/design/interiors/project-dining.webp",
    caption: "Herts Dining",
    alt: "Herts dining room — warm timber, candlelight, considered table setting",
  },
  {
    src: "/design/interiors/project-tunbridge-1.webp",
    caption: "Tunbridge Wells I",
    alt: "Tunbridge Wells — period drawing room with restored mouldings",
  },
  {
    src: "/design/interiors/project-tunbridge-2.webp",
    caption: "Tunbridge Wells II",
    alt: "Tunbridge Wells — layered sitting room with heritage palette",
    span: "wide",
  },
];

export default async function InteriorsPage() {
  const nlBlock = await getNewsletterBlock("design-interiors");
  const sections = await getPageSections("design-interiors");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const plans = sections.get("plans");
  const studios = sections.get("studios");
  const projects = sections.get("projects");
  const quote = sections.get("quote");
  const companion = sections.get("companion");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const planCards = cmsCards(plans, PLANS, (c, base) => ({
    name: pick(c.title, base?.name ?? ""),
    tagline: pick(c.label, base?.tagline ?? ""),
    price: pick(c.value, base?.price ?? ""),
    inclusions: c.items && c.items.length ? c.items : base?.inclusions ?? [],
    image: pick(c.imageUrl, base?.image ?? ""),
    featured: base?.featured ?? false,
  }));

  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "Design · Interiors")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Consciously designed")}{" "}
              <em>{cms(hero, "headlineEm", "interiors.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "At the House, interiors are living expressions of the people who inhabit them. Our collective of designers and makers share a single philosophy — beauty, balance, and intention.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "#plans")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "See the plans")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/partners")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "The collective")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={cms(hero, "imageUrl", "/design/interiors/project-tunbridge-1.webp")}
            alt={cms(
              hero,
              "imageAlt",
              "Tunbridge Wells interior — restored period drawing room with garden light",
            )}
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
          <p className={s.statsLedeLine1}>{cms(stats, "headline", "Beauty. Balance. Intention.")}</p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Every scheme through a House-Approved studio.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Three plans */}
      <section id="plans" className={s.plans}>
        <header className={s.plansHead}>
          <p className={s.plansEy}>{cms(plans, "eyebrow", "Digital Plans")}</p>
          <h2 className={s.plansTitle}>
            {cms(plans, "headline", "Three ways")}{" "}
            <em>{cms(plans, "headlineEm", "to begin.", "headline")}</em>
          </h2>
          <p className={s.plansLede}>
            {cms(
              plans,
              "body",
              "From a 90-minute studio session to a full-home brief held end to end — the right entry point for the room you're starting with.",
            )}
          </p>
        </header>
        <div className={s.plansGrid}>
          {planCards.map((p) => (
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
                {p.featured ? <span className={s.planRibbon}>Featured</span> : null}
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
                <Link href="#open-booking-form" className={s.planCta}>
                  Book this edit →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3b. The studios behind the work */}
      <section className={s.studios}>
        <header className={s.studiosHead}>
          <p className={s.studiosEy}>{cms(studios, "eyebrow", "The collective")}</p>
          <h2 className={s.studiosTitle}>
            {cms(studios, "headline", "The studios")}{" "}
            <em>{cms(studios, "headlineEm", "behind the work.", "headline")}</em>
          </h2>
          <p className={s.studiosLede}>
            {cms(
              studios,
              "body",
              "Every interiors brief lands with a House-Approved studio. We start small on purpose — two interiors partners at launch, more joining as we find them.",
            )}
          </p>
        </header>
        <div className={s.studiosGrid}>
          {STUDIOS.map((studio) => (
            <article
              key={studio.name}
              className={`${s.studioCard} ${studio.status !== "live" ? s.studioCardPlaceholder : ""}`}
            >
              {studio.status === "live" && studio.image ? (
                <div className={s.studioImage}>
                  <Image
                    src={studio.image}
                    alt={studio.name}
                    width={720}
                    height={540}
                    sizes="(min-width: 1024px) 25vw, 90vw"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div className={s.studioImagePlaceholder}>
                  <span className={s.studioPlaceholderMark}>
                    {studio.status === "soon" ? "→" : "+"}
                  </span>
                </div>
              )}
              <div className={s.studioBody}>
                <p className={s.studioType}>
                  {studio.type}
                  {"location" in studio && studio.location ? ` · ${studio.location}` : ""}
                </p>
                <h3 className={s.studioName}>{studio.name}</h3>
                <p className={s.studioBlurb}>{studio.blurb}</p>
                {studio.status === "live" && "slug" in studio ? (
                  <Link href={`/partners/${studio.slug}`} className={s.studioCta}>
                    See the work →
                  </Link>
                ) : studio.status === "apply" ? (
                  <Link href="/partners#apply" className={s.studioCta}>
                    Apply →
                  </Link>
                ) : (
                  <span className={s.studioBadge}>Coming soon</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Projects gallery */}
      <section className={s.projects}>
        <header className={s.projectsHead}>
          <p className={s.projectsEy}>{cms(projects, "eyebrow", "Our projects")}</p>
          <h2 className={s.projectsTitle}>
            {cms(projects, "headline", "Rooms that")}{" "}
            <em>{cms(projects, "headlineEm", "remember their people.", "headline")}</em>
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

      {/* 5. Quote */}
      <section className={s.quote}>
        <p className={s.quoteText}>
          <em>
            “{cms(
              quote,
              "body",
              "A home that carries you. Not a statement you have to keep up with.",
            )}”
          </em>
        </p>
        <p className={s.quoteAttribution}>
          {cms(quote, "caption", "The House brief · 2025")}
        </p>
      </section>

      {/* 6. Assistant split */}
      <section className={s.companion}>
        <div className={s.companionCopy}>
          <p className={s.companionEy}>{cms(companion, "eyebrow", "HoWA · Assistant")}</p>
          <h2 className={s.companionTitle}>
            {cms(companion, "headline", "Start with the")}{" "}
            <em>{cms(companion, "headlineEm", "Assistant.", "headline")}</em>
          </h2>
          <p className={s.companionLede}>
            {cms(
              companion,
              "body",
              "Capture your room, ambition, timeline, budget and aesthetic direction. The Assistant builds a brief your designer can work from on day one — nothing lost, nothing repeated.",
            )}
          </p>
          <p className={s.companionFootnote}>
            {cms(companion, "caption", "Available to all HoWA members.")}
          </p>
          <Link
            href={cms(companion, "ctaHref", "/api/howa-bounce?source=interiors-companion")}
            className={s.btnFilled}
          >
            {cms(companion, "ctaLabel", "Coming soon")}
          </Link>
        </div>
        <div className={s.companionImage}>
          <Image
            src={cms(companion, "imageUrl", "/design/interiors/project-living-room.webp")}
            alt={cms(
              companion,
              "imageAlt",
              "A living room project — the kind of room the Assistant helps you brief",
            )}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* 7. Newsletter */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "cream"}
        sourcePage="/design/interiors"
        {...(nlBlock ?? {})}
      />
    </div>
  );
}
