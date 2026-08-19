import type { Metadata } from "next";
import Link from "next/link";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "The House",
  description:
    "The House of Willow Alexander: a modern British House for the care, protection and enjoyment of home and garden. Our story, our standard and the people behind it.",
};

const cream = "var(--color-house-cream)";
const creamLight = "var(--color-house-cream-light)";
const brown = "var(--color-house-brown)";
const ink = "var(--color-house-ink)";
const gold = "var(--house-gold)";
const goldDark = "var(--house-gold-dark)";
const line = "var(--color-house-line)";
const display = "var(--font-display)";
const sans = "var(--font-sans)";

const eyebrow: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 13,
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: goldDark,
  fontWeight: 600,
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: 14,
};
const rule: React.CSSProperties = { width: 36, height: 1, background: goldDark, opacity: 0.7 };
const h2Style: React.CSSProperties = {
  fontFamily: display,
  fontWeight: 400,
  fontSize: "clamp(28px, 3.6vw, 52px)",
  lineHeight: 1.08,
  letterSpacing: "-0.01em",
  color: brown,
  margin: "0 0 28px",
  maxWidth: "22ch",
};
const para: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 19,
  lineHeight: 1.7,
  color: "rgba(48, 35, 28, 0.82)",
  margin: "0 0 18px",
  maxWidth: "60ch",
};
const wrap: React.CSSProperties = {
  maxWidth: 1140,
  margin: "0 auto",
  padding: "clamp(56px, 7vw, 104px) clamp(24px, 5vw, 96px)",
};
const linkStyle: React.CSSProperties = { color: goldDark, textDecoration: "underline" };

const today = [
  { h: "Care", b: "Trusted home and garden services, each with its own expertise and all held to the same House standard.", href: "/services", cta: "See services", img: "/home-v4/origin-garden-studio.webp", alt: "A House professional tending a British garden" },
  { h: "Cover", b: "Home and pet cover introduced by the House and arranged through Provenance.", href: "/insurance-and-cover", cta: "Insurance and cover", img: "/home-v4/protect-still-life.webp", alt: "A quiet still life representing home and pet cover" },
  { h: "Shop", b: "The House Store: useful, well-made objects for home and garden, beautifully chosen.", href: "/shop", cta: "Visit the Store", img: "/home-v4/house-temperaments-still-life.webp", alt: "A considered still life of well-made objects for the home" },
  { h: "Read", b: "The Hearth, the magazine of the House, for ideas worth keeping and good domestic sense.", href: "/magazine", cta: "Read The Hearth", img: "/home-v4/homepage-plant.webp", alt: "An editorial botanical still life from The Hearth" },
];

