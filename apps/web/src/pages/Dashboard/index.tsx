import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { mockProducts, mockTemplates } from "./mockData";

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
                <span className="text-2xl mb-1">＋</span>
                Новый продукт
              </button>
              <button
                className="flex flex-col items-center bg-white text-primary-500 rounded-xl px-4 py-2 shadow hover:bg-primary-100 transition"
                onClick={() => navigate("/templates/new")}
              >
                <span className="text-2xl mb-1">📝</span>
                Новый шаблон
              </button>
              <button
                className="flex flex-col items-center bg-white text-primary-500 rounded-xl px-4 py-2 shadow hover:bg-primary-100 transition"
                onClick={handleImportImages}
              >
                <span className="text-2xl mb-1">🖼️</span>
                Импортировать изображение
              </button>
              <button
                className="flex flex-col items-center bg-white text-primary-500 rounded-xl px-4 py-2 shadow hover:bg-primary-100 transition"
                onClick={() => navigate("/templates")}
              >
                <span className="text-2xl mb-1">📚</span>
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
                    <div key={i} className="h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl" />
                  ))}
                  <div className="h-16 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600 font-bold">10+</div>
                </div>
              </div>
            </div>

            {/* Поиск и последние продукты */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Последние продукты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts.map(p => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl shadow p-4 cursor-pointer hover:bg-primary-50 transition"
                    onClick={() => handleEditProduct(p.id)}
                  >
                    <div className="h-32 bg-gradient-to-b from-gray-100 to-gray-300 rounded-xl mb-2" />
                    <div className="font-bold">{p.name}</div>
                    <div className="text-sm text-gray-500">{p.items} товаров, {p.cards} карточек</div>
                    <div className="text-xs text-gray-400">Изменено: {p.lastEdit}</div>
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="col-span-full text-gray-400 text-center py-8">Нет товаров</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 