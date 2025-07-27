import React from 'react';

// Утилита для работы с аватарами
// Файл Avatars.png содержит спрайт с различными аватарами

export interface AvatarSprite {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Координаты аватаров в спрайте (примерные, нужно уточнить по реальному файлу)
export const AVATAR_SPRITES: AvatarSprite[] = [
  { id: 1, x: 0, y: 0, width: 32, height: 32 },
  { id: 2, x: 32, y: 0, width: 32, height: 32 },
  { id: 3, x: 64, y: 0, width: 32, height: 32 },
  { id: 4, x: 96, y: 0, width: 32, height: 32 },
  { id: 5, x: 0, y: 32, width: 32, height: 32 },
  { id: 6, x: 32, y: 32, width: 32, height: 32 },
  { id: 7, x: 64, y: 32, width: 32, height: 32 },
  { id: 8, x: 96, y: 32, width: 32, height: 32 },
];

export const getAvatarUrl = (avatarId: number): string => {
  const sprite = AVATAR_SPRITES.find(s => s.id === avatarId);
  if (!sprite) {
    return '/img/Avatars.png'; // Возвращаем весь спрайт если аватар не найден
  }
  
  // В реальном приложении здесь можно использовать CSS sprites или canvas для вырезания
  // Пока возвращаем весь файл
  return '/img/Avatars.png';
};

export const getRandomAvatarId = (): number => {
  return Math.floor(Math.random() * AVATAR_SPRITES.length) + 1;
};

// Компонент для отображения аватара из спрайта
export const AvatarFromSprite: React.FC<{
  avatarId: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ avatarId, size = 'md', className = '' }) => {
  const sprite = AVATAR_SPRITES.find(s => s.id === avatarId);
  
  if (!sprite) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full overflow-hidden ${className}`}
      style={{
        backgroundImage: 'url(/img/Avatars.png)',
        backgroundPosition: `-${sprite.x}px -${sprite.y}px`,
        backgroundSize: 'auto'
      }}
    />
  );
}; 