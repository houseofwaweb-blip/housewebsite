import Link from "next/link";
import Image from "next/image";

/**
 * Homepage HoWA section (brief §8), designed to the further-amendments mockup:
 * the phone-in-hand visual sits LEFT, the copy sits RIGHT with a row of four
 * icon points and a pull-quote. The House sells; HoWA quietly powers.
 *
 * Copy is from the brief (headline, body, the four points, the two CTAs); the
 * layout, icon row and pull-quote follow the mockup.
 *
 * Release state: transition (HOWA_APP_LIVE=false), so "Open My HoWA" routes to
 * /howa/coming-soon rather than a dead app link.
 */

type Point = { title: string; copy: string; icon: React.ReactNode };

const iconClass = "h-6 w-6 text-house-gold-dark";
const POINTS: Point[] = [
  {
    title: "Bookings",
    copy: "Services in one place.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}><rect x="3" y="4.5" width="18" height="16" rx="1" /><path d="M3 9h18M8 3v3M16 3v3" /></svg>
    ),
  },
  {
    title: "Home Record",
    copy: "A history that stays with the property.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}><path d="M4 10.5 12 4l8 6.5" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></svg>
    ),
  },
  {
    title: "Reminders",
    copy: "Know what needs attention.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
    ),
  },
  {
    title: "Ask HoWA",
    copy: "Ask about your home rather than starting from scratch.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}><path d="M4 5h16v11H8l-4 4V5Z" /><path d="M9 10h.01M12 10h.01M15 10h.01" /></svg>
    ),
  },
];

export function HowaHeroProduct() {
  return (
    <section aria-labelledby="howa-module-heading" className="howa-surface bg-[#e9ddcd]">
      <div className="mx-auto max-w-[1600px] px-[5vw] py-[clamp(48px,6vw,96px)]">
        <div className="grid items-stretch overflow-hidden border border-house-brown/15 bg-[#f6efe7] lg:grid-cols-[0.82fr_1.18fr]">
          {/* Visual — My HoWA in hand (LEFT, per mockup) */}
          <div className="relative min-h-[360px] overflow-hidden bg-[#d9a9a2] lg:min-h-0">
            <Image
              src="/home/howa-in-hand.webp"
              alt="My HoWA held in hand: a home's bookings, records and reminders in one place"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover object-center"
            />
          </div>

          {/* Copy (RIGHT) */}
          <div className="flex flex-col justify-center gap-6 p-[clamp(28px,4vw,64px)]">
            <p className="font-sans text-[13px] tracking-[0.24em] uppercase text-house-gold-dark">
              Powered by HoWA
            </p>

            <h2 id="howa-module-heading" className="font-display text-[clamp(34px,4.2vw,60px)] leading-[1.02] text-house-ink">
              Your home, <em className="italic">in hand.</em>
            </h2>

            <p className="max-w-[52ch] font-sans text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-house-brown/80">
              Every service you book through the House lives in HoWA, alongside
              your home&rsquo;s history, jobs, documents, preferences and what
              needs doing next.
            </p>

            <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
              {POINTS.map((p) => (
                <li key={p.title} className="flex flex-col gap-2">
                  <span aria-hidden>{p.icon}</span>
                  <p className="font-sans text-[14px] tracking-[0.08em] uppercase text-house-ink">{p.title}</p>
                  <p className="font-sans text-[14.5px] leading-[1.45] text-house-brown/75">{p.copy}</p>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                <Link href="/howa" className="booknow-button flex-1 whitespace-nowrap text-center font-sans text-[13px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-125">
                  Discover HoWA →
                </Link>
                <Link href="/howa/coming-soon" className="flex-1 whitespace-nowrap text-center font-sans text-[13px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/40 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-brown">
                  Open My HoWA →
                </Link>
              </div>
              <p className="hidden shrink-0 font-display text-[clamp(16px,1.3vw,20px)] italic leading-[1.3] text-house-gold-dark lg:block">
                Less to worry about.<br />More home to enjoy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
