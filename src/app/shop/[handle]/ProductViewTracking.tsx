"use client";

import * as React from "react";
import { klaviyoTrack, klaviyoTrackViewedItem } from "@/lib/klaviyo/client";
import { numericId } from "@/lib/commerce/gtin";

/**
 * Fires Klaviyo "Viewed Product" + trackViewedItem on each product view (the
 * browse-abandonment flow; no-ops until klaviyo.js is loaded, i.e. marketing
 * consent granted).
 *
 * GA4 `view_item` is fired by ProductBuyPanel instead, so it reflects the
 * SELECTED variant (the one in ?variant), not just the product default.
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
