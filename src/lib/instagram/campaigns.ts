/**
 * Campañas «comenta → DM» de Instagram.
 *
 * Si alguien comenta (o manda por DM, o responde a una Story) una de las
 * palabras clave, le llega un mensaje privado con el enlace a la tienda.
 *
 * Las campañas viven en código, como el catálogo: para añadir una, copia un
 * bloque, cambia `id`, `keywords` y `target`, y haz push. No hace falta base
 * de datos.
 */

import type { Collection } from "@/lib/products";

export type CampaignTarget =
  | { type: "product"; slug: string }
  | { type: "collection"; slug: Collection }
  | { type: "shop" };

export type Campaign = {
  /** Identificador corto; va en `utm_campaign` del enlace. */
  id: string;
  /** Palabras que disparan la campaña. Da igual mayúsculas y tildes. */
  keywords: string[];
  /**
   * `word` (por defecto): la palabra tiene que ir suelta («quiero la SUDADERA» sí,
   * «sudaderas» no). `contains`: vale en cualquier parte del texto.
   */
  match?: "word" | "contains";
  /** A dónde lleva el enlace del DM. */
  target: CampaignTarget;
  /**
   * Solo en estos posts/reels (ids de media de Instagram). Vacío o sin poner:
   * vale en cualquier post. Los DMs y respuestas a Stories no tienen post, así
   * que esta lista no les afecta.
   */
  mediaIds?: string[];
  /** Qué la dispara. Por defecto: comentarios sí, DMs no. */
  triggers?: { comments?: boolean; dms?: boolean };
  /**
   * Texto del DM. Variables: {username}, {producto}, {precio}, {coleccion}.
   * Si no se pone, se usa uno por defecto según el destino.
   */
  message?: string;
  /** Texto del botón (máx. 20 caracteres, límite de Instagram). */
  buttonLabel?: string;
  /**
   * Respuesta pública bajo el comentario. Si hay varias, se elige una al azar
   * (Instagram ve peor que respondas siempre lo mismo).
   */
  publicReplies?: string[];
  /** Pon `false` para pausarla sin borrarla. */
  active?: boolean;
};

const PUBLIC_REPLIES = [
  "Te lo he mandao por DM, illo 📩",
  "Mira el DM, pisha 🔥",
  "Ya lo tienes en privado 💀",
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: "oso-asesino",
    keywords: ["oso"],
    target: { type: "product", slug: "oso-asesino" },
    triggers: { comments: true, dms: true },
    publicReplies: PUBLIC_REPLIES,
  },
  {
    id: "winter",
    keywords: ["sudadera", "chandal", "invierno"],
    target: { type: "collection", slug: "winter" },
    triggers: { comments: true, dms: true },
    publicReplies: PUBLIC_REPLIES,
  },
  {
    id: "tienda",
    keywords: ["link", "tienda"],
    target: { type: "shop" },
    triggers: { comments: true, dms: true },
    publicReplies: PUBLIC_REPLIES,
  },
];
