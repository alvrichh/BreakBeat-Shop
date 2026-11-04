import Link from "next/link";
import { Equalizer } from "@/components/Equalizer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import {
  COLLECTIONS,
  getByCollection,
  type Collection,
  type CollectionInfo,
  type Product,
} from "@/lib/products";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <SprayBlobs />
        <HeroCarousel
          before={
            <>
              <p className="inline-block -rotate-2 border-2 border-black bg-yolk px-3 py-1 font-display text-xs text-asphalt uppercase">
                Drop 01 · ya ta en la kalle, illo
              </p>
              <h1 className="sr-only">
                BreakBeat: ropa de kalle con grafiteo, kataneo y breakbeat
              </h1>
            </>
          }
        >
          <p className="mt-6 max-w-md text-lg text-chalk/85">
            Ropa de kalle pa los ke viven el <strong className="text-cyan">breakbeat</strong>, el{" "}
            <strong className="text-yolk">grafiteo</strong>, el{" "}
            <strong className="text-flame">kataneo</strong> y el mañaneo hasta las tantas. Colores
            ke se ven dende el polígono de enfrente, ¿me entiendeh?
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/tienda"
              className="brutal brutal-hover bg-pink px-6 py-3 font-display text-lg text-asphalt uppercase"
            >
              Pillar ropa
            </Link>
            <Link
              href="#manifiesto"
              className="font-marker text-lg text-chalk underline decoration-acid decoration-4 underline-offset-4 hover:text-acid"
            >
              ¿Y vosotros quién soi?
            </Link>
          </div>
        </HeroCarousel>
      </section>

      <Marquee
        className="-rotate-1 bg-acid text-asphalt"
        words={[
          "Popopo",
          "Oso asesino",
          "Leopardo",
          "Mañaneo",
          "Brillos",
          "Kataneo",
          "Fuego",
          "La kru",
        ]}
      />
      <Marquee
        reverse
        className="rotate-1 bg-pink text-asphalt"
        words={[
          "Hecho bajo pedido",
          "Envío a toa España",
          "Tinta ke no se cuartea",
          "Discreto o mortal, tú eliges",
        ]}
      />

      {/* COLECCIONES */}
      <section className="mx-auto max-w-6xl px-4 pt-20" aria-labelledby="colecciones">
        <h2
          id="colecciones"
          className="throwup font-display text-4xl text-chalk uppercase [--throwup-shadow:var(--color-violet)] sm:text-5xl"
        >
          Elige temporada
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <Link
              key={c.slug}
              href={`/coleccion/${c.slug}`}
              className={`brutal brutal-hover group flex items-center justify-between gap-3 p-5 text-asphalt ${c.bg} ${
                ["-rotate-1", "rotate-1", "-rotate-2"][i]
              }`}
            >
              <div className="min-w-0">
                <p className="font-graffiti text-4xl leading-none lg:text-5xl">{c.name}</p>
                <p className="mt-2 font-marker text-sm">{c.tagline}</p>
              </div>
              <span
                className="shrink-0 text-4xl transition-transform group-hover:scale-125 lg:text-5xl"
                aria-hidden="true"
              >
                {c.emoji}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {COLLECTIONS.map((c) => (
        <Shelf key={c.slug} collection={c} products={byCollection(c.slug)} />
      ))}

      {/* MANIFIESTO */}
      <section id="manifiesto" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-24">
        <div className="brutal relative overflow-hidden bg-asphalt-2 p-6 sm:p-10">
          <div className="tape absolute top-0 left-0 h-3 w-full" aria-hidden="true" />
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <Equalizer className="h-24 md:h-40" />
            <div>
              <h2 className="font-graffiti text-5xl text-cyan sm:text-6xl">La kru</h2>
              <p className="mt-4 max-w-2xl text-lg text-chalk/85">
                BreakBeat nace entre bafles reventaos, botes de spray y mañaneos en el parking del
                after. Cada diseño sale de bocetos de verdá: tags, potas y piezas ke antes vivían en
                la libreta y en las paredes der barrio. Aquí no hay postureo, aquí hay arte, nen.
              </p>
              <ul className="mt-6 grid gap-3 font-display text-sm uppercase sm:grid-cols-3">
                <li className="border-2 border-black bg-pink px-3 py-2 text-asphalt">
                  Diseños der barrio
                </li>
                <li className="border-2 border-black bg-yolk px-3 py-2 text-asphalt">
                  Impreso al momento
                </li>
                <li className="border-2 border-black bg-acid px-3 py-2 text-asphalt">
                  Cero stock tirao
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Productos de una colección, los destacados primero. */
function byCollection(collection: Collection) {
  return getByCollection(collection).sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

function Shelf({ collection, products }: { collection: CollectionInfo; products: Product[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className={`font-graffiti text-5xl sm:text-6xl ${collection.text}`}>
            {collection.name} <span aria-hidden="true">{collection.emoji}</span>
          </h2>
          <p className="mt-2 max-w-xl font-marker text-chalk/80">{collection.description}</p>
        </div>
        <Link
          href={`/coleccion/${collection.slug}`}
          className="font-marker text-lg whitespace-nowrap hover:text-acid"
        >
          Ver tó {collection.name} →
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-8 lg:grid-cols-4">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}

/** Manchas de spray difuminadas de fondo. */
function SprayBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -top-24 -left-24 size-80 rounded-full bg-pink/30 blur-3xl" />
      <div className="absolute top-40 right-0 size-96 rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-acid/15 blur-3xl" />
    </div>
  );
}
