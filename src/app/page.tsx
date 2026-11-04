import Link from "next/link";
import { Equalizer } from "@/components/Equalizer";
import { Marquee } from "@/components/Marquee";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, getProduct } from "@/lib/products";

export default function Home() {
  const featured = getFeaturedProducts();
  const hero = getProduct("amen-break")!;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <SprayBlobs />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 md:grid-cols-[1.2fr_1fr] md:pt-16">
          <div>
            <p className="inline-block -rotate-2 border-2 border-black bg-yolk px-3 py-1 font-display text-xs text-asphalt uppercase">
              Drop 01 · ya ta en la kalle, illo
            </p>
            <h1 className="mt-5 font-graffiti text-[clamp(3.5rem,13vw,8.5rem)] leading-[0.85] text-pink">
              <span className="block">Popopo</span>
              <span className="block pl-[0.6em] text-acid">pisha!</span>
            </h1>
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
          </div>

          <Link
            href={`/producto/${hero.slug}`}
            className="group relative mx-auto w-full max-w-sm"
            aria-label={`Ver ${hero.name}`}
          >
            <div className="brutal absolute inset-4 rotate-6 bg-cyan" aria-hidden="true" />
            <div className="brutal relative -rotate-3 bg-acid transition-transform duration-300 group-hover:rotate-0">
              <ProductArt product={hero} className="w-full p-4" />
            </div>
            <span className="absolute -right-2 -bottom-4 rotate-6 border-2 border-black bg-chalk px-3 py-1 font-marker text-asphalt">
              {hero.name} →
            </span>
          </Link>
        </div>
      </section>

      <Marquee
        className="-rotate-1 bg-acid text-asphalt"
        words={["Popopo", "Mañaneo", "Kataneo", "Grafiteo", "136 BPM", "Illo", "To flama", "La kru"]}
      />
      <Marquee
        reverse
        className="rotate-1 bg-pink text-asphalt"
        words={["Hecho bajo pedido", "Envío a toa España", "Tinta ke no se cuartea", "Diseños der barrio"]}
      />

      {/* DESTACADOS */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="throwup font-display text-4xl text-yolk uppercase sm:text-5xl">
            Lo ke má peta
          </h2>
          <Link href="/tienda" className="font-marker text-lg hover:text-acid">
            Ver tó, quillo →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-8 lg:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>

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
