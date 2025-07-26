import React from 'react';
import { X } from 'lucide-react';
import TextProperties from './TextProperties';
import ImageProperties from './ImageProperties';
import LayerProperties from './LayerProperties';
import type { Layer, TextProperties as TextProps, ImageProperties as ImageProps } from '../types/canvas.types';

interface PropertiesPanelProps {
  selectedLayer: Layer | null;
  onClose: () => void;
  onTextPropertiesChange: (properties: TextProps) => void;
  onImagePropertiesChange: (properties: ImageProps) => void;
  onLayerPropertiesChange: (layerId: string, properties: Partial<Layer>) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedLayer,
  onClose,
  onTextPropertiesChange,
  onImagePropertiesChange,
  onLayerPropertiesChange,
}) => {
  if (!selectedLayer) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Свойства</h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <p className="text-sm">Выберите объект для редактирования свойств</p>
          </div>
        </div>
      </div>
    );
  }

  const getPanelTitle = () => {
    switch (selectedLayer.type) {
      case 'text':
        return 'Текст';
      case 'image':
        return 'Изображение';
      case 'shape':
        return 'Фигура';
      case 'background':
        return 'Фон';
      default:
        return 'Свойства';
    }
  };

  const getLayerIcon = (type: Layer['type']) => {
    switch (type) {
      case 'text':
        return 'T';
      case 'image':
        return '🖼';
      case 'shape':
        return '⬜';
      case 'background':
        return '🎨';
      default:
        return '📄';
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Заголовок панели */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium">{getLayerIcon(selectedLayer.type)}</span>
            <h3 className="text-lg font-semibold text-gray-900">{getPanelTitle()}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X size={16} />
          </button>
        </div>
        
        {/* Информация о выбранном слое */}
        <div className="mt-2 text-sm text-gray-600">
          <p>Слой: {selectedLayer.name}</p>
          <p>Тип: {selectedLayer.type}</p>
        </div>
      </div>

      {/* Содержимое панели свойств */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Общие свойства слоя */}
          <LayerProperties
            layer={selectedLayer}
            onChange={(properties) => onLayerPropertiesChange(selectedLayer.id, properties)}
          />

          {/* Специфичные свойства в зависимости от типа */}
          {selectedLayer.type === 'text' && (
            <TextProperties
              onChange={onTextPropertiesChange}
            />
          )}

          {selectedLayer.type === 'image' && (
            <ImageProperties
              onChange={onImagePropertiesChange}
            />
          )}

          {selectedLayer.type === 'shape' && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Свойства фигуры</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Цвет заливки
                  </label>
                  <input
                    type="color"
                    className="w-full h-8 border border-gray-300 rounded"
                    defaultValue="#ff6b6b"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Цвет обводки
                  </label>
                  <input
                    type="color"
                    className="w-full h-8 border border-gray-300 rounded"
                    defaultValue="#333333"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Толщина обводки
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    className="w-full"
                    defaultValue="2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PropertiesPanel); 