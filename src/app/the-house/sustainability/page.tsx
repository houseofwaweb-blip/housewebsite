import { EditorialPage, type EditorialSection } from "@/components/marketing/EditorialPage";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "Sustainability",
  description:
    "What we measure, what we refuse to do, and where we want to get to. Named numbers, not slogans.",
};

const FALLBACK_SECTIONS: EditorialSection[] = [
  {
    heading: "Our framing",
    body: `Most of what makes a home sustainable happens before you decorate it. Retain the fabric. Repair over replace. Extend the life of what was already made. The most sustainable piece of furniture is the one already in the room.

Our studios are asked to plan for a thirty-year horizon, not a style cycle. Our services are designed to keep things going longer. The stewardship logic exists precisely because long-lived homes need fewer one-off interventions.`,
    image: {
      src: "/the-house/editorial/garden-doors-roses.webp",
      alt: "Open sage garden doors framed by climbing roses, a room that opens to green.",
      caption: "Kept, repaired, extended. Grown for the long term.",
    },
  },
  {
    heading: "What we measure",
    body: `We track three things at the moment, and intend to add more.

Materials provenance for the House Selection: where the raw materials came from, who worked them, and the distance travelled to reach the store.

Travel impact for our own operations: miles driven by services teams, consolidated where possible into single trips.

End-of-life plans for everything we sell: how it's repaired, how it's returned if it ever needs to be, and what happens to it when the next owner has had their turn.`,
    image: {
      src: "/the-house/editorial/record-book-toolkit.webp",
      alt: "A leather ledger beside a toolkit on a sage cloth.",
      caption: "Made, repaired, kept honest.",
    },
  },
  {
    heading: "What we refuse",
    body: `Fast-turnover anything. Products we couldn't repair. Partners who can't tell us where their materials come from. Marketing that claims green credentials we can't evidence.

We'd rather not write about sustainability at all than overstate it. Everything on this page should be verifiable if you ask.`,
    quote: {
      text: "Kept things last longer than new ones. We're mostly in the keeping business.",
    },
  },
];

export default async function SustainabilityPage() {
  const sections = await getPageSections("the-house-sustainability");
  const intro = sections.get("intro");
  const body = sections.get("body");
  const bodyCards = body?.cards;
  const editorialSections: EditorialSection[] =
    bodyCards && bodyCards.length
      ? bodyCards.map((c, i) => ({
          heading: c.title ?? FALLBACK_SECTIONS[i]?.heading,
          body: c.body ?? FALLBACK_SECTIONS[i]?.body ?? "",
          quote: FALLBACK_SECTIONS[i]?.quote,
          image: FALLBACK_SECTIONS[i]?.image,
        }))
      : FALLBACK_SECTIONS;

  const headline = cms(intro, "headline", "What we");
  const headlineEm = cms(intro, "headlineEm", "keep", "headline");
  const headlineTail = cms(intro, "subheadline", ".");

  return (
    <EditorialPage
      watermark="gold"
      eyebrow={cms(intro, "eyebrow", "The House · Sustainability")}
      title={
        <>
          {headline} <em>{headlineEm}</em>
          {headlineTail}
        </>
      }
      lede={cms(
        intro,
        "body",
        "We're wary of sustainability pages that don't name anything specific. This one tries to. It will be updated as we measure more things and as what we measure gets better.",
      )}
      sections={editorialSections}
      heroImage={{
        src: "/the-house/editorial/georgian-wisteria-garden.webp",
        alt: "A sage Georgian cottage wreathed in wisteria, a cottage garden at sunset.",
      }}
    />
  );
}
