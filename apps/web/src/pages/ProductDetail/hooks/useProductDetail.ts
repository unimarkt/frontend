import { useState, useEffect } from "react";
import type { Product, ProductItem } from "../../Dashboard/mockData";
import { mockProducts, mockProductItems } from "../../Dashboard/mockData";

export const useProductDetail = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [items, setItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProduct = mockProducts.find(p => p.id === id);
        if (!foundProduct) {
          throw new Error("Продукт не найден");
        }
        
        setProduct(foundProduct);
        setItems(mockProductItems);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = (updates: Partial<Product>) => {
    if (product) {
      setProduct({ ...product, ...updates });
    }
  };

  return {
    product,
    items,
    loading,
    error,
    updateProduct
  };
}; 