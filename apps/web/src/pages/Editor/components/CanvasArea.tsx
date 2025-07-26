import React, { useCallback, useEffect, useRef } from 'react';
import { useFabricCanvas } from '../hooks/useFabricCanvas';

interface CanvasAreaProps {
  productId: string;
  onLayerSelect: (layerId: string | null) => void;
  onLayerUpdate: (layerId: string, updates: any) => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ 
  productId, 
  onLayerSelect, 
  onLayerUpdate 
}) => {
  const {
    canvasRef,
    canvas,
    zoom,
    gridVisible,
    canUndo,
    canRedo,
    addText,
    addImage,
    addShape,
    deleteSelected,
    setZoomLevel,
    toggleGrid,
    exportToPNG,
    undo,
    redo,
  } = useFabricCanvas(productId);

  const hasSelection = canvas?.getActiveObject() !== null;

  // Drag & Drop для изображений
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        addImage(imageUrl);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [addImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Клавиатурные сокращения
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const isCtrl = e.ctrlKey || e.metaKey;
      
      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          deleteSelected();
          break;
        case 'z':
          if (isCtrl) {
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
          }
          break;
        case 'y':
          if (isCtrl) {
            e.preventDefault();
            redo();
          }
          break;
        case 's':
          if (isCtrl) {
            e.preventDefault();
            // TODO: Сохранение
            console.log('Save');
          }
          break;
        case 'e':
          if (isCtrl) {
            e.preventDefault();
            exportToPNG();
          }
          break;
        case 't':
          if (isCtrl) {
            e.preventDefault();
            addText();
          }
          break;
        case 'i':
          if (isCtrl) {
            e.preventDefault();
            // TODO: Добавить изображение через диалог
            console.log('Add image');
          }
          break;
        case '=':
        case '+':
          if (isCtrl) {
            e.preventDefault();
            setZoomLevel(Math.min(zoom + 0.1, 3));
          }
          break;
        case '-':
          if (isCtrl) {
            e.preventDefault();
            setZoomLevel(Math.max(zoom - 0.1, 0.1));
          }
          break;
        case '0':
          if (isCtrl) {
            e.preventDefault();
            setZoomLevel(1);
          }
          break;
        case 'g':
          if (isCtrl) {
            e.preventDefault();
            toggleGrid();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected, undo, redo, exportToPNG, addText, zoom, setZoomLevel, toggleGrid]);

  // Обработчики для Toolbar
  const handleAddText = useCallback(() => {
    addText('Новый текст');
  }, [addText]);

  const handleAddImage = useCallback(() => {
    // Создаем скрытый input для выбора файла
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          addImage(imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [addImage]);

  const handleAddShape = useCallback((shapeType: 'rect' | 'circle' | 'triangle') => {
    addShape(shapeType);
  }, [addShape]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(Math.min(zoom + 0.1, 3));
  }, [zoom, setZoomLevel]);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(Math.max(zoom - 0.1, 0.1));
  }, [zoom, setZoomLevel]);

  const handleRotateLeft = useCallback(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.rotate((activeObject.angle || 0) - 15);
        canvas.renderAll();
      }
    }
  }, [canvas]);

  const handleRotateRight = useCallback(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.rotate((activeObject.angle || 0) + 15);
        canvas.renderAll();
      }
    }
  }, [canvas]);

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200">
        {/* Здесь будет Toolbar компонент */}
      </div>

      {/* Canvas область */}
      <div 
        className="flex-1 flex items-center justify-center overflow-hidden"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="relative">
          {/* Сетка */}
          {gridVisible && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          )}
          
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="border border-gray-300 shadow-lg bg-white"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center'
            }}
          />
        </div>
      </div>

      {/* Индикаторы */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-500">
        <div className="flex justify-between items-center">
          <span>Масштаб: {Math.round(zoom * 100)}%</span>
          <span>Сетка: {gridVisible ? 'Вкл' : 'Выкл'}</span>
          <span>Выбрано: {hasSelection ? 'Да' : 'Нет'}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CanvasArea); 