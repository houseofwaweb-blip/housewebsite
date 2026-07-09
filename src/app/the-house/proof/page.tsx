import { EditorialPage, type EditorialSection } from "@/components/marketing/EditorialPage";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "Proof",
  description:
    "Press, testimony, and the institutions we keep company with. Updated as things happen.",
};

const FALLBACK_SECTIONS: EditorialSection[] = [
  {
    heading: "In the press",
    body: `House of HoWA has been written about in House & Garden UK, The Financial Times How To Spend It, Country Life, and World of Interiors. Full archive to follow once the Journal is populated.`,
  },
  {
    heading: "Recent work",
    body: `A Grade II Georgian terrace in Notting Hill: full interior re-read, garden replant, ongoing Steward care. Delve Interiors.

A private studio in Chelsea: architectural detailing, library build, two-year commission. Delve Interiors.

A country house garden in Oxfordshire: three-year landscape scheme, seasonal management ongoing. Willow Alexander Gardens.`,
  },
  {
    heading: "Testimony",
    body: `We'll let people speak for themselves here once the Journal is live. Every testimony is from someone who paid for the work, not someone who was paid to say nice things about it.`,
    quote: {
      text: "The House remembered what I asked for last spring when I'd forgotten it myself.",
      attribution: "A client, W11",
    },
  },
];

export default async function ProofPage() {
  const sections = await getPageSections("the-house-proof");
  const intro = sections.get("intro");
  const body = sections.get("body");
  const bodyCards = body?.cards;
  const editorialSections: EditorialSection[] =
    bodyCards && bodyCards.length
      ? bodyCards.map((c, i) => ({
          heading: c.title ?? FALLBACK_SECTIONS[i]?.heading,
          body: c.body ?? FALLBACK_SECTIONS[i]?.body ?? "",
          quote: FALLBACK_SECTIONS[i]?.quote,
        }))
      : FALLBACK_SECTIONS;

  return (
    <EditorialPage
      watermark="gold"
      eyebrow={cms(intro, "eyebrow", "The House · Proof")}
      title={cms(intro, "headline", "Testimony.")}
      lede={cms(
        intro,
        "body",
        "Homes we've worked on. People we've written with. The occasional award. This page grows over time and once Sanity lands, every entry will carry a link.",
      )}
      sections={editorialSections}
    />
  );
}
