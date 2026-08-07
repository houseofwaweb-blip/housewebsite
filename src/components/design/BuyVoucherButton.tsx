import Link from "next/link";
import { getDesignVoucher } from "@/lib/design-vouchers";

/**
 * BuyVoucherButton — opens the package's product page (/shop/[handle]), the same
 * product-page experience as clicking any shop item: image, price, description
 * and (once the store is live) add-to-basket. The voucher product is published
 * but sits in no collection, so it never appears in the /shop listing — only
 * from here. Falls back to the contact page if the product isn't wired yet.
 */
export function BuyVoucherButton({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const voucher = getDesignVoucher(name);
  const href = voucher?.handle ? `/shop/${voucher.handle}` : "/contact";
  return (
    <Link href={href} className={className}>
      {voucher?.handle ? "View package →" : "Enquire →"}
    </Link>
  );
}
