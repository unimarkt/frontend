import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LogoIcon, BrushIcon, ImagePlusIcon, LayoutIcon, DeleteIcon, HomeIcon, LayersIcon, AvatarIcon } from '../../assets/icons';

const EditorPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  
  // Базовое состояние
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Простой навбар */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoIcon width={32} height={32} />
            <h1 className="text-xl font-bold text-gray-800">
              Редактор карточек - {productId}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <AvatarIcon width={32} height={32} />
            <span className="text-sm text-gray-600">Пользователь</span>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex flex-1">
        {/* Левая панель */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-4">
            <LayersIcon width={20} height={20} color="#6B7280" />
            <h2 className="text-lg font-semibold">Слои</h2>
          </div>
          <div className="space-y-2">
            <div 
              className={`p-3 border rounded cursor-pointer transition-colors ${
                selectedLayer === 'title' 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedLayer('title')}
            >
              <div className="flex items-center gap-2">
                <BrushIcon width={16} height={16} color="#6B7280" />
                <div>
                  <div className="font-medium">Заголовок</div>
                  <div className="text-sm text-gray-600">text</div>
                </div>
              </div>
            </div>
            <div 
              className={`p-3 border rounded cursor-pointer transition-colors ${
                selectedLayer === 'description' 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedLayer('description')}
            >
              <div className="flex items-center gap-2">
                <BrushIcon width={16} height={16} color="#6B7280" />
                <div>
                  <div className="font-medium">Описание</div>
                  <div className="text-sm text-gray-600">text</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <button className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2">
              <BrushIcon width={16} height={16} color="white" />
              + Добавить текст
            </button>
            <button className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2">
              <ImagePlusIcon width={16} height={16} color="white" />
              + Добавить изображение
            </button>
            <button className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2">
              <LayoutIcon width={16} height={16} color="white" />
              + Добавить фигуру
            </button>
          </div>
        </div>

        {/* Центральная область */}
        <div className="flex-1 flex flex-col">
          {/* Тулбар */}
          <div className="bg-white border-b border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Масштаб: {zoom}%</span>
                <button 
                  className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  onClick={() => setZoom(Math.max(25, zoom - 25))}
                >
                  -
                </button>
                <button 
                  className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  onClick={() => setZoom(Math.min(400, zoom + 25))}
                >
                  +
                </button>
              </div>
              <button 
                className={`px-3 py-1 rounded hover:opacity-80 ${
                  showGrid 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setShowGrid(!showGrid)}
              >
                Сетка {showGrid ? 'Вкл' : 'Выкл'}
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
            <div 
              className="bg-white border border-gray-300 shadow-sm relative" 
              style={{ 
                width: 450, 
                height: 600,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center center'
              }}
            >
              {/* Точечная сетка */}
              {showGrid && (
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                    backgroundSize: '23px 23px'
                  }}
                />
              )}
              
              {/* Элементы */}
              <div 
                className={`absolute top-12 left-12 text-2xl font-bold text-black cursor-pointer ${
                  selectedLayer === 'title' ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                }`}
                onClick={() => setSelectedLayer('title')}
              >
                Название продукта
              </div>
              <div 
                className={`absolute top-20 left-12 text-base text-gray-600 max-w-xs cursor-pointer ${
                  selectedLayer === 'description' ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                }`}
                onClick={() => setSelectedLayer('description')}
              >
                Описание продукта
              </div>
            </div>
          </div>
        </div>

        {/* Правая панель */}
        <div className="w-64 bg-white border-l border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-4">Свойства</h2>
          {selectedLayer ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Выбранный слой
                </label>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {selectedLayer === 'title' ? 'Заголовок' : 'Описание'}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Тип
                </label>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  Текст
                </div>
              </div>
              
              <button className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center justify-center gap-2">
                <DeleteIcon width={16} height={16} color="white" />
                Удалить слой
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              Выберите слой для редактирования
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage; 