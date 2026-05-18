import Image from "next/image";
import Link from "next/link";
import { ArtworkProgressRail } from "@/components/marketing/the-house/ArtworkProgressRail";
import { ArtworkVolumesShelf } from "@/components/marketing/the-house/ArtworkVolumesShelf";
import { ArtworkEcosystem } from "@/components/marketing/the-house/ArtworkEcosystem";
import { ArtworkReveal } from "@/components/marketing/the-house/ArtworkReveal";
import s from "./artwork.module.css";

/**
 * /the-house/artwork — The Artwork of the House.
 *
 * Editorial origin-story page. Built text-first so it reads correctly on
 * every viewport (no more text baked into PDF-render slides). Supporting
 * imagery is real artefacts only — the books that inspired the brand, the
 * pattern itself, the coloured volumes, the icons, the fleet. Each
 * illustration earns its place by being something the eye wants to dwell
 * on, not a slide that duplicates the body copy.
 *
 * Mechanics:
 *   - SplitChapter — text on one side, single artefact image on the other
 *   - ChapterCopy  — text-only chapter, centred
 *   - PullQuote    — italic Cormorant moment between chapters
 *   - ImageCluster — two artefacts composed as a still-life (Ch II only)
 *   - IconGrid     — the eight early hand-drawn icons (Ch VII)
 *   - ArtworkVolumesShelf — interactive seven-volume shelf
 *   - ArtworkEcosystem    — interactive ecosystem diagram
 *
 * Source words: THE ARTWORK OF THE HOUSE.pdf, Samuel Collett.
 */

export const metadata = {
  title: "The Artwork of the House",
  description:
    "A design-led story of heritage, craft, colour, and British domestic beauty. How the House of Willow Alexander was cultivated, not branded.",
};

const ART = "/the-house/artwork";

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

// Hand-drawn icons that lived in the early brand. SVG files in /icons/.
const EARLY_ICONS: Array<{ file: string; label: string }> = [
  { file: "shears", label: "Garden shears" },
  { file: "wateringcan", label: "Watering can" },
  { file: "wheelbarrow", label: "Wheelbarrow" },
  { file: "tools", label: "Toolkit" },
  { file: "van", label: "The fleet van" },
  { file: "dog", label: "The pet at the door" },
  { file: "handshake", label: "The handshake at handover" },
  { file: "earth", label: "Earth, in the round" },
];

