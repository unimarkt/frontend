import React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: React.FC<ButtonProps> = ({ children, className = "", ...rest }) => (
  <button
    className={`h-[56px] px-[32px] rounded-[16px] bg-primary-500 text-white text-lg font-semibold hover:bg-primary-600 transition disabled:opacity-50 ${className}`}
    {...rest}
  >
    {children}
  </button>
);
export default React.memo(Button); 