import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service terms",
  description:
    "The terms on which House of Willow Alexander provides and arranges home and garden services, including booking, pricing, cancellation and liability.",
};

const cream = "var(--color-house-cream)";
const brown = "var(--color-house-brown)";
const ink = "var(--color-house-ink)";
const goldDark = "var(--house-gold-dark)";
const line = "var(--color-house-line)";
const display = "var(--font-display)";
const sans = "var(--font-sans)";

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. About these terms",
    body: [
      "These service terms govern your use of the home and garden services booked through House of Willow Alexander (the House). They apply alongside our general terms, privacy policy and cookie policy. By booking a service you agree to these terms.",
      "House of Willow Alexander Ltd is registered in England and Wales, company number 15062693, registered office 12 Hatherley Road, Sidcup, Kent, DA14 4DT. You can reach us at sales@willowalexander.co.uk.",
    ],
  },
  {
    heading: "2. How services are provided",
    body: [
      "Services are delivered by House Approved professionals: independent, vetted tradespeople and service businesses working to the House standard. Where the House arranges a service delivered by a third party, we tell you clearly at the point of booking.",
      "Every professional is verified for identity, relevant qualifications and insurance before working under the House. The House standard sets our expectations for conduct, punctuality and care.",
    ],
  },
  {
    heading: "3. Booking, quotes and surveys",
    body: [
      "For services with clear, fixed pricing you can book and see a price before you confirm. For services where the price depends on the job, we provide a quote or arrange a survey first, and the booking flow says so rather than showing a false total.",
      "The charging basis, per visit, per hour, per team, per item, survey or fixed quote, is shown before you commit. Minimum booking values and any optional extras are stated separately. VAT treatment is not hidden.",
    ],
  },
  {
    heading: "4. Pricing and payment",
    body: [
      "Prices are shown in pounds sterling. Where a final price can vary, we explain exactly what changes it. Payment is taken as described at checkout, which may include an amount due now and an amount due later.",
      "If a payment fails, we will tell you and give you a clear route to resolve it. We do not begin chargeable work without a confirmed booking.",
    ],
  },
  {
    heading: "5. Access and your responsibilities",
    body: [
      "You are responsible for providing safe and reasonable access at the agreed time, and for telling us anything relevant to the visit, such as pets, hazards or parking. Access details you give us are treated as sensitive and stored in your Home Record where you choose to keep them.",
      "If a professional cannot safely or reasonably carry out the work on arrival because access or information was not as described, a call-out or cancellation charge may apply, as set out at booking.",
    ],
  },
  {
    heading: "6. Changes, cancellation and rescheduling",
    body: [
      "You can reschedule or cancel through My House or by contacting the House. The notice period and any charge that applies are shown before you confirm a booking and again in your confirmation.",
      "If we or a professional need to change or cancel a visit, we will let you know as soon as possible and offer a new time or a refund of amounts paid for work not carried out.",
    ],
  },
  {
    heading: "7. Refunds",
    body: [
      "Where a refund is due, we process it to the original payment method. We will tell you the amount and expected timing. Refund status is visible in My House where supported.",
    ],
  },
  {
    heading: "8. Standards, complaints and putting things right",
    body: [
      "If you are not satisfied with a service, tell us. We take complaints seriously and aim to put things right. Contact the House through the help centre or at sales@willowalexander.co.uk and we will respond promptly.",
    ],
  },
  {
    heading: "9. Liability",
    body: [
      "Nothing in these terms excludes or limits our liability where it would be unlawful to do so, including for death or personal injury caused by negligence, or for fraud. Subject to that, our liability in connection with a service is limited to the reasonably foreseeable loss arising from our breach.",
      "The House is not liable for the acts of independent professionals beyond our responsibilities as the party that vetted and arranged the service, except where the law provides otherwise.",
    ],
  },
  {
    heading: "10. Regulated and excluded work",
    body: [
      "Some work is regulated or excluded from what the House offers. Where a discipline requires specific certification, only appropriately qualified professionals carry it out, and we surface excluded tasks clearly on the relevant service page.",
    ],
  },
  {
    heading: "11. Changes to these terms",
    body: [
      "We may update these terms from time to time. The version that applies to your booking is the one in force when you confirm it. Material changes will be highlighted.",
    ],
  },
];

export default function ServiceTermsPage() {
  return <LegalPage eyebrow="Legal · Service terms" title="Service terms." lede="The terms on which the House provides and arranges home and garden services. Please read them alongside our general terms and privacy policy." sections={sections} updatedAt="17 August 2026" />;
}

/* ---- self-contained legal template --------------------------------------- */
function LegalPage({
  eyebrow,
  title,
  lede,
  sections,
  updatedAt,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  sections: { heading: string; body: string[] }[];
  updatedAt: string;
}) {
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
            {eyebrow}
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
            {title}
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
            {lede}
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
            {s.body.map((p, i) => (
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
          Last updated {updatedAt}. See also our{" "}
          <Link href="/legal/terms" style={{ color: goldDark, textDecoration: "underline" }}>
            general terms
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" style={{ color: goldDark, textDecoration: "underline" }}>
            privacy policy
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