export default function ArtworkPage() {
  return (
    <div className={s.page}>
      <ArtworkProgressRail />

      {/* ════════════════════════════════════════════════════════════
          HERO — text-first title
          A restrained opening: large serif title, lede, scroll cue,
          quiet pattern-tile atmosphere behind. No baked-text slide.
          ════════════════════════════════════════════════════════════ */}
      <section className={s.heroText}>
        <div className={s.heroTexture} aria-hidden="true" />
        <ArtworkReveal className={s.heroInner}>
          <p className={s.heroEyebrow}>House of Willow Alexander · An origin story</p>
          <h1 className={s.heroTitle}>
            The Artwork <em>of the House.</em>
          </h1>
          <p className={s.heroLede}>
            A design-led story of heritage, craft, colour, and British domestic
            beauty. How the House of Willow Alexander was cultivated, not branded.
          </p>
          <p className={s.heroScrollCue}>↓ ten chapters</p>
        </ArtworkReveal>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CHAPTER I — A name like a dedication
          ════════════════════════════════════════════════════════════ */}
      <ChapterCopy chapter={CHAPTERS[0]} bg="cream" first />
      <PullQuote quote={CHAPTERS[0].pullQuote!} />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER II — Garden studio, two artefacts
          The Wizard of Oz cover + the gardening encyclopaedia,
          composed as a still life next to the chapter copy.
          ════════════════════════════════════════════════════════════ */}
      <section
        id="chapter-ii"
        data-chapter="II"
        className={`${s.split} ${s.bgCreamDark} ${s.splitLeft}`}
      >
        <ArtworkReveal className={s.splitCopy}>
          <div className={s.splitCopyInner}>
            <p className={s.kicker}>{CHAPTERS[1].kicker}</p>
            <p className={s.chapterRoman}>Chapter {CHAPTERS[1].roman}</p>
            <h2 className={s.headline}>{CHAPTERS[1].headline}</h2>
            {CHAPTERS[1].body.map((p, i) => (
              <p key={i} className={s.body}>
                {p}
              </p>
            ))}
          </div>
        </ArtworkReveal>
        <div className={s.cluster}>
          <div className={s.clusterFront}>
            <Image
              src={`${ART}/gardening-encyclopaedia.jpg`}
              alt="An antique British gardening encyclopaedia, bound in deep green and black"
              width={1800}
              height={2400}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className={s.clusterImg}
            />
          </div>
          <div className={s.clusterBack}>
            <Image
              src={`${ART}/wizard-of-oz.jpg`}
              alt="A vintage edition of The Wizard of Oz"
              width={1800}
              height={2400}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className={s.clusterImg}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CHAPTER III — Mrs Beeton + the first pattern
          Two visuals: the Beeton spread on its own, then a closer look
          at the pattern detail. Pull quote in between (text-only).
          ════════════════════════════════════════════════════════════ */}
      <section
        id="chapter-iii"
        data-chapter="III"
        className={`${s.split} ${s.bgCream} ${s.splitRight}`}
      >
        <ArtworkReveal className={s.splitCopy}>
          <div className={s.splitCopyInner}>
            <p className={s.kicker}>{CHAPTERS[2].kicker}</p>
            <p className={s.chapterRoman}>Chapter {CHAPTERS[2].roman}</p>
            <h2 className={s.headline}>{CHAPTERS[2].headline}</h2>
            {CHAPTERS[2].body.map((p, i) => (
              <p key={i} className={s.body}>
                {p}
              </p>
            ))}
          </div>
        </ArtworkReveal>
        <div className={s.splitVisual}>
          <Image
            src={`${ART}/mrs-beeton-spread.jpg`}
            alt="An open spread from Mrs Beeton's Book of Household Management, showing the engraved botanical frames"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      <PatternReveal />

      <PullQuote quote={CHAPTERS[2].pullQuote!} />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER IV — The coloured volumes
          Text intro, then the composed shelf row (real artwork),
          then the interactive shelf. Pull quote closes.
          ════════════════════════════════════════════════════════════ */}
      <ChapterCopy chapter={CHAPTERS[3]} bg="cream" />
      <section className={s.shelfRow}>
        <Image
          src={`${ART}/volumes-shelf-row.png`}
          alt="The seven Willow Alexander volumes lined up — gardeners green, cleaners blue, handyman burgundy, window cleaners aubergine, dog walkers teal, removals magenta, and the master Home & Garden gold"
          width={2400}
          height={1200}
          sizes="100vw"
          className={s.shelfRowImg}
        />
      </section>
      <ArtworkVolumesShelf />
      <PullQuote quote={CHAPTERS[3].pullQuote!} dark />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER V — From studio to institution
          Text-led, with a small colour-swatch row showing the
          transformation (green & rough → cream + gold).
          ════════════════════════════════════════════════════════════ */}
      <ChapterCopy chapter={CHAPTERS[4]} bg="cream-dark">
        <PaletteShift />
      </ChapterCopy>

      {/* ════════════════════════════════════════════════════════════
          CHAPTER VI — The pattern today
          Text against the pattern-tile atmospheric backdrop.
          ════════════════════════════════════════════════════════════ */}
      <section
        id="chapter-vi"
        data-chapter="VI"
        className={`${s.atmosphere} ${s.bgCream}`}
      >
        <div className={s.atmospherePattern} aria-hidden="true" />
        <ArtworkReveal className={s.copySectionInner}>
          <p className={s.kicker}>{CHAPTERS[5].kicker}</p>
          <p className={s.chapterRoman}>Chapter {CHAPTERS[5].roman}</p>
          <h2 className={s.headline}>{CHAPTERS[5].headline}</h2>
          {CHAPTERS[5].body.map((p, i) => (
            <p key={i} className={s.body}>
              {p}
            </p>
          ))}
        </ArtworkReveal>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CHAPTER VII — Early icons
          Text intro, then a grid of the eight hand-drawn icons.
          ════════════════════════════════════════════════════════════ */}
      <ChapterCopy chapter={CHAPTERS[6]} bg="cream" />
      <section className={s.iconGrid}>
        <div className={s.iconGridInner}>
          {EARLY_ICONS.map(({ file, label }) => (
            <div key={file} className={s.iconCell}>
              <Image
                src={`${ART}/icons/${file}.svg`}
                alt={label}
                width={120}
                height={120}
                className={s.iconImg}
              />
              <p className={s.iconLabel}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CHAPTER VIII — The ecosystem
          Text intro + the interactive ecosystem diagram.
          ════════════════════════════════════════════════════════════ */}
      <ChapterCopy chapter={CHAPTERS[7]} bg="cream" />
      <ArtworkEcosystem />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER IX — Philosophy (text, with pattern atmosphere)
          ════════════════════════════════════════════════════════════ */}
      <section
        className={s.philosophy}
        data-chapter={CHAPTERS[8].roman}
        id={`chapter-${CHAPTERS[8].roman.toLowerCase()}`}
      >
        <div className={s.philosophyPattern} aria-hidden="true" />
        <ArtworkReveal className={s.philosophyInner}>
          <p className={s.kicker}>{CHAPTERS[8].kicker}</p>
          <p className={s.chapterRoman}>Chapter {CHAPTERS[8].roman}</p>
          <h2 className={s.headline}>{CHAPTERS[8].headline}</h2>
          {CHAPTERS[8].body.map((p, i) => (
            <p key={i} className={s.philosophyBody}>
              {p}
            </p>
          ))}
        </ArtworkReveal>
      </section>
      <PullQuote quote={CHAPTERS[8].pullQuote!} dark />

      {/* ════════════════════════════════════════════════════════════
          CHAPTER X — A living story, with the fleet as the closing image
          ════════════════════════════════════════════════════════════ */}
      <section
        id="chapter-x"
        data-chapter="X"
        className={`${s.split} ${s.bgCream} ${s.splitLeft}`}
      >
        <ArtworkReveal className={s.splitCopy}>
          <div className={s.splitCopyInner}>
            <p className={s.kicker}>{CHAPTERS[9].kicker}</p>
            <p className={s.chapterRoman}>Chapter {CHAPTERS[9].roman}</p>
            <h2 className={s.headline}>{CHAPTERS[9].headline}</h2>
            {CHAPTERS[9].body.map((p, i) => (
              <p key={i} className={s.body}>
                {p}
              </p>
            ))}
          </div>
        </ArtworkReveal>
        <div className={s.splitVisual}>
          <Image
            src={`${ART}/fleet-vans-row.png`}
            alt="The Willow Alexander electric fleet — a row of liveried vans, each carrying its volume's colour"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CLOSING — colophon statement + CTAs (text-led, no slide)
          ════════════════════════════════════════════════════════════ */}
      <section className={s.closingText}>
        <ArtworkReveal className={s.closingTextInner}>
          <p className={s.closingKicker}>The House of Willow Alexander</p>
          <p className={s.closingStatement}>
            A modern British institution built on{" "}
            <em>design, story, care</em>
            <br />
            and the extraordinary beauty of home.
          </p>
          <div className={s.closingCtas}>
            <Link href="/the-house/philosophy" className={s.btnFilled}>
              Read our philosophy
            </Link>
            <Link href="/the-house" className={s.btnGhostLight}>
              Back to The House
              <span aria-hidden="true" className={s.btnArrow}>
                →
              </span>
            </Link>
          </div>
        </ArtworkReveal>
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
   Section primitives — all text-first, supporting images optional
   ──────────────────────────────────────────────────────────────────── */

