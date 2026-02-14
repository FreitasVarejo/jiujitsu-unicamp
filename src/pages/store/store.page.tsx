import { ShoppingBag, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductCarousel } from './_components/ProductCarousel';
import { ProductModal } from './_components/ProductModal';
import { useProducts } from './store.hook';
import { ProductInfo } from '@/services/mediaService';

const Loja = () => {
  const { products, categories, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);

  const productsByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      const cat = product.categoria || 'outros';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(product);
      return acc;
    }, {} as Record<string, ProductInfo[]>);
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display text-white mb-4">Loja Oficial</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Equipamentos e vestuário com a identidade da nossa equipe.
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
        <div className="space-y-20">
          {Object.entries(productsByCategory).map(([catId, categoryProducts]) => (
            <div key={catId} className="flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-display text-white uppercase tracking-tight">
                  {categories[catId] || catId}
                </h2>
                <div className="h-px bg-zinc-800 flex-grow" />
                <span className="text-sm text-gray-500 font-mono">
                  {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
              
              <ProductCarousel 
                products={categoryProducts} 
                categories={categories} 
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
          categoryLabel={categories[selectedProduct.categoria]}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <div className="mt-16 p-8 bg-zinc-900 rounded-lg border border-zinc-800 text-center">
        <ShoppingBag className="mx-auto text-primary mb-4" size={48} />
        <h2 className="text-2xl font-display text-white mb-2">Como comprar?</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Nossa loja funciona sob demanda. Clique no botão de encomendar para falar diretamente com o responsável pelos pedidos via WhatsApp e verificar a disponibilidade de tamanhos.
        </p>
      </div>
    </div>
  );
};

export default Loja;
