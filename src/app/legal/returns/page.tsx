import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  alternates: { canonical: "/legal/returns" },
  title: "Returns and refunds",
  description:
    "How to return an item bought from the House of Willow Alexander shop, your 14-day right to cancel, faulty goods and refunds.",
};

/**
 * Returns & refunds policy (Google Shopping brief, Task 5). Final wording from
 * returns-and-delivery-policy-AMENDED.md Part 2, checked against UK consumer law
 * (CCRs / CRA / DMCCA), used word for word — including the model cancellation
 * form, which is a legal requirement. Sanity (getLegalPage) may override the
 * title, but not the body: this text is compliance-reviewed, do not edit lightly.
 */
export default async function ReturnsPage() {
  const sanityPage = await getLegalPage("returns");

  return (
    <EditorialPage
      eyebrow="Legal · Returns"
      title={sanityPage?.title ?? "Returns and refunds."}
      lede="Thank you for shopping with House of Willow Alexander. If you're not completely happy with your order, here's how returns work. None of this affects your statutory rights."
      sections={[
        {
          heading: "Changing your mind (14-day right to cancel)",
          body: `You can cancel your order for any reason within **14 days of the day after you receive it**. If your order arrives in more than one delivery, the 14 days run from the day after the last item arrives. This applies to sale items too.

To cancel, email **shop@willowalexander.co.uk** with your order number, full name and address, or use the cancellation form at the bottom of this page. You then have **14 days** from telling us to send the item back.

• Items must be returned by a **tracked service**. Please email us the courier and tracking number.

• For change-of-mind returns, **you pay the return postage**.

• We'll refund the **price of the item plus the original delivery charge**, up to the cost of our Standard delivery (£4.99). If you chose Express, we refund £4.99 of the delivery charge.

• We'll refund you within **14 days of receiving the item back**, or of you showing us proof that you've sent it, whichever is sooner. In practice we aim to process refunds within 72 hours. Your bank may take up to 10 working days to show it.

• Refunds go back to your **original payment method**. If you'd prefer, we can give you **store credit** instead, valid for 6 months, but only if you ask for it.

• Please look after items while they're with you. You're welcome to handle them as you would in a shop. If an item comes back used, worn or damaged beyond that, we may **reduce the refund** to reflect the loss in value.`,
        },
        {
          heading: "Items that can't be returned for a change of mind",
          body: `For health, hygiene and safety reasons, the right to cancel doesn't apply to:

• toiletries, soaps, bath products, cosmetics, grooming products and pet toiletries that were sealed and **have been opened or unsealed** after delivery

We say so on the product page of any item affected. **These items are still covered if they're faulty** (see below).`,
        },
        {
          heading: "Faulty or incorrect items",
          body: `If an item arrives faulty, damaged or not as described, email us within **30 days** of delivery with your order number and a photo. You're entitled to a **full refund**, or a replacement if you prefer. **We'll cover the return postage.** After 30 days, you're entitled to a repair or replacement, and if that isn't possible, a refund.

This doesn't cover a fault that was specifically pointed out to you before you bought the item.`,
        },
        {
          heading: "Orders returned to us by the courier",
          body: `If an order comes back to us because it wasn't collected, was refused, or couldn't be delivered because the address given was incomplete or incorrect, we'll contact you. If you'd like a refund, we'll refund the item and the original Standard delivery charge, **minus the cost of the parcel being returned to us**. If you'd like it re-sent, we'll charge the delivery cost again.`,
        },
        {
          heading: "Incorrect delivery address",
          body: `Please check your address carefully at checkout. If a parcel is delivered to an incorrect address that was entered at checkout, we'll do our best to help recover it with the courier. However, we can't issue a refund or replacement for a parcel delivered to the address you gave us.`,
        },
        {
          heading: "Contact",
          body: `Email **shop@willowalexander.co.uk** with your order number, full name and address, or call **0800 047 8738**. We aim to reply within 72 hours, excluding weekends.`,
        },
        {
          heading: "Allergen information",
          body: `Some of our products may have come into contact with the following during production, packing or transport: gluten, oats, wheat, peanuts, soya, milk, nuts, sesame and sulphur dioxide. Please check the ingredients on the product page and packaging before use. If you have a known allergy or sensitive skin, patch-test first or ask us before buying. If you have a reaction, stop using the product and contact us.`,
        },
        {
          heading: "Model cancellation form",
          body: `To: House of Willow Alexander Ltd, Parker House, 5 Powerscroft Road, Sidcup, DA14 5DT. Email: shop@willowalexander.co.uk

I hereby give notice that I cancel my contract of sale of the following goods:

Ordered on / received on:

Order number:

Name:

Address:

Signature (only if this form is sent on paper):

Date:`,
        },
        {
          heading: "Business details",
          body: `House of Willow Alexander is a trading name of **House of Willow Alexander Ltd**, registered in England and Wales, company number **15062693**. Registered office: 12 Hatherley Road, Sidcup, Kent, DA14 4DT.`,
        },
      ]}
    />
  );
}
