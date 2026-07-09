import Image from "next/image";
import Link from "next/link";
import s from "./protect.module.css";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /protect — Home Protection & Risk Reduction.
 *
 * Section order:
 *   1. Hero — surreal helmet image full-width, copy + register-interest left
 *   2. Stats strip — Late 2026 · 17 standards · etc
 *   3. Premise — editorial pull-quote
 *   4. Provides / Doesn't provide — twin panels
 *   5. Three risk areas — illustrated cards
 *   6. Three steps — Review · Setup · Plan
 *   7. Who it's for — audience block + image
 *   8. Register interest band — waitlist
 *   9. Insurance teaser — image right, copy left
 *   10. Services available now — closing band
 *   11. FCA notice
 */

export const metadata = {
  title: "Protect by House of HoWA | The Steward protects before failure",
  description:
    "Preventative care for homes that are lived in properly. A new House service launching late 2026: Home Protection Review, coordinated setup, ongoing oversight.",
};

const STAT_COLS = [
  { value: "Late '26", label: "Opening" },
  { value: "1", label: "Day on-site" },
  { value: "17", label: "House standards" },
  { value: "0", label: "Surprise call-outs" },
];

const RISK_AREAS = [
  {
    roman: "I.",
    name: "Water, Drainage & Ingress",
    tagline: "The most common and disruptive source of household damage.",
    body:
      "Slow leaks. Blocked gutters. Poor drainage. Water finding its way in unnoticed and developing quietly over time. Ingress is rarely visible until it has already cost the homeowner.",
    bullets: [
      "Gutter and downpipe verification",
      "External drainage and standing-water audit",
      "Internal moisture and ventilation review",
    ],
  },
  {
    roman: "II.",
    name: "Boundaries, Fences & External Elements",
    tagline: "External structures, exposed to constant weathering.",
    body:
      "Fences, walls, and guttering. Gradual movement, decay, or failure can create safety issues, access risks, and secondary damage if left unmanaged.",
    bullets: [
      "Fence and boundary integrity check",
      "Wall and pointing inspection",
      "Outbuilding condition and access review",
    ],
  },
  {
    roman: "III.",
    name: "Fire & Carbon Monoxide",
    tagline: "Systems degrade. Batteries fail. Standards change.",
    body:
      "Smoke and CO detection placement, condition, and regular verification. Often correctly installed once and quietly forgotten, until they matter.",
    bullets: [
      "Detector placement against current standards",
      "Battery and self-test verification",
      "Replacement schedule documented",
    ],
  },
];

const STEPS = [
  {
    n: "I.",
    name: "Home Protection Review",
    tagline: "An in-person, whole-home preventative assessment.",
    body:
      "A House-vetted specialist walks the property, room by room and outside in. Photographs, notes, and a prioritised works list. Insurance-ready documentation, filed straight to your home record.",
  },
  {
    n: "II.",
    name: "Protection Setup",
    tagline: "Coordinated implementation of agreed measures.",
    body:
      "Approved partners book the work, the House oversees the schedule, and every action is logged. You see what was done, when, and by whom, without managing each handover yourself.",
  },
  {
    n: "III.",
    name: "Ongoing Protection Plan",
    tagline: "Regular verification and recorded oversight via Housekeeper.",
    body:
      "Seasonal checks, reminders before they become urgent, and a quiet running record of the home's state. You don't need to remember everything. HoWA does that for you.",
  },
];

const AUDIENCE = [
  {
    name: "Busy households",
    body: "Where peace of mind matters more than personally managing every detail.",
  },
  {
    name: "Period or high-value homes",
    body: "Where preventative care preserves both the building and its value over decades.",
  },
  {
    name: "Second homes & unoccupied properties",
    body: "Where the home is left for weeks or months and small problems become large in absence.",
  },
  {
    name: "Clients who prefer prevention over repair",
    body: "Who see care as an ongoing relationship, not a series of call-outs.",
  },
];

