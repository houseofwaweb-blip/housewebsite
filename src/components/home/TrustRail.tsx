/**
 * TrustRail — homepage trust strip (amendments §5), sitting directly under the
 * hero. Four concise proof points on a calm cream ground, in the House palette
 * (cream, ink, gold, controlled green — the mockup is layout only, colours come
 * from the brief). Small line icons, no badges.
 */

function Shield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function Calendar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="16" rx="1.5" /><path d="M3.5 9h17M8 3v4M16 3v4" />
    </svg>
  );
}
function Crown() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 18h16M4 18l-1.5-9 5 4 4.5-7 4.5 7 5-4L20 18" />
    </svg>
  );
}
function Leaf() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16z" /><path d="M4 20C9 15 13 11 18 8" />
    </svg>
  );
}

const ITEMS = [
  { icon: Shield, title: "Trusted professionals", copy: "Vetted, insured and rated." },
  { icon: Calendar, title: "Easy availability", copy: "Choose a time that works." },
  { icon: Crown, title: "Beautifully British", copy: "A higher standard for home." },
  { icon: Leaf, title: "Powered by HoWA", copy: "One home. Everything connected." },
];

export function TrustRail() {
  return (
    <section aria-label="Why the House" className="border-b border-house-line bg-house-cream">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-x-8 gap-y-6 px-[5vw] py-[clamp(24px,3vw,40px)] sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-house-gold-dark"><Icon /></span>
            <div>
              <p className="font-sans text-[13px] uppercase tracking-[0.16em] text-house-ink">{title}</p>
              <p className="mt-1 font-sans text-[14px] leading-[1.5] text-house-stone">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
