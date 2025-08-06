import { z } from 'zod';

/**
 * Types
 */
export interface PasswordRequirement {
  id: string;
  label: string;
  regex: RegExp;
  met: boolean;
}

/**
 * Validation Schemas
 * Схемы валидации для форм аутентификации
 */

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Введите корректный email'),
  password: z
    .string()
    .min(1, 'Пароль обязателен'),
  rememberMe: z.boolean().optional()
});

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя должно содержать максимум 50 символов')
    .optional(),
  lastName: z
    .string()
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(50, 'Фамилия должна содержать максимум 50 символов')
    .optional(),
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Введите корректный email'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(128, 'Пароль должен содержать максимум 128 символов')
    .regex(/[a-z]/, 'Пароль должен содержать минимум одну строчную букву')
    .regex(/[A-Z]/, 'Пароль должен содержать минимум одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать минимум одну цифру')
    .regex(/[^a-zA-Z0-9]/, 'Пароль должен содержать минимум один специальный символ'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword']
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Password strength checker
 * Проверка силы пароля
 */
export const getPasswordRequirements = (password: string): PasswordRequirement[] => {
  return [
    {
      id: 'length',
      label: 'Минимум 8 символов',
      regex: /.{8,}/,
      met: /.{8,}/.test(password)
    },
    {
      id: 'lowercase',
      label: 'Одна строчная буква',
      regex: /[a-z]/,
      met: /[a-z]/.test(password)
    },
    {
      id: 'uppercase',
      label: 'Одна заглавная буква',
      regex: /[A-Z]/,
      met: /[A-Z]/.test(password)
    },
    {
      id: 'number',
      label: 'Одна цифра',
      regex: /[0-9]/,
      met: /[0-9]/.test(password)
    },
    {
      id: 'special',
      label: 'Один специальный символ',
      regex: /[^a-zA-Z0-9]/,
      met: /[^a-zA-Z0-9]/.test(password)
    }
  ];
};

/**
 * Calculate password strength
 * Расчет силы пароля
 */
export const getPasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  const requirements = getPasswordRequirements(password);
  const metCount = requirements.filter(req => req.met).length;
  const score = (metCount / requirements.length) * 100;

  if (score === 0) {
    return { score: 0, label: 'Очень слабый', color: 'error' };
  } else if (score < 40) {
    return { score, label: 'Слабый', color: 'error' };
  } else if (score < 60) {
    return { score, label: 'Удовлетворительный', color: 'warning' };
  } else if (score < 80) {
    return { score, label: 'Хороший', color: 'primary' };
  } else {
    return { score, label: 'Отличный', color: 'success' };
  }
};

/**
 * Token management utilities
 * Утилиты для управления токенами
 */
export const tokenStorage = {
  get: (): string | null => {
    try {
      return localStorage.getItem('authToken');
    } catch {
      return null;
    }
  },
  
  set: (token: string): void => {
    try {
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  },
  
  remove: (): void => {
    try {
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }
};

/**
 * User data management utilities
 * Утилиты для управления данными пользователя
 */
export const userStorage = {
  get: () => {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },
  
  set: (user: any): void => {
    try {
      localStorage.setItem('userData', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  },
  
  remove: (): void => {
    try {
      localStorage.removeItem('userData');
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  }
};

/**
 * Social auth providers configuration
 * Конфигурация провайдеров социальной аутентификации
 */
export const socialProviders = [
  {
    id: 'google' as const,
    name: 'Google',
    icon: '🔍'
  },
  {
    id: 'vk' as const,
    name: 'VK',
    icon: '📱'
  },
  {
    id: 'yandex' as const,
    name: 'Яндекс',
    icon: '🔴'
  }
];