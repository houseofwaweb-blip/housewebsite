import Link from "next/link";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";

/**
 * /howa — the HoWA bridge (Final Master Directive, Part IV).
 *
 * One job: explain what HoWA is, provide a useful address-first start, and
 * introduce the only two paid continuity levels WITHOUT duplicating the deeper
 * product site (howa.co.uk). Concise on purpose. Assistant is retired as a
 * public tier: free is simply HoWA.
 */

export const metadata = {
  title: { absolute: "HoWA | Your home, understood" },
  description:
    "Start with an address and HoWA begins a living portrait of the home: what is known, what is missing, what may be due and what matters next. The Home Record and HoWA Score, powered by House of HoWA.",
};

const FIRST_MINUTE = [
  "Enter your postcode or address, with a clear explanation of how the data is used.",
  "Confirm the property match, and correct it if needed.",
  "See a first portrait of the home from public and property data and your own facts, each clearly distinguished.",
  "See an initial, explainable example Score, never a decorative 0/100.",
  "Take one high-value next action: add a document, confirm a service date, check a risk or save a room.",
  "Create an account at the moment you want to save, not before the first useful result.",
];

const WHAT_MATTERS = ["Boiler service · due in 14 days", "Gutter clean · before winter", "Smoke alarms · tested OK"];

