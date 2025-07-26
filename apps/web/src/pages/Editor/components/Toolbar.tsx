import React from 'react';
import { 
  Type, 
  Image, 
  Square, 
  Undo, 
  Redo, 
  Save, 
  Download,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Trash2
} from 'lucide-react';
import Button from '../../../components/ui/Button';
import type { ToolbarButton } from '../types/canvas.types';

interface ToolbarProps {
  onAddText: () => void;
  onAddImage: () => void;
  onAddShape: (shapeType: 'rect' | 'circle' | 'triangle') => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
  onDelete: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleGrid: () => void;
  zoom: number;
  gridVisible: boolean;
  canUndo: boolean;
  canRedo: boolean;
  hasSelection: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAddText,
  onAddImage,
  onAddShape,
  onUndo,
  onRedo,
  onSave,
  onExport,
  onDelete,
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  zoom,
  gridVisible,
  canUndo,
  canRedo,
  hasSelection,
}) => {
  const toolbarButtons: ToolbarButton[] = [
    {
      id: 'text',
      icon: 'T',
      tooltip: 'Добавить текст',
      action: 'addText',
    },
    {
      id: 'image',
      icon: '🖼',
      tooltip: 'Добавить изображение',
      action: 'addImage',
    },
    {
      id: 'shape',
      icon: '⬜',
      tooltip: 'Добавить фигуру',
      action: 'addShape',
    },
  ];

  const actionButtons: ToolbarButton[] = [
    {
      id: 'undo',
      icon: '↶',
      tooltip: 'Отменить',
      action: 'undo',
      disabled: !canUndo,
    },
    {
      id: 'redo',
      icon: '↷',
      tooltip: 'Повторить',
      action: 'redo',
      disabled: !canRedo,
    },
    {
      id: 'save',
      icon: '💾',
      tooltip: 'Сохранить',
      action: 'save',
    },
    {
      id: 'export',
      icon: '📤',
      tooltip: 'Экспорт PNG',
      action: 'export',
    },
  ];

  const handleAction = (action: string) => {
    switch (action) {
      case 'addText':
        onAddText();
        break;
      case 'addImage':
        onAddImage();
        break;
      case 'addShape':
        onAddShape('rect');
        break;
      case 'undo':
        onUndo();
        break;
      case 'redo':
        onRedo();
        break;
      case 'save':
        onSave();
        break;
      case 'export':
        onExport();
        break;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      {/* Левая группа - инструменты */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Button
            onClick={onAddText}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Добавить текст"
          >
            <Type size={16} />
          </Button>
          
          <Button
            onClick={onAddImage}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Добавить изображение"
          >
            <Image size={16} />
          </Button>
          
          <div className="relative group">
            <Button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              title="Добавить фигуру"
            >
              <Square size={16} />
            </Button>
            
            {/* Выпадающее меню фигур */}
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-1">
                <button
                  onClick={() => onAddShape('rect')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <div className="w-4 h-4 bg-red-400 border border-gray-300"></div>
                  Прямоугольник
                </button>
                <button
                  onClick={() => onAddShape('circle')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <div className="w-4 h-4 bg-blue-400 border border-gray-300 rounded-full"></div>
                  Круг
                </button>
                <button
                  onClick={() => onAddShape('triangle')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <div className="w-4 h-4 bg-green-400 border border-gray-300 transform rotate-45"></div>
                  Треугольник
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Управление зумом */}
        <div className="flex items-center space-x-1">
          <Button
            onClick={onZoomOut}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Уменьшить"
          >
            <ZoomOut size={16} />
          </Button>
          
          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          
          <Button
            onClick={onZoomIn}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Увеличить"
          >
            <ZoomIn size={16} />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Переключение сетки */}
        <Button
          onClick={onToggleGrid}
          className={`p-2 rounded ${gridVisible ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
          title="Показать/скрыть сетку"
        >
          <Grid3X3 size={16} />
        </Button>
      </div>

      {/* Правая группа - действия */}
      <div className="flex items-center space-x-2">
        <Button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Отменить"
        >
          <Undo size={16} />
        </Button>
        
        <Button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Повторить"
        >
          <Redo size={16} />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        <Button
          onClick={onDelete}
          disabled={!hasSelection}
          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Удалить выбранное"
        >
          <Trash2 size={16} />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        <Button
          onClick={onSave}
          className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded text-sm"
          title="Сохранить"
        >
          <Save size={16} className="mr-1" />
          Сохранить
        </Button>
        
        <Button
          onClick={onExport}
          className="px-3 py-1 bg-green-500 text-white hover:bg-green-600 rounded text-sm"
          title="Экспорт PNG"
        >
          <Download size={16} className="mr-1" />
          Экспорт
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Toolbar); 