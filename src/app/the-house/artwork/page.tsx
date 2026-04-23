import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";

/**
 * /the-house/artwork — The Artwork of the House.
 *
 * Diptyque-style storytelling page: alternating full-width photography
 * bands and clean centred text chapters. Lots of breathing room.
 * Minimal UI, maximum editorial weight.
 *
 * 10 chapters tracing the brand's visual identity from the origin of
 * the name through Victorian craft to the modern ecosystem.
 */

export const metadata = {
  title: "The Artwork of the House",
  description:
    "A design-led story of heritage, craft, colour, and British domestic beauty. How the House of Willow Alexander was cultivated, not branded.",
};

const CHAPTERS = [
  {
    eyebrow: "I",
    headline: "A name chosen like a dedication.",
    body: [
      "Willow Alexander is a name with lineage. Willow — inspired by Samuel's mother's favourite tree: resilient, graceful, quietly magical. Alexander — the name of the co-founder: steady, classical, grounding.",
      "Together, they form a name that feels as though it belongs on the spine of an heirloom book — familiar, elegant, and touched with mystery. A name planted like a tree. A House rooted in meaning.",
    ],
  },
  {
    eyebrow: "II",
    headline: "Where the House first took shape.",
    body: [
      "The brand began as a garden design studio — the birthplace of its creative language. Two vintage books guided its earliest aesthetic: a Wizard of Oz edition with its cinematic serif typography — and an antique gardening encyclopaedia bound in deep forest green.",
      "From these came our first palette: heritage green, grounded in nature, paired with a thread of gold — a subtle spark of magic. This became the tone of our origin: earthy, enchanting, and quietly theatrical.",
    ],
  },
  {
    eyebrow: "III",
    headline: "The Victorian discovery.",
    body: [
      "In studying British design history, Samuel encountered the ornate botanical engravings that adorned the early works of Mrs Beeton — the Victorian authority on domestic life.",
      "Her books weren't simply household guides. They were artworks. Floral borders, engraved botanicals, decorative frames — the visual poetry of domestic Britain.",
      "From these engravings came the first Willow Alexander pattern: a continuous hand-drawn floral tapestry, designed to feel lifted from the inside cover of a treasured household volume. Originally drawn in gold on deep green, it became the visual soul of the brand.",
    ],
  },
  {
    eyebrow: "IV",
    headline: "The library that shaped our chromatic identity.",
    body: [
      "Mrs Beeton's works came in a spectrum of rich, jewel-toned editions — greens, blues, burgundies, aubergines, teals, magentas.",
      "Years later, these colours became the blueprint for the Willow Alexander service brands. Each discipline was given its own hue: a \"volume\" in the library of the House.",
      "Gardeners Green. Cleaners Blue. Handyman Burgundy. Window Cleaners Aubergine. Dog Walkers Teal. Removals Magenta. Home & Garden Gold.",
      "Together, they form a chromatic system that mirrors the spines of a Victorian cookbook collection — a moving library of expertise wrapped around our electric fleet. Each colour stands with confidence in its sector. Each belongs unmistakably to the same House.",
    ],
  },
  {
    eyebrow: "V",
    headline: "When a studio became an institution.",
    body: [
      "As the brand grew, the name Willow Alexander began to behave like a House — not a company. The service brands became \"the children\". Design required a new level of maturity: calmer, more architectural, more editorial.",
      "Gold stepped forward as the colour of the institution. Cream became the new canvas. The floral pattern softened into a quiet, confident presence — supporting the House with grace rather than noise.",
      "This marked the beginning of the House as a cultural identity — timeless, warm, and unmistakably British.",
    ],
  },
  {
    eyebrow: "VI",
    headline: "The House's modern insignia.",
    body: [
      "The floral pattern has evolved into a signature used with restraint and reverence:",
      "For The House: gold or white linework on cream — elegant, institutional, timeless. For The Services: white pattern on heritage colourways — a unifying visual thread. For Editorial & Marketplace: pattern as atmosphere — expressive, textured, seasonal.",
      "The pattern behaves like our House itself: calm, crafted, confident.",
    ],
  },
  {
    eyebrow: "VII",
    headline: "The hand-drawn notes that shaped our early charm.",
    body: [
      "In the early days, the brand included small, hand-drawn icons inspired by the doodles found in mothers' cookbooks — warm, human, imperfect in the most perfect way.",
      "As the House matured into its institutional form, these icons stepped back into the archive. Their spirit, however, remains in our tone: observant, gentle, and quietly humorous.",
    ],
  },
  {
    eyebrow: "VIII",
    headline: "A living, design-led universe.",
    body: [
      "The House now spans an entire ecosystem: The House of Willow Alexander — our cultural core, the institution. Home & Garden — our editorial, marketplace, and product world. The Service Brands — each specialist discipline, tied by colour and pattern. HoWA & HoWA+ — our digital intelligence, modern stewardship. The Hearth — our lifestyle magazine and narrative voice.",
      "Everything is connected through: name, colour, pattern, story. Nothing stands alone. Everything belongs.",
    ],
  },
  {
    eyebrow: "IX",
    headline: "Beauty as responsibility.",
    body: [
      "The artwork of the House reflects what we believe: that home and garden care is a form of stewardship. That design elevates the rituals of daily life. That heritage guides us, not as nostalgia, but as a compass. That sustainability is best expressed through beauty, not sacrifice.",
      "This philosophy informs everything — from vans to packaging, from pattern to palette, from products to technology.",
    ],
  },
  {
    eyebrow: "X",
    headline: "Rooted in the past. Growing into the future.",
    body: [
      "The artwork of the House is not a static identity. It is a living, breathing expression of who we are — a name planted like a tree, a palette lifted from literature, a pattern drawn from Victorian craft, and a brand built to honour the beauty of home.",
      "This is the House of Willow Alexander — a modern British institution shaped by design, story, and care.",
    ],
  },
];

