import Image from "next/image";
import Link from "next/link";
import s from "./design.module.css";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

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
  title: "Design: Interiors and gardens, considered.",
  description:
    "Interiors and gardens by designers we've vetted and trust. Every project carries the House Approved seal.",
};

const STAT_COLS = [
  { value: "2", label: "Live design routes" },
  { value: "1", label: "In-house garden studio" },
  { value: "1", label: "House Approved interiors partner" },
  { value: "0", label: "Open directories" },
];

// DIRECTIVE §09 — two named routes (Delve, Willow Alexander) plus HoWA's
// design layer. No House studio "circle", no partner directory, no
// "invited by the House" hierarchy. Named studios chosen to a standard.
const CARDS = [
  {
    name: "Willow Alexander Gardens",
    type: "Garden design · planting · outdoor living · ecological schemes",
    blurb:
      "The original creative studio of the House. Planting-led gardens, seasonal structure, edible spaces, ecological thinking and outdoor rooms with lasting character.",
    cta: "Explore garden design",
    href: "/design/gardens",
    image: "/design/gardens/hero.jpg",
  },
  {
    name: "Delve Interiors",
    type: "Interior design · rooms · finishes · schemes",
    blurb:
      "A considered interiors partner for homes that need calm, detail, proportion and a more resolved way of living.",
    cta: "Explore interiors",
    href: "/design/interiors",
    image: "/design/interiors/project-tunbridge-1.webp",
  },
];

