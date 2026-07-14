import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  title: "Terms",
  description: "Terms of use for the House of HoWA website, products, and services.",
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
          body: `This site and HoWA are operated by House of HoWA Ltd, registered in England & Wales (company number 15062693), registered office 12 Hatherley Road, Sidcup, Kent, DA14 4DT. You can reach us at info@willowalexander.co.uk. By using the site, HoWA, or our services, you agree to these terms. If you do not agree, you should not use them.

We may update these terms from time to time. We will notify you of significant changes in the product. The "Last updated" date at the foot of this page is the operative version.`,
        },
        {
          heading: "Your account",
          body: `You are responsible for keeping your login details secure. You are not liable for errors on our part, such as loss of your record or incorrect billing; where these occur, we will correct them.

You must not attempt to disrupt or misuse the service, including automated scraping, load-testing without our agreement, or attempts to access other members' records.`,
        },
        {
          heading: "Services & bookings",
          body: `Bookings made through HoWA create a contract between you and the service provider; the House facilitates the introduction and the scheduling. We stand behind the standard (House Approved) and will help resolve disputes, but we're not the contracting party for the work itself.

Cancellation terms for each service are published on the service's page and confirmed at booking.`,
        },
        {
          heading: "Payments",
          body: `Payments for services, memberships and orders taken through HoWA are charged by HoWA Living Ltd. HoWA Living Ltd is the entity that takes the payment and is the name you should expect to see on your card or bank statement.

Being charged by HoWA Living Ltd does not change who is responsible for the work. As set out above, your contract for a physical service is with the named provider shown before you confirm, and that provider remains responsible for its contract and delivery unless checkout states otherwise.

Memberships are a software subscription. Physical service visits are booked and paid for separately.`,
        },
        {
          heading: "Liability",
          body: `Nothing in these terms excludes liability we can't legally exclude: things like gross negligence or fraud.

For things we can limit: our liability for loss arising from the site itself is capped at the fees you've paid us in the previous 12 months. For services, liability sits with the provider as described above.`,
        },
      ]}
      updatedAt={sanityPage?.lastUpdated ?? "1 July 2026"}
    />
  );
}
