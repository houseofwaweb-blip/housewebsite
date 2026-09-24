import * as React from "react";
import Image from "next/image";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { getPageSections, cms } from "@/lib/cms/page-sections";
import { cn } from "@/lib/cn";

export const metadata = {
  title: "About House of Willow Alexander",
  description:
    "Rooted in design. Devoted to home. Founded in 2019 by Samuel Collett and Alexander Oakley, House of Willow Alexander brings together the design that shapes a home, the care that keeps it, and the intelligence that remembers it.",
};

/**
 * /the-house/about — the full About Us story, laid out as a magazine long-read
 * (final September brief §2; the House & Garden / Hearth editorial model).
 *
 * Uses the Hearth's editorial typography (hearth-serif/sans): a display
 * masthead, an italic standfirst, a byline/credit line, a lead image, a drop
 * cap, images floated to the side with text wrapping, and a pull-quote.
 *
 * IMAGERY: the founder portrait and side figures are PLACEHOLDERS using
 * existing House imagery. Replace `FOUNDER_PORTRAIT` and the `FIGURE_*` with a
 * real founder portrait and selected supporting photographs.
 *
 * RECOGNITION is kept as readable text; add source links (House & Garden's The
 * List, GBEA, SME News, Acquisition International, Global 100) once URLs are
 * supplied. We do not invent links.
 */

type Fig = { src: string; alt: string; caption: string; placeholder?: boolean };

// PLACEHOLDER — replace with a recognisable founder portrait (Samuel & Alexander).
const FOUNDER_PORTRAIT: Fig = {
  src: "/lifestyle/period-portrait.webp",
  alt: "Placeholder portrait, to be replaced with a founder portrait",
  caption: "Samuel Collett and Alexander Oakley, founders of the House.",
  placeholder: true,
};

// Real House editorial photography (the-house/editorial set) — reused here as
// imagery breaks through the story. Not placeholders.
const FIG_ROSES: Fig = {
  src: "/the-house/editorial/garden-doors-roses.webp",
  alt: "Roses framing a House garden door",
  caption: "Roses at a House garden door.",
};
const FIG_BLOOMS: Fig = {
  src: "/the-house/editorial/library-yellow-blooms.webp",
  alt: "Yellow blooms in a House library",
  caption: "Blooms, brought inside.",
};
const FIG_WISTERIA: Fig = {
  src: "/the-house/editorial/georgian-wisteria-garden.webp",
  alt: "Wisteria over a Georgian garden",
  caption: "Wisteria over a Georgian facade.",
};
const BAND_BLOSSOM: Fig = {
  src: "/the-house/editorial/tools-apple-blossom.webp",
  alt: "Garden tools among apple blossom",
  caption: "The craft behind the care.",
};
const BAND_RECORD: Fig = {
  src: "/the-house/editorial/record-book-peony.webp",
  alt: "A Home Record book beside a peony",
  caption: "The Home Record: a home’s history, kept in one place.",
};

const LEDE =
  "We began with gardens, soil and seasons. Today, House of Willow Alexander brings together the design that shapes a home, the care that keeps it, and the intelligence that remembers it.";

