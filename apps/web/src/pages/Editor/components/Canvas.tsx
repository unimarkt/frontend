// Inspired by craft.js Canvas: https://github.com/prevwong/craft.js/blob/master/packages/core/src/editor/Canvas.tsx
// and fabricjs-react Canvas: https://github.com/asotog/fabricjs-react/blob/master/src/components/Canvas.tsx

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import type { Node } from '../types/canvas.types';

interface CanvasProps {
  nodes: Record<string, Node>;
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string | null) => void;
  onNodeUpdate: (nodeId: string, updates: Partial<Node>) => void;
  zoom: number;
  showGrid: boolean;
  canvasSize: { width: number; height: number };
  mode: 'edit' | 'preview';
}

// Отдельный компонент для сетки для большей стабильности
const GridOverlay: React.FC<{ show: boolean }> = React.memo(({ show }) => {
  const gridStyles = useMemo(() => ({
    backgroundImage: `
      linear-gradient(to right, #e5e7eb 1px, transparent 1px),
      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
  }), []);

  const gridClassName = useMemo(() => 
    `absolute inset-0 pointer-events-none transition-opacity duration-200 ${
      show ? 'opacity-100' : 'opacity-0'
    }`, 
    [show]
  );

  return (
    <div 
      className={gridClassName}
      style={gridStyles}
    />
  );
});

GridOverlay.displayName = 'GridOverlay';

export const Canvas: React.FC<CanvasProps> = ({
  nodes,
  selectedNodeId,
  onNodeSelect,
  onNodeUpdate,
  zoom,
  showGrid,
  canvasSize,
  mode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  // Memoize nodes array to prevent unnecessary re-renders
  const nodesArray = useMemo(() => Object.values(nodes), [nodes]);

  // Инициализация Fabric.js
  const initializeCanvas = useCallback(async () => {
    console.log('Initializing canvas...');
    if (!canvasRef.current) {
      console.log('Canvas ref not available');
      return;
    }

    // Проверяем, не инициализирован ли уже canvas
    if (isInitializedRef.current && fabricRef.current) {
      console.log('Canvas already initialized, disposing old canvas...');
      try {
        fabricRef.current.dispose();
      } catch (error) {
        console.log('Error disposing canvas:', error);
      }
      fabricRef.current = null;
      isInitializedRef.current = false;
    }

    // Дополнительная проверка - если canvas уже существует в DOM
    if (canvasRef.current.querySelector('canvas')) {
      console.log('Canvas element already exists, removing...');
      const existingCanvas = canvasRef.current.querySelector('canvas');
      if (existingCanvas) {
        existingCanvas.remove();
      }
    }

    try {
      console.log('Importing fabric.js...');
      // Динамический импорт Fabric.js
      const fabricModule = await import('fabric');
      console.log('Fabric.js imported successfully:', fabricModule);
      
      // Получаем fabric из модуля
      const fabric = fabricModule.default || fabricModule;
      console.log('Fabric object:', fabric);
      
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: canvasSize.width,
        height: canvasSize.height,
        backgroundColor: '#ffffff',
        selection: mode === 'edit',
        preserveObjectStacking: true,
        renderOnAddRemove: false,
        allowTouchScrolling: true,
      });

      console.log('Canvas created:', canvas);
      fabricRef.current = canvas;
      isInitializedRef.current = true;

      // Обработчики событий
      canvas.on('selection:created', handleSelectionCreated);
      canvas.on('selection:updated', handleSelectionUpdated);
      canvas.on('selection:cleared', handleSelectionCleared);
      canvas.on('object:modified', handleObjectModified);
      canvas.on('object:moving', handleObjectMoving);
      canvas.on('object:scaling', handleObjectScaling);
      canvas.on('object:rotating', handleObjectRotating);

      // Рендерим все объекты
      renderNodes();
    } catch (error) {
      console.error('Failed to initialize canvas:', error);
    }
  }, [canvasSize, mode]);

  // Рендеринг узлов
  const renderNodes = useCallback(async () => {
    console.log('Rendering nodes:', nodes);
    if (!fabricRef.current) {
      console.log('Fabric canvas not available');
      return;
    }

    const canvas = fabricRef.current;
    console.log('Clearing canvas...');
    canvas.clear();

    // Создаем объекты для каждого узла
    for (const nodeId in nodes) {
      const node = nodes[nodeId];
      console.log('Creating fabric object for node:', node);
      await createFabricObject(node, canvas);
    }

    console.log('Rendering canvas...');
    canvas.renderAll();
    console.log('Nodes rendered successfully');
  }, [nodes]);

  // Создание Fabric объекта из узла
  const createFabricObject = useCallback(async (node: Node, canvas: any) => {
    console.log('Creating fabric object for node:', node);
    const fabricModule = await import('fabric');
    const fabric = fabricModule.default || fabricModule;
    
    let fabricObject: any;

    switch (node.type) {
      case 'text':
        console.log('Creating text object for node:', node);
        fabricObject = new fabric.Text(node.props.text || 'Текст', {
          left: node.props.x || 0,
          top: node.props.y || 0,
          fontSize: node.props.fontSize || 16,
          fontFamily: node.props.fontFamily || 'Arial',
          fontWeight: node.props.fontWeight || 'normal',
          fill: node.props.color || '#000000',
          textAlign: node.props.textAlign || 'left',
          lineHeight: node.props.lineHeight || 1.2,
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      case 'image':
        console.log('Creating image object for node:', node);
        // Создаем изображение
        fabricObject = new fabric.Image(node.props.src || 'https://via.placeholder.com/200x200', {
          left: node.props.x || 0,
          top: node.props.y || 0,
          width: node.props.width || 200,
          height: node.props.height || 200,
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      case 'rectangle':
        console.log('Creating rectangle object for node:', node);
        fabricObject = new fabric.Rect({
          left: node.props.x || 0,
          top: node.props.y || 0,
          width: node.props.width || 100,
          height: node.props.height || 100,
          fill: node.props.fillColor || '#cccccc',
          stroke: node.props.strokeColor || '#000000',
          strokeWidth: node.props.strokeWidth || 0,
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      case 'circle':
        fabricObject = new fabric.Circle({
          left: node.props.x || 0,
          top: node.props.y || 0,
          radius: node.props.radius || 50,
          fill: node.props.fillColor || '#cccccc',
          stroke: node.props.strokeColor || '#000000',
          strokeWidth: node.props.strokeWidth || 0,
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      case 'button':
        console.log('Creating button group for node:', node);
        // Создаем группу для кнопки
        const buttonGroup = new fabric.Group([], {
          left: node.props.x || 0,
          top: node.props.y || 0,
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        
        // Создаем прямоугольник кнопки
        const buttonRect = new fabric.Rect({
          left: 0,
          top: 0,
          width: node.props.width || 120,
          height: node.props.height || 40,
          fill: node.props.backgroundColor || '#007bff',
          stroke: '#007bff',
          strokeWidth: 0,
          rx: 6,
          ry: 6,
          selectable: false,
          evented: false,
        });
        
        // Создаем текст кнопки
        const buttonText = new fabric.Text(node.props.text || 'Кнопка', {
          left: 0,
          top: 0,
          width: node.props.width || 120,
          height: node.props.height || 40,
          fontSize: node.props.fontSize || 14,
          fill: node.props.color || '#ffffff',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
        });
        
        // Добавляем элементы в группу
        buttonGroup.add(buttonRect);
        buttonGroup.add(buttonText);
        
        // Добавляем метаданные к группе
        (buttonGroup as any).nodeId = node.id;
        (buttonGroup as any).nodeType = node.type;
        (buttonGroup as any).nodeProps = node.props;
        
        canvas.add(buttonGroup);
        console.log('Added button group to canvas:', buttonGroup);
        return;

      case 'badge':
        console.log('Creating badge group for node:', node);
        // Создаем группу для бейджа
        const badgeGroup = new fabric.Group([], {
          left: node.props.x || 0,
          top: node.props.y || 0,
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        
        // Создаем прямоугольник бейджа
        const badgeRect = new fabric.Rect({
          left: 0,
          top: 0,
          width: node.props.width || 80,
          height: node.props.height || 24,
          fill: node.props.backgroundColor || '#ff6b6b',
          stroke: '#ff6b6b',
          strokeWidth: 0,
          rx: 12,
          ry: 12,
          selectable: false,
          evented: false,
        });
        
        // Создаем текст бейджа
        const badgeText = new fabric.Text(node.props.text || 'Бейдж', {
          left: 0,
          top: 0,
          width: node.props.width || 80,
          height: node.props.height || 24,
          fontSize: node.props.fontSize || 12,
          fill: node.props.color || '#ffffff',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
        });
        
        // Добавляем элементы в группу
        badgeGroup.add(badgeRect);
        badgeGroup.add(badgeText);
        
        // Добавляем метаданные к группе
        (badgeGroup as any).nodeId = node.id;
        (badgeGroup as any).nodeType = node.type;
        (badgeGroup as any).nodeProps = node.props;
        
        canvas.add(badgeGroup);
        console.log('Added badge group to canvas:', badgeGroup);
        return;

      case 'divider':
        fabricObject = new fabric.Line([
          node.props.x || 0,
          node.props.y || 0,
          (node.props.x || 0) + (node.props.width || 200),
          node.props.y || 0
        ], {
          stroke: node.props.strokeColor || '#e5e7eb',
          strokeWidth: node.props.strokeWidth || 2,
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      case 'heading':
        fabricObject = new fabric.Text(node.props.text || 'Заголовок', {
          left: node.props.x || 0,
          top: node.props.y || 0,
          fontSize: node.props.fontSize || 24,
          fontFamily: node.props.fontFamily || 'Arial',
          fontWeight: node.props.fontWeight || 'bold',
          fill: node.props.color || '#000000',
          textAlign: node.props.textAlign || 'left',
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      case 'paragraph':
        fabricObject = new fabric.Text(node.props.text || 'Параграф', {
          left: node.props.x || 0,
          top: node.props.y || 0,
          fontSize: node.props.fontSize || 14,
          fontFamily: node.props.fontFamily || 'Arial',
          fontWeight: node.props.fontWeight || 'normal',
          fill: node.props.color || '#333333',
          textAlign: node.props.textAlign || 'left',
          lineHeight: node.props.lineHeight || 1.5,
          width: node.props.width || 300,
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      case 'icon':
        // Создаем простую иконку как круг с символом
        fabricObject = new fabric.Circle({
          left: node.props.x || 0,
          top: node.props.y || 0,
          radius: (node.props.size || 24) / 2,
          fill: node.props.color || '#000000',
          stroke: 'none',
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      case 'container':
        fabricObject = new fabric.Rect({
          left: node.props.x || 0,
          top: node.props.y || 0,
          width: node.props.width || 200,
          height: node.props.height || 150,
          fill: node.props.backgroundColor || '#f8f9fa',
          stroke: node.props.borderColor || '#dee2e6',
          strokeWidth: node.props.borderWidth || 1,
          rx: node.props.borderRadius || 8,
          ry: node.props.borderRadius || 8,
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      case 'spacer':
        fabricObject = new fabric.Rect({
          left: node.props.x || 0,
          top: node.props.y || 0,
          width: node.props.width || 200,
          height: node.props.height || 20,
          fill: node.props.backgroundColor || 'transparent',
          stroke: 'none',
          selectable: mode === 'edit',
          evented: mode === 'edit',
          hasControls: mode === 'edit',
          hasBorders: mode === 'edit',
        });
        break;

      default:
        return;
    }

    // Добавляем метаданные
    fabricObject.nodeId = node.id;
    fabricObject.nodeType = node.type;
    fabricObject.nodeProps = node.props;

    canvas.add(fabricObject);
    console.log('Added fabric object to canvas:', fabricObject);
  }, [mode]);

  // Обработчики событий canvas
  const handleSelectionCreated = useCallback((e: any) => {
    const activeObject = e.selected?.[0];
    console.log('Selection created:', activeObject);
    if (activeObject?.nodeId) {
      onNodeSelect(activeObject.nodeId);
    }
  }, [onNodeSelect]);

  const handleSelectionUpdated = useCallback((e: any) => {
    const activeObject = e.selected?.[0];
    console.log('Selection updated:', activeObject);
    if (activeObject?.nodeId) {
      onNodeSelect(activeObject.nodeId);
    }
  }, [onNodeSelect]);

  const handleSelectionCleared = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  const handleObjectModified = useCallback((e: any) => {
    const object = e.target;
    console.log('Object modified:', object);
    if (object?.nodeId) {
      // Для групп нужно получить актуальные размеры
      let width = object.width * object.scaleX;
      let height = object.height * object.scaleY;
      
      // Если это группа, используем размеры группы
      if (object.type === 'group') {
        const groupBounds = object.getBoundingRect();
        width = groupBounds.width;
        height = groupBounds.height;
      }
      
      const updates: Partial<Node> = {
        props: {
          x: object.left,
          y: object.top,
          width: width,
          height: height,
          rotation: object.angle,
        },
      };
      console.log('Sending updates:', updates);
      onNodeUpdate(object.nodeId, updates);
    }
  }, [onNodeUpdate]);

  const handleObjectMoving = useCallback((e: any) => {
    const object = e.target;
    if (object?.nodeId) {
      const updates: Partial<Node> = {
        props: {
          x: object.left,
          y: object.top,
        },
      };
      onNodeUpdate(object.nodeId, updates);
    }
  }, [onNodeUpdate]);

  const handleObjectScaling = useCallback((e: any) => {
    const object = e.target;
    if (object?.nodeId) {
      // Для групп нужно получить актуальные размеры
      let width = object.width * object.scaleX;
      let height = object.height * object.scaleY;
      
      // Если это группа, используем размеры группы
      if (object.type === 'group') {
        const groupBounds = object.getBoundingRect();
        width = groupBounds.width;
        height = groupBounds.height;
      }
      
      const updates: Partial<Node> = {
        props: {
          width: width,
          height: height,
        },
      };
      onNodeUpdate(object.nodeId, updates);
    }
  }, [onNodeUpdate]);

  const handleObjectRotating = useCallback((e: any) => {
    const object = e.target;
    if (object?.nodeId) {
      const updates: Partial<Node> = {
        props: {
          rotation: object.angle,
        },
      };
      onNodeUpdate(object.nodeId, updates);
    }
  }, [onNodeUpdate]);

  // Обновление выделения при изменении selectedNodeId
  useEffect(() => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
    
    if (selectedNodeId) {
      const object = canvas.getObjects().find((obj: any) => obj.nodeId === selectedNodeId);
      if (object) {
        canvas.setActiveObject(object);
      }
    } else {
      canvas.discardActiveObject();
    }
    
    canvas.renderAll();
  }, [selectedNodeId]);

  // Обновление масштаба
  useEffect(() => {
    // Масштабирование обрабатывается через CSS transform, не нужно масштабировать Fabric.js
    console.log('Zoom changed:', zoom);
  }, [zoom]);

  // Обновление режима
  useEffect(() => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    const objects = canvas.getObjects();
    
    objects.forEach((obj: any) => {
      obj.selectable = mode === 'edit';
      obj.evented = mode === 'edit';
      obj.hasControls = mode === 'edit';
      obj.hasBorders = mode === 'edit';
    });
    
    canvas.selection = mode === 'edit';
    canvas.renderAll();
  }, [mode]);

  // Инициализация при монтировании
  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  // Перерендер при изменении узлов
  useEffect(() => {
    if (isInitializedRef.current) {
      renderNodes();
    }
  }, [renderNodes]);

  // Обновление сетки без перерендера
  useEffect(() => {
    // Сетка обрабатывается через CSS, не требует перерендера canvas
    console.log('Grid visibility changed:', showGrid);
  }, [showGrid]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-auto">


      {/* Контейнер карточки */}
      <div 
        className="relative mx-auto my-8 bg-white shadow-lg"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
        }}
        data-scale={zoom / 100}
      >
        {/* Сетка - отдельный компонент для стабильности */}
        <GridOverlay show={showGrid} />
        
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="block"
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
          }}
        />
        
        {/* Индикатор режима */}
        {mode === 'preview' && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
            Предварительный просмотр
          </div>
        )}
        
        {/* Индикатор размера холста */}
        <div className="absolute bottom-4 left-4 bg-gray-800 text-white px-2 py-1 rounded text-xs">
          {canvasSize.width} × {canvasSize.height}
        </div>
      </div>
    </div>
  );
}; 