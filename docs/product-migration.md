# Product migration — WooCommerce → Sanity

This is the one-time runbook to move all 501 WooCommerce products from
the static JSON dump into Sanity, so they become editable and the images
survive the WP shutdown.

## Prerequisites

Before running the script you need:

1. **Sanity Studio deployed** with the new `product` schema. The schema
   is registered in [sanity/schemas/index.ts](../sanity/schemas/index.ts) —
   just run `npm run sanity:deploy` to push it to the live Studio.
2. **`SANITY_MANAGEMENT_TOKEN` set in `.env.local`**. Generate at
   sanity.io/manage → Project → API → Tokens → "Editor" role or higher.
3. **Network access to willowalexander.co.uk** — the script downloads
   1,856 images from the live WP CDN. **Don't turn WP off until after
   this script has finished running successfully.**

## Run it

From `platform/`:

```bash
# Test with 5 products first to make sure auth + image upload work
node scripts/import-products-to-sanity.mjs --limit 5

# Verify in Sanity Studio: 5 products should appear with images.
# If anything looks wrong, delete them in Studio and re-run with fixes.

# Full run when you're happy
node scripts/import-products-to-sanity.mjs
```

The script is **idempotent** — products with existing handles are
skipped. So if it crashes mid-batch (network blip, etc.), just re-run it
and it'll pick up from where it left off.

If you want to overwrite existing docs (e.g. after a schema change):
```bash
node scripts/import-products-to-sanity.mjs --replace
```

## Expected runtime

- ~30–60 minutes for the full 501-product / 1,856-image run.
- Sanity dedupes images by SHA-1, so re-runs are very fast (existing
  assets aren't re-uploaded).
- The script logs `[123/501] → Product Title` per row so you can leave
  it running and check progress.

## After it finishes

1. **Spot-check in Sanity Studio**: open a few products, confirm images
   loaded, prices are sensible (£48.00 = `priceMinor: 4800`).
2. **Visit `/shop` on the new site** — it should now render from Sanity
   instead of the static JSON. The `pieces` count in the hero should
   match 501 (or whatever number successfully imported).
3. **Spot-check a product page** like
   `/shop/heritage-secateurs` — verify the images come from
   `cdn.sanity.io/...` not `willowalexander.co.uk/wp-content/...`.
4. **Regenerate the sitemap** by visiting `/sitemap.xml` — all 501
   product URLs should appear.
5. **Once you're confident**: WP can be turned off. The site no longer
   depends on it for product imagery.

## Editing products afterwards

Alex / anyone with Studio access can edit any field:
- Title, lede, body (full description), care notes, materials, dimensions
- Pricing (`priceMinor` in pence — £48.00 = 4800)
- Availability (`available_soon` is the launch default; flip to
  `in_stock` per product when checkout exists)
- House Approved toggle
- Primary image + gallery (drag-and-drop in Studio; Sanity handles
  thumbnails and CDN delivery)
- Related products (reference picker, max 8)

Changes appear on the live site within 1 hour (or instantly if a Sanity
webhook is wired to trigger Next.js revalidation — see PLAN.md §3.4 for
that work which is separate).

## When Shopify is wired later

The `product` schema is deliberately Shopify-compatible:

| Sanity field | Maps to Shopify |
|---|---|
| `title`, `handle`, `sku`, `body` | Direct |
| `priceMinor` (int pence) | `priceV2 { amount, currencyCode }` |
| `compareAtMinor` | `compareAtPriceV2` |
| `primaryImage`, `gallery` | Product images |
| `collection` | Tag or Collection |
| `houseApproved`, `careNotes`, `materials`, `dimensions`, `delivery` | Metafields |
| `availability` | `availableForSale` + custom metafield |
| `sourceWooId`, `sourceWooSlug` | Drop (provenance only) |

When the Shopify cutover happens, the migration is Sanity → Shopify
(small, structured) rather than starting from WC again.

## Troubleshooting

**Script exits with "Missing SANITY_PROJECT_ID or SANITY_MANAGEMENT_TOKEN"**
- Both must be set in `.env.local`. Token must have write access — the
  read-only `SANITY_READ_TOKEN` won't work for creating documents.

**"image fetch 404"**
- Some WP product images may have been deleted or moved. The script logs
  the failure and continues — the product is created without that image.
  Spot-check in Studio after the run and re-upload missing images
  manually.

**"image upload" with no further detail**
- Usually rate-limiting from Sanity. Wait 5 minutes and re-run — the
  script is idempotent and will skip the products it already created.

**Sitemap doesn't show products even after migration**
- Sitemap caches for 1 hour. Visit `/sitemap.xml` and force-refresh, or
  redeploy. The `getCmsSitemapEntries()` function queries Sanity for
  product handles each time the sitemap is built.

**Product page shows "Product not found" for a slug that exists in
Sanity**
- Static params cache. Run a Next.js rebuild, or wait for the next ISR
  revalidation. Newly-added products will appear within the
  revalidation window (1 hour by default).
