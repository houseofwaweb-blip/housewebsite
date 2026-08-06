import Link from "next/link";

/**
 * /house-approved — the trusted delivery network (Aug 2026 House Companion
 * reframe, Copy Pack §11). Explains the fulfilment network to homeowners and
 * gives professionals a route to apply. House rule: no em dashes.
 */

export const metadata = {
  title: "House Approved | Trusted people. One House standard.",
  description:
    "House Approved brings together designers, gardeners, trades and service businesses selected for capability, care and accountability. They receive a properly prepared brief, work through the House system and return evidence to the home.",
};

const STANDARDS = [
  "Capability",
  "Insurance and compliance",
  "Customer care",
  "Clear scope and pricing",
  "Evidence capture",
  "House presentation standards",
  "Accountable completion",
  "Issue resolution",
];

export default function HouseApprovedPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* HERO */}
      <section className="px-[5vw] pt-[clamp(48px,6vw,96px)] pb-[clamp(40px,5vw,80px)]">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="mb-4 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The House Approved Network</p>
          <h1 className="mb-5 font-display text-[clamp(34px,5vw,64px)] leading-[1.04] text-house-brown">
            Trusted people. <em>One House standard.</em>
          </h1>
          <p className="mx-auto mb-7 max-w-[60ch] font-sans text-[17px] leading-[1.6] text-house-stone">
            House Approved brings together designers, gardeners, trades and service
            businesses selected for capability, care and accountability. They receive
            a properly prepared brief, work through the House system and return
            evidence to the home.
          </p>
          <div className="btn-row">
            <Link href="/services" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
              Find House Approved help <span aria-hidden>→</span>
            </Link>
            <Link href="/house-pro" className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
              Apply to join
            </Link>
          </div>
        </div>
      </section>

      {/* HOMEOWNER + PROFESSIONAL BENEFIT */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-[clamp(28px,5vw,64px)] lg:grid-cols-2">
          <div className="border-t-2 border-house-gold/50 pt-6">
            <p className="mb-3 font-sans text-[12px] tracking-[0.26em] uppercase text-house-gold-ink">For homeowners</p>
            <h2 className="mb-4 font-display text-[clamp(22px,2.6vw,32px)] leading-[1.1] text-house-brown">
              The brief should not weaken when it reaches the person doing the work.
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Relevant property context, access information, decisions, design files
              and expected evidence travel with the job. The professional quotes and
              delivers against the same scope, while the House standard and quality
              process remain visible.
            </p>
          </div>
          <div className="border-t-2 border-house-gold/50 pt-6">
            <p className="mb-3 font-sans text-[12px] tracking-[0.26em] uppercase text-house-gold-ink">For professionals</p>
            <h2 className="mb-4 font-display text-[clamp(22px,2.6vw,32px)] leading-[1.1] text-house-brown">
              Better work begins with a better brief.
            </h2>
            <p className="mb-6 font-sans text-[16px] leading-[1.6] text-house-stone">
              Join a network that brings qualified opportunities, House Companion
              briefs, HoWA property context and House Pro operations together, from
              quotation and scheduling to evidence, completion and ongoing care.
            </p>
            <div className="btn-row">
              <Link href="/house-pro" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-7 py-3.5 text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
                Apply for House Approved <span aria-hidden>→</span>
              </Link>
              <Link href="/house-pro" className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-7 py-3.5 text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
                Explore House Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto mb-10 max-w-[640px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The standard</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Approved is a promise, <em>not a badge.</em>
            </h2>
            <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
              Every House Approved professional is held to the same standard, so the
              work carries the House name with confidence.
            </p>
          </div>
          <ul className="mx-auto grid max-w-[900px] list-none gap-x-10 gap-y-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {STANDARDS.map((st) => (
              <li key={st} className="flex gap-2.5 border-t border-house-brown/15 pt-3 font-sans text-[15px] leading-[1.4] text-house-brown">
                <span aria-hidden className="text-house-gold-ink">·</span>{st}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-house-forest px-[5vw] py-[clamp(48px,6vw,88px)]">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="mb-5 font-display text-[clamp(24px,3vw,40px)] leading-[1.1] text-house-cream">
            One brief that <em>follows the work.</em>
          </h2>
          <p className="mx-auto mb-8 max-w-[56ch] font-sans text-[16px] leading-[1.6] text-[rgba(245,240,232,0.86)]">
            Trusted people. One House standard. Every professional receives the
            relevant scope, property context and decisions through the House system,
            then returns evidence and next steps to the Home Record.
          </p>
          <div className="btn-row">
            <Link href="/services" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
              Find House Approved help <span aria-hidden>→</span>
            </Link>
            <Link href="/house-pro" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark/60 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-gold-ink hover:text-house-brown">
              Apply to join the network
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
