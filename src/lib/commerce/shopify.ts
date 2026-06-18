import "server-only";
import { env } from "@/lib/env";
import type {
  CommerceCart,
  CommerceCollection,
  CommerceMoney,
  CommerceProduct,
  CommerceProvider,
} from "./types";

/**
 * Shopify Storefront GraphQL client.
 * Spec: PLAN.md §4.3. Token stays server-side; routes proxy if needed.
 *
 * API version pinned — bump explicitly when testing new Storefront fields.
 */
const API_VERSION = "2025-04";

function endpoint() {
  return `https://${env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;
}

async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  if (!env.SHOPIFY_STORE_DOMAIN || !env.SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Shopify env not configured");
  }
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { tags, revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Shopify ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as { data: T; errors?: Array<{ message: string }> };
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  return json.data;
}

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    availableForSale
    tags
    priceRange {
      minVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    images(first: 6) {
      nodes { url altText width height }
    }
    houseApproved: metafield(namespace: "howa", key: "houseApproved") { value }
    careNotes: metafield(namespace: "howa", key: "careNotes") { value }
    linkedPartner: metafield(namespace: "howa", key: "linkedPartner") { value }
    linkedService: metafield(namespace: "howa", key: "linkedService") { value }
    editorialCopy: metafield(namespace: "howa", key: "editorialCopy") { value }
  }
`;

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  tags: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange?: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { nodes: Array<{ url: string; altText: string | null; width?: number; height?: number }> };
  houseApproved?: { value: string } | null;
  careNotes?: { value: string } | null;
  linkedPartner?: { value: string } | null;
  linkedService?: { value: string } | null;
  editorialCopy?: { value: string } | null;
}

function mapProduct(p: ShopifyProductNode): CommerceProduct {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    editorialCopy: p.editorialCopy?.value,
    price: p.priceRange.minVariantPrice,
    compareAtPrice: p.compareAtPriceRange?.minVariantPrice,
    images: p.images.nodes,
    availableForSale: p.availableForSale,
    tags: p.tags,
    metafields: {
      houseApproved: p.houseApproved?.value === "true",
      careNotes: p.careNotes?.value ?? undefined,
      linkedPartner: p.linkedPartner?.value ?? undefined,
      linkedService: p.linkedService?.value ?? undefined,
    },
  };
}

// ── Cart ──────────────────────────────────────────────────────────────
const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost { subtotalAmount { amount currencyCode } }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url altText }
            price { amount currencyCode }
            product { id handle title featuredImage { url altText } }
          }
        }
      }
    }
  }
`;

interface SfCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image: { url: string; altText: string | null } | null;
    price: CommerceMoney;
    product: { id: string; handle: string; title: string; featuredImage: { url: string; altText: string | null } | null };
  };
}
interface SfCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: CommerceMoney };
  lines: { nodes: SfCartLine[] };
}

function mapCart(c: SfCart): CommerceCart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: c.cost.subtotalAmount,
    lines: c.lines.nodes.map((l) => ({
      id: l.id,
      quantity: l.quantity,
      product: {
        id: l.merchandise.product.id,
        handle: l.merchandise.product.handle,
        title: l.merchandise.product.title,
        images: [l.merchandise.image ?? l.merchandise.product.featuredImage].filter(
          (x): x is { url: string; altText: string | null } => Boolean(x),
        ),
        price: l.merchandise.price,
      },
    })),
  };
}

/** Cart operations must never be cached (carts are mutable, per-user). */
async function cartRequest<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  if (!env.SHOPIFY_STORE_DOMAIN || !env.SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Shopify env not configured");
  }
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify ${res.status} ${res.statusText}`);
  const json = (await res.json()) as { data: T; errors?: Array<{ message: string }> };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data;
}

