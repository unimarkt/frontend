import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainContent from "../../components/layout/MainContent";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ProductCardLarge from "./components/ProductCardLarge";
import ProductEditForm from "./components/ProductEditForm";
import ItemsGrid from "./components/ItemsGrid";
import { useProductDetail } from "./hooks/useProductDetail";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || "0", 10);
  
  const { product, items, loading, error, updateProduct } = useProductDetail(productId);

  if (loading) {
    return (
      <MainContent>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </MainContent>
    );
  }

  if (error || !product) {
    return (
      <MainContent>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">❌</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Продукт не найден
          </h3>
          <p className="text-gray-500 mb-4">
            {error || "Запрашиваемый продукт не существует"}
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Вернуться к продуктам
          </button>
        </div>
      </MainContent>
    );
  }

  const breadcrumbs = [
    { label: "Продукты", to: "/products" },
    { label: product.name, to: `/products/${product.id}` }
  ];

  return (
    <MainContent>
      <div className="space-y-8">
        {/* Двухколоночный макет */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая панель - Карточка продукта */}
          <div className="h-full">
            <ProductCardLarge product={product} />
          </div>
          
          {/* Правая панель - Форма редактирования */}
          <div className="h-full">
            <ProductEditForm 
              product={product} 
              onUpdate={updateProduct}
            />
          </div>
        </div>

        {/* Сетка товаров */}
        <div className="mt-8">
          <ItemsGrid items={items} />
        </div>
      </div>
    </MainContent>
  );
};

export default ProductDetailPage; 