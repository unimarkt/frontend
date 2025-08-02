import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-24 bg-gray-50 flex flex-col items-center py-6 z-50">
        {/* Logo */}
        <img src="/img/logo.png" alt="UniMart" className="w-8 h-8 mb-8" />
        
        {/* Menu Items */}
        <div className="flex flex-col items-center space-y-4 flex-1">
          {/* Home */}
          <div className="relative group">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Домой
            </div>
          </div>
          
          {/* Products */}
          <div className="relative group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors">
              <svg className="w-5 h-5 text-black group-hover:text-white" fill="currentColor" viewBox="0 0 24 25">
                <path d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"/>
              </svg>
            </div>
            <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Продукты
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-8 h-px bg-gray-300"></div>
          
          {/* Editor */}
          <div className="relative group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors">
              <svg className="w-5 h-5 text-black group-hover:text-white" fill="currentColor" viewBox="0 0 24 25">
                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l1.947-1.757a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
              </svg>
            </div>
            <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Конструктор
            </div>
          </div>
          
          {/* Design */}
          <div className="relative group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors">
              <svg className="w-5 h-5 text-black group-hover:text-white" fill="currentColor" viewBox="0 0 24 25">
                <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
              </svg>
            </div>
            <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Шаблоны
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-8 h-px bg-gray-300"></div>
          
          {/* Analytics */}
          <div className="relative group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors">
              <svg className="w-5 h-5 text-black group-hover:text-white" fill="currentColor" viewBox="0 0 24 25">
                <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
              </svg>
            </div>
            <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Аналитика
            </div>
          </div>
          
          {/* Links */}
          <div className="relative group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors">
              <svg className="w-5 h-5 text-black group-hover:text-white" fill="currentColor" viewBox="0 0 24 25">
                <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
            </div>
            <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Работа с API
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-8 h-px bg-gray-300"></div>
          
          {/* Trash */}
          <div className="relative group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors">
              <svg className="w-5 h-5 text-blue-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 25">
                <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
              </svg>
            </div>
            <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Корзина
            </div>
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-24 right-0 h-16 bg-gray-50 flex items-center justify-between px-6 z-40">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 flex-1 max-w-md">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Найти"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* New Product Button */}
          <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Новый продукт
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-shadow">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 25">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8ZM12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z"/>
              </svg>
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              7
            </div>
          </div>

          {/* Profile */}
          <button className="bg-white rounded-full p-2 hover:shadow-md transition-shadow flex items-center">
            <img src="/img/avatars.png" alt="Profile" className="w-6 h-6 rounded-full mr-2" />
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-24 mt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout; 