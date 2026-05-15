import Image from "next/image";
import Link from "next/link";
import { getPageSections, cms } from "@/lib/cms/page-sections";
import { ArtworkProgressRail } from "@/components/marketing/the-house/ArtworkProgressRail";
import { ArtworkVolumesShelf } from "@/components/marketing/the-house/ArtworkVolumesShelf";
import { ArtworkEcosystem } from "@/components/marketing/the-house/ArtworkEcosystem";
import { ArtworkReveal } from "@/components/marketing/the-house/ArtworkReveal";
import s from "./artwork.module.css";

/**
 * /the-house/artwork — The Artwork of the House.
 *
 * A cinematic ten-chapter editorial: the brand's origin story rendered
 * as full-bleed plates, split editorial moments, pull quotes, and two
 * interactive components (the coloured-volumes shelf, the ecosystem).
 *
 * All chapter plates live in /public/the-house/artwork/ as WebP.
 * Pattern atmosphere uses /public/the-house/artwork/pattern-master.webp
 * + pattern-tile-gold-on-cream.webp.
 *
 * Source words: THE ARTWORK OF THE HOUSE.pdf, Samuel Collett.
 */

export const metadata = {
  title: "The Artwork of the House",
  description:
    "A design-led story of heritage, craft, colour, and British domestic beauty. How the House of Willow Alexander was cultivated, not branded.",
};

const ART = "/the-house/artwork";
const PATTERN_MASTER = `${ART}/pattern-master.webp`;
const PATTERN_TILE = `${ART}/pattern-tile-gold-on-cream.webp`;
const PATTERN_GREEN = `${ART}/pattern-master-gold-on-green.webp`;

type Chapter = {
  roman: "I" | "II" | "III" | "IV" | "V" | "VI" | "VII" | "VIII" | "IX" | "X";
  kicker: string;
  headline: string;
  body: string[];
  pullQuote?: string;
};