export default function TheHousePage() {
  return (
    <div style={{ background: cream, color: ink }}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "The House", href: "/the-house" },
        ]}
      />
      {/* 1. Hero */}
      <header
        style={{
          padding: "clamp(96px, 14vh, 168px) clamp(24px, 5vw, 96px) clamp(48px, 6vw, 80px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <p style={{ ...eyebrow, justifyContent: "center" }}>
            <span aria-hidden style={rule} />
            The House of Willow Alexander
            <span aria-hidden style={rule} />
          </p>
          <h1
            style={{
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(40px, 5.6vw, 92px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: brown,
              margin: "32px auto 0",
              maxWidth: "16ch",
            }}
          >
            A modern British House for home and garden living.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-hearth-serif)",
              fontStyle: "italic",
              fontSize: "clamp(19px, 2vw, 27px)",
              lineHeight: 1.5,
              color: "rgba(48, 35, 28, 0.8)",
              margin: "32px auto 0",
              maxWidth: "44ch",
            }}
          >
            For the care, protection and enjoyment of home and garden.
          </p>
        </div>
      </header>

      {/* 2. Origin story */}
      <section style={{ background: creamLight, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
        <div style={wrap}>
          <div className="grid gap-10 items-center lg:grid-cols-[1.25fr_0.9fr]">
          <div>
          <p style={{ ...eyebrow, marginBottom: 24 }}>
            <span aria-hidden style={rule} />
            Our story
          </p>
          <h2 style={h2Style}>From specialist services to a House.</h2>
          <p style={para}>
            The House of Willow Alexander began in the practical work of looking
            after homes and gardens: gardeners, cleaners, window cleaners and the
            trades a household relies on. Doing that work well, visit after visit,
            taught us something simple. People do not want ten separate companies.
            They want one they can trust.
          </p>
          <p style={para}>
            So we became a House. The same standard now runs through everything we
            do, from a single garden visit to home and pet cover, from the objects
            in the Store to the pages of The Hearth. The disciplines keep their own
            expertise and their own recognised colours, but they belong to one
            family and answer to one standard.
          </p>
          <p style={para}>
            Read more about what we believe in our{" "}
            <Link href="/the-house/philosophy" style={linkStyle}>
              philosophy
            </Link>{" "}
            and{" "}
            <Link href="/the-house/about" style={linkStyle}>
              about the House
            </Link>
            .
          </p>
          </div>
          <div className="lg:pl-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/artwork/house-drawing-2.webp"
              alt="A watercolour illustration of a Georgian townhouse on the House's floral ground"
              className="w-full h-auto block"
              style={{ border: `1px solid ${line}` }}
            />
          </div>
          </div>
        </div>
      </section>

      {/* 3. The House today */}
      <section>
        <div style={wrap}>
          <p style={{ ...eyebrow, marginBottom: 24 }}>
            <span aria-hidden style={rule} />
            The House today
          </p>
          <h2 style={h2Style}>Care, Cover, Shop and Read.</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
              gap: 1,
              background: line,
              border: `1px solid ${line}`,
              marginTop: 8,
            }}
          >
            {today.map((t) => (
              <div key={t.h} style={{ background: cream, display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.img}
                    alt={t.alt}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "clamp(24px, 2.6vw, 34px)", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    fontFamily: display,
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "clamp(22px, 2.4vw, 30px)",
                    color: brown,
                    margin: "0 0 14px",
                  }}
                >
                  {t.h}
                </h3>
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "rgba(48, 35, 28, 0.78)",
                    margin: "0 0 24px",
                  }}
                >
                  {t.b}
                </p>
                <Link href={t.href} style={{ ...linkStyle, marginTop: "auto", fontFamily: sans, fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", color: goldDark }}>
                  {t.cta} &rarr;
                </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Standard & sustainability */}
      <section className="relative overflow-hidden" style={{ background: creamLight, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
        <FlowerWatermark color="gold" side="right" opacity={0.1} />
        <div className="relative z-10" style={wrap}>
          <p style={{ ...eyebrow, marginBottom: 24 }}>
            <span aria-hidden style={rule} />
            The House standard
          </p>
          <h2 style={h2Style}>One standard, held everywhere.</h2>
          <p style={para}>
            The House standard is the set of expectations behind the name: clear
            service information, appropriate checks and credentials, straightforward
            pricing or quotation, and a route back to the House if something needs
            resolving.
          </p>
          <p style={para}>
            We keep claims specific. Environmental credentials, professional checks
            and product information are shown only where we have evidence to support
            them.
          </p>
          <p style={para}>
            More on our{" "}
            <Link href="/the-house/standards" style={linkStyle}>
              standards
            </Link>{" "}
            and{" "}
            <Link href="/the-house/sustainability" style={linkStyle}>
              sustainability commitments
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 5. Role of HoWA */}
      <section>
        <div style={wrap}>
          <p style={{ ...eyebrow, marginBottom: 24 }}>
            <span aria-hidden style={rule} />
            The role of HoWA
          </p>
          <h2 style={h2Style}>The system the House uses to remember and coordinate.</h2>
          <p style={para}>
            Beneath the House sits HoWA: the quiet infrastructure that powers
            booking, scheduling, the Home Record, reminders and the joined-up
            memory of every visit, policy and purchase. It is the technology the
            House uses, not a product the customer is asked to join.
          </p>
          <p style={para}>
            You feel HoWA as a remembered address, a pre-filled property detail, a
            timely reminder before winter. You are always in control of what it
            keeps. Learn more on the{" "}
            <Link href="/how-it-works" style={linkStyle}>
              How it works
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      {/* 6. People */}
      <section style={{ background: creamLight, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
        <div style={wrap}>
          <p style={{ ...eyebrow, marginBottom: 24 }}>
            <span aria-hidden style={rule} />
            People
          </p>
          <h2 style={h2Style}>A House is its people.</h2>
          <p style={para}>
            The House brings together its own team, specialist Willow Alexander
            service teams and selected professional partners. Before work is agreed,
            we tell you which delivery model applies to the service you are booking.
            Where we can, we name the people who will look after your home.
          </p>
          <p style={para}>
            Meet more of the House in{" "}
            <Link href="/the-house/about" style={linkStyle}>
              about the House
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 7. House Approved & standards */}
      <section>
        <div style={wrap}>
          <p style={{ ...eyebrow, marginBottom: 24 }}>
            <span aria-hidden style={rule} />
            House Approved and professional standards
          </p>
          <h2 style={h2Style}>What House Approved means.</h2>
          <p style={para}>
            House Approved is used for selected professional partners after checks
            relevant to the work they provide. Depending on the discipline, that can
            include identity, qualifications, insurance, references and recent work.
            We only show credentials we have verified.
          </p>
          <p style={para}>
            Professionals can{" "}
            <Link href="/house-approved-pro" style={linkStyle}>
              apply to become House Approved
            </Link>
            , and you can read about our approach to{" "}
            <Link href="/the-house/standards" style={linkStyle}>
              standards and accreditation
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 8. Press & awards */}
      <section style={{ background: brown, color: "var(--color-house-chalk)" }}>
        <div style={wrap}>
          <p style={{ ...eyebrow, color: gold, marginBottom: 24 }}>
            <span aria-hidden style={{ ...rule, background: gold, opacity: 0.8 }} />
            Press, awards and partnerships
          </p>
          <h2 style={{ ...h2Style, color: "var(--color-house-chalk)" }}>Press, awards and partnerships.</h2>
          <p style={{ ...para, color: "rgba(255, 253, 248, 0.86)" }}>
            We list press coverage, awards and partnerships when they are current
            and can be verified, with a source wherever one is available.
          </p>
          <p style={{ ...para, color: "rgba(255, 253, 248, 0.86)", marginBottom: 0 }}>
            See the latest in{" "}
            <Link href="/news" style={{ color: gold, textDecoration: "underline" }}>
              news
            </Link>{" "}
            and view our creative work in the{" "}
            <Link href="/the-house/artwork" style={{ color: gold, textDecoration: "underline" }}>
              House artwork
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
