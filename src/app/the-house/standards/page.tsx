import { EditorialPage } from "@/components/marketing/EditorialPage";

export const metadata = {
  title: "Standards",
  description:
    "How we work, what we refuse to compromise on, and what House Approved actually means.",
};

export default function StandardsPage() {
  return (
    <EditorialPage
      eyebrow="The House · Standards"
      title={
        <>
          The <em>quiet</em> bar.
        </>
      }
      lede="Everything the House does is measured against a specific standard. This page explains what that standard is, how it's maintained, and what we refuse to negotiate on."
      sections={[
        {
          heading: "What House Approved means",
          body: `We only place the House Approved seal on partners and products that meet three tests.

First, they would survive the kind of use a real family puts a home through — not a show home, a lived-in one. Second, they are made, grown, or offered by people we have met, visited, and would recommend to a friend. Third, they come with care notes: what it is, how to look after it, how to repair it when something goes wrong.`,
        },
        {
          heading: "The review cadence",
          body: `House Approved is not a badge you earn once. Partners are reviewed annually. Products are reviewed whenever we stop hearing good things about them — which happens more often than we'd like to admit.

When something stops meeting the standard, it comes off the list. Quietly, without drama. The point of the seal is that it means something; the moment it stops, the institution stops.`,
        },
        {
          heading: "What we refuse",
          body: `We don't take undisclosed commission from partners. Introductions are introductions, not affiliate deals.

We don't recommend anything we wouldn't use in our own homes.

We don't sell data. Your record, your photographs, your documents are yours; they're stored securely and never offered to third parties for any purpose.`,
          quote: {
            text: "Standards survive because somebody refuses to lower them. Usually quietly.",
          },
        },
      ]}
    />
  );
}
