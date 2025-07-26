import React from "react";
const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
    <span className="text-5xl mb-4">🗂️</span>
    <div className="text-xl font-semibold mb-2">Нет продуктов</div>
    <div className="text-base">Создайте первый продукт, чтобы начать работу</div>
  </div>
);
export default EmptyState; 