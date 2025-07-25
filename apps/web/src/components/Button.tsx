import React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <button
    className="px-4 py-2 rounded bg-primary-500 text-white font-medium hover:bg-primary-600 transition disabled:opacity-50"
    {...rest}
  >
    {children}
  </button>
);
export default React.memo(Button); 