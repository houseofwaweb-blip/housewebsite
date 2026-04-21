import { EditorialPage } from "@/components/marketing/EditorialPage";

export const metadata = {
  title: "Philosophy",
  description:
    "What we believe about homes, ownership, and the quiet institutions that make long things last.",
};

export default function PhilosophyPage() {
  return (
    <EditorialPage
      eyebrow="The House · Philosophy"
      title={
        <>
          Beautiful living, <em>intelligently</em> stewarded.
        </>
      }
      lede="We think homes deserve the same kind of quiet institution that schools, clubs, and estates have always had — somewhere to belong, somewhere to ask, somewhere that remembers."
      sections={[
        {
          heading: "The founding idea",
          body: `Ownership is passive. Stewardship is intentional.

We bought our first homes not knowing much about how they were made, how they wanted to be looked after, or who to call when something went wrong. We had to learn it the expensive way. Every generation does.

House of Willow Alexander exists so the next generation doesn't have to. The idea is simple: one calm institution that remembers your home, introduces the right people, keeps a proper record, and quietly gets things done on a schedule.`,
          quote: {
            text: "A home that carries you. Not a statement you have to keep up with.",
            attribution: "The House brief · 2025",
          },
        },
        {
          heading: "What a house is actually for",
          body: `It's the frame inside which a life happens. It holds your books, your photos, your arguments, your mornings. It's expensive, complicated, and mostly invisible when it works.

We think the best homes feel worn-in, not decorated. Useful, not performative. They're kept by people who mean to keep them for a long time, not flipped for the next rung of a ladder.

Everything the House does — the design commissions, the services, the Hearth, HoWA — is in service of that kind of home. The one you mean to stay in.`,
        },
        {
          heading: "Why now, and why an institution",
          body: `Care for a home used to run in families. You inherited a network of trades, a quiet education in materials and weather, a set of standards from the people who raised you. Most of us no longer do.

Institutions replace that, at scale and across generations. They hold memory, standards, and trust in one place so every new member doesn't have to rebuild them from scratch. The House is that idea, applied to a home.`,
        },
      ]}
    />
  );
}
