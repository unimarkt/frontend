import React, { useState } from 'react';
import type { TextLayer } from '../types/editor.types';

interface RichTextEditorProps {
  layer: TextLayer;
  onUpdate: (updates: Partial<TextLayer>) => void;
}

// Предустановленные стили
const PRESET_STYLES = {
  heading: {
    name: 'Заголовок',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    lineHeight: 1.2,
  },
  subheading: {
    name: 'Подзаголовок',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Arial',
    lineHeight: 1.3,
  },
  body: {
    name: 'Основной текст',
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    lineHeight: 1.5,
  },
  caption: {
    name: 'Подпись',
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    lineHeight: 1.4,
  },
};

// Доступные шрифты
const FONT_FAMILIES = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({ layer, onUpdate }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const applyPresetStyle = (styleKey: keyof typeof PRESET_STYLES) => {
    const style = PRESET_STYLES[styleKey];
    onUpdate({
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      fontFamily: style.fontFamily,
      lineHeight: style.lineHeight,
    });
  };

  const toggleFormat = (format: 'bold' | 'italic' | 'underline') => {
    const currentWeight = layer.fontWeight;
    let newWeight = currentWeight;

    switch (format) {
      case 'bold':
        newWeight = currentWeight === 'bold' ? 'normal' : 'bold';
        break;
      case 'italic':
        // Для простоты используем fontWeight, в реальном приложении нужен fontStyle
        newWeight = currentWeight === 'italic' ? 'normal' : 'italic';
        break;
      case 'underline':
        // Добавим подчеркивание через textDecoration
        onUpdate({ textDecoration: layer.textDecoration === 'underline' ? 'none' : 'underline' });
        return;
    }

    onUpdate({ fontWeight: newWeight });
  };

  return (
    <div className="space-y-4">
      {/* Редактирование текста */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Текст
        </label>
        <textarea
          value={layer.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Введите текст..."
        />
      </div>

      {/* Предустановленные стили */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Стили
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(PRESET_STYLES).map(([key, style]) => (
            <button
              key={key}
              onClick={() => applyPresetStyle(key as keyof typeof PRESET_STYLES)}
              className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      {/* Форматирование */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Форматирование
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => toggleFormat('bold')}
            className={`px-3 py-2 border rounded transition-colors ${
              layer.fontWeight === 'bold'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            title="Жирный (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => toggleFormat('italic')}
            className={`px-3 py-2 border rounded transition-colors ${
              layer.fontWeight === 'italic'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            title="Курсив (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => toggleFormat('underline')}
            className={`px-3 py-2 border rounded transition-colors ${
              layer.textDecoration === 'underline'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            title="Подчеркнутый (Ctrl+U)"
          >
            <u>U</u>
          </button>
        </div>
      </div>

      {/* Выравнивание */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Выравнивание
        </label>
        <div className="flex gap-2">
          {[
            { value: 'left', icon: '⬅️', label: 'По левому краю' },
            { value: 'center', icon: '↔️', label: 'По центру' },
            { value: 'right', icon: '➡️', label: 'По правому краю' },
          ].map((align) => (
            <button
              key={align.value}
              onClick={() => onUpdate({ textAlign: align.value as 'left' | 'center' | 'right' })}
              className={`px-3 py-2 border rounded transition-colors ${
                layer.textAlign === align.value
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              title={align.label}
            >
              {align.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Шрифт */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Шрифт
        </label>
        <select
          value={layer.fontFamily}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {FONT_FAMILIES.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      {/* Размер шрифта */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Размер шрифта: {layer.fontSize}px
        </label>
        <input
          type="range"
          min="8"
          max="72"
          value={layer.fontSize}
          onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>8px</span>
          <span>72px</span>
        </div>
      </div>

      {/* Цвет текста */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Цвет текста
        </label>
        <div className="flex gap-2">
          <div
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            style={{ backgroundColor: layer.fontColor }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />
          <input
            type="color"
            value={layer.fontColor}
            onChange={(e) => onUpdate({ fontColor: e.target.value })}
            className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Межстрочный интервал */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Межстрочный интервал: {layer.lineHeight}
        </label>
        <input
          type="range"
          min="0.8"
          max="3"
          step="0.1"
          value={layer.lineHeight}
          onChange={(e) => onUpdate({ lineHeight: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0.8</span>
          <span>3.0</span>
        </div>
      </div>

      {/* Межбуквенный интервал */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Межбуквенный интервал: {layer.letterSpacing}px
        </label>
        <input
          type="range"
          min="-2"
          max="10"
          step="0.5"
          value={layer.letterSpacing}
          onChange={(e) => onUpdate({ letterSpacing: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>-2px</span>
          <span>10px</span>
        </div>
      </div>

      {/* Тень текста */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Тень текста
        </label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="textShadow"
              checked={layer.textShadow !== 'none'}
              onChange={(e) => onUpdate({ 
                textShadow: e.target.checked ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none' 
              })}
              className="rounded"
            />
            <label htmlFor="textShadow" className="text-sm text-gray-600">
              Включить тень
            </label>
          </div>
          {layer.textShadow !== 'none' && (
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Смещение X</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={layer.textShadowX || 2}
                  onChange={(e) => onUpdate({ textShadowX: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Смещение Y</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={layer.textShadowY || 2}
                  onChange={(e) => onUpdate({ textShadowY: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Размытие</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={layer.textShadowBlur || 4}
                  onChange={(e) => onUpdate({ textShadowBlur: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor; 