import React from 'react';

interface NewProductIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const NewProductIcon: React.FC<NewProductIconProps> = ({ 
  className = "w-6 h-6", 
  width = 24, 
  height = 24 
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10l-8-4m8 4v10m8-10v10l-8 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NewProductIcon; 