const STORY: string[] = [
  "Our story began in 2019, when Samuel Collett and Alexander Oakley established a garden design studio with a belief that beautiful spaces deserved an equally thoughtful way of being cared for. From planting, proportion and craftsmanship grew a broader ambition: to bring the same consideration to the whole of a home, and to the experience of the people living within it.",
  "Samuel brought a perspective shaped beyond the garden gate. His career across high-end fashion, lifestyle and entertainment had taken him onto a global stage, working with some of the world’s most recognisable names, including BBC Worldwide, Warner Bros., ITV, Mercedes and Fashion Rocks. That experience in brand communications, creativity and customer relationships informed the House from the beginning: not simply how it should look, but how it should make people feel, earn their trust and understand what matters to them.",
  "Together, Samuel and Alexander set out to build a business in which a strong creative identity was matched by the work delivered in people’s homes. Their entrepreneurial journey brought recognition at the Great British Entrepreneur Awards in both 2024 and 2025, first in the Purpose Entrepreneur of the Year category and subsequently in Family Business of the Year. Samuel has also been named a Top 100 Influential People honouree for two consecutive years, 2025 and 2026.",
  "Garden design remains our creative foundation. Our studio, Willow Alexander Gardens, continues the work from which the wider House grew, with our garden design expertise represented in House & Garden’s The List. The magazine has described House of Willow Alexander as “an endlessly useful name to know” for both designing beautiful gardens and maintaining them, a distinction that captures our interest in what happens long after a design is complete.",
  "A garden is never truly finished. It matures, changes and asks for attention. The same is true of a home. As our work expanded into ongoing garden and home care, we became increasingly concerned with that continuity: ensuring that the thought invested in creating a place was carried through into looking after it.",
  "Environmental responsibility developed alongside that ambition, expressed through our electric vans and a more considered approach to the materials and methods we use. Our home and garden care has since received sustainability recognition from SME News’s Southern Enterprise Awards and Acquisition International’s Business Excellence Awards. For us, thoughtful design and responsible care belong in the same conversation.",
  "Today, the House brings together our own services, design expertise and a growing House Approved network, giving carefully selected independent trade professionals and specialists an avenue to work under the House brand. Alongside our garden studio, partners such as Delve Interiors extend our design conversation indoors. The wider business has also been recognised as Consumer Services Business of the Year at the Global 100 Awards 2026.",
  "House Approved is how we extend our standards beyond our own team. It brings skilled people into a shared approach to workmanship, communication and care, while giving customers a more considered way to find the expertise they need. The question behind every appointment and partnership remains the same: would we trust this in a home we love?",
  "Yet as the House grew, Samuel became increasingly interested in something less visible: the thread connecting a customer, their home and the way their needs were understood and resolved.",
  "An enquiry was rarely just a request for a gardener, a designer or somebody to repair a fault. Behind it were preferences, practical pressures, previous decisions and a particular way of living. Understanding those things could make the difference between completing a task and genuinely helping someone. But too often, that understanding was lost between conversations, visits and different professionals.",
  "Samuel began to ask what might happen if it could be retained, and used to make the next decision easier, the next recommendation more relevant and the next act of care better informed.",
  "It was this curiosity that led him to establish HoWA, bringing together a think tank of AI specialists to explore a new way of looking after the home and garden. Together, they developed Home Orchestration & World Awareness: a Home Intelligence system designed around the relationship between a property, the people living in it and the world around them.",
  "At its heart is an enduring Home Record for the property and a private Household Memory for its people. One holds the history and knowledge of the home; the other understands the household’s preferences, routines and priorities. The intention is to connect that understanding with useful guidance and action, so that caring for a home becomes less fragmented and more personal.",
  "Today, HoWA is integral to the House’s evolving approach, with the House as its founding service partner. It remains an independent technology business, built for national growth and with the ambition to become a leading name in AI-powered Home Intelligence. Born from the practical experience of caring for homes, it is being developed for a future that reaches far beyond our own services.",
  "Our design commissions take us across the UK, while our home and garden services are centred on London and Kent. Whether we are shaping a landscape, introducing a trusted specialist or caring for a home week after week, the purpose remains consistent: to bring taste, trust and thoughtful attention to the places in which life happens.",
  "We began by designing gardens. We are building a House around everything it takes to make a home.",
  "To begin a commission, arrange ongoing care or explore working with the House, speak to our team through the contact or consultation form. A finished brief is not required, just a question, an idea or a place you would like to make better.",
];

// Figures floated beside the text, keyed by the story-paragraph index they
// sit before. Alternating sides for a magazine rhythm.
const FLOAT_BEFORE: Record<number, { fig: Fig; side: "left" | "right" }> = {
  3: { fig: FIG_ROSES, side: "right" },
  9: { fig: FIG_BLOOMS, side: "left" },
  15: { fig: FIG_WISTERIA, side: "right" },
};

// Full-width imagery breaks between story movements, keyed by the paragraph
// index they sit before.
const BAND_BEFORE: Record<number, Fig> = {
  5: BAND_BLOSSOM,
  12: BAND_RECORD,
};

// A pull-quote before this story-paragraph index (the House's recurring test).
const PULL_BEFORE = 8;
const PULL_QUOTE = "Would we trust this in a home we love?";

