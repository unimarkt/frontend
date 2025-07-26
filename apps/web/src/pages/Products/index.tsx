import React, { useState, useCallback } from "react";
import Layout from "../../components/Layout";
import Tabs from "../../components/ui/Tabs";
import ProductsHeader from "./components/ProductsHeader";
import ProductsGrid from "./components/ProductsGrid";
import { useProductsFilter } from "./hooks/useProductsFilter";
import { mockProducts } from "../Dashboard/mockData";
import type { ProductsFilter } from "./hooks/useProductsFilter";

const ProductsPage: React.FC = () => {
  const [filter, setFilter] = useState<ProductsFilter>({
    search: "",
    status: "all"
  });

  const filteredProducts = useProductsFilter(mockProducts, filter);

  const tabs = [
    { id: "all", label: "Все", count: mockProducts.length },
    { id: "active", label: "Активные", count: mockProducts.filter(p => p.status === "active").length },
    { id: "draft", label: "Черновики", count: mockProducts.filter(p => p.status === "draft").length },
    { id: "trash", label: "Корзина", count: mockProducts.filter(p => p.status === "trash").length }
  ];

  const handleSearchChange = useCallback((value: string) => {
    setFilter(prev => ({ ...prev, search: value }));
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setFilter(prev => ({ 
      ...prev, 
      status: value as ProductsFilter["status"] 
    }));
  }, []);

  const handleLoadMore = useCallback(() => {
    // TODO: Реализовать загрузку дополнительных продуктов
    console.log("Загрузить еще продуктов");
  }, []);

  return (
    <Layout
      title="Продукты"
      subtitle="Управляйте вашими продуктами и товарами"
    >
      <div className="space-y-6">
        {/* Заголовок с поиском */}
        <ProductsHeader
          search={filter.search}
          onSearchChange={handleSearchChange}
        />

        {/* Табы */}
        <Tabs
          tabs={tabs}
          value={filter.status}
          onChange={handleTabChange}
          className="mb-6"
        />

        {/* Сетка продуктов */}
        <ProductsGrid
          products={filteredProducts}
          onLoadMore={handleLoadMore}
        />
      </div>
    </Layout>
  );
};

export default ProductsPage; 