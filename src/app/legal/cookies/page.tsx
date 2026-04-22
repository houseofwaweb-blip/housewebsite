import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  title: "Cookies",
  description: "What cookies and similar tech the House site uses, and why.",
};

export default async function CookiesPage() {
  const sanityPage = await getLegalPage("cookies");
  return (
    <EditorialPage
      eyebrow="Legal · Cookies"
      title="Cookies, plainly."
      lede="What we set in your browser, for how long, and why. We keep this as short as we can."
      sections={[
        {
          heading: "What we set",
          body: `Session cookies to keep you logged in to HoWA, run your cart on the Shop, and remember whether you've accepted our cookie banner.

An analytics cookie from a privacy-respecting provider (no third-party ad-tech) so we can see which pages are useful. IP addresses are anonymised before they reach us.

A Cloudflare Turnstile challenge when you submit a form, to keep bots off our mailing list and booking system. Stored briefly, only while the form is live.`,
        },
        {
          heading: "What we don't set",
          body: `No third-party advertising cookies. No cross-site trackers. No behavioural profiling. No selling of cookie data to anyone.`,
        },
        {
          heading: "Managing them",
          body: `You can clear cookies from your browser at any time. Most browsers let you set a preference that declines analytics while still accepting the ones needed to keep the site working. If you do that, some things — staying logged in, for instance — won't work.

This page will link to a cookie preferences centre once the full privacy banner is wired up.`,
        },
        {
          heading: "This page is in draft",
          body: `The list above is accurate for the site's current scope. A full cookie table with names, durations, and vendors will replace it before public launch, alongside a preference centre.`,
        },
      ]}
      updatedAt={sanityPage?.lastUpdated ?? "16 April 2026 (draft)"}
    />
  );
}
