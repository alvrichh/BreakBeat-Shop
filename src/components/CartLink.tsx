"use client";

import Link from "next/link";
import { useCartCount } from "@/lib/cart";

export function CartLink() {
  const count = useCartCount();
  return (
    <Link
      href="/carrito"
      className="brutal brutal-hover relative flex items-center gap-2 bg-acid px-3 py-1.5 font-display text-sm text-asphalt uppercase"
      aria-label={count > 0 ? `Carrito, ${count} artículos` : "Carrito vacío"}
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 8H6.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.6" fill="currentColor" />
        <circle cx="17" cy="20" r="1.6" fill="currentColor" />
      </svg>
      <span className="hidden sm:inline">Carrito</span>
      {count > 0 && (
        <span className="absolute -top-3 -right-3 grid size-6 place-items-center rounded-full border-2 border-black bg-pink text-xs text-asphalt">
          {count}
        </span>
      )}
    </Link>
  );
}
