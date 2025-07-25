import React, { useState } from "react";
import type { InputHTMLAttributes } from "react";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium mb-1" aria-label={label}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className={`
          w-full px-3 py-2 border rounded-md outline-none transition
          text-base
          ${error
            ? "border-red-500 focus:border-red-600"
            : focused
            ? "border-blue-500"
            : "border-gray-300 focus:border-blue-500"}
          bg-white
        `}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-required={required}
        {...rest}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  );
};

/**
 * Пример использования:
 * <TextField
 *   label="Название"
 *   value={name}
 *   onChange={setName}
 *   required
 *   error={errors.name}
 *   placeholder="Введите название продукта"
 * />
 */ 