import { useState, useEffect, useCallback } from "react";
import { mediaService, ProductInfo, ProductCategories } from "@/services/mediaService";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [categories, setCategories] = useState<ProductCategories>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [allProducts, cats] = await Promise.all([
        mediaService.getAllProducts(),
        mediaService.getProductCategories(),
      ]);

      setCategories(cats);
      setProducts(allProducts);
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
