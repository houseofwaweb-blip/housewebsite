import type { Metadata } from "next";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "House Approved Pro",
  description:
    "Bring your expertise into the House. House Approved Pro is the professional and contractor proposition of the House of Willow Alexander.",
};

const PRO_EMAIL = "sales@willowalexander.co.uk";

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
  fontSize: 11,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: goldDark,
  fontWeight: 600,
  margin: 0,
};

const benefits = [
  { h: "Steady, qualified demand", b: "Bookings routed from a trusted House brand, matched to your trade and service area, without you chasing leads." },
  { h: "Scheduling that fits", b: "Availability, visit windows and rebookings handled through House tools, so your diary stays your own." },
  { h: "A recognised standard", b: "Being House Approved is a mark customers understand. The House vouches for the people it lets through the door." },
  { h: "Support behind you", b: "A real team for scheduling questions, payment queries and the occasional difficult job." },
  { h: "Tools that do the admin", b: "Booking, records, reminders and customer history, powered by HoWA, so less of your week is paperwork." },
  { h: "A reputation you build", b: "Verified reviews follow good work, and good work brings the next booking." },
];

const forWhom = [
  "Independent tradespeople and sole traders",
  "Established service businesses and small teams",
  "Licensed operators in regulated disciplines",
  "Specialists in home and garden care looking for consistent, quality work",
];

const modelSteps = [
  { h: "You stay independent", b: "House Approved professionals are independent contractors and licensed operators, not employees of the House. You keep your business, your name and your judgement." },
  { h: "The House brings the work", b: "Customers book through the House. The service is delivered by you, to the House standard, in the recognised discipline colours where relevant." },
  { h: "One clear commercial model", b: "Fees and the commercial split are stated plainly and agreed before you take work. No hidden deductions, no surprise charges." },
];

const standards = [
  "Identity, right-to-work and business verification",
  "Relevant qualifications and certifications for the trade",
  "Public liability and, where required, professional insurance",
  "References and a review of recent work",
  "Ongoing conduct, punctuality and customer-care expectations",
  "A shared commitment to sustainability and responsible working",
];

const tools = [
  "Booking and diary management",
  "Customer and property history at each visit",
  "Reminders for recurring and seasonal work",
  "Records of completed visits and notes",
  "Clear payment and payout summaries",
];

const steps = [
  { n: "01", h: "Apply", b: "Tell us your trade, your area and a little about your business using the form below." },
  { n: "02", h: "Verification", b: "We check identity, qualifications, insurance and references, and review examples of your work." },
  { n: "03", h: "Onboarding", b: "We agree the commercial model, set up your tools and brief you on the House standard." },
  { n: "04", h: "Go live", b: "You start receiving matched bookings in your area, with support on hand." },
];

const faqs = [
  { q: "Am I employed by the House?", a: "No. House Approved professionals are independent contractors or licensed operators. The legal model is made explicit before you agree to anything, and employed roles, if ever offered, are advertised separately and clearly." },
  { q: "What does it cost to join?", a: "There is no charge to apply. The commercial model, including any fees or commission, is stated in full and agreed before you take any work." },
  { q: "Do I need my own insurance?", a: "Yes. You must carry valid public liability cover, and professional or trade-specific insurance where your discipline requires it. We verify this during onboarding." },
  { q: "Can I keep my own customers and brand?", a: "Yes. House Approved work sits alongside your own business. You keep your name, your existing clients and your independence." },
  { q: "Which trades are you looking for?", a: "Home and garden disciplines including gardening, housekeeping, cleaning, window cleaning, repairs, electrical and energy work, removals and dog walking. If your specialism sits nearby, apply and tell us about it." },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 48,
  padding: "12px 16px",
  fontFamily: sans,
  fontSize: 16,
  color: ink,
  background: cream,
  border: `1px solid ${line}`,
  borderRadius: 0,
};
const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: sans,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.04em",
  color: brown,
  margin: "0 0 8px",
};