const SANITY_CDN = "https://cdn.sanity.io/images/a9t8u8nh/production";

/* Images to interleave between chapters — real artwork story imagery from Sanity */
const INTERSTITIALS: Array<{ src: string; alt: string; after: number; tall?: boolean }> = [
  { src: `${SANITY_CDN}/d31ebce3e8b950bb3eb53aea6a40514f23223d11-2560x1250.jpg?w=1920&auto=format`, alt: "The Artwork of the House — brand story banner", after: 0 },
  { src: `${SANITY_CDN}/c77dcad87958e9729be47fd8c68550391af1d9ca-2560x1170.jpg?w=1920&auto=format`, alt: "Gold floral pattern on heritage green — the original palette", after: 2 },
  { src: `${SANITY_CDN}/f05b87579c19e7ab704b5c81c22c956df9ecef4f-2560x1810.jpg?w=1920&auto=format`, alt: "The chromatic service brand system — coloured volumes", after: 3, tall: true },
  { src: `${SANITY_CDN}/b5528047aa06e11e69cb45048193d2fb2b82c742-3097x614.png?w=1920&auto=format`, alt: "The branded electric fleet — a moving library of expertise", after: 4 },
  { src: `${SANITY_CDN}/18c9c9c68b82697b3a4c73a8d20c1a762c435ff5-2640x1073.png?w=1400&auto=format`, alt: "Hand-drawn icons from the early brand archive", after: 6 },
];

