import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";

export const metadata = {
  title: "The House",
  description:
    "Philosophy, standards, proof, sustainability, and the people behind House of Willow Alexander.",
};

const SECTIONS = [
  {
    slug: "philosophy",
    eyebrow: "01 · Philosophy",
    title: "The founding idea",
    blurb: "What a house is actually for, and what the institution behind it exists to protect.",
  },
  {
    slug: "standards",
    eyebrow: "02 · Standards",
    title: "How we work",
    blurb: "The quality bar, the review cadence, and the way the House places its approval.",
  },
  {
    slug: "proof",
    eyebrow: "03 · Proof",
    title: "Press, awards, testimony",
    blurb: "The places we've been written about, the people we've worked with, what they've said.",
  },
  {
    slug: "sustainability",
    eyebrow: "04 · Sustainability",
    title: "Our commitments",
    blurb: "What we measure, what we refuse to do, and where we want to get to.",
  },
  {
    slug: "about",
    eyebrow: "05 · About",
    title: "The people",
    blurb: "The small team that runs the House and the studios who partner with it.",
  },
];

export default function TheHousePage() {
  return (
    <article className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-[12vh] pb-12">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>The House</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            A modern British <em>institution</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[62ch]">
            We think homes deserve the same kind of quiet institution that
            schools, clubs, and estates have always had. Somewhere to belong.
            Somewhere to ask. Somewhere that remembers what was done and why.
          </p>
          <p className="font-sans italic text-[17px] leading-[1.55] text-house-stone mt-5">
            Ownership is passive. Stewardship is intentional.
          </p>
        </div>
      </section>

      <section className="px-[5vw] py-14">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-6">
          {SECTIONS.map((s) => (
            <Link
              key={s.slug}
              href={`/the-house/${s.slug}`}
              className="group relative block bg-white border border-house-brown/10 p-8 no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(48,35,28,0.1)] hover:border-house-gold"
            >
              <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-2">
                {s.eyebrow}
              </div>
              <h3 className="font-display font-medium text-[26px] leading-[1.2] text-house-brown mb-2 pb-3 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-house-gold after:w-[28px] after:transition-[width] after:duration-[var(--t-slow)] after:ease-out group-hover:after:w-[72px]">
                {s.title}
              </h3>
              <p className="font-sans italic text-[15px] leading-[1.6] text-house-stone">
                {s.blurb}
              </p>
              <div className="mt-4 font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold">
                Read →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
