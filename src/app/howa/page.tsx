import Link from "next/link";
import Image from "next/image";

/**
 * /howa — "Meet HoWA: the Home Intelligence behind the House" (Aug 2026 House
 * Companion reframe). HoWA is the DESTINATION, referenced not re-sold on the
 * House site. This page explains why the House uses HoWA and routes to the
 * Home Record + the independent HoWA product surface (howa.co.uk). It does not
 * reproduce the HoWA plan/tier architecture on the House site.
 *
 * Copy from the August 2026 Website Copy Pack §10. House rule: no em dashes.
 */

export const metadata = {
  title: "Meet HoWA | The Home Intelligence behind the House",
  description:
    "HoWA gives every address a living record: the home, its spaces, documents, work, decisions and next actions in one place. The House uses it so people arrive better briefed, completed work is not lost, and the home becomes better known over time.",
};

const MY_HOME = "https://accounts.willowalexander.co.uk/";
const HOWA = "https://howa.co.uk";

/** Why the House uses HoWA, across the life of a piece of work. */
const STAGES = [
  { t: "Before the visit", b: "Property context, preferences, prior work, access notes and linked documents make a clearer brief." },
  { t: "During the work", b: "The task, team, scope, photographs, findings and decisions remain connected to the address." },
  { t: "After the work", b: "Completion evidence, costs, warranty and next action return to the Home Record." },
  { t: "Over time", b: "The home learns from care, projects and changes instead of beginning again with each provider." },
];

/** What HoWA holds for your address (Visual Brief slide 11), in plain terms. */
const HOWA_HOLDS = [
  { t: "The Home Record", b: "The address, its spaces, assets, documents and history, all in one place." },
  { t: "The HoWA Score", b: "A simple read of how your home is doing, with the evidence behind it." },
  { t: "Spaces and zones", b: "Every room and garden zone, with what it holds and what it needs." },
  { t: "Recommendations", b: "The next actions for your home, in priority order, with gentle reminders." },
  { t: "Bookings and warranties", b: "Service events, costs, warranties and next-due dates, kept together." },
  { t: "Design projects", b: "Scans, plans, decisions and files, held with the address, not lost in email." },
];

export default function MeetHowaPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* HERO */}
      <section className="px-[5vw] pt-[clamp(48px,6vw,96px)] pb-[clamp(40px,5vw,80px)]">
        <div className="mx-auto grid max-w-[1280px] gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="mb-4 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Meet HoWA</p>
            <h1 className="mb-5 font-display text-[clamp(34px,5vw,64px)] leading-[1.04] text-house-brown">
              The Home Intelligence <em>behind the House.</em>
            </h1>
            <p className="mb-7 max-w-[54ch] font-sans text-[17px] leading-[1.6] text-house-stone">
              HoWA gives every address a living record: the home, its spaces, assets,
              documents, work, decisions and next actions in one place. The House uses
              it so people arrive better briefed, completed work is not lost, and the
              home becomes better known over time.
            </p>
            <div className="btn-row">
              <a href={MY_HOME} className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
                Start your Home Record <span aria-hidden>→</span>
              </a>
              <a href={MY_HOME} className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
                Open Home Record
              </a>
            </div>
          </div>
          <div className="w-full overflow-hidden border border-house-brown/10">
            <Image
              src="/powered-by-howa/companion-hero.png"
              alt="A cross-section of a home read by HoWA: roof, heating and structure assessed, a HoWA Score, the next action and the Home Record kept alongside."
              width={1672}
              height={941}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* WHAT HOWA HOLDS — the Home Record + Score, shown, not sold (Visual Brief
          slide 11). Product imagery pulled from the HoWA site; no tiers. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-10 max-w-[720px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">One record for the whole home</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              The home you already live in, <em>finally known.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Enter your address and, in under a minute, your home becomes a Home
              Record and a HoWA Score. From there HoWA keeps up as the home changes:
              what it holds, what it needs, and the next thing worth doing.
            </p>
          </div>
          <div className="mx-auto mb-11 max-w-[1040px] overflow-hidden border border-house-brown/12 bg-house-white">
            <Image
              src="/powered-by-howa/howa-dashboard-devices.png"
              alt="The HoWA dashboard on desktop and phone: the HoWA Score, record confidence, the Home Record with documents, warranties, services, costs and inventory, and the next best action."
              width={1586}
              height={992}
              sizes="(max-width: 1024px) 100vw, 1040px"
              className="h-auto w-full"
            />
          </div>
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {HOWA_HOLDS.map((h) => (
              <div key={h.t} className="border-t border-house-brown/15 pt-4">
                <h3 className="mb-1.5 font-display text-[20px] leading-tight text-house-brown">{h.t}</h3>
                <p className="font-sans text-[14px] leading-[1.55] text-house-stone">{h.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THE HOUSE USES HOWA */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Why the House uses HoWA</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Care is better when the home <em>is known.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              The address and household context prepare a better brief. Previous
              visits and documents travel with the work. Photographs, findings, costs,
              warranties and next-due actions remain with the home. Verified evidence
              can close risks and strengthen relevant parts of the HoWA Score.
            </p>
          </div>
          <div className="mx-auto mb-11 max-w-[820px] overflow-hidden border border-house-brown/12 bg-house-cream">
            <Image
              src="/powered-by-howa/writeback-record.webp"
              alt="A HoWA Home Record: the address, work, evidence, invoice, warranty and next action kept in one place."
              width={1400}
              height={1050}
              sizes="(max-width: 1024px) 100vw, 820px"
              className="h-auto w-full"
            />
          </div>
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((st) => (
              <div key={st.t} className="border-t border-house-brown/15 pt-4">
                <h3 className="mb-1.5 font-display text-[20px] leading-tight text-house-brown">{st.t}</h3>
                <p className="font-sans text-[14px] leading-[1.55] text-house-stone">{st.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOWA INDEPENDENCE */}
      <section className="bg-house-forest px-[5vw] py-[clamp(52px,6.5vw,100px)]">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-4 font-sans text-[11px] tracking-[0.28em] uppercase text-house-gold-light">Yours, for your address</p>
          <h2 className="mb-5 font-display text-[clamp(26px,3.4vw,46px)] leading-[1.08] text-house-cream">
            Your home's own record, <em>House or not.</em>
          </h2>
          <p className="mx-auto mb-8 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-[rgba(245,240,232,0.86)]">
            You can start and use HoWA directly, whether or not you book a House
            service. It stays your home's record and intelligence for the address,
            and there is more to explore on the HoWA site when you want the deeper
            detail.
          </p>
          <div className="btn-row">
            <a href={HOWA} className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
              Explore HoWA <span aria-hidden>→</span>
            </a>
            <Link href="/house-companion" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark/60 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-gold-ink hover:text-house-brown">
              Ask House Companion
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
