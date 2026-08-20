import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { shopifyProvider } from "@/lib/commerce/shopify";
import { CabinetHero } from "@/components/home/CabinetHero";
import { BookingRail } from "@/components/home/BookingRail";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { EditorialSplit } from "@/components/home/EditorialSplit";
import { HearthSpread } from "@/components/home/HearthSpread";
import { StoreOffers } from "@/components/home/StoreOffers";
import { HowItWorks } from "@/components/home/HowItWorks";
import { DesignShowcase } from "@/components/home/DesignShowcase";
import { ProofBand } from "@/components/home/ProofBand";
import { CinemaSpread } from "@/components/home/CinemaSpread";

/**
 * Homepage — House-first (Aug-17 rebuild, spec §8).
 *
 * Order: cabinet hero → "What needs doing?" booking rail → Hearth magazine
 * spread → Store & Offers → How the House works → Proof → HoWA institutional
 * strip. HoWA appears only as supporting infrastructure, never the identity.
 */
export const metadata = {
  title: {
    absolute:
      "House of Willow Alexander | Services, insurance and useful things for the British home",
  },
  description:
    "The House that looks after yours. Services, insurance, useful things and good ideas for the British home, all held to one standard.",
};

function formatMoney(m: { amount: string; currencyCode: string }) {
  const sym = m.currencyCode === "GBP" ? "£" : m.currencyCode === "USD" ? "$" : "";
  return `${sym}${Number(m.amount).toFixed(2)}`;
}

// Fallback objects if the Shopify edit is empty (cards tolerate null images).
const FALLBACK_PRODUCTS = [
  { name: "House Approved object", price: "", image: null, href: "/shop" },
  { name: "House Approved object", price: "", image: null, href: "/shop" },
  { name: "House Approved object", price: "", image: null, href: "/shop" },
  { name: "House Approved object", price: "", image: null, href: "/shop" },
];

export default async function HomePage() {
  const hearthArticles = await getLatestHearthArticles(4).catch(() => []);
  const shopProducts = await shopifyProvider.listFeaturedProducts(4).catch(() => []);
  const marketCards = shopProducts.length
    ? shopProducts.slice(0, 4).map((p) => ({
        name: p.title,
        price: formatMoney(p.price),
        image: p.images[0]?.url ?? null,
        href: `/shop/${p.handle}`,
      }))
    : FALLBACK_PRODUCTS;

  return (
    <>
      {/* 1. Cabinet-of-domestic-life hero — spec §2 */}
      <CabinetHero />

      {/* 2. "What needs doing?" booking rail — spec §3 */}
      <BookingRail />

      {/* Split: the House standard (text left, image right) */}
      <EditorialSplit
        eyebrow="The House"
        heading="Care, cover and good order, held to one standard."
        body="House of Willow Alexander brings the many parts of home into one considered standard: gardens and rooms, services and objects, all held to a single test: would we trust this in a home we love?"
        ctaLabel="Discover the House"
        ctaHref="/the-house/philosophy"
        image="/home-v4/the-house-fleet.webp"
        imageAlt="The House at dusk with the full Willow Alexander service fleet, each van in its service colour and floral pattern"
        imageSide="right"
        tone="brown"
      />

      {/* 3. The Hearth magazine spread — spec §4 */}
      <HearthSpread articles={hearthArticles} />

      {/* Cinema — the House screening room, directly under the Hearth */}
      <CinemaSpread />

      {/* 4. Store & Offers — spec §5 */}
      <StoreOffers products={marketCards} />

      {/* Services showcase — image cards, Services pillar presence (after the
          editorial + store, not directly under the booking rail per doc §8) */}
      <ServicesShowcase />

      {/* Design studios — Interiors + Garden design as two editorial cards */}
      <DesignShowcase />

      {/* 5. How the House works — spec §6 */}
      <HowItWorks />

      {/* 6. Proof — spec §7 */}
      <ProofBand />
    </>
  );
}
