import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-3 border-black bg-asphalt-2">
      <div className="tape h-3" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-graffiti text-4xl text-acid">BreakBeat</p>
          <p className="mt-2 max-w-xs text-sm text-concrete">
            Ropa de calle con olor a spray. Cada pieza se imprime bajo pedido, sin stock que se pudra
            en un almacén.
          </p>
        </div>
        <nav aria-label="Pie de página" className="flex flex-col gap-2 text-sm">
          <p className="font-display text-xs text-yolk uppercase">Tienda</p>
          <Link href="/tienda" className="hover:text-acid">
            Todo el catálogo
          </Link>
          <Link href="/carrito" className="hover:text-acid">
            Carrito
          </Link>
          <Link href="/#manifiesto" className="hover:text-acid">
            La crew
          </Link>
        </nav>
        <div className="text-sm text-concrete">
          <p className="font-display text-xs text-yolk uppercase">Aviso</p>
          <p className="mt-2">
            Tienda en construcción: todavía no se cobra nada. Los pagos llegarán con Stripe y los
            envíos con impresión bajo pedido.
          </p>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center font-marker text-xs text-concrete">
        © BreakBeat · hecho con breaks y pintura
      </p>
    </footer>
  );
}
