import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { TheHouseNav } from "./TheHouseNav";

export const metadata = {
  title: "The House",
  description:
    "What House of Willow Alexander is: care, protection, design, commerce, HoWA, and Steward Plans. A modern British institution for the stewardship of homes.",
};

const SECTIONS = [
  {
    id: "care",
    numeral: "I",
    eyebrow: "Care",
    title: "Quiet, ongoing",
    titleEm: "care.",
    hook: "Gardening, cleaning, gutter work, window cleaning. The things that keep a home right, done to a standard.",
    body: "Steward Plans bring recurring care into one managed schedule. The House coordinates, the partners deliver, and your HoWA record tracks everything. No chasing. No forgetting.",
    link: "/services",
    linkLabel: "See Services →",
    imagePlaceholder: "Garden maintenance",
  },
  {
    id: "protect",
    numeral: "II",
    eyebrow: "Protect",
    title: "Protection that",
    titleEm: "understands.",
    hook: "Insurance, condition reviews, and the paper trail that proves the care was done.",
    body: "A Protect Review surveys the property. The evidence feeds your insurance introduction. House Approved underwriters who know the difference between a sash window and a uPVC frame. Everything filed, everything connected.",
    link: "/protect",
    linkLabel: "See Protect →",
    imagePlaceholder: "Period home details",
  },
  {
    id: "design",
    numeral: "III",
    eyebrow: "Design",
    title: "The design",
    titleEm: "studio.",
    hook: "Interiors, gardens, and the spaces between. House-vetted designers who understand period homes.",
    body: "We connect you with designers who have been through the House approval process. They understand listed buildings, conservation areas, and the kind of property that doesn't fit a template. Every project is filed to your HoWA record.",
    link: "/partners",
    linkLabel: "Explore design partners →",
    imagePlaceholder: "Interior design project",
  },
  {
    id: "shop",
    numeral: "IV",
    eyebrow: "Shop",
    title: "Objects worth",
    titleEm: "keeping.",
    hook: "A curated shop of tools, homewares, and garden pieces that carry the House Approved seal.",
    body: "Every object has been used, tested, and approved. Carbon steel secateurs from Sheffield. Copper watering cans from Kent. Linen from Ireland. Things built to last and worth looking after.",
    link: "/shop",
    linkLabel: "Browse the shop →",
    imagePlaceholder: "House Approved products",
  },
];

