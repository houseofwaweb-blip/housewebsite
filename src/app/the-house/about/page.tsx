import { EditorialPage, type EditorialSection } from "@/components/marketing/EditorialPage";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "About",
  description:
    "The small team who runs the House, and the partner studios who carry most of the work.",
};

// A real branded van beside the "Who we are" copy (which mentions electric
// vans) — portrait inline figure, not a full-bleed band.
const VAN_FIGURE = {
  src: "/services/photos/vans/asher-347.webp",
  alt: "A House of Willow Alexander electric van, liveried for garden and home care",
  caption: "Our electric vans, out across London and the South East.",
} as const;

const FALLBACK_SECTIONS: EditorialSection[] = [
  {
    heading: "Who we are",
    image: VAN_FIGURE,
    body: `House of Willow Alexander was founded by Samuel Collett and Alexander Oakley, from a belief that home and garden care could be more beautiful, more sustainable and more intelligently held.

What began with gardens, soil, seasons, craft and electric vans, has grown into a modern British House: part service standard, part design authority, part editorial world, part marketplace, and part technology system through HoWA.

The House exists to bring taste, trust, sustainability and intelligent memory into the everyday work of keeping a home. The people we send, the products we approve, the partners we recommend and the records we keep are held to the same test: would we trust this in a home we love? We work across the UK for design and Steward commissions; home and garden services operate across London and Kent.`,
  },
  {
    heading: "How design begins",
    body: `Design runs through a small circle, kept deliberately small. Our own garden studio, Willow Alexander Gardens, for gardens and outdoor spaces. Delve Interiors, a House Approved partner, for considered interiors. And HoWA's design intelligence, connecting the two back to your home record. We chose a small number on purpose, so we know the people who turn up at your door and the standard they bring through it.

Each works to a single understanding. House Approved is a standard, not a label. It is the same test we set ourselves: would we trust this in a home we love? We stay honest with each other, and with you, about what is working and what needs attention. If a partner stops meeting the standard, the seal comes off. That is the whole point of holding one.`,
  },
  {
    heading: "How to reach us",
    body: `The quickest way to reach us is the contact form. It routes by topic, so a question about a garden, a window, a warranty or a press enquiry lands in the right inbox rather than a general one. If you are thinking about a design, services or protection commission, start with the consultation form instead. That is where we take the few details we need to come back to you properly.

We reply within one working day. We would always rather hear from you than not, so write even if the question is half-formed. The House is built to be spoken to.`,
  },
];

export default async function AboutPage() {
  const sections = await getPageSections("the-house-about");
  const intro = sections.get("intro");
  const body = sections.get("body");
  const bodyCards = body?.cards;
  const editorialSections: EditorialSection[] =
    bodyCards && bodyCards.length
      ? bodyCards.map((c, i) => ({
          heading: c.title ?? FALLBACK_SECTIONS[i]?.heading,
          body: c.body ?? FALLBACK_SECTIONS[i]?.body ?? "",
          image: i === 0 ? VAN_FIGURE : undefined,
        }))
      : FALLBACK_SECTIONS;

  const headline = cms(intro, "headline", "A modern British House for the");
  const headlineEm = cms(intro, "headlineEm", "care, design and intelligence", "headline");
  const headlineTail = cms(intro, "subheadline", "of home.");

  return (
    <>
      <EditorialPage
      related="about"
        watermark="gold"
        eyebrow={cms(intro, "eyebrow", "The House · About")}
        title={
          <>
            {headline} <em>{headlineEm}</em> {headlineTail}
          </>
        }
        lede={cms(
          intro,
          "body",
          "We began with gardens, soil and seasons, and grew into a House that tends the whole of a home. Today that means the design that shapes a house, the care that keeps it, and the records that remember it.",
        )}
        sections={editorialSections}
      />
      {/* The "How to reach us" copy promises a contact form — here it is. */}
      <div id="reach-us" style={{ background: "var(--color-house-cream)" }}>
        <EnquiryForm
          sourcePage="/the-house/about"
          eyebrow="How to reach us"
          headline="Write to the House."
          body="A question about a garden, a window, a warranty or a press enquiry. Choose the topic and it lands in the right inbox. We reply within one working day."
        />
      </div>
    </>
  );
}
