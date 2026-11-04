import Link from "next/link";
import { CartLink } from "./CartLink";
import { Equalizer } from "./Equalizer";

const NAV = [
  { href: "/tienda", label: "Tienda" },
  { href: "/#manifiesto", label: "La kru" },
];

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

        <nav aria-label="Principal" className="flex items-center gap-1 sm:gap-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden px-2 py-1 font-display text-sm uppercase hover:text-acid sm:inline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/tienda"
            className="px-2 py-1 font-display text-sm uppercase hover:text-acid sm:hidden"
          >
            Tienda
          </Link>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
