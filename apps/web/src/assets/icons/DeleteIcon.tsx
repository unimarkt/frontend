import React from 'react';

interface DeleteIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({ 
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
      <path d="M3.5 6.5H5.5L6.5 5.5H18.5L19.5 6.5H21.5M8.5 6.5V5.5C8.5 4.94772 8.94772 4.5 9.5 4.5H15.5C16.0523 4.5 16.5 4.94772 16.5 5.5V6.5M19.5 6.5V19.5C19.5 20.0523 19.0523 20.5 18.5 20.5H6.5C5.94772 20.5 5.5 20.0523 5.5 19.5V6.5H19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 9.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.5 9.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default DeleteIcon; 