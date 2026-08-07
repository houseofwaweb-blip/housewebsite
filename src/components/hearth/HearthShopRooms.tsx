import Image from "next/image";
import Link from "next/link";

/**
 * HearthShopRooms — replaces the old Hearth Collection band. A "shop the House,
 * room by room" section on the Hearth landing: four room images linking into the
 * Marketplace room collections.
 */
const ROOMS = [
  { name: "Living Room", handle: "living-room", image: "/shop/rooms/living-room.webp" },
  { name: "Kitchen", handle: "kitchen", image: "/shop/rooms/kitchen.webp" },
  { name: "Bedroom", handle: "bedroom", image: "/shop/rooms/bedroom.webp" },
  { name: "Garden & Outdoor", handle: "garden-outdoor", image: "/shop/rooms/garden.webp" },
];

export function HearthShopRooms() {
  return (
    <section
      aria-label="Shop the House, room by room"
      className="bg-house-cream-dark px-[5vw] py-[72px] border-t border-b border-house-brown/8 my-8"
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="mb-9 max-w-[560px]">
          <span className="block mb-[14px] font-hearth-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
            ◆ Shop the House · Room by room
          </span>
          <h2 className="font-hearth-serif font-medium text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-[-0.005em] text-house-black mb-3">
            Shop the House, <em className="italic font-normal">room by room.</em>
          </h2>
          <p className="font-hearth-serif italic text-[18px] leading-[1.55] text-house-stone max-w-[460px]">
            Considered pieces for every room, chosen the way the House would furnish its own.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ROOMS.map((r) => (
            <Link
              key={r.handle}
              href={`/shop/collections/${r.handle}`}
              className="group relative block aspect-[4/5] overflow-hidden bg-house-cream no-underline"
            >
              <Image
                src={r.image}
                alt={r.name}
                fill
                sizes="(min-width: 768px) 22vw, 45vw"
                className="object-cover transition-transform duration-[var(--t-slow)] ease-out group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(26,19,13,0.62), rgba(26,19,13,0) 55%)" }}
              />
              <span className="absolute inset-x-0 bottom-0 p-4 font-hearth-sans text-[13px] tracking-[0.16em] uppercase text-white">
                {r.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-block font-hearth-sans text-[12px] tracking-[0.2em] uppercase text-white bg-house-black px-6 py-[13px] no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-brown"
          >
            Explore the Marketplace →
          </Link>
        </div>
      </div>
    </section>
  );
}
