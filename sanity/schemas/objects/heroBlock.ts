import { defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Editorial (House)", value: "editorial" },
          { title: "Operational (HoWA)", value: "operational" },
          { title: "Blueprint (Steward)", value: "blueprint" },
        ],
      },
      initialValue: "editorial",
    }),
    defineField({
      name: "eyebrow",
      type: "string",
      description: "Small-caps kicker above headline.",
    }),
    defineField({
      name: "headline",
      type: "string",
      description: "Wrap em-accent words in underscores: `A modern British _institution_`.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "sub", type: "text", rows: 3 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "imageAlt",
      type: "string",
      description: "Required for accessibility.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctas",
      type: "array",
      of: [{ type: "cta" }],
      validation: (r) => r.max(2),
    }),
  ],
});
