import { useMemo } from "react";
import type { Product } from "../../Dashboard/mockData";

export interface ProductsFilter {
  search: string;
  status: "all" | "active" | "draft" | "trash";
}

export const useProductsFilter = (
  products: Product[],
  filter: ProductsFilter
) => {
  return useMemo(() => {
    return products.filter((product) => {
      // Фильтр по поиску
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filter.search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(filter.search.toLowerCase());

      // Фильтр по статусу
      const matchesStatus = 
        filter.status === "all" || 
        product.status === filter.status;

      return matchesSearch && matchesStatus;
    });
  }, [products, filter.search, filter.status]);
}; 