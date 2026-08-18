import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import {
  getEverydaySpecialistPage,
  EVERYDAY_SPECIALIST_SLUGS,
} from "@/lib/insurance/specialist-pages";
import { SpecialistPage } from "@/components/insurance/SpecialistPage";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * D2, D5 · /insurance/everyday/[slug]. Everyday cover products now render on the
 * shared SpecialistPage template (fine-art structure) rather than the older thin
 * pre-frame, so every insurance product page reads the same way.
 */
export function generateStaticParams() {
  return EVERYDAY_SPECIALIST_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getEverydaySpecialistPage(slug);
  return {
    title: p?.metaTitle ?? "Everyday cover",
    description: p?.metaDescription,
    ...(p ? insuranceOg(`everyday-${p.slug}`, p.metaTitle) : {}),
  };
}

export default async function EverydayProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getEverydaySpecialistPage(slug);
  if (!p) notFound();
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  return <SpecialistPage data={p} turnstileSiteKey={turnstileSiteKey} />;
}
