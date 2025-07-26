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
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

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
        saveToHistory();
      }
    });

    fabricCanvas.on('object:modified', () => {
      saveToHistory();
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

  // Сохранение в историю
  const saveToHistory = useCallback(() => {
    if (!canvas) return;
    
    const canvasData = canvas.toJSON();
    const historyItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      data: JSON.stringify(canvasData)
    };
    
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), historyItem];
      if (newHistory.length > 20) {
        return newHistory.slice(-20);
      }
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [canvas, historyIndex]);

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
          canvas.renderAll();
        });
      } catch (error) {
        console.error('Error loading canvas state:', error);
      }
    }
  }, [canvas, productId]);

  // Добавление текста
  const addText = useCallback((text = 'Текст', options = {}) => {
    if (!canvas) return;
    
    const textbox = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#000000',
      ...options
    });
    
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
  }, [canvas]);

  // Добавление изображения
  const addImage = useCallback((imageUrl: string, options = {}) => {
    if (!canvas) return;
    
    fabric.Image.fromURL(imageUrl, (img: any) => {
      img.set({
        left: 100,
        top: 100,
        ...options
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  }, [canvas]);

  // Добавление фигуры
  const addShape = useCallback((shapeType: 'rect' | 'circle' | 'triangle', options = {}) => {
    if (!canvas) return;
    
    let shape: any;
    
    switch (shapeType) {
      case 'rect':
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#ff0000',
          ...options
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: '#00ff00',
          ...options
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#0000ff',
          ...options
        });
        break;
    }
    
    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    }
  }, [canvas]);

  // Удаление выбранного объекта
  const deleteSelected = useCallback(() => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      saveToHistory();
    }
  }, [canvas, saveToHistory]);

  // Установка масштаба
  const setZoomLevel = useCallback((level: number) => {
    if (!canvas) return;
    
    setZoom(level);
    canvas.setZoom(level);
    canvas.renderAll();
  }, [canvas]);

  // Переключение сетки
  const toggleGrid = useCallback(() => {
    setGridVisible(prev => !prev);
  }, []);

  // Экспорт в PNG
  const exportToPNG = useCallback((options = {}) => {
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      ...options
    });
    
    const link = document.createElement('a');
    link.download = `card-${productId}.png`;
    link.href = dataURL;
    link.click();
  }, [canvas, productId]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const historyItem = history[newIndex];
      if (historyItem && canvas) {
        canvas.loadFromJSON(JSON.parse(historyItem.data), () => {
          canvas.renderAll();
        });
        setHistoryIndex(newIndex);
      }
    }
  }, [history, historyIndex, canvas]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const historyItem = history[newIndex];
      if (historyItem && canvas) {
        canvas.loadFromJSON(JSON.parse(historyItem.data), () => {
          canvas.renderAll();
        });
        setHistoryIndex(newIndex);
      }
    }
  }, [history, historyIndex, canvas]);

  // Инициализация canvas при монтировании
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Автосохранение каждые 2 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      saveCanvasState();
    }, 2000);

    return () => clearInterval(interval);
  }, [saveCanvasState]);

  return {
    canvasRef,
    canvas,
    layers,
    selectedLayerId,
    zoom,
    gridVisible,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    initCanvas,
    addText,
    addImage,
    addShape,
    deleteSelected,
    setZoomLevel,
    toggleGrid,
    exportToPNG,
    saveCanvasState,
    undo,
    redo,
  };
}; 