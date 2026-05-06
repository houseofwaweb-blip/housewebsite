import { defineField, defineType } from "sanity";

/**
 * Homepage V2 — singleton document.
 *
 * One doc, explicit fields per section. Studio editors can change any text,
 * image, link, or icon without engineering work. Section ORDER is fixed in
 * the React page; structure is fixed (4 temperaments, 3 phones, 4 pillars,
 * 4 workflow steps, 4 stats, 4 trust items).
 *
 * Spec: see designs/homepage-variant-b-20260429/index.html
 */
export const homepageV2 = defineType({
  name: "homepageV2",
  title: "Homepage (v2)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "temperaments", title: "Home Temperaments" },
    { name: "howa", title: "HoWA Showcase" },
    { name: "pillars", title: "Pillars" },
    { name: "workflow", title: "Workflow + Stats" },
    { name: "powered", title: "Powered by" },
    { name: "final", title: "Final CTA" },
  ],

  fields: [
    /* ---------- Hero ---------- */
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline (use *italic emphasis* for italic words)",
      description: "Wrap words in *single asterisks* for italic emphasis (e.g. 'Beautiful living, *intelligently stewarded.*')",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroLede",
      title: "Lede paragraph",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Primary CTA label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaHref",
      title: "Primary CTA href",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Secondary CTA label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaSub",
      title: "Secondary CTA sub-label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaHref",
      title: "Secondary CTA href",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image (full-bleed right side)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      group: "hero",
    }),
    defineField({
      name: "heroOverlayHeading",
      title: "Overlay heading (under HoWA logo)",
      type: "string",
      description: "e.g. 'The Home Operating System'",
      group: "hero",
    }),
    defineField({
      name: "heroOverlayTagline",
      title: "Overlay tagline (italic)",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    /* ---------- Temperaments ---------- */
    defineField({
      name: "temperamentsTitle",
      title: "Section title",
      type: "string",
      group: "temperaments",
    }),
    defineField({
      name: "temperaments",
      title: "Temperaments (4 panels)",
      type: "array",
      group: "temperaments",
      validation: (r) => r.length(4),
      of: [
        defineField({
          name: "temperament",
          title: "Temperament",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            }),
            defineField({ name: "href", type: "string" }),
            defineField({ name: "ctaLabel", type: "string", initialValue: "Learn more" }),
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        }),
      ],
    }),

    /* ---------- HoWA Showcase ---------- */
    defineField({
      name: "howaSubtitle",
      title: "Subtitle (under logo)",
      type: "string",
      group: "howa",
    }),
    defineField({
      name: "howaLede",
      title: "Lede paragraph",
      type: "text",
      rows: 3,
      group: "howa",
    }),
    defineField({
      name: "howaLinkLabel",
      title: "Link label (e.g. 'See how HoWA works')",
      type: "string",
      group: "howa",
    }),
    defineField({
      name: "howaLinkHref",
      title: "Link href",
      type: "string",
      group: "howa",
    }),
    defineField({
      name: "howaPhones",
      title: "Phone screens (3, in order: Assistant, Housekeeper, Steward)",
      type: "array",
      group: "howa",
      validation: (r) => r.length(3),
      of: [
        defineField({
          name: "phoneScreen",
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string" }],
            }),
            defineField({ name: "tier", type: "string", description: "e.g. Assistant / Housekeeper / Steward" }),
          ],
          preview: { select: { title: "tier", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "howaFeatures",
      title: "Features (4)",
      type: "array",
      group: "howa",
      validation: (r) => r.length(4),
      of: [
        defineField({
          name: "feature",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              description: "Lucide icon name (e.g. eye, list-checks, sparkles, shield-check)",
            }),
            defineField({ name: "heading", type: "string" }),
            defineField({ name: "body", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "heading", subtitle: "icon" } },
        }),
      ],
    }),
    defineField({
      name: "howaCtaLabel",
      title: "CTA button label",
      type: "string",
      group: "howa",
    }),
    defineField({
      name: "howaCtaHref",
      title: "CTA href",
      type: "string",
      group: "howa",
    }),

    /* ---------- Pillars ---------- */
    defineField({
      name: "pillars",
      title: "Pillars (4: Design & Care · Protect · Shop · The Hearth)",
      type: "array",
      group: "pillars",
      validation: (r) => r.length(4),
      of: [
        defineField({
          name: "pillar",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", description: "e.g. Design & Care" }),
            defineField({ name: "headline", type: "string", description: "Italic display headline (use *asterisks* for emphasis)" }),
            defineField({ name: "body", type: "text", rows: 4 }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string" }],
            }),
            defineField({
              name: "sublinks",
              title: "Sub-links (optional, for first pillar)",
              type: "array",
              of: [
                defineField({
                  name: "link",
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string" }),
                    defineField({ name: "href", type: "string" }),
                  ],
                }),
              ],
            }),
            defineField({ name: "ctaLabel", type: "string", description: "Single CTA. Leave empty if using sublinks." }),
            defineField({ name: "ctaHref", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "headline", media: "image" } },
        }),
      ],
    }),

    /* ---------- Workflow + Stats ---------- */
    defineField({
      name: "workflowSteps",
      title: "Workflow steps (4, with arrows between)",
      type: "array",
      group: "workflow",
      validation: (r) => r.length(4),
      of: [
        defineField({
          name: "step",
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({ name: "sub", type: "string", description: "Short caption — wrap a value in *asterisks* to gold-highlight it" }),
          ],
          preview: { select: { title: "heading", subtitle: "sub" } },
        }),
      ],
    }),
    defineField({
      name: "workflowLeadIcon",
      title: "Lead icon (left of steps)",
      type: "string",
      description: "Lucide icon name. Default: clipboard-check",
      group: "workflow",
    }),
    defineField({
      name: "stats",
      title: "Stats (4)",
      type: "array",
      group: "workflow",
      validation: (r) => r.length(4),
      of: [
        defineField({
          name: "stat",
          type: "object",
          fields: [
            defineField({ name: "num", type: "string", description: "e.g. 247, 4.9, 0" }),
            defineField({ name: "label", type: "string" }),
          ],
          preview: { select: { title: "num", subtitle: "label" } },
        }),
      ],
    }),

    /* ---------- Powered By ---------- */
    defineField({
      name: "poweredByTitle",
      title: "Strip title",
      type: "string",
      group: "powered",
    }),
    defineField({
      name: "poweredByItems",
      title: "Trust items (4)",
      type: "array",
      group: "powered",
      validation: (r) => r.length(4),
      of: [
        defineField({
          name: "item",
          type: "object",
          fields: [
            defineField({ name: "icon", type: "string", description: "Lucide icon name" }),
            defineField({ name: "label", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        }),
      ],
    }),

    /* ---------- Final CTA ---------- */
    defineField({
      name: "finalCtaStatement",
      title: "Statement (italic display)",
      type: "text",
      rows: 2,
      group: "final",
    }),
    defineField({
      name: "finalCtaSub",
      title: "Sub-statement",
      type: "text",
      rows: 2,
      group: "final",
    }),
    defineField({
      name: "finalCtaPrimaryLabel",
      title: "Primary CTA label",
      type: "string",
      group: "final",
    }),
    defineField({
      name: "finalCtaPrimaryHref",
      title: "Primary CTA href",
      type: "string",
      group: "final",
    }),
    defineField({
      name: "finalCtaSecondaryLabel",
      title: "Secondary CTA label",
      type: "string",
      group: "final",
    }),
    defineField({
      name: "finalCtaSecondaryHref",
      title: "Secondary CTA href",
      type: "string",
      group: "final",
    }),
  ],

  preview: {
    prepare: () => ({ title: "Homepage (v2)" }),
  },
});
