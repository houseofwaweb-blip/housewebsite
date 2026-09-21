import Image from "next/image";
import Link from "next/link";

/**
 * InsuranceBand — homepage Insurance section (brief §11), designed to the
 * further-amendments mockup: a specialist home image LEFT, the heading + copy +
 * CTA + a row of icon points in the CENTRE, and a green "safer home, brighter
 * tomorrow" accent card RIGHT. The broker/regulatory disclosure sits
 * immediately below (brief requirement). Copy from the brief.
 */
const iconClass = "h-6 w-6 text-house-gold-dark";
const POINTS = [
  {
    title: "Buildings & contents",
    copy: "Cover shaped around the home you actually live in.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}><path d="M4 10.5 12 4l8 6.5" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></svg>,
  },
  {
    title: "Home-specific information",
    copy: "HoWA helps avoid answering the same questions again.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8h.01" /></svg>,
  },
  {
    title: "Human support",
    copy: "Real people when you need them, and a clear claims route.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>,
  },
];

export function InsuranceBand() {
  return (
    <section aria-label="Home insurance" className="bg-house-cream py-[clamp(48px,6vw,96px)]">
      <div className="mx-auto max-w-[1760px] px-[clamp(16px,3vw,40px)]">
        <div className="grid items-stretch gap-4 lg:grid-cols-[0.85fr_1.6fr_0.55fr]">
          {/* Left — specialist home image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[420px]">
            <Image src="/insurance/listed.webp" alt="A handsome listed British home, protected with cover shaped around it" fill sizes="(min-width:1024px) 28vw, 100vw" className="object-cover" />
          </div>

          {/* Centre — copy + icon points */}
          <div className="flex flex-col justify-center px-[clamp(4px,1.5vw,32px)] py-4">
            <h2 className="font-display text-[clamp(30px,3vw,50px)] leading-[1.03] text-house-ink">
              Home insurance, but better understood.
            </h2>
            <p className="mt-4 max-w-[52ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-house-brown/80">
              Your home isn&rsquo;t generic. Its cover shouldn&rsquo;t feel generic either.
            </p>
            <Link href="/insurance" className="mt-6 inline-flex h-12 w-fit items-center justify-center whitespace-nowrap border border-house-gold-ink bg-house-gold-ink px-7 font-sans text-[13px] uppercase tracking-[0.16em] text-house-ink no-underline transition-[filter] hover:brightness-105">
              Explore home insurance →
            </Link>
            <ul className="mt-8 grid gap-6 border-t border-house-brown/12 pt-7 sm:grid-cols-3">
              {POINTS.map((p) => (
                <li key={p.title} className="flex flex-col gap-2">
                  <span aria-hidden>{p.icon}</span>
                  <p className="font-sans text-[13.5px] tracking-[0.08em] uppercase text-house-ink">{p.title}</p>
                  <p className="font-sans text-[14.5px] leading-[1.45] text-house-brown/75">{p.copy}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — green accent card */}
          <div className="relative flex flex-col justify-between bg-house-forest p-6 text-house-cream">
            <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 text-house-gold-light" fill="currentColor"><path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12Zm0 3c2.5 2.8 4 5.8 4 9a4 4 0 0 1-8 0c0-3.2 1.5-6.2 4-9Z"/></svg>
            <p className="mt-6 font-sans text-[13px] uppercase tracking-[0.2em] leading-[1.8] text-house-cream">
              A safer home,<br />brighter tomorrow.
            </p>
          </div>
        </div>

        {/* Regulatory disclosure — immediately below (brief) */}
        <p className="mt-7 max-w-[80ch] font-sans text-[12.5px] leading-[1.6] text-house-stone">
          House of Willow Alexander acts as an introducer for insurance, arranged by Provenance, which is authorised and regulated by the Financial Conduct Authority. Full details are provided before any purchase.
        </p>
      </div>
    </section>
  );
}
