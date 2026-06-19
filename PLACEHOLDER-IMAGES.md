# Placeholder images — to source and replace

Tracking for every image block currently rendered as a marked **"Placeholder image"**
on the live site. Each was added because the Designer Handover Guide calls for a
visual the House has not yet supplied. Replace each with a real asset when ready.

**How to replace one:** in the listed file, swap the `<PlaceholderImage … />`
component for a Next.js `<Image src="/…" … />` (drop the asset in `/public`), or,
for a CMS-driven image, wire it to Sanity. The placeholder component lives at
`src/components/marketing/PlaceholderImage.tsx`.

---

| # | Page | URL | Section | File | What it should show | Ratio / size | Status |
|---|------|-----|---------|------|---------------------|--------------|--------|
| 1 | Homepage | `/` | Origin pulse ("Cultivated from a garden studio") | `src/app/page.tsx` (Origin section) | The original garden studio: soil, seasons, a single electric van, regenerative planting. Lineage / care mood per deck slide 28 (Victorian domestic authority + gardens, front doors, seasonal maintenance). Warm, tactile, British. | 4:5 portrait, ~760×950 | ☐ Pending |

---

## Notes
- The deck's wider **visual-identity** asks (slide 27: restore floral linework as
  frame / border / monogram; slide 29: editorial chaptering, let images breathe)
  are design-system work, not single drop-in images, so they are not listed here.
  Flag if you want placeholder treatments for those too.
- The **HoWA page** (`/howa`) deliberately runs a different "instrument" skin, so
  the House-standard proof strip (slide 19) was left off it to avoid a visual
  clash. Its trust is carried by the Security / Partners / Score sections instead.
- **Marketplace "collections as rooms"** (slide 25) needs new Shopify collections
  curated by the House (kitchen, garden, laundry, table, threshold, tools, gifts,
  seasonal keeping). That is data, not an image.
