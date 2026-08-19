import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insurance disclosures",
  description:
    "Regulatory disclosures for House of Willow Alexander home and pet cover, including our role as an introducer and the FCA-authorised intermediary.",
};

const cream = "var(--color-house-cream)";
const creamLight = "var(--color-house-cream-light)";
const brown = "var(--color-house-brown)";
const ink = "var(--color-house-ink)";
const goldDark = "var(--house-gold-dark)";
const line = "var(--color-house-line)";
const display = "var(--font-display)";
const sans = "var(--font-sans)";

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. The House's role: introducer only",
    body: [
      "House of Willow Alexander does not provide insurance advice, does not arrange, underwrite or administer insurance, and is not the insurer. For home and pet cover, House of Willow Alexander acts only as an introducer. We introduce customers who are interested in cover to an authorised insurance intermediary, and the regulated activity of arranging your policy is carried out by that intermediary, not by the House.",
      "Because the House acts as an introducer only, we do not assess whether a particular policy is suitable for you. Any advice, recommendation or arrangement of cover is provided by the authorised intermediary named below.",
    ],
  },
  {
    heading: "2. The authorised intermediary",
    body: [
      "Insurance introduced by the House is arranged by Provenance, an insurance intermediary authorised and regulated by the Financial Conduct Authority (FCA). Provenance's Firm Reference Number (FRN) is 804047. You can check this on the FCA Financial Services Register at register.fca.org.uk.",
      "Provenance is responsible for the regulated activities relating to your policy, including arranging cover, providing the required pre-sale information and handling the sale. The terms of your relationship with the intermediary are set out in the documents they provide to you.",
    ],
  },
  {
    heading: "3. Insurer and underwriter",
    body: [
      "Your policy is underwritten by the insurer named in your policy documents and in the pre-sale information provided by the intermediary before you buy. The specific insurer and underwriter depend on the product and are always disclosed to you before purchase.",
      "The House is not the insurer or the underwriter, and does not carry the insurance risk. Do not rely on the House's brand as evidence of who provides your cover; the named insurer in your documents is the authority.",
    ],
  },
  {
    heading: "4. Fees and remuneration",
    body: [
      "As an introducer, the House may receive a fee or commission in connection with introductions to the intermediary. This does not add a charge to the price you pay beyond what is disclosed to you. The intermediary will disclose the nature of any remuneration and any fees that apply to your policy in their own documentation.",
    ],
  },
  {
    heading: "5. What is and is not covered",
    body: [
      "The cover, limits, excesses and exclusions that apply are set out in the policy wording and the insurance product information document provided by the intermediary and insurer. Read these carefully. Exclusions and limitations are never buried, and are summarised in plain language during the quote journey before you buy.",
      "If anything is unclear, ask before you purchase. The intermediary can explain the cover; the House cannot advise you on it.",
    ],
  },
  {
    heading: "6. Making a claim",
    body: [
      "Claims are handled by the insurer or the party named in your policy documents, not by the House. Your documents set out how to make a claim and the contact details to use. Where you keep policy references in My House, we can help you find the right document quickly, but the claim itself is managed by the insurer.",
    ],
  },
  {
    heading: "7. Complaints",
    body: [
      "If you have a complaint about the sale or arrangement of your policy, contact the authorised intermediary using the details in your policy documents. If your complaint concerns the introduction itself, you can contact the House at sales@willowalexander.co.uk.",
      "If you are not satisfied with the response from a regulated firm, you may be able to refer your complaint to the Financial Ombudsman Service. Eligibility and the process are explained in the regulated firm's documentation.",
    ],
  },
  {
    heading: "8. Company details",
    body: [
      "House of Willow Alexander Ltd is registered in England and Wales, company number 15062693, registered office 12 Hatherley Road, Sidcup, Kent, DA14 4DT. Contact: sales@willowalexander.co.uk.",
    ],
  },
];

export default function InsuranceDisclosuresPage() {
  return (
    <article style={{ background: cream, color: ink }}>
      <header style={{ padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 96px) clamp(32px, 4vw, 48px)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: sans,
              fontSize: 13,
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
            Legal · Insurance disclosures
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
            Insurance disclosures.
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
            The regulatory information you need before taking home or pet cover
            introduced by the House.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(16px, 3vw, 40px) clamp(24px, 5vw, 96px) clamp(72px, 8vw, 120px)" }}>
        {/* Key facts panel */}
        <div
          style={{
            background: creamLight,
            border: `1px solid ${line}`,
            padding: "clamp(24px, 3vw, 36px)",
            marginBottom: "clamp(40px, 5vw, 64px)",
          }}
        >
          <p style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(48,35,28,0.6)", margin: "0 0 18px" }}>
            At a glance
          </p>
          <dl style={{ margin: 0 }}>
            {[
              ["The House's role", "Introducer only. Not the insurer, underwriter or adviser."],
              ["Authorised intermediary", "Provenance, authorised and regulated by the FCA."],
              ["FCA Firm Reference Number", "804047 (check at register.fca.org.uk)."],
              ["Insurer / underwriter", "Named in your policy documents before you buy."],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: "12px 0", borderBottom: `1px solid ${line}` }}>
                <dt style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: brown, margin: "0 0 4px", letterSpacing: "0.02em" }}>{k}</dt>
                <dd style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.55, color: "rgba(48,35,28,0.82)", margin: 0 }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

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
            {s.body.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: sans,
                  fontSize: 19,
                  lineHeight: 1.7,
                  color: "rgba(48, 35, 28, 0.82)",
                  margin: "0 0 16px",
                }}
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        <p
          style={{
            fontFamily: sans,
            fontSize: 13,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(48, 35, 28, 0.6)",
            paddingTop: 24,
            borderTop: `1px solid ${line}`,
          }}
        >
          Last updated 17 August 2026. This page is subject to legal and compliance
          review. See also{" "}
          <Link href="/insurance-and-cover" style={{ color: goldDark, textDecoration: "underline" }}>
            Insurance &amp; Cover
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
