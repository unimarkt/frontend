import React from 'react';

interface NewTemplateIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const NewTemplateIcon: React.FC<NewTemplateIconProps> = ({ 
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
      d="M3 3h6v6H3V3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 3h6v6h-6V3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 15h6v6H3v-6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 15h6v6h-6v-6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NewTemplateIcon; 