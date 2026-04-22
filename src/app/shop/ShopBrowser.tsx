"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { CatalogueProduct, CatalogueCollection, CatalogueBrand } from "@/lib/shop-data/catalogue";

const PRICE_RANGES = [
  { label: "Any", min: 0, max: Infinity },
  { label: "Under £25", min: 0, max: 25 },
  { label: "£25 – £50", min: 25, max: 50 },
  { label: "£50 – £100", min: 50, max: 100 },
  { label: "£100 – £250", min: 100, max: 250 },
  { label: "£250+", min: 250, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Newest", fn: () => 0 },
  { label: "Price: low → high", fn: (a: CatalogueProduct, b: CatalogueProduct) => parsePrice(a.price) - parsePrice(b.price) },
  { label: "Price: high → low", fn: (a: CatalogueProduct, b: CatalogueProduct) => parsePrice(b.price) - parsePrice(a.price) },
  { label: "Name A–Z", fn: (a: CatalogueProduct, b: CatalogueProduct) => a.title.localeCompare(b.title) },
];

function parsePrice(p: string): number {
  return parseFloat(p.replace(/[^0-9.]/g, "")) || 0;
}

function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2.5 bg-transparent border-0 cursor-pointer"
      >
        <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold">
          {title}
        </span>
        <span
          className={cn(
            "font-display text-[16px] text-house-gold transition-transform duration-[var(--t-slow)] ease-out",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-[var(--t-slow)] ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className={cn(
          "overflow-hidden transition-opacity duration-[var(--t-slow)] ease-out",
          open ? "opacity-100" : "opacity-0",
        )}>
          <div className="pb-3">{children}</div>
        </div>
      </div>
      <div className="h-px bg-house-brown/6" />
    </div>
  );
}

function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 font-sans text-[12px] text-house-stone cursor-pointer py-1">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-8 h-[18px] border relative cursor-pointer transition-all duration-[var(--t-base)]",
          "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-3 after:h-3 after:bg-white after:transition-transform after:duration-[var(--t-base)] after:ease-out",
          on
            ? "bg-house-gold border-house-gold after:translate-x-[14px]"
            : "bg-house-cream border-house-brown/20",
        )}
      />
      {label}
    </label>
  );
}

