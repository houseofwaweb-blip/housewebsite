"use client";

import * as React from "react";
import { klaviyoTrack, klaviyoTrackViewedItem } from "@/lib/klaviyo/client";
import { numericId } from "@/lib/commerce/gtin";

/**
 * Fires Klaviyo "Viewed Product" + trackViewedItem on each product view, for
 * the browse-abandonment flow (KLAVIYO-onsite-tracking brief). No-ops until
 * klaviyo.js is loaded, i.e. the visitor has granted marketing consent.
 *
 * Server-fed from the PDP so it has the full product (id, brand, collections),
 * unlike ProductBuy which only carries what the buy row needs. GA4 view_item
 * stays in ProductBuy; this is Klaviyo-only, so the two don't overlap.
 */
export function ProductViewTracking({
  productId,
  title,
  handle,
  sku,
  brand,
  categories,
  imageUrl,
  price,
  compareAtPrice,
}: {
  productId?: string;
  title: string;
  handle: string;
  sku?: string;
  brand?: string;
  categories: string[];
  imageUrl?: string;
  price: number;
  compareAtPrice?: number;
}) {
  React.useEffect(() => {
    const pid = productId ? numericId(productId) : undefined;
    const url = `https://willowalexander.co.uk/shop/${handle}`;
    klaviyoTrack("Viewed Product", {
      ProductName: title,
      ProductID: pid,
      SKU: sku,
      Brand: brand,
      Categories: categories,
      ImageURL: imageUrl,
      URL: url,
      Price: price,
      CompareAtPrice: compareAtPrice,
    });
    klaviyoTrackViewedItem({
      Title: title,
      ItemId: pid ?? sku ?? handle,
      Categories: categories,
      ImageUrl: imageUrl,
      Url: url,
      Metadata: { Brand: brand, Price: price },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  return null;
}
