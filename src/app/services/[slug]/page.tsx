import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, type ServiceSlug } from "@/lib/services-data";
import { ServiceDetail } from "@/components/marketing/ServiceDetail";
import { SERVICE_BUSINESS_SLUGS, getServiceBusiness } from "@/lib/service-businesses";

/**
 * /services/[slug] — the rich service page (Aug 2026 eComm/Insurance refocus).
 *
 * The previous booking-platform layout is kept — same images, same sections —
 * but the CTAs now link out: "Book via HoWA" (howa.co.uk) and "Visit" the
 * relevant Willow Alexander service business. Only the five services that map to
 * a real business site are rendered; everything else 404s.
 */

function isServiceSlug(slug: string): slug is ServiceSlug {
  return SERVICE_BUSINESS_SLUGS.includes(slug) && slug in SERVICES;
}

export function generateStaticParams() {
  return SERVICE_BUSINESS_SLUGS.filter((slug) => slug in SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return { title: "Service not found" };
  const local = SERVICES[slug];
  const biz = getServiceBusiness(slug);
  return {
    title: `${local.name}${biz ? ` · ${biz.business}` : ""}`,
    description: local.lede,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  return <ServiceDetail service={SERVICES[slug]} mode="book" />;
}
