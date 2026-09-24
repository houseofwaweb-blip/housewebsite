import { shopifyProvider } from "@/lib/commerce/shopify";
import { CabinetHero } from "@/components/home/CabinetHero";
import { TrustRail } from "@/components/home/TrustRail";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { PopularServices } from "@/components/home/PopularServices";
import { StoreOffers } from "@/components/home/StoreOffers";
import { DesignShowcase } from "@/components/home/DesignShowcase";
import { InsuranceBand } from "@/components/home/InsuranceBand";
import { UnordinaryHearthBand } from "@/components/home/UnordinaryHearthBand";
import { HowaHeroProduct } from "@/components/home/HowaHeroProduct";
import { HouseAtWork } from "@/components/home/HouseAtWork";
import { HouseAboutIntro } from "@/components/home/HouseAboutIntro";

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
const FALLBACK_PRODUCTS = Array.from({ length: 6 }, () => ({
  name: "House Approved object",
  price: "",
  image: null as string | null,
  href: "/shop",
}));

// Design packages are services, not physical products, so they must not appear
// in the homepage Shop row (they render as bespoke design pages, not objects).
const DESIGN_PACKAGE_HANDLES = new Set([
  "the-house-edit-1", "additions-to-your-edit", "the-full-house-edit",
  "planting-plans", "concept-plans", "2d-3d-plans", "lighting-plans",
]);

export default async function HomePage() {
  // Over-fetch so filtering out design packages still leaves six real products.
  const shopProducts = await shopifyProvider.listFeaturedProducts(16).catch(() => []);
  const physicalProducts = shopProducts.filter((p) => !DESIGN_PACKAGE_HANDLES.has(p.handle));
  const marketCards = physicalProducts.length
    ? physicalProducts.slice(0, 6).map((p) => ({
        name: p.title,
        price: formatMoney(p.price),
        image: p.images[0]?.url ?? null,
        href: `/shop/${p.handle}`,
      }))
    : FALLBACK_PRODUCTS;

  return (
    <>
      {/* 1. Split hero — copy + booking bar left, feature image right (amendments §4) */}
      <CabinetHero />

      {/* 2. Trust rail — four proof points under the hero (amendments §5) */}
      <TrustRail />

      {/* 3. Category strip — five entrances (amendments §6) */}
      <CategoryStrip />

      {/* 4. Popular services — high-intent service cards (amendments §7) */}
      <PopularServices />

      {/* 5. The House at work — Instagram proof carousel, directly after the
          service cards (final September brief §1). */}
      <HouseAtWork />

      {/* 6. Short About introduction — immediately after The House at work,
          links to the full story (final September brief §2). */}
      <HouseAboutIntro />

      {/* 7. HoWA section — "Your home, in hand." (amendments §8) */}
      <HowaHeroProduct />

      {/* 6. Design section — kinder, calmer home (amendments §9) */}
      <DesignShowcase />

      {/* 7. Shop the House (amendments §10) */}
      <StoreOffers products={marketCards} />

      {/* 8. Insurance, but better understood (amendments §11) */}
      <InsuranceBand />

      {/* 9. The unOrdinary + The Hearth — paired bottom band (amendments §12 + §13) */}
      <UnordinaryHearthBand />
    </>
  );
}
