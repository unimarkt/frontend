import React from 'react';

interface DragIndicatorProps {
  isVisible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

const DragIndicator: React.FC<DragIndicatorProps> = ({
  isVisible,
  x,
  y,
  width,
  height,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="absolute pointer-events-none border-2 border-dashed border-blue-500 bg-blue-50 bg-opacity-30"
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex: 9999,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
          Перетаскивание
        </div>
      </div>
    </div>
  );
};

export default DragIndicator; 