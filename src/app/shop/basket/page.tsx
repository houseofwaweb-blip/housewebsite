import type { Metadata } from "next";
import { BasketClient } from "./BasketClient";

export const metadata: Metadata = {
  title: "Your basket",
  robots: { index: false, follow: true },
};

export default function BasketPage() {
  return <BasketClient />;
}
