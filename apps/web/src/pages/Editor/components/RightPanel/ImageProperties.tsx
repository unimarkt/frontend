import React from 'react';

interface ImagePropertiesProps {
  properties: {
    src?: string;
    alt?: string;
    opacity?: number;
    scale?: number;
    brightness?: number;
    contrast?: number;
    saturation?: number;
  };
  onUpdate: (updates: Partial<ImagePropertiesProps['properties']>) => void;
}

const ImageProperties: React.FC<ImagePropertiesProps> = ({
  properties,
  onUpdate
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdate({ src: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-4 py-3 border-t border-[#DFE1E7]">
      <h4 className="text-[12px] font-medium text-black mb-3">Свойства изображения</h4>
      
      {/* Загрузка изображения */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Изображение</label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex-1 px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] text-[#6F6F6F] cursor-pointer hover:bg-[#ECEFF3] transition-colors text-center"
          >
            {properties.src ? 'Изменить изображение' : 'Выбрать изображение'}
          </label>
        </div>
      </div>

      {/* Alt текст */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Alt текст</label>
        <input
          type="text"
          value={properties.alt || ''}
          onChange={(e) => onUpdate({ alt: e.target.value })}
          className="w-full px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1264FF] focus:border-transparent"
          placeholder="Описание изображения"
        />
      </div>

      {/* Масштаб */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Масштаб</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={properties.scale || 1}
            onChange={(e) => onUpdate({ scale: parseFloat(e.target.value) })}
            className="flex-1 h-2 bg-[#DFE1E7] rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-[12px] text-[#6F6F6F] min-w-[3rem] text-right">
            {Math.round((properties.scale || 1) * 100)}%
          </span>
        </div>
      </div>

      {/* Яркость */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Яркость</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="200"
            value={properties.brightness || 100}
            onChange={(e) => onUpdate({ brightness: parseInt(e.target.value) })}
            className="flex-1 h-2 bg-[#DFE1E7] rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-[12px] text-[#6F6F6F] min-w-[3rem] text-right">
            {properties.brightness || 100}%
          </span>
        </div>
      </div>

      {/* Контрастность */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Контрастность</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="200"
            value={properties.contrast || 100}
            onChange={(e) => onUpdate({ contrast: parseInt(e.target.value) })}
            className="flex-1 h-2 bg-[#DFE1E7] rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-[12px] text-[#6F6F6F] min-w-[3rem] text-right">
            {properties.contrast || 100}%
          </span>
        </div>
      </div>

      {/* Насыщенность */}
      <div className="mb-3">
        <label className="block text-[12px] text-[#6F6F6F] mb-1">Насыщенность</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="200"
            value={properties.saturation || 100}
            onChange={(e) => onUpdate({ saturation: parseInt(e.target.value) })}
            className="flex-1 h-2 bg-[#DFE1E7] rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-[12px] text-[#6F6F6F] min-w-[3rem] text-right">
            {properties.saturation || 100}%
          </span>
        </div>
      </div>

      {/* Предварительный просмотр */}
      {properties.src && (
        <div className="mt-4 p-3 bg-[#F6F8FA] rounded-[8px] border border-[#DFE1E7]">
          <label className="block text-[12px] text-[#6F6F6F] mb-2">Предварительный просмотр</label>
          <div className="relative w-full h-32 bg-white rounded overflow-hidden">
            <img
              src={properties.src}
              alt={properties.alt || 'Предварительный просмотр'}
              className="w-full h-full object-cover"
              style={{
                filter: `
                  brightness(${properties.brightness || 100}%) 
                  contrast(${properties.contrast || 100}%) 
                  saturate(${properties.saturation || 100}%)
                `,
                transform: `scale(${properties.scale || 1})`
              }}
            />
          </div>
        </div>
      )}

      {/* Быстрые действия */}
      <div className="mt-4 pt-3 border-t border-[#DFE1E7]">
        <h5 className="text-[12px] font-medium text-black mb-2">Быстрые действия</h5>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdate({ 
              scale: 1, 
              brightness: 100, 
              contrast: 100, 
              saturation: 100 
            })}
            className="px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[12px] text-[#6F6F6F] hover:bg-[#ECEFF3] transition-colors"
          >
            Сбросить
          </button>
          <button
            onClick={() => onUpdate({ scale: 1.5 })}
            className="px-3 py-2 bg-[#F6F8FA] border border-[#DFE1E7] rounded-[8px] text-[12px] text-[#6F6F6F] hover:bg-[#ECEFF3] transition-colors"
          >
            Увеличить
          </button>
        </div>
      </div>


    </div>
  );
};

export default ImageProperties; 