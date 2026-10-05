/**
 * Delivery copy by shipping label, kept in one place so the PDP price line, the
 * "Shipping & returns" accordion and anywhere else stay in step with the live
 * Shopify rates (updated 5 Oct 2026: free over £75; large £12.99; two-person
 * furniture £39.99). British English, no em dashes.
 */
export type ShippingLabel = "large" | "furniture" | null;

/** One-line delivery note shown under the price. */
export function deliveryLine(label: ShippingLabel): string {
  switch (label) {
    case "large":
      return "Large item delivery £12.99 · Not included in free delivery";
    case "furniture":
      return "Two-person furniture delivery £39.99 · We’ll call to arrange a day";
    default:
      return "Free UK delivery over £75 · Standard £4.99";
  }
}

/** The "Shipping & returns" accordion delivery paragraph. */
export function deliveryAccordionText(label: ShippingLabel): string {
  switch (label) {
    case "large":
      return "This is a large item, so it travels by tracked courier for £12.99. Large item delivery isn’t included in free delivery. We’ll email your tracking details when it’s dispatched.";
    case "furniture":
      return "This piece is delivered by a two-person team for £39.99. We’ll contact you to arrange a delivery day. Not included in free delivery.";
    default:
      return "Free UK delivery on orders over £75, otherwise Standard £4.99 (2–3 working days) or Express £6.99 (1–2 working days).";
  }
}
