import { EditorialPage } from "@/components/marketing/EditorialPage";

export const metadata = {
  title: "Proof",
  description:
    "Press, testimony, and the institutions we keep company with. Updated as things happen.",
};

export default function ProofPage() {
  return (
    <EditorialPage
      eyebrow="The House · Proof"
      title="Testimony."
      lede="Homes we've worked on. People we've written with. The occasional award. This page grows over time and once Sanity lands, every entry will carry a link."
      sections={[
        {
          heading: "In the press",
          body: `House of Willow Alexander has been written about in House & Garden UK, The Financial Times How To Spend It, Country Life, and World of Interiors. Full archive to follow once the Journal is populated.`,
        },
        {
          heading: "Recent work",
          body: `A Grade II Georgian terrace in Notting Hill — full interior re-read, garden replant, ongoing Steward care. Delve Interiors.

A private studio in Chelsea — architectural detailing, library build, two-year commission. Jessica Durling-McMahon.

A country house garden in Oxfordshire — three-year landscape scheme, seasonal management ongoing. Willow Alexander Gardens.`,
        },
        {
          heading: "Testimony",
          body: `We'll let people speak for themselves here once the Journal is live. Every testimony is from someone who paid for the work, not someone who was paid to say nice things about it.`,
          quote: {
            text: "The House remembered what I asked for last spring when I'd forgotten it myself.",
            attribution: "A client, W11",
          },
        },
      ]}
    />
  );
}
