import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User } from 'lucide-react';

import Button from '../ui/Button';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import PasswordStrength from '../ui/PasswordStrength';
import SocialAuth from './SocialAuth';

import { RegisterFormData, registerSchema } from '../../utils/auth';
import { SocialAuthProvider } from '../../types/auth';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onSwitchToLogin,
  isLoading = false
}) => {
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const watchedPassword = watch('password');

  const handleFormSubmit = async (data: RegisterFormData) => {
    if (!acceptedPolicy) {
      toast.error('Необходимо принять политику конфиденциальности');
      return;
    }

    try {
      await onSubmit(data);
      toast.success('Аккаунт успешно создан!');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Обработка различных типов ошибок
      if (error?.message) {
        toast.error(error.message);
      } else if (error?.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        if (graphQLError.message.includes('already exists')) {
          toast.error('Пользователь с таким email уже существует');
        } else {
          toast.error(graphQLError.message || 'Ошибка регистрации');
        }
      } else {
        toast.error('Произошла ошибка при регистрации');
      }
    }
  };

  const handleSocialAuth = async (provider: SocialAuthProvider['id']) => {
    setSocialLoading(provider);
    try {
      // TODO: Implement social auth
      toast.error(`Регистрация через ${provider} временно недоступна`);
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
          Создайте аккаунт
        </h1>
        <p className="text-gray-600">
          Зарегистрируйтесь для доступа к конструктору карточек
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Name Fields Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Input
              {...register('firstName')}
              type="text"
              label="Имя"
              placeholder="Ваше имя"
              error={errors.firstName?.message}
              disabled={isFormLoading}
              className="pl-10"
            />
            <User 
              size={16} 
              className="absolute left-3 top-9 text-gray-400" 
            />
          </div>
          <div className="relative">
            <Input
              {...register('lastName')}
              type="text"
              label="Фамилия"
              placeholder="Ваша фамилия"
              error={errors.lastName?.message}
              disabled={isFormLoading}
              className="pl-10"
            />
            <User 
              size={16} 
              className="absolute left-3 top-9 text-gray-400" 
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="relative">
          <Input
            {...register('email')}
            type="email"
            label="Email *"
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
            label="Пароль *"
            placeholder="Создайте пароль"
            error={errors.password?.message}
            disabled={isFormLoading}
            className="pl-10"
          />
          <Lock 
            size={16} 
            className="absolute left-3 top-9 text-gray-400" 
          />
          <PasswordStrength password={watchedPassword || ''} />
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <PasswordInput
            {...register('confirmPassword')}
            label="Подтвердите пароль *"
            placeholder="Повторите пароль"
            error={errors.confirmPassword?.message}
            disabled={isFormLoading}
            className="pl-10"
          />
          <Lock 
            size={16} 
            className="absolute left-3 top-9 text-gray-400" 
          />
        </div>

        {/* Privacy Policy Agreement */}
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={acceptedPolicy}
            onChange={(e) => setAcceptedPolicy(e.target.checked)}
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
            disabled={isFormLoading}
          />
          <label className="ml-3 text-sm text-gray-600">
            Я принимаю{' '}
            <button
              type="button"
              className="text-primary-600 hover:text-primary-500 focus:outline-none focus:underline"
            >
              Политику конфиденциальности
            </button>
            {' '}и{' '}
            <button
              type="button"
              className="text-primary-600 hover:text-primary-500 focus:outline-none focus:underline"
            >
              Условия использования
            </button>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isFormLoading || !acceptedPolicy}
          size="lg"
        >
          {isFormLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
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

      {/* Switch to Login */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Уже есть аккаунт?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline"
            disabled={isFormLoading}
          >
            Войти
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
