"use client";

import { useState } from "react";
import { KIND_LABELS, type Product, type ProductKind } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type Filter = ProductKind | "all";

export function Catalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const kinds = Array.from(new Set(products.map((product) => product.kind)));
  const visible = filter === "all" ? products : products.filter((p) => p.kind === filter);

  const options: { value: Filter; label: string }[] = [
    { value: "all", label: "Todo" },
    ...kinds.map((kind) => ({ value: kind, label: KIND_LABELS[kind] })),
  ];

  return (
    <>
      <div role="group" aria-label="Filtrar por tipo" className="mt-8 flex flex-wrap gap-3">
        {options.map((option) => {
          const active = option.value === filter;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.value)}
              className={`border-2 border-black px-3 py-1.5 font-display text-sm uppercase transition-transform ${
                active
                  ? "-rotate-2 bg-pink text-asphalt shadow-[4px_4px_0_#000]"
                  : "bg-asphalt-2 text-chalk hover:-rotate-1 hover:text-acid"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} productos
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-8 lg:grid-cols-4">
        {visible.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </>
  );
}
