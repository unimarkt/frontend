import { useState, useCallback, useRef } from 'react';

interface DragState {
  isDragging: boolean;
  dragType: 'component' | 'node' | null;
  dragData: any;
  position: { x: number; y: number };
  componentType?: string;
  displayName?: string;
}

interface UseDragAndDropReturn {
  dragState: DragState;
  startComponentDrag: (componentType: string, displayName: string, defaultProps: any, e: React.DragEvent) => void;
  startNodeDrag: (nodeId: string, e: React.DragEvent) => void;
  updateDragPosition: (x: number, y: number) => void;
  endDrag: () => void;
  handleCanvasDrop: (e: React.DragEvent, onDrop: (data: any, position: { x: number; y: number }) => void) => void;
  handleCanvasDragOver: (e: React.DragEvent) => void;
}

export const useDragAndDrop = (): UseDragAndDropReturn => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragType: null,
    dragData: null,
    position: { x: 0, y: 0 },
  });

  const dragStartTime = useRef<number>(0);

  const startComponentDrag = useCallback((
    componentType: string,
    displayName: string,
    defaultProps: any,
    e: React.DragEvent
  ) => {
    console.log('Starting component drag:', componentType);
    
    dragStartTime.current = Date.now();
    
    const dragData = {
      type: componentType,
      displayName,
      defaultProps,
      dragType: 'component' as const,
    };

    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'copy';
    
    // Устанавливаем кастомное изображение для drag
    const dragImage = document.createElement('div');
    dragImage.className = 'bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg';
    dragImage.innerHTML = `
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
        <span class="text-sm font-medium">${displayName}</span>
      </div>
    `;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 20, 20);
    
    // Удаляем элемент после установки
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);

    setDragState({
      isDragging: true,
      dragType: 'component',
      dragData,
      position: { x: e.clientX, y: e.clientY },
      componentType,
      displayName,
    });
  }, []);

  const startNodeDrag = useCallback((nodeId: string, e: React.DragEvent) => {
    console.log('Starting node drag:', nodeId);
    
    dragStartTime.current = Date.now();
    
    const dragData = {
      nodeId,
      dragType: 'node' as const,
    };

    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'move';

    setDragState({
      isDragging: true,
      dragType: 'node',
      dragData,
      position: { x: e.clientX, y: e.clientY },
    });
  }, []);

  const updateDragPosition = useCallback((x: number, y: number) => {
    setDragState(prev => ({
      ...prev,
      position: { x, y },
    }));
  }, []);

  const endDrag = useCallback(() => {
    console.log('Ending drag');
    setDragState({
      isDragging: false,
      dragType: null,
      dragData: null,
      position: { x: 0, y: 0 },
    });
  }, []);

  const handleCanvasDrop = useCallback((
    e: React.DragEvent,
    onDrop: (data: any, position: { x: number; y: number }) => void
  ) => {
    e.preventDefault();
    
    const dragDuration = Date.now() - dragStartTime.current;
    console.log('Canvas drop event, drag duration:', dragDuration);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      console.log('Dropped data:', data);
      
      // Получаем позицию относительно контейнера карточки
      const cardContainer = e.currentTarget.querySelector('.relative.mx-auto.my-8') as HTMLElement;
      if (!cardContainer) {
        console.log('Card container not found');
        return;
      }
      
      const cardRect = cardContainer.getBoundingClientRect();
      
      // Вычисляем позицию с учетом масштаба (предполагаем, что масштаб хранится в data-атрибуте)
      const scale = parseFloat(cardContainer.getAttribute('data-scale') || '1');
      const x = (e.clientX - cardRect.left) / scale;
      const y = (e.clientY - cardRect.top) / scale;
      
      console.log('Drop position:', { x, y, scale });
      
      onDrop(data, { x, y });
      
      // Добавляем визуальную обратную связь
      const feedback = document.createElement('div');
      feedback.className = 'fixed pointer-events-none z-50 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg';
      feedback.style.left = `${e.clientX}px`;
      feedback.style.top = `${e.clientY}px`;
      feedback.style.transform = 'translate(-50%, -50%)';
      feedback.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="text-sm font-medium">Элемент добавлен</span>
        </div>
      `;
      
      document.body.appendChild(feedback);
      
      setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
          if (document.body.contains(feedback)) {
            document.body.removeChild(feedback);
          }
        }, 200);
      }, 1000);
      
    } catch (error) {
      console.error('Failed to parse dropped data:', error);
    }
    
    endDrag();
  }, [endDrag]);

  const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    
    // Обновляем позицию индикатора
    updateDragPosition(e.clientX, e.clientY);
  }, [updateDragPosition]);

  return {
    dragState,
    startComponentDrag,
    startNodeDrag,
    updateDragPosition,
    endDrag,
    handleCanvasDrop,
    handleCanvasDragOver,
  };
}; 