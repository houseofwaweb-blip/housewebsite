import Image from "next/image";
import Link from "next/link";
import type { HearthArticle } from "@/lib/hearth-data";

/**
 * HearthSpread — homepage §4 (Aug-17 rebuild, L584–608). The major lower
 * section, read as a magazine. 12-col desktop grid: title/issue · lead feature
 * image · lead text · two stacked supporting stories.
 *
 * The lead story changes editorially (whatever getLatestHearthArticles returns
 * first), not per page load.
 */
export function HearthSpread({ articles }: { articles: HearthArticle[] }) {
  if (!articles.length) return null;
  const [lead, ...rest] = articles;
  const supporting = rest.slice(0, 2);
  const href = (a: HearthArticle) => `/the-hearth/${a.slug}`;

  // Issue marker (spec §4, L600: "issue number/date"). Month is taken from the
  // lead story's publish date so the masthead tracks the current issue; the
  // issue number is a stable editorial value.
  const issueDate = lead.publishedAt ? new Date(lead.publishedAt) : null;
  const issueMonth =
    issueDate && !Number.isNaN(issueDate.getTime())
      ? issueDate.toLocaleString("en-GB", { month: "long" })
      : "August";
  const issueMarker = `Issue No. 04 · ${issueMonth}`;

  return (
    <section className="bg-house-cream px-[5vw] py-[clamp(40px,4vw,68px)] border-t border-house-line">
      <div className="mx-auto max-w-[1360px] grid gap-x-10 gap-y-8 lg:grid-cols-12">
        {/* Title / issue marker (cols 1–2) */}
        <div className="lg:col-span-2 flex flex-col justify-start">
          <p className="font-sans text-[13px] tracking-[0.22em] uppercase text-house-gold-dark">
            The Hearth
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-[1.05] text-house-ink">
            The magazine of the House.
          </h2>
          <p className="mt-3 font-sans text-[10px] tracking-[0.18em] uppercase text-house-stone">
            {issueMarker}
          </p>
          <Link
            href="/the-hearth"
            className="mt-5 inline-block font-sans text-[13px] tracking-[0.18em] uppercase text-house-brown no-underline border-b border-house-brown/40 pb-1 w-fit hover:border-house-brown"
          >
            View the latest issue
          </Link>
        </div>

        {/* Lead feature image (cols 3–7) */}
        <Link href={href(lead)} className="lg:col-span-5 group block no-underline">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-house-cream-dark">
            {lead.image ? (
              <Image
                src={lead.image}
                alt={lead.imageAlt ?? lead.title}
                fill
                sizes="(min-width:1024px) 42vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : null}
          </div>
        </Link>

        {/* Lead feature text (cols 8–9) */}
        <div className="lg:col-span-3 flex flex-col justify-center">
          {lead.category ? (
            <p className="font-sans text-[13px] tracking-[0.18em] uppercase text-house-gold-dark">
              {lead.category}
            </p>
          ) : null}
          <h3 className="mt-2 font-display text-[clamp(1.5rem,2vw,2rem)] leading-[1.1] text-house-ink">
            <Link href={href(lead)} className="no-underline text-house-ink hover:text-house-gold-dark transition-colors">
              {lead.title}
            </Link>
          </h3>
          {lead.dek ? (
            <p className="mt-3 font-sans text-[18px] leading-relaxed text-house-brown/80 line-clamp-4">
              {lead.dek}
            </p>
          ) : null}
          <p className="mt-4 font-sans text-[14px] tracking-[0.04em] text-house-stone">
            {lead.author}
            {lead.readTimeMinutes ? ` · ${lead.readTimeMinutes} min read` : ""}
          </p>
          <Link
            href={href(lead)}
            className="mt-4 inline-block font-sans text-[13px] tracking-[0.18em] uppercase text-house-brown no-underline border-b border-house-brown/40 pb-1 w-fit hover:border-house-brown"
          >
            Read the feature
          </Link>
        </div>

        {/* Two supporting stories (cols 10–12) */}
        <div className="lg:col-span-2 flex flex-col gap-6 border-l-0 lg:border-l lg:border-house-line lg:pl-8">
          {supporting.map((a) => (
            <Link key={a.slug} href={href(a)} className="group block no-underline">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark mb-3">
                {a.image ? (
                  <Image
                    src={a.image}
                    alt={a.imageAlt ?? a.title}
                    fill
                    sizes="(min-width:1024px) 18vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              {a.category ? (
                <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-gold-dark">
                  {a.category}
                </p>
              ) : null}
              <h4 className="mt-1 font-display text-[1.15rem] leading-[1.15] text-house-ink group-hover:text-house-gold-dark transition-colors line-clamp-3">
                {a.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
