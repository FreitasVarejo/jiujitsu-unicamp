import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/product";
import { ProductCarousel } from "./ProductCarousel";

interface CategorySectionProps {
  slug: string;
  name: string;
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const CategorySection = ({
  slug,
  name,
  products,
  onProductClick,
}: CategorySectionProps) => {
  return (
    <div key={slug} className="flex flex-col">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="font-display text-3xl tracking-tight text-white uppercase">
          {name}
        </h2>
        <Separator className="flex-1" />
        <span className="font-mono text-sm text-gray-500">
          {products.length} {products.length === 1 ? "item" : "itens"}
        </span>
      </div>

      <ProductCarousel products={products} onProductClick={onProductClick} />
    </div>
  );
};
