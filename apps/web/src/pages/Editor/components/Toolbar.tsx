import React from 'react';
import { 
  Type, 
  Image, 
  Square, 
  Circle,
  Triangle,
  Undo, 
  Redo, 
  Save, 
  Download,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Trash2,
  RotateCcw,
  RotateCw
} from 'lucide-react';
import Button from '../../../components/ui/Button';

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
  onRotateLeft: () => void;
  onRotateRight: () => void;
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
  onRotateLeft,
  onRotateRight,
  zoom,
  gridVisible,
  canUndo,
  canRedo,
  hasSelection,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      {/* Левая группа - Инструменты */}
      <div className="flex items-center space-x-2">
        {/* Добавление элементов */}
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
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
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1">
                <button
                  onClick={() => onAddShape('rect')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <Square size={14} />
                  Прямоугольник
                </button>
                <button
                  onClick={() => onAddShape('circle')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <Circle size={14} />
                  Круг
                </button>
                <button
                  onClick={() => onAddShape('triangle')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <Triangle size={14} />
                  Треугольник
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* История */}
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
          <Button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-2 rounded ${canUndo ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-300'}`}
            title="Отменить"
          >
            <Undo size={16} />
          </Button>
          
          <Button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-2 rounded ${canRedo ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-300'}`}
            title="Повторить"
          >
            <Redo size={16} />
          </Button>
        </div>

        {/* Поворот */}
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
          <Button
            onClick={onRotateLeft}
            disabled={!hasSelection}
            className={`p-2 rounded ${hasSelection ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-300'}`}
            title="Повернуть влево"
          >
            <RotateCcw size={16} />
          </Button>
          
          <Button
            onClick={onRotateRight}
            disabled={!hasSelection}
            className={`p-2 rounded ${hasSelection ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-300'}`}
            title="Повернуть вправо"
          >
            <RotateCw size={16} />
          </Button>
        </div>

        {/* Удаление */}
        <Button
          onClick={onDelete}
          disabled={!hasSelection}
          className={`p-2 rounded ${hasSelection ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-gray-300'}`}
          title="Удалить"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      {/* Центральная группа - Масштаб и сетка */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Button
            onClick={onZoomOut}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Уменьшить"
          >
            <ZoomOut size={16} />
          </Button>
          
          <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
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

        <Button
          onClick={onToggleGrid}
          className={`p-2 rounded ${gridVisible ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
          title="Сетка"
        >
          <Grid3X3 size={16} />
        </Button>
      </div>

      {/* Правая группа - Сохранение и экспорт */}
      <div className="flex items-center space-x-2">
        <Button
          onClick={onSave}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
          title="Сохранить"
        >
          <Save size={16} />
        </Button>
        
        <Button
          onClick={onExport}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
          title="Экспорт PNG"
        >
          <Download size={16} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Toolbar); 