export default function HouseApprovedProPage() {
  return (
    <div style={{ background: cream, color: ink }}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "House Approved Pro", href: "/house-approved-pro" },
        ]}
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      {/* Hero — House image with a dark scrim so the chalk text stays legible */}
      <header
        style={{
          position: "relative",
          background: brown,
          backgroundImage: "url(/home-v4/hero-house.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--color-house-chalk)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(48,35,28,0.86) 0%, rgba(48,35,28,0.72) 50%, rgba(48,35,28,0.88) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: 1140,
            margin: "0 auto",
            padding: "clamp(88px, 13vh, 152px) clamp(24px, 5vw, 96px) clamp(56px, 7vw, 96px)",
          }}
        >
          <p style={{ ...eyebrow, color: gold, display: "flex", alignItems: "center", gap: 14 }}>
            <span aria-hidden style={{ width: 36, height: 1, background: gold, opacity: 0.8 }} />
            House Approved Pro
          </p>
          <h1
            style={{
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(42px, 5.6vw, 88px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--color-house-chalk)",
              margin: "28px 0 0",
              maxWidth: "16ch",
            }}
          >
            Bring your expertise into the House.
          </h1>
          <p
            style={{
              fontFamily: sans,
              fontSize: "clamp(17px, 1.6vw, 21px)",
              lineHeight: 1.6,
              color: "rgba(255, 253, 248, 0.86)",
              margin: "28px 0 0",
              maxWidth: "56ch",
            }}
          >
            The House of Willow Alexander works with trusted independent
            professionals and service businesses to care for homes and gardens to
            one standard. If you do good work, we would like to send it your way.
          </p>
          <a
            href="#apply"
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: 48,
              padding: "0 36px",
              marginTop: 40,
              background: "var(--color-house-chalk)",
              color: brown,
              fontFamily: sans,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid var(--color-house-chalk)",
            }}
          >
            Apply to become House Approved
          </a>
        </div>
      </header>

      {/* Who it is for */}
      <Section eyebrowText="Who it is for" title="Independent professionals who take pride in the work." image="/services/subbrands/handyman.webp">
        <p style={paraStyle}>
          House Approved Pro is a business-to-business proposition. It is built for
          people who run their own trade and want a steadier flow of quality work,
          not a recruitment scheme for employees.
        </p>
        <ul style={{ ...plainList, marginTop: 24 }}>
          {forWhom.map((f) => (
            <li key={f} style={listItem}>
              <span aria-hidden style={bullet}>·</span>
              {f}
            </li>
          ))}
        </ul>
      </Section>

      {/* Benefits */}
      <Section eyebrowText="Benefits" title="What being House Approved brings you." tint>
        <div style={cardGrid}>
          {benefits.map((x) => (
            <div key={x.h} style={card}>
              <h3 style={cardHeading}>{x.h}</h3>
              <p style={cardBody}>{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contractor model */}
      <Section eyebrowText="The contractor model" title="How working with the House works." image="/services/subbrands/gardeners.webp" imageSide="left">
        <div style={cardGrid}>
          {modelSteps.map((x) => (
            <div key={x.h} style={{ ...card, background: cream }}>
              <h3 style={cardHeading}>{x.h}</h3>
              <p style={cardBody}>{x.b}</p>
            </div>
          ))}
        </div>
        <p style={{ ...paraStyle, marginTop: 28 }}>
          Fees and the commercial model are stated clearly and agreed before you
          take any work. We distinguish independent contractors, licensed
          operators and any employed roles according to the actual legal
          arrangement, never blurring the two.
        </p>
      </Section>

      {/* Standards & vetting */}
      <Section eyebrowText="Standards and vetting" title="The House vouches for who it lets in." tint image="/services/subbrands/window-cleaner.webp">
        <p style={paraStyle}>
          Being House Approved means customers can trust the person at the door.
          Before you take work, we verify:
        </p>
        <ul style={{ ...plainList, marginTop: 24 }}>
          {standards.map((s) => (
            <li key={s} style={listItem}>
              <span aria-hidden style={bullet}>·</span>
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {/* Tools powered by HoWA — bottom-anchored phone, House brown panel */}
      <section className="relative overflow-hidden" style={{ background: brown }}>
        <div className="hap-tools-grid mx-auto" style={{ maxWidth: 1180, padding: "0 clamp(24px, 5vw, 96px)" }}>
          {/* Copy */}
          <div style={{ padding: "clamp(56px, 7vw, 100px) 0" }}>
            <p style={{ ...eyebrow, color: gold, display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span aria-hidden style={{ width: 36, height: 1, background: gold, opacity: 0.7 }} />
              Tools, powered by HoWA
            </p>
            <h2
              style={{
                fontFamily: display,
                fontWeight: 400,
                fontSize: "clamp(28px, 3.4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "var(--color-house-chalk)",
                margin: "0 0 32px",
                maxWidth: "20ch",
              }}
            >
              Less admin. More of the work you are good at.
            </h2>
            <p style={{ ...paraStyle, color: "rgba(255, 253, 248, 0.82)" }}>
              The House uses HoWA, its booking and home-intelligence system, to take
              the paperwork off your plate. As a House Approved professional you get:
            </p>
            <ul style={{ ...plainList, marginTop: 24 }}>
              {tools.map((t) => (
                <li key={t} style={{ ...listItem, color: "rgba(255, 253, 248, 0.82)" }}>
                  <span aria-hidden style={{ ...bullet, color: gold }}>·</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {/* Phone — anchored to the section's bottom edge so it reads as popping up */}
          <div className="hap-tools-phone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home/howa-app-pro.webp" alt="The HoWA app showing a Home Record and HoWA Score" />
          </div>
        </div>
        <style>{`
          .hap-tools-grid { display: grid; grid-template-columns: 1fr; gap: 0; align-items: end; }
          .hap-tools-phone { display: flex; justify-content: center; align-self: end; }
          .hap-tools-phone img { display: block; width: clamp(230px, 26vw, 330px); height: auto; margin-bottom: -1px; }
          @media (min-width: 900px) {
            .hap-tools-grid { grid-template-columns: 1.05fr 0.95fr; gap: clamp(32px, 4vw, 72px); }
            .hap-tools-phone { justify-content: flex-end; }
          }
        `}</style>
      </section>

      {/* Application steps */}
      <Section eyebrowText="Application steps" title="From apply to your first booking." tint image="/services/subbrands/cleaners.webp">
        <div style={cardGrid}>
          {steps.map((s) => (
            <div key={s.n} style={{ ...card, background: cream }}>
              <span aria-hidden style={{ fontFamily: display, fontSize: 20, color: gold }}>
                {s.n}
              </span>
              <h3 style={{ ...cardHeading, marginTop: 12 }}>{s.h}</h3>
              <p style={cardBody}>{s.b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section eyebrowText="FAQs" title="Questions professionals ask.">
        <div style={{ borderTop: `1px solid ${line}` }}>
          {faqs.map((f) => (
            <div key={f.q} style={{ padding: "24px 0", borderBottom: `1px solid ${line}` }}>
              <h3
                style={{
                  fontFamily: display,
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "clamp(19px, 2vw, 25px)",
                  color: brown,
                  margin: "0 0 12px",
                }}
              >
                {f.q}
              </h3>
              <p style={{ ...cardBody, maxWidth: "62ch" }}>{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Apply form */}
      <section id="apply" className="relative overflow-hidden" style={{ background: creamLight, borderTop: `1px solid ${line}` }}>
        <FlowerWatermark color="gold" side="right" opacity={0.1} />
        <div
          className="relative z-10"
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "clamp(64px, 8vw, 112px) clamp(24px, 5vw, 64px)",
          }}
        >
          <p style={{ ...eyebrow, marginBottom: 16, textAlign: "center" }}>Apply</p>
          <h2
            style={{
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.4vw, 48px)",
              lineHeight: 1.1,
              color: brown,
              margin: "0 0 16px",
              textAlign: "center",
            }}
          >
            Apply to become House Approved.
          </h2>
          <p
            style={{
              ...cardBody,
              textAlign: "center",
              margin: "0 auto 40px",
              maxWidth: "48ch",
            }}
          >
            Send us the essentials and the House team will be in touch. Submitting
            opens your email client so you can review before it sends.
          </p>

          <form
            action={`mailto:${PRO_EMAIL}`}
            method="post"
            encType="text/plain"
            style={{ display: "grid", gap: 24 }}
          >
            <div>
              <label htmlFor="pro-name" style={labelStyle}>
                Your name
              </label>
              <input id="pro-name" name="Name" type="text" required autoComplete="name" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="pro-trade" style={labelStyle}>
                Trade or discipline
              </label>
              <input
                id="pro-trade"
                name="Trade"
                type="text"
                required
                placeholder="For example: gardening, window cleaning, repairs"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="pro-area" style={labelStyle}>
                Service area
              </label>
              <input
                id="pro-area"
                name="Area"
                type="text"
                required
                placeholder="Towns or postcodes you cover"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="pro-email" style={labelStyle}>
                Email
              </label>
              <input id="pro-email" name="Email" type="email" required autoComplete="email" style={inputStyle} />
            </div>
            <button
              type="submit"
              style={{
                minHeight: 48,
                padding: "0 36px",
                background: brown,
                color: "var(--color-house-chalk)",
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                border: `1px solid ${brown}`,
                borderRadius: 0,
                cursor: "pointer",
              }}
            >
              Apply to become House Approved
            </button>
          </form>

          <p style={{ ...cardBody, textAlign: "center", marginTop: 28, fontSize: 14 }}>
            Prefer to write directly? Email{" "}
            <a href={`mailto:${PRO_EMAIL}`} style={{ color: goldDark, textDecoration: "underline" }}>
              {PRO_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

/* ---- inline helpers ------------------------------------------------------ */
const paraStyle: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 17,
  lineHeight: 1.7,
  color: "rgba(48, 35, 28, 0.82)",
  margin: 0,
  maxWidth: "62ch",
};
const cardBody: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 15,
  lineHeight: 1.65,
  color: "rgba(48, 35, 28, 0.78)",
  margin: 0,
};
const cardHeading: React.CSSProperties = {
  fontFamily: display,
  fontWeight: 400,
  fontStyle: "italic",
  fontSize: "clamp(19px, 2vw, 25px)",
  lineHeight: 1.2,
  color: brown,
  margin: "0 0 12px",
};
const cardGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
  gap: 1,
  background: line,
  border: `1px solid ${line}`,
};
const card: React.CSSProperties = {
  background: creamLight,
  padding: "clamp(24px, 3vw, 36px)",
};
const plainList: React.CSSProperties = { listStyle: "none", margin: 0, padding: 0, maxWidth: "62ch" };
const listItem: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 16,
  lineHeight: 1.5,
  color: brown,
  padding: "12px 0",
  borderBottom: `1px solid ${line}`,
  display: "flex",
  gap: 14,
  alignItems: "baseline",
};
const bullet: React.CSSProperties = { color: gold, fontFamily: display };

function Section({
  eyebrowText,
  title,
  children,
  tint,
  image,
  imageSide = "right",
}: {
  eyebrowText: string;
  title: string;
  children: React.ReactNode;
  tint?: boolean;
  image?: string;
  imageSide?: "left" | "right";
}) {
  const copy = (
    <div>
      <p style={{ ...eyebrow, display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <span aria-hidden style={{ width: 36, height: 1, background: goldDark, opacity: 0.7 }} />
        {eyebrowText}
      </p>
      <h2
        style={{
          fontFamily: display,
          fontWeight: 400,
          fontSize: "clamp(28px, 3.4vw, 48px)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: brown,
          margin: "0 0 32px",
          maxWidth: "20ch",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
  const pic = image ? (
    <div className="relative aspect-[4/3] lg:aspect-[5/6] w-full overflow-hidden" style={{ border: `1px solid ${line}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
    </div>
  ) : null;
  return (
    <section style={{ background: tint ? creamLight : cream }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "clamp(56px, 7vw, 100px) clamp(24px, 5vw, 96px)",
        }}
      >
        {image ? (
          <div className="grid gap-10 lg:gap-16 items-center lg:grid-cols-2">
            {imageSide === "left" ? (
              <>
                <div className="lg:order-1">{pic}</div>
                <div className="lg:order-2">{copy}</div>
              </>
            ) : (
              <>
                {copy}
                {pic}
              </>
            )}
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  );
}
