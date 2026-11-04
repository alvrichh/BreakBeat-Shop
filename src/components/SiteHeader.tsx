import Link from "next/link";
import { COLLECTIONS } from "@/lib/products";
import { CartLink } from "./CartLink";
import { Equalizer } from "./Equalizer";

const NAV = COLLECTIONS.map((c) => ({
  href: `/coleccion/${c.slug}`,
  label: c.name,
  emoji: c.emoji,
}));

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-3 border-black bg-asphalt/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2"
          aria-label="BreakBeat, inicio"
        >
          <Equalizer className="h-7" />
          <span className="font-graffiti text-2xl leading-none text-pink transition-transform group-hover:-rotate-3 min-[380px]:text-3xl sm:text-4xl">
            BreakBeat
          </span>
        </Link>

        <nav aria-label="Principal" className="flex items-center gap-1 lg:gap-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden px-2 py-1 font-display text-sm uppercase hover:text-acid md:inline"
            >
              {item.label} <span aria-hidden="true">{item.emoji}</span>
            </Link>
          ))}
          <Link
            href="/tienda"
            className="px-2 py-1 font-display text-sm uppercase hover:text-acid md:hidden lg:inline"
          >
            <span className="md:hidden">Tienda</span>
            <span className="hidden md:inline">Tó</span>
          </Link>
          <CartLink />
        </nav>
      </div>

      {/* Móvil: las tres colecciones en una tira debajo */}
      <nav
        aria-label="Colecciones"
        className="grid grid-cols-3 border-t-2 border-black font-display text-xs uppercase md:hidden"
      >
        {NAV.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`py-2 text-center hover:bg-acid hover:text-asphalt ${i > 0 ? "border-l-2 border-black" : ""}`}
          >
            {item.label} <span aria-hidden="true">{item.emoji}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
