import Image from "next/image";
import Link from "next/link";
import s from "./interiors.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
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
  title: "Interiors: Consciously designed.",
  description:
    "Consciously designed interiors through The House Edit. Digital plans, full-home edits, and styling sessions, every scheme HoWA Approved.",
};

const STAT_COLS = [
  { value: "4", label: "Plans to begin" },
  { value: "1:1", label: "Designer access" },
  { value: "15%", label: "House Shop discount" },
  { value: "0", label: "Cookie-cutter schemes" },
];

const PLANS = [
  {
    // DIRECTIVE §10 — Interior design leads with HoWA First Design at £400
    // (the mapped first output). Human packages follow after the first output.
    name: "HoWA First Interior Design",
    tagline: "The mapped first design, £400.",
    price: "£400",
    inclusions: [
      "Starts from your address and a HoWA read of the room",
      "A first scheme and material direction, mapped to your home",
      "A written design you own, kept in your home record",
      "A clear route to continue with Delve Interiors when you want a human studio",
    ],
    image: "/design/interiors/project-living-room.webp",
    featured: true,
  },
  {
    name: "The House Edit",
    tagline: "A 90-minute studio session.",
    price: "£295",
    inclusions: [
      "A 90-minute one-to-one online styling session",
      "Thoughtful guidance on palette, layout and sourcing",
      "A personalised PDF moodboard with curated links",
      "10% House Shop discount",
    ],
    image: "/design/interiors/project-bedroom.webp",
    featured: false,
  },
  {
    name: "Additions to Your Edit",
    tagline: "À-la-carte top-ups.",
    price: "from £195",
    inclusions: [
      "Shoppable moodboard",
      "Sourcing per room",
      "Material pack: swatches, samples, scents",
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
      "15% House Shop discount",
    ],
    image: "/design/interiors/project-detail.webp",
  },
];

const PROJECTS = [
  {
    src: "/design/interiors/project-living-room.webp",
    caption: "Herts Living Room",
    alt: "Herts living room: layered textures, muted palette, natural light",
    span: "tall",
  },
  {
    src: "/design/interiors/project-bedroom.webp",
    caption: "Buckingham Bedroom",
    alt: "Buckingham bedroom: deep green walls, brass accents, linen bedding",
  },
  {
    src: "/design/interiors/project-dining.webp",
    caption: "Herts Dining",
    alt: "Herts dining room: warm timber, candlelight, considered table setting",
  },
  {
    src: "/design/interiors/project-tunbridge-1.webp",
    caption: "Tunbridge Wells I",
    alt: "Tunbridge Wells: period drawing room with restored mouldings",
  },
  {
    src: "/design/interiors/project-tunbridge-2.webp",
    caption: "Tunbridge Wells II",
    alt: "Tunbridge Wells: layered sitting room with heritage palette",
    span: "wide",
  },
];

export default async function InteriorsPage() {
  const nlBlock = await getNewsletterBlock("design-interiors");
  const sections = await getPageSections("design-interiors");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const plans = sections.get("plans");
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
          <FlowerWatermark color="gold" side="left" opacity={0.16} className="!top-auto bottom-[-12%] h-[74%]" />
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
                "Rooms read for the people who live in them, not decorated at them. Worked out in plaster, paint, joinery and the light a room actually gets, with Delve Interiors, our HoWA Approved studio who know period fabric and how a house wears over years.",
              )}
            </p>
            {/* DIRECTIVE §10 — surface the £400 first design + scan framing in the hero. */}
            <p className={s.heroLede} style={{ fontWeight: 600, marginTop: 4 }}>
              Scan your room and see the first direction before the first
              consultation. HoWA First Interior Design, £400: a mapped concept,
              palette, indicative budget and written brief.
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "#plans")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Start my interior design")}
              </Link>
              <Link href={cms(hero, "cta2Href", "#projects")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "View interior projects")}
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
              "Tunbridge Wells interior: restored period drawing room with garden light",
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
            {cms(stats, "subheadline", "Every scheme through Delve Interiors, HoWA Approved.")}
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
            {cms(plans, "headline", "Four ways")}{" "}
            <em>{cms(plans, "headlineEm", "to begin.", "headline")}</em>
          </h2>
          <p className={s.plansLede}>
            {cms(
              plans,
              "body",
              "From a 90-minute studio session to a full-home brief held end to end, the right entry point for the room you're starting with.",
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

      {/* 4. Projects gallery */}
      <section id="projects" className={s.projects}>
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

      {/* 6. The Designer doorway (DIRECTIVE §07/§09 — the Designer persona maps
          the room for the £400 first design. NOT the Assistant, which is a HoWA
          tier and does not belong in the House design path.) */}
      <section className={s.companion}>
        <div className={s.companionCopy}>
          <p className={s.companionEy}>{cms(companion, "eyebrow", "HoWA · The Designer")}</p>
          <h2 className={s.companionTitle}>
            {cms(companion, "headline", "Start with the")}{" "}
            <em>{cms(companion, "headlineEm", "Designer.", "headline")}</em>
          </h2>
          <p className={s.companionLede}>
            {cms(
              companion,
              "body",
              "Use the Designer to map your room, ambition, timeline, budget and aesthetic direction. You get a first direction and an indicative budget you own, a brief Delve can work from on day one, nothing lost, nothing repeated.",
            )}
          </p>
          <p className={s.companionFootnote}>
            {cms(companion, "caption", "This is HoWA First Interior Design, £400.")}
          </p>
          <Link
            href={cms(companion, "ctaHref", "#plans")}
            className={s.btnFilled}
          >
            {cms(companion, "ctaLabel", "Start my interior design")}
          </Link>
          {/* DIRECTIVE §10 — "See a sample output". */}
          <div style={{ marginTop: 16 }}>
            <Link
              href="/design/sample"
              style={{ fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-house-gold-ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              See a sample output →
            </Link>
          </div>
        </div>
        <div className={s.companionImage}>
          <Image
            src={cms(companion, "imageUrl", "/design/interiors/project-living-room.webp")}
            alt={cms(
              companion,
              "imageAlt",
              "A living room project, the kind of room the Designer helps you brief",
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
