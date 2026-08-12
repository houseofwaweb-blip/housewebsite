import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { getBusinessSpecialistPage } from "@/lib/insurance/specialist-pages";
import { SpecialistPage } from "@/components/insurance/SpecialistPage";
import { insuranceOg } from "@/lib/insurance/og";

/** E1 · /insurance/business, the commercial hub (warm B2B, the silent review).
    Renders on the shared SpecialistPage template. */
export function generateMetadata(): Metadata {
  const page = getBusinessSpecialistPage("business");
  return {
    title: page?.metaTitle ?? "Business insurance",
    description: page?.metaDescription,
    ...insuranceOg("business", page?.metaTitle ?? "Business insurance"),
  };
}

export default function BusinessHub() {
  const page = getBusinessSpecialistPage("business");
  if (!page) notFound();
  return <SpecialistPage data={page} turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} />;
}
