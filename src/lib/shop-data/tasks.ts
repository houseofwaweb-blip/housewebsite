/**
 * Task-based shop edits (DIRECTIVE §12: "Merchandise by task as well as room:
 * Garden Ready, Laundry Cabinet, Service Aftercare and Host the Garden").
 *
 * Each task is a curated view over the live catalogue, matched by keyword
 * against a product's title, collection, editorial and brand. The shop landing
 * links to /shop/task/[slug]; the page filters and renders the standard grid.
 */
import type { CatalogueProduct } from "./catalogue";

export interface ShopTask {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  /** Any keyword present in a product's searchable text includes it in the edit. */
  keywords: string[];
}

export const SHOP_TASKS: ShopTask[] = [
  {
    slug: "garden-ready",
    title: "Garden Ready",
    blurb: "Tools, pots and the practical kit for keeping a garden in good order through the seasons.",
    image: "/shop/rooms/garden.webp",
    keywords: [
      "garden", "outdoor", "plant", "planter", "pot", "terracotta", "tool",
      "secateur", "trowel", "watering", "hose", "compost", "soil", "patio",
      "lawn", "seed", "glove", "fork", "spade", "prun", "twine", "bulb",
    ],
  },
  {
    slug: "laundry-cabinet",
    title: "Laundry Cabinet",
    blurb: "Everything for the wash, the line and the linen press, kept the way a well-run house keeps it.",
    image: "/shop/rooms/utility.webp",
    keywords: [
      "laundry", "wash", "detergent", "soap", "iron", "linen", "basket",
      "hamper", "hanger", "clothes", "drying", "airer", "peg", "fabric",
      "wool", "starch", "lavender", "cloth", "towel",
    ],
  },
  {
    slug: "service-aftercare",
    title: "Service Aftercare",
    blurb: "Care and maintenance pieces to keep a home right between House service visits.",
    image: "/shop/rooms/kitchen.webp",
    keywords: [
      "clean", "brush", "polish", "care", "maintenance", "wax", "oil",
      "protect", "sponge", "scrub", "refill", "conditioner", "restore",
      "kit", "duster", "leather", "wood", "stone", "candle care",
    ],
  },
  {
    slug: "host-the-garden",
    title: "Host the Garden",
    blurb: "For long tables and warm evenings outdoors: serve, light and settle in.",
    image: "/shop/rooms/dining.webp",
    keywords: [
      "dining", "table", "glass", "serve", "host", "entertain", "cushion",
      "lantern", "candle", "picnic", "tableware", "jug", "carafe", "platter",
      "napkin", "throw", "tray", "bowl", "board", "outdoor living",
    ],
  },
];

export function findShopTask(slug: string): ShopTask | undefined {
  return SHOP_TASKS.find((t) => t.slug === slug);
}

/** Products whose searchable text matches any of the task's keywords. */
export function productsForTask(task: ShopTask, products: CatalogueProduct[]): CatalogueProduct[] {
  const needles = task.keywords.map((k) => k.toLowerCase());
  return products.filter((p) => {
    const hay = [
      p.title,
      p.collection,
      ...(p.collectionHandles ?? []),
      p.lede,
      p.body,
      p.brand,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return needles.some((n) => hay.includes(n));
  });
}
