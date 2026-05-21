import type { Metadata } from "next";
import { BasketClient } from "./BasketClient";

export const metadata: Metadata = {
  title: "Saved pieces",
};

export default function BasketPage() {
  return <BasketClient />;
}
