import Image from "next/image";
import Link from "next/link";
import s from "./steward-plans.module.css";
import { getHomeGardenPlans, getApartmentPlans } from "@/lib/cms/steward-plans";
import { StewardPlanLadder } from "./StewardPlanLadder";
import { StewardCalculator } from "./StewardCalculator";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

/**
 * /steward-plans — lander framework, navy blueprint mode (Steward only).
 *
 * Section order:
 *   1. Hero — full-bleed lifestyle image, navy scrim, copy bottom-left
 *   2. Four pillars on navy
 *   3. Plan ladder (StewardPlanLadder client)
 *   4. How it works — three steps on cream
 *   5. Image band — Consciously Cared For
 *   6. What's included — six service cards
 *   7. Trust strip
 *   8. Calculator (StewardCalculator client)
 *   9. House Steward membership band (navy-deep)
 *  10. Closing
 */

export const metadata = {
  title: "Steward Plans: Care on a rhythm.",
  description:
    "Bundle your home services into a single monthly Steward Plan. Gardening, cleaning, windows, gutters, managed through HoWA. Available to House Steward members.",
};

const PILLARS = [
  { roman: "I.", title: "Schedule", desc: "Every service scheduled on a rhythm you set. HoWA sends the right team at the right time." },
  { roman: "II.", title: "Remember", desc: "Every visit logged: who came, what they did, what they noticed. The record compounds." },
  { roman: "III.", title: "Coordinate", desc: "No chasing three different companies. One plan, one monthly payment, one House standard." },
  { roman: "IV.", title: "Improve", desc: "HoWA learns the home. Seasonal patterns, wear points, preferences. The plan adapts." },
];

const STEPS = [
  { n: "01.", title: "Tell us about the home.", body: "Postcode, property type, what you'd like done. Five minutes through the consultation form or the HoWA Assistant." },
  { n: "02.", title: "We propose a plan.", body: "A fixed monthly quote, by the home, not by the hour. Itemised, transparent, no surprises. Adjust until it's right." },
  { n: "03.", title: "We arrive when we said.", body: "Vetted, insured teams. Text before arrival. Photographs in your HoWA record after. One monthly payment covers everything." },
];

const SERVICES = [
  { name: "Gardening", desc: "Seasonal pruning, weeding, lawn care, and planting by horticulturally trained gardeners.", freq: "Weekly or fortnightly" },
  { name: "Cleaning", desc: "Full domestic clean: kitchens, bathrooms, living spaces. Surface-appropriate, fragrance-free on request.", freq: "Weekly · 2-3 hours" },
  { name: "Window cleaning", desc: "Pure-water pole system, frames and sills included. Up to four storeys from the ground.", freq: "Monthly" },
  { name: "Gutter cleaning", desc: "Vacuum-pole gutter clear, photographic record, downpipe check, condition report.", freq: "Bi-annual" },
  { name: "Deep cleaning", desc: "Quarterly deep clean: behind furniture, inside ovens, descale, skirting, light switches.", freq: "Quarterly · 4 hours" },
  { name: "HoWA record", desc: "Every visit logged: team, notes, photographs, products used. The living memory of your home's care.", freq: "Always on" },
];

const TRUST = [
  "House & Garden 'The List'",
  "Guild of Master Craftsmen",
  "Carbon Neutral Certified",
  "Fully Insured & Accredited",
  "Safe Contractor Approved",
];

const STEWARD_BENEFITS = [
  "Access to all plans",
  "Priority scheduling",
  "Dedicated House contact",
  "Quarterly reviews",
  "One monthly invoice",
];

