import React, { useState, useCallback } from 'react';
import { Eye, EyeOff, Lock, Unlock, Copy, Trash2, Search, MoreVertical } from 'lucide-react';
import type { Layer } from '../../types/canvas.types';

interface LayersPanelProps {
  layers: Layer[];
  selectedLayerId: string | null;
  onLayerSelect: (layerId: string) => void;
  onLayerToggleVisibility: (layerId: string) => void;
  onLayerToggleLock: (layerId: string) => void;
  onLayerDuplicate: (layerId: string) => void;
  onLayerDelete: (layerId: string) => void;
  onLayerRename: (layerId: string, newName: string) => void;
}

const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
  selectedLayerId,
  onLayerSelect,
  onLayerToggleVisibility,
  onLayerToggleLock,
  onLayerDuplicate,
  onLayerDelete,
  onLayerRename,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  // Фильтрация слоев по поиску
  const filteredLayers = layers.filter(layer =>
    layer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Начало редактирования имени
  const startEditing = useCallback((layer: Layer) => {
    setEditingLayerId(layer.id);
    setEditingName(layer.name);
  }, []);

  // Сохранение имени
  const saveEditing = useCallback(() => {
    if (editingLayerId && editingName.trim()) {
      onLayerRename(editingLayerId, editingName.trim());
    }
    setEditingLayerId(null);
    setEditingName('');
  }, [editingLayerId, editingName, onLayerRename]);

  // Отмена редактирования
  const cancelEditing = useCallback(() => {
    setEditingLayerId(null);
    setEditingName('');
  }, []);

  // Обработка Enter и Escape
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  }, [saveEditing, cancelEditing]);

  // Получение иконки для типа слоя
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
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Заголовок */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Слои</h3>
        <p className="text-sm text-gray-500 mt-1">
          {layers.length} слоев
        </p>
      </div>

      {/* Поиск */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Поиск слоев..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Список слоев */}
      <div className="flex-1 overflow-y-auto">
        {filteredLayers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? 'Слои не найдены' : 'Нет слоев'}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredLayers.map((layer) => (
              <div
                key={layer.id}
                className={`group flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedLayerId === layer.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onLayerSelect(layer.id)}
              >
                {/* Иконка видимости */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerToggleVisibility(layer.id);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 mr-2"
                  title={layer.visible ? 'Скрыть слой' : 'Показать слой'}
                >
                  {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>

                {/* Иконка блокировки */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerToggleLock(layer.id);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 mr-2"
                  title={layer.locked ? 'Разблокировать слой' : 'Заблокировать слой'}
                >
                  {layer.locked ? <Lock size={14} /> : <Unlock size={14} />}
                </button>

                {/* Иконка типа слоя */}
                <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600 mr-2">
                  {getLayerIcon(layer.type)}
                </div>

                {/* Название слоя */}
                <div className="flex-1 min-w-0">
                  {editingLayerId === layer.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={saveEditing}
                      className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                  ) : (
                    <div
                      className="text-sm font-medium text-gray-900 truncate"
                      onDoubleClick={() => startEditing(layer)}
                      title="Двойной клик для переименования"
                    >
                      {layer.name}
                    </div>
                  )}
                </div>

                {/* Меню действий */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="relative">
                    <button
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Действия"
                    >
                      <MoreVertical size={14} />
                    </button>
                    
                    {/* Выпадающее меню */}
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(layer);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                          ✏️ Переименовать
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onLayerDuplicate(layer.id);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Copy size={14} />
                          Дублировать
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onLayerDelete(layer.id);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                        >
                          <Trash2 size={14} />
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Подсказки */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 space-y-1">
          <div>• Двойной клик для переименования</div>
          <div>• Перетащите для изменения порядка</div>
          <div>• Ctrl+Z для отмены</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LayersPanel); 