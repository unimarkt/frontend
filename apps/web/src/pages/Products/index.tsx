import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContent from '../../components/layout/MainContent';
import { mockProducts } from '../Dashboard/mockData';
import { Search, Filter, Plus } from 'lucide-react';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const statusOptions = [
    { value: 'all', label: 'Все', count: mockProducts.length },
    { value: 'active', label: 'Активные', count: mockProducts.filter(p => p.status === 'active').length },
    { value: 'draft', label: 'Черновики', count: mockProducts.filter(p => p.status === 'draft').length }
  ];

  return (
    <MainContent>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Продукты</h1>
            <p className="text-gray-600 mt-1">Управление карточками товаров</p>
          </div>
          <button
            onClick={() => navigate('/products/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Новый продукт
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">Нет изображения</div>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{product.category}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status === 'active' ? 'Активен' : 'Неактивен'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Продукты не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтры</p>
          </div>
        )}
      </div>
    </MainContent>
  );
} 