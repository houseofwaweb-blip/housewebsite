import Image from "next/image";
import Link from "next/link";
import s from "./faq.module.css";
import { FaqList } from "@/components/marketing/FaqList";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /howa/faq, HoWA FAQ.
 *
 * Section order:
 *   1. Hero, book still-life right, copy left, beige tone
 *   2. Stats strip, what's covered
 *   3. Topic sections, Getting started · Price & billing · Assistant ·
 *      Steward · Your home & account · Privacy & data · Member pricing
 *   4. Closing, write to the House
 */

export const metadata = {
  title: "HoWA FAQ: What people usually ask",
  description:
    "Answers to the things people ask about HoWA+ and Steward, pricing, cancellation, privacy, the Assistant.",
};

const STAT_COLS = [
  { value: "7", label: "Topics covered" },
  { value: "20+", label: "Common questions" },
  { value: "0", label: "Hidden detail" },
  { value: "1", label: "Email away" },
];

const SECTIONS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "Getting started",
    items: [
      {
        q: "Who is HoWA for?",
        a: "Anyone who lives in a home they mean to keep. You don't need to be commissioning a designer or booking a gardener to get value, the record and the Assistant work on day one.",
      },
      {
        q: "When does HoWA+ open?",
        a: "HoWA+ opens alongside the new site. If you arrive before the product app is reachable, “Start HoWA” routes to a waitlist and we'll write the moment it opens.",
      },
    ],
  },
  {
    heading: "Price & billing",
    items: [
      {
        q: "How much is HoWA+?",
        a: "£16.99 a month, VAT inclusive. No annual contract, cancel at the next billing date. Steward is £29.99 a month; Managed Stewardship, the bespoke layer for larger homes, is by application.",
      },
      {
        q: "Can I cancel?",
        a: "Any time, from your account. The record of your home stays with you either way, export it, or keep a downgraded free account.",
      },
      {
        q: "Do you offer refunds?",
        a: "We refund the current month in full if you cancel within the first 14 days of a new subscription. After that, cancellations take effect at the next billing date.",
      },
    ],
  },
  {
    heading: "The Assistant",
    items: [
      {
        q: "How accurate is the Assistant?",
        a: "Useful for the 80% of home issues that recur across British housing stock. It will tell you when it isn't confident, and route you to a surveyor or trade when it should. It's a diagnostic, not a replacement for qualified eyes on site.",
      },
      {
        q: "What happens to the photos I upload?",
        a: "Stored encrypted in your private record. We don't sell, share, or train public models on them. Used only to generate your answer and kept for reference in your record unless you delete them.",
      },
    ],
  },
  {
    heading: "Steward",
    items: [
      {
        q: "When does Steward open?",
        a: "Soon after HoWA+. We're starting with waitlist customers so we can set scheduling and cadence honestly. Register interest on the plans page.",
      },
      {
        q: "What does Steward cost?",
        a: "£29.99 a month: the HoWA Score and risk register, predictive maintenance, evidence packs and an Annual Home Report. Managed Stewardship, the bespoke layer for larger homes and estates that need human coordination, is priced individually and offered by application.",
      },
      {
        q: "Is Steward insurance?",
        a: "No. Steward is not insurance and does not provide regulated advice. It helps build evidence, reminders and readiness so the home is better understood, maintained and documented.",
      },
    ],
  },
  {
    heading: "Your home & account",
    items: [
      {
        q: "Can I use HoWA for more than one home?",
        a: "At launch, HoWA supports one home per account. Multiple homes are on the Steward roadmap. If you have a second property now, register interest and we'll prioritise you when it opens.",
      },
      {
        q: "Can my partner or family access HoWA?",
        a: "Yes. You can invite collaborators to your home record at no extra cost. Each person gets their own login but sees the same record.",
      },
      {
        q: "What happens if I sell my home?",
        a: "The record belongs to you, not the house. You can export it as a PDF or hand it to the buyer as a provenance document. If the buyer joins HoWA, we can transfer the record to their account with your permission.",
      },
      {
        q: "If I cancel HoWA+, do I lose my data?",
        a: "No. Your record stays with you on the free tier. You lose access to the Assistant, member pricing, and The Hearth, but the record of everything done to your home is yours to keep or export.",
      },
    ],
  },
  {
    heading: "Privacy & data",
    items: [
      {
        q: "Where is my data stored?",
        a: "UK and EU servers, subject to UK GDPR. We minimise what we collect, keep audit trails on who accessed your record, and never sell personal data.",
      },
      {
        q: "What happens to the photos I upload to the Assistant?",
        a: "Stored encrypted in your private record. We don't sell, share, or train public models on them. Used only to generate your Assistant answer and kept for reference unless you delete them.",
      },
      {
        q: "Can I export my data?",
        a: "Yes. You can export your full home record as a PDF or structured JSON at any time from your account settings. The record is yours.",
      },
    ],
  },
  {
    heading: "Member pricing & services",
    items: [
      {
        q: "How much do HoWA+ members save?",
        a: "Typically 10–15% off service bookings vs. calling direct, plus 10% off everything in the House shop. A single gutter clear and window clean often covers the monthly fee.",
      },
      {
        q: "What is The Hearth?",
        a: "The Hearth is our editorial publication for HoWA+ members. Weekly writing on homes, gardens, design, seasonal care, and the craft of looking after a place properly.",
      },
    ],
  },
];

export default async function FaqPage() {
  const sections = await getPageSections("howa-faq");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));

  return (
    <div className={s.page}>
      <MetaViewContent
        contentId="howa_faq"
        contentName="HoWA FAQ"
        contentCategory="howa_marketing"
      />
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "HoWA FAQ")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "What people")}{" "}
              <em>{cms(hero, "headlineEm", "usually", "headline")}</em>{" "}
              {cms(hero, "subheadline", "ask.")}
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "Questions grouped by topic, pricing, cancellation, privacy, the Assistant, the Steward roadmap. If yours isn't here, write to us; and if enough people ask the same one, it ends up on this page.",
              )}
            </p>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={cms(hero, "imageUrl", "/home-v4/v6-review-house-v2.webp")}
            alt={cms(
              hero,
              "imageAlt",
              "A warmly lit cutaway Georgian dollhouse, each room furnished, on a soft single-colour ground.",
            )}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Direct answers. No throat-clearing.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Everything you'd want to know before you start.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Topic sections */}
      <div className={s.topics}>
        {SECTIONS.map((section, i) => (
          <section
            key={section.heading}
            className={`${s.topicSection} ${i % 2 === 1 ? s.topicAlt : ""}`}
          >
            <div className={s.topicInner}>
              <header className={s.topicHead}>
                <p className={s.topicEy}>0{i + 1}</p>
                <h2 className={s.topicTitle}>{section.heading}</h2>
              </header>
              <div className={s.topicBody}>
                <FaqList items={section.items} />
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 4. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>{cms(closing, "eyebrow", "Still wondering?")}</p>
        <p className={s.closingStatement}>
          <em>{cms(closing, "headlineEm", "Write to the House.", "headline")}</em>
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "/contact")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Contact us")}
          </Link>
          <Link href={cms(closing, "cta2Href", "/api/howa-bounce")} className={s.closingBtnGhost}>
            {cms(closing, "cta2Label", "Join the waitlist")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
