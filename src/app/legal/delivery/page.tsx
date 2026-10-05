import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  alternates: { canonical: "/legal/delivery" },
  title: "Delivery",
  description:
    "UK delivery: Standard £4.99, free on orders over £75. Express £6.99. Large items £12.99 and two-person furniture delivery £39.99. Dispatch times and lost or damaged parcels.",
};

/**
 * Delivery policy (Google Shopping brief, Task 5). Final wording from
 * returns-and-delivery-policy-AMENDED.md Part 2, used word for word. Sanity
 * (getLegalPage) may override the title, not the compliance-reviewed body.
 */
export default async function DeliveryPage() {
  const sanityPage = await getLegalPage("delivery");

  return (
    <EditorialPage
      eyebrow="Legal · Delivery"
      title={sanityPage?.title ?? "Delivery."}
      lede="We deliver to UK addresses only."
      sections={[
        {
          heading: "Delivery options",
          body: `**Standard** (Royal Mail Tracked 48): **£4.99, free on orders of £75 or more.** 2–3 working days.

**Express** (Royal Mail Tracked 24): **£6.99.** 1–2 working days (we aim for next working day).

**Large items** (tracked courier): **£12.99.** Never free.

**Two-person furniture delivery**: **£39.99.** Never free; we'll contact you to arrange a delivery day.`,
        },
        {
          heading: "Large and heavy items",
          body: `Some pieces are too large or heavy for Royal Mail, so they travel by tracked courier (£12.99) or, for furniture, a two-person team (£39.99). These rates are never free, and large or furniture items do not count towards the £75 free-delivery threshold. We'll email tracking details for courier items, and call to arrange a day for furniture.`,
        },
        {
          heading: "Mixed orders",
          body: `If your basket mixes everyday items with large or furniture items, the delivery charges are added together, and only the everyday items count towards the £75 free-delivery threshold.`,
        },
        {
          heading: "Dispatch and timing",
          body: `Orders are dispatched within **2 working days**, and delivery times count from dispatch. In the unlikely event of a longer delay, we'll let you know. If we can't deliver within 30 days, you can cancel for a full refund.`,
        },
        {
          heading: "Lost or damaged parcels",
          body: `Your order is our responsibility until it reaches you. If it arrives damaged, or hasn't arrived 5 working days after the expected date, email **shop@willowalexander.co.uk** and we'll replace it or refund you.`,
        },
        {
          heading: "Business details",
          body: `House of Willow Alexander is a trading name of **House of Willow Alexander Ltd**, registered in England and Wales, company number **15062693**. Registered office: 12 Hatherley Road, Sidcup, Kent, DA14 4DT.`,
        },
      ]}
    />
  );
}