function ChapterCopy({
  chapter,
  bg = "cream",
  first = false,
  children,
}: {
  chapter: Chapter;
  bg?: "cream" | "cream-dark";
  first?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={`chapter-${chapter.roman.toLowerCase()}`}
      data-chapter={chapter.roman}
      className={`${s.copySection} ${bg === "cream" ? s.bgCream : s.bgCreamDark} ${first ? s.copySectionFirst : ""}`}
    >
      <ArtworkReveal className={s.copySectionInner}>
        <p className={s.kicker}>{chapter.kicker}</p>
        <p className={s.chapterRoman}>Chapter {chapter.roman}</p>
        <h2 className={s.headline}>{chapter.headline}</h2>
        {chapter.body.map((p, i) => (
          <p key={i} className={s.body}>
            {p}
          </p>
        ))}
        {children}
      </ArtworkReveal>
    </section>
  );
}

function PullQuote({ quote, dark = false }: { quote: string; dark?: boolean }) {
  return (
    <section className={`${s.pullQuote} ${dark ? s.pullQuoteDark : ""}`}>
      <ArtworkReveal className={s.pullQuoteInner}>
        <p className={s.pullQuoteText}>
          {"“"}
          {quote}
          {"”"}
        </p>
        <div className={s.pullQuoteRule} aria-hidden="true" />
      </ArtworkReveal>
    </section>
  );
}

