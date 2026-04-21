import { EditorialPage } from "@/components/marketing/EditorialPage";

export const metadata = {
  title: "About",
  description:
    "The small team who runs the House, and the partner studios who carry most of the work.",
};

export default function AboutPage() {
  return (
    <EditorialPage
      eyebrow="The House · About"
      title={
        <>
          A <em>small</em> team, on purpose.
        </>
      }
      lede="The House is run by a small core team. The work — designs, services, the journal, the product — is carried by a wider set of partners we name openly."
      sections={[
        {
          heading: "Who we are",
          body: `House of Willow Alexander was started by Alex Field, out of a dissatisfaction with the way the existing market thinks about homes. The full team fits on one page and we like it that way.

We're based in West London. We work across the UK for design and Steward commissions; services operate in defined postcode areas you'll find on each service's page.`,
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
      ]}
    />
  );
}
