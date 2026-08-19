import Link from "next/link";

/**
 * HearthPaywall — widget block shown mid-article on premium Hearth pieces.
 *
 * Variant C: "The Continuation Card" — cream card with a gold top bar,
 * prominent H mark, two-column body, dual CTAs, trust strip.
 * Outdented from the article column so it visibly breaks the reading flow.
 */
export function HearthPaywall() {
  return (
    <div className="my-14 -mx-4 md:-mx-12 lg:-mx-20">
      <aside
        className="relative bg-house-cream border border-house-gold/30 shadow-[0_24px_60px_rgba(48,35,28,0.12)] px-10 py-10 md:px-12 md:py-12 grid grid-cols-[64px_1fr] gap-7 max-md:grid-cols-1 max-md:gap-5 max-md:px-7 max-md:py-9"
        role="complementary"
        aria-label="Continue with Housekeeper"
      >
        {/* Thick gold top bar */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-1 bg-house-gold"
        />

        {/* Prominent H mark */}
        <div className="flex items-center justify-center w-16 h-16 bg-house-gold-ink text-house-brown font-hearth-serif italic text-[35px] leading-none shadow-[0_4px_16px_rgba(184,148,62,0.25)] max-md:w-14 max-md:h-14 max-md:text-[29px]">
          H
        </div>

        <div>
          <p className="font-hearth-sans text-[14px] tracking-[0.24em] uppercase text-house-gold-ink mb-2 flex items-center gap-2">
            <span>Housekeeper · The Hearth</span>
            <span aria-hidden="true" className="text-house-gold-ink/40">·</span>
            <span className="text-house-stone">Members only</span>
          </p>
          <h2 className="font-hearth-serif font-medium text-[clamp(29px,3vw,37px)] leading-[1.15] text-house-black mb-3">
            Continue this article{" "}
            <em className="italic font-normal text-[var(--house-gold-dark,#a08234)]">
              and the rest of the magazine.
            </em>
          </h2>
          <p className="font-hearth-serif italic text-[20px] leading-[1.55] text-house-stone mb-7 max-w-[54ch]">
            The Hearth publishes long-form writing every week. Members read in
            full, plus the rest of Housekeeper.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-7 py-6 border-t border-b border-house-brown/12 max-md:grid-cols-1 max-md:gap-4">
            <div>
              <p className="font-hearth-sans text-[14px] tracking-[0.24em] uppercase text-house-gold-ink mb-3">
                What you get
              </p>
              <ul className="list-none m-0 p-0">
                {[
                  "Every article, in full",
                  "The weekly Hearth letter",
                  "Full archive access",
                  "10% off the House shop",
                ].map((item) => (
                  <li
                    key={item}
                    className="font-hearth-serif text-[19px] leading-[1.55] text-house-brown py-0.5 flex gap-2"
                  >
                    <span aria-hidden="true" className="text-house-gold-ink font-bold flex-shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-hearth-sans text-[14px] tracking-[0.24em] uppercase text-house-gold-ink mb-3">
                Why it&apos;s worth it
              </p>
              <ul className="list-none m-0 p-0">
                {[
                  "Member service rates",
                  "Your home's Living Record",
                  "The Assistant diagnostic",
                  "Cancel any time",
                ].map((item) => (
                  <li
                    key={item}
                    className="font-hearth-serif text-[19px] leading-[1.55] text-house-brown py-0.5 flex gap-2"
                  >
                    <span aria-hidden="true" className="text-house-gold-ink font-bold flex-shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-5 flex-wrap max-md:flex-col max-md:items-start max-md:gap-4">
            <p className="font-hearth-serif text-[19px] text-house-black">
              <strong className="font-medium text-[29px]">£16.99</strong>
              <span className="ml-1">/month</span>
              <em className="italic text-house-stone text-[18px] ml-2">VAT inc.</em>
            </p>
            <div className="flex items-center gap-5 flex-wrap max-md:w-full">
              <Link
                href="/api/howa-bounce?source=hearth-paywall"
                className="inline-block px-7 py-3.5 font-hearth-sans text-[18px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light hover:shadow-[0_8px_24px_rgba(184,148,62,0.3)] max-md:flex-1 max-md:text-center"
              >
                Coming soon
              </Link>
              <Link
                href="/howa/plans"
                className="font-hearth-sans text-[14px] tracking-[0.18em] uppercase text-house-brown no-underline border-b border-dotted border-house-brown pb-px transition-colors duration-[var(--t-base)] hover:text-house-gold-ink hover:border-house-gold"
              >
                Compare plans
              </Link>
            </div>
          </div>

          <p className="mt-4 font-hearth-serif text-[18px] text-house-stone">
            Already a member?{" "}
            <a
              href="https://accounts.willowalexander.co.uk/"
              className="font-hearth-sans text-[14px] tracking-[0.16em] uppercase text-house-brown no-underline border-b border-dotted border-house-brown pb-px transition-colors hover:text-house-gold-ink hover:border-house-gold"
            >
              Log in
            </a>
          </p>

          <div className="mt-6 pt-5 border-t border-house-brown/8 flex gap-5 justify-center flex-wrap font-hearth-sans text-[14px] tracking-[0.14em] uppercase text-house-stone">
            {["14-day refund", "Cancel anytime", "Your record stays yours"].map(
              (s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="is-round w-1 h-1 bg-house-gold inline-block" />
                  {s}
                </span>
              ),
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
