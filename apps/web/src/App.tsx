import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import apolloClient from './utils/apollo';

// Lazy loading для страниц
const HomePage = React.lazy(() => import('./pages/Dashboard/HomePage'));
const NewProductPage = React.lazy(() => import('./pages/Products/NewProduct'));
const ProductsPage = React.lazy(() => import('./pages/Products'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetail'));
const EditorPage = React.lazy(() => import('./pages/Editor'));
const ProductEditorPage = React.lazy(() => import('./pages/Products/ProductEditor'));
const InDevelopment = React.lazy(() => import('./pages/InDevelopment'));
const AuthPage = React.lazy(() => import('./pages/Auth'));
const AuthDemo = React.lazy(() => import('./pages/Demo/AuthDemo'));

// Компонент загрузки
const PageLoader: React.FC = () => (
  <div className="flex justify-center items-center h-64">
    <LoadingSpinner size="lg" />
  </div>
);

// Компонент 404
const NotFound: React.FC = () => (
  <InDevelopment 
    pageName="Страница не найдена" 
    expectedDate="Никогда"
    features={[
      "Проверьте правильность URL",
      "Используйте навигацию для перехода",
      "Обратитесь к администратору"
    ]}
    showBackButton={false}
  />
);

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          {/* Страницы аутентификации */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          
          {/* Главная страница */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          
          {/* Демо страницы */}
          <Route path="/demo/auth" element={<AuthDemo />} />
          
          {/* Страницы продуктов */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<NewProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/:id/edit" element={<ProductEditorPage />} />
          <Route path="/editor/:productId" element={<EditorPage />} />
          
          {/* Страницы в разработке */}
          <Route path="/constructor" element={<EditorPage />} />
          
          <Route path="/styles" element={
            <InDevelopment 
              pageName="Стили" 
              expectedDate="Q1 2024"
              features={[
                "Управление цветовыми схемами",
                "Типографика и шрифты",
                "Настройка компонентов",
                "Предпросмотр стилей"
              ]}
            />
          } />
          
          <Route path="/basket" element={
            <InDevelopment 
              pageName="Корзина" 
              expectedDate="Q2 2024"
              features={[
                "Удаленные продукты",
                "Восстановление",
                "Очистка корзины",
                "Массовые операции"
              ]}
            />
          } />
          
          <Route path="/profile" element={
            <InDevelopment 
              pageName="Профиль" 
              expectedDate="Q2 2024"
              features={[
                "Настройки аккаунта",
                "Управление подпиской",
                "История активности",
                "API ключи"
              ]}
            />
          } />
          
          <Route path="/analytics" element={
            <InDevelopment 
              pageName="Аналитика" 
              expectedDate="Q3 2024"
              features={[
                "Статистика продаж",
                "Анализ эффективности карточек",
                "Отчеты и дашборды",
                "Интеграция с маркетплейсами"
              ]}
            />
          } />
          
          <Route path="/templates" element={
            <InDevelopment 
              pageName="Галерея шаблонов" 
              expectedDate="Q1 2024"
              features={[
                "Готовые шаблоны карточек",
                "Категории шаблонов",
                "Предпросмотр и настройка",
                "Импорт/экспорт шаблонов"
              ]}
            />
          } />
          
          {/* 404 страница */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}
