import React from 'react';

interface TemplateGalleryIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const TemplateGalleryIcon: React.FC<TemplateGalleryIconProps> = ({ 
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
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M3 9h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 21V9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TemplateGalleryIcon; 