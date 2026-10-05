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

/**
 * Feed-only description overrides, by handle. The Shopify copy is left as-is;
 * this only changes what goes to Merchant Center, for policy reasons.
 */
const FEED_DESCRIPTION_OVERRIDES: Record<string, string> = {
  // Google disapproved the herb-seed copy as a healthcare/misleading claim
  // ("found to support a good night's sleep", "hypnotics/nervines"). Neutral,
  // feed-only rewrite (launch-day feed follow-ups doc §2a).
  "sweet-dreams-garden-organic-herb-seeds":
    "A collection of six organic herb seeds, chamomile among them, chosen for a calm evening garden. Grow them on a sunny windowsill or in the border. Earthsong Seeds.",
};

/**
 * productType -> Google product taxonomy. Fallback used only when the Shopify
 * `google.google_product_category` metafield is absent (the metafield wins).
 * Without a category Google guesses, which filed the wearables under Apparel and
 * demanded age_group/gender/colour/size (launch-day feed follow-ups doc §2b).
 * Unmapped types keep the prior behaviour (metafield or none).
 */
const PRODUCT_TYPE_TO_GOOGLE_CATEGORY: Record<string, string> = {
  // Clothing (see APPAREL_TYPES — these also get age_group/gender/colour/size)
  Hats: "Apparel & Accessories > Clothing Accessories > Hats",
  Jackets: "Apparel & Accessories > Clothing > Outerwear > Coats & Jackets",
  Gilets: "Apparel & Accessories > Clothing > Outerwear > Coats & Jackets",
  // Named like clothing but NOT apparel -> Home & Garden, so no apparel attrs
  Aprons: "Home & Garden > Kitchen & Dining > Kitchen Tools & Utensils > Aprons",
  "Bags & Accessories": "Apparel & Accessories > Handbags, Wallets & Cases > Handbags",
  // Decor
  "Home Décor": "Home & Garden > Decor",
  Decor: "Home & Garden > Decor",
  Decorations: "Home & Garden > Decor",
  "Home Accessories": "Home & Garden > Decor",
  Ornaments: "Home & Garden > Decor",
  "Sculptures & Statues": "Home & Garden > Decor > Sculptures & Statues",
  "Artificial Flora": "Home & Garden > Decor > Artificial Flora",
  "Vases & Planters": "Home & Garden > Decor > Vases",
  Vases: "Home & Garden > Decor > Vases",
  Throws: "Home & Garden > Linens & Bedding > Bedding > Blankets",
  Rugs: "Home & Garden > Decor > Rugs",
  Runners: "Home & Garden > Decor > Rugs",
  "Chair & Sofa Cushions": "Home & Garden > Decor > Throw Pillows",
  // Fragrance & candles
  "Home Fragrance": "Home & Garden > Decor > Home Fragrances",
  "Candles & Candle Holders": "Home & Garden > Decor > Home Fragrances > Candles",
  // Lighting
  "Ceiling Lights": "Home & Garden > Lighting > Light Fixtures > Ceiling Light Fixtures",
  Lighting: "Home & Garden > Lighting > Light Fixtures",
  "Table & Desk Lamps": "Home & Garden > Lighting > Lamps",
  "Table Lamps": "Home & Garden > Lighting > Lamps",
  "Floor Lamps": "Home & Garden > Lighting > Lamps",
  // Kitchen & dining
  Serverware: "Home & Garden > Kitchen & Dining > Tableware > Serveware",
  "Serving Bowls": "Home & Garden > Kitchen & Dining > Tableware > Dinnerware > Bowls",
  Mugs: "Home & Garden > Kitchen & Dining > Tableware > Coffee & Tea Cups",
  "Pantry & Kitchen Storage": "Home & Garden > Kitchen & Dining > Food Storage",
  "Food Storage": "Home & Garden > Kitchen & Dining > Food Storage",
  // Bath
  "Bathroom Accessories": "Home & Garden > Bathroom Accessories",
  Toiletries: "Health & Beauty > Personal Care > Cosmetics > Bath & Body",
  Grooming: "Health & Beauty > Personal Care",
  // Household supplies / cleaning
  "Cleaning Products": "Home & Garden > Household Supplies > Household Cleaning Supplies",
  "Kitchen Cleaners": "Home & Garden > Household Supplies > Household Cleaning Supplies",
  "Bathroom Cleaners": "Home & Garden > Household Supplies > Household Cleaning Supplies",
  "Glass Cleaners": "Home & Garden > Household Supplies > Household Cleaning Supplies > Glass & Surface Cleaners",
  "Floor cleaners": "Home & Garden > Household Supplies > Household Cleaning Supplies > Floor Cleaners",
  "Washing Up Liquid": "Home & Garden > Household Supplies > Household Cleaning Supplies > Dishwashing Supplies > Dish Soap",
  "Dishwasher Tabs": "Home & Garden > Household Supplies > Household Cleaning Supplies > Dishwashing Supplies > Dishwasher Detergent",
  "Cloths & Scrubbers": "Home & Garden > Household Supplies > Household Cleaning Supplies",
  "Laundry Liquid & Sheets": "Home & Garden > Household Supplies > Laundry Supplies > Laundry Detergent",
  "Fabric Conditioner & Refreshers": "Home & Garden > Household Supplies > Laundry Supplies > Fabric Softeners & Dryer Sheets",
  "Waste Bags & Sundries": "Home & Garden > Household Supplies",
  "Household Essentials": "Home & Garden > Household Supplies",
  "Storage & Shelving": "Home & Garden > Household Supplies > Storage & Organization",
  "Storage & Utilities": "Home & Garden > Household Supplies > Storage & Organization",
  Organisers: "Home & Garden > Household Supplies > Storage & Organization",
  // Garden & outdoor
  "Garden Tools": "Home & Garden > Lawn & Garden > Gardening > Gardening Tools",
  "Gifts For Gardeners": "Home & Garden > Lawn & Garden > Gardening > Gardening Tools",
  "Plant Food": "Home & Garden > Lawn & Garden > Gardening > Plant Care, Soil & Seed Starting Supplies > Fertilizers",
  "Plant Pots": "Home & Garden > Lawn & Garden > Gardening > Pots & Planters",
  Seeds: "Home & Garden > Plants > Seeds",
  Wildlife: "Home & Garden > Lawn & Garden > Outdoor Living",
  "Garden Furniture": "Furniture > Outdoor Furniture",
  // Furniture
  "Ottomans & Pouffes": "Furniture > Ottomans",
  "Coffee & Side Tables": "Furniture > Tables > Accent Tables > Coffee Tables",
  // Media / stationery / gifting
  Books: "Media > Books",
  "Note Pads": "Office Supplies > General Office Supplies > Notebooks & Notepads",
  "Greeting Cards": "Arts & Entertainment > Party & Celebration > Gift Giving > Greeting & Note Cards",
  "Wrapping & Ribbon": "Arts & Entertainment > Party & Celebration > Gift Wrapping Supplies",
  // Pet
  "Dog Toys": "Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Toys",
  "Dog Toiletries": "Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Grooming Supplies",
  "Pet Care": "Animals & Pet Supplies > Pet Supplies",
};

