import React from 'react';

interface AvatarIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const AvatarIcon: React.FC<AvatarIconProps> = ({ 
  width = 40, 
  height = 40, 
  className = ''
}) => {
  return (
    <div 
      className={`bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold ${className}`}
      style={{ width, height }}
    >
      <span style={{ fontSize: Math.min(width, height) * 0.4 }}>
        А
      </span>
    </div>
  );
};

export default AvatarIcon; 