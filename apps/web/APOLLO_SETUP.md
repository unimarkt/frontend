# GraphQL Apollo Client Setup

## Что было реализовано

✅ **Apollo Client Configuration**
- Настроен Apollo Client с HTTP Link
- Добавлен Auth Link для автоматического добавления токенов
- Настроен Error Link для обработки ошибок авторизации
- Конфигурация кеша с оптимизацией

✅ **GraphQL Queries & Mutations**
- Мутации: Login, Register, Logout
- Запросы: GetCurrentUser, ValidateToken
- Мутации профиля: UpdateProfile, ChangePassword
- Восстановление пароля: RequestPasswordReset, ResetPassword
- Верификация email: SendVerificationEmail, VerifyEmail
- Двухфакторная аутентификация: Enable/Disable/Verify

✅ **Custom Hooks**
- `useAuthMutations` - операции аутентификации
- `useCurrentUser` - получение текущего пользователя
- `useTokenValidation` - валидация токена
- `useProfile` - операции с профилем
- `usePasswordReset` - восстановление пароля
- `useEmailVerification` - верификация email

✅ **Integration**
- Обновлен AuthContext для использования Apollo Client
- App.tsx обернут в ApolloProvider
- Автоматическая обработка ошибок с toast уведомлениями
- Автоматическое перенаправление при ошибках авторизации

## Настройка Backend URL

Создайте файл `.env.local` в папке `apps/web/`:

\`\`\`env
# Backend GraphQL API URL
VITE_GRAPHQL_URL=http://localhost:8080/query

# App Configuration
VITE_APP_NAME=UniMart
VITE_APP_VERSION=1.0.0

# Development settings
VITE_DEV_MODE=true
VITE_DEBUG_APOLLO=true
\`\`\`

## Использование

### Аутентификация в компонентах

\`\`\`tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, login, register, logout, isAuthenticated, isLoading } = useAuth();
  
  // Component logic
}
\`\`\`

### Прямое использование Apollo hooks

\`\`\`tsx
import { useAuthMutations, useCurrentUser } from '../hooks/useAuth';

function LoginComponent() {
  const { login, loginLoading } = useAuthMutations();
  const { user } = useCurrentUser();
  
  const handleLogin = async (data) => {
    try {
      await login(data);
    } catch (error) {
      // Error handled automatically
    }
  };
}
\`\`\`

## Структура GraphQL запросов

### Фрагменты
- `UserFragment` - базовые поля пользователя

### Мутации
- `LOGIN_MUTATION` - вход в систему
- `REGISTER_MUTATION` - регистрация
- `LOGOUT_MUTATION` - выход из системы
- `UPDATE_PROFILE_MUTATION` - обновление профиля
- `CHANGE_PASSWORD_MUTATION` - смена пароля

### Запросы
- `GET_CURRENT_USER` - получение текущего пользователя
- `VALIDATE_TOKEN` - проверка валидности токена

## Обработка ошибок

Apollo Client автоматически обрабатывает ошибки:

1. **GraphQL ошибки** - показываются через toast
2. **Сетевые ошибки** - логируются и обрабатываются
3. **Ошибки авторизации** - автоматическое перенаправление на `/auth`
4. **Невалидные токены** - автоматическая очистка и перенаправление

## Кеширование

Apollo Client кеширует данные автоматически:
- Пользователь кешируется после login/register
- Автоматическое обновление кеша при изменениях профиля
- Очистка кеша при logout

## Backend Requirements

Ваш GraphQL backend должен поддерживать следующие операции:

\`\`\`graphql
type Mutation {
  login(input: LoginInput!): AuthResponse!
  register(input: RegisterInput!): AuthResponse!
  logout: LogoutResponse!
  updateProfile(input: UpdateProfileInput!): User!
  # ... другие мутации
}

type Query {
  me: User!
  validateToken: TokenValidationResponse!
}

type User {
  id: ID!
  email: String!
  firstName: String
  lastName: String
  role: UserRole!
  isEmailVerified: Boolean!
  twoFactorEnabled: Boolean!
  lastLoginAt: String
  lastLoginLocation: String
  createdAt: String!
  updatedAt: String!
}
\`\`\`

## Testing

Для тестирования без backend:
1. Установите VITE_GRAPHQL_URL на mock server
2. Или временно закомментируйте Apollo Client вызовы в AuthContext