import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Carrito",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-10">
      <h1 className="font-graffiti text-6xl text-yolk sm:text-7xl">Tu carrito</h1>
      <CartView />
    </div>
  );
}
