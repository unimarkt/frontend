import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Mail, Lock } from 'lucide-react';

import Button from '../ui/Button';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import SocialAuth from './SocialAuth';

import type { LoginFormData } from '../../utils/auth';
import { loginSchema } from '../../utils/auth';
import type { SocialAuthProvider } from '../../types/auth';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onSwitchToRegister: () => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onSwitchToRegister,
  isLoading = false
}) => {
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
      toast.success('Добро пожаловать!');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Обработка различных типов ошибок
      if (error?.message) {
        toast.error(error.message);
      } else if (error?.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        if (graphQLError.message.includes('not found') || 
            graphQLError.message.includes('invalid password')) {
          toast.error('Неверный email или пароль');
        } else {
          toast.error(graphQLError.message || 'Ошибка входа в систему');
        }
      } else {
        toast.error('Произошла ошибка при входе в систему');
      }
    }
  };

  const handleSocialAuth = async (provider: SocialAuthProvider['id']) => {
    setSocialLoading(provider);
    try {
      // TODO: Implement social auth
      toast.error(`Авторизация через ${provider} временно недоступна`);
    } catch (error) {
      console.error('Social auth error:', error);
      toast.error('Ошибка социальной авторизации');
    } finally {
      setSocialLoading(null);
    }
  };

  const isFormLoading = isLoading || isSubmitting;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Привет! 👋
        </h1>
        <p className="text-gray-600">
          Войдите в свой аккаунт для доступа к конструктору
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="relative">
          <Input
            {...register('email')}
            type="email"
            label="Email"
            placeholder="Введите ваш email"
            error={errors.email?.message}
            disabled={isFormLoading}
            className="pl-10"
          />
          <Mail 
            size={16} 
            className="absolute left-3 top-9 text-gray-400" 
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <PasswordInput
            {...register('password')}
            label="Пароль"
            placeholder="Введите ваш пароль"
            error={errors.password?.message}
            disabled={isFormLoading}
            className="pl-10"
          />
          <Lock 
            size={16} 
            className="absolute left-3 top-9 text-gray-400" 
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              {...register('rememberMe')}
              type="checkbox"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              disabled={isFormLoading}
            />
            <span className="ml-2 text-sm text-gray-600">Запомнить меня</span>
          </label>
          <button
            type="button"
            className="text-sm text-primary-600 hover:text-primary-500 focus:outline-none focus:underline"
            disabled={isFormLoading}
          >
            Забыли пароль?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isFormLoading}
          size="lg"
        >
          {isFormLoading ? 'Вход...' : 'Войти'}
        </Button>
      </form>

      {/* Social Auth */}
      <div className="mt-6">
        <SocialAuth
          onSocialAuth={handleSocialAuth}
          isLoading={!!socialLoading}
          loadingProvider={socialLoading || undefined}
        />
      </div>

      {/* Switch to Register */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Нет аккаунта?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline"
            disabled={isFormLoading}
          >
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
