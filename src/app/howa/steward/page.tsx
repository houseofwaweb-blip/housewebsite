import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";

export const metadata = {
  title: "HoWA Steward — Managed Home Intelligence",
  description:
    "The premium managed-home layer. Predictive maintenance, managed recurring care, device integration, and insurer-grade evidence. The home, finally managed.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STEWARD_FEATURES = [
  {
    title: "Steward Plans — bespoke recurring care",
    body: "Gated to this tier only. Gardening, cleaning, windows, gutters, deep cleans — bundled into one managed schedule. The House coordinates the partners, tracks every visit, and adapts the rhythm to the season.",
  },
  {
    title: "Anomaly alerts and predictive maintenance",
    body: "Boiler cycles, gutter load, roof age, appliance lifecycles. The system learns the home's rhythms and flags what needs attention before it becomes a failure. Automated seasonal care scheduling.",
  },
  {
    title: "Smart-home controller",
    body: "Live device integrations. Climate, humidity, energy consumption, security sensors. Real data streams wired into the living record. Anomaly alerts when something moves outside normal range.",
  },
  {
    title: "Live utility and energy monitoring",
    body: "Energy consumption, connected devices, and utility performance in one view. Anomalies surface automatically. No more surprise bills or silent failures.",
  },
  {
    title: "Home Protection Review",
    body: "In-person whole-home preventative assessment. Risk items resolved and recorded. Everything assessed writes to the home record and feeds insurance prefill. A maintained, documented home is a cheaper home to insure.",
  },
  {
    title: "Insurance prefill and risk score",
    body: "Full prefill from the home record. AI-derived risk score from home profile and maintenance history. Renewal triggered proactively. Home protection data passed to Provenance for inquiry accuracy.",
  },
  {
    title: "Delegated helper and household permissions",
    body: "Grant your partner, property manager, or tradesperson scoped access to parts of the home record. They see what they need. You retain full control.",
  },
  {
    title: "Priority support and dedicated contact",
    body: "Priority HoWA support channel. A named person at the House who knows your home. Quarterly reviews of the home record. Priorities adjusted, the plan updated. Nothing drifts.",
  },
  {
    title: "Multi-property dashboard",
    body: "Manage more than one home from a single view. Separate records, shared intelligence, one login. Coming in a future phase of Steward.",
  },
  {
    title: "One invoice, all services",
    body: "All services, all trades, all care — one predictable monthly number. No chasing individual suppliers. No spreadsheets. The House handles the coordination.",
  },
];

const EVERYTHING_IN_PLUS = [
  "Full dashboard continuity",
  "Task centre and plan management",
  "Reminders, documents, and logbook",
  "Saved guides and seasonal prompts",
  "Full Hearth editorial access",
  "Service discounts and member pricing",
  "Protect Review early access",
];

const PROBLEMS = [
  "No unified memory of the home — every trade starts from scratch",
  "Decisions scattered across apps, trades, messages, and half-remembered conversations",
  "Maintenance triggered by failure, never by foresight",
  "The homeowner carries the entire mental load alone",
];

const HEALTH_AXES = ["Climate", "Energy", "Maintenance", "Protection"];

