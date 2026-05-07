import Link from "next/link";
import { getPageSections, cms } from "@/lib/cms/page-sections";
import { ArtworkProgressRail } from "@/components/marketing/the-house/ArtworkProgressRail";
import { ArtworkVolumesShelf } from "@/components/marketing/the-house/ArtworkVolumesShelf";
import { ArtworkEcosystem } from "@/components/marketing/the-house/ArtworkEcosystem";
import { ArtworkReveal } from "@/components/marketing/the-house/ArtworkReveal";

/**
 * /the-house/artwork — The Artwork of the House.
 *
 * An interactive editorial journey through the brand's origin story
 * (10 chapters). The reader scrolls; a sticky right-rail tracks where
 * they are, the chapters fade in as they arrive, the coloured volumes
 * become an interactive shelf, the ecosystem becomes a tappable diagram.
 *
 * Source of the words: THE ARTWORK OF THE HOUSE.pdf (House Brand docs).
 */

export const metadata = {
  title: "The Artwork of the House",
  description:
    "A design-led story of heritage, craft, colour, and British domestic beauty. How the House of Willow Alexander was cultivated, not branded.",
};

const SANITY_CDN = "https://cdn.sanity.io/images/a9t8u8nh/production";

type Chapter = {
  roman: "I" | "II" | "III" | "IV" | "V" | "VI" | "VII" | "VIII" | "IX" | "X";
  kicker: string;
  headline: string;
  body: string[];
  /** Pull-quote that sits AFTER this chapter, before the next. */
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
  const s = (name: string) => sections.get(name);

  return (
    <article className="bg-house-cream">
      {/* Sticky chapter rail + top progress bar */}
      <ArtworkProgressRail />

      {/* ---------- Hero ---------- */}
      <section className="relative bg-house-brown text-house-cream overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: "url(/hearth/pattern-gold.png)",
            backgroundSize: "600px",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[760px] mx-auto px-[5vw] py-[18vh] text-center">
          <span className="block mb-6 font-sans text-[11px] tracking-[0.3em] uppercase text-house-gold-light">
            The House of Willow Alexander
          </span>
          <h1
            className="font-display font-medium leading-[1.04] tracking-[-0.015em] text-house-cream mb-8"
            style={{ fontSize: "clamp(44px, 6.6vw, 84px)" }}
          >
            {cms(s("hero"), "headline", "The Artwork of the House")}
          </h1>
          <p className="font-display italic text-[clamp(18px,2.2vw,24px)] leading-[1.5] text-house-cream/85 mb-7">
            A design-led story of heritage, craft, colour, and British domestic beauty.
          </p>
          <div className="w-16 h-px mx-auto bg-house-gold-light/50" />
          <p className="font-sans text-[15px] leading-[1.7] text-house-cream/65 mt-7 max-w-[54ch] mx-auto">
            {cms(s("hero"), "body", "The House was not branded — it was cultivated. Rooted in family, shaped by literature, inspired by botanical craft, and carried through colour, pattern and story. Scroll to begin.")}
          </p>
          <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-house-cream/45 mt-12">
            ↓ ten chapters
          </p>
        </div>
      </section>

      {/* ---------- Chapter I ---------- */}
      <ChapterText chapter={CHAPTERS[0]} bg="bg-house-cream" />
      <PullQuote quote={CHAPTERS[0].pullQuote!} />

      {/* ---------- Chapter II ---------- */}
      <ChapterText chapter={CHAPTERS[1]} bg="bg-house-white" />
      <BookDiptych />

      {/* ---------- Chapter III ---------- */}
      <ChapterText chapter={CHAPTERS[2]} bg="bg-house-cream" />
      <Interstitial
        src={`${SANITY_CDN}/c76290041aa8a032b57b14cd8bba1a58d5195c32-1024x851.jpg?w=1280&auto=format`}
        alt="Mrs Beeton's botanical engravings — the visual poetry of domestic Britain"
        height="contained"
      />
      <PullQuote quote={CHAPTERS[2].pullQuote!} />
      <Interstitial
        src={`${SANITY_CDN}/c77dcad87958e9729be47fd8c68550391af1d9ca-2560x1170.jpg?w=2400&auto=format`}
        alt="Gold floral pattern on heritage green — the original palette"
        height="full"
      />

      {/* ---------- Chapter IV — interactive shelf ---------- */}
      <ChapterText chapter={CHAPTERS[3]} bg="bg-house-cream" />
      <ArtworkVolumesShelf />
      <PullQuote quote={CHAPTERS[3].pullQuote!} dark />

      {/* ---------- Chapter V ---------- */}
      <ChapterText chapter={CHAPTERS[4]} bg="bg-house-white" />
      <Interstitial
        src={`${SANITY_CDN}/d31ebce3e8b950bb3eb53aea6a40514f23223d11-2560x1250.jpg?w=2400&auto=format`}
        alt="The Artwork of the House — institutional brand band"
        height="full"
      />

      {/* ---------- Chapter VI — pattern in three uses ---------- */}
      <ChapterText chapter={CHAPTERS[5]} bg="bg-house-cream" />
      <PatternThreeUses />

      {/* ---------- Chapter VII ---------- */}
      <ChapterText chapter={CHAPTERS[6]} bg="bg-house-white" />
      <Interstitial
        src={`${SANITY_CDN}/18c9c9c68b82697b3a4c73a8d20c1a762c435ff5-2640x1073.png?w=2400&auto=format`}
        alt="Hand-drawn icons from the early brand archive"
        height="contained"
      />

      {/* ---------- Chapter VIII — interactive ecosystem ---------- */}
      <ChapterText chapter={CHAPTERS[7]} bg="bg-house-cream" />
      <ArtworkEcosystem />

      {/* ---------- Chapter IX ---------- */}
      <ChapterText chapter={CHAPTERS[8]} bg="bg-house-white" />
      <PullQuote quote={CHAPTERS[8].pullQuote!} />

      {/* ---------- Chapter X — closing ---------- */}
      <ChapterText chapter={CHAPTERS[9]} bg="bg-house-cream" />

      {/* ---------- Closing band ---------- */}
      <section className="relative bg-house-brown text-house-cream overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage: "url(/hearth/pattern-gold.png)",
            backgroundSize: "700px",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[640px] mx-auto px-[5vw] py-28 text-center">
          <p className="font-display italic text-[clamp(22px,3vw,32px)] leading-[1.4] text-house-cream mb-10">
            This is the House of Willow Alexander — a modern British institution
            built on design, story, care, and the extraordinary beauty of home.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/the-house/philosophy"
              className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/40 px-7 py-3.5 no-underline transition-all duration-200 hover:bg-house-cream hover:text-house-brown"
            >
              Read our philosophy
            </Link>
            <Link
              href="/the-house"
              className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream/65 border border-house-cream/20 px-7 py-3.5 no-underline transition-all duration-200 hover:bg-house-cream hover:text-house-brown"
            >
              Back to The House
            </Link>
          </div>
        </div>
      </section>

      <div className="text-center border-t border-house-brown/8 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-brown/50 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}

/* ============================================================
   Section primitives — kept inline so the chapter flow stays readable
   ============================================================ */

function ChapterText({ chapter, bg }: { chapter: Chapter; bg: string }) {
  return (
    <section
      id={`chapter-${chapter.roman.toLowerCase()}`}
      data-chapter={chapter.roman}
      className={`px-[5vw] py-24 md:py-32 ${bg}`}
    >
      <ArtworkReveal className="max-w-[640px] mx-auto text-center">
        <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-house-gold-dark mb-4">
          {chapter.kicker}
        </p>
        <p className="font-display italic text-[14px] tracking-[0.05em] text-house-brown/45 mb-2">
          Chapter {chapter.roman}
        </p>
        <h2 className="font-display font-medium text-[clamp(28px,4vw,46px)] leading-[1.12] tracking-[-0.01em] text-house-brown mb-10">
          {chapter.headline}
        </h2>
        <div className="flex flex-col gap-5">
          {chapter.body.map((para, i) => (
            <p
              key={i}
              className="font-sans text-[16px] leading-[1.8] text-house-brown/78 text-left"
            >
              {para}
            </p>
          ))}
        </div>
      </ArtworkReveal>
    </section>
  );
}

function PullQuote({ quote, dark = false }: { quote: string; dark?: boolean }) {
  return (
    <section
      className={
        "relative px-[5vw] py-20 md:py-28 " +
        (dark ? "bg-house-brown text-house-cream" : "bg-house-cream-dark text-house-brown")
      }
    >
      {dark && (
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url(/hearth/pattern-gold.png)",
            backgroundSize: "500px",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
      )}
      <ArtworkReveal className="relative max-w-[820px] mx-auto text-center">
        <p
          className={
            "font-display italic text-[clamp(26px,3.6vw,42px)] leading-[1.3] tracking-[-0.005em] " +
            (dark ? "text-house-cream" : "text-house-brown")
          }
        >
          &ldquo;{quote}&rdquo;
        </p>
        <div
          className={
            "w-12 h-px mx-auto mt-8 " +
            (dark ? "bg-house-gold-light/60" : "bg-house-gold")
          }
        />
      </ArtworkReveal>
    </section>
  );
}

function Interstitial({
  src,
  alt,
  height = "full",
}: {
  src: string;
  alt: string;
  height?: "full" | "contained";
}) {
  if (height === "contained") {
    return (
      <section className="bg-house-cream px-[5vw] pb-12 -mt-8">
        <div className="max-w-[1080px] mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="w-full h-auto" />
        </div>
      </section>
    );
  }
  return (
    <section className="relative h-[50vh] md:h-[65vh] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-full object-cover object-center" />
    </section>
  );
}

function BookDiptych() {
  return (
    <section className="bg-house-white px-[5vw] pb-20">
      <ArtworkReveal className="max-w-[760px] mx-auto flex justify-center gap-10 md:gap-16 items-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${SANITY_CDN}/4c6cfdbbe484f355b68ebd4a120eb9034ef04518-400x450.png?w=320&auto=format`}
          alt="Vintage Wizard of Oz edition — the cinematic serif typography"
          className="w-[140px] md:w-[220px] h-auto object-contain shadow-[0_24px_36px_-18px_rgba(48,35,28,0.35)]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${SANITY_CDN}/f238fa44082cc5eafbe4e9bfec53b42e4aa34333-364x450.jpg?w=320&auto=format`}
          alt="Antique gardening encyclopaedia bound in deep forest green"
          className="w-[140px] md:w-[220px] h-auto object-contain shadow-[0_24px_36px_-18px_rgba(48,35,28,0.35)]"
        />
      </ArtworkReveal>
      <p className="text-center font-sans italic text-[13px] text-house-brown/55 mt-8">
        Two artefacts that lit the spark.
      </p>
    </section>
  );
}

/**
 * Three-panel composition showing how the floral pattern is used differently
 * across the institution / service brands / editorial. Static composition;
 * each panel is its own little colour story.
 */
function PatternThreeUses() {
  const PATTERN = "url(/hearth/pattern-gold.png)";
  const uses = [
    {
      label: "The Institution",
      role: "Cream + gold linework",
      copy: "Used sparingly. A frame, a border, a whisper. The visual equivalent of a monogram.",
      bg: "bg-house-cream",
      text: "text-house-brown",
      patternOpacity: 0.18,
      patternBlend: "multiply" as const,
    },
    {
      label: "The Service Brands",
      role: "White over heritage colour",
      copy: "Sitting boldly over each Beeton-inspired colourway. A visual genealogy linking each discipline to the House.",
      bg: "bg-[#3a4a35]",
      text: "text-white/95",
      patternOpacity: 0.22,
      patternBlend: "screen" as const,
    },
    {
      label: "The Hearth",
      role: "Atmosphere, textile, mood",
      copy: "Pattern deepens, softens, expands. Becomes the air of editorial — timeless, tactile, alive.",
      bg: "bg-[#5a2533]",
      text: "text-house-cream/95",
      patternOpacity: 0.18,
      patternBlend: "screen" as const,
    },
  ];

  return (
    <section className="bg-house-cream px-[5vw] py-20 md:py-24">
      <ArtworkReveal className="max-w-[1240px] mx-auto">
        <p className="text-center font-sans text-[10px] tracking-[0.32em] uppercase text-house-gold-dark mb-3">
          One pattern · three voices
        </p>
        <p className="text-center font-display italic text-[clamp(20px,2.4vw,28px)] leading-[1.4] text-house-brown/80 mb-12 max-w-[640px] mx-auto">
          The pattern does what the House does. It unites many worlds with quiet
          authority.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {uses.map((u) => (
            <div
              key={u.label}
              className={`relative aspect-[3/4] overflow-hidden border border-house-brown/10 ${u.bg} ${u.text}`}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: PATTERN,
                  backgroundSize: "320px",
                  backgroundPosition: "center",
                  opacity: u.patternOpacity,
                  mixBlendMode: u.patternBlend,
                }}
              />
              <div className="relative z-10 flex flex-col h-full p-8 lg:p-10">
                <p className="font-sans text-[10px] tracking-[0.32em] uppercase opacity-70 mb-4">
                  {u.role}
                </p>
                <p className="font-display italic text-[clamp(22px,2.4vw,28px)] leading-[1.2] mb-auto">
                  {u.label}.
                </p>
                <p className="font-sans text-[14px] leading-[1.65] opacity-85 mt-10 max-w-[28ch]">
                  {u.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ArtworkReveal>
    </section>
  );
}
