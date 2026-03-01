import { MessageCircle, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductCarousel } from './_components/ProductCarousel';
import { ProductModal } from './_components/ProductModal';
import { useProducts } from './store.hook';
import { ProductInfo } from '@/services/mediaService';

export const Loja = () => {
  const { products, categories, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);

  const categoryMap = useMemo(() => {
    return Object.fromEntries(categories.map((c) => [c.slug, c.name]));
  }, [categories]);

  const orderedSections = useMemo(() => {
    const productsBySlug = products.reduce((acc, product) => {
      const slug = product.category || 'outros';
      if (!acc[slug]) acc[slug] = [];
      acc[slug].push(product);
      return acc;
    }, {} as Record<string, ProductInfo[]>);

    // Iterate categories in backend order, skip empty ones
    const sections: { slug: string; name: string; products: ProductInfo[] }[] = [];
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
        sections.push({ slug, name: categoryMap[slug] || slug, products: items });
      }
    }
    return sections;
  }, [products, categories, categoryMap]);

  return (
    <div className="container py-12">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-display text-white mb-4">Loja Oficial</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Equipamentos e vestuário com a identidade da nossa equipe.
        </p>
      </div>

      {/* Como comprar — banner informativo no topo */}
      <div className="mb-12 p-5 bg-zinc-900/60 rounded-lg border border-zinc-800 flex items-center gap-4 max-w-2xl mx-auto">
        <MessageCircle className="text-green-500 shrink-0" size={28} />
        <p className="text-gray-400 text-sm leading-relaxed">
          <span className="text-white font-bold">Loja sob demanda.</span>{' '}
          Clique em um produto para ver os detalhes e encomendar diretamente pelo WhatsApp.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-gray-400">Carregando produtos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
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
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-display text-white uppercase tracking-tight">
                  {section.name}
                </h2>
                <div className="h-px bg-zinc-800 flex-grow" />
                <span className="text-sm text-gray-500 font-mono">
                  {section.products.length} {section.products.length === 1 ? 'item' : 'itens'}
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
