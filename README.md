# BreakBeat Shop

Tienda online de ropa de calle con estética **breakbeat, graffiti y kataneo**: colores de bote de spray, letras con goteo y mucho ritmo.

> 🚧 **En construcción.** Todavía no se cobra nada. Los pagos llegarán con Stripe y la producción/envío con impresión bajo pedido (Printful).

## Catálogo

Solo ropa y complementos: camisetas, sudaderas, pantalones, gorras, pegatinas, lanyards, lonas y banderas.

Tres colecciones, cada una con su color de fondo:

- ☀️ **Summer** (amarillo): camisetas, gorras, lonas y banderas pa la feria y los festis.
- ❄️ **Winter** (azul): sudaderas y chándal.
- 📼 **Retro** (rosa): tags, breaks y makineo de los 90.

En la tienda se ven todas mezcladas; cada colección tiene además su página (`/coleccion/summer`, `/coleccion/winter`, `/coleccion/retro`).

Dentro de cada colección hay líneas:

- **Pa ellas**: leopardo, rosa chicle y brillitos.
- **Pa ellos**: oso asesino, llamas y oro.
- **Pa tos**: lo de toda la vida (tags, breakbeat) y complementos.

Cada producto es **discreto** (detalle pequeño) o **mortal** (cani a tope).

## Tecnología

- [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript)
- Tailwind CSS 4
- Despliegue previsto en Vercel

## Arrancar en local

Requiere Node 20.9 o superior.

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Compila para producción |
| `npm start` | Sirve la compilación de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | Genera los tipos de rutas y pasa TypeScript |

## Estructura

```
src/
├── app/                 Páginas (inicio, /tienda, /coleccion/[slug], /producto/[slug], /carrito)
├── components/          UI: cabecera, tarjetas, mockups SVG, carrito…
└── lib/
    ├── products.ts      Catálogo (temporal, hasta conectar Printful)
    └── cart.ts          Carrito en el navegador (localStorage)
legacy/                  API antigua en Spring Boot (ya no se usa)
```

## Hoja de ruta

1. ✅ **Identidad visual y web**: inicio, catálogo con filtros, ficha de producto, carrito.
2. ⬜ **Pagos**: Stripe Checkout en modo test.
3. ⬜ **Producción**: catálogo, mockups y pedidos automáticos con Printful.
4. ⬜ **Lanzamiento**: dominio, páginas legales (aviso legal, privacidad, cookies, devoluciones) y Stripe en modo real.

## Proyecto anterior

La primera versión era una API REST en Spring Boot (JWT, MySQL). Se conserva en [`legacy/`](./legacy) solo como referencia; no forma parte de la tienda nueva. Sus claves se han sacado a variables de entorno, pero las antiguas siguen en el historial de git, así que deben considerarse comprometidas.
