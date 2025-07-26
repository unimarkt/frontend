import React from 'react';

interface ToolbarProps {
  onAddText: () => void;
  onAddImage: () => void;
  onAddShape: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  showGrid: boolean;
  onToggleGrid: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAddText,
  onAddImage,
  onAddShape,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  showGrid,
  onToggleGrid,
  zoom,
  onZoomChange
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* Левая группа - Инструменты */}
      <div className="flex items-center gap-2">
        {/* Шаблон */}
        <div className="flex flex-col items-center gap-1 px-3 py-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="#000000" strokeWidth="2" rx="1"/>
              <rect x="14" y="3" width="7" height="7" stroke="#000000" strokeWidth="2" rx="1"/>
              <rect x="3" y="14" width="7" height="7" stroke="#000000" strokeWidth="2" rx="1"/>
              <rect x="14" y="14" width="7" height="7" stroke="#000000" strokeWidth="2" rx="1"/>
            </svg>
          </div>
          <span className="text-[12px] font-medium text-black">Шаблон</span>
        </div>

        {/* Текст */}
        <div 
          className="flex flex-col items-center gap-1 px-3 py-2 cursor-pointer hover:bg-[#F6F8FA] rounded transition-colors"
          onClick={onAddText}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 7V4H20V7M4 7V20M4 7H20M20 7V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[12px] font-medium text-black">Текст</span>
        </div>

        {/* Картинка */}
        <div 
          className="flex flex-col items-center gap-1 px-3 py-2 cursor-pointer hover:bg-[#F6F8FA] rounded transition-colors"
          onClick={onAddImage}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#000000" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="#000000"/>
              <path d="M21 15L16 10L5 21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[12px] font-medium text-black">Картинка</span>
        </div>

        {/* Вектор */}
        <div 
          className="flex flex-col items-center gap-1 px-3 py-2 cursor-pointer hover:bg-[#F6F8FA] rounded transition-colors"
          onClick={onAddShape}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="#000000"/>
            </svg>
          </div>
          <span className="text-[12px] font-medium text-black">Вектор</span>
        </div>
      </div>

      {/* Центральная группа - Навигация */}
      <div className="flex items-center gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            canUndo 
              ? 'hover:bg-[#F6F8FA] text-[#6F6F6F]' 
              : 'text-[#DFE1E7] cursor-not-allowed'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 7V11H7M21 17C21 13.6863 18.3137 11 15 11C11.6863 11 9 13.6863 9 17C9 20.3137 11.6863 23 15 23C18.3137 23 21 20.3137 21 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            canRedo 
              ? 'hover:bg-[#F6F8FA] text-[#6F6F6F]' 
              : 'text-[#DFE1E7] cursor-not-allowed'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 7V11H17M3 17C3 13.6863 5.68629 11 9 11C12.3137 11 15 13.6863 15 17C15 20.3137 12.3137 23 9 23C5.68629 23 3 20.3137 3 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Правая группа - Масштаб и сетка */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onZoomChange(Math.max(25, zoom - 25))}
          className="w-8 h-8 flex items-center justify-center hover:bg-[#F6F8FA] rounded transition-colors text-[#6F6F6F]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="w-16 text-center">
          <span className="text-[14px] font-medium text-[#6F6F6F]">{zoom}%</span>
        </div>

        <button
          onClick={() => onZoomChange(Math.min(400, zoom + 25))}
          className="w-8 h-8 flex items-center justify-center hover:bg-[#F6F8FA] rounded transition-colors text-[#6F6F6F]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="w-px h-6 bg-[#DFE1E7] mx-2"></div>

        <button
          onClick={onToggleGrid}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            showGrid 
              ? 'bg-[#EAF1FF] text-[#1264FF]' 
              : 'hover:bg-[#F6F8FA] text-[#6F6F6F]'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 3H10V10H3V3Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 3H21V10H14V3Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 14H10V21H3V14Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 14H21V21H14V14Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toolbar; 