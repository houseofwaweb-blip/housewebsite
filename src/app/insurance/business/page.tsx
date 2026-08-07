import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { getBusinessPage } from "@/lib/insurance/business-pages";
import { BusinessPage } from "@/components/insurance/BusinessPage";
import { insuranceOg } from "@/lib/insurance/og";

/** E1 · /insurance/business, the commercial hub (warm B2B, the silent review). */
export function generateMetadata(): Metadata {
  const page = getBusinessPage("business");
  return {
    title: page?.metaTitle ?? "Business insurance",
    description: page?.metaDescription,
    ...insuranceOg("business", page?.metaTitle ?? "Business insurance"),
  };
}

export default function BusinessHub() {
  const page = getBusinessPage("business");
  if (!page) notFound();
  return <BusinessPage data={page} turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} />;
}
