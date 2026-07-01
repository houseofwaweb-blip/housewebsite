import Image from "next/image";
import { HomeHealthGauge } from "./HomeHealthGauge";

/* ──────────────────────────────────────────────────────────────────────
   /howa hero — the finalised askhowa.co.uk hero (handover 2026-06-16).

   A full-bleed sage cutaway-dollhouse plate with the copy overlaid far-left
   and a live HTML dashboard phone far-right (Home Health gauge, Living Record,
   Next Best Action). Desktop = three-zone overlay; mobile = copy over a sage
   scrim on the taller portrait plate.

   Adapted for the House site: image paths .png → .webp (staged in
   public/home-v4/), section id "product" to match the /howa subbar nav,
   waitlist CTA → /howa/coming-soon, secondary → /howa/how-it-works.
   ────────────────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section id="product" className="relative bg-[#f4f1e9] overflow-hidden">
      {/* ---------- Desktop — full-bleed wide plate ---------- */}
      <div className="hidden lg:block relative w-full" style={{ aspectRatio: "1942 / 809" }}>
        <Image
          src="/home-v4/hero-house-sage-v2.webp"
          alt="A cutaway Georgian dollhouse, each room furnished and lit, centred on a sage-green ground with a fine gold filament tracing through it."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* soft sage wash on the left edge, so the copy stays legible where it
           meets the house */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-[50%] z-[1]" style={{ background: "linear-gradient(to right, rgba(221,224,205,0.97) 0%, rgba(221,224,205,0.74) 44%, rgba(221,224,205,0) 68%)" }} />

        {/* Copy far-left, phone far-right, house clear in the centre */}
        <div className="absolute inset-0 flex items-center justify-between px-[clamp(28px,4vw,88px)]">
          <div className="w-[min(34%,560px)] relative z-10">
            <HeroCopy />
          </div>
          <div className="relative z-10 shrink-0">
            <HeroPhone />
          </div>
        </div>
      </div>

      {/* ---------- Mobile — copy overlaid on the house image ---------- */}
      <div className="lg:hidden">
        {/* Short crop (object-top) so the house shows and the next section peeks */}
        <div className="relative w-full" style={{ aspectRatio: "39 / 56" }}>
          <Image
            src="/home-v4/hero-house-sage-mobile.webp"
            alt="A cutaway Georgian dollhouse, each room furnished and lit, centred on a sage-green ground."
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* sage scrim at the top so the copy reads over the image */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-[72%]" style={{ background: "linear-gradient(to bottom, rgba(221,224,205,0.98) 0%, rgba(221,224,205,0.9) 56%, rgba(221,224,205,0.55) 80%, rgba(221,224,205,0) 100%)" }} />
          <div className="absolute inset-x-0 top-0 px-6 pt-9">
            <HeroCopy />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COPY
   ============================================================ */
function HeroCopy() {
  return (
    <div className="max-w-[540px]">
      <p className="smallcaps text-[14px] tracking-[0.2em] text-[color:var(--color-gold-deep)] mb-4">
        The Home Intelligence OS
      </p>
      <h1 className="font-display text-[clamp(42px,3.4vw,68px)] leading-[0.98] tracking-[-0.015em] text-[color:var(--color-ink)]">
        Your house is
        <br />
        trying to
      </h1>
      <p className="font-italic-display text-[clamp(42px,3.4vw,68px)] leading-[0.98] text-[#c5a960] mt-2.5">
        tell you something.
      </p>
      <div className="flex items-center gap-3 my-6" aria-hidden>
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[color:var(--color-gold)]/55" />
        <LeafSprig />
      </div>
      <p className="text-[18px] leading-[1.55] text-[color:var(--color-ink)]/85 max-w-[400px]">
        HoWA gives your home a memory, so you always know what matters,
        what can wait, and what to do next.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href="/howa/coming-soon"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[color:var(--color-howa-green)] text-[17px] text-white shadow-[0_4px_14px_-6px_rgba(31,58,43,0.45)] hover:bg-[color:var(--color-howa-green-deep)] transition-colors"
        >
          Join the waitlist <span aria-hidden>&rarr;</span>
        </a>
        <a
          href="/howa/how-it-works"
          className="inline-flex items-center gap-1.5 text-[16px] transition-colors rounded-md border border-[color:var(--color-ink)]/30 bg-[#f3ede0]/80 px-5 py-3 backdrop-blur-[2px] text-[color:var(--color-ink)] hover:bg-[#f3ede0] lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none lg:text-[color:var(--color-ink-soft)] lg:hover:bg-transparent lg:hover:text-[color:var(--color-ink)]"
        >
          See how it works <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </div>
  );
}

/* ============================================================
   CARDS — all HTML/SVG (+ two small sketch images)
   ============================================================ */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#f6f2ea] border border-[#1d2a40]/[0.05] shadow-[0_8px_22px_-16px_rgba(40,30,15,0.35)] px-5 py-4">
      {children}
    </div>
  );
}

function HomeHealthCard() {
  return (
    <Card>
      <p className="smallcaps text-[12px] tracking-[0.18em] text-[color:var(--color-ink)] flex items-center gap-1.5">
        <ShieldGlyph /> Home Health
      </p>
      <p className="text-[14px] text-[color:var(--color-ink-soft)]/75 mt-1 mb-3.5">All systems normal</p>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col items-center shrink-0">
          <HomeHealthGauge value={91} size={68} />
          <span className="smallcaps text-[12px] tracking-[0.16em] text-[color:var(--color-gold-deep)] mt-1.5">Optimal</span>
        </div>
        <div className="relative h-[78px] flex-1 max-w-[200px]">
          <Image src="/home-v4/card-graph.webp" alt="" fill sizes="200px" className="object-contain object-right" />
        </div>
      </div>
    </Card>
  );
}

