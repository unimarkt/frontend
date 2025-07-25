import React, { useState, useRef, useEffect } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onAddNew?: () => void;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  onAddNew,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full mb-4" ref={ref}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div
        className="relative"
        tabIndex={0}
        onClick={() => setOpen(v => !v)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") setOpen(v => !v);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div
          className={`
            w-full px-3 py-2 border rounded-md bg-white cursor-pointer
            ${open ? "border-blue-500" : error ? "border-red-500" : "border-gray-300"}
          `}
        >
          {options.find(opt => opt.value === value)?.label || placeholder || "Выберите..."}
        </div>
        {open && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <input
              className="w-full px-3 py-2 border-b border-gray-100 outline-none"
              placeholder="Поиск..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              aria-label="Поиск"
            />
            {filtered.map(opt => (
              <div
                key={opt.value}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                  value === opt.value ? "bg-blue-100" : ""
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setSearch("");
                }}
                role="option"
                aria-selected={value === opt.value}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    onChange(opt.value);
                    setOpen(false);
                    setSearch("");
                  }
                }}
              >
                {opt.label}
              </div>
            ))}
            {onAddNew && (
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 border-t border-gray-100"
                onClick={e => {
                  e.stopPropagation();
                  setOpen(false);
                  onAddNew();
                }}
              >
                + Добавить новый
              </button>
            )}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-gray-400">Нет вариантов</div>
            )}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  );
};

/**
 * Пример использования:
 * <Select
 *   label="Категория"
 *   options={[{ label: "Светильники", value: "lamp" }]}
 *   value={category}
 *   onChange={setCategory}
 *   placeholder="Выберите категорию"
 *   onAddNew={() => setShowAddCategory(true)}
 * />
 */ 