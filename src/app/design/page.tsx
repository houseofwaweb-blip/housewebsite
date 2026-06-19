import Image from "next/image";
import Link from "next/link";
import s from "./design.module.css";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /design — landing page.
 *
 * Section order:
 *   1. Hero — surreal Interior Design sample board image full-width
 *   2. Stats strip
 *   3. Two disciplines — Interiors / Gardens (large editorial panels)
 *   4. Four launch partners — editorial grid
 *   5. House Approved — what the seal means
 *   6. Closing CTA — commission a space
 */

export const metadata = {
  title: "Design — Interiors and gardens, considered.",
  description:
    "Interiors and gardens by designers we've vetted and trust. Every project carries the House Approved seal.",
};

const STAT_COLS = [
  { value: "2", label: "Disciplines" },
  { value: "4", label: "Launch studios" },
  { value: "1", label: "Annual review" },
  { value: "0", label: "Hidden commission" },
];

const PARTNERS = [
  {
    slug: "delve-interiors",
    name: "Delve Interiors",
    type: "Interiors studio",
    blurb:
      "Considered schemes, quiet palettes, careful detailing. London and the South East.",
    image: "/design/interiors/project-tunbridge-1.webp",
  },
  {
    slug: "jessica-durling-mcmahon",
    name: "Jessica Durling-McMahon",
    type: "Interior designer",
    blurb:
      "Layered rooms with confident colour, antiques properly used, and a love of textile.",
    image: "/design/interiors/project-bedroom.webp",
  },
  {
    slug: "willow-alexander-gardens",
    name: "Willow Alexander Gardens",
    type: "Garden design",
    blurb:
      "Planting schemes and landscapes rooted in the garden's existing character.",
    image: "/design/gardens/hero.jpg",
  },
  {
    slug: "house-ai",
    name: "House AI",
    type: "Specialist partner",
    blurb:
      "Automation, lighting schemes, and quiet technology that disappears into the architecture.",
    image: "/home-v4/design-portrait.webp",
  },
];

const SEAL_LINES = [
  "We've worked with the principal directly on at least one project.",
  "Their references include people we already trust.",
  "Their craft, communication and finish all hold up under scrutiny.",
  "They review with us annually — and we publish what changes.",
];

