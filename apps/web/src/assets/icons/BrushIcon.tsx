import React from 'react';

interface BrushIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const BrushIcon: React.FC<BrushIconProps> = ({ 
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
      <path d="M15.232 5.232L18.768 8.768M16.732 3.268C17.5 2.5 18.5 2 19.5 2C20.5 2 21.5 2.5 22.268 3.268C23.036 4.036 23.5 5.036 23.5 6.036C23.5 7.036 23.036 8.036 22.268 8.804L6.5 24.572H3V21.072L16.732 3.268Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default BrushIcon; 