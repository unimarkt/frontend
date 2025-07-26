import React from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import type { Product } from "../../Dashboard/mockData";

interface ProductCardLargeProps {
  product: Product;
}

const ProductCardLarge: React.FC<ProductCardLargeProps> = ({ product }) => {
  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "trash":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return "Активный";
      case "draft":
        return "Черновик";
      case "trash":
        return "Корзина";
      default:
        return "Неизвестно";
    }
  };

  return (
    <Card className="h-full">
      {/* Изображение продукта */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 bg-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">📦</span>
            </div>
            <p className="text-gray-500">Нет изображения</p>
          </div>
        )}
      </div>

      {/* Информация о продукте */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-3">
            <Badge className="bg-blue-100 text-blue-800">
              {product.category}
            </Badge>
            <Badge className={getStatusColor(product.status)}>
              {getStatusLabel(product.status)}
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Описание</h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description || "Описание отсутствует"}
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-500">
              {product.items}
            </div>
            <div className="text-sm text-gray-500">Товаров</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-500">
              {product.cards}
            </div>
            <div className="text-sm text-gray-500">Карточек</div>
          </div>
        </div>

        {/* Последнее изменение */}
        <div className="text-sm text-gray-400 pt-2 border-t border-gray-100">
          Последнее изменение: {product.lastEdit}
        </div>
      </div>
    </Card>
  );
};

export default React.memo(ProductCardLarge); 