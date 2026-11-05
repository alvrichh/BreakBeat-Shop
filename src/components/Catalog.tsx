"use client";

import { useState } from "react";
import {
  COLLECTIONS,
  KIND_LABELS,
  LEVEL_LABELS,
  LINE_LABELS,
  type Collection,
  type Level,
  type Line,
  type Product,
  type ProductKind,
} from "@/lib/products";
import { ProductCard } from "./ProductCard";

const ALL = "all";
type Option<T extends string> = { value: T | typeof ALL; label: string };

export function Catalog({ products }: { products: Product[] }) {
  const [collection, setCollection] = useState<Collection | typeof ALL>(ALL);
  const [line, setLine] = useState<Line | typeof ALL>(ALL);
  const [kind, setKind] = useState<ProductKind | typeof ALL>(ALL);
  const [level, setLevel] = useState<Level | typeof ALL>(ALL);

  const visible = products.filter(
    (p) =>
      (collection === ALL || p.collection === collection) &&
      (line === ALL || p.line === line) &&
      (kind === ALL || p.kind === kind) &&
      (level === ALL || p.level === level),
  );

  const kinds = Array.from(new Set(products.map((p) => p.kind)));
  const collections = COLLECTIONS.filter((c) => products.some((p) => p.collection === c.slug));
  const lines = (Object.keys(LINE_LABELS) as Line[]).filter((l) =>
    products.some((p) => p.line === l),
  );

  return (
    <>
      <div className="mt-8 space-y-4">
        {collections.length > 1 && (
          <ChipRow
            label="Colección"
            value={collection}
            onChange={setCollection}
            options={[
              { value: ALL, label: "Tó" },
              ...collections.map((c) => ({ value: c.slug, label: `${c.emoji} ${c.name}` })),
            ]}
          />
        )}
        <ChipRow
          label="Pa quién"
          value={line}
          onChange={setLine}
          options={[
            { value: ALL, label: "Tó" },
            ...lines.map((l) => ({
              value: l,
              label: LINE_LABELS[l],
            })),
          ]}
        />
        <ChipRow
          label="Qué"
          value={kind}
          onChange={setKind}
          options={[
            { value: ALL, label: "Tó" },
            ...kinds.map((k) => ({ value: k, label: KIND_LABELS[k] })),
          ]}
        />
        <ChipRow
          label="Nivel"
          value={level}
          onChange={setLevel}
          options={[
            { value: ALL, label: "Tó" },
            ...(Object.keys(LEVEL_LABELS) as Level[]).map((l) => ({
              value: l,
              label: LEVEL_LABELS[l],
            })),
          ]}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} productos
      </p>

      {visible.length === 0 ? (
        <div className="brutal mt-10 bg-asphalt-2 p-8 text-center">
          <p className="font-marker text-xl">Illo, con eso no tenemo ná todavía.</p>
          <button
            type="button"
            onClick={() => {
              setCollection(ALL);
              setLine(ALL);
              setKind(ALL);
              setLevel(ALL);
            }}
            className="brutal brutal-hover mt-5 bg-acid px-5 py-2 font-display text-asphalt uppercase"
          >
            Quitar filtros
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-8 lg:grid-cols-4">
          {visible.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      )}
    </>
  );
}

function ChipRow<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T | typeof ALL;
  onChange: (value: T | typeof ALL) => void;
  options: Option<T>[];
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2 sm:gap-3">
      <span className="w-full font-marker text-sm text-concrete sm:w-20">{label}</span>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`border-2 border-black px-3 py-1.5 font-display text-xs uppercase transition-transform sm:text-sm ${
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
  );
}
