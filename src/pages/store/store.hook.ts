import { useState, useEffect, useCallback } from "react";
import { mediaService, ProductInfo, ProductCategories } from "@/services/mediaService";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [categories, setCategories] = useState<ProductCategories>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch index and categories in parallel
      const [ids, cats] = await Promise.all([
        mediaService.getProductIndex(),
        mediaService.getProductCategories(),
      ]);

      setCategories(cats);

      // Fetch details for all products
      const productDetails = await Promise.all(
        ids.map(async (id) => {
          try {
            return await mediaService.getProductInfo(id);
          } catch (err) {
            console.error(`Erro ao carregar produto ${id}:`, err);
            return null;
          }
        })
      );

      setProducts(productDetails.filter((p): p is ProductInfo => p !== null));
    } catch (err) {
      console.error("Erro ao carregar dados da loja:", err);
      setError("Não foi possível carregar os produtos da loja.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { products, categories, loading, error };
};
