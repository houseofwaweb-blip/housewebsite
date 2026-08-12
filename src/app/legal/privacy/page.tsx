import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  title: "Privacy",
  description:
    "How House of Willow Alexander collects, uses, and protects your personal data.",
};

export default async function PrivacyPage() {
  const sanityPage = await getLegalPage("privacy");

  return (
    <EditorialPage
      eyebrow="Legal · Privacy"
      title={sanityPage?.title ?? "Privacy policy."}
      lede="How House of Willow Alexander Ltd collects, uses, and protects your personal data, and the rights you have over it under UK data protection law."
      sections={[
        {
          heading: "Overview",
          body: `We collect only the data we need to provide the site, shop, and services, and we do not sell your personal data. Any information you add through the site remains yours; you can export or delete it at any time.

We share your data with the service providers that operate the site (Sanity, Shopify, Supabase, Vercel, Sentry, Cloudflare) under contract. We use measurement and advertising services from Google, Microsoft, Meta and Pinterest only where you have consented via the cookie banner, and only with hashed identifiers, never raw email or phone. Detail is set out in the [Cookie policy](/legal/cookies).

Data you add to Housekeeper or Ask HoWA, such as photos and notes, is held in your private record, encrypted at rest, and is not used to train public models.`,
        },
        {
          heading: "Who we are",
          body: `House of Willow Alexander Ltd (registered in England & Wales, company number 15062693) is the data controller. Registered office: 12 Hatherley Road, Sidcup, Kent, DA14 4DT.

Contact: info@willowalexander.co.uk`,
        },
        {
          heading: "What we collect, and why",
          body: `Account and billing information: to run your Housekeeper or Steward subscription. Processed under contract.

Messages you send us via forms: to reply to you, and to route your question to the right inbox.

Photos, documents, and notes added to your record: to provide Ask HoWA and the record features of Housekeeper.

Measurement data: page views, performance metrics, and (if you consent) heatmaps. Used to understand what's working on the site. Held by Google Analytics, Microsoft Clarity, Vercel and Sentry. Opt-in via the cookie banner.

Advertising and attribution data: if you consent to the Marketing category, we share a hashed (one-way scrambled) version of your email and phone with Google and Meta when you submit a form, so they can attribute the conversion to the right ad campaign. Raw email and phone never leave us. Click identifiers from ad URLs (gclid, fbclid) are stored for 90 days to support cross-session attribution. Opt-in via the cookie banner.`,
        },
        {
          heading: "Your rights",
          body: `You can request a copy of your data, correct anything that's wrong, or ask us to delete it. We'll respond within 30 days. If we can't do what you've asked, usually because of a legal obligation to keep records, we'll explain why.

You can complain to the ICO if you're unhappy with how we've handled your data. Their address is in their guidance.`,
        },
      ]}
      updatedAt={sanityPage?.lastUpdated ?? "1 July 2026"}
    />
  );
}
