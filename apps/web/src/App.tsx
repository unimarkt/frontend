import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy loading для страниц
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const NewProductPage = React.lazy(() => import('./pages/NewProduct'));
const ProductsPage = React.lazy(() => import('./pages/Products'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetail'));
const EditorPage = React.lazy(() => import('./pages/Editor'));

// Компонент загрузки
const PageLoader: React.FC = () => (
  <div className="flex justify-center items-center h-64">
    <LoadingSpinner size="lg" />
  </div>
);

// Тестовый компонент для проверки роутинга
const TestPage: React.FC = () => (
  <div className="flex min-h-screen bg-gray-50">
    <div className="flex-1 flex flex-col">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Тестовая страница</h1>
        <p className="text-gray-600 mb-4">Роутинг работает!</p>
        <div className="space-y-2">
          <a href="/" className="block text-blue-500 hover:underline">Главная</a>
          <a href="/products" className="block text-blue-500 hover:underline">Продукты</a>
          <a href="/new-product" className="block text-blue-500 hover:underline">Новый продукт</a>
          <a href="/editor/new" className="block text-blue-500 hover:underline">Редактор (new)</a>
          <a href="/editor/123" className="block text-blue-500 hover:underline">Редактор (123)</a>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-product" element={<NewProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/editor/:productId" element={<EditorPage />} />
          <Route path="/test" element={<TestPage />} />
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
  );
}
