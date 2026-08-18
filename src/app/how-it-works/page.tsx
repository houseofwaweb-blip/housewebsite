import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "How it works · Powered by HoWA",
  description:
    "HoWA is the booking and home-intelligence system the House uses to keep services, records, reminders, cover and useful recommendations connected around your home.",
};

/* ---- self-contained House styles (inline, token-first) ------------------- */
const cream = "var(--color-house-cream)";
const creamLight = "var(--color-house-cream-light)";
const brown = "var(--color-house-brown)";
const ink = "var(--color-house-ink)";
const gold = "var(--house-gold)";
const goldDark = "var(--house-gold-dark)";
const line = "var(--color-house-line)";
const display = "var(--font-display)";
const sans = "var(--font-sans)";

const eyebrowStyle: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 11,
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: goldDark,
  fontWeight: 600,
  margin: 0,
};

type PlaceholderBrief = {
  file: string;
  dims: string;
  brief: string;
  /** When the real image exists in /public, its path. Renders instead of the placeholder. */
  src?: string;
};

const sections: {
  n: string;
  heading: string;
  body: string[];
  image?: PlaceholderBrief;
}[] = [
  {
    n: "01",
    heading: "Book and manage House services.",
    body: [
      "Choose a service, enter your postcode and see real availability and pricing. Everything you book, from a single gardener visit to a recurring housekeeping rhythm, is kept in one place so you can reschedule, repeat or cancel without starting again.",
      "Because the House remembers your address and property details, the next booking is quicker than the first.",
    ],
    image: {
      file: "how-book-services.webp",
      dims: "1200 × 900",
      src: "/home/how-book-services.webp",
      brief:
        "A gardener and housekeeper arriving at a British townhouse in soft morning light, calm and unhurried, the moment a service begins.",
    },
  },
  {
    n: "02",
    heading: "Keep a Home Record.",
    body: [
      "Your Home Record is a useful, private record of your home: its rooms, its quirks, the professionals who have visited and the notes worth keeping. It belongs to you.",
      "Access instructions, the make of a boiler, a preferred cleaning product or where the stopcock lives all sit in one place, so the House can help without asking you to repeat yourself.",
    ],
    image: {
      file: "how-home-record.webp",
      dims: "1200 × 1500",
      src: "/home/how-home-record.webp",
      brief:
        "A leather-bound household ledger open on a kitchen table beside a set of keys, editorial still life, the quiet keeping of a home.",
    },
  },
  {
    n: "03",
    heading: "Store relevant policy, visit and purchase history.",
    body: [
      "Cover documents, completed visits and things you have bought from the House Store are gathered together and easy to find. When a policy renews or a warranty matters, the detail is already to hand.",
      "You decide what is kept. Every record shows where it came from and when it was added.",
    ],
  },
  {
    n: "04",
    heading: "Receive reminders and seasonal recommendations.",
    body: [
      "Gutters before autumn, a boiler service before winter, the lawn in spring. HoWA keeps track of the rhythm of a home and reminds you before the moment passes, not after.",
      "Reminders are yours to keep, snooze or turn off. Nothing is bought on your behalf, and nothing manufactures urgency.",
    ],
    image: {
      file: "how-seasonal-reminders.webp",
      dims: "1200 × 900",
      src: "/home/how-seasonal-reminders.webp",
      brief:
        "An English garden turning from late summer to autumn, gutters and hedges catching low golden light, the rhythm of the year around a home.",
    },
  },
  {
    n: "05",
    heading: "Understand what the home may need next.",
    body: [
      "Over time, the joined-up picture helps the House suggest the sensible next step: a service worth booking, cover worth reviewing or a small job worth doing before it becomes a large one.",
      "Every suggestion explains why it appears, and you are always free to dismiss it.",
    ],
  },
  {
    n: "06",
    heading: "Privacy, permissions and control.",
    body: [
      "Your home, access, pet, policy and schedule details are treated as sensitive. You can see what is held, edit or delete it, and control who within the House can use it.",
      "Marketing consent is kept separate from the information needed to deliver a service. Your Home Record is never used to learn about your household for unrelated purposes.",
    ],
  },
];

