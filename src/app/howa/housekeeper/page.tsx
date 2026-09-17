import { redirect } from "next/navigation";

/**
 * /howa/housekeeper (the retired "HoWA+" standalone page).
 *
 * Retired Sept 2026: /howa/plans now describes every tier (HoWA Free, HoWA+,
 * HoWA Steward) in one place, so a dedicated HoWA+ page is redundant. This route
 * redirects to /howa/plans; the nav item was removed at the same time.
 */
export default function HowaPlusRedirect() {
  redirect("/howa/plans");
}
