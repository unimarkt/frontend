import React from "react";
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full h-[56px] px-[24px] rounded-[16px] bg-gray-100 border border-gray-200 text-lg focus:border-primary-500 outline-none transition ${className}`}
      {...props}
    />
  )
);
export default Input; 