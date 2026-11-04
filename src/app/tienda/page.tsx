import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { COLLECTIONS, getMixedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Todo el catálogo de BreakBeat: camisetas, sudaderas, pantalones, gorras, pegatinas, lanyards, lonas y banderas.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <h1 className="font-graffiti text-6xl text-acid sm:text-7xl">El género</h1>
      <p className="mt-3 max-w-xl text-chalk/80">
        Tó lo ke tenemo colgao en la pared ahora mismo, quillo. Cada pieza se imprime cuando la
        pides, asín ke no te duermas.
      </p>
      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-marker text-sm">
        <span className="text-concrete">El color te dice la colección:</span>
        {COLLECTIONS.map((c) => (
          <span key={c.slug} className="flex items-center gap-1.5">
            <span
              className={`inline-block size-4 border-2 border-black ${c.bg}`}
              aria-hidden="true"
            />
            <span className={c.text}>
              {c.name} {c.emoji}
            </span>
          </span>
        ))}
      </p>
      <Catalog products={getMixedProducts()} />
    </div>
  );
}