/** Apparel/accessory productTypes needing age_group/gender/colour (+ size for
 *  clothing) for Merchant. "Bags & Accessories" is included so the Rei tote gets
 *  the attributes Google requires for Handbags. */
const APPAREL_TYPES = new Set(["Hats", "Jackets", "Gilets", "Bags & Accessories"]);

/**
 * Colour overrides for apparel that has NO Shopify "Colour" option and no colour
 * in its copy, so the feed can still emit g:color (Merchant disapproves apparel
 * without it). Keyed by product handle. The bucket hat is NOT here — it carries
 * a real Colour=Brown variant option, which optionValue() already reads.
 * CONFIRM these against the actual products before relying on them.
 */
const FEED_COLOR_OVERRIDES: Record<string, string> = {
  // "wax-padded-jacket": "Olive",
  // "unisex-wax-stockman-coat-with-hood": "Olive",
  // "rei-slouch-tote-bag": "Tan",
};

/** A selected-option value by option name (case-insensitive). */
function optionValue(v: FeedVariant, names: string[]): string | null {
  const want = names.map((n) => n.toLowerCase());
  for (const o of v.selectedOptions ?? []) {
    if (want.includes(o.name.toLowerCase()) && o.value && o.value !== "Default Title") {
      return o.value;
    }
  }
  return null;
}

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
  selectedOptions: Array<{ name: string; value: string }>;
  legacyId: FeedMetafield | null;
}
interface FeedProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
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
        descriptionHtml
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
            selectedOptions { name value }
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
  // Turn block-level tags into spaces BEFORE stripping, so paragraphs don't run
  // together ("home.Natural") when the HTML is flattened (feed check #1, Fix 2).
  const flat = (s ?? "")
    .replace(/<\/(p|div|li|h[1-6]|tr|blockquote|section)>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
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
  const description = clean(
    FEED_DESCRIPTION_OVERRIDES[p.handle] || p.descriptionHtml || p.description || p.title,
    5000,
  );
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
  // Category: the Shopify metafield wins; otherwise map from productType so
  // Google isn't left guessing (which mis-filed wearables under Apparel).
  const googleCategory = p.googleCategory?.value || PRODUCT_TYPE_TO_GOOGLE_CATEGORY[p.productType] || "";
  if (googleCategory) lines.push(tag("g:google_product_category", googleCategory));
  // Clothing items must carry age_group/gender/colour/size (and size variants
  // are already sent per variant with item_group_id below).
  if (APPAREL_TYPES.has(p.productType)) {
    lines.push(tag("g:age_group", "adult"));
    const gender = /\b(women|woman|ladies|female|her)\b/i.test(p.title)
      ? "female"
      : /\b(men|man|male|his)\b/i.test(p.title)
        ? "male"
        : "unisex";
    lines.push(tag("g:gender", gender));
    const color = optionValue(v, ["colour", "color"]) || FEED_COLOR_OVERRIDES[p.handle];
    if (color) lines.push(tag("g:color", color));
    // Size applies to clothing, not bags — only emit when there's a real size
    // option/variant (a tote has neither, so this stays absent for it).
    const size = optionValue(v, ["size"]) || (v.title !== "Default Title" ? v.title : null);
    if (size) lines.push(tag("g:size", size));
  }
  if (multi) lines.push(tag("g:item_group_id", numericId(p.id)));
  if (v.weight && v.weight > 0 && v.weightUnit && WEIGHT_UNIT[v.weightUnit]) {
    lines.push(tag("g:shipping_weight", `${v.weight} ${WEIGHT_UNIT[v.weightUnit]}`));
  }
  // custom_label_0 = "feed" on EVERY item, so Ads can target all feed products
  // with one label. This overrides any per-product custom_label_0 metafield;
  // custom_label_1–4 still come from their metafields.
  lines.push(tag("g:custom_label_0", "feed"));
  [p.label1, p.label2, p.label3, p.label4].forEach((mf, i) => {
    if (mf?.value) lines.push(tag(`g:custom_label_${i + 1}`, mf.value));
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
