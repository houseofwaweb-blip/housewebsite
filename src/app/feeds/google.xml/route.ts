import { buildGoogleFeed } from "@/lib/commerce/google-feed";
import { env } from "@/lib/env";

/**
 * Google Merchant Center product feed (brief: Google Shopping, Task 1).
 * Public, no auth, NOT under /api/ (robots.txt blocks /api/). One <item> per
 * sellable variant. Hourly ISR so Merchant Center's daily fetch sees fresh
 * stock + prices. Links use NEXT_PUBLIC_SITE_URL (the production apex in prod).
 */
export const revalidate = 3600;

export async function GET() {
  try {
    const xml = await buildGoogleFeed(env.NEXT_PUBLIC_SITE_URL);
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    // Never 500 Merchant Center into a suspension loop; return an empty, valid
    // feed and surface the error in logs instead.
    console.error("[feeds/google.xml] build failed:", err);
    const empty = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>House of Willow Alexander</title><link>${env.NEXT_PUBLIC_SITE_URL}</link><description>House of Willow Alexander product feed</description></channel></rss>`;
    return new Response(empty, {
      status: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }
}
