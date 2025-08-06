import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { tokenStorage } from './auth';

// HTTP Link для подключения к GraphQL серверу
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:8080/query',
});

// Auth Link для добавления токена авторизации в заголовки
const authLink = setContext((_, { headers }) => {
  const token = tokenStorage.get();
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Error Link для обработки ошибок
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // Обработка ошибок авторизации
      if (message.includes('unauthorized') || message.includes('token')) {
        // Очищаем токен и перенаправляем на страницу входа
        tokenStorage.remove();
        window.location.href = '/auth';
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    
    // Обработка сетевых ошибок
    if (networkError.statusCode === 401) {
      tokenStorage.remove();
      window.location.href = '/auth';
    }
  }
});

// Создание Apollo Client
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          // Настройки кеширования для пользователя
          lastLoginAt: {
            merge: (existing, incoming) => incoming,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;