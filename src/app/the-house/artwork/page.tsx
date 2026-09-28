import Image from "next/image";
import Link from "next/link";
import { ArtworkProgressRail } from "@/components/marketing/the-house/ArtworkProgressRail";
import { ArtworkVolumesShelf } from "@/components/marketing/the-house/ArtworkVolumesShelf";
import { ArtworkReveal } from "@/components/marketing/the-house/ArtworkReveal";
import s from "./artwork.module.css";
import { getArtworkPage } from "@/lib/cms/artwork";

/**
 * /the-house/artwork — The Artwork of the House.
 *
 * "Atmospheric" direction (approved 2026-09-25, Mockup 3): a cinematic scroll —
 * an immersive green + pattern hero, calm cream reading blocks with ghosted
 * Didot numerals, full-bleed image/pattern interludes, deep-green colour beats.
 * The coloured-volumes shelf and the ecosystem stay as the original
 * interactive, animated, clickable components. Content-first: every chapter is
 * readable with JS off; ArtworkReveal only enhances.
 *
 * Copy unchanged. Source words: THE ARTWORK OF THE HOUSE.pdf, Samuel Collett.
 * Chapter text / hero / closing may be overridden via Sanity (getArtworkPage).
 */

export const metadata = {
  alternates: { canonical: "/the-house/artwork" },
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
      "Willow, inspired by Samuel's mother's favourite tree. A symbol of resilience, softness, and quiet magic. A tree that bends but never breaks. Alexander, the name of the co-founder. Steady, classical, architectural. The grounding note that anchors the lyricism of the willow.",
      "Together, they form a name with its own mythology, a name that sounds as though it has lived on bookshelves and brass plaques for generations.",
    ],
    pullQuote: "A name planted like a tree. A House rooted in meaning.",
  },
  {
    roman: "II",
    kicker: "The birthplace",
    headline: "A garden studio, and a little magic.",
    body: [
      "The brand began as a garden design studio, its creative cradle. Two artefacts lit the spark: a vintage copy of The Wizard of Oz, with typography that danced between fantasy and serif authority, and an antique gardening encyclopaedia, bound in deep green and black.",
      "From these came our first palette: heritage green, grounded in nature, paired with a thread of gold, a subtle spark of magic. Earthy, enchanting, quietly theatrical.",
    ],
  },
  {
    roman: "III",
    kicker: "The Victorian discovery",
    headline: "Mrs Beeton, and the first pattern.",
    body: [
      "Studying British design history, Samuel encountered the ornate world of Mrs Beeton, the Victorian matriarch of British domestic culture. Her books were more than manuals; they were artworks. Engraved botanical frames, decorative florals, meticulous linework.",
      "From these illustrations came the first Willow Alexander pattern: a continuous hand-drawn floral tapestry, originally rendered in gold on deep green. The pattern connected horticultural expertise to domestic authority, garden and home united under a single illustrated canopy.",
    ],
    pullQuote: "Not in trend, but in tradition. Not in decoration, but in cultural lineage.",
  },
  {
    roman: "IV",
    kicker: "The coloured volumes",
    headline: "A library that became a fleet.",
    body: [
      "Mrs Beeton's books came in coloured editions. Greens. Blues. Burgundies. Teals. Auburns. Magentas. A row of them looked like the rainbow of British housekeeping, each spine a different discipline of domestic life.",
      "Years later, those colours resurfaced as the perfect design system. Each Willow Alexander service became its own volume in the library of the House, wrapped in the same white floral pattern, transformed into a moving anthology of expertise.",
    ],
    pullQuote:
      "This is not a rainbow. It is a system, a coded, crafted chromatic identity rooted in British publishing history.",
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
      "For the institution: gold or white linework, used sparingly, as a frame, a border, a whisper, the visual equivalent of a monogram. For the service brands: white pattern set boldly over their Beeton-inspired colourways, a visual genealogy linking each discipline back to the House. For editorial and the marketplace: the pattern deepens, softens, expands; becomes atmosphere, textile, mood.",
      "The pattern does what the House does. It unites many worlds with quiet authority.",
    ],
  },
  {
    roman: "VII",
    kicker: "The early icons",
    headline: "A human hand in the margins.",
    body: [
      "In the early years, a family of hand-drawn icons appeared across the brand, sketches inspired by the doodles and recipe notes a mother might scribble in the margins of her favourite cookbook. They expressed warmth, familiarity, the human hand behind the services.",
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
      "The artwork of the House, its colours, its patterns, its names, its stories, is a reminder that design matters because life matters. That what we touch daily should be crafted with intention.",
    ],
    pullQuote: "Beauty is not excess. It is an act of stewardship.",
  },
  {
    roman: "X",
    kicker: "A living story",
    headline: "Rooted in the past. Growing into the future.",
    body: [
      "The artwork of the House is not finished. It evolves with every new service, every new product, every new idea. But its foundation is set: a name planted like a tree, a palette lifted from literature, a pattern drawn from Victorian craft, a fleet inspired by British domestic history. A brand that feels discovered, not invented.",
    ],
  },
];

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

