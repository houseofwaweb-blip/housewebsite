import type { Metadata } from "next";
import { ConfirmationClient } from "./ConfirmationClient";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function ConfirmationPage() {
  return <ConfirmationClient />;
}
