import Link from "next/link";
import Image from "next/image";

/**
 * ProductRailCard — homepage shop rail card. Plain: image, then name and price
 * underneath on the cream ground (no coloured block, no add-to-basket). The
 * extra commerce props are accepted but unused so the homepage can spread the
 * same product object here and into other rails.
 */
export function ProductRailCard({
  name,
  price,
  image,
  href,
}: {
  name: string;
  price: string;
  image: string | null;
  href: string;
  handle?: string;
  variantId?: string;
  multiVariant?: boolean;
  inStock?: boolean;
}) {
  return (
    <Link href={href} className="group block no-underline">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-house-cream-dark">
        {image ? (
          <Image src={image} alt={name} fill sizes="(min-width:640px) 22vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        ) : null}
      </div>
      <p className="mt-3 font-sans text-[14.5px] leading-tight text-house-brown transition-colors group-hover:text-[color:var(--house-green-ink)]">{name}</p>
      <p className="mt-1 font-sans text-[14px] text-house-stone">{price}</p>
    </Link>
  );
}
