import { notFound } from "next/navigation";
import { getHomepageV3 } from "@/lib/cms/homepage-v3";
import { HeroV3 } from "@/components/marketing/home-v2/HeroV3";
import { HoWAShowcase } from "@/components/marketing/home-v2/HoWAShowcase";
import { WorkflowStrip } from "@/components/marketing/home-v2/WorkflowStrip";
import { PillarsEditorial } from "@/components/marketing/home-v2/PillarsEditorial";
import { ProtectBlock } from "@/components/marketing/home-v2/ProtectBlock";
import { PoweredBy } from "@/components/marketing/home-v2/PoweredBy";
import { ShopJournalPair } from "@/components/marketing/home-v2/ShopJournalPair";
import { ProofStrip } from "@/components/marketing/home-v2/ProofStrip";
import { FinalCta } from "@/components/marketing/home-v2/FinalCta";

/**
 * Homepage — locked direction.
 * Was iterated as /preview/home-v3; merged to / on 2026-05-06.
 *
 * Section order (Product-first):
 *   1. Hero — full-bleed photographic + centred copy
 *   2. Workflow strip (proof — boiler prediction story)
 *   3. HoWA Showcase — three phones, hover bg fade, Companion teaser tail
 *   4. Protect — Insurance lead + services carousel
 *   5. Pillars editorial — Design / Protect / Shop / The Hearth, hover bg fade
 *   6. Powered by — accreditation strip
 *   7. Shop + Journal pair — live WP/WC + Hearth feed
 *   8. Proof strip — accreditations + reviews
 *   9. Final CTA — close back to HoWA
 */

export const metadata = {
  title: "House of Willow Alexander",
  description:
    "A modern British institution for effortless intelligent living. Design, care, protection, and curated commerce — connected by HoWA.",
};

export default async function HomePage() {
  const data = await getHomepageV3();
  if (!data) notFound();

  return (
    <main>
      <HeroV3 data={data} />
      <WorkflowStrip data={data} />
      <HoWAShowcase data={data} />
      <ProtectBlock data={data} />
      <PillarsEditorial data={data} />
      <PoweredBy data={data} />
      <ShopJournalPair />
      <ProofStrip />
      <FinalCta data={data} />
    </main>
  );
}
