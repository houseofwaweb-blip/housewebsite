import Image from "next/image";
import Link from "next/link";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";

/**
 * Homepage — House of HoWA (Final Master Directive, 13 Jul 2026).
 *
 * Care-led. Order: hero → service finder → live care → House Approved proof →
 * Meet the Household (10) → HoWA reveal + Score → Booked. Done. Remembered. →
 * Design → The Stores → The Host → House standard → Origin → professionals →
 * contact & close. Layouts blend the live site (split hero, room cards, Hearth
 * grid, origin band) with the prior preview imagery.
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

// Eight utility members (image cards) + two paid continuity tiers (own row).
const HOUSEHOLD = [
  { name: "The Gardener", line: "Understand the garden and book the work.", state: "Live where serviceable", tone: "live", img: "/howa/household/gardener.webp", href: "/household/gardener" },
  { name: "The Handyman", line: "Photograph the fault and understand what to do next.", state: "Diagnosis beta", tone: "beta", img: "/howa/household/handyman.webp", href: "/household/handyman" },
  { name: "The Designer", line: "Turn a room or garden into a clear brief and professional route.", state: "Live", tone: "live", img: "/howa/household/designer.webp", href: "/household/designer" },
  { name: "The Surveyor", line: "Decode a crack, damp concern or quote in plain language.", state: "Guidance beta", tone: "beta", img: "/howa/household/surveyor.webp", href: "/household/surveyor" },
  { name: "The Archivist", line: "Turn one document into dates, costs and reminders.", state: "Product beta", tone: "beta", img: "/howa/household/archivist.webp", href: "/household/archivist" },
  { name: "The Storekeeper", line: "Find considered goods for the home.", state: "The Stores", tone: "live", img: "/shop/rooms/living-room.webp", href: "/shop" },
  { name: "The Host", line: "Find practical and cultural guidance worth keeping.", state: "Live", tone: "live", img: "/hearth/art-sanctuary.webp", href: "/the-hearth" },
  { name: "The Butler", line: "Read connected instruments and, by permission, help operate them.", state: "Staged release", tone: "beta", img: "/home-v4/companion-hero.webp", href: "/household" },
];

const PAID_TIERS = [
  { role: "The Housekeeper", price: "£16.99/mo when ready", img: "/howa/household/housekeeper.webp", btn: "#c17a5f", forLine: "For the household that wants everything kept in rhythm.", line: "Records, reminders, documents, service history and the monthly home rhythm, kept in order.", cta: "Employ the Housekeeper", href: "/howa/housekeeper" },
  { role: "The Steward", price: "£29.99/mo when ready", img: "/howa/household/steward.webp", btn: "#c9a84a", forLine: "For the homeowner who wants the long view of the home.", line: "Score oversight, risk watch, evidence, annual report and future planning.", cta: "Protect the home", href: "/howa/steward" },
];

const SCORE_DRIVERS = [
  { label: "Records", value: "8 of 12 saved" },
  { label: "Maintenance", value: "On rhythm" },
  { label: "Evidence", value: "1 warranty missing" },
];

const STORES_ROOMS = [
  { name: "Kitchen", img: "/shop/rooms/kitchen.webp", href: "/shop" },
  { name: "Living Room", img: "/shop/rooms/living-room.webp", href: "/shop" },
  { name: "Bedroom", img: "/shop/rooms/bedroom.webp", href: "/shop" },
  { name: "Garden", img: "/shop/rooms/garden.webp", href: "/shop" },
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

// Filled chip so it stays legible on any image.
function StateChip({ tone, children }: { tone: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    live: "text-house-moss",
    beta: "text-house-brown/80",
    paid: "text-house-gold-dark",
  };
  return (
    <span className={`font-sans text-[10px] tracking-[0.12em] uppercase bg-house-cream/95 px-2.5 py-1 ${map[tone] ?? map.beta}`}>
      {children}
    </span>
  );
}

export default async function HomePage() {
  const hearthArticles = await getLatestHearthArticles(4).catch(() => []);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* 1. HERO — split: text left, dominant home image right */}
      <section className="grid lg:grid-cols-2 border-b border-house-brown/8">
        <div className="relative flex flex-col justify-center px-[5vw] py-16 lg:py-24 lg:pr-14">
          <FlowerWatermark color="gold" side="left" opacity={0.1} />
          <div className="relative z-10 max-w-[48ch]">
            <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">House of HoWA</p>
            <h1 className="font-display text-[clamp(40px,5.4vw,78px)] leading-[1.0] tracking-[-0.015em] text-house-black">
              That Feeling You <em className="italic">Call Home.</em>
            </h1>
            <p className="font-display italic text-[clamp(18px,2.1vw,26px)] leading-[1.3] text-house-brown/85 mt-5 max-w-[34ch]">
              A modern British House for the care, design and intelligence of home and garden.
            </p>
            <p className="font-sans text-[16px] leading-[1.65] text-house-brown/80 mt-5 max-w-[52ch]">
              Book trusted services, commission considered design and begin a living record of your home, all held to one House standard and remembered by HoWA.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#open-booking-form" className={ctaPrimary}>Book a service</a>
              <Link href="/howa/assistant" className={ctaSecondary}>Start with my address</Link>
            </div>
            <p className="font-sans text-[13px] text-house-stone mt-6">
              Prefer to speak to us? <a href="/contact" className="underline underline-offset-4 hover:text-house-gold-ink">Call the House directly.</a>
            </p>
          </div>
        </div>
        <div className="relative min-h-[52vh] lg:min-h-[86vh] bg-house-cream-dark">
          <Image src="/home/hero-georgian.webp" alt="A sage-green Georgian home, cared for and remembered" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" priority />
          {/* directive-required small floating proof card */}
          <div className="absolute left-5 bottom-5 md:left-8 md:bottom-8 bg-house-cream/95 border border-house-brown/10 px-5 py-3.5 max-w-[250px] shadow-[0_14px_36px_rgba(20,14,10,0.28)]">
            <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-gold-ink mb-1">Remembered</p>
            <p className="font-sans text-[13.5px] leading-[1.4] text-house-brown">Gutters cleared · photographs and next check saved.</p>
          </div>
        </div>
      </section>

      {/* 2. SERVICE FINDER */}
      <section className="px-[5vw] py-14 bg-house-cream-dark border-b border-house-brown/8">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-black mb-3">What does the home need?</h2>
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
        <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-black max-w-[20ch] mb-4">Care for the home, booked clearly.</h2>
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
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-black max-w-[22ch] mx-auto mb-5">The mark on the van means something.</h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[62ch] mx-auto mb-3">
            House Approved is not an open directory. It is the standard for the professionals, studios and sellers the House is prepared to present.
          </p>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[58ch] mx-auto mb-8">
            Named providers. Clear scopes. Current operating information. Work reviewed and approval capable of being withdrawn.
          </p>
          <Link href="/the-house/standards" className={ctaSecondary}>What House Approved means →</Link>
        </div>
      </section>

      {/* 5. MEET THE HOUSEHOLD (8 utility cards + 2 paid tiers on their own row) */}
      <section className="px-[5vw] py-16 max-w-[1300px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">The Household</p>
        <h2 className="font-display text-[clamp(30px,4vw,52px)] leading-[1.05] text-house-black mb-5">Meet the Household.</h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/82 max-w-[60ch] mb-3">Every home need feels different. HoWA keeps one record beneath them all.</p>
        <p className="font-sans text-[16px] leading-[1.65] text-house-brown/72 max-w-[70ch] mb-10">
          The Gardener reads the garden. The Handyman reads faults. The Designer shapes the brief. The Surveyor reads walls and quotes. The Archivist turns paperwork into dates. The Storekeeper keeps The Stores. The Host welcomes you in. The Butler reads the instruments of the home.
        </p>
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {HOUSEHOLD.map((m) => (
            <Link key={m.name} href={m.href} className="group block no-underline">
              <div className="relative aspect-[4/5] overflow-hidden bg-house-cream-dark border border-house-brown/10">
                <Image src={m.img} alt={m.name} fill sizes="(min-width:1024px) 22vw, 46vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]" />
                <span className="absolute left-2.5 top-2.5"><StateChip tone={m.tone}>{m.state}</StateChip></span>
              </div>
              <h3 className="font-display text-[19px] leading-[1.2] text-house-black group-hover:text-house-gold-ink transition-colors mt-3">{m.name}</h3>
              <p className="font-sans text-[13.5px] leading-[1.5] text-house-brown/70 mt-1.5">{m.line}</p>
            </Link>
          ))}
        </div>

        {/* The two you employ — paid tiers, own row, larger */}
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mt-16 mb-6">The two you employ</p>
        <div className="howa-surface grid gap-6 md:grid-cols-2">
          {PAID_TIERS.map((d) => (
            <Link key={d.role} href={d.href} className="group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-2xl no-underline">
              <Image src={d.img} alt={d.role} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,14,10,0.88) 0%, rgba(20,14,10,0.38) 45%, rgba(20,14,10,0.05) 78%)" }} />
              <div className="relative p-8 text-white">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-display text-[clamp(28px,3vw,40px)] leading-none">{d.role}</h3>
                  <span className="font-sans text-[14px] tracking-[0.02em] text-white/90 whitespace-nowrap">{d.price}</span>
                </div>
                <p className="font-display italic text-[17px] leading-[1.4] text-white/85 mb-3 max-w-[44ch]">{d.forLine}</p>
                <p className="font-sans text-[15px] leading-[1.55] text-white/80 mb-6 max-w-[48ch]">{d.line}</p>
                <span className="inline-block rounded-xl px-5 py-3 font-sans text-[13px] font-medium text-house-black transition-[filter] group-hover:brightness-105" style={{ background: d.btn }}>{d.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center"><Link href="/household" className={ctaSecondary}>Meet the whole Household →</Link></div>
      </section>

      {/* 6. HOWA REVEAL — dark band, prominent example Score */}
      <section className="px-[5vw] py-20 bg-house-black text-house-cream border-t border-house-brown/20">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-[clamp(30px,4vw,54px)] leading-[1.06] text-house-cream max-w-[22ch] mx-auto">Your house is trying to tell you something.</h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-cream/80 mt-6 max-w-[60ch] mx-auto">
            The windows, the gutters, the boiler service you keep meaning to book, the warranty you know is somewhere.
          </p>
          <p className="font-sans text-[17px] leading-[1.7] text-house-cream/80 mt-4 max-w-[60ch] mx-auto">
            HoWA gives the address one Home Record, one HoWA Score and one calm place to understand what has happened, what is missing and what matters next.
          </p>
        </div>

        {/* prominent example score */}
        <div className="max-w-[1000px] mx-auto mt-12 bg-house-cream text-house-brown overflow-hidden">
          <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-house-brown/10">
            <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink">Example HoWA Score</p>
            <span className="font-display text-[clamp(30px,4vw,44px)] leading-none text-house-black">76<span className="font-sans text-[13px] text-house-stone tracking-[0.1em] uppercase ml-1.5">/ 100</span></span>
          </div>
          <div className="relative aspect-[16/9] bg-house-cream-dark">
            <Image src="/howa/score-dashboard.webp" alt="A HoWA Score dashboard: records, maintenance rhythm and evidence, with what matters next" fill sizes="(min-width:1024px) 1000px, 100vw" className="object-cover" />
          </div>
          <div className="grid sm:grid-cols-3 gap-x-8 gap-y-2 px-6 sm:px-8 py-5 border-t border-house-brown/10">
            {SCORE_DRIVERS.map((d) => (
              <div key={d.label}>
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone">{d.label}</span>
                <p className="font-sans text-[15px] text-house-brown">{d.value}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-[14px] leading-[1.55] text-house-brown/80 px-6 sm:px-8 pb-6 pt-1">
            <span className="font-medium text-house-black">Next action:</span> book the boiler service before winter, and save the certificate to the record.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/howa/assistant" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-black bg-house-gold-light border border-house-gold-light px-6 py-3 no-underline hover:brightness-105 transition-[filter]">Start with my address</Link>
          <Link href="/howa-score" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-light hover:text-house-gold-light">See how the HoWA Score works</Link>
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
        <div className="mt-10 text-center"><a href="#open-booking-form" className={ctaPrimary}>Book a service</a></div>
      </section>

      {/* 8. DESIGN — two founding-discipline image cards */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">Design</p>
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.12] text-house-black max-w-[26ch] mb-5">
            Begin with the intelligence. Continue with the right human. Finish with trusted hands.
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[62ch] mb-3">
            Create a clear brief, explore a HoWA Concept or commission a founding House Approved interior or garden design studio.
          </p>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[62ch] mb-10">
            When the design is ready, the House can help prepare it for quotation by selected landscapers and craftspeople.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { label: "Interior Design", line: "Founding House Approved studios.", href: "/design/interiors", img: "/design/interiors/project-living-room.webp" },
              { label: "Garden Design", line: "Studios and Willow Alexander Gardeners.", href: "/design/gardens", img: "/design/gardens/full-design.webp" },
            ].map((d) => (
              <Link key={d.label} href={d.href} className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden no-underline border border-house-brown/10">
                <Image src={d.img} alt={d.label} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]" />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,14,10,0.82) 0%, rgba(20,14,10,0.25) 55%, rgba(20,14,10,0) 85%)" }} />
                <div className="relative p-7 text-white">
                  <h3 className="font-display text-[clamp(24px,2.6vw,32px)] leading-none">{d.label}</h3>
                  <p className="font-sans text-[14px] leading-[1.5] text-white/85 mt-2">{d.line}</p>
                  <span className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-light mt-4 inline-block">Explore {d.label} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. THE STORES — a place for everything (room cards) */}
      <section className="px-[5vw] py-16 max-w-[1300px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-3">The Stores</p>
            <h2 className="font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-black">A place for everything.</h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-brown/78 max-w-[54ch] mt-3">
              Considered goods organised by room, the seller clearly shown, and useful purchases capable of joining the Home Record.
            </p>
          </div>
          <Link href="/shop" className={`${ctaSecondary} shrink-0`}>Shop the rooms →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STORES_ROOMS.map((r) => (
            <Link key={r.name} href={r.href} className="group relative block aspect-[4/5] overflow-hidden no-underline border border-house-brown/10">
              <Image src={r.img} alt={r.name} fill sizes="(min-width:1024px) 22vw, 46vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,14,10,0.7), rgba(20,14,10,0.05) 60%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-[22px] leading-none text-white">{r.name}</h3>
                <span className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold-light mt-1.5 inline-block">Shop the room →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. THE HOST — editorial, dark band with Hearth grid */}
      {hearthArticles.length > 0 ? (
        <section className="px-[5vw] py-16 bg-house-brown text-house-cream">
          <div className="max-w-[1300px] mx-auto grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-light mb-4">The Host</p>
              <h2 className="font-display text-[clamp(30px,4vw,52px)] leading-[1.05] text-house-cream">
                <em className="italic text-house-gold-light">Ideas</em> &amp; Advice.
              </h2>
              <p className="font-sans text-[17px] leading-[1.7] text-house-cream/80 mt-5 max-w-[46ch]">
                Come in. The Hearth, recipes, seasonal knowledge and practical guidance, kept because they are worth returning to.
              </p>
              <Link href="/the-hearth" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-cream border border-house-cream px-6 py-3 no-underline mt-8 hover:brightness-95 transition-[filter]">
                Read the Hearth →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {hearthArticles.slice(0, 4).map((a) => (
                <Link key={a.slug} href={`/the-hearth/${a.slug}`} className="group block no-underline">
                  <div className="relative aspect-[4/3] overflow-hidden bg-house-black/40 mb-3">
                    <Image src={a.image} alt="" fill sizes="(min-width:768px) 28vw, 46vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]" />
                  </div>
                  <h3 className="font-display italic text-[16px] leading-[1.2] text-house-cream/90 group-hover:text-house-gold-light transition-colors">{a.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 11. HOUSE STANDARD */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">The House standard</p>
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
      </section>

      {/* 12. ORIGIN — image left, copy right (live-site band) */}
      <section className="relative bg-house-forest text-house-cream overflow-hidden">
        <FlowerWatermark color="white" side="right" opacity={0.1} />
        <div className="relative z-10 grid lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[52vh] lg:min-h-[80vh] bg-house-black/20">
            <Image src="/home/origin-studio.webp" alt="The original Willow Alexander garden studio: soil, seasons and a single electric van" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,20,15,0.45), rgba(20,20,15,0.05) 55%)" }} />
            <div className="absolute left-6 bottom-6 w-[180px] md:w-[220px]">
              <Image src="/brand/wa-gardens-white.png" alt="Willow Alexander Gardens" width={3595} height={2184} sizes="220px" className="w-full h-auto" />
            </div>
          </div>
          <div className="px-[5vw] py-16 lg:py-20 lg:px-14">
            <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-light mb-5">Origin</p>
            <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-cream max-w-[20ch]">
              Cultivated from a garden studio. <em className="italic text-house-gold-light">Built into the House that created HoWA.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.7] text-house-cream/85 mt-6 max-w-[54ch]">
              House of HoWA began in the real work of gardens: soil, seasons, craft and the knowledge that care is a relationship with time.
            </p>
            <p className="font-sans text-[16px] leading-[1.7] text-house-cream/80 mt-4 max-w-[54ch]">
              Willow Alexander grew from a garden studio into a wider family of services and design practices. The work kept teaching the same lesson: a home has history, rhythm and signals, but no single place where they become useful.
            </p>
            <p className="font-sans text-[16px] leading-[1.7] text-house-cream/80 mt-4 max-w-[54ch]">
              The House created HoWA to give the address a memory. Willow Alexander remains the founding service family, the proof from which the wider standard grows.
            </p>
            <Link href="/the-house/about" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border-b border-house-gold-light pb-1 no-underline mt-8 hover:text-house-gold-light transition-colors">
              Read our origin →
            </Link>
          </div>
        </div>
      </section>

      {/* 13. PROFESSIONALS */}
      <section className="px-[5vw] py-16 max-w-[900px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">For professionals</p>
        <h2 className="font-display text-[clamp(26px,3.4vw,42px)] leading-[1.12] text-house-black max-w-[20ch] mb-5">House Approved is not for everyone.</h2>
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

      {/* 14. CONTACT & CLOSE — single Speak to the House, dark for a clear break */}
      <EnquiryForm
        sourcePage="/"
        variant="dark"
        eyebrow="Contact"
        headline="Speak to the House."
        body="Tell us what the home needs, ask about a design project or speak to us about HoWA. We reply personally. A House for the home you love, kept to the standard a good home deserves."
        buttonLabel="Send an enquiry"
      />
    </div>
  );
}
