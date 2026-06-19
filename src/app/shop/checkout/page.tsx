import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Shop",
  description: "Review your order before secure payment.",
  // Checkout is never indexed (no SEO value, cart-dependent).
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
