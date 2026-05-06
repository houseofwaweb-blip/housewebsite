import { defineField, defineType } from "sanity";

/**
 * HoWA Lander V2 — singleton document.
 *
 * Public landing page for HoWA. One singleton, explicit fields per section.
 * Spec: see designs/howa-lander-finally-understood reference.
 *
 * Sections:
 *  1. Header (cream nav)
 *  2. Hero (split: copy left + cross-section right with annotations)
 *  3. Tier showcase (3 phones: Assistant / Housekeeper / Steward)
 *  4. Workflow strip (lead icon + 4 steps + small image)
 *  5. Powered by (4 trust items)
 *  6. Final CTA (Step into stewardship)
 */
export const howaLanderV2 = defineType({
  name: "howaLanderV2",
  title: "HoWA Lander (v2)",
  type: "document",
  groups: [
    { name: "header", title: "Header" },
    { name: "hero", title: "Hero" },
    { name: "tiers", title: "Tier Showcase" },
    { name: "workflow", title: "Workflow Strip" },
    { name: "powered", title: "Powered By" },
    { name: "final", title: "Final CTA" },
  ],

  fields: [
    /* ---------- Header ---------- */
    defineField({
      name: "headerLogoCaption",
      title: "Logo caption (under HoWA mark)",
      type: "string",
      group: "header",
      initialValue: "The Home Operating System",
    }),
    defineField({
      name: "headerNavItems",
      title: "Nav items",
      type: "array",
      group: "header",
      of: [
        defineField({
          name: "navItem",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "headerCtaLabel",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "headerCtaHref",
      type: "string",
      group: "header",
    }),

    /* ---------- Hero ---------- */
    defineField({
      name: "heroEyebrow",
      title: "Small eyebrow above headline",
      type: "string",
      description: "e.g. 'House № 1892'",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline (use *italic* for emphasis)",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroSubEyebrow",
      title: "Sub-eyebrow under headline",
      type: "string",
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
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaHref",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaHref",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroNextCare",
      title: "Next-care callout",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "day", type: "string" }),
        defineField({ name: "time", type: "string" }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Cross-section illustration",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
      group: "hero",
    }),
    defineField({
      name: "heroAnnotationsTop",
      title: "Top callouts (handwritten line, comma-separated values)",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
    }),
    defineField({
      name: "heroAnnotationsLeft",
      title: "Left annotations",
      type: "array",
      group: "hero",
      of: [
        defineField({
          name: "annotation",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", description: "e.g. ROOF" }),
            defineField({ name: "value", type: "string", description: "e.g. 8 years remaining" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "heroAnnotationsRight",
      title: "Right annotations",
      type: "array",
      group: "hero",
      of: [
        defineField({
          name: "annotation",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "value", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),

    /* ---------- Tier Showcase ---------- */
    defineField({
      name: "tiersTitle",
      title: "Section title",
      type: "string",
      group: "tiers",
      initialValue: "One system. Three ways to access it.",
    }),
    defineField({
      name: "tiers",
      title: "Tiers (3, in order: Assistant / Housekeeper / Steward)",
      type: "array",
      group: "tiers",
      validation: (r) => r.length(3),
      of: [
        defineField({
          name: "tier",
          type: "object",
          fields: [
            defineField({ name: "numeral", type: "string", description: "e.g. I, II, III" }),
            defineField({ name: "name", type: "string", description: "e.g. ASSISTANT" }),
            defineField({
              name: "tagline",
              type: "string",
              description: "Italic tagline e.g. 'The house, aware.'",
            }),
            defineField({
              name: "phoneImage",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string" }],
            }),
            defineField({
              name: "features",
              title: "Bullet features",
              type: "array",
              of: [
                defineField({
                  name: "feature",
                  type: "object",
                  fields: [
                    defineField({ name: "icon", type: "string", description: "Lucide icon name" }),
                    defineField({ name: "label", type: "string" }),
                  ],
                  preview: { select: { title: "label", subtitle: "icon" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "name", subtitle: "tagline" } },
        }),
      ],
    }),

    /* ---------- Workflow Strip ---------- */
    defineField({
      name: "workflowTitle",
      type: "string",
      description: "e.g. 'Prevents problems before they cost you.'",
      group: "workflow",
    }),
    defineField({
      name: "workflowLeadIcon",
      type: "string",
      description: "Lucide icon name. Default: clipboard-check",
      group: "workflow",
      initialValue: "clipboard-check",
    }),
    defineField({
      name: "workflowSteps",
      title: "Steps (4, with arrows between)",
      type: "array",
      group: "workflow",
      validation: (r) => r.length(4),
      of: [
        defineField({
          name: "step",
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({
              name: "sub",
              type: "string",
              description: "Wrap a value in *asterisks* to gold-highlight it",
            }),
          ],
          preview: { select: { title: "heading", subtitle: "sub" } },
        }),
      ],
    }),
    defineField({
      name: "workflowSideImage",
      title: "Optional small image at right edge",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
      group: "workflow",
    }),

    /* ---------- Powered By ---------- */
    defineField({
      name: "poweredByTitle",
      type: "string",
      group: "powered",
      initialValue: "Powered by the House of Willow Alexander",
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
            defineField({ name: "label", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        }),
      ],
    }),

    /* ---------- Final CTA ---------- */
    defineField({
      name: "finalHeadline",
      type: "string",
      group: "final",
      initialValue: "Step into stewardship.",
    }),
    defineField({
      name: "finalSub",
      type: "string",
      group: "final",
      initialValue: "Understand. Protect. Perform.",
    }),
    defineField({
      name: "finalCtaLabel",
      type: "string",
      group: "final",
    }),
    defineField({
      name: "finalCtaHref",
      type: "string",
      group: "final",
    }),
  ],

  preview: { prepare: () => ({ title: "HoWA Lander (v2)" }) },
});
