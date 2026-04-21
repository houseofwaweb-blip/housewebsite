"use client";

import { useCart } from "@/components/commerce/CartContext";
import type { ShopProduct } from "@/lib/shop-data";

export function AddToBasketButton({
  product: p,
  className,
}: {
  product: Pick<ShopProduct, "handle" | "title" | "price" | "image" | "collection" | "houseApproved" | "images">;
  className?: string;
}) {
  const { add, openDrawer } = useCart();

  function handleAdd() {
    add({
      handle: p.handle,
      title: p.title,
      price: p.price,
      image: p.images?.[0]?.src ?? p.image,
      collection: p.collection ?? "",
      houseApproved: p.houseApproved,
    });
    openDrawer();
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={className}
    >
      Add to basket
    </button>
  );
}
