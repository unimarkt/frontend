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

export const mockStats = {
  totalProducts: 1247,
  activeProducts: 89,
  totalCards: 156,
  templates: 24,
  views: 5200,
  orders: 145,
  ctr: 35,
  cartAdditions: 12,
  viewGrowth: 14,
  timeSaved: 35
};

export const mockRecentCards = [
  {
    id: 1,
    title: "Домик Чемодан",
    image: "/img/cards/WB1.jpg",
    date: "2024-09-25 11:00",
    status: "active"
  },
  {
    id: 2,
    title: "Увлекательная сборка",
    image: "/img/cards/WB2.jpg",
    date: "2024-09-25 11:00",
    status: "active"
  },
  {
    id: 3,
    title: "Что в наборе?",
    image: "/img/cards/WB3.jpg",
    date: "2024-09-25 11:00",
    status: "active"
  },
  {
    id: 4,
    title: "2 куклы В ПОДАРОК",
    image: "/img/cards/WB4.jpg",
    date: "2024-09-25 11:00",
    status: "active"
  }
];

export const mockApiTasks = [
  {
    id: 1,
    name: "Загрузка Карточек",
    type: "Карточек",
    date: "2024-09-25",
    time: "11:00",
    status: "Выполнено",
    statusColor: "text-green-500"
  },
  {
    id: 2,
    name: "Аналитика Продаж",
    type: "Продаж",
    date: "2024-09-25",
    time: "11:00",
    status: "В очереди",
    statusColor: "text-yellow-500"
  },
  {
    id: 3,
    name: "Загрузка Товаров",
    type: "Товаров",
    date: "2024-09-25",
    time: "11:00",
    status: "Ошибка",
    statusColor: "text-red-500"
  },
  {
    id: 4,
    name: "Аналитика Конверсий",
    type: "Конверсий",
    date: "2024-09-25",
    time: "11:00",
    status: "Выполнено",
    statusColor: "text-green-500"
  }
];

export const mockProducts = [
  {
    id: 1,
    name: "Чемодомик",
    category: "Игрушки",
    items: "15 штук",
    cards: "150 штук",
    date: "2024-09-25 11:00",
    notes: "Первые чемодомики",
    status: "Активна",
    statusColor: "bg-green-500",
    image: "/img/cards/WB1.jpg"
  },
  {
    id: 2,
    name: "Чемодомик",
    category: "Игрушки",
    items: "15 штук",
    cards: "150 штук",
    date: "2024-09-25 11:00",
    notes: "Первые чемодомики",
    status: "Черновик",
    statusColor: "bg-yellow-500",
    image: "/img/cards/WB2.jpg"
  },
  {
    id: 3,
    name: "Чемодомик",
    category: "Игрушки",
    items: "15 штук",
    cards: "150 штук",
    date: "2024-09-25 11:00",
    notes: "Первые чемодомики",
    status: "Ожидание",
    statusColor: "bg-blue-500",
    image: "/img/cards/WB3.jpg"
  }
];

export const mockQuickActions = [
  {
    id: 1,
    title: "Создать карточку",
    subtitle: "Начни с нуля",
    action: "create"
  },
  {
    id: 2,
    title: "Используй шаблоны",
    subtitle: "Быстрое результат",
    action: "templates"
  },
  {
    id: 3,
    title: "Аналитика",
    subtitle: "Тесты и метрики",
    action: "analytics"
  },
  {
    id: 4,
    title: "Работа с API",
    subtitle: "Автозагрузка",
    action: "api"
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