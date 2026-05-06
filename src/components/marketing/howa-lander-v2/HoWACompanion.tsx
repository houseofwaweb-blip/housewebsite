import { CompanionTeaser } from "@/components/marketing/home-v2/CompanionTeaser";
import s from "./howa-lander-v2.module.css";

/**
 * Companion teaser as a standalone section on the HoWA lander.
 * Reuses the home-v3 CompanionTeaser widget — same italic note,
 * brown filled CTA, gold-tick-on-hairline divider — wrapped in a
 * HoWA-mode section.
 */
export function HoWACompanion() {
  return (
    <section className={s.companionSection} aria-label="The Companion">
      <CompanionTeaser />
    </section>
  );
}
