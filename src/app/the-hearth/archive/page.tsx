import type { Metadata } from "next";
import { HearthMasthead } from "@/components/hearth/HearthMasthead";
import { HearthCategoryStrip } from "@/components/hearth/HearthCategoryStrip";
import { HearthMainFeed } from "@/components/hearth/HearthMainFeed";
import { HearthFullWidthNewsletter } from "@/components/hearth/HearthFullWidthNewsletter";
import { HearthColophon } from "@/components/hearth/HearthColophon";
import { getAllHearthArticles } from "@/lib/cms/hearth";

/**
 * /the-hearth/archive — the full Hearth archive, every article newest first.
 * This is the "View all" target from the landing feeds (spec §13 requires an
 * archive; previously a dead 404).
 */
export const metadata: Metadata = {
  title: "Archive | The Hearth",
  description:
    "Every story from The Hearth, the House of Willow Alexander journal on homes, gardens and living well.",
};

export default async function HearthArchivePage() {
  const articles = await getAllHearthArticles().catch(() => []);

  return (
    <div className="bg-house-white text-house-black">
      <HearthMasthead />
      <HearthCategoryStrip />

      <section className="max-w-[1360px] mx-auto px-[5vw] pt-12 pb-2 text-center">
        <p className="font-hearth-sans text-[12px] tracking-[0.22em] uppercase text-house-gold-ink mb-3">
          The Hearth
        </p>
        <h1 className="font-hearth-serif text-[clamp(32px,4vw,52px)] leading-[1.05] text-house-black">
          The archive
        </h1>
        <p className="mt-4 max-w-[60ch] mx-auto font-hearth-sans text-[16px] leading-[1.6] text-house-brown/70">
          Every story the House has published, newest first. {articles.length}{" "}
          {articles.length === 1 ? "piece" : "pieces"} and counting.
        </p>
      </section>

      <section className="max-w-[1360px] mx-auto mb-[72px] px-[5vw] pt-8">
        {articles.length ? (
          <HearthMainFeed
            articles={articles}
            heading="Everything in"
            emText="The Hearth"
            viewAllHref="/the-hearth"
          />
        ) : (
          <p className="py-16 text-center font-hearth-sans text-[16px] text-house-brown/60">
            The archive is being gathered. Please check back soon.
          </p>
        )}
      </section>

      <HearthFullWidthNewsletter />
      <HearthColophon />
    </div>
  );
}
