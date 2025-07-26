import { useEffect, useRef, useState, useCallback } from 'react';
import type { Layer, CanvasState } from '../types/canvas.types';

// Импорт fabric
const fabric = require('fabric').fabric;

// Типы для событий Fabric.js
interface FabricEvent {
  target?: any;
  selected?: any[];
}

export const useFabricCanvas = (productId: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [gridVisible, setGridVisible] = useState(true);

  // Инициализация canvas
  const initCanvas = useCallback(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 900,
      height: 600,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true,
      renderOnAddRemove: true,
    });

    // Настройка событий canvas
    fabricCanvas.on('object:added', (e: FabricEvent) => {
      const obj = e.target;
      if (obj) {
        const layer: Layer = {
          id: obj.id || `layer-${Date.now()}`,
          name: obj.name || `Слой ${layers.length + 1}`,
          type: getObjectType(obj),
          visible: true,
          locked: false,
          opacity: obj.opacity || 1,
          zIndex: layers.length,
          fabricObject: obj,
        };
        
        obj.id = layer.id;
        obj.name = layer.name;
        
        setLayers(prev => [...prev, layer]);
      }
    });

    fabricCanvas.on('object:modified', () => {
      saveCanvasState();
    });

    fabricCanvas.on('selection:created', (e: FabricEvent) => {
      const obj = e.selected?.[0];
      if (obj) {
        setSelectedLayerId(obj.id);
      }
    });

    fabricCanvas.on('selection:cleared', () => {
      setSelectedLayerId(null);
    });

    setCanvas(fabricCanvas);
    loadCanvasState();
  }, []);

  // Определение типа объекта
  const getObjectType = (obj: any): Layer['type'] => {
    if (obj instanceof fabric.Text || obj instanceof fabric.Textbox) {
      return 'text';
    } else if (obj instanceof fabric.Image) {
      return 'image';
    } else {
      return 'shape';
    }
  };

  // Сохранение состояния canvas
  const saveCanvasState = useCallback(() => {
    if (!canvas) return;
    
    const canvasData = canvas.toJSON();
    const saveData = {
      productId,
      canvasData: JSON.stringify(canvasData),
      layers,
      timestamp: Date.now(),
      version: '1.0.0'
    };
    
    localStorage.setItem(`editor-${productId}`, JSON.stringify(saveData));
  }, [canvas, layers, productId]);

  // Загрузка состояния canvas
  const loadCanvasState = useCallback(() => {
    const savedData = localStorage.getItem(`editor-${productId}`);
    if (savedData && canvas) {
      try {
        const data = JSON.parse(savedData);
        canvas.loadFromJSON(JSON.parse(data.canvasData), () => {
          // Обновляем слои после загрузки
          const objects = canvas.getObjects();
          const loadedLayers: Layer[] = objects.map((obj: any, index: number) => ({
            id: obj.id || `layer-${index}`,
            name: obj.name || `Слой ${index + 1}`,
            type: getObjectType(obj),
            visible: obj.visible !== false,
            locked: false,
            opacity: obj.opacity || 1,
            zIndex: index,
            fabricObject: obj,
          }));
          
          setLayers(loadedLayers);
        });
      } catch (error) {
        console.error('Ошибка загрузки состояния canvas:', error);
      }
    }
  }, [canvas, productId]);

  // Добавление текста
  const addText = useCallback((text = 'Новый текст') => {
    if (!canvas) return;

    const fabricText = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#000000',
      width: 200,
      editable: true,
    });

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll();
  }, [canvas]);

  // Добавление изображения
  const addImage = useCallback((imageUrl: string) => {
    if (!canvas) return;

    fabric.Image.fromURL(imageUrl, (img: any) => {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });
      
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  }, [canvas]);

  // Добавление фигуры
  const addShape = useCallback((shapeType: 'rect' | 'circle' | 'triangle') => {
    if (!canvas) return;

    let shape: any;

    switch (shapeType) {
      case 'rect':
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#ff6b6b',
          stroke: '#333',
          strokeWidth: 2,
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: '#4ecdc4',
          stroke: '#333',
          strokeWidth: 2,
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#45b7d1',
          stroke: '#333',
          strokeWidth: 2,
        });
        break;
      default:
        return;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
  }, [canvas]);

  // Удаление выбранного объекта
  const deleteSelected = useCallback(() => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      setSelectedLayerId(null);
    }
  }, [canvas]);

  // Изменение зума
  const setZoomLevel = useCallback((newZoom: number) => {
    if (!canvas) return;
    
    const zoomLevel = Math.max(0.1, Math.min(3, newZoom));
    canvas.setZoom(zoomLevel);
    setZoom(zoomLevel);
  }, [canvas]);

  // Переключение сетки
  const toggleGrid = useCallback(() => {
    setGridVisible(prev => !prev);
  }, []);

  // Экспорт в PNG
  const exportToPNG = useCallback((quality = 1) => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: quality,
      multiplier: 2,
    });

    const link = document.createElement('a');
    link.download = `card-${productId}-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [canvas, productId]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [canvas]);

  // Автосохранение
  useEffect(() => {
    const timer = setTimeout(saveCanvasState, 2000);
    return () => clearTimeout(timer);
  }, [saveCanvasState]);

  return {
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
  };
}; 