import React from 'react';
import Button from '../ui/Button';
import { socialProviders } from '../../utils/auth';
import { SocialAuthProvider } from '../../types/auth';

interface SocialAuthProps {
  onSocialAuth: (provider: SocialAuthProvider['id']) => void;
  isLoading?: boolean;
  loadingProvider?: string;
}

const SocialAuth: React.FC<SocialAuthProps> = ({
  onSocialAuth,
  isLoading = false,
  loadingProvider
}) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Или войдите с помощью
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
            onClick={() => onSocialAuth(provider.id)}
            disabled={isLoading}
          >
            <span className="text-lg">{provider.icon}</span>
            <span>
              {loadingProvider === provider.id ? 'Подключение...' : `Войти через ${provider.name}`}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;
