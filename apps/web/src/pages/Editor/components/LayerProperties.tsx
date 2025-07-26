import React, { useState } from 'react';
import type { Layer } from '../types/canvas.types';

interface LayerPropertiesProps {
  layer: Layer;
  onChange: (properties: Partial<Layer>) => void;
}

const LayerProperties: React.FC<LayerPropertiesProps> = ({
  layer,
  onChange,
}) => {
  const [properties, setProperties] = useState({
    name: layer.name,
    visible: layer.visible,
    locked: layer.locked,
    opacity: layer.opacity,
  });

  const handleChange = (key: keyof typeof properties, value: any) => {
    const newProperties = { ...properties, [key]: value };
    setProperties(newProperties);
    onChange(newProperties);
  };

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-3">Общие свойства</h4>
      <div className="space-y-3">
        {/* Название слоя */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Название
          </label>
          <input
            type="text"
            value={properties.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Позиция и размер */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Позиция X
            </label>
            <input
              type="number"
              value={layer.fabricObject.left || 0}
              onChange={(e) => {
                // TODO: Обновить позицию объекта на canvas
                console.log('Position X:', e.target.value);
              }}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Позиция Y
            </label>
            <input
              type="number"
              value={layer.fabricObject.top || 0}
              onChange={(e) => {
                // TODO: Обновить позицию объекта на canvas
                console.log('Position Y:', e.target.value);
              }}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Ширина
            </label>
            <input
              type="number"
              value={layer.fabricObject.width || 0}
              onChange={(e) => {
                // TODO: Обновить размер объекта на canvas
                console.log('Width:', e.target.value);
              }}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Высота
            </label>
            <input
              type="number"
              value={layer.fabricObject.height || 0}
              onChange={(e) => {
                // TODO: Обновить размер объекта на canvas
                console.log('Height:', e.target.value);
              }}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Поворот */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Поворот
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={layer.fabricObject.angle || 0}
            onChange={(e) => {
              // TODO: Обновить поворот объекта на canvas
              console.log('Rotation:', e.target.value);
            }}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {layer.fabricObject.angle || 0}°
          </div>
        </div>

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

        {/* Переключатели */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={properties.visible}
              onChange={(e) => handleChange('visible', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs font-medium text-gray-700">Видимый</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={properties.locked}
              onChange={(e) => handleChange('locked', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs font-medium text-gray-700">Заблокирован</span>
          </label>
        </div>

        {/* Z-индекс */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Z-индекс
          </label>
          <input
            type="number"
            min="0"
            value={layer.zIndex}
            onChange={(e) => {
              // TODO: Обновить z-index объекта на canvas
              console.log('Z-Index:', e.target.value);
            }}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(LayerProperties); 