import Link from "next/link";
import { membershipLabelFor, COMMERCIAL_SEPARATION, HOUSEHOLD } from "@/lib/truth";
import Image from "next/image";

/**
 * /household — The Household hub (Final Master Directive, Part IV).
 *
 * One job: make ten household needs feel familiar while keeping one
 * intelligence, one account and one Home Record beneath them. Senior
 * (paid) members sit above the seven utility members on the hub.
 * Naming rule: always "The"; never bots/agents/AI products.
 */

export const metadata = {
  title: "The Household by HoWA | Ten members, one home record",
  description:
    "Meet the Household: ten familiar members for the needs of a home, with one HoWA intelligence, one account and one Home Record beneath them all.",
};

const SENIORS = [
  {
    name: "The Housekeeper",
    price: membershipLabelFor("housekeeper"),
    img: "/howa/household/housekeeper.webp",
    btn: "#c17a5f",
    role: "Keeps the daily home in order: filing, reminders, rhythms, cost memory, a shared household view and the Monthly Brief.",
    note: "Membership pays for the software and continuity. Visits remain booked and paid separately.",
    cta: "Employ the Housekeeper",
    href: "/howa/housekeeper",
  },
  {
    name: "The Steward",
    price: membershipLabelFor("steward"),
    img: "/howa/household/steward.webp",
    btn: "#c9a84a",
    role: "Protects the long view: risk, evidence, annual reporting, transfer readiness and deeper connected-home permissions.",
    note: "Available when the product depth supports the promise.",
    cta: "Protect the home",
    href: "/howa/steward",
  },
];

// The eight non-senior members, read from the truth layer so the promises
// match the directive's ONE-LINE PUBLIC PROMISES table in one place rather than
// being retyped here. Route/image/state stay local presentation concerns.
const MEMBER_VIEW: Record<string, { state: string; tone: string; href: string }> = {
  gardener:    { state: "Live where serviceable", tone: "live", href: "/household/gardener" },
  handyman:    { state: "Guidance beta",          tone: "beta", href: "/household/handyman" },
  designer:    { state: "Live",                   tone: "live", href: "/household/designer" },
  surveyor:    { state: "Guidance beta",          tone: "beta", href: "/household/surveyor" },
  archivist:   { state: "Product beta",           tone: "beta", href: "/household/archivist" },
  storekeeper: { state: "The Stores",             tone: "live", href: "/shop" },
  host:        { state: "Live",                   tone: "live", href: "/host" },
  butler:      { state: "Staged release",         tone: "beta", href: "/household/butler" },
};
const MEMBERS = HOUSEHOLD.filter((m) => MEMBER_VIEW[m.id]).map((m) => ({
  name: m.publicName,
  promise: m.promise,
  img: m.image,
  ...MEMBER_VIEW[m.id],
}));

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-ink hover:text-house-gold-ink";

function Chip({ tone, children }: { tone: string; children: React.ReactNode }) {
  const map: Record<string, string> = { live: "text-house-moss", beta: "text-house-brown/80", paid: "text-house-gold-dark" };
  return <span className={`font-sans text-[10px] tracking-[0.12em] uppercase bg-house-cream/95 px-2.5 py-1 ${map[tone] ?? map.beta}`}>{children}</span>;
}

