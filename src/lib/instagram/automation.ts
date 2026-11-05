import { getCollection, getProduct, formatPrice } from "@/lib/products";
import type { Campaign } from "./campaigns";
import { replyToComment, sendLinkMessage, type InstagramConfig } from "./client";
import { findCampaign } from "./match";
import type { InstagramEvent } from "./webhook";

export type AutomationConfig = InstagramConfig & { siteUrl: string };

/**
 * Lee la configuración de las variables de entorno. Devuelve `null` si falta
 * algo, y entonces el webhook no manda nada.
 */
export function readConfig(): AutomationConfig | null {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const siteUrl =
    process.env.SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : undefined);
  if (!accessToken || !accountId || !siteUrl) return null;
  return {
    accessToken,
    accountId,
    apiVersion: process.env.INSTAGRAM_API_VERSION ?? "v25.0",
    siteUrl: siteUrl.replace(/\/+$/, ""),
  };
}

type Destination = {
  path: string;
  /** Nombre que sale en el mensaje. */
  label: string;
  vars: Record<string, string>;
  defaultMessage: string;
  defaultButton: string;
};

function resolveTarget(campaign: Campaign): Destination | undefined {
  const t = campaign.target;
  if (t.type === "product") {
    const product = getProduct(t.slug);
    if (!product) return undefined;
    const price = formatPrice(product.price);
    return {
      path: `/producto/${product.slug}`,
      label: product.name,
      vars: { producto: product.name, precio: price },
      defaultMessage: `¡Quillo {username}! Aquí tienes «{producto}» ({precio}). Pilla tu talla antes de ke vuele 🔥`,
      defaultButton: "Ver producto",
    };
  }
  if (t.type === "collection") {
    const collection = getCollection(t.slug);
    if (!collection) return undefined;
    return {
      path: `/coleccion/${collection.slug}`,
      label: collection.name,
      vars: { coleccion: collection.name },
      defaultMessage: `¡Illo {username}! Aquí tienes la colección {coleccion} ${collection.emoji} entera. Elige la tuya 💀`,
      defaultButton: `Ver ${collection.name}`,
    };
  }
  return {
    path: "/tienda",
    label: "la tienda",
    vars: {},
    defaultMessage: "¡Quillo {username}! Aquí tienes la tienda entera. Popopo 🔊",
    defaultButton: "Ir a la tienda",
  };
}

function fill(template: string, vars: Record<string, string>): string {
  return template
    .replace(/\{(\w+)\}/g, (whole, key: string) => vars[key] ?? whole)
    .replace(/\s+([!,.])/g, "$1")
    .trim();
}

function buildLink(siteUrl: string, path: string, campaign: Campaign, medium: string) {
  const url = new URL(path, siteUrl);
  url.searchParams.set("utm_source", "instagram");
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign.id);
  return url.toString();
}

/**
 * Ids ya atendidos en esta instancia, por si Meta reenvía el mismo webhook.
 * Es «lo mejor posible»: en Vercel cada instancia tiene su memoria. Para los
 * comentarios da igual, porque Instagram solo deja una respuesta privada por
 * comentario y rechaza la segunda.
 */
const seen = new Set<string>();
function firstTime(id: string): boolean {
  if (seen.has(id)) return false;
  seen.add(id);
  if (seen.size > 1000) seen.delete(seen.values().next().value as string);
  return true;
}

export type Outcome =
  | { status: "sent"; campaign: string; publicReply?: "sent" | "failed" }
  | { status: "skipped"; reason: string }
  | { status: "failed"; campaign: string; error: string };

export async function handleEvent(
  event: InstagramEvent,
  config: AutomationConfig,
  campaigns: Campaign[],
): Promise<Outcome> {
  if (event.accountId !== config.accountId) {
    return { status: "skipped", reason: "otra cuenta" };
  }
  const id = event.kind === "comment" ? event.commentId : event.messageId;
  if (!firstTime(id)) return { status: "skipped", reason: "repetido" };

  const campaign = findCampaign(
    campaigns,
    event.text,
    event.kind === "comment" ? { kind: "comment", mediaId: event.mediaId } : { kind: "dm" },
  );
  if (!campaign) return { status: "skipped", reason: "sin palabra clave" };

  const destination = resolveTarget(campaign);
  if (!destination) {
    return { status: "failed", campaign: campaign.id, error: "destino no existe en el catálogo" };
  }

  const username = event.kind === "comment" && event.username ? `@${event.username}` : "";
  const text = fill(campaign.message ?? destination.defaultMessage, {
    ...destination.vars,
    username,
  });
  const url = buildLink(
    config.siteUrl,
    destination.path,
    campaign,
    event.kind === "comment" ? "comment_dm" : "dm",
  );
  const button = { title: campaign.buttonLabel ?? destination.defaultButton, url };

  try {
    await sendLinkMessage(
      config,
      event.kind === "comment" ? { comment_id: event.commentId } : { id: event.senderId },
      text,
      button,
    );
  } catch (error) {
    return { status: "failed", campaign: campaign.id, error: String((error as Error).message) };
  }

  // La respuesta pública va después del DM: si Meta reenvía el webhook, el DM
  // repetido falla y no se publica dos veces.
  if (event.kind === "comment" && campaign.publicReplies?.length) {
    const replies = campaign.publicReplies;
    const reply = replies[Math.floor(Math.random() * replies.length)];
    try {
      await replyToComment(config, event.commentId, reply);
      return { status: "sent", campaign: campaign.id, publicReply: "sent" };
    } catch (error) {
      console.error("[instagram] respuesta pública fallida:", (error as Error).message);
      return { status: "sent", campaign: campaign.id, publicReply: "failed" };
    }
  }
  return { status: "sent", campaign: campaign.id };
}
