import { redirect } from "next/navigation";

/**
 * /howa/assistant — legacy route for the "Ask HoWA" page.
 *
 * The free tier was renamed Assistant → Ask HoWA (Sept 2026), so the page now
 * lives at /howa/ask. This route redirects there to keep old links working.
 */
export default function AssistantRedirect() {
  redirect("/howa/ask");
}