const blueprintGrid =
  "repeating-linear-gradient(0deg, transparent 0 39px, rgba(184,148,62,0.06) 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, rgba(184,148,62,0.06) 39px 40px)";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function StewardPage() {
  return (
    <article>
      {/* ============================================================
          1. HERO — Blueprint mode, navy-deep
          ============================================================ */}
      <section
        className="bg-[var(--howa-navy-deep,#151e2b)] text-house-cream px-[5vw] pt-[14vh] pb-28"
        style={{ backgroundImage: blueprintGrid }}
      >
        <div className="max-w-[880px] mx-auto">
          <div className="mb-6">
            <StateBadge state="coming">Coming soon</StateBadge>
          </div>

          <span className="block font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-light mb-5">
            HoWA Steward
          </span>

          <h1 className="font-hearth-sans font-light text-[clamp(48px,6.5vw,84px)] leading-[1.02] tracking-[-0.02em] text-house-cream">
            The home,{" "}
            <em className="italic text-house-gold-light">managed.</em>
          </h1>

          <p className="font-hearth-sans text-[19px] leading-[1.6] text-house-cream/70 mt-7 max-w-[56ch]">
            Everything in HoWA+, plus managed recurring care. A dedicated House
            contact, quarterly reviews, predictive maintenance, and one monthly
            invoice across all services. The home gets better every season.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link
              href="#register"
              className="inline-block px-7 py-3.5 bg-[var(--house-gold-dark)] text-white font-hearth-sans text-[12px] tracking-[0.18em] uppercase no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold hover:border-house-gold"
              style={{ border: "1px solid var(--house-gold-dark)" }}
            >
              Register interest
            </Link>
            <GhostLink href="/howa/plans" dark>
              See all HoWA plans
            </GhostLink>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. THE PROBLEM — Navy, two-column
          ============================================================ */}
      <section
        className="bg-[var(--howa-navy-deep,#151e2b)] text-house-cream px-[5vw] py-24 border-t border-house-gold/10"
        style={{ backgroundImage: blueprintGrid }}
      >
        <div className="max-w-[960px] mx-auto">
          <span className="block font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-light mb-5">
            The problem
          </span>

          <h2 className="font-hearth-sans font-light text-[clamp(28px,3.6vw,44px)] leading-[1.1] tracking-[-0.01em] text-house-cream mb-6 max-w-[20ch]">
            The home is the only major asset without an operating system.
          </h2>

          <p className="font-hearth-sans text-[16px] leading-[1.65] text-house-cream/68 mb-10 max-w-[54ch]">
            It is valuable, complex, and deeply personal. Yet managed through
            fragmentation, memory, and reaction. Cars have service schedules.
            Buildings have facilities management. The home runs on guesswork.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {PROBLEMS.map((p) => (
              <div
                key={p}
                className="border border-house-gold/15 bg-house-gold/[0.03] px-5 py-4"
              >
                <p className="font-hearth-sans text-[14px] leading-[1.55] text-house-cream/75">
                  {p}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-8 mt-10 pt-6 border-t border-house-gold/10">
            {["Stress — missed calls, long waits, broken boiler", "Cost — overgrown lawns, unplanned repairs", "Risk — fire hazard, expired insurance, silent decay"].map((c) => (
              <p key={c} className="font-hearth-sans text-[13px] leading-[1.5] text-house-cream/55 max-w-[200px]">
                {c}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. HOUSE HEALTH GAUGE — Navy, centred
          ============================================================ */}
      <section
        className="bg-[var(--howa-navy-deep,#151e2b)] text-house-cream px-[5vw] py-28 border-t border-house-gold/10"
        style={{ backgroundImage: blueprintGrid }}
      >
        <div className="max-w-[800px] mx-auto text-center">
          <span className="block font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-light mb-5">
            System intelligence
          </span>

          <h2 className="font-hearth-sans font-light text-[clamp(28px,3.6vw,44px)] leading-[1.1] tracking-[-0.01em] text-house-cream mb-16">
            One score. Complete clarity.
          </h2>

          {/* Gauge */}
          <div className="flex justify-center mb-6">
            <div
              className="relative flex items-center justify-center"
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                border: "2px solid rgba(184,148,62,0.2)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 14,
                  borderRadius: "50%",
                  border: "1px solid rgba(184,148,62,0.1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  border: "3px solid transparent",
                  borderTopColor: "var(--house-gold-light, #d4af5a)",
                  borderLeftColor: "var(--house-gold-light, #d4af5a)",
                  transform: "rotate(-45deg)",
                }}
              />
              <span className="font-hearth-serif text-[72px] font-normal leading-none text-house-gold-light tracking-[-0.02em]">
                91
              </span>
            </div>
          </div>

          <p className="font-hearth-serif italic text-[14px] tracking-[0.08em] uppercase text-house-cream/50 mb-8">
            House Health Score
          </p>

          {/* Axis labels */}
          <div className="flex justify-center gap-10 mb-12">
            {HEALTH_AXES.map((axis) => (
              <div key={axis} className="flex flex-col items-center gap-2">
                <span className="block w-6 h-px bg-house-gold/30" />
                <span className="font-hearth-sans text-[11px] tracking-[0.18em] uppercase text-house-cream/60">
                  {axis}
                </span>
              </div>
            ))}
          </div>

          <p className="font-hearth-sans text-[15px] leading-[1.65] text-house-cream/65 max-w-[48ch] mx-auto">
            Four axes, monitored continuously. Climate, energy, maintenance, and
            protection combine into a single score. When something shifts, the
            system knows first.
          </p>
        </div>
      </section>

      {/* ============================================================
          4. WHAT'S INCLUDED — Cream section (visual break from navy)
          This is the features list the user asked for.
          ============================================================ */}
      <section className="bg-house-cream text-house-brown px-[5vw] py-24">
        <div className="max-w-[1100px] mx-auto">
          <Eyebrow colour="teal">What Steward includes</Eyebrow>
          <h2 className="font-hearth-sans font-normal text-[clamp(28px,3.6vw,42px)] leading-[1.1] tracking-[-0.01em] text-house-brown mt-4 mb-5">
            Everything in HoWA+, plus ten capabilities that change how the home is cared for.
          </h2>
          <p className="font-hearth-sans text-[16px] leading-[1.65] text-house-brown/70 mb-14 max-w-[56ch]">
            Steward is not a separate app. It is HoWA with the system turned up
            to its highest resolution. One dashboard, one record, one login. The
            tier unlocks deeper intelligence, richer data, and active management.
          </p>

          {/* Feature cards — 2-column grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {STEWARD_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="border-t border-house-brown/10 pt-6 pb-2"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    className="font-hearth-serif italic text-[13px] tracking-[0.12em] uppercase"
                    style={{ color: "var(--house-gold-dark)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-hearth-sans font-medium text-[18px] leading-[1.2] text-house-brown">
                    {f.title}
                  </h3>
                </div>
                <p className="font-hearth-sans text-[14px] leading-[1.6] text-house-brown/70 ml-[30px]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          {/* Everything in HoWA+ — compact reference list */}
          <div className="border-t border-house-brown/10 pt-8">
            <h3 className="font-hearth-sans font-medium text-[15px] text-house-brown mb-4">
              Plus everything in HoWA+ carries forward
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
              {EVERYTHING_IN_PLUS.map((item) => (
                <span
                  key={item}
                  className="font-hearth-sans text-[13px] text-house-brown/60 py-1"
                >
                  &mdash; {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. MANAGED CARE — Parchment section (another visual break)
          ============================================================ */}
      <section
        className="text-house-brown px-[5vw] py-24 border-t border-house-brown/8"
        style={{ background: "var(--howa-paper, #f4efe4)" }}
      >
        <div className="max-w-[880px] mx-auto">
          <Eyebrow colour="teal">Steward Plans</Eyebrow>
          <h2 className="font-hearth-sans font-normal text-[clamp(28px,3.4vw,40px)] leading-[1.12] tracking-[-0.01em] text-house-brown mt-4 mb-6">
            Managed recurring care, not a catalogue.
          </h2>

          <p className="font-hearth-sans text-[16px] leading-[1.65] text-house-brown/70 mb-4 max-w-[56ch]">
            Steward Plans are not a public subscription grid. They are managed
            outcomes, gated to the Steward tier only. The House assesses your home
            through the Companion, builds a care schedule around what it actually
            needs, and coordinates every partner.
          </p>
          <p className="font-hearth-sans text-[16px] leading-[1.65] text-house-brown/70 mb-10 max-w-[56ch]">
            Steward Plans &ne; House Membership &ne; HoWA+. Three separate products.
            You cannot subscribe to a Steward Plan without an active HoWA Steward
            subscription.
          </p>

          {/* Plans grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { name: "Home & Garden Essential", contents: "Weekly gardening 1hr · Weekly cleaning 2hr · Windows monthly", price: "From £605/mo" },
              { name: "Home & Garden Comprehensive", contents: "Weekly gardening 1hr · Cleaning 3hr · Windows · Gutters · Deep clean", price: "£745/mo" },
              { name: "Home & Garden Premium", contents: "Weekly gardening 2hr · Cleaning 3hr · Int & ext windows · Gutters · Deep clean", price: "£1,040/mo" },
              { name: "Apartment Essential", contents: "Weekly cleaning 2hr · Window cleaning monthly", price: "£300/mo" },
              { name: "Apartment Balcony", contents: "Fortnightly gardening · Cleaning 2hr · Windows · Deep clean quarterly", price: "£460/mo" },
              { name: "Apartment Comprehensive", contents: "Weekly cleaning 2hr · Windows monthly · Deep clean quarterly", price: "£335/mo" },
            ].map((plan) => (
              <div key={plan.name} className="bg-house-white border border-house-brown/10 p-5">
                <span
                  className="block font-hearth-sans text-[11px] tracking-[0.16em] uppercase mb-2"
                  style={{ color: "var(--house-gold-dark)" }}
                >
                  {plan.name}
                </span>
                <p className="font-hearth-sans text-[13px] leading-[1.5] text-house-brown/70 mb-4 min-h-[40px]">
                  {plan.contents}
                </p>
                <span className="font-hearth-sans font-medium text-[16px] text-house-brown">
                  {plan.price}
                </span>
              </div>
            ))}
          </div>

          <p className="font-hearth-sans text-[13px] text-house-brown/60 italic">
            All plans are built with you and adapted to the home. Prices shown are
            guide rates for typical properties. VAT-inclusive.
          </p>
        </div>
      </section>

      {/* ============================================================
          6. HoWA+ vs STEWARD — White section
          ============================================================ */}
      <section className="bg-house-white text-house-brown px-[5vw] py-24 border-t border-house-brown/8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-14">
            <Eyebrow colour="teal">Compare</Eyebrow>
            <h2 className="font-hearth-sans font-normal text-[clamp(28px,3.4vw,40px)] leading-[1.12] tracking-[-0.01em] text-house-brown mt-4">
              Self-service vs managed.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* HoWA+ */}
            <div className="bg-house-cream border border-house-brown/10 p-9">
              <span
                className="block font-hearth-sans text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--howa-teal-dark)" }}
              >
                HoWA+ &middot; &pound;16.99/mo
              </span>
              <h3 className="font-hearth-sans font-medium text-[22px] text-house-brown mb-3">
                Self-service stewardship.
              </h3>
              <p className="font-hearth-sans text-[15px] leading-[1.6] text-house-brown/70 mb-5">
                You see the record, the recommendations, and the connections. You
                decide what to book and when. HoWA+ gives you the tools and the
                member pricing. You drive.
              </p>
              <GhostLink href="/howa/plus">See HoWA+</GhostLink>
            </div>

            {/* Steward */}
            <div
              className="bg-[var(--howa-navy-deep,#151e2b)] text-house-cream border border-house-gold/20 p-9"
              style={{ backgroundImage: blueprintGrid }}
            >
              <span className="block font-hearth-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-light mb-3">
                Steward &middot; Coming soon
              </span>
              <h3 className="font-hearth-sans font-medium text-[22px] text-house-cream mb-3">
                Managed stewardship.
              </h3>
              <p className="font-hearth-sans text-[15px] leading-[1.6] text-house-cream/68 mb-5">
                The House sees the record, schedules the services, and ensures
                everything runs. Your dedicated contact handles the coordination.
                You don&apos;t think about it.
              </p>
              <span className="font-hearth-sans text-[12px] tracking-[0.12em] uppercase text-house-gold-light/70">
                Register interest below &darr;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. REGISTER INTEREST — Navy
          ============================================================ */}
      <section
        id="register"
        className="bg-[var(--howa-navy-deep,#151e2b)] text-house-cream px-[5vw] py-24"
        style={{ backgroundImage: blueprintGrid }}
      >
        <div className="max-w-[640px] mx-auto text-center">
          <span className="block font-hearth-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-light mb-5">
            Early access
          </span>

          <h2 className="font-hearth-sans font-light text-[clamp(28px,3.6vw,40px)] leading-[1.1] text-house-cream mb-4">
            Register your interest.
          </h2>

          <p className="font-hearth-sans text-[15px] leading-[1.6] text-house-cream/65 mb-10">
            Steward capacity is limited by geography and team size. We&apos;re
            onboarding waitlist members first. We&apos;ll write when it opens in
            your area.
          </p>

          <WaitlistMini
            product="steward"
            sourcePage="/howa/steward"
            placeholder="Your email"
            buttonLabel="Register interest"
            successMessage="Thank you. We'll write when Steward opens in your area."
          />

          <div className="mt-8">
            <GhostLink href="/howa/plans" dark arrow={false}>
              &larr; Back to all HoWA plans
            </GhostLink>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. TAGLINE
          ============================================================ */}
      <div className="text-center bg-[var(--howa-navy-deep,#151e2b)] border-t border-house-gold/10 px-5 py-8">
        <p className="font-hearth-serif italic text-[15px] text-house-cream/50 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}
