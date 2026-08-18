import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "The House of Willow Alexander's accessibility statement: our commitment to WCAG 2.2 AA, what we have done, known limitations and how to get help.",
};

const cream = "var(--color-house-cream)";
const brown = "var(--color-house-brown)";
const ink = "var(--color-house-ink)";
const gold = "var(--house-gold)";
const goldDark = "var(--house-gold-dark)";
const line = "var(--color-house-line)";
const display = "var(--font-display)";
const sans = "var(--font-sans)";

const sections: { heading: string; body?: string[]; list?: string[] }[] = [
  {
    heading: "Our commitment",
    body: [
      "House of Willow Alexander is committed to making its website usable for as many people as possible, regardless of ability or the technology they use. We aim to meet the Web Content Accessibility Guidelines (WCAG) version 2.2 at level AA across the site.",
      "Accessibility is treated as part of the House standard, not an afterthought. We test as we build and fix issues as we find them.",
    ],
  },
  {
    heading: "What we have done",
    list: [
      "Full keyboard navigation, with a skip link to the main content",
      "Visible focus states with clear contrast",
      "A logical heading order on every page",
      "Semantic buttons and links, not clickable non-interactive elements",
      "Form labels, descriptions and errors that are programmatically associated",
      "Colour is never the only way a service or state is identified",
      "Body text contrast of at least 4.5:1 and large text of at least 3:1",
      "Touch targets of at least 44 by 44 pixels",
      "Alternative text that describes the purpose of editorial and still-life images",
      "Decorative pattern marked so assistive technology can ignore it",
      "A reduced-motion mode that removes parallax and non-essential animation",
    ],
  },
  {
    heading: "Known limitations",
    body: [
      "Some content is still being brought up to the full standard, and a small number of third-party components, such as embedded booking and payment tools, are outside our direct control. Where we rely on a third party, we choose accessible options where we can and raise issues with the provider.",
      "If you find something that does not work for you, please tell us. Real feedback is the fastest way we improve.",
    ],
  },
  {
    heading: "Getting help",
    body: [
      "If you need information from this site in a different format, or you have difficulty using any part of it, contact the House and we will help. Where you cannot complete a booking or quote online, we can complete it with you by telephone or email.",
      "Contact us at sales@willowalexander.co.uk, or through the help centre.",
    ],
  },
  {
    heading: "Enforcement and feedback",
    body: [
      "We welcome feedback on the accessibility of this site and take every report seriously. We aim to respond within a reasonable time and to keep you informed of any fix.",
      "This statement will be reviewed and updated as the site develops.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <article style={{ background: cream, color: ink }}>
      <header style={{ padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 96px) clamp(32px, 4vw, 48px)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: sans,
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: goldDark,
              fontWeight: 600,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span aria-hidden style={{ width: 36, height: 1, background: goldDark, opacity: 0.7 }} />
            Legal · Accessibility
          </p>
          <h1
            style={{
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: brown,
              margin: "24px 0 0",
            }}
          >
            Accessibility statement.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-hearth-serif)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 1.9vw, 24px)",
              lineHeight: 1.5,
              color: "rgba(48, 35, 28, 0.8)",
              margin: "28px 0 0",
              paddingTop: 24,
              borderTop: `1px solid ${line}`,
            }}
          >
            How we work to make the House usable for everyone, and how to reach us
            if something is not working for you.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(16px, 3vw, 40px) clamp(24px, 5vw, 96px) clamp(72px, 8vw, 120px)" }}>
        {sections.map((s) => (
          <section key={s.heading} style={{ marginBottom: "clamp(36px, 4vw, 56px)" }}>
            <h2
              style={{
                fontFamily: display,
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.2,
                color: brown,
                margin: "0 0 20px",
              }}
            >
              {s.heading}
            </h2>
            {s.body?.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: sans,
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "rgba(48, 35, 28, 0.82)",
                  margin: "0 0 16px",
                }}
              >
                {p}
              </p>
            ))}
            {s.list ? (
              <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0 }}>
                {s.list.map((li) => (
                  <li
                    key={li}
                    style={{
                      fontFamily: sans,
                      fontSize: 16,
                      lineHeight: 1.5,
                      color: brown,
                      padding: "12px 0",
                      borderBottom: `1px solid ${line}`,
                      display: "flex",
                      gap: 14,
                      alignItems: "baseline",
                    }}
                  >
                    <span aria-hidden style={{ color: gold, fontFamily: display }}>·</span>
                    {li}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <p
          style={{
            fontFamily: sans,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(48, 35, 28, 0.6)",
            paddingTop: 24,
            borderTop: `1px solid ${line}`,
          }}
        >
          Last updated 17 August 2026. Need a hand? Visit{" "}
          <Link href="/help" style={{ color: goldDark, textDecoration: "underline" }}>
            help
          </Link>{" "}
          or{" "}
          <Link href="/contact" style={{ color: goldDark, textDecoration: "underline" }}>
            contact the House
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
