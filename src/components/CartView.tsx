"use client";

import Link from "next/link";
import { cartSubtotal, MAX_QUANTITY, setQuantity, useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { ProductArt } from "./ProductArt";

export function CartView() {
  const cart = useCart();

  if (cart.length === 0) {
    return (
      <div className="brutal mt-8 bg-asphalt-2 p-8 text-center">
        <p className="font-marker text-2xl text-chalk">
          Illo, esto ta más vacío ke la pista a las 7 de la mañana.
        </p>
        <Link
          href="/tienda"
          className="brutal brutal-hover mt-6 inline-block bg-acid px-6 py-3 font-display text-asphalt uppercase"
        >
          A pillar género
        </Link>
      </div>
    );
  }

  const subtotal = cartSubtotal(cart);

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-[1fr_18rem]">
      <ul className="space-y-5">
        {cart.map((line) => {
          const product = getProduct(line.slug);
          if (!product) return null;
          const colorName = product.colors.find((c) => c.hex === line.color)?.name;
          const key = { slug: line.slug, color: line.color, size: line.size };
          return (
            <li
              key={`${line.slug}-${line.color}-${line.size}`}
              className="brutal flex gap-4 bg-chalk p-3 text-asphalt"
            >
              <Link
                href={`/producto/${product.slug}`}
                className="size-24 shrink-0 border-2 border-black bg-cyan sm:size-28"
              >
                <ProductArt product={product} colorHex={line.color} className="size-full p-1" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <div>
                  <p className="truncate font-display uppercase">{product.name}</p>
                  <p className="text-sm text-asphalt/70">
                    {colorName} · Talla {line.size}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center border-2 border-black">
                    <button
                      type="button"
                      onClick={() => setQuantity(key, line.quantity - 1)}
                      className="px-3 py-1 font-display hover:bg-pink"
                      aria-label={`Quitar una unidad de ${product.name}`}
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center font-display" aria-live="polite">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(key, line.quantity + 1)}
                      disabled={line.quantity >= MAX_QUANTITY}
                      className="px-3 py-1 font-display hover:bg-acid disabled:opacity-40"
                      aria-label={`Añadir una unidad de ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity(key, 0)}
                    className="font-marker text-sm underline underline-offset-2 hover:text-pink"
                  >
                    Fuera
                  </button>
                  <p className="font-display">{formatPrice(product.price * line.quantity)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="brutal h-fit bg-asphalt-2 p-5">
        <h2 className="font-display text-lg uppercase">La cuenta</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-display">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-concrete">
            <dt>Envío</dt>
            <dd>Se calcula al soltar la pasta</dd>
          </div>
        </dl>
        <button
          type="button"
          disabled
          className="brutal mt-6 w-full cursor-not-allowed bg-concrete px-4 py-3 font-display text-asphalt uppercase"
        >
          Soltar la pasta
        </button>
        <p className="mt-3 font-marker text-xs text-yolk">
          Tranqui, ke de momento no se cobra ná: los pagos con Stripe llegan en la siguiente fase.
        </p>
      </aside>
    </div>
  );
}
