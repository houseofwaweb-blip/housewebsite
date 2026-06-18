import Image from "next/image";
import Link from "next/link";
import s from "./the-house.module.css";
import { TheHouseNav } from "./TheHouseNav";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /the-house — the brand institution page.
 *
 * Section order:
 *   1. Hero — dollhouse-on-cabinet scene, copy left, cream/HoWA leaning
 *   2. Stats strip — the institution at a glance
 *   3. Premise — editorial pull quote
 *   4. Four pillars — Care · Protect · Design · Shop
 *   5. Transition band — House standard / HoWA record
 *   6. HoWA — cream pillar (HoWA-leaning per Alex)
 *   7. Steward — navy pillar (reserved for Steward)
 *   8. Closing
 *   9. Newsletter
 */

export const metadata = {
  title: "The House — A modern British institution.",
  description:
    "What House of Willow Alexander is: care, protection, design, commerce, HoWA, and Steward Plans. A modern British institution for the stewardship of homes.",
};

const STAT_COLS = [
  { value: "4", label: "Disciplines" },
  { value: "1", label: "Living Record" },
  { value: "17", label: "House standards" },
  { value: "∞", label: "Continuity" },
];

const PILLARS = [
  {
    id: "care",
    numeral: "I.",
    eyebrow: "Care",
    title: "Quiet, ongoing care.",
    hook:
      "Gardening, cleaning, gutter work, window cleaning. The things that keep a home right, done to a House standard.",
    body:
      "Book one-off through Services, or bundle on a Steward Plan and let HoWA hold the calendar.",
    image: "/home-v4/plus-benefit-1.webp",
    imageAlt:
      "A hand cleaning a sash window in golden-hour light, with a plant on the sill inside",
    link: "/services",
    linkLabel: "See Services",
  },
  {
    id: "protect",
    numeral: "II.",
    eyebrow: "Protect",
    title: "Protection that understands.",
    hook:
      "Insurance, condition reviews, and the paper trail that proves the care was done.",
    body:
      "A Home Protection Review surveys the property. The evidence feeds your insurance introduction. House Approved underwriters who know the difference between a sash window and a uPVC frame.",
    image: "/home-v4/protect-still-life.webp",
    imageAlt:
      "Brass padlock, smoke detector, key and chain on a wooden cabinet — the still life of stewardship",
    link: "/protect",
    linkLabel: "See Protect",
  },
  {
    id: "design",
    numeral: "III.",
    eyebrow: "Design",
    title: "The design studio.",
    hook:
      "Interiors, gardens, and the spaces between. House-vetted designers who understand period homes.",
    body:
      "Connected to designers who've been through the House approval process. Listed buildings, conservation areas, the kind of property that doesn't fit a template. Every project filed to your HoWA record.",
    image: "/home-v4/pillar-1.webp",
    imageAlt: "A warm parlour interior with marble fireplace and flowers",
    link: "/partners",
    linkLabel: "Explore design partners",
  },
  {
    id: "shop",
    numeral: "IV.",
    eyebrow: "Shop",
    title: "Objects worth keeping.",
    hook:
      "A curated shop of tools, homewares and garden pieces that carry the House Approved seal.",
    body:
      "Carbon steel secateurs from Sheffield. Copper watering cans from Kent. Linen from Ireland. Things built to last and worth looking after.",
    image: "/home-v4/plus-benefit-4.webp",
    imageAlt:
      "A linen-bound folder open on a desk with paint chips, an EICR certificate and a small framed photo",
    link: "/shop",
    linkLabel: "Browse the shop",
  },
];

// Directory of every route under the House — this page is the front door.
const HOUSE_ROUTES = [
  {
    heading: "What we stand for",
    links: [
      { label: "Philosophy", href: "/the-house/philosophy", desc: "Our founding idea" },
      { label: "The Artwork of the House", href: "/the-house/artwork", desc: "Heritage, craft, colour" },
      { label: "Standards", href: "/the-house/standards", desc: "How we work" },
      { label: "Proof", href: "/the-house/proof", desc: "The record, evidenced" },
      { label: "Sustainability", href: "/the-house/sustainability", desc: "Our commitments" },
      { label: "About", href: "/the-house/about", desc: "The team behind the House" },
    ],
  },
  {
    heading: "What we do",
    links: [
      { label: "Design", href: "/design", desc: "Interiors & gardens" },
      { label: "Services", href: "/services", desc: "Care for the home" },
      { label: "Protect", href: "/protect", desc: "Insurance & reviews" },
      { label: "Shop", href: "/shop", desc: "House Approved objects" },
      { label: "HoWA", href: "/howa", desc: "The home system" },
    ],
  },
  {
    heading: "Reading",
    links: [
      { label: "The Hearth", href: "/the-hearth", desc: "The magazine" },
      { label: "Musings", href: "/musings", desc: "Notes & advice" },
      { label: "Recipes", href: "/recipes", desc: "Seasonal cooking" },
      { label: "News", href: "/news", desc: "Press & awards" },
    ],
  },
];

