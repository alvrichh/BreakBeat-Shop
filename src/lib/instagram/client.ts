/**
 * Llamadas a la API de Instagram (Instagram API con inicio de sesión de Instagram).
 * El token nunca se escribe en logs ni en los mensajes de error.
 */

export type InstagramConfig = {
  accessToken: string;
  /** Id de la cuenta profesional de Instagram (el `entry.id` de los webhooks). */
  accountId: string;
  apiVersion: string;
};

export class InstagramApiError extends Error {
  constructor(
    message: string,
    readonly code?: number,
    readonly subcode?: number,
  ) {
    super(message);
    this.name = "InstagramApiError";
  }
}

type Recipient = { comment_id: string } | { id: string };

async function post(config: InstagramConfig, path: string, body: unknown) {
  const response = await fetch(
    `https://graph.instagram.com/${config.apiVersion}/${path}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.accessToken}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );
  const data = (await response.json().catch(() => ({}))) as {
    error?: { message?: string; code?: number; error_subcode?: number };
  };
  if (!response.ok || data.error) {
    const e = data.error;
    throw new InstagramApiError(
      `${e?.message ?? `HTTP ${response.status}`} (/${path.split("/").pop()}, code=${e?.code ?? "-"}, sub=${e?.error_subcode ?? "-"})`,
      e?.code,
      e?.error_subcode,
    );
  }
  return data;
}

/**
 * Manda un DM con un botón de enlace. Con `comment_id` es una «respuesta
 * privada» a un comentario (solo una por comentario, en los 7 días siguientes);
 * con `id` es un DM normal a quien te ha escrito (ventana de 24 h).
 *
 * Si Instagram rechaza la plantilla con botón, reintenta con texto y el
 * enlace pegado, pa ke el mensaje llegue igual.
 */
export async function sendLinkMessage(
  config: InstagramConfig,
  recipient: Recipient,
  text: string,
  button: { title: string; url: string },
) {
  try {
    return await post(config, `${config.accountId}/messages`, {
      recipient,
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: text.slice(0, 640),
            buttons: [{ type: "web_url", url: button.url, title: button.title.slice(0, 20) }],
          },
        },
      },
    });
  } catch (error) {
    // 100 = parámetro no válido (p. ej. plantilla no soportada). Otros errores
    // (token, permisos, límite, comentario ya respondido) no se arreglan con texto.
    if (!(error instanceof InstagramApiError) || error.code !== 100 || error.subcode === 2534025) {
      throw error;
    }
    return post(config, `${config.accountId}/messages`, {
      recipient,
      message: { text: `${text}\n\n${button.url}`.slice(0, 1000) },
    });
  }
}

/** Responde en público debajo de un comentario. */
export async function replyToComment(config: InstagramConfig, commentId: string, message: string) {
  return post(config, `${commentId}/replies`, { message });
}
