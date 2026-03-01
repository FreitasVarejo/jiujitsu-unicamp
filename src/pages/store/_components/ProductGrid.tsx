import { ProductInfo } from '@/services/mediaService';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: ProductInfo[];
  categories: Record<string, string>;
  onProductClick: (product: ProductInfo) => void;
}

export const ProductGrid = ({ products, categories, onProductClick }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          categoryLabel={categories[product.category]}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};
