import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Banner from "../../components/Banner";
import { mockProducts, mockTemplates } from "./mockData";
import { Plus, TrendingUp, FileText, Palette } from "lucide-react";

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredProducts = useMemo(
    () => mockProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const handleCreateProduct = () => {
    toast.success("Переход на создание продукта");
    navigate("/products/new");
  };

  const handleOpenTemplate = (id: number) => {
    toast("Открытие шаблона #" + id);
    navigate(`/templates/${id}`);
  };

  const handleImportImages = () => {
    toast.success("Импорт изображений (заглушка)");
    navigate("/upload");
  };

  const handleEditProduct = (id: number) => {
    toast("Переход к продукту #" + id);
    navigate(`/products/${id}`);
  };

  const stats = [
    {
      title: "Всего продуктов",
      value: mockProducts.length,
      icon: <FileText className="w-6 h-6" />,
      color: "text-primary-500",
      bgColor: "bg-primary-50"
    },
    {
      title: "Активных",
      value: mockProducts.filter(p => p.status === 'active').length,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Черновиков",
      value: mockProducts.filter(p => p.status === 'draft').length,
      icon: <FileText className="w-6 h-6" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Шаблонов",
      value: mockTemplates.length,
      icon: <Palette className="w-6 h-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <Layout
      title="Главная"
      subtitle="Добро пожаловать в UniMart - платформу для создания карточек товаров"
    >
      {/* Новый баннер */}
      <Banner />

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Последние продукты */}
      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Последние продукты</h2>
          <Button 
            onClick={() => navigate("/products")} 
            variant="outline" 
            className="text-primary-600 hover:text-primary-700"
          >
            Посмотреть все
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleEditProduct(product.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {product.status === 'active' ? 'Активен' : 'Черновик'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{product.category}</span>
                <span>{product.items} шт.</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Шаблоны и быстрые действия */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Популярные шаблоны</h3>
          <div className="grid grid-cols-2 gap-3">
            {mockTemplates.slice(0, 4).map(template => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleOpenTemplate(template.id)}
              >
                <div className="w-full h-20 bg-gray-100 rounded mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">{template.name}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{template.name}</p>
                <p className="text-xs text-gray-500">{template.category}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
          <div className="space-y-3">
            <Button 
              onClick={handleCreateProduct} 
              className="w-full justify-start" 
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать новый продукт
            </Button>
            <Button 
              onClick={() => navigate("/constructor")} 
              className="w-full justify-start" 
              variant="outline"
            >
              <FileText className="w-4 h-4 mr-2" />
              Открыть конструктор
            </Button>
            <Button 
              onClick={() => navigate("/templates")} 
              className="w-full justify-start" 
              variant="outline"
            >
              <Palette className="w-4 h-4 mr-2" />
              Просмотреть шаблоны
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard; 