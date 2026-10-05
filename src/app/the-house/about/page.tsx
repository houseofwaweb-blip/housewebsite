import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

export const metadata = {
  alternates: { canonical: "/the-house/about" },
  title: "About House of Willow Alexander",
  description:
    "Rooted in design. Devoted to home. Founded in 2019 by Samuel Collett and Alexander Oakley, House of Willow Alexander brings together the design that shapes a home, the care that keeps it, and the intelligence that remembers it.",
};

/**
 * /the-house/about — the "A House built around people" mockup layout (cream,
 * Didot, numbered gold eyebrows, B&W founders, 2019 marker, studio grid, HoWA,
 * peony closing), carrying the full approved About copy (final september
 * amendments / about us page.docx) broken across the sections so it flows.
 */

const SECTION = "px-[clamp(16px,5vw,80px)]";
const INNER = "mx-auto max-w-[1280px]";
const READ = "max-w-[64ch] font-sans text-[clamp(16px,1.25vw,18px)] leading-[1.75] text-house-stone";
const H2 = "font-display text-[clamp(30px,4vw,56px)] leading-[1.02] tracking-[-0.01em] text-house-ink";

function Eyebrow({ no, children }: { no?: string; children: React.ReactNode }) {
  return (
    <p className="font-sans text-[12px] tracking-[0.26em] uppercase text-house-gold-dark">
      {no ? <>{no} <span className="opacity-50">/</span> </> : null}
      {children}
    </p>
  );
}

function Src({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-house-gold-dark underline underline-offset-[3px] hover:text-house-brown">
      {children}
    </a>
  );
}

function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 120" fill="none" stroke="currentColor" strokeWidth="1.1" className={className} aria-hidden>
      <path d="M8 108 C 70 94, 150 66, 214 12" strokeLinecap="round" />
      {[[50, 96, 26, -30], [86, 83, 28, -32], [122, 68, 28, -32], [158, 50, 28, -34], [188, 32, 24, -36]].map(
        ([x, y, len, ang], i) => {
          const r = (ang * Math.PI) / 180;
          const ex = x + len * Math.cos(r);
          const ey = y + len * Math.sin(r);
          const mx = (x + ex) / 2 + 8 * Math.cos(r + Math.PI / 2);
          const my = (y + ey) / 2 + 8 * Math.sin(r + Math.PI / 2);
          return <path key={i} d={`M${x} ${y} Q ${mx} ${my} ${ex} ${ey} Q ${mx - 2} ${my - 6} ${x} ${y} Z`} />;
        },
      )}
    </svg>
  );
}

const FOUNDERS = [
  { src: "/the-house/about/founder-alexander.webp", name: "Alexander Oakley", role: "Founder & Director of Trade Services and Operations" },
  { src: "/the-house/about/founder-samuel.webp", name: "Samuel Collett", role: "Founder & Group CEO" },
];

const STUDIO = [
  { src: "/the-house/about/studio-design.webp", alt: "The House design team reviewing materials and mood boards in the studio", caption: "Design in conversation" },
  { src: "/the-house/about/studio-sam.webp", alt: "Samuel Collett at work in the Willow Alexander studio", caption: "Life in the studio" },
  { src: "/the-house/about/studio-howa.webp", alt: "Reviewing a HoWA design on screen in the Willow Alexander studio", caption: "Building home intelligence" },
  { src: "/the-house/about/studio-team.webp", alt: "The House team at work in the Willow Alexander studio", caption: "The people behind the House" },
];

