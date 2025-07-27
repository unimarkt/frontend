import React, { useState } from 'react';

interface AutoLayoutProps {
  onApplyLayout: (layout: AutoLayoutSettings) => void;
  onApplyConstraints: (constraints: ConstraintSettings) => void;
}

interface AutoLayoutSettings {
  direction: 'horizontal' | 'vertical';
  spacing: number;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  alignment: 'start' | 'center' | 'end' | 'space-between';
  wrap: boolean;
}

interface ConstraintSettings {
  horizontal: 'left' | 'center' | 'right' | 'scale';
  vertical: 'top' | 'center' | 'bottom' | 'scale';
}

const AutoLayout: React.FC<AutoLayoutProps> = ({ onApplyLayout, onApplyConstraints }) => {
  const [layoutSettings, setLayoutSettings] = useState<AutoLayoutSettings>({
    direction: 'horizontal',
    spacing: 10,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    alignment: 'start',
    wrap: false,
  });

  const [constraintSettings, setConstraintSettings] = useState<ConstraintSettings>({
    horizontal: 'left',
    vertical: 'top',
  });

  const handleLayoutChange = (key: keyof AutoLayoutSettings, value: any) => {
    const newSettings = { ...layoutSettings, [key]: value };
    setLayoutSettings(newSettings);
    onApplyLayout(newSettings);
  };

  const handleConstraintChange = (axis: 'horizontal' | 'vertical', value: string) => {
    const newSettings = { ...constraintSettings, [axis]: value };
    setConstraintSettings(newSettings);
    onApplyConstraints(newSettings);
  };

  return (
    <div className="space-y-6">
      {/* Автолейаут */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Автолейаут</h3>
        
        <div className="space-y-4">
          {/* Направление */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Направление
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleLayoutChange('direction', 'horizontal')}
                className={`px-3 py-2 rounded border transition-colors ${
                  layoutSettings.direction === 'horizontal'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ↔️ Горизонтально
              </button>
              <button
                onClick={() => handleLayoutChange('direction', 'vertical')}
                className={`px-3 py-2 rounded border transition-colors ${
                  layoutSettings.direction === 'vertical'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ↕️ Вертикально
              </button>
            </div>
          </div>

          {/* Интервал */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Интервал: {layoutSettings.spacing}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={layoutSettings.spacing}
              onChange={(e) => handleLayoutChange('spacing', Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Выравнивание */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выравнивание
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleLayoutChange('alignment', 'start')}
                className={`px-3 py-2 rounded border transition-colors ${
                  layoutSettings.alignment === 'start'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Начало
              </button>
              <button
                onClick={() => handleLayoutChange('alignment', 'center')}
                className={`px-3 py-2 rounded border transition-colors ${
                  layoutSettings.alignment === 'center'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Центр
              </button>
              <button
                onClick={() => handleLayoutChange('alignment', 'end')}
                className={`px-3 py-2 rounded border transition-colors ${
                  layoutSettings.alignment === 'end'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Конец
              </button>
              <button
                onClick={() => handleLayoutChange('alignment', 'space-between')}
                className={`px-3 py-2 rounded border transition-colors ${
                  layoutSettings.alignment === 'space-between'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Равномерно
              </button>
            </div>
          </div>

          {/* Перенос */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={layoutSettings.wrap}
                onChange={(e) => handleLayoutChange('wrap', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Перенос строк
              </span>
            </label>
          </div>

          {/* Отступы */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Отступы
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Сверху</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={layoutSettings.padding.top}
                  onChange={(e) => handleLayoutChange('padding', {
                    ...layoutSettings.padding,
                    top: Number(e.target.value)
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Справа</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={layoutSettings.padding.right}
                  onChange={(e) => handleLayoutChange('padding', {
                    ...layoutSettings.padding,
                    right: Number(e.target.value)
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Снизу</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={layoutSettings.padding.bottom}
                  onChange={(e) => handleLayoutChange('padding', {
                    ...layoutSettings.padding,
                    bottom: Number(e.target.value)
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Слева</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={layoutSettings.padding.left}
                  onChange={(e) => handleLayoutChange('padding', {
                    ...layoutSettings.padding,
                    left: Number(e.target.value)
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Привязки */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Привязки</h3>
        
        <div className="space-y-4">
          {/* Горизонтальные привязки */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Горизонтальные привязки
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleConstraintChange('horizontal', 'left')}
                className={`px-3 py-2 rounded border transition-colors ${
                  constraintSettings.horizontal === 'left'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Левая
              </button>
              <button
                onClick={() => handleConstraintChange('horizontal', 'center')}
                className={`px-3 py-2 rounded border transition-colors ${
                  constraintSettings.horizontal === 'center'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Центр
              </button>
              <button
                onClick={() => handleConstraintChange('horizontal', 'right')}
                className={`px-3 py-2 rounded border transition-colors ${
                  constraintSettings.horizontal === 'right'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Правая
              </button>
              <button
                onClick={() => handleConstraintChange('horizontal', 'scale')}
                className={`px-3 py-2 rounded border transition-colors ${
                  constraintSettings.horizontal === 'scale'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Масштаб
              </button>
            </div>
          </div>

          {/* Вертикальные привязки */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Вертикальные привязки
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleConstraintChange('vertical', 'top')}
                className={`px-3 py-2 rounded border transition-colors ${
                  constraintSettings.vertical === 'top'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Верхняя
              </button>
              <button
                onClick={() => handleConstraintChange('vertical', 'center')}
                className={`px-3 py-2 rounded border transition-colors ${
                  constraintSettings.vertical === 'center'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Центр
              </button>
              <button
                onClick={() => handleConstraintChange('vertical', 'bottom')}
                className={`px-3 py-2 rounded border transition-colors ${
                  constraintSettings.vertical === 'bottom'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Нижняя
              </button>
              <button
                onClick={() => handleConstraintChange('vertical', 'scale')}
                className={`px-3 py-2 rounded border transition-colors ${
                  constraintSettings.vertical === 'scale'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Масштаб
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoLayout; 