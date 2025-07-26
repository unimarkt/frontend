import React, { useEffect, useRef } from 'react';
import { useFabricCanvas } from '../hooks/useFabricCanvas';

interface CanvasAreaProps {
  productId: string;
  onLayerSelect?: (layerId: string | null) => void;
  onLayersChange?: (layers: any[]) => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  productId,
  onLayerSelect,
  onLayersChange,
}) => {
  const {
    canvasRef,
    canvas,
    layers,
    selectedLayerId,
    zoom,
    gridVisible,
    initCanvas,
    addText,
    addImage,
    addShape,
    deleteSelected,
    setZoomLevel,
    toggleGrid,
    exportToPNG,
    saveCanvasState,
  } = useFabricCanvas(productId);

  // Инициализация canvas при монтировании
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Уведомление об изменении слоев
  useEffect(() => {
    onLayersChange?.(layers);
  }, [layers, onLayersChange]);

  // Уведомление о выборе слоя
  useEffect(() => {
    onLayerSelect?.(selectedLayerId);
  }, [selectedLayerId, onLayerSelect]);

  // Обработка клавиатурных сокращений
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            // TODO: Реализовать undo
            break;
          case 'y':
            e.preventDefault();
            // TODO: Реализовать redo
            break;
          case 's':
            e.preventDefault();
            saveCanvasState();
            break;
          case 'e':
            e.preventDefault();
            exportToPNG();
            break;
        }
      } else {
        switch (e.key) {
          case 'Delete':
          case 'Backspace':
            e.preventDefault();
            deleteSelected();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected, saveCanvasState, exportToPNG]);

  // Обработка drag & drop файлов
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = 'copy';
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      
      const files = Array.from(e.dataTransfer!.files);
      const imageFile = files.find(file => file.type.startsWith('image/'));
      
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          addImage(imageUrl);
        };
        reader.readAsDataURL(imageFile);
      }
    };

    const canvasElement = canvasRef.current;
    if (canvasElement) {
      canvasElement.addEventListener('dragover', handleDragOver);
      canvasElement.addEventListener('drop', handleDrop);
      
      return () => {
        canvasElement.removeEventListener('dragover', handleDragOver);
        canvasElement.removeEventListener('drop', handleDrop);
      };
    }
  }, [addImage]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Область canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative bg-white shadow-lg"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Сетка (если включена) */}
            {gridVisible && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />
            )}
            
            {/* Canvas элемент */}
            <canvas
              ref={canvasRef}
              className="block"
              style={{
                width: '900px',
                height: '600px',
              }}
            />
          </div>
        </div>
        
        {/* Подсказки для drag & drop */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-gray-400 text-lg font-medium opacity-0 hover:opacity-100 transition-opacity">
            Перетащите изображение сюда
          </div>
        </div>
      </div>
      
      {/* Информация о canvas */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <span>
            Canvas: 900×600px | Слоев: {layers.length} | 
            {selectedLayerId ? ` Выбран: ${layers.find(l => l.id === selectedLayerId)?.name}` : ' Ничего не выбрано'}
          </span>
          <span>Масштаб: {Math.round(zoom * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CanvasArea); 