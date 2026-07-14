import Image from "next/image";
import Link from "next/link";
import s from "./partners.module.css";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { LAUNCH_PARTNERS, PARTNER_ORDER } from "@/lib/partners-data";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /partners — the marketplace hub.
 *
 * Section order:
 *   1. Hero — copy left, 2x2 partner mosaic right
 *   2. Stats strip
 *   3. Three categories — Design / Services / Marketplace
 *   4. The launch partners — image-led 4-up grid
 *   5. House Approved — what the seal means
 *   6. Apply to the collective
 *   7. Newsletter
 */

export const metadata = {
  title: "Partners: The people behind the House.",
  description:
    "House Approved designers, service providers and curated suppliers. Every partner vetted in person, reviewed annually, and named openly.",
};

const STAT_COLS = [
  { value: "4", label: "Launch partners" },
  { value: "3", label: "Disciplines" },
  { value: "1", label: "Annual review" },
  { value: "0", label: "Hidden commission" },
];

const CATEGORIES = [
  {
    id: "design",
    eyebrow: "Design",
    title: "Studios and designers.",
    titleEm: "designers.",
    blurb:
      "Interior and garden studios chosen for craft, ethics and aesthetic harmony with the House. Each holds the seal under three tests.",
    image: "/design/interiors/project-tunbridge-1.webp",
    href: "/design/studios",
    ctaLabel: "Meet the design collective",
  },
  {
    id: "services",
    eyebrow: "Services",
    title: "The hands that care for your home.",
    titleEm: "home.",
    blurb:
      "Gardeners, window cleaners, cleaners and gutter specialists. Vetted, insured, and held to the standard we'd hold ourselves to.",
    image: "/services/subbrands/gardeners.jpg",
    href: "/services",
    ctaLabel: "See the services",
  },
  {
    id: "marketplace",
    eyebrow: "The Stores",
    title: "Objects worth keeping.",
    titleEm: "keeping.",
    blurb:
      "Makers, small suppliers, and the few things we keep coming back to. Chosen by the House, and logged to your home record through HoWA.",
    image: "/the-house/editorial/approved-peony-plate.webp",
    href: "/shop",
    ctaLabel: "Visit the shop",
  },
];

const SEAL_LINES = [
  "We've worked with the principal directly on at least one project.",
  "Their references include people we already trust.",
  "Their craft, communication and finish all hold up under scrutiny.",
  "They review with us annually, and we publish what changes.",
];

