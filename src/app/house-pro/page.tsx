import Link from "next/link";

/**
 * /house-pro — the House Pro partner page (Aug 2026 House Companion reframe,
 * Copy Pack §12). House Pro is the backend service OS: primarily a professional
 * proposition, named here for providers and partners, powered by HoWA.
 * House rule: no em dashes.
 */

export const metadata = {
  title: "House Pro | The service operating system behind the House",
  description:
    "House Pro carries the intelligence from HoWA and House Companion into real delivery: structured enquiries, complete briefs, quotation, scheduling, assignment, standards, evidence, variations, completion and recurring care. For House Approved professionals.",
  robots: { index: true, follow: true },
};

const PRO_SIGN_IN = "https://accounts.willowalexander.co.uk/";

const FLOW = [
  "Customer enquiry", "Property context", "Service or design scope", "Provider matching",
  "Quotation", "Approval", "Appointment", "Job instructions", "Field evidence",
  "Quality review", "Completion", "Next action",
];

const PILLARS = [
  { t: "Qualified briefs", b: "Receive the address, room or garden context, photographs, decisions, access and expected outcomes in one place." },
  { t: "Quoting & approval", b: "Quote against the same structured scope and keep customer approvals connected to the work." },
  { t: "Scheduling & delivery", b: "Assign teams, manage appointments, carry instructions and surface operational exceptions." },
  { t: "Evidence & aftercare", b: "Return completion, findings, variations, warranties and recurring needs to the Home Record." },
];

export default function HouseProPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* HERO */}
      <section className="px-[5vw] pt-[clamp(48px,6vw,96px)] pb-[clamp(40px,5vw,80px)]">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="mb-4 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">For House Approved professionals</p>
          <h1 className="mb-5 font-display text-[clamp(32px,4.6vw,60px)] leading-[1.05] text-house-brown">
            The service operating system <em>behind the House.</em>
          </h1>
          <p className="mx-auto mb-7 max-w-[62ch] font-sans text-[17px] leading-[1.6] text-house-stone">
            House Pro carries the intelligence from HoWA and House Companion into real
            delivery: structured enquiries, complete briefs, quotation, scheduling,
            assignment, standards, evidence, variations, completion and recurring care.
          </p>
          <div className="btn-row">
            <Link href="/house-approved" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
              Apply for House Approved <span aria-hidden>→</span>
            </Link>
            <a href={PRO_SIGN_IN} className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
              House Pro sign in
            </a>
          </div>
        </div>
      </section>

      {/* WHAT IT REPLACES */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto mb-9 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">What it replaces</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              One operating flow <em>instead of scattered messages.</em>
            </h2>
          </div>
          <ol className="mx-auto flex max-w-[960px] flex-wrap justify-center gap-2 p-0">
            {FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-2 border border-house-brown/12 bg-house-cream px-3.5 py-2 font-sans text-[13px] text-house-brown">
                <span className="font-display text-[13px] text-house-gold-ink">{i + 1}</span>{step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PILLARS */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.t} className="border-t border-house-brown/15 pt-4">
                <h3 className="mb-2 font-display text-[20px] leading-tight text-house-brown">{p.t}</h3>
                <p className="font-sans text-[14px] leading-[1.55] text-house-stone">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POWERED BY HOWA */}
      <section className="bg-house-forest px-[5vw] py-[clamp(52px,6.5vw,100px)]">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-4 font-sans text-[11px] tracking-[0.28em] uppercase text-house-gold-light">Powered by HoWA</p>
          <h2 className="mb-5 font-display text-[clamp(26px,3.4vw,46px)] leading-[1.08] text-house-cream">
            The operation is connected <em>to the intelligence.</em>
          </h2>
          <p className="mx-auto mb-8 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-[rgba(245,240,232,0.86)]">
            House Pro uses the HoWA address record, tasks, projects, files and service
            events rather than creating a second disconnected customer history. The
            House-specific operating layer scales across the House Approved network
            while HoWA remains free to serve other brands and channels.
          </p>
          <div className="btn-row">
            <Link href="/house-approved" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
              Apply for House Approved <span aria-hidden>→</span>
            </Link>
            <a href={PRO_SIGN_IN} className="inline-flex items-center justify-center gap-2 border border-house-gold-dark/60 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-gold-ink hover:text-house-brown">
              House Pro sign in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
