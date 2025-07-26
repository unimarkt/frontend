import React, { useRef, useCallback, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import type { Product } from "../../Dashboard/mockData";

interface ProductsGridProps {
  products: Product[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  loading = false,
  hasMore = false,
  onLoadMore
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useRef<HTMLDivElement | null>(null);

  const lastProductCallback = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && onLoadMore) {
        onLoadMore();
      }
    });
    
    if (node) {
      observerRef.current.observe(node);
    }
  }, [loading, hasMore, onLoadMore]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (products.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">📦</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Продукты не найдены
        </h3>
        <p className="text-gray-500">
          Попробуйте изменить параметры поиска или создать новый продукт
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const isLastProduct = index === products.length - 1;
          
          return (
            <div
              key={product.id}
              ref={isLastProduct ? lastProductCallback : null}
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
      
      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}
      
      {!loading && hasMore && (
        <div className="text-center py-4">
          <button
            onClick={onLoadMore}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Загрузить еще
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductsGrid); 