export default async function TheHousePage() {
  const nlBlock = await getNewsletterBlock("the-house");
  return (
    <article className="bg-house-cream text-house-brown">
      <TheHouseNav />

      {/* Hero */}
      <section className="px-[5vw] pt-[clamp(80px,12vh,140px)] pb-20 max-w-[880px] mx-auto" id="premise">
        <Eyebrow>The House</Eyebrow>
        <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
          A modern British <em>institution.</em>
        </h1>
        <p className="font-display italic text-[clamp(18px,2.5vw,24px)] leading-[1.45] text-house-stone max-w-[600px] mt-4 mb-5">
          We think homes deserve the same kind of quiet institution that schools, clubs, and estates have always had. Somewhere to belong. Somewhere to ask. Somewhere that remembers.
        </p>
        <p className="font-sans text-[16px] leading-[1.65] text-house-stone max-w-[540px]">
          House of Willow Alexander exists for the people who care about their homes enough to want them looked after properly. Not just maintained. Stewarded. That means design, care, protection, and the things worth keeping, all connected by one living record.
        </p>
      </section>

      {/* Sections: Care, Protect, Design, Shop */}
      {SECTIONS.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`px-[5vw] py-20 border-t border-house-brown/8 ${i % 2 === 0 ? "bg-house-cream" : "bg-house-white"}`}
        >
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute top-[-12px] left-[-6px] font-display font-normal text-[clamp(80px,10vw,130px)] leading-[0.85] text-house-brown/5 select-none"
              >
                {s.numeral}
              </span>
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <h2 className="em-accent font-display font-medium text-[clamp(28px,3.5vw,42px)] leading-[1.12] mt-2.5 mb-3">
                {s.title} <em>{s.titleEm}</em>
              </h2>
              <p className="font-display italic text-[18px] leading-[1.5] text-house-stone max-w-[460px] mb-4">
                {s.hook}
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-house-brown/80 max-w-[460px] mb-5">
                {s.body}
              </p>
              <GhostLink href={s.link}>{s.linkLabel}</GhostLink>
            </div>
            <div className="w-full aspect-[4/5] bg-house-cream-dark flex items-center justify-center font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone overflow-hidden">
              {s.imagePlaceholder}
            </div>
          </div>
        </section>
      ))}

      {/* Transition band */}
      <div
        className="relative text-center px-[5vw] py-[42px] border-t border-house-brown/10 border-b border-house-brown/8"
        style={{ background: "linear-gradient(180deg, var(--house-white) 0%, var(--house-cream) 100%)" }}
      >
        <span aria-hidden="true" className="block w-[120px] h-px mx-auto mb-[14px] bg-house-gold opacity-60" />
        <span aria-hidden="true" className="absolute top-[34px] left-1/2 -translate-x-1/2 font-display text-house-gold text-[18px] leading-none">·</span>
        <p className="font-sans italic text-[15px] text-house-stone tracking-[0.04em]">
          The House keeps the standard.
          <span className="not-italic font-sans text-[11px] tracking-[0.08em] uppercase text-howa-teal ml-2.5 pl-2.5 border-l border-house-brown/20">
            HoWA keeps the record
          </span>
        </p>
      </div>

      {/* HoWA — navy */}
      <section className="bg-howa-navy text-house-cream px-[5vw] py-[100px]" id="howa">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute top-[-12px] left-[-6px] font-display font-normal text-[clamp(80px,10vw,130px)] leading-[0.85] text-house-cream/[0.04] select-none"
            >
              V
            </span>
            <span className="block font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold-light mb-2.5">
              HoWA
            </span>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,3.5vw,42px)] leading-[1.12] mb-3">
              The living <em>record.</em>
            </h2>
            <p className="font-display italic text-[18px] leading-[1.5] text-house-cream/60 max-w-[460px] mb-4">
              HoWA is how the House remembers. Every service, every review, every care visit, every purchase. One record that grows with the home.
            </p>
            <p className="font-sans text-[15px] leading-[1.65] text-house-cream/50 max-w-[460px] mb-5">
              Start with the Companion diagnostic. It maps your home's condition, surfaces what needs doing, and files everything to a record that stays with the property. Not a dashboard. A memory.
            </p>
            <Link
              href="/howa"
              className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold-light no-underline border-b border-house-gold-light pb-0.5 hover:border-dotted transition-all duration-[var(--t-slow)]"
            >
              Start HoWA →
            </Link>
          </div>
          <div className="w-full aspect-[4/5] bg-house-cream/[0.06] flex items-center justify-center font-sans text-[11px] tracking-[0.14em] uppercase text-house-cream/20 overflow-hidden">
            HoWA interface
          </div>
        </div>
      </section>

      {/* Steward */}
      <section className="bg-house-cream px-[5vw] py-20 border-t border-house-brown/8" id="steward">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute top-[-12px] left-[-6px] font-display font-normal text-[clamp(80px,10vw,130px)] leading-[0.85] text-house-brown/5 select-none"
            >
              VI
            </span>
            <Eyebrow>Steward</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,3.5vw,42px)] leading-[1.12] mt-2.5 mb-3">
              Care, on a <em>rhythm.</em>
            </h2>
            <p className="font-display italic text-[18px] leading-[1.5] text-house-stone max-w-[460px] mb-4">
              Bundle your home's services into a single managed plan. The House coordinates, you don't think about it.
            </p>
            <p className="font-sans text-[15px] leading-[1.65] text-house-brown/80 max-w-[460px] mb-5">
              Steward Plans combine gardening, cleaning, windows, and gutters into one monthly schedule. A named team, a single invoice, every visit logged to your HoWA record. The home gets better every season. Available to House Steward members.
            </p>
            <GhostLink href="/steward-plans">See Steward Plans →</GhostLink>
          </div>
          <div className="w-full aspect-[4/5] bg-house-cream-dark flex items-center justify-center font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone overflow-hidden">
            Steward Plans
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-house-cream px-[5vw] py-20 text-center border-t border-house-brown/8">
        <p className="mx-auto max-w-[600px] mb-7 font-display italic text-[22px] leading-[1.35] text-house-brown">
          A well-kept home isn&apos;t a pile of bookings. It&apos;s a rhythm someone else remembers.
        </p>
        <Link
          href="/howa"
          className="inline-block px-10 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Start HoWA
        </Link>
      </section>

      {/* Newsletter */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "dark"}
        sourcePage="/the-house"
        headline={nlBlock?.headline ?? "Letters from the House."}
        body={nlBlock?.body ?? "A weekly note from The Hearth: seasonal reflections on homes, gardens, and the quiet art of looking after a place properly."}
        {...(nlBlock ?? {})}
      />

      {/* Tagline */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-brown/50 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}
