import React, { useRef, useEffect } from "react";
import type { TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  ...rest
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        ref={ref}
        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none transition resize-none focus:border-blue-500"
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        aria-label={label}
        {...rest}
      />
    </div>
  );
};

/**
 * Пример использования:
 * <TextArea
 *   label="Описание"
 *   value={description}
 *   onChange={setDescription}
 *   placeholder="Введите описание"
 *   rows={4}
 * />
 */ 