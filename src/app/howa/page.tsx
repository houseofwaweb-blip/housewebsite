import Link from "next/link";
import { CompanionPreview } from "@/components/marketing/CompanionPreview";

/**
 * /howa — HoWA landing page. Light mode (HoWA mode).
 *
 * Parchment + white backgrounds, brown text, Jost headlines, gold-dark CTAs.
 * The ONLY navy element is the Steward tier card itself.
 *
 * Sections:
 *   1. Hero — parchment bg, tracing-line grid, eyebrow + H1 + sub + CTAs
 *   2. System split — House vs HoWA two-column explainer
 *   3. Companion teaser — intake process + live step widget preview
 *   4. Dashboard preview — record list + placeholder image
 *   5. Transition band — gold rule
 *   6. Three-tier showcase — HoWA / HoWA+ / Steward
 *   7. Four verbs — parchment bg
 *   8. Closing CTA
 *   9. Tagline
 */

export const metadata = {
  title: "HoWA",
  description:
    "HoWA — the installed-per-home intelligence layer that gives the house memory, gives the homeowner calm judgement, and keeps every meaningful action tied to one living home record.",
};

export default function HowaLandingPage() {
  return (
    <div className="bg-house-white text-house-brown">

      {/* ── 1. Hero ── */}
      <section className="relative bg-howa-paper text-center px-[5vw] pt-[72px] pb-16 overflow-hidden">
        {/* tracing-line grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--house-brown) 1px, transparent 1px), linear-gradient(to bottom, var(--house-brown) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />

        <span className="relative z-10 block mb-6 font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal-dark">
          HoWA &middot; The Stewardship System
        </span>

        <h1 className="relative z-10 mx-auto max-w-[1000px] mb-[18px] font-hearth-sans font-light text-[clamp(48px,6vw,84px)] leading-[1.06] tracking-[-0.015em] text-house-brown">
          The home, <em className="italic font-light text-howa-teal-dark">finally</em> known.
        </h1>

        <p className="relative z-10 mx-auto max-w-[660px] mb-8 font-hearth-sans text-[17px] leading-[1.65] text-house-brown/70">
          HoWA is the installed-per-home intelligence layer that gives the house memory, gives the homeowner calm judgement about what matters, and keeps every meaningful action tied to one living home record.
        </p>

        <div className="relative z-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/api/howa-bounce?source=howa-hero"
            className="inline-block px-[30px] py-[14px] font-hearth-sans text-[13px] tracking-[0.16em] uppercase no-underline bg-[var(--house-gold-dark)] text-white transition-all duration-[var(--t-base)] ease-out hover:opacity-90"
          >
            Start HoWA — Free
          </Link>
          <Link
            href="#tiers"
            className="inline-block px-[30px] py-[14px] font-hearth-sans text-[13px] tracking-[0.16em] uppercase no-underline border border-house-brown/25 text-house-brown bg-transparent transition-all duration-[var(--t-base)] ease-out hover:border-house-brown/50"
          >
            See plans
          </Link>
        </div>
      </section>

      {/* ── 2. System split — The House vs HoWA ── */}
      <section className="bg-house-white px-[5vw] py-[72px]">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* The House */}
          <div>
            <span className="block mb-3 font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal-dark">
              The House
            </span>
            <h2 className="font-hearth-sans font-light text-[32px] leading-[1.15] tracking-[-0.01em] text-house-brown mb-4">
              Institution. Taste. Trust.
            </h2>
            <p className="font-hearth-sans text-[15px] leading-[1.7] text-house-brown/70 mb-6">
              The House is the cultural authority — the editorial eye, the curatorial standard, the voice that defines what good looks like for a British home. It introduces the designers, the services, the products, the language.
            </p>
            <ul className="space-y-2">
              {["Brand & editorial authority", "Curated partners & services", "Design philosophy & taste", "Trust architecture"].map((pt) => (
                <li key={pt} className="flex items-start gap-2 font-hearth-sans text-[13px] text-house-brown/70">
                  <span className="mt-[6px] block w-[5px] h-[5px] rounded-full shrink-0" style={{ background: "var(--house-gold-dark)" }} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* HoWA */}
          <div>
            <span className="block mb-3 font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal-dark">
              HoWA
            </span>
            <h2 className="font-hearth-sans font-light text-[32px] leading-[1.15] tracking-[-0.01em] text-house-brown mb-4">
              System. Memory. Continuity.
            </h2>
            <p className="font-hearth-sans text-[15px] leading-[1.7] text-house-brown/70 mb-6">
              HoWA is not a marketplace. It is the system that decides what should happen, when, why, and who should do it. It captures the home, recommends the right next action, connects the right hands, and remembers everything. One living record that compounds over time.
            </p>
            <ul className="space-y-2">
              {["Home intelligence & diagnostics", "Context-aware recommendations", "Living record & continuity", "Service routing & care management"].map((pt) => (
                <li key={pt} className="flex items-start gap-2 font-hearth-sans text-[13px] text-house-brown/70">
                  <span className="mt-[6px] block w-[5px] h-[5px] rounded-full shrink-0" style={{ background: "var(--house-gold-dark)" }} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. Companion teaser ── */}
      <section className="relative bg-howa-paper px-[5vw] py-[72px] overflow-hidden">
        {/* tracing-line grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--house-brown) 1px, transparent 1px), linear-gradient(to bottom, var(--house-brown) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            <span className="block mb-3 font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal-dark">
              The Companion
            </span>
            <h2 className="font-hearth-sans font-light text-[32px] leading-[1.15] tracking-[-0.01em] text-house-brown mb-5">
              Four steps. One living record.
            </h2>
            <div className="space-y-5">
              {[
                { step: "1", title: "Capture the home", desc: "Rooms, systems, age, condition — the Companion builds a picture from what you know." },
                { step: "2", title: "Understand priorities", desc: "What matters most right now? Design, care, protection, or everything at once." },
                { step: "3", title: "Recommend a route", desc: "Based on the home's profile, HoWA suggests the next right actions and the right hands to do them." },
                { step: "4", title: "Save to the record", desc: "Every answer, every action, every outcome — stored in the home record. Memory that compounds." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <span className="shrink-0 w-[28px] h-[28px] rounded-full flex items-center justify-center font-hearth-sans text-[12px] font-medium text-white" style={{ background: "var(--house-gold-dark)" }}>
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-hearth-sans font-medium text-[15px] text-house-brown mb-1">{s.title}</h3>
                    <p className="font-hearth-sans text-[13px] leading-[1.6] text-house-brown/70">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — interactive Companion step widget */}
          <CompanionPreview />
        </div>
      </section>

      {/* ── 4. Dashboard preview ── */}
      <section className="bg-house-white px-[5vw] py-[72px]">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left — copy + record list */}
          <div>
            <span className="block mb-3 font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal-dark">
              The Dashboard
            </span>
            <h2 className="font-hearth-sans font-light text-[32px] leading-[1.15] tracking-[-0.01em] text-house-brown mb-5">
              Everything the home knows, in one place.
            </h2>
            <p className="font-hearth-sans text-[15px] leading-[1.7] text-house-brown/70 mb-6">
              A living record of what the home needs, what has been done, and what is coming next. No more folders under the stairs.
            </p>
            <div className="border border-house-brown/10 rounded-[8px] overflow-hidden">
              <div className="px-4 py-3 border-b border-house-brown/8 bg-howa-paper/60">
                <span className="font-hearth-sans text-[12px] tracking-[0.12em] uppercase text-house-brown/60">
                  Your home &middot; at a glance
                </span>
              </div>
              {[
                { label: "Roof", value: "8 yrs", status: "stable" },
                { label: "Boiler", value: "14 days", status: "attention" },
                { label: "Garden", value: "Thursday", status: "stable" },
                { label: "Insurance", value: "42 days", status: "stable" },
                { label: "Gutter", value: "overdue", status: "overdue" },
                { label: "Interior project", value: "in progress", status: "active" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-3 border-b border-house-brown/6 last:border-b-0"
                >
                  <span className="flex items-center gap-2 font-hearth-sans text-[13px] text-house-brown">
                    <span
                      className="block w-[6px] h-[6px] rounded-full"
                      style={{
                        background:
                          row.status === "overdue"
                            ? "#b44"
                            : row.status === "attention"
                              ? "var(--house-gold-dark)"
                              : row.status === "active"
                                ? "var(--howa-teal-dark)"
                                : "rgba(48,35,28,0.2)",
                      }}
                    />
                    {row.label}
                  </span>
                  <span className="font-hearth-sans text-[12px] text-house-brown/60 italic">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — annotated home image (placeholder until real imagery) */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] bg-howa-paper border border-house-brown/8 overflow-hidden">
              <img
                src="/home/hero-georgian.png"
                alt="A Georgian townhouse representing the home record"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="font-hearth-sans text-[11px] tracking-[0.18em] uppercase text-house-brown/70 bg-house-white/80 px-3 py-1.5">
                  The living record
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Transition band ── */}
      <section className="bg-howa-paper text-center px-[5vw] py-14">
        <p className="mx-auto max-w-[600px] font-hearth-serif italic text-[22px] leading-[1.4] text-house-brown mb-4">
          The House introduces. HoWA configures.
        </p>
        <div className="mx-auto w-[60px] h-[2px]" style={{ background: "var(--house-gold-dark)" }} />
      </section>

      {/* ── 6. Three-tier showcase ── */}
      <section id="tiers" className="bg-house-white px-[5vw] pt-16 pb-[72px]">
        <div className="text-center mb-12">
          <span className="block mb-3 font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal-dark">
            Plans
          </span>
          <h2 className="font-hearth-sans font-light text-[36px] tracking-[-0.015em] text-house-brown">
            Three tiers. One system.
          </h2>
        </div>

        <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[1fr_1.05fr_1fr] items-stretch">
          {/* HoWA — free */}
          <div className="tier-howa">
            <div className="tier-roman">I.</div>
            <div className="tier-name">HoWA</div>
            <div className="tier-price-label">Free forever</div>
            <div className="tier-preview">
              <div className="pp-title">Your home &middot; at a glance</div>
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
              <li>One home address record</li>
              <li>Companion diagnostics (entry level)</li>
              <li>AI repair scan &amp; instant quote</li>
              <li>AI design moodboard suggestions</li>
              <li>Service booking (pay-as-you-go)</li>
              <li>Carbon estimate &amp; offsetting entry</li>
              <li>The Hearth — editorial preview</li>
              <li>Basic saved dashboard state</li>
            </ul>
            <div className="tier-cta-row">
              <Link href="/api/howa-bounce?source=howa-tier-free" className="tier-cta">
                Begin free
              </Link>
            </div>
            <div className="mt-3 text-center">
              <Link
                href="/howa/companion"
                className="font-hearth-sans text-[11px] tracking-[0.16em] uppercase no-underline border-b border-dotted pb-px hover:border-solid transition-all"
                style={{ color: "var(--howa-teal-dark)", borderColor: "var(--howa-teal-dark)" }}
              >
                See the Companion &rarr;
              </Link>
            </div>
          </div>

          {/* HoWA+ — recommended, lifted */}
          <div className="tier-howaplus">
            <div className="tier-roman">II.</div>
            <div className="tier-name">HoWA+</div>
            <div className="tier-price-label">
              <strong>&pound;16.99</strong> / month
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
                <span>Boiler service &middot; 14 days</span>
                <em>Resolve</em>
              </div>
              <div className="attn-row">
                <span>Gutters &middot; overdue</span>
                <em>Book</em>
              </div>
            </div>
            <ul>
              <li>Everything in HoWA, plus</li>
              <li>10% off all House services</li>
              <li>Full dashboard continuity &amp; task centre</li>
              <li>Richer documents &amp; home logbook</li>
              <li>Priority booking across House services</li>
              <li>Full access to The Hearth magazine</li>
              <li>Personal carbon offset fund</li>
              <li>Saved guides &amp; seasonal reminders</li>
              <li>Early access to new HoWA features</li>
              <li>Exclusive House events &amp; drops</li>
            </ul>
            <div className="tier-cta-row">
              <Link href="/api/howa-bounce?source=howa-tier-plus" className="tier-cta">
                Join HoWA+
              </Link>
            </div>
            <div className="mt-3 text-center">
              <Link
                href="/howa/plus"
                className="font-hearth-sans text-[11px] tracking-[0.16em] uppercase no-underline border-b border-dotted pb-px hover:border-solid transition-all"
                style={{ color: "var(--house-gold-dark)", borderColor: "rgba(138,111,46,0.5)" }}
              >
                Everything in HoWA+ &rarr;
              </Link>
            </div>
          </div>

          {/* Steward — coming soon (ONLY navy element on the page) */}
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
                  Climate &middot; Energy
                  <br />
                  Maintenance &middot; Protection
                </div>
              </div>
            </div>
            <ul>
              <li>Everything in HoWA+, plus</li>
              <li>Access to Steward Plans (gated)</li>
              <li>Smart-home controller &amp; devices</li>
              <li>Anomaly alerts &amp; predictive maintenance</li>
              <li>Automated seasonal care scheduling</li>
              <li>Live utility &amp; energy monitoring</li>
              <li>Delegated helper / household permissions</li>
              <li>Insurance prefill &amp; risk score</li>
              <li>Home Protection Review (when live)</li>
              <li>Priority HoWA support channel</li>
            </ul>
            <div className="tier-cta-row">
              <Link href="/howa/steward" className="tier-cta">
                Register interest
              </Link>
            </div>
            <div className="mt-3 text-center">
              <Link href="/howa/steward" className="font-hearth-sans text-[11px] tracking-[0.16em] uppercase text-house-gold-light/60 no-underline border-b border-dotted border-house-gold-light/30 pb-px hover:border-solid transition-all">
                About Steward &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Four verbs ── */}
      <section className="relative bg-howa-paper px-[5vw] pt-[72px] pb-20 overflow-hidden">
        {/* tracing-line grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--house-brown) 1px, transparent 1px), linear-gradient(to bottom, var(--house-brown) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center mb-11">
          <h2 className="font-hearth-sans font-normal text-[36px] tracking-[-0.015em] text-house-brown mb-2">
            One system.{" "}
            <em className="italic font-light" style={{ color: "var(--house-gold-dark)" }}>
              Four quiet jobs.
            </em>
          </h2>
          <p className="mx-auto max-w-[560px] font-hearth-sans text-[15px] text-house-brown/70">
            Whatever the tier, HoWA does the same four things for the home.
          </p>
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-house-brown/12">
          {[
            {
              n: "I. Understand",
              title: "Captures the home.",
              desc: "Systems, rooms, age, garden, preferences, condition — from the first Companion intake. The home becomes known.",
            },
            {
              n: "II. Recommend",
              title: "Next right action.",
              desc: "Identifies what should happen next and why it matters. Prioritised by urgency, season, and the home's own profile.",
            },
            {
              n: "III. Connect",
              title: "Routed, not searched.",
              desc: "The right service, partner, designer — matched to the home's needs, booked through the House, and stored in the record.",
            },
            {
              n: "IV. Remember",
              title: "A living record.",
              desc: "Every action stored. Documents, invoices, photos, dates. Memory that compounds, and never forgets.",
            },
          ].map((v, i, arr) => (
            <div
              key={v.n}
              className={
                "relative z-10 px-[22px] pt-7 pb-[30px]" +
                (i === arr.length - 1 ? "" : " lg:border-r lg:border-house-brown/10")
              }
            >
              <div
                className="mb-2.5 font-hearth-serif italic text-[12px] tracking-[0.18em] uppercase"
                style={{ color: "var(--house-gold-dark)" }}
              >
                {v.n}
              </div>
              <div className="mb-2 font-hearth-sans text-[22px] font-medium text-house-brown">
                {v.title}
              </div>
              <div className="font-hearth-sans text-[13px] leading-[1.65] text-house-brown/70">
                {v.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Closing CTA ── */}
      <section className="bg-house-white text-center px-[5vw] py-[72px]">
        <p className="mx-auto max-w-[640px] mb-4 font-hearth-serif italic text-[22px] leading-[1.45] text-house-brown">
          For homes with soul, proper care should never be left to memory alone.
        </p>
        <p className="mx-auto max-w-[640px] mb-8 font-hearth-sans text-[15px] text-house-brown/70">
          The House defines what good looks like.{" "}
          <span style={{ color: "var(--house-gold-dark)" }}>HoWA ensures it happens.</span>
        </p>
        <Link
          href="/api/howa-bounce?source=howa-footer"
          className="inline-block px-[30px] py-[15px] font-hearth-sans text-[13px] tracking-[0.16em] uppercase no-underline text-white transition-all duration-[var(--t-base)] ease-out hover:opacity-90"
          style={{ background: "var(--house-gold-dark)" }}
        >
          Start HoWA — Free
        </Link>
      </section>

      {/* ── 9. Tagline ── */}
      <div className="bg-howa-paper border-t border-house-brown/8 text-center px-5 py-6">
        <p className="font-hearth-serif italic text-[14px] text-house-brown/50 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </div>
  );
}
