import React, { useState, useCallback } from 'react';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';

interface TextPropertiesProps {
  properties: any;
  onChange: (properties: any) => void;
}

const TextProperties: React.FC<TextPropertiesProps> = ({ properties, onChange }) => {
  const [text, setText] = useState(properties.text || 'Текст');

  const fontFamilies = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Courier New', label: 'Courier New' },
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
    { value: '900', label: '900' },
  ];

  const textAligns = [
    { value: 'left', label: 'По левому краю' },
    { value: 'center', label: 'По центру' },
    { value: 'right', label: 'По правому краю' },
    { value: 'justify', label: 'По ширине' },
  ];

  const handleChange = useCallback((key: string, value: any) => {
    const newProperties = { ...properties, [key]: value };
    onChange(newProperties);
  }, [properties, onChange]);

  const handleTextChange = useCallback((value: string) => {
    setText(value);
    handleChange('text', value);
  }, [handleChange]);

  return (
    <div className="p-4 space-y-6">
      {/* Текст */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Текст
        </label>
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Введите текст..."
        />
      </div>

      {/* Шрифт */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Шрифт
        </label>
        <Select
          value={properties.fontFamily || 'Arial'}
          onChange={(value) => handleChange('fontFamily', value)}
          options={fontFamilies}
          className="w-full"
        />
      </div>

      {/* Размер шрифта */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Размер шрифта
        </label>
        <Input
          type="number"
          value={properties.fontSize || 20}
          onChange={value => handleChange('fontSize', parseInt(value))}
          min={8}
          max={200}
          className="w-full"
        />
      </div>

      {/* Жирность шрифта */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Жирность
        </label>
        <Select
          value={properties.fontWeight || 'normal'}
          onChange={(value) => handleChange('fontWeight', value)}
          options={fontWeights}
          className="w-full"
        />
      </div>

      {/* Выравнивание */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Выравнивание
        </label>
        <Select
          value={properties.textAlign || 'left'}
          onChange={(value) => handleChange('textAlign', value)}
          options={textAligns}
          className="w-full"
        />
      </div>

      {/* Цвет */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Цвет
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={properties.fill || '#000000'}
            onChange={(e) => handleChange('fill', e.target.value)}
            className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <Input
            value={properties.fill || '#000000'}
            onChange={(value) => handleChange('fill', value)}
            className="flex-1"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Межстрочный интервал */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Межстрочный интервал
        </label>
        <Input
          type="number"
          value={properties.lineHeight || 1.2}
          onChange={value => handleChange('lineHeight', parseFloat(value))}
          min={0.5}
          max={3}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Межбуквенный интервал */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Межбуквенный интервал
        </label>
        <Input
          type="number"
          value={properties.charSpacing || 0}
          onChange={value => handleChange('charSpacing', parseInt(value))}
          min={-10}
          max={50}
          className="w-full"
        />
      </div>

      {/* Позиция */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            X
          </label>
          <Input
            type="number"
            value={Math.round(properties.left || 0)}
            onChange={value => handleChange('left', parseInt(value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Y
          </label>
          <Input
            type="number"
            value={Math.round(properties.top || 0)}
            onChange={value => handleChange('top', parseInt(value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Прозрачность */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Прозрачность
        </label>
        <Input
          type="number"
          value={Math.round((properties.opacity || 1) * 100)}
          onChange={value => handleChange('opacity', parseInt(value) / 100)}
          min={0}
          max={100}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default React.memo(TextProperties); 