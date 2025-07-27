import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

export interface BreadcrumbItem { 
  label: string; 
  to: string;
  isActive?: boolean;
}

export interface LayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  hideSidebar?: boolean;
  hideHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  title, 
  subtitle, 
  children, 
  actions, 
  breadcrumbs, 
  hideSidebar = false,
  hideHeader = false 
}) => {
  const location = useLocation();

  // Автоматическое создание breadcrumbs на основе пути
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Главная', to: '/', isActive: location.pathname === '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Преобразование сегмента в читаемый текст
      let label = segment;
      if (segment === 'products') label = 'Продукты';
      else if (segment === 'new') label = 'Новый продукт';
      else if (segment === 'constructor') label = 'Конструктор';
      else if (segment === 'styles') label = 'Стили';
      else if (segment === 'basket') label = 'Корзина';
      else if (segment === 'profile') label = 'Профиль';
      else if (segment === 'analytics') label = 'Аналитика';
      else if (segment === 'templates') label = 'Шаблоны';
      else if (segment === 'edit') label = 'Редактирование';
      else {
        // Капитализация первой буквы
        label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }

      breadcrumbs.push({
        label,
        to: currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  };

  const finalBreadcrumbs = breadcrumbs || generateBreadcrumbs();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {!hideHeader && <Header />}
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4 w-full">
          {/* Breadcrumbs */}
          {finalBreadcrumbs.length > 1 && (
            <nav className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              {finalBreadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.to}>
                  <a 
                    href={breadcrumb.to} 
                    className={`hover:underline transition-colors ${
                      breadcrumb.isActive 
                        ? "text-primary-600 font-medium" 
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {breadcrumb.label}
                  </a>
                  {index < finalBreadcrumbs.length - 1 && (
                    <span className="text-gray-300">/</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Заголовок страницы */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-3">
                {actions}
              </div>
            )}
          </div>

          {/* Основной контент */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Layout); 