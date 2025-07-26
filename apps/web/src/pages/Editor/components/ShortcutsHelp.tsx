import React, { useState } from 'react';

interface ShortcutItem {
  key: string;
  description: string;
  category: string;
}

const SHORTCUTS: ShortcutItem[] = [
  // Файловые операции
  { key: 'Ctrl+S', description: 'Сохранить', category: 'Файл' },
  { key: 'Ctrl+E', description: 'Экспорт', category: 'Файл' },
  
  // Редактирование
  { key: 'Ctrl+Z', description: 'Отменить', category: 'Редактирование' },
  { key: 'Ctrl+Y', description: 'Повторить', category: 'Редактирование' },
  { key: 'Ctrl+C', description: 'Копировать', category: 'Редактирование' },
  { key: 'Ctrl+V', description: 'Вставить', category: 'Редактирование' },
  { key: 'Ctrl+D', description: 'Дублировать', category: 'Редактирование' },
  { key: 'Delete', description: 'Удалить', category: 'Редактирование' },
  
  // Выделение
  { key: 'Ctrl+A', description: 'Выбрать все', category: 'Выделение' },
  { key: 'Escape', description: 'Снять выделение', category: 'Выделение' },
  
  // Группировка
  { key: 'Ctrl+G', description: 'Создать группу', category: 'Группировка' },
  { key: 'Ctrl+Shift+G', description: 'Разгруппировать', category: 'Группировка' },
  
  // Навигация
  { key: 'Ctrl++', description: 'Увеличить масштаб', category: 'Навигация' },
  { key: 'Ctrl+-', description: 'Уменьшить масштаб', category: 'Навигация' },
  { key: 'Ctrl+0', description: 'Подогнать под экран', category: 'Навигация' },
  { key: 'Ctrl+1', description: '100% масштаб', category: 'Навигация' },
  { key: 'G', description: 'Переключить сетку', category: 'Навигация' },
  
  // Перемещение объектов
  { key: '↑↓←→', description: 'Переместить на 1px', category: 'Перемещение' },
  { key: 'Shift+↑↓←→', description: 'Переместить на 10px', category: 'Перемещение' },
  { key: 'Мышь + Drag', description: 'Перетащить объект', category: 'Перемещение' },
];

interface ShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShortcutsHelp: React.FC<ShortcutsHelpProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', ...Array.from(new Set(SHORTCUTS.map(s => s.category)))];

  const filteredShortcuts = selectedCategory === 'Все' 
    ? SHORTCUTS 
    : SHORTCUTS.filter(s => s.category === selectedCategory);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Горячие клавиши
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Фильтр по категориям */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Список горячих клавиш */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid gap-4">
            {filteredShortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-700">{shortcut.description}</span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono text-gray-800 shadow-sm">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        {/* Подсказка */}
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <p className="text-sm text-blue-700">
            💡 <strong>Совет:</strong> Используйте горячие клавиши для ускорения работы. 
            Нажмите <kbd className="px-1 py-0.5 bg-white border border-blue-300 rounded text-xs">?</kbd> 
            для быстрого доступа к этой справке.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShortcutsHelp; 