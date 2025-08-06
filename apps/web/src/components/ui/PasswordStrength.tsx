import React from 'react';
import { Check, X } from 'lucide-react';
import { getPasswordRequirements, getPasswordStrength } from '../../utils/auth';

interface PasswordStrengthProps {
  password: string;
  showRequirements?: boolean;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  showRequirements = true
}) => {
  const requirements = getPasswordRequirements(password);
  const strength = getPasswordStrength(password);

  if (!password) return null;

  const getStrengthColor = () => {
    switch (strength.color) {
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'primary': return 'bg-blue-500';
      case 'success': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getTextColor = () => {
    switch (strength.color) {
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'primary': return 'text-blue-600';
      case 'success': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Сила пароля</span>
          <span className={`text-xs font-medium ${getTextColor()}`}>
            {strength.label}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${strength.score}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      {showRequirements && (
        <div className="space-y-1">
          <span className="text-xs text-gray-600">Требования к паролю:</span>
          <div className="space-y-1">
            {requirements.map((requirement) => (
              <div
                key={requirement.id}
                className="flex items-center space-x-2 text-xs"
              >
                <div className="flex-shrink-0">
                  {requirement.met ? (
                    <Check size={12} className="text-green-500" />
                  ) : (
                    <X size={12} className="text-gray-400" />
                  )}
                </div>
                <span
                  className={
                    requirement.met ? 'text-green-600' : 'text-gray-500'
                  }
                >
                  {requirement.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