const CHAPTERS: Chapter[] = [
  {
    roman: "I",
    kicker: "Every house begins with a name",
    headline: "A name chosen like a dedication.",
    body: [
      "Willow — inspired by Samuel's mother's favourite tree. A symbol of resilience, softness, and quiet magic. A tree that bends but never breaks. Alexander — the name of the co-founder. Steady, classical, architectural. The grounding note that anchors the lyricism of the willow.",
      "Together, they form a name with its own mythology — a name that sounds as though it has lived on bookshelves and brass plaques for generations.",
    ],
    pullQuote: "A name planted like a tree. A House rooted in meaning.",
  },
  {
    roman: "II",
    kicker: "The birthplace",
    headline: "A garden studio, and a little magic.",
    body: [
      "The brand began as a garden design studio — its creative cradle. Two artefacts lit the spark: a vintage copy of The Wizard of Oz, with typography that danced between fantasy and serif authority, and an antique gardening encyclopaedia, bound in deep green and black.",
      "From these came our first palette: heritage green, grounded in nature, paired with a thread of gold — a subtle spark of magic. Earthy, enchanting, quietly theatrical.",
    ],
  },
  {
    roman: "III",
    kicker: "The Victorian discovery",
    headline: "Mrs Beeton, and the first pattern.",
    body: [
      "Studying British design history, Samuel encountered the ornate world of Mrs Beeton — the Victorian matriarch of British domestic culture. Her books were more than manuals; they were artworks. Engraved botanical frames, decorative florals, meticulous linework.",
      "From these illustrations came the first Willow Alexander pattern: a continuous hand-drawn floral tapestry, originally rendered in gold on deep green. The pattern connected horticultural expertise to domestic authority — garden and home united under a single illustrated canopy.",
    ],
    pullQuote: "Not in trend, but in tradition. Not in decoration, but in cultural lineage.",
  },
  {
    roman: "IV",
    kicker: "The coloured volumes",
    headline: "A library that became a fleet.",
    body: [
      "Mrs Beeton's books came in coloured editions. Greens. Blues. Burgundies. Teals. Auburns. Magentas. A row of them looked like the rainbow of British housekeeping — each spine a different discipline of domestic life.",
      "Years later, those colours resurfaced as the perfect design system. Each Willow Alexander service became its own volume in the library of the House — wrapped in the same white floral pattern, transformed into a moving anthology of expertise.",
    ],
    pullQuote: "This is not a rainbow. It is a system — a coded, crafted chromatic identity rooted in British publishing history.",
  },
  {
    roman: "V",
    kicker: "From studio to institution",
    headline: "When a studio became a House.",
    body: [
      "As the brand expanded, the name began to behave like something larger than a business. It became a House. The service brands became its children. The House became the library, the host, the institution.",
      "Visually, this required an evolution. Gold stepped forward as the primary colour of the House. Cream became the fresh, editorial canvas. The floral pattern transformed from decorative heritage into institutional insignia, used with elegance and restraint.",
      "Heritage modernism replaced whimsy. Editorial clarity replaced embellishment. Quiet confidence replaced decorative charm.",
    ],
  },
  {
    roman: "VI",
    kicker: "The pattern today",
    headline: "Linework, as a language.",
    body: [
      "The floral pattern now functions as one of the House's most important design devices. It speaks differently depending on where it lives.",
      "For the institution: gold or white linework, used sparingly, as a frame, a border, a whisper — the visual equivalent of a monogram. For the service brands: white pattern set boldly over their Beeton-inspired colourways — a visual genealogy linking each discipline back to the House. For editorial and the marketplace: the pattern deepens, softens, expands; becomes atmosphere, textile, mood.",
      "The pattern does what the House does. It unites many worlds with quiet authority.",
    ],
  },
  {
    roman: "VII",
    kicker: "The early icons",
    headline: "A human hand in the margins.",
    body: [
      "In the early years, a family of hand-drawn icons appeared across the brand — sketches inspired by the doodles and recipe notes a mother might scribble in the margins of her favourite cookbook. They expressed warmth, familiarity, the human hand behind the services.",
      "As the House matured, the icons gently stepped back. They live now mostly in the archive, but their spirit remains in the tone of voice: warm, observant, never cold.",
    ],
  },
  {
    roman: "VIII",
    kicker: "The ecosystem",
    headline: "A living, design-led universe.",
    body: [
      "The House is now a complete aesthetic ecosystem: institution, service brands, editorial voice, modern intelligence. Every part is threaded together by name, colour, pattern, story. Nothing stands alone.",
    ],
  },
  {
    roman: "IX",
    kicker: "The philosophy",
    headline: "Beauty as responsibility.",
    body: [
      "At the heart of the House lies a belief: that homes and gardens are not simply spaces, but expressions of care. That craftsmanship and sustainability are not trends, but inherited duties. That beauty is not excess, but an act of stewardship.",
      "The artwork of the House — its colours, its patterns, its names, its stories — is a reminder that design matters because life matters. That what we touch daily should be crafted with intention.",
    ],
    pullQuote: "Beauty is not excess. It is an act of stewardship.",
  },
  {
    roman: "X",
    kicker: "A living story",
    headline: "Rooted in the past. Growing into the future.",
    body: [
      "The artwork of the House is not finished. It evolves with every new service, every new product, every new idea. But its foundation is set — a name planted like a tree, a palette lifted from literature, a pattern drawn from Victorian craft, a fleet inspired by British domestic history. A brand that feels discovered, not invented.",
    ],
  },
];

