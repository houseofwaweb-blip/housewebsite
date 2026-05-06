/* WP/WooCommerce preview fetchers — used only by /preview/* routes
   while the Shopify migration is in flight. Production should go
   through `lib/commerce/shopify.ts` via the CommerceProvider interface. */

const WP_BASE = "https://willowalexander.co.uk/wp-json";

export type WPProduct = {
  id: number;
  name: string;
  permalink: string;
  priceMinor: number; // pence
  currency: string;
  imageUrl?: string;
  imageAlt?: string;
  shortDescription?: string;
};

export type WPPost = {
  id: number;
  title: string;
  link: string;
  date: string; // ISO
  excerpt: string;
};

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'");
}

export async function getWPProducts(limit = 3): Promise<WPProduct[]> {
  try {
    const res = await fetch(
      `${WP_BASE}/wc/store/v1/products?per_page=${limit}&_fields=id,name,permalink,prices,images,short_description`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const raw = (await res.json()) as Array<{
      id: number;
      name: string;
      permalink: string;
      prices?: { price?: string; currency_code?: string };
      images?: Array<{ src?: string; alt?: string }>;
      short_description?: string;
    }>;
    return raw.map((p) => ({
      id: p.id,
      name: decodeEntities(p.name),
      permalink: p.permalink,
      priceMinor: parseInt(p.prices?.price ?? "0", 10),
      currency: p.prices?.currency_code ?? "GBP",
      imageUrl: p.images?.[0]?.src,
      imageAlt: p.images?.[0]?.alt || decodeEntities(p.name),
      shortDescription: p.short_description ? stripTags(decodeEntities(p.short_description)) : undefined,
    }));
  } catch {
    return [];
  }
}

export async function getWPPosts(limit = 3): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `${WP_BASE}/wp/v2/posts?per_page=${limit}&_fields=id,title,link,date,excerpt`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const raw = (await res.json()) as Array<{
      id: number;
      title: { rendered: string };
      link: string;
      date: string;
      excerpt: { rendered: string };
    }>;
    return raw.map((p) => ({
      id: p.id,
      title: decodeEntities(stripTags(p.title.rendered)),
      link: p.link,
      date: p.date,
      excerpt: decodeEntities(stripTags(p.excerpt.rendered)),
    }));
  } catch {
    return [];
  }
}

export function formatPrice(minor: number, currency: string): string {
  const value = minor / 100;
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `£${value.toFixed(2)}`;
  }
}