// The ecosystem (Ch VIII) — institution centre + five clickable nodes.
const ECOSYSTEM_CENTRE = {
  name: "House of Willow Alexander",
  description: "The institution. The editorial centre. The mother brand.",
};
const ECOSYSTEM_NODES: Array<{ name: string; description: string; href: string }> = [
  { name: "The Service Brands", description: "The coloured volumes. Specialist, bold, unmistakable.", href: "/services" },
  { name: "Home & Garden", description: "The marketplace, the lifestyle universe, the curated home.", href: "/shop" },
  { name: "The Hearth", description: "Lifestyle magazine. Where the pattern becomes atmosphere.", href: "/the-hearth" },
  { name: "HoWA & HoWA+", description: "The modern intelligence of the House. Luminous, instrument-like.", href: "/howa" },
];

export default async function ArtworkPage() {
  const cmsPage = await getArtworkPage();
  const chapters: Chapter[] = CHAPTERS.map((base, i) => {
    const c = cmsPage?.chapters?.[i];
    if (!c) return base;
    return {
      roman: (c.roman as Chapter["roman"]) ?? base.roman,
      kicker: c.kicker ?? base.kicker,
      headline: c.headline ?? base.headline,
      body: c.body && c.body.length ? c.body : base.body,
      pullQuote: c.pullQuote ?? base.pullQuote,
    };
  });

  const heroEyebrow = cmsPage?.heroEyebrow ?? "House of Willow Alexander · An origin story";
  const heroTitle = cmsPage?.heroTitle ?? "The Artwork";
  const heroTitleEm = cmsPage?.heroTitleEm ?? "of the House.";
  const heroLede =
    cmsPage?.heroLede ??
    "A design-led story of heritage, craft, colour, and British domestic beauty. How the House of Willow Alexander was cultivated, not branded.";
  const heroScrollCue = cmsPage?.heroScrollCue ?? "↓ ten chapters";

  return (
    <div className={s.page}>
      <ArtworkProgressRail />

      {/* HERO — immersive green + pattern */}
      <section className={s.heroText}>
        <div className={s.heroTexture} aria-hidden="true" />
        <ArtworkReveal className={s.heroInner}>
          <p className={s.heroEyebrow}>{heroEyebrow}</p>
          <h1 className={s.heroTitle}>
            {heroTitle} <em>{heroTitleEm}</em>
          </h1>
          <p className={s.heroLede}>{heroLede}</p>
          <p className={s.heroScrollCue}>{heroScrollCue}</p>
        </ArtworkReveal>
      </section>

      {/* I — text, drop cap, pull quote */}
      <ChapterText chapter={chapters[0]} dropcap />

      {/* II — text + image pair */}
      <ChapterText chapter={chapters[1]}>
        <div className={s.pair}>
          <Figure src={`${ART}/wizard-of-oz.jpg`} alt="A vintage edition of The Wizard of Oz" num="01" caption="Fantasy meeting serif authority." />
          <Figure src={`${ART}/gardening-encyclopaedia.jpg`} alt="An antique British gardening encyclopaedia, bound in deep green and black" num="02" caption="Deep green and black." />
        </div>
      </ChapterText>

      {/* III — text + source/pattern pair + pull quote */}
      <ChapterText chapter={chapters[2]}>
        <div className={s.pair}>
          <Figure src={`${ART}/mrs-beeton-spread.jpg`} alt="An open spread from Mrs Beeton's Book of Household Management, showing the engraved botanical frames" num="01" caption="The source, Beeton's engraved botanical frame." />
          <Figure src={`${ART}/pattern-master-gold-on-green.webp`} alt="The first Willow Alexander pattern, gold floral linework on deep green" num="02" caption="The pattern, gold on heritage green, our first." />
        </div>
      </ChapterText>

      {/* IV — text intro + the original coloured-volumes shelf (big, interactive) + pull quote */}
      <ChapterText chapter={chapters[3]} pullAfter />
      <ArtworkVolumesShelf />
      <PullBeat quote={chapters[3].pullQuote!} />

      {/* V — text + palette evolution (green era → cream + gold) */}
      <ChapterText chapter={chapters[4]}>
        <div className={s.paletteShift} aria-label="Palette evolution: green and ornate era to cream and gold era">
          <span className={`${s.swatch} ${s.swatchGreen}`} aria-label="Heritage green" />
          <span className={`${s.swatch} ${s.swatchGoldOnGreen}`} aria-label="Gold on green" />
          <span className={s.swatchArrow} aria-hidden="true">→</span>
          <span className={`${s.swatch} ${s.swatchCream}`} aria-label="Editorial cream" />
          <span className={`${s.swatch} ${s.swatchGold}`} aria-label="House gold" />
          <span className={`${s.swatch} ${s.swatchBrown}`} aria-label="Ink brown" />
        </div>
      </ChapterText>

      {/* VI — text + full-bleed pattern band */}
      <ChapterText chapter={chapters[5]} />
      <div className={s.patternBand} aria-hidden="true" />

      {/* VII — text + icon grid */}
      <ChapterText chapter={chapters[6]}>
        <div className={s.iconGrid}>
          {EARLY_ICONS.map(({ file, label }) => (
            <div key={file} className={s.iconCell}>
              <Image src={`${ART}/icons/${file}.svg`} alt={label} width={64} height={64} className={s.iconImg} />
              <p className={s.iconLabel}>{label}</p>
            </div>
          ))}
        </div>
      </ChapterText>

      {/* VIII — the ecosystem, as an ink section with clickable nodes */}
      <section className={s.eco} id="chapter-viii" data-chapter="VIII" data-tone="dark">
        <ArtworkReveal className={s.ecoInner}>
          <p className={s.ecoKicker}>Chapter VIII · {chapters[7].kicker}</p>
          <h2 className={s.ecoHeadline}>{chapters[7].headline}</h2>
          {chapters[7].body.map((p, i) => (
            <p key={i} className={s.ecoIntro}>{p}</p>
          ))}
          <div className={s.ecoCentre}>
            <p className={s.ecoNodeName}>{ECOSYSTEM_CENTRE.name}</p>
            <p className={s.ecoNodeDesc}>{ECOSYSTEM_CENTRE.description}</p>
          </div>
          <ul className={s.ecoNodes}>
            {ECOSYSTEM_NODES.map((n) => (
              <li key={n.name}>
                <Link href={n.href} className={s.ecoNode}>
                  <span className={s.ecoNodeName}>{n.name}</span>
                  <span className={s.ecoNodeDesc}>{n.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </ArtworkReveal>
      </section>

      {/* IX — philosophy, text + pull quote */}
      <ChapterText chapter={chapters[8]} />

      {/* X — text + full-bleed fleet interlude (whole image on mobile) */}
      <ChapterText chapter={chapters[9]} />
      <figure className={s.interlude}>
        <Image
          src={`${ART}/fleet-vans-row.webp`}
          alt="The Willow Alexander electric fleet, a row of liveried vans, each carrying its volume's colour"
          width={2400}
          height={900}
          sizes="100vw"
          className={s.interludeImg}
        />
        <div className={s.interludeVeil} aria-hidden="true" />
        <figcaption className={s.interludeCap}>The fleet, each van a volume in the moving library.</figcaption>
      </figure>

      {/* CLOSING — deep green */}
      <section className={s.closingText} data-tone="dark">
        <ArtworkReveal>
          <p className={s.closingKicker}>{cmsPage?.closingKicker ?? "The House of Willow Alexander"}</p>
          <p className={s.closingStatement}>
            {cmsPage?.closingStatement ? (
              cmsPage.closingStatementEm ? (
                <>
                  {cmsPage.closingStatement.split(cmsPage.closingStatementEm)[0]}
                  <em>{cmsPage.closingStatementEm}</em>
                  {cmsPage.closingStatement.split(cmsPage.closingStatementEm)[1] ?? ""}
                </>
              ) : (
                cmsPage.closingStatement
              )
            ) : (
              <>
                A modern British institution built on <em>design, story, care</em> and the
                extraordinary beauty of home.
              </>
            )}
          </p>
          <div className={s.closingCtas}>
            <Link href={cmsPage?.closingCtaPrimaryHref ?? "/the-house/about"} className={s.btnFilled}>
              {cmsPage?.closingCtaPrimary ?? "Read our story"}
            </Link>
            <Link href={cmsPage?.closingCtaSecondaryHref ?? "/the-house"} className={s.btnGhostLight}>
              {cmsPage?.closingCtaSecondary ?? "Back to The House"}
              <span aria-hidden="true" className={s.btnArrow}>→</span>
            </Link>
          </div>
        </ArtworkReveal>
      </section>

      <div className={s.tagline} data-tone="dark">
        <p>
          {cmsPage?.tagline ? (
            cmsPage.taglineEm ? (
              <>
                {cmsPage.tagline.split(cmsPage.taglineEm)[0]}
                <em>{cmsPage.taglineEm}</em>
                {cmsPage.tagline.split(cmsPage.taglineEm)[1] ?? ""}
              </>
            ) : (
              cmsPage.tagline
            )
          ) : (
            <>
              Ownership is passive. <em>Stewardship is intentional.</em>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* ── Chapter reading block (ghost numeral via data-chapter, animated) ──────── */
function ChapterText({
  chapter,
  dropcap = false,
  pullAfter = false,
  children,
}: {
  chapter: Chapter;
  dropcap?: boolean;
  pullAfter?: boolean; // pull quote is rendered separately after a following component
  children?: React.ReactNode;
}) {
  return (
    <section
      id={`chapter-${chapter.roman.toLowerCase()}`}
      data-chapter={chapter.roman}
      className={`${s.chapter} ${dropcap ? s.dropcap : ""}`}
    >
      <ArtworkReveal className={s.chapterInner}>
        <p className={s.kicker}>{chapter.kicker}</p>
        <p className={s.chapterRoman}>Chapter {chapter.roman}</p>
        <h2 className={s.headline}>{chapter.headline}</h2>
        {chapter.body.map((p, i) => (
          <p key={i} className={s.body}>
            {p}
          </p>
        ))}
        {children}
        {chapter.pullQuote && !pullAfter ? <Pull quote={chapter.pullQuote} /> : null}
      </ArtworkReveal>
    </section>
  );
}

function Pull({ quote }: { quote: string }) {
  return (
    <div className={s.pullQuote}>
      <div className={s.pullQuoteRule} aria-hidden="true" />
      <p className={s.pullQuoteText}>&ldquo;{quote}&rdquo;</p>
    </div>
  );
}

// A pull quote that stands as its own beat (used after the volumes shelf).
function PullBeat({ quote }: { quote: string }) {
  return (
    <section className={s.chapter}>
      <ArtworkReveal className={s.chapterInner}>
        <Pull quote={quote} />
      </ArtworkReveal>
    </section>
  );
}

function Figure({ src, alt, num, caption }: { src: string; alt: string; num: string; caption: string }) {
  return (
    <figure className={s.pairFig}>
      <div className={s.pairFrame}>
        <Image src={src} alt={alt} fill sizes="(min-width:768px) 360px, 45vw" />
      </div>
      <figcaption className={s.cap}>
        <span className={s.capNum}>{num}</span>
        {caption}
      </figcaption>
    </figure>
  );
}
