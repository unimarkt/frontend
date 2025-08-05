// Inspired by craft.js Toolbar: https://github.com/prevwong/craft.js/blob/master/examples/playground/components/Editor/Toolbar.js
// and react-page Toolbar: https://github.com/react-page/react-page/blob/main/packages/editor/src/ui/toolbar/Toolbar.tsx

import React from 'react';
import type { Node } from '../types/canvas.types';

interface ToolbarProps {
  selectedNode: Node | null;
  zoom: number;
  showGrid: boolean;
  onZoomChange: (zoom: number) => void;
  onGridToggle: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onExport: (format?: string, options?: any) => void;
  onImport: () => void;
  canUndo: boolean;
  canRedo: boolean;
  canDelete: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  selectedNode,
  zoom,
  showGrid,
  onZoomChange,
  onGridToggle,
  onUndo,
  onRedo,
  onDelete,
  onDuplicate,
  onExport,
  onImport,
  canUndo,
  canRedo,
  canDelete,
}) => {
  const zoomOptions = [25, 50, 75, 100, 125, 150, 200, 300, 400];

  const handleZoomChange = (newZoom: number) => {
    console.log('Zoom change:', newZoom);
    onZoomChange(newZoom);
  };

  const handleGridToggle = () => {
    console.log('Grid toggle clicked in Toolbar');
    onGridToggle();
  };

  const handleUndo = () => {
    console.log('Undo');
    onUndo();
  };

  const handleRedo = () => {
    console.log('Redo');
    onRedo();
  };

  const handleDelete = () => {
    console.log('Delete');
    onDelete();
  };

  const handleDuplicate = () => {
    console.log('Duplicate');
    onDuplicate();
  };

  const handleExport = () => {
    console.log('Export');
    onExport();
  };

  const handleImport = () => {
    console.log('Import');
    onImport();
  };

  return (
    <div className="toolbar bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Левая часть - инструменты */}
        <div className="flex items-center space-x-6">
          {/* Инструменты вставки */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Вставить">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Макет">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Текст">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Вектор">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="CMS">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </button>
          </div>

                     

          {/* Элемент управления */}
          {selectedNode && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Выбран:</span>
              <span className="font-medium text-gray-900">{selectedNode.displayName || selectedNode.type}</span>
            </div>
          )}
        </div>

        {/* Центральная часть - название */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-900">Конструктор карточек</h1>
        </div>

        {/* Правая часть - действия */}
        <div className="flex items-center space-x-4">
          {/* История */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className={`p-2 rounded-md transition-colors ${
                canUndo
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title="Отменить"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo}
              className={`p-2 rounded-md transition-colors ${
                canRedo
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title="Повторить"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
            </button>
          </div>

          {/* Масштаб */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleZoomChange(Math.max(25, zoom - 25))}
              className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Уменьшить"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <select
              value={zoom}
              onChange={(e) => handleZoomChange(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {zoomOptions.map(option => (
                <option key={option} value={option}>
                  {option}%
                </option>
              ))}
            </select>
            <button
              onClick={() => handleZoomChange(Math.min(400, zoom + 25))}
              className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Увеличить"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Сетка */}
          <button
            onClick={handleGridToggle}
            className={`p-2 rounded-md transition-colors ${
              showGrid
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Сетка"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          {/* Разделитель */}
          <div className="w-px h-6 bg-gray-300"></div>

          {/* Действия с элементами */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleDuplicate}
              disabled={!selectedNode}
              className={`p-2 rounded-md transition-colors ${
                selectedNode
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title="Дублировать"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              disabled={!canDelete}
              className={`p-2 rounded-md transition-colors ${
                canDelete
                  ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title="Удалить"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Разделитель */}
          <div className="w-px h-6 bg-gray-300"></div>

          {/* Импорт/Экспорт */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleImport}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              Импорт
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Экспорт
            </button>
          </div>

          {/* Дополнительные действия */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Пользователь">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Настройки">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 