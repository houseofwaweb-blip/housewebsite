import { redirect } from "next/navigation";

/**
 * /design/sample — the AI "first design" sample reveal is retired in the Aug
 * 2026 eComm/Insurance refocus. Redirect to the Design overview.
 */
export default function DesignSampleRedirect() {
  redirect("/design");
}
