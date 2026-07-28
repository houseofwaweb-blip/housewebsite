import Link from "next/link";
import Image from "next/image";
import { SampleDesignShowcase } from "@/components/design/SampleDesignShowcase";

/**
 * /howa — "Powered by HoWA" (23rd amendments · Powered by HoWA Page Designer
 * Handoff, July 2026). FULL REBUILD, supersedes the earlier "The House uses
 * HoWA" explainer.
 *
 * Governing decision: the House sells the service, HoWA powers the intelligence.
 * A service-led acquisition page, not a HoWA product page. The House is the
 * protagonist; "Powered by HoWA" is the endorsement, never equal co-branding.
 *
 * Section order (brief §03):
 *   1 Hero · 2 Choose what you need · 3 How it works · 4 Garden Scan ·
 *   5 Repair Scan · 6 AI Design · 7 Book + manage · 8 Why it is better ·
 *   9 Real service proof · 10 HoWA writeback · 11 Discover wider HoWA ·
 *   12 Final conversion
 *
 * Locked removals (brief §14 REMOVE / §15 acceptance): no Bureau as a product
 * explainer, no Persona / Household cabinet-houses presented as House services,
 * no equal co-branding, and "HoWA Assistant" / "Home Health" / "House Health
 * Score" must not survive. "HoWA Score" is permitted, only in the §11 expansion.
 *
 * Naming: "AI Design" is used verbatim as the brief specifies (user decision).
 *
 * IMAGERY: every visual is a described placeholder carrying the handoff's exact
 * direction for that slot, so the real imagery can be generated or sourced. The
 * one exception is the AI Design module, which uses the built scan-to-design
 * animation (SampleDesignShowcase).
 */

export const metadata = {
  title: { absolute: "Powered by HoWA | A more intelligent way to care for your home" },
  description:
    "Scan your garden, show us a repair, explore a design or book a visit. HoWA helps House of Willow Alexander understand what is needed before we arrive, prepare the right route, and keep every quote, visit and document with your home.",
};

/**
 * Image placeholder. Carries the handoff's visual direction for the slot, which
 * of the five visual jobs it serves (Need / Scan / Service / Record /
 * Expansion), and its DO-NOTs.
 */
