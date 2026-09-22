import { EditorialPage } from "@/components/marketing/EditorialPage";
import { CookieDisclosureTable } from "@/components/legal/CookieDisclosureTable";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  title: "Cookies",
  description: "What cookies and similar tech the House site uses, and why.",
};

export default async function CookiesPage() {
  const sanityPage = await getLegalPage("cookies");
  return (
    <>
      <EditorialPage
        eyebrow="Legal · Cookies"
        title="Cookie policy."
        lede="What cookies we set in your browser, what we share and with whom, and how to manage your choices."
        sections={[
          {
            heading: "The four categories",
            body: `The banner asks you to pick from four categories. You can accept all, reject everything non-essential, or open "Customise" to mix and match.

**Essential**: always on. Session, security, your cart, your consent choice itself, and the ServiceOS booking widget (so a "Book" button always works, even if you decline everything else). Site can't work without these. We never ask permission for these because the law treats them as necessary.

**Functional**: embedded tools that remember a preference, such as postcode lookup and language preference. Default off.

**Measurement**: first-party understanding of the site. Google Analytics 4, Microsoft Clarity, Vercel Speed Insights, Sentry. We use them to see which pages are useful, find broken things, and improve speed. Default off.

**Marketing**: advertising and retargeting. Meta (Facebook / Instagram), Pinterest, Google Ads. If you turn this on, you'll see relevant House ads on those platforms instead of random ones. Default off.`,
          },
          {
            heading: "What happens when you reject Measurement and Marketing",
            body: `If you reject Measurement and Marketing, nothing non-essential runs. We do not set analytics or advertising cookies, do not identify you, and do not send analytics or advertising signals about your visit.

Meta Pixel, Pinterest Tag, Google Analytics, Google Ads, Microsoft Clarity, Sentry and Vercel Analytics do not load without consent. Only the essential first-party cookies (session, security, cart, your consent choice and the booking widget) run.`,
          },
          {
            heading: "Data we share with third parties (only with consent)",
            body: `If you consent to Marketing and submit a form, we send a hashed version of your email and phone number to Google and Meta. "Hashed" means the value is one-way scrambled before it leaves us. It lets Google and Meta match you against their existing user base for ad attribution, but the raw email/phone is never shared. This is called "Enhanced Conversions" (Google) and "Conversions API" (Meta), the industry-standard way to measure ad performance under iOS and modern browser privacy.

If you don't consent to Marketing, none of this happens.

We don't sell data. We don't share with anyone outside the providers listed in our [Privacy policy](/legal/privacy).`,
          },
          {
            heading: "If you arrived from an ad",
            body: `When you click a Google, Meta, or Microsoft ad, the URL gains a small parameter (gclid, fbclid, msclkid). If, and only if, you accept the Marketing category, we save these for 90 days in a first-party cookie called wa_click_ids so that if you come back to convert later, the original ad still gets the attribution. It is part of Marketing consent, not an essential cookie, and it is not saved if you reject Marketing. The cookie is first-party only and contains no personal data.`,
          },
          {
            heading: "Managing your choices",
            body: `Use the "Cookie preferences" link in the footer to change your choice at any time. You can also clear cookies from your browser. If you reject everything non-essential, the site still works: sign-in, the cart, form submissions, and security all run on first-party essential cookies.

When you change a preference, the change applies immediately to scripts already loaded. Some third-party cookies set in previous sessions may still exist in your browser until they expire. Clearing your cookies is the surest way to start fresh.`,
          },
          {
            heading: "Full cookie list",
            body: `The table below lists the cookies and similar storage this site uses, grouped by the category above. Measurement and marketing entries are only set once you accept the matching category. If you spot something set that isn't listed, please email sales@willowalexander.co.uk and we'll investigate.`,
          },
        ]}
        updatedAt={sanityPage?.lastUpdated ?? "22 September 2026"}
      />
      <section
        style={{
          background: "var(--color-house-cream)",
          padding: "0 clamp(40px, 5vw, 96px) clamp(80px, 10vw, 120px)",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <CookieDisclosureTable />
        </div>
      </section>
    </>
  );
}
