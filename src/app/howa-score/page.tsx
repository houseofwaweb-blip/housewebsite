import Link from "next/link";
import Image from "next/image";

/**
 * /howa-score — the HoWA Score, on the House of HoWA site.
 *
 * Applies the HoWA Score Page Copy amend: the Score is the bridge between
 * trusted services, the Home Record and the HoWA platform. It connects the
 * commercial House world (book a service) to the product engine (the work is
 * remembered, the record improves, the Score becomes more useful).
 * Core line: The House does the work. HoWA remembers it.
 */

export const metadata = {
  title: "HoWA Score | One number for a home well kept",
  description:
    "The HoWA Score is a living measure of how well your home is known, cared for and ready for what comes next. It grows as trusted work is remembered.",
};

const DIMENSIONS = [
  { name: "Record completeness", body: "Rooms, assets, documents, warranties, certificates, photographs and service history." },
  { name: "Maintenance rhythm", body: "What is due, what is complete, what is overdue, and what should recur." },
  { name: "Evidence strength", body: "Invoices, photos, guarantees, certificates, approvals and proof of care." },
  { name: "Risk readiness", body: "Weather, damp, drainage, fabric, access, safety and insurance-readiness gaps." },
  { name: "Efficiency & utilities", body: "EPC, energy, water, systems, devices and operational performance." },
  { name: "Future stewardship", body: "Plans, approvals, transfer readiness, seasonal care and long-term improvement." },
];

const HOUSE_IMPROVES = [
  "A garden visit can update the seasonal record.",
  "A window clean can support the maintenance rhythm.",
  "A handyman repair can save proof, photographs and warranty notes.",
  "A removal can help create a handover record.",
  "A design project can become part of the home's long-term plan.",
];

const FLOW = ["Booked", "Delivered", "Remembered", "Home Record", "HoWA Score"];

const SERVICE_FAMILY = [
  { name: "Willow Alexander Gardeners", line: "Garden maintenance and seasonal care.", href: "/services/gardening" },
  { name: "Willow Alexander Gardens", line: "Garden design, planting and outdoor transformation.", href: "/design/gardens" },
  { name: "Willow Alexander Cleaners", line: "Regular home cleaning and care.", href: "/services/cleaning" },
  { name: "Willow Alexander Window Cleaners", line: "Reliable window care and exterior rhythm.", href: "/services/window-cleaning" },
  { name: "Willow Alexander Handyman", line: "Repairs, fixes and practical support.", href: "/services/handyman" },
  { name: "Willow Alexander Removals", line: "Moving, preparation and handover support.", href: "/services/removals" },
];

