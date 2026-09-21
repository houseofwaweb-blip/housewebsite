import { redirect } from "next/navigation";

/**
 * /my-howa → /my-house. The account surface is branded "My HoWA" (brief §3
 * utility nav) but lives at the established /my-house route; this alias lets the
 * URL match the label when typed or linked directly.
 */
export default function MyHowaRedirect() {
  redirect("/my-house");
}
