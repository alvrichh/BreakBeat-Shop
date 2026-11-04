/**
 * Catálogo de la tienda.
 *
 * Solo ropa y complementos: camisetas, sudaderas, pantalones, gorras,
 * pegatinas, lanyards, lonas y banderas. Cada producto pertenece a una línea
 * (pa ellas / pa ellos / pa tos) y tiene un nivel: «discreto» o «mortal».
 *
 * Los productos viven en código mientras no hay Printful/Printify conectado.
 * Cuando llegue esa fase, este fichero se sustituirá por datos del proveedor
 * (mismo tipo `Product`), así que las páginas no tendrán que cambiar.
 */

export type ProductKind =
  | "tee"
  | "hoodie"
  | "pants"
  | "cap"
  | "sticker"
  | "lanyard"
  | "banner"
  | "flag";

export type Line = "ellas" | "ellos" | "tos";

/** «discreto» = detalle pequeño; «mortal» = cani a tope, que se vea desde lejos. */
export type Level = "discreto" | "mortal";

/** Talla o medida (S, M, «Única», «100×50 cm»…). */
export type Size = string;

export type GarmentColor = {
  name: string;
  hex: string;
};

/** Cómo se pinta el diseño sobre el producto (ver ProductArt). */
export type Art = {
  /** Motivo principal: letras tipo throw-up o el oso asesino. */
  motif: "tag" | "bear";
  /** Texto del tag (o rótulo debajo del oso). */
  text?: string;
  /** Estampado de toda la prenda: el color elegido es el fondo del leopardo. */
  pattern?: "leopard";
  /** Llamas subiendo desde abajo. */
  flames?: boolean;
  /** Brillos que parpadean. */
  glitter?: boolean;
  /** Colores de pintura del diseño. */
  palette: [string, string, string];
};

export type Product = {
  slug: string;
  name: string;
  kind: ProductKind;
  line: Line;
  level: Level;
  /** Precio en céntimos de euro (nunca decimales para dinero). */
  price: number;
  tagline: string;
  description: string;
  art: Art;
  colors: GarmentColor[];
  sizes: Size[];
  badge?: string;
  featured?: boolean;
};

const BLACK: GarmentColor = { name: "Negro asfalto", hex: "#111114" };
const WHITE: GarmentColor = { name: "Blanco tiza", hex: "#f4f1ea" };
const GREY: GarmentColor = { name: "Gris hormigón", hex: "#6b6b70" };
const NAVY: GarmentColor = { name: "Azul vagón", hex: "#1c2541" };
const PINK: GarmentColor = { name: "Rosa chicle", hex: "#ff7ac0" };
const RED: GarmentColor = { name: "Rojo fuego", hex: "#c8102e" };
const LEO_CLASSIC: GarmentColor = { name: "Leopardo clásico", hex: "#d9a35b" };
const LEO_PINK: GarmentColor = { name: "Leopardo rosa", hex: "#ff8fc8" };
const LEO_SNOW: GarmentColor = { name: "Leopardo nieve", hex: "#e9e4dc" };

const CLOTHING_SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];
const WIDE_SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];
const ONE_SIZE: Size[] = ["Única"];

const GOLD = "#ffd23f";

export const KIND_LABELS: Record<ProductKind, string> = {
  tee: "Camisetas",
  hoodie: "Sudaderas",
  pants: "Pantalones",
  cap: "Gorras",
  sticker: "Pegatinas",
  lanyard: "Lanyards",
  banner: "Lonas",
  flag: "Banderas",
};

export const LINE_LABELS: Record<Line, string> = {
  ellas: "Pa ellas",
  ellos: "Pa ellos",
  tos: "Pa tos",
};

export const LEVEL_LABELS: Record<Level, string> = {
  discreto: "Discreto",
  mortal: "Mortal 💀",
};