const SUBS = [
  {
    name: "HoWA Housekeeper",
    price: "£16.99",
    tag: "The house, in order.",
    body: "Filing at volume, reminders, household rhythm, cost memory, sharing and the Monthly Brief.",
    href: "/household/housekeeper",
    btn: "#c17a5f",
  },
  {
    name: "HoWA Steward",
    price: "£29.99",
    tag: "The house, protected before failure.",
    body: "A deeper risk view, evidence packs, annual report, transfer readiness and supported Butler control.",
    href: "/household/steward",
    btn: "#c9a84a",
  },
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-ink hover:text-house-gold-ink";

export default function HowaPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      <MetaViewContent contentId="howa_bridge" contentName="HoWA bridge" contentCategory="howa_marketing" />

      {/* Hero */}
      <section className="px-[5vw] pt-20 pb-14 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">HoWA · The Home Operating System</p>
        <h1 className="font-display text-[clamp(40px,5.6vw,80px)] leading-[1.02] tracking-[-0.01em] text-house-black">
          Your home, <em className="italic">understood.</em>
        </h1>
        <p className="font-sans text-[19px] leading-[1.65] text-house-brown/82 mt-7 max-w-[58ch]">
          Start with the address and HoWA begins a living portrait of the home: what is known, what is missing, what may
          be due and what deserves attention next.
        </p>
        <p className="font-sans text-[17px] leading-[1.65] text-house-brown/75 mt-4 max-w-[58ch]">
          The Home Record keeps documents, work, assets, decisions, costs and proof against the address. The HoWA Score
          makes the state of the home visible and explainable.
        </p>
        <p className="font-display italic text-[clamp(18px,2vw,24px)] leading-[1.4] text-house-brown/85 mt-6 max-w-[46ch]">
          Free is simply HoWA. Housekeeper keeps the rhythm. Steward protects the long view. Every level deepens the
          same record.
        </p>
        <div className="mt-9"><Link href="/howa" className={ctaPrimary}>Start with my address</Link></div>
      </section>

      {/* The first minute */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-[clamp(26px,3.2vw,42px)] leading-[1.12] text-house-black mb-3">The first minute.</h2>
          <p className="font-sans text-[17px] leading-[1.6] text-house-brown/75 max-w-[56ch] mb-10">
            Useful before you have paid a penny, or created an account.
          </p>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FIRST_MINUTE.map((step, i) => (
              <li key={i} className="border-t border-house-brown/15 pt-4">
                <span className="font-sans text-[12px] tracking-[0.14em] uppercase text-house-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-sans text-[15px] leading-[1.6] text-house-brown/80 mt-2">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The HoWA Score */}
      <section className="px-[5vw] py-16 max-w-[1240px] mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">The HoWA Score</p>
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-black max-w-[18ch] mb-5">
            One number, always explained.
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[52ch] mb-4">
            The Score shows what is known, what is missing and what needs attention. Every number can be explained,
            every factor separated into known and inferred, and every gap corrected.
          </p>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[52ch]">
            A Score without an action loop is a vanity number. HoWA always shows the next useful step.
          </p>
          <div className="mt-8"><Link href="/howa-score" className={ctaSecondary}>How the Score works →</Link></div>
        </div>
        {/* example overview card */}
        <div className="howa-surface">
          <div className="rounded-2xl bg-house-white text-house-brown overflow-hidden border border-house-brown/10 shadow-[0_24px_60px_-34px_rgba(40,30,15,0.4)]">
            <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-house-brown/10">
              <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-gold-ink">HoWA Home Overview</p>
              <p className="font-sans text-[10px] tracking-[0.1em] uppercase text-house-stone">Example</p>
            </div>
            <div className="flex items-center gap-4 px-5 py-4 border-b border-house-brown/10">
              <div className="relative w-[76px] h-[76px] shrink-0">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(48,35,28,0.12)" strokeWidth="9" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-house-gold-dark)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 52 * 0.76} ${2 * Math.PI * 52}`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-[26px] leading-none text-house-black">76</span>
                  <span className="font-sans text-[8px] tracking-[0.12em] uppercase text-house-stone mt-0.5">of 100</span>
                </div>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-stone mb-0.5">HoWA Score</p>
                <p className="font-display text-[26px] leading-none text-house-black">76<span className="font-sans text-[12px] text-house-stone ml-1.5">/ 100</span></p>
                <p className="font-sans text-[12.5px] text-house-brown/75 mt-1">In order, with gaps</p>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-gold-ink mb-2.5">What matters first</p>
              <ul className="grid gap-2">
                {WHAT_MATTERS.map((w) => (
                  <li key={w} className="flex items-center gap-2.5 rounded-lg bg-house-cream-dark/70 border border-house-brown/8 px-3 py-2">
                    <span className="is-round w-1.5 h-1.5 shrink-0 bg-house-gold-dark" aria-hidden />
                    <span className="font-sans text-[13px] text-house-brown">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-5 py-3 border-t border-house-brown/10">
              <p className="font-sans text-[12.5px] leading-[1.5] text-house-brown/80">
                <span className="font-medium text-house-black">Next action:</span> book the boiler service before winter, and save the certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Home Record */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[820px] mx-auto text-center">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">The Home Record</p>
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-black mb-6">
            A home&apos;s useful memory should not live in one person&apos;s inbox.
          </h2>
          <p className="font-sans text-[18px] leading-[1.7] text-house-brown/82 mb-8">
            The Home Record keeps the work, documents, assets, warranties, costs, photographs and decisions connected to
            the address. When responsibility changes, the history does not have to disappear.
          </p>
          <Link href="/howa" className={ctaPrimary}>Begin my Home Record</Link>
        </div>
      </section>

      {/* The only two subscriptions */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">Membership</p>
        <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-black max-w-[20ch] mb-10">
          Two levels of continuity. One record beneath them.
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {SUBS.map((sub) => (
            <div key={sub.name} className="border border-house-brown/12 bg-house-white p-8">
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <h3 className="font-display text-[26px] leading-none text-house-black">{sub.name}</h3>
                <span className="font-display text-[26px] leading-none text-house-black">{sub.price}<span className="font-sans text-[13px] text-house-stone">/mo</span></span>
              </div>
              <p className="font-display italic text-[18px] leading-[1.35] mb-3" style={{ color: sub.btn }}>{sub.tag}</p>
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/78 mb-5">{sub.body}</p>
              <p className="font-sans text-[12px] tracking-[0.02em] text-house-stone mb-6">Opens when the stated functions are live.</p>
              <Link href={sub.href} className={ctaSecondary}>See {sub.name.replace("HoWA ", "")} →</Link>
            </div>
          ))}
        </div>
        <p className="font-sans text-[13.5px] leading-[1.6] text-house-stone mt-8 max-w-[70ch]">
          The subscription pays for the software, intelligence, continuity and member benefits. Service visits are
          booked and paid separately through HoWA. £16.99 or £29.99 does not include gardening, cleaning or other visits.
        </p>
      </section>

      {/* A system that compounds */}
      <section className="px-[5vw] py-16 bg-house-black text-house-cream border-t border-house-brown/20">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-cream mb-8">A system that compounds.</h2>
          <div className="grid gap-6 sm:grid-cols-3 text-left mb-10">
            {[
              { k: "Day one", d: "The home introduces itself." },
              { k: "The first year", d: "HoWA remembers the work, costs, documents and decisions that would otherwise scatter." },
              { k: "Over time", d: "The record becomes useful enough to arrange the next action with better context." },
            ].map((c) => (
              <div key={c.k} className="border-t border-house-cream/20 pt-4">
                <p className="font-sans text-[12px] tracking-[0.14em] uppercase text-house-gold-light mb-2">{c.k}</p>
                <p className="font-sans text-[15px] leading-[1.6] text-house-cream/80">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/howa" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-black bg-house-gold-light border border-house-gold-light px-6 py-3 no-underline hover:brightness-105 transition-[filter]">Start with my address</Link>
            <Link href="/howa/plans" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-light hover:text-house-gold-light">Explore Housekeeper &amp; Steward</Link>
          </div>
          <p className="font-sans text-[13px] leading-[1.6] text-house-cream/55 mt-10 max-w-[64ch] mx-auto">
            The deeper product, methodology, screenshots, privacy and membership checkout live at howa.co.uk. Both sites
            share the same record, price, product status and sign-in, so you never create two Home Records.
          </p>
        </div>
      </section>
    </div>
  );
}