export default function AboutPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* HERO -------------------------------------------------------------- */}
      <section className={SECTION} aria-label="Our story">
        <div className={`${INNER} grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12 pt-[clamp(28px,4vw,56px)]`}>
          <div className="flex flex-col justify-center py-4 lg:py-10">
            <Eyebrow>The House / Our story</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(44px,6vw,92px)] leading-[0.98] tracking-[-0.01em] text-house-ink text-balance">
              Rooted in design.<br />Devoted to home.
            </h1>
            <p className="mt-7 max-w-[46ch] font-sans text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-house-stone">
              We began with gardens, soil and seasons. Today, House of Willow Alexander brings together the
              design that shapes a home, the care that keeps it, and the intelligence that remembers it.
            </p>
            <p className="mt-6 font-sans text-[13px] tracking-[0.14em] uppercase text-house-stone">
              Founded 2019 by{" "}
              <span className="font-display normal-case italic text-[17px] tracking-normal text-house-ink">Samuel Collett &amp; Alexander Oakley</span>{" "}
              &middot; London, Kent &amp; UK-wide design
            </p>
            <Link href="#beginning" className="mt-8 inline-flex w-fit items-center gap-2 border-b border-house-gold-dark/50 pb-1 font-sans text-[12px] tracking-[0.22em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold-dark hover:text-house-gold-dark">
              Discover our story <span aria-hidden>↓</span>
            </Link>
          </div>
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
            <Image src="/the-house/about/founders-hero.webp" alt="Samuel Collett and Alexander Oakley, founders of House of Willow Alexander" fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-top" />
          </div>
        </div>
      </section>

      {/* THE FOUNDERS ------------------------------------------------------ */}
      <section className={`${SECTION} border-t border-house-brown/10 pt-[clamp(44px,6vw,80px)] pb-[clamp(28px,3vw,48px)]`}>
        <div className={INNER}>
          <Eyebrow>The founders</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>The people behind the House.</h2>
          <div className="mt-9 grid gap-8 sm:grid-cols-2 md:gap-12">
            {FOUNDERS.map((f) => (
              <figure key={f.name} className="flex items-center gap-5">
                <div className="relative aspect-[4/5] w-[128px] shrink-0 overflow-hidden bg-house-cream-dark sm:w-[150px]">
                  <Image src={f.src} alt={f.name} fill sizes="150px" className="object-cover object-top" />
                </div>
                <figcaption>
                  <p className="font-display text-[clamp(22px,2vw,28px)] leading-tight text-house-ink">{f.name}</p>
                  <p className="mt-1.5 font-sans text-[12px] tracking-[0.08em] uppercase text-house-gold-dark">{f.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — OUR BEGINNING ----------------------------------------------- */}
      <section id="beginning" className={`${SECTION} border-t border-house-brown/10 py-[clamp(40px,5vw,72px)]`}>
        <div className={INNER}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow no="01">Our beginning</Eyebrow>
              <h2 className={`mt-4 ${H2}`}>It began with a garden.</h2>
            </div>
            <div className="relative hidden items-end lg:flex">
              <span className="font-display text-[clamp(48px,5vw,88px)] leading-none text-house-gold-dark">2019</span>
              <Sprig className="pointer-events-none absolute -bottom-8 -right-2 w-[130px] text-house-gold-dark/35" />
            </div>
          </div>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-house-cream-dark">
            <Image src="/the-house/about/beginning-2019.webp" alt="Willow Alexander Gardens caretakers at a client's home" fill sizes="(min-width:1280px) 1280px, 100vw" className="object-cover" />
          </div>
          <div className="mt-8 space-y-5">
            <p className={READ}>
              Our story began in 2019, when Samuel Collett and Alexander Oakley established a garden design studio
              with a belief that beautiful spaces deserved an equally thoughtful way of being cared for. From planting,
              proportion and craftsmanship grew a broader ambition: to bring the same consideration to the whole of a
              home, and to the experience of the people living within it.
            </p>
            <p className={READ}>
              Samuel brought a perspective shaped beyond the garden gate. His career across high-end fashion, lifestyle
              and entertainment had taken him onto a global stage, working with some of the world&rsquo;s most
              recognisable names, including BBC Worldwide, Warner Bros., ITV, Mercedes and Fashion Rocks. That
              experience in brand communications, creativity and customer relationships informed the House from the
              beginning: not simply how it should look, but how it should make people feel, earn their trust and
              understand what matters to them.
            </p>
            <p className={READ}>
              Together, Samuel and Alexander set out to build a business in which a strong creative identity was matched
              by the work delivered in people&rsquo;s homes. Their entrepreneurial journey brought recognition at the{" "}
              <Src href="https://greatbritishentrepreneurawards.com/">Great British Entrepreneur Awards</Src> in both
              2024 and 2025, first in the Purpose Entrepreneur of the Year category and subsequently in Family Business
              of the Year. Samuel has also been named a{" "}
              <Src href="https://top100influentialpeople.com/">Top 100 Influential People</Src> honouree for two
              consecutive years, 2025 and 2026.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — INSIDE THE HOUSE -------------------------------------------- */}
      <section className={`${SECTION} border-t border-house-brown/10 py-[clamp(40px,5vw,72px)]`}>
        <div className={INNER}>
          <Eyebrow no="02">Inside the House</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Ideas become everyday care.</h2>
          <div className="mt-6 space-y-5">
            <p className={READ}>
              Garden design remains our creative foundation. Our studio, Willow Alexander Gardens, continues the work
              from which the wider House grew, with our garden design expertise represented in{" "}
              <Src href="https://www.houseandgarden.co.uk/the-list">House &amp; Garden&rsquo;s The List</Src>. The
              magazine has described House of Willow Alexander as &ldquo;an endlessly useful name to know&rdquo; for
              both designing beautiful gardens and maintaining them, a distinction that captures our interest in what
              happens long after a design is complete.
            </p>
            <p className={READ}>
              A garden is never truly finished. It matures, changes and asks for attention. The same is true of a home.
              As our work expanded into ongoing garden and home care, we became increasingly concerned with that
              continuity: ensuring that the thought invested in creating a place was carried through into looking after it.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {STUDIO.map((s) => (
              <figure key={s.src}>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width:640px) 46vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-2.5 font-sans text-[13px] tracking-[0.04em] text-house-stone">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — OUR STANDARD ------------------------------------------------- */}
      <section className={`${SECTION} border-t border-house-brown/10 py-[clamp(40px,5vw,72px)]`}>
        <div className={INNER}>
          <Eyebrow no="03">Our standard</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Care, carried through.</h2>
          <div className="mt-6 space-y-5">
            <p className={READ}>
              Environmental responsibility developed alongside that ambition, expressed through our electric vans and a
              more considered approach to the materials and methods we use. Our home and garden care has since received
              sustainability recognition from{" "}
              <Src href="https://www.sme-news.co.uk/">SME News&rsquo;s Southern Enterprise Awards</Src> and Acquisition
              International&rsquo;s Business Excellence Awards. For us, thoughtful design and responsible care belong in
              the same conversation.
            </p>
            <p className={READ}>
              Today, the House brings together our own services, design expertise and a growing House Approved network,
              giving carefully selected independent trade professionals and specialists an avenue to work under the House
              brand. Alongside our garden studio, partners such as Delve Interiors extend our design conversation indoors.
              The wider business has also been recognised as Consumer Services Business of the Year at the{" "}
              <Src href="https://www.global100awards.com/">Global 100 Awards 2026</Src>.
            </p>
            <p className={READ}>
              House Approved is how we extend our standards beyond our own team. It brings skilled people into a shared
              approach to workmanship, communication and care, while giving customers a more considered way to find the
              expertise they need.
            </p>
          </div>
          <blockquote className="mt-10 border-l-2 border-house-gold pl-7 font-display italic text-[clamp(24px,3vw,38px)] leading-[1.2] text-house-ink">
            The question behind every appointment and partnership remains the same: would we trust this in a home we love?
          </blockquote>
          <Link href="/the-house" className="mt-8 inline-flex w-fit items-center gap-2 border-b border-house-gold-dark/50 pb-1 font-sans text-[12px] tracking-[0.22em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold-dark hover:text-house-gold-dark">
            Explore the House <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* 04 — WHAT COMES NEXT (HoWA) -------------------------------------- */}
      <section className={`${SECTION} border-t border-house-brown/10 py-[clamp(40px,5vw,72px)]`}>
        <div className={INNER}>
          <Eyebrow no="04">What comes next</Eyebrow>
          <div className="mt-6 grid items-start gap-8 md:grid-cols-[auto_1px_1fr] md:gap-10">
            <span className="font-display text-[clamp(56px,7vw,110px)] leading-none text-house-gold-dark">HoWA</span>
            <span aria-hidden className="hidden h-full w-px bg-house-brown/15 md:block" />
            <div>
              <h2 className="font-display text-[clamp(26px,3vw,42px)] leading-[1.08] text-house-ink">Intelligence that stays with the home.</h2>
              <div className="mt-5 space-y-5">
                <p className={READ}>
                  Yet as the House grew, Samuel became increasingly interested in something less visible: the thread
                  connecting a customer, their home and the way their needs were understood and resolved.
                </p>
                <p className={READ}>
                  An enquiry was rarely just a request for a gardener, a designer or somebody to repair a fault. Behind
                  it were preferences, practical pressures, previous decisions and a particular way of living.
                  Understanding those things could make the difference between completing a task and genuinely helping
                  someone. But too often, that understanding was lost between conversations, visits and different
                  professionals.
                </p>
                <p className={READ}>
                  Samuel began to ask what might happen if it could be retained, and used to make the next decision
                  easier, the next recommendation more relevant and the next act of care better informed.
                </p>
                <p className={READ}>
                  It was this curiosity that led him to establish HoWA, bringing together a think tank of AI specialists
                  to explore a new way of looking after the home and garden. Together, they developed Home Orchestration
                  &amp; World Awareness: a Home Intelligence system designed around the relationship between a property,
                  the people living in it and the world around them.
                </p>
                <p className={READ}>
                  At its heart is an enduring Home Record for the property and a private Household Memory for its people.
                  One holds the history and knowledge of the home; the other understands the household&rsquo;s
                  preferences, routines and priorities. The intention is to connect that understanding with useful
                  guidance and action, so that caring for a home becomes less fragmented and more personal.
                </p>
                <p className={READ}>
                  Today, HoWA is integral to the House&rsquo;s evolving approach, with the House as its founding service
                  partner. It remains an independent technology business, built for national growth and with the ambition
                  to become a leading name in AI-powered Home Intelligence. Born from the practical experience of caring
                  for homes, it is being developed for a future that reaches far beyond our own services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING BAND ----------------------------------------------------- */}
      <section className={`${SECTION} relative overflow-hidden border-t border-house-brown/10 py-[clamp(48px,6vw,104px)]`}>
        <FlowerWatermark color="gold" side="right" opacity={0.16} />
        <div className={`${INNER} relative z-10`}>
          <div className="mb-10 max-w-[64ch] space-y-5">
            <p className={READ}>
              Our design commissions take us across the UK, while our home and garden services are centred on London and
              Kent. Whether we are shaping a landscape, introducing a trusted specialist or caring for a home week after
              week, the purpose remains consistent: to bring taste, trust and thoughtful attention to the places in which
              life happens.
            </p>
            <p className="max-w-[64ch] font-display italic text-[clamp(20px,2vw,26px)] leading-[1.4] text-house-ink">
              We began by designing gardens. We are building a House around everything it takes to make a home.
            </p>
          </div>
          <h2 className="max-w-[16ch] font-display text-[clamp(32px,4.6vw,64px)] leading-[1.0] text-house-ink">
            Start a conversation with the House.
          </h2>
          <p className="mt-4 max-w-[60ch] font-sans text-[16px] leading-[1.6] text-house-stone">
            To begin a commission, arrange ongoing care or explore working with the House, speak to our team. A finished
            brief is not required, just a question, an idea or a place you would like to make better.
          </p>
          <Link href="/contact" className="mt-8 inline-flex w-fit items-center gap-2 bg-house-ink px-7 py-4 font-sans text-[13px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-brown">
            Get in touch <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
