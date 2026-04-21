import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      initialValue: "House of Willow Alexander",
      readOnly: true,
    }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({
      name: "headerCtaLabelLive",
      type: "string",
      description: "CTA label when HoWA Product is live (e.g. 'Start HoWA').",
      initialValue: "Start HoWA",
    }),
    defineField({
      name: "headerCtaLabelFallback",
      type: "string",
      description: "CTA label when HoWA Product is not yet live.",
      initialValue: "Book consultation",
    }),
    defineField({
      name: "footerCopy",
      type: "text",
      rows: 2,
      initialValue: "Ownership is passive. Stewardship is intentional.",
    }),
    defineField({
      name: "socialHandles",
      type: "object",
      fields: [
        { name: "instagram", type: "string" },
        { name: "linkedin", type: "string" },
        { name: "twitter", type: "string" },
      ],
    }),
    defineField({ name: "defaultSeo", type: "seo" }),
  ],
});
