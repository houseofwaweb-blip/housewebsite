import "server-only";
import { env } from "@/lib/env";
import { isValidGtin, numericId } from "./gtin";

/**
 * Google Merchant Center product feed data layer (brief: Google Shopping
 * readiness, Task 1). Builds one feed item per sellable variant from the
 * Storefront API, excluding gift cards / memberships / services / design.
 *
 * Kept separate from the main Shopify client because the feed needs
 * variant-level fields (sku, barcode, weight, per-variant google metafields)
 * that the storefront product fragment doesn't fetch. Metafield queries return
 * null when a definition is absent or empty, so the code is safe before the
 * `google` namespace metafields are created on the Shopify side.
 */

const API_VERSION = "2025-04";

/** productType values that never belong in the Shopping feed. */
const EXCLUDED_TYPES = new Set([
  "Memberships",
  "Gift Cards",
  "Services",
  "Interior Design",
  "Design Voucher",
]);

interface Money {
  amount: string;
  currencyCode: string;
}
interface FeedMetafield {
  value: string | null;
}
interface FeedVariant {
  id: string;
  title: string;
  sku: string | null;
  barcode: string | null;
  availableForSale: boolean;
  weight: number | null;
  weightUnit: string | null;
  price: Money;
  compareAtPrice: Money | null;
  image: { url: string } | null;
  legacyId: FeedMetafield | null;
}
interface FeedProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  vendor: string;
  isGiftCard: boolean;
  tags: string[];
  featuredImage: { url: string } | null;
  images: { nodes: Array<{ url: string }> };
  variants: { nodes: FeedVariant[] };
  exclude: FeedMetafield | null;
  googleCategory: FeedMetafield | null;
  label0: FeedMetafield | null;
  label1: FeedMetafield | null;
  label2: FeedMetafield | null;
  label3: FeedMetafield | null;
  label4: FeedMetafield | null;
}

const FEED_QUERY = /* GraphQL */ `
  query FeedProducts($cursor: String) {
    products(first: 250, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        handle
        title
        description
        productType
        vendor
        isGiftCard
        tags
        featuredImage { url }
        images(first: 11) { nodes { url } }
        exclude: metafield(namespace: "google", key: "exclude") { value }
        googleCategory: metafield(namespace: "google", key: "google_product_category") { value }
        label0: metafield(namespace: "google", key: "custom_label_0") { value }
        label1: metafield(namespace: "google", key: "custom_label_1") { value }
        label2: metafield(namespace: "google", key: "custom_label_2") { value }
        label3: metafield(namespace: "google", key: "custom_label_3") { value }
        label4: metafield(namespace: "google", key: "custom_label_4") { value }
        variants(first: 100) {
          nodes {
            id
            title
            sku
            barcode
            availableForSale
            weight
            weightUnit
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            image { url }
            legacyId: metafield(namespace: "google", key: "legacy_id") { value }
          }
        }
      }
    }
  }
`;

