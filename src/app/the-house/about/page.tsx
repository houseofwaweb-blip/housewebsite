import { EditorialPage, type EditorialSection } from "@/components/marketing/EditorialPage";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "About",
  description:
    "The small team who runs the House, and the partner studios who carry most of the work.",
};

const FALLBACK_SECTIONS: EditorialSection[] = [
  {
    heading: "Who we are",
    body: `House of Willow Alexander was founded by Samuel Collett and Alexander Oakley, from a belief that home and garden care could be more beautiful, more sustainable and more intelligently held.

What began with gardens, soil, seasons, craft and electric vans, has grown into a modern British House: part service standard, part design authority, part editorial world, part marketplace, and part technology system through HoWA.

The House exists to bring taste, trust, sustainability and intelligent memory into the everyday work of keeping a home. The people we send, the products we approve, the partners we recommend and the records we keep are held to the same test: would we trust this in a home we love? We work across the UK for design and Steward commissions; services operate in defined postcode areas you'll find on each service's page.`,
  },
  {
    heading: "The partner studios",
    body: `Most of the design work runs through four launch partner studios: Delve Interiors, Jessica Durling-McMahon, Willow Alexander Gardens, and House AI.

Each has been signed up on the understanding that House Approved is a standard, not a label. They review annually, we review them annually, and we're honest with both each other and with you about what's working.`,
  },
  {
    heading: "How to reach us",
    body: `You can write to us through the contact form, which routes by topic to the right inbox. For design, services, or protection commissions, the consultation form is the right place to start — we reply within one working day. Press and partnership enquiries arrive quickly, too.

We'd rather hear from you than not. The House is built to be spoken to.`,
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
        }))
      : FALLBACK_SECTIONS;

  const headline = cms(intro, "headline", "A modern British House for the");
  const headlineEm = cms(intro, "headlineEm", "care, design and intelligence", "headline");
  const headlineTail = cms(intro, "subheadline", "of home.");

  return (
    <EditorialPage
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
  );
}
