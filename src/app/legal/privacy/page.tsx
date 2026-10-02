import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  alternates: { canonical: "/legal/privacy" },
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
          body: `We collect only the data we need to provide the site, shop, and services, and we do not sell your personal data. Data you add to your Home Record remains yours; you can export or delete it at any time.

We share your data with the service providers that operate the site (Sanity, Shopify, Supabase, Vercel, Sentry, Cloudflare, Klaviyo) under contract. We use measurement and advertising services from Google, Microsoft, Meta and Pinterest only where you have consented via the cookie banner, and only with hashed identifiers, never raw email or phone. Detail is set out in the [Cookie policy](/legal/cookies).

Data you add to HoWA, such as photos and notes, is held in your private record, encrypted at rest, and is not used to train public models.`,
        },
        {
          heading: "Who we are",
          body: `House of Willow Alexander Ltd (registered in England & Wales, company number 15062693) operates this website, the shop and Marketplace, and is the data controller for that data. HoWA Living Ltd supplies the HoWA platform and subscriptions, and is the data controller for the data you hold in HoWA. Each company is the controller for its own data. Registered office: 12 Hatherley Road, Sidcup, Kent, DA14 4DT.

Contact: sales@willowalexander.co.uk`,
        },
        {
          heading: "What we collect, and why",
          body: `Account and billing information: to run your HoWA+ or HoWA Steward subscription. Processed under contract.

Messages you send us via forms: to reply to you, and to route your question to the right inbox.

Photos, documents, and notes added to your record: to provide Ask HoWA and the record features of HoWA.

Measurement data: page views, performance metrics, and (if you consent) heatmaps. Used to understand what's working on the site. Held by Google Analytics, Microsoft Clarity, Vercel and Sentry. Opt-in via the cookie banner.

Advertising and attribution data: if you consent to the Marketing category, we share a hashed (one-way scrambled) version of your email and phone with Google (and Meta) when you submit an enquiry form or complete a purchase at checkout, so the enquiry or order can be attributed to the right ad campaign (Google calls this "Enhanced Conversions"). Your raw email and phone are not sent in this advertising workflow; only the hashed version is. Hashed data is still personal data, and Google is a recipient of it. Click identifiers from ad URLs (gclid, fbclid) are stored for 90 days to support cross-session attribution. The lawful basis for all of this is your consent, given via the cookie banner, which you can withdraw at any time using the "Cookie preferences" link in the footer.`,
        },
        {
          heading: "Who we share data with",
          body: `We share personal data only with the providers that run the site and, where you have consented, measure our advertising. Each acts under contract, for the purpose shown, and we do not sell your personal data.

Shopify — runs the shop, checkout and order management.
Google (Analytics & Ads) — website analytics, and, with marketing consent, advertising measurement and enhanced conversions.
Microsoft (Clarity) — with analytics consent, anonymised heatmaps to improve the site.
Klaviyo — email sign-ups, and, with marketing consent, on-site behaviour for our email programme.
Meta and Pinterest — with marketing consent, advertising measurement on those platforms.
Sanity, Supabase, Vercel, Cloudflare and Sentry — content, form storage, hosting, security and error monitoring.`,
        },
        {
          heading: "Lawful basis",
          body: `Consent — for analytics and marketing cookies and the tracking they enable (including enhanced conversions). You give it via the cookie banner and can withdraw it any time in Cookie preferences.

Contract — to take and fulfil your orders and to run your subscription.

Legitimate interests — for essential site security and fraud prevention.

Legal obligation — to keep financial and transaction records for as long as the law requires.`,
        },
        {
          heading: "International transfers",
          body: `Some providers process data outside the UK, including in the United States (for example Google, Microsoft, Meta, Pinterest and Klaviyo). Where they do, the transfer is covered by an approved safeguard — the UK Extension to the EU–US Data Privacy Framework for providers certified under it, and the UK International Data Transfer Agreement or standard contractual clauses otherwise. We rely on the safeguard each provider sets out in its own data-processing terms.`,
        },
        {
          heading: "How long we keep data",
          body: `We keep personal data only as long as the purpose needs:

Analytics (Google Analytics) event data is retained for up to 14 months, then deleted automatically.
Order and transaction records are kept for as long as the law requires for financial records (six years in the UK).
Enquiry and form submissions are kept while we deal with your request and for a reasonable period after.
Marketing data is kept until you withdraw consent or unsubscribe.`,
        },
        {
          heading: "Your rights",
          body: `You can request a copy of your data, correct anything that's wrong, or ask us to delete it. We'll respond within 30 days. If we can't do what you've asked, usually because of a legal obligation to keep records, we'll explain why.

You can complain to the ICO if you're unhappy with how we've handled your data. Their address is in their guidance.`,
        },
      ]}
      updatedAt={sanityPage?.lastUpdated ?? "2 October 2026"}
    />
  );
}
