import Link from "next/link";

/**
 * /howa — HoWA landing, locked variant: D. Three-Tier Showcase (blueprint-led).
 * Spec: /ux/02-howa-landing/variant-D.html + _shared.css.
 *
 * Full navy-deep body. The global Header auto-switches to dark on `/howa`
 * (see Header.tsx DARK_ROUTES).
 *
 * Order:
 *   1. Hero D — navy-deep with gold grid backdrop, teal eyebrow, Jost h1
 *   2. Three-tier showcase — HoWA (free) / HoWA+ (recommended, lifted) / Steward (coming soon)
 *   3. Four verbs on darker band — Understand · Recommend · Connect · Remember
 *   4. CTA band — italic line + gold pill
 *   5. Dark tagline
 */

export const metadata = {
  title: "HoWA",
  description:
    "HoWA — Three states, one system. Begins free, grows with the home, up to full Steward intelligence.",
};

export default function HowaLandingPage() {
  return (
    <div className="bg-howa-navy-deep text-house-cream">
      {/* 1. Hero D */}
      <section className="howa-grid-bg text-center px-[5vw] pt-[72px] pb-7 overflow-hidden">
        <span className="block mb-6 font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal">
          HoWA · Three States, One System
        </span>
        <h1 className="mx-auto max-w-[1000px] mb-[18px] font-hearth-sans font-light text-[clamp(52px,6.5vw,88px)] leading-[1.04] tracking-[-0.015em] text-house-cream">
          The home, <em className="italic font-light text-house-gold-light">finally</em> known.
        </h1>
        <p className="mx-auto max-w-[620px] mb-6 font-hearth-sans text-[17px] leading-[1.65] text-house-cream/75">
          HoWA begins free. It grows with the home. The more the house asks,
          the more the system gives back — up to full Steward intelligence.
        </p>
      </section>

      {/* 1b. The problem — emotional narrative */}
      <section className="howa-grid-bg px-[5vw] pb-14 text-center">
        <div className="mx-auto max-w-[680px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: "Homes decay silently.", body: "The boiler ages. The gutters fill. The flat roof cracks. Nothing announces itself until it's expensive." },
              { title: "You only call when it breaks.", body: "No one is watching the whole picture. No one remembers what was done, or when, or by whom." },
              { title: "There is no record.", body: "Every trade starts from scratch. Every insurer asks the same questions. The home has no memory." },
            ].map((p) => (
              <div key={p.title} className="text-left">
                <h3 className="font-hearth-sans font-medium text-[15px] text-house-cream mb-2">{p.title}</h3>
                <p className="font-hearth-sans text-[13px] leading-[1.55] text-house-cream/50">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="font-hearth-sans italic text-[17px] text-house-gold-light leading-[1.5]">
            HoWA is the system that changes this. It understands the home, recommends what to do, connects you to the right hands, and remembers everything. The record compounds. The home gets better.
          </p>
        </div>
      </section>

      {/* 2. Three-tier showcase */}
      <section className="px-[5vw] pt-8 pb-[72px] relative z-10">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[1fr_1.05fr_1fr] items-stretch">
          {/* HoWA — free */}
          <div className="tier-howa">
            <div className="tier-roman">I.</div>
            <div className="tier-name">HoWA</div>
            <div className="tier-price-label">Free forever</div>
            <div className="tier-preview">
              <div className="pp-title">Your home · at a glance</div>
              <div className="pp-row">
                <span>
                  <span className="pp-dot" />
                  Roof
                </span>
                <em>8 yrs</em>
              </div>
              <div className="pp-row">
                <span>
                  <span className="pp-dot" />
                  Boiler
                </span>
                <em>14 days</em>
              </div>
              <div className="pp-row">
                <span>
                  <span className="pp-dot" />
                  Garden
                </span>
                <em>Thursday</em>
              </div>
              <div className="pp-row">
                <span>
                  <span className="pp-dot" />
                  Insurance
                </span>
                <em>42 days</em>
              </div>
            </div>
            <ul>
              <li>One home record</li>
              <li>Companion diagnostic</li>
              <li>AI repair scan</li>
              <li>Quotes &amp; service bookings</li>
              <li>Starter dashboard</li>
            </ul>
            <div className="tier-cta-row">
              <Link href="/api/howa-bounce?source=howa-tier-free" className="tier-cta">
                Begin free
              </Link>
            </div>
            <div className="mt-3 text-center">
              <Link href="/howa/companion" className="font-hearth-sans text-[10px] tracking-[0.16em] uppercase text-howa-teal no-underline border-b border-dotted border-howa-teal pb-px hover:border-solid transition-all">
                See the Companion →
              </Link>
            </div>
          </div>

          {/* HoWA+ — recommended, lifted */}
          <div className="tier-howaplus">
            <div className="tier-roman">II.</div>
            <div className="tier-name">HoWA+</div>
            <div className="tier-price-label">
              <strong>£16.99</strong> / month
            </div>
            <div className="tier-preview">
              <div className="greeting">
                Good afternoon, <strong>Samuel</strong>
              </div>
              <div className="status">
                Your home is stable. <strong>2 priorities</strong> require
                attention.
              </div>
              <div className="photo-tile" aria-hidden="true" />
              <div className="attn-row">
                <span>Boiler service · 14 days</span>
                <em>Resolve</em>
              </div>
              <div className="attn-row">
                <span>Gutters · overdue</span>
                <em>Book</em>
              </div>
            </div>
            <ul>
              <li>Everything in HoWA, plus</li>
              <li>Task &amp; plan management</li>
              <li>Reminders · documents · history</li>
              <li>Member pricing · Marketplace</li>
              <li>AI design · The Hearth editorial</li>
            </ul>
            <div className="tier-cta-row">
              <Link href="/api/howa-bounce?source=howa-tier-plus" className="tier-cta">
                Join HoWA+
              </Link>
            </div>
            <div className="mt-3 text-center">
              <Link href="/howa/plus" className="font-hearth-sans text-[10px] tracking-[0.16em] uppercase text-house-gold-light no-underline border-b border-dotted border-house-gold-light/50 pb-px hover:border-solid transition-all">
                Everything in HoWA+ →
              </Link>
            </div>
          </div>

          {/* Steward — coming soon */}
          <div className="tier-steward">
            <span className="soon-badge">Coming soon</span>
            <div className="tier-roman">III.</div>
            <div className="tier-name">HoWA Steward</div>
            <div className="tier-price-label">Premium care</div>
            <div className="tier-preview">
              <div className="gauge-wrap">
                <div className="gauge-label">House Health</div>
                <div className="gauge">
                  <div className="gauge-num">91</div>
                </div>
                <div className="gauge-axes">
                  Climate · Energy
                  <br />
                  Maintenance · Protection
                </div>
              </div>
            </div>
            <ul>
              <li>Automation &amp; predictive care</li>
              <li>Smart home integration</li>
              <li>Full system control</li>
              <li>Bespoke subscription care</li>
              <li>Insurer-grade evidence</li>
            </ul>
            <div className="tier-cta-row">
              <Link href="/howa/steward" className="tier-cta">
                Register interest
              </Link>
            </div>
            <div className="mt-3 text-center">
              <Link href="/howa/steward" className="font-hearth-sans text-[10px] tracking-[0.16em] uppercase text-house-gold-light/60 no-underline border-b border-dotted border-house-gold-light/30 pb-px hover:border-solid transition-all">
                About Steward →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four verbs on darker band */}
      <section className="relative z-10 bg-black/20 px-[5vw] pt-[72px] pb-20 border-t border-house-cream/6 border-b border-house-cream/6">
        <div className="text-center mb-11">
          <h2 className="font-hearth-sans font-normal text-[36px] tracking-[-0.015em] text-house-cream mb-2">
            One system.{" "}
            <em className="italic font-light text-house-gold-light">Four quiet jobs.</em>
          </h2>
          <p className="mx-auto max-w-[560px] font-hearth-sans text-[15px] text-house-cream/60">
            Whatever the tier, HoWA does the same four things for the home.
          </p>
        </div>
        <div className="mx-auto max-w-[1180px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-house-gold/25">
          {[
            {
              n: "I. Understand",
              title: "Captures the home.",
              desc: "Systems, rooms, garden, preferences — from the first Companion.",
            },
            {
              n: "II. Recommend",
              title: "Next right action.",
              desc: "Identifies what should happen next, and why it matters.",
            },
            {
              n: "III. Connect",
              title: "Routed, not searched.",
              desc: "The right service, partner, designer — matched and booked.",
            },
            {
              n: "IV. Remember",
              title: "A living record.",
              desc: "Every action stored. Memory that compounds, and never forgets.",
            },
          ].map((v, i, arr) => (
            <div
              key={v.n}
              className={
                "px-[22px] pt-7 pb-[30px]" +
                (i === arr.length - 1 ? "" : " lg:border-r lg:border-house-gold/18")
              }
            >
              <div className="mb-2.5 font-hearth-serif italic text-[12px] tracking-[0.18em] uppercase text-house-gold-light">
                {v.n}
              </div>
              <div className="mb-2 font-hearth-sans text-[22px] font-medium text-house-cream">
                {v.title}
              </div>
              <div className="font-hearth-sans text-[13px] leading-[1.65] text-house-cream/60">
                {v.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3b. How it works link */}
      <div className="bg-black/10 text-center px-[5vw] py-4 relative z-10">
        <Link href="/howa/how-it-works" className="font-hearth-sans text-[10px] tracking-[0.18em] uppercase text-house-gold-light no-underline border-b border-dotted border-house-gold-light/40 pb-px hover:border-solid transition-all">
          See how each one works →
        </Link>
      </div>

      {/* 3c. Social proof */}
      <section className="relative z-10 bg-black/10 px-[5vw] pb-14 text-center">
        <span className="block font-hearth-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-3">Already stewarded</span>
        <span className="block font-hearth-sans font-light text-[clamp(32px,4vw,48px)] text-house-gold-light mb-1">247</span>
        <span className="block font-hearth-sans text-[11px] tracking-[0.16em] uppercase text-house-cream/50 mb-8">homes already use HoWA</span>
        <div className="mx-auto max-w-[700px]">
          <p className="font-hearth-serif italic text-[17px] leading-[1.5] text-house-cream/70">
            &ldquo;We used to keep everything in a folder under the stairs. Now HoWA knows what was done, when, and by whom.&rdquo;
          </p>
          <p className="font-hearth-sans text-[12px] text-house-cream/40 mt-2">Catherine M. · 4-bed Victorian, Clapham</p>
        </div>
      </section>

      {/* 4. CTA band */}
      <section className="bg-howa-navy text-center px-[5vw] py-[72px] relative z-10">
        <p className="mx-auto max-w-[640px] mb-6 font-hearth-serif italic text-[24px] tracking-[0.01em] text-house-cream">
          The House defines what good looks like.{" "}
          <em className="italic text-house-gold-light">HoWA ensures it happens.</em>
        </p>
        <Link
          href="/api/howa-bounce?source=howa-footer"
          className="inline-block px-[30px] py-[15px] font-hearth-sans text-[13px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Start HoWA — Free
        </Link>
      </section>

      {/* 5. Dark tagline */}
      <div className="bg-howa-navy-deep border-t border-house-cream/6 text-center px-5 py-6">
        <p className="font-hearth-serif italic text-[14px] text-house-cream/50 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </div>
  );
}
