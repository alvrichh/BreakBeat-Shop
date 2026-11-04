import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Todo el catálogo de BreakBeat: camisetas, sudaderas, gorras, pegatinas y tazas.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <h1 className="font-graffiti text-6xl text-acid sm:text-7xl">La tienda</h1>
      <p className="mt-3 max-w-xl text-chalk/80">
        Todo lo que tenemos en la pared ahora mismo. Cada pieza se imprime cuando la pides.
      </p>
      <Catalog products={products} />
    </div>
  );
}
