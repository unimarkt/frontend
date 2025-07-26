import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Copy, 
  Trash2, 
  MoreVertical,
  Search,
  Plus
} from 'lucide-react';
import type { Layer } from '../types/canvas.types';

interface LayersPanelProps {
  layers: Layer[];
  selectedLayerId: string | null;
  onLayerSelect: (layerId: string) => void;
  onLayerToggle: (layerId: string) => void;
  onLayerLock: (layerId: string) => void;
  onLayerDuplicate: (layerId: string) => void;
  onLayerDelete: (layerId: string) => void;
  onLayerRename: (layerId: string, newName: string) => void;
}

const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
  selectedLayerId,
  onLayerSelect,
  onLayerToggle,
  onLayerLock,
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

  // Начало редактирования имени слоя
  const startEditing = (layer: Layer) => {
    setEditingLayerId(layer.id);
    setEditingName(layer.name);
  };

  // Сохранение нового имени слоя
  const saveEditing = () => {
    if (editingLayerId && editingName.trim()) {
      onLayerRename(editingLayerId, editingName.trim());
    }
    setEditingLayerId(null);
    setEditingName('');
  };

  // Отмена редактирования
  const cancelEditing = () => {
    setEditingLayerId(null);
    setEditingName('');
  };

  // Обработка нажатия Enter при редактировании
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Заголовок панели */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Слои</h3>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Поиск по слоям */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск слоев..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="py-2">
            {filteredLayers.map((layer) => (
              <div
                key={layer.id}
                className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                  selectedLayerId === layer.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                onClick={() => onLayerSelect(layer.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    {/* Иконка видимости */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLayerToggle(layer.id);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>

                    {/* Иконка блокировки */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLayerLock(layer.id);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      {layer.locked ? <Lock size={14} /> : <Unlock size={14} />}
                    </button>

                    {/* Иконка типа слоя */}
                    <span className="text-sm font-medium text-gray-600">
                      {getLayerIcon(layer.type)}
                    </span>

                    {/* Название слоя */}
                    <div className="flex-1 min-w-0">
                      {editingLayerId === layer.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={saveEditing}
                          className="w-full text-sm border border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          autoFocus
                        />
                      ) : (
                        <span
                          className="text-sm text-gray-900 truncate block"
                          onDoubleClick={() => startEditing(layer)}
                        >
                          {layer.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Меню действий */}
                  <div className="relative group">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Показать контекстное меню
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical size={14} />
                    </button>

                    {/* Выпадающее меню */}
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onLayerDuplicate(layer.id);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Copy size={14} />
                          Дублировать
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onLayerDelete(layer.id);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                        >
                          <Trash2 size={14} />
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Дополнительная информация о слое */}
                <div className="mt-1 text-xs text-gray-400">
                  <span>Прозрачность: {Math.round(layer.opacity * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Статистика */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          Всего слоев: {layers.length}
          {searchTerm && ` | Найдено: ${filteredLayers.length}`}
        </div>
      </div>
    </div>
  );
};

export default React.memo(LayersPanel); 