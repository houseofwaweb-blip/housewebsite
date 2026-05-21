import { defineField, defineType } from "sanity";

/**
 * Shop product. Catalogue-only at launch (no checkout); pages render
 * straight from these documents.
 *
 * Fields are deliberately structured to map cleanly onto Shopify
 * Storefront API when we migrate later — `priceMinor` (int pence) maps
 * to `priceV2.amount`, `gallery` to product images, the House-specific
 * fields (`houseApproved`, `careNotes`, `materials`, `dimensions`) all
 * become Shopify metafields. `sourceWooId` / `sourceWooSlug` are
 * provenance only — kept for the WP redirect map.
 *
 * No CMS-driven cart logic here; this is presentation data only until
 * Shopify is live.
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "pricing", title: "Pricing & status" },
    { name: "details", title: "Details" },
    { name: "media", title: "Media" },
    { name: "provenance", title: "Migration source" },
  ],
  fields: [
    // ---- Content (default group) -------------------------------------
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "handle",
      title: "URL handle",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      description: "Used in /shop/<handle>. Avoid changing once published — it breaks inbound links.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lede",
      title: "Short description",
      type: "text",
      rows: 2,
      group: "content",
      description: "1–2 sentences. Shown under the title and used as meta description.",
    }),
    defineField({
      name: "body",
      title: "Full description",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
      description: "House-voice description. Rich text — headings, lists, emphasis.",
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
      group: "content",
      description: "e.g. Gardening, Home Accessories, Lighting. Drives /shop/collections/<slug>.",
    }),
    defineField({
      name: "brand",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "houseApproved",
      title: "House Approved",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),

    // ---- Pricing & status -------------------------------------------
    defineField({
      name: "priceMinor",
      title: "Price (in pence)",
      type: "number",
      group: "pricing",
      description: "Integer pence. £48.00 = 4800. Float-safe.",
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: "compareAtMinor",
      title: "Compare-at price (in pence)",
      type: "number",
      group: "pricing",
      description: "Optional was-price. Triggers sale badge if higher than priceMinor.",
    }),
    defineField({
      name: "currency",
      type: "string",
      group: "pricing",
      initialValue: "GBP",
      options: { list: ["GBP", "EUR", "USD"] },
    }),
    defineField({
      name: "sku",
      type: "string",
      group: "pricing",
    }),
    defineField({
      name: "availability",
      type: "string",
      group: "pricing",
      description:
        "Drives the UI pill + JSON-LD schema.org availability value.",
      initialValue: "available_soon",
      options: {
        list: [
          { title: "Available soon (default at launch)", value: "available_soon" },
          { title: "In stock", value: "in_stock" },
          { title: "Pre-order", value: "preorder" },
          { title: "Out of stock", value: "out_of_stock" },
          { title: "Discontinued", value: "discontinued" },
        ],
      },
    }),
    defineField({
      name: "onSale",
      type: "boolean",
      group: "pricing",
      initialValue: false,
    }),

    // ---- Media -------------------------------------------------------
    defineField({
      name: "primaryImage",
      title: "Primary image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        },
      ],
    }),

    // ---- Details -----------------------------------------------------
    defineField({
      name: "careNotes",
      title: "Care notes",
      type: "text",
      group: "details",
      rows: 3,
    }),
    defineField({
      name: "materials",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "dimensions",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "delivery",
      type: "text",
      group: "details",
      rows: 2,
    }),
    defineField({
      name: "relatedProducts",
      title: "Related products",
      type: "array",
      group: "details",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (r) => r.max(8),
    }),

    // ---- Provenance (migration source) ------------------------------
    defineField({
      name: "sourceWooId",
      title: "Original WooCommerce ID",
      type: "number",
      group: "provenance",
      description: "Set by the migration script. Do not edit.",
      readOnly: true,
    }),
    defineField({
      name: "sourceWooSlug",
      title: "Original WooCommerce slug",
      type: "string",
      group: "provenance",
      description: "Used to build the /shop/product/<old-slug> → /shop/<new-handle> redirect.",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Title A→Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Collection then title",
      name: "collectionTitle",
      by: [
        { field: "collection", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
    {
      title: "House Approved first",
      name: "houseApprovedFirst",
      by: [
        { field: "houseApproved", direction: "desc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "primaryImage",
      priceMinor: "priceMinor",
      currency: "currency",
      collection: "collection",
      houseApproved: "houseApproved",
      availability: "availability",
    },
    prepare({ title, media, priceMinor, currency, collection, houseApproved, availability }) {
      const price =
        typeof priceMinor === "number"
          ? `${currency === "GBP" ? "£" : currency + " "}${(priceMinor / 100).toFixed(2)}`
          : "No price";
      const flag = houseApproved ? " · House Approved" : "";
      const status = availability && availability !== "in_stock" ? ` · ${availability}` : "";
      return {
        title: `${title}${flag}`,
        subtitle: `${collection ?? "Uncategorised"} · ${price}${status}`,
        media,
      };
    },
  },
});
