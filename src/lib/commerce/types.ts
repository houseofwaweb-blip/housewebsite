/**
 * CommerceProvider interface.
 * Shopify at launch; swappable for HoWA Product commerce later.
 * Spec: CLAUDE.md "Commerce" section.
 */

export interface CommerceMoney {
  amount: string;
  currencyCode: string;
}

export interface CommerceImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface CommerceVariant {
  /** Numeric-tail id kept as the full gid; use numericId() for the URL param. */
  id: string;
  title: string;
  sku: string | null;
  barcode: string | null;
  availableForSale: boolean;
  price: CommerceMoney;
  compareAtPrice?: CommerceMoney;
  image?: CommerceImage;
}

export interface CommerceProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  editorialCopy?: string;
  /** Shopify vendor — used as the schema.org / feed brand. */
  vendor?: string;
  price: CommerceMoney;
  compareAtPrice?: CommerceMoney;
  images: CommerceImage[];
  availableForSale: boolean;
  tags: string[];
  /** Present when fetched via getProductByHandle; used for SKU/GTIN + ?variant. */
  variants?: CommerceVariant[];
  metafields: {
    houseApproved?: boolean;
    careNotes?: string;
    linkedPartner?: string;
    linkedService?: string;
  };
}

export interface CommerceCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: CommerceImage;
  products: CommerceProduct[];
}

export interface CommerceCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: CommerceMoney;
  lines: Array<{
    id: string;
    quantity: number;
    /** Variant SKU — the GA4 item_id / feed g:id for begin_checkout. */
    sku?: string | null;
    product: Pick<CommerceProduct, "id" | "handle" | "title" | "images" | "price">;
  }>;
}

export interface CommerceProvider {
  getProductByHandle(handle: string): Promise<CommerceProduct | null>;
  getCollection(handle: string, limit?: number): Promise<CommerceCollection | null>;
  listFeaturedProducts(limit?: number): Promise<CommerceProduct[]>;
  listBestSellers(limit?: number): Promise<CommerceProduct[]>;
  listNewArrivals(limit?: number): Promise<CommerceProduct[]>;
  searchProducts(query: string, limit?: number): Promise<CommerceProduct[]>;
  createCart(): Promise<CommerceCart>;
  getCart(cartId: string): Promise<CommerceCart | null>;
  addLine(cartId: string, merchandiseId: string, quantity: number): Promise<CommerceCart>;
  removeLine(cartId: string, lineId: string): Promise<CommerceCart>;
  updateLine(cartId: string, lineId: string, quantity: number): Promise<CommerceCart>;
}
