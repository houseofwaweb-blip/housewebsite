"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/meta/pixel";

/**
 * Fires Meta ViewContent on mount. Render once per product/service/plan
 * page; the helper is consent-gated, so no event fires for visitors who
 * haven't opted in to marketing.
 */
export function MetaViewContent({
  contentId,
  contentName,
  contentCategory,
  contentType = "product",
  value,
  currency = "GBP",
}: {
  contentId: string;
  contentName: string;
  contentCategory?: string;
  contentType?: "product" | "product_group";
  value?: number;
  currency?: string;
}) {
  useEffect(() => {
    trackViewContent({
      contentId,
      contentName,
      contentCategory,
      contentType,
      value,
      currency,
    });
  }, [contentId, contentName, contentCategory, contentType, value, currency]);
  return null;
}
