import React from 'react';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';

interface TextPropertiesProps {
  properties: {
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: number;
    color?: string;
    textAlign?: string;
    lineHeight?: number;
    letterSpacing?: number;
  };
  onUpdate: (updates: Partial<TextPropertiesProps['properties']>) => void;
}

const TextProperties: React.FC<TextPropertiesProps> = ({
  properties,
  onUpdate
}) => {
  const fontFamilies = [
    { value: 'Manrope', label: 'Manrope' },
    { value: 'Inter', label: 'Inter' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' }
  ];

  const fontWeights = [
    { value: '300', label: 'Light (300)' },
    { value: '400', label: 'Regular (400)' },
    { value: '500', label: 'Medium (500)' },
    { value: '600', label: 'SemiBold (600)' },
    { value: '700', label: 'Bold (700)' },
    { value: '800', label: 'ExtraBold (800)' }
  ];

  const textAligns = [
    { value: 'left', label: 'По левому краю' },
    { value: 'center', label: 'По центру' },
    { value: 'right', label: 'По правому краю' },
    { value: 'justify', label: 'По ширине' }
  ];

  return (
    <div className="px-4 py-3 border-t border-[#DFE1E7]">
      <h4 className="text-[12px] font-medium text-black mb-3">Свойства текста</h4>
      
      {/* Текст */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Текст</label>
        <textarea
          value={properties.text || ''}
          onChange={(e) => onUpdate({ text: e.target.value })}
          className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent resize-none"
          rows={3}
          placeholder="Введите текст..."
        />
      </div>

      {/* Размер шрифта */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Размер шрифта</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="8"
            max="200"
            value={properties.fontSize || 16}
            onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) || 16 })}
            className="flex-1 px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
          />
          <span className="text-[12px] text-[#6F6F6F]">px</span>
        </div>
      </div>

      {/* Семейство шрифтов */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Шрифт</label>
        <select
          value={properties.fontFamily || 'Manrope'}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
        >
          {fontFamilies.map(font => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      {/* Вес шрифта */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Вес шрифта</label>
        <select
          value={properties.fontWeight?.toString() || '400'}
          onChange={(e) => onUpdate({ fontWeight: parseInt(e.target.value) || 400 })}
          className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
        >
          {fontWeights.map(weight => (
            <option key={weight.value} value={weight.value}>
              {weight.label}
            </option>
          ))}
        </select>
      </div>

      {/* Цвет текста */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Цвет текста</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={properties.color || '#000000'}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="w-8 h-8 border border-[#DFE1E7] rounded cursor-pointer"
          />
          <input
            type="text"
            value={properties.color || '#000000'}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="flex-1 px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Выравнивание текста */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Выравнивание</label>
        <select
          value={properties.textAlign || 'left'}
          onChange={(e) => onUpdate({ textAlign: e.target.value })}
          className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
        >
          {textAligns.map(align => (
            <option key={align.value} value={align.value}>
              {align.label}
            </option>
          ))}
        </select>
      </div>

      {/* Межстрочный интервал */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Межстрочный интервал</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0.5"
            max="3"
            step="0.1"
            value={properties.lineHeight || 1.2}
            onChange={(e) => onUpdate({ lineHeight: parseFloat(e.target.value) || 1.2 })}
            className="flex-1 px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
          />
          <span className="text-[12px] text-[#6F6F6F]">em</span>
        </div>
      </div>

      {/* Межбуквенный интервал */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Межбуквенный интервал</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="-2"
            max="10"
            step="0.1"
            value={properties.letterSpacing || 0}
            onChange={(e) => onUpdate({ letterSpacing: parseFloat(e.target.value) || 0 })}
            className="flex-1 px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
          />
          <span className="text-[12px] text-[#6F6F6F]">px</span>
        </div>
      </div>

      {/* Предварительный просмотр */}
      <div className="mt-4 p-3 bg-[#F6F8FA] rounded-[8px] border border-[#DFE1E7]">
        <label className="block text-[12px] text-[#6F6F6F] mb-2">Предварительный просмотр</label>
        <div
          className="text-[14px] break-words"
          style={{
            fontFamily: properties.fontFamily || 'Manrope',
            fontSize: `${properties.fontSize || 16}px`,
            fontWeight: properties.fontWeight || 400,
            color: properties.color || '#000000',
            textAlign: (properties.textAlign as any) || 'left',
            lineHeight: properties.lineHeight || 1.2,
            letterSpacing: `${properties.letterSpacing || 0}px`
          }}
        >
          {properties.text || 'Пример текста для предварительного просмотра'}
        </div>
      </div>
    </div>
  );
};

export default TextProperties; 