import React, { useState, useEffect } from 'react';

interface DragIndicatorProps {
  isVisible: boolean;
  position: { x: number; y: number };
  componentType?: string;
  displayName?: string;
}

export const DragIndicator: React.FC<DragIndicatorProps> = ({
  isVisible,
  position,
  componentType,
  displayName,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-all duration-200 ${
        isAnimating ? 'scale-110' : 'scale-100'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Основной индикатор */}
      <div className="bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg border border-blue-600">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium">
            {displayName || componentType || 'Элемент'}
          </span>
        </div>
      </div>
      
      {/* Хвост индикатора */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500"></div>
      </div>
    </div>
  );
}; 