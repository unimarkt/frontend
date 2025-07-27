import React, { useState, useEffect, useRef } from 'react';

interface GoogleFont {
  family: string;
  variants: string[];
  category: string;
}

interface FontManagerProps {
  currentFont: string;
  onFontChange: (font: string) => void;
}

// Популярные Google Fonts
const POPULAR_FONTS: GoogleFont[] = [
  { family: 'Roboto', variants: ['300', '400', '500', '700'], category: 'sans-serif' },
  { family: 'Open Sans', variants: ['300', '400', '600', '700'], category: 'sans-serif' },
  { family: 'Lato', variants: ['300', '400', '700'], category: 'sans-serif' },
  { family: 'Poppins', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
  { family: 'Montserrat', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
  { family: 'Inter', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
  { family: 'Playfair Display', variants: ['400', '500', '600', '700'], category: 'serif' },
  { family: 'Merriweather', variants: ['300', '400', '700'], category: 'serif' },
  { family: 'Source Code Pro', variants: ['300', '400', '500', '600', '700'], category: 'monospace' },
  { family: 'Fira Code', variants: ['300', '400', '500', '600', '700'], category: 'monospace' },
];

const FontManager: React.FC<FontManagerProps> = ({ currentFont, onFontChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomFont, setShowCustomFont] = useState(false);
  const [customFontUrl, setCustomFontUrl] = useState('');
  const [loadedFonts, setLoadedFonts] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Загружаем Google Fonts при монтировании
  useEffect(() => {
    const loadGoogleFonts = async () => {
      const fontFamilies = POPULAR_FONTS.map(font => font.family).join('|');
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?${fontFamilies.split('|').map(font => `family=${font}:wght@300;400;500;600;700`).join('&')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    loadGoogleFonts();
  }, []);

  // Фильтрация шрифтов по поиску
  const filteredFonts = POPULAR_FONTS.filter(font =>
    font.family.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Загрузка пользовательского шрифта
  const handleCustomFontLoad = () => {
    if (customFontUrl.trim()) {
      const link = document.createElement('link');
      link.href = customFontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      // Извлекаем имя шрифта из URL
      const fontName = customFontUrl.split('/').pop()?.split('.')[0] || 'Custom Font';
      setLoadedFonts(prev => [...prev, fontName]);
      onFontChange(fontName);
      setShowCustomFont(false);
      setCustomFontUrl('');
    }
  };

  // Загрузка шрифта из файла
  const handleFontFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fontName = file.name.split('.')[0];
        const fontFace = new FontFace(fontName, `url(${e.target?.result})`);
        
        fontFace.load().then(() => {
          document.fonts.add(fontFace);
          setLoadedFonts(prev => [...prev, fontName]);
          onFontChange(fontName);
        }).catch(error => {
          console.error('Ошибка загрузки шрифта:', error);
          alert('Ошибка загрузки шрифта. Убедитесь, что файл корректный.');
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Шрифт
        </label>
        
        {/* Поиск шрифтов */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Поиск шрифтов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Список шрифтов */}
        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded">
          {filteredFonts.map((font) => (
            <div
              key={font.family}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors ${
                currentFont === font.family ? 'bg-blue-100 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => onFontChange(font.family)}
            >
              <div 
                className="font-medium"
                style={{ fontFamily: font.family }}
              >
                {font.family}
              </div>
              <div className="text-xs text-gray-500">
                {font.category} • {font.variants.join(', ')}
              </div>
            </div>
          ))}
        </div>

        {/* Загруженные пользовательские шрифты */}
        {loadedFonts.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Загруженные шрифты:</h4>
            <div className="space-y-1">
              {loadedFonts.map((fontName) => (
                <div
                  key={fontName}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors rounded ${
                    currentFont === fontName ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => onFontChange(fontName)}
                >
                  <div 
                    className="font-medium"
                    style={{ fontFamily: fontName }}
                  >
                    {fontName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Кнопки для загрузки пользовательских шрифтов */}
        <div className="mt-3 space-y-2">
          <button
            onClick={() => setShowCustomFont(!showCustomFont)}
            className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            {showCustomFont ? 'Скрыть' : 'Добавить шрифт по URL'}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Загрузить шрифт из файла
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".woff,.woff2,.ttf,.otf"
            onChange={handleFontFileUpload}
            className="hidden"
          />
        </div>

        {/* Форма для загрузки шрифта по URL */}
        {showCustomFont && (
          <div className="mt-3 p-3 bg-gray-50 rounded border">
            <input
              type="url"
              placeholder="URL шрифта (Google Fonts, Adobe Fonts, etc.)"
              value={customFontUrl}
              onChange={(e) => setCustomFontUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCustomFontLoad}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Загрузить
              </button>
              <button
                onClick={() => setShowCustomFont(false)}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FontManager; 