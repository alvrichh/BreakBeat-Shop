import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/BuyBox";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, KIND_LABELS, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: PageProps<"/producto/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.kind === product.kind) - Number(a.kind === product.kind))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <nav aria-label="Migas de pan" className="font-marker text-sm text-concrete">
        <Link href="/tienda" className="hover:text-acid">
          Tienda
        </Link>{" "}
        / <span>{KIND_LABELS[product.kind]}</span>
      </nav>

      <BuyBox product={product} />

      <section className="pt-24">
        <h2 className="throwup font-display text-3xl text-cyan uppercase [--throwup-shadow:var(--color-violet)] sm:text-4xl">
          Más cositas pa ti, nen
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-8 lg:grid-cols-4">
          {related.map((p, index) => (
            <ProductCard key={p.slug} product={p} index={index + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}
