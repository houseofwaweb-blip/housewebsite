import { HearthPromoStrip } from "@/components/hearth/HearthPromoStrip";
import { HearthMasthead } from "@/components/hearth/HearthMasthead";
import { HearthCategoryStrip } from "@/components/hearth/HearthCategoryStrip";
import { HearthHeroLead } from "@/components/hearth/HearthHeroLead";
import { HearthSecondaryLeads } from "@/components/hearth/HearthSecondaryLeads";
import { HearthMainFeed } from "@/components/hearth/HearthMainFeed";
import { HearthFeedSidebar } from "@/components/hearth/HearthFeedSidebar";
import { HearthCollectionBand } from "@/components/hearth/HearthCollectionBand";
import { HearthMoreFeed } from "@/components/hearth/HearthMoreFeed";
import { HearthFullWidthNewsletter } from "@/components/hearth/HearthFullWidthNewsletter";
import { HearthColophon } from "@/components/hearth/HearthColophon";
import { getHearthIndex } from "@/lib/cms/hearth";

/**
 * /journal — The Hearth magazine index.
 * Locked variant: A (H&G-modeled).
 *
 * Data source: Sanity `article` documents, fetched via getHearthIndex().
 * Components use the same HearthArticle shape as before (adapter lives in
 * src/lib/cms/hearth.ts).
 */

export const metadata = {
  title: "The Hearth",
  description:
    "A journal on the keeping of homes and gardens. Essays, interiors, gardens, architecture — from House of Willow Alexander.",
};

export default async function JournalPage() {
  const sections = await getHearthIndex();

  return (
    <div className="bg-house-white text-house-black">
      <HearthPromoStrip />
      <HearthMasthead />
      <HearthCategoryStrip activeSlug="all" />
      <HearthHeroLead article={sections.hero} />
      <HearthSecondaryLeads articles={sections.secondary} />

      {/* Main feed + sticky sidebar */}
      <section className="max-w-[1360px] mx-auto mb-[72px] px-[5vw] pt-12 border-t border-house-brown/12">
        <div className="grid lg:grid-cols-[1fr_320px] gap-14">
          <HearthMainFeed
            articles={sections.mainFeed}
            heading="This week"
            emText="in The Hearth"
            viewAllHref="/journal/archive"
          />
          <HearthFeedSidebar popular={sections.popular} />
        </div>
      </section>

      <HearthCollectionBand />
      <HearthMoreFeed articles={sections.moreFeed} heading="More" emText="from the studios" />
      <HearthFullWidthNewsletter />
      <HearthColophon />
    </div>
  );
}
