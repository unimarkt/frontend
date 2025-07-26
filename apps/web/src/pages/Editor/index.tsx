import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';

const EditorPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <Layout
      title="Редактор карточек"
      subtitle="Создавайте и редактируйте карточки товаров"
    >
      <div className="h-[calc(100vh-200px)] flex flex-col bg-gray-50">
        {/* Простой заголовок */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <h2 className="text-lg font-semibold">Редактор карточек</h2>
          <p className="text-sm text-gray-600">Product ID: {productId}</p>
        </div>

        {/* Основная область */}
        <div className="flex-1 flex">
          {/* Левая панель */}
          <div className="w-64 bg-white border-r border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-4">Слои</h3>
            <p className="text-gray-500">Здесь будут слои</p>
          </div>

          {/* Центральная область */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Canvas Area</h3>
              <p className="text-gray-500">Здесь будет canvas редактора</p>
            </div>
          </div>

          {/* Правая панель */}
          <div className="w-80 bg-white border-l border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-4">Свойства</h3>
            <p className="text-gray-500">Здесь будут свойства</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditorPage; 