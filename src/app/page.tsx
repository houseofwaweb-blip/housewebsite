import Image from "next/image";
import Link from "next/link";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { LIVE_SERVICES as TRUTH_LIVE_SERVICES, membershipLabelFor, COMMERCIAL_SEPARATION } from "@/lib/truth";

/**
 * Homepage — House of HoWA.
 *
 * The section order is LOCKED by the Persona-Led Zero-Interpretation Directive
 * v2, STEP 05, and overrides the earlier homepage sequence:
 *
 *   1 hero · 2 four rooms · 3 meet the Household · 4 finder (nested inside the
 *   Household) · 5 live care organised by staff · 6 real people band ·
 *   7 House Approved proof · 8 HoWA and Score reveal · 9 booked/done/
 *   remembered · 10 The Designer · 11 The Stores and The Host · 12 standard and
 *   origin · 13 professionals · 14 contact and close.
 *
 * The visitor must meet the Household BEFORE any service or design taxonomy,
 * so the finder and live care sit after and inside the Household layer rather
 * than in front of it. The page alternates reality -> intelligence -> reality:
 * the real-people band and House Approved proof bracket the HoWA/Score reveal
 * so it never becomes a run of campaign renders.
 */

export const metadata = {
  title: { absolute: "House of HoWA | That feeling you call home" },
  description:
    "A modern British House for the care, design and intelligence of home and garden. Book trusted services, commission considered design and begin a living record of your home, remembered by HoWA.",
};

// Read from the single truth layer, never a local list. A service appears here
// only while resolveStatus() still returns "live": strip its seller, coverage,
// price route or bookability and it downgrades itself off the homepage rather
// than sitting here as an unsupported claim.
const LIVE_SERVICES = TRUTH_LIVE_SERVICES.map((svc) => ({
  name: svc.publicName,
  href: svc.canonicalRoute,
  line: svc.line ?? "",
  img: svc.image ?? "/services/service-placeholder.webp",
}));

// Live care chips are DERIVED from truth by householdOwner, not hand-listed.
// The directive's ownership table (gardening under The Gardener; cleaning,
// windows and gutters under The Housekeeper) is already encoded there, and
// deriving it means a service that downgrades loses its chip automatically
// instead of leaving the member advertising work nobody can deliver.
const chipsFor = (owner: string) =>
  TRUTH_LIVE_SERVICES.filter((svc) => svc.householdOwner === owner).map((svc) => svc.publicName);

// The Household, grouped exactly as Directive v2 STEP 05 section 3 requires:
// senior row (Housekeeper, Steward, Butler), then the six need-based members,
// then The Host closing the section at the door. Ten in total, and all ten are
// shown, but not as ten identical product tiles: seniors get editorial scale,
// live need-based members carry their service chips, future members stay
// quieter.
//
// Live care chips sit inside the card of the member who OWNS the work:
// gardening under The Gardener, cleaning/windows/gutters under The
// Housekeeper, both design routes under The Designer.
const SENIORS = [
  {
    role: "The Housekeeper",
    // Label from truth: the directive states the price with a "when live"
    // qualifier rather than hiding it.
    price: membershipLabelFor("housekeeper"),
    img: "/howa/household/housekeeper.webp",
    btn: "#c17a5f",
    forLine: "For the household that wants everything kept in rhythm.",
    line: "Records, reminders, documents, service history and the monthly home rhythm, kept in order.",
    chips: chipsFor("housekeeper"),
    cta: "Employ the Housekeeper",
    href: "/household/housekeeper",
  },
  {
    role: "The Steward",
    price: membershipLabelFor("steward"),
    img: "/howa/household/steward.webp",
    btn: "#c9a84a",
    forLine: "For the homeowner who wants the long view of the home.",
    line: "Score oversight, risk watch, evidence, annual report and future planning.",
    chips: [],
    cta: "Protect the home",
    href: "/household/steward",
  },
  {
    role: "The Butler",
    price: "Staged release",
    img: "/howa/household/butler.webp",
    btn: null, // Quieter: not yet available, so it gets no filled action.
    forLine: "For the home whose instruments can be read.",
    line: "Reads connected instruments and, by permission, helps operate them.",
    chips: [],
    cta: "Meet the Butler",
    href: "/household/butler",
  },
];

