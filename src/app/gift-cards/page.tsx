import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";

export const metadata = {
  title: "Gift Cards",
  description:
    "House of Willow Alexander gift cards — give the gift of home care, design, or anything from the House.",
};

const DENOMINATIONS = [
  { value: "£25", description: "A window clean or a garden tidy" },
  { value: "£50", description: "A deep clean or gutter clear" },
  { value: "£100", description: "A full clean or seasonal garden visit" },
  { value: "£250", description: "A month of care, or a design consultation" },
  { value: "Custom", description: "Any amount you choose" },
];

/**
 * /gift-cards — Gift card landing page.
 * Shopify gift card products will be wired here once migrated.
 */
export default function GiftCardsPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-16 text-center">
        <Eyebrow>The House · Gift Cards</Eyebrow>
        <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4 mb-6">
          Give the gift of <em>a well-kept home</em>.
        </h1>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 max-w-[560px] mx-auto">
          House gift cards work across everything — services, the shop, design
          consultations, and HoWA memberships. Delivered by email, redeemed
          online or in person.
        </p>
      </section>

      {/* Denominations */}
      <section className="px-[5vw] pb-20">
        <div className="max-w-[880px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DENOMINATIONS.map((d) => (
            <div
              key={d.value}
              className="border border-house-brown/12 p-8 text-center transition-all duration-[var(--t-base)] ease-out hover:border-house-gold hover:shadow-[0_8px_24px_rgba(48,35,28,0.06)]"
            >
              <div className="font-display font-medium text-[36px] text-house-brown mb-2">
                {d.value}
              </div>
              <p className="font-sans italic text-[14px] text-house-stone">
                {d.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-house-white px-[5vw] py-16 border-t border-house-brown/10">
        <div className="max-w-[720px] mx-auto">
          <h2 className="font-display font-medium text-[28px] text-center mb-10">
            How it works.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                num: "I.",
                title: "Choose an amount",
                desc: "Pick a set value or enter your own.",
              },
              {
                num: "II.",
                title: "Add a message",
                desc: "Personal note, delivered with a House-branded card.",
              },
              {
                num: "III.",
                title: "Send by email",
                desc: "Arrives instantly. Redeemable on anything from the House.",
              },
            ].map((step) => (
              <div key={step.num}>
                <div className="font-display italic text-[16px] text-house-gold mb-2">
                  {step.num}
                </div>
                <h3 className="font-display font-medium text-[18px] mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-[14px] text-house-stone leading-[1.55]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[5vw] py-16 text-center">
        <p className="font-display italic text-[22px] text-house-stone mb-6">
          Gift cards will be available to purchase once the shop is live.
        </p>
        <Link
          href="/shop"
          className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline text-house-brown border border-house-brown transition-all duration-[var(--t-base)] ease-out hover:bg-house-brown hover:text-house-cream"
        >
          Browse the shop
        </Link>
      </section>
    </article>
  );
}
