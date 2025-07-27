import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Separator from "../ui/Separator";
import { HomeIcon, LayersIcon, LayoutIcon, BrushIcon, TrashIcon, UserIcon, BarChartIcon, ImagePlusIcon } from "../../assets/icons";
import { LogoIcon } from "../../assets/icons";

const menu = [
  { id: "home", label: "Главная", icon: <HomeIcon className="w-5 h-5" />, to: "/" },
  { id: "products", label: "Продукты", icon: <LayoutIcon className="w-5 h-5" />, to: "/products" },
];

const workspace = [
  { id: "constructor", label: "Конструктор", icon: <LayersIcon className="w-5 h-5" />, to: "/constructor" },
  { id: "styles", label: "Стили", icon: <BrushIcon className="w-5 h-5" />, to: "/styles" },
  { id: "templates", label: "Шаблоны", icon: <ImagePlusIcon className="w-5 h-5" />, to: "/templates" },
  { id: "analytics", label: "Аналитика", icon: <BarChartIcon className="w-5 h-5" />, to: "/analytics" },
];

const tools = [
  { id: "basket", label: "Корзина", icon: <TrashIcon className="w-5 h-5" />, to: "/basket" },
  { id: "profile", label: "Профиль", icon: <UserIcon className="w-5 h-5" />, to: "/profile" },
];

const Sidebar: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col min-h-screen">
      {/* Логотип */}
      <div 
        className="flex items-center gap-2 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleLogoClick}
      >
        <LogoIcon width={32} height={32} />
        <span className="font-bold text-xl text-primary-500">UniMart</span>
      </div>

      {/* Навигация */}
      <nav className="flex-1 flex flex-col gap-6 px-4">
        {/* Основное меню */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2 px-3">Меню</h3>
          {menu.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-primary-50 text-primary-600 font-semibold border border-primary-200" 
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              aria-label={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <Separator />

        {/* Рабочее пространство */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2 px-3">Рабочее пространство</h3>
          {workspace.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-primary-50 text-primary-600 font-semibold border border-primary-200" 
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              aria-label={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <Separator />

        {/* Инструменты */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2 px-3">Инструменты</h3>
          {tools.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-primary-50 text-primary-600 font-semibold border border-primary-200" 
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              aria-label={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Кнопка сворачивания */}
      <div className="p-4">
        <Button 
          className="w-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" 
          aria-label="Свернуть меню"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </Button>
      </div>
    </aside>
  );
});

export default Sidebar; 