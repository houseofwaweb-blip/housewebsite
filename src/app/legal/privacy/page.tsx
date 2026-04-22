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
      title={sanityPage?.title ?? "How we handle your data."}
      lede="Plain-English summary first; the formal policy follows. If anything isn't clear, write to us and we'll answer in the same plain English."
      sections={[
        {
          heading: "Plain English first",
          body: `We collect only what we need. We don't sell your data. The record of your home belongs to you — export it or delete it whenever you like.

We share your details with service providers we use to run the site (Sanity, Shopify, Supabase, Vercel, Sentry, Cloudflare) on strict, audit-logged terms. We don't share them with anyone else without your permission.

If you use HoWA+ or the Companion, your photos and notes stay in your private record. They're encrypted at rest and never used to train public models.`,
        },
        {
          heading: "Who we are",
          body: `House of Willow Alexander Ltd is the data controller. Our registered office, company number, and ICO registration number will be listed here once legal review is complete.

Contact: privacy@willowalexander.co.uk`,
        },
        {
          heading: "What we collect, and why",
          body: `Account and billing information — to run your HoWA+ or Steward subscription. Processed under contract.

Messages you send us via forms — to reply to you, and to route your question to the right inbox.

Photos, documents, and notes added to your record — to provide the Companion and the record features of HoWA+.

Analytics (anonymised) — to understand what's working on the site. No third-party ad-tech.`,
        },
        {
          heading: "Your rights",
          body: `You can request a copy of your data, correct anything that's wrong, or ask us to delete it. We'll respond within 30 days. If we can't do what you've asked — usually because of a legal obligation to keep records — we'll explain why.

You can complain to the ICO if you're unhappy with how we've handled your data. Their address is in their guidance.`,
        },
        {
          heading: "This page is in draft",
          body: `The text above is a working summary. A full, legally reviewed privacy policy will replace it before public launch. If you need the current policy in its most precise form before we publish it, write to privacy@willowalexander.co.uk.`,
        },
      ]}
      updatedAt={sanityPage?.lastUpdated ?? "16 April 2026 (draft)"}
    />
  );
}
