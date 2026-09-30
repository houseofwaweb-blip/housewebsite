import Link from "next/link";

/**
 * Claims & help, spec §11.7. A prominent, unmissable route for people who
 * already hold cover, not only prospects. The House is an introducer, so the
 * claim itself is handled by our insurance partner under its FCA permissions; the House
 * line simply helps an existing customer reach the right place. These contact
 * points are the House's, shared across the hub band and the dedicated page.
 */
export const SALES_EMAIL = "sales@willowalexander.co.uk";
export const SUPPORT_PHONE = "0800 047 8738";
export const SUPPORT_PHONE_HREF = "tel:08000478738";

/**
 * Compact band for the hub. Reassures existing customers that help is one click
 * away and routes them to the full claims-and-help page and the House contacts.
 */
export function ClaimsHelpBand() {
  return (
    <section className="px-[5vw] py-14" style={{ background: "var(--house-green)" }}>
      <div className="mx-auto grid max-w-[1080px] items-center gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-house-cream/70">
            Coming soon
          </p>
          <h2 className="mt-3 font-display text-[clamp(27px,3.2vw,41px)] leading-[1.1] text-house-cream">
            Questions about insurance from the House?
          </h2>
          <p className="mt-4 max-w-[52ch] font-sans text-[18.5px] leading-[1.65] text-house-cream/80">
            Insurance from the House is coming soon. Register your interest to hear when it opens, or talk to the House using the details here.
          </p>
          <Link
            href="/insurance/speak-to-a-specialist"
            className="mt-6 inline-flex w-fit items-center whitespace-nowrap border border-house-cream/40 px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-house-cream no-underline transition-colors hover:border-house-cream"
          >
            Register your interest →
          </Link>
        </div>
        <div className="border-l border-house-cream/20 pl-6 md:pl-8">
          <p className="font-sans text-[13px] tracking-[0.2em] uppercase text-house-cream/60">
            Talk to the House
          </p>
          <a
            href={SUPPORT_PHONE_HREF}
            className="mt-2 block font-display text-[clamp(29px,3.4vw,37px)] leading-none text-house-cream no-underline hover:text-house-cream/85"
          >
            {SUPPORT_PHONE}
          </a>
          <a
            href={`mailto:${SALES_EMAIL}`}
            className="mt-3 block font-sans text-[18px] text-house-cream/85 underline underline-offset-2 hover:text-house-cream"
          >
            {SALES_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

function DetailBlock({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-house-brown/10 py-8">
      <p className="mb-3 font-sans text-[14px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">
        {eyebrow}
      </p>
      <div className="space-y-4 font-sans text-[20px] leading-[1.7] text-house-brown/85">{children}</div>
    </div>
  );
}

/**
 * The full claims-and-help content for the dedicated page: how to make a claim,
 * who to contact, what to have ready, and the introducer disclosure.
 */
export function ClaimsHelpDetail() {
  const ready = [
    "Your policy number, and the name the cover is held in.",
    "When it happened, and where, with the address if it concerns the home.",
    "A plain account of what happened and what has been affected.",
    "Photographs of any damage, and receipts or valuations if you have them.",
    "A crime reference number, if the police have been involved.",
  ];
  return (
    <div className="mx-auto max-w-[760px]">
      <DetailBlock eyebrow="When you need to make a claim">
        <p>
          Insurance from the House is coming soon. When cover is live, claims on your policy will be handled by your insurer under its FCA permissions, from the first notification through to settlement, and the sooner a claim is reported the better.
        </p>
        <p>
          In the meantime, talk to the House on the numbers below and we will point you in the right direction. The House does not assess or settle claims.
        </p>
      </DetailBlock>

      <DetailBlock eyebrow="Who to contact">
        <p>
          Contact the House and we will help you reach the right place.
        </p>
        <p className="!mt-5">
          <a
            href={SUPPORT_PHONE_HREF}
            className="font-display text-[clamp(31px,4vw,43px)] leading-none text-house-black no-underline hover:text-[color:var(--ins-ink)]"
          >
            {SUPPORT_PHONE}
          </a>
        </p>
        <p className="!mt-3">
          <a
            href={`mailto:${SALES_EMAIL}`}
            className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown"
          >
            {SALES_EMAIL}
          </a>
        </p>
        <p className="!mt-5 text-[18px] text-house-brown/70">
          In an emergency that puts people or the property at risk, contact the emergency services first, then make your home safe before you call.
        </p>
      </DetailBlock>

      <DetailBlock eyebrow="What to have ready">
        <p>A few details can help make the first conversation easier.</p>
        <ul className="space-y-2.5 pl-0">
          {ready.map((r) => (
            <li key={r} className="flex gap-3">
              <span aria-hidden className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--ins-ink)]" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </DetailBlock>

      <DetailBlock eyebrow="How this will work">
        <p>
          When insurance is live, an FCA-authorised specialist will advise on, arrange and administer the cover and handle claims on your behalf. The House does not advise on, arrange, administer, compare or transact insurance, and it does not settle claims.
        </p>
        <p className="!mt-5 text-[18px] text-house-brown/70">
          When cover is live, complaints about a policy or a claim will be handled by your insurer under its FCA permissions, with eligible complainants able to refer a matter to the Financial Ombudsman Service.
        </p>
      </DetailBlock>
    </div>
  );
}
