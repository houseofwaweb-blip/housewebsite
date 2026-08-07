import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { getBusinessPage, BUSINESS_SUB_SLUGS } from "@/lib/insurance/business-pages";
import { BusinessPage } from "@/components/insurance/BusinessPage";

/** E2/E3 · /insurance/business/[slug], trades-and-contractors, professional-indemnity. */
export function generateStaticParams() {
  return BUSINESS_SUB_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getBusinessPage(slug);
  return { title: page?.metaTitle ?? "Business insurance", description: page?.metaDescription };
}

export default async function BusinessSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBusinessPage(slug);
  if (!page || slug === "business") notFound();
  return <BusinessPage data={page} turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} />;
}
