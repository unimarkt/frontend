import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ 
  error, 
  label, 
  className = "", 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${error 
            ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
            : "border-gray-300 hover:border-gray-400"
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input; 