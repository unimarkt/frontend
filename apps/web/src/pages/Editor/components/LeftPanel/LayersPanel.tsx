import React, { useState } from 'react';
import type { Layer } from '../../types/canvas.types';

interface LayersPanelProps {
  layers: Layer[];
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string | null) => void;
  onUpdateLayer: (layerId: string, updates: Partial<Layer>) => void;
  onDeleteLayer: (layerId: string) => void;
}

const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  onDeleteLayer
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  // Фильтрация слоев по поиску
  const filteredLayers = layers.filter(layer =>
    layer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Начало редактирования имени
  const startEditing = (layer: Layer) => {
    setEditingLayerId(layer.id);
    setEditingName(layer.name);
  };

  // Сохранение имени
  const saveName = () => {
    if (editingLayerId && editingName.trim()) {
      onUpdateLayer(editingLayerId, { name: editingName.trim() });
    }
    setEditingLayerId(null);
    setEditingName('');
  };

  // Отмена редактирования
  const cancelEditing = () => {
    setEditingLayerId(null);
    setEditingName('');
  };

  // Обработка клавиш при редактировании
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveName();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  // Переключение видимости
  const toggleVisibility = (layerId: string) => {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
      onUpdateLayer(layerId, { visible: !layer.visible });
    }
  };

  // Переключение блокировки
  const toggleLock = (layerId: string) => {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
      onUpdateLayer(layerId, { locked: !layer.locked });
    }
  };

  // Дублирование слоя
  const duplicateLayer = (layer: Layer) => {
    const newLayer: Layer = {
      ...layer,
      id: Date.now().toString(),
      name: `${layer.name} (копия)`,
      x: layer.x + 20,
      y: layer.y + 20,
      zIndex: Math.max(...layers.map(l => l.zIndex)) + 1
    };
    // Добавление нового слоя будет обработано в родительском компоненте
    // Здесь мы просто обновляем существующий слой как пример
    onUpdateLayer(layer.id, { name: newLayer.name });
  };

  // Иконка для типа слоя
  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'text':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 7V4H20V7M4 7V20M4 7H20M20 7V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'image':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
            <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'shape':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="currentColor"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Заголовок */}
      <div className="px-4 py-3 border-b border-[#DFE1E7]">
        <h3 className="text-[14px] font-medium text-black">Слои</h3>
      </div>

      {/* Поиск */}
      <div className="px-4 py-3 border-b border-[#DFE1E7]">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск слоев..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 pl-9 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] placeholder-[#6F6F6F] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6F6F6F]"
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Список слоев */}
      <div className="flex-1 overflow-y-auto">
        {filteredLayers.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-[14px] text-[#6F6F6F]">
              {searchTerm ? 'Слои не найдены' : 'Нет слоев'}
            </p>
          </div>
        ) : (
          <div className="py-2">
            {filteredLayers.map((layer) => {
              const isSelected = selectedLayerId === layer.id;
              const isEditing = editingLayerId === layer.id;

              return (
                <div
                  key={layer.id}
                  className={`mx-2 mb-1 rounded-[8px] transition-colors ${
                    isSelected 
                      ? 'bg-[#EAF1FF] border border-[#1264FF]' 
                      : 'hover:bg-[#F6F8FA] border border-transparent'
                  }`}
                >
                  <div className="flex items-center px-3 py-2">
                    {/* Иконка видимости */}
                    <button
                      onClick={() => toggleVisibility(layer.id)}
                      className="w-4 h-4 mr-2 flex items-center justify-center text-[#6F6F6F] hover:text-black transition-colors"
                    >
                      {layer.visible ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12C1 12 5 4 12 4C13.5 4 14.9 4.5 16 5.4" stroke="currentColor" strokeWidth="2"/>
                          <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" stroke="currentColor" strokeWidth="2"/>
                          <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                    </button>

                    {/* Иконка блокировки */}
                    <button
                      onClick={() => toggleLock(layer.id)}
                      className="w-4 h-4 mr-2 flex items-center justify-center text-[#6F6F6F] hover:text-black transition-colors"
                    >
                      {layer.locked ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="16" r="1" fill="currentColor"/>
                          <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="16" r="1" fill="currentColor"/>
                          <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/>
                        </svg>
                      )}
                    </button>

                    {/* Иконка типа слоя */}
                    <div className="w-4 h-4 mr-2 flex items-center justify-center text-[#6F6F6F]">
                      {getLayerIcon(layer.type)}
                    </div>

                    {/* Название слоя */}
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={saveName}
                          className="w-full px-1 py-0.5 bg-white border border-[#1264FF] rounded text-[14px] focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <button
                          onClick={() => onSelectLayer(layer.id)}
                          onDoubleClick={() => startEditing(layer)}
                          className={`w-full text-left text-[14px] truncate ${
                            isSelected ? 'text-[#1264FF] font-medium' : 'text-black'
                          }`}
                        >
                          {layer.name}
                        </button>
                      )}
                    </div>

                    {/* Действия */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => duplicateLayer(layer)}
                        className="w-6 h-6 p-1 text-[#6F6F6F] hover:text-black hover:bg-[#F6F8FA] rounded transition-colors"
                        title="Дублировать"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M5 15H2C1.45 15 1 14.55 1 14V2C1 1.45 1.45 1 2 1H14C14.55 1 15 1.45 15 2V5" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>

                      <button
                        onClick={() => onDeleteLayer(layer.id)}
                        className="w-6 h-6 p-1 text-[#6F6F6F] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Удалить"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Информация */}
      <div className="px-4 py-3 border-t border-[#DFE1E7] bg-[#F6F8FA]">
        <div className="text-[12px] text-[#6F6F6F]">
          {layers.length} слоев
        </div>
      </div>
    </div>
  );
};

export default LayersPanel; 