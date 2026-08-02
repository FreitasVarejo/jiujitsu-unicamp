import { useMemo } from "react";
import { Product } from "@/types/product";

interface ProductCategory {
  slug: string;
  name: string;
}

export interface StoreSection {
  slug: string;
  name: string;
  products: Product[];
}

/**
 * Hook que agrupa produtos por categoria para renderização na loja
 */
export const useStoreSections = (
  products: Product[],
  categories: ProductCategory[]
): StoreSection[] => {
  return useMemo(() => {
    // Create map of categories by slug for quick lookup
    const categoryMap = Object.fromEntries(
      categories.map((c) => [c.slug, c.name])
    );

    // Group products by category slug
    const productsBySlug = products.reduce(
      (acc, product) => {
        const slug = product.category || "outros";
        if (!acc[slug]) acc[slug] = [];
        acc[slug].push(product);
        return acc;
      },
      {} as Record<string, Product[]>
    );

    // Build sections: first iterate categories in backend order, skip empty ones
    const sections: StoreSection[] = [];
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
  }, [products, categories]);
};
