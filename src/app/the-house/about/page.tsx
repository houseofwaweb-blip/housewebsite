import Image from "next/image";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "About House of Willow Alexander",
  description:
    "Rooted in design. Devoted to home. Founded in 2019 by Samuel Collett and Alexander Oakley, House of Willow Alexander brings together the design that shapes a home, the care that keeps it, and the intelligence that remembers it.",
};

/**
 * /the-house/about — the full About Us story (final September brief §2).
 *
 * One flowing narrative in a readable text column. Label "About House of
 * Willow Alexander", headline "Rooted in design. Devoted to home." Copy is the
 * supplied story, verbatim (em dashes removed per the brand rule).
 *
 * IMAGERY: the founder portrait and supporting photographs below are
 * PLACEHOLDERS using existing House imagery. Replace `FOUNDER_PORTRAIT` and the
 * `FIGURES` with a real founder portrait and selected supporting photographs.
 *
 * RECOGNITION: press/recognition is kept as readable text. The brief asks for
 * links to the original sources; add them once the exact URLs are supplied
 * (House & Garden's The List, Great British Entrepreneur Awards, SME News,
 * Acquisition International, Global 100). We do not invent links.
 */

// PLACEHOLDER — replace with a recognisable founder portrait (Samuel & Alexander).
const FOUNDER_PORTRAIT = {
  src: "/lifestyle/period-portrait.webp",
  alt: "Placeholder portrait, to be replaced with a founder portrait",
  caption: "Samuel Collett and Alexander Oakley, founders of the House.",
  placeholder: true,
} as const;

// PLACEHOLDER supporting photographs.
const FIGURE_GARDEN = {
  src: "/design/gardens/hero.jpg",
  alt: "A garden designed and planted by Willow Alexander Gardens",
  caption: "Willow Alexander Gardens, the studio from which the House grew.",
  placeholder: true,
} as const;

const FIGURE_VAN = {
  src: "/services/photos/vans/asher-347.webp",
  alt: "A House of Willow Alexander electric van",
  caption: "Electric vans, out across London and the South East.",
  placeholder: true,
} as const;

// The supplied About story, as one flowing narrative. `lede` is the opening
// line; the rest render as a readable column. A couple of figures are placed
// mid-story by index.
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

// Figures placed AFTER these story paragraph indices (0-based).
const FIGURE_AFTER: Record<number, typeof FIGURE_GARDEN> = {
  3: FIGURE_GARDEN, // after the "garden design remains our foundation" paragraph
  5: FIGURE_VAN, // after the sustainability / electric vans paragraph
};

function Figure({
  fig,
}: {
  fig: { src: string; alt: string; caption: string; placeholder?: boolean };
}) {
  return (
    <figure className="my-10">
      <div className="relative aspect-[3/2] w-full overflow-hidden border border-house-line bg-house-cream-dark">
        <Image src={fig.src} alt={fig.alt} fill sizes="(min-width:768px) 68ch, 100vw" className="object-cover" />
      </div>
      <figcaption className="mt-3 font-sans text-[15px] italic leading-[1.5] text-house-stone">
        {fig.caption}
        {fig.placeholder ? (
          <span className="not-italic"> (placeholder imagery)</span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export default async function AboutPage() {
  const sections = await getPageSections("the-house-about");
  const intro = sections.get("intro");

  const eyebrow = cms(intro, "eyebrow", "About House of Willow Alexander");
  const headline = cms(intro, "headline", "Rooted in design.");
  const headlineTail = cms(intro, "subheadline", "Devoted to home.");
  const lede = cms(intro, "body", LEDE);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero — label + headline + lede */}
      <header className="px-[5vw] pt-[clamp(56px,9vh,120px)] pb-[clamp(28px,4vw,52px)]">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-ink">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(44px,6vw,92px)] font-normal leading-[0.98] tracking-[-0.02em] text-house-brown text-balance">
            {headline} <em className="italic text-house-gold-ink">{headlineTail}</em>
          </h1>
          <p className="mt-7 max-w-[62ch] font-sans text-[clamp(20px,1.7vw,25px)] leading-[1.55] text-house-brown/82">
            {lede}
          </p>
        </div>
      </header>

      {/* Founder portrait */}
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
            <figcaption className="mt-3 font-sans text-[15px] italic leading-[1.5] text-house-stone">
              {FOUNDER_PORTRAIT.caption}
              <span className="not-italic"> (placeholder portrait)</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Story — one flowing narrative in a readable column */}
      <article className="px-[5vw] py-[clamp(40px,6vw,80px)]">
        <div className="mx-auto max-w-[68ch]">
          {STORY.map((para, i) => (
            <div key={i}>
              <p className="mb-6 font-sans text-[19px] leading-[1.75] text-house-brown/88">
                {para}
              </p>
              {FIGURE_AFTER[i] ? <Figure fig={FIGURE_AFTER[i]} /> : null}
            </div>
          ))}
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
