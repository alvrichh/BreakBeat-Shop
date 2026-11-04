"use client";

import { useSyncExternalStore } from "react";
import { getProduct, type Size } from "./products";

/**
 * Carrito en el navegador (localStorage).
 *
 * En la fase 2 el pago lo hará Stripe Checkout, así que el carrito solo tiene
 * que recordar qué quiere el cliente; los precios se recalculan siempre desde
 * el catálogo y nunca se confía en lo guardado aquí.
 */

export type CartLine = {
  slug: string;
  color: string;
  size: Size;
  quantity: number;
};

const STORAGE_KEY = "breakbeat-cart-v1";
const MAX_QUANTITY = 10;
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    lines = Array.isArray(parsed) ? parsed.filter(isValidLine) : [];
  } catch {
    lines = [];
  }
}

function isValidLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  const product = getProduct(line.slug);
  return (
    !!product &&
    product.colors.some((color) => color.hex === line.color) &&
    product.sizes.includes(line.size) &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0 &&
    line.quantity <= MAX_QUANTITY
  );
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Modo privado o almacenamiento bloqueado: el carrito vive solo en memoria.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      loaded = false;
      load();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return lines;
}

function getServerSnapshot() {
  return EMPTY;
}

const sameLine = (a: CartLine, b: Omit<CartLine, "quantity">) =>
  a.slug === b.slug && a.color === b.color && a.size === b.size;

export function addToCart(item: Omit<CartLine, "quantity">, quantity = 1) {
  load();
  const existing = lines.find((line) => sameLine(line, item));
  if (existing) {
    commit(
      lines.map((line) =>
        line === existing
          ? { ...line, quantity: Math.min(line.quantity + quantity, MAX_QUANTITY) }
          : line,
      ),
    );
  } else {
    commit([...lines, { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }]);
  }
}

export function setQuantity(item: Omit<CartLine, "quantity">, quantity: number) {
  load();
  if (quantity <= 0) {
    commit(lines.filter((line) => !sameLine(line, item)));
    return;
  }
  commit(
    lines.map((line) =>
      sameLine(line, item) ? { ...line, quantity: Math.min(quantity, MAX_QUANTITY) } : line,
    ),
  );
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useCartCount() {
  return useCart().reduce((total, line) => total + line.quantity, 0);
}

export function cartSubtotal(cart: CartLine[]) {
  return cart.reduce(
    (total, line) => total + (getProduct(line.slug)?.price ?? 0) * line.quantity,
    0,
  );
}

export { MAX_QUANTITY };