function ImageSlot({
  role,
  desc,
  donot,
  file,
  dims,
  aspect = "aspect-[4/3]",
}: {
  role: string;
  desc: string;
  donot?: string;
  /** Exact path to save the finished image to (under /public). */
  file: string;
  /** Recommended pixel size + aspect, e.g. "1600 × 1200 (4:3)". */
  dims: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative flex w-full ${aspect} items-center justify-center overflow-hidden border-2 border-dashed border-house-gold/55 bg-house-cream-dark/40 p-6`}
    >
      <div className="max-w-[46ch] text-center">
        <p className="mb-2 font-sans text-[10px] tracking-[0.24em] uppercase text-house-gold-ink">
          Image · {role}
        </p>
        <p className="font-sans text-[13px] leading-[1.5] text-house-brown/85">{desc}</p>
        {donot ? (
          <p className="mt-2 font-sans text-[11px] leading-[1.45] text-house-stone/70">Do not: {donot}</p>
        ) : null}
        <p className="mt-3 font-mono text-[11px] leading-[1.5] text-house-gold-ink">
          Save as: <span className="text-house-brown">public{file}</span>
          <br />
          <span className="text-house-stone">{dims}</span>
        </p>
      </div>
    </div>
  );
}

/** §02 / §05 — the four entry tools. Each slot description is the doc's subject
 *  for that tool. */
const TOOLS: Array<{
  name: string;
  line: string;
  body: string;
  cta: string;
  href: string;
  slot: string;
  file: string;
  dims: string;
  ready?: boolean;
  alt?: string;
}> = [
  {
    name: "Garden Scan",
    line: "Scan your garden. See what it needs.",
    body: "Upload photographs or a short video. HoWA helps the House identify the likely work, seasonal priorities and the right service route.",
    cta: "Scan your garden",
    href: "/services/gardening",
    slot: "A real garden with a recognisable need (overgrowth, tired borders, a job waiting). Contemporary, lived, specific.",
    file: "/powered-by-howa/tool-garden-scan.webp",
    dims: "800 × 600 (4:3)",
    ready: true,
    alt: "An overgrown walled garden with tired borders, the HoWA scan overlay sketching the cleared paths, defined borders and seating area it could become.",
  },
  {
    name: "Repair Scan",
    line: "Show us the problem.",
    body: "Photograph a fault, mark, leak or damaged item. HoWA helps explain the likely issue, urgency and what should happen next.",
    cta: "Show us a repair",
    href: "/services/handyman",
    slot: "A real fault in a real home: a leak, a mark, a broken fitting. The everyday problem a Repair Scan captures.",
    file: "/powered-by-howa/tool-repair-scan.webp",
    dims: "800 × 600 (4:3)",
    ready: true,
    alt: "A damp-stained kitchen wall with a HoWA repair-scan overlay marking the leak source, damaged plaster, skirting and repaint work needed.",
  },
  {
    name: "AI Design",
    line: "Scan the space. See what it could become.",
    body: "HoWA reads the room or garden. The House turns that intelligence into an initial direction, budget route and human design service.",
    cta: "Start a design scan",
    href: "/design/sample",
    slot: "A real room or garden as it is today, the existing life of a space before AI Design reimagines it.",
    file: "/powered-by-howa/tool-ai-design.webp",
    dims: "800 × 600 (4:3)",
    ready: true,
    alt: "A real sitting room with an AI Design overlay sketching a softer palette, layered lighting, built-in shelving and a reading corner.",
  },
  {
    name: "Book a service",
    line: "Know what you need already?",
    body: "Choose the House service, receive and approve a quotation, book the visit and keep every outcome with the property.",
    cta: "Book the House",
    href: "#open-booking-form",
    slot: "A House service being carried out: a real team at work, the moment a booked visit is delivered.",
    file: "/powered-by-howa/tool-book.webp",
    dims: "800 × 600 (4:3)",
    ready: true,
    alt: "A House gardener kneeling to plant seasonal flowers in a border, a booked service being delivered.",
  },
];

/** §03 / §06 — the six-stage relationship. Provider and platform named per stage. */
const STEPS = [
  { n: "1", t: "Show", b: "Upload images, scan the space or choose a service.", who: "You" },
  { n: "2", t: "Understand", b: "HoWA structures the need, context and evidence.", who: "HoWA" },
  { n: "3", t: "Quote", b: "The House reviews the scope and issues the quotation.", who: "The House" },
  { n: "4", t: "Book", b: "Approve, pay, schedule and communicate through HoWA.", who: "HoWA" },
  { n: "5", t: "Deliver", b: "The House or named partner completes the service.", who: "The House" },
  { n: "6", t: "Remember", b: "Evidence, invoice, warranty and next action return to the home.", who: "HoWA" },
];

/** §08 / §11 — why this is better, as customer benefit not software. */
const BENEFITS = [
  { t: "Less explaining", b: "The need and evidence are captured once." },
  { t: "Better prepared", b: "The professional arrives with the agreed context." },
  { t: "Clearer quotes", b: "The House can scope and price with better information." },
  { t: "One place for proof", b: "Visits, invoices, warranties and evidence stay together." },
  { t: "Smarter future care", b: "Every completed action improves what the home knows." },
];

/** §09 / §12 — real service proof, three real-work stories. */
const PROOF: Array<{
  kind: string;
  title: string;
  steps: string[];
  slot: string;
  file: string;
  dims: string;
  ready?: boolean;
  alt?: string;
}> = [
  {
    kind: "Garden",
    title: "From scan to seasonal care",
    steps: ["Customer uploads the garden", "HoWA identifies likely needs and season", "House confirms the maintenance or design route", "Visit, evidence and next seasonal action are saved"],
    slot: "A real garden service moment (a House team clearing or planting) paired with the structured HoWA record made from it.",
    file: "/powered-by-howa/proof-garden.webp",
    dims: "1200 × 750 (16:10)",
    ready: true,
    alt: "A Willow Alexander Gardens team member tidying a mature planted border in a real garden.",
  },
  {
    kind: "Repair",
    title: "From mark to recorded fix",
    steps: ["Customer photographs the issue", "HoWA explains likely cause and urgency", "House arranges the appropriate professional", "Repair, invoice and warranty are saved"],
    slot: "A real repair being completed by a House professional, beside the saved repair, invoice and warranty record.",
    file: "/powered-by-howa/proof-repair.webp",
    dims: "1200 × 750 (16:10)",
    ready: true,
    alt: "A Willow Alexander Handyman professional beside the branded House van, ready for a booked repair visit.",
  },
  {
    kind: "Design",
    title: "From scan to human brief",
    steps: ["Customer scans the room or garden", "HoWA creates the initial direction and context", "House or partner develops the design", "Approved brief and decisions stay with the property"],
    slot: "A real room or garden and its developed human design, beside the retained brief and decisions saved with the property.",
    file: "/powered-by-howa/proof-design.webp",
    dims: "1200 × 750 (16:10)",
    ready: true,
    alt: "A Delve Interiors dining room with a painted ceiling, layered lighting and styled period detail.",
  },
];

const HOWA = "https://howa.co.uk";
const MY_HOME = "https://accounts.willowalexander.co.uk/";

export default function PoweredByHowaPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* 1. HERO (§04). House protagonist, HoWA the reason it feels more
          intelligent. Real home first, product proof second. */}
      <section className="px-[5vw] pt-[clamp(48px,6vw,96px)] pb-[clamp(40px,5vw,80px)]">
        <div className="mx-auto grid max-w-[1280px] gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="mb-5 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
              House services, powered by HoWA
            </p>
            <h1 className="font-display text-[clamp(34px,5.4vw,66px)] leading-[1.04] text-house-brown">
              A more intelligent way <em>to care for your home.</em>
            </h1>
            <p className="mt-7 max-w-[58ch] font-sans text-[17px] leading-[1.65] text-house-stone">
              Scan your garden, show us a repair, explore a design or book a
              visit. HoWA helps the House understand what is needed before we
              arrive, prepare the right route, and keep every quote, visit,
              document and completed action with your home.
            </p>
            <p className="mt-4 font-display text-[clamp(17px,1.8vw,22px)] italic leading-[1.3] text-house-brown">
              Real people. Better prepared. Everything remembered.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#choose" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
                Choose what you need <span aria-hidden>→</span>
              </a>
              <a href="#open-booking-form" className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
                Book a service
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/powered-by-howa/hero.webp"
              alt="A House team member arranging flowers in a real kitchen, with HoWA scan results (Boiler Service due, Garden Visit confirmed, Dishwasher warranty) held quietly alongside."
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. CHOOSE WHAT YOU NEED (§05). */}
      <section id="choose" className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Start with what you need</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Four ways in, <em>all powered by HoWA.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Each one is a House service feature. HoWA reads the need before we
              arrive; the House prepares the route, the quote and the work.
            </p>
          </div>
          <div className="mx-auto grid max-w-[1040px] gap-6 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <Link key={tool.name} href={tool.href} className="group flex flex-col border border-house-brown/12 bg-house-cream no-underline transition-colors hover:border-house-gold">
                {tool.ready ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image src={tool.file} alt={tool.alt ?? tool.name} fill sizes="(max-width: 640px) 100vw, 520px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                ) : (
                  <ImageSlot role={tool.name} desc={tool.slot} file={tool.file} dims={tool.dims} aspect="aspect-[4/3]" />
                )}
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h3 className="font-display text-[26px] leading-tight text-house-brown">{tool.name}</h3>
                  <p className="mb-3 mt-1 font-sans text-[11px] tracking-[0.14em] uppercase text-house-gold-ink">Powered by HoWA</p>
                  <p className="mb-2 font-sans text-[17px] leading-[1.4] text-house-brown">{tool.line}</p>
                  <p className="mb-7 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{tool.body}</p>
                  <span className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">{tool.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (§06). */}
      <section className="bg-house-forest px-[5vw] py-[clamp(52px,6.5vw,100px)]">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto mb-11 max-w-[720px] text-center">
            <p className="mb-3 font-sans text-[11px] tracking-[0.26em] uppercase text-house-gold-light">How it works</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-cream">
              Show. Understand. Quote. Book. Deliver. <em>Remember.</em>
            </h2>
            <p className="mx-auto max-w-[60ch] font-sans text-[15px] leading-[1.6] text-[rgba(245,240,232,0.82)]">
              The House does the work. HoWA remembers it. Every stage names who is responsible.
            </p>
          </div>
          <ol className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="border-t border-house-gold-dark/40 pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[26px] leading-none text-house-gold-light">{step.n}</span>
                  <h3 className="font-display text-[21px] leading-tight text-house-cream">{step.t}</h3>
                </div>
                <p className="mt-2 font-sans text-[10px] tracking-[0.2em] uppercase text-house-gold-light/80">{step.who}</p>
                <p className="mt-2 font-sans text-[14px] leading-[1.55] text-[rgba(245,240,232,0.8)]">{step.b}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-[74ch] text-center font-sans text-[13px] leading-[1.6] text-[rgba(245,240,232,0.62)]">
            HoWA may provide initial guidance and indicative cost context. Final
            scope, quotation, regulated advice and service responsibility remain
            with the House or the named professional.
          </p>
        </div>
      </section>

      {/* 4. GARDEN SCAN (§07). */}
      <ScanModule
        eyebrow="Garden Scan · Powered by HoWA"
        title="Scan your garden. See what it needs."
        body="Upload photographs or a short video. HoWA helps the House assess the likely work, seasonal priorities and the right service route before we prepare your quotation."
        receives={["Likely work required", "Maintenance, clearance, planting or design route", "Seasonal context", "Indicative cost range where appropriate", "The questions needed to confirm the scope", "House service and booking options"]}
        cta="Start your garden scan"
        href="/services/gardening"
        endorsement="Garden Scan by House of Willow Alexander · Powered by HoWA"
        note="For standardised work HoWA may produce an indicative or rapid quote route. The House confirms the final scope and price."
        bg="cream"
        imageSide="right"
        visual={
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/powered-by-howa/garden-scan-sequence.webp"
              alt="A real garden with the HoWA Garden Scan overlay marking the likely work: soften the pergola with climbers, improve the seating area, add structural and seasonal planting and strengthen the path edges."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        }
        slotRole="Garden Scan sequence"
        slotDesc="The journey from uncertain garden to qualified House service: real garden and a recognisable need, the customer capturing photos or video, the HoWA result identifying likely needs and route, the House quotation, the professional completing the work, and the scope, evidence and next seasonal action being saved."
        slotDonot="use The Gardener Persona Doll's House as the service advert."
        slotFile="/powered-by-howa/garden-scan-sequence.webp"
        slotDims="1400 × 1050 (4:3)"
      />

      {/* 5. REPAIR SCAN (§08). */}
      <ScanModule
        eyebrow="Repair Scan · Powered by HoWA"
        title="Show us the problem."
        body="Photograph a fault, mark, leak or damaged item. HoWA helps interpret the likely issue, urgency, relevant warranty or repair history and fair-cost route before the House confirms what should happen next."
        receives={["The likely issue", "Urgency", "Confidence and limitations", "Relevant warranty or history", "Indicative cost context", "The recommended professional route"]}
        cta="Show us a repair"
        href="/services/handyman"
        endorsement="Repair Scan by House of Willow Alexander · Powered by HoWA"
        note="Initial guidance only. Not a structural survey, safety certificate or emergency service. If there is immediate danger, contact the relevant emergency or qualified professional route."
        bg="white"
        imageSide="left"
        visual={
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/powered-by-howa/repair-scan-sequence.webp"
              alt="A real room with the HoWA Repair Scan overlay stepping through the fix: identify the crack at the wall panel, prepare and smooth the surface, repair and reinstate the panel, then repaint and restore the skirting."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        }
        slotRole="Repair Scan sequence"
        slotDesc="Signal to service without a corporate-tech overlay: the real fault in a real home, a literal capture or upload, the HoWA result (issue, urgency, confidence and cost context), the House review and quotation, the professional repair and completion evidence, then the repair, invoice and warranty written back."
        slotDonot="stage a slick corporate-tech overlay or a Persona Doll's House."
        slotFile="/powered-by-howa/repair-scan-sequence.webp"
        slotDims="1400 × 1050 (4:3)"
      />

      {/* 6. AI DESIGN (§09) — full width, so the built scan-to-design animation
          sits in its natural habitat rather than a cramped half column. The
          showcase itself demonstrates the "you receive" list (mapped space,
          zones, palette, budget, brief), so that text list is dropped: shown,
          not told, and far shorter. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-9 max-w-[760px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.22em] uppercase text-house-gold-ink">AI Design · Powered by HoWA</p>
            <h2 className="mb-4 font-display text-[clamp(25px,3vw,42px)] leading-[1.08] text-house-brown">
              Scan your room or garden. <em>See what it could become.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              HoWA reads the proportions, light, existing materials, conditions
              and preferences. The House turns that intelligence into an initial
              design direction, budget route and path into a full human design
              service.
            </p>
          </div>

          <SampleDesignShowcase />

          <p className="mx-auto mt-7 max-w-[820px] text-center font-sans text-[12px] tracking-[0.08em] text-house-stone/80">
            AI Design from House of Willow Alexander · Powered by HoWA. Provides
            concept, direction and budget context. Final technical design,
            specification and construction responsibility require human validation.
          </p>
        </div>
      </section>

      {/* 7. BOOK + MANAGE (§10). */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto mb-11 max-w-[720px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Book and manage</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Your House service account is <em>powered by HoWA.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Assessment powered by HoWA. Quotation and service issued and
              delivered by House of Willow Alexander. The record saved with the
              property in HoWA.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { k: "Before", t: "Understand and agree", pts: ["Capture the need once", "Review the proposed scope", "Receive the House quotation", "Confirm provider and limitations"] },
                { k: "During", t: "Book and communicate", pts: ["Approve the quote", "Choose the appointment", "Message the House team", "Pay through the service journey"] },
                { k: "After", t: "Retain the proof", pts: ["See before-and-after evidence", "Keep invoice and guarantee", "Record the provider and work", "Surface the next action"] },
              ].map((col) => (
                <div key={col.k} className="border-t border-house-brown/15 pt-4">
                  <p className="mb-1 font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink">{col.k}</p>
                  <h3 className="mb-3 font-display text-[19px] leading-tight text-house-brown">{col.t}</h3>
                  <ul className="m-0 grid list-none gap-1.5 p-0">
                    {col.pts.map((p) => (
                      <li key={p} className="flex gap-2.5 font-sans text-[14px] leading-[1.45] text-house-stone">
                        <span aria-hidden className="text-house-gold-ink">·</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-house-brown/10 bg-house-cream-dark/30">
              <Image
                src="/powered-by-howa/book-and-manage.webp"
                alt="The HoWA Services Marketplace: a real House service account on desktop and mobile, showing named providers, scope, price, appointment status and saved records that return to the Home Record."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY IT IS BETTER (§11). */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Why this is better</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Better information before the visit. <em>Better records after it.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              The service becomes part of the home, not another lost email. HoWA
              helps the House understand the request, prepare the right route,
              and keep the useful outcome with the property.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.t} className="border-t border-house-brown/15 pt-4">
                <h3 className="mb-1.5 font-display text-[20px] leading-tight text-house-brown">{b.t}</h3>
                <p className="font-sans text-[14px] leading-[1.55] text-house-stone">{b.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. REAL SERVICE PROOF (§12). */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Real service proof</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Real work, <em>remembered by HoWA.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              A real service moment on one side, and the structured HoWA record
              created from it on the other. Provider, scope, date, price,
              evidence and what the home now remembers.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {PROOF.map((story) => (
              <article key={story.kind} className="flex flex-col border border-house-brown/12 bg-house-cream">
                <div className="relative">
                  {story.ready ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image src={story.file} alt={story.alt ?? `${story.kind} proof`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                    </div>
                  ) : (
                    <ImageSlot role={`${story.kind} proof`} desc={story.slot} file={story.file} dims={story.dims} aspect="aspect-[16/10]" />
                  )}
                  <span className="absolute left-3 top-3 bg-house-cream/92 px-2.5 py-1 font-sans text-[11px] tracking-[0.14em] uppercase text-house-brown">{story.kind}</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="mb-4 font-display text-[22px] leading-tight text-house-brown">{story.title}</h3>
                  <ol className="m-0 grid list-none gap-2.5 p-0">
                    {story.steps.map((st, i) => (
                      <li key={st} className="flex gap-3 font-sans text-[14px] leading-[1.5] text-house-stone">
                        <span aria-hidden className="font-display text-[14px] text-house-gold-ink">{i + 1}.</span>{st}
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[74ch] text-center font-sans text-[13px] leading-[1.55] text-house-stone/80">
            The bridge is a real service moment on one side and the structured
            HoWA record created from it on the other, never a generic Doll&apos;s House.
          </p>
        </div>
      </section>

      {/* 10. HOWA WRITEBACK. */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto grid max-w-[1240px] gap-[clamp(28px,4.5vw,64px)] lg:grid-cols-2 lg:items-center">
          <div className="lg:order-last">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-house-brown/10">
              <Image
                src="/powered-by-howa/writeback-record.webp"
                alt="A structured HoWA record of a completed garden service: scope, provider, date, invoice and paid status, a three-month guarantee, the next seasonal care action and before-and-after evidence, all saved with the home."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Everything remembered</p>
            <h2 className="mb-5 font-display text-[clamp(24px,3vw,40px)] leading-[1.1] text-house-brown">
              The House does the work. <em>HoWA remembers it.</em>
            </h2>
            <p className="mb-6 max-w-[54ch] font-sans text-[16px] leading-[1.65] text-house-stone">
              When the visit is done, the useful knowledge stays with the home.
              Nothing is lost to a forwarded email or a folder someone else keeps.
            </p>
            <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2">
              {["The completed scope and provider", "Before-and-after evidence", "Invoices, guarantees and documents", "The next maintenance or care action"].map((item) => (
                <li key={item} className="flex gap-3 font-sans text-[15px] leading-[1.5] text-house-brown">
                  <span aria-hidden className="text-house-gold-ink">·</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 11. DISCOVER WIDER HOWA (§13). */}
      <section className="bg-house-forest px-[5vw] py-[clamp(52px,6.5vw,100px)]">
        <div className="mx-auto grid max-w-[1240px] gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 font-sans text-[11px] tracking-[0.26em] uppercase text-house-gold-light">Discover the wider HoWA</p>
            <h2 className="mb-5 font-display text-[clamp(26px,3.4vw,46px)] leading-[1.08] text-house-cream">
              Your first House service can become the beginning of your <em>HoWA Home Record.</em>
            </h2>
            <p className="mb-4 max-w-[56ch] font-sans text-[16px] leading-[1.65] text-[rgba(245,240,232,0.86)]">
              The scan, quotation, photographs, completed work and documents can
              stay with your property through HoWA. You have introduced HoWA to
              one part of your home. Now let it understand the rest.
            </p>
            <ul className="mb-8 grid list-none gap-2 p-0 sm:grid-cols-2">
              {["A complete Home Profile", "The HoWA Score and confidence", "Documents, warranties and evidence", "A seasonal plan and next priorities", "Ask HoWA and property-specific answers", "Controls, risk, utilities and approved routes"].map((item) => (
                <li key={item} className="flex gap-2.5 font-sans text-[14px] leading-[1.5] text-[rgba(245,240,232,0.8)]">
                  <span aria-hidden className="text-house-gold-light">·</span>{item}
                </li>
              ))}
            </ul>
            <div className="grid gap-3 sm:max-w-[440px] sm:grid-cols-2">
              <a href={HOWA} className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
                Discover HoWA <span aria-hidden>→</span>
              </a>
              <a href={MY_HOME} className="inline-flex items-center justify-center gap-2 border border-house-gold-dark/60 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-gold-ink hover:text-house-brown">
                See your Home Record <span aria-hidden>→</span>
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/powered-by-howa/wider-howa-expansion.webp"
              alt="The Master Doll's House: a single connected home cutaway with a blueprint overlay and a HoWA Score card reading the whole home's condition and risk."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <p className="mx-auto mt-9 max-w-[80ch] text-center font-sans text-[13px] leading-[1.6] text-[rgba(245,240,232,0.6)]">
          You can book a House service without a paid HoWA membership, and you
          can use HoWA without booking the House. Used together, the service
          evidence and the wider intelligence compound around the same home.
        </p>
      </section>

      {/* 12. FINAL CONVERSION (§15). */}
      <section className="px-[5vw] py-[clamp(52px,6.5vw,100px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[880px] text-center">
          <h2 className="mb-4 font-display text-[clamp(28px,3.6vw,50px)] leading-[1.06] text-house-brown">
            What does your home <em>need?</em>
          </h2>
          <p className="mx-auto mb-9 max-w-[56ch] font-sans text-[16px] leading-[1.6] text-house-stone">
            Scan a garden. Show us a repair. Explore a design. Book the House.
          </p>
          {/* All four labels forced to two lines so every button is the same
              height, whatever the word count. */}
          <div className="mx-auto grid max-w-[420px] gap-3 sm:max-w-[760px] sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/services/gardening" className="inline-flex items-center justify-center border border-house-gold-dark bg-house-gold-ink px-6 py-4 text-center font-sans text-[12px] leading-[1.5] tracking-[0.16em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
              Scan a<br />garden
            </Link>
            <Link href="/services/handyman" className="inline-flex items-center justify-center border border-house-brown/25 px-6 py-4 text-center font-sans text-[12px] leading-[1.5] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
              Show us<br />a repair
            </Link>
            <Link href="/design/sample" className="inline-flex items-center justify-center border border-house-brown/25 px-6 py-4 text-center font-sans text-[12px] leading-[1.5] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
              Explore<br />a design
            </Link>
            <a href="#open-booking-form" className="inline-flex items-center justify-center border border-house-brown/25 px-6 py-4 text-center font-sans text-[12px] leading-[1.5] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
              Book the<br />House
            </a>
          </div>
          <p className="mt-7 font-sans text-[13px] text-house-stone">
            Or{" "}
            <a href={HOWA} className="text-house-gold-ink underline underline-offset-2 hover:text-house-brown">
              discover the wider HoWA Home Intelligence
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

/** Shared scan-module layout (§07 / §08 / §09). The visual is a described
 *  placeholder unless a real `visual` node is passed (AI Design). */
function ScanModule({
  eyebrow, title, body, receives, cta, href, endorsement, note, bg, imageSide,
  slotRole, slotDesc, slotDonot, slotFile, slotDims, visual,
}: {
  eyebrow: string;
  title: string;
  body: string;
  receives: string[];
  cta: string;
  href: string;
  endorsement: string;
  note: string;
  bg: "cream" | "white";
  imageSide: "left" | "right";
  slotRole?: string;
  slotDesc?: string;
  slotDonot?: string;
  slotFile?: string;
  slotDims?: string;
  visual?: React.ReactNode;
}) {
  return (
    <section
      className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]"
      style={{ background: bg === "white" ? "var(--color-house-white)" : "var(--color-house-cream)" }}
    >
      <div className="mx-auto grid max-w-[1240px] gap-[clamp(28px,4.5vw,64px)] lg:grid-cols-2 lg:items-center">
        <div className={imageSide === "left" ? "lg:order-last" : undefined}>
          <p className="mb-3 font-sans text-[12px] tracking-[0.22em] uppercase text-house-gold-ink">{eyebrow}</p>
          <h2 className="mb-4 font-display text-[clamp(25px,3vw,40px)] leading-[1.1] text-house-brown">{title}</h2>
          <p className="mb-6 max-w-[54ch] font-sans text-[16px] leading-[1.65] text-house-stone">{body}</p>
          <p className="mb-3 font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink">You receive</p>
          <ul className="m-0 mb-7 grid list-none gap-2 p-0 sm:grid-cols-2">
            {receives.map((r) => (
              <li key={r} className="flex gap-2.5 font-sans text-[14px] leading-[1.45] text-house-brown">
                <span aria-hidden className="text-house-gold-ink">·</span>{r}
              </li>
            ))}
          </ul>
          <Link href={href} className="inline-flex items-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
            {cta} <span aria-hidden>→</span>
          </Link>
          <p className="mt-5 font-sans text-[12px] tracking-[0.1em] text-house-stone/80">{endorsement}</p>
          <p className="mt-3 max-w-[60ch] border-l-2 border-house-gold pl-4 font-sans text-[13px] leading-[1.6] text-house-stone">{note}</p>
        </div>
        {visual ?? (
          <ImageSlot
            role={slotRole ?? "Scan sequence"}
            desc={slotDesc ?? ""}
            donot={slotDonot}
            file={slotFile ?? ""}
            dims={slotDims ?? ""}
          />
        )}
      </div>
    </section>
  );
}