const NEED_MEMBERS = [
  { name: "The Gardener", line: "Understand the garden and book the work.", state: "Live where serviceable", tone: "live", img: "/howa/household/gardener.webp", href: "/household/gardener", chips: chipsFor("gardener") },
  { name: "The Handyman", line: "Photograph the fault and understand what to do next.", state: "Diagnosis beta", tone: "beta", img: "/howa/household/handyman.webp", href: "/household/handyman", chips: [] },
  { name: "The Designer", line: "Turn a room or garden into a clear brief and professional route.", state: "Live", tone: "live", img: "/howa/household/designer.webp", href: "/household/designer", chips: ["Interior Design", "Garden Design"] },
  { name: "The Surveyor", line: "Decode a crack, damp concern or quote in plain language.", state: "Guidance beta", tone: "beta", img: "/howa/household/surveyor.webp", href: "/household/surveyor", chips: [] },
  { name: "The Archivist", line: "Turn one document into dates, costs and reminders.", state: "Product beta", tone: "beta", img: "/howa/household/archivist.webp", href: "/household/archivist", chips: [] },
  { name: "The Storekeeper", line: "Find considered goods for the home.", state: "The Stores", tone: "live", img: "/howa/household/storekeeper.webp", href: "/household/storekeeper", chips: [] },
];

// The Host closes the section at the door.
const HOST_MEMBER = {
  name: "The Host",
  line: "Find practical and cultural guidance worth keeping.",
  state: "Live",
  tone: "live",
  img: "/howa/household/host.webp",
  href: "/host",
};

