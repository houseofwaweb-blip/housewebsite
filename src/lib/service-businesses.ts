/**
 * Service businesses (Aug 2026 eComm/Insurance refocus).
 *
 * The House no longer runs an in-site booking platform. The service work is
 * delivered by the separate Willow Alexander service businesses, each with its
 * own site. The House's job here is simply to introduce them and link out —
 * either straight to the business, or to HoWA to book online.
 */

/** Plain outbound booking destination (no HoWA product marketing on the House site). */
export const HOWA_BOOK_URL = "https://howa.co.uk";

export type SubService = { label: string; href: string };

export type ServiceBusiness = {
  slug: string; // /services/[slug]
  name: string; // the service, e.g. "Window Cleaning"
  business: string; // the business that delivers it
  businessUrl: string; // business homepage
  bookUrl: string; // best page to start (may be a deep link)
  blurb: string;
  image: string; // existing House hero photo
  subs: SubService[]; // sub-services, linked out to the business
};

export const SERVICE_BUSINESSES: ServiceBusiness[] = [
  {
    slug: "gardening",
    name: "Gardening",
    business: "Willow Alexander Gardeners",
    businessUrl: "https://willowalexandergardeners.co.uk",
    bookUrl: "https://willowalexandergardeners.co.uk",
    blurb:
      "Lawns, borders, hedges, planting and seasonal care, by a dedicated garden team across London and Kent.",
    image: "/services/subbrands/gardeners.webp",
    subs: [
      { label: "Garden design", href: "https://willowalexandergardeners.co.uk/garden-design" },
    ],
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    business: "Willow Alexander Window Cleaners",
    businessUrl: "https://willowalexanderwindowcleaners.co.uk",
    bookUrl: "https://willowalexanderwindowcleaners.co.uk/window-cleaning-london-kent/",
    blurb:
      "Pure-water window cleaning for homes across London and Kent, with a method that respects period glass.",
    image: "/services/subbrands/window-cleaner.webp",
    subs: [
      { label: "Soft washing", href: "https://willowalexanderwindowcleaners.co.uk/soft-washing-london-kent/" },
      { label: "Jet washing", href: "https://willowalexanderwindowcleaners.co.uk/jet-washing-london-kent/" },
      { label: "Soffits & fascias", href: "https://willowalexanderwindowcleaners.co.uk/soffit-fascia-cleaning/" },
      { label: "Commercial window cleaning", href: "https://willowalexanderwindowcleaners.co.uk/commercial-window-cleaning-london-kent/" },
    ],
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    business: "Willow Alexander Window Cleaners",
    businessUrl: "https://willowalexanderwindowcleaners.co.uk",
    bookUrl: "https://willowalexanderwindowcleaners.co.uk/gutter-cleaning-london-kent/",
    blurb:
      "Reach-and-vacuum gutter clearing and downpipe checks from the ground, before the weather turns.",
    image: "/services/subbrands/gutter-cleaning.webp",
    subs: [],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    business: "Willow Alexander Cleaners",
    businessUrl: "https://willowalexandercleaners.co.uk",
    bookUrl: "https://willowalexandercleaners.co.uk",
    blurb:
      "Regular and one-off cleaning for homes across London and Kent, by a team that learns the home.",
    image: "/services/subbrands/cleaners.webp",
    subs: [
      { label: "Regular cleaning", href: "https://willowalexandercleaners.co.uk/regular-cleaning-london-kent/" },
      { label: "End of tenancy", href: "https://willowalexandercleaners.co.uk/end-of-tenancy-cleaning-london-kent/" },
      { label: "Spring cleaning", href: "https://willowalexandercleaners.co.uk/spring-cleaning-london-kent/" },
      { label: "After-building cleaning", href: "https://willowalexandercleaners.co.uk/after-building-cleaning-london-kent/" },
      { label: "One-off cleaning", href: "https://willowalexandercleaners.co.uk/one-off-cleaning-london-kent/" },
      { label: "Deep cleaning", href: "https://willowalexandercleaners.co.uk/deep-cleaning-london-kent/" },
      { label: "Commercial cleaning", href: "https://willowalexandercleaners.co.uk/commercial-cleaning-london-kent/" },
    ],
  },
  {
    slug: "handyman",
    name: "Handyman",
    business: "Willow Alexander Handyman",
    businessUrl: "https://willowalexanderhandyman.co.uk",
    bookUrl: "https://willowalexanderhandyman.co.uk",
    blurb:
      "Repairs, maintenance and the long list of small jobs around the home, properly done.",
    image: "/services/subbrands/handyman.webp",
    subs: [],
  },
];

export function getServiceBusiness(slug: string): ServiceBusiness | undefined {
  return SERVICE_BUSINESSES.find((b) => b.slug === slug);
}

export const SERVICE_BUSINESS_SLUGS = SERVICE_BUSINESSES.map((b) => b.slug);