export default function HouseholdPage() {
  return (
    <div className="howa-surface bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-20 pb-14 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">The Household</p>
        <h1 className="font-display text-[clamp(40px,5.4vw,78px)] leading-[1.02] tracking-[-0.01em] text-house-black">
          Meet the Household. <em className="italic">Your home has staff now.</em>
        </h1>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/82 mt-7 max-w-[56ch]">
          Not people in the hallway. A calm intelligence behind the home. Each member listens to a different part of
          the house and helps you take the next useful step.
        </p>
        <p className="font-sans text-[17px] leading-[1.65] text-house-brown/72 mt-4 max-w-[56ch]">
          They are not separate apps or separate records. HoWA understands and remembers the home beneath them all.
        </p>
        <div className="mt-9"><Link href="/howa" className={ctaPrimary}>Start with my address</Link></div>
      </section>

      {/* Senior Household — paid continuity, above the utility members */}
      <section className="px-[5vw] py-14 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1300px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-6">The two you employ</p>
          <div className="grid gap-6 md:grid-cols-2">
            {SENIORS.map((d) => (
              <Link key={d.name} href={d.href} className="group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-2xl no-underline">
                <Image src={d.img} alt={d.name} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,14,10,0.9) 0%, rgba(20,14,10,0.42) 46%, rgba(20,14,10,0.05) 80%)" }} />
                <div className="relative p-7 text-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display text-[clamp(24px,2.6vw,32px)] leading-[1.04]">
                      The<br />{d.name.replace("The ", "")}
                    </h3>
                    <span className="font-sans text-[13px] text-white/90 whitespace-nowrap mt-1.5">{d.price}</span>
                  </div>
                  <p className="font-sans text-[14.5px] leading-[1.55] text-white/85 mb-2">{d.role}</p>
                  <p className="font-sans text-[12.5px] leading-[1.5] text-white/65 mb-5">{d.note}</p>
                  <span className="inline-block rounded-xl px-5 py-3 font-sans text-[13px] font-medium text-house-black transition-[filter] group-hover:brightness-105" style={{ background: d.btn }}>{d.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
          {/* Publish-ready commercial separation. Required wherever the £16.99
              or £29.99 tiers are shown: the directive forbids any route that
              implies a software subscription includes physical service visits. */}
          <p className="font-sans text-[13.5px] leading-[1.65] text-house-brown/70 max-w-[78ch] mt-8">
            {COMMERCIAL_SEPARATION}
          </p>
        </div>
      </section>

      {/* The seven members */}
      <section className="px-[5vw] py-16 max-w-[1300px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-6">The Household</p>
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.map((m) => (
            <Link key={m.name} href={m.href} className="group block no-underline">
              <div className="relative aspect-[4/5] overflow-hidden bg-house-cream-dark border border-house-brown/10">
                <Image src={m.img} alt={m.name} fill sizes="(min-width:1024px) 22vw, 46vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]" />
                <span className="absolute left-2.5 top-2.5"><Chip tone={m.tone}>{m.state}</Chip></span>
              </div>
              <h3 className="font-display text-[20px] leading-[1.2] text-house-black group-hover:text-house-gold-ink transition-colors mt-3">{m.name}</h3>
              <p className="font-display italic text-[14px] leading-[1.4] text-house-brown/75 mt-1.5">{m.promise}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* One House beneath every member */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-house-brown/8">
        <div className="max-w-[820px] mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,3.2vw,42px)] leading-[1.12] text-house-black mb-6">One House beneath every member.</h2>
          <p className="font-sans text-[18px] leading-[1.7] text-house-brown/82 mb-4">
            The Household is how House of HoWA makes the work of the home familiar. Ask through any member and the useful
            answer, booking, document, design or purchase can return to the same address and the same Home Record.
          </p>
          <p className="font-sans text-[16px] leading-[1.65] text-house-brown/72 mb-8">
            Your membership changes how much continuity and orchestration HoWA provides. It does not create a new home,
            a new account or a set of disconnected assistants.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/howa" className={ctaPrimary}>Start with my address</Link>
            <Link href="/howa/plans" className={ctaSecondary}>See Housekeeper &amp; Steward</Link>
          </div>
          <p className="font-sans text-[13px] leading-[1.6] text-house-stone mt-10 max-w-[64ch] mx-auto">
            Your contract is with the named provider shown in HoWA. House Approved describes the standard and operating
            framework around the introduction; it does not make unnamed providers interchangeable.
          </p>
        </div>
      </section>
    </div>
  );
}
