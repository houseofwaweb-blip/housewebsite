/**
 * Placeholder shop data. Mirrors the Shopify Storefront shape so
 * swapping to real Shopify calls is a single-line change per query.
 *
 * Products are inspired by the WP WooCommerce catalogue at
 * willowalexander.co.uk/shop — British lifestyle, garden, home.
 */

import type { ProductCardData } from "@/components/commerce/ProductCard";

export interface ShopProduct extends ProductCardData {
  lede: string;
  body: string;
  images: Array<{ src: string; alt: string }>;
  careNotes?: string;
  materials?: string;
  dimensions?: string;
  delivery?: string;
  relatedHandles?: string[];
}

export interface ShopCollection {
  handle: string;
  title: string;
  description: string;
  image?: string;
  productHandles: string[];
}

// ---------------------------------------------------------------------------
// Placeholder products
// ---------------------------------------------------------------------------
const img = (n: number) => `/partners/project-${n}.jpg`;

export const PRODUCTS: ShopProduct[] = [
  {
    handle: "heritage-secateurs",
    title: "Heritage Secateurs",
    price: "£48",
    image: img(1),
    houseApproved: true,
    collection: "Garden",
    lede: "Japanese carbon steel, walnut handles. The last pair you buy.",
    body: "Hand-forged in Sheffield from Japanese Aogami carbon steel. The walnut handles are turned from a single billet and finished with linseed oil. They sharpen easily, hold an edge, and develop a beautiful patina with use. Supplied in a waxed cotton sleeve.",
    images: [{ src: img(1), alt: "Heritage Secateurs" }, { src: img(2), alt: "Detail" }, { src: img(3), alt: "In use" }],
    careNotes: "Wipe clean after use. Oil the pivot annually. Sharpen with a fine whetstone.",
    materials: "Japanese Aogami carbon steel blade, English walnut handle, brass pivot pin.",
    dimensions: "Overall length 210mm. Blade 55mm.",
    delivery: "Free UK delivery. Ships within 2 working days.",
    relatedHandles: ["copper-watering-can", "garden-kneeler", "linen-garden-apron"],
  },
  {
    handle: "copper-watering-can",
    title: "Copper Watering Can",
    price: "£125",
    image: img(2),
    houseApproved: true,
    collection: "Garden",
    lede: "Solid copper, brass rose. Develops a living patina over the seasons.",
    body: "Hand-spun from a single sheet of 0.7mm copper. The brass rose gives a fine, even spray. Holds 5 litres. Over time the copper develops a natural verdigris patina — the sign of a tool in use. Made in England.",
    images: [{ src: img(2), alt: "Copper Watering Can" }, { src: img(4), alt: "Detail" }],
    careNotes: "Do not polish unless you prefer bright copper. Empty after use in winter to avoid frost damage.",
    materials: "0.7mm solid copper body, brass rose and handle fittings.",
    dimensions: "Height 280mm. Capacity 5 litres.",
    delivery: "Free UK delivery. Ships within 3 working days.",
    relatedHandles: ["heritage-secateurs", "garden-kneeler"],
  },
  {
    handle: "garden-kneeler",
    title: "Garden Kneeler",
    price: "£36",
    image: img(3),
    collection: "Garden",
    lede: "Dense foam, waxed canvas cover. Comfortable, wipe-clean, built to last.",
    body: "A thick memory-foam kneeler wrapped in waxed cotton canvas. The cover is removable and washable. Brass eyelets for hanging. The sort of thing you use every time you're in the garden and never think about until you don't have it.",
    images: [{ src: img(3), alt: "Garden Kneeler" }],
    delivery: "Free UK delivery. Ships within 2 working days.",
    relatedHandles: ["heritage-secateurs", "linen-garden-apron"],
  },
  {
    handle: "linen-garden-apron",
    title: "Linen Garden Apron",
    price: "£52",
    image: img(4),
    houseApproved: true,
    collection: "Garden",
    lede: "Heavyweight Irish linen. Leather straps, brass buckles.",
    body: "Cut from 12oz Irish linen in a natural oat colour. The cross-back straps are vegetable-tanned leather with solid brass buckles. Three front pockets sized for secateurs, twine, and a phone. Machine-washable. Gets better with every wash.",
    images: [{ src: img(4), alt: "Linen Garden Apron" }, { src: img(5), alt: "Detail" }],
    materials: "12oz Irish linen, vegetable-tanned leather, solid brass.",
    delivery: "Free UK delivery. Ships within 2 working days.",
    relatedHandles: ["heritage-secateurs", "garden-kneeler"],
  },
  {
    handle: "beeswax-candle-set",
    title: "English Beeswax Candle Set",
    price: "£28",
    image: img(5),
    collection: "Home",
    lede: "Hand-rolled in Devon. Unscented, slow-burning, beautiful light.",
    body: "A set of four hand-rolled beeswax candles from a family apiary in Devon. Unscented — the natural honey aroma is enough. Each candle burns for approximately 8 hours with a steady, warm flame. Wrapped in tissue and kraft.",
    images: [{ src: img(5), alt: "Beeswax Candle Set" }],
    delivery: "Free UK delivery. Ships within 2 working days.",
    relatedHandles: ["stoneware-oil-burner", "heritage-secateurs"],
  },
  {
    handle: "stoneware-oil-burner",
    title: "Stoneware Oil Burner",
    price: "£34",
    image: img(6),
    collection: "Home",
    lede: "Wheel-thrown stoneware, unglazed. For essential oils or wax melts.",
    body: "Hand-thrown on a potter's wheel from high-fire stoneware clay. The matte, unglazed surface absorbs a little oil over time, building a gentle scent memory. Designed for tealight use. Made in Stoke-on-Trent.",
    images: [{ src: img(6), alt: "Stoneware Oil Burner" }, { src: img(1), alt: "In use" }],
    materials: "High-fire stoneware, unglazed.",
    dimensions: "Diameter 100mm. Height 120mm.",
    delivery: "Free UK delivery. Ships within 3 working days.",
    relatedHandles: ["beeswax-candle-set"],
  },
  {
    handle: "waxed-stockman-coat",
    title: "Waxed Stockman Coat",
    price: "£295",
    compareAtPrice: "£345",
    image: img(1),
    houseApproved: true,
    collection: "Wear",
    lede: "Full-length waxed cotton. Storm cape, throat latch, corduroy collar.",
    body: "A full-length stockman's coat in 8oz waxed cotton, based on a traditional Australian drover's pattern adapted for English weather. Storm cape across the shoulders sheds rain. Corduroy collar stands up against wind. Interior game pocket. Re-waxable indefinitely. Made in England.",
    images: [{ src: img(1), alt: "Waxed Stockman Coat" }, { src: img(3), alt: "Detail" }, { src: img(5), alt: "Worn" }],
    careNotes: "Re-wax annually with a proprietary wax dressing. Hang to dry, do not machine-wash.",
    materials: "8oz waxed cotton, cotton lining, corduroy collar, brass hardware.",
    delivery: "Free UK delivery. Ships within 3 working days.",
    relatedHandles: ["linen-garden-apron"],
  },
  {
    handle: "handforged-boot-scraper",
    title: "Hand-Forged Boot Scraper",
    price: "£65",
    image: img(2),
    houseApproved: true,
    collection: "Home",
    lede: "Wall-mounted or freestanding. Blacksmith-made in the Cotswolds.",
    body: "Forged by hand from a single bar of mild steel by a Cotswolds blacksmith. The slight irregularity of the surface is the point — each one is unique. Available wall-mounted (with fixings) or freestanding (weighted base). Finished with a clear wax to slow the natural patina.",
    images: [{ src: img(2), alt: "Hand-Forged Boot Scraper" }, { src: img(6), alt: "Detail" }],
    materials: "Mild steel, beeswax finish.",
    delivery: "Free UK delivery. Ships within 5 working days (made to order).",
    relatedHandles: ["heritage-secateurs", "copper-watering-can"],
  },
];

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------
export const COLLECTIONS: ShopCollection[] = [
  {
    handle: "house-approved",
    title: "House Approved",
    description: "Objects that carry the House seal. Vetted for craft, provenance, and the kind of use a real home puts things through.",
    productHandles: PRODUCTS.filter((p) => p.houseApproved).map((p) => p.handle),
  },
  {
    handle: "garden",
    title: "Garden",
    description: "Tools, aprons, and the quiet equipment of a garden kept well.",
    productHandles: PRODUCTS.filter((p) => p.collection === "Garden").map((p) => p.handle),
  },
  {
    handle: "home",
    title: "Home",
    description: "Candles, ceramics, and things that earn their place on a shelf.",
    productHandles: PRODUCTS.filter((p) => p.collection === "Home").map((p) => p.handle),
  },
  {
    handle: "wear",
    title: "Wear",
    description: "Coats, aprons, and durable cloth for the garden and beyond.",
    productHandles: PRODUCTS.filter((p) => p.collection === "Wear").map((p) => p.handle),
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function findProduct(handle: string): ShopProduct | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function findCollection(handle: string): ShopCollection | undefined {
  return COLLECTIONS.find((c) => c.handle === handle);
}

export function getRelatedProducts(handles: string[]): ShopProduct[] {
  return handles.map((h) => findProduct(h)).filter(Boolean) as ShopProduct[];
}
