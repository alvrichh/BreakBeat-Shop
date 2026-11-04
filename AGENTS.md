<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BreakBeat Shop — notas para agentes

- Tienda en Next.js 16 (App Router, Cache Components y Partial Prefetching activados) + Tailwind 4.
- Textos de la web en español con tono **cani** (illo, quillo, pisha, mañaneo, popopo, kataneo, grafiteo…). Precios, envíos, devoluciones y avisos de pago tienen que entenderse siempre a la primera; las páginas legales irán en español normal.
- Solo se vende ropa y complementos: camisetas, sudaderas, pantalones, gorras, pegatinas, lanyards, lonas y banderas. Cada producto tiene **línea** (`ellas`: leopardo, rosa, brillitos · `ellos`: oso asesino, llamas, oro · `tos`) y **nivel** (`discreto`: diseño pequeño, sin llamas · `mortal`: cani a tope). El dibujo de cada producto sale de `art` (tag u oso, leopardo, llamas, brillos) en `src/components/ProductArt.tsx`.
- No usar grupos étnicos como etiqueta de estilo en los textos; describir el look (oro, brillos, fuego, leopardo).
- Catálogo en `src/lib/products.ts`; precios siempre en céntimos (enteros). El carrito (`src/lib/cart.ts`) solo guarda slug/color/talla/cantidad; los precios se recalculan desde el catálogo y, cuando haya Stripe, se validarán en el servidor.
- Identidad visual: tokens de color y fuentes en `src/app/globals.css` (`asphalt`, `chalk`, `pink`, `acid`, `cyan`, `yolk`, `flame`, `violet`; fuentes `graffiti`, `display`, `marker`, `sans`). Respetar `prefers-reduced-motion`.
- En cada cambio visual, revisar escritorio y móvil sin scroll horizontal.
- `legacy/` es la API Java antigua: no se usa ni se despliega. No añadir secretos al repo; usar variables de entorno (`.env.local`, ignorado por git).
- Comprobaciones: `npm run lint`, `npm run typecheck`, `npm run build`.
