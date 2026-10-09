import type { Metadata } from "next";
import { Suspense } from "react";
import { RestoreClient } from "./RestoreClient";

/**
 * /shop/basket/restore — rebuilds a shopper's basket from a Klaviyo email link
 * (?lines=<variantId>:<qty>,...) and opens the drawer on /shop so they carry on
 * where they left off. A transient recovery endpoint, not a real page: keep it
 * out of the index (and robots.txt disallows it).
 */
export const metadata: Metadata = {
  title: "Restoring your basket",
  robots: { index: false, follow: false },
};

export default function BasketRestorePage() {
  return (
    <div className="bg-house-cream text-house-brown min-h-[60vh] flex items-center justify-center px-[5vw] py-24 text-center">
      <Suspense fallback={null}>
        <RestoreClient />
      </Suspense>
    </div>
  );
}