export default async function TheHousePage() {
  const nlBlock = await getNewsletterBlock("the-house");
  const sections = await getPageSections("the-house");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const premise = sections.get("premise");
  const pillarsSection = sections.get("pillars");
  const transition = sections.get("transition");
  const howa = sections.get("howa");
  const steward = sections.get("steward");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const pillarCards = cmsCards(pillarsSection, PILLARS, (c, base) => ({
    id: base?.id ?? "",
    numeral: base?.numeral ?? "",
    eyebrow: pick(c.label, base?.eyebrow ?? ""),
    title: pick(c.title, base?.title ?? ""),
    hook: pick(c.body, base?.hook ?? ""),
    body: pick(c.value, base?.body ?? ""),
    image: base?.image ?? "",
    imageAlt: base?.imageAlt ?? "",
    link: pick(c.ctaHref, base?.link ?? "#"),
    linkLabel: pick(c.ctaLabel, base?.linkLabel ?? ""),
  }));

  return (
    <div className={s.page}>
      <TheHouseNav />

      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "The House")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "A modern British")}{" "}
              <em>{cms(hero, "headlineEm", "institution.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "House of Willow Alexander exists for the people who care about their homes enough to want them looked after properly. Not just maintained. Stewarded — design, care, protection, and the things worth keeping, all connected by one Living Record.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "/howa")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Coming soon")}
              </Link>
              <Link href={cms(hero, "cta2Href", "#care")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "What we do")}
                <span aria-hidden="true" className={s.btnArrow}>↓</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={cms(hero, "imageUrl", "/home-v4/howa-dollhouse-scene.webp")}
            alt={cms(
              hero,
              "imageAlt",
              "A Georgian dollhouse on a wooden cabinet with annotations — Roof, Boiler, Garden — beside a lamp, dried flowers and a House Health widget",
            )}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Ownership is passive. Stewardship is intentional.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "One House. One Standard. One Record.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Premise — two-column with the watercolour illustration */}
      <section className={s.premise} id="premise">
        <div className={s.premiseCopy}>
          <p className={s.premiseEy}>{cms(premise, "eyebrow", "A home that remembers")}</p>
          <p className={s.premiseStatement}>
            {cms(
              premise,
              "headline",
              "Homes deserve the same kind of quiet institution that schools, clubs and estates have always had.",
            )}{" "}
            <em>
              {cms(
                premise,
                "headlineEm",
                "Somewhere to belong. Somewhere to ask. Somewhere that remembers.",
              )}
            </em>
          </p>
          <p className={s.premiseBody}>
            {cms(
              premise,
              "body",
              "The House is built around four ideas — Care, Flow, Order, Trust. Every service, decision and record lands inside that frame, and the home gets quietly better, year after year.",
            )}
          </p>
        </div>
        <div className={s.premiseImage}>
          <Image
            src={cms(premise, "imageUrl", "/home-v4/house-watercolour.webp")}
            alt={cms(
              premise,
              "imageAlt",
              "A watercolour cross-section of a Georgian cottage labelled 'A home that remembers' — Care, Flow, Order and Trust surfacing alongside Home Record, Next System Check, and Security",
            )}
            width={1024}
            height={1280}
            sizes="(min-width: 1024px) 520px, 90vw"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>

      {/* 4. Four pillars — alternating */}
      {pillarCards.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`${s.pillar} ${i % 2 === 1 ? s.pillarAlt : ""}`}
        >
          <div className={s.pillarImage}>
            <Image
              src={p.image}
              alt={p.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className={s.pillarCopy}>
            <p className={s.pillarMeta}>
              {p.numeral} <span aria-hidden="true">·</span> {p.eyebrow}
            </p>
            <h2 className={s.pillarTitle}>{p.title}</h2>
            <p className={s.pillarHook}>{p.hook}</p>
            <p className={s.pillarBody}>{p.body}</p>
            <Link href={p.link} className={s.pillarLink}>
              {p.linkLabel} →
            </Link>
          </div>
        </section>
      ))}

      {/* 5. Transition band */}
      <section className={s.transition}>
        <span className={s.transitionRule} aria-hidden="true" />
        <p className={s.transitionLine}>
          {cms(transition, "headline", "The House keeps the standard.")}{" "}
          <em>{cms(transition, "headlineEm", "HoWA keeps the record.", "headline")}</em>
        </p>
        <span className={s.transitionRule} aria-hidden="true" />
      </section>

      {/* 6. HoWA — cream (HoWA-leaning) */}
      <section className={s.howa} id="howa">
        <div className={s.howaCopy}>
          <p className={s.howaEy}>{cms(howa, "eyebrow", "V. · HoWA")}</p>
          <h2 className={s.howaTitle}>
            {cms(howa, "headline", "The Living")}{" "}
            <em>{cms(howa, "headlineEm", "Record.", "headline")}</em>
          </h2>
          <p className={s.howaHook}>
            {cms(
              howa,
              "subheadline",
              "HoWA is how the House remembers. Every service, every review, every care visit, every purchase. One record that grows with the home.",
            )}
          </p>
          <p className={s.howaBody}>
            {cms(
              howa,
              "body",
              "Start with the Assistant diagnostic. It maps your home's condition, surfaces what needs doing, and files everything to a record that stays with the property. Not a dashboard. A memory.",
            )}
          </p>
          <div className={s.howaCtas}>
            <Link href={cms(howa, "ctaHref", "/howa")} className={s.btnFilled}>
              {cms(howa, "ctaLabel", "Coming soon")}
            </Link>
            <Link href={cms(howa, "cta2Href", "/howa/plus")} className={s.pillarLink}>
              {cms(howa, "cta2Label", "See HoWA+")} →
            </Link>
          </div>
        </div>
        <div className={s.howaImage}>
          <Image
            src={cms(howa, "imageUrl", "/home-v4/howa-lander-faq-v2.webp")}
            alt={cms(
              howa,
              "imageAlt",
              "The Living Record of Your Home — a leather-bound book, key, vase and HoWA sensor on a wooden cabinet",
            )}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "contain", objectPosition: "right center" }}
          />
        </div>
      </section>

      {/* 7. Steward — navy (the one moment we go dark) */}
      <section className={s.steward} id="steward">
        <div className={s.stewardBg} aria-hidden="true">
          <Image
            src={cms(steward, "imageUrl", "/home-v4/steward-hero-blueprint.webp")}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
        <div className={s.stewardCopy}>
          <p className={s.stewardEy}>{cms(steward, "eyebrow", "VI. · Steward")}</p>
          <h2 className={s.stewardTitle}>
            {cms(steward, "headline", "Care, on a")}{" "}
            <em>{cms(steward, "headlineEm", "rhythm.", "headline")}</em>
          </h2>
          <p className={s.stewardHook}>
            {cms(
              steward,
              "subheadline",
              "Bundle the home's services into a single managed plan. The House coordinates. You don't think about it.",
            )}
          </p>
          <p className={s.stewardBody}>
            {cms(
              steward,
              "body",
              "Steward Plans combine gardening, cleaning, windows and gutters into one monthly schedule. A named team, a single invoice, every visit logged to your HoWA record. Available to House Steward members.",
            )}
          </p>
          <Link href={cms(steward, "ctaHref", "/howa/steward")} className={s.stewardCta}>
            {cms(steward, "ctaLabel", "See Steward")} →
          </Link>
        </div>
      </section>

      {/* 7b. Explore the House — directory of every route */}
      <section className="bg-house-cream px-[5vw] py-[clamp(56px,7vw,104px)]">
        <div className="max-w-[1180px] mx-auto">
          <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-house-gold-dark mb-3">
            Explore the House
          </p>
          <h2 className="font-display text-[clamp(28px,3.4vw,46px)] leading-[1.1] text-house-brown mb-10">
            Everything under one roof.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {HOUSE_ROUTES.map((group) => (
              <div key={group.heading}>
                <h3 className="font-sans text-[10px] tracking-[0.24em] uppercase text-house-stone mb-5 pb-2 border-b border-house-brown/15">
                  {group.heading}
                </h3>
                <ul className="space-y-4">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-baseline gap-2 font-display text-[20px] leading-tight text-house-brown no-underline transition-colors hover:text-house-gold-dark"
                      >
                        {l.label}
                        <span className="text-house-gold-dark opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
                      </Link>
                      <p className="font-sans text-[13px] text-house-brown/55 mt-0.5">{l.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Closing — peacock library bg, atmospheric */}
      <section className={s.closing}>
        <div className={s.closingBg} aria-hidden="true">
          <Image
            src={cms(closing, "imageUrl", "/home-v4/house-library-peacock.webp")}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.closingInner}>
          <p className={s.closingKicker}>
            {cms(closing, "eyebrow", "One home. One Record. One House.")}
          </p>
          <p className={s.closingStatement}>
            {cms(closing, "headline", "A well-kept home isn't a pile of bookings.")}<br />
            <em>{cms(closing, "headlineEm", "It's a rhythm someone else remembers.", "headline")}</em>
          </p>
          <div className={s.closingCtas}>
            <Link href={cms(closing, "ctaHref", "/howa")} className={s.closingBtnFilled}>
              {cms(closing, "ctaLabel", "Coming soon")}
            </Link>
            <Link href={cms(closing, "cta2Href", "/services")} className={s.closingBtnGhost}>
              {cms(closing, "cta2Label", "Book a service")} →
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Newsletter (keeps existing component) */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "cream"}
        sourcePage="/the-house"
        headline={nlBlock?.headline ?? "Letters from the House."}
        body={
          nlBlock?.body ??
          "A weekly note from The Hearth: seasonal reflections on homes, gardens, and the quiet art of looking after a place properly."
        }
        {...(nlBlock ?? {})}
      />
    </div>
  );
}
