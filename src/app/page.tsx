import Image from "next/image";
import Link from "next/link";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";

/**
 * Homepage — House of HoWA (Final Master Directive, 13 Jul 2026).
 *
 * Care-led, not system-led. Order: hero → service finder → live care →
 * House Approved proof → Meet the Household (10) → HoWA reveal + Score →
 * Booked. Done. Remembered. → Design → The Stores + The Host → House standard
 * + origin → professionals → contact & close.
 *
 * Principle: REALITY → INTELLIGENCE → REALITY. Lead with a real home and a
 * useful action; reveal HoWA once the visitor understands what the House does.
 */

export const metadata = {
  title: { absolute: "House of HoWA | That feeling you call home" },
  description:
    "A modern British House for the care, design and intelligence of home and garden. Book trusted services, commission considered design and begin a living record of your home, remembered by HoWA.",
};

const LIVE_SERVICES = [
  { name: "Gardening", href: "/services/gardening", line: "Seasonal care, lawns, borders, hedges, planting and garden restoration.", img: "/services/subbrands/gardeners.webp" },
  { name: "Cleaning", href: "/services/cleaning", line: "Regular or one-off care, with the scope and provider made clear before booking.", img: "/services/subbrands/cleaners.webp" },
  { name: "Window cleaning", href: "/services/window-cleaning", line: "Reliable window care, recorded as part of the home's maintenance rhythm.", img: "/services/subbrands/window-cleaner.webp" },
  { name: "Gutter clearing", href: "/services/gutter-cleaning", line: "Cleared, checked and ready for the weather, with notes returned to the home.", img: "/services/subbrands/gutter-cleaning.webp" },
];

// The ten public members of the Household, each with a plain utility line and a
// truthful launch state (Live / beta / paid-when-ready / staged).
const HOUSEHOLD = [
  { name: "The Gardener", line: "Understand the garden and book the work.", state: "Live where serviceable", tone: "live" },
  { name: "The Handyman", line: "Photograph the fault and understand what to do next.", state: "Diagnosis beta", tone: "beta" },
  { name: "The Designer", line: "Turn a room or garden into a clear brief and professional route.", state: "Live", tone: "live" },
  { name: "The Surveyor", line: "Decode a crack, damp concern or quote in plain language.", state: "Guidance beta", tone: "beta" },
  { name: "The Archivist", line: "Turn one document into dates, costs and reminders.", state: "Product beta", tone: "beta" },
  { name: "The Storekeeper", line: "Find considered goods for the home.", state: "The Stores", tone: "live" },
  { name: "The Host", line: "Find practical and cultural guidance worth keeping.", state: "Live", tone: "live" },
  { name: "The Housekeeper", line: "Keep records, reminders and household rhythm in order.", state: "£16.99/mo when ready", tone: "paid" },
  { name: "The Steward", line: "See risk, evidence and the long view of the home.", state: "£29.99/mo when ready", tone: "paid" },
  { name: "The Butler", line: "Read connected instruments and, by permission, help operate them.", state: "Staged release", tone: "beta" },
];

const SCORE_DRIVERS = [
  { label: "Records", value: "8 of 12 saved" },
  { label: "Maintenance", value: "On rhythm" },
  { label: "Evidence", value: "1 warranty missing" },
];

