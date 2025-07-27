import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogoIcon, AvatarIcon } from '../../assets/icons';
import EditorErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import RichTextEditor from './components/RichTextEditor';
import ImageProperties from './components/ImageProperties';
import LayersPanel from './components/LayersPanel';
import ShortcutsHelp from './components/ShortcutsHelp';
import InlineTextEditor from './components/InlineTextEditor';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import type { TextLayer, ImageLayer, ShapeLayer, GroupLayer, Layer } from './types/editor.types';

const EditorPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  
  // Состояние редактора
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // Функция обновления слоя (должна быть объявлена до использования в хуке)
  const handleUpdateLayer = (layerId: string, updates: Partial<Layer>) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, ...updates } as Layer : layer
    ));
  };

  // Drag & Drop
  const { dragState, canvasRef, handleMouseDown, setupGlobalListeners } = useDragAndDrop({
    layers,
    onUpdateLayer: handleUpdateLayer,
    onSelectLayer: setSelectedLayerId,
    zoom,
  });

  // Настройка глобальных обработчиков мыши
  useEffect(() => {
    const cleanup = setupGlobalListeners();
    return cleanup;
  }, [setupGlobalListeners]);

  // Обработчики inline редактирования текста
  const handleStartTextEdit = (layerId: string) => {
    setEditingTextId(layerId);
    setSelectedLayerId(layerId);
  };

  const handleFinishTextEdit = (layerId: string, text: string) => {
    handleUpdateLayer(layerId, { text });
    setEditingTextId(null);
  };

  const handleCancelTextEdit = () => {
    setEditingTextId(null);
  };

  // Функции для перемещения объектов
  const nudgeLayer = (direction: 'up' | 'down' | 'left' | 'right', amount: number) => {
    if (selectedLayerId) {
      const layer = layers.find(l => l.id === selectedLayerId);
      if (layer) {
        const updates: Partial<Layer> = {};
        switch (direction) {
          case 'up':
            updates.y = layer.y - amount;
            break;
          case 'down':
            updates.y = layer.y + amount;
            break;
          case 'left':
            updates.x = layer.x - amount;
            break;
          case 'right':
            updates.x = layer.x + amount;
            break;
        }
        handleUpdateLayer(selectedLayerId, updates);
      }
    }
  };

  // Обработчики добавления элементов
  const handleAddText = () => {
    const textLayer: TextLayer = {
      id: `text-${Date.now()}`,
      name: 'Новый текст',
      type: 'text',
      text: 'Двойной клик для редактирования',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      rotation: 0,
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: layers.length,
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontColor: '#000000',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 0,
      textDecoration: 'none',
      textShadow: 'none',
    };

    setLayers(prev => [...prev, textLayer]);
    setSelectedLayerId(textLayer.id);
    toast.success('Текстовый слой добавлен');
  };

  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          const imageLayer: ImageLayer = {
            id: `image-${Date.now()}`,
            name: file.name,
            type: 'image',
            src,
            x: 100,
            y: 100,
            width: 200,
            height: 200,
            rotation: 0,
            opacity: 1,
            visible: true,
            locked: false,
            zIndex: layers.length,
            brightness: 0,
            contrast: 0,
            saturation: 0,
            blur: 0,
            filters: {
              grayscale: false,
              sepia: false,
            },
          };

          setLayers(prev => [...prev, imageLayer]);
          setSelectedLayerId(imageLayer.id);
          toast.success('Изображение добавлено');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleAddShape = () => {
    const shapeLayer: ShapeLayer = {
      id: `shape-${Date.now()}`,
      name: 'Новая фигура',
      type: 'shape',
      shapeType: 'rectangle',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: layers.length,
      fillColor: '#3B82F6',
      strokeColor: '#1E40AF',
      strokeWidth: 2,
    };

    setLayers(prev => [...prev, shapeLayer]);
    setSelectedLayerId(shapeLayer.id);
    toast.success('Фигура добавлена');
  };

  const handleDeleteLayer = () => {
    if (selectedLayerId) {
      setLayers(prev => prev.filter(layer => layer.id !== selectedLayerId));
      setSelectedLayerId(null);
      setEditingTextId(null);
      toast.success('Слой удален');
    }
  };

  const handleDuplicateLayer = (layerId: string) => {
    const layerToDuplicate = layers.find(layer => layer.id === layerId);
    if (layerToDuplicate) {
      const duplicatedLayer: Layer = {
        ...layerToDuplicate,
        id: `${layerToDuplicate.type}-${Date.now()}`,
        name: `${layerToDuplicate.name} (копия)`,
        x: layerToDuplicate.x + 20,
        y: layerToDuplicate.y + 20,
        zIndex: layers.length,
      };
      setLayers(prev => [...prev, duplicatedLayer]);
      setSelectedLayerId(duplicatedLayer.id);
      toast.success('Слой дублирован');
    }
  };

  const handleCreateGroup = (layerIds: string[]) => {
    const groupLayer: GroupLayer = {
      id: `group-${Date.now()}`,
      name: 'Новая группа',
      type: 'group',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      rotation: 0,
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: layers.length,
      children: layerIds,
    };
    setLayers(prev => [...prev, groupLayer]);
    setSelectedLayerId(groupLayer.id);
    toast.success('Группа создана');
  };

  const handleUngroup = (groupId: string) => {
    setLayers(prev => prev.filter(layer => layer.id !== groupId));
    setSelectedLayerId(null);
    toast.success('Группа разгруппирована');
  };

  const handleExport = () => {
    if (canvasRef.current) {
      // Простой экспорт через html2canvas
      import('html2canvas').then(({ default: html2canvas }) => {
        html2canvas(canvasRef.current!).then(canvas => {
          const link = document.createElement('a');
          link.download = `product-${productId}.png`;
          link.href = canvas.toDataURL();
          link.click();
          toast.success('Изображение экспортировано');
        });
      });
    }
  };

  const selectedLayer = layers.find(layer => layer.id === selectedLayerId);

  // Клавиатурные сокращения
  useKeyboardShortcuts({
    onShowHelp: () => setShowShortcutsHelp(true),
    onUndo: () => {
      // TODO: Реализовать Undo/Redo
      toast('Undo - будет реализовано в следующем этапе');
    },
    onRedo: () => {
      toast('Redo - будет реализовано в следующем этапе');
    },
    onDelete: handleDeleteLayer,
    onCopy: () => {
      if (selectedLayerId) {
        handleDuplicateLayer(selectedLayerId);
      }
    },
    onPaste: () => {
      // TODO: Реализовать вставку из буфера обмена
      toast('Вставка - будет реализовано в следующем этапе');
    },
    onSelectAll: () => {
      // TODO: Реализовать выделение всех слоев
      toast('Выбрать все - будет реализовано в следующем этапе');
    },
    onDuplicate: () => {
      if (selectedLayerId) {
        handleDuplicateLayer(selectedLayerId);
      }
    },
    onCreateGroup: () => {
      if (selectedLayerId) {
        handleCreateGroup([selectedLayerId]);
      }
    },
    onUngroup: () => {
      if (selectedLayerId) {
        const layer = layers.find(l => l.id === selectedLayerId);
        if (layer && layer.type === 'group') {
          handleUngroup(selectedLayerId);
        }
      }
    },
    onExport: handleExport,
    onZoomIn: () => setZoom(Math.min(400, zoom + 25)),
    onZoomOut: () => setZoom(Math.max(25, zoom - 25)),
    onZoomFit: () => setZoom(100),
    onZoom100: () => setZoom(100),
    onToggleGrid: () => setShowGrid(!showGrid),
    onNudgeUp: () => nudgeLayer('up', 1),
    onNudgeDown: () => nudgeLayer('down', 1),
    onNudgeLeft: () => nudgeLayer('left', 1),
    onNudgeRight: () => nudgeLayer('right', 1),
    onNudgeUpLarge: () => nudgeLayer('up', 10),
    onNudgeDownLarge: () => nudgeLayer('down', 10),
    onNudgeLeftLarge: () => nudgeLayer('left', 10),
    onNudgeRightLarge: () => nudgeLayer('right', 10),
    onDeselect: () => {
      setSelectedLayerId(null);
      setEditingTextId(null);
    },
  });

  return (
    <EditorErrorBoundary>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Навбар */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LogoIcon width={32} height={32} />
              <h1 className="text-xl font-bold text-gray-800">
                Редактор карточек - {productId}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowShortcutsHelp(true)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                title="Горячие клавиши (?)"
              >
                ?
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Экспорт
              </button>
              <AvatarIcon width={32} height={32} />
              <span className="text-sm text-gray-600">Пользователь</span>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="flex flex-1">
          {/* Левая панель - Слои */}
          <div className="w-64 bg-white border-r border-gray-200">
            <LayersPanel
              layers={layers}
              selectedLayerId={selectedLayerId}
              onSelectLayer={setSelectedLayerId}
              onUpdateLayer={handleUpdateLayer}
              onDeleteLayer={handleDeleteLayer}
              onDuplicateLayer={handleDuplicateLayer}
              onCreateGroup={handleCreateGroup}
              onUngroup={handleUngroup}
            />
          </div>

          {/* Центральная область - Canvas */}
          <div className="flex-1 flex flex-col">
            {/* Тулбар */}
            <div className="bg-white border-b border-gray-200 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Масштаб: {zoom}%</span>
                  <button
                    onClick={() => setZoom(Math.max(25, zoom - 25))}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setZoom(Math.min(400, zoom + 25))}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                
                {/* Кнопки добавления элементов */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddText}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    title="Добавить текст"
                  >
                    📝 Текст
                  </button>
                  <button
                    onClick={handleAddImage}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    title="Добавить изображение"
                  >
                    🖼️ Изображение
                  </button>
                  <button
                    onClick={handleAddShape}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    title="Добавить фигуру"
                  >
                    🔷 Фигура
                  </button>
                </div>
                
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`px-3 py-1 rounded hover:opacity-80 ${
                    showGrid
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Сетка {showGrid ? 'Вкл' : 'Выкл'}
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-gray-50 flex items-center justify-center p-6 relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  <LoadingSpinner message="Инициализация редактора..." />
                </div>
              )}
              
              {/* Подсказка о drag & drop */}
              {layers.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center shadow-lg">
                    <div className="text-4xl mb-4">🖱️</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Добавьте элементы для начала работы
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Используйте кнопки выше для добавления текста, изображений или фигур
                    </p>
                    <div className="text-sm text-gray-500">
                      💡 <strong>Совет:</strong> После добавления элементов вы сможете перетаскивать их мышкой
                    </div>
                  </div>
                </div>
              )}
              
              <div className="relative">
                <div
                  ref={canvasRef}
                  className="bg-white border border-gray-300 shadow-sm relative"
                  style={{
                    width: 900,
                    height: 1200,
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Сетка */}
                  {showGrid && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                        backgroundSize: '23px 23px',
                      }}
                    />
                  )}
                  
                  {/* Слои */}
                  {layers.map((layer) => {
                    if (!layer.visible) return null;
                    
                    const isSelected = selectedLayerId === layer.id;
                    const isDragging = dragState.isDragging && dragState.layerId === layer.id;
                    const isEditing = editingTextId === layer.id;
                    
                    switch (layer.type) {
                      case 'text':
                        return (
                          <div
                            key={layer.id}
                            className={`absolute cursor-move ${
                              isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                            } ${isDragging ? 'opacity-75' : ''}`}
                            style={{
                              left: layer.x,
                              top: layer.y,
                              width: layer.width,
                              height: layer.height,
                              opacity: layer.opacity,
                              transform: `rotate(${layer.rotation}deg)`,
                              zIndex: layer.zIndex,
                            }}
                            onMouseDown={(e) => handleMouseDown(e, layer.id)}
                            onClick={() => setSelectedLayerId(layer.id)}
                          >
                            <InlineTextEditor
                              layer={layer}
                              isEditing={isEditing}
                              onStartEdit={() => handleStartTextEdit(layer.id)}
                              onFinishEdit={(text) => handleFinishTextEdit(layer.id, text)}
                              onCancelEdit={handleCancelTextEdit}
                              onUpdate={(updates) => handleUpdateLayer(layer.id, updates)}
                            />
                          </div>
                        );
                        
                      case 'image':
                        const imageStyle: React.CSSProperties = {};
                        
                        // Применяем фильтры
                        if (layer.brightness !== 0) {
                          imageStyle.filter = `${imageStyle.filter || ''} brightness(${100 + layer.brightness}%)`;
                        }
                        if (layer.contrast !== 0) {
                          imageStyle.filter = `${imageStyle.filter || ''} contrast(${100 + layer.contrast}%)`;
                        }
                        if (layer.saturation !== 0) {
                          imageStyle.filter = `${imageStyle.filter || ''} saturate(${100 + layer.saturation}%)`;
                        }
                        if (layer.blur > 0) {
                          imageStyle.filter = `${imageStyle.filter || ''} blur(${layer.blur}px)`;
                        }
                        if (layer.filters.grayscale) {
                          imageStyle.filter = `${imageStyle.filter || ''} grayscale(100%)`;
                        }
                        if (layer.filters.sepia) {
                          imageStyle.filter = `${imageStyle.filter || ''} sepia(100%)`;
                        }

                        return (
                          <div
                            key={layer.id}
                            className={`absolute cursor-move ${
                              isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                            } ${isDragging ? 'opacity-75' : ''}`}
                            style={{
                              left: layer.x,
                              top: layer.y,
                              width: layer.width,
                              height: layer.height,
                              opacity: layer.opacity,
                              transform: `rotate(${layer.rotation}deg)`,
                              zIndex: layer.zIndex,
                            }}
                            onMouseDown={(e) => handleMouseDown(e, layer.id)}
                            onClick={() => setSelectedLayerId(layer.id)}
                          >
                            <img
                              src={layer.src}
                              alt={layer.name}
                              className="w-full h-full object-cover"
                              style={imageStyle}
                            />
                          </div>
                        );
                        
                      case 'shape':
                        const shapeStyle: React.CSSProperties = {
                          width: layer.width,
                          height: layer.height,
                          backgroundColor: layer.fillColor,
                          border: `${layer.strokeWidth}px solid ${layer.strokeColor}`,
                        };
                        
                        if (layer.shapeType === 'circle') {
                          shapeStyle.borderRadius = '50%';
                        } else if (layer.shapeType === 'triangle') {
                          shapeStyle.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                        }
                        
                        return (
                          <div
                            key={layer.id}
                            className={`absolute cursor-move ${
                              isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                            } ${isDragging ? 'opacity-75' : ''}`}
                            style={{
                              left: layer.x,
                              top: layer.y,
                              opacity: layer.opacity,
                              transform: `rotate(${layer.rotation}deg)`,
                              zIndex: layer.zIndex,
                              ...shapeStyle,
                            }}
                            onMouseDown={(e) => handleMouseDown(e, layer.id)}
                            onClick={() => setSelectedLayerId(layer.id)}
                          />
                        );
                        
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Правая панель - Свойства */}
          <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Свойства</h2>
            
            {selectedLayer ? (
              <div className="space-y-4">
                {/* Общие свойства */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя слоя
                  </label>
                  <input
                    type="text"
                    value={selectedLayer.name}
                    onChange={(e) => handleUpdateLayer(selectedLayer.id, { name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Позиция X
                  </label>
                  <input
                    type="number"
                    value={selectedLayer.x}
                    onChange={(e) => handleUpdateLayer(selectedLayer.id, { x: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Позиция Y
                  </label>
                  <input
                    type="number"
                    value={selectedLayer.y}
                    onChange={(e) => handleUpdateLayer(selectedLayer.id, { y: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Прозрачность
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={selectedLayer.opacity}
                    onChange={(e) => handleUpdateLayer(selectedLayer.id, { opacity: Number(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">{Math.round(selectedLayer.opacity * 100)}%</span>
                </div>

                {/* Rich Text Editor для текстовых слоев */}
                {selectedLayer.type === 'text' && (
                  <RichTextEditor
                    layer={selectedLayer}
                    onUpdate={(updates) => handleUpdateLayer(selectedLayer.id, updates)}
                  />
                )}

                {/* Image Properties для изображений */}
                {selectedLayer.type === 'image' && (
                  <ImageProperties
                    layer={selectedLayer}
                    onUpdate={(updates) => handleUpdateLayer(selectedLayer.id, updates)}
                  />
                )}

                {/* Кнопка удаления */}
                <button
                  onClick={handleDeleteLayer}
                  className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Удалить слой
                </button>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                Выберите слой для редактирования
              </div>
            )}
          </div>
        </div>

        {/* Справка по горячим клавишам */}
        <ShortcutsHelp
          isOpen={showShortcutsHelp}
          onClose={() => setShowShortcutsHelp(false)}
        />
      </div>
    </EditorErrorBoundary>
  );
};

export default EditorPage; 