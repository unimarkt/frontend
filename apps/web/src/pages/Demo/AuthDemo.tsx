import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { User, LogOut, Calendar, Shield, Mail } from 'lucide-react';

const AuthDemo: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="mb-6">
            <Shield size={64} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Требуется авторизация
            </h1>
            <p className="text-gray-600">
              Войдите в систему для доступа к этой странице
            </p>
          </div>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="w-full"
          >
            Войти в систему
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Демо авторизации
          </h1>
          <p className="text-gray-600">
            Добро пожаловать в систему! Ваши данные успешно загружены.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Profile Card */}
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User size={24} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Профиль пользователя
                  </h2>
                  <p className="text-gray-600">Ваши данные</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Выйти</span>
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              {(user.firstName || user.lastName) && (
                <div className="flex items-center space-x-3">
                  <User size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Имя</p>
                    <p className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Shield size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Роль</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === 'ADMIN' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
                  </span>
                </div>
              </div>

              {user.lastLoginAt && (
                <div className="flex items-center space-x-3">
                  <Calendar size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Последний вход</p>
                    <p className="font-medium text-gray-900">
                      {new Date(user.lastLoginAt).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Account Status Card */}
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Статус аккаунта
              </h2>
              <p className="text-gray-600">Информация о вашем аккаунте</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Email подтвержден</p>
                  <p className="text-sm text-gray-600">Статус верификации email</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  user.isEmailVerified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.isEmailVerified ? 'Подтвержден' : 'Не подтвержден'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Двухфакторная аутентификация</p>
                  <p className="text-sm text-gray-600">Дополнительная защита аккаунта</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  user.twoFactorEnabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.twoFactorEnabled ? 'Включена' : 'Отключена'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">ID пользователя</p>
                  <p className="text-sm text-gray-600">Уникальный идентификатор</p>
                </div>
                <code className="text-xs bg-white px-2 py-1 rounded border">
                  {user.id}
                </code>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Навигация
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Главная
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/products'}
                className="w-full"
              >
                Продукты
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/profile'}
                className="w-full"
              >
                Профиль
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/auth'}
                className="w-full"
              >
                Авторизация
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;