export default async function ProtectPage() {
  const sections = await getPageSections("protect");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const premise = sections.get("premise");
  const risks = sections.get("risks");
  const steps = sections.get("steps");
  const audience = sections.get("audience");
  const register = sections.get("register");
  const insurance = sections.get("insurance");
  const closing = sections.get("closing");
  const fca = sections.get("fca");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const riskCards = cmsCards(risks, RISK_AREAS, (c, base) => ({
    roman: pick(c.label, base?.roman ?? ""),
    name: pick(c.title, base?.name ?? ""),
    tagline: pick(c.value, base?.tagline ?? ""),
    body: pick(c.body, base?.body ?? ""),
    bullets: c.items && c.items.length ? c.items : base?.bullets ?? [],
  }));
  const stepCards = cmsCards(steps, STEPS, (c, base) => ({
    n: pick(c.label, base?.n ?? ""),
    name: pick(c.title, base?.name ?? ""),
    tagline: pick(c.value, base?.tagline ?? ""),
    body: pick(c.body, base?.body ?? ""),
  }));
  const audienceCards = cmsCards(audience, AUDIENCE, (c, base) => ({
    name: pick(c.title, base?.name ?? ""),
    body: pick(c.body, base?.body ?? ""),
  }));

  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true">
          <Image
            src={cms(hero, "imageUrl", "/home-v4/protect-hero.webp")}
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "Protect · Late 2026")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Catch the small things")}{" "}
              <em>{cms(hero, "headlineEm", "before they become the big ones.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "A slipped tile, a gutter quietly filling, a boiler service a year overdue, damp finding its way in behind a cupboard. Most home trouble starts small and patient, long before it becomes a claim. Home Protection is the House looking for it early, on the ground and in person, with every photograph, note and date kept in your HoWA record so the home remembers what was found and what was done.",
              )}
            </p>
            <div className={s.heroCtas}>
              <a href={cms(hero, "ctaHref", "#register")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Register interest in Home Protection")}
              </a>
              <a href={cms(hero, "cta2Href", "#brief")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "Read the brief")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Foresight. Verification. Ongoing care.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "The quiet discipline of looking after a place.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Premise */}
      <section id="brief" className={s.premise}>
        <p className={s.premiseStatement}>
          {cms(premise, "headline", "Most damage doesn't arrive dramatically.")}<br />
          {cms(premise, "subheadline", "It begins quietly.")}{" "}
          <em>{cms(premise, "headlineEm", "A slow leak, a forgotten battery, a system left unchecked.", "headline")}</em>
        </p>
        <p className={s.premiseBody}>
          {cms(
            premise,
            "body",
            "Home Protection & Risk Reduction is the House's answer to that reality. A new service focused on prevention, continuity, and stewardship over time.",
          )}
        </p>
      </section>

      {/* 4. Provides / Doesn't provide */}
      <section className={s.twinPanels}>
        <article className={`${s.twin} ${s.twinProvides}`}>
          <p className={s.twinKicker}>What this service</p>
          <h2 className={s.twinTitle}>
            <em>Provides.</em>
          </h2>
          <p className={s.twinLede}>
            Designed to prevent disruption before it begins. Quiet diligence,
            informed assessment, and ongoing attention.
          </p>
          <ul className={s.twinList}>
            {[
              "A preventative approach to home care",
              "Calm, practical risk identification",
              "Thoughtful follow-through and documentation",
              "Ongoing oversight, not reactive fixes",
            ].map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
        <article className={`${s.twin} ${s.twinDoesnt}`}>
          <p className={s.twinKicker}>What this service</p>
          <h2 className={s.twinTitle}>
            <em>Doesn't provide.</em>
          </h2>
          <p className={s.twinLede}>
            Not built on alarms, urgency, or worst-case scenarios. It
            complements responsible ownership, never replaces it.
          </p>
          <ul className={`${s.twinList} ${s.twinListExclude}`}>
            {[
              "An insurance product",
              "A legal survey",
              "A gadget-led alarm package",
              "A one-off checklist with no memory",
            ].map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      </section>

      {/* 5. Risk areas */}
      <section className={s.risks}>
        <header className={s.risksHead}>
          <p className={s.risksEy}>{cms(risks, "eyebrow", "Where our experts provide support")}</p>
          <h2 className={s.risksTitle}>
            {cms(risks, "headline", "The risks that build")}{" "}
            <em>{cms(risks, "headlineEm", "quietly.", "headline")}</em>
          </h2>
          <p className={s.risksLede}>
            {cms(
              risks,
              "body",
              "Most household damage doesn't come from a single dramatic event. It builds through small oversights: easy to miss, costly to ignore.",
            )}
          </p>
        </header>
        <div className={s.risksGrid}>
          {riskCards.map((area) => (
            <article key={area.roman} className={s.riskCard}>
              <p className={s.riskNumeral}>{area.roman}</p>
              <h3 className={s.riskName}>{area.name}</h3>
              <p className={s.riskTagline}>{area.tagline}</p>
              <p className={s.riskBody}>{area.body}</p>
              <ul className={s.riskBullets}>
                {area.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Three steps */}
      <section className={s.steps}>
        <header className={s.stepsHead}>
          <p className={s.stepsEy}>{cms(steps, "eyebrow", "What to expect")}</p>
          <h2 className={s.stepsTitle}>
            {cms(steps, "headline", "Three quiet acts of")}{" "}
            <em>{cms(steps, "headlineEm", "looking after.", "headline")}</em>
          </h2>
          <p className={s.stepsLede}>
            {cms(
              steps,
              "body",
              "When launched, Home Protection unfolds in three movements: assess, implement, watch over. Held in your home record, surfaced only when it matters.",
            )}
          </p>
        </header>
        <ol className={s.stepsGrid}>
          {stepCards.map((step) => (
            <li key={step.n} className={s.stepCard}>
              <p className={s.stepNumeral}>{step.n}</p>
              <h3 className={s.stepName}>{step.name}</h3>
              <p className={s.stepTagline}>{step.tagline}</p>
              <p className={s.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className={s.stepsClose}>
          {cms(steps, "body2", "You don't need to remember everything.")}{" "}
          <em>{cms(steps, "caption", "HoWA does that for you.")}</em>
        </p>
      </section>

      {/* 7. Who it's for — audience + still-life image */}
      <section className={s.audience}>
        <div className={s.audienceImage}>
          <Image
            src={cms(audience, "imageUrl", "/home-v4/protect-still-life.webp")}
            alt={cms(
              audience,
              "imageAlt",
              "A still life of stewardship: brass padlock, smoke detector, key, and chain on a wooden cabinet",
            )}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.audienceCopy}>
          <p className={s.audienceEy}>{cms(audience, "eyebrow", "Is it right for you?")}</p>
          <h2 className={s.audienceTitle}>
            {cms(audience, "headline", "For homes that expect to be")}{" "}
            <em>{cms(audience, "headlineEm", "looked after.", "headline")}</em>
          </h2>
          <ul className={s.audienceList}>
            {audienceCards.map((a) => (
              <li key={a.name}>
                <p className={s.audienceLabel}>{a.name}</p>
                <p className={s.audienceBody}>{a.body}</p>
              </li>
            ))}
          </ul>
          <p className={s.audienceClose}>
            {cms(audience, "body", "If you already trust the House with your home,")}{" "}
            <em>{cms(audience, "caption", "this is the next layer of care.")}</em>
          </p>
        </div>
      </section>

      {/* 8. Register interest band */}
      <section id="register" className={s.register}>
        <div className={s.registerInner}>
          <header className={s.registerHead}>
            <p className={s.registerEy}>
              {cms(register, "eyebrow", "Late 2026 · Priority for Housekeeper")}
            </p>
            <h2 className={s.registerTitle}>
              {cms(register, "headline", "Home")}{" "}
              <em>{cms(register, "headlineEm", "Protection.", "headline")}</em>
            </h2>
            <p className={s.registerLede}>
              {cms(
                register,
                "body",
                "A one-day in-person review by House-vetted specialists. The first practical act of Home Protection.",
              )}
            </p>
          </header>
          <div className={s.registerForm}>
            <ul className={s.registerBullets}>
              {[
                "Condition survey across the building: fabric, systems, access, security.",
                "Evidence pack: photographs, notes, and a prioritised works list.",
                "Insurance-ready documentation, filed straight to your HoWA record.",
                "Introductions to vetted specialists for anything the Review flags.",
              ].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className={s.registerNote}>
              Opening late 2026. Register interest and we'll write when it's
              ready, with priority for Housekeeper members.
            </p>
            <WaitlistMini
              product="protect_review"
              sourcePage="/protect"
              placeholder="Your email"
              buttonLabel="Register interest"
              successMessage="Thank you. We'll write when Home Protection opens."
            />
          </div>
        </div>
      </section>

      {/* 9. Insurance teaser */}
      <section id="insurance" className={s.insurance}>
        <div className={s.insuranceImage}>
          <Image
            src={cms(insurance, "imageUrl", "/home-v4/protect-insurance.webp")}
            alt={cms(
              insurance,
              "imageAlt",
              "An Edwardian London townhouse with a policeman standing guard at the front door at golden hour",
            )}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.insuranceCopy}>
          <p className={s.insuranceEy}>{cms(insurance, "eyebrow", "Register interest")}</p>
          <h2 className={s.insuranceTitle}>
            {cms(insurance, "headline", "House Approved")}{" "}
            <em>{cms(insurance, "headlineEm", "Insurance.", "headline")}</em>
          </h2>
          <p className={s.insuranceLede}>
            {cms(
              insurance,
              "subheadline",
              "Cover that understands period homes, valuable contents, and the things a standard policy quietly excludes.",
            )}
          </p>
          <p className={s.insuranceBody}>
            {cms(
              insurance,
              "body",
              "Introduced by the House, underwritten by FCA-regulated specialists we've vetted to the same standard as every partner who carries the House Approved seal. A proper conversation, not a comparison site.",
            )}
          </p>
          <ul className={s.insuranceBullets}>
            {[
              "A named underwriter who understands the home.",
              "Cover for period features, outbuildings, collections, and grounds.",
              "Claims support via the House. We stay with you until it resolves.",
            ].map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className={s.insuranceCtas}>
            <Link href="/protect/insurance" className={s.btnFilledDark}>
              See full insurance page
            </Link>
            <WaitlistMini
              product="insurance"
              sourcePage="/protect#insurance"
              placeholder="Your email"
              buttonLabel="Register interest"
              successMessage="Thank you. A House contact will reach out with next steps."
            />
          </div>
        </div>
      </section>

      {/* 10. Services available now — closing band, navy */}
      <section className={s.closing}>
        <FlowerWatermark color="white" side="right" opacity={0.12} />
        <div className={s.closingInner}>
          <p className={s.closingEy}>{cms(closing, "eyebrow", "A natural evolution")}</p>
          <h2 className={s.closingTitle}>
            {cms(closing, "headline", "The next layer of care from the")}{" "}
            <em>{cms(closing, "headlineEm", "House.", "headline")}</em>
          </h2>
          <p className={s.closingLede}>
            {cms(
              closing,
              "body",
              "Home Protection & Risk Reduction is thoughtful, preventative, and designed to last. Until it launches, you can explore the services already available.",
            )}
          </p>
          <div className={s.closingServices}>
            {[
              { name: "Gardening", href: "/services/gardening" },
              { name: "Window Cleaning", href: "/services/window-cleaning" },
              { name: "Cleaning", href: "/services/cleaning" },
              { name: "Gutter Cleaning", href: "/services/gutter-cleaning" },
            ].map((svc) => (
              <Link key={svc.name} href={svc.href} className={s.closingService}>
                <span className={s.closingServiceName}>{svc.name}</span>
                <span className={s.closingServiceArrow}>Available now →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FCA notice */}
      <section className={s.fca}>
        <p>
          {cms(
            fca,
            "body",
            "House of HoWA acts as an introducer for insurance products; we do not advise on, arrange, or conduct regulated activity. Introductions are passed to FCA-authorised partners for any subsequent discussion, quotation, or contract.",
          )}{" "}
          See our <Link href="/legal/privacy">privacy page</Link> for how your details are handled.
        </p>
      </section>
    </div>
  );
}
