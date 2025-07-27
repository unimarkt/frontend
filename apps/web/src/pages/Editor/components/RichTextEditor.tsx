import React, { useState } from 'react';
import type { TextLayer } from '../types/editor.types';
import FontManager from './FontManager';
import AutoLayout from './AutoLayout';

interface RichTextEditorProps {
  layer: TextLayer;
  onUpdate: (updates: Partial<TextLayer>) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ layer, onUpdate }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'fonts' | 'layout'>('text');

  const PRESET_STYLES = {
    heading: { fontSize: 24, fontWeight: 'bold' as const, lineHeight: 1.2 },
    subheading: { fontSize: 18, fontWeight: '600' as const, lineHeight: 1.3 },
    body: { fontSize: 14, fontWeight: 'normal' as const, lineHeight: 1.5 },
    caption: { fontSize: 12, fontWeight: 'normal' as const, lineHeight: 1.4 },
  };

  const FONT_FAMILIES = [
    'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana',
    'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Montserrat', 'Inter'
  ];

  const applyPresetStyle = (styleName: keyof typeof PRESET_STYLES) => {
    const style = PRESET_STYLES[styleName];
    onUpdate(style);
  };

  const toggleFormat = (property: keyof TextLayer, value: any) => {
    onUpdate({ [property]: value });
  };

  return (
    <div className="space-y-4">
      {/* Табы */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('text')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'text'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Текст
        </button>
        <button
          onClick={() => setActiveTab('fonts')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'fonts'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Шрифты
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'layout'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Макет
        </button>
      </div>

      {/* Контент табов */}
      {activeTab === 'text' && (
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

          {/* Размер шрифта */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Размер: {layer.fontSize}px
            </label>
            <input
              type="range"
              min="8"
              max="72"
              value={layer.fontSize}
              onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Цвет текста */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Цвет текста
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={layer.fontColor}
                onChange={(e) => onUpdate({ fontColor: e.target.value })}
                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={layer.fontColor}
                onChange={(e) => onUpdate({ fontColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Выравнивание */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Выравнивание
            </label>
            <div className="flex gap-1">
              <button
                onClick={() => onUpdate({ textAlign: 'left' })}
                className={`px-3 py-2 border rounded transition-colors ${
                  layer.textAlign === 'left'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ⬅️
              </button>
              <button
                onClick={() => onUpdate({ textAlign: 'center' })}
                className={`px-3 py-2 border rounded transition-colors ${
                  layer.textAlign === 'center'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ↔️
              </button>
              <button
                onClick={() => onUpdate({ textAlign: 'right' })}
                className={`px-3 py-2 border rounded transition-colors ${
                  layer.textAlign === 'right'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ➡️
              </button>
            </div>
          </div>

          {/* Межстрочный интервал */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Межстрочный интервал: {layer.lineHeight}
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={layer.lineHeight}
              onChange={(e) => onUpdate({ lineHeight: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Межбуквенный интервал */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Межбуквенный интервал: {layer.letterSpacing}px
            </label>
            <input
              type="range"
              min="-5"
              max="20"
              value={layer.letterSpacing}
              onChange={(e) => onUpdate({ letterSpacing: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Подчеркивание */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={layer.textDecoration === 'underline'}
                onChange={(e) => onUpdate({ 
                  textDecoration: e.target.checked ? 'underline' : 'none' 
                })}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Подчеркивание
              </span>
            </label>
          </div>

          {/* Предустановленные стили */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Предустановленные стили
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => applyPresetStyle('heading')}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Заголовок
              </button>
              <button
                onClick={() => applyPresetStyle('subheading')}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Подзаголовок
              </button>
              <button
                onClick={() => applyPresetStyle('body')}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Основной текст
              </button>
              <button
                onClick={() => applyPresetStyle('caption')}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Подпись
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fonts' && (
        <FontManager
          currentFont={layer.fontFamily}
          onFontChange={(font) => onUpdate({ fontFamily: font })}
        />
      )}

      {activeTab === 'layout' && (
        <AutoLayout
          onApplyLayout={(layout) => {
            // Применяем автолейаут к текстовому слою
            console.log('Applying auto layout:', layout);
            // TODO: Реализовать применение автолейаута
          }}
          onApplyConstraints={(constraints) => {
            // Применяем привязки к текстовому слою
            console.log('Applying constraints:', constraints);
            // TODO: Реализовать применение привязок
          }}
        />
      )}
    </div>
  );
};

export default RichTextEditor; 