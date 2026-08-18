/**
 * HearthUsefulDetails — the "The useful details" fact box (rebuild spec §13,
 * article step 7). A quiet, scannable summary of the practical facts of a piece:
 * section, writer, when it ran, how long it takes to read, and the topics it is
 * filed under. Rendered after the article body, inside the reading column.
 *
 * It is derived from the article's own metadata rather than a bespoke Sanity
 * field, so it appears on every article without a schema change. Where an
 * article later carries structured key facts, this box is the place to surface
 * them.
 */
type Detail = { label: string; value: string };

export function HearthUsefulDetails({
  category,
  author,
  date,
  readTime,
  topics,
}: {
  category?: string;
  author?: string;
  date?: string;
  readTime?: number;
  topics?: string[];
}) {
  const rows: Detail[] = [];
  if (category) rows.push({ label: "Section", value: category });
  if (author) rows.push({ label: "Written by", value: author });
  if (date) rows.push({ label: "Published", value: date });
  if (readTime) rows.push({ label: "Reading time", value: `${readTime} min` });

  const filed = (topics ?? []).filter(Boolean).slice(0, 6);
  if (rows.length === 0 && filed.length === 0) return null;

  return (
    <aside
      aria-label="The useful details"
      className="my-14 border border-house-brown/15 bg-house-cream/60 px-6 py-7 sm:px-8"
    >
      <p className="font-hearth-sans text-[11px] tracking-[0.24em] uppercase text-house-gold-ink">
        The useful details
      </p>
      <dl className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className="border-t border-house-brown/12 pt-3">
            <dt className="font-hearth-sans text-[11px] tracking-[0.18em] uppercase text-house-stone">
              {r.label}
            </dt>
            <dd className="mt-1 font-hearth-serif text-[17px] leading-snug text-house-black">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
      {filed.length > 0 ? (
        <div className="mt-6 border-t border-house-brown/12 pt-4">
          <p className="font-hearth-sans text-[11px] tracking-[0.18em] uppercase text-house-stone">
            Filed under
          </p>
          <ul className="mt-2 flex flex-wrap gap-2 p-0">
            {filed.map((t) => (
              <li
                key={t}
                className="list-none border border-house-brown/20 px-3 py-1 font-hearth-sans text-[12px] tracking-[0.04em] text-house-brown/85"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
