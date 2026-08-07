import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { getSpecialistPage, SPECIALIST_SLUGS } from "@/lib/insurance/specialist-pages";
import { SpecialistPage } from "@/components/insurance/SpecialistPage";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * /insurance/[slug], the specialist property + asset pages (spec Groups B and
 * C). Advert landing pages: indexable, but NOT in the nav. Only the known
 * specialist slugs resolve here; the named siblings (/insurance/everyday,
 * /insurance/how-this-works, etc.) are their own routes and take precedence.
 */
export function generateStaticParams() {
  return SPECIALIST_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSpecialistPage(slug);
  if (!page) return { title: "Insurance" };
  return { title: page.metaTitle, description: page.metaDescription, ...insuranceOg(slug, page.metaTitle) };
}

export default async function InsuranceSpecialistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSpecialistPage(slug);
  if (!page) notFound();
  return <SpecialistPage data={page} turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} />;
}
