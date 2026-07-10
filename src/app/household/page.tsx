import Link from "next/link";
import Image from "next/image";
import { HouseholdDoors } from "@/components/marketing/HouseholdDoors";

/**
 * /household — The Household (launch read section 6).
 * Layout + imagery aligned to the askhowa HoWA reference prototype (cutaway
 * dollhouse illustrations, per-role colour accents, rounded cards, image-
 * overlaid paid tiers) while keeping the launch-read copy and the House palette.
 * Seven roles incl. the Archivist, per the docx spec.
 */

export const metadata = {
  title: "The Household by HoWA | Seven ways into one home record",
  description:
    "Meet the Household: familiar specialist roles that help your home remember, stay in rhythm and protect what matters.",
};

const PAID_DEPTHS = [
  {
    role: "The Housekeeper",
    price: "£16.99/mo",
    img: "/howa/household/housekeeper.webp",
    btn: "#c17a5f",
    forLine: "For the household that wants everything kept in rhythm.",
    line: "Housekeeper keeps documents, tasks, reminders, service history and the monthly home rhythm together.",
    cta: "Employ the Housekeeper",
    href: "/howa/housekeeper",
  },
  {
    role: "The Steward",
    price: "£29.99/mo",
    img: "/howa/household/steward.webp",
    btn: "#c9a84a",
    forLine: "For the homeowner who wants the asset watched, protected and properly evidenced over time.",
    line: "Steward is the long-view intelligence layer: Score, risk watch, evidence, annual report and future planning.",
    cta: "Protect the home",
    href: "/howa/steward",
  },
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-gold-ink hover:text-house-gold-ink";

export default function HouseholdPage() {
  return (
    <div className="howa-surface bg-house-cream text-house-brown">
      {/* Hero — full width, text left, image right */}
      <section className="relative grid lg:grid-cols-2 border-b border-house-brown/8">
        <div className="flex flex-col justify-center px-[5vw] py-20 lg:py-24 lg:pr-14">
          <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">
            HoWA · The Household
          </p>
          <h1 className="font-display text-[clamp(42px,5.4vw,80px)] leading-[1.02] tracking-[-0.01em] text-house-black max-w-[13ch]">
            Your home has <em className="italic">staff now.</em>
          </h1>
          <p className="font-sans text-[18px] leading-[1.65] text-house-brown/80 mt-7 max-w-[48ch]">
            One voice. Seven specialist duties. One memory. You do not pick bots.
            You ask HoWA, and the right duty works behind it, using familiar roles
            to make home intelligence feel simple, useful and human.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/howa/assistant" className={ctaPrimary}>
              Start with a specialist
            </Link>
            <Link href="/howa/plans" className={ctaSecondary}>
              See how the record works
            </Link>
          </div>
        </div>
        <div className="relative min-h-[52vh] lg:min-h-full bg-house-cream-dark">
          <Image
            src="/howa/household-hero.webp"
            alt="The House of HoWA Household: seven specialist roles behind one home"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Free doors */}
      <section className="px-[5vw] py-16 max-w-[1360px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-3">
          The free doors
        </p>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/80 max-w-[70ch] mb-10">
          The five doors below are free because they solve real household moments.
          The Housekeeper and Steward are the two you employ when the home needs
          continuity.
        </p>
        <HouseholdDoors />
      </section>

      {/* The two you employ */}
      <section className="px-[5vw] pb-20 max-w-[1360px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-6">
          The two you employ
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {PAID_DEPTHS.map((d) => (
            <Link
              key={d.role}
              href={d.href}
              className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl no-underline"
            >
              <Image
                src={d.img}
                alt={d.role}
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,14,10,0.86) 0%, rgba(20,14,10,0.35) 45%, rgba(20,14,10,0.05) 75%)",
                }}
              />
              <div className="relative p-8 text-white">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-display text-[clamp(28px,3vw,38px)] leading-none">
                    {d.role}
                  </h3>
                  <span className="font-sans text-[15px] tracking-[0.02em] text-white/90 whitespace-nowrap">
                    {d.price}
                  </span>
                </div>
                <p className="font-display italic text-[16px] leading-[1.4] text-white/85 mb-3 max-w-[44ch]">
                  {d.forLine}
                </p>
                <p className="font-sans text-[15px] leading-[1.55] text-white/80 mb-5 max-w-[48ch]">
                  {d.line}
                </p>
                <span
                  className="inline-block rounded-xl px-5 py-3 font-sans text-[13px] font-medium text-house-black transition-[filter] group-hover:brightness-105"
                  style={{ background: d.btn }}
                >
                  {d.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* One Home Record */}
      <section className="px-[5vw] pt-16 pb-10 max-w-[1100px] mx-auto text-center">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
          One Home Record
        </p>
        <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.12] text-house-black max-w-[24ch] mx-auto">
          Everything any member learns writes back to the same place:{" "}
          <em className="italic">your home&apos;s memory.</em>
        </h2>
      </section>
      <div className="relative w-full aspect-[16/9] bg-house-cream">
        <Image
          src="/howa/household-lineup.webp"
          alt="The Household: seven cutaway houses, one shared home record"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <section className="px-[5vw] py-16 max-w-[760px] mx-auto text-center">
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80">
          You never manage the Household. You talk to HoWA, one calm voice, and
          notice things are handled. Every journey should save, remind, book,
          plan or protect.
        </p>
        <div className="mt-8">
          <Link
            href="/howa/assistant"
            className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-7 py-3 no-underline hover:brightness-110 transition-[filter]"
          >
            Ask HoWA now →
          </Link>
        </div>
      </section>
    </div>
  );
}
