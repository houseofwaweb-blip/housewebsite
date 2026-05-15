import Image from "next/image";
import Link from "next/link";
import s from "./the-house.module.css";
import { TheHouseNav } from "./TheHouseNav";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";

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
    image: "/home-v4/plus-benefit-1.png",
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
    image: "/home-v4/protect-still-life.png",
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
    image: "/home-v4/plus-benefit-4.png",
    imageAlt:
      "A linen-bound folder open on a desk with paint chips, an EICR certificate and a small framed photo",
    link: "/shop",
    linkLabel: "Browse the shop",
  },
];

export default async function TheHousePage() {
  const nlBlock = await getNewsletterBlock("the-house");

  return (
    <div className={s.page}>
      <TheHouseNav />

      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>The House</p>
            <h1 className={s.heroTitle}>
              A modern British <em>institution.</em>
            </h1>
            <p className={s.heroLede}>
              House of Willow Alexander exists for the people who care about
              their homes enough to want them looked after properly. Not just
              maintained. Stewarded — design, care, protection, and the things
              worth keeping, all connected by one Living Record.
            </p>
            <div className={s.heroCtas}>
              <Link href="/howa" className={s.btnFilled}>
                Enter HoWA
              </Link>
              <Link href="#care" className={s.btnGhost}>
                What we do
                <span aria-hidden="true" className={s.btnArrow}>↓</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src="/home-v4/howa-dollhouse-scene.png"
            alt="A Georgian dollhouse on a wooden cabinet with annotations — Roof, Boiler, Garden — beside a lamp, dried flowers and a House Health widget"
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
          <p className={s.statsLedeLine1}>Ownership is passive. Stewardship is intentional.</p>
          <p className={s.statsLedeLine2}>One House. One Standard. One Record.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Premise — two-column with the watercolour illustration */}
      <section className={s.premise} id="premise">
        <div className={s.premiseCopy}>
          <p className={s.premiseEy}>A home that remembers</p>
          <p className={s.premiseStatement}>
            Homes deserve the same kind of quiet institution that schools,
            clubs and estates have always had.{" "}
            <em>Somewhere to belong. Somewhere to ask. Somewhere that remembers.</em>
          </p>
          <p className={s.premiseBody}>
            The House is built around four ideas — Care, Flow, Order, Trust.
            Every service, decision and record lands inside that frame, and
            the home gets quietly better, year after year.
          </p>
        </div>
        <div className={s.premiseImage}>
          <Image
            src="/home-v4/house-watercolour.png"
            alt="A watercolour cross-section of a Georgian cottage labelled 'A home that remembers' — Care, Flow, Order and Trust surfacing alongside Home Record, Next System Check, and Security"
            width={1024}
            height={1280}
            sizes="(min-width: 1024px) 520px, 90vw"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>

      {/* 4. Four pillars — alternating */}
      {PILLARS.map((p, i) => (
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
          The House keeps the standard.{" "}
          <em>HoWA keeps the record.</em>
        </p>
        <span className={s.transitionRule} aria-hidden="true" />
      </section>

      {/* 6. HoWA — cream (HoWA-leaning) */}
      <section className={s.howa} id="howa">
        <div className={s.howaCopy}>
          <p className={s.howaEy}>V. · HoWA</p>
          <h2 className={s.howaTitle}>
            The Living <em>Record.</em>
          </h2>
          <p className={s.howaHook}>
            HoWA is how the House remembers. Every service, every review, every
            care visit, every purchase. One record that grows with the home.
          </p>
          <p className={s.howaBody}>
            Start with the Companion diagnostic. It maps your home's condition,
            surfaces what needs doing, and files everything to a record that
            stays with the property. Not a dashboard. A memory.
          </p>
          <div className={s.howaCtas}>
            <Link href="/howa" className={s.btnFilled}>
              Enter HoWA
            </Link>
            <Link href="/howa/plus" className={s.pillarLink}>
              See HoWA+ →
            </Link>
          </div>
        </div>
        <div className={s.howaImage}>
          <Image
            src="/home-v4/howa-lander-faq-v2.png"
            alt="The Living Record of Your Home — a leather-bound book, key, vase and HoWA sensor on a wooden cabinet"
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
            src="/home-v4/steward-hero-blueprint.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
        <div className={s.stewardCopy}>
          <p className={s.stewardEy}>VI. · Steward</p>
          <h2 className={s.stewardTitle}>
            Care, on a <em>rhythm.</em>
          </h2>
          <p className={s.stewardHook}>
            Bundle the home's services into a single managed plan. The House
            coordinates. You don't think about it.
          </p>
          <p className={s.stewardBody}>
            Steward Plans combine gardening, cleaning, windows and gutters into
            one monthly schedule. A named team, a single invoice, every visit
            logged to your HoWA record. Available to House Steward members.
          </p>
          <Link href="/howa/steward" className={s.stewardCta}>
            See Steward →
          </Link>
        </div>
      </section>

      {/* 8. Closing — peacock library bg, atmospheric */}
      <section className={s.closing}>
        <div className={s.closingBg} aria-hidden="true">
          <Image
            src="/home-v4/house-library-peacock.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.closingInner}>
          <p className={s.closingKicker}>One home. One Record. One House.</p>
          <p className={s.closingStatement}>
            A well-kept home isn't a pile of bookings.<br />
            <em>It's a rhythm someone else remembers.</em>
          </p>
          <div className={s.closingCtas}>
            <Link href="/howa" className={s.closingBtnFilled}>
              Start HoWA
            </Link>
            <Link href="/services" className={s.closingBtnGhost}>
              Book a service →
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
