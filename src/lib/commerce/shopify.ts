import "server-only";
import { env } from "@/lib/env";
import type {
  CommerceCart,
  CommerceCollection,
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
    return data.products.nodes.map(mapProduct);
  },

  // Cart mutations — implement lazily. Throw until wired up.
  async createCart(): Promise<CommerceCart> {
    throw new Error("createCart not yet implemented");
  },
  async getCart(): Promise<CommerceCart | null> {
    throw new Error("getCart not yet implemented");
  },
  async addLine(): Promise<CommerceCart> {
    throw new Error("addLine not yet implemented");
  },
  async removeLine(): Promise<CommerceCart> {
    throw new Error("removeLine not yet implemented");
  },
  async updateLine(): Promise<CommerceCart> {
    throw new Error("updateLine not yet implemented");
  },
};
