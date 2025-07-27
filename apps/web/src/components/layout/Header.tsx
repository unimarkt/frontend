import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import { AvatarFromSprite } from "../../utils/avatars";
import { Search, Bell, Plus, ChevronDown } from "lucide-react";

const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // TODO: Реализовать поиск по продуктам
      console.log("Поиск:", searchValue);
    }
  };

  const handleCreateProduct = () => {
    navigate('/products/new');
  };

  const handleNotifications = () => {
    // TODO: Открыть панель уведомлений
    console.log("Открыть уведомления");
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-8 h-[76px]">
      {/* Поиск */}
      <div className="flex items-center gap-2 w-[300px]">
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 w-full">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 border-0 bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
              placeholder="Найти продукты..."
              type="search"
              aria-label="Поиск продуктов"
            />
          </div>
        </form>
      </div>

      {/* Правая часть */}
      <div className="flex items-center gap-4">
        {/* Уведомления */}
        <div className="relative">
          <Button 
            onClick={handleNotifications}
            className="w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
            aria-label="Уведомления"
          >
            <Bell className="w-6 h-6 text-gray-700" />
          </Button>
          <Badge className="absolute -top-1.5 -right-1.5 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-xs font-medium">
            7
          </Badge>
        </div>

        {/* Создать новый продукт */}
        <Button
          onClick={handleCreateProduct}
          className="flex items-center gap-2 px-6 py-3 rounded-[50px] bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Новый продукт</span>
        </Button>

        {/* Профиль пользователя */}
        <Button 
          onClick={handleProfileClick}
          className="flex items-center gap-2 py-1 pl-1 pr-2 bg-white rounded-[50px] border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <AvatarFromSprite 
            avatarId={1}
            size="md"
          />
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </div>
    </header>
  );
});

export default Header; 