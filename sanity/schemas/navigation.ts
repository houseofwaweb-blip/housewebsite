import { defineField, defineType } from "sanity";

/**
 * Navigation — singleton document controlling the site's mega menu.
 *
 * The `primaryNav` array maps directly to the MegaPanel[] type used
 * by the Header component. Each panel has a trigger label, link groups
 * with descriptions, and an optional preview image.
 *
 * If this document doesn't exist in Sanity, the site falls back to
 * the hardcoded navConfig.ts.
 */
export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "primaryNav",
      title: "Primary navigation",
      type: "array",
      of: [{ type: "megaPanel" }],
      description: "The main nav bar items and their mega menu panels.",
    }),
    defineField({
      name: "footerGroups",
      type: "array",
      of: [{ type: "navGroup" }],
      description: "Footer link groups.",
    }),
    defineField({
      name: "mobileOrder",
      type: "array",
      of: [{ type: "navItem" }],
      description: "Override ordering for mobile drawer if different from primary nav.",
    }),
  ],
});
