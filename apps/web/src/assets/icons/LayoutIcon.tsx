import React from 'react';

interface LayoutIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const LayoutIcon: React.FC<LayoutIconProps> = ({ 
  width = 25, 
  height = 25, 
  className = ''
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
      <path d="M3.5 7.5C3.5 5.29086 5.29086 3.5 7.5 3.5H17.5C19.7091 3.5 21.5 5.29086 21.5 7.5V17.5C21.5 19.7091 19.7091 21.5 17.5 21.5H7.5C5.29086 21.5 3.5 19.7091 3.5 17.5V7.5Z" stroke={color} strokeWidth="1.5"/>
      <path d="M3.5 12.5H21.5" stroke={color} strokeWidth="1.5"/>
      <path d="M12.5 3.5V21.5" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
};

export default LayoutIcon; 