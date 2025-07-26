import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import type { Layer } from '../types/canvas.types';

interface CanvasAreaProps {
  layers: Layer[];
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string | null) => void;
  onUpdateLayer: (layerId: string, updates: Partial<Layer>) => void;
  showGrid: boolean;
  zoom: number;
}

const CanvasArea = forwardRef<HTMLDivElement, CanvasAreaProps>(({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  showGrid,
  zoom
}, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  // Обработка клика по элементу
  const handleElementClick = useCallback((e: React.MouseEvent, layerId: string) => {
    e.stopPropagation();
    onSelectLayer(layerId);
  }, [onSelectLayer]);

  // Обработка клика по canvas
  const handleCanvasClick = useCallback(() => {
    onSelectLayer(null);
  }, [onSelectLayer]);

  // Начало перетаскивания
  const handleMouseDown = useCallback((e: React.MouseEvent, layerId: string) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    onSelectLayer(layerId);
  }, [onSelectLayer]);

  // Перетаскивание
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedLayerId) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    const selectedLayer = layers.find(l => l.id === selectedLayerId);
    if (selectedLayer) {
      onUpdateLayer(selectedLayerId, {
        x: selectedLayer.x + deltaX,
        y: selectedLayer.y + deltaY
      });
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, selectedLayerId, dragStart, layers, onUpdateLayer]);

  // Конец перетаскивания
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedLayerId) return;

      const selectedLayer = layers.find(l => l.id === selectedLayerId);
      if (!selectedLayer) return;

      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          // Удаление слоя будет обработано в родительском компоненте
          break;
        case 'Escape':
          onSelectLayer(null);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onUpdateLayer(selectedLayerId, { x: selectedLayer.x - 1 });
          break;
        case 'ArrowRight':
          e.preventDefault();
          onUpdateLayer(selectedLayerId, { x: selectedLayer.x + 1 });
          break;
        case 'ArrowUp':
          e.preventDefault();
          onUpdateLayer(selectedLayerId, { y: selectedLayer.y - 1 });
          break;
        case 'ArrowDown':
          e.preventDefault();
          onUpdateLayer(selectedLayerId, { y: selectedLayer.y + 1 });
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedLayerId, layers, onSelectLayer, onUpdateLayer]);

  // Генерация точечной сетки
  const generateGridDots = () => {
    if (!showGrid) return null;

    const dots = [];
    const gridSize = 23; // Размер сетки как в Figma
    const canvasWidth = 900;
    const canvasHeight = 1200;

    for (let x = 0; x <= canvasWidth; x += gridSize) {
      for (let y = 0; y <= canvasHeight; y += gridSize) {
        dots.push(
          <div
            key={`${x}-${y}`}
            className="absolute w-[3px] h-[3px] bg-[#DFE1E7] rounded-full"
            style={{
              left: x - 1.5,
              top: y - 1.5
            }}
          />
        );
      }
    }

    return dots;
  };

  // Рендер элемента в зависимости от типа
  const renderElement = (layer: Layer) => {
    const isSelected = selectedLayerId === layer.id;
    const baseStyle = {
      position: 'absolute' as const,
      left: layer.x,
      top: layer.y,
      width: layer.width,
      height: layer.height,
      transform: `rotate(${layer.rotation}deg)`,
      opacity: layer.opacity,
      cursor: isDragging ? 'grabbing' : 'grab',
      zIndex: layer.zIndex
    };

    switch (layer.type) {
      case 'text':
        return (
          <div
            key={layer.id}
            className={`${isSelected ? 'ring-2 ring-[#1264FF] ring-offset-1' : ''} 
                       bg-transparent border border-transparent hover:border-[#DFE1E7] transition-colors`}
            style={{
              ...baseStyle,
              fontFamily: layer.properties.fontFamily || 'Manrope',
              fontSize: layer.properties.fontSize || 16,
              fontWeight: layer.properties.fontWeight || 400,
              color: layer.properties.color || '#000000',
              textAlign: layer.properties.textAlign || 'left',
              lineHeight: '1.2',
              padding: '4px'
            }}
            onClick={(e) => handleElementClick(e, layer.id)}
            onMouseDown={(e) => handleMouseDown(e, layer.id)}
          >
            {layer.properties.text || 'Текст'}
          </div>
        );

      case 'image':
        return (
          <div
            key={layer.id}
            className={`${isSelected ? 'ring-2 ring-[#1264FF] ring-offset-1' : ''} 
                       bg-gray-100 border border-gray-200 hover:border-[#DFE1E7] transition-colors`}
            style={baseStyle}
            onClick={(e) => handleElementClick(e, layer.id)}
            onMouseDown={(e) => handleMouseDown(e, layer.id)}
          >
            {layer.properties.src ? (
              <img
                src={layer.properties.src}
                alt={layer.properties.alt || 'Изображение'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                  <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        );

      case 'shape':
        const shapeStyle = {
          ...baseStyle,
          backgroundColor: layer.properties.fillColor || '#1264FF',
          border: layer.properties.strokeWidth > 0 
            ? `${layer.properties.strokeWidth}px solid ${layer.properties.strokeColor || 'transparent'}`
            : 'none'
        };

        if (layer.properties.shapeType === 'circle') {
          return (
            <div
              key={layer.id}
              className={`${isSelected ? 'ring-2 ring-[#1264FF] ring-offset-1' : ''} 
                         border border-gray-200 hover:border-[#DFE1E7] transition-colors`}
              style={{
                ...shapeStyle,
                borderRadius: '50%'
              }}
              onClick={(e) => handleElementClick(e, layer.id)}
              onMouseDown={(e) => handleMouseDown(e, layer.id)}
            />
          );
        }

        return (
          <div
            key={layer.id}
            className={`${isSelected ? 'ring-2 ring-[#1264FF] ring-offset-1' : ''} 
                       border border-gray-200 hover:border-[#DFE1E7] transition-colors`}
            style={shapeStyle}
            onClick={(e) => handleElementClick(e, layer.id)}
            onMouseDown={(e) => handleMouseDown(e, layer.id)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className="relative bg-white border border-[#DFE1E7] shadow-sm overflow-hidden"
      style={{
        width: 900,
        height: 1200,
        transform: `scale(${zoom / 100})`,
        transformOrigin: 'center center'
      }}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Точечная сетка */}
      {generateGridDots()}

      {/* Элементы */}
      {layers
        .filter(layer => layer.visible)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(renderElement)
      }

      {/* Индикатор размера */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        900 × 1200
      </div>
    </div>
  );
});

CanvasArea.displayName = 'CanvasArea';

export default CanvasArea; 