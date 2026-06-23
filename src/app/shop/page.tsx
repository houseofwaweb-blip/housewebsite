import Link from "next/link";
import s from "./shop.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { HouseStandardStrip } from "@/components/marketing/HouseStandardStrip";

/**
 * Marketplace landing — "collections as rooms" (Designer Handover Guide, slide 25).
 * Organises the shop by domestic life rather than a raw product grid. Each room
 * links to its Shopify collection (built by the House from the room-* product
 * tags); "View all products" falls through to the full filterable grid at
 * /shop/all. Room artwork is a marked placeholder until the House supplies it.
 */
const ROOMS = [
  { name: "Kitchen", handle: "kitchen" },
  { name: "Dining & Table", handle: "dining" },
  { name: "Living Room", handle: "living-room" },
  { name: "Bedroom", handle: "bedroom" },
  { name: "Bathroom", handle: "bathroom" },
  { name: "Hallway & Entrance", handle: "hallway" },
  { name: "Garden & Outdoor", handle: "garden" },
  { name: "Utility & Laundry", handle: "utility" },
];

export const metadata = {
  title: { absolute: "The House Marketplace | Shop by room" },
  description:
    "Objects with a place in the House. Shop House Approved goods by room, kitchen, table, garden and more, or browse everything.",
};

export default function ShopPage() {
  return (
    <div className={s.page}>
      {/* Brand intro */}
      <section className="relative overflow-hidden border-b border-house-brown/8 px-[5vw] pt-12 pb-9 text-center">
        <FlowerWatermark color="gold" side="right" opacity={0.18} />
        <div className="relative z-10 max-w-[760px] mx-auto">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-house-gold mb-3">
            The House · Marketplace
          </p>
          <h1 className="font-display text-[clamp(30px,3.4vw,48px)] leading-[1.05] tracking-[-0.01em] text-house-brown">
            Objects with a place{" "}
            <em className="italic" style={{ fontFamily: "var(--font-hearth-serif)" }}>
              in the House.
            </em>
          </h1>
          <p className="font-sans text-[13.5px] text-house-stone max-w-[480px] mx-auto mt-4 leading-[1.6]">
            An edited cabinet, not a catalogue. Each thing here is House Approved,
            chosen for how it is made, how long it lasts, and whether it can be
            mended rather than replaced.
          </p>
        </div>
      </section>

      {/* Shop by room */}
      <section className="px-[5vw] py-[clamp(44px,6vw,80px)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-house-gold mb-2">
                Room by room
              </p>
              <h2 className="font-display italic text-[clamp(26px,3vw,40px)] leading-[1.05] text-house-brown">
                A place for everything.
              </h2>
            </div>
            <Link
              href="/shop/all"
              className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-house-brown no-underline border border-house-brown/25 px-6 py-3 transition-colors hover:border-house-gold hover:text-house-gold-dark"
            >
              View all products <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ROOMS.map((r) => (
              <Link
                key={r.handle}
                href={`/shop/collections/${r.handle}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-house-cream-dark no-underline"
              >
                <span aria-hidden className="absolute inset-4 border border-house-brown/15" />
                <span className="absolute top-6 left-0 right-0 text-center font-sans text-[9px] tracking-[0.3em] uppercase text-house-gold">
                  Placeholder image
                </span>
                <span className="absolute inset-0 flex items-center justify-center px-4 text-center font-display text-[clamp(19px,2.1vw,28px)] leading-[1.1] text-house-brown">
                  {r.name}
                </span>
                <span className="absolute bottom-6 left-0 right-0 text-center font-sans text-[10px] tracking-[0.2em] uppercase text-house-stone transition-colors group-hover:text-house-gold-dark">
                  Shop the room →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HouseStandardStrip />
    </div>
  );
}
