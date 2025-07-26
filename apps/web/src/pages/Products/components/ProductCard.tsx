import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Edit, Copy, Trash2 } from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import type { Product } from "../../Dashboard/mockData";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    navigate(`/products/${product.id}`);
  };

  const handleEditCard = () => {
    navigate(`/editor/${product.id}`);
  };

  const handleDuplicate = () => {
    // TODO: Реализовать дублирование
    console.log("Дублировать продукт:", product.id);
  };

  const handleDelete = () => {
    // TODO: Реализовать удаление
    console.log("Удалить продукт:", product.id);
  };

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
    <Card className="relative group hover:shadow-lg transition-shadow">
      {/* Изображение продукта */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-200 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-sm text-gray-500">Нет изображения</p>
          </div>
        )}
      </div>

      {/* Информация о продукте */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {product.category}
            </p>
          </div>
          
          {/* Меню действий */}
          <div className="relative">
            <Button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MoreVertical size={16} />
            </Button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={handleEdit}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit size={14} />
                    Редактировать продукт
                  </button>
                  <button
                    onClick={handleEditCard}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit size={14} />
                    Редактировать карточку
                  </button>
                  <button
                    onClick={handleDuplicate}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Copy size={14} />
                    Дублировать
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  >
                    <Trash2 size={14} />
                    Удалить
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{product.items} товаров</span>
          <span>{product.cards} карточек</span>
        </div>

        {/* Статус */}
        <div className="flex items-center justify-between">
          <Badge className={getStatusColor(product.status)}>
            {getStatusLabel(product.status)}
          </Badge>
          <span className="text-xs text-gray-400">
            {product.lastEdit}
          </span>
        </div>
      </div>

      {/* Оверлей для клика */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={handleEdit}
        aria-label={`Редактировать ${product.name}`}
      />
    </Card>
  );
};

export default React.memo(ProductCard); 