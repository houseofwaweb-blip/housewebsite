import Link from "next/link";
import Image from "next/image";

/**
 * /household — The Household (launch read section 6).
 * Seven familiar roles are the human way into HoWA. Customers ask HoWA; the
 * Household works behind it. Copy stays true to the launch-read doc (seven roles
 * incl. the Archivist); layout/tone informed by the HoWA reference prototype.
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
    forLine: "For the garden that needs reading before it needs doing.",
    line: "Scan the garden and learn what is thriving, what is struggling and what this season asks for next.",
    cta: "Scan the garden free",
  },
  {
    role: "The Handyman",
    img: "/howa/household/handyman.webp",
    forLine: "For the thing that is broken, dripping, loose, clicking or making you wonder who to call.",
    line: "Photograph a fault and get a plain-English view of what it likely is, how urgent it may be and what a fair fix should look like.",
    cta: "Photograph a fault",
  },
  {
    role: "The Designer",
    img: "/howa/household/designer.webp",
    forLine: "For the room or garden you can imagine, but cannot yet see clearly.",
    line: "Send one photo and receive a considered direction: mood, materials, planting, palette or layout.",
    cta: "Send one photo",
  },
  {
    role: "The Surveyor",
    img: "/howa/household/surveyor.webp",
    forLine: "For the crack, damp patch or quote that sits in the back of your mind.",
    line: "Scan a crack, damp patch or quote and get a calmer explanation of what should be checked next.",
    cta: "Decode it free",
  },
  {
    role: "The Archivist",
    img: "/howa/household/archivist.webp",
    forLine: "For the paperwork that keeps disappearing.",
    line: "Upload a document and turn it into dates, costs, reminders, warranty notes and evidence.",
    cta: "Send one document",
  },
];

const PAID_DEPTHS = [
  {
    role: "Housekeeper",
    price: "£16.99/mo",
    img: "/howa/household/housekeeper.webp",
    line: "Keeps the home in order: documents file themselves, tasks become rhythm, reminders arrive, and service history stays with the address.",
    cta: "Employ the Housekeeper",
    href: "/howa/housekeeper",
  },
  {
    role: "Steward",
    price: "£29.99/mo",
    img: "/howa/household/steward.webp",
    line: "Protects before failure: Score oversight, risk watch, evidence packs, an annual report and future planning for the long term.",
    cta: "Put the Steward on watch",
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
            Not people in the hallway. A calm intelligence behind the home. You
            ask one voice, HoWA, and the right household duty works behind it.
            The result returns to the same Home Record.
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

      {/* One voice, seven duties, one memory */}
      <section className="px-[5vw] py-16 max-w-[820px] mx-auto text-center">
        <h2 className="font-display text-[clamp(28px,3.4vw,44px)] leading-[1.1] text-house-black mb-6">
          One voice. Seven duties. <em className="italic">One memory.</em>
        </h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/80">
          The Household is not a menu of bots. You do not pick characters. You
          ask HoWA, and the right duty works behind it, using familiar roles to
          make complex home intelligence feel simple, useful and human. No matter
          which specialist helps, the result returns to the same Home Record.
        </p>
      </section>

      {/* Free doors */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink mb-2">
            The free doors
          </p>
          <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.12] text-house-black mb-10 max-w-[22ch]">
            Start where the need is already alive.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FREE_DOORS.map((d) => (
              <Link
                key={d.role}
                href="/howa/assistant"
                className="group bg-house-cream border border-house-brown/12 overflow-hidden flex flex-col no-underline transition-colors hover:border-house-gold-ink/40"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-house-cream-dark">
                  <Image
                    src={d.img}
                    alt={d.role}
                    fill
                    sizes="(min-width:1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-[24px] leading-[1.1] text-house-black mb-2">
                    {d.role}
                  </h3>
                  <p className="font-display italic text-[15px] leading-[1.4] text-house-brown/70 mb-3">
                    {d.forLine}
                  </p>
                  <p className="font-sans text-[15px] leading-[1.55] text-house-brown/75 mb-5 flex-1">
                    {d.line}
                  </p>
                  <span className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-ink group-hover:text-house-brown transition-colors">
                    {d.cta} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The senior staff (paid depths) */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink mb-2">
          The senior staff
        </p>
        <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.12] text-house-black mb-10 max-w-[22ch]">
          When the whole house needs rhythm and oversight.
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
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="font-display text-[30px] leading-[1.05] text-house-black group-hover:text-house-gold-ink transition-colors">
                    {d.role}
                  </h3>
                  <span className="font-sans text-[14px] tracking-[0.04em] text-house-brown/70">
                    {d.price}
                  </span>
                </div>
                <p className="font-sans text-[16px] leading-[1.6] text-house-brown/78 mb-4">
                  {d.line}
                </p>
                <span className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-ink">
                  {d.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* One Home Record */}
      <section className="px-[5vw] py-20 bg-house-brown text-house-cream text-center">
        <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-light mb-5">
          One Home Record
        </p>
        <p className="font-display italic text-[clamp(24px,3vw,40px)] leading-[1.2] text-house-cream/95 max-w-[26ch] mx-auto">
          Everything any member learns writes back to the same place: your
          home&apos;s memory.
        </p>
        <p className="font-sans text-[16px] leading-[1.7] text-house-cream/75 max-w-[56ch] mx-auto mt-6">
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
