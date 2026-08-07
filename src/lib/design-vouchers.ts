/**
 * Design vouchers (Aug 2026 strip-back).
 *
 * Each design package — interiors and gardens — is sold as a *voucher*: a
 * hidden Shopify product bought straight from its design page and added to the
 * basket. These products are deliberately NOT listed in /shop; keep them out of
 * the collection the shop grid queries so they only ever sell from here.
 *
 * TO GO LIVE: create each product in Shopify, then paste its Storefront variant
 * GID below (looks like "gid://shopify/ProductVariant/1234567890"). Until a
 * variantId is set, the package card shows "Enquire" instead of "Buy voucher".
 */
export type DesignVoucher = {
  /** Shopify Storefront variant GID. Empty until the product is created. */
  variantId?: string;
  /** Shopify product handle (used for the basket line). */
  handle?: string;
};

export const DESIGN_VOUCHERS: Record<string, DesignVoucher> = {
  // Interiors — delivered by Delve Interiors
  "The House Edit": { handle: "the-house-edit-1", variantId: "gid://shopify/ProductVariant/57079988552006" },
  "Additions to Your Edit": { handle: "additions-to-your-edit", variantId: "gid://shopify/ProductVariant/57079988617542" },
  "The Full House Edit": { handle: "the-full-house-edit-1", variantId: "gid://shopify/ProductVariant/57079988650310" },
  // Gardens — delivered by Willow Alexander Gardens
  "Planting Plans": { handle: "planting-plans-1", variantId: "gid://shopify/ProductVariant/57079988715846" },
  "Concept Plans": { handle: "concept-plans-1", variantId: "gid://shopify/ProductVariant/57079988748614" },
  "2D & 3D Plans": { handle: "2d-3d-plans-1", variantId: "gid://shopify/ProductVariant/57079988781382" },
};

export function getDesignVoucher(name: string): DesignVoucher | undefined {
  return DESIGN_VOUCHERS[name];
}
