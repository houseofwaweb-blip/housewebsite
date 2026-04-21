import { EditorialPage } from "@/components/marketing/EditorialPage";

export const metadata = {
  title: "Sustainability",
  description:
    "What we measure, what we refuse to do, and where we want to get to. Named numbers, not slogans.",
};

export default function SustainabilityPage() {
  return (
    <EditorialPage
      eyebrow="The House · Sustainability"
      title={
        <>
          What we <em>keep</em>.
        </>
      }
      lede="We're wary of sustainability pages that don't name anything specific. This one tries to. It will be updated as we measure more things and as what we measure gets better."
      sections={[
        {
          heading: "Our framing",
          body: `Most of what makes a home sustainable happens before you decorate it. Retain the fabric. Repair over replace. Extend the life of what was already made. The most sustainable piece of furniture is the one already in the room.

Our partner studios are asked to plan for a thirty-year horizon, not a style cycle. Our services are designed to keep things going longer. The Steward logic exists precisely because long-lived homes need fewer one-off interventions.`,
        },
        {
          heading: "What we measure",
          body: `We track three things at the moment, and intend to add more.

Materials provenance for House Approved products — where the raw materials came from, who worked them, and the distance travelled to reach the store.

Travel impact for our own operations — miles driven by services teams, consolidated where possible into single trips.

End-of-life plans for everything we sell — how it's repaired, how it's returned if it ever needs to be, and what happens to it when the next owner has had their turn.`,
        },
        {
          heading: "What we refuse",
          body: `Fast-turnover anything. Products we couldn't repair. Partners who can't tell us where their materials come from. Marketing that claims green credentials we can't evidence.

We'd rather not write about sustainability at all than overstate it. Everything on this page should be verifiable if you ask.`,
          quote: {
            text: "Kept things last longer than new ones. We're mostly in the keeping business.",
          },
        },
      ]}
    />
  );
}
