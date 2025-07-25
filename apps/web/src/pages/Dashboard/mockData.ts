export interface Product {
  id: number;
  name: string;
  items: number;
  cards: number;
  lastEdit: string;
}
export interface Template {
  id: number;
  name: string;
  category: string;
  preview: string;
}

export const mockProducts: Product[] = [
  { id: 1, name: "Светильник", items: 12, cards: 48, lastEdit: "2 часа назад" },
  { id: 2, name: "Ночник", items: 8, cards: 32, lastEdit: "1 день назад" },
  { id: 3, name: "Люстра", items: 5, cards: 20, lastEdit: "3 дня назад" },
  { id: 4, name: "Торшер", items: 7, cards: 28, lastEdit: "5 дней назад" }
];

export const mockTemplates: Template[] = [
  { id: 1, name: "Главная страница", category: "Базовые", preview: "" },
  { id: 2, name: "3 преимущества", category: "Маркетинг", preview: "" },
  { id: 3, name: "Инфографика", category: "Маркетинг", preview: "" },
  { id: 4, name: "Заголовок + 2 строки", category: "Базовые", preview: "" },
  { id: 5, name: "Заголовок", category: "Базовые", preview: "" }
]; 