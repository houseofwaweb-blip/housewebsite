import Image from "next/image";
import { DesignerBreadcrumb } from "@/components/design/DesignerBreadcrumb";
import Link from "next/link";
import s from "./gardens.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";
import { GARDEN_PROJECTS } from "@/lib/gardens-projects";

/**
 * /design/gardens — lander framework.
 *
 * Section order:
 *   1. Hero — gardener still life right, copy left
 *   2. Stats strip
 *   3. Three plans — Planting, Concept (featured), 2D & 3D
 *   4. Specialist services strip — lighting / collaboration / full design
 *   5. Projects gallery — asymmetric editorial grid
 *   6. Quote
 *   7. The Designer split — start the brief with The Designer
 *   8. Newsletter
 */

export const metadata = {
  title: "Gardens: Landscapes, properly read.",
  description:
    "Planting plans, concept designs and full landscape commissions through the House. Led by our in-house garden studio, Willow Alexander Gardens.",
};

const STAT_COLS = [
  { value: "4", label: "Ways to begin" },
  { value: "1", label: "Lead studio" },
  { value: "10yr", label: "Design horizon" },
  { value: "0", label: "Off-the-shelf schemes" },
];

const PLANS = [
  {
    name: "Planting Plans",
    tagline: "Light, soil and aspect, properly read.",
    price: "from £495",
    inclusions: [
      "Site survey of light, soil and aspect",
      "Full plant list with seasonal palette",
      "Placement guide and maintenance notes",
      "30-minute follow-up call",
    ],
    image: "/design/gardens/planting-plans.jpg",
  },
  {
    name: "Concept Plans",
    tagline: "The whole garden, considered.",
    price: "from £1,495",
    inclusions: [
      "Layout design and zoning",
      "Materials palette and hardscape",
      "Planting inspiration board",
      "Lighting and water consideration",
      "Three rounds of revisions",
    ],
    image: "/design/gardens/concept-plans.jpg",
    featured: true,
  },
  {
    name: "2D & 3D Plans",
    tagline: "Drawn, dimensioned, build-ready.",
    price: "from £2,950",
    inclusions: [
      "Fully dimensioned plans",
      "3D renders of key views",
      "Construction-grade detail",
      "Contractor liaison brief",
      "On-site walk-through",
    ],
    image: "/design/gardens/2d-3d-plans.jpg",
  },
];

const SPECIALIST = [
  {
    name: "Lighting Plans",
    price: "from £395",
    body: "A professional lighting layout: fixture map, specification list and circuit guide.",
    image: "/design/gardens/lighting-plans.jpg",
  },
  {
    name: "Signature Collaboration",
    price: "Coming soon",
    body: "A full creative partnership with one of our leading studios: artistic direction, materials and build liaison.",
    image: "/design/gardens/collaboration.jpg",
  },
  {
    name: "Full Design & Build",
    price: "Bespoke",
    body: "Commission a full bespoke design with on-site consultation and build management through Willow Alexander Gardens.",
    image: "/design/gardens/full-design.webp",
  },
];

// Span pattern across the commissions for an editorial, gap-free 3-col grid.
const PROJECT_SPAN: Record<number, "tall" | "wide"> = { 0: "tall", 5: "tall" };

