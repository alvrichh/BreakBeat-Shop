"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { getProduct, type Product } from "@/lib/products";
import { ProductArt } from "./ProductArt";

/**
 * Hero de la portada: frase gorda a la izquierda y su producto a la derecha,
 * cambiando a la vez como un carrusel.
 *
 * - Cambia solo cada pocos segundos y se puede parar (WCAG 2.2.2).
 * - Con «reducir movimiento» no rota solo; se cambia con los puntos.
 * - El tamaño de letra se ajusta al ancho disponible (unidades cqw) para que
 *   las frases largas no se salgan en el móvil, y la altura es fija para que
 *   nada salte al rotar.
 */

type Slide = {
  top: string;
  bottom: string;
  /** Colores de las dos líneas de la frase. */
  colors: [string, string];
  /** Producto que acompaña a la frase. */
  product: string;
  /** Fondo de la tarjeta del producto y de la que asoma detrás. */
  card: [string, string];
};

const SLIDES: Slide[] = [
  {
    top: "Popopo",
    bottom: "pisha!",
    colors: ["text-pink", "text-acid"],
    product: "amen-break",
    card: ["bg-acid", "bg-cyan"],
  },
  {
    top: "Camisetas",
    bottom: "bomba",
    colors: ["text-yolk", "text-pink"],
    product: "spray-or-die",
    card: ["bg-pink", "bg-yolk"],
  },
  {
    top: "Diseños",
    bottom: "potentes",
    colors: ["text-cyan", "text-yolk"],
    product: "wildstyle-crew",
    card: ["bg-yolk", "bg-violet"],
  },
  {
    top: "Lo má warro",
    bottom: "ke hay",
    colors: ["text-acid", "text-flame"],
    product: "pack-pegatinas",
    card: ["bg-flame", "bg-acid"],
  },
  {
    top: "Mañaneo",
    bottom: "del karajo",
    colors: ["text-flame", "text-cyan"],
    product: "taza-crew",
    card: ["bg-cyan", "bg-flame"],
  },
  {
    top: "To flama",
    bottom: "illo!",
    colors: ["text-violet", "text-acid"],
    product: "136-bpm",
    card: ["bg-violet", "bg-pink"],
  },
  {
    top: "Kataneo",
    bottom: "nocturno",
    colors: ["text-pink", "text-yolk"],
    product: "kataneo-nocturno",
    card: ["bg-acid", "bg-pink"],
  },
];

const PRODUCTS: Product[] = SLIDES.map((slide) => {
  const product = getProduct(slide.product);
  if (!product) throw new Error(`HeroCarousel: no existe el producto «${slide.product}»`);
  return product;
});

const INTERVAL_MS = 2800;
/** Ancho medio de un carácter de la fuente graffiti, en em (con margen). */
const CHAR_WIDTH_EM = 0.66;
const MAX_REM = 8.5;
/** Frase más corta posible = letra más grande: fija la altura del bloque. */
const MIN_CHARS = 6;

function fontSizeFor(chars: number) {
  return `min(${MAX_REM}rem, calc(100cqw / ${(chars * CHAR_WIDTH_EM).toFixed(2)}))`;
}

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;

type Props = {
  /** Lo que va encima de la frase (etiqueta del drop, h1 oculto…). */
  before: ReactNode;
  /** Lo que va debajo (texto y botones). */
  children: ReactNode;
};

export function HeroCarousel({ before, children }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, () => false);
  const running = !paused && !reducedMotion;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [running]);

  const slide = SLIDES[index];
  const product = PRODUCTS[index];
  // La segunda línea va metida 0.6em: cuenta como ~2 caracteres más.
  const chars = Math.max(slide.top.length, slide.bottom.length + 2, MIN_CHARS);

  return (
    <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-16 md:grid-cols-[1.2fr_1fr] md:gap-x-10 md:gap-y-0 md:pt-16">
      {/* Móvil: frase → diseño → texto. Escritorio: frase y texto a la izquierda, diseño a la derecha. */}
      <div className="md:col-start-1 md:row-start-1 md:self-end">
        {before}

        <div className="mt-5 [container-type:inline-size]">
          <p
            className="flex flex-col justify-center font-graffiti leading-[0.88]"
            style={{ height: `calc(2 * 0.88 * ${fontSizeFor(MIN_CHARS)} + 0.2rem)` }}
            aria-hidden="true"
          >
            <span
              key={index}
              className="block origin-left motion-safe:animate-spray-in"
              style={{ fontSize: fontSizeFor(chars) }}
            >
              <span className={`block whitespace-nowrap ${slide.colors[0]}`}>{slide.top}</span>
              <span className={`block whitespace-nowrap pl-[0.6em] ${slide.colors[1]}`}>
                {slide.bottom}
              </span>
            </span>
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex gap-1.5" role="group" aria-label="Frases y diseños">
              {SLIDES.map((s, i) => (
                <button
                  key={s.top}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${s.top} ${s.bottom}: ${PRODUCTS[i].name}`}
                  aria-current={i === index || undefined}
                  className={`h-3 border-2 border-black transition-all ${
                    i === index ? "w-8 bg-acid" : "w-3 bg-chalk/30 hover:bg-chalk/70"
                  }`}
                />
              ))}
            </div>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="font-marker text-xs text-concrete underline-offset-2 hover:text-acid hover:underline"
              >
                {paused ? "▶ Dale caña" : "❚❚ Para el carro"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="order-last md:order-none md:col-start-1 md:row-start-2">{children}</div>

      <Link
        href={`/producto/${product.slug}`}
        className="group relative mx-auto w-full max-w-[18rem] self-center sm:max-w-sm md:col-start-2 md:row-span-2 md:row-start-1"
        aria-label={`Ver ${product.name}`}
      >
        <div
          className={`brutal absolute inset-4 rotate-6 transition-colors duration-500 ${slide.card[1]}`}
          aria-hidden="true"
        />
        <div
          className={`brutal relative -rotate-3 transition-[transform,background-color] duration-300 group-hover:rotate-0 ${slide.card[0]}`}
        >
          <div key={product.slug} className="motion-safe:animate-spray-in">
            <ProductArt product={product} className="w-full p-4" />
          </div>
        </div>
        <span
          key={`tag-${product.slug}`}
          className="absolute -right-2 -bottom-4 rotate-6 border-2 border-black bg-chalk px-3 py-1 font-marker text-asphalt motion-safe:animate-spray-in"
        >
          {product.name} →
        </span>
      </Link>
    </div>
  );
}
