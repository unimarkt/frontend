import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <nav className="fixed top-0 left-24 right-0 h-16 bg-gray-50 flex items-center justify-between px-6 z-40">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 flex-1 max-w-md">
        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Найти"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSearch}
          className="bg-transparent outline-none text-sm flex-1"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* New Product Button */}
        <button 
          onClick={handleCreateProduct}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Новый продукт
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={handleNotifications}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-shadow"
          >
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 25">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8ZM12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z"/>
            </svg>
          </button>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
            7
          </div>
        </div>

        {/* Profile */}
        <button 
          onClick={handleProfileClick}
          className="bg-white rounded-full p-2 hover:shadow-md transition-shadow flex items-center"
        >
          <img src="/img/avatars.png" alt="Profile" className="w-6 h-6 rounded-full mr-2" />
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </nav>
  );
});

export default Header; 