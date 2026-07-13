import Link from "next/link";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";

/**
 * /become-a-house-pro — consumer-site bridge to the trade application (Final
 * Master Directive). A small bridge only; detailed Pro economics live on the
 * separate House Approved trade site.
 */

export const metadata = {
  title: "Become House Approved | For professionals",
  description:
    "House Approved is selective. For designers, craftspeople and service businesses whose work the House is prepared to stand behind. Apply for Approval.",
};

const BENEFITS = [
  "Be discovered by homeowners through HoWA, presented by name.",
  "Receive jobs with better context, with the homeowner's permission.",
  "Work under one published House standard, not an anonymous directory.",
  "Build proof through completed work saved to the customer's Home Record.",
  "Grow with a platform relationship, not a lead-generation feed.",
];

const CRITERIA = [
  { t: "Named and independent", d: "You keep your own identity, creative authority and professional responsibility. You choose the work you accept." },
  { t: "Real evidence", d: "Business details, relevant insurance, references and a portfolio the House can review before approval." },
  { t: "Clear operating information", d: "Honest scope, pricing or quotation basis, coverage and lead time, kept current." },
  { t: "Standard over volume", d: "Approval is selective and reviewed. The mark can be paused or withdrawn." },
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-ink hover:text-house-gold-ink";

export default function BecomeHouseProPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-20 pb-14 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">For professionals</p>
        <h1 className="font-display text-[clamp(38px,5vw,72px)] leading-[1.03] tracking-[-0.01em] text-house-black max-w-[16ch]">
          House Approved is not for everyone.
        </h1>
        <p className="font-sans text-[18px] leading-[1.65] text-house-brown/82 mt-7 max-w-[54ch]">
          It is for designers, craftspeople and service businesses whose work the House is prepared to stand behind.
          Approval is selective. Providers remain independent, choose the work they accept and are presented by name.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#apply" className={ctaPrimary}>Apply for Approval</a>
          <Link href="/house-approved" className={ctaSecondary}>What the mark means</Link>
        </div>
      </section>

      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1100px] mx-auto grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.12] text-house-black mb-6">Why work with the House.</h2>
            <ul className="grid gap-3">
              {BENEFITS.map((b) => (
                <li key={b} className="font-sans text-[16px] leading-[1.55] text-house-brown/82 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold-ink">
                  {b}
                </li>
              ))}
            </ul>
            <p className="font-sans text-[13.5px] leading-[1.6] text-house-stone mt-8 max-w-[52ch]">
              This is a bridge to the House Approved trade proposition. The full application, Pro app, standards and
              economics are handled through the House Approved trade route.
            </p>
          </div>
          <div>
            <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.12] text-house-black mb-6">What we look for.</h2>
            <div className="grid gap-5">
              {CRITERIA.map((c) => (
                <div key={c.t} className="border-t border-house-brown/15 pt-4">
                  <h3 className="font-display text-[20px] leading-[1.2] text-house-black mb-1.5">{c.t}</h3>
                  <p className="font-sans text-[14.5px] leading-[1.55] text-house-brown/75">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div id="apply">
        <EnquiryForm
          sourcePage="/become-a-house-pro"
          defaultService="partnership"
          eyebrow="Apply for Approval"
          headline="Tell us about your practice."
          body="Your business, discipline, service area and a link to your work. We review every application against the House standard and reply personally. This is an application, not a listing."
          buttonLabel="Submit application"
        />
      </div>
    </div>
  );
}
