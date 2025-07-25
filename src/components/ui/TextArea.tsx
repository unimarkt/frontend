import React from "react";
const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full min-h-[112px] px-[24px] py-[16px] rounded-[16px] bg-gray-100 border border-gray-200 text-lg focus:border-primary-500 outline-none transition resize-none ${className}`}
      {...props}
    />
  )
);
export default TextArea; 