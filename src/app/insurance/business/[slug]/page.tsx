import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import {
  getBusinessSpecialistPage,
  BUSINESS_SPECIALIST_SUB_SLUGS,
} from "@/lib/insurance/specialist-pages";
import { SpecialistPage } from "@/components/insurance/SpecialistPage";
import { insuranceOg } from "@/lib/insurance/og";

/** E2/E3 · /insurance/business/[slug], trades-and-contractors, professional-indemnity.
    Rendered on the shared SpecialistPage template. */
export function generateStaticParams() {
  return BUSINESS_SPECIALIST_SUB_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getBusinessSpecialistPage(slug);
  return {
    title: page?.metaTitle ?? "Business insurance",
    description: page?.metaDescription,
    ...(page ? insuranceOg(`business-${page.slug}`, page.metaTitle) : {}),
  };
}

export default async function BusinessSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBusinessSpecialistPage(slug);
  if (!page || slug === "business") notFound();
  return <SpecialistPage data={page} turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} />;
}
