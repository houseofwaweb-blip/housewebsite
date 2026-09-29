import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  alternates: { canonical: "/legal/delivery" },
  title: "Delivery",
  description:
    "UK delivery by Royal Mail: Standard £4.99 (free over £50) and Express £6.99, dispatch and delivery times, and lost or damaged parcels.",
};

/**
 * Delivery policy. Final compliance-reviewed wording, used word for word. Plain
 * text — this branch's EditorialPage renders body as plain paragraphs.
 */
export default async function DeliveryPage() {
  const sanityPage = await getLegalPage("delivery");

  return (
    <EditorialPage
      eyebrow="Legal · Delivery"
      title={sanityPage?.title ?? "Delivery."}
      lede="We deliver to UK addresses only, using Royal Mail."
      sections={[
        {
          heading: "Delivery options",
          body: `Standard (Royal Mail Tracked 48): £4.99, free on orders of £50 or more. 2–3 working days.

Express (Royal Mail Tracked 24): £6.99. 1–2 working days (we aim for next working day).`,
        },
        {
          heading: "Dispatch and timing",
          body: `Orders are dispatched within 2 working days, and delivery times count from dispatch. In the unlikely event of a longer delay, we'll let you know. If we can't deliver within 30 days, you can cancel for a full refund.`,
        },
        {
          heading: "Lost or damaged parcels",
          body: `Your order is our responsibility until it reaches you. If it arrives damaged, or hasn't arrived 5 working days after the expected date, email shop@willowalexander.co.uk and we'll replace it or refund you.`,
        },
        {
          heading: "Business details",
          body: `House of Willow Alexander is a trading name of House of Willow Alexander Ltd, registered in England and Wales, company number 15062693. Registered office: 12 Hatherley Road, Sidcup, Kent, DA14 4DT.`,
        },
      ]}
    />
  );
}
