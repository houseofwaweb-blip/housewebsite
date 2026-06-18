import Image from "next/image";
import { V4HeroPhone } from "./V4HeroPhone";
import { V4AddressBar } from "./V4AddressBar";

/* STEP 01 — the live full-width hero, kept as-is structurally; only the copy
   changes to address-first and the right-hand card becomes the address
   portrait + provisional HoWA Score (no "0% Optimal"). (Brief v2, slides 6 & 26.) */
export function V4Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf5]">
      {/* ---------- Desktop — full-bleed wide plate (as on the live site) ---------- */}
      <div className="hidden lg:block relative w-full" style={{ aspectRatio: "1942 / 809" }}>
        <Image
          src="/home-v4/hero-house-sage-v2.webp"
          alt="A cutaway Georgian dollhouse, each room furnished and lit, centred on a sage-green ground with a fine gold filament tracing through it."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* sage wash on the left so the copy stays legible */}
        <div aria-hidden className="absolute inset-y-0 left-0 z-[1] w-[54%]" style={{ background: "linear-gradient(to right, rgba(221,224,205,0.98) 0%, rgba(221,224,205,0.82) 42%, rgba(221,224,205,0) 72%)" }} />
        <div className="absolute inset-0 flex items-center justify-between px-[clamp(28px,4vw,88px)]">
          <div className="relative z-10 w-[min(42%,540px)]">
            <HeroCopy />
          </div>
          <div className="relative z-10 hidden shrink-0 xl:block">
            <V4HeroPhone />
          </div>
        </div>
      </div>

      {/* ---------- Mobile — copy on a clean ground, then the house ---------- */}
      <div className="lg:hidden">
        <div className="px-6 pt-9 pb-6">
          <HeroCopy />
        </div>
        <div className="relative w-full aspect-[16/11] overflow-hidden">
          <Image src="/home-v4/hero-house-sage-v2.webp" alt="A cutaway Georgian dollhouse on a sage ground." fill priority sizes="100vw" className="object-cover object-center" />
        </div>
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <div className="max-w-[540px]">
      <p className="smallcaps mb-4 text-[13px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">The Home Operating System</p>
      <h1 className="font-display text-[clamp(40px,3.4vw,64px)] leading-[0.98] tracking-[-0.015em] text-[color:var(--color-ink)]">
        Your house is
        <br />
        trying to
      </h1>
      <p className="mt-2.5 font-italic-display text-[clamp(40px,3.4vw,64px)] leading-[0.98] text-[#c5a960]">tell you something.</p>
      <p className="mt-6 max-w-[420px] text-[17px] leading-[1.55] text-[color:var(--color-ink)]/85">
        Enter your address. In sixty seconds, HoWA builds the first portrait of your home, what it is, what matters, what can wait, and what to do next.
      </p>
      <div className="mt-7">
        <V4AddressBar />
      </div>
      <a href="#demo" className="mt-3 inline-flex items-center gap-1.5 text-[15px] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition-colors">
        See sample record <span aria-hidden>→</span>
      </a>
    </div>
  );
}

function PinGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-deep)" strokeWidth="1.6" aria-hidden className="shrink-0"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
