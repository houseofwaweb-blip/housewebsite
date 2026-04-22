import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Accordion } from "@/components/primitives/Accordion";

/**
 * /howa/faq — HoWA frequently asked.
 * Pure Accordion page; questions authored here for launch, migrate to
 * Sanity `faq` docs once content is ready (query `*[_type == "faq" && "howa" in category]`).
 */

export const metadata = {
  title: "HoWA FAQ",
  description:
    "Answers to the things people ask about HoWA+ and Steward — pricing, cancellation, privacy, the Companion.",
};

const SECTIONS: {
  heading: string;
  items: { id: string; summary: React.ReactNode; body: React.ReactNode }[];
}[] = [
  {
    heading: "Getting started",
    items: [
      {
        id: "who",
        summary: "Who is HoWA for?",
        body: (
          <p>
            Anyone who lives in a home they mean to keep. You don&apos;t need
            to be commissioning a designer or booking a gardener to get value
            — the record and the Companion work on day one.
          </p>
        ),
      },
      {
        id: "open",
        summary: "When does HoWA+ open?",
        body: (
          <p>
            HoWA+ opens alongside the new site. If you arrive before the
            product app is reachable, &ldquo;Start HoWA&rdquo; routes to a
            waitlist and we&apos;ll write the moment it opens.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Price & billing",
    items: [
      {
        id: "price",
        summary: "How much is HoWA+?",
        body: (
          <p>
            £16.99 a month, VAT inclusive. No annual contract — cancel at the
            next billing date. Steward Plans are priced individually and built
            with you.
          </p>
        ),
      },
      {
        id: "cancel",
        summary: "Can I cancel?",
        body: (
          <p>
            Any time, from your account. The record of your home stays with you
            either way — export it, or keep a downgraded free account.
          </p>
        ),
      },
      {
        id: "refund",
        summary: "Do you offer refunds?",
        body: (
          <p>
            We refund the current month in full if you cancel within the first
            14 days of a new subscription. After that, cancellations take
            effect at the next billing date.
          </p>
        ),
      },
    ],
  },
  {
    heading: "The Companion",
    items: [
      {
        id: "accuracy",
        summary: "How accurate is the Companion?",
        body: (
          <p>
            Useful for the 80% of home issues that recur across British housing
            stock. It will tell you when it isn&apos;t confident, and route you
            to a surveyor or trade when it should. It&apos;s a diagnostic, not
            a replacement for qualified eyes on site.
          </p>
        ),
      },
      {
        id: "privacy",
        summary: "What happens to the photos I upload?",
        body: (
          <p>
            Stored encrypted in your private record. We don&apos;t sell, share,
            or train public models on them. Used only to generate your answer
            and kept for reference in your record unless you delete them.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Steward",
    items: [
      {
        id: "steward-when",
        summary: "When do Steward plans open?",
        body: (
          <p>
            Soon after HoWA+. We&apos;re starting with waitlist customers so we
            can set scheduling and cadence honestly — no overselling the
            capacity of our trades. Register interest on the{" "}
            <Link
              href="/howa/plans"
              className="text-house-brown underline decoration-house-gold underline-offset-4"
            >
              plans page
            </Link>
            .
          </p>
        ),
      },
      {
        id: "steward-cost",
        summary: "What will a Steward plan cost?",
        body: (
          <p>
            It depends on the services included and the size of the home — a
            two-bedroom flat with window and cleaning care looks very
            different from a five-bedroom Edwardian with gardens. We&apos;ll
            build a quote with you.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Your home & account",
    items: [
      {
        id: "multiple-homes",
        summary: "Can I use HoWA for more than one home?",
        body: (
          <p>
            At launch, HoWA supports one home per account. Multiple homes
            are on the Steward roadmap. If you have a second property now,
            register interest and we&apos;ll prioritise you when it opens.
          </p>
        ),
      },
      {
        id: "family",
        summary: "Can my partner or family access HoWA?",
        body: (
          <p>
            Yes. You can invite collaborators to your home record at no extra
            cost. Each person gets their own login but sees the same record.
          </p>
        ),
      },
      {
        id: "selling",
        summary: "What happens if I sell my home?",
        body: (
          <p>
            The record belongs to you, not the house. You can export it as a
            PDF or hand it to the buyer as a provenance document. If the buyer
            joins HoWA, we can transfer the record to their account with your
            permission.
          </p>
        ),
      },
      {
        id: "downgrade",
        summary: "If I cancel HoWA+, do I lose my data?",
        body: (
          <p>
            No. Your record stays with you on the free tier. You lose access
            to the Companion, member pricing, and The Hearth, but the record
            of everything done to your home is yours to keep or export.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Privacy & data",
    items: [
      {
        id: "gdpr",
        summary: "Where is my data stored?",
        body: (
          <p>
            UK and EU servers, subject to UK GDPR. We minimise what we collect,
            keep audit trails on who accessed your record, and never sell
            personal data. Our{" "}
            <Link
              href="/legal/privacy"
              className="text-house-brown underline decoration-house-gold underline-offset-4"
            >
              privacy page
            </Link>{" "}
            has the detail.
          </p>
        ),
      },
      {
        id: "photos",
        summary: "What happens to the photos I upload?",
        body: (
          <p>
            Stored encrypted in your private record. We don&apos;t sell, share,
            or train public models on them. Used only to generate your Companion
            answer and kept for reference unless you delete them.
          </p>
        ),
      },
      {
        id: "export",
        summary: "Can I export my data?",
        body: (
          <p>
            Yes. You can export your full home record as a PDF or structured
            JSON at any time from your account settings. The record is yours.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Member pricing & services",
    items: [
      {
        id: "savings",
        summary: "How much do HoWA+ members save?",
        body: (
          <p>
            Typically 10-15% off service bookings vs. calling direct, plus
            10% off everything in the House shop. A single gutter clear
            and window clean often covers the monthly fee.
          </p>
        ),
      },
      {
        id: "hearth",
        summary: "What is The Hearth?",
        body: (
          <p>
            The Hearth is our editorial publication for HoWA+ members.
            Weekly writing on homes, gardens, design, seasonal care, and
            the craft of looking after a place properly. Published at{" "}
            <Link
              href="/journal"
              className="text-house-brown underline decoration-house-gold underline-offset-4"
            >
              /journal
            </Link>
            .
          </p>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-[12vh] pb-10">
        <div className="max-w-[760px] mx-auto">
          <Eyebrow>HoWA FAQ</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(40px,5.5vw,72px)] leading-[1.05] tracking-[-0.01em] mt-4">
            What people <em>usually</em> ask.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            Questions grouped by topic. If yours isn&apos;t here, write to us —
            and if enough people ask the same one, it ends up on this page.
          </p>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section
          key={section.heading}
          className="px-[5vw] py-12 border-t border-house-brown/10 bg-white even:bg-house-cream"
        >
          <div className="max-w-[760px] mx-auto">
            <Eyebrow>{section.heading}</Eyebrow>
            <div className="mt-6">
              <Accordion items={section.items} />
            </div>
          </div>
        </section>
      ))}

      <section className="px-[5vw] py-16 bg-house-brown text-house-cream text-center">
        <div className="max-w-[640px] mx-auto">
          <p className="font-sans italic text-[19px] leading-[1.5]">
            Still unsure? Write to the House.
          </p>
          <div className="mt-5">
            <Link
              href="/contact"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown bg-house-cream border border-house-cream px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light hover:text-white"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