export const shopifyProvider: CommerceProvider = {
  async getProductByHandle(handle) {
    const data = await storefront<{ product: ShopifyProductNode | null }>(
      `${PRODUCT_FRAGMENT}
      query ($handle: String!) {
        product(handle: $handle) { ...ProductFields }
      }`,
      { handle },
      [`product:${handle}`],
    );
    return data.product ? mapProduct(data.product) : null;
  },

  async getCollection(handle, limit = 12) {
    const data = await storefront<{
      collection: {
        id: string;
        handle: string;
        title: string;
        description: string;
        image: { url: string; altText: string | null } | null;
        products: { nodes: ShopifyProductNode[] };
      } | null;
    }>(
      `${PRODUCT_FRAGMENT}
      query ($handle: String!, $limit: Int!) {
        collection(handle: $handle) {
          id handle title description
          image { url altText }
          products(first: $limit) { nodes { ...ProductFields } }
        }
      }`,
      { handle, limit },
      [`collection:${handle}`],
    );
    if (!data.collection) return null;
    return {
      id: data.collection.id,
      handle: data.collection.handle,
      title: data.collection.title,
      description: data.collection.description,
      image: data.collection.image ?? undefined,
      products: data.collection.products.nodes.map(mapProduct),
    } satisfies CommerceCollection;
  },

  async listFeaturedProducts(limit = 8) {
    const data = await storefront<{ products: { nodes: ShopifyProductNode[] } }>(
      `${PRODUCT_FRAGMENT}
      query ($limit: Int!) {
        products(first: $limit, query: "tag:featured") { nodes { ...ProductFields } }
      }`,
      { limit },
      ["products:featured"],
    );
    let nodes = data.products.nodes;
    // No products are tagged "featured" yet — fall back to best-sellers so
    // surfaces like the homepage Marketplace always show real product imagery.
    if (nodes.length === 0) {
      const fallback = await storefront<{ products: { nodes: ShopifyProductNode[] } }>(
        `${PRODUCT_FRAGMENT}
        query ($limit: Int!) {
          products(first: $limit, sortKey: BEST_SELLING) { nodes { ...ProductFields } }
        }`,
        { limit },
        ["products:bestselling"],
      );
      nodes = fallback.products.nodes;
    }
    return nodes.map(mapProduct);
  },

  async searchProducts(query: string, limit = 10) {
    const data = await storefront<{ products: { nodes: ShopifyProductNode[] } }>(
      `${PRODUCT_FRAGMENT}
      query ($query: String!, $limit: Int!) {
        products(first: $limit, query: $query) { nodes { ...ProductFields } }
      }`,
      { query, limit },
      ["products:search"],
    );
    return data.products.nodes.map(mapProduct);
  },

  // Cart — Storefront Cart API. Returns a cart carrying `checkoutUrl`.
  async createCart(): Promise<CommerceCart> {
    const data = await cartRequest<{ cartCreate: { cart: SfCart } }>(
      `${CART_FRAGMENT}
      mutation { cartCreate { cart { ...CartFields } } }`,
      {},
    );
    return mapCart(data.cartCreate.cart);
  },
  async getCart(cartId: string): Promise<CommerceCart | null> {
    const data = await cartRequest<{ cart: SfCart | null }>(
      `${CART_FRAGMENT}
      query ($id: ID!) { cart(id: $id) { ...CartFields } }`,
      { id: cartId },
    );
    return data.cart ? mapCart(data.cart) : null;
  },
  async addLine(cartId: string, merchandiseId: string, quantity: number): Promise<CommerceCart> {
    const data = await cartRequest<{ cartLinesAdd: { cart: SfCart } }>(
      `${CART_FRAGMENT}
      mutation ($id: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $id, lines: $lines) { cart { ...CartFields } }
      }`,
      { id: cartId, lines: [{ merchandiseId, quantity }] },
    );
    return mapCart(data.cartLinesAdd.cart);
  },
  async removeLine(cartId: string, lineId: string): Promise<CommerceCart> {
    const data = await cartRequest<{ cartLinesRemove: { cart: SfCart } }>(
      `${CART_FRAGMENT}
      mutation ($id: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $id, lineIds: $lineIds) { cart { ...CartFields } }
      }`,
      { id: cartId, lineIds: [lineId] },
    );
    return mapCart(data.cartLinesRemove.cart);
  },
  async updateLine(cartId: string, lineId: string, quantity: number): Promise<CommerceCart> {
    const data = await cartRequest<{ cartLinesUpdate: { cart: SfCart } }>(
      `${CART_FRAGMENT}
      mutation ($id: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $id, lines: $lines) { cart { ...CartFields } }
      }`,
      { id: cartId, lines: [{ id: lineId, quantity }] },
    );
    return mapCart(data.cartLinesUpdate.cart);
  },
};
