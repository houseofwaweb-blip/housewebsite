#!/usr/bin/env node
/**
 * Transform WooCommerce product dump into the shop data format.
 * Filters to published products only, strips HTML from descriptions,
 * maps categories, and outputs a JSON file the site can import.
 *
 * Usage: node scripts/transform-woo-products.mjs
 */
import { readFileSync, writeFileSync } from "fs";

const raw = JSON.parse(readFileSync("scripts/woo-products.json", "utf-8"));

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapCategory(categories) {
  if (!categories?.length) return "Uncategorised";
  const names = categories.map((c) => c.name.replace(/&amp;/g, "&"));
  const serviceTypes = ["Service Subscriptions", "House Plans", "Memberships", "Home & Garden+", "Garden Design", "Interior Design"];
  const filtered = names.filter((n) => !serviceTypes.includes(n) && n !== "All Products" && n !== "Uncategorised" && n !== "Uncategorized");
  if (filtered.length === 0) return names[0]?.replace(/&amp;/g, "&") || "Uncategorised";
  const priority = ["Gardening", "Garden Tools", "Home Accessories", "Home Décor", "Cleaning Products", "Soft Furnishings", "Lighting", "Furniture & Storage", "Apparel", "Books", "Pets"];
  for (const p of priority) {
    if (filtered.includes(p)) return p;
  }
  return filtered[0];
}

function isHouseApproved(product) {
  const tags = (product.tags || []).map((t) => t.name.toLowerCase());
  return tags.some((t) => t.includes("house approved") || t.includes("featured"));
}

const products = raw
  .filter((p) => p.status === "publish" && parseFloat(p.price) > 0)
  .filter((p) => {
    const cats = (p.categories || []).map((c) => c.name);
    return !cats.includes("Service Subscriptions") && !cats.includes("House Plans") && !cats.includes("Memberships") && !cats.includes("Gift Cards");
  })
  .map((p) => ({
    handle: p.slug,
    title: stripHtml(p.name),
    price: `£${parseFloat(p.price).toFixed(2)}`,
    ...(p.sale_price && p.regular_price && p.sale_price !== p.regular_price
      ? { compareAtPrice: `£${parseFloat(p.regular_price).toFixed(2)}` }
      : {}),
    image: p.images?.[0]?.src || "",
    images: (p.images || []).slice(0, 6).map((img) => ({
      src: img.src,
      alt: stripHtml(img.alt) || stripHtml(p.name),
    })),
    collection: mapCategory(p.categories),
    houseApproved: isHouseApproved(p),
    lede: stripHtml(p.short_description) || stripHtml(p.name),
    body: stripHtml(p.description),
    sku: p.sku || "",
    inStock: p.stock_status === "instock",
    onSale: p.on_sale || false,
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

const collections = {};
for (const p of products) {
  if (!collections[p.collection]) {
    collections[p.collection] = {
      handle: p.collection.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
      title: p.collection,
      productCount: 0,
    };
  }
  collections[p.collection].productCount++;
}

const output = {
  generatedAt: new Date().toISOString(),
  totalProducts: products.length,
  collections: Object.values(collections).sort((a, b) => b.productCount - a.productCount),
  products,
};

writeFileSync("src/lib/shop-data/woo-catalogue.json", JSON.stringify(output, null, 2));
console.log(`Transformed ${products.length} products across ${output.collections.length} collections`);
console.log("Top collections:");
output.collections.slice(0, 10).forEach((c) => console.log(`  ${c.title}: ${c.productCount}`));
console.log(`Saved to src/lib/shop-data/woo-catalogue.json`);
