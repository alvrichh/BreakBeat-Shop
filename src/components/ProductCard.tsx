import Link from "next/link";
import { formatPrice, KIND_LABELS, type Product } from "@/lib/products";
import { ProductArt } from "./ProductArt";

const TILTS = ["-rotate-1", "rotate-1", "rotate-0", "-rotate-2", "rotate-2"];
const BACKDROPS = ["bg-pink", "bg-acid", "bg-cyan", "bg-yolk", "bg-flame", "bg-violet"];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const backdrop = BACKDROPS[index % BACKDROPS.length];
  const tilt = TILTS[index % TILTS.length];

  return (
    <Link
      href={`/producto/${product.slug}`}
      className={`brutal brutal-hover group relative flex flex-col bg-chalk text-asphalt ${tilt}`}
    >
      {product.badge && (
        <span className="absolute -top-3 -left-2 z-10 -rotate-6 border-2 border-black bg-yolk px-2 py-0.5 font-display text-xs uppercase">
          {product.badge}
        </span>
      )}
      <div className={`relative aspect-square overflow-hidden border-b-3 border-black ${backdrop}`}>
        <ProductArt
          product={product}
          className="size-full p-3 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2 p-2.5 sm:p-3">
        <div>
          <p className="text-[0.65rem] font-bold text-asphalt/60 uppercase sm:text-xs">
            {KIND_LABELS[product.kind]}
          </p>
          <h3 className="font-display text-sm leading-tight uppercase sm:text-lg">{product.name}</h3>
        </div>
        <p className="mt-auto border-2 border-black bg-asphalt px-2 py-0.5 font-display text-xs text-acid sm:text-sm">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