/* ---- on-brand image placeholder frame ------------------------------------ */
function ImagePlaceholder({
  file,
  dims,
  brief,
  minHeight = 260,
}: PlaceholderBrief & { minHeight?: number }) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${brief}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 12,
        minHeight,
        height: "100%",
        padding: "clamp(24px, 4vw, 44px)",
        background: creamLight,
        border: `1px dashed ${goldDark}`,
        outline: `1px solid ${line}`,
        outlineOffset: 6,
      }}
    >
      <span
        style={{
          fontFamily: sans,
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: goldDark,
          fontWeight: 600,
        }}
      >
        Image placeholder
      </span>
      <span
        style={{
          fontFamily: sans,
          fontSize: 13,
          color: brown,
          fontWeight: 600,
          wordBreak: "break-word",
        }}
      >
        {file}
      </span>
      <span
        style={{
          fontFamily: sans,
          fontSize: 12,
          letterSpacing: "0.12em",
          color: "rgba(48, 35, 28, 0.6)",
        }}
      >
        {dims}
      </span>
      <span
        aria-hidden
        style={{ width: 28, height: 1, background: gold, opacity: 0.8 }}
      />
      <span
        style={{
          fontFamily: display,
          fontStyle: "italic",
          fontSize: "clamp(14px, 1.4vw, 17px)",
          lineHeight: 1.5,
          color: "rgba(48, 35, 28, 0.78)",
          maxWidth: "38ch",
        }}
      >
        {brief}
      </span>
    </div>
  );
}

