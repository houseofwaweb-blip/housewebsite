import type { Metadata } from "next";
import { BasketClient } from "./BasketClient";

export const metadata: Metadata = {
  title: "Your Basket",
};

export default function BasketPage() {
  return <BasketClient />;
}
