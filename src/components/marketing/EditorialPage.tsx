import Image from "next/image";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

/**
 * EditorialPage — shared template for long-form editorial pages under
 * /the-house, /legal, etc. Magazine layout: a reading column with House-style
 * figures set into a side column beside each section, alternating sides for
 * rhythm. Cream ground, Cormorant italic accents, Effra body.
 *
 * Body strings may contain line breaks — paragraphs split on `\n\n`. An
 * optional `heroImage` sits beside the lede; each section may carry its own
 * `image`. Pages with no images fall back to a clean single reading column.
 */

export interface EditorialImage {
  src: string;
  alt: string;
  /** "cover" (default) crops to the portrait frame; "contain" sits on cream (line art). */
  fit?: "cover" | "contain";
  /** Optional italic caption under the figure. */
  caption?: string;
}

export interface EditorialSection {
  heading?: string;
  /** Double-newline-separated paragraphs. */
  body: string;
  /** Optional pull quote rendered after the body. */
  quote?: { text: string; attribution?: string };
  /** Optional House-style figure set beside this section. */
  image?: EditorialImage;
}

export interface EditorialPageProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  sections: EditorialSection[];
  updatedAt?: string;
  /** Optional figure set beside the lede. */
  heroImage?: EditorialImage;
  /** Optional House floral watermark in the header (gold on the cream ground). */
  watermark?: "white" | "gold" | "black";
}

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: "clamp(26px, 2.8vw, 36px)",
  lineHeight: 1.2,
  color: "var(--color-house-brown)",
  margin: "0 0 24px",
  letterSpacing: "-0.01em",
};
const paraStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 17,
  lineHeight: 1.7,
  color: "rgba(48, 35, 28, 0.82)",
  margin: "0 0 18px",
};
const captionStyle: React.CSSProperties = {
  fontFamily: "var(--font-hearth-serif)",
  fontStyle: "italic",
  fontSize: 14,
  color: "rgba(48, 35, 28, 0.72)",
  margin: "12px 0 0",
};

function SectionText({ section }: { section: EditorialSection }) {
  return (
    <div>
      {section.heading ? <h2 style={headingStyle}>{section.heading}</h2> : null}
      {section.body.split("\n\n").map((p, j) => (
        <p key={j} style={paraStyle}>
          {p}
        </p>
      ))}
      {section.quote ? (
        <blockquote style={{ margin: "32px 0 0", paddingLeft: 28, borderLeft: "2px solid var(--color-house-gold)" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(20px, 2.2vw, 28px)",
              lineHeight: 1.4,
              color: "var(--color-house-brown)",
              margin: "0 0 12px",
              letterSpacing: "-0.005em",
            }}
          >
            &ldquo;{section.quote.text}&rdquo;
          </p>
          {section.quote.attribution ? (
            <cite
              style={{
                fontFamily: "var(--font-sans)",
                fontStyle: "normal",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(48, 35, 28, 0.72)",
                display: "block",
              }}
            >
              {section.quote.attribution}
            </cite>
          ) : null}
        </blockquote>
      ) : null}
    </div>
  );
}

function Figure({ image, priority }: { image: EditorialImage; priority?: boolean }) {
  return (
    <figure style={{ margin: 0 }}>
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4 / 5",
          background: image.fit === "contain" ? "var(--color-house-cream-dark)" : "transparent",
          border: "1px solid rgba(48, 35, 28, 0.1)",
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 42vw, 100vw"
          style={{ objectFit: image.fit === "contain" ? "contain" : "cover", objectPosition: "center" }}
        />
      </div>
      {image.caption ? <figcaption style={captionStyle}>{image.caption}</figcaption> : null}
    </figure>
  );
}

export function EditorialPage({ eyebrow, title, lede, sections, updatedAt, heroImage, watermark }: EditorialPageProps) {
  // Alternate which side each figure sits on. The lede figure (if any) takes
  // the first slot on the right; section figures zigzag from there.
  let imgSlot = heroImage ? 1 : 0;
  const sideForImage = () => {
    const left = imgSlot % 2 === 1;
    imgSlot += 1;
    return left;
  };

  return (
    <article style={{ background: "var(--color-house-cream)", color: "var(--color-house-brown)" }}>
      {/* Hero — eyebrow + large editorial title */}
      <header
        style={{
          padding: "clamp(80px, 12vh, 140px) clamp(40px, 5vw, 96px) clamp(36px, 4vw, 56px)",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--color-house-gold-ink)",
              margin: "0 0 24px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span aria-hidden="true" style={{ width: 36, height: 1, background: "var(--color-house-gold-dark)", opacity: 0.7 }} />
            {eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(44px, 5.4vw, 84px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--color-house-brown)",
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>
      </header>

      {/* Body — magazine column with side figures + House floral watermarks in the side gaps */}
      <div
        style={{ position: "relative", overflow: "hidden", maxWidth: 1140, margin: "0 auto", padding: "clamp(8px, 2vw, 24px) clamp(40px, 5vw, 96px) clamp(80px, 8vw, 128px)" }}
      >
        {/* A single faint House flower bled off the lower edge — texture, not a planted graphic. */}
        {watermark ? (
          <FlowerWatermark color={watermark} side="right" opacity={0.1} className="!top-auto bottom-[-14%] h-[58%]" />
        ) : null}
        <div className="space-y-[clamp(52px,6vw,92px)]" style={{ position: "relative", zIndex: 1 }}>
        {/* Lede, optionally beside the hero figure */}
        {lede || heroImage ? (
          heroImage ? (
            <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:gap-14">
              <div className="flex flex-col lg:self-stretch">
                <p
                  style={{
                    fontFamily: "var(--font-hearth-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2vw, 26px)",
                    lineHeight: 1.5,
                    color: "rgba(48, 35, 28, 0.82)",
                    margin: 0,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(48, 35, 28, 0.14)",
                  }}
                >
                  {lede}
                </p>
              </div>
              <Figure image={heroImage} priority />
            </div>
          ) : (
            <div className="flex items-center gap-10">
              <p
                style={{
                  fontFamily: "var(--font-hearth-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(20px, 2vw, 26px)",
                  lineHeight: 1.5,
                  color: "rgba(48, 35, 28, 0.82)",
                  margin: 0,
                  maxWidth: "52ch",
                  paddingTop: 24,
                  borderTop: "1px solid rgba(48, 35, 28, 0.14)",
                }}
              >
                {lede}
              </p>
            </div>
          )
        ) : null}

        {/* Sections */}
        {sections.map((section, i) => {
          if (!section.image) {
            return (
              <section key={i} style={{ maxWidth: "62ch" }}>
                <SectionText section={section} />
              </section>
            );
          }
          const left = sideForImage();
          return (
            <section
              key={i}
              className={`grid items-start gap-8 lg:gap-14 ${left ? "lg:grid-cols-[0.9fr_1.25fr]" : "lg:grid-cols-[1.25fr_0.9fr]"}`}
            >
              <div className={left ? "lg:order-2" : ""}>
                <SectionText section={section} />
              </div>
              <div className={left ? "lg:order-1" : ""}>
                <Figure image={section.image} />
              </div>
            </section>
          );
        })}

        {updatedAt ? (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(48, 35, 28, 0.72)",
              paddingTop: 24,
              borderTop: "1px solid rgba(48, 35, 28, 0.12)",
            }}
          >
            Last updated {updatedAt}
          </p>
        ) : null}
        </div>
      </div>
    </article>
  );
}