/** Renders the real image when its file exists, otherwise the briefed placeholder. */
function HowMedia({ file, dims, brief, src, minHeight }: PlaceholderBrief & { minHeight?: number }) {
  if (src) {
    return (
      <div style={{ border: `1px solid ${line}`, overflow: "hidden", lineHeight: 0, alignSelf: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={brief} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    );
  }
  return <ImagePlaceholder file={file} dims={dims} brief={brief} minHeight={minHeight} />;
}

export default function HowItWorksPage() {
  return (
    <div style={{ background: cream, color: ink }}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "How it works", href: "/how-it-works" },
        ]}
      />
      {/* Hero */}
      <header
        style={{
          padding:
            "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 96px) clamp(40px, 5vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 1340, margin: "0 auto" }}>
          <div className="hiw-hero-grid">
          <div>
          <p style={{ ...eyebrowStyle, display: "flex", alignItems: "center", gap: 14 }}>
            <span aria-hidden style={{ width: 36, height: 1, background: goldDark, opacity: 0.7 }} />
            Powered by HoWA
          </p>
          <h1
            style={{
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(36px, 4.4vw, 66px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: brown,
              margin: "28px 0 0",
              maxWidth: "14ch",
            }}
          >
            The House is powered by HoWA.
          </h1>
          <p
            style={{
              fontFamily: sans,
              fontSize: "clamp(18px, 1.7vw, 22px)",
              lineHeight: 1.55,
              color: "rgba(48, 35, 28, 0.84)",
              margin: "32px 0 0",
              maxWidth: "58ch",
            }}
          >
            HoWA is the booking and home-intelligence system the House uses to keep
            services, records, reminders, cover and useful recommendations
            connected around your home.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 40 }}>
            <Link
              href="/my-house"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 48,
                padding: "0 32px",
                background: brown,
                color: "var(--color-house-chalk)",
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: `1px solid ${brown}`,
              }}
            >
              Go to My House
            </Link>
            <a
              href="#open-booking-form"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 48,
                padding: "0 32px",
                background: "transparent",
                color: brown,
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: `1px solid ${brown}`,
              }}
            >
              Book a service
            </a>
          </div>

          </div>{/* left column: copy */}

          {/* Hero image — right column, contained */}
          <div>
            <HowMedia
              file="how-hero-doorway.webp"
              dims="1600 × 900"
              src="/home/how-hero-doorway.webp"
              brief="A calm Georgian doorway at golden hour, keys in hand, the quiet moment before a first visit."
              minHeight={420}
            />
          </div>
          </div>{/* hiw-hero-grid */}
        </div>
      </header>
      <style>{`
        .hiw-hero-grid { display: grid; grid-template-columns: 1fr; gap: clamp(32px, 4vw, 60px); align-items: center; }
        @media (min-width: 900px) { .hiw-hero-grid { grid-template-columns: 0.85fr 1.2fr; } }
      `}</style>

      {/* Process band — solid House brown, cream text (no full-bleed image) */}
      <section
        style={{
          position: "relative",
          background: "var(--color-house-brown)",
          borderTop: `1px solid ${line}`,
          borderBottom: `1px solid ${line}`,
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: 1040,
            margin: "0 auto",
            padding: "clamp(64px, 9vw, 120px) clamp(24px, 5vw, 96px)",
          }}
        >
          <p style={{ ...eyebrowStyle, color: gold, marginBottom: 20 }}>How the visit works</p>
          <h2
            style={{
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.6vw, 52px)",
              lineHeight: 1.08,
              color: "var(--color-house-chalk)",
              margin: "0 0 40px",
              maxWidth: "18ch",
            }}
          >
            One home, remembered from the first visit on.
          </h2>
          <div className="hiw-band-grid">
            {[
              { n: "01", h: "Ask the House", b: "Choose a service, enter your postcode and see real availability and pricing." },
              { n: "02", h: "The House arranges it", b: "Vetted people, clear information and joined-up fulfilment, delivered to one standard." },
              { n: "03", h: "HoWA remembers it", b: "Records, reminders and relevant next steps stay with your home." },
            ].map((s) => (
              <div key={s.n}>
                <span style={{ fontFamily: display, fontSize: 30, color: gold, letterSpacing: "0.04em" }}>{s.n}</span>
                <h3
                  style={{
                    fontFamily: display,
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2.2vw, 27px)",
                    color: "var(--color-house-chalk)",
                    margin: "14px 0 10px",
                  }}
                >
                  {s.h}
                </h3>
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "rgba(255, 253, 248, 0.82)",
                    margin: 0,
                  }}
                >
                  {s.b}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .hiw-band-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
          @media (min-width: 768px) { .hiw-band-grid { grid-template-columns: repeat(3, 1fr); gap: 40px; } }
        `}</style>
      </section>

      {/* Sections */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(24px, 4vw, 56px) clamp(24px, 5vw, 96px) clamp(72px, 8vw, 120px)",
        }}
      >
        <div style={{ borderTop: `1px solid ${line}` }}>
          {sections.map((s, idx) => {
            const content = (
              <div className="how-grid">
                <div>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: display,
                      fontSize: 22,
                      color: gold,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.n}
                  </span>
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: display,
                      fontWeight: 400,
                      fontStyle: "italic",
                      fontSize: "clamp(24px, 2.8vw, 36px)",
                      lineHeight: 1.15,
                      color: brown,
                      margin: "0 0 20px",
                    }}
                  >
                    {s.heading}
                  </h2>
                  {s.body.map((p, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: sans,
                        fontSize: 17,
                        lineHeight: 1.7,
                        color: "rgba(48, 35, 28, 0.82)",
                        margin: "0 0 16px",
                        maxWidth: "60ch",
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            );

            // Alternate image side down the page for rhythm.
            const imageFirst = idx % 2 === 1;

            return (
              <section
                key={s.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 8,
                  padding: "clamp(36px, 4vw, 56px) 0",
                  borderBottom: `1px solid ${line}`,
                }}
              >
                {s.image ? (
                  <div className={imageFirst ? "how-media-grid image-first" : "how-media-grid"}>
                    {imageFirst ? (
                      <>
                        <HowMedia {...s.image} />
                        {content}
                      </>
                    ) : (
                      <>
                        {content}
                        <HowMedia {...s.image} />
                      </>
                    )}
                  </div>
                ) : (
                  content
                )}
              </section>
            );
          })}
        </div>

        {/* Closing panel */}
        <div
          style={{
            marginTop: "clamp(48px, 6vw, 88px)",
            background: creamLight,
            border: `1px solid ${line}`,
            padding: "clamp(36px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <p style={{ ...eyebrowStyle, marginBottom: 20 }}>Powered by HoWA</p>
          <h2
            style={{
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(26px, 3.2vw, 44px)",
              lineHeight: 1.12,
              color: brown,
              margin: "0 auto 28px",
              maxWidth: "20ch",
            }}
          >
            One home, remembered.
          </h2>
          <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <Link
              href="/my-house"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 48,
                padding: "0 32px",
                background: brown,
                color: "var(--color-house-chalk)",
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: `1px solid ${brown}`,
              }}
            >
              Go to My House
            </Link>
            <a
              href="#open-booking-form"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 48,
                padding: "0 32px",
                background: "transparent",
                color: brown,
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: `1px solid ${brown}`,
              }}
            >
              Book a service
            </a>
          </div>
        </div>
      </div>

      {/* two-column section grid on wider screens */}
      <style>{`
        .how-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .how-media-grid { display: grid; grid-template-columns: 1fr; gap: clamp(24px, 4vw, 48px); align-items: center; }
        @media (min-width: 768px) {
          .how-grid { grid-template-columns: 88px minmax(0, 1fr); gap: 32px; }
          .how-media-grid { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: clamp(32px, 4vw, 64px); }
          .how-media-grid.image-first { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); }
        }
      `}</style>
    </div>
  );
}
