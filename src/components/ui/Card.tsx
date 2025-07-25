import React from "react";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card: React.FC<CardProps> = ({ children, className = "", ...rest }) => (
  <div
    className={`bg-white rounded-[20px] shadow-lg p-[32px] ${className}`}
    {...rest}
  >
    {children}
  </div>
);
export default React.memo(Card); 