const STANDARDS = [
  { t: "Design-led thinking", d: "Every service, system and recommendation is expected to be useful and considered." },
  { t: "The living record", d: "The work, warranty, plan and decision should not disappear when the transaction ends." },
  { t: "Stewardship over transaction", d: "A home is where a life is kept. The standard should protect the home and the people responsible for it." },
  { t: "House-vetted, always", d: "Every partner shown as House Approved must have a current evidence record and remain subject to review." },
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-gold-ink hover:text-house-gold-ink";

function StateChip({ tone, children }: { tone: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    live: "text-house-moss border-house-moss/40",
    beta: "text-house-stone border-house-stone/40",
    paid: "text-house-gold-dark border-house-gold-dark/40",
  };
  return (
    <span className={`font-sans text-[10px] tracking-[0.14em] uppercase border px-2 py-0.5 ${map[tone] ?? map.beta}`}>
      {children}
    </span>
  );
}

export default async function HomePage() {
  const hearthArticles = await getLatestHearthArticles(3).catch(() => []);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* 1. HERO — real British home, care-led */}
      <section className="relative min-h-[86vh] flex items-end overflow-hidden">
        <Image
          src="/home/hero-georgian.webp"
          alt="A sage-green Georgian home, cared for and remembered"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,19,13,0.82) 0%, rgba(26,19,13,0.30) 45%, rgba(26,19,13,0.05) 80%)" }} />
        <div className="relative z-10 w-full px-[5vw] pb-16 lg:pb-20">
          <div className="max-w-[46ch]">
            <h1 className="font-display text-[clamp(40px,6vw,80px)] leading-[1.0] tracking-[-0.015em] text-white">
              That Feeling You <em className="italic">Call Home.</em>
            </h1>
            <p className="font-display italic text-[clamp(18px,2.1vw,26px)] leading-[1.3] text-white/90 mt-5 max-w-[36ch]">
              A modern British House for the care, design and intelligence of home and garden.
            </p>
            <p className="font-sans text-[16px] leading-[1.6] text-white/85 mt-5 max-w-[52ch]">
              Book trusted services, commission considered design and begin a living record of your home, all held to one House standard and remembered by HoWA.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#open-booking-form" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-light border border-house-gold-light px-6 py-3 no-underline transition-[filter] hover:brightness-105">
                Book a service
              </a>
              <Link href="/howa/assistant" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-white border border-white/40 px-6 py-3 no-underline transition-colors hover:border-house-gold-light hover:text-house-gold-light">
                Start with my address
              </Link>
            </div>
            <p className="font-sans text-[13px] text-white/70 mt-5">
              Prefer to speak to us? <a href="/contact" className="underline underline-offset-4 hover:text-house-gold-light">Call the House directly.</a>
            </p>
          </div>
        </div>
        {/* floating proof card */}
        <div className="hidden md:block absolute right-[5vw] bottom-24 z-10 bg-house-cream/95 border border-house-brown/10 px-5 py-4 max-w-[260px] shadow-[0_18px_44px_rgba(20,14,10,0.3)]">
          <p className="font-sans text-[11px] tracking-[0.14em] uppercase text-house-gold-ink mb-1">Remembered</p>
          <p className="font-sans text-[14px] leading-[1.4] text-house-brown">Gutters cleared · photographs and next check saved.</p>
        </div>
      </section>

      {/* 2. SERVICE FINDER */}
      <section className="px-[5vw] py-14 bg-house-cream-dark border-b border-house-brown/8">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-black mb-3">
            What does the home need?
          </h2>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/80 max-w-[58ch] mx-auto mb-7">
            Tell us the service and postcode. We will show what is available, who may deliver it and the next appointment or quotation route.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className={ctaPrimary}>Choose a service</Link>
            <a href="#open-booking-form" className={ctaSecondary}>Check my postcode</a>
          </div>
        </div>
      </section>

      {/* 3. LIVE CARE */}
      <section className="px-[5vw] py-16 max-w-[1300px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">Live services</p>
        <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-black max-w-[20ch] mb-4">
          Care for the home, booked clearly.
        </h2>
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[64ch] mb-10">
          Start with the work the home needs now. Every live service is delivered by the named provider shown at booking, held to the House standard and connected to the same HoWA record.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LIVE_SERVICES.map((s) => (
            <Link key={s.name} href={s.href} className="group block no-underline">
              <div className="relative aspect-[4/5] overflow-hidden bg-house-cream-dark border border-house-brown/10">
                <Image src={s.img} alt={s.name} fill sizes="(min-width:1024px) 22vw, 46vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]" />
                <span className="absolute left-3 top-3"><StateChip tone="live">Available in selected postcodes</StateChip></span>
              </div>
              <h3 className="font-display text-[21px] leading-[1.15] text-house-black group-hover:text-house-gold-ink transition-colors mt-3">{s.name}</h3>
              <p className="font-sans text-[14px] leading-[1.5] text-house-brown/70 mt-1.5">{s.line}</p>
            </Link>
          ))}
        </div>
        <div className="mt-9"><Link href="/services" className={ctaSecondary}>See all services →</Link></div>
      </section>

      {/* 4. HOUSE APPROVED PROOF */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">House Approved</p>
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-black max-w-[22ch] mx-auto mb-5">
            The mark on the van means something.
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[62ch] mx-auto mb-3">
            House Approved is not an open directory. It is the standard for the professionals, studios and sellers the House is prepared to present.
          </p>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[58ch] mx-auto mb-8">
            Named providers. Clear scopes. Current operating information. Work reviewed and approval capable of being withdrawn.
          </p>
          <Link href="/the-house/standards" className={ctaSecondary}>What House Approved means →</Link>
        </div>
      </section>

      {/* 5. MEET THE HOUSEHOLD (10) */}
      <section className="px-[5vw] py-16 max-w-[1300px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">The Household</p>
        <h2 className="font-display text-[clamp(30px,4vw,52px)] leading-[1.05] text-house-black mb-5">Meet the Household.</h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/82 max-w-[60ch] mb-3">
          Every home need feels different. HoWA keeps one record beneath them all.
        </p>
        <p className="font-sans text-[16px] leading-[1.65] text-house-brown/72 max-w-[70ch] mb-10">
          The Gardener reads the garden. The Handyman reads faults. The Designer shapes the brief. The Surveyor reads walls and quotes. The Archivist turns paperwork into dates. The Storekeeper keeps The Stores. The Host welcomes you in. The Housekeeper keeps the daily rhythm. The Steward protects the long view. The Butler reads the instruments of the home.
        </p>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOUSEHOLD.map((m) => (
            <div key={m.name} className="border-t border-house-brown/15 pt-4">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h3 className="font-display text-[19px] leading-[1.2] text-house-black">{m.name}</h3>
                <StateChip tone={m.tone}>{m.state}</StateChip>
              </div>
              <p className="font-sans text-[14px] leading-[1.5] text-house-brown/70">{m.line}</p>
            </div>
          ))}
        </div>
        <div className="mt-10"><Link href="/household" className={ctaSecondary}>Meet the Household →</Link></div>
      </section>

      {/* 6. HOWA REVEAL — the first dark/product band */}
      <section className="px-[5vw] py-20 bg-house-black text-house-cream border-t border-house-brown/20">
        <div className="max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="font-display text-[clamp(30px,4vw,54px)] leading-[1.06] text-house-cream max-w-[18ch]">
              Your house is trying to tell you something.
            </h2>
            <p className="font-sans text-[17px] leading-[1.7] text-house-cream/80 mt-6 max-w-[54ch]">
              The windows, the gutters, the boiler service you keep meaning to book, the warranty you know is somewhere.
            </p>
            <p className="font-sans text-[17px] leading-[1.7] text-house-cream/80 mt-4 max-w-[54ch]">
              HoWA gives the address one Home Record, one HoWA Score and one calm place to understand what has happened, what is missing and what matters next.
            </p>
            <p className="font-sans text-[16px] leading-[1.65] text-house-cream/70 mt-4 max-w-[54ch]">
              Day one, the home introduces itself. Over time, it remembers the work, the documents, the costs and the decisions. Then it helps arrange what comes next.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/howa/assistant" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-black bg-house-gold-light border border-house-gold-light px-6 py-3 no-underline hover:brightness-105 transition-[filter]">
                Start with my address
              </Link>
              <Link href="/howa-score" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-light hover:text-house-gold-light">
                See how the HoWA Score works
              </Link>
            </div>
          </div>
          {/* labelled example score — never 0/100 */}
          <div className="howa-surface">
            <div className="rounded-2xl bg-house-cream text-house-brown p-8 border border-house-gold-dark/20">
              <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-house-gold-ink mb-4">Example HoWA Score</p>
              <div className="flex items-center gap-6">
                <div className="relative w-[112px] h-[112px] shrink-0">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(48,35,28,0.12)" strokeWidth="9" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-house-gold-dark)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 52 * 0.76} ${2 * Math.PI * 52}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-[34px] leading-none text-house-black">76</span>
                    <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-house-stone">of 100</span>
                  </div>
                </div>
                <ul className="flex-1 space-y-2">
                  {SCORE_DRIVERS.map((d) => (
                    <li key={d.label} className="flex items-baseline justify-between gap-3 border-b border-house-brown/10 pb-1.5">
                      <span className="font-sans text-[13px] text-house-stone">{d.label}</span>
                      <span className="font-sans text-[13px] text-house-brown text-right">{d.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-sans text-[13px] leading-[1.5] text-house-brown/75 mt-5 pt-4 border-t border-house-brown/10">
                <span className="font-medium text-house-black">Next action:</span> book the boiler service before winter, and save the certificate to the record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOOKED. DONE. REMEMBERED. */}
      <section className="px-[5vw] py-16 max-w-[1000px] mx-auto">
        <h2 className="font-display text-[clamp(26px,3.4vw,42px)] leading-[1.1] text-house-black mb-10">What happens when you book</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { k: "Booked", d: "Choose the service, provider and time through HoWA." },
            { k: "Done", d: "The named professional completes the agreed work to the published House standard." },
            { k: "Remembered", d: "Where the service workflow supports it, photographs, notes, invoice and next-care information return to the Home Record." },
          ].map((s, i) => (
            <div key={s.k} className="border-t border-house-brown/15 pt-5">
              <p className="font-sans text-[12px] tracking-[0.14em] uppercase text-house-gold-ink mb-2">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display text-[24px] leading-[1.15] text-house-black mb-2">{s.k}</h3>
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/75">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-9"><a href="#open-booking-form" className={ctaPrimary}>Book a service</a></div>
      </section>

      {/* 8. DESIGN */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1000px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">Design</p>
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.12] text-house-black max-w-[26ch] mb-5">
            Begin with the intelligence. Continue with the right human. Finish with trusted hands.
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[62ch] mb-4">
            Create a clear brief, explore a HoWA Concept or commission a founding House Approved interior or garden design studio.
          </p>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[62ch] mb-8">
            When the design is ready, the House can help prepare it for quotation by selected landscapers and craftspeople.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/design/interiors" className={ctaPrimary}>Explore Interior Design</Link>
            <Link href="/design/gardens" className={ctaSecondary}>Explore Garden Design</Link>
          </div>
        </div>
      </section>

      {/* 9. THE STORES + THE HOST */}
      <section className="px-[5vw] py-16 max-w-[1200px] mx-auto grid gap-6 md:grid-cols-2">
        <div className="border border-house-brown/12 p-8 bg-house-white">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-3">The Stores</p>
          <p className="font-sans text-[16px] leading-[1.65] text-house-brown/80 mb-6">
            A place for everything. Considered goods organised by room, seller clearly shown and useful purchases capable of joining the Home Record.
          </p>
          <Link href="/shop" className={ctaSecondary}>Shop the rooms →</Link>
        </div>
        <div className="border border-house-brown/12 p-8 bg-house-white">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-3">The Host</p>
          <p className="font-sans text-[16px] leading-[1.65] text-house-brown/80 mb-6">
            Come in. The Hearth, recipes, seasonal knowledge and practical guidance, kept because they are worth returning to.
          </p>
          <Link href="/the-hearth" className={ctaSecondary}>Ideas &amp; Advice →</Link>
        </div>
      </section>

      {/* 10. HOUSE STANDARD + ORIGIN */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-house-brown/8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-black max-w-[24ch] mb-10">
            Care, design and intelligence, held to one House standard.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {STANDARDS.map((s) => (
              <div key={s.t} className="border-t border-house-brown/15 pt-5">
                <h3 className="font-display text-[22px] leading-[1.15] text-house-black mb-2">{s.t}</h3>
                <p className="font-sans text-[15px] leading-[1.6] text-house-brown/75">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8"><Link href="/the-house/standards" className={ctaSecondary}>Read the standard →</Link></div>

          <div className="mt-16 max-w-[760px]">
            <h3 className="font-display text-[clamp(24px,3vw,36px)] leading-[1.12] text-house-black mb-5">
              Cultivated from a garden studio. Built into the House that created HoWA.
            </h3>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/80 mb-4">
              House of HoWA began in the real work of gardens: soil, seasons, craft and the knowledge that care is a relationship with time.
            </p>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/80 mb-4">
              Willow Alexander grew from a garden studio into a wider family of services and design practices. The work kept teaching the same lesson: a home has history, rhythm and signals, but no single place where they become useful.
            </p>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/80 mb-6">
              The House created HoWA to give the address a memory. Willow Alexander remains the founding service family, the proof from which the wider standard grows.
            </p>
            <Link href="/the-house/about" className={ctaSecondary}>Read our origin →</Link>
          </div>
        </div>
      </section>

      {/* 11. PROFESSIONALS */}
      <section className="px-[5vw] py-16 max-w-[900px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">For professionals</p>
        <h2 className="font-display text-[clamp(26px,3.4vw,42px)] leading-[1.12] text-house-black max-w-[20ch] mb-5">
          House Approved is not for everyone.
        </h2>
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[60ch] mb-3">
          It is for designers, craftspeople and service businesses whose work the House is prepared to stand behind.
        </p>
        <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[60ch] mb-8">
          Approval is selective. Providers remain independent, choose the work they accept and are presented by name.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/partners" className={ctaPrimary}>Apply for Approval</Link>
          <Link href="/the-house/standards" className={ctaSecondary}>What the mark means</Link>
        </div>
      </section>

      {/* From the Hearth — real editorial before the close */}
      {hearthArticles.length > 0 ? (
        <section className="px-[5vw] py-14 bg-house-cream-dark border-t border-house-brown/8">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display italic text-[clamp(22px,2.6vw,34px)] text-house-black">From The Hearth</h2>
              <Link href="/the-hearth" className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink no-underline hidden sm:block">Ideas &amp; Advice →</Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {hearthArticles.slice(0, 3).map((a) => (
                <Link key={a.slug} href={`/the-hearth/${a.slug}`} className="group block no-underline">
                  <div className="relative aspect-[4/3] overflow-hidden bg-house-cream mb-4">
                    <Image src={a.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="font-display text-[22px] leading-[1.15] text-house-black group-hover:text-house-gold-ink transition-colors">{a.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 12. CONTACT & CLOSE */}
      <section className="px-[5vw] pt-16 pb-6 max-w-[820px] mx-auto text-center">
        <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.1] text-house-black mb-5">Speak to the House.</h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/80 mb-4">
          Tell us what the home needs, ask about a design project or speak to us about HoWA. We reply personally.
        </p>
        <p className="font-display italic text-[clamp(18px,2vw,24px)] leading-[1.35] text-house-brown/85">
          A House for the home you love, kept to the standard a good home deserves.
        </p>
      </section>
      <EnquiryForm
        sourcePage="/"
        eyebrow="Speak to the House"
        headline="Tell us what the home needs."
        body="General enquiry, gardening, cleaning, window cleaning, gutter clearing, interior design, garden design, the Stores, press or partnership. Choose below, or leave it as a general enquiry. We reply personally."
      />
    </div>
  );
}
