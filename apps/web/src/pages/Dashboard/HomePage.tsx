import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainContent from '../../components/layout/MainContent';
import { mockRecentCards, mockApiTasks, mockProducts, mockQuickActions } from './mockData';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <MainContent>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
        {/* Верхняя секция - Hello */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Левая часть - Заголовок и кнопка (4 столбца) */}
          <div className="col-span-4">
            <div className="rounded-[25.6px] p-6 h-[206px] flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-black mb-3">
                  Что хочешь создать сегодня?
                </h1>
                <p className="text-[12.82px] text-black leading-[19.87px]">
                  Организуйте каталоги, настраивайте дизайн, используйте шаблоны<br />
                  и автоматизируйте загрузку через API.
                </p>
              </div>
              <button 
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium w-fit hover:bg-gray-800 transition-colors"
                onClick={() => {
                  // TODO: Открыть обучающее видео или модальное окно
                  console.log('Открыть обучающее видео');
                }}
              >
                Обучающее видео
              </button>
            </div>
          </div>

          {/* Правая часть - Быстрые действия (8 столбцов, 4 блока в ряд) */}
          <div className="col-span-8">
            <div className="grid grid-cols-4 gap-4 h-[206px]">
              {mockQuickActions.map((action) => (
                <div 
                  key={action.id} 
                  className="bg-white rounded-[25.6px] p-4 flex flex-col justify-end cursor-pointer hover:bg-gray-50 transition-colors"
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
                  <h3 className="text-[12.82px] font-semibold text-black mb-1">{action.title}</h3>
                  <p className="text-[12.82px] text-black">{action.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Средняя секция */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Левая часть - Обзор карточек (4 из 12 столбцов) */}
          <div className="col-span-4">
            <div className="bg-white rounded-[25.6px] p-6 h-[320px] flex flex-col justify-between">
              <div>
                <h2 className="text-[17.1px] font-semibold text-black mb-2">Обзор карточек</h2>
                <p className="text-[12.82px] text-black">Последние редактируемые карточки</p>
              </div>
              
              {/* Карточки продуктов */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="text-center group cursor-pointer">
                  <div className="w-[100px] h-[140px] bg-gray-300 rounded-[8px] mb-2 mx-auto overflow-hidden border border-gray-200 relative">
                    <img src="/img/cards/WB1.jpg" alt="Домик Чемодан" className="w-full h-full object-cover rounded-[8px] group-hover:brightness-50 transition-all duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_10002_160)">
                            <path d="M16.757 3.5001L14.757 5.5001H5V19.5001H19V9.7431L21 7.7431V20.5001C21 20.7653 20.8946 21.0197 20.7071 21.2072C20.5196 21.3947 20.2652 21.5001 20 21.5001H4C3.73478 21.5001 3.48043 21.3947 3.29289 21.2072C3.10536 21.0197 3 20.7653 3 20.5001V4.5001C3 4.23488 3.10536 3.98053 3.29289 3.79299C3.48043 3.60545 3.73478 3.5001 4 3.5001H16.757ZM20.485 2.6001L21.9 4.0161L12.708 13.2081L11.296 13.2111L11.294 11.7941L20.485 2.6001Z" fill="black"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_10002_160">
                              <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[8.55px] text-gray-500 w-[100px] mx-auto">2024-09-25 11:00</p>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="w-[100px] h-[140px] bg-gray-300 rounded-[8px] mb-2 mx-auto overflow-hidden border border-gray-200 relative">
                    <img src="/img/cards/WB2.jpg" alt="Увлекательная сборка" className="w-full h-full object-cover rounded-[8px] group-hover:brightness-50 transition-all duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_10002_160)">
                            <path d="M16.757 3.5001L14.757 5.5001H5V19.5001H19V9.7431L21 7.7431V20.5001C21 20.7653 20.8946 21.0197 20.7071 21.2072C20.5196 21.3947 20.2652 21.5001 20 21.5001H4C3.73478 21.5001 3.48043 21.3947 3.29289 21.2072C3.10536 21.0197 3 20.7653 3 20.5001V4.5001C3 4.23488 3.10536 3.98053 3.29289 3.79299C3.48043 3.60545 3.73478 3.5001 4 3.5001H16.757ZM20.485 2.6001L21.9 4.0161L12.708 13.2081L11.296 13.2111L11.294 11.7941L20.485 2.6001Z" fill="black"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_10002_160">
                              <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[8.55px] text-gray-500 w-[100px] mx-auto">2024-09-25 11:00</p>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="w-[100px] h-[140px] bg-gray-300 rounded-[8px] mb-2 mx-auto overflow-hidden border border-gray-200 relative">
                    <img src="/img/cards/WB3.jpg" alt="Что в наборе?" className="w-full h-full object-cover rounded-[8px] group-hover:brightness-50 transition-all duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_10002_160)">
                            <path d="M16.757 3.5001L14.757 5.5001H5V19.5001H19V9.7431L21 7.7431V20.5001C21 20.7653 20.8946 21.0197 20.7071 21.2072C20.5196 21.3947 20.2652 21.5001 20 21.5001H4C3.73478 21.5001 3.48043 21.3947 3.29289 21.2072C3.10536 21.0197 3 20.7653 3 20.5001V4.5001C3 4.23488 3.10536 3.98053 3.29289 3.79299C3.48043 3.60545 3.73478 3.5001 4 3.5001H16.757ZM20.485 2.6001L21.9 4.0161L12.708 13.2081L11.296 13.2111L11.294 11.7941L20.485 2.6001Z" fill="black"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_10002_160">
                              <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[8.55px] text-gray-500 w-[100px] mx-auto">2024-09-25 11:00</p>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="w-[100px] h-[140px] bg-gray-300 rounded-[8px] mb-2 mx-auto overflow-hidden border border-gray-200 relative">
                    <img src="/img/cards/WB4.jpg" alt="2 куклы" className="w-full h-full object-cover rounded-[8px] group-hover:brightness-50 transition-all duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_10002_160)">
                            <path d="M16.757 3.5001L14.757 5.5001H5V19.5001H19V9.7431L21 7.7431V20.5001C21 20.7653 20.8946 21.0197 20.7071 21.2072C20.5196 21.3947 20.2652 21.5001 20 21.5001H4C3.73478 21.5001 3.48043 21.3947 3.29289 21.2072C3.10536 21.0197 3 20.7653 3 20.5001V4.5001C3 4.23488 3.10536 3.98053 3.29289 3.79299C3.48043 3.60545 3.73478 3.5001 4 3.5001H16.757ZM20.485 2.6001L21.9 4.0161L12.708 13.2081L11.296 13.2111L11.294 11.7941L20.485 2.6001Z" fill="black"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_10002_160">
                              <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[8.55px] text-gray-500 w-[100px] mx-auto">2024-09-25 11:00</p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/products')}
                className="bg-black text-white px-4 py-2 rounded-full text-[12.82px] font-medium w-fit hover:bg-gray-800 transition-colors"
              >
                Все карточки
              </button>
            </div>
          </div>

          {/* Статистика (2 блока по 2 столбца) */}
          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-[25.6px] p-6 h-[156px] flex flex-col justify-between">
                <div>
                  <div className="text-[34.2px] font-semibold text-black mb-2">35%</div>
                  <div className="text-[12.82px] font-semibold text-black mb-1">Лучший CTR карточки</div>
                  <div className="text-[10.26px] text-black">Смотреть карточку</div>
                </div>
              </div>
              <div className="bg-white rounded-[25.6px] p-6 h-[156px] flex flex-col justify-between">
                <div>
                  <div className="text-[34.2px] font-semibold text-black mb-2">12%</div>
                  <div className="text-[12.82px] font-semibold text-black mb-1">Добавление в корзину</div>
                  <div className="text-[10.26px] text-black">Смотреть карточку</div>
                </div>
              </div>
              <div className="bg-white rounded-[25.6px] p-6 h-[156px] flex flex-col justify-between">
                <div>
                  <div className="text-[34.2px] font-semibold text-black mb-2">145</div>
                  <div className="text-[12.82px] font-semibold text-black mb-1">Количество заказов<br />за неделю</div>
                  <div className="text-[10.26px] text-black">Смотреть товар</div>
                </div>
              </div>
              <div className="bg-white rounded-[25.6px] p-6 h-[156px] flex flex-col justify-between">
                <div>
                  <div className="text-[34.2px] font-semibold text-black mb-2">+14%</div>
                  <div className="text-[12.82px] font-semibold text-black mb-1">Динамика просмотров</div>
                  <div className="text-[10.26px] text-black">Смотреть товар</div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть - Работа с API (4 столбца) */}
          <div className="col-span-4">
            <div className="bg-white rounded-[25.6px] p-6 h-[320px] flex flex-col justify-between">
              <div>
                <h3 className="text-[17.1px] font-semibold text-black mb-2">Работа с API</h3>
                <p className="text-[12.82px] text-black mb-4">Последние загрузки</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-[24px] h-[32px] bg-gray-300 rounded-[4px] overflow-hidden flex-shrink-0">
                      <img src="/img/cards/WB1.jpg" alt="Домик Чемодан" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/4 min-w-0">
                      <div className="text-[14px] font-semibold text-black">Загрузка</div>
                      <div className="text-[12px] text-gray-500">Карточек</div>
                    </div>
                    <div className="w-1/4 text-left">
                      <div className="text-[12px] text-gray-900">2024-09-25</div>
                      <div className="text-[12px] font-semibold text-gray-900">11:00</div>
                    </div>
                    <div className="w-1/4 text-left">
                      <div className="text-[12px] font-medium text-green-600">
                        Выполнено
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-[24px] h-[32px] bg-gray-300 rounded-[4px] overflow-hidden flex-shrink-0">
                      <img src="/img/cards/WB3.jpg" alt="Что в наборе?" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/4 min-w-0">
                      <div className="text-[14px] font-semibold text-black">Аналитика</div>
                      <div className="text-[12px] text-gray-500">Продаж</div>
                    </div>
                    <div className="w-1/4 text-left">
                      <div className="text-[12px] text-gray-900">2024-09-25</div>
                      <div className="text-[12px] font-semibold text-gray-900">11:00</div>
                    </div>
                    <div className="w-1/4 text-left">
                      <div className="text-[12px] font-medium text-orange-500">
                        В очереди
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-[24px] h-[32px] bg-gray-300 rounded-[4px] overflow-hidden flex-shrink-0">
                      <img src="/img/cards/WB2.jpg" alt="Увлекательная сборка" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/4 min-w-0">
                      <div className="text-[14px] font-semibold text-black">Загрузка</div>
                      <div className="text-[12px] text-gray-500">Товаров</div>
                    </div>
                    <div className="w-1/4 text-left">
                      <div className="text-[12px] text-gray-900">2024-09-25</div>
                      <div className="text-[12px] font-semibold text-gray-900">11:00</div>
                    </div>
                    <div className="w-1/4 text-left">
                      <div className="text-[12px] font-medium text-red-600">
                        Ошибка
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-[24px] h-[32px] bg-gray-300 rounded-[4px] overflow-hidden flex-shrink-0">
                      <img src="/img/cards/WB4.jpg" alt="2 куклы" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/4 min-w-0">
                      <div className="text-[14px] font-semibold text-black">Аналитика</div>
                      <div className="text-[12px] text-gray-500">Конверсий</div>
                    </div>
                    <div className="w-1/4 text-left">
                      <div className="text-[12px] text-gray-900">2024-09-25</div>
                      <div className="text-[12px] font-semibold text-gray-900">11:00</div>
                    </div>
                    <div className="w-1/4 text-left">
                      <div className="text-[12px] font-medium text-green-600">
                        Выполнено
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя секция */}
        <div className="grid grid-cols-12 gap-6">
          {/* Левая часть - Список продуктов (8 столбцов) */}
          <div className="col-span-8">
            <div className="bg-white rounded-[25.6px] p-6">
              <div className="mb-6">
                <h2 className="text-[17.1px] font-semibold text-black mb-2">Список продуктов</h2>
                <p className="text-[12.82px] text-black">Полный каталог всех товаров и связанных карточек.</p>
              </div>

              {/* Таблица */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-[10.26px] font-medium text-gray-600">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="text-left py-3 px-4 text-[10.26px] font-medium text-gray-600">Название продукта</th>
                      <th className="text-left py-3 px-4 text-[10.26px] font-medium text-gray-600">Категория</th>
                      <th className="text-left py-3 px-4 text-[10.26px] font-medium text-gray-600">Товары</th>
                      <th className="text-left py-3 px-4 text-[10.26px] font-medium text-gray-600">Карточки</th>
                      <th className="text-left py-3 px-4 text-[10.26px] font-medium text-gray-600">Дата изменения</th>
                      <th className="text-left py-3 px-4 text-[10.26px] font-medium text-gray-600">Заметки</th>
                      <th className="text-left py-3 px-4 text-[10.26px] font-medium text-gray-600">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-300 rounded overflow-hidden">
                            <img src="/img/cards/WB1.jpg" alt="Чемодомик" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[12.82px] font-medium text-gray-900">Чемодомик</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">Игрушки</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">15 штук</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">150 штук</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">2024-09-25 11:00</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">Первые чемодомики</td>
                      <td className="py-4 px-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-[10.26px] font-medium">
                          Активна
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-300 rounded overflow-hidden">
                            <img src="/img/cards/WB2.jpg" alt="Чемодомик" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[12.82px] font-medium text-gray-900">Чемодомик</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">Игрушки</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">15 штук</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">150 штук</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">2024-09-25 11:00</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">Первые чемодомики</td>
                      <td className="py-4 px-4">
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-[10.26px] font-medium">
                          Черновик
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-300 rounded overflow-hidden">
                            <img src="/img/cards/WB3.jpg" alt="Чемодомик" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[12.82px] font-medium text-gray-900">Чемодомик</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">Игрушки</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">15 штук</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">150 штук</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">2024-09-25 11:00</td>
                      <td className="py-4 px-4 text-[12.82px] text-gray-900">Первые чемодомики</td>
                      <td className="py-4 px-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-[10.26px] font-medium">
                          Ожидание
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Правая часть - Баннеры и статистика (4 столбца) */}
          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Левая колонка - один высокий блок */}
              <div className="col-span-1">
                <div className="bg-black rounded-[17px] p-6 text-white h-full flex flex-col justify-between relative">
                  {/* Декоративная буква S */}
                  <div className="absolute top-4 right-4 text-gray-800 text-6xl font-bold opacity-20">S</div>
                  
                  {/* Значок сверху */}
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1C8.676 1 6 3.676 6 7v2H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4z" fill="black"/>
                    </svg>
                  </div>
                  
                  {/* Текст и кнопка внизу */}
                  <div className="flex flex-col gap-4">
                    <div className="text-[12.82px] leading-[18.6px]">
                      <div>Получи полный доступ</div>
                      <div>ко всем функциям</div>
                      <div>нашего сервиса и</div>
                      <div>ускорь работу</div>
                    </div>
                    <button className="bg-white text-black px-4 py-2 rounded-full text-[12.82px] font-semibold w-fit hover:bg-blue-600 hover:text-white transition-colors">
                      Стать про
                    </button>
                  </div>
                </div>
              </div>

              {/* Правая колонка - два блока */}
              <div className="col-span-1 space-y-4">
                {/* Статистика времени */}
                <div className="bg-white rounded-[25.6px] p-6 h-[156px] flex flex-col justify-between">
                  <div>
                    <div className="text-[34.2px] font-semibold text-black mb-2">35</div>
                    <div className="text-[12.82px] font-semibold text-black mb-1">Часов сэкономлено</div>
                    <div className="text-[12.82px] font-semibold text-black mb-1">за неделю</div>
                    <div className="text-[10.26px] text-gray-500">на 3% больше прошлой</div>
                  </div>
                </div>

                {/* Сообщество */}
                <div className="bg-white rounded-[25.6px] p-6 h-[156px] flex flex-col justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <h3 className="text-[17.1px] font-semibold text-black">Вступай в наше сообщество</h3>
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