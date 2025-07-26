import React from 'react';

interface DeleteIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({ 
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
      <path d="M3.5 6.5H5.5H21.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 6.5V4.5C8.5 3.94772 8.94772 3.5 9.5 3.5H15.5C16.0523 3.5 16.5 3.94772 16.5 4.5V6.5M19.5 6.5V20.5C19.5 21.0523 19.0523 21.5 18.5 21.5H6.5C5.94772 21.5 5.5 21.0523 5.5 20.5V6.5H19.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default DeleteIcon; 