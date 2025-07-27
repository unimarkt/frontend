# UniMart MVP - Техническая документация

> **Последнее обновление**: 2024-01-25  
> **Версия**: 1.0.0  
> **Статус**: MVP в активной разработке

## 📋 Краткое описание проекта

**UniMart MVP** - это платформа для автоматизации создания карточек товаров для маркетплейсов (WB, Ozon, Яндекс.Маркет). Проект находится на стадии MVP с фокусом на быструю итерацию и валидацию гипотез.

### 🎯 Основные цели:
- Автоматизация процесса создания карточек товаров
- Визуальный редактор с профессиональными возможностями
- Интеграция с популярными маркетплейсами
- Упрощение работы для продавцов

### 📊 Текущее состояние:
- **Стадия**: MVP в активной разработке
- **Команда**: Стартап с быстрой итерацией
- **Приоритет**: Валидация гипотез и быстрый вывод на рынок

---

## 🏗️ Архитектура

### Frontend Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    UniMart MVP Stack                       │
├─────────────────────────────────────────────────────────────┤
│  React 18 + TypeScript + Vite + TailwindCSS              │
│  React Router v6 + React Hook Form + react-hot-toast     │
│  Custom Canvas Engine + HTML2Canvas                       │
└─────────────────────────────────────────────────────────────┘
```

#### Ключевые технологии:
- **React 18** - Основной фреймворк
- **TypeScript** - Строгая типизация
- **Vite** - Быстрый build tool
- **TailwindCSS** - Utility-first CSS
- **React Router v6** - Клиентская маршрутизация
- **React Hook Form** - Управление формами
- **react-hot-toast** - Уведомления
- **HTML2Canvas** - Экспорт в PNG

### Структура проекта

```
frontend/
├── apps/
│   └── web/                          # Основное веб-приложение
│       ├── src/
│       │   ├── components/           # UI компоненты
│       │   │   ├── ui/              # Базовые UI элементы
│       │   │   ├── layout/          # Layout компоненты
│       │   │   └── ...
│       │   ├── pages/               # Страницы приложения
│       │   │   ├── Dashboard/       # Главная страница
│       │   │   ├── Products/        # Каталог товаров
│       │   │   ├── NewProduct/      # Создание товара
│       │   │   ├── ProductDetail/   # Детали товара
│       │   │   └── Editor/          # Визуальный редактор
│       │   ├── assets/              # Статические ресурсы
│       │   │   └── icons/          # SVG иконки
│       │   └── styles/              # Глобальные стили
│       ├── public/                  # Публичные файлы
│       ├── package.json             # Зависимости
│       ├── vite.config.ts           # Конфигурация Vite
│       ├── tailwind.config.cjs      # Конфигурация Tailwind
│       └── tsconfig.json           # TypeScript конфигурация
├── packages/                        # Монорепозиторий пакеты
│   ├── config/                     # Общие конфигурации
│   └── ui/                        # Shared UI компоненты
└── package.json                    # Root зависимости
```

### Зависимости

#### Runtime Dependencies:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "react-hook-form": "^7.43.0",
  "react-hot-toast": "^2.4.0",
  "html2canvas": "^1.4.1"
}
```

