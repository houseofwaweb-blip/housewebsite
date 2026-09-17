import Link from "next/link";
import s from "./ask.module.css";
import { V6Cta } from "../V6Sections";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";
import { AskHowaDemo } from "@/components/howa/AskHowaDemo";
import { ScanDoors } from "@/components/howa/scans/ScanDoors";

/**
 * /howa/ask, the free "Ask HoWA" way in (HoWA Free).
 *
 * Ask HoWA is Tier 01: free, useful before you've paid a penny. (Formerly named
 * "Assistant"; the route was /howa/assistant, which now redirects here.) The
 * Companion diagnostic (Ask: photograph -> answer) is its centrepiece, alongside
 * the portrait, the scans, quotes-decoded and the first save. Everything carries
 * upward into HoWA+ and Steward.
 *
 * Section order:
 *   1. Hero, "The house, seen." Start with an address.
 *   2. Stats strip, useful before you've paid a penny
 *   3. What you get free, the Ask HoWA capability cards
 *   4. Ask anything, the Companion in action (six real answers)
 *   5. Testimonial
 *   6. CTA band (olive)
 *   7. Closing, free to start, deepens with HoWA+
 */

export const metadata = {
  title: "Ask HoWA: the house, seen. Free, start with an address.",
  description:
    "The free way into HoWA. The portrait of your home in a minute, Ask HoWA for anything that bothers you, repair, garden and room scans, quotes decoded, and the first save.",
};

const STAT_COLS = [
  { value: "1 min", label: "To the portrait" },
  { value: "Free", label: "To start, no card" },
  { value: "100%", label: "Private to your record" },
  { value: "0", label: "Jargon" },
];

const CAPABILITIES = [
  {
    n: "I.",
    title: "The portrait",
    body:
      "Start with an address. Age, build, energy, ground and flood, gathered into a picture of your home in about a minute.",
  },
  {
    n: "II.",
    title: "The scans",
    body:
      "Repair, garden and room. Photograph what you've noticed; get what it is, how urgent it is, and what to do first.",
  },
  {
    n: "III.",
    title: "Quotes, decoded",
    body:
      "Send a quote or invoice. Ask HoWA reads it back in plain words, what it covers, and what's fair to ask.",
  },
  {
    n: "IV.",
    title: "The first save",
    body:
      "One tap and the record begins. Everything you ask and save stays in your home's private history, and carries upward as you grow.",
  },
];