export function ShopBrowser({
  products,
  collections,
  brands,
}: {
  products: CatalogueProduct[];
  collections: CatalogueCollection[];
  brands: CatalogueBrand[];
}) {
  const [search, setSearch] = React.useState("");
  const [activeCollections, setActiveCollections] = React.useState<Set<string>>(new Set());
  const [activeBrands, setActiveBrands] = React.useState<Set<string>>(new Set());
  const [priceIdx, setPriceIdx] = React.useState(0);
  const [sortIdx, setSortIdx] = React.useState(0);
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const [approvedOnly, setApprovedOnly] = React.useState(false);
  const [transitioning, setTransitioning] = React.useState(false);
  const prevFilterRef = React.useRef("");

  function toggleSet<T>(set: Set<T>, value: T): Set<T> {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  }

  const filtered = React.useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.lede.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q),
      );
    }

    if (activeCollections.size > 0) {
      result = result.filter(
        (p) =>
          activeCollections.has(
            p.collection.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
          ),
      );
    }

    if (activeBrands.size > 0) {
      result = result.filter((p) => activeBrands.has(p.brand));
    }

    const range = PRICE_RANGES[priceIdx];
    if (range && (range.max !== Infinity || range.min > 0)) {
      result = result.filter((p) => {
        const price = parsePrice(p.price);
        return price >= range.min && (range.max === Infinity || price < range.max);
      });
    }

    if (inStockOnly) result = result.filter((p) => p.inStock);
    if (approvedOnly) result = result.filter((p) => p.houseApproved);

    const sortFn = SORT_OPTIONS[sortIdx]?.fn;
    if (sortFn) result.sort(sortFn);

    return result;
  }, [products, search, activeCollections, activeBrands, priceIdx, sortIdx, inStockOnly, approvedOnly]);

  const filterKey = `${[...activeCollections].join(",")}-${[...activeBrands].join(",")}-${priceIdx}-${inStockOnly}-${approvedOnly}-${search}`;
  React.useEffect(() => {
    if (prevFilterRef.current && prevFilterRef.current !== filterKey) {
      setTransitioning(true);
      const t = setTimeout(() => setTransitioning(false), 80);
      return () => clearTimeout(t);
    }
    prevFilterRef.current = filterKey;
  }, [filterKey]);

  function clearFilters() {
    setSearch("");
    setActiveCollections(new Set());
    setActiveBrands(new Set());
    setPriceIdx(0);
    setSortIdx(0);
    setInStockOnly(false);
    setApprovedOnly(false);
  }

  const hasFilters = search || activeCollections.size > 0 || activeBrands.size > 0 || priceIdx > 0 || inStockOnly || approvedOnly;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[80vh]">
      {/* ══════ SIDEBAR ══════ */}
      <aside className="md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-r md:border-house-brown/8 bg-house-white px-6 py-5 max-md:border-b max-md:border-house-brown/8 max-md:px-[5vw] max-md:py-4">
        {/* Search */}
        <div className="mb-4">
          <div className="font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold mb-2">
            Search
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2.5 border border-house-brown/12 bg-house-cream font-display text-[15px] font-normal italic text-house-brown placeholder:text-house-stone placeholder:italic focus:border-house-gold focus:outline-none transition-colors duration-[var(--t-base)]"
          />
        </div>

        <div className="h-px bg-house-brown/6 mb-1" />

        {/* Collections — collapsible */}
        <FilterSection title="Collections" defaultOpen>
          <div className="flex flex-col gap-0 max-md:flex-row max-md:flex-wrap max-md:gap-2">
            <button
              type="button"
              onClick={() => setActiveCollections(new Set())}
              className={cn(
                "text-left py-1.5 font-sans text-[13px] bg-transparent border-0 cursor-pointer transition-all duration-[var(--t-base)]",
                "max-md:px-3 max-md:py-1 max-md:border max-md:border-house-brown/10 max-md:text-[11px]",
                activeCollections.size === 0
                  ? "text-house-gold font-normal max-md:border-house-gold"
                  : "text-house-stone hover:text-house-brown hover:pl-1 max-md:hover:pl-0",
              )}
            >
              All <span className="text-[10px] text-house-stone ml-1">{products.length}</span>
            </button>
            {collections.map((c) => (
              <button
                key={c.handle}
                type="button"
                onClick={() => setActiveCollections(toggleSet(activeCollections, c.handle))}
                className={cn(
                  "text-left py-1.5 font-sans text-[13px] bg-transparent border-0 cursor-pointer transition-all duration-[var(--t-base)]",
                  "max-md:px-3 max-md:py-1 max-md:border max-md:border-house-brown/10 max-md:text-[11px]",
                  activeCollections.has(c.handle)
                    ? "text-house-gold font-normal max-md:border-house-gold"
                    : "text-house-stone hover:text-house-brown hover:pl-1 max-md:hover:pl-0",
                )}
              >
                {c.title} <span className="text-[10px] text-house-stone ml-1">{c.productCount}</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Brand — collapsible */}
        <FilterSection title="Brand">
          <div className="flex flex-col gap-0 max-h-[200px] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveBrands(new Set())}
              className={cn(
                "text-left py-1 font-sans text-[12px] bg-transparent border-0 cursor-pointer transition-colors duration-[var(--t-base)]",
                activeBrands.size === 0 ? "text-house-gold" : "text-house-stone hover:text-house-brown",
              )}
            >
              All brands
            </button>
            {brands.map((b) => (
              <button
                key={b.name}
                type="button"
                onClick={() => setActiveBrands(toggleSet(activeBrands, b.name))}
                className={cn(
                  "text-left py-1 font-sans text-[12px] bg-transparent border-0 cursor-pointer transition-colors duration-[var(--t-base)]",
                  activeBrands.has(b.name) ? "text-house-gold" : "text-house-stone hover:text-house-brown",
                )}
              >
                {b.name} <span className="text-[10px] text-house-stone ml-1">{b.count}</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Price — collapsible */}
        <FilterSection title="Price">
          <div className="flex flex-col gap-0">
            {PRICE_RANGES.map((r, i) => (
              <button
                key={r.label}
                type="button"
                onClick={() => setPriceIdx(i)}
                className={cn(
                  "text-left py-1 font-sans text-[12px] bg-transparent border-0 cursor-pointer transition-colors duration-[var(--t-base)]",
                  priceIdx === i ? "text-house-gold" : "text-house-stone hover:text-house-brown",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Toggles — collapsible */}
        <FilterSection title="Filters">
          <Toggle on={inStockOnly} onToggle={() => setInStockOnly(!inStockOnly)} label="In stock only" />
          <Toggle on={approvedOnly} onToggle={() => setApprovedOnly(!approvedOnly)} label="House Approved only" />
        </FilterSection>

        {hasFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 font-sans text-[10px] tracking-[0.14em] uppercase text-house-gold bg-transparent border-0 cursor-pointer border-b border-dotted border-house-gold pb-0.5 hover:border-solid transition-all max-md:hidden"
          >
            Clear all filters ×
          </button>
        ) : null}
      </aside>

      {/* ══════ GRID ══════ */}
      <div className="px-[5vw] md:px-8 py-6 pb-16">
        {/* Utility bar */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-sans text-[12px] text-house-stone">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-2 font-sans text-[10px] tracking-[0.12em] uppercase text-house-gold bg-transparent border-0 cursor-pointer border-b border-dotted border-house-gold pb-px"
              >
                Clear ×
              </button>
            ) : null}
          </span>
          <select
            value={sortIdx}
            onChange={(e) => setSortIdx(Number(e.target.value))}
            className="font-sans text-[11px] tracking-[0.1em] uppercase text-house-stone bg-transparent border-0 cursor-pointer focus:outline-none"
          >
            {SORT_OPTIONS.map((o, i) => (
              <option key={o.label} value={i}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Products */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display italic text-[18px] text-house-stone mb-4">
              No products match your filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold bg-transparent border-0 cursor-pointer border-b border-dotted border-house-gold pb-0.5"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "grid grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-[var(--t-base)] ease-out",
              transitioning ? "opacity-0" : "opacity-100",
            )}
          >
            {filtered.map((p, i) => (
              <Link
                key={p.handle}
                href={`/shop/${p.handle}`}
                className={cn(
                  "group bg-house-white border border-house-brown/6 no-underline",
                  "transition-all duration-[var(--t-slow)] ease-out",
                  "hover:border-house-gold hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(48,35,28,0.08)]",
                  "[animation:howa-slide-in_var(--t-xslow)_var(--ease-out)_both]",
                  i === 0 && !search && activeCollections.size === 0 && activeBrands.size === 0 && "lg:col-span-2",
                )}
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              >
                <div className={cn(
                  "relative overflow-hidden bg-house-cream",
                  i === 0 && !search && activeCollections.size === 0 && activeBrands.size === 0 ? "aspect-[8/5]" : "aspect-[4/5]",
                )}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                  />
                  {p.houseApproved ? (
                    <span className="absolute top-2 left-2 font-sans text-[8px] tracking-[0.2em] uppercase text-house-gold bg-white/92 px-2 py-1 border border-house-gold/30">
                      House Approved
                    </span>
                  ) : null}
                  {p.onSale ? (
                    <span className="absolute top-2 right-2 font-sans text-[8px] tracking-[0.16em] uppercase bg-house-brown text-house-cream px-2 py-1">
                      Sale
                    </span>
                  ) : null}
                </div>
                <div className="px-4 py-3.5">
                  <div className="font-sans text-[9px] tracking-[0.18em] uppercase text-house-gold mb-0.5">
                    {p.collection}
                  </div>
                  <div className="font-display font-medium text-[15px] text-house-brown group-hover:text-house-gold transition-colors duration-[var(--t-base)] mb-0.5">
                    {p.title}
                  </div>
                  {p.brand ? (
                    <div className="font-sans text-[10px] text-house-stone mb-1">
                      {p.brand}
                    </div>
                  ) : null}
                  <div className="font-display font-medium text-[14px]">
                    {p.compareAtPrice ? (
                      <>
                        <span className="text-house-stone line-through text-[12px] mr-1.5">
                          {p.compareAtPrice}
                        </span>
                        {p.price}
                      </>
                    ) : (
                      p.price
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