#### Development Dependencies:
```json
{
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "@vitejs/plugin-react": "^4.0.0",
  "typescript": "^5.0.0",
  "vite": "^4.0.0",
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

#### Доступные команды:
```bash
npm run dev          # Запуск dev сервера
npm run build        # Сборка для продакшена
npm run preview      # Предпросмотр сборки
npm run lint         # Проверка ESLint
```

---

## 🎨 UI/UX

### Layout система

```
┌─────────────────────────────────────────────────────────────┐
│                        Header                              │
├─────────────┬───────────────────────────────────────────────┤
│             │                                             │
│   Sidebar   │              Content Area                   │
│             │                                             │
│             │                                             │
│             │                                             │
└─────────────┴─────────────────────────────────────────────┘
```

#### Layout компоненты:
- **`Layout.tsx`** - Основной layout с `hideSidebar` prop
- **`Header.tsx`** - Навигация, поиск, профиль пользователя
- **`Sidebar.tsx`** - Навигационное меню с иконками
- **`MainContent.tsx`** - Контейнер для контента страниц

### Компоненты

#### UI Components (`src/components/ui/`):
```typescript
// Базовые компоненты
Button.tsx          // Кнопки с вариантами стилей
Card.tsx            // Карточки с shadow уровнями
Input.tsx           // Поля ввода
Select.tsx          // Выпадающие списки
TextArea.tsx        // Многострочный ввод
Modal.tsx           // Модальные окна
Tabs.tsx            // Табы навигация
LoadingSpinner.tsx  // Индикаторы загрузки
```

#### Layout Components (`src/components/layout/`):
```typescript
Header.tsx          // Шапка с поиском и профилем
Sidebar.tsx         // Боковая навигация
MainContent.tsx     // Основная область контента
```

#### Page Components (`src/pages/`):
```typescript
Dashboard/           // Главная страница
├── index.tsx       // Основной компонент
└── mockData.ts     // Тестовые данные

Products/            // Каталог товаров
├── index.tsx       // Список товаров
├── components/     // Компоненты страницы
│   ├── ProductCard.tsx
│   ├── ProductsGrid.tsx
│   ├── ProductsHeader.tsx
│   └── ...
└── hooks/          // Кастомные хуки
    └── useProductsFilter.ts

Editor/              // Визуальный редактор
├── index.tsx       // Основной редактор
├── components/     // Компоненты редактора
│   ├── InlineTextEditor.tsx
│   ├── RichTextEditor.tsx
│   ├── FontManager.tsx
│   ├── AutoLayout.tsx
│   ├── ImageProperties.tsx
│   ├── LayersPanel.tsx
│   └── ...
├── hooks/          // Логика редактора
│   ├── useEditor.ts
│   ├── useKeyboardShortcuts.ts
│   └── useDragAndDrop.ts
├── types/          // TypeScript типы
│   └── editor.types.ts
└── utils/          // Утилиты
    ├── validation.ts
    └── fabric.ts
```

### Дизайн-система

#### Цветовая палитра:
```css
/* Primary Colors */
--primary-500: #3B82F6    /* Основной синий */
--primary-600: #2563EB    /* Темно-синий */
--primary-700: #1D4ED8    /* Очень темно-синий */

/* Gray Scale */
--gray-50: #F9FAFB       /* Светло-серый фон */
--gray-100: #F3F4F6      /* Серый фон */
--gray-200: #E5E7EB      /* Границы */
--gray-300: #D1D5DB      /* Поля ввода */
--gray-500: #6B7280      /* Текст */
--gray-700: #374151      /* Заголовки */
--gray-900: #111827      /* Основной текст */

/* Status Colors */
--success: #10B981       /* Успех */
--warning: #F59E0B       /* Предупреждение */
--error: #EF4444         /* Ошибка */
```

#### Типографика:
```css
/* Font Family */
font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;

/* Font Sizes */
text-xs: 0.75rem    /* 12px */
text-sm: 0.875rem   /* 14px */
text-base: 1rem     /* 16px */
text-lg: 1.125rem   /* 18px */
text-xl: 1.25rem    /* 20px */
text-2xl: 1.5rem    /* 24px */

