"use client";

import * as React from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Captures first-touch ad attribution (landing page + UTMs + click ids) into
 * sessionStorage on mount. Rendered once in the root layout. Renders nothing.
 */
export function AttributionCapture() {
  React.useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
