import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  title: "Terms",
  description: "Terms of use for the House of Willow Alexander website, products, and services.",
};

export default async function TermsPage() {
  const sanityPage = await getLegalPage("terms");
  return (
    <EditorialPage
      eyebrow="Legal · Terms"
      title="Terms of use."
      lede="The terms on which you may use the site, HoWA, and our services."
      sections={[
        {
          heading: "The basics",
          body: `This site and HoWA are operated by House of Willow Alexander Ltd, registered in England & Wales (company number 15062693), registered office 12 Hatherley Road, Sidcup, Kent, DA14 4DT. You can reach us at info@willowalexander.co.uk. By using the site, HoWA, or our services, you agree to these terms. If you do not agree, you should not use them.

We may update these terms from time to time. We will notify you of significant changes in the product. The "Last updated" date at the foot of this page is the operative version.`,
        },
        {
          heading: "Your account",
          body: `You are responsible for keeping your login details secure. You are not responsible for errors on our part, such as loss of your record or incorrect billing; where these occur, we will correct them.

You must not attempt to disrupt or misuse the service, including automated scraping, load-testing without our agreement, or attempts to access other members' records.`,
        },
        {
          heading: "Services & bookings",
          body: `Bookings made through HoWA create a contract between you and the service provider; the House facilitates the introduction and the scheduling. We stand behind the standard (House Approved) and will help resolve disputes, but we're not the contracting party for the work itself.

Cancellation terms for each service are published on the service's page and confirmed at booking.`,
        },
        {
          heading: "Payments",
          body: `Payments for orders placed in our online shop are taken by House of Willow Alexander Ltd, and that's the name you'll see on your card or bank statement.

Memberships are a software subscription. Physical service visits are booked and paid for separately.`,
        },
        {
          heading: "Liability",
          body: `Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for anything else that can't be excluded or limited by law, including your statutory rights as a consumer.

For things we can limit: our liability for loss arising from the site itself is capped at the fees you've paid us in the previous 12 months. For services, liability sits with the provider as described above.`,
        },
        {
          heading: "Buying from our shop",
          body: `These terms apply when you buy products from our online shop at willowalexander.co.uk. Services, bookings and memberships have their own terms, shown before you book. Nothing in these terms affects your statutory rights.

1. Who we are. The shop is run by House of Willow Alexander Ltd, registered in England and Wales, company number 15062693. Registered office: 12 Hatherley Road, Sidcup, Kent, DA14 4DT. Trading address: Parker House, 5 Powerscroft Road, Sidcup, DA14 5DT. Contact: shop@willowalexander.co.uk, 0800 047 8738.

2. Our products. We describe and photograph our products as accurately as we can. Many are natural or handmade, so small variations in colour, grain, glaze or size are normal and part of their character. Colours may also look slightly different on your screen.

3. Prices and delivery charges. Prices are in pounds sterling and include VAT. Delivery charges are shown before you pay (see our Delivery policy). If we've clearly made a mistake with a price, we'll contact you before dispatching. You can then choose to go ahead at the correct price or cancel for a full refund.

4. Your order and our contract. After you place an order, we'll email you to confirm we've received it. That email isn't acceptance of your order. Our contract starts when we email you to say your order has been dispatched. If we can't accept your order (for example, because an item is out of stock or there's a pricing error), we'll tell you and won't take payment, or we'll refund you in full promptly.

5. Payment. Payment is taken when you place your order. Payments are taken by House of Willow Alexander Ltd.

6. Delivery. We deliver to UK addresses only. Delivery options, charges and timescales are set out in our Delivery policy. Your order is our responsibility until it's delivered to you, and it becomes yours once it's delivered and paid for. If we can't deliver within 30 days, you can cancel for a full refund.

7. Cancelling and returns. You can cancel within 14 days of the day after you receive your order, without giving a reason. How to do that, what you pay, and the items that are excluded (opened hygiene products) are set out in our Returns & Refunds policy, which includes a cancellation form.

8. Faulty items. The law says products must be as described, fit for purpose and of satisfactory quality. If something is faulty, you're entitled to a full refund within 30 days of delivery. After that, you're entitled to a repair or replacement, and if that isn't possible or doesn't work, a refund. We cover the cost of returning faulty items. See our Returns & Refunds policy.

9. Our responsibility to you. If we break these terms, we're responsible for loss or damage you suffer that is a foreseeable result of our breach or of our failing to use reasonable care. Loss or damage is foreseeable if it's obvious it would happen, or if both of us knew it might happen when the contract was made. We supply products for domestic and private use only, so we aren't responsible for any loss of profit, business or business opportunity. We don't exclude or limit our liability where it would be unlawful to do so, including liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, for breach of your legal rights in relation to the products, and for defective products under the Consumer Protection Act 1987.

10. Events outside our control. If something outside our reasonable control delays your order, we'll tell you as soon as we can and do what we can to reduce the delay. If there's a risk of a substantial delay, you can cancel and we'll refund you for anything you've paid for but haven't received.

11. Complaints. If you're unhappy, please email shop@willowalexander.co.uk or call 0800 047 8738 and we'll do our best to put things right. We aim to reply within 72 hours, excluding weekends. Citizens Advice (0808 223 1133) can also give you free, independent advice about your rights.

12. Law. These terms are governed by the law of England and Wales. You can bring legal proceedings in the courts of England and Wales. If you live in Scotland or Northern Ireland, you can also bring proceedings in your local courts.

13. Changes to these terms. We may update these terms from time to time. The terms that apply to your order are the ones shown when you placed it.`,
        },
      ]}
      updatedAt={sanityPage?.lastUpdated ?? "29 September 2026"}
    />
  );
}
