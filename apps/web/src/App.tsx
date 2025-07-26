import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy loading для страниц
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const NewProductPage = React.lazy(() => import('./pages/NewProduct'));
const ProductsPage = React.lazy(() => import('./pages/Products'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetail'));

// Компонент загрузки
const PageLoader: React.FC = () => (
  <div className="flex justify-center items-center h-64">
    <LoadingSpinner size="lg" />
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
