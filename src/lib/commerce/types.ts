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

export interface CommerceProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  editorialCopy?: string;
  price: CommerceMoney;
  compareAtPrice?: CommerceMoney;
  images: CommerceImage[];
  availableForSale: boolean;
  tags: string[];
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
    product: Pick<CommerceProduct, "id" | "handle" | "title" | "images" | "price">;
  }>;
}

export interface CommerceProvider {
  getProductByHandle(handle: string): Promise<CommerceProduct | null>;
  getCollection(handle: string, limit?: number): Promise<CommerceCollection | null>;
  listFeaturedProducts(limit?: number): Promise<CommerceProduct[]>;
  searchProducts(query: string, limit?: number): Promise<CommerceProduct[]>;
  createCart(): Promise<CommerceCart>;
  getCart(cartId: string): Promise<CommerceCart | null>;
  addLine(cartId: string, merchandiseId: string, quantity: number): Promise<CommerceCart>;
  removeLine(cartId: string, lineId: string): Promise<CommerceCart>;
  updateLine(cartId: string, lineId: string, quantity: number): Promise<CommerceCart>;
}
