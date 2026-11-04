/**
 * Catálogo de la fase 1.
 *
 * Los productos viven en código mientras no hay Printful conectado. Cuando
 * llegue la fase 3, este fichero se sustituirá por datos del catálogo de
 * Printful (mismo tipo `Product`), así que las páginas no tendrán que cambiar.
 */

export type ProductKind = "tee" | "hoodie" | "cap" | "sticker" | "mug";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Única";

export type GarmentColor = {
  name: string;
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  kind: ProductKind;
  /** Precio en céntimos de euro (nunca decimales para dinero). */
  price: number;
  tagline: string;
  description: string;
  /** Texto principal del diseño, tal y como se pinta en la prenda. */
  artText: string;
  /** Colores de pintura del diseño (spray). */
  palette: [string, string, string];
  colors: GarmentColor[];
  sizes: Size[];
  badge?: string;
  featured?: boolean;
};

const BLACK: GarmentColor = { name: "Negro asfalto", hex: "#111114" };
const WHITE: GarmentColor = { name: "Blanco tiza", hex: "#f4f1ea" };
const GREY: GarmentColor = { name: "Gris hormigón", hex: "#6b6b70" };
const NAVY: GarmentColor = { name: "Azul vagón", hex: "#1c2541" };

const CLOTHING_SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];

export const KIND_LABELS: Record<ProductKind, string> = {
  tee: "Camisetas",
  hoodie: "Sudaderas",
  cap: "Gorras",
  sticker: "Pegatinas",
  mug: "Tazas",
};

export const products: Product[] = [
  {
    slug: "amen-break",
    name: "Amen Break",
    kind: "tee",
    price: 2900,
    tagline: "El loop que lo empezó todo.",
    description:
      "Seis segundos de batería que reventaron la música para siempre. Camiseta de algodón pesado con el tag AMEN en wildstyle rosa y verde ácido.",
    artText: "AMEN",
    palette: ["#ff2d95", "#b6ff00", "#00e5ff"],
    colors: [BLACK, WHITE],
    sizes: CLOTHING_SIZES,
    badge: "Drop 01",
    featured: true,
  },
  {
    slug: "kataneo-nocturno",
    name: "Kataneo Nocturno",
    kind: "hoodie",
    price: 5900,
    tagline: "Para las noches largas en cocheras.",
    description:
      "Sudadera con capucha y diseño de tren pintado de punta a punta. Interior perchado, puños de canalé y estampado frontal a todo color.",
    artText: "KATA",
    palette: ["#ffe600", "#ff6b00", "#ff2d95"],
    colors: [BLACK, NAVY],
    sizes: CLOTHING_SIZES,
    badge: "Más vendida",
    featured: true,
  },
  {
    slug: "spray-or-die",
    name: "Spray or Die",
    kind: "tee",
    price: 2900,
    tagline: "No hay plan B.",
    description:
      "Lema de toda la vida, bote en mano. Estampado con goteos reales de spray escaneados y tipografía de rotulador grueso.",
    artText: "SPRAY",
    palette: ["#00e5ff", "#ff2d95", "#ffe600"],
    colors: [WHITE, BLACK, GREY],
    sizes: CLOTHING_SIZES,
    featured: true,
  },
  {
    slug: "136-bpm",
    name: "136 BPM",
    kind: "tee",
    price: 2700,
    tagline: "El tempo exacto del breakbeat.",
    description:
      "Para quien cuenta golpes de bombo por la calle. Diseño de ecualizador con barras en degradado neón.",
    artText: "136",
    palette: ["#b6ff00", "#00e5ff", "#8a2bff"],
    colors: [BLACK, GREY],
    sizes: CLOTHING_SIZES,
    badge: "Nuevo",
  },
  {
    slug: "wildstyle-crew",
    name: "Wildstyle Crew",
    kind: "hoodie",
    price: 6200,
    tagline: "Letras que solo entiende la crew.",
    description:
      "Sudadera oversize con pieza wildstyle a la espalda y logo pequeño en el pecho. Tinta de alta densidad que no se cuartea.",
    artText: "WILD",
    palette: ["#8a2bff", "#ff2d95", "#b6ff00"],
    colors: [GREY, BLACK],
    sizes: CLOTHING_SIZES,
    featured: true,
  },
  {
    slug: "gorra-tag",
    name: "Gorra Tag",
    kind: "cap",
    price: 2400,
    tagline: "Firma en la frente.",
    description:
      "Gorra de seis paneles con el tag BB bordado en verde ácido. Cierre ajustable trasero.",
    artText: "BB",
    palette: ["#b6ff00", "#ff2d95", "#00e5ff"],
    colors: [BLACK, NAVY],
    sizes: ["Única"],
  },
  {
    slug: "pack-pegatinas",
    name: "Pack de pegatinas",
    kind: "sticker",
    price: 800,
    tagline: "Diez pegatinas para dejar huella.",
    description:
      "Pack de diez pegatinas de vinilo resistentes al agua con tags, throw-ups y personajes de la casa. Para farolas, cuadernos y portátiles.",
    artText: "BBS",
    palette: ["#ff2d95", "#ffe600", "#00e5ff"],
    colors: [WHITE],
    sizes: ["Única"],
    badge: "Básico",
  },
  {
    slug: "taza-crew",
    name: "Taza Crew",
    kind: "mug",
    price: 1500,
    tagline: "Café antes de salir a pintar.",
    description:
      "Taza de cerámica de 330 ml con throw-up a dos colores. Apta para lavavajillas y microondas.",
    artText: "CREW",
    palette: ["#ff6b00", "#00e5ff", "#ff2d95"],
    colors: [WHITE, BLACK],
    sizes: ["Única"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

const euro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(cents: number): string {
  return euro.format(cents / 100);
}
