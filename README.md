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

## Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) con tu cuenta de GitHub.
2. **Add New → Project** e importa `BreakBeat-Shop`. Vercel detecta Next.js solo; no hay que tocar nada.
3. Cada push a `main` publica la web, y cada PR tiene su propia vista previa.

Las claves (Stripe, proveedor de impresión…) van en **Settings → Environment Variables** de Vercel, nunca en el repo.

## Estructura

```
src/
├── app/                 Páginas (inicio, /tienda, /coleccion/[slug], /producto/[slug], /carrito)
├── components/          UI: cabecera, tarjetas, mockups SVG, carrito…
└── lib/
    ├── products.ts      Catálogo: colecciones, líneas, niveles y diseño de cada producto
    └── cart.ts          Carrito en el navegador (localStorage)
```

## Hoja de ruta

1. ✅ **Identidad visual y web**: inicio, colecciones, catálogo con filtros, ficha de producto, carrito.
   - ⬜ Publicar en Vercel.
2. ⬜ **Pagos**: Stripe Checkout en modo test.
3. ⬜ **Producción**: catálogo, mockups y pedidos automáticos con Printful.
4. ⬜ **Lanzamiento**: dominio, páginas legales (aviso legal, privacidad, cookies, devoluciones) y Stripe en modo real.

## Proyecto anterior

La primera versión era una API REST en Spring Boot (JWT, MySQL). Se retiró del repositorio al rehacer la tienda; sigue disponible en el historial de git. Sus claves antiguas (JWT y Pexels) quedaron públicas en ese historial, así que deben considerarse comprometidas y no reutilizarse.
