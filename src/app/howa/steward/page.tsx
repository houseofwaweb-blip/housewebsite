import Image from "next/image";
import Link from "next/link";
import s from "./steward-v1.module.css";
import { StewardApplicationForm } from "@/components/forms/StewardApplicationForm";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { env } from "@/lib/env";

/**
 * /howa/steward — HoWA's premium tier (£29.99/month).
 *
 * Full premium redesign (steward-redesign-brief.md). Sells Steward as the top
 * tier: cinematic full-bleed hero, stats bar, four pillars with scenarios, the
 * HoWA Score deep-dive with a product mock, value anchoring, a tier comparison,
 * grouped features, and Managed Stewardship as an aspirational bespoke close.
 *
 * Navy throughout, gold used deliberately, space as confidence.
 */

export const metadata = {
  title: "HoWA Steward: a steward for the home you intend to keep.",
  description:
    "HoWA's most complete tier, £29.99 a month. The HoWA Score, risk register, predictive maintenance and evidence kept to a standard. Protected before failure. Managed Stewardship available by application.",
};

const WAITLIST = "/howa/coming-soon?tier=steward";

const PILLARS = [
  {
    n: "01",
    subLabel: "The HoWA Score & risk register",
    heading: "Risk, watched continuously.",
    body: "Steward maintains a live health score for your home, not a static snapshot, but a number that moves as the home changes. Behind it sits a risk register: every open concern, ranked by urgency and cost, so nothing is forgotten.",
    scenario:
      "Your HoWA Score dropped from 91 to 84 last month. Two items opened: the flat roof over the kitchen extension hasn't been inspected in four years, and your boiler service is now overdue by six weeks. Steward surfaces both, with suggested actions and estimated costs.",
    image: "/home-v4/v6-house-dark-v3.webp",
  },
  {
    n: "02",
    subLabel: "Predictive maintenance",
    heading: "Failure, caught early.",
    body: "Most home failures are not sudden. They build over months, a slow pressure drop, a condensation pattern, a habit of short-cycling. Steward reads these signals and speaks before the small thing becomes an expensive one.",
    scenario:
      "Your smart meter data shows a 23% increase in gas consumption over three weeks with no change in usage pattern. Steward flags this as a potential heat exchanger issue and suggests a service call before the heating season.",
    image: "/home-v4/steward-house-dusk.webp",
  },
  {
    n: "03",
    subLabel: "Sensor & smart-meter interpretation",
    heading: "Oversight, above your devices.",
    body: "A smart home generates data. Steward makes it useful. Where sensors, smart meters and connected devices report readings, Steward interprets them against your home's record, making sense of the numbers in context, not in isolation.",
    scenario:
      "Your leak sensor in the utility room triggered at 2am. Steward cross-references the washing machine service record (drum seal replaced 18 months ago) and the plumbing layout. It routes the alert with context: likely door seal, not a pipe. A £40 fix, not a £400 emergency.",
    image: "/home-v4/steward-house-night.webp",
  },
  {
    n: "04",
    subLabel: "Annual Home Report & Home Transfer Pack",
    heading: "Evidence, kept to a standard.",
    body: "Every service, certificate, decision and improvement is filed to a record structured for transfer. Each year, Steward produces an Annual Home Report, a formal account of the home's condition and care. When you sell, the Transfer Pack is ready: proof that the home was looked after.",
    scenario:
      "You're preparing to sell. The buyer's solicitors ask for evidence of boiler maintenance and roof repairs. Your Transfer Pack is already compiled: five years of service records, the flat-roof survey and sign-off, and the HoWA Score history. The sale proceeds without delay.",
    image: "/home-v4/steward-blueprint-only.webp",
  },
];

const SCORE_DRIVERS = [
  { label: "Maintenance record", value: 96 },
  { label: "Risk register", value: 91 },
  { label: "Renewal readiness", value: 78 },
  { label: "Fabric & structure", value: 88 },
  { label: "Documentation", value: 82 },
];

const SCORE_STEPS = [
  { n: "01", label: "Remembers", body: "Every entry compounds the record. Each service, photograph and certificate becomes part of a timeline Steward reads against when something changes." },
  { n: "02", label: "Interprets", body: "Not raw data, contextualised intelligence. A gas reading means one thing alone. Against the boiler's history and the weather, it means something else entirely." },
  { n: "03", label: "Warns", body: "Steward surfaces only what matters, when it matters. Not notifications for their own sake, but a quiet signal that something needs attention, with the context to act." },
  { n: "04", label: "Proves", body: "When it matters most, at renewal, at sale, in dispute, the record is already compiled. Steward keeps the proof to a standard that speaks for itself." },
];