export default async function DesignLanding() {
  const sections = await getPageSections("design");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const disciplines = sections.get("disciplines");
  const partners = sections.get("partners");
  const seal = sections.get("seal");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const partnerCards = cmsCards(partners, PARTNERS, (c, base) => ({
    slug: base?.slug ?? "",
    name: pick(c.title, base?.name ?? ""),
    type: pick(c.label, base?.type ?? ""),
    blurb: pick(c.body, base?.blurb ?? ""),
    image: base?.image ?? "",
  }));
  const sealLines = seal?.items ?? SEAL_LINES;

  return (
    <div className={s.page}>
      {/* 1. Hero — full-width Interior Design sample board */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true">
          <Image
            src={cms(hero, "imageUrl", "/home-v4/design-hero.webp")}
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "The House · Design")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Rooms and gardens,")}{" "}
              <em>{cms(hero, "headlineEm", "made to last.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "Interiors and gardens are a House discipline, care as craft worked out in plaster, paint, planting and light. Commissioned through House Approved studios who understand period fabric, the way a garden drains, and how people actually live in their rooms. Book online and every brief, decision and handover is written into your Home Record.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "#open-booking-form")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Commission a space")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/design/studios")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "See House Approved studios")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Considered. Connected. Filed to the record.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Every project, through a House-Approved studio.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Two disciplines */}
      <section className={s.disciplines}>
        <header className={s.disciplinesHead}>
          <p className={s.disciplinesEy}>{cms(disciplines, "eyebrow", "Two disciplines")}</p>
          <h2 className={s.disciplinesTitle}>
            {cms(disciplines, "headline", "One studio standard,")}{" "}
            <em>{cms(disciplines, "headlineEm", "two crafts.", "headline")}</em>
          </h2>
        </header>
        <div className={s.disciplinesGrid}>
          <Link href="/design/interiors" className={s.disciplineCard}>
            <div className={s.disciplineImage}>
              <Image
                src="/home-v4/pillar-1.webp"
                alt="A warm parlour interior with marble fireplace and flowers"
                width={1168}
                height={784}
                sizes="(min-width: 1024px) 50vw, 100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className={s.disciplineBody}>
              <p className={s.disciplineNumeral}>I.</p>
              <h3 className={s.disciplineName}>Interiors</h3>
              <p className={s.disciplineTagline}>
                Considered schemes, from whole-house renovations to
                single-room re-reads.
              </p>
              <p className={s.disciplineBlurb}>
                Working with studios who understand period homes, listed
                fabric, and the rhythms of how people actually live. The
                result reads worn-in, not decorated.
              </p>
              <span className={s.disciplineCta}>Discover interiors →</span>
            </div>
          </Link>

          <Link href="/design/gardens" className={s.disciplineCard}>
            <div className={s.disciplineImage}>
              <Image
                src="/home-v4/design-garden-day.jpg"
                alt="A late-summer garden with brick paths and a Georgian house behind"
                width={1024}
                height={1024}
                sizes="(min-width: 1024px) 50vw, 100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className={s.disciplineBody}>
              <p className={s.disciplineNumeral}>II.</p>
              <h3 className={s.disciplineName}>Gardens</h3>
              <p className={s.disciplineTagline}>
                Planting plans and landscape work, led by Willow Alexander
                Gardens.
              </p>
              <p className={s.disciplineBlurb}>
                Designed around what the garden already wants to do — light,
                shade, drainage, the soil it has. The brief is to make the
                garden feel inevitable, ten years from now.
              </p>
              <span className={s.disciplineCta}>Discover gardens →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Launch partners */}
      <section className={s.partners}>
        <header className={s.partnersHead}>
          <p className={s.partnersEy}>{cms(partners, "eyebrow", "Our studios")}</p>
          <h2 className={s.partnersTitle}>
            {cms(partners, "headline", "Four launch")}{" "}
            <em>{cms(partners, "headlineEm", "partners.", "headline")}</em>
          </h2>
          <p className={s.partnersLede}>
            {cms(
              partners,
              "body",
              "We name our partners openly. Each has been signed up on the understanding that House Approved is a standard, not a label — reviewed annually, honestly, by both sides.",
            )}
          </p>
        </header>
        <div className={s.partnersGrid}>
          {partnerCards.map((p) => (
            <Link
              key={p.slug}
              href={`/partners/${p.slug}`}
              className={s.partnerCard}
            >
              <div className={s.partnerImage}>
                <Image
                  src={p.image}
                  alt={p.name}
                  width={720}
                  height={540}
                  sizes="(min-width: 1024px) 25vw, 90vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={s.partnerBody}>
                <p className={s.partnerType}>{p.type}</p>
                <h3 className={s.partnerName}>{p.name}</h3>
                <p className={s.partnerBlurb}>{p.blurb}</p>
                <span className={s.partnerCta}>Read profile →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={s.partnersFoot}>
          <Link href="/design/studios" className={s.partnersFootLink}>
            Meet the whole collective
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 5. House Approved — what the seal means */}
      <section className={s.seal}>
        <div className={s.sealImage}>
          <Image
            src={cms(seal, "imageUrl", "/home-v4/design-portrait.webp")}
            alt={cms(
              seal,
              "imageAlt",
              "A tall sample board labelled Interior Design with ten paint and textile swatches, leaning in a Georgian hallway",
            )}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.sealCopy}>
          <p className={s.sealEy}>{cms(seal, "eyebrow", "House Approved")}</p>
          <h2 className={s.sealTitle}>
            {cms(seal, "headline", "The seal means")}{" "}
            <em>{cms(seal, "headlineEm", "four things.", "headline")}</em>
          </h2>
          <ul className={s.sealList}>
            {sealLines.map((line, i) => (
              <li key={i}>
                <span className={s.sealLineNum}>0{i + 1}.</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <Link href={cms(seal, "ctaHref", "/the-house/standards")} className={s.sealLink}>
            {cms(seal, "ctaLabel", "Read the standards")} →
          </Link>
        </div>
      </section>

      {/* 6. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>{cms(closing, "eyebrow", "Commission a space")}</p>
        <p className={s.closingStatement}>
          {cms(closing, "headline", "A room. A garden.")}<br />
          <em>{cms(closing, "headlineEm", "A whole house, properly read.", "headline")}</em>
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "#open-booking-form")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Start a brief")}
          </Link>
          <Link href={cms(closing, "cta2Href", "/howa/assistant")} className={s.closingBtnGhost}>
            {cms(closing, "cta2Label", "Or use the Assistant")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
