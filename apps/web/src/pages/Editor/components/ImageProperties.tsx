import React, { useState } from 'react';
import type { ImageLayer } from '../types/editor.types';

interface ImagePropertiesProps {
  layer: ImageLayer;
  onUpdate: (updates: Partial<ImageLayer>) => void;
}

const ImageProperties: React.FC<ImagePropertiesProps> = ({ layer, onUpdate }) => {
  const [showCropTool, setShowCropTool] = useState(false);

  const handleReplaceImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          // Сохраняем все текущие настройки фильтров
          onUpdate({ 
            src,
            name: file.name,
            // Сохраняем все примененные эффекты
            brightness: layer.brightness,
            contrast: layer.contrast,
            saturation: layer.saturation,
            blur: layer.blur,
            filters: { ...layer.filters }
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const applyFilter = (filterName: keyof typeof layer.filters, value: boolean) => {
    onUpdate({
      filters: {
        ...layer.filters,
        [filterName]: value
      }
    });
  };

  const getImageStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    
    // Применяем фильтры
    if (layer.brightness !== 0) {
      style.filter = `${style.filter || ''} brightness(${100 + layer.brightness}%)`;
    }
    if (layer.contrast !== 0) {
      style.filter = `${style.filter || ''} contrast(${100 + layer.contrast}%)`;
    }
    if (layer.saturation !== 0) {
      style.filter = `${style.filter || ''} saturate(${100 + layer.saturation}%)`;
    }
    if (layer.blur > 0) {
      style.filter = `${style.filter || ''} blur(${layer.blur}px)`;
    }
    if (layer.filters.grayscale) {
      style.filter = `${style.filter || ''} grayscale(100%)`;
    }
    if (layer.filters.sepia) {
      style.filter = `${style.filter || ''} sepia(100%)`;
    }

    return style;
  };

  return (
    <div className="space-y-4">
      {/* Предпросмотр изображения */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Предпросмотр
        </label>
        <div className="w-full h-32 bg-gray-100 rounded border overflow-hidden">
          <img
            src={layer.src}
            alt={layer.name}
            className="w-full h-full object-cover"
            style={getImageStyle()}
          />
        </div>
      </div>

      {/* Замена изображения */}
      <div>
        <button
          onClick={handleReplaceImage}
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Заменить изображение
        </button>
      </div>

      {/* Яркость */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Яркость: {layer.brightness > 0 ? '+' : ''}{layer.brightness}%
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          value={layer.brightness}
          onChange={(e) => onUpdate({ brightness: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>-100%</span>
          <span>0%</span>
          <span>+100%</span>
        </div>
      </div>

      {/* Контрастность */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Контрастность: {layer.contrast > 0 ? '+' : ''}{layer.contrast}%
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          value={layer.contrast}
          onChange={(e) => onUpdate({ contrast: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>-100%</span>
          <span>0%</span>
          <span>+100%</span>
        </div>
      </div>

      {/* Насыщенность */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Насыщенность: {layer.saturation > 0 ? '+' : ''}{layer.saturation}%
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          value={layer.saturation}
          onChange={(e) => onUpdate({ saturation: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>-100%</span>
          <span>0%</span>
          <span>+100%</span>
        </div>
      </div>

      {/* Размытие */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Размытие: {layer.blur}px
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={layer.blur}
          onChange={(e) => onUpdate({ blur: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0px</span>
          <span>10px</span>
        </div>
      </div>

      {/* Базовые фильтры */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Фильтры
        </label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="grayscale"
              checked={layer.filters.grayscale}
              onChange={(e) => applyFilter('grayscale', e.target.checked)}
              className="rounded"
            />
            <label htmlFor="grayscale" className="text-sm text-gray-600">
              Черно-белый
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sepia"
              checked={layer.filters.sepia}
              onChange={(e) => applyFilter('sepia', e.target.checked)}
              className="rounded"
            />
            <label htmlFor="sepia" className="text-sm text-gray-600">
              Сепия
            </label>
          </div>
        </div>
      </div>

      {/* Кнопки сброса */}
      <div className="flex gap-2">
        <button
          onClick={() => onUpdate({
            brightness: 0,
            contrast: 0,
            saturation: 0,
            blur: 0,
            filters: { grayscale: false, sepia: false }
          })}
          className="flex-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Сбросить все
        </button>
        <button
          onClick={() => onUpdate({ filters: { grayscale: false, sepia: false } })}
          className="flex-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Сбросить фильтры
        </button>
      </div>

      {/* Информация об изображении */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Информация</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Имя: {layer.name}</div>
          <div>Размер: {layer.width} × {layer.height}px</div>
          <div>Позиция: {layer.x}, {layer.y}</div>
          <div>Прозрачность: {Math.round(layer.opacity * 100)}%</div>
        </div>
      </div>
    </div>
  );
};

export default ImageProperties; 