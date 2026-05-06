import { notFound } from "next/navigation";
import { getHoWALanderV2 } from "@/lib/cms/howa-lander-v2";
import { HoWAHero } from "@/components/marketing/howa-lander-v2/HoWAHero";
import { HoWACompanion } from "@/components/marketing/howa-lander-v2/HoWACompanion";
import { HoWATiers } from "@/components/marketing/howa-lander-v2/HoWATiers";
import { HoWADashboardPreview } from "@/components/marketing/howa-lander-v2/HoWADashboardPreview";
import { HoWAWorkflow } from "@/components/marketing/howa-lander-v2/HoWAWorkflow";
import { ProofStrip } from "@/components/marketing/home-v2/ProofStrip";
import { HoWAFaq } from "@/components/marketing/howa-lander-v2/HoWAFaq";
import { HoWAFinalCta } from "@/components/marketing/howa-lander-v2/HoWAFinalCta";
import { HoWAStickyCta } from "@/components/marketing/howa-lander-v2/HoWAStickyCta";
import s from "@/components/marketing/howa-lander-v2/howa-lander-v2.module.css";

/**
 * /howa — the HoWA product landing page.
 * Was iterated as /preview/howa-v2; merged to /howa on 2026-05-06.
 *
 * Section order (House → HoWA → close):
 *   1. Hero — parchment cross-section + headline + dual CTAs
 *   2. Companion teaser — root intake layer
 *   3. Tier showcase — Assistant / Housekeeper / Steward
 *   4. Dashboard preview — placeholder UI; real product screens later
 *   5. Workflow — boiler prediction story
 *   6. Proof strip — accreditations + reviews
 *   7. FAQ — calm objection-handling accordion
 *   8. Final CTA — Step into stewardship
 *  Sticky CTA fades in past hero; hides over final CTA.
 */

export const metadata = {
  title: "HoWA — the home operating system",
  description:
    "HoWA is the operating layer between The House and the home itself. Observes what matters, books what needs doing, keeps a living record so nothing is missed, delayed, or forgotten.",
};

export default async function HoWAPage() {
  const data = await getHoWALanderV2();
  if (!data) notFound();

  return (
    <main className={s.page}>
      <HoWAHero data={data} />
      <HoWACompanion />
      <HoWATiers data={data} />
      <HoWADashboardPreview />
      <HoWAWorkflow data={data} />
      <ProofStrip />
      <HoWAFaq />
      <HoWAFinalCta data={data} />
      <HoWAStickyCta label={data.finalCtaLabel ?? "Start HoWA"} href={data.finalCtaHref ?? "/howa"} />
    </main>
  );
}