export default async function AssistantPage() {
  const sections = await getPageSections("howa-assistant");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const capabilities = sections.get("capabilities");
  const quote = sections.get("quote");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const capabilityCards = cmsCards(capabilities, CAPABILITIES, (c, base) => ({
    n: pick(c.label, base?.n ?? ""),
    title: pick(c.title, base?.title ?? ""),
    body: pick(c.body, base?.body ?? ""),
  }));

  return (
    <div className={s.page}>
      <MetaViewContent
        contentId="howa_assistant"
        contentName="Ask HoWA"
        contentCategory="howa_tier"
      />
      {/* 1. Hero — the interactive "Ask the home, not the internet" demo (brief §6.4) */}
      <section className="bg-house-cream-dark px-6 py-[clamp(48px,7vw,88px)] md:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          <p className="flex items-center gap-3 font-sans text-[12px] uppercase tracking-[0.28em] text-house-gold-dark">
            <span aria-hidden="true" className="h-px w-8 bg-house-gold-dark/60" />
            {cms(hero, "eyebrow", "Ask HoWA")}
          </p>
          <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(36px,5vw,64px)] leading-[1.0] text-house-black">
            {cms(hero, "headline", "Ask the home, not the internet.")}
          </h1>
          <p className="mt-5 max-w-[60ch] font-sans text-[19px] leading-[1.55] text-house-brown/80">
            {cms(
              hero,
              "body",
              "Ask HoWA a question and it can use what it knows about the property, its documents and history, plus the household's context, to produce a clearer answer and next step.",
            )}
          </p>

          {/* The promised sequence, shown literally */}
          <ul className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 p-0">
            {["Question", "Context", "Answer", "Source", "Confidence", "Next action", "Saved to the home"].map((step, i, arr) => (
              <li key={step} className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.16em] text-house-brown/70">
                <span className="border border-house-brown/20 bg-house-cream px-2.5 py-1">{step}</span>
                {i < arr.length - 1 ? <span aria-hidden="true" className="text-house-gold-dark">→</span> : null}
              </li>
            ))}
          </ul>

          {/* The scripted, illustrative demo */}
          <div className="mt-9">
            <AskHowaDemo />
          </div>

          {/* You might ask */}
          <div className="mt-8">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-house-sage">You might ask</p>
            <ul className="mt-3 flex flex-wrap gap-2 p-0">
              {["Is this damp likely to be condensation?", "Is this builder's quote reasonable?", "What should happen before winter?", "Is the boiler still under warranty?"].map((q) => (
                <li key={q} className="border border-house-brown/15 bg-house-cream px-3.5 py-2 font-sans text-[14px] leading-none text-house-brown/80">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Useful before you've paid a penny.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Not a vault, a manager, or a discount club.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. What you get, free */}
      <section className={s.steps}>
        <header className={s.stepsHead}>
          <p className={s.stepsEy}>{cms(capabilities, "eyebrow", "What you get, free")}</p>
          <h2 className={s.stepsTitle}>
            {cms(capabilities, "headline", "Everything the")}{" "}
            <em>{cms(capabilities, "headlineEm", "Ask HoWA does.", "headline")}</em>
          </h2>
        </header>
        <div className={s.stepsGrid}>
          {capabilityCards.map((cap) => (
            <article key={cap.n} className={s.stepCard}>
              <p className={s.stepNumber}>{cap.n}</p>
              <h3 className={s.stepTitle}>{cap.title}</h3>
              <p className={s.stepBody}>{cap.body}</p>
            </article>
          ))}
        </div>
        <div className={s.ctaRow}>
          <p className={s.ctaRowText}>Free to start, no card needed.</p>
          <Link href="/howa/coming-soon?tier=assistant" className={s.btnFilled}>
            Start with an address
          </Link>
        </div>
      </section>

      {/* 4. Five useful doors — each scan opens as a pop-up (brief §6.5) */}
      <section className="bg-house-white px-6 py-[clamp(56px,7vw,88px)] md:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          <p className="flex items-center gap-3 font-sans text-[12px] uppercase tracking-[0.28em] text-house-gold-dark">
            <span aria-hidden="true" className="h-px w-8 bg-house-gold-dark/60" />
            Five useful doors
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(30px,3.6vw,48px)] leading-[1.04] text-house-brown">
            Start with the question in front of you.
          </h2>
          <p className="mt-4 max-w-[60ch] font-sans text-[17px] leading-[1.6] text-house-brown/75">
            Bring a photo, a quote or a document. Open a tool to watch it resolve into a useful first read and a clearer next step. Where the evidence is incomplete, it says so.
          </p>
          <ScanDoors />
        </div>
      </section>

      {/* 5. Testimonial */}
      <section className={s.quoteSection}>
        <figure className={s.quote}>
          <blockquote>
            {cms(
              quote,
              "body",
              "I photograph everything now. Ask HoWA told me the crack above the kitchen door was settlement, not structural. Saved me a surveyor's call-out fee and a week of worry.",
            )}
          </blockquote>
          <figcaption>
            <strong>{cms(quote, "headline", "David R.")}</strong>{" "}
            · {cms(quote, "subheadline", "2-bed cottage, Oxfordshire")}
          </figcaption>
        </figure>
      </section>

      {/* 6. CTA band (askhowa olive strip) */}
      <V6Cta />

      {/* 7. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>{cms(closing, "eyebrow", "Ask HoWA is free. It deepens with HoWA+.")}</p>
        <p className={s.closingStatement}>
          <em>{cms(closing, "headlineEm", "The first honest conversation with your house.", "headline")}</em>
        </p>
        <p className={s.closingSub}>
          {cms(
            closing,
            "body",
            "Your photos and notes are stored in your private record, encrypted, never shared, never used to train public models. Everything you save here carries upward, stepping up never starts you over.",
          )}
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "/howa/coming-soon?tier=assistant")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Start free with an address")}
          </Link>
        </div>
      </section>
    </div>
  );
}
