import Link from "next/link";
import Image from "next/image";

/**
 * /household — The Household (launch read section 6).
 * Seven familiar roles are the human way into HoWA. Customers ask HoWA; the
 * Household works behind it. Following the docx spec (seven roles incl. the
 * Archivist), not the six in the older canon deck.
 */

export const metadata = {
  title: "The Household by HoWA | Seven ways into one home record",
  description:
    "Meet the Household: familiar specialist roles that help your home remember, stay in rhythm and protect what matters.",
};

const FREE_DOORS = [
  {
    role: "The Gardener",
    img: "/howa/household/gardener.webp",
    line: "Scan the garden and learn what is thriving, what is struggling and what this season asks for next.",
  },
  {
    role: "The Handyman",
    img: "/howa/household/handyman.webp",
    line: "Photograph a fault and get a plain-English view of what it likely is, how urgent it may be and what a fair fix should look like.",
  },
  {
    role: "The Designer",
    img: "/howa/household/designer.webp",
    line: "Send one photo and receive a considered direction: mood, materials, planting, palette or layout.",
  },
  {
    role: "The Surveyor",
    img: "/howa/household/surveyor.webp",
    line: "Scan a crack, damp patch or quote and get a calmer explanation of what should be checked next.",
  },
  {
    role: "The Archivist",
    img: "/howa/household/archivist.webp",
    line: "Upload a document and turn it into dates, costs, reminders, warranty notes and evidence.",
  },
];

const PAID_DEPTHS = [
  {
    role: "Housekeeper",
    img: "/howa/household/housekeeper.webp",
    line: "Keeps the home in order: documents, tasks, reminders, service history and monthly rhythm.",
    href: "/howa/housekeeper",
  },
  {
    role: "Steward",
    img: "/howa/household/steward.webp",
    line: "Protects before failure: Score oversight, risk watch, evidence packs, annual report and future planning.",
    href: "/howa/steward",
  },
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-gold-ink hover:text-house-gold-ink";

export default function HouseholdPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-20 pb-14 max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">
            HoWA · The Household
          </p>
          <h1 className="font-display text-[clamp(40px,6vw,76px)] leading-[1.03] tracking-[-0.01em] text-house-black max-w-[15ch]">
            Your home has <em className="italic">staff now.</em>
          </h1>
          <p className="font-sans text-[19px] leading-[1.65] text-house-brown/80 mt-8 max-w-[52ch]">
            Not people in the hallway. A calm intelligence behind the home. The
            Household is how HoWA becomes easy to use. You ask one voice, HoWA,
            and the right household duty works behind it. The result returns to
            the same Home Record.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/howa/assistant" className={ctaPrimary}>
              Start with the specialist you need
            </Link>
            <Link href="/howa/plans" className={ctaSecondary}>
              See plans
            </Link>
          </div>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden bg-house-cream-dark">
          <Image
            src="/howa/household-hero.webp"
            alt="The House of HoWA Household: seven specialist roles behind one home"
            fill
            sizes="(min-width:1024px) 45vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* One voice. One record. Seven names. */}
      <section className="px-[5vw] py-16 max-w-[820px] mx-auto text-center">
        <h2 className="font-display text-[clamp(28px,3.4vw,44px)] leading-[1.1] text-house-black mb-6">
          One voice. One record. <em className="italic">Seven names.</em>
        </h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/80">
          The Household is not a menu of bots. It is a way of making the home
          operating system feel familiar. The Gardener reads the garden. The
          Handyman reads faults. The Designer reads possibility. The Surveyor
          reads risk. The Archivist reads paperwork. The Housekeeper keeps
          rhythm. The Steward watches the whole. You do not manage characters.
          You ask HoWA. The home becomes clearer.
        </p>
      </section>

      {/* Free doors */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink mb-2">
            Free doors
          </p>
          <h2 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.12] text-house-black mb-10 max-w-[24ch]">
            Start with the specialist you need today, free.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FREE_DOORS.map((d) => (
              <div
                key={d.role}
                className="bg-house-cream border border-house-brown/12 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-house-cream-dark">
                  <Image
                    src={d.img}
                    alt={d.role}
                    fill
                    sizes="(min-width:1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-[24px] leading-[1.1] text-house-black mb-3">
                    {d.role}
                  </h3>
                  <p className="font-sans text-[15px] leading-[1.55] text-house-brown/75">
                    {d.line}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paid depths of care */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink mb-2">
          Paid depths of care
        </p>
        <h2 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.12] text-house-black mb-10">
          When the home needs continuity, not just an answer.
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {PAID_DEPTHS.map((d) => (
            <Link
              key={d.role}
              href={d.href}
              className="group block bg-house-cream-dark border border-house-brown/12 overflow-hidden no-underline transition-colors hover:border-house-gold-ink/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-house-cream-dark">
                <Image
                  src={d.img}
                  alt={d.role}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-[30px] leading-[1.05] text-house-black mb-3 group-hover:text-house-gold-ink transition-colors">
                  {d.role}
                </h3>
                <p className="font-sans text-[16px] leading-[1.6] text-house-brown/78 mb-4">
                  {d.line}
                </p>
                <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink">
                  Explore {d.role} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The rule */}
      <section className="px-[5vw] py-20 bg-house-brown text-house-cream text-center">
        <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-light mb-5">
          The rule
        </p>
        <p className="font-display italic text-[clamp(24px,3vw,40px)] leading-[1.2] text-house-cream/95 max-w-[24ch] mx-auto">
          HoWA should never leave you with a loose answer. Every journey should
          save, remind, book, plan or protect.
        </p>
      </section>
    </div>
  );
}
