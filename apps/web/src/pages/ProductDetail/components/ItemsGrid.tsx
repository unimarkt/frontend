import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { Download } from "lucide-react";
import type { ProductItem } from "../../Dashboard/mockData";

interface ItemsGridProps {
  items: ProductItem[];
}

const ItemsGrid: React.FC<ItemsGridProps> = ({ items }) => {
  const handleExport = (item: ProductItem) => {
    // Имитация экспорта товара
    console.log("Экспорт товара:", item.name);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Товары отсутствуют
          </h3>
          <p className="text-gray-500">
            В этом продукте пока нет товаров
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Товары продукта</h2>
        <p className="text-gray-600">
          Управляйте товарами в этом продукте
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {/* Изображение товара */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-lg">📦</span>
                  </div>
                  <p className="text-xs text-gray-500">Нет фото</p>
                </div>
              )}
            </div>

            {/* Информация о товаре */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {item.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-500">
                  {formatPrice(item.price, item.currency)}
                </span>
                
                <Button
                  onClick={() => handleExport(item)}
                  className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
                  aria-label={`Экспорт ${item.name}`}
                >
                  <Download size={16} />
                </Button>
              </div>

              {item.variant && (
                <div className="text-sm text-gray-500">
                  {item.variant.name}: {item.variant.value}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default React.memo(ItemsGrid); 