export const products: Product[] = [
  // ───────────── PA ELLAS ─────────────
  {
    slug: "mami-leopardo",
    name: "Mami Leopardo",
    kind: "hoodie",
    line: "ellas",
    level: "mortal",
    price: 6200,
    tagline: "Leopardo de arriba abajo y brillitos, reina.",
    description:
      "Sudadera estampada entera de leopardo con «MAMI» en rosa y brillos ke parpadean. Pa ke se te vea dende la otra punta del polígono. Interior perchado, calentita.",
    art: {
      motif: "tag",
      text: "MAMI",
      pattern: "leopard",
      glitter: true,
      palette: ["#ff2d95", "#111114", GOLD],
    },
    colors: [LEO_CLASSIC, LEO_PINK, LEO_SNOW],
    sizes: WIDE_SIZES,
    badge: "Reina",
    featured: true,
  },
  {
    slug: "chandal-leopardo",
    name: "Chándal Leopardo",
    kind: "pants",
    line: "ellas",
    level: "mortal",
    price: 4500,
    tagline: "El pantalón ke manda en la pista.",
    description:
      "Pantalón de chándal estampado de leopardo entero, con cintura elástica y puño en el tobillo. Combínalo con la sudadera Mami Leopardo y ya eres leyenda.",
    art: { motif: "tag", text: "NENA", pattern: "leopard", palette: ["#ff2d95", "#111114", GOLD] },
    colors: [LEO_CLASSIC, LEO_PINK, LEO_SNOW],
    sizes: WIDE_SIZES,
  },
  {
    slug: "reina-del-barrio",
    name: "Reina del Barrio",
    kind: "tee",
    line: "ellas",
    level: "mortal",
    price: 2900,
    tagline: "Corona puesta y leopardo en el pecho.",
    description:
      "Camiseta con «REINA» en letras gordas rellenas de leopardo y brillos dorados alrededor. Algodón gordito, corte recto.",
    art: { motif: "tag", text: "REINA", glitter: true, palette: ["#ff2d95", "#d9a35b", GOLD] },
    colors: [BLACK, PINK, WHITE],
    sizes: WIDE_SIZES,
    featured: true,
  },
  {
    slug: "nena-brillitos",
    name: "Nena Brillitos",
    kind: "tee",
    line: "ellas",
    level: "discreto",
    price: 2700,
    tagline: "Poquito pero con brillo.",
    description:
      "Camiseta con un «nena» chiquitito en el pecho y cuatro brillitos. Pa los días ke vas de tranqui pero no tanto.",
    art: { motif: "tag", text: "NENA", glitter: true, palette: ["#ff2d95", "#ff8fc8", GOLD] },
    colors: [WHITE, BLACK, PINK],
    sizes: WIDE_SIZES,
    badge: "Nuevo",
  },
  {
    slug: "gorra-princesa",
    name: "Gorra Princesa",
    kind: "cap",
    line: "ellas",
    level: "discreto",
    price: 2400,
    tagline: "Princesa, pero del polígono.",
    description:
      "Gorra con «PRINCESA» bordao pequeñito y un brillo. Se ajusta por detrás. Discreta pa lo ke somo.",
    art: { motif: "tag", text: "PRINCESA", glitter: true, palette: ["#ff2d95", "#ffffff", GOLD] },
    colors: [PINK, BLACK, WHITE],
    sizes: ONE_SIZE,
  },

  // ───────────── PA ELLOS ─────────────
  {
    slug: "oso-asesino",
    name: "Oso Asesino",
    kind: "tee",
    line: "ellos",
    level: "mortal",
    price: 3200,
    tagline: "Tierno no es, illo.",
    description:
      "El oso asesino con cadena de oro, ojos rojos y brillos, saliendo de entre las llamas. La camiseta más mortal de la casa. Algodón gordo, estampado a to color.",
    art: {
      motif: "bear",
      text: "OSO",
      flames: true,
      glitter: true,
      palette: ["#c8102e", "#ff6b00", GOLD],
    },
    colors: [BLACK, WHITE, NAVY],
    sizes: CLOTHING_SIZES,
    badge: "El más vendío",
    featured: true,
  },
  {
    slug: "oso-discreto",
    name: "Oso Discreto",
    kind: "tee",
    line: "ellos",
    level: "discreto",
    price: 2700,
    tagline: "El oso, pero pa ir a ver a la abuela.",
    description:
      "El oso asesino en pequeñito en el pecho. Pa los ke saben, sabe. Pa los ke no, es un osito.",
    art: { motif: "bear", palette: ["#c8102e", "#ff6b00", GOLD] },
    colors: [BLACK, GREY, WHITE],
    sizes: CLOTHING_SIZES,
  },
  {
    slug: "fuego-en-el-barrio",
    name: "Fuego en el Barrio",
    kind: "hoodie",
    line: "ellos",
    level: "mortal",
    price: 6200,
    tagline: "Llamas hasta el pecho.",
    description:
      "Sudadera con llamas ke suben dende abajo y «FUEGO» en letras doradas. Pa entrar en el after y ke se calle hasta el DJ.",
    art: {
      motif: "tag",
      text: "FUEGO",
      flames: true,
      glitter: true,
      palette: [GOLD, "#c8102e", "#ff6b00"],
    },
    colors: [BLACK, RED, NAVY],
    sizes: CLOTHING_SIZES,
    featured: true,
  },
  {
    slug: "chandal-llamas",
    name: "Chándal Llamas",
    kind: "pants",
    line: "ellos",
    level: "mortal",
    price: 4500,
    tagline: "Corres y dejas fuego.",
    description:
      "Pantalón de chándal con llamas subiendo por las piernas. Cintura elástica, bolsillos y puño en el tobillo. Lo má warro ke hay.",
    art: { motif: "tag", text: "BB", flames: true, palette: [GOLD, "#c8102e", "#ff6b00"] },
    colors: [BLACK, NAVY, RED],
    sizes: CLOTHING_SIZES,
    badge: "Lo má warro",
    featured: true,
  },
  {
    slug: "gorra-oso-dorado",
    name: "Gorra Oso Dorado",
    kind: "cap",
    line: "ellos",
    level: "mortal",
    price: 2600,
    tagline: "El oso en la frente y brillando.",
    description:
      "Gorra con el oso asesino en dorao y brillos alrededor. Visera plana, se ajusta por detrás.",
    art: { motif: "bear", glitter: true, palette: [GOLD, "#ff6b00", GOLD] },
    colors: [BLACK, RED],
    sizes: ONE_SIZE,
  },

  // ───────────── PA TOS ─────────────
  {
    slug: "amen-break",
    name: "Amen Break",
    kind: "tee",
    line: "tos",
    level: "mortal",
    price: 2900,
    tagline: "El loop ke lo empezó tó, pisha.",
    description:
      "Seis segundos de batería ke reventaron la música pa siempre. Camiseta de algodón gordo con el tag AMEN en wildstyle rosa y verde ácido. Pa ir to fresco ar mañaneo.",
    art: { motif: "tag", text: "AMEN", palette: ["#ff2d95", "#b6ff00", "#00e5ff"] },
    colors: [BLACK, WHITE],
    sizes: CLOTHING_SIZES,
    badge: "Drop 01",
  },
  {
    slug: "kataneo-nocturno",
    name: "Kataneo Nocturno",
    kind: "hoodie",
    line: "tos",
    level: "mortal",
    price: 5900,
    tagline: "Pa las noches largas en cocheras, ¿sabe lo ke te digo?",
    description:
      "Sudadera con capucha y un tren pintao de punta a punta. Por dentro perchada, calentita, puños de canalé y estampado a to color. Pa kataneá sin pasá frío, illo.",
    art: { motif: "tag", text: "KATA", palette: ["#ffe600", "#ff6b00", "#ff2d95"] },
    colors: [BLACK, NAVY],
    sizes: CLOTHING_SIZES,
  },
  {
    slug: "spray-or-die",
    name: "Spray or Die",
    kind: "tee",
    line: "tos",
    level: "discreto",
    price: 2700,
    tagline: "No hay plan B, quillo.",
    description:
      "Lema de toa la vida en pequeñito en el pecho, con chorreones de spray de verdá escaneaos.",
    art: { motif: "tag", text: "SPRAY", palette: ["#00e5ff", "#ff2d95", "#ffe600"] },
    colors: [WHITE, BLACK, GREY],
    sizes: CLOTHING_SIZES,
  },
  {
    slug: "gorra-tag",
    name: "Gorra Tag",
    kind: "cap",
    line: "tos",
    level: "discreto",
    price: 2400,
    tagline: "Tu firma en la frente, campeón.",
    description:
      "Gorra de seis paneles con el tag BB bordao en verde ácido. Se ajusta por detrás, pa cabezas de tos los tamaños.",
    art: { motif: "tag", text: "BB", palette: ["#b6ff00", "#ff2d95", "#00e5ff"] },
    colors: [BLACK, NAVY],
    sizes: ONE_SIZE,
  },
  {
    slug: "pack-pegatinas",
    name: "Pack de pegatinas",
    kind: "sticker",
    line: "tos",
    level: "mortal",
    price: 800,
    tagline: "Diez pegatinas pa dejar huella por tó el barrio.",
    description:
      "Diez pegatinas de vinilo ke aguantan el agua: el oso asesino, leopardos, llamas, tags y brillos. Pa farolas, libretas, el casco de la moto y el portátil.",
    art: { motif: "bear", glitter: true, palette: ["#c8102e", "#ff6b00", GOLD] },
    colors: [WHITE],
    sizes: ONE_SIZE,
  },
  {
    slug: "lanyard-popopo",
    name: "Lanyard Popopo",
    kind: "lanyard",
    line: "tos",
    level: "mortal",
    price: 900,
    tagline: "Las llaves del coche, con estilo.",
    description:
      "Cinta pa el cuello con «POPOPO» repetío y mosquetón metálico. Pa las llaves, la acreditación der festi o el bonobús.",
    art: { motif: "tag", text: "POPOPO", palette: ["#b6ff00", "#ff2d95", "#111114"] },
    colors: [BLACK, PINK, RED],
    sizes: ONE_SIZE,
  },
  {
    slug: "lona-mananeo",
    name: "Lona Mañaneo",
    kind: "banner",
    line: "tos",
    level: "mortal",
    price: 3500,
    tagline: "Pa colgarla en el balcón o en la pista.",
    description:
      "Lona de PVC resistente de 100×50 cm con ollaos metálicos en las esquinas y «MAÑANEO» con llamas. Pa la peña, el local o la caseta de la feria.",
    art: { motif: "tag", text: "MAÑANEO", flames: true, palette: [GOLD, "#ff2d95", "#c8102e"] },
    colors: [BLACK, WHITE],
    sizes: ["100×50 cm"],
    featured: true,
  },
  {
    slug: "bandera-oso",
    name: "Bandera Oso Asesino",
    kind: "flag",
    line: "tos",
    level: "mortal",
    price: 2500,
    tagline: "Pa ondearla en el festi, illo.",
    description:
      "Bandera de poliéster de 90×60 cm con el oso asesino, llamas y brillos. Con dos ollaos pa atarla al mástil, a la ventana o al coche.",
    art: {
      motif: "bear",
      text: "OSO",
      flames: true,
      glitter: true,
      palette: ["#c8102e", "#ff6b00", GOLD],
    },
    colors: [BLACK, RED],
    sizes: ["90×60 cm"],
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
