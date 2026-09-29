/**
 * Shared product-identifier helpers used by the Google feed, the shop catalogue
 * and the product page, so GTIN validation + gid parsing are identical
 * everywhere (Google flags a feed/page mismatch).
 */

/** GTIN-8/12/13/14 mod-10 checksum validation. */
export function isValidGtin(raw: string | null | undefined): boolean {
  if (!raw) return false;
  const digits = raw.trim();
  if (!/^\d+$/.test(digits)) return false;
  if (![8, 12, 13, 14].includes(digits.length)) return false;
  const nums = digits.split("").map(Number);
  const check = nums.pop()!;
  // Weight is 3 for the rightmost data digit, alternating 1/3 leftwards.
  let sum = 0;
  for (let i = nums.length - 1, w = 3; i >= 0; i--, w = w === 3 ? 1 : 3) {
    sum += nums[i] * w;
  }
  return (10 - (sum % 10)) % 10 === check;
}

/** Numeric id from a Shopify gid, e.g. gid://shopify/ProductVariant/123 -> "123". */
export function numericId(gid: string): string {
  const m = gid.match(/(\d+)(?:\?.*)?$/);
  return m ? m[1] : gid;
}
