import { gql } from '@apollo/client';

/**
 * GraphQL Fragments
 * Фрагменты для переиспользования полей
 */

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    email
    firstName
    lastName
    role
    isEmailVerified
    twoFactorEnabled
    lastLoginAt
    lastLoginLocation
    createdAt
    updatedAt
  }
`;

/**
 * Authentication Mutations
 * Мутации для аутентификации
 */

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

/**
 * User Queries
 * Запросы для получения информации о пользователе
 */

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const VALIDATE_TOKEN = gql`
  query ValidateToken {
    validateToken {
      valid
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

/**
 * Profile Mutations
 * Мутации для работы с профилем
 */

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
      message
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      message
      token
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

/**
 * Email Verification
 * Верификация email
 */

export const SEND_VERIFICATION_EMAIL = gql`
  mutation SendVerificationEmail {
    sendVerificationEmail {
      success
      message
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      success
      message
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

/**
 * Two-Factor Authentication
 * Двухфакторная аутентификация
 */

export const ENABLE_TWO_FACTOR = gql`
  mutation EnableTwoFactor {
    enableTwoFactor {
      secret
      qrCode
      backupCodes
    }
  }
`;

export const VERIFY_TWO_FACTOR = gql`
  mutation VerifyTwoFactor($code: String!) {
    verifyTwoFactor(code: $code) {
      success
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const DISABLE_TWO_FACTOR = gql`
  mutation DisableTwoFactor($password: String!) {
    disableTwoFactor(password: $password) {
      success
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;