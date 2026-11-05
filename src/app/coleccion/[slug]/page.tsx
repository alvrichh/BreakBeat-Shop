import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/Catalog";
import { COLLECTIONS, getByCollection, getCollection } from "@/lib/products";

export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/coleccion/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return { title: collection.name, description: collection.description };
}

export default async function CollectionPage({ params }: PageProps<"/coleccion/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <p
        className={`inline-block -rotate-2 border-2 border-black px-3 py-1 font-display text-xs text-asphalt uppercase ${collection.bg}`}
      >
        Colección · {collection.tagline}
      </p>
      <h1 className={`mt-4 font-graffiti text-6xl sm:text-8xl ${collection.text}`}>
        {collection.name} <span aria-hidden="true">{collection.emoji}</span>
      </h1>
      <p className="mt-3 max-w-xl text-chalk/80">{collection.description}</p>

      <nav aria-label="Otras colecciones" className="mt-6 flex flex-wrap gap-3 font-marker">
        {COLLECTIONS.filter((c) => c.slug !== collection.slug).map((c) => (
          <Link key={c.slug} href={`/coleccion/${c.slug}`} className={`hover:underline ${c.text}`}>
            {c.emoji} Ver {c.name} →
          </Link>
        ))}
      </nav>

      <Catalog products={getByCollection(collection.slug)} />
    </div>
  );
}
