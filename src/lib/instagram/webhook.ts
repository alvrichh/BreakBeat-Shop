import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Comprueba la cabecera `X-Hub-Signature-256` que Meta pone en cada webhook:
 * `sha256=<HMAC-SHA256 del cuerpo en bruto con el secreto de la app>`.
 */
export function verifySignature(
  rawBody: string,
  signature: string | null,
  appSecret: string,
): boolean {
  if (!signature) return false;
  const expected =
    "sha256=" + createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export type CommentEvent = {
  kind: "comment";
  accountId: string;
  commentId: string;
  mediaId: string;
  text: string;
  fromId: string;
  username?: string;
};

export type MessageEvent = {
  kind: "dm";
  accountId: string;
  messageId: string;
  senderId: string;
  text: string;
};

export type InstagramEvent = CommentEvent | MessageEvent;

type WebhookPayload = {
  object?: string;
  entry?: Array<{
    id?: string;
    changes?: Array<{
      field?: string;
      value?: {
        id?: string;
        text?: string;
        from?: { id?: string; username?: string };
        media?: { id?: string; original_media_id?: string };
      };
    }>;
    messaging?: Array<{
      sender?: { id?: string };
      recipient?: { id?: string };
      message?: { mid?: string; text?: string; is_echo?: boolean; is_deleted?: boolean };
    }>;
  }>;
};

/**
 * Saca los comentarios y DMs de texto de un webhook de Instagram. Descarta lo
 * que escribe la propia cuenta (Meta no deja mandarte un DM a ti mismo).
 */
export function parseEvents(payload: unknown): InstagramEvent[] {
  const body = payload as WebhookPayload;
  if (body?.object !== "instagram") return [];

  const events: InstagramEvent[] = [];
  for (const entry of body.entry ?? []) {
    const accountId = entry.id;
    if (!accountId) continue;

    for (const change of entry.changes ?? []) {
      if (change.field !== "comments") continue;
      const v = change.value;
      // En anuncios llega el id del anuncio; el del post original es el que se configura.
      const mediaId = v?.media?.original_media_id ?? v?.media?.id;
      if (!v?.id || !v.from?.id || !mediaId || v.from.id === accountId) continue;
      events.push({
        kind: "comment",
        accountId,
        commentId: v.id,
        mediaId,
        text: v.text ?? "",
        fromId: v.from.id,
        username: v.from.username,
      });
    }

    for (const m of entry.messaging ?? []) {
      const msg = m.message;
      const senderId = m.sender?.id;
      if (!msg?.mid || !msg.text || msg.is_echo || msg.is_deleted) continue;
      if (!senderId || senderId === accountId) continue;
      events.push({ kind: "dm", accountId, messageId: msg.mid, senderId, text: msg.text });
    }
  }
  return events;
}
