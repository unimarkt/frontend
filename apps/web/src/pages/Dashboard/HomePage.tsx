import React from 'react';
import MainContent from '../../components/layout/MainContent';

const HomePage: React.FC = () => {
  return (
    <MainContent>
      <div className="max-w-none mx-auto">
        {/* Welcome Section */}
        <div className="grid grid-cols-12 gap-4 mb-8">
          <div className="col-span-4 rounded-3xl p-6">
            <h1 className="text-2xl font-semibold text-black mb-4">
              Здравствуй, User! Что будем создавать сегодня?
            </h1>
            <p className="text-sm text-gray-600">
              Организуйте каталоги, настраивайте дизайн, используйте шаблоны и автоматизируйте загрузку через API.
            </p>
          </div>
          
          <div className="col-span-2 bg-gray-200 rounded-3xl p-6 flex items-center justify-center hover:bg-blue-500 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-white">
              <svg className="w-6 h-6 text-white group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          
          <div className="col-span-2 bg-white rounded-3xl p-6 flex items-center justify-between hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <div className="flex-1 mr-3">
              <h3 className="text-sm font-semibold text-black mb-2">Используй шаблоны</h3>
              <p className="text-sm text-gray-600">Быстрое создание карточек</p>
            </div>
            <div className="w-16 h-16 flex-shrink-0" style={{ backgroundImage: 'url(/img/buttons/Template.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
          
          <div className="col-span-2 bg-white rounded-3xl p-6 flex items-center justify-between hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <div className="flex-1 mr-3">
              <h3 className="text-sm font-semibold text-black mb-2">Аналитика</h3>
              <p className="text-sm text-gray-600">Метрики и исследования</p>
            </div>
            <div className="w-16 h-16 flex-shrink-0" style={{ backgroundImage: 'url(/img/buttons/Stats.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
          
          <div className="col-span-2 bg-white rounded-3xl p-6 flex items-center justify-between hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <div className="flex-1 mr-3">
              <h3 className="text-sm font-semibold text-black mb-2">Работа с API</h3>
              <p className="text-sm text-gray-600">Настройки автозагрузки</p>
            </div>
            <div className="w-16 h-16 flex-shrink-0" style={{ backgroundImage: 'url(/img/buttons/Api.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
        </div>

        {/* Second Row - Two Main Blocks */}
        <div className="grid grid-cols-12 gap-4 mb-8">
          {/* Left Block - 8 columns */}
          <div className="col-span-8 space-y-4">
            {/* First row in left block - 5+3 columns */}
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-5 bg-white rounded-3xl p-6">
                <h2 className="text-xl font-semibold text-black mb-4">Обзор карточек</h2>
                <p className="text-gray-600 mb-4">Быстрое создание карточки товаров</p>
                
                {/* Product Cards Grid */}
                <div className="grid grid-cols-5 gap-3">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="w-full h-20 bg-gray-100 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="col-span-3 bg-white rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-black mb-4">Быстрая статистика</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Карточек сегодня</span>
                    <span className="text-xl font-bold text-blue-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Новых товаров</span>
                    <span className="text-xl font-bold text-green-600">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Просмотров</span>
                    <span className="text-xl font-bold text-purple-600">1.2k</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second row in left block - Product List */}
            <div className="bg-white rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-black">Список продуктов</h2>
                  <p className="text-gray-600">Полный каталог всех товаров и связанных карточек.</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Добавить продукт
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Название продукта</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Категория</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Товары</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Карточки</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Дата изменения</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Заметки</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img src="/img/avatars.png" alt="Product" className="w-8 h-8 rounded mr-3" />
                          <span className="text-sm font-medium">Чемодомик</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">Игрушки</td>
                      <td className="py-3 px-4 text-sm text-gray-600">15 штук</td>
                      <td className="py-3 px-4 text-sm text-gray-600">150 штук</td>
                      <td className="py-3 px-4 text-sm text-gray-600">2024-09-25 11:00</td>
                      <td className="py-3 px-4 text-sm text-gray-600">Первые чемодомики</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Активна</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img src="/img/avatars.png" alt="Product" className="w-8 h-8 rounded mr-3" />
                          <span className="text-sm font-medium">Чемодомик</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">Игрушки</td>
                      <td className="py-3 px-4 text-sm text-gray-600">15 штук</td>
                      <td className="py-3 px-4 text-sm text-gray-600">150 штук</td>
                      <td className="py-3 px-4 text-sm text-gray-600">2024-09-25 11:00</td>
                      <td className="py-3 px-4 text-sm text-gray-600">Первые чемодомики</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">Черновик</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img src="/img/avatars.png" alt="Product" className="w-8 h-8 rounded mr-3" />
                          <span className="text-sm font-medium">Чемодомик</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">Игрушки</td>
                      <td className="py-3 px-4 text-sm text-gray-600">15 штук</td>
                      <td className="py-3 px-4 text-sm text-gray-600">150 штук</td>
                      <td className="py-3 px-4 text-sm text-gray-600">2024-09-25 11:00</td>
                      <td className="py-3 px-4 text-sm text-gray-600">Первые чемодомики</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Ожидание</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Right Block - 4 columns */}
          <div className="col-span-4 space-y-4">
            {/* First row in right block - Statistics */}
            <div className="bg-white rounded-3xl p-6 h-80">
              <h3 className="text-lg font-semibold text-black mb-4">Общая статистика</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Всего карточек</span>
                  <span className="text-2xl font-bold text-blue-600">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Активных товаров</span>
                  <span className="text-2xl font-bold text-green-600">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Шаблонов</span>
                  <span className="text-2xl font-bold text-purple-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Просмотров</span>
                  <span className="text-2xl font-bold text-orange-600">5.2k</span>
                </div>
              </div>
            </div>
            
            {/* Second row in right block - Split into 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              {/* Banner */}
              <div className="bg-gray-900 rounded-3xl p-4 flex flex-col justify-between h-48">
                <div className="text-white">
                  <h4 className="text-sm font-semibold mb-2">Получи полный доступ</h4>
                  <p className="text-xs text-gray-300 mb-4">Ко всем функциям нашего сервиса и ускорь работу</p>
                </div>
                <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                  Стать про
                </button>
              </div>
              
              {/* Statistics split into 2 rows */}
              <div className="space-y-2">
                <div className="bg-white rounded-2xl p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
                    <div className="text-xs text-gray-600">Новых карточек</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">89%</div>
                    <div className="text-xs text-gray-600">Эффективность</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default HomePage; 