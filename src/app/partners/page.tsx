import Image from "next/image";
import Link from "next/link";
import s from "./partners.module.css";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { LAUNCH_PARTNERS, PARTNER_ORDER } from "@/lib/partners-data";

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
  title: "Partners — The people behind the House.",
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
    eyebrow: "Marketplace",
    title: "Objects worth keeping.",
    titleEm: "keeping.",
    blurb:
      "Artisan makers, curated suppliers and the things we believe in. Selected by the House, written back to your home record through HoWA.",
    image: "/services/subbrands/handyman.jpg",
    href: "/shop",
    ctaLabel: "Visit the shop",
  },
];

const SEAL_LINES = [
  "We've worked with the principal directly on at least one project.",
  "Their references include people we already trust.",
  "Their craft, communication and finish all hold up under scrutiny.",
  "They review with us annually — and we publish what changes.",
];

export default async function PartnersHub() {
  const nlBlock = await getNewsletterBlock("partners");
  const partners = PARTNER_ORDER.map((slug) => LAUNCH_PARTNERS[slug]);

  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>House Approved · Partners</p>
            <h1 className={s.heroTitle}>
              The people <em>behind the House.</em>
            </h1>
            <p className={s.heroLede}>
              Every partner below holds a House Approved seal. We know them, we
              have seen their work in person, and we'd point a family member at
              them. The list grows slowly, on purpose.
            </p>
            <div className={s.heroCtas}>
              <Link href="#partners" className={s.btnFilled}>
                Meet the partners
              </Link>
              <Link href="#seal" className={s.btnGhost}>
                The standard
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
          <p className={s.statsLedeLine1}>Vetted in person. Reviewed annually.</p>
          <p className={s.statsLedeLine2}>Named openly. Held to the same standard.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Three categories */}
      <section className={s.categories}>
        <header className={s.categoriesHead}>
          <p className={s.categoriesEy}>Three disciplines</p>
          <h2 className={s.categoriesTitle}>
            One standard, <em>three crafts.</em>
          </h2>
          <p className={s.categoriesLede}>
            The collective spans design studios, service providers and curated
            suppliers — each governed by the same House Approved standard.
          </p>
        </header>
        <div className={s.categoriesGrid}>
          {CATEGORIES.map((cat) => (
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
          <p className={s.partnersEy}>The collective at launch</p>
          <h2 className={s.partnersTitle}>
            Four launch <em>partners.</em>
          </h2>
          <p className={s.partnersLede}>
            We name our partners openly. Each has signed up on the
            understanding that House Approved is a standard, not a label —
            reviewed annually, honestly, by both sides.
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
          <p className={s.sealEy}>House Approved</p>
          <h2 className={s.sealTitle}>
            The seal means <em>four things.</em>
          </h2>
          <ul className={s.sealList}>
            {SEAL_LINES.map((line, i) => (
              <li key={i}>
                <span className={s.sealLineNum}>0{i + 1}.</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <Link href="/the-house/standards" className={s.sealLink}>
            Read the standards →
          </Link>
        </div>
        <div className={s.sealImage}>
          <Image
            src="/home-v4/design-portrait.png"
            alt="A tall sample board labelled Interior Design leaning in a Georgian hallway"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* 6. Apply CTA */}
      <section id="apply" className={s.apply}>
        <p className={s.applyKicker}>For studios and makers</p>
        <p className={s.applyStatement}>
          Apply to <em>the collective.</em>
        </p>
        <p className={s.applyLede}>
          We review applications quarterly. House Approved is a standard, not a
          label — we accept very few, on principle. Write to the House with
          your portfolio and we'll be in touch.
        </p>
        <div className={s.applyCtas}>
          <Link href="/contact?subject=Partner+application" className={s.btnFilled}>
            Apply to join
          </Link>
          <Link href="/the-house/standards" className={s.btnGhost}>
            Read the standards
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
