import { after, type NextRequest } from "next/server";
import { CAMPAIGNS } from "@/lib/instagram/campaigns";
import { handleEvent, readConfig } from "@/lib/instagram/automation";
import { parseEvents, verifySignature } from "@/lib/instagram/webhook";

/**
 * Webhook de Instagram: comentario o DM con palabra clave → DM con el enlace.
 * Configuración y puesta en marcha: docs/instagram.md.
 */

/** Meta llama con GET al dar de alta la URL del webhook. */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const verifyToken = process.env.INSTAGRAM_VERIFY_TOKEN;
  if (
    verifyToken &&
    params.get("hub.mode") === "subscribe" &&
    params.get("hub.verify_token") === verifyToken
  ) {
    return new Response(params.get("hub.challenge") ?? "", {
      headers: { "Content-Type": "text/plain" },
    });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: NextRequest) {
  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  if (!appSecret) {
    console.error("[instagram] falta INSTAGRAM_APP_SECRET; webhook ignorado");
    return Response.json({ ok: false }, { status: 503 });
  }

  const rawBody = await request.text();
  if (!verifySignature(rawBody, request.headers.get("x-hub-signature-256"), appSecret)) {
    console.warn("[instagram] firma no válida (¿INSTAGRAM_APP_SECRET de otra app?)");
    return Response.json({ ok: false }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const events = parseEvents(payload);
  const config = readConfig();
  if (events.length && !config) {
    console.error(
      "[instagram] faltan INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_ACCOUNT_ID o SITE_URL; no se manda nada",
    );
  }

  // Se contesta a Meta al momento y los envíos se hacen después; si tardamos,
  // Meta reintenta y acaba desactivando el webhook.
  if (events.length && config) {
    after(async () => {
      for (const event of events) {
        const outcome = await handleEvent(event, config, CAMPAIGNS);
        const id = event.kind === "comment" ? event.commentId : event.messageId;
        if (outcome.status === "failed") {
          console.error(`[instagram] ${event.kind} ${id}:`, outcome);
        } else {
          console.log(`[instagram] ${event.kind} ${id}:`, outcome);
        }
      }
    });
  }

  return Response.json({ ok: true });
}