/* Font Weights */
font-light: 300
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
```

#### Spacing System:
```css
/* Tailwind Spacing */
p-1: 0.25rem    /* 4px */
p-2: 0.5rem     /* 8px */
p-3: 0.75rem    /* 12px */
p-4: 1rem       /* 16px */
p-6: 1.5rem     /* 24px */
p-8: 2rem       /* 32px */
```

---

## 📄 Страницы и функциональность

### Dashboard (`/`)

**Маршрут**: Главная страница приложения

**Функциональность**:
- Обзор статистики продаж
- Быстрый доступ к созданию товаров
- Шаблоны карточек товаров
- Последние действия

**Компоненты**:
```typescript
// Основной компонент
const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Товары" value={mockData.totalProducts} />
        <StatCard title="Продажи" value={mockData.totalSales} />
        <StatCard title="Доход" value={mockData.totalRevenue} />
        <StatCard title="Конверсия" value={mockData.conversionRate} />
      </div>
    </Layout>
  );
};
```

**Mock данные**:
```typescript
// mockData.ts
export const mockData = {
  totalProducts: 1247,
  totalSales: 892,
  totalRevenue: 1542000,
  conversionRate: 2.4,
  recentProducts: [...],
  templates: [...]
};
```

### Products (`/products`)

**Маршрут**: Каталог товаров

**Функциональность**:
- Список всех товаров с пагинацией
- Поиск и фильтрация
- Создание нового товара
- Редактирование существующих товаров

**Компоненты**:
```typescript
// Основная страница
const ProductsPage: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { filteredProducts } = useProductsFilter(products, filters);

  return (
    <Layout>
      <ProductsHeader onSearch={setSearchTerm} />
      <Tabs tabs={statusTabs} value={status} onChange={setStatus} />
      <ProductsGrid products={filteredProducts} />
    </Layout>
  );
};
```

**Хуки**:
```typescript
// useProductsFilter.ts
export const useProductsFilter = (products: Product[], filters: ProductsFilter) => {
  return useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesStatus = filters.status === 'all' || product.status === filters.status;
      return matchesSearch && matchesStatus;
    });
  }, [products, filters]);
};
```

### NewProduct (`/new-product`)

**Маршрут**: Создание нового товара

**Функциональность**:
- Форма создания товара
- Выбор шаблона карточки
- Предпросмотр результата
- Валидация данных

**Компоненты**:
```typescript
const NewProductPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>();

  const onSubmit = (data: ProductFormData) => {
    // Создание товара
    toast.success('Товар создан успешно!');
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TemplatePreview />
        <ProductInfoForm onSubmit={handleSubmit(onSubmit)} />
      </div>
    </Layout>
  );
};
```

### ProductDetail (`/products/:id`)

**Маршрут**: Детальная страница товара

**Функциональность**:
- Подробная информация о товаре
- Редактирование данных
- Экспорт карточки
- Управление вариантами товара

**Компоненты**:
```typescript
const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, items, loading, error } = useProductDetail(id);

  return (
    <Layout>
      <ProductCardLarge product={product} />
      <ProductEditForm product={product} onUpdate={handleUpdate} />
      <ItemsGrid items={items} />
    </Layout>
  );
};
```

### Editor (`/editor/:productId`)

**Маршрут**: Визуальный редактор карточек

**Функциональность**:
- Профессиональный редактор карточек
- Inline редактирование текста
- Управление шрифтами (Google Fonts)
- Автолейауты и привязки
- Drag & Drop элементов
- Экспорт в PNG

**Архитектура редактора**:
```
┌─────────────────────────────────────────────────────────────┐
│                    Editor Architecture                     │
├─────────────────────────────────────────────────────────────┤
│  Left Panel    │    Canvas Area    │   Right Panel       │
│  (Layers)      │   (900x1200px)   │  (Properties)       │
│                │                  │                      │
│  • Layer List  │  • Text Elements │  • Text Properties  │
│  • Search      │  • Images        │  • Image Filters    │
│  • Filter      │  • Shapes        │  • Layer Properties │
│  • Grouping    │  • Drag & Drop   │  • Auto Layout      │
│                │  • Inline Edit   │  • Font Manager     │
└─────────────────────────────────────────────────────────────┘
```

**Ключевые компоненты**:
```typescript
// Основной редактор
const EditorPage: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  return (
    <Layout hideSidebar>
      <div className="flex h-screen">
        <LayersPanel layers={layers} onSelect={setSelectedLayerId} />
        <CanvasArea layers={layers} onUpdate={handleUpdateLayer} />
        <PropertiesPanel selectedLayer={selectedLayer} />
      </div>
    </Layout>
  );
};
```

**Inline Text Editor**:
```typescript
// InlineTextEditor.tsx
const InlineTextEditor: React.FC<InlineTextEditorProps> = ({
  layer,
  isEditing,
  onStartEdit,
  onFinishEdit,
  onCancelEdit,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onFinishEdit(text);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancelEdit();
    }
  };

  return isEditing ? (
    <textarea
      value={text}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className="w-full h-full resize-none outline-none"
    />
  ) : (
    <div onDoubleClick={onStartEdit}>
      {layer.text}
    </div>
  );
};
```

**Font Manager**:
```typescript
// FontManager.tsx
const FontManager: React.FC<FontManagerProps> = ({ currentFont, onFontChange }) => {
  const POPULAR_FONTS = [
    'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Montserrat',
    'Inter', 'Playfair Display', 'Merriweather'
  ];

  const handleCustomFontLoad = () => {
    // Загрузка пользовательских шрифтов
    const link = document.createElement('link');
    link.href = customFontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };

  return (
    <div className="space-y-4">
      <input placeholder="Поиск шрифтов..." />
      <div className="max-h-48 overflow-y-auto">
        {filteredFonts.map(font => (
          <div key={font.family} onClick={() => onFontChange(font.family)}>
            <div style={{ fontFamily: font.family }}>{font.family}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 💾 Данные и типы

### TypeScript интерфейсы

#### Product Types:
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  variants: ProductVariant[];
}

interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
}
```

#### Editor Types:
```typescript
interface Layer {
  id: string;
  name: string;
  type: 'text' | 'image' | 'shape' | 'group';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  locked: boolean;
  zIndex: number;
}

interface TextLayer extends Layer {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontColor: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  letterSpacing: number;
  textDecoration: string;
  textShadow: string;
}

interface ImageLayer extends Layer {
  type: 'image';
  src: string;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  filters: {
    grayscale: boolean;
    sepia: boolean;
  };
}

interface ShapeLayer extends Layer {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'triangle';
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}

interface GroupLayer extends Layer {
  type: 'group';
  children: string[];
}
```

#### Component Props:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: 'sm' | 'md' | 'lg';
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
```

### Mock данные

#### Dashboard Mock Data:
```typescript
// pages/Dashboard/mockData.ts
export const mockData = {
  totalProducts: 1247,
  totalSales: 892,
  totalRevenue: 1542000,
  conversionRate: 2.4,
  recentProducts: [
    {
      id: '1',
      name: 'Смартфон iPhone 13',
      category: 'Электроника',
      status: 'active',
      sales: 45,
      revenue: 2250000
    },
    // ... другие товары
  ],
  templates: [
    {
      id: 'template-1',
      name: 'Стандартная карточка',
      description: 'Базовый шаблон для всех товаров',
      preview: '/templates/standard.png'
    }
  ]
};
```

#### Products Mock Data:
```typescript
// pages/Products/mockData.ts
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Смартфон iPhone 13',
    category: 'Электроника',
    description: 'Мощный смартфон с отличной камерой',
    status: 'active',
    image: '/products/iphone-13.jpg',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z'
  },
  // ... другие товары
];
```

---

## 🔧 Development

### Запуск проекта

#### Требования:
- Node.js 18+
- npm 9+

#### Установка зависимостей:
```bash
# В корне проекта
npm install

# В папке приложения
cd apps/web
npm install
```

#### Запуск dev сервера:
```bash
# Из корня проекта
npm run dev

# Или из папки приложения
cd apps/web
npm run dev
```

**Результат**: `http://localhost:5173`

### Доступные команды

```bash
# Development
npm run dev          # Запуск dev сервера
npm run build        # Сборка для продакшена
npm run preview      # Предпросмотр сборки

# Code Quality
npm run lint         # ESLint проверка
npm run type-check   # TypeScript проверка

# Testing (планируется)
npm run test         # Unit тесты
npm run test:e2e     # E2E тесты
```

### Настройки

#### Vite Configuration:
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

#### TypeScript Configuration:
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### Tailwind Configuration:
```javascript
// tailwind.config.cjs
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
```

---

## 📈 Текущее состояние

### ✅ Готово

#### Core Functionality:
- ✅ **React 18 + TypeScript** - Полная настройка
- ✅ **Vite + TailwindCSS** - Build система
- ✅ **React Router v6** - Клиентская маршрутизация
- ✅ **Layout система** - Header, Sidebar, MainContent
- ✅ **UI компоненты** - Button, Card, Input, Select, Modal, Tabs
- ✅ **Responsive дизайн** - Адаптивная верстка

#### Pages:
- ✅ **Dashboard** - Главная страница со статистикой
- ✅ **Products** - Каталог товаров с поиском и фильтрацией
- ✅ **NewProduct** - Создание нового товара
- ✅ **ProductDetail** - Детальная страница товара
- ✅ **Editor** - Визуальный редактор карточек

#### Editor Features:
- ✅ **Canvas система** - 900x1200px рабочая область
- ✅ **Drag & Drop** - Перетаскивание элементов
- ✅ **Inline Text Editing** - Редактирование текста прямо на canvas
- ✅ **Google Fonts** - 10+ популярных шрифтов
- ✅ **Custom Fonts** - Загрузка пользовательских шрифтов
- ✅ **Auto Layout** - Автоматическое расположение элементов
- ✅ **Constraints** - Привязки для адаптивности
- ✅ **Image Properties** - Фильтры и эффекты для изображений
- ✅ **Layers Panel** - Управление слоями
- ✅ **Keyboard Shortcuts** - Горячие клавиши
- ✅ **Export to PNG** - Экспорт карточек

#### Data Management:
- ✅ **TypeScript типы** - Полная типизация
- ✅ **Mock данные** - Тестовые данные для всех страниц
- ✅ **Form validation** - Валидация форм
- ✅ **Error boundaries** - Обработка ошибок
- ✅ **Loading states** - Состояния загрузки

### 🔄 В разработке

#### Performance Optimizations:
- 🔄 **Bundle optimization** - Уменьшение размера бандла
- 🔄 **Lazy loading** - Отложенная загрузка компонентов
- 🔄 **Image optimization** - Оптимизация изображений
- 🔄 **Caching strategy** - Стратегия кэширования

#### Advanced Editor Features:
- 🔄 **Undo/Redo system** - История изменений
- 🔄 **Copy/Paste** - Копирование элементов
- 🔄 **Group operations** - Группировка элементов
- 🔄 **Advanced filters** - Дополнительные фильтры для изображений
- 🔄 **Template system** - Система шаблонов

#### Backend Integration:
- 🔄 **API integration** - Интеграция с бэкендом
- 🔄 **Authentication** - Система аутентификации
- 🔄 **Real-time updates** - Обновления в реальном времени
- 🔄 **Data persistence** - Сохранение данных

### 📋 Запланировано

#### MVP Phase 2:
- 📋 **User authentication** - Регистрация и вход
- 📋 **Product templates** - Шаблоны карточек
- 📋 **Marketplace integration** - Интеграция с маркетплейсами
- 📋 **Bulk operations** - Массовые операции
- 📋 **Analytics dashboard** - Аналитика продаж

#### Advanced Features:
- 📋 **AI-powered suggestions** - ИИ для улучшения карточек
- 📋 **Collaborative editing** - Совместное редактирование
- 📋 **Version control** - Контроль версий карточек
- 📋 **Advanced export** - Экспорт в различные форматы
- 📋 **Mobile app** - Мобильное приложение

---

## 🚀 Следующие шаги

### Приоритеты MVP

#### 1. Backend Integration (Высокий приоритет)
```typescript
// Планируемая структура API
interface ApiEndpoints {
  // Products
  'GET /api/products': Product[];
  'POST /api/products': Product;
  'PUT /api/products/:id': Product;
  'DELETE /api/products/:id': void;
  
  // Templates
  'GET /api/templates': Template[];
  'POST /api/templates': Template;
  
  // Editor
  'POST /api/editor/save': EditorState;
  'GET /api/editor/:id': EditorState;
}
```

#### 2. Authentication System
```typescript
// Планируемая структура аутентификации
interface AuthContext {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}
```

#### 3. Marketplace Integration
```typescript
// Планируемая интеграция с маркетплейсами
interface MarketplaceIntegration {
  wildberries: {
    uploadProduct: (product: Product) => Promise<UploadResult>;
    syncInventory: () => Promise<InventoryUpdate>;
  };
  ozon: {
    uploadProduct: (product: Product) => Promise<UploadResult>;
    syncInventory: () => Promise<InventoryUpdate>;
  };
  yandex: {
    uploadProduct: (product: Product) => Promise<UploadResult>;
    syncInventory: () => Promise<InventoryUpdate>;
  };
}
```

### Техдолг

#### Performance Issues:
- 🔧 **Bundle size** - Текущий размер: ~2.5MB, Цель: <1MB
- 🔧 **Initial load time** - Текущий: ~3s, Цель: <1s
- 🔧 **Editor performance** - Оптимизация при 20+ слоях

#### Code Quality:
- 🔧 **Test coverage** - Текущий: 0%, Цель: >80%
- 🔧 **TypeScript strict mode** - Включить строгий режим
- 🔧 **ESLint rules** - Добавить дополнительные правила
- 🔧 **Prettier** - Настроить форматирование кода

#### Architecture Improvements:
- 🔧 **State management** - Добавить Redux/Zustand для сложного состояния
- 🔧 **Error handling** - Улучшить обработку ошибок
- 🔧 **Logging** - Добавить систему логирования
- 🔧 **Monitoring** - Интеграция с системами мониторинга

### Архитектурные улучшения

#### 1. Micro-frontend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Micro-frontend Architecture             │
├─────────────────────────────────────────────────────────────┤
│  Shell App (React Router)                                 │
│  ├── Dashboard Module                                     │
│  ├── Products Module                                     │
│  ├── Editor Module                                       │
│  └── Auth Module                                         │
└─────────────────────────────────────────────────────────────┘
```

#### 2. Component Library
```typescript
// Планируемая структура UI библиотеки
@unimart/ui/
├── components/
│   ├── Button/
│   ├── Input/
│   ├── Card/
│   └── ...
├── hooks/
├── utils/
└── types/
```

#### 3. Design System
```typescript
// Планируемая дизайн-система
interface DesignTokens {
  colors: ColorPalette;
  typography: TypographyScale;
  spacing: SpacingScale;
  shadows: ShadowScale;
  breakpoints: BreakpointScale;
}
```

---

## 📊 Performance Metrics

### Current Metrics:
- **Bundle Size**: ~2.5MB (gzipped: ~800KB)
- **Initial Load Time**: ~3s
- **Time to Interactive**: ~2.5s
- **Lighthouse Score**: 85/100

### Target Metrics:
- **Bundle Size**: <1MB (gzipped: <300KB)
- **Initial Load Time**: <1s
- **Time to Interactive**: <1.5s
- **Lighthouse Score**: >95/100

### Optimization Strategies:
1. **Code Splitting** - Разделение бандла по маршрутам
2. **Tree Shaking** - Удаление неиспользуемого кода
3. **Image Optimization** - WebP формат, lazy loading
4. **Caching** - Service Worker для кэширования
5. **CDN** - Использование CDN для статических ресурсов

---

## 🔗 Важные файлы и ссылки

### Core Files:
- [`apps/web/src/App.tsx`](./apps/web/src/App.tsx) - Основной компонент приложения
- [`apps/web/src/components/Layout.tsx`](./apps/web/src/components/Layout.tsx) - Layout система
- [`apps/web/src/pages/Editor/index.tsx`](./apps/web/src/pages/Editor/index.tsx) - Визуальный редактор
- [`apps/web/src/pages/Editor/types/editor.types.ts`](./apps/web/src/pages/Editor/types/editor.types.ts) - Типы редактора

### Configuration Files:
- [`apps/web/package.json`](./apps/web/package.json) - Зависимости и скрипты
- [`apps/web/vite.config.ts`](./apps/web/vite.config.ts) - Конфигурация Vite
- [`apps/web/tailwind.config.cjs`](./apps/web/tailwind.config.cjs) - Конфигурация Tailwind
- [`apps/web/tsconfig.json`](./apps/web/tsconfig.json) - TypeScript конфигурация

### Key Components:
- [`apps/web/src/pages/Editor/components/InlineTextEditor.tsx`](./apps/web/src/pages/Editor/components/InlineTextEditor.tsx) - Inline редактирование
- [`apps/web/src/pages/Editor/components/FontManager.tsx`](./apps/web/src/pages/Editor/components/FontManager.tsx) - Управление шрифтами
- [`apps/web/src/pages/Editor/components/AutoLayout.tsx`](./apps/web/src/pages/Editor/components/AutoLayout.tsx) - Автолейауты
- [`apps/web/src/pages/Editor/hooks/useDragAndDrop.ts`](./apps/web/src/pages/Editor/hooks/useDragAndDrop.ts) - Drag & Drop логика

---

## 📝 Changelog

### v1.0.0 (2024-01-25)
#### ✨ Новые возможности:
- **Inline Text Editor** - Редактирование текста прямо на canvas
- **Google Fonts Integration** - 10+ популярных шрифтов
- **Custom Font Loading** - Загрузка пользовательских шрифтов
- **Auto Layout System** - Автоматическое расположение элементов
- **Constraints System** - Привязки для адаптивности
- **Enhanced Rich Text Editor** - Табы и расширенные возможности
- **Professional Drag & Drop** - Улучшенное перетаскивание элементов

#### 🔧 Улучшения:
- Обновлена архитектура редактора
- Добавлены новые TypeScript типы
- Улучшена производительность canvas
- Оптимизированы компоненты UI

#### 🐛 Исправления:
- Исправлены проблемы с импортами
- Улучшена обработка ошибок
- Исправлены проблемы с TypeScript

---

## 📝 Заключение

UniMart MVP представляет собой современную платформу для автоматизации создания карточек товаров с профессиональным визуальным редактором. Проект построен на современном стеке технологий с фокусом на производительность и пользовательский опыт.

### Ключевые достижения:
- ✅ **Полнофункциональный редактор** с inline редактированием
- ✅ **Профессиональные возможности** (Google Fonts, Auto Layout)
- ✅ **Современная архитектура** (React 18, TypeScript, Vite)
- ✅ **Responsive дизайн** с адаптивной версткой
- ✅ **Готовность к масштабированию** с монорепозиторием

### Следующие приоритеты:
1. **Backend интеграция** - API для сохранения данных
2. **Аутентификация** - Система пользователей
3. **Интеграция с маркетплейсами** - Автоматическая загрузка
4. **Performance оптимизация** - Улучшение производительности
5. **Testing** - Покрытие тестами

Проект готов к активной разработке и имеет прочную основу для дальнейшего развития! 🚀 