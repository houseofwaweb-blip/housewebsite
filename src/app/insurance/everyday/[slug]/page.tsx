import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEverydayPage, EVERYDAY_SLUGS } from "@/lib/insurance/everyday-pages";
import { EverydayPreframe } from "@/components/insurance/EverydayPreframe";
import { insuranceOg } from "@/lib/insurance/og";

/** D2, D5 · /insurance/everyday/[slug], thin hand-off pre-frames. */
export function generateStaticParams() {
  return EVERYDAY_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getEverydayPage(slug);
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
  const p = getEverydayPage(slug);
  if (!p) notFound();
  return <EverydayPreframe data={p} />;
}