const VALUE_STATS = [
  { big: "£840+", label: "Typical first-year service savings with member pricing" },
  { big: "1 to 3", label: "Issues typically caught before they cost more" },
  { big: "+£18,000", label: "Average sale uplift from a properly evidenced home record" },
  { big: "£29.99", label: "Per month. Less than a single emergency call-out" },
];

const COMPARE_ROWS = [
  { label: "Living Record & Task Centre", plus: "yes", steward: "yes" },
  { label: "Assistant Diagnostic", plus: "Full", steward: "Full" },
  { label: "10% off House Services", plus: "yes", steward: "yes" },
  { label: "Priority Booking", plus: "yes", steward: "yes" },
  { label: "The Hearth", plus: "yes", steward: "yes" },
  { label: "HoWA Score", plus: "no", steward: "yes" },
  { label: "Risk Register", plus: "no", steward: "yes" },
  { label: "Predictive Maintenance", plus: "no", steward: "yes" },
  { label: "Sensor Interpretation", plus: "no", steward: "yes" },
  { label: "Annual Home Report", plus: "no", steward: "yes" },
  { label: "Home Transfer Pack", plus: "no", steward: "yes" },
  { label: "Insurance Readiness Pack", plus: "no", steward: "yes" },
  { label: "Priority Support Channel", plus: "no", steward: "yes" },
  { label: "Managed Stewardship (bespoke)", plus: "no", steward: "By application" },
];

const FEATURE_GROUPS = [
  {
    label: "The intelligence layer",
    items: [
      "The HoWA Score, with full drivers and a risk register",
      "Proactive protection prompts before failure",
      "Predictive maintenance and anomaly alerts",
      "Sensor and smart-meter interpretation where connected",
    ],
  },
  {
    label: "The evidence layer",
    items: [
      "Evidence packs and the Annual Home Report",
      "Transfer Pack foundations for when you sell",
      "Insurance readiness, evidence not advice",
    ],
  },
  {
    label: "Everything in Housekeeper, included",
    items: [
      "Full Living Record, Task Centre, Document Logbook",
      "10% off all House services",
      "Priority booking across House and partners",
      "Full Hearth magazine access",
      "Priority HoWA support channel",
    ],
  },
];

const PROCESS_STEPS = [
  { n: "01", label: "Apply", body: "Tell us about your home." },
  { n: "02", label: "We review", body: "Every application, read personally." },
  { n: "03", label: "We're in touch", body: "A reply in person, usually within a few days." },
];

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

