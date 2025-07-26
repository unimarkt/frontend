import React, { useCallback } from 'react';
import type { Layer } from '../../types/canvas.types';

interface LayerPropertiesProps {
  layer: Layer;
  onChange: (properties: any) => void;
}

const LayerProperties: React.FC<LayerPropertiesProps> = ({ layer, onChange }) => {
  const handleChange = useCallback((key: string, value: any) => {
    const newProperties = { ...layer.fabricObject, [key]: value };
    onChange(newProperties);
  }, [layer.fabricObject, onChange]);

  return (
    <div className="p-4 space-y-6">
      {/* Название слоя */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Название
        </label>
        <input
          type="text"
          value={layer.name}
          onChange={(e) => onChange({ ...layer, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Позиция */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            X
          </label>
          <input
            type="number"
            value={Math.round(layer.fabricObject.left || 0)}
            onChange={(e) => handleChange('left', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Y
          </label>
          <input
            type="number"
            value={Math.round(layer.fabricObject.top || 0)}
            onChange={(e) => handleChange('top', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Размеры */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ширина
          </label>
          <input
            type="number"
            value={Math.round(layer.fabricObject.width || 0)}
            onChange={(e) => handleChange('width', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Высота
          </label>
          <input
            type="number"
            value={Math.round(layer.fabricObject.height || 0)}
            onChange={(e) => handleChange('height', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Поворот */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Поворот
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={layer.fabricObject.angle || 0}
          onChange={(e) => handleChange('angle', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">
          {Math.round(layer.fabricObject.angle || 0)}°
        </div>
      </div>

      {/* Прозрачность */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Прозрачность
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round((layer.opacity || 1) * 100)}
          onChange={(e) => onChange({ ...layer, opacity: parseInt(e.target.value) / 100 })}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">
          {Math.round((layer.opacity || 1) * 100)}%
        </div>
      </div>

      {/* Z-индекс */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Z-индекс
        </label>
        <input
          type="number"
          value={layer.zIndex}
          onChange={(e) => onChange({ ...layer, zIndex: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      {/* Видимость */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Видимый
        </label>
        <input
          type="checkbox"
          checked={layer.visible}
          onChange={(e) => onChange({ ...layer, visible: e.target.checked })}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>

      {/* Заблокирован */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Заблокирован
        </label>
        <input
          type="checkbox"
          checked={layer.locked}
          onChange={(e) => onChange({ ...layer, locked: e.target.checked })}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>

      {/* Цвет заливки (для фигур) */}
      {layer.type === 'shape' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цвет заливки
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={layer.fabricObject.fill || '#000000'}
              onChange={(e) => handleChange('fill', e.target.value)}
              className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={layer.fabricObject.fill || '#000000'}
              onChange={(e) => handleChange('fill', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="#000000"
            />
          </div>
        </div>
      )}

      {/* Цвет обводки (для фигур) */}
      {layer.type === 'shape' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цвет обводки
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={layer.fabricObject.stroke || '#000000'}
              onChange={(e) => handleChange('stroke', e.target.value)}
              className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={layer.fabricObject.stroke || '#000000'}
              onChange={(e) => handleChange('stroke', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="#000000"
            />
          </div>
        </div>
      )}

      {/* Толщина обводки (для фигур) */}
      {layer.type === 'shape' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Толщина обводки
          </label>
          <input
            type="number"
            value={layer.fabricObject.strokeWidth || 0}
            onChange={(e) => handleChange('strokeWidth', parseInt(e.target.value))}
            min="0"
            max="20"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(LayerProperties); 