import { redirect } from "next/navigation";

/**
 * /howa/cinema → /the-unordinary. The Bureau / unOrdinary world now lives at the
 * dedicated campaign landing (brief §26); this old route redirects so nothing is
 * orphaned. House Cinema (real films) remains at /cinema, still in the nav.
 */
export default function HowaCinemaRedirect() {
  redirect("/the-unordinary");
}
