/**
 * Steward Plans data — 6 plans across 2 categories.
 * Available to House Steward members only (NOT HoWA+).
 */

export interface StewardPlan {
  slug: string;
  name: string;
  category: "home-garden" | "apartment";
  categoryLabel: string;
  tier: string;
  price: number;
  priceLabel: string;
  featured: boolean;
  image: string;
  inclusions: string[];
  lede: string;
  body: string;
}

export const PLANS: StewardPlan[] = [
  {
    slug: "home-garden-essential",
    name: "Home & Garden+ Essential",
    category: "home-garden",
    categoryLabel: "Home & Garden+",
    tier: "Essential",
    price: 605,
    priceLabel: "£605",
    featured: false,
    image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Home-Garden-Plus-Essential.jpg",
    inclusions: [
      "Weekly gardening (1hr)",
      "Weekly cleaning (2hrs)",
      "External window cleaning (monthly)",
      "HoWA record & scheduling",
    ],
    lede: "The foundation. Weekly gardening and cleaning, monthly windows, all managed through HoWA.",
    body: "The Essential plan covers the three services most homes need on a regular rhythm: garden maintenance, domestic cleaning, and external window cleaning. Each visit is logged in your HoWA record. One monthly invoice, one standard, no chasing.",
  },
  {
    slug: "home-garden-comprehensive",
    name: "Home & Garden+ Comprehensive",
    category: "home-garden",
    categoryLabel: "Home & Garden+",
    tier: "Comprehensive",
    price: 745,
    priceLabel: "£745",
    featured: true,
    image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Home-Garden-Plus-Comprehensive.jpg",
    inclusions: [
      "Weekly gardening (1hr)",
      "Weekly cleaning (3hrs)",
      "External window cleaning (monthly)",
      "Bi-annual gutter clean",
      "Quarterly deep clean (4hrs)",
      "HoWA record & scheduling",
    ],
    lede: "The most popular. Everything in Essential plus gutters, deep cleans, and an extra hour of cleaning each week.",
    body: "The Comprehensive plan adds the services that compound over time: gutter clears that prevent damp, quarterly deep cleans that reach what weekly visits can't, and an additional hour of cleaning each week for larger homes. The plan most of our House Steward members choose.",
  },
  {
    slug: "home-garden-premium",
    name: "Home & Garden+ Premium",
    category: "home-garden",
    categoryLabel: "Home & Garden+",
    tier: "Premium",
    price: 1040,
    priceLabel: "£1,040",
    featured: false,
    image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Home-Garden-Plus-Premium.jpg",
    inclusions: [
      "Weekly gardening (2hrs)",
      "Weekly cleaning (3hrs)",
      "Internal & external window cleaning (monthly)",
      "Bi-annual gutter clean",
      "Quarterly deep clean (4hrs)",
      "HoWA record & scheduling",
    ],
    lede: "The full standard. Double gardening, internal windows, and everything the Comprehensive plan includes.",
    body: "The Premium plan is for larger homes and gardens that need more time. Two hours of gardening each week covers serious seasonal work. Internal and external window cleaning means you never need to think about glass again. Every service coordinated through a single HoWA calendar.",
  },
  {
    slug: "apartment-essential",
    name: "Apartment Essential",
    category: "apartment",
    categoryLabel: "Apartment+",
    tier: "Essential",
    price: 300,
    priceLabel: "£300",
    featured: false,
    image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Apartment-Plus-Essential.jpg",
    inclusions: [
      "Weekly cleaning (2hrs)",
      "External window cleaning (monthly)",
      "HoWA record & scheduling",
    ],
    lede: "Clean and clear. Weekly cleaning and monthly windows for flats without outdoor space.",
    body: "The Apartment Essential plan covers the two things every flat needs: a reliable weekly clean and monthly external windows. No garden, no gutters, no extras you don't use. Simple, and priced accordingly.",
  },
  {
    slug: "apartment-balcony",
    name: "Apartment+ Balcony",
    category: "apartment",
    categoryLabel: "Apartment+",
    tier: "Balcony",
    price: 460,
    priceLabel: "£460",
    featured: true,
    image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Apartment-Plus-Balcony.jpg",
    inclusions: [
      "Fortnightly gardening (1hr)",
      "Weekly cleaning (2hrs)",
      "External window cleaning (monthly)",
      "Quarterly deep clean (4hrs)",
      "HoWA record & scheduling",
    ],
    lede: "For flats with outdoor space. Fortnightly balcony gardening, weekly cleaning, quarterly deep cleans.",
    body: "The Balcony plan adds fortnightly gardening for your terrace, roof garden, or balcony planters, plus a quarterly deep clean that reaches the places a weekly visit can't. The most popular Apartment plan.",
  },
  {
    slug: "apartment-comprehensive",
    name: "Apartment Comprehensive",
    category: "apartment",
    categoryLabel: "Apartment+",
    tier: "Comprehensive",
    price: 335,
    priceLabel: "£335",
    featured: false,
    image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Apartment-Plus-Comprehensive.jpg",
    inclusions: [
      "Weekly cleaning (2hrs)",
      "External window cleaning (monthly)",
      "Quarterly deep clean (4hrs)",
      "HoWA record & scheduling",
    ],
    lede: "Essential plus deep cleans. No garden, but quarterly resets that keep a flat properly maintained.",
    body: "The Comprehensive plan adds quarterly deep cleans to the Essential base. Four hours each quarter covering ovens, behind furniture, descaling, skirting, and everything the weekly rhythm doesn't reach.",
  },
];

export const HOME_GARDEN_PLANS = PLANS.filter((p) => p.category === "home-garden");
export const APARTMENT_PLANS = PLANS.filter((p) => p.category === "apartment");

export function findPlan(slug: string): StewardPlan | undefined {
  return PLANS.find((p) => p.slug === slug);
}
