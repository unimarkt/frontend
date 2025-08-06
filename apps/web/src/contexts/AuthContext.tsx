import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuthMutations, useCurrentUser } from '../hooks/useAuth';
import type { AuthContextType, User, RegisterInput, LoginInput } from '../types/auth';
import { tokenStorage, userStorage } from '../utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Apollo Client hooks
  const { login: loginMutation, register: registerMutation, logout: logoutMutation, loginLoading, registerLoading } = useAuthMutations();
  const { user, loading: userLoading, refetch: refetchUser } = useCurrentUser();

  // Инициализация при загрузке приложения
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = tokenStorage.get();
        
        if (savedToken) {
          setToken(savedToken);
          // Apollo Client автоматически выполнит запрос на получение пользователя
          // если токен валиден, благодаря useCurrentUser hook
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        logout();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const register = async (input: RegisterInput) => {
    try {
      await registerMutation(input);
      // После успешной регистрации обновляем токен
      const newToken = tokenStorage.get();
      setToken(newToken);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (input: LoginInput) => {
    try {
      await loginMutation(input);
      // После успешного входа обновляем токен
      const newToken = tokenStorage.get();
      setToken(newToken);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    logoutMutation();
    setToken(null);
  };

  const updateUser = (updatedUserData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedUserData };
      userStorage.set(updatedUser);
      // Apollo Client cache будет обновлен автоматически
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!token && !!user,
    isLoading: !isInitialized || userLoading || loginLoading || registerLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC для защищенных маршрутов
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      // Redirect to auth page or show login form
      window.location.href = '/auth';
      return null;
    }
    
    return <Component {...props} />;
  };
};