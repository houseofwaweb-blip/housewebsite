import { EditorialPage, type EditorialSection } from "@/components/marketing/EditorialPage";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "Philosophy",
  description:
    "What we believe about homes, ownership, and the quiet institutions that make long things last.",
};

const FALLBACK_SECTIONS: EditorialSection[] = [
  {
    heading: "The founding idea",
    body: `Ownership is passive. Stewardship is intentional.

We bought our first homes not knowing much about how they were made, how they wanted to be looked after, or who to call when something went wrong. We had to learn it the expensive way. Every generation does.

House of Willow Alexander exists so the next generation doesn't have to. The idea is simple: one calm institution that remembers your home, introduces the right people, keeps a proper record, and quietly gets things done on a schedule.`,
    quote: {
      text: "A home that carries you. Not a statement you have to keep up with.",
      attribution: "The House",
    },
  },
  {
    heading: "What a house is actually for",
    body: `It's the frame inside which a life happens. It holds your books, your photos, your arguments, your mornings. It's expensive, complicated, and mostly invisible when it works.

We think the best homes feel worn-in, not decorated. Useful, not performative. They're kept by people who mean to keep them for a long time, not flipped for the next rung of a ladder.

Everything the House does, the design commissions, the services, the Hearth, HoWA, is in service of that kind of home. The one you mean to stay in.`,
    image: {
      src: "/the-house/editorial/library-tools.webp",
      alt: "A green library with a yellow armchair, books and House Approved tools.",
      caption: "Worn-in, not decorated. A house meant to be kept.",
    },
  },
  {
    heading: "Why now, and why an institution",
    body: `Care for a home used to run in families. You inherited a network of trades, a quiet education in materials and weather, a set of standards from the people who raised you. Most of us no longer do.

Institutions replace that, at scale and across generations. They hold memory, standards, and trust in one place so every new member doesn't have to rebuild them from scratch. The House is that idea, applied to a home.`,
    image: {
      src: "/the-house/editorial/record-book-peony.webp",
      alt: "A writing-desk still life: the house record book, a globe, a brass sconce and a peony.",
      caption: "Memory, standards and trust, kept in one place.",
    },
  },
];

export default async function PhilosophyPage() {
  const sections = await getPageSections("the-house-philosophy");
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

  const headline = cms(intro, "headline", "Beautiful living,");
  const headlineEm = cms(intro, "headlineEm", "intelligently", "headline");
  const headlineTail = cms(intro, "subheadline", "stewarded.");

  return (
    <EditorialPage
      related="philosophy"
      watermark="gold"
      eyebrow={cms(intro, "eyebrow", "The House · Philosophy")}
      title={
        <>
          {headline} <em>{headlineEm}</em> {headlineTail}
        </>
      }
      lede={cms(
        intro,
        "body",
        "We think homes deserve the same kind of quiet institution that schools, clubs, and estates have always had: somewhere to belong, somewhere to ask, somewhere that remembers.",
      )}
      sections={editorialSections}
      heroImage={{
        src: "/lifestyle/fireside-portrait.webp",
        alt: "A woman by a fireside in a warm, flower-papered room, lost in thought.",
      }}
    />
  );
}
