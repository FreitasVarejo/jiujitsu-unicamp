/**
 * Hooks para gerenciar produtos.
 */

import { useMemo } from "react";
import { useFetch } from "@/hooks/core";
import { productsService } from "@/services/strapi/products.service";
import { productAdapter } from "@/adapters/strapi/product.adapter";
import { Product } from "@/types/product";

interface ProductCategory {
  slug: string;
  name: string;
}

interface UseProductsReturn {
  products: Product[];
  categories: ProductCategory[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para buscar produtos e categorias.
 */
export const useProducts = (): UseProductsReturn => {
  const {
    data: rawProducts,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetch(() => productsService.getAll(), [], {
    cache: true,
    cacheKey: "products-list",
  });

  const {
    data: rawCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetch(() => productsService.getCategories(), [], {
    cache: true,
    cacheKey: "products-categories",
  });

  const products = useMemo(
    () => (rawProducts || []).map(productAdapter),
    [rawProducts]
  );

  const categories = useMemo(
    () =>
      (rawCategories || []).map((cat) => ({
        slug: cat.slug,
        name: cat.name,
      })),
    [rawCategories]
  );

  const loading = loadingProducts || loadingCategories;
  const error = errorProducts || errorCategories;

  return {
    products,
    categories,
    loading,
    error,
  };
};