export default async function StewardPlansPage() {
  const homeGardenPlans = await getHomeGardenPlans();
  const apartmentPlans = await getApartmentPlans();

  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroImage}>
          <Image
            src="/home-v4/steward-hero-blueprint.webp"
            alt="A well-kept home rendered as architectural blueprint"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.heroScrim} aria-hidden="true" />
        <div className={s.heroCopy}>
          <p className={s.heroEy}>HoWA · Steward Plans</p>
          <h1 className={s.heroTitle}>
            Care on a rhythm <em>the home can trust.</em>
          </h1>
          <p className={s.heroLede}>
            Bundle your home services into a single monthly plan. HoWA holds
            the calendar, remembers what's due, and sends the right hands at
            the right time. One invoice. One standard. One House.
          </p>
          <div className={s.heroCtas}>
            <Link href="#plans" className={s.btnFilled}>
              See the plans
            </Link>
            <Link href="#calculator" className={s.btnGhostLight}>
              Build your own
              <span aria-hidden="true" className={s.btnArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Four pillars */}
      <section className={s.pillars}>
        <header className={s.pillarsHead}>
          <p className={s.pillarsEy}>What a Steward Plan does</p>
          <h2 className={s.pillarsTitle}>
            One system. <em>Four quiet jobs.</em>
          </h2>
          <p className={s.pillarsLede}>
            Whether it's an apartment or a five-bedroom house, the system does
            the same four things.
          </p>
        </header>
        <div className={s.pillarsGrid}>
          {PILLARS.map((p) => (
            <article key={p.title} className={s.pillarCard}>
              <span className={s.pillarRoman}>{p.roman}</span>
              <h3 className={s.pillarName}>{p.title}</h3>
              <p className={s.pillarDesc}>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Plan ladder */}
      <section id="plans" className={s.ladder}>
        <header className={s.ladderHead}>
          <p className={s.ladderEy}>Choose your plan</p>
          <h2 className={s.ladderTitle}>
            Two categories. <em>Three tiers each.</em>
          </h2>
          <p className={s.ladderLede}>
            Home &amp; Garden+ for houses with outdoor space. Apartment+ for
            flats. Pick the tier that matches your rhythm.
          </p>
        </header>
        <StewardPlanLadder
          homeGardenPlans={homeGardenPlans}
          apartmentPlans={apartmentPlans}
        />
      </section>

      {/* 4. How it works */}
      <section className={s.howItWorks}>
        <header className={s.howHead}>
          <p className={s.howEy}>How it works</p>
          <h2 className={s.howTitle}>
            Three steps to a <em>plan that runs itself.</em>
          </h2>
          <p className={s.howLede}>
            From first conversation to first visit, typically within a week.
          </p>
        </header>
        <div className={s.howGrid}>
          {STEPS.map((step) => (
            <article key={step.n} className={s.howStep}>
              <span className={s.howStepN}>{step.n}</span>
              <h3 className={s.howStepName}>{step.title}</h3>
              <p className={s.howStepBody}>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Editorial image band */}
      <section className={s.imageBand}>
        <Image
          src="/home-v4/steward-photo-blueprint.webp"
          alt="A well-kept home and garden, photo dissolving into blueprint"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className={s.imageBandScrim} aria-hidden="true" />
        <div className={s.imageBandCopy}>
          <p className={s.imageBandEy}>The Steward Standard</p>
          <h2 className={s.imageBandTitle}>
            Consciously <em>cared for.</em>
          </h2>
          <p className={s.imageBandLede}>
            Every team is vetted, insured, and trained to the House standard.
            Carbon neutral as standard. Products House-approved. The care is
            the whole point.
          </p>
        </div>
      </section>

      {/* 6. What's included */}
      <section className={s.included}>
        <header className={s.includedHead}>
          <p className={s.includedEy}>What's in every plan</p>
          <h2 className={s.includedTitle}>
            Six disciplines, <em>one standard.</em>
          </h2>
        </header>
        <div className={s.includedGrid}>
          {SERVICES.map((svc) => (
            <article key={svc.name} className={s.serviceCard}>
              <h3 className={s.serviceName}>{svc.name}</h3>
              <p className={s.serviceDesc}>{svc.desc}</p>
              <p className={s.serviceFreq}>{svc.freq}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Trust strip */}
      <div className={s.trust}>
        {TRUST.map((t) => (
          <span key={t} className={s.trustItem}>{t}</span>
        ))}
      </div>

      {/* 8. Calculator */}
      <section id="calculator" className={s.calculator}>
        <header className={s.calculatorHead}>
          <p className={s.calculatorEy}>Or build your own</p>
          <h2 className={s.calculatorTitle}>
            Not sure which plan? <em>Start here.</em>
          </h2>
          <p className={s.calculatorLede}>
            Select the services you need. We'll match you to the right Steward
            Plan and show your monthly cost.
          </p>
        </header>
        <StewardCalculator />
      </section>

      {/* 9. House Steward membership */}
      <section className={s.membership}>
        <p className={s.membershipEy}>House Steward</p>
        <h2 className={s.membershipTitle}>
          These plans are available to <em>House Steward members.</em>
        </h2>
        <p className={s.membershipLede}>
          House Steward is the recurring managed-care membership that unlocks
          Steward Plans. One membership, every plan, priority scheduling, a
          dedicated House contact.
        </p>
        <div className={s.membershipBenefits}>
          {STEWARD_BENEFITS.map((b) => (
            <span key={b} className={s.membershipBenefit}>{b}</span>
          ))}
        </div>
        <Link href="/household/steward" className={s.btnFilled}>
          Become a House Steward
        </Link>
      </section>

      {/* 10. Closing */}
      <section className={s.closing}>
        <FlowerWatermark color="gold" side="right" opacity={0.19} />
        <p className={s.closingStatement}>
          <em>A well-kept home isn't a pile of bookings.</em><br />
          It's a rhythm someone else remembers.
        </p>
        <Link href="#open-booking-form" className={s.btnFilledCream}>
          Start your Steward Plan
        </Link>
      </section>
    </div>
  );
}
