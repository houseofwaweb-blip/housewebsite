import { EditorialPage } from "@/components/marketing/EditorialPage";

export const metadata = {
  title: "Terms",
  description: "Terms of use for the House of Willow Alexander website, products, and services.",
};

export default function TermsPage() {
  return (
    <EditorialPage
      eyebrow="Legal · Terms"
      title="Terms of use."
      lede="The rules of using the site, HoWA, and our services. We've tried to keep them fair and readable."
      sections={[
        {
          heading: "The basics",
          body: `This site and HoWA are operated by House of Willow Alexander Ltd. By using them, you agree to these terms. If you don't, please don't use them.

We may update these terms occasionally. We'll tell you about significant changes in the product. The "Last updated" date at the bottom of this page is the authority.`,
        },
        {
          heading: "Your account",
          body: `You're responsible for keeping your login details safe. You're not responsible for anything we do that's our fault — like losing your record or billing you incorrectly. When that happens, we fix it.

Don't try to break the product — automated scraping, load-testing without our agreement, attempts to access other members' records, etc. Obvious stuff.`,
        },
        {
          heading: "Services & bookings",
          body: `Bookings made through HoWA create a contract between you and the service provider; the House facilitates the introduction and the scheduling. We stand behind the standard (House Approved) and will help resolve disputes, but we're not the contracting party for the work itself.

Cancellation terms for each service are published on the service's page and confirmed at booking.`,
        },
        {
          heading: "Liability",
          body: `Nothing in these terms excludes liability we can't legally exclude — things like gross negligence or fraud.

For things we can limit: our liability for loss arising from the site itself is capped at the fees you've paid us in the previous 12 months. For services, liability sits with the provider as described above.`,
        },
        {
          heading: "This page is in draft",
          body: `The text above is a working summary for design and review. A full, legally reviewed terms of service will replace it before public launch.`,
        },
      ]}
      updatedAt="16 April 2026 (draft)"
    />
  );
}
