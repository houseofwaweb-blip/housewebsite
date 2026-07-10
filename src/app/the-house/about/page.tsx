import { EditorialPage, type EditorialSection } from "@/components/marketing/EditorialPage";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { getPageSections, cms } from "@/lib/cms/page-sections";

/**
 * /the-house/about — About House of HoWA.
 *
 * Applies the About Us Website Copy amend: positions House of HoWA as the new
 * home for HoWA, the House standard and the Willow Alexander founding service
 * family. Avoids "institution" as a public claim; leads with trusted services,
 * the House standard, and the home that remembers.
 */

export const metadata = {
  title: "About House of HoWA",
  description:
    "House of HoWA brings together trusted home services, design, maintenance and the HoWA Home Operating System, one connected way to look after the home, remember what has happened, and know what should happen next.",
};

// A real branded van beside the founding-service-family copy — portrait inline
// figure, not a full-bleed band.
const VAN_FIGURE = {
  src: "/services/photos/vans/asher-347.webp",
  alt: "A Willow Alexander electric van, liveried for garden and home care",
  caption: "The Willow Alexander vans, out across London and the South East.",
} as const;

const FALLBACK_SECTIONS: EditorialSection[] = [
  {
    heading: "Why House of HoWA exists",
    body: `It has grown from real work in real homes: gardens tended, windows cleaned, rooms designed, repairs made, moves managed, paperwork gathered, and customers asking the same quiet question again and again: can someone just help me keep on top of this?

HoWA is our answer. A home should not have to be managed through scattered emails, old invoices, half-remembered visits, WhatsApp messages and things you meant to book later.

It should have a memory. It should have a plan. It should have trusted people around it. House of HoWA exists to bring those things together.`,
  },
  {
    heading: "From Willow Alexander to House of HoWA",
    body: `Willow Alexander began as a family of specialist home and garden services with a simple standard: do the work properly, make it beautiful where you can, and leave the home better held than you found it.

That standard now moves into a wider system. House of HoWA is the next chapter: a clearer home for the service family, the House standard and the HoWA platform.`,
  },
  {
    heading: "The Willow Alexander service family",
    image: VAN_FIGURE,
    body: `The Willow Alexander names remain as founding service partners within House of HoWA: Gardeners, for maintenance, seasonal care and outdoor rhythm; Gardens, for design, planting and landscaping; Cleaners, for considered regular care; Window Cleaners, for reliable exterior rhythm; Handyman, for repairs and small works; and Removals, for careful moving and handover.

Together, they form the first service family working through House of HoWA. Over time, other approved partners will sit alongside them. The goal is simple: one trusted place to understand, care for and improve the home.`,
  },
  {
    heading: "What HoWA changes",
    body: `Most home services finish when the job is done. HoWA changes that.

A garden visit can become a seasonal record. A window clean can become part of a maintenance rhythm. A repair can become a saved warranty note. A design conversation can become a brief. A move can become a handover record. A quote can become something understood rather than guessed at.

Every useful action can return to one place: your Home Record. That is the difference. House of HoWA is not just a place to book help. It is a way for the home to become better known over time.`,
  },
  {
    heading: "The Home Operating System",
    body: `HoWA helps your home remember what has happened, understand what needs attention, and keep the next right action in one place.

It begins with your address. From there, HoWA can build a clearer picture of the home: its records, rooms, systems, services, documents, risks, tasks, warranties, plans and history. The more the home is cared for, the more useful the record becomes.

The house stops being a collection of loose jobs and forgotten paperwork. It becomes one living record.`,
  },
  {
    heading: "The Household",
    body: `HoWA is organised around a simple idea: different parts of the home need different kinds of attention. So we describe those roles through the Household.

The Gardener reads gardens, plants, seasons and outdoor care. The Handyman helps understand faults, repairs and what needs fixing. The Designer helps shape rooms, gardens and ideas into direction. The Surveyor helps make sense of cracks, damp, risk and quotes. The Archivist turns documents into dates, reminders and memory. The Housekeeper keeps the everyday home in rhythm. The Steward watches the whole home for the long view.

The customer does not need to manage a set of bots or tools. They talk to HoWA. The Household works behind it.`,
  },
  {
    heading: "Booked. And remembered.",
    body: `When you book through House of HoWA, the work can become more than a completed visit. The job, notes, photos, documents, warranty details and next steps can be saved against the home.

That means future care becomes easier. Less chasing. Less guessing. Less forgetting. More confidence that the home is being properly looked after.

This is where Willow Alexander's service experience becomes powerful inside HoWA: the work is real, the people are real, and the record grows from what actually happens.`,
  },
  {
    heading: "The House standard",
    body: `We do not want home care to feel like a gamble. The House standard exists to make it easier to know who to trust.

It applies to our own Willow Alexander service family and, over time, to approved partners who work through House of HoWA.

The test is simple: would we trust this person, product or partner in a home we care about? If the answer is no, it does not belong here.`,
  },
  {
    heading: "Design, care and practical help",
    body: `House of HoWA brings together the everyday and the aspirational.

The everyday: the cleaning, windows, gutters, repairs, garden visits, documents, reminders and seasonal tasks that keep a home moving. The aspirational: the garden redesign, the room you want to change, the home improvements, the better systems, the long-term plan.

Both matter. A well-kept home is not only fixed when something breaks. It is understood, remembered and improved over time.`,
  },
  {
    heading: "How to start",
    body: `There are two simple ways in.

Start with your address, and begin with HoWA to create the first picture of your home. Or book a service, and choose the help you need from the Willow Alexander service family or a House Approved partner.

Either way, the aim is the same: your home becomes easier to understand, easier to care for, and harder to forget.`,
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
          image: FALLBACK_SECTIONS[i]?.image,
        }))
      : FALLBACK_SECTIONS;

  const headline = cms(intro, "headline", "A new House for the way homes are");
  const headlineEm = cms(intro, "headlineEm", "cared for now.", "headline");
  const headlineTail = cms(intro, "subheadline", "");

  return (
    <>
      <EditorialPage
        watermark="gold"
        eyebrow={cms(intro, "eyebrow", "House of HoWA · About")}
        title={
          <>
            {headline} <em>{headlineEm}</em> {headlineTail}
          </>
        }
        lede={cms(
          intro,
          "body",
          "House of HoWA brings together trusted home services, design, maintenance and the HoWA Home Operating System, one connected way to look after the home, remember what has happened, and know what should happen next.",
        )}
        sections={editorialSections}
      />
      {/* Closing lead capture into the Home Record. */}
      <div id="reach-us" style={{ background: "var(--color-house-cream)" }}>
        <EnquiryForm
          sourcePage="/the-house/about"
          eyebrow="Start with the House"
          headline="Write to the House."
          body="A question about a garden, a window, a warranty, a partnership or a press enquiry. Choose the topic and it lands in the right inbox. We reply within one working day."
        />
      </div>
    </>
  );
}
