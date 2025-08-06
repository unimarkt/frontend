import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { toast } from 'react-hot-toast';
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  LOGOUT_MUTATION,
  GET_CURRENT_USER,
  VALIDATE_TOKEN,
  UPDATE_PROFILE_MUTATION,
  CHANGE_PASSWORD_MUTATION,
  REQUEST_PASSWORD_RESET,
  RESET_PASSWORD,
  SEND_VERIFICATION_EMAIL,
  VERIFY_EMAIL
} from '../graphql/auth';
import { tokenStorage, userStorage } from '../utils/auth';
import type { LoginInput, RegisterInput, User } from '../types/auth';

/**
 * Hook for authentication operations
 * Хук для операций аутентификации
 */
export const useAuthMutations = () => {
  const client = useApolloClient();

  // Login mutation
  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const { token, user } = data.login;
      tokenStorage.set(token);
      userStorage.set(user);
      
      // Update Apollo cache
      client.writeQuery({
        query: GET_CURRENT_USER,
        data: { me: user }
      });
      
      toast.success(`Добро пожаловать, ${user.firstName || user.email}!`);
    },
    onError: (error) => {
      console.error('Login error:', error);
      
      if (error.graphQLErrors?.length > 0) {
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
  });

  // Register mutation
  const [registerMutation, { loading: registerLoading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      const { token, user } = data.register;
      tokenStorage.set(token);
      userStorage.set(user);
      
      // Update Apollo cache
      client.writeQuery({
        query: GET_CURRENT_USER,
        data: { me: user }
      });
      
      toast.success('Аккаунт успешно создан!');
      
      if (!user.isEmailVerified) {
        toast('Проверьте почту для подтверждения email', {
          icon: '📧',
          duration: 5000
        });
      }
    },
    onError: (error) => {
      console.error('Registration error:', error);
      
      if (error.graphQLErrors?.length > 0) {
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
  });

  // Logout mutation
  const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      tokenStorage.remove();
      userStorage.remove();
      client.clearStore();
      toast.success('Вы успешно вышли из системы');
      window.location.href = '/auth';
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Даже если серверный logout failed, очищаем локальные данные
      tokenStorage.remove();
      userStorage.remove();
      client.clearStore();
      window.location.href = '/auth';
    }
  });

  const login = async (input: LoginInput) => {
    try {
      await loginMutation({ variables: { input } });
    } catch (error) {
      // Error handling is done in onError callback
      throw error;
    }
  };

  const register = async (input: RegisterInput) => {
    try {
      await registerMutation({ variables: { input } });
    } catch (error) {
      // Error handling is done in onError callback
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      // Error handling is done in onError callback
    }
  };

  return {
    login,
    register,
    logout,
    loginLoading,
    registerLoading
  };
};

/**
 * Hook for getting current user
 * Хук для получения текущего пользователя
 */
export const useCurrentUser = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error('Current user query error:', error);
      // Don't show toast here as it might be called on app init
    }
  });

  return {
    user: data?.me || null,
    loading,
    error,
    refetch
  };
};

/**
 * Hook for token validation
 * Хук для валидации токена
 */
export const useTokenValidation = () => {
  const { data, loading, error } = useQuery(VALIDATE_TOKEN, {
    skip: !tokenStorage.get(), // Skip if no token
    errorPolicy: 'all',
    onError: (error) => {
      console.error('Token validation error:', error);
      tokenStorage.remove();
      userStorage.remove();
    }
  });

  return {
    isValid: data?.validateToken?.valid || false,
    user: data?.validateToken?.user || null,
    loading,
    error
  };
};

/**
 * Hook for profile operations
 * Хук для операций с профилем
 */
export const useProfile = () => {
  const [updateProfileMutation, { loading: updateLoading }] = useMutation(UPDATE_PROFILE_MUTATION, {
    onCompleted: (data) => {
      const user = data.updateProfile;
      userStorage.set(user);
      toast.success('Профиль успешно обновлен');
    },
    onError: (error) => {
      console.error('Update profile error:', error);
      toast.error('Ошибка обновления профиля');
    },
    update: (cache, { data }) => {
      if (data?.updateProfile) {
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: { me: data.updateProfile }
        });
      }
    }
  });

  const [changePasswordMutation, { loading: changePasswordLoading }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success('Пароль успешно изменен');
    },
    onError: (error) => {
      console.error('Change password error:', error);
      toast.error('Ошибка изменения пароля');
    }
  });

  const updateProfile = async (input: Partial<User>) => {
    try {
      await updateProfileMutation({ variables: { input } });
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (input: { currentPassword: string; newPassword: string }) => {
    try {
      await changePasswordMutation({ variables: { input } });
    } catch (error) {
      throw error;
    }
  };

  return {
    updateProfile,
    changePassword,
    updateLoading,
    changePasswordLoading
  };
};

/**
 * Hook for password reset
 * Хук для восстановления пароля
 */
export const usePasswordReset = () => {
  const [requestResetMutation, { loading: requestLoading }] = useMutation(REQUEST_PASSWORD_RESET, {
    onCompleted: () => {
      toast.success('Инструкции отправлены на вашу почту');
    },
    onError: (error) => {
      console.error('Request password reset error:', error);
      toast.error('Ошибка отправки инструкций');
    }
  });

  const [resetPasswordMutation, { loading: resetLoading }] = useMutation(RESET_PASSWORD, {
    onCompleted: (data) => {
      const { token, user } = data.resetPassword;
      if (token && user) {
        tokenStorage.set(token);
        userStorage.set(user);
        toast.success('Пароль успешно изменен');
      }
    },
    onError: (error) => {
      console.error('Reset password error:', error);
      toast.error('Ошибка сброса пароля');
    }
  });

  const requestPasswordReset = async (email: string) => {
    try {
      await requestResetMutation({ variables: { email } });
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (input: { token: string; password: string }) => {
    try {
      await resetPasswordMutation({ variables: { input } });
    } catch (error) {
      throw error;
    }
  };

  return {
    requestPasswordReset,
    resetPassword,
    requestLoading,
    resetLoading
  };
};

/**
 * Hook for email verification
 * Хук для верификации email
 */
export const useEmailVerification = () => {
  const [sendVerificationMutation, { loading: sendLoading }] = useMutation(SEND_VERIFICATION_EMAIL, {
    onCompleted: () => {
      toast.success('Письмо для подтверждения отправлено');
    },
    onError: (error) => {
      console.error('Send verification error:', error);
      toast.error('Ошибка отправки письма');
    }
  });

  const [verifyEmailMutation, { loading: verifyLoading }] = useMutation(VERIFY_EMAIL, {
    onCompleted: (data) => {
      const user = data.verifyEmail.user;
      if (user) {
        userStorage.set(user);
        toast.success('Email успешно подтвержден');
      }
    },
    onError: (error) => {
      console.error('Verify email error:', error);
      toast.error('Ошибка подтверждения email');
    }
  });

  const sendVerificationEmail = async () => {
    try {
      await sendVerificationMutation();
    } catch (error) {
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      await verifyEmailMutation({ variables: { token } });
    } catch (error) {
      throw error;
    }
  };

  return {
    sendVerificationEmail,
    verifyEmail,
    sendLoading,
    verifyLoading
  };
};