export default async function PartnersHub() {
  const nlBlock = await getNewsletterBlock("partners");
  const partners = PARTNER_ORDER.map((slug) => LAUNCH_PARTNERS[slug]);
  const sections = await getPageSections("partners");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const categories = sections.get("categories");
  const partnersHead = sections.get("partners");
  const seal = sections.get("seal");
  const apply = sections.get("apply");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const categoryCards = cmsCards(categories, CATEGORIES, (c, base) => ({
    id: base?.id ?? "",
    eyebrow: pick(c.label, base?.eyebrow ?? ""),
    title: pick(c.title, base?.title ?? ""),
    titleEm: pick(c.value, base?.titleEm ?? ""),
    blurb: pick(c.body, base?.blurb ?? ""),
    image: pick(c.imageUrl, base?.image ?? ""),
    href: pick(c.ctaHref, base?.href ?? "#"),
    ctaLabel: pick(c.ctaLabel, base?.ctaLabel ?? ""),
  }));
  const sealLines = seal?.items ?? SEAL_LINES;

  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "House Approved · Partners")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "The people")}{" "}
              <em>{cms(hero, "headlineEm", "behind the House.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "Every partner below holds a House Approved seal. We know them, we have seen their work in person, and we'd point a family member at them. The list grows slowly, on purpose.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "#partners")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Meet the partners")}
              </Link>
              <Link href={cms(hero, "cta2Href", "#seal")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "The standard")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroMosaic}>
          {partners.map((p) => (
            <div key={p.slug} className={s.heroMosaicCell}>
              <Image
                src={p.heroImage}
                alt={p.name}
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            </div>
          ))}
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Vetted in person. Reviewed annually.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Named openly. Held to the same standard.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Three categories */}
      <section className={s.categories}>
        <header className={s.categoriesHead}>
          <p className={s.categoriesEy}>{cms(categories, "eyebrow", "Three disciplines")}</p>
          <h2 className={s.categoriesTitle}>
            {cms(categories, "headline", "One standard,")}{" "}
            <em>{cms(categories, "headlineEm", "three crafts.", "headline")}</em>
          </h2>
          <p className={s.categoriesLede}>
            {cms(
              categories,
              "body",
              "Design studios, service providers, and the makers behind the shop. Three different crafts, held to one House Approved seal.",
            )}
          </p>
        </header>
        <div className={s.categoriesGrid}>
          {categoryCards.map((cat) => (
            <Link key={cat.id} href={cat.href} className={s.categoryCard}>
              <div className={s.categoryImage}>
                <Image
                  src={cat.image}
                  alt={cat.eyebrow}
                  width={960}
                  height={720}
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={s.categoryBody}>
                <p className={s.categoryEy}>{cat.eyebrow}</p>
                <h3 className={s.categoryTitle}>
                  {cat.title.replace(cat.titleEm, "")}
                  <em>{cat.titleEm}</em>
                </h3>
                <p className={s.categoryBlurb}>{cat.blurb}</p>
                <span className={s.categoryCta}>{cat.ctaLabel} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Launch partners */}
      <section id="partners" className={s.partners}>
        <header className={s.partnersHead}>
          <p className={s.partnersEy}>{cms(partnersHead, "eyebrow", "The collective at launch")}</p>
          <h2 className={s.partnersTitle}>
            {cms(partnersHead, "headline", "Four launch")}{" "}
            <em>{cms(partnersHead, "headlineEm", "partners.", "headline")}</em>
          </h2>
          <p className={s.partnersLede}>
            {cms(
              partnersHead,
              "body",
              "We name our partners openly. Each has signed up on the understanding that House Approved is a standard, not a label, reviewed annually, honestly, by both sides.",
            )}
          </p>
        </header>
        <div className={s.partnersGrid}>
          {partners.map((p) => (
            <Link
              key={p.slug}
              href={`/partners/${p.slug}`}
              className={s.partnerCard}
            >
              <div className={s.partnerImage}>
                <Image
                  src={p.heroImage}
                  alt={p.name}
                  width={720}
                  height={540}
                  sizes="(min-width: 1024px) 25vw, 90vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={s.partnerBody}>
                <p className={s.partnerType}>
                  {p.typeLabel} · {p.basedIn}
                </p>
                <h3 className={s.partnerName}>{p.name}</h3>
                <p className={s.partnerBlurb}>{p.shortBio}</p>
                <ul className={s.partnerSpecialties}>
                  {p.specialties.slice(0, 3).map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <span className={s.partnerCta}>Read the profile →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. House Approved seal */}
      <section id="seal" className={s.seal}>
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
        <div className={s.sealImage}>
          <Image
            src={cms(seal, "imageUrl", "/home-v4/design-portrait.webp")}
            alt={cms(
              seal,
              "imageAlt",
              "A tall sample board labelled Interior Design leaning in a Georgian hallway",
            )}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* 6. Apply CTA */}
      <section id="apply" className={s.apply}>
        <FlowerWatermark color="gold" side="right" opacity={0.18} />
        <p className={s.applyKicker}>{cms(apply, "eyebrow", "For studios and makers")}</p>
        <p className={s.applyStatement}>
          {cms(apply, "headline", "Apply to")}{" "}
          <em>{cms(apply, "headlineEm", "the collective.", "headline")}</em>
        </p>
        <p className={s.applyLede}>
          {cms(
            apply,
            "body",
            "We review applications quarterly. House Approved is a standard, not a label. We accept very few, on principle. Write to the House with your portfolio and we'll be in touch.",
          )}
        </p>
        <div className={s.applyCtas}>
          <Link href={cms(apply, "ctaHref", "/contact?subject=Partner+application")} className={s.btnFilled}>
            {cms(apply, "ctaLabel", "Apply to join")}
          </Link>
          <Link href={cms(apply, "cta2Href", "/the-house/standards")} className={s.btnGhost}>
            {cms(apply, "cta2Label", "Read the standards")}
            <span aria-hidden="true" className={s.btnArrow}>→</span>
          </Link>
        </div>
      </section>

      {/* 7. Newsletter */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "cream"}
        sourcePage="/partners"
        {...(nlBlock ?? {})}
      />
    </div>
  );
}