const IMPROVE = [
  "Add documents",
  "Save service visits",
  "Complete tasks",
  "Resolve open risks",
  "Attach evidence",
  "Build a seasonal care rhythm",
  "Keep decisions, plans and certificates in one place",
  "Connect trusted services and approved partners",
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-gold-ink hover:text-house-gold-ink";

export default function HowaScorePage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-20 pb-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">
          HoWA · The Score
        </p>
        <h1 className="font-display text-[clamp(40px,6vw,76px)] leading-[1.03] tracking-[-0.01em] text-house-black max-w-[16ch]">
          One number for a <em className="italic">home well kept.</em>
        </h1>
        <p className="font-sans text-[19px] leading-[1.65] text-house-brown/80 mt-8 max-w-[58ch]">
          The HoWA Score is a living measure of how well your home is known, cared
          for and ready for what comes next. It grows from the things that usually
          disappear: service visits, documents, repairs, warranties, photographs,
          certificates, risks, plans and decisions. It is not a one-off
          inspection. It is the home becoming legible over time.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/howa/assistant" className={ctaPrimary}>
            Start with my address
          </Link>
          <Link href="/howa/how-it-works" className={ctaSecondary}>
            Improve my Score
          </Link>
        </div>
        <p className="font-sans text-[13px] tracking-[0.02em] text-house-stone mt-6">
          The House does the work. HoWA remembers it.
        </p>
      </section>

      {/* Score dashboard visual */}
      <section className="px-[5vw] pb-4 max-w-[1080px] mx-auto">
        <div className="relative aspect-[16/9] overflow-hidden bg-house-cream-dark border border-house-brown/10">
          <Image
            src="/howa/score-dashboard.webp"
            alt="A HoWA Score dashboard: record completeness, maintenance rhythm, evidence, risk, efficiency and stewardship"
            fill
            sizes="(min-width:1024px) 1020px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* What the Score reads */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-house-black mb-3">
            What the Score reads
          </h2>
          <p className="font-sans text-[17px] leading-[1.6] text-house-brown/75 max-w-[52ch] mb-10">
            The HoWA Score looks across six living dimensions of the home.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIMENSIONS.map((d, i) => (
              <div key={d.name} className="bg-house-cream border border-house-brown/12 p-6">
                <div className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-[22px] leading-[1.15] text-house-black mb-2">{d.name}</h3>
                <p className="font-sans text-[15px] leading-[1.55] text-house-brown/75">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="px-[5vw] py-16 max-w-[820px] mx-auto">
        <h2 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.12] text-house-black mb-5">
          Why it matters
        </h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/82 mb-4">
          When a home has no memory, the owner carries the burden. You have to
          remember who came, what was done, what was paid, what was promised, what
          was guaranteed and what needs checking next.
        </p>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/82">
          The HoWA Score moves that burden into the home itself. It gives you a
          clearer view of what is missing, what is improving and what should happen
          before small problems become expensive ones.
        </p>
        <p className="font-display italic text-[clamp(22px,2.6vw,30px)] leading-[1.35] text-house-brown mt-9 max-w-[24ch]">
          The Score turns home care from scattered effort into visible stewardship.
        </p>
      </section>

      {/* How the House improves the Score */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.12] text-house-black mb-5">
            How the House improves the Score
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[56ch] mb-8">
            Every House of HoWA service can do more than complete a task.
          </p>
          <ul className="grid gap-y-3 sm:grid-cols-2 gap-x-10 mb-9">
            {HOUSE_IMPROVES.map((r) => (
              <li key={r} className="font-sans text-[16px] leading-[1.55] text-house-brown/85 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold-ink">
                {r}
              </li>
            ))}
          </ul>
          <p className="font-sans text-[16px] leading-[1.65] text-house-brown/78 max-w-[58ch] mb-8">
            When the work is booked through HoWA, the outcome can be saved to the
            Home Record, and the Score becomes more accurate.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-9">
            {FLOW.map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="font-sans text-[13px] tracking-[0.12em] uppercase text-house-brown/80 border border-house-brown/15 px-3 py-1.5">
                  {step}
                </span>
                {i < FLOW.length - 1 ? <span aria-hidden className="text-house-gold-ink">→</span> : null}
              </span>
            ))}
          </div>
          <a href="#open-booking-form" className={ctaPrimary}>
            Book through HoWA
          </a>
        </div>
      </section>

      {/* The founding service family */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
          The founding service family
        </p>
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[62ch] mb-9">
          The Willow Alexander service family are the first teams working through
          the House of HoWA standard. Each service can become part of the home's
          living record.
        </p>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_FAMILY.map((s) => (
            <Link key={s.name} href={s.href} className="group block no-underline border-t border-house-brown/15 pt-4">
              <h3 className="font-display text-[19px] leading-[1.2] text-house-black group-hover:text-house-gold-ink transition-colors">
                {s.name}
              </h3>
              <p className="font-sans text-[14px] leading-[1.55] text-house-brown/70 mt-1.5">{s.line}</p>
            </Link>
          ))}
        </div>
        <div className="mt-9">
          <Link href="/services" className={ctaSecondary}>
            Explore services →
          </Link>
        </div>
      </section>

      {/* How the Score improves */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.12] text-house-black mb-3">
            How the Score improves
          </h2>
          <p className="font-sans text-[17px] leading-[1.6] text-house-brown/75 max-w-[56ch] mb-8">
            A home becomes better known by what is saved, completed and resolved.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {IMPROVE.map((item) => (
              <li key={item} className="font-sans text-[16px] leading-[1.5] text-house-brown/82 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold-ink">
                {item}
              </li>
            ))}
          </ul>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/78 mt-8 max-w-[56ch]">
            Every useful action should do one of three things: improve the record,
            explain a gap, or suggest the next best step.
          </p>
        </div>
      </section>

      {/* For House Approved partners */}
      <section className="px-[5vw] py-16 bg-house-black text-house-cream border-t border-house-brown/20">
        <div className="max-w-[900px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-light mb-4">
            For House Approved partners
          </p>
          <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.12] text-house-cream mb-5 max-w-[22ch]">
            The Score also changes how trusted professionals work.
          </h2>
          <p className="font-sans text-[16px] leading-[1.7] text-house-cream/80 max-w-[60ch] mb-4">
            House Approved providers are not just sent to complete isolated jobs.
            Their work can contribute to the customer's Home Record: proof, notes,
            photographs, invoices, warranty details and next recommendations.
          </p>
          <p className="font-sans text-[16px] leading-[1.7] text-house-cream/70 max-w-[60ch]">
            That creates a better customer relationship and a stronger standard of
            care.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/partners"
              className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-black bg-house-gold-light border border-house-gold-light px-6 py-3 no-underline transition-[filter] hover:brightness-105"
            >
              Become House Approved
            </Link>
            <Link
              href="/partners"
              className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-light hover:text-house-gold-light"
            >
              Partner with the House
            </Link>
          </div>
        </div>
      </section>

      {/* What the Score is not */}
      <section className="px-[5vw] py-16 max-w-[760px] mx-auto">
        <h2 className="font-sans text-[13px] tracking-[0.2em] uppercase text-house-stone mb-4">
          What the Score is not
        </h2>
        <p className="font-sans text-[16px] leading-[1.7] text-house-brown/72 mb-4">
          The HoWA Score is not a legal survey, emergency service, valuation,
          insurance recommendation or guarantee. It is a practical stewardship
          measure: a way to understand what is known, what is missing, what needs
          attention and how the home is being cared for over time.
        </p>
        <p className="font-sans text-[16px] leading-[1.7] text-house-brown/72">
          For legal, structural, insurance or regulated advice, HoWA may recommend
          the right professional route.
        </p>
      </section>

      {/* Final CTA */}
      <section className="px-[5vw] py-20 bg-house-brown text-house-cream text-center">
        <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.15] text-house-cream/95 max-w-[22ch] mx-auto">
          Start the record. Improve the Score.
        </h2>
        <p className="font-sans text-[17px] leading-[1.7] text-house-cream/75 max-w-[52ch] mx-auto mt-5">
          Begin with your address, book through HoWA, or add the first document
          your home should not forget.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/howa/assistant"
            className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-7 py-3 no-underline hover:brightness-110 transition-[filter]"
          >
            Start with my address
          </Link>
          <a
            href="#open-booking-form"
            className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/30 px-7 py-3 no-underline transition-colors hover:border-house-gold-light hover:text-house-gold-light"
          >
            Book through HoWA
          </a>
        </div>
      </section>
    </div>
  );
}
