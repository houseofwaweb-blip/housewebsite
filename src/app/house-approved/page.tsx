import Link from "next/link";
import Image from "next/image";

/**
 * /house-approved — the consumer House Approved standard (Final Master
 * Directive). Selective, evidenced, named. Not an open directory or paid badge.
 */

export const metadata = {
  title: "House Approved | The standard of House of HoWA",
  description:
    "House Approved is the standard of House of HoWA: reserved for named professionals, studios and sellers whose work, conduct and operating information the House has reviewed.",
};

const PILLARS = [
  { t: "Vetted", d: "Identity, business details, relevant insurance, references and the services presented through the House are checked before approval." },
  { t: "Briefed", d: "The professional receives the information the job needs, with the homeowner's permission." },
  { t: "Proven", d: "Where the HoWA workflow is live, photographs, notes and outcomes return to the home's record." },
  { t: "Accountable", d: "The standard is published, approval is reviewed, and the mark can be paused or withdrawn." },
];

const EVIDENCE = [
  { t: "A named provider", d: "The business responsible for the work is shown before you confirm, with its own identity and contract." },
  { t: "A reviewed standard", d: "Work, conduct and operating information are reviewed against one question: would the House trust this in a home it cares about?" },
  { t: "Current information", d: "Insurance, references and the services presented are checked, and approval is reviewed over time." },
  { t: "Honest scope", d: "Clear scopes and prices or quotation routes, with no undisclosed commercial arrangement presented as impartial advice." },
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-ink hover:text-house-gold-ink";

export default function HouseApprovedPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero — text left, van right */}
      <section className="px-[5vw] pt-20 pb-16 border-b border-house-brown/8">
        <div className="max-w-[1300px] mx-auto grid gap-10 lg:gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">House Approved</p>
            <h1 className="font-display text-[clamp(38px,5vw,72px)] leading-[1.03] tracking-[-0.01em] text-house-black max-w-[16ch]">
              The mark on the van means something.
            </h1>
            <p className="font-sans text-[18px] leading-[1.65] text-house-brown/82 mt-7 max-w-[52ch]">
              House Approved is the standard of House of HoWA. It is reserved for named professionals, studios and sellers
              whose work, conduct and operating information the House has reviewed.
            </p>
            <p className="font-sans text-[16px] leading-[1.6] text-house-brown/72 mt-4 max-w-[52ch]">
              It is not an open directory, and it is not a badge you can buy.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/become-a-house-pro" className={ctaPrimary}>Apply for Approval</Link>
              <Link href="/partners" className={ctaSecondary}>Meet the founding partners</Link>
            </div>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden border border-house-brown/10">
            <Image src="/the-house/house-approved-van.webp" alt="A House Approved van with the mark on its side and the named provider beside it" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* What the mark means */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-black mb-10">What the mark means.</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.t} className="border-t border-house-brown/15 pt-5">
              <h3 className="font-display text-[24px] leading-[1.15] text-house-black mb-2">{p.t}</h3>
              <p className="font-sans text-[15.5px] leading-[1.6] text-house-brown/78">{p.d}</p>
            </div>
          ))}
        </div>
        <p className="font-sans text-[13.5px] leading-[1.6] text-house-stone mt-8 max-w-[64ch]">
          House Approved does not, by itself, add a guarantee or insurance-backed protection. Where a written protection
          exists, its terms and process are shown separately.
        </p>
      </section>

      {/* Evidence, not decoration */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">Evidence, not decoration</p>
          <h2 className="font-display text-[clamp(26px,3.4vw,42px)] leading-[1.12] text-house-black max-w-[22ch] mb-10">
            Trust should be shown, not asserted.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {EVIDENCE.map((e) => (
              <div key={e.t} className="bg-house-cream border border-house-brown/12 p-6">
                <h3 className="font-display text-[20px] leading-[1.2] text-house-black mb-2">{e.t}</h3>
                <p className="font-sans text-[14.5px] leading-[1.55] text-house-brown/75">{e.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close — for professionals */}
      <section className="px-[5vw] py-16 max-w-[900px] mx-auto text-center">
        <h2 className="font-display text-[clamp(26px,3.4vw,42px)] leading-[1.12] text-house-black max-w-[22ch] mx-auto mb-5">
          House Approved is not for everyone.
        </h2>
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[56ch] mx-auto mb-8">
          It is for designers, craftspeople and service businesses whose work the House is prepared to stand behind.
          Approval is selective. Providers remain independent, choose the work they accept, and are presented by name.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/become-a-house-pro" className={ctaPrimary}>Apply for Approval</Link>
          <Link href="/the-house/standards" className={ctaSecondary}>Read the House standard</Link>
        </div>
      </section>
    </div>
  );
}
