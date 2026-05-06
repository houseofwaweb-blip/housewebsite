import { defineField, defineType } from "sanity";

/**
 * Recipe — editorial content type alongside articles, musings, and news.
 * Recipes sit at /recipes and are always free to read.
 * Sourced from WP "Inspiration > Recipes" section.
 */
export const recipe = defineType({
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lede",
      type: "text",
      rows: 3,
      description: "Short description shown in listings.",
      validation: (r) => r.max(300),
    }),
    defineField({
      name: "hero",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
        { name: "caption", type: "string" },
      ],
    }),
    defineField({
      name: "body",
      type: "portableText",
      description: "Full recipe content — method, ingredients, notes.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "prepTime",
      type: "string",
      title: "Prep time",
      description: "e.g. 15 mins",
    }),
    defineField({
      name: "cookTime",
      type: "string",
      title: "Cook time",
      description: "e.g. 45 mins",
    }),
    defineField({
      name: "serves",
      type: "string",
      description: "e.g. 4, or 12 pieces",
    }),
    defineField({
      name: "season",
      type: "string",
      options: {
        list: [
          { title: "Spring", value: "Spring" },
          { title: "Summer", value: "Summer" },
          { title: "Autumn", value: "Autumn" },
          { title: "Winter", value: "Winter" },
          { title: "Year-round", value: "Year-round" },
        ],
      },
    }),
    defineField({
      name: "author",
      type: "string",
      initialValue: "House of Willow Alexander",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    {
      title: "Published (newest first)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
