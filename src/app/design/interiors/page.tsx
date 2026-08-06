import Image from "next/image";
import Link from "next/link";
import s from "./interiors.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { BeforeAfterSlider } from "@/components/marketing/BeforeAfterSlider";
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
    "Consciously designed interiors through The House Edit. Digital plans, full-home edits, and styling sessions, every scheme House Approved.",
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
  // Spell out the plan-pack count so the heading can never disagree with the cards.
  const planWays =
    ["", "One way", "Two ways", "Three ways", "Four ways", "Five ways", "Six ways", "Seven ways"][planCards.length] ??
    `${planCards.length} ways`;

  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <FlowerWatermark color="gold" side="left" opacity={0.16} className="!top-auto bottom-[-12%] h-[74%]" />
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "Home & Interior Design · House Companion powered by HoWA")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Consciously designed")}{" "}
              <em>{cms(hero, "headlineEm", "interiors.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "Rooms read for the people who live in them, not decorated at them. Worked out in plaster, paint, joinery and the light a room actually gets, with Delve Interiors, our House Approved studio who know period fabric and how a house wears over years.",
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
                {cms(hero, "ctaLabel", "See the plan packs")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/contact")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "Work with an interior studio")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
            <p style={{ marginTop: 20, fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.55, color: "var(--color-house-stone)", maxWidth: "58ch" }}>
              House Companion shapes the brief. HoWA creates the project, plan and next action. House Pro manages verification and delivery.
            </p>
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

      {/* 1b. Interior journey (Copy Pack §09) — design around the life already happening. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,88px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1080px]">
          <div className="mx-auto mb-9 max-w-[640px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The interior journey</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,42px)] leading-[1.08] text-house-brown">
              Design around <em>the life already happening.</em>
            </h2>
            <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
              House Companion learns how the room must work and feel; HoWA holds the project, decisions and files.
            </p>
          </div>
          <ol className="grid list-none gap-x-8 gap-y-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {["People and routines", "Storage and access", "Items to keep", "Light and measurements", "Taste and materials", "Layouts", "Selected scheme", "Sourcing", "Technical review", "Installation"].map((step, i) => (
              <li key={step} className="border-t border-house-brown/15 pt-3">
                <span className="font-display text-[16px] text-house-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 font-sans text-[14px] leading-[1.4] text-house-brown">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>{cms(stats, "headline", "Beauty. Balance. Intention.")}</p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Every scheme through Delve Interiors, House Approved.")}
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
            {planWays}{" "}
            <em>to begin.</em>
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
                <Link href="/contact" className={s.planCta}>
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
          <p className={s.companionEy}>{cms(companion, "eyebrow", "House Companion · Powered by HoWA")}</p>
          <h2 className={s.companionTitle}>
            {cms(companion, "headline", "Start with")}{" "}
            <em>{cms(companion, "headlineEm", "House Companion.", "headline")}</em>
          </h2>
          <p className={s.companionLede}>
            {cms(
              companion,
              "body",
              "Use House Companion to map your room, ambition, timeline, budget and aesthetic direction. You get a first direction and an indicative budget you own, a brief Delve can work from on day one, nothing lost, nothing repeated.",
            )}
          </p>
          <p className={s.companionFootnote}>
            {cms(companion, "caption", "This is HoWA First Interior Design, £400.")}
          </p>
          <Link
            href={cms(companion, "ctaHref", "/house-companion/room")}
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
          <BeforeAfterSlider
            beforeSrc="/design/interiors/interior-before.png"
            afterSrc="/design/interiors/interior-after.png"
            beforeAlt="A living room and dining space before design"
            afterAlt="The same room reimagined by House Companion: statement pendant, reimagined built-ins with integrated lighting, a new chandelier, custom banquette and lounge chairs"
            beforeLabel="Your room"
            afterLabel="Companion's read"
          />
        </div>
      </section>

      {/* 6b. Delivery / House Approved (Copy Pack §09) — carry the scheme into the real room. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,88px)]" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[900px] text-center">
          <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Delivery · House Approved</p>
          <h2 className="mb-5 font-display text-[clamp(26px,3.2vw,42px)] leading-[1.08] text-house-brown">
            Carry the scheme into <em>the real room.</em>
          </h2>
          <p className="mx-auto mb-8 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-house-stone">
            Invite House Approved designers, joiners, decorators and trades to review, quote or deliver the selected scope. The House coordinates the work, and HoWA keeps the final choices, costs, photographs, warranties and care information with your address.
          </p>
          <div className="btn-row">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
              Request professional support <span aria-hidden>→</span>
            </Link>
            <Link href="/house-approved" className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
              Explore House Approved
            </Link>
          </div>
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
