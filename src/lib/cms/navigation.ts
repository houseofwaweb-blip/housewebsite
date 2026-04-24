import { sanityFetch } from "./fetch";
import { navigationQuery } from "./queries";
import { PRIMARY_NAV } from "@/components/layout/navConfig";
import type { MegaPanel } from "@/components/nav/MegaMenu";
import type { FooterColumn } from "@/components/layout/Footer";

interface SanityNavPanel {
  trigger: string;
  triggerHref?: string;
  groups?: Array<{
    heading?: string;
    links?: Array<{
      label: string;
      href: string;
      description?: string;
      external?: boolean;
    }>;
  }>;
  previewImage?: string;
  previewAlt?: string;
  previewTag?: string;
  previewHeading?: string;
  previewHref?: string;
}

interface SanityNav {
  primaryNav?: SanityNavPanel[];
  footerGroups?: Array<{
    heading?: string;
    items?: Array<{ label: string; href: string }>;
  }>;
}

/**
 * Fetch navigation from Sanity. Falls back to hardcoded navConfig.ts
 * if no Sanity document exists or if the fetch fails.
 */
export async function getNavigation(): Promise<MegaPanel[]> {
  try {
    const data = await sanityFetch<SanityNav | null>({
      query: navigationQuery,
      tags: ["navigation"],
    });

    if (!data?.primaryNav?.length) return PRIMARY_NAV;

    return data.primaryNav.map((panel): MegaPanel => ({
      id: panel.trigger.toLowerCase().replace(/\s+/g, "-"),
      trigger: panel.trigger,
      triggerHref: panel.triggerHref ?? "#",
      groups: (panel.groups ?? []).map((g) => ({
        heading: g.heading ?? "",
        links: (g.links ?? []).map((l) => ({
          label: l.label,
          href: l.href,
          description: l.description,
          external: l.external,
        })),
      })),
      preview: panel.previewImage
        ? {
            image: panel.previewImage,
            alt: panel.previewAlt ?? "",
            tag: panel.previewTag ?? "",
            heading: panel.previewHeading ?? "",
            href: panel.previewHref ?? "#",
          }
        : undefined,
    }));
  } catch {
    return PRIMARY_NAV;
  }
}

/**
 * Fetch footer columns from Sanity. Returns undefined if no data
 * (Footer component uses hardcoded fallback).
 */
export async function getFooterColumns(): Promise<FooterColumn[] | undefined> {
  try {
    const data = await sanityFetch<SanityNav | null>({
      query: navigationQuery,
      tags: ["navigation"],
    });
    if (!data?.footerGroups?.length) return undefined;
    return data.footerGroups.map((g) => ({
      heading: g.heading ?? "",
      links: (g.items ?? []).map((l) => ({ label: l.label, href: l.href })),
    }));
  } catch {
    return undefined;
  }
}
