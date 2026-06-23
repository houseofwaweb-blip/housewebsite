import { EditorialPage, type EditorialSection } from "@/components/marketing/EditorialPage";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "Standards",
  description:
    "How we work, what we refuse to compromise on, and what House Approved actually means.",
};

const FALLBACK_SECTIONS: EditorialSection[] = [
  {
    heading: "What House Approved means",
    body: `We only place the House Approved seal on partners and products that meet three tests.

First, they would survive the kind of use a real family puts a home through, not a show home, a lived-in one. Second, they are made, grown, or offered by people we have met, visited, and would recommend to a friend. Third, they come with care notes: what it is, how to look after it, how to repair it when something goes wrong.`,
    quote: { text: "Would we trust this in a home we love?" },
  },
  {
    heading: "The review cadence",
    body: `House Approved is not a badge you earn once. Partners are reviewed annually. Products are reviewed whenever we stop hearing good things about them, which happens more often than we'd like to admit.

When something stops meeting the standard, it comes off the list. Quietly, without drama. The point of the seal is that it means something; the moment it stops, the institution stops.`,
    image: {
      src: "/the-house/editorial/library-yellow-blooms.webp",
      alt: "A sunlit library with a yellow armchair and fresh yellow blooms.",
      caption: "Reviewed, and re-read, year on year.",
    },
  },
  {
    heading: "What we refuse",
    body: `We don't take undisclosed commission from partners. Introductions are introductions, not affiliate deals.

We don't recommend anything we wouldn't use in our own homes.

We don't sell data. Your record, your photographs, your documents are yours; they're stored securely and never offered to third parties for any purpose.`,
    quote: {
      text: "Standards survive because somebody refuses to lower them. Usually quietly.",
    },
    image: {
      src: "/the-house/editorial/tools-apple-blossom.webp",
      alt: "Garden tools and apple blossom arranged carefully on a sage ground.",
      caption: "What we leave out matters as much as what we keep.",
    },
  },
];

export default async function StandardsPage() {
  const sections = await getPageSections("the-house-standards");
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

  const headline = cms(intro, "headline", "The");
  const headlineEm = cms(intro, "headlineEm", "quiet", "headline");
  const headlineTail = cms(intro, "subheadline", "bar.");

  return (
    <EditorialPage
      watermark="gold"
      eyebrow={cms(intro, "eyebrow", "The House · Standards")}
      title={
        <>
          {headline} <em>{headlineEm}</em> {headlineTail}
        </>
      }
      lede={cms(
        intro,
        "body",
        "Everything the House does is measured against a specific standard. This page explains what that standard is, how it's maintained, and what we refuse to negotiate on.",
      )}
      sections={editorialSections}
      heroImage={{
        src: "/the-house/editorial/approved-peony-plate.webp",
        alt: "A brass House Approved plate set in a niche beside a single peony.",
      }}
    />
  );
}