export default async function StewardPage() {
  return (
    <div className={`${s.page} ${s.stewardTheme}`}>
      <MetaViewContent contentId="howa_steward" contentName="HoWA Steward" contentCategory="howa_membership" />

      {/* 0. Sub-navigation */}
      <nav className={s.subNav} aria-label="HoWA sections">
        <div className={s.subNavInner}>
          <span className={s.subNavBrand}>HoWA</span>
          <div className={s.subNavLinks}>
            <Link href="/howa" className={s.subNavLink}>Overview</Link>
            <Link href="/howa/housekeeper" className={s.subNavLink}>Housekeeper</Link>
            <span className={`${s.subNavLink} ${s.subNavLinkActive}`}>Steward</span>
            <Link href="/howa/how-it-works" className={s.subNavLink}>How it works</Link>
          </div>
          <Link href={WAITLIST} className={s.subNavCta}>Join waitlist</Link>
        </div>
      </nav>

      {/* 1. Hero — full-bleed cinematic */}
      <section className={s.heroFull}>
        <div className={s.heroBg} aria-hidden="true">
          <Image
            src="/home-v4/steward-house-night.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center right" }}
          />
          <div className={s.heroOverlay} />
        </div>
        <div className={s.heroFullInner}>
          <div className={s.heroFullCopy}>
            <p className={s.heroEy}>Steward · £29.99 a month</p>
            <h1 className={s.heroTitle}>
              A steward for the home you <em>intend to keep.</em>
            </h1>
            <p className={s.heroSub}>
              HoWA's most complete tier. The home health score, risk register,
              predictive maintenance, evidence packs and the Annual Home Report,
              so the home is protected before failure, not after.
            </p>
            <div className={s.heroCtas}>
              <Link href={WAITLIST} className={s.btnGold}>Join the waitlist →</Link>
              <a href="#whats-included" className={s.btnGhost}>See what&apos;s included ↓</a>
            </div>
          </div>
          <aside className={s.heroBadge} aria-label="Steward HoWA Score preview">
            <div className={s.heroBadgeHead}>
              <span className={s.heroBadgeTop}><span className={s.heroBadgeDot} aria-hidden />Steward</span>
              <span className={s.heroBadgeLive}>● Live</span>
            </div>
            <div className={s.heroBadgeScore}>
              <span className={s.heroBadgeScoreLabel}>HoWA Score</span>
              <span className={s.heroBadgeScoreNum}>87<span>/100</span></span>
            </div>
            <div className={s.scoreBarTrack}><span className={s.scoreBarFill} style={{ width: "87%" }} /></div>
            <p className={s.heroBadgeState}>Good · trending up</p>
            <ul className={s.heroBadgeList}>
              <li className={s.heroBadgeRow}><span>Risk register</span><strong>2 open</strong></li>
              <li className={s.heroBadgeRow}><span>Next service</span><strong>Boiler · 14 days</strong></li>
              <li className={s.heroBadgeRow}><span>Record</span><strong>Up to date</strong></li>
            </ul>
          </aside>
        </div>
      </section>

      {/* 2. Stats bar */}
      <section className={s.statsBar}>
        <div className={s.statsBarInner}>
          <div className={s.statItem}><span className={s.statValue}>£29.99</span><span className={s.statLabel}>Per month</span></div>
          <div className={s.statItem}><span className={s.statValue}>Live</span><span className={s.statLabel}>Your HoWA Score, daily</span></div>
          <div className={s.statItem}><span className={s.statValue}>0</span><span className={s.statLabel}>Minimum term</span></div>
          <div className={s.statItem}><span className={s.statValue}>∞</span><span className={s.statLabel}>Living Record entries</span></div>
        </div>
      </section>

      {/* 3. The cost of a home — emotional hook */}
      <section className={s.caseBand}>
        <div className={s.caseInner}>
          <h2 className={s.caseTitle}>The cost of a home isn&apos;t the mortgage.</h2>
          <p className={s.caseLede}>
            It&apos;s the <em>leak</em> you didn&apos;t catch, the <em>renewal</em> you missed,
            the <em>damp</em> you found too late.
          </p>
          <p className={s.caseSub}>
            Steward watches for the things that quietly erode a home, and keeps the
            evidence that it was cared for.
          </p>
          <p className={s.caseSub}>
            Most homes lose money to problems that were predictable. A blocked gutter
            that becomes a saturated wall. A boiler service missed that becomes an
            emergency replacement. A transfer that falls through because there was no
            record of care. Steward is the layer that watches for these things, quietly,
            before they happen.
          </p>
        </div>
      </section>

      {/* 3b. Quote panel */}
      <section className={s.quotePanel}>
        <p className={s.quoteText}>Ownership is passive. <em>Stewardship is intentional.</em></p>
        <p className={s.quoteAttr}>The House of Willow Alexander</p>
      </section>

      {/* 4. The four pillars */}
      <section className={s.pillars}>
        {PILLARS.map((p, i) => (
          <div key={p.n} className={`${s.pillarRow} ${i % 2 === 1 ? s.pillarRowAlt : ""}`}>
            <div className={s.pillarText}>
              <p className={s.pillarNum}>{p.n}</p>
              <p className={s.pillarSubLabel}>{p.subLabel}</p>
              <h3 className={s.pillarHeading}>{p.heading}</h3>
              <p className={s.pillarBody}>{p.body}</p>
              <blockquote className={s.scenarioCard}>{p.scenario}</blockquote>
            </div>
            <div className={s.pillarImage}>
              <Image src={p.image} alt="" fill sizes="(min-width: 960px) 46vw, 100vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        ))}
        <p className={s.complianceWide}>
          HoWA prepares evidence and prefills your details for renewal. It does not give
          insurance advice or arrange cover.
        </p>
      </section>

      {/* 5. The HoWA Score — deep dive */}
      <section className={s.scoreSection}>
        <div className={s.scoreInner}>
          <div className={s.scoreCopy}>
            <p className={s.sectionEy}>The HoWA Score</p>
            <h2 className={s.recordTitle}>One number for a home well kept.</h2>
            <p className={s.recordSub} style={{ maxWidth: "44ch" }}>
              Steward adds the intelligence layer above the record: it reads what is
              happening and tells you what matters, before it costs you. The Score
              isn&apos;t a badge, it&apos;s a live reading, with the drivers behind it, so you
              always know what it means and what to do next.
            </p>
          </div>

          <div className={s.scoreCard} aria-label="HoWA Score example">
            <div className={s.scoreCardHead}>
              <span>HoWA Score</span>
              <strong className={s.scoreCardScore}>87 <span>/ 100</span></strong>
            </div>
            <div className={s.scoreBarTrack}><span className={s.scoreBarFill} style={{ width: "87%" }} /></div>
            <p className={s.scoreCardState}>Good</p>
            <p className={s.scoreDriversLabel}>Score drivers</p>
            <ul className={s.scoreDrivers}>
              {SCORE_DRIVERS.map((d) => (
                <li key={d.label} className={s.driverRow}>
                  <span className={s.driverDot} aria-hidden />
                  <span className={s.driverLabel}>{d.label}</span>
                  <span className={s.driverBar}><span className={s.driverFill} style={{ width: `${d.value}%` }} /></span>
                  <span className={s.driverVal}>{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className={s.scoreSteps}>
          {SCORE_STEPS.map((step) => (
            <li key={step.label} className={s.scoreStep}>
              <span className={s.scoreStepNum}>{step.n}</span>
              <h4 className={s.scoreStepLabel}>{step.label}</h4>
              <p className={s.scoreStepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. Value anchoring */}
      <section className={s.valueBand}>
        <div className={s.valueInner}>
          <div className={s.valueCopy}>
            <p className={s.sectionEy}>What Steward pays for</p>
            <h2 className={s.recordTitle}>The home protected. The record ready.</h2>
            <div className={s.valueStats}>
              {VALUE_STATS.map((v) => (
                <div key={v.big} className={s.valueStat}>
                  <span className={s.valueStatBig}>{v.big}</span>
                  <span className={s.valueStatLabel}>{v.label}</span>
                </div>
              ))}
            </div>
            <p className={s.recordSub} style={{ maxWidth: "52ch" }}>
              The average emergency boiler repair costs £300 to £600. A roof survey,
              prompted by a missed maintenance cycle, runs to £800 to £2,000. A sale that
              falls through or negotiates down on condition evidence costs far more.
              Steward doesn&apos;t promise to prevent every problem. But it watches for the
              ones that were preventable.
            </p>
          </div>
          <div className={s.valueImage}>
            <Image src="/home-v4/steward-house-dusk.webp" alt="A home at dusk, held to a standard." fill sizes="(min-width: 960px) 42vw, 100vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* 7. Comparison — Steward vs Housekeeper */}
      <section className={s.compareBand}>
        <div className={s.compareInner}>
          <p className={s.sectionEy}>How Steward compares</p>
          <h2 className={s.recordTitle} style={{ marginBottom: "2.5rem" }}>What the upgrade adds.</h2>
          <div className={s.compareScroll}>
            <table className={s.compareTable}>
              <thead>
                <tr>
                  <th aria-label="Feature" />
                  <th className={s.compareColPlus}>Housekeeper</th>
                  <th className={s.compareColSteward}>
                    Steward <span className={s.compareBadge}>Most complete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td className={s.compareFeature}>{row.label}</td>
                    <td className={s.compareCell}>
                      {row.plus === "yes" ? <Check /> : row.plus === "no" ? <span className={s.compareDash}>—</span> : <span className={s.compareWord}>{row.plus}</span>}
                    </td>
                    <td className={`${s.compareCell} ${s.compareCellSteward}`}>
                      {row.steward === "yes" ? <Check /> : row.steward === "no" ? <span className={s.compareDash}>—</span> : <span className={s.compareWord}>{row.steward}</span>}
                    </td>
                  </tr>
                ))}
                <tr className={s.comparePriceRow}>
                  <td className={s.compareFeature}>Price</td>
                  <td className={s.compareCell}><span className={s.compareWord}>£16.99/mo</span></td>
                  <td className={`${s.compareCell} ${s.compareCellSteward}`}><span className={s.compareWordGold}>£29.99/mo</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={s.compareNote}>Upgrading from Housekeeper always preserves your existing home record.</p>
        </div>
      </section>

      {/* 8. Everything in Steward — grouped features */}
      <section id="whats-included" className={s.incBand}>
        <div className={s.incInner}>
          <div className={s.incCopy}>
            <p className={s.sectionEy}>Everything in Steward</p>
            <h2 className={s.recordTitle}>The complete tier.</h2>
            <p className={s.recordSub} style={{ marginTop: "1.25rem" }}>
              Steward is HoWA at its most complete: the record, the intelligence and the
              evidence, working together to keep a home protected before failure, not after.
            </p>
            <div className={s.priceRow}>
              <span className={s.priceBig}>£29.99</span>
              <span className={s.priceUnit}>a month</span>
            </div>
            <div className={s.heroCtas}>
              <Link href={WAITLIST} className={s.btnGold}>Join the Steward waitlist</Link>
              <Link href="/howa/plans" className={s.btnGhost}>Compare tiers →</Link>
            </div>
          </div>
          <div className={s.featureGroups}>
            {FEATURE_GROUPS.map((g) => (
              <div key={g.label} className={s.featureGroup}>
                <p className={s.featureGroupLabel}>{g.label}</p>
                <ul className={s.featureGroupList}>
                  {g.items.map((item) => (
                    <li key={item} className={s.incItem}><Check /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. A record kept to a standard */}
      <section className={s.recordBand}>
        <div className={s.recordInner}>
          <div className={s.recordCopy}>
            <p className={s.sectionEy}>A record kept to a standard</p>
            <h2 className={s.recordTitle}>Home, spaces, assets, events.</h2>
            <p className={s.recordSub}>
              One structured record of everything that makes up your home, and everything
              done to it. Organised by the home itself, not by date, or by service
              provider, but by the physical thing that was affected.
            </p>
            <p className={s.recordSub}>
              Every space has its own history. Every asset its own log. Every event its
              own evidence. The result is a record that speaks to a buyer, a surveyor, an
              insurer or a tradesperson without translation.
            </p>
            <p className={s.recordSub} style={{ color: "var(--cream)", fontStyle: "italic", fontFamily: "var(--font-hearth-serif)" }}>
              The proof a home was cared for, ready to pass on.
            </p>
          </div>
          <div className={s.recordImage}>
            <Image src="/home-v4/v6-home-graph.webp" alt="The HoWA home record, organised as home, spaces, assets and events." fill sizes="(min-width: 960px) 50vw, 100vw" style={{ objectFit: "contain", objectPosition: "center" }} />
          </div>
        </div>
      </section>

      {/* 10. Managed Stewardship — full-bleed bespoke band + form */}
      <section className={s.managedFull}>
        <div className={s.managedBg} aria-hidden="true">
          <Image src="/home-v4/steward-house-dusk.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
          <div className={s.managedOverlay} />
        </div>
        <div className={s.managedInner2}>
          <p className={s.sectionEy}>Managed Stewardship · the layer beyond the record</p>
          <h2 className={s.managedTitle}>For a home that asks a lot of you.</h2>
          <p className={s.managedSub}>
            Beyond the Steward tier, for larger homes, estates and complex households
            where a digital record is not enough. A named person. Human coordination.
            Contractor management. Oversight that knows the home as well as you do.
          </p>
          <p className={s.managedSub} style={{ marginTop: "1rem" }}>
            Managed Stewardship is offered by application. Each home is reviewed
            personally. There is no queue, no template, and no obligation. We reply in
            person, usually within a few days.
          </p>
          <ol className={s.processSteps}>
            {PROCESS_STEPS.map((step) => (
              <li key={step.n} className={s.processStep}>
                <span className={s.stepNum}>{step.n}</span>
                <span className={s.stepLabel}>{step.label}</span>
                <span className={s.stepBody}>{step.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10b. The application form */}
      <section id="apply" className={s.applyBand}>
        <div className={s.applyInner}>
          <div className={s.applyIntro}>
            <p className={s.sectionEy}>Managed Stewardship enquiry</p>
            <h2 className={s.applyTitle}>Tell us about your home.</h2>
            <p className={s.applyNote}>
              For larger homes and estates that need human coordination. We review each
              enquiry personally. There is no queue, and no obligation.
            </p>
          </div>
          <div className={s.applyCard}>
            <StewardApplicationForm
              turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
              sourcePage="/howa/steward"
            />
          </div>
        </div>
      </section>

      {/* 11. Final CTA + close */}
      <section className={s.finalCta}>
        <Link href={WAITLIST} className={s.btnGold}>Join the Steward waitlist →</Link>
        <Link href="/howa/plans" className={s.btnGhost}>Compare all tiers →</Link>
      </section>
      <section className={s.close}>
        <p className={s.closeLine}>Stewardship, by the House of Willow Alexander.</p>
      </section>
    </div>
  );
}
