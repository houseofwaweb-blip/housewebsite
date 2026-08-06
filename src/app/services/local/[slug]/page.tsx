import { redirect } from "next/navigation";

/**
 * /services/local/[slug] — the locality long-tail service pages are retired in
 * the Aug 2026 refocus (the service businesses run their own local pages).
 * Redirect to the services directory.
 */
export default function LocalServiceRedirect() {
  redirect("/services");
}
