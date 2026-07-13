import Link from "next/link";
import Image from "next/image";

/**
 * /household/butler — The Butler member page (Final Master Directive).
 *
 * The staged connected-home member. Honesty is the product: demonstration →
 * recommendations → command, only with explicit permission, only for supported
 * systems, never implying universal device compatibility. Deeper control sits
 * inside The Steward. Copy from HOUSEHOLD-NEW-MEMBERS-COPY-HANDOVER.md.
 */

export const metadata = {
  title: "The Butler by HoWA | Read the instruments of the home",
  description:
    "The Butler learns to read the connected instruments of the home, explains them in plain language and, only with your explicit permission, helps operate supported systems. Released in stages.",
};

const STAGES = [
  { n: "01", t: "Demonstration", d: "The Butler shows how a connected home could be read and understood, using clear examples." },
  { n: "02", t: "Recommendations", d: "Where systems are connected and permitted, the Butler explains what the instruments are saying and what might be worth doing." },
  { n: "03", t: "Command", d: "Only with explicit, revocable permission, and only for supported systems, the Butler can help operate them. You stay in control." },
];

const READS = [
  "Energy, heating and water signals.",
  "Connected safety devices, where supported.",
  "Environmental readings such as temperature, humidity and damp risk.",
  "The maintenance rhythm those readings imply.",
];

const BOUNDARIES = [
  "Nothing is connected, read or operated without your explicit permission, and any permission can be withdrawn.",
  "The Butler works only with supported systems. It does not claim universal device compatibility.",
  "It does not replace a qualified electrician, engineer or a manufacturer's own safety controls.",
  "Life-safety systems remain the responsibility of the appropriate certified equipment and professional.",
];

const accent = "#8a8f7a";

const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-ink hover:text-house-gold-ink";

export default function ButlerPage() {
  return (
    <div className="howa-surface bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="relative grid lg:grid-cols-2 border-b border-house-brown/8">
        <div className="flex flex-col justify-center px-[5vw] py-16 lg:py-20 lg:pr-14">
          <p className="font-sans text-[12px] tracking-[0.2em] uppercase mb-5" style={{ color: accent }}>
            The Butler · Staged release
          </p>
          <h1 className="font-display text-[clamp(34px,4.4vw,60px)] leading-[1.06] tracking-[-0.01em] text-house-black max-w-[18ch]">
            The Butler reads the instruments of the home.
          </h1>
          <p className="font-display italic text-[clamp(18px,2vw,24px)] leading-[1.35] mt-6 max-w-[34ch]" style={{ color: accent }}>
            For the home whose systems should be understood before they are automated.
          </p>
          <p className="font-sans text-[17px] leading-[1.65] text-house-brown/80 mt-5 max-w-[52ch]">
            Meters, thermostats, sensors and connected systems each hold a small truth about the home. The Butler learns
            to read them, explains what they mean in plain language, and, only with your explicit permission, helps
            operate the systems that support it.
          </p>
          <p className="font-sans text-[15px] leading-[1.6] text-house-stone mt-5 max-w-[52ch]">
            The Butler is released in stages. It demonstrates first, then recommends, then, where you allow it, acts. It
            never implies that every device is supported.
          </p>
        </div>
        <div className="relative min-h-[46vh] lg:min-h-full bg-house-cream-dark">
          <Image src="/howa/household/butler.webp" alt="The Butler, a cutaway house of instruments, gauges and connected systems" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" priority />
        </div>
      </section>

      {/* The three stages */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.2em] uppercase mb-3" style={{ color: accent }}>The honest release</p>
        <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.12] text-house-black mb-10 max-w-[24ch]">
          Understood first. Automated only with permission.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {STAGES.map((s) => (
            <div key={s.n} className="border-t border-house-brown/15 pt-5">
              <p className="font-sans text-[12px] tracking-[0.14em] uppercase mb-2" style={{ color: accent }}>{s.n}</p>
              <h3 className="font-display text-[22px] leading-[1.15] text-house-black mb-2">{s.t}</h3>
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/75">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What it reads */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1100px] mx-auto grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.12] text-house-black mb-6">What the Butler reads.</h2>
            <ul className="grid gap-3">
              {READS.map((r) => (
                <li key={r} className="font-sans text-[16px] leading-[1.55] text-house-brown/82 pl-5 relative">
                  <span className="absolute left-0 text-house-gold-ink">—</span>{r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.12] text-house-black mb-6">Permission and boundaries.</h2>
            <ul className="grid gap-3.5">
              {BOUNDARIES.map((b) => (
                <li key={b} className="font-sans text-[15px] leading-[1.6] text-house-brown/78 pl-5 relative">
                  <span className="absolute left-0" style={{ color: accent }}>·</span>{b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Record + Steward */}
      <section className="px-[5vw] py-16 max-w-[900px] mx-auto text-center">
        <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.12] text-house-black mb-5">A connected home should have a memory.</h2>
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 max-w-[58ch] mx-auto mb-4">
          What the Butler reads and does can be saved to the Home Record: readings over time, permissions granted and the
          actions taken, so the connected home has a memory and an audit trail.
        </p>
        <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[58ch] mx-auto mb-8">
          Deeper connected-home control is part of the Steward. As the Steward&apos;s product depth grows, supported
          Butler control is included there.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/howa/steward" className={ctaSecondary}>Explore the Steward →</Link>
          <Link href="/household" className={ctaSecondary}>Meet the Household →</Link>
        </div>
      </section>

      {/* Close */}
      <section className="px-[5vw] py-14 bg-house-cream-dark border-t border-house-brown/8 text-center">
        <p className="font-display italic text-[clamp(20px,2.4vw,30px)] leading-[1.3] text-house-brown/85 max-w-[24ch] mx-auto">
          Understood first. Automated only with permission. Remembered either way.
        </p>
      </section>
    </div>
  );
}
