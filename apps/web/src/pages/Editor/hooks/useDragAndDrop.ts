import { useState, useRef, useCallback } from 'react';
import type { Layer } from '../types/editor.types';

interface DragState {
  isDragging: boolean;
  layerId: string | null;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
}

interface UseDragAndDropProps {
  layers: Layer[];
  onUpdateLayer: (layerId: string, updates: Partial<Layer>) => void;
  onSelectLayer: (layerId: string) => void;
  zoom: number;
}

export const useDragAndDrop = ({
  layers,
  onUpdateLayer,
  onSelectLayer,
  zoom,
}: UseDragAndDropProps) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    layerId: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  // Получить координаты мыши относительно canvas
  const getMousePosition = useCallback((event: MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };

    const rect = canvasRef.current.getBoundingClientRect();
    const scale = zoom / 100;
    
    return {
      x: (event.clientX - rect.left) / scale,
      y: (event.clientY - rect.top) / scale,
    };
  }, [zoom]);

  // Начало перетаскивания
  const handleMouseDown = useCallback((event: React.MouseEvent, layerId: string) => {
    event.preventDefault();
    event.stopPropagation();

    const layer = layers.find(l => l.id === layerId);
    if (!layer || layer.locked) return;

    const mousePos = getMousePosition(event.nativeEvent);
    
    setDragState({
      isDragging: true,
      layerId,
      startX: mousePos.x,
      startY: mousePos.y,
      offsetX: mousePos.x - layer.x,
      offsetY: mousePos.y - layer.y,
    });

    onSelectLayer(layerId);
  }, [layers, getMousePosition, onSelectLayer]);

  // Перетаскивание
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!dragState.isDragging || !dragState.layerId) return;

    const mousePos = getMousePosition(event);
    const newX = mousePos.x - dragState.offsetX;
    const newY = mousePos.y - dragState.offsetY;

    // Ограничиваем перемещение границами canvas
    const layer = layers.find(l => l.id === dragState.layerId);
    if (layer) {
      const maxX = 900 - layer.width;
      const maxY = 1200 - layer.height;
      
      const clampedX = Math.max(0, Math.min(newX, maxX));
      const clampedY = Math.max(0, Math.min(newY, maxY));

      onUpdateLayer(dragState.layerId, {
        x: clampedX,
        y: clampedY,
      });
    }
  }, [dragState, getMousePosition, layers, onUpdateLayer]);

  // Завершение перетаскивания
  const handleMouseUp = useCallback(() => {
    if (dragState.isDragging) {
      setDragState({
        isDragging: false,
        layerId: null,
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
      });
    }
  }, [dragState.isDragging]);

  // Добавляем глобальные обработчики мыши
  const setupGlobalListeners = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    dragState,
    canvasRef,
    handleMouseDown,
    setupGlobalListeners,
  };
}; 