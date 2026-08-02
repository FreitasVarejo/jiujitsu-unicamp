import { useState } from "react";
import { ProductModal, CategorySection, useStoreSections } from "./_product";
import { useProducts } from "@/hooks/data/use-products.hook";
import { Product } from "@/types/product";
import { StoreSkeleton } from "./StoreSkeleton";
import { StoreError } from "./StoreError";
import { StoreHeader } from "./StoreHeader";

export const Loja = () => {
  const { products, categories, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sections = useStoreSections(products, categories);

  if (loading) {
    return <StoreSkeleton />;
  }

  if (error) {
    return <StoreError error={error} />;
  }

  // Create category map for modal label
  const categoryMap = Object.fromEntries(
    categories.map((c) => [c.slug, c.name])
  );

  return (
    <div className="container py-12">
      <StoreHeader />

      <div className="space-y-16">
        {sections.map((section) => (
          <CategorySection
            key={section.slug}
            slug={section.slug}
            name={section.name}
            products={section.products}
            onProductClick={setSelectedProduct}
          />
        ))}
      </div>

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
