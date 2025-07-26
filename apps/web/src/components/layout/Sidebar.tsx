import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import Separator from "../ui/Separator";
import { HomeIcon, LayersIcon, LayoutIcon } from "../../assets/icons/DashboardIcons";
import { LogoIcon } from "../../assets/icons";

const menu = [
  { id: "home", label: "Домой", icon: <HomeIcon className="w-5 h-5" />, to: "/" },
  { id: "products", label: "Продукты", icon: <LayoutIcon className="w-5 h-5" />, to: "/products" },
];
const workspace = [
  { id: "constructor", label: "Конструктор", icon: <LayersIcon className="w-5 h-5" />, to: "/constructor" },
  { id: "styles", label: "Стили", icon: <LayersIcon className="w-5 h-5" />, to: "/styles" },
  { id: "trash", label: "Корзина", icon: <LayoutIcon className="w-5 h-5" />, to: "/trash" },
];

const Sidebar: React.FC = React.memo(() => (
  <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col min-h-screen">
    <div className="flex items-center gap-2 px-6 py-4">
      <LogoIcon width={32} height={32} />
      <span className="font-bold text-xl text-primary-500">UniMart</span>
    </div>
    <nav className="flex-1 flex flex-col gap-6 px-4">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-2">Меню</h3>
        {menu.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? "bg-primary-50 text-primary-500 font-semibold" : "text-gray-700"
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
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-2">Рабочее пространство</h3>
        {workspace.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? "bg-primary-50 text-primary-500 font-semibold" : "text-gray-700"
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
    <div className="p-4">
      <Button className="p-2 text-gray-400 hover:text-gray-600" aria-label="Свернуть меню">
        <span className="sr-only">Свернуть меню</span>
      </Button>
    </div>
  </aside>
));

export default Sidebar; 