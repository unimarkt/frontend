import React from 'react';
import TextProperties from './TextProperties';
import ImageProperties from './ImageProperties';
import LayerProperties from './LayerProperties';
import type { Layer } from '../../types/canvas.types';

interface PropertiesPanelProps {
  selectedLayer: Layer | null;
  onLayerPropertiesChange: (layerId: string, properties: any) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedLayer,
  onLayerPropertiesChange,
}) => {
  if (!selectedLayer) {
    return (
      <div className="h-full flex flex-col bg-white border-l border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Свойства</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-sm">Выберите слой для редактирования свойств</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePropertiesChange = (properties: any) => {
    onLayerPropertiesChange(selectedLayer.id, properties);
  };

  const renderPropertiesByType = () => {
    switch (selectedLayer.type) {
      case 'text':
        return (
          <TextProperties
            properties={selectedLayer.fabricObject}
            onChange={handlePropertiesChange}
          />
        );
      case 'image':
        return (
          <ImageProperties
            properties={selectedLayer.fabricObject}
            onChange={handlePropertiesChange}
          />
        );
      case 'shape':
      case 'background':
      default:
        return (
          <LayerProperties
            layer={selectedLayer}
            onChange={handlePropertiesChange}
          />
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      {/* Заголовок */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Свойства</h3>
        <p className="text-sm text-gray-500 mt-1">
          {selectedLayer.name}
        </p>
      </div>

      {/* Свойства слоя */}
      <div className="flex-1 overflow-y-auto">
        {renderPropertiesByType()}
      </div>
    </div>
  );
};

export default React.memo(PropertiesPanel); 