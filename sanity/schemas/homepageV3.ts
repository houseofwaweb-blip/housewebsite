import { defineField, defineType } from "sanity";

/**
 * Homepage V3 — Product-first flow.
 *
 * Order intentionally puts HoWA at the top, proves it works, then ladders the
 * three tiers (HoWA · HoWA+ · Steward) before showing what membership unlocks.
 *
 * Section sequence:
 *  1. Hero (HoWA-led)
 *  2. HoWA Showcase (3 phones + features)
 *  3. Workflow Strip + Stats (proof)
 *  4. Tier Ladder (HoWA · HoWA+ · Steward — new)
 *  5. Pillars (what membership unlocks: Design / Protect / Shop / Hearth)
 *  6. Powered by
 *  7. Final CTA
 *
 * Reuses image references already on Sanity from homepageV2.
 */
export const homepageV3 = defineType({
  name: "homepageV3",
  title: "Homepage (v3 — Product-first)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "howa", title: "HoWA Showcase" },
    { name: "workflow", title: "Workflow + Stats" },
    { name: "tiers", title: "Tier Ladder" },
    { name: "pillars", title: "Pillars" },
    { name: "protect", title: "Protect" },
    { name: "powered", title: "Powered by" },
    { name: "final", title: "Final CTA" },
  ],

  fields: [
    /* ---------- Hero ---------- */
    defineField({ name: "heroEyebrow", type: "string", group: "hero" }),
    defineField({
      name: "heroHeadline",
      title: "Headline (use *italic emphasis*)",
      type: "text", rows: 2, group: "hero",
    }),
    defineField({ name: "heroLede", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", type: "string", group: "hero" }),
    defineField({ name: "heroPrimaryCtaHref", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaLabel", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaSub", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaHref", type: "string", group: "hero" }),
    defineField({
      name: "heroImage", type: "image", group: "hero",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    }),
    defineField({ name: "heroOverlayHeading", type: "string", group: "hero" }),
    defineField({ name: "heroOverlayTagline", type: "text", rows: 3, group: "hero" }),

    /* ---------- HoWA Showcase ---------- */
    defineField({ name: "howaSubtitle", type: "string", group: "howa" }),
    defineField({ name: "howaLede", type: "text", rows: 3, group: "howa" }),
    defineField({ name: "howaLinkLabel", type: "string", group: "howa" }),
    defineField({ name: "howaLinkHref", type: "string", group: "howa" }),
    defineField({
      name: "howaPhones", type: "array", group: "howa", validation: (r) => r.length(3),
      of: [defineField({
        name: "phoneScreen", type: "object",
        fields: [
          defineField({
            name: "image", type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string" }],
          }),
          defineField({
            name: "hoverImage", type: "image",
            description: "Full-bleed background that fades in when this phone is hovered. Optional.",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string" }],
          }),
          defineField({ name: "tier", type: "string" }),
        ],
        preview: { select: { title: "tier", media: "image" } },
      })],
    }),
    defineField({
      name: "howaFeatures", type: "array", group: "howa", validation: (r) => r.length(4),
      of: [defineField({
        name: "feature", type: "object",
        fields: [
          defineField({ name: "icon", type: "string" }),
          defineField({ name: "heading", type: "string" }),
          defineField({ name: "body", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "heading", subtitle: "icon" } },
      })],
    }),
    defineField({ name: "howaCtaLabel", type: "string", group: "howa" }),
    defineField({ name: "howaCtaHref", type: "string", group: "howa" }),

    /* ---------- Workflow + Stats ---------- */
    defineField({
      name: "workflowEyebrow",
      title: "Eyebrow above section title",
      type: "string", group: "workflow",
    }),
    defineField({
      name: "workflowTitle",
      title: "Section title (centred)",
      type: "string", group: "workflow",
    }),
    defineField({
      name: "workflowSub",
      title: "Sub-title under section title",
      type: "text", rows: 2, group: "workflow",
    }),
    defineField({ name: "workflowLeadIcon", type: "string", group: "workflow" }),
    defineField({
      name: "workflowSteps", type: "array", group: "workflow", validation: (r) => r.length(4),
      of: [defineField({
        name: "step", type: "object",
        fields: [
          defineField({ name: "heading", type: "string" }),
          defineField({ name: "sub", type: "string", description: "Wrap a value in *asterisks* to gold-highlight it" }),
        ],
        preview: { select: { title: "heading", subtitle: "sub" } },
      })],
    }),
    defineField({
      name: "stats", type: "array", group: "workflow", validation: (r) => r.length(4),
      of: [defineField({
        name: "stat", type: "object",
        fields: [
          defineField({ name: "num", type: "string" }),
          defineField({ name: "label", type: "string" }),
        ],
        preview: { select: { title: "num", subtitle: "label" } },
      })],
    }),

    /* ---------- Tier Ladder (NEW) ---------- */
    defineField({
      name: "tiersEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "tiers",
      description: "Small line above the heading",
    }),
    defineField({
      name: "tiersTitle",
      title: "Section heading",
      type: "string",
      group: "tiers",
    }),
    defineField({
      name: "tiersSub",
      title: "Section sub",
      type: "text", rows: 2,
      group: "tiers",
    }),
    defineField({
      name: "tiers",
      title: "Tiers (3, in order: free → core → premium)",
      type: "array",
      group: "tiers",
      validation: (r) => r.length(3),
      of: [
        defineField({
          name: "tier",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", description: "e.g. HoWA, HoWA+, Steward" }),
            defineField({ name: "price", type: "string", description: "e.g. Free to start, £16.99 / month, By application" }),
            defineField({ name: "tagline", type: "string", description: "Italic positioning line" }),
            defineField({ name: "body", type: "text", rows: 2 }),
            defineField({
              name: "inclusions",
              title: "What's included (bullets)",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "ctaLabel", type: "string" }),
            defineField({ name: "ctaHref", type: "string" }),
            defineField({
              name: "tone",
              title: "Visual tone",
              type: "string",
              options: {
                list: [
                  { title: "Quiet (cream)", value: "quiet" },
                  { title: "Active (cream + gold border)", value: "active" },
                  { title: "Premium (sage band)", value: "premium" },
                ],
              },
              initialValue: "quiet",
            }),
          ],
          preview: { select: { title: "name", subtitle: "price" } },
        }),
      ],
    }),

    /* ---------- Pillars ---------- */
    defineField({
      name: "pillarsEyebrow", type: "string", group: "pillars",
      description: "Small eyebrow above the title (optional)",
    }),
    defineField({
      name: "pillarsTitle", type: "string", group: "pillars",
      description: "Section title, centred",
    }),
    defineField({
      name: "pillarsSub", type: "text", rows: 2, group: "pillars",
      description: "Sub-title (optional)",
    }),
    defineField({
      name: "pillars", type: "array", group: "pillars", validation: (r) => r.length(4),
      of: [defineField({
        name: "pillar", type: "object",
        fields: [
          defineField({ name: "name", type: "string" }),
          defineField({ name: "headline", type: "string" }),
          defineField({ name: "body", type: "text", rows: 4 }),
          defineField({
            name: "image", type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string" }],
          }),
          defineField({
            name: "hoverImage", type: "image",
            description: "Full-bleed background that fades in when this pillar is hovered. Optional.",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string" }],
          }),
          defineField({
            name: "sublinks", type: "array",
            of: [defineField({
              name: "link", type: "object",
              fields: [
                defineField({ name: "label", type: "string" }),
                defineField({ name: "href", type: "string" }),
              ],
            })],
          }),
          defineField({ name: "ctaLabel", type: "string" }),
          defineField({ name: "ctaHref", type: "string" }),
        ],
        preview: { select: { title: "name", subtitle: "headline", media: "image" } },
      })],
    }),

    /* ---------- Protect (deep-dive: Insurance lead + Protection follow) ---------- */
    defineField({
      name: "protectEyebrow", type: "string", group: "protect",
      description: "Small eyebrow, e.g. 'Protect'",
    }),
    defineField({
      name: "protectTitle", type: "string", group: "protect",
      description: "Section title (centred)",
    }),
    defineField({
      name: "protectSub", type: "text", rows: 2, group: "protect",
      description: "Sub-title (optional)",
    }),
    defineField({
      name: "protectBlocks",
      title: "Protect blocks (2 — Insurance lead, Protection Review follow)",
      type: "array", group: "protect", validation: (r) => r.length(2),
      of: [
        defineField({
          name: "protectBlock", type: "object",
          fields: [
            defineField({ name: "label", type: "string", description: "e.g. INSURANCE / PROTECTION REVIEW" }),
            defineField({ name: "headline", type: "string" }),
            defineField({ name: "body", type: "text", rows: 3 }),
            defineField({
              name: "image", type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string" }],
            }),
            defineField({
              name: "bullets",
              title: "Optional bullet points",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "ctaLabel", type: "string" }),
            defineField({ name: "ctaHref", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "headline", media: "image" } },
        }),
      ],
    }),

    /* ---------- Powered by ---------- */
    defineField({ name: "poweredByTitle", type: "string", group: "powered" }),
    defineField({
      name: "poweredByItems", type: "array", group: "powered", validation: (r) => r.length(4),
      of: [defineField({
        name: "item", type: "object",
        fields: [
          defineField({ name: "icon", type: "string" }),
          defineField({ name: "label", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "label", subtitle: "icon" } },
      })],
    }),

    /* ---------- Final CTA ---------- */
    defineField({ name: "finalCtaStatement", type: "text", rows: 2, group: "final" }),
    defineField({ name: "finalCtaSub", type: "text", rows: 2, group: "final" }),
    defineField({ name: "finalCtaPrimaryLabel", type: "string", group: "final" }),
    defineField({ name: "finalCtaPrimaryHref", type: "string", group: "final" }),
    defineField({ name: "finalCtaSecondaryLabel", type: "string", group: "final" }),
    defineField({ name: "finalCtaSecondaryHref", type: "string", group: "final" }),
  ],

  preview: { prepare: () => ({ title: "Homepage (v3 — Product-first)" }) },
});