async function fetchPage(cursor: string | null): Promise<{
  nodes: FeedProduct[];
  hasNextPage: boolean;
  endCursor: string | null;
}> {
  if (!env.SHOPIFY_STORE_DOMAIN || !env.SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Shopify env not configured");
  }
  const res = await fetch(
    `https://${env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: FEED_QUERY, variables: { cursor } }),
      // Hourly ISR so Merchant Center's daily fetch always sees fresh
      // stock + prices without re-querying Shopify on every request.
      next: { revalidate: 3600, tags: ["shopify:catalogue"] },
    },
  );
  if (!res.ok) throw new Error(`Shopify ${res.status} ${res.statusText}`);
  const json = (await res.json()) as {
    data?: { products: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: FeedProduct[] } };
    errors?: Array<{ message: string }>;
  };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  const products = json.data!.products;
  return { nodes: products.nodes, hasNextPage: products.pageInfo.hasNextPage, endCursor: products.pageInfo.endCursor };
}

/** Page through every product (250/page). */
async function fetchAllProducts(): Promise<FeedProduct[]> {
  const all: FeedProduct[] = [];
  let cursor: string | null = null;
  // Hard cap the loop so a Storefront pagination bug can never spin forever.
  for (let i = 0; i < 50; i++) {
    const page = await fetchPage(cursor);
    all.push(...page.nodes);
    if (!page.hasNextPage || !page.endCursor) break;
    cursor = page.endCursor;
  }
  return all;
}

function isExcluded(p: FeedProduct): boolean {
  if (p.isGiftCard) return true;
  if (EXCLUDED_TYPES.has(p.productType)) return true;
  if (p.tags?.some((t) => t.toLowerCase() === "google-exclude")) return true;
  if (p.exclude?.value?.toLowerCase() === "true") return true;
  return false;
}

const WEIGHT_UNIT: Record<string, string> = {
  KILOGRAMS: "kg",
  GRAMS: "g",
  POUNDS: "lb",
  OUNCES: "oz",
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Plain-text, whitespace-collapsed, length-capped. */
function clean(s: string, max: number): string {
  const flat = (s ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return flat.length > max ? flat.slice(0, max) : flat;
}

function tag(name: string, value: string): string {
  return `    <${name}>${escapeXml(value)}</${name}>`;
}

function itemXml(p: FeedProduct, v: FeedVariant, siteUrl: string): string {
  const multi = p.variants.nodes.length > 1;
  const vid = numericId(v.id);
  const id = v.legacyId?.value || v.sku || vid;
  const title = clean(v.title !== "Default Title" ? `${p.title} - ${v.title}` : p.title, 150);
  const description = clean(p.description || p.title, 5000);
  const link =
    `${siteUrl}/shop/${p.handle}` + (multi ? `?variant=${vid}` : "");
  const imageLink = v.image?.url || p.featuredImage?.url || "";
  const price = Number(v.price.amount);
  const compareAt = v.compareAtPrice ? Number(v.compareAtPrice.amount) : 0;
  const onSale = compareAt > price;
  const gtinOk = isValidGtin(v.barcode);

  const lines: string[] = [
    tag("g:id", id),
    tag("g:title", title),
    tag("g:description", description),
    tag("g:link", link),
    tag("g:condition", "new"),
    tag("g:availability", v.availableForSale ? "in_stock" : "out_of_stock"),
    tag("g:price", `${(onSale ? compareAt : price).toFixed(2)} GBP`),
  ];
  if (onSale) lines.push(tag("g:sale_price", `${price.toFixed(2)} GBP`));
  if (imageLink) lines.push(tag("g:image_link", imageLink));
  // Additional images: other product images, excluding the main one, up to 10.
  p.images.nodes
    .map((n) => n.url)
    .filter((u) => u && u !== imageLink)
    .slice(0, 10)
    .forEach((u) => lines.push(tag("g:additional_image_link", u)));
  if (p.vendor) lines.push(tag("g:brand", p.vendor));
  if (gtinOk) lines.push(tag("g:gtin", v.barcode!.trim()));
  else lines.push(tag("g:identifier_exists", "no"));
  if (p.productType) lines.push(tag("g:product_type", p.productType));
  if (p.googleCategory?.value) lines.push(tag("g:google_product_category", p.googleCategory.value));
  if (multi) lines.push(tag("g:item_group_id", numericId(p.id)));
  if (v.weight && v.weight > 0 && v.weightUnit && WEIGHT_UNIT[v.weightUnit]) {
    lines.push(tag("g:shipping_weight", `${v.weight} ${WEIGHT_UNIT[v.weightUnit]}`));
  }
  [p.label0, p.label1, p.label2, p.label3, p.label4].forEach((mf, i) => {
    if (mf?.value) lines.push(tag(`g:custom_label_${i}`, mf.value));
  });

  return `  <item>\n${lines.join("\n")}\n  </item>`;
}

/** Build the full Google Merchant RSS 2.0 feed XML. */
export async function buildGoogleFeed(siteUrl: string): Promise<string> {
  const base = siteUrl.replace(/\/$/, "");
  const products = await fetchAllProducts();
  const items: string[] = [];
  for (const p of products) {
    if (isExcluded(p)) continue;
    for (const v of p.variants.nodes) {
      items.push(itemXml(p, v, base));
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>House of Willow Alexander</title>
    <link>${escapeXml(base)}</link>
    <description>House of Willow Alexander product feed</description>
${items.join("\n")}
  </channel>
</rss>`;
}