function LivingRecordCard() {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="smallcaps text-[12px] tracking-[0.18em] text-[color:var(--color-ink)] flex items-center gap-1.5">
            <LeafGlyph /> Living Record
          </p>
          <p className="text-[14px] text-[color:var(--color-ink-soft)]/75 mt-1">Updated today</p>
          <p className="text-[14px] text-[color:var(--color-ink-soft)]/75">08:42</p>
          <a href="#how" className="inline-flex items-center gap-1 text-[14px] text-[color:var(--color-gold-deep)] mt-3">
            View record <span aria-hidden>→</span>
          </a>
        </div>
        <div className="relative w-[124px] h-[104px] shrink-0 opacity-90">
          <Image src="/home-v4/card-house-sketch-v3.webp" alt="" fill sizes="124px" className="object-contain" />
        </div>
      </div>
    </Card>
  );
}

function NextActionCard() {
  const items = ["Service boiler", "Clean gutters", "Garden care"];
  return (
    <Card>
      <p className="smallcaps text-[12px] tracking-[0.18em] text-[color:var(--color-ink)] flex items-center gap-1.5 mb-2">
        <ClipboardGlyph /> Next Best Action
      </p>
      <p className="text-[14px] text-[color:var(--color-ink)]">3 tasks scheduled</p>
      <p className="text-[14px] text-[color:var(--color-ink-soft)]/70 mb-3">All systems on track</p>
      <ul className="space-y-1.5 mb-3">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-2 text-[14px] text-[color:var(--color-ink-soft)]">
            <CheckGlyph /> {t}
          </li>
        ))}
      </ul>
      <a href="#how" className="inline-flex items-center gap-1 text-[14px] text-[color:var(--color-gold-deep)]">
        View plan <span aria-hidden>→</span>
      </a>
    </Card>
  );
}

/* ============================================================
   HERO PHONE — the dashboard cards, on a full-size phone
   ============================================================ */
function HeroPhone() {
  return (
    <div className="mx-auto w-[clamp(300px,23vw,360px)]">
      <div className="rounded-[48px] bg-gradient-to-b from-[#26262a] via-[#141416] to-[#08080a] p-[14px] shadow-[0_50px_100px_-30px_rgba(20,15,5,0.66)] ring-1 ring-black/40">
        <div className="relative overflow-hidden rounded-[38px] bg-[#ece6d8] ring-1 ring-black/20">
          <div className="absolute left-1/2 top-[13px] z-30 h-[27px] w-[110px] -translate-x-1/2 rounded-[14px] bg-black shadow-[inset_0_-1px_2px_rgba(255,255,255,0.08)]" />

          {/* header */}
          <div className="flex items-center justify-between px-5 pt-[50px] pb-3">
            <div>
              <p className="font-display text-[17px] leading-none text-[#1d2a40]">HoWA</p>
              <p className="mt-1 text-[12px] text-[#1d2a40]/55">Home Overview</p>
            </div>
            <span className="flex flex-col gap-[3px]" aria-hidden>
              <span className="block h-px w-[18px] bg-[#1d2a40]/45" />
              <span className="block h-px w-[18px] bg-[#1d2a40]/45" />
              <span className="block h-px w-[18px] bg-[#1d2a40]/45" />
            </span>
          </div>

          {/* the dashboard cards, as the app feed */}
          <div className="space-y-3 px-4 pb-3">
            <HomeHealthCard />
            <LivingRecordCard />
            <NextActionCard />
          </div>

          {/* tab bar */}
          <div className="flex items-center justify-around border-t border-[#1d2a40]/10 bg-[#ece6d8] py-3">
            {["Home", "Timeline", "Record", "Profile"].map((t, i) => (
              <span key={t} className={"text-[12px] tracking-[0.04em] " + (i === 0 ? "font-semibold text-[color:var(--color-howa-green)]" : "text-[#1d2a40]/45")}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SVG bits ── */
const glyph = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function ShieldGlyph() { return <svg width="13" height="13" viewBox="0 0 24 24" {...glyph} className="text-[color:var(--color-gold-deep)]" aria-hidden><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /></svg>; }
function LeafGlyph() { return <svg width="13" height="13" viewBox="0 0 24 24" {...glyph} className="text-[color:var(--color-gold-deep)]" aria-hidden><path d="M5 19c0-7 6-13 14-13 0 8-6 14-14 13z" /><path d="M5 19c4-4 7-6 11-7" /></svg>; }
function ClipboardGlyph() { return <svg width="13" height="13" viewBox="0 0 24 24" {...glyph} className="text-[color:var(--color-gold-deep)]" aria-hidden><rect x="5" y="5" width="14" height="16" rx="2" /><path d="M9 5V3h6v2M9 11h6M9 15h4" /></svg>; }
function CheckGlyph() { return <svg width="13" height="13" viewBox="0 0 24 24" {...glyph} className="text-[color:var(--color-howa-green)]" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>; }
function LeafSprig() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-gold-deep)" aria-hidden><path d="M12 21V9" stroke="var(--color-gold-deep)" strokeWidth="1" /><path d="M12 13c-1.6-.2-3-1.2-3.6-2.8C9.9 9.4 11.3 10 12 11.4 12.7 10 14.1 9.4 15.6 10.2 15 11.8 13.6 12.8 12 13z" /></svg>; }