const SEAL_LINES = [
  "Chosen for taste, care and communication.",
  "Judged on whether they leave a home better understood than they found it.",
  "Held to the test we set ourselves: would we trust this in a home we love?",
  "Named studios chosen to a standard, never a padded directory.",
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
  const routeCards = cmsCards(partners, CARDS, (c, base) => ({
    name: pick(c.title, base?.name ?? ""),
    type: pick(c.label, base?.type ?? ""),
    blurb: pick(c.body, base?.blurb ?? ""),
    cta: base?.cta ?? "",
    href: base?.href ?? "",
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
            <p className={s.heroEy}>{cms(hero, "eyebrow", "House Design · Powered by HoWA")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Design that begins with")}{" "}
              <em>{cms(hero, "headlineEm", "how you live.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "Considered interiors and gardens, worked out with the studios we trust: Delve Interiors for rooms, and Willow Alexander Gardens for gardens. Commission a scheme, or give one as a voucher.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "#routes")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Meet the studios")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/shop")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "Buy a design voucher")}
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
            {cms(stats, "subheadline", "Every project mapped in HoWA, delivered by a named studio.")}
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
          <p className={s.disciplinesEy}>{cms(disciplines, "eyebrow", "Our studios")}</p>
          <h2 className={s.disciplinesTitle}>
            {cms(disciplines, "headline", "Two named studios,")}{" "}
            <em>{cms(disciplines, "headlineEm", "chosen with care.", "headline")}</em>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.7, color: "rgba(48,35,28,0.72)", margin: "18px auto 0", maxWidth: "64ch" }}>
            {cms(
              disciplines,
              "body",
              "The House does not operate as an open directory of designers. Design begins through two clear routes: Willow Alexander Gardens, the House's own garden studio, for gardens and outdoor spaces, and Delve Interiors, a House Approved partner, for considered interiors. Any studio we add later joins by standard, never to fill a directory.",
            )}
          </p>
        </header>
      </section>

      {/* 4. Two live routes + HoWA design intelligence */}
      <section id="routes" className={s.partners}>
        <header className={s.partnersHead}>
          <p className={s.partnersEy}>{cms(partners, "eyebrow", "How design begins")}</p>
          <h2 className={s.partnersTitle}>
            {cms(partners, "headline", "Two live routes.")}{" "}
            <em>{cms(partners, "headlineEm", "Both begun in HoWA.", "headline")}</em>
          </h2>
          <p className={s.partnersLede}>
            {cms(
              partners,
              "body",
              "Design begins with what is real: our garden studio, our interiors partner, and HoWA's design intelligence. Map the space in HoWA for a first direction and indicative budget, then take it forward with the right named studio.",
            )}
          </p>
        </header>
        <div className={s.partnersGrid}>
          {routeCards.map((p) => (
            <Link key={p.name} href={p.href} className={s.partnerCard}>
              <div className={s.partnerImage}>
                <Image
                  src={p.image}
                  alt={p.name}
                  width={720}
                  height={540}
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={s.partnerBody}>
                <p className={s.partnerType}>{p.type}</p>
                <h3 className={s.partnerName}>{p.name}</h3>
                <p className={s.partnerBlurb}>{p.blurb}</p>
                <span className={s.partnerCta}>{p.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4a. Commission / voucher — design is delivered by the studios above;
          purchase is via a design voucher in the Marketplace. */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Commission or give</p>
          <h2 className="mb-4 font-display text-[clamp(26px,3.4vw,44px)] leading-[1.08] text-house-brown">
            A scheme to commission, <em>or to give.</em>
          </h2>
          <p className="mx-auto mb-8 max-w-[58ch] font-sans text-[15px] leading-[1.6] text-house-stone">
            Design is delivered by the studios above. Buy a design voucher in the
            Marketplace and redeem it against a commission, or give it to someone
            making a home their own.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {/* TODO: point at the Shopify design-vouchers collection once created. */}
            <Link href="/shop" className={s.btnFilled}>Buy a design voucher</Link>
            <Link href="#routes" className={s.btnGhost}>Meet the studios</Link>
          </div>
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

      {/* Commission flow + Design Record (brief slide 13) */}
      <section className="px-[5vw] py-[clamp(56px,8vw,112px)] bg-house-cream-dark">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-center" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-house-gold-ink)", margin: "0 0 14px", fontWeight: 500 }}>
            How a commission works
          </p>
          <h2 className="text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(26px,3.4vw,42px)", lineHeight: 1.1, color: "var(--color-house-brown)", margin: "0 0 clamp(32px,4vw,56px)" }}>
            Brief to <em>handover.</em>
          </h2>
          <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 list-none p-0 m-0">
            {[
              { n: "01", t: "Brief", d: "We listen to how you live in the rooms and the garden." },
              { n: "02", t: "Moodboard", d: "A direction to react to before anything is committed." },
              { n: "03", t: "Quote", d: "Clear costs, scope and timing." },
              { n: "04", t: "Sample", d: "Finishes, paint, planting, seen before they are ordered." },
              { n: "05", t: "Handover", d: "The finished space, written to your Home Record." },
            ].map((step) => (
              <li key={step.n} className="text-center sm:text-left">
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 28, color: "var(--color-house-gold-ink)", display: "block", marginBottom: 8 }}>{step.n}</span>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-house-brown)", margin: "0 0 8px", fontWeight: 600 }}>{step.t}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.55, color: "rgba(48,35,28,0.7)", margin: 0 }}>{step.d}</p>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: "clamp(36px,5vw,64px)", padding: "clamp(24px,3vw,40px)", background: "var(--color-house-forest)" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-house-gold-light)", margin: "0 0 12px", fontWeight: 500 }}>
              The Design Record
            </p>
            <p style={{ fontFamily: "var(--font-hearth-serif)", fontSize: "clamp(17px,1.7vw,21px)", lineHeight: 1.5, color: "var(--color-house-cream)", margin: 0, maxWidth: "62ch" }}>
              Every brief, drawing, supplier, finish, paint reference, planting scheme, warranty and aftercare note is saved to your Home Record, so the house remembers how it was made long after the studio leaves.
            </p>
          </div>
        </div>
      </section>

      {/* 5b. House portfolio (DIRECTIVE §09 module 6) — real work, linking to the
          full interior and garden project galleries. */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-[640px] mx-auto mb-9">
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink mb-3">The work</p>
            <h2 className="font-display text-[clamp(26px,3vw,42px)] leading-[1.06] text-house-brown">
              Real rooms, <em>real gardens.</em>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { title: "Interior projects", href: "/design/interiors#projects", image: "/design/interiors/project-dining.webp", cta: "View interior projects" },
              { title: "Garden projects", href: "/design/gardens#projects", image: "/design/gardens/hero.jpg", cta: "View garden projects" },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="group relative block aspect-[16/10] overflow-hidden bg-house-cream-dark no-underline">
                <Image src={card.image} alt={card.title} fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,19,13,0.72), rgba(26,19,13,0.05) 58%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-[clamp(20px,2.2vw,28px)] leading-tight text-white">{card.title}</p>
                  <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-white/85 mt-1.5 group-hover:text-white transition-colors">{card.cta} →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing */}
      <section className={s.closing}>
        <FlowerWatermark color="white" side="right" opacity={0.13} />
        <p className={s.closingKicker}>{cms(closing, "eyebrow", "Commission a space")}</p>
        <p className={s.closingStatement}>
          {cms(closing, "headline", "A room. A garden.")}<br />
          <em>{cms(closing, "headlineEm", "A whole house, properly read.", "headline")}</em>
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "#open-booking-form")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Start a design brief")}
          </Link>
          <Link href={cms(closing, "cta2Href", "/design/interiors")} className={s.closingBtnGhost}>
            {cms(closing, "cta2Label", "Explore interiors")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
