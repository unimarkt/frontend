import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { mockProducts, mockTemplates } from "./mockData";
import { 
  NewProductIcon, 
  NewTemplateIcon, 
  ImportImageIcon, 
  GalleryIcon 
} from "../../assets/icons/DashboardIcons";

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredProducts = useMemo(
    () => mockProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const handleCreateProduct = () => {
    toast.success("Переход на создание продукта");
    navigate("/new-product");
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto">
          {/* Баннер */}
          <div className="bg-primary-500 text-white rounded-2xl p-8 text-center max-w-6xl mx-auto mt-8 mb-6">
            <h1 className="text-3xl font-bold mb-2">Сделай новый дизайн!</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button
                className="flex flex-col items-center bg-white text-primary-500 rounded-xl px-4 py-2 shadow hover:bg-primary-100 transition"
                onClick={handleCreateProduct}
              >
                <NewProductIcon className="w-6 h-6 mb-1" />
                Новый продукт
              </button>
              <button
                className="flex flex-col items-center bg-white text-primary-500 rounded-xl px-4 py-2 shadow hover:bg-primary-100 transition"
                onClick={() => navigate("/templates/new")}
              >
                <NewTemplateIcon className="w-6 h-6 mb-1" />
                Новый шаблон
              </button>
              <button
                className="flex flex-col items-center bg-white text-primary-500 rounded-xl px-4 py-2 shadow hover:bg-primary-100 transition"
                onClick={handleImportImages}
              >
                <ImportImageIcon className="w-6 h-6 mb-1" />
                Импортировать изображение
              </button>
              <button
                className="flex flex-col items-center bg-white text-primary-500 rounded-xl px-4 py-2 shadow hover:bg-primary-100 transition"
                onClick={() => navigate("/templates")}
              >
                <GalleryIcon className="w-6 h-6 mb-1" />
                Галерея шаблонов
              </button>
            </div>
          </div>

          {/* Контент */}
          <div className="max-w-6xl mx-auto px-4">
            {/* Стандартные шаблоны и галерея */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1 bg-gray-100 rounded-xl p-4">
                <h2 className="font-semibold mb-2">Стандартные шаблоны</h2>
                <div className="flex gap-4">
                  {mockTemplates.slice(0, 5).map(t => (
                    <div
                      key={t.id}
                      className="w-24 h-24 bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary-50 transition"
                      onClick={() => handleOpenTemplate(t.id)}
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded mb-2" />
                      <div className="text-xs text-center">{t.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-gray-100 rounded-xl p-4">
                <h2 className="font-semibold mb-2">Галерея</h2>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-16 bg-white rounded cursor-pointer hover:bg-primary-50 transition"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Последние продукты */}
            <div className="bg-white rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Последние продукты</h2>
                <button
                  className="text-primary-500 hover:text-primary-600 font-medium"
                  onClick={() => navigate("/products")}
                >
                  Посмотреть все
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.status === 'active' ? 'Активен' : 'Черновик'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                                         <div className="flex justify-between text-xs text-gray-500">
                       <span>Изменено: {product.lastEdit}</span>
                       <span>{product.items} элементов</span>
                     </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-primary-500 mb-1">
                  {mockProducts.length}
                </div>
                <div className="text-sm text-gray-600">Всего продуктов</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {mockProducts.filter(p => p.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Активных</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-1">
                  {mockProducts.filter(p => p.status === 'draft').length}
                </div>
                <div className="text-sm text-gray-600">Черновиков</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-blue-500 mb-1">
                  {mockTemplates.length}
                </div>
                <div className="text-sm text-gray-600">Шаблонов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 