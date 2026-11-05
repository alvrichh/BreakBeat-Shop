# Instagram: comenta → DM

Cuando alguien comenta una palabra clave en un post o reel de la cuenta de la tienda (por ejemplo `OSO`), la web le manda por mensaje privado un botón con el enlace al producto. Opcionalmente responde también en público bajo el comentario («Te lo he mandao por DM, illo 📩»).

Puede dispararse también con un **DM** o una **respuesta a una Story** que contenga la palabra clave (Instagram entrega las respuestas a Stories como DMs).

Es una versión mínima de la idea de [OpenReply](https://github.com/diwenne/openreply), metida dentro de la tienda: sin base de datos, sin Redis y sin worker. Todo corre en una función de Vercel.

## Cómo funciona

```
Comentario / DM en Instagram
        │  webhook de Meta (POST firmado)
        ▼
/api/instagram/webhook ── comprueba la firma ── contesta 200 a Meta al momento
        │  after()
        ▼
busca la campaña (palabra clave) ── manda el DM con botón ── respuesta pública
```

| Fichero | Qué hace |
|---|---|
| `src/lib/instagram/campaigns.ts` | **Las campañas**: palabras clave → producto, colección o tienda. Es lo único que hay que tocar en el día a día. |
| `src/lib/instagram/match.ts` | Busca la palabra clave (sin distinguir mayúsculas ni tildes). |
| `src/lib/instagram/webhook.ts` | Comprueba la firma de Meta y saca comentarios y DMs del webhook. |
| `src/lib/instagram/client.ts` | Llamadas a la API de Instagram (DM con botón, respuesta pública). |
| `src/lib/instagram/automation.ts` | Junta todo: mensaje, enlace con UTM, envío. |
| `src/app/api/instagram/webhook/route.ts` | La URL que llama Meta. |

## Añadir o cambiar una campaña

Edita `CAMPAIGNS` en `src/lib/instagram/campaigns.ts` y haz push:

```ts
{
  id: "makina-95",                        // va en utm_campaign
  keywords: ["makina", "95"],
  target: { type: "product", slug: "makina-95" },
  // target: { type: "collection", slug: "retro" },
  // target: { type: "shop" },
  triggers: { comments: true, dms: true },
  mediaIds: ["17900000000000000"],        // opcional: solo en este reel
  message: "¡Quillo {username}! {producto} por {precio}. Popopo 🔊",  // opcional
  buttonLabel: "Pillarla",                // opcional, máx. 20 caracteres
  publicReplies: ["Mira el DM, pisha 🔥"], // opcional
},
```

- Gana la **primera** campaña de la lista que encaje.
- Por defecto la palabra tiene que ir **suelta**: `oso` encaja con «quiero el OSO 🔥» pero no con «hermoso». Pon `match: "contains"` si quieres que valga en cualquier parte.
- Variables del mensaje: `{username}` (solo en comentarios), `{producto}` y `{precio}` (destino producto), `{coleccion}` (destino colección). El precio sale del catálogo, así que siempre es el de la web.
- Los enlaces llevan `utm_source=instagram`, `utm_medium=comment_dm|dm` y `utm_campaign=<id>`, para ver en la analítica qué post trae ventas.
- Los comentarios de la propia cuenta se ignoran.

## Puesta en marcha

### 1. Cuenta de Instagram

La cuenta de la tienda tiene que ser **profesional** (Business o Creator). Se cambia en la app de Instagram: Configuración → Tipo de cuenta y herramientas.

Si antes usabas ManyChat u otra herramienta de DMs, desconéctala de la cuenta.

### 2. App de Meta

1. En [developers.facebook.com](https://developers.facebook.com/apps) crea una app de tipo **Business** y añade el producto **Instagram → API setup with Instagram login**.
2. Añade la cuenta de Instagram de la tienda y **genera un token de acceso**. Copia también el **id de la cuenta** (Instagram user ID) que aparece al lado.
3. Permisos necesarios: `instagram_business_basic`, `instagram_business_manage_comments` e `instagram_business_manage_messages`.
4. Copia el **Instagram app secret** (en la misma pantalla de configuración de la API).

### 3. Variables de entorno en Vercel

En **Settings → Environment Variables** (nunca en el repo):

| Variable | Valor |
|---|---|
| `INSTAGRAM_APP_SECRET` | Instagram app secret (para comprobar la firma de los webhooks). |
| `INSTAGRAM_VERIFY_TOKEN` | Una cadena aleatoria que te inventas (por ejemplo, `openssl rand -hex 16`). |
| `INSTAGRAM_ACCESS_TOKEN` | El token de la cuenta del paso 2. |
| `INSTAGRAM_ACCOUNT_ID` | El id de la cuenta de Instagram del paso 2. |
| `SITE_URL` | Opcional. URL pública de la tienda, p. ej. `https://breakbeat.shop`. Si no se pone, se usa el dominio de producción de Vercel. |
| `INSTAGRAM_API_VERSION` | Opcional. Versión de la API (por defecto `v25.0`). |

Vuelve a desplegar después de añadirlas.

### 4. Webhook

En la app de Meta, en la configuración de webhooks de Instagram:

- **Callback URL**: `https://<tu-dominio>/api/instagram/webhook`
- **Verify token**: el mismo valor que `INSTAGRAM_VERIFY_TOKEN`.
- Suscríbete a los campos **`comments`** y, si usas campañas por DM o Story, **`messages`**.

### 5. Probar

Con la app en modo desarrollo, solo funciona con cuentas que tengan un rol en la app (añádelas en *App roles → Roles → Instagram testers*). Comenta una palabra clave desde **otra** cuenta y mira los logs en Vercel (**Logs**, filtra por `[instagram]`): cada comentario o DM sale como `sent`, `skipped` (con el motivo) o `failed` (con el error de Meta).

### 6. Abrirlo a todo el mundo

Para que funcione con cualquier usuario, la app tiene que pasar la **revisión de Meta** (App Review) para esos permisos y ponerse en modo **Live**. Meta pide un vídeo del flujo y una política de privacidad publicada, así que conviene hacerlo con las páginas legales de la fase de lanzamiento.

## Limitaciones (a propósito, para que sea simple)

- **El token caduca a los 60 días.** Hay que renovarlo antes con
  `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=<token>`
  y actualizar `INSTAGRAM_ACCESS_TOKEN` en Vercel. Apúntatelo en el calendario.
- **Una sola cuenta de Instagram.**
- **Sin historial ni estadísticas propias**: lo que pasa queda en los logs de Vercel, y los clics se ven por las UTM.
- **Sin reintentos**: si Meta falla al mandar un DM, ese se pierde (sale `failed` en los logs). Meta deja solo una respuesta privada por comentario, en los 7 días siguientes, así que un webhook repetido no manda el DM dos veces.
- **Límite de Meta**: unas 750 respuestas privadas por hora. Para una tienda que empieza sobra; si un reel se hace viral, lo que pase de ahí falla.
- Los DMs solo se pueden contestar dentro de las 24 h desde que te escriben (como aquí se contesta al momento, no es problema).

Si algún día hace falta más (varias cuentas, panel, reintentos, «sígueme para recibir el enlace»), lo suyo es desplegar OpenReply aparte en lugar de seguir creciendo esto.

## Probar en local sin Instagram

```bash
INSTAGRAM_APP_SECRET=secreto INSTAGRAM_VERIFY_TOKEN=vt \
INSTAGRAM_ACCESS_TOKEN=x INSTAGRAM_ACCOUNT_ID=123 SITE_URL=http://localhost:3000 \
npm run dev
```

Verificación del webhook:

```bash
curl "http://localhost:3000/api/instagram/webhook?hub.mode=subscribe&hub.verify_token=vt&hub.challenge=hola"
```

Un webhook de comentario firmado (con un token falso, el envío fallará con error de Meta en la consola, pero se ve que la firma y la palabra clave funcionan):

```bash
BODY='{"object":"instagram","entry":[{"id":"123","changes":[{"field":"comments","value":{"id":"c1","text":"quiero el OSO","from":{"id":"9","username":"prueba"},"media":{"id":"m1"}}}]}]}'
SIG="sha256=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac secreto | cut -d' ' -f2)"
curl -X POST http://localhost:3000/api/instagram/webhook \
  -H "Content-Type: application/json" -H "X-Hub-Signature-256: $SIG" -d "$BODY"
```