/**
 * Pattern reveal — paired close-up of the Beeton spread's pattern detail
 * and the resulting Willow Alexander pattern (gold on green). Sits between
 * Chapter III split and the pull quote.
 */
function PatternReveal() {
  return (
    <section className={`${s.patternReveal} ${s.bgCream}`}>
      <ArtworkReveal className={s.patternRevealInner}>
        <figure className={s.patternRevealItem}>
          <Image
            src={`${ART}/mrs-beeton-spread-firstpattern.jpg`}
            alt="A close detail of the pattern as it appears in Mrs Beeton's book"
            width={1600}
            height={1200}
            sizes="(min-width: 768px) 45vw, 90vw"
            className={s.patternRevealImg}
          />
          <figcaption className={s.patternRevealCap}>
            <span className={s.patternRevealNum}>01</span>
            The source — Beeton's engraved botanical frame.
          </figcaption>
        </figure>
        <figure className={s.patternRevealItem}>
          <Image
            src={`${ART}/pattern-master-gold-on-green.webp`}
            alt="The first Willow Alexander pattern — gold floral linework on deep green"
            width={1600}
            height={1200}
            sizes="(min-width: 768px) 45vw, 90vw"
            className={s.patternRevealImg}
          />
          <figcaption className={s.patternRevealCap}>
            <span className={s.patternRevealNum}>02</span>
            The pattern — gold on heritage green, our first.
          </figcaption>
        </figure>
      </ArtworkReveal>
    </section>
  );
}

/**
 * Palette shift — a small CSS-only row of swatches that visualises the
 * brand's move from "green + ornate" → "cream + gold + restraint" during
 * Chapter V. Reads as a colour timeline.
 */
function PaletteShift() {
  return (
    <div className={s.paletteShift} aria-label="Palette evolution: green era → cream and gold era">
      <span className={`${s.swatch} ${s.swatchGreen}`} aria-label="Heritage green" />
      <span className={`${s.swatch} ${s.swatchGoldOnGreen}`} aria-label="Gold on green" />
      <span className={s.swatchArrow} aria-hidden="true">→</span>
      <span className={`${s.swatch} ${s.swatchCream}`} aria-label="Editorial cream" />
      <span className={`${s.swatch} ${s.swatchGold}`} aria-label="House gold" />
      <span className={`${s.swatch} ${s.swatchBrown}`} aria-label="Ink brown" />
    </div>
  );
}