const WHAT_MATTERS = [
  "Boiler service · due in 14 days",
  "Gutter clean · before winter",
  "Smoke alarms · tested OK",
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

// The four rooms of the House (Directive v2 STEP 05, section 2). Destinations
// and public roles are fixed by the directive table.
const FOUR_ROOMS = [
  { title: "Care and Design", href: "/household", role: "Meet the staff and the care they arrange.", image: "/howa/household/gardener.webp" },
  { title: "The Stores", href: "/shop", role: "Objects with a place in the House.", image: "/howa/household/storekeeper.webp" },
  { title: "The Host", href: "/host", role: "Guidance, The Hearth and House culture.", image: "/howa/household/host.webp" },
  { title: "The House", href: "/the-house/about", role: "Origin, standard and the people behind it.", image: "/home/origin-studio.webp" },
];

// The finder's nine choices, fixed by Directive v2 STEP 05 section 4. Each one
// resolves FIRST to the Household member who owns the need, then on to the
// service or tool route: the visitor meets the staff, never a bare taxonomy.
// Cleaning, windows and gutters all sit under The Housekeeper; both design
// routes under The Designer. "Something else" goes to Speak to the House
// rather than a dead end.
const FINDER_CHOICES = [
  { label: "Garden care", owner: "The Gardener", href: "/household/gardener" },
  { label: "Cleaning", owner: "The Housekeeper", href: "/services/cleaning" },
  { label: "Windows", owner: "The Housekeeper", href: "/services/window-cleaning" },
  { label: "Gutters", owner: "The Housekeeper", href: "/services/gutter-cleaning" },
  { label: "Interior Design", owner: "The Designer", href: "/design/interiors" },
  { label: "Garden Design", owner: "The Designer", href: "/design/gardens" },
  { label: "A fault or repair", owner: "The Handyman", href: "/household/handyman" },
  { label: "Paperwork", owner: "The Archivist", href: "/household/archivist" },
  { label: "Something else", owner: "Speak to the House", href: "#speak-to-the-house" },
];

// Real team and van photography for the band after live care. Real work only,
// no campaign renders: the directive requires reality either side of the HoWA
// intelligence layer.
const REAL_PEOPLE = [
  { src: "/services/photos/vans/asher-348.webp", alt: "A liveried House of HoWA electric van" },
  { src: "/services/photos/gardening/garden-clearance-hero.webp", alt: "A gardener clearing a garden" },
  { src: "/services/photos/window-cleaning/regular-window-cleaning-hero.webp", alt: "A window cleaner at work on a home" },
  { src: "/services/photos/cleaning/regular-cleaning-hero.webp", alt: "A cleaner at work inside a home" },
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
              <a href="#open-booking-form" className={ctaPrimary}>Book through HoWA</a>
              <Link href="/howa" className={ctaSecondary}>Start with my address</Link>
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


      {/* 2. FOUR ROOMS OF THE HOUSE — the locked second section (Directive v2
          STEP 05). Four destinations, no departmental taxonomy. */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-b border-house-brown/8">
        <div className="max-w-[1300px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">Four rooms of the House</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FOUR_ROOMS.map((room) => (
              <Link key={room.title} href={room.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-house-brown/5">
                  <Image
                    src={room.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[var(--t-slow)] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-display text-[22px] leading-[1.15] text-house-black mt-4">{room.title}</h3>
                <p className="font-sans text-[14px] leading-[1.6] text-house-brown/75 mt-2">{room.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* 3. MEET THE HOUSEHOLD — all ten, senior row first, then the six
          need-based members, then The Host at the door. */}
      <section className="px-[5vw] py-16 max-w-[1300px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">The Household</p>
        <h2 className="font-display text-[clamp(30px,4vw,52px)] leading-[1.05] text-house-black mb-5">Meet the Household.</h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/82 max-w-[60ch] mb-3">Every home need feels different. HoWA keeps one record beneath them all.</p>
        <p className="font-sans text-[16px] leading-[1.65] text-house-brown/72 max-w-[70ch] mb-3">
          The Gardener reads the garden. The Handyman reads faults. The Designer shapes the brief. The Surveyor reads walls and quotes. The Archivist turns paperwork into dates. The Storekeeper keeps The Stores. The Host welcomes you in.
        </p>
        <p className="font-sans text-[16px] leading-[1.65] text-house-brown/72 max-w-[70ch] mb-10">
          The Housekeeper keeps the daily rhythm. The Steward protects the long view. The Butler reads the instruments of the home.
        </p>

        {/* Senior staff — editorial scale */}
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-6">Senior staff</p>
        <div className="howa-surface grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SENIORS.map((d) => (
            <Link key={d.role} href={d.href} className="group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-2xl no-underline">
              <Image src={d.img} alt={d.role} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,14,10,0.88) 0%, rgba(20,14,10,0.38) 45%, rgba(20,14,10,0.05) 78%)" }} />
              <div className="relative p-7 text-white">
                <h3 className="font-display text-[clamp(26px,2.6vw,36px)] leading-[1.04] mb-2">
                  The<br />{d.role.replace("The ", "")}
                </h3>
                <p className="font-sans text-[13px] leading-[1.45] text-white/85 mb-3">{d.price}</p>
                <p className="font-display italic text-[16px] leading-[1.4] text-white/85 mb-3 max-w-[44ch]">{d.forLine}</p>
                <p className="font-sans text-[14.5px] leading-[1.55] text-white/80 mb-4 max-w-[48ch]">{d.line}</p>
                {d.chips.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5 mb-5 list-none p-0">
                    {d.chips.map((chip) => (
                      <li key={chip} className="font-sans text-[10.5px] tracking-[0.1em] uppercase text-white/90 border border-white/35 px-2 py-1">{chip}</li>
                    ))}
                  </ul>
                )}
                {d.btn ? (
                  <span className="inline-block rounded-xl px-5 py-3 font-sans text-[13px] font-medium text-house-black transition-[filter] group-hover:brightness-105" style={{ background: d.btn }}>{d.cta} →</span>
                ) : (
                  <span className="inline-block px-5 py-3 font-sans text-[13px] text-white/90 border border-white/40 transition-colors group-hover:border-white">{d.cta} →</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* The six need-based members */}
        {/* Required wherever the tiers are priced: a software subscription
            must never read as including physical service visits. */}
        <p className="font-sans text-[13.5px] leading-[1.65] text-house-brown/70 max-w-[78ch] mt-8">{COMMERCIAL_SEPARATION}</p>

        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mt-16 mb-6">Start with what needs attention</p>
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {NEED_MEMBERS.map((m) => (
            <Link key={m.name} href={m.href} className="group block no-underline">
              <div className="relative aspect-[4/5] overflow-hidden bg-house-cream-dark border border-house-brown/10">
                <Image src={m.img} alt={m.name} fill sizes="(min-width:1024px) 30vw, 46vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]" />
                <span className="absolute left-2.5 top-2.5"><StateChip tone={m.tone}>{m.state}</StateChip></span>
              </div>
              <h3 className="font-display text-[19px] leading-[1.2] text-house-black group-hover:text-house-gold-ink transition-colors mt-3">{m.name}</h3>
              <p className="font-sans text-[13.5px] leading-[1.5] text-house-brown/70 mt-1.5">{m.line}</p>
              {m.chips.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 mt-2.5 list-none p-0">
                  {m.chips.map((chip) => (
                    <li key={chip} className="font-sans text-[10.5px] tracking-[0.1em] uppercase text-house-moss border border-house-moss/35 px-2 py-1">{chip}</li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </div>

        {/* The Host closes the section at the door */}
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mt-16 mb-6">At the door</p>
        <Link href={HOST_MEMBER.href} className="group grid gap-8 md:grid-cols-[1fr_1.4fr] items-center no-underline border border-house-brown/12 bg-house-cream-dark p-6">
          <div className="relative aspect-[4/3] overflow-hidden bg-house-brown/5">
            <Image src={HOST_MEMBER.img} alt={HOST_MEMBER.name} fill sizes="(min-width:768px) 34vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
            <span className="absolute left-2.5 top-2.5"><StateChip tone={HOST_MEMBER.tone}>{HOST_MEMBER.state}</StateChip></span>
          </div>
          <div>
            <h3 className="font-display text-[clamp(24px,2.6vw,34px)] leading-[1.1] text-house-black group-hover:text-house-gold-ink transition-colors">{HOST_MEMBER.name}</h3>
            <p className="font-sans text-[15.5px] leading-[1.6] text-house-brown/75 mt-2.5 max-w-[46ch]">{HOST_MEMBER.line}</p>
            <span className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown/70 mt-5 transition-colors group-hover:text-house-gold-ink">Meet The Host →</span>
          </div>
        </Link>

        <div className="mt-12 text-center"><Link href="/household" className={ctaSecondary}>Meet the Household →</Link></div>
      </section>

      {/* 4. FINDER, NESTED INSIDE THE HOUSEHOLD */}
      <section className="px-[5vw] py-14 bg-house-cream-dark border-b border-house-brown/8">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-black mb-3">What does the home need?</h2>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/80 max-w-[58ch] mx-auto mb-7">
            Tell us the need and postcode. We will open the right member of the
            Household, show what is available, who may deliver it and the next
            appointment or quotation route.
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-[820px] mx-auto mb-8 list-none p-0">
            {FINDER_CHOICES.map((choice) => (
              <li key={choice.label}>
                <Link
                  href={choice.href}
                  className="group flex flex-col items-start gap-1 h-full bg-house-cream border border-house-brown/15 px-4 py-3 no-underline text-left transition-colors duration-[var(--t-base)] hover:border-house-gold-ink"
                >
                  <span className="font-sans text-[14px] leading-[1.3] text-house-black">{choice.label}</span>
                  <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-house-brown/60 transition-colors duration-[var(--t-base)] group-hover:text-house-gold-ink">
                    {choice.owner}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#open-booking-form" className={ctaPrimary}>Choose what needs attention</a>
            <a href="#open-booking-form" className={ctaSecondary}>Check my postcode</a>
          </div>
        </div>
      </section>

      {/* 5. LIVE CARE, ORGANISED BY STAFF */}
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


      {/* 6. REAL PEOPLE BAND — real team/van photography, placed immediately
          after live care (Directive v2 STEP 05, section 5). Reality before the
          HoWA intelligence layer. */}
      <section className="px-[5vw] py-16 bg-house-black text-house-cream border-t border-house-brown/20">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.08] text-house-cream max-w-[24ch]">
            Real people, real standards, one remembered home.
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-9">
            {REAL_PEOPLE.map((shot) => (
              <div key={shot.src} className="relative aspect-[4/3] overflow-hidden bg-house-cream/5">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 7. HOUSE APPROVED PROOF — text left, van image right */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1300px] mx-auto grid gap-10 lg:gap-14 lg:grid-cols-2 lg:items-center">
          <div className="lg:pl-[3vw]">
            <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">House Approved</p>
            <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.1] text-house-black max-w-[16ch] mb-5">The mark on the van means something.</h2>
            <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[52ch] mb-3">
              House Approved is not an open directory. It is the standard for the professionals, studios and sellers the House is prepared to present.
            </p>
            <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[52ch] mb-8">
              Named providers. Clear scopes. Current operating information. Work reviewed and approval capable of being withdrawn.
            </p>
            <Link href="/house-approved" className={ctaSecondary}>What House Approved means →</Link>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden border border-house-brown/10">
            <Image src="/the-house/house-approved-van.webp" alt="A House Approved van with the mark on its side and the named provider beside it on a British street" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 8. HOWA AND SCORE REVEAL — text left, home image + Score card right */}
      <section className="px-[5vw] py-20 bg-house-black text-house-cream border-t border-house-brown/20">
        <div className="max-w-[1240px] mx-auto grid gap-12 lg:gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-[clamp(30px,4vw,54px)] leading-[1.06] text-house-cream max-w-[18ch]">Your house is trying to tell you something.</h2>
            <p className="font-sans text-[17px] leading-[1.7] text-house-cream/80 mt-6 max-w-[52ch]">
              The windows, the gutters, the boiler service you keep meaning to book, the warranty you know is somewhere.
            </p>
            <p className="font-sans text-[17px] leading-[1.7] text-house-cream/80 mt-4 max-w-[52ch]">
              HoWA gives the address one Home Record, one HoWA Score and one calm place to understand what has happened, what is missing and what matters next.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/howa" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-black bg-house-gold-light border border-house-gold-light px-6 py-3 no-underline hover:brightness-105 transition-[filter]">Start with my address</Link>
              <Link href="/howa-score" className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-light hover:text-house-gold-light">See how the HoWA Score works</Link>
            </div>
            {/* Directive v2: no app-store badges unless a real store listing or a
                working pre-registration flow exists. Neither is verified, so the
                claim is removed rather than downgraded to marketing language. */}
          </div>

          {/* home image (full 16:9, not cropped) with the Score card over it */}
          <div className="relative">
            <div className="relative aspect-[16/9] overflow-hidden border border-house-cream/10 bg-house-cream-dark">
              <Image src="/howa/score-dashboard.webp" alt="A HoWA home, seen with its living overview" fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
            </div>
            <div className="howa-surface relative z-10 -mt-14 w-[92%] mx-auto">
              <div className="rounded-2xl bg-house-cream text-house-brown overflow-hidden shadow-[0_30px_70px_-28px_rgba(0,0,0,0.65)]">
                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-house-brown/10">
                  <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-gold-ink">HoWA Home Overview</p>
                  <p className="font-sans text-[10px] tracking-[0.1em] uppercase text-house-stone">Example</p>
                </div>
                <div className="flex items-center gap-4 px-5 py-4 border-b border-house-brown/10">
                  <div className="relative w-[72px] h-[72px] shrink-0">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(48,35,28,0.12)" strokeWidth="9" />
                      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-house-gold-dark)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 52 * 0.76} ${2 * Math.PI * 52}`} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-[24px] leading-none text-house-black">76</span>
                      <span className="font-sans text-[8px] tracking-[0.12em] uppercase text-house-stone mt-0.5">of 100</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-stone mb-0.5">HoWA Score</p>
                    <p className="font-display text-[24px] leading-none text-house-black">76<span className="font-sans text-[12px] text-house-stone ml-1.5">/ 100</span></p>
                    <p className="font-sans text-[12.5px] text-house-brown/75 mt-1">In order, with gaps</p>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-gold-ink mb-2.5">What matters first</p>
                  <ul className="grid gap-2">
                    {WHAT_MATTERS.map((w) => (
                      <li key={w} className="flex items-center gap-2.5 rounded-lg bg-house-cream-dark/70 border border-house-brown/8 px-3 py-2">
                        <span className="is-round w-1.5 h-1.5 shrink-0 bg-house-gold-dark" aria-hidden />
                        <span className="font-sans text-[13px] text-house-brown">{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-5 py-3 border-t border-house-brown/10">
                  <p className="font-sans text-[12.5px] leading-[1.5] text-house-brown/80">
                    <span className="font-medium text-house-black">Next action:</span> book the boiler service before winter, and save the certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOOKED. DONE. REMEMBERED. */}
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
        <div className="mt-10 text-center"><a href="#open-booking-form" className={ctaPrimary}>Book through HoWA</a></div>
      </section>

      {/* 10. THE DESIGNER — two founding-discipline image cards */}
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

      {/* 11a. THE STORES — a place for everything (room cards) */}
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

      {/* 11b. THE HOST — editorial, dark band with Hearth grid */}
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

      {/* 12a. HOUSE STANDARD */}
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

      {/* 12b. ORIGIN — image left, copy right (live-site band) */}
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

      {/* 13. PROFESSIONALS — on cream-dark, so the cream contact form below reads as a clean break */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-house-brown/8">
        <div className="max-w-[900px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">For professionals</p>
          <h2 className="font-display text-[clamp(26px,3.4vw,42px)] leading-[1.12] text-house-black max-w-[20ch] mb-5">House Approved is not for everyone.</h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[60ch] mb-3">
            It is for designers, craftspeople and service businesses whose work the House is prepared to stand behind.
          </p>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[60ch] mb-8">
            Approval is selective. Providers remain independent, choose the work they accept and are presented by name.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/become-a-house-pro" className={ctaPrimary}>Apply for Approval</Link>
            <Link href="/house-approved" className={ctaSecondary}>What the mark means</Link>
          </div>
        </div>
      </section>

      {/* 14. CONTACT & CLOSE — single Speak to the House, dark for a clear
          break. Anchored: the finder's "Something else" resolves here, because
          the directive forbids a blank or dead-end result. */}
      <div id="speak-to-the-house" className="scroll-mt-24">
        <EnquiryForm
          sourcePage="/"
          className="border-t border-house-brown/10"
          eyebrow="Contact"
          headline="Speak to the House."
          body="Tell us what the home needs, ask about a design project or speak to us about HoWA. We reply personally. A House for the home you love, kept to the standard a good home deserves."
          buttonLabel="Send an enquiry"
        />
      </div>
    </div>
  );
}
