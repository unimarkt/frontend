import React from "react";
export interface SelectOption {
  label: string;
  value: string;
}
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  className?: string;
}
const Select: React.FC<SelectProps> = ({ options, className = "", ...rest }) => (
  <select
    className={`w-full h-[56px] px-[24px] rounded-[16px] bg-gray-100 border border-gray-200 text-lg focus:border-primary-500 outline-none transition ${className}`}
    {...rest}
  >
    <option value="">Выберите категорию</option>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);
export default Select; 