function FloatFigure({ fig, side }: { fig: Fig; side: "left" | "right" }) {
  return (
    <figure
      className={cn(
        "my-6 w-full md:my-2 md:w-[44%]",
        side === "right"
          ? "md:float-right md:ml-9 md:clear-right"
          : "md:float-left md:mr-9 md:clear-left",
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-house-line bg-house-cream-dark">
        <Image src={fig.src} alt={fig.alt} fill sizes="(min-width:768px) 360px, 100vw" className="object-cover" />
      </div>
      <figcaption className="mt-2.5 font-hearth-sans text-[13px] leading-[1.5] text-house-stone">
        {fig.caption}
        {fig.placeholder ? <span className="italic"> (placeholder)</span> : null}
      </figcaption>
    </figure>
  );
}

function Band({ fig }: { fig: Fig }) {
  return (
    <figure className="clear-both my-10 md:my-12">
      <div className="relative aspect-[16/9] w-full overflow-hidden border border-house-line bg-house-cream-dark">
        <Image src={fig.src} alt={fig.alt} fill sizes="(min-width:820px) 820px, 100vw" className="object-cover" />
      </div>
      <figcaption className="mt-2.5 font-hearth-sans text-[13px] leading-[1.5] text-house-stone">
        {fig.caption}
        {fig.placeholder ? <span className="italic"> (placeholder)</span> : null}
      </figcaption>
    </figure>
  );
}

export default async function AboutPage() {
  const sections = await getPageSections("the-house-about");
  const intro = sections.get("intro");

  const eyebrow = cms(intro, "eyebrow", "The House · About");
  const headline = cms(intro, "headline", "Rooted in design.");
  const headlineTail = cms(intro, "subheadline", "Devoted to home.");
  const lede = cms(intro, "body", LEDE);

  return (
    <div className="bg-house-cream text-house-black">
      {/* Masthead */}
      <header className="px-[5vw] pt-[clamp(48px,8vh,104px)] pb-[clamp(20px,3vw,36px)]">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-hearth-sans text-[14px] tracking-[0.28em] uppercase text-house-gold-ink">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-[14ch] font-hearth-serif font-medium text-[clamp(46px,7.4vw,108px)] leading-[0.96] tracking-[-0.015em] text-house-black text-balance">
            {headline} <em className="italic text-house-gold-ink">{headlineTail}</em>
          </h1>
          <p className="mt-7 max-w-[58ch] font-hearth-serif italic text-[clamp(20px,1.9vw,27px)] leading-[1.5] text-house-stone">
            {lede}
          </p>
          <p className="mt-6 font-hearth-sans text-[13px] tracking-[0.18em] uppercase text-house-stone">
            Founded 2019 by{" "}
            <em className="not-italic font-hearth-serif italic text-[17px] tracking-normal normal-case text-house-black">
              Samuel Collett &amp; Alexander Oakley
            </em>{" "}
            &middot; London, Kent &amp; UK-wide design
          </p>
        </div>
      </header>

      {/* Lead image */}
      <div className="px-[5vw]">
        <div className="mx-auto max-w-[1100px]">
          <figure>
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-house-line bg-house-cream-dark">
              <Image
                src={FOUNDER_PORTRAIT.src}
                alt={FOUNDER_PORTRAIT.alt}
                fill
                priority
                sizes="(min-width:1100px) 1100px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2.5 font-hearth-sans text-[13px] leading-[1.5] text-house-stone">
              {FOUNDER_PORTRAIT.caption}
              <span className="italic"> (placeholder portrait)</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Article — reading column with side figures, drop cap and a pull-quote */}
      <article className="px-[5vw] py-[clamp(40px,6vw,80px)]">
        <div className="mx-auto max-w-[820px]">
          {STORY.map((para, i) => (
            <React.Fragment key={i}>
              {BAND_BEFORE[i] ? <Band fig={BAND_BEFORE[i]} /> : null}
              {FLOAT_BEFORE[i] ? (
                <FloatFigure fig={FLOAT_BEFORE[i].fig} side={FLOAT_BEFORE[i].side} />
              ) : null}
              {PULL_BEFORE === i ? (
                <blockquote className="clear-both my-12 border-l-2 border-house-gold pl-7 font-hearth-serif italic text-[clamp(26px,3vw,40px)] leading-[1.2] text-house-black">
                  {PULL_QUOTE}
                </blockquote>
              ) : null}
              <p
                className={cn(
                  "mb-[22px] font-hearth-serif text-[clamp(19px,1.4vw,22px)] leading-[1.75] text-house-black/90",
                  i === 0 &&
                    "first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-hearth-serif first-letter:text-[68px] first-letter:leading-[0.7] first-letter:text-house-gold-ink md:first-letter:text-[92px]",
                )}
              >
                {para}
              </p>
            </React.Fragment>
          ))}
          <div className="clear-both" />
        </div>
      </article>

      {/* Contact — the story closes by inviting a note; here is the form. */}
      <div id="reach-us">
        <EnquiryForm
          sourcePage="/the-house/about"
          eyebrow="Speak to the House"
          headline="Start a conversation."
          body="To begin a commission, arrange ongoing care or explore working with the House, tell us a little about your home. A finished brief is not required. We reply within one working day."
        />
      </div>
    </div>
  );
}
