import React from 'react';
import type { Layer } from '../../types/canvas.types';

interface LayerPropertiesProps {
  layer: Layer;
  onUpdate: (updates: Partial<Layer>) => void;
}

const LayerProperties: React.FC<LayerPropertiesProps> = ({
  layer,
  onUpdate
}) => {
  return (
    <div className="px-4 py-3">
      <h4 className="text-[12px] font-medium text-black mb-3">Общие свойства</h4>
      
      {/* Название */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Название</label>
        <input
          type="text"
          value={layer.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
          placeholder="Название слоя"
        />
      </div>

      {/* Позиция */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-2">Позиция</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-[#6F6F6F] mb-1">X</label>
            <input
              type="number"
              value={Math.round(layer.x)}
              onChange={(e) => onUpdate({ x: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-[10px] text-[#6F6F6F] mb-1">Y</label>
            <input
              type="number"
              value={Math.round(layer.y)}
              onChange={(e) => onUpdate({ y: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Размер */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-2">Размер</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-[#6F6F6F] mb-1">Ширина</label>
            <input
              type="number"
              min="1"
              value={Math.round(layer.width)}
              onChange={(e) => onUpdate({ width: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-[10px] text-[#6F6F6F] mb-1">Высота</label>
            <input
              type="number"
              min="1"
              value={Math.round(layer.height)}
              onChange={(e) => onUpdate({ height: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Поворот */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Поворот</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="-360"
            max="360"
            value={Math.round(layer.rotation)}
            onChange={(e) => onUpdate({ rotation: parseInt(e.target.value) || 0 })}
            className="flex-1 px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
          />
          <span className="text-[12px] text-[#6F6F6F]">°</span>
        </div>
      </div>

      {/* Прозрачность */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Прозрачность</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(layer.opacity * 100)}
            onChange={(e) => onUpdate({ opacity: parseInt(e.target.value) / 100 })}
            className="flex-1 h-2 bg-[#DFE1E7] rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-[12px] text-[#6F6F6F] min-w-[3rem] text-right">
            {Math.round(layer.opacity * 100)}%
          </span>
        </div>
      </div>

      {/* Z-индекс */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Z-индекс</label>
        <input
          type="number"
          min="0"
          value={layer.zIndex}
          onChange={(e) => onUpdate({ zIndex: parseInt(e.target.value) || 0 })}
          className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
        />
      </div>

      {/* Переключатели */}
      <div className="space-y-2">
        {/* Видимость */}
        <div className="flex items-center justify-between">
          <label className="text-[12px] text-[#6F6F6F]">Видимость</label>
          <button
            onClick={() => onUpdate({ visible: !layer.visible })}
            className={`w-10 h-6 rounded-full transition-colors ${
              layer.visible ? 'bg-[#1264FF]' : 'bg-[#DFE1E7]'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                layer.visible ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Блокировка */}
        <div className="flex items-center justify-between">
          <label className="text-[12px] text-[#6F6F6F]">Блокировка</label>
          <button
            onClick={() => onUpdate({ locked: !layer.locked })}
            className={`w-10 h-6 rounded-full transition-colors ${
              layer.locked ? 'bg-[#1264FF]' : 'bg-[#DFE1E7]'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                layer.locked ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="mt-4 pt-3 border-t border-[#DFE1E7]">
        <h5 className="text-[12px] font-medium text-black mb-2">Быстрые действия</h5>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdate({ rotation: 0 })}
            className="px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[12px] text-[#6F6F6F] hover:bg-[#ECEFF3] transition-colors"
          >
            Сбросить поворот
          </button>
          <button
            onClick={() => onUpdate({ opacity: 1 })}
            className="px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[12px] text-[#6F6F6F] hover:bg-[#ECEFF3] transition-colors"
          >
            Полная видимость
          </button>
        </div>
      </div>


    </div>
  );
};

export default LayerProperties; 