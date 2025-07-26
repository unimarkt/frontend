import React from 'react';

interface HomeIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({ 
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
      <path d="M3.5 12.5L12.5 3.5L21.5 12.5V20.5C21.5 21.0523 21.0523 21.5 20.5 21.5H4.5C3.94772 21.5 3.5 21.0523 3.5 20.5V12.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 21.5V15.5C9.5 14.9477 9.94772 14.5 10.5 14.5H14.5C15.0523 14.5 15.5 14.9477 15.5 15.5V21.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default HomeIcon; 