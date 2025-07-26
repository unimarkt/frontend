import { useState, useCallback, useRef, useEffect } from 'react';
import type { 
  EditorState, 
  Layer, 
  TextLayer, 
  ImageLayer, 
  ShapeLayer,
  EditorHistoryItem 
} from '../types/editor.types';
import { validateLayer } from '../utils/validation';
import { initFabric, createObjectFromLayer, updateObjectFromLayer, optimizeCanvas, cleanupCanvas } from '../utils/fabric';

const MAX_HISTORY_SIZE = 50;

export const useEditor = () => {
  // Основное состояние
  const [state, setState] = useState<EditorState>({
    layers: [],
    selectedLayerId: null,
    zoom: 100,
    showGrid: true,
    isLoading: false,
    error: null,
    history: [],
    historyIndex: -1,
  });

  // Refs
  const canvasRef = useRef<any>(null);
  const fabricRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  // Инициализация Fabric.js
  const initializeCanvas = useCallback(async (canvasElement: HTMLCanvasElement) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const fabric = await initFabric();
      fabricRef.current = fabric;
      
      const canvas = new fabric.Canvas(canvasElement, {
        width: 900,
        height: 1200,
        backgroundColor: '#ffffff',
        selection: true,
        preserveObjectStacking: true,
      });

      optimizeCanvas(canvas);
      canvasRef.current = canvas;
      isInitializedRef.current = true;

      // Обработчики событий canvas
      canvas.on('selection:created', handleSelectionCreated);
      canvas.on('selection:updated', handleSelectionUpdated);
      canvas.on('selection:cleared', handleSelectionCleared);
      canvas.on('object:modified', handleObjectModified);
      canvas.on('object:removed', handleObjectRemoved);

      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Failed to initialize canvas:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Ошибка инициализации' 
      }));
    }
  }, []);

  // Обработчики событий canvas
  const handleSelectionCreated = useCallback((e: any) => {
    const activeObject = e.selected?.[0];
    if (activeObject?.layerId) {
      setState(prev => ({ ...prev, selectedLayerId: activeObject.layerId }));
    }
  }, []);

  const handleSelectionUpdated = useCallback((e: any) => {
    const activeObject = e.selected?.[0];
    if (activeObject?.layerId) {
      setState(prev => ({ ...prev, selectedLayerId: activeObject.layerId }));
    }
  }, []);

  const handleSelectionCleared = useCallback(() => {
    setState(prev => ({ ...prev, selectedLayerId: null }));
  }, []);

  const handleObjectModified = useCallback((e: any) => {
    const object = e.target;
    if (object?.layerId) {
      updateLayerFromObject(object);
    }
  }, []);

  const handleObjectRemoved = useCallback((e: any) => {
    const object = e.target;
    if (object?.layerId) {
      removeLayer(object.layerId);
    }
  }, []);

  // Обновление слоя из объекта canvas
  const updateLayerFromObject = useCallback((object: any) => {
    setState(prev => {
      const layerIndex = prev.layers.findIndex(layer => layer.id === object.layerId);
      if (layerIndex === -1) return prev;

      const updatedLayers = [...prev.layers];
      const layer = updatedLayers[layerIndex];

      // Обновляем базовые свойства
      layer.x = object.left || 0;
      layer.y = object.top || 0;
      layer.width = object.width || 0;
      layer.height = object.height || 0;
      layer.rotation = object.angle || 0;
      layer.opacity = object.opacity || 1;

      // Обновляем специфичные свойства
      if (layer.type === 'text' && object.type === 'text') {
        layer.text = object.text || '';
        layer.fontSize = object.fontSize || 16;
        layer.fontFamily = object.fontFamily || 'Arial';
        layer.fontWeight = object.fontWeight || 'normal';
        layer.fontColor = object.fill || '#000000';
        layer.textAlign = object.textAlign || 'left';
        layer.lineHeight = object.lineHeight || 1.2;
        layer.letterSpacing = object.charSpacing || 0;
      }

      return { ...prev, layers: updatedLayers };
    });
  }, []);

  // Добавление слоя в историю
  const addToHistory = useCallback((layers: Layer[]) => {
    setState(prev => {
      const newHistoryItem: EditorHistoryItem = {
        layers: JSON.parse(JSON.stringify(layers)), // Глубокое копирование
        timestamp: Date.now(),
      };

      const newHistory = [...prev.history.slice(0, prev.historyIndex + 1), newHistoryItem];
      
      // Ограничиваем размер истории
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift();
      }

      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  // Добавление слоя
  const addLayer = useCallback(async (layer: Layer) => {
    try {
      // Валидация
      const validation = validateLayer(layer);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      setState(prev => {
        const newLayers = [...prev.layers, layer];
        addToHistory(newLayers);
        return { ...prev, layers: newLayers };
      });

      // Добавляем объект на canvas
      if (canvasRef.current && fabricRef.current) {
        const object = await createObjectFromLayer(layer, fabricRef.current);
        canvasRef.current.add(object);
        canvasRef.current.renderAll();
      }
    } catch (error) {
      console.error('Error adding layer:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Ошибка добавления слоя' 
      }));
    }
  }, [addToHistory]);

  // Обновление слоя
  const updateLayer = useCallback((layerId: string, updates: Partial<Layer>) => {
    try {
      setState(prev => {
        const layerIndex = prev.layers.findIndex(layer => layer.id === layerId);
        if (layerIndex === -1) return prev;

        const updatedLayers = [...prev.layers];
        updatedLayers[layerIndex] = { ...updatedLayers[layerIndex], ...updates };

        // Валидация
        const validation = validateLayer(updatedLayers[layerIndex]);
        if (!validation.isValid) {
          throw new Error(validation.errors.join(', '));
        }

        addToHistory(updatedLayers);
        return { ...prev, layers: updatedLayers };
      });

      // Обновляем объект на canvas
      if (canvasRef.current) {
        const object = canvasRef.current.getObjects().find((obj: any) => obj.layerId === layerId);
        if (object) {
          const layer = state.layers.find(l => l.id === layerId);
          if (layer) {
            updateObjectFromLayer(object, layer, fabricRef.current);
          }
        }
      }
    } catch (error) {
      console.error('Error updating layer:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Ошибка обновления слоя' 
      }));
    }
  }, [addToHistory, state.layers]);

  // Удаление слоя
  const removeLayer = useCallback((layerId: string) => {
    try {
      setState(prev => {
        const newLayers = prev.layers.filter(layer => layer.id !== layerId);
        addToHistory(newLayers);
        
        // Снимаем выделение если удаляем выбранный слой
        const newSelectedLayerId = prev.selectedLayerId === layerId ? null : prev.selectedLayerId;
        
        return { 
          ...prev, 
          layers: newLayers, 
          selectedLayerId: newSelectedLayerId 
        };
      });

      // Удаляем объект с canvas
      if (canvasRef.current) {
        const object = canvasRef.current.getObjects().find((obj: any) => obj.layerId === layerId);
        if (object) {
          canvasRef.current.remove(object);
          canvasRef.current.renderAll();
        }
      }
    } catch (error) {
      console.error('Error removing layer:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Ошибка удаления слоя' 
      }));
    }
  }, [addToHistory]);

  // Выбор слоя
  const selectLayer = useCallback((layerId: string | null) => {
    setState(prev => ({ ...prev, selectedLayerId: layerId }));
    
    if (canvasRef.current) {
      if (layerId) {
        const object = canvasRef.current.getObjects().find((obj: any) => obj.layerId === layerId);
        if (object) {
          canvasRef.current.setActiveObject(object);
          canvasRef.current.renderAll();
        }
      } else {
        canvasRef.current.discardActiveObject();
        canvasRef.current.renderAll();
      }
    }
  }, []);

  // Изменение масштаба
  const setZoom = useCallback((zoom: number) => {
    setState(prev => ({ ...prev, zoom: Math.max(25, Math.min(400, zoom)) }));
    
    if (canvasRef.current) {
      canvasRef.current.setZoom(zoom / 100);
      canvasRef.current.renderAll();
    }
  }, []);

  // Переключение сетки
  const toggleGrid = useCallback(() => {
    setState(prev => ({ ...prev, showGrid: !prev.showGrid }));
  }, []);

  // Undo/Redo
  const undo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex > 0) {
        const newIndex = prev.historyIndex - 1;
        const historyItem = prev.history[newIndex];
        
        // Восстанавливаем состояние canvas
        if (canvasRef.current && historyItem) {
          canvasRef.current.clear();
          historyItem.layers.forEach(async (layer) => {
            const object = await createObjectFromLayer(layer, fabricRef.current);
            canvasRef.current.add(object);
          });
          canvasRef.current.renderAll();
        }
        
        return { ...prev, layers: historyItem.layers, historyIndex: newIndex };
      }
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex < prev.history.length - 1) {
        const newIndex = prev.historyIndex + 1;
        const historyItem = prev.history[newIndex];
        
        // Восстанавливаем состояние canvas
        if (canvasRef.current && historyItem) {
          canvasRef.current.clear();
          historyItem.layers.forEach(async (layer) => {
            const object = await createObjectFromLayer(layer, fabricRef.current);
            canvasRef.current.add(object);
          });
          canvasRef.current.renderAll();
        }
        
        return { ...prev, layers: historyItem.layers, historyIndex: newIndex };
      }
      return prev;
    });
  }, []);

  // Очистка ошибки
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (canvasRef.current) {
        cleanupCanvas(canvasRef.current);
      }
    };
  }, []);

  return {
    // Состояние
    ...state,
    
    // Методы
    initializeCanvas,
    addLayer,
    updateLayer,
    removeLayer,
    selectLayer,
    setZoom,
    toggleGrid,
    undo,
    redo,
    clearError,
    
    // Refs
    canvasRef,
    fabricRef,
    isInitialized: isInitializedRef.current,
  };
}; 