import React from 'react';

interface LayoutIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const LayoutIcon: React.FC<LayoutIconProps> = ({ 
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
      <path d="M3.5 3.5h2l.4 2M7.5 13.5h10l4-8H5.9m0 0L7.5 13.5m0 0l-2.5 5M7.5 13.5l2.5 5m0 0h9m-9 0a2 2 0 100 4 2 2 0 000-4zm9 0a2 2 0 100 4 2 2 0 000-4z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default LayoutIcon; 