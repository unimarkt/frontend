import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Layout from '../../components/Layout';

interface Element {
  id: string;
  type: string;
  text?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  x: number;
  y: number;
  selected?: boolean;
  imageUrl?: string;
  shadow?: boolean;
  opacity?: number;
  rotation?: number;
  visible?: boolean;
}

interface HistoryState {
  elements: Element[];
  selectedElementId: string | null;
}

const EditorPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string>('');
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Функция для сохранения состояния в историю
  const saveToHistory = useCallback((newElements: Element[], newSelectedId: string | null) => {
    const newHistoryState = { elements: newElements, selectedElementId: newSelectedId };
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), newHistoryState];
      return newHistory.slice(-20); // Ограничиваем историю 20 состояниями
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      setElements(state.elements);
      setSelectedElementId(state.selectedElementId);
      setHistoryIndex(newIndex);
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      setElements(state.elements);
      setSelectedElementId(state.selectedElementId);
      setHistoryIndex(newIndex);
    }
  };

  const addText = () => {
    const newElement: Element = {
      id: `text-${Date.now()}`,
      type: 'text',
      text: 'Новый текст',
      color: '#000000',
      backgroundColor: '#ffffff',
      fontSize: 24,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      x: 200,
      y: 200,
      opacity: 1,
      rotation: 0,
      visible: true
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements, newElement.id);
    setSelectedElementId(newElement.id);
  };

  const addButton = () => {
    const newElement: Element = {
      id: `button-${Date.now()}`,
      type: 'button',
      text: 'Кнопка',
      color: '#ffffff',
      backgroundColor: '#3b82f6',
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      width: 120,
      height: 40,
      borderRadius: 8,
      x: 200,
      y: 300,
      shadow: true,
      opacity: 1,
      rotation: 0,
      visible: true
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements, newElement.id);
    setSelectedElementId(newElement.id);
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          const newElement: Element = {
            id: `image-${Date.now()}`,
            type: 'image',
            imageUrl: imageUrl,
            width: 200,
            height: 150,
            x: 200,
            y: 200,
            opacity: 1,
            rotation: 0,
            visible: true
          };
          const newElements = [...elements, newElement];
          setElements(newElements);
          saveToHistory(newElements, newElement.id);
          setSelectedElementId(newElement.id);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addShape = (type: string) => {
    const newElement: Element = {
      id: `${type}-${Date.now()}`,
      type: type,
      color: type === 'rect' ? '#ff0000' : type === 'circle' ? '#00ff00' : '#0000ff',
      backgroundColor: type === 'rect' ? '#ff0000' : type === 'circle' ? '#00ff00' : '#0000ff',
      width: type === 'rect' ? 100 : type === 'circle' ? 80 : 60,
      height: type === 'rect' ? 100 : type === 'circle' ? 80 : 60,
      x: 200,
      y: 200,
      shadow: true,
      opacity: 1,
      rotation: 0,
      visible: true
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements, newElement.id);
    setSelectedElementId(newElement.id);
  };

  const selectElement = (elementId: string) => {
    setSelectedElementId(elementId);
    setElements(prev => prev.map(el => ({
      ...el,
      selected: el.id === elementId
    })));
  };

  const updateElement = (elementId: string, updates: Partial<Element>) => {
    const newElements = elements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    );
    setElements(newElements);
    saveToHistory(newElements, selectedElementId);
  };

  const deleteSelected = () => {
    if (selectedElementId) {
      const newElements = elements.filter(el => el.id !== selectedElementId);
      setElements(newElements);
      setSelectedElementId(null);
      saveToHistory(newElements, null);
    }
  };

  const duplicateElement = () => {
    if (selectedElementId) {
      const element = elements.find(el => el.id === selectedElementId);
      if (element) {
        const newElement: Element = {
          ...element,
          id: `${element.type}-${Date.now()}`,
          x: element.x + 20,
          y: element.y + 20,
          selected: false
        };
        const newElements = [...elements, newElement];
        setElements(newElements);
        saveToHistory(newElements, newElement.id);
        setSelectedElementId(newElement.id);
      }
    }
  };

  const toggleElementVisibility = (elementId: string) => {
    const newElements = elements.map(el => 
      el.id === elementId ? { ...el, visible: !el.visible } : el
    );
    setElements(newElements);
    saveToHistory(newElements, selectedElementId);
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left - element.x;
    const offsetY = e.clientY - rect.top - element.y;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
    selectElement(elementId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElementId) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    updateElement(selectedElementId, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle('');
  };

  const handleResizeMouseDown = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
  };

  const exportToPNG = async () => {
    if (!canvasRef.current) return;
    
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `product-card-${productId || 'new'}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Ошибка экспорта:', error);
      alert('Ошибка при экспорте изображения');
    }
  };

  const selectedElement = elements.find(el => el.id === selectedElementId);

  return (
    <Layout
      title="Редактор карточек"
      subtitle={`Продукт: ${productId === 'new' ? 'Новый' : productId}`}
      hideSidebar={true}
    >
      <div className="h-[calc(100vh-120px)] flex flex-col bg-gray-100">
        {/* Панель инструментов */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Редактор карточек</h2>
            <div className="flex gap-2">
              <button 
                onClick={undo}
                disabled={historyIndex <= 0}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
              >
                ↩️ Отменить
              </button>
              <button 
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
              >
                ↪️ Повторить
              </button>
              <button 
                onClick={exportToPNG}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                📥 Экспорт PNG
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={addText}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              📝 Текст
            </button>
            <button 
              onClick={addButton}
              className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              🔘 Кнопка
            </button>
            <button 
              onClick={addImage}
              className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              🖼️ Изображение
            </button>
            <button 
              onClick={() => addShape('rect')}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ⬜ Прямоугольник
            </button>
            <button 
              onClick={() => addShape('circle')}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              ⭕ Круг
            </button>
            <button 
              onClick={() => addShape('triangle')}
              className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              🔺 Треугольник
            </button>
            {selectedElementId && (
              <>
                <button 
                  onClick={duplicateElement}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  📋 Дублировать
                </button>
                <button 
                  onClick={deleteSelected}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑️ Удалить
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Основная область */}
        <div className="flex-1 flex">
          {/* Левая панель - Слои */}
          <div className="w-64 bg-white border-r border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Слои</h3>
              <div className="space-y-2">
                {elements.map(element => (
                  <div 
                    key={element.id}
                    className={`p-2 rounded border cursor-pointer ${
                      element.selected 
                        ? 'bg-blue-100 border-blue-300' 
                        : 'bg-gray-50 border-gray-200'
                    } ${!element.visible ? 'opacity-50' : ''}`}
                    onClick={() => selectElement(element.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {element.type === 'text' ? '📝' : 
                         element.type === 'button' ? '🔘' : 
                         element.type === 'image' ? '🖼️' : '🔷'} {element.text || element.type}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleElementVisibility(element.id);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {element.visible ? '👁️' : '🙈'}
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {element.x.toFixed(0)}, {element.y.toFixed(0)}
                    </div>
                  </div>
                ))}
                {elements.length === 0 && (
                  <p className="text-gray-500 text-sm">Нет элементов</p>
                )}
              </div>
            </div>
          </div>

          {/* Центральная область - Canvas */}
          <div className="flex-1 p-4">
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg h-full flex items-center justify-center overflow-auto">
              <div 
                ref={canvasRef}
                className="bg-white shadow-lg relative"
                style={{
                  width: '900px',
                  height: '1200px',
                  minWidth: '900px',
                  minHeight: '1200px'
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {elements.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <p className="text-lg mb-2">Область редактирования</p>
                      <p className="text-sm">900 × 1200 пикселей</p>
                      <p className="text-sm mt-2">Добавьте элементы с помощью кнопок выше</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    {elements.map((element, index) => {
                      if (!element.visible) return null;
                      
                      return (
                        <div
                          key={element.id}
                          className={`absolute select-none cursor-move ${
                            element.selected ? 'ring-2 ring-blue-500' : ''
                          }`}
                          style={{
                            left: `${element.x}px`,
                            top: `${element.y}px`,
                            zIndex: index,
                            transform: `translate(-50%, -50%) rotate(${element.rotation || 0}deg)`,
                            opacity: element.opacity || 1
                          }}
                          onMouseDown={(e) => handleMouseDown(e, element.id)}
                        >
                          {element.type === 'text' ? (
                            <div 
                              className="px-2 py-1 rounded border"
                              style={{ 
                                color: element.color,
                                backgroundColor: element.backgroundColor,
                                fontSize: `${element.fontSize}px`,
                                fontFamily: element.fontFamily,
                                fontWeight: element.fontWeight,
                                boxShadow: element.shadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                              }}
                            >
                              {element.text}
                            </div>
                          ) : element.type === 'button' ? (
                            <div 
                              className="px-4 py-2 rounded border text-center"
                              style={{ 
                                color: element.color,
                                backgroundColor: element.backgroundColor,
                                fontSize: `${element.fontSize}px`,
                                fontFamily: element.fontFamily,
                                fontWeight: element.fontWeight,
                                width: `${element.width}px`,
                                height: `${element.height}px`,
                                borderRadius: `${element.borderRadius}px`,
                                boxShadow: element.shadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                              }}
                            >
                              {element.text}
                            </div>
                          ) : element.type === 'image' ? (
                            <img
                              src={element.imageUrl}
                              alt="Uploaded"
                              style={{
                                width: `${element.width}px`,
                                height: `${element.height}px`,
                                objectFit: 'cover',
                                borderRadius: '4px',
                                boxShadow: element.shadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                              }}
                            />
                          ) : element.type === 'rect' ? (
                            <div 
                              className="border border-gray-300"
                              style={{ 
                                backgroundColor: element.backgroundColor,
                                width: `${element.width}px`,
                                height: `${element.height}px`,
                                boxShadow: element.shadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                              }}
                            />
                          ) : element.type === 'circle' ? (
                            <div 
                              className="rounded-full border border-gray-300"
                              style={{ 
                                backgroundColor: element.backgroundColor,
                                width: `${element.width}px`,
                                height: `${element.height}px`,
                                boxShadow: element.shadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                              }}
                            />
                          ) : element.type === 'triangle' ? (
                            <div 
                              className="w-0 h-0"
                              style={{
                                borderLeft: '12px solid transparent',
                                borderRight: '12px solid transparent',
                                borderBottom: `24px solid ${element.backgroundColor}`,
                                filter: element.shadow ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none'
                              }}
                            />
                          ) : null}

                          {/* Рамка выделения с точками изменения размера */}
                          {element.selected && (
                            <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none">
                              <div 
                                className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize -top-1.5 -left-1.5"
                                onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
                              />
                              <div 
                                className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize -top-1.5 -right-1.5"
                                onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
                              />
                              <div 
                                className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize -bottom-1.5 -left-1.5"
                                onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
                              />
                              <div 
                                className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-se-resize -bottom-1.5 -right-1.5"
                                onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Правая панель - Свойства */}
          <div className="w-80 bg-white border-l border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Свойства</h3>
              {selectedElement ? (
                <div className="space-y-4">
                  {selectedElement.type === 'text' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Текст
                      </label>
                      <input
                        type="text"
                        value={selectedElement.text || ''}
                        onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  
                  {(selectedElement.type === 'text' || selectedElement.type === 'button') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Размер шрифта
                        </label>
                        <input
                          type="number"
                          value={selectedElement.fontSize || 16}
                          onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Цвет текста
                        </label>
                        <input
                          type="color"
                          value={selectedElement.color || '#000000'}
                          onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                          className="w-full h-10 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Цвет фона
                        </label>
                        <input
                          type="color"
                          value={selectedElement.backgroundColor || '#ffffff'}
                          onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
                          className="w-full h-10 border border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Поворот (градусы)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={selectedElement.rotation || 0}
                      onChange={(e) => updateElement(selectedElement.id, { rotation: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-500">
                      {selectedElement.rotation || 0}°
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Прозрачность
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={selectedElement.opacity || 1}
                      onChange={(e) => updateElement(selectedElement.id, { opacity: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-500">
                      {Math.round((selectedElement.opacity || 1) * 100)}%
                    </span>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedElement.shadow || false}
                        onChange={(e) => updateElement(selectedElement.id, { shadow: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Тень</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedElement.visible !== false}
                        onChange={(e) => updateElement(selectedElement.id, { visible: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Видимый</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        X
                      </label>
                      <input
                        type="number"
                        value={Math.round(selectedElement.x)}
                        onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Y
                      </label>
                      <input
                        type="number"
                        value={Math.round(selectedElement.y)}
                        onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">
                  <p>Выберите элемент для редактирования свойств</p>
                  <p className="text-sm mt-2">
                    Всего элементов: {elements.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Статусная строка */}
        <div className="bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <span>Слоев: {elements.length}</span>
            <span>Размер: 900 × 1200</span>
            <span>Масштаб: 100%</span>
            <span>Сетка: Выкл</span>
            <span>Выбрано: {selectedElementId ? 'Да' : 'Нет'}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditorPage; 