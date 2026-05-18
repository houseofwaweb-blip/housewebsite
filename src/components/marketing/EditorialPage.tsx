/**
 * EditorialPage — shared template for long-form editorial pages under
 * /the-house, /legal, etc. Lander-aesthetic: cream + Cormorant italic
 * accents, Effra body, generous editorial typography.
 *
 * Pass sections as an array; each renders with headline + body + optional
 * pullquote. Body strings may contain line breaks — paragraphs split on `\n\n`.
 */

export interface EditorialSection {
  heading?: string;
  /** Double-newline-separated paragraphs. */
  body: string;
  /** Optional pull quote rendered after the body. */
  quote?: { text: string; attribution?: string };
}

export interface EditorialPageProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  sections: EditorialSection[];
  updatedAt?: string;
}

export function EditorialPage({
  eyebrow,
  title,
  lede,
  sections,
  updatedAt,
}: EditorialPageProps) {
  return (
    <article style={{ background: "var(--color-house-cream)", color: "var(--color-house-brown)" }}>
      {/* Hero block — cream, large editorial headline */}
      <header
        style={{
          background: "var(--color-house-cream)",
          padding:
            "clamp(80px, 12vh, 140px) clamp(40px, 5vw, 96px) clamp(48px, 5vw, 80px)",
          borderBottom: "1px solid rgba(48, 35, 28, 0.08)",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--color-house-gold-dark)",
              margin: "0 0 24px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 36,
                height: 1,
                background: "var(--color-house-gold-dark)",
                opacity: 0.7,
              }}
            />
            {eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-hearth-serif)",
              fontWeight: 400,
              fontSize: "clamp(44px, 5.4vw, 84px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--color-house-brown)",
              margin: "0 0 24px",
            }}
          >
            {title}
          </h1>
          {lede ? (
            <p
              style={{
                fontFamily: "var(--font-hearth-serif)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.8vw, 22px)",
                lineHeight: 1.5,
                color: "rgba(48, 35, 28, 0.78)",
                margin: "24px 0 0",
                maxWidth: "52ch",
                paddingTop: 24,
                borderTop: "1px solid rgba(48, 35, 28, 0.14)",
              }}
            >
              {lede}
            </p>
          ) : null}
        </div>
      </header>

      {/* Body */}
      <div
        style={{
          padding:
            "clamp(64px, 7vw, 104px) clamp(40px, 5vw, 96px) clamp(80px, 8vw, 128px)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {sections.map((section, i) => (
            <section
              key={i}
              style={{ marginTop: i === 0 ? 0 : "clamp(56px, 6vw, 88px)" }}
            >
              {section.heading ? (
                <h2
                  style={{
                    fontFamily: "var(--font-hearth-serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(26px, 2.8vw, 36px)",
                    lineHeight: 1.2,
                    color: "var(--color-house-brown)",
                    margin: "0 0 24px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {section.heading}
                </h2>
              ) : null}
              {section.body.split("\n\n").map((p, j) => (
                <p
                  key={j}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 17,
                    lineHeight: 1.7,
                    color: "rgba(48, 35, 28, 0.82)",
                    margin: "0 0 18px",
                  }}
                >
                  {p}
                </p>
              ))}
              {section.quote ? (
                <blockquote
                  style={{
                    margin: "32px 0",
                    paddingLeft: 28,
                    borderLeft: "2px solid var(--color-house-gold)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-hearth-serif)",
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
                        color: "rgba(48, 35, 28, 0.55)",
                        display: "block",
                      }}
                    >
                      {section.quote.attribution}
                    </cite>
                  ) : null}
                </blockquote>
              ) : null}
            </section>
          ))}

          {updatedAt ? (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(48, 35, 28, 0.55)",
                marginTop: "clamp(64px, 7vw, 104px)",
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
