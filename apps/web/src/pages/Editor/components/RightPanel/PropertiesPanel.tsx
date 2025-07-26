import React from 'react';
import type { Layer } from '../../types/canvas.types';
import TextProperties from './TextProperties';
import ImageProperties from './ImageProperties';
import LayerProperties from './LayerProperties';

interface PropertiesPanelProps {
  selectedLayer: Layer | undefined;
  onUpdateLayer: (layerId: string, updates: Partial<Layer>) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedLayer,
  onUpdateLayer
}) => {
  if (!selectedLayer) {
    return (
      <div className="flex flex-col h-full">
        {/* Заголовок */}
        <div className="px-4 py-3 border-b border-[#DFE1E7]">
          <h3 className="text-[14px] font-medium text-black">Свойства</h3>
        </div>

        {/* Пустое состояние */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#F6F8FA] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[14px] text-[#6F6F6F]">Выберите элемент</p>
            <p className="text-[12px] text-[#6F6F6F] mt-1">для редактирования свойств</p>
          </div>
        </div>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<Layer>) => {
    onUpdateLayer(selectedLayer.id, updates);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Заголовок */}
      <div className="px-4 py-3 border-b border-[#DFE1E7]">
        <h3 className="text-[14px] font-medium text-black">Свойства</h3>
        <p className="text-[12px] text-[#6F6F6F] mt-1">{selectedLayer.name}</p>
      </div>

      {/* Контент */}
      <div className="flex-1 overflow-y-auto">
        {/* Общие свойства слоя */}
        <LayerProperties
          layer={selectedLayer}
          onUpdate={handleUpdate}
        />

        {/* Специфичные свойства по типу */}
        {selectedLayer.type === 'text' && (
          <TextProperties
            properties={selectedLayer.properties}
            onUpdate={(updates) => handleUpdate({ properties: { ...selectedLayer.properties, ...updates } })}
          />
        )}

        {selectedLayer.type === 'image' && (
          <ImageProperties
            properties={selectedLayer.properties}
            onUpdate={(updates) => handleUpdate({ properties: { ...selectedLayer.properties, ...updates } })}
          />
        )}

        {selectedLayer.type === 'shape' && (
          <div className="px-4 py-3 border-t border-[#DFE1E7]">
            <h4 className="text-[12px] font-medium text-black mb-3">Свойства фигуры</h4>
            
            {/* Тип фигуры */}
            <div className="mb-3">
              <label className="block text-[12px] text-[#6F6F6F] mb-1">Тип</label>
              <select
                value={selectedLayer.properties.shapeType || 'rectangle'}
                onChange={(e) => handleUpdate({
                  properties: { ...selectedLayer.properties, shapeType: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
              >
                <option value="rectangle">Прямоугольник</option>
                <option value="circle">Круг</option>
                <option value="triangle">Треугольник</option>
              </select>
            </div>

            {/* Цвет заливки */}
            <div className="mb-3">
              <label className="block text-[12px] text-[#6F6F6F] mb-1">Цвет заливки</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={selectedLayer.properties.fillColor || '#1264FF'}
                  onChange={(e) => handleUpdate({
                    properties: { ...selectedLayer.properties, fillColor: e.target.value }
                  })}
                  className="w-8 h-8 border border-[#DFE1E7] rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedLayer.properties.fillColor || '#1264FF'}
                  onChange={(e) => handleUpdate({
                    properties: { ...selectedLayer.properties, fillColor: e.target.value }
                  })}
                  className="flex-1 px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Цвет обводки */}
            <div className="mb-3">
              <label className="block text-[12px] text-[#6F6F6F] mb-1">Цвет обводки</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={selectedLayer.properties.strokeColor || '#000000'}
                  onChange={(e) => handleUpdate({
                    properties: { ...selectedLayer.properties, strokeColor: e.target.value }
                  })}
                  className="w-8 h-8 border border-[#DFE1E7] rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedLayer.properties.strokeColor || '#000000'}
                  onChange={(e) => handleUpdate({
                    properties: { ...selectedLayer.properties, strokeColor: e.target.value }
                  })}
                  className="flex-1 px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Толщина обводки */}
            <div className="mb-3">
              <label className="block text-[12px] text-[#6F6F6F] mb-1">Толщина обводки</label>
              <input
                type="number"
                min="0"
                max="20"
                value={selectedLayer.properties.strokeWidth || 0}
                onChange={(e) => handleUpdate({
                  properties: { ...selectedLayer.properties, strokeWidth: parseInt(e.target.value) || 0 }
                })}
                className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Информация */}
      <div className="px-4 py-3 border-t border-[#DFE1E7] bg-[#F6F8FA]">
        <div className="text-[12px] text-[#6F6F6F]">
          ID: {selectedLayer.id}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel; 