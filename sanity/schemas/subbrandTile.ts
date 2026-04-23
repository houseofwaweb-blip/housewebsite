import { defineField, defineType } from "sanity";

/**
 * subbrandTile — a service brand tile for the grid/carousel.
 * Each document represents one tile in the services subbrand grid.
 * Used on /partners and /services pages.
 */
export const subbrandTile = defineType({
  name: "subbrandTile",
  title: "Subbrand Tile",
  type: "document",
  icon: () => "🎨",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: 'Display name (e.g. "Gardeners", "Window\\nCleaners" — use \\n for line break).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      type: "string",
      description: "Link destination (e.g. /services/gardening).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
      description: "Brand-coloured still-life photograph.",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Sort order in the grid.",
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", media: "image" },
  },
});