export default function ArtworkPage() {
  return (
    <article>
      {/* Hero — full-bleed, pattern-backed */}
      <section className="relative bg-house-brown text-house-cream overflow-hidden">
        {/* Floral pattern — the star of this page */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: "url(/hearth/pattern-gold.png)",
            backgroundSize: "600px",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[720px] mx-auto px-[5vw] py-[18vh] text-center">
          <span className="block mb-6 font-sans text-[11px] tracking-[0.3em] uppercase text-house-gold-light">
            The House of Willow Alexander
          </span>
          <h1
            className="font-display font-medium leading-[1.04] tracking-[-0.015em] text-house-cream mb-8"
            style={{ fontSize: "clamp(44px, 6vw, 72px)" }}
          >
            The Artwork of the House
          </h1>
          <p className="font-display italic text-[clamp(18px,2.2vw,24px)] leading-[1.5] text-house-cream/80 mb-6">
            A design-led story of heritage, craft, colour, and British domestic beauty.
          </p>
          <div className="w-16 h-px mx-auto bg-house-gold-light/50" />
          <p className="font-sans text-[15px] leading-[1.7] text-house-cream/65 mt-8 max-w-[52ch] mx-auto">
            The House of Willow Alexander was not branded — it was cultivated.
            Rooted in family, shaped by literature, inspired by botanical craft,
            and carried through colour, pattern, and story.
          </p>
        </div>
      </section>

      {/* Chapters */}
      {CHAPTERS.map((ch, i) => {
        const interstitial = INTERSTITIALS.find((img) => img.after === i);
        const isEven = i % 2 === 0;

        return (
          <div key={ch.eyebrow}>
            {/* Chapter text */}
            <section className={`px-[5vw] ${i === 0 ? "pt-24" : "pt-20"} pb-20 ${isEven ? "bg-house-cream" : "bg-house-white"}`}>
              <div className="max-w-[640px] mx-auto text-center">
                <span
                  className="block mb-5 font-display italic text-[18px] tracking-[0.08em]"
                  style={{ color: "var(--house-gold-dark)" }}
                >
                  {ch.eyebrow}.
                </span>
                <h2 className="font-display font-medium text-[clamp(28px,4vw,42px)] leading-[1.15] tracking-[-0.01em] text-house-brown mb-8">
                  {ch.headline}
                </h2>
                <div className="space-y-5">
                  {ch.body.map((para, j) => (
                    <p
                      key={j}
                      className="font-sans text-[16px] leading-[1.75] text-house-brown/70 text-left"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* Inline images for specific chapters */}
            {i === 1 && (
              <section className="bg-house-white px-[5vw] pb-16">
                <div className="max-w-[640px] mx-auto flex justify-center gap-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${SANITY_CDN}/4c6cfdbbe484f355b68ebd4a120eb9034ef04518-400x450.png?w=280&auto=format`}
                    alt="Vintage Wizard of Oz edition — the cinematic serif typography"
                    className="w-[140px] md:w-[200px] h-auto object-contain"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${SANITY_CDN}/f238fa44082cc5eafbe4e9bfec53b42e4aa34333-364x450.jpg?w=280&auto=format`}
                    alt="Antique gardening encyclopaedia bound in deep forest green"
                    className="w-[140px] md:w-[200px] h-auto object-contain"
                  />
                </div>
              </section>
            )}

            {/* Mrs Beeton inline image */}
            {i === 2 && (
              <section className="bg-house-cream px-[5vw] pb-16">
                <div className="max-w-[640px] mx-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${SANITY_CDN}/c76290041aa8a032b57b14cd8bba1a58d5195c32-1024x851.jpg?w=640&auto=format`}
                    alt="Mrs Beeton's botanical engravings — the visual poetry of domestic Britain"
                    className="w-full h-auto"
                  />
                </div>
              </section>
            )}

            {/* Full-bleed image interstitial (if one follows this chapter) */}
            {interstitial && (
              <section className={`relative ${interstitial.tall ? "h-[55vh] md:h-[70vh]" : "h-[40vh] md:h-[50vh]"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={interstitial.src}
                  alt={interstitial.alt}
                  className="w-full h-full object-cover object-center"
                />
              </section>
            )}
          </div>
        );
      })}

      {/* Closing — pattern band */}
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
        <div className="relative z-10 max-w-[600px] mx-auto px-[5vw] py-24 text-center">
          <p className="font-display italic text-[clamp(22px,3vw,30px)] leading-[1.4] text-house-cream mb-8">
            This is the House of Willow Alexander — a modern British institution
            shaped by design, story, and care.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/the-house/philosophy"
              className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/40 px-6 py-3 no-underline transition-all duration-[var(--t-base)] hover:bg-house-cream hover:text-house-brown"
            >
              Read our philosophy
            </Link>
            <Link
              href="/the-house"
              className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream/60 border border-house-cream/20 px-6 py-3 no-underline transition-all duration-[var(--t-base)] hover:bg-house-cream hover:text-house-brown"
            >
              Back to The House
            </Link>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <div className="text-center border-t border-house-brown/8 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-brown/50 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}
