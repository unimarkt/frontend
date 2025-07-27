import React from 'react';

interface BarChartIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const BarChartIcon: React.FC<BarChartIconProps> = ({ 
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
    <path d="M12 20V10" />
    <path d="M18 20V4" />
    <path d="M6 20v-6" />
  </svg>
);

export default BarChartIcon; 