import React, { useState, useMemo } from 'react';
import type { Layer, GroupLayer } from '../types/editor.types';

interface LayersPanelProps {
  layers: Layer[];
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string) => void;
  onUpdateLayer: (layerId: string, updates: Partial<Layer>) => void;
  onDeleteLayer: (layerId: string) => void;
  onDuplicateLayer: (layerId: string) => void;
  onCreateGroup: (layerIds: string[]) => void;
  onUngroup: (groupId: string) => void;
}

interface LayerItemProps {
  layer: Layer;
  isSelected: boolean;
  isGrouped: boolean;
  depth: number;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onToggleLock: () => void;
  onRename: (name: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const LayerItem: React.FC<LayerItemProps> = ({
  layer,
  isSelected,
  isGrouped,
  depth,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onRename,
  onDuplicate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(layer.name);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditName(layer.name);
  };

  const handleRename = () => {
    if (editName.trim() && editName !== layer.name) {
      onRename(editName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditName(layer.name);
    }
  };

  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'text':
        return '📝';
      case 'image':
        return '🖼️';
      case 'shape':
        return '🔷';
      case 'group':
        return '📁';
      default:
        return '📄';
    }
  };

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
        isSelected
          ? 'bg-blue-50 border border-blue-200'
          : 'hover:bg-gray-50 border border-transparent'
      } ${isGrouped ? 'ml-4' : ''}`}
      style={{ paddingLeft: `${12 + depth * 16}px` }}
      onClick={onSelect}
    >
      {/* Иконка типа слоя */}
      <span className="text-sm">{getLayerIcon(layer.type)}</span>

      {/* Видимость */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility();
        }}
        className="p-1 hover:bg-gray-200 rounded transition-colors"
        title={layer.visible ? 'Скрыть слой' : 'Показать слой'}
      >
        {layer.visible ? '👁️' : '👁️‍🗨️'}
      </button>

      {/* Имя слоя */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleKeyDown}
            className="w-full px-1 py-0.5 text-sm border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div
            className="text-sm font-medium truncate"
            onDoubleClick={handleDoubleClick}
            title={layer.name}
          >
            {layer.name}
          </div>
        )}
      </div>

      {/* Блокировка */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock();
        }}
        className="p-1 hover:bg-gray-200 rounded transition-colors"
        title={layer.locked ? 'Разблокировать слой' : 'Заблокировать слой'}
      >
        {layer.locked ? '🔒' : '🔓'}
      </button>

      {/* Действия */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          title="Дублировать (Ctrl+D)"
        >
          📋
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:bg-red-100 rounded transition-colors"
          title="Удалить (Delete)"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onCreateGroup,
  onUngroup,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'text' | 'image' | 'shape' | 'group'>('all');
  const [showHidden, setShowHidden] = useState(true);

  // Фильтрация и поиск слоев
  const filteredLayers = useMemo(() => {
    return layers.filter(layer => {
      // Поиск по имени
      const matchesSearch = layer.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Фильтр по типу
      const matchesType = filterType === 'all' || layer.type === filterType;
      
      // Фильтр по видимости
      const matchesVisibility = showHidden || layer.visible;
      
      return matchesSearch && matchesType && matchesVisibility;
    });
  }, [layers, searchTerm, filterType, showHidden]);

  // Группировка слоев
  const groupedLayers = useMemo(() => {
    const groups: (Layer | GroupLayer)[] = [];
    const processedIds = new Set<string>();

    // Сначала добавляем группы
    layers.forEach(layer => {
      if (layer.type === 'group') {
        groups.push(layer);
        layer.children.forEach(id => processedIds.add(id));
      }
    });

    // Затем добавляем негруппированные слои
    layers.forEach(layer => {
      if (!processedIds.has(layer.id) && layer.type !== 'group') {
        groups.push(layer);
      }
    });

    return groups;
  }, [layers]);

  const handleCreateGroup = () => {
    if (selectedLayerId) {
      // Создаем группу из выбранного слоя
      onCreateGroup([selectedLayerId]);
    }
  };

  const handleSelectAll = () => {
    // TODO: Реализовать множественное выделение
    console.log('Select all layers');
  };

  const handleInvertSelection = () => {
    // TODO: Реализовать инвертирование выделения
    console.log('Invert selection');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Заголовок */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Слои</h2>
        
        {/* Поиск */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Поиск слоев..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Фильтры */}
        <div className="flex gap-2 mb-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">Все типы</option>
            <option value="text">Текст</option>
            <option value="image">Изображения</option>
            <option value="shape">Фигуры</option>
            <option value="group">Группы</option>
          </select>
          
          <button
            onClick={() => setShowHidden(!showHidden)}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              showHidden
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title={showHidden ? 'Скрыть невидимые' : 'Показать все'}
          >
            👁️
          </button>
        </div>

        {/* Действия */}
        <div className="flex gap-1">
          <button
            onClick={handleCreateGroup}
            className="flex-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            title="Создать группу (Ctrl+G)"
          >
            Группа
          </button>
          <button
            onClick={handleSelectAll}
            className="flex-1 px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            title="Выбрать все (Ctrl+A)"
          >
            Все
          </button>
          <button
            onClick={handleInvertSelection}
            className="flex-1 px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            title="Инвертировать выделение"
          >
            Инверт
          </button>
        </div>
      </div>

      {/* Список слоев */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredLayers.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            {searchTerm ? 'Слои не найдены' : 'Нет слоев'}
          </div>
        ) : (
          filteredLayers.map((layer) => (
            <div key={layer.id} className="group">
              <LayerItem
                layer={layer}
                isSelected={selectedLayerId === layer.id}
                isGrouped={layer.type === 'group'}
                depth={0}
                onSelect={() => onSelectLayer(layer.id)}
                onToggleVisibility={() => onUpdateLayer(layer.id, { visible: !layer.visible })}
                onToggleLock={() => onUpdateLayer(layer.id, { locked: !layer.locked })}
                onRename={(name) => onUpdateLayer(layer.id, { name })}
                onDuplicate={() => onDuplicateLayer(layer.id)}
                onDelete={() => onDeleteLayer(layer.id)}
              />
              
              {/* Дочерние слои для групп */}
              {layer.type === 'group' && layer.children.length > 0 && (
                <div className="ml-4">
                  {layer.children.map(childId => {
                    const childLayer = layers.find(l => l.id === childId);
                    if (!childLayer) return null;
                    
                    return (
                      <LayerItem
                        key={childLayer.id}
                        layer={childLayer}
                        isSelected={selectedLayerId === childLayer.id}
                        isGrouped={true}
                        depth={1}
                        onSelect={() => onSelectLayer(childLayer.id)}
                        onToggleVisibility={() => onUpdateLayer(childLayer.id, { visible: !childLayer.visible })}
                        onToggleLock={() => onUpdateLayer(childLayer.id, { locked: !childLayer.locked })}
                        onRename={(name) => onUpdateLayer(childLayer.id, { name })}
                        onDuplicate={() => onDuplicateLayer(childLayer.id)}
                        onDelete={() => onDeleteLayer(childLayer.id)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Статистика */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600">
          Всего слоев: {layers.length} | 
          Видимых: {layers.filter(l => l.visible).length} | 
          Заблокированных: {layers.filter(l => l.locked).length}
        </div>
      </div>
    </div>
  );
};

export default LayersPanel; 