export default async function GardensPage() {
  const nlBlock = await getNewsletterBlock("design-gardens");
  const sections = await getPageSections("design-gardens");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const plans = sections.get("plans");
  const specialist = sections.get("specialist");
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
  const specialistCards = cmsCards(specialist, SPECIALIST, (c, base) => ({
    name: pick(c.title, base?.name ?? ""),
    price: pick(c.value, base?.price ?? ""),
    body: pick(c.body, base?.body ?? ""),
    image: pick(c.imageUrl, base?.image ?? ""),
  }));

  return (
    <div className={s.page}>
      <DesignerBreadcrumb current="Gardens" />
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <FlowerWatermark color="gold" side="left" opacity={0.16} className="!top-auto bottom-[-12%] h-[74%]" />
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "Design · Gardens")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Gardens designed for")}{" "}
              <em>{cms(hero, "headlineEm", "place, season and time.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "Designed around what the garden already wants to do: light, shade, drainage, the soil it has. The brief is to make the garden feel inevitable, ten years from now. Led by Willow Alexander Gardens, the House's own garden studio, with specialist partners brought in for build.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "#plans")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "See the plans")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/partners/willow-alexander-gardens")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "The lead studio")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={cms(hero, "imageUrl", "/design/gardens/hero.jpg")}
            alt={cms(
              hero,
              "imageAlt",
              "Estate grounds: mature planting, brick paths and Georgian house behind",
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
          <p className={s.statsLedeLine1}>{cms(stats, "headline", "Light. Soil. Aspect. Time.")}</p>
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
          <p className={s.plansEy}>{cms(plans, "eyebrow", "Garden Plans")}</p>
          <h2 className={s.plansTitle}>
            {cms(plans, "headline", "Three ways")}{" "}
            <em>{cms(plans, "headlineEm", "to begin.", "headline")}</em>
          </h2>
          <p className={s.plansLede}>
            {cms(
              plans,
              "body",
              "From a planting plan that solves a single border to a fully dimensioned 3D design ready for build, the right entry point for the garden you have now.",
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
                  Enquire →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Specialist services */}
      <section className={s.specialist}>
        <header className={s.specialistHead}>
          <p className={s.specialistEy}>{cms(specialist, "eyebrow", "Specialist services")}</p>
          <h2 className={s.specialistTitle}>
            {cms(specialist, "headline", "Beyond the plan,")}{" "}
            <em>{cms(specialist, "headlineEm", "three ways further.", "headline")}</em>
          </h2>
        </header>
        <div className={s.specialistGrid}>
          {specialistCards.map((s2) => (
            <article key={s2.name} className={s.specialistCard}>
              <div className={s.specialistImage}>
                <Image
                  src={s2.image}
                  alt={s2.name}
                  width={720}
                  height={540}
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={s.specialistBody}>
                <h3 className={s.specialistName}>{s2.name}</h3>
                <p className={s.specialistPrice}>{s2.price}</p>
                <p className={s.specialistBlurb}>{s2.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Projects gallery */}
      <section className={s.projects}>
        <header className={s.projectsHead}>
          <p className={s.projectsEy}>{cms(projects, "eyebrow", "From the studio")}</p>
          <h2 className={s.projectsTitle}>
            {cms(projects, "headline", "Recent")}{" "}
            <em>{cms(projects, "headlineEm", "commissions.", "headline")}</em>
          </h2>
        </header>
        <div className={s.projectsGrid}>
          {GARDEN_PROJECTS.map((p, i) => {
            const span = PROJECT_SPAN[i];
            return (
              <Link
                key={p.slug}
                href={`/design/gardens/projects/${p.slug}`}
                className={`${s.projectCard} ${span === "tall" ? s.projectTall : ""} ${span === "wide" ? s.projectWide : ""}`}
              >
                <Image
                  src={p.images[0]}
                  alt={`${p.title}, ${p.location}`}
                  width={1024}
                  height={1024}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  priority={i < 2}
                />
                <figcaption className={s.projectCaption}>
                  {p.title}
                  <small>{p.location}</small>
                </figcaption>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. Quote */}
      <section className={s.quote}>
        <p className={s.quoteText}>
          <em>
            “{cms(quote, "body", "A garden deserves a mood, not just a hand.")}”
          </em>
        </p>
        <p className={s.quoteAttribution}>
          {cms(quote, "caption", "Willow Alexander Gardens · 2025")}
        </p>
      </section>

      {/* 7. The Designer split. STEP 11/12: the brief belongs to The Designer;
          the Assistant is retired as a public tier. */}
      <section className={s.companion}>
        <div className={s.companionCopy}>
          <p className={s.companionEy}>{cms(companion, "eyebrow", "The Household · The Designer")}</p>
          <h2 className={s.companionTitle}>
            {cms(companion, "headline", "Start with The")}{" "}
            <em>{cms(companion, "headlineEm", "Designer.", "headline")}</em>
          </h2>
          <p className={s.companionLede}>
            {cms(
              companion,
              "body",
              "Capture your garden's light, soil, aspect, maintenance appetite and budget. The Designer shapes a brief your studio can work from on day one, nothing lost, nothing repeated.",
            )}
          </p>
          <p className={s.companionFootnote}>
            {cms(companion, "caption", "Available to all HoWA members.")}
          </p>
          <Link
            href={cms(companion, "ctaHref", "/api/howa-bounce?source=gardens-companion")}
            className={s.btnFilled}
          >
            {cms(companion, "ctaLabel", "Coming soon")}
          </Link>
        </div>
        <div className={s.companionImage}>
          <Image
            src={cms(companion, "imageUrl", "/design/gardens/concept-plans.jpg")}
            alt={cms(
              companion,
              "imageAlt",
              "A garden concept plan, the kind of brief The Designer helps you build",
            )}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* 8. Newsletter */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "cream"}
        sourcePage="/design/gardens"
        {...(nlBlock ?? {})}
      />
    </div>
  );
}
