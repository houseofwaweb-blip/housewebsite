import { redirect } from "next/navigation";
import { getServiceBusiness } from "@/lib/service-businesses";

/**
 * /services/[slug]/[sub] — the in-site sub-service pages are retired in the Aug
 * 2026 refocus. Sub-services now live on the business sites. Redirect to the
 * parent service page (which links out to each business and its sub-services),
 * or to /services if the slug is unknown.
 */
export default async function SubServiceRedirect({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug } = await params;
  redirect(getServiceBusiness(slug) ? `/services/${slug}` : "/services");
}
