import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { getGuide, GUIDE_SLUGS } from "@/lib/insurance/guides";
import { GuideLayout } from "@/components/insurance/GuideLayout";
import { insuranceOg } from "@/lib/insurance/og";

/** G1, G5 · /insurance/guides/[slug], organic-search editorial support. */
export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  return {
    title: g?.metaTitle ?? "Insurance guide",
    description: g?.metaDescription,
    ...(g ? insuranceOg(`guide-${g.slug}`, g.metaTitle) : {}),
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  return <GuideLayout guide={g} turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} />;
}
