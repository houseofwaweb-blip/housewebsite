"use client";

import * as React from "react";
import { klaviyoTrack, klaviyoTrackViewedItem } from "@/lib/klaviyo/client";
import { gaEventReady } from "@/lib/google/ga4";
import { numericId } from "@/lib/commerce/gtin";

/**
 * Fires, once per product view:
 *   - GA4 `view_item` (via gaEventReady, so it survives a direct/first ad
 *     landing — see ga4.ts). item_id = SKU, matching the feed g:id.
 *   - Klaviyo "Viewed Product" + trackViewedItem (browse-abandonment flow;
 *     no-ops until klaviyo.js is loaded, i.e. marketing consent granted).
 *
 * Server-fed from the PDP so it has the full product (id, brand, collection,
 * price). This is the single place GA4 view_item fires — ProductBuy no longer
 * fires it, so there's no double-count.
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

    // GA4 view_item — one per product view, incl. first/direct ad landings.
    // item_id = SKU so GA4/Ads line up with the feed g:id.
    gaEventReady("view_item", {
      currency: "GBP",
      value: price,
      items: [
        {
          item_id: sku || handle,
          item_name: title,
          item_brand: brand,
          item_category: categories[0],
          price,
          quantity: 1,
        },
      ],
    });

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
