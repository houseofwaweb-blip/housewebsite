import Link from "next/link";
import Image from "next/image";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { SoftwareApplicationJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import { HowaScanReveal } from "@/components/howa/HowaScanReveal";

/**
 * /howa — the HoWA page within the House site (further-amendments brief §24).
 * Structure follows the brief: hero "Your home knows more than you think.",
 * then the two memories (Home Record, Household Memory), then the four actions
 * (Ask HoWA, Plan, Do, File), and "Open HoWA →". The visual language is a touch
 * more precise/instrument-like here, while staying clearly of the House.
 *
 * Release state (HOWA_APP_LIVE=false): "Open HoWA" routes to /howa/coming-soon.
 */

const PAPER = "#f8f6f0";
const PAPER_WARM = "#f1ebe5";
const DARK = "#30231a";
const OPEN_HOWA = "/howa/coming-soon";

export const metadata = {
  title: { absolute: "HoWA | House of Willow Alexander" },
  description:
    "Your home knows more than you think. HoWA brings the information, jobs, decisions and history of your home together in one place.",
};

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-[min(1296px,calc(100%-144px))] max-[1199px]:w-[calc(100%-64px)] max-[899px]:w-[calc(100%-40px)] ${className}`}>{children}</div>;
}

// The two memories (brief §24), replicating the HoWA site's "Your home has a
// history / Your household has a memory" section: two columns with "HoWA knows
// the difference" between, each with its own image and sub-item list.
const HOME_RECORD = {
  eyebrow: "One Home Record",
  h: "Your home has a history.",
  copy: "The Home Record holds the property's history: work, assets, documents, warranties, condition, services, costs and evidence.",
  img: "/howa/sept/howa-dollhouse-4x3.webp",
  alt: "The HoWA Doll's House: a cutaway model of a British home, room by room, on a rose ground.",
  pos: "object-[72%_center]",
  items: ["Property details", "Renovations & improvements", "Systems & appliances", "Documents & guarantees"],
};
const HOUSEHOLD_MEMORY = {
  eyebrow: "Your Household Memory",
  h: "Your household has a memory.",
  copy: "Household Memory holds your private preferences, routines, priorities, taste and the way you like to live.",
  img: "/howa/new/life-artwork.webp",
  alt: "Two people placing a large artwork in a colour-confident British sitting room, the living context of a household.",
  pos: "object-center",
  items: ["Your preferences", "Routines & lifestyles", "Plans & aspirations", "Things that matter"],
};

function MemoryColumn({ d }: { d: typeof HOME_RECORD }) {
  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image src={d.img} alt={d.alt} fill sizes="(max-width:1024px) 100vw, 560px" className={`object-cover ${d.pos}`} />
      </div>
      <p className="mt-6 font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-dark">{d.eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(28px,3.2vw,44px)] leading-[1.02] tracking-[-0.02em]">{d.h}</h2>
      <p className="mt-4 max-w-[46ch] font-sans text-[17px] leading-[1.55] text-house-brown/80">{d.copy}</p>
      <ul className="mt-6 flex flex-col divide-y divide-house-brown/12 border border-house-brown/12 bg-house-cream">
        {d.items.map((it) => (
          <li key={it} className="flex items-center justify-between gap-3 px-5 py-4 font-sans text-[16px] text-house-brown">
            {it}<span aria-hidden className="text-house-brown/40">&rsaquo;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The four behaviours (brief §24), shown as the "Plan. Ask. Do. File." image
// chapters from the HoWA handover: text placed in each image's empty side.
type Chapter = { w: string; line: string; cta: string; href: string; img: string; alt: string; pos: string; side: "left" | "right"; dark: boolean };
const CHAPTERS: Chapter[] = [
  { w: "Plan.", line: "See what needs doing and what is coming next.", cta: "Open HoWA", href: OPEN_HOWA, img: "/howa/plan-ask-do-file/intray-cards.webp", alt: "The HoWA in-tray: cards for a boiler service, insurance renewal, EPC and garden maintenance, each ready to act on.", pos: "object-[68%_center]", side: "left", dark: true },
  { w: "Ask.", line: "Ask questions about your home in context.", cta: "Ask HoWA", href: "/howa/ask", img: "/howa/plan-ask-do-file/how-it-works-02-alt.webp", alt: "The doll's house beside an Ask HoWA answer about when the boiler was last serviced.", pos: "object-[8%_center]", side: "right", dark: false },
  { w: "Do.", line: "Book services, approve work and take action.", cta: "See HoWA in action", href: OPEN_HOWA, img: "/howa/plan-ask-do-file/do-booked-v2.webp", alt: "A boiler service booked and marked done, an engineer scheduled, shown against the doll's house.", pos: "object-[62%_center]", side: "left", dark: false },
  { w: "File.", line: "Keep documents, records, designs and evidence together.", cta: "Explore the Home Record", href: OPEN_HOWA, img: "/howa/plan-ask-do-file/file-tray.webp", alt: "A green filing tray of categorised cards, from Guarantees to Maintenance, with a boiler service marked completed.", pos: "object-[72%_center]", side: "left", dark: false },
];

export default function HowaPage() {
  return (
    <main className="howa-surface relative overflow-x-hidden" style={{ background: PAPER, color: DARK }}>
      <SoftwareApplicationJsonLd url={`${env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/howa`} />
      <MetaViewContent contentId="howa_overview" contentName="HoWA overview" contentCategory="howa_marketing" />

      {/* Hero */}
      <section className="relative overflow-clip">
        <Container className="relative grid min-h-[620px] gap-12 lg:grid-cols-[540px_1fr] max-[899px]:grid-cols-1">
          <div className="relative z-[4] max-w-[540px] pt-[66px] max-[899px]:pt-8">
            <p className="mb-[30px] flex items-center gap-2.5 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-house-gold-dark/60" />
              <Image src="/brand/howa/howa-black.svg" alt="" width={90} height={33} className="h-[26px] w-auto" aria-hidden="true" />
              <span>Home Intelligence</span>
            </p>
            <h1 className="max-w-[540px] font-display leading-[0.96] tracking-[-0.025em] text-[clamp(46px,5.4vw,78px)]">
              Your home knows more than you think.
            </h1>
            <p className="mt-[28px] max-w-[480px] font-sans text-[20px] leading-[1.45] text-house-brown/80">
              HoWA brings the information, jobs, decisions and history of your home
              together in one place.
            </p>
            <div className="mt-[30px]">
              <Link href={OPEN_HOWA} className="inline-flex h-[58px] min-w-[220px] items-center justify-center whitespace-nowrap px-8 font-sans text-[13px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown no-underline transition-[filter] hover:brightness-125">
                Open HoWA →
              </Link>
            </div>
            <Link href="/howa/house-customers" className="mt-[18px] inline-block font-sans text-[15px] text-house-brown underline decoration-house-gold-dark/40 underline-offset-4 hover:decoration-house-brown">
              Already a House customer? Connect your services →
            </Link>
          </div>

          {/* Doll's house — shown whole, never cropped */}
          <div className="pointer-events-none absolute right-[-20px] top-[-40px] hidden h-[660px] w-[760px] max-w-[62vw] items-end justify-center lg:flex">
            <Image src="/howa/new/dollhouse-full.webp" alt="The HoWA Doll's House: a cutaway model of a British home, room by room" width={1402} height={1122} priority className="h-full w-full object-contain object-bottom" />
          </div>
          <div className="relative mt-2 aspect-[5/4] w-full overflow-hidden lg:hidden">
            <Image src="/howa/new/dollhouse-full.webp" alt="The HoWA Doll's House" fill sizes="100vw" className="object-contain object-bottom" />
          </div>
        </Container>
      </section>

      {/* The two memories — HoWA's "Your home has a history / Your household has
          a memory", with "HoWA knows the difference" between. */}
      <section className="py-[clamp(44px,5vw,80px)]">
        <Container>
          <div className="grid items-start gap-x-[clamp(24px,3vw,52px)] gap-y-12 lg:grid-cols-[1fr_auto_1fr]">
            <MemoryColumn d={HOME_RECORD} />
            <div className="flex items-center justify-center lg:self-center">
              <p className="text-center font-display italic leading-[1.15] text-[clamp(22px,2.2vw,32px)] text-house-gold-dark">
                HoWA<br />knows the<br />difference.
              </p>
            </div>
            <MemoryColumn d={HOUSEHOLD_MEMORY} />
          </div>
          <p className="mx-auto mt-10 max-w-[62ch] text-center font-sans text-[clamp(15px,1.4vw,18px)] leading-[1.5] text-house-brown/70">
            The Home Record stays with the property. Your private Household Memory
            moves with you.
          </p>
        </Container>
      </section>

      {/* The four behaviours — Plan. Ask. Do. File. (image chapters) */}
      <section className="py-[clamp(40px,5vw,72px)]" style={{ background: PAPER_WARM }}>
        <Container>
          <div className="flex items-center gap-5">
            <span aria-hidden="true" className="h-px w-[34px] shrink-0 bg-house-gold-dark/70" />
            <h2 className="font-display text-[clamp(32px,4vw,64px)] leading-[0.96] tracking-[-0.02em]">Plan. Ask. Do. File.</h2>
          </div>
          <p className="mt-3 font-sans text-[clamp(16px,1.2vw,19px)] leading-[1.5] text-house-brown/65">One place, four behaviours.</p>
          <div className="mt-9 grid gap-[clamp(20px,2.4vw,36px)] sm:grid-cols-2">
            {CHAPTERS.map((c) => {
              const light = c.dark;
              const ink = light ? "#F5F4EF" : "#16150F";
              const ctaColor = light ? "#F5F4EF" : "#123E30";
              const cx = c.side === "right" ? "100%" : "0%";
              const scrim = light
                ? `radial-gradient(95% 78% at ${cx} 0%, rgba(12,20,26,0.62) 0%, rgba(12,20,26,0.28) 30%, rgba(12,20,26,0) 55%)`
                : `radial-gradient(90% 70% at ${cx} 0%, rgba(244,243,238,0.9) 0%, rgba(244,243,238,0.45) 28%, rgba(244,243,238,0) 52%)`;
              return (
                <Link key={c.w} href={c.href} className="group block overflow-hidden border border-house-brown/10 bg-house-cream no-underline">
                  <div className="relative aspect-[16/11] w-full overflow-hidden">
                    <Image src={c.img} alt={c.alt} fill sizes="(min-width:640px) 46vw, 100vw" className={`object-cover transition-transform duration-500 group-hover:scale-[1.02] ${c.pos}`} />
                    <div aria-hidden className="absolute inset-0 hidden sm:block" style={{ background: scrim }} />
                    <div className={`absolute inset-0 hidden flex-col justify-start px-[clamp(22px,3vw,44px)] pt-[clamp(26px,4vw,54px)] sm:flex ${c.side === "right" ? "items-end text-right" : "items-start"}`}>
                      <div className="max-w-[47%]">
                        <h3 className="font-display text-[clamp(42px,4.6vw,72px)] font-normal leading-[0.92] tracking-[-0.03em]" style={{ color: ink }}>{c.w}</h3>
                        <p className="mt-2 font-display text-[clamp(16px,1.3vw,22px)] italic leading-[1.2]" style={{ color: ink }}>{c.line}</p>
                        <span className="mt-4 inline-block font-sans text-[13.5px] underline decoration-[1px] underline-offset-[5px] transition-opacity group-hover:opacity-75" style={{ color: ctaColor }}>{c.cta} &rarr;</span>
                      </div>
                    </div>
                  </div>
                  {/* Phone: text stacked below the image */}
                  <div className="px-5 py-5 sm:hidden">
                    <h3 className="font-display text-[clamp(40px,12vw,56px)] font-normal leading-[0.94] tracking-[-0.03em] text-house-ink">{c.w}</h3>
                    <p className="mt-1.5 font-display text-[19px] italic leading-[1.2] text-house-brown/85">{c.line}</p>
                    <span className="mt-3 inline-block font-sans text-[13.5px] text-house-forest underline decoration-[1px] underline-offset-[5px]">{c.cta} &rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Explore with HoWA — scan to design (a product moment supporting "Do") */}
      <section className="pt-[clamp(44px,5vw,72px)]">
        <Container>
          <div className="max-w-[720px]">
            <p className="mb-4 flex items-center gap-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark"><span aria-hidden="true" className="h-px w-8 bg-house-gold-dark/60" />From an idea to a useful next step</p>
            <h2 className="max-w-[560px] font-display text-[clamp(30px,3.6vw,50px)] leading-[0.98]">Explore with HoWA. Bring it to life with the House.</h2>
            <p className="mt-5 max-w-[52ch] font-sans text-[17px] leading-[1.6] text-house-brown/80">Watch a scan become a design. HoWA reads your room or garden and resolves it into a first direction: dimensions, zones, a material palette, an indicative budget and a written brief you can keep.</p>
          </div>
          <div className="mt-[38px]">
            <HowaScanReveal />
          </div>
        </Container>
      </section>

      {/* Closing — Open HoWA */}
      <section className="relative mt-[clamp(44px,5vw,72px)] overflow-hidden" style={{ background: DARK, color: "#fff" }}>
        <Image src="/photos/wa-flower-white.png" alt="" aria-hidden="true" width={210} height={260} className="pointer-events-none absolute bottom-[-30px] left-[-35px] w-[210px] opacity-[0.14]" />
        <Container className="relative z-10 flex min-h-[280px] flex-col items-start justify-center gap-6 py-[clamp(48px,6vw,88px)]">
          <h2 className="max-w-[18ch] font-display text-[clamp(32px,4vw,54px)] leading-[1.04]">Start with the home you have.</h2>
          <p className="max-w-[52ch] font-sans text-[17px] leading-[1.6] text-house-cream/80">Open HoWA, connect your House services and see what becomes useful. Free to begin.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={OPEN_HOWA} className="inline-flex h-[54px] items-center justify-center whitespace-nowrap px-8 font-sans text-[13px] tracking-[0.16em] uppercase text-house-ink bg-house-cream border border-house-cream no-underline transition-[filter] hover:brightness-105">
              Open HoWA →
            </Link>
            <Link href="/how-it-works" className="font-sans text-[14px] text-house-cream underline decoration-house-gold-light/50 underline-offset-4 hover:decoration-house-cream">How the House works →</Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
