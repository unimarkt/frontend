import React, { useCallback } from 'react';

interface ImagePropertiesProps {
  properties: any;
  onChange: (properties: any) => void;
}

const ImageProperties: React.FC<ImagePropertiesProps> = ({ properties, onChange }) => {
  const handleChange = useCallback((key: string, value: any) => {
    const newProperties = { ...properties, [key]: value };
    onChange(newProperties);
  }, [properties, onChange]);

  return (
    <div className="p-4 space-y-6">
      {/* Прозрачность */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Прозрачность
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round((properties.opacity || 1) * 100)}
          onChange={(e) => handleChange('opacity', parseInt(e.target.value) / 100)}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">
          {Math.round((properties.opacity || 1) * 100)}%
        </div>
      </div>

      {/* Масштаб */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Масштаб X
          </label>
          <input
            type="number"
            value={properties.scaleX || 1}
            onChange={(e) => handleChange('scaleX', parseFloat(e.target.value))}
            min="0.1"
            max="10"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Масштаб Y
          </label>
          <input
            type="number"
            value={properties.scaleY || 1}
            onChange={(e) => handleChange('scaleY', parseFloat(e.target.value))}
            min="0.1"
            max="10"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Позиция */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            X
          </label>
          <input
            type="number"
            value={Math.round(properties.left || 0)}
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
            value={Math.round(properties.top || 0)}
            onChange={(e) => handleChange('top', parseInt(e.target.value))}
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
          value={properties.angle || 0}
          onChange={(e) => handleChange('angle', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">
          {Math.round(properties.angle || 0)}°
        </div>
      </div>

      {/* Яркость */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Яркость
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          value={properties.brightness || 0}
          onChange={(e) => handleChange('brightness', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">
          {properties.brightness || 0}%
        </div>
      </div>

      {/* Контрастность */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Контрастность
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          value={properties.contrast || 0}
          onChange={(e) => handleChange('contrast', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">
          {properties.contrast || 0}%
        </div>
      </div>

      {/* Насыщенность */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Насыщенность
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          value={properties.saturation || 0}
          onChange={(e) => handleChange('saturation', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">
          {properties.saturation || 0}%
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
            value={Math.round(properties.width || 0)}
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
            value={Math.round(properties.height || 0)}
            onChange={(e) => handleChange('height', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageProperties); 