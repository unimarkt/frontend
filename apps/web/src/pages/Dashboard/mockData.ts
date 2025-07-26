export interface Product {
  id: number;
  name: string;
  items: number;
  cards: number;
  lastEdit: string;
  status: "active" | "draft" | "trash";
  category: string;
  description: string;
  image?: string;
}

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  currency: string;
  image?: string;
  variant?: ProductVariant;
}

export interface ProductVariant {
  id: number;
  name: string;
  value: string;
  price?: number;
}

export interface Category {
  id: number;
  name: string;
  productCount: number;
}

export interface Template {
  id: number;
  name: string;
  category: string;
  preview: string;
}

export const mockCategories: Category[] = [
  { id: 1, name: "Электроника", productCount: 12 },
  { id: 2, name: "Одежда", productCount: 8 },
  { id: 3, name: "Дом и сад", productCount: 15 },
  { id: 4, name: "Спорт", productCount: 6 },
  { id: 5, name: "Книги", productCount: 20 }
];

export const mockProducts: Product[] = [
  { 
    id: 1, 
    name: "Светильник LED", 
    items: 12, 
    cards: 48, 
    lastEdit: "2 часа назад",
    status: "active",
    category: "Дом и сад",
    description: "Современный светильник с LED подсветкой для любого интерьера"
  },
  { 
    id: 2, 
    name: "Ночник детский", 
    items: 8, 
    cards: 32, 
    lastEdit: "1 день назад",
    status: "active",
    category: "Дом и сад",
    description: "Мягкий ночник для детской комнаты с различными режимами"
  },
  { 
    id: 3, 
    name: "Люстра хрустальная", 
    items: 5, 
    cards: 20, 
    lastEdit: "3 дня назад",
    status: "draft",
    category: "Дом и сад",
    description: "Роскошная хрустальная люстра для гостиной"
  },
  { 
    id: 4, 
    name: "Торшер напольный", 
    items: 7, 
    cards: 28, 
    lastEdit: "5 дней назад",
    status: "active",
    category: "Дом и сад",
    description: "Стильный напольный торшер с регулируемой яркостью"
  },
  { 
    id: 5, 
    name: "Смартфон Galaxy", 
    items: 15, 
    cards: 60, 
    lastEdit: "1 час назад",
    status: "active",
    category: "Электроника",
    description: "Новейший смартфон с мощным процессором и отличной камерой"
  },
  { 
    id: 6, 
    name: "Ноутбук Pro", 
    items: 3, 
    cards: 12, 
    lastEdit: "2 дня назад",
    status: "draft",
    category: "Электроника",
    description: "Профессиональный ноутбук для работы и творчества"
  }
];

export const mockProductItems: ProductItem[] = [
  {
    id: 1,
    name: "Светильник LED белый",
    price: 2500,
    currency: "RUB",
    image: "/placeholder.jpg"
  },
  {
    id: 2,
    name: "Светильник LED черный",
    price: 2800,
    currency: "RUB",
    image: "/placeholder.jpg"
  },
  {
    id: 3,
    name: "Светильник LED золотой",
    price: 3200,
    currency: "RUB",
    image: "/placeholder.jpg"
  }
];

export const mockTemplates: Template[] = [
  { id: 1, name: "Главная страница", category: "Базовые", preview: "" },
  { id: 2, name: "3 преимущества", category: "Маркетинг", preview: "" },
  { id: 3, name: "Инфографика", category: "Маркетинг", preview: "" },
  { id: 4, name: "Заголовок + 2 строки", category: "Базовые", preview: "" },
  { id: 5, name: "Заголовок", category: "Базовые", preview: "" }
]; 