import React from 'react';

interface TrashIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const TrashIcon: React.FC<TrashIconProps> = ({ 
  className = "w-6 h-6", 
  width = 24, 
  height = 24 
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z" />
    <path d="M19 7h-3V5c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v2H5" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

export default TrashIcon; 