export default async function ArtworkPage() {
  const sections = await getPageSections("the-house-artwork");
  const sx = (name: string) => sections.get(name);

  return (
    <div className={s.page}>
      <ArtworkProgressRail />

      {/* ════════════════════════════════════════════════════════════
          HERO — full-bleed cinematic title plate
          (the cover image carries the title; we only add a SR-only h1
          and a scroll indicator over a subtle bottom scrim)
          ════════════════════════════════════════════════════════════ */}
      <section className={s.hero}>
        <div className={s.heroPlate}>
          <Image
            src={`${ART}/01-cover.webp`}
            alt={cms(
              sx("hero"),
              "headline",
              "The Artwork of the House — A Design-Led Story of Heritage, Craft, Colour & British Domestic Beauty",
            )}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <h1 className={s.srOnly}>The Artwork of the House</h1>
        <div className={s.heroBottom}>
          <p className={s.heroChapters}>↓ ten chapters</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CHAPTER I — A name like a dedication
          ════════════════════════════════════════════════════════════ */}
      <SplitChapter
        chapter={CHAPTERS[0]}
        image={`${ART}/02-name-opening.webp`}
        imageAlt="Every house begins with a name"
        side="right"
        first
      />
      <FullPlate
        src={`${ART}/03-name-meaning.webp`}
        alt="Willow and Alexander — the symbolism"
      />
      <PullQuote quote={CHAPTERS[0].pullQuote!} backdrop={`${ART}/04-name-planted.webp`} />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER II — A garden studio, a little magic
          ════════════════════════════════════════════════════════════ */}
      <SplitChapter
        chapter={CHAPTERS[1]}
        image={`${ART}/05-garden-studio.webp`}
        imageAlt="The garden studio — Wizard of Oz + antique gardening encyclopaedia"
        side="left"
        bg="cream-dark"
      />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER III — Mrs Beeton & the first pattern
          ════════════════════════════════════════════════════════════ */}
      <SplitChapter
        chapter={CHAPTERS[2]}
        image={`${ART}/06-mrs-beeton-discovery.webp`}
        imageAlt="Mrs Beeton — the Victorian matriarch of British domestic culture"
        side="right"
      />
      <FullPlate
        src={`${ART}/07-first-pattern.webp`}
        alt="The first pattern — gold on deep green"
        cinematic
      />
      <PullQuote quote={CHAPTERS[2].pullQuote!} dark />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER IV — Coloured volumes (interactive)
          ════════════════════════════════════════════════════════════ */}
      <SplitChapter
        chapter={CHAPTERS[3]}
        image={`${ART}/10-coloured-volumes.webp`}
        imageAlt="The coloured volumes that became a fleet"
        side="right"
        bg="cream"
      />
      <ArtworkVolumesShelf />
      <FullPlate
        src={`${ART}/11-volumes-named.webp`}
        alt="The seven service colours, named"
      />
      <PullQuote quote={CHAPTERS[3].pullQuote!} dark />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER V — From studio to institution
          ════════════════════════════════════════════════════════════ */}
      <FullPlate
        src={`${ART}/08-house-emerges.webp`}
        alt="The House emerges — from studio to institution"
        cinematic
      />
      <SplitChapter
        chapter={CHAPTERS[4]}
        image={`${ART}/09-gold-and-cream.webp`}
        imageAlt="Gold and cream — the institutional palette"
        side="left"
        bg="cream-dark"
      />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER VI — Pattern today
          ════════════════════════════════════════════════════════════ */}
      <FullPlate
        src={`${ART}/12-pattern-today.webp`}
        alt="The pattern today — linework as a language"
        cinematic
      />
      <ChapterCopy chapter={CHAPTERS[5]} bg="cream" />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER VII — Early icons
          ════════════════════════════════════════════════════════════ */}
      <ChapterCopy chapter={CHAPTERS[6]} bg="cream-dark" />
      <FullPlate
        src={`${ART}/13-early-icons.webp`}
        alt="The early icons — a human hand in the margins"
      />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER VIII — Ecosystem (interactive)
          ════════════════════════════════════════════════════════════ */}
      <ChapterCopy chapter={CHAPTERS[7]} bg="cream" />
      <FullPlate
        src={`${ART}/14-ecosystem.webp`}
        alt="The ecosystem — a living, design-led universe"
        cinematic
      />
      <ArtworkEcosystem />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER IX — Philosophy
          ════════════════════════════════════════════════════════════ */}
      <section
        className={`${s.philosophy}`}
        data-chapter={CHAPTERS[8].roman}
        id={`chapter-${CHAPTERS[8].roman.toLowerCase()}`}
      >
        <div className={s.philosophyPattern} aria-hidden="true" />
        <ArtworkReveal className={s.philosophyInner}>
          <p className={s.kicker}>{CHAPTERS[8].kicker}</p>
          <p className={s.chapterRoman}>Chapter {CHAPTERS[8].roman}</p>
          <h2 className={s.headline}>{CHAPTERS[8].headline}</h2>
          {CHAPTERS[8].body.map((p, i) => (
            <p key={i} className={s.philosophyBody}>{p}</p>
          ))}
        </ArtworkReveal>
      </section>
      <FullPlate
        src={`${ART}/15-philosophy.webp`}
        alt="Beauty as responsibility"
        cinematic
      />
      <PullQuote quote={CHAPTERS[8].pullQuote!} dark />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER X — A living story
          ════════════════════════════════════════════════════════════ */}
      <SplitChapter
        chapter={CHAPTERS[9]}
        image={`${ART}/16-house-continues.webp`}
        imageAlt="The House continues — a living story"
        side="right"
        bg="cream"
      />

      {/* ════════════════════════════════════════════════════════════
          CLOSING — final colophon plate + CTAs
          ════════════════════════════════════════════════════════════ */}
      <section className={s.closing}>
        <div className={s.closingPlate}>
          <Image
            src={`${ART}/17-closing.webp`}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.closingScrim} aria-hidden="true" />
        <div className={s.closingInner}>
          <p className={s.closingKicker}>The House of Willow Alexander</p>
          <p className={s.closingStatement}>
            A modern British institution built on <em>design, story, care</em>
            <br />
            and the extraordinary beauty of home.
          </p>
          <div className={s.closingCtas}>
            <Link href="/the-house/philosophy" className={s.btnFilled}>
              Read our philosophy
            </Link>
            <Link href="/the-house" className={s.btnGhostLight}>
              Back to The House
              <span aria-hidden="true" className={s.btnArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className={s.tagline}>
        <p>
          Ownership is passive. <em>Stewardship is intentional.</em>
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Section primitives
   ──────────────────────────────────────────────────────────────────── */

function SplitChapter({
  chapter,
  image,
  imageAlt,
  side = "right",
  bg = "cream",
  first = false,
}: {
  chapter: Chapter;
  image: string;
  imageAlt: string;
  side?: "left" | "right";
  bg?: "cream" | "cream-dark";
  first?: boolean;
}) {
  const bgClass = bg === "cream" ? s.bgCream : s.bgCreamDark;
  const sideClass = side === "right" ? s.splitRight : s.splitLeft;
  return (
    <section
      id={`chapter-${chapter.roman.toLowerCase()}`}
      data-chapter={chapter.roman}
      className={`${s.split} ${bgClass} ${sideClass}`}
    >
      <div className={s.splitVisual}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          priority={first}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <ArtworkReveal className={s.splitCopy}>
        <div className={s.splitCopyInner}>
          <p className={s.kicker}>{chapter.kicker}</p>
          <p className={s.chapterRoman}>Chapter {chapter.roman}</p>
          <h2 className={s.headline}>{chapter.headline}</h2>
          {chapter.body.map((p, i) => (
            <p key={i} className={s.body}>{p}</p>
          ))}
        </div>
      </ArtworkReveal>
    </section>
  );
}

function FullPlate({
  src,
  alt,
  cinematic = false,
}: {
  src: string;
  alt: string;
  cinematic?: boolean;
}) {
  return (
    <section className={`${s.plate} ${cinematic ? s.plateCinematic : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </section>
  );
}

function ChapterCopy({
  chapter,
  bg = "cream",
}: {
  chapter: Chapter;
  bg?: "cream" | "cream-dark";
}) {
  return (
    <section
      id={`chapter-${chapter.roman.toLowerCase()}`}
      data-chapter={chapter.roman}
      className={`${s.copySection} ${bg === "cream" ? s.bgCream : s.bgCreamDark}`}
    >
      <ArtworkReveal className={s.copySectionInner}>
        <p className={s.kicker}>{chapter.kicker}</p>
        <p className={s.chapterRoman}>Chapter {chapter.roman}</p>
        <h2 className={s.headline}>{chapter.headline}</h2>
        {chapter.body.map((p, i) => (
          <p key={i} className={s.body}>{p}</p>
        ))}
      </ArtworkReveal>
    </section>
  );
}

function PullQuote({
  quote,
  dark = false,
  backdrop,
}: {
  quote: string;
  dark?: boolean;
  backdrop?: string;
}) {
  if (backdrop) {
    return (
      <section className={`${s.pullQuoteBackdrop}`}>
        <Image
          src={backdrop}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className={s.pullQuoteScrim} aria-hidden="true" />
        <ArtworkReveal className={s.pullQuoteInner}>
          <p className={s.pullQuoteText}>{"“"}{quote}{"”"}</p>
          <div className={s.pullQuoteRule} aria-hidden="true" />
        </ArtworkReveal>
      </section>
    );
  }
  return (
    <section className={`${s.pullQuote} ${dark ? s.pullQuoteDark : ""}`}>
      <ArtworkReveal className={s.pullQuoteInner}>
        <p className={s.pullQuoteText}>{"“"}{quote}{"”"}</p>
        <div className={s.pullQuoteRule} aria-hidden="true" />
      </ArtworkReveal>
    </section>
  );
}
