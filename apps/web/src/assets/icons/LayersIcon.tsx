import React from 'react';

interface LayersIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const LayersIcon: React.FC<LayersIconProps> = ({ 
  width = 25, 
  height = 25, 
  className = '',
  color = '#F8FAFB'
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 25 25" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12.5 3.5L21.5 8.5L12.5 13.5L3.5 8.5L12.5 3.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.5 16.5L12.5 21.5L21.5 16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.5 12.5L12.5 17.5L21.5 12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default LayersIcon; 