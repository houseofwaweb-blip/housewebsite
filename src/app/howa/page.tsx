import Link from "next/link";
import Image from "next/image";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { SoftwareApplicationJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import { HowaScanReveal } from "@/components/howa/HowaScanReveal";

/**
 * /howa — HoWA hub, rebuilt to the HoWA Homepage Layout Correction Brief
 * (Sept HoWA review v2). Geometry-first: shared 1296px page grid on a 72px
 * left / 1368px right axis; hero as a two-part overlapping composition (copy
 * left, full Doll's House rising on the right, product card overlapping); tight
 * section rhythm. The House global shell (Header/Footer) still wraps the page,
 * so the brief's own header/footer are not recreated here.
 */

const PAPER = "#f8f6f0";
const PAPER_WARM = "#f1ebe5";
const DARK = "#30231a";

export const metadata = {
  title: { absolute: "HoWA Home Intelligence | House of Willow Alexander" },
  description:
    "Your House care. Now connected. Meet HoWA, the Home Intelligence the House runs on: your home's history, your household's priorities and the next useful action, together.",
};

/** Shared page container — every principal block aligns to this. */
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-[min(1296px,calc(100%-144px))] max-[1199px]:w-[calc(100%-64px)] max-[899px]:w-[calc(100%-40px)] ${className}`}>{children}</div>;
}

const PRINCIPLES = [
  { n: "01", title: "Know the home.", copy: "Keep its documents, service history and useful evidence together." },
  { n: "02", title: "Remember the household.", copy: "Bring the preferences and priorities that make advice relevant." },
  { n: "03", title: "Help it act.", copy: "Turn understanding into a clearer brief, reminder or next step." },
];
const THREAD = [
  { n: "01", title: "A clearer brief", copy: "The useful details before anyone arrives." },
  { n: "02", title: "Agreed work", copy: "The right expertise and a clear scope." },
  { n: "03", title: "A useful record", copy: "What happened, kept for what comes next." },
];
const STRIP = [
  { label: "Read a quote", href: "/howa/ask?tool=quote" },
  { label: "Understand a document", href: "/howa/ask?tool=documents" },
  { label: "Prepare a repair brief", href: "/howa/ask?tool=repair" },
];

export default function HowaPage() {
  return (
    <main className="howa-surface relative overflow-x-hidden" style={{ background: PAPER, color: DARK }}>
      <SoftwareApplicationJsonLd url={`${env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/howa`} />
      <MetaViewContent contentId="howa_overview" contentName="HoWA overview" contentCategory="howa_marketing" />

      {/* ── Hero — two-part overlapping composition ─────────────── */}
      <section className="relative overflow-clip">
        <Container className="relative grid min-h-[646px] gap-12 lg:grid-cols-[520px_1fr] max-[899px]:grid-cols-1">
          {/* Copy */}
          <div className="relative z-[4] max-w-[520px] pt-[66px] max-[899px]:pt-8">
            <p className="mb-[34px] flex items-center gap-2.5 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-house-gold-dark/60" />
              <Image src="/brand/howa/howa-black.svg" alt="" width={90} height={33} className="h-[26px] w-auto" aria-hidden="true" />
              <span>Home Intelligence</span>
            </p>
            <h1 className="max-w-[520px] font-display leading-[0.96] tracking-[-0.025em] text-[clamp(48px,5.5vw,76px)]">
              Your House care.<br />Now connected.
            </h1>
            <p className="mt-[28px] max-w-[470px] font-sans text-[20px] leading-[1.45] text-house-brown/80">
              Meet HoWA. It brings your home&rsquo;s history, your household&rsquo;s
              priorities and the next useful action together.
            </p>
            <div className="mt-[30px]">
              <Link href="/howa/coming-soon" className="inline-flex h-[58px] min-w-[240px] items-center justify-center whitespace-nowrap px-8 font-sans text-[13px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown no-underline transition-[filter] hover:brightness-125">
                Meet your home
              </Link>
            </div>
            <Link href="/howa/house-customers" className="mt-[18px] inline-block font-sans text-[15px] text-house-brown underline decoration-house-gold-dark/40 underline-offset-4 hover:decoration-house-brown">
              Already a House customer? Connect your services →
            </Link>
            <p className="mt-[35px] max-w-[430px] font-sans text-[13px] leading-[1.5] text-house-brown/55">
              Start free. If you do not hold a regular service plan, your House
              services do not require a paid HoWA plan. Regular garden, cleaning
              and full property plans move to HoWA Steward.
            </p>
          </div>

          {/* House — rises into the header, no border/card */}
          <div className="pointer-events-none absolute right-[-20px] top-[-54px] hidden h-[680px] w-[760px] max-w-[62vw] items-end justify-center lg:flex">
            <Image
              src="/howa/new/dollhouse-full.webp"
              alt="The HoWA Doll's House: a cutaway model of a British home, room by room"
              width={1402}
              height={1122}
              priority
              className="h-full w-full object-contain object-bottom"
            />
          </div>
          {/* Product card — overlaps the lower-right of the composition */}
          <div className="absolute bottom-[34px] right-0 z-[6] hidden w-[440px] max-w-[46vw] bg-house-cream/95 px-5 py-4 shadow-[0_14px_40px_rgba(48,35,26,0.16)] backdrop-blur-sm lg:block">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-[20px] leading-none">HoWA</p>
                <p className="mt-1 font-sans text-[13px] text-house-brown/60">Your home is beginning to remember.</p>
              </div>
              <span className="shrink-0 font-sans text-[9px] tracking-[0.14em] uppercase text-house-brown/45">Product concept</span>
            </div>
            <div className="mt-3 flex items-center gap-6 border-t border-house-brown/10 pt-3 font-sans text-[13px] text-house-brown/80">
              <span>Home Record</span>
              <span>Household Memory</span>
            </div>
          </div>
          {/* Mobile house — shown whole (contain), never cropped (layout brief §14). */}
          <div className="relative mt-2 aspect-[5/4] w-full overflow-hidden lg:hidden">
            <Image src="/howa/new/dollhouse-full.webp" alt="The HoWA Doll's House" fill sizes="100vw" className="object-contain object-bottom" />
          </div>
        </Container>
      </section>

      {/* ── A home remembered. A household understood. ──────────── */}
      <section className="py-[42px] pb-[46px]">
        <Container>
          <div className="grid items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1fr_0.82fr]">
            <div>
              <div className="flex items-center gap-5">
                <span aria-hidden="true" className="h-px w-[34px] shrink-0 bg-house-gold-dark/70" />
                <h2 className="font-display text-[clamp(28px,3vw,38px)] leading-[1.1]">A home remembered. A household understood.</h2>
              </div>
              <div className="mt-8 flex flex-col divide-y divide-house-brown/12 border-y border-house-brown/12">
                {PRINCIPLES.map((p) => (
                  <div key={p.n} className="grid grid-cols-[52px_1fr] gap-2 py-5">
                    <span className="font-display text-[26px] leading-none text-house-gold-dark/70">{p.n}</span>
                    <div>
                      <h3 className="font-display text-[21px] leading-tight">{p.title}</h3>
                      <p className="mt-1.5 font-sans text-[16px] leading-[1.5] text-house-brown/75">{p.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Product proof: the home's record, kept in one place (shown whole, not cropped) */}
            <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: PAPER_WARM }}>
              <Image src="/howa/new/proof-home-record.webp" alt="The HoWA Doll's House beside a Home Record panel: correspondence, documents, bills, maintenance and reminders" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-contain" />
              <span className="absolute bottom-3 right-3 bg-house-cream/90 px-3 py-1 font-sans text-[10px] tracking-[0.14em] uppercase text-house-brown/60">Illustrative product</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── See the difference in one ordinary visit ────────────── */}
      <section className="py-[30px] pb-[32px]" style={{ background: PAPER_WARM }}>
        <Container>
          <div className="flex items-center gap-5">
            <span aria-hidden="true" className="h-px w-[34px] shrink-0 bg-house-gold-dark/70" />
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] leading-[1.1]">See the difference in one ordinary visit.</h2>
          </div>
          <div className="mt-[30px] grid gap-[44px] lg:grid-cols-[2fr_0.92fr]">
            {/* Left composite: image + Home Record, touching */}
            <div className="grid min-h-[192px] grid-cols-1 sm:grid-cols-[56%_44%]">
              <div className="relative min-h-[192px]">
                <Image src="/howa/sept/see-difference.webp" alt="The HoWA Your Garden view on a phone, resting on a hand-drawn garden plan with rosemary and secateurs" fill sizes="(max-width: 1024px) 100vw, 400px" className="object-cover" style={{ objectPosition: "60% 50%" }} />
                <span className="absolute bottom-3 left-3 bg-house-brown/70 px-2.5 py-1 font-sans text-[11px] tracking-[0.12em] uppercase text-house-cream">Your home</span>
              </div>
              <div className="bg-house-cream p-[30px]">
                <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-brown/45">Home Record · Demo home</p>
                <h3 className="mt-2 font-display text-[22px]">Garden visit notes</h3>
                <p className="mt-2 font-sans text-[15px] leading-[1.5] text-house-brown/75">Seasonal care recommendations added.</p>
                <p className="mt-3 font-sans text-[13px] italic text-house-brown/50">Source: professional visit summary</p>
              </div>
            </div>
            {/* Ask HoWA */}
            <div className="flex min-h-[192px] flex-col justify-center bg-house-cream p-[30px]">
              <p className="flex items-center gap-2 font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold-dark"><span aria-hidden="true">✦</span> Ask HoWA</p>
              <p className="mt-3 font-display text-[22px] leading-[1.2]">Would you like help preparing the next visit?</p>
              <Link href="/howa/ask" className="mt-4 inline-block font-sans text-[14px] text-house-gold-ink underline underline-offset-4 hover:text-house-brown">Review the brief →</Link>
            </div>
          </div>
          <div className="relative mt-[22px] flex items-baseline justify-center">
            <p className="text-center font-display text-[clamp(20px,2.2vw,28px)] text-house-brown/90">The professional&rsquo;s knowledge stays useful after the visit.</p>
            <span className="absolute right-0 font-sans text-[11px] tracking-[0.14em] uppercase text-house-brown/40 max-[899px]:hidden">Illustrative product experience</span>
          </div>
        </Container>
      </section>

      {/* ── The result: a calmer, better-kept home (benefit · lifestyle) ── */}
      <section className="py-[46px]">
        <Container className="grid items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-[54%_46%]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image src="/howa/new/life-piano.webp" alt="A grandmother and grandchild at the piano in a warm, well-kept living room" fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover" />
          </div>
          <div className="max-w-[46ch]">
            <p className="mb-4 flex items-center gap-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark"><span aria-hidden="true" className="h-px w-8 bg-house-gold-dark/60" />What it feels like</p>
            <h2 className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.04]">A calmer home, quietly kept in good order.</h2>
            <p className="mt-5 font-sans text-[17px] leading-[1.6] text-house-brown/80">When the home remembers, less is left to you. The right visit at the right time, the paperwork already in place, and more of your attention free for the life lived inside it.</p>
          </div>
        </Container>
      </section>

      {/* ── Explore with HoWA ───────────────────────────────────── */}
      <section className="pt-[48px]">
        <Container>
          <div className="max-w-[720px]">
            <p className="mb-4 flex items-center gap-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark"><span aria-hidden="true" className="h-px w-8 bg-house-gold-dark/60" />From an idea to a useful next step</p>
            <h2 className="max-w-[560px] font-display text-[clamp(32px,4vw,54px)] leading-[0.98]">Explore with HoWA. Bring it to life with the House.</h2>
            <p className="mt-5 max-w-[52ch] font-sans text-[17px] leading-[1.6] text-house-brown/80">Watch a scan become a design. HoWA reads your room or garden and resolves it into a first direction: dimensions, zones, a material palette, an indicative budget and a written brief. Keep the ideas you choose and take a clearer brief to a professional.</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/howa/design" className="inline-flex h-[52px] items-center justify-center whitespace-nowrap px-6 font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown no-underline transition-[filter] hover:brightness-125">Start a design idea</Link>
              <Link href="/design" className="font-sans text-[14px] text-house-gold-ink underline underline-offset-4 hover:text-house-brown">Explore House design →</Link>
            </div>
          </div>
          {/* Scan-to-design animation (AI Design · Powered by HoWA) */}
          <div className="mt-[38px]">
            <HowaScanReveal />
          </div>
          {/* Utility row */}
          <div className="mt-[28px] grid h-[76px] grid-cols-1 border border-house-brown/[0.16] sm:grid-cols-3">
            {STRIP.map((t, i) => (
              <Link key={t.label} href={t.href} className={`flex items-center justify-center gap-[18px] font-sans text-[15px] text-house-brown no-underline transition-colors hover:bg-[#f1ebe5] ${i > 0 ? "sm:border-l sm:border-house-brown/[0.16]" : ""}`}>
                <span aria-hidden="true" className="text-house-gold-dark">→</span>{t.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Dark: House brings the care. HoWA keeps the thread. ─── */}
      <section className="relative mt-[48px] overflow-hidden" style={{ background: DARK, color: "#fff" }}>
        <Image src="/photos/wa-flower-white.png" alt="" aria-hidden="true" width={210} height={260} className="pointer-events-none absolute bottom-[-30px] left-[-35px] w-[210px] opacity-[0.14]" />
        <Container className="relative z-10 grid min-h-[288px] items-center gap-10 lg:grid-cols-[44%_56%]">
          <div>
            <h2 className="max-w-[540px] font-display text-[clamp(30px,3.6vw,48px)] leading-[1.04]">House brings the care. HoWA keeps the thread.</h2>
            <Link href="/how-it-works" className="mt-6 inline-block font-sans text-[14px] text-house-cream underline decoration-house-gold-light/50 underline-offset-4 hover:decoration-house-cream">How the House works →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {THREAD.map((t, i) => (
              <div key={t.n} className={`min-h-[150px] px-8 py-6 ${i > 0 ? "sm:border-l sm:border-house-cream/15" : ""}`}>
                <p className="font-display text-[26px] text-house-gold-light">{t.n}</p>
                <h3 className="mt-2 font-display text-[20px] text-house-cream">{t.title}</h3>
                <p className="mt-1.5 font-sans text-[14px] leading-[1.5] text-house-cream/70">{t.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Start with the home you have. ───────────────────────── */}
      <section className="py-[42px] pb-[34px]">
        <Container className="grid items-center gap-10 lg:grid-cols-[58%_42%]">
          <div className="max-w-[48ch]">
            <h2 className="font-display text-[clamp(30px,4vw,50px)] leading-[1.04]">Start with the home you have.</h2>
            <p className="mt-5 font-sans text-[17px] leading-[1.6] text-house-brown/80">Explore HoWA, connect your House services and see what becomes useful.</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/howa/coming-soon" className="inline-flex h-[52px] items-center justify-center whitespace-nowrap px-6 font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown no-underline transition-[filter] hover:brightness-125">Meet your home</Link>
              <Link href="/contact" className="font-sans text-[14px] text-house-gold-ink underline underline-offset-4 hover:text-house-brown">Get help connecting →</Link>
            </div>
            <p className="mt-6 font-sans text-[13px] text-house-brown/55">Free to begin. Explore optional plans when you need more.</p>
          </div>
          <div className="w-full justify-self-end max-[899px]:justify-self-start">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image src="/howa/new/life-hallway.webp" alt="Someone home with their dog in a warm, well-kept hallway" fill sizes="(max-width: 1024px) 100vw, 460px" className="object-cover" />
            </div>
            <p className="mt-4 max-w-[22ch] font-display text-[clamp(18px,2vw,24px)] italic leading-[1.2] text-house-gold-ink">A more considered home lives longer.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
