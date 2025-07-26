import React, { useState } from 'react';
import type { ImageProperties } from '../types/canvas.types';

interface ImagePropertiesProps {
  onChange: (properties: ImageProperties) => void;
  initialProperties?: Partial<ImageProperties>;
}

const ImageProperties: React.FC<ImagePropertiesProps> = ({
  onChange,
  initialProperties = {}
}) => {
  const [properties, setProperties] = useState<ImageProperties>({
    opacity: 1,
    filters: [],
    cropX: 0,
    cropY: 0,
    scaleX: 1,
    scaleY: 1,
    brightness: 0,
    contrast: 0,
    saturation: 0,
    ...initialProperties
  });

  const handleChange = (key: keyof ImageProperties, value: any) => {
    const newProperties = { ...properties, [key]: value };
    setProperties(newProperties);
    onChange(newProperties);
  };

  const filters = [
    { value: 'none', label: 'Нет' },
    { value: 'grayscale', label: 'Черно-белый' },
    { value: 'sepia', label: 'Сепия' },
    { value: 'blur', label: 'Размытие' },
    { value: 'brightness', label: 'Яркость' },
    { value: 'contrast', label: 'Контрастность' }
  ];

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-3">Свойства изображения</h4>
      <div className="space-y-3">
        {/* Прозрачность */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Прозрачность
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={properties.opacity}
            onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {Math.round(properties.opacity * 100)}%
          </div>
        </div>

        {/* Масштаб */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Масштаб X
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={properties.scaleX}
              onChange={(e) => handleChange('scaleX', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {properties.scaleX.toFixed(1)}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Масштаб Y
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={properties.scaleY}
              onChange={(e) => handleChange('scaleY', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {properties.scaleY.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Обрезка */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Обрезка X
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={properties.cropX}
              onChange={(e) => handleChange('cropX', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {properties.cropX}px
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Обрезка Y
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={properties.cropY}
              onChange={(e) => handleChange('cropY', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {properties.cropY}px
            </div>
          </div>
        </div>

        {/* Яркость */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Яркость
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={properties.brightness}
            onChange={(e) => handleChange('brightness', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {properties.brightness}%
          </div>
        </div>

        {/* Контрастность */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Контрастность
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={properties.contrast}
            onChange={(e) => handleChange('contrast', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {properties.contrast}%
          </div>
        </div>

        {/* Насыщенность */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Насыщенность
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={properties.saturation}
            onChange={(e) => handleChange('saturation', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {properties.saturation}%
          </div>
        </div>

        {/* Фильтры */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Фильтры
          </label>
          <select
            value={properties.filters[0] || 'none'}
            onChange={(e) => handleChange('filters', [e.target.value])}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {filters.map(filter => (
              <option key={filter.value} value={filter.value}>{filter.label}</option>
            ))}
          </select>
        </div>

        {/* Кнопки действий */}
        <div className="pt-2 space-y-2">
          <button
            onClick={() => {
              // TODO: Реализовать замену изображения
              console.log('Заменить изображение');
            }}
            className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Заменить изображение
          </button>
          
          <button
            onClick={() => {
              // TODO: Реализовать обрезку изображения
              console.log('Обрезать изображение');
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            Обрезать изображение
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageProperties); 