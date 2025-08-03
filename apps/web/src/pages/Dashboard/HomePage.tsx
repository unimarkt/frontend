import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainContent from '../../components/layout/MainContent';
import { mockRecentCards, mockApiTasks, mockProducts, mockQuickActions } from './mockData';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <MainContent>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6 font-['Manrope',-apple-system,BlinkMacSystemFont,'Segoe_UI',system-ui,sans-serif]">
        
        {/* Верхняя секция - Hero с быстрыми действиями */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Левая часть - Главный заголовок и CTA */}
          <div className="col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 h-[280px] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <h1 className="text-[2.5rem] font-bold text-gray-900 leading-[1.1] tracking-tight">
                  Что хочешь создать сегодня?
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Организуйте каталоги, настраивайте дизайн, используйте шаблоны 
                  и автоматизируйте загрузку через API.
                </p>
              </div>
              <button 
                className="bg-blue-600 text-white py-4 px-8 rounded-xl text-sm font-semibold w-fit hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => {
                  console.log('Открыть обучающее видео');
                }}
              >
                Обучающее видео
              </button>
            </div>
          </div>

          {/* Правая часть - Быстрые действия */}
          <div className="col-span-8">
            <div className="grid grid-cols-4 gap-6 h-[280px]">
              {mockQuickActions.map((action) => (
                <div 
                  key={action.id} 
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between cursor-pointer hover:shadow-lg hover:scale-105 hover:border-blue-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => {
                    switch(action.action) {
                      case 'create':
                        navigate('/constructor');
                        break;
                      case 'templates':
                        navigate('/templates');
                        break;
                      case 'analytics':
                        navigate('/analytics');
                        break;
                      case 'api':
                        navigate('/api');
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">{action.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{action.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Средняя секция - Обзор карточек и метрики */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Левая часть - Обзор карточек */}
          <div className="col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 h-[360px] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900 leading-tight">Обзор карточек</h2>
                  <button 
                    onClick={() => navigate('/products')}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Все карточки →
                  </button>
                </div>
                <p className="text-gray-600">Последние редактируемые карточки</p>
              </div>
              
              {/* Карточки продуктов */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className="w-[100px] h-[133px] bg-gray-100 rounded-xl mb-3 mx-auto overflow-hidden border border-gray-200 relative hover:shadow-md transition-all duration-200">
                      <img 
                        src={`/img/cards/WB${index}.jpg`} 
                        alt={`Карточка ${index}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-medium tabular-nums">2024-09-25 11:00</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Центральная часть - Метрики */}
          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-6 h-[360px]">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-gray-900 tabular-nums leading-none">35%</div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight">Лучший CTR карточки</div>
                  <div className="text-sm text-gray-600">Смотреть карточку</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '35%'}}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-gray-900 tabular-nums leading-none">12%</div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight">Добавление в корзину</div>
                  <div className="text-sm text-gray-600">Смотреть карточку</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '12%'}}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-gray-900 tabular-nums leading-none">145</div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight">Заказов за неделю</div>
                  <div className="text-sm text-gray-600">Смотреть товар</div>
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 7z" clipRule="evenodd" />
                  </svg>
                  +14%
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-gray-900 tabular-nums leading-none">+14%</div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight">Динамика просмотров</div>
                  <div className="text-sm text-gray-600">Смотреть товар</div>
                </div>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 7z" clipRule="evenodd" />
                  </svg>
                  +8%
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть - Работа с API */}
          <div className="col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 h-[360px] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">Работа с API</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-gray-600">Последние загрузки</p>
                
                <div className="space-y-3 overflow-y-auto max-h-[240px] pr-2">
                  {[
                    { title: 'Загрузка карточек', status: 'success', time: '11:00', image: 'WB1.jpg' },
                    { title: 'Аналитика продаж', status: 'pending', time: '11:00', image: 'WB3.jpg' },
                    { title: 'Загрузка товаров', status: 'error', time: '11:00', image: 'WB2.jpg' },
                    { title: 'Аналитика конверсий', status: 'success', time: '11:00', image: 'WB4.jpg' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={`/img/cards/${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">{item.title}</div>
                        <div className="text-xs text-gray-500 tabular-nums">{item.time}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'success' ? 'bg-green-100 text-green-700' :
                        item.status === 'error' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status === 'success' ? 'Выполнено' :
                         item.status === 'error' ? 'Ошибка' : 'В очереди'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя секция - Таблица продуктов и баннеры */}
        <div className="grid grid-cols-12 gap-6">
          {/* Левая часть - Список продуктов */}
          <div className="col-span-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 leading-tight mb-2">Список продуктов</h2>
                    <p className="text-gray-600">Полный каталог всех товаров и связанных карточек</p>
                  </div>
                  <button className="bg-blue-600 text-white py-3 px-6 rounded-xl text-sm font-semibold hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Добавить продукт
                  </button>
                </div>
              </div>

              {/* Таблица */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" className="rounded border-gray-300 focus:ring-blue-500" />
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Название продукта</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Категория</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Товары</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Карточки</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Дата изменения</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Заметки</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: 'Чемодомик', category: 'Игрушки', items: '15 штук', cards: '150 штук', date: '2024-09-25 11:00', notes: 'Первые чемодомики', status: 'active', image: 'WB1.jpg' },
                      { name: 'Чемодомик', category: 'Игрушки', items: '15 штук', cards: '150 штук', date: '2024-09-25 11:00', notes: 'Первые чемодомики', status: 'draft', image: 'WB2.jpg' },
                      { name: 'Чемодомик', category: 'Игрушки', items: '15 штук', cards: '150 штук', date: '2024-09-25 11:00', notes: 'Первые чемодомики', status: 'pending', image: 'WB3.jpg' }
                    ].map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <input type="checkbox" className="rounded border-gray-300 focus:ring-blue-500" />
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                              <img src={`/img/cards/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900 font-medium">{product.category}</td>
                        <td className="py-4 px-6 text-sm text-gray-900 font-medium tabular-nums">{product.items}</td>
                        <td className="py-4 px-6 text-sm text-gray-900 font-medium tabular-nums">{product.cards}</td>
                        <td className="py-4 px-6 text-sm text-gray-900 font-medium tabular-nums">{product.date}</td>
                        <td className="py-4 px-6 text-sm text-gray-900 font-medium">{product.notes}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.status === 'active' ? 'bg-green-100 text-green-700' :
                            product.status === 'draft' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {product.status === 'active' ? 'Активна' :
                             product.status === 'draft' ? 'Черновик' : 'Ожидание'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Правая часть - Баннеры и статистика */}
          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Левая колонка - Pro баннер */}
              <div className="col-span-1">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white h-full flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-gray-700 text-6xl font-bold opacity-20">S</div>
                  
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 mb-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1C8.676 1 6 3.676 6 7v2H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4z" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-base leading-relaxed font-medium">
                      <div>Получи полный доступ</div>
                      <div>ко всем функциям</div>
                      <div>нашего сервиса и</div>
                      <div>ускорь работу</div>
                    </div>
                    <button className="bg-white text-gray-900 py-3 px-6 rounded-xl text-sm font-semibold w-fit hover:bg-gray-100 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                      Стать про
                    </button>
                  </div>
                </div>
              </div>

              {/* Правая колонка - Статистика и сообщество */}
              <div className="col-span-1 space-y-6">
                {/* Статистика времени */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-gray-900 tabular-nums leading-none">35</div>
                    <div className="text-sm font-semibold text-gray-900 leading-tight">Часов сэкономлено</div>
                    <div className="text-sm font-semibold text-gray-900 leading-tight">за неделю</div>
                    <div className="text-xs text-gray-500">на 3% больше прошлой</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>

                {/* Сообщество */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">Вступай в наше сообщество</h3>
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