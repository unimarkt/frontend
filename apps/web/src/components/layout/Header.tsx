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
    <nav className="fixed top-0 left-24 right-0 h-16 bg-white flex items-center justify-between px-6 z-40 border-b border-gray-200">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-md">
        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Найти"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSearch}
          className="bg-transparent outline-none text-sm flex-1 text-gray-600"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* New Product Button */}
        <button 
          onClick={handleCreateProduct}
          className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Новый продукт
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={handleNotifications}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-shadow border border-gray-200"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4998 15.8332C12.4998 17.2139 11.3805 18.3332 9.99977 18.3332C8.61906 18.3332 7.49977 17.2139 7.49977 15.8332M11.4969 5.19864C11.8598 4.8237 12.0831 4.31285 12.0831 3.74984C12.0831 2.59924 11.1504 1.6665 9.99977 1.6665C8.84917 1.6665 7.91643 2.59924 7.91643 3.74984C7.91643 4.31285 8.13977 4.8237 8.50268 5.19864M14.9998 9.33317C14.9998 8.1839 14.473 7.0817 13.5353 6.26904C12.5976 5.45638 11.3258 4.99984 9.99977 4.99984C8.67368 4.99984 7.40192 5.45638 6.46423 6.26904C5.52655 7.0817 4.99977 8.1839 4.99977 9.33317C4.99977 11.2347 4.52821 12.6253 3.93982 13.6204C3.26922 14.7545 2.93391 15.3216 2.94715 15.457C2.9623 15.612 2.9902 15.6609 3.11588 15.7528C3.22574 15.8332 3.77769 15.8332 4.88159 15.8332H15.1179C16.2218 15.8332 16.7738 15.8332 16.8837 15.7528C17.0093 15.6609 17.0372 15.612 17.0524 15.457C17.0656 15.3216 16.7303 14.7545 16.0597 13.6204C15.4713 12.6253 14.9998 11.2347 14.9998 9.33317Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
            7
          </div>
        </div>

        {/* Profile */}
        <button 
          onClick={handleProfileClick}
          className="bg-white rounded-full p-2 hover:shadow-md transition-shadow flex items-center border border-gray-200"
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