import React, { useState } from 'react';
import type { TextProperties } from '../types/canvas.types';

interface TextPropertiesProps {
  onChange: (properties: TextProperties) => void;
  initialProperties?: Partial<TextProperties>;
}

const TextProperties: React.FC<TextPropertiesProps> = ({
  onChange,
  initialProperties = {}
}) => {
  const [properties, setProperties] = useState<TextProperties>({
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#000000',
    lineHeight: 1.2,
    letterSpacing: 0,
    ...initialProperties
  });

  const handleChange = (key: keyof TextProperties, value: any) => {
    const newProperties = { ...properties, [key]: value };
    setProperties(newProperties);
    onChange(newProperties);
  };

  const fontFamilies = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Verdana',
    'Courier New',
    'Impact',
    'Comic Sans MS'
  ];

  const fontWeights = [
    { value: 'normal', label: 'Обычный' },
    { value: 'bold', label: 'Жирный' },
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '300', label: '300' },
    { value: '400', label: '400' },
    { value: '500', label: '500' },
    { value: '600', label: '600' },
    { value: '700', label: '700' },
    { value: '800', label: '800' },
    { value: '900', label: '900' }
  ];

  const textAligns = [
    { value: 'left', label: 'По левому краю' },
    { value: 'center', label: 'По центру' },
    { value: 'right', label: 'По правому краю' },
    { value: 'justify', label: 'По ширине' }
  ];

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-3">Свойства текста</h4>
      <div className="space-y-3">
        {/* Шрифт */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Шрифт
          </label>
          <select
            value={properties.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {fontFamilies.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        {/* Размер шрифта */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Размер шрифта
          </label>
          <input
            type="number"
            min="8"
            max="72"
            value={properties.fontSize}
            onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Начертание */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Начертание
            </label>
            <select
              value={properties.fontWeight}
              onChange={(e) => handleChange('fontWeight', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {fontWeights.map(weight => (
                <option key={weight.value} value={weight.value}>{weight.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Стиль
            </label>
            <select
              value={properties.fontStyle}
              onChange={(e) => handleChange('fontStyle', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="normal">Обычный</option>
              <option value="italic">Курсив</option>
            </select>
          </div>
        </div>

        {/* Выравнивание */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Выравнивание
          </label>
          <select
            value={properties.textAlign}
            onChange={(e) => handleChange('textAlign', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {textAligns.map(align => (
              <option key={align.value} value={align.value}>{align.label}</option>
            ))}
          </select>
        </div>

        {/* Цвет текста */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Цвет текста
          </label>
          <input
            type="color"
            value={properties.color}
            onChange={(e) => handleChange('color', e.target.value)}
            className="w-full h-8 border border-gray-300 rounded"
          />
        </div>

        {/* Межстрочный интервал */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Межстрочный интервал
          </label>
          <input
            type="range"
            min="0.8"
            max="3"
            step="0.1"
            value={properties.lineHeight}
            onChange={(e) => handleChange('lineHeight', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {properties.lineHeight.toFixed(1)}
          </div>
        </div>

        {/* Межбуквенный интервал */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Межбуквенный интервал
          </label>
          <input
            type="range"
            min="-2"
            max="10"
            step="0.5"
            value={properties.letterSpacing}
            onChange={(e) => handleChange('letterSpacing', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {properties.letterSpacing}px
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TextProperties); 