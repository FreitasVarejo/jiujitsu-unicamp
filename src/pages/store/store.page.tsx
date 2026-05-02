import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCarousel } from "./_components/ProductCarousel";
import { ProductModal } from "./_components/ProductModal";
import { useProducts } from "@/hooks/data/use-products.hook";
import { Product } from "@/types/product";

export const Loja = () => {
  const { products, categories, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categoryMap = useMemo(() => {
    return Object.fromEntries(categories.map((c) => [c.slug, c.name]));
  }, [categories]);

  const orderedSections = useMemo(() => {
    const productsBySlug = products.reduce(
      (acc, product) => {
        const slug = product.category || "outros";
        if (!acc[slug]) acc[slug] = [];
        acc[slug].push(product);
        return acc;
      },
      {} as Record<string, Product[]>
    );

    // Iterate categories in backend order, skip empty ones
    const sections: { slug: string; name: string; products: Product[] }[] = [];
    for (const cat of categories) {
      const items = productsBySlug[cat.slug];
      if (items && items.length > 0) {
        sections.push({ slug: cat.slug, name: cat.name, products: items });
        delete productsBySlug[cat.slug];
      }
    }
    // Append products whose category is missing or uncategorized
    const remainingSlugs = Object.keys(productsBySlug);
    for (const slug of remainingSlugs) {
      const items = productsBySlug[slug];
      if (items && items.length > 0) {
        sections.push({
          slug,
          name: categoryMap[slug] || slug,
          products: items,
        });
      }
    }
    return sections;
  }, [products, categories, categoryMap]);

  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-display text-5xl text-white">Loja Oficial</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-400">
          Peças sob demanda com a identidade da nossa equipe. Clique em um
          produto para ver detalhes e encomendar.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
          <p className="text-gray-400">Carregando produtos...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <p className="mb-4 text-red-500">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {orderedSections.map((section) => (
            <div key={section.slug} className="flex flex-col">
              <div className="mb-8 flex items-center gap-4">
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">
                  {section.name}
                </h2>
                <div className="h-px flex-grow bg-zinc-800" />
                <span className="font-mono text-sm text-gray-500">
                  {section.products.length}{" "}
                  {section.products.length === 1 ? "item" : "itens"}
                </span>
              </div>

              <ProductCarousel
                products={section.products}
                onProductClick={setSelectedProduct}
              />
            </div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          categoryLabel={categoryMap[selectedProduct.category]}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
