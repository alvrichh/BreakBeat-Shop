"use client";

import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { formatPrice, KIND_LABELS, type Product, type Size } from "@/lib/products";
import { ProductArt } from "./ProductArt";

export function BuyBox({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].hex);
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [added, setAdded] = useState(false);
  const [missingSize, setMissingSize] = useState(false);

  const colorName = product.colors.find((c) => c.hex === color)?.name;

  function handleAdd() {
    if (!size) {
      setMissingSize(true);
      return;
    }
    addToCart({ slug: product.slug, color, size });
    setAdded(true);
  }

  return (
    <div className="mt-6 grid gap-10 md:grid-cols-2">
      <div className="relative self-start">
        <div className="brutal absolute inset-3 rotate-3 bg-pink" aria-hidden="true" />
        <div className="brutal relative -rotate-1 bg-yolk">
          <ProductArt product={product} colorHex={color} className="w-full p-6" />
        </div>
      </div>

      <div>
        <p className="font-display text-sm text-concrete uppercase">{KIND_LABELS[product.kind]}</p>
        <h1 className="mt-1 font-graffiti text-5xl leading-none text-chalk sm:text-6xl">
          {product.name}
        </h1>
        <p className="mt-3 font-marker text-xl text-acid">{product.tagline}</p>
        <p className="mt-6 inline-block border-3 border-black bg-chalk px-3 py-1 font-display text-3xl text-asphalt shadow-[5px_5px_0_var(--color-pink)]">
          {formatPrice(product.price)}
        </p>
        <p className="mt-6 text-chalk/85">{product.description}</p>

        <fieldset className="mt-8">
          <legend className="font-display text-sm uppercase">
            Color: <span className="text-cyan">{colorName}</span>
          </legend>
          <div className="mt-3 flex gap-3">
            {product.colors.map((c) => (
              <label key={c.hex} className="cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={c.hex}
                  checked={color === c.hex}
                  onChange={() => {
                    setColor(c.hex);
                    setAdded(false);
                  }}
                  className="peer sr-only"
                />
                <span
                  className="block size-11 rounded-full border-3 border-black shadow-[3px_3px_0_#000] transition-transform peer-checked:scale-110 peer-checked:outline-3 peer-checked:outline-offset-2 peer-checked:outline-acid peer-focus-visible:outline-3 peer-focus-visible:outline-cyan"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="sr-only">{c.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {product.sizes.length > 1 && (
          <fieldset className="mt-6">
            <legend className="font-display text-sm uppercase">Talla</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <label key={s} className="cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={() => {
                      setSize(s);
                      setMissingSize(false);
                      setAdded(false);
                    }}
                    className="peer sr-only"
                  />
                  <span className="block min-w-12 border-2 border-black bg-asphalt-2 px-3 py-2 text-center font-display text-sm peer-checked:-rotate-3 peer-checked:bg-acid peer-checked:text-asphalt peer-focus-visible:outline-3 peer-focus-visible:outline-cyan hover:text-acid peer-checked:hover:text-asphalt">
                    {s}
                  </span>
                </label>
              ))}
            </div>
            {missingSize && (
              <p role="alert" className="mt-2 font-marker text-pink">
                ¡Eh, eh! Elige talla primero, ke no somo adivinos.
              </p>
            )}
          </fieldset>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleAdd}
            className="brutal brutal-hover bg-pink px-6 py-3 font-display text-lg text-asphalt uppercase"
          >
            ¡Pa la bolsa!
          </button>
          {added && (
            <p role="status" className="font-marker text-acid">
              ¡Ahí va, pillao!{" "}
              <Link href="/carrito" className="underline underline-offset-4 hover:text-yolk">
                Ver la bolsa →
              </Link>
            </p>
          )}
        </div>

        <ul className="mt-8 space-y-1 text-sm text-concrete">
          <li>✦ Te lo imprimimo en 2–5 días laborables.</li>
          <li>✦ Envío a toa España, dende Cái hasta Girona.</li>
          <li>✦ 14 días pa devolverlo si no te mola.</li>
        </ul>
      </div>
    </div>
  );
}
