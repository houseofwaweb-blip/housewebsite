/**
 * HouseStandardStrip — "the quiet bar" proof marker.
 *
 * Brings the Standards-page logic onto the commercial pages (Services,
 * Marketplace, Design) so the House standard is not isolated on one page
 * (Designer Handover Guide, slide 19). Self-styled with brand Tailwind utilities
 * so it drops onto any page regardless of its CSS-module styling.
 */
const POINTS = [
  "Vetted against real family use",
  "Care notes for use and repair",
  "No undisclosed commission",
];

export function HouseStandardStrip({ points = POINTS }: { points?: string[] }) {
  return (
    <section className="bg-house-cream-dark/50 border-y border-house-brown/10 px-[5vw] py-[clamp(48px,5vw,76px)]">
      <div className="max-w-[920px] mx-auto text-center">
        <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-dark mb-4">
          The quiet bar
        </p>
        <p className="font-display italic text-[clamp(21px,2.6vw,30px)] leading-[1.35] text-house-brown max-w-[34ch] mx-auto">
          One test sits behind everything we approve: would we trust this in a
          home we love?
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-3 list-none p-0 m-0">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2.5 font-sans text-[14px] tracking-[0.06em] text-house-brown/70"
            >
              <span aria-hidden className="is-round w-1 h-1 bg-house-gold inline-block" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
