import type { Layer, TextLayer, ImageLayer, ShapeLayer, ValidationResult } from '../types/editor.types';

// Валидация текстового слоя
export const validateTextLayer = (layer: TextLayer): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Проверка обязательных полей
  if (!layer.text.trim()) {
    errors.push('Текст не может быть пустым');
  }

  if (layer.text.length > 1000) {
    errors.push('Текст слишком длинный (максимум 1000 символов)');
  }

  // Проверка размеров
  if (layer.fontSize < 8 || layer.fontSize > 200) {
    errors.push('Размер шрифта должен быть от 8 до 200px');
  }

  // Проверка межстрочного интервала
  if (layer.lineHeight < 0.5 || layer.lineHeight > 5) {
    errors.push('Межстрочный интервал должен быть от 0.5 до 5');
  }

  // Проверка межбуквенного интервала
  if (layer.letterSpacing < -5 || layer.letterSpacing > 20) {
    errors.push('Межбуквенный интервал должен быть от -5 до 20px');
  }

  if (layer.width <= 0 || layer.height <= 0) {
    errors.push('Размеры слоя должны быть положительными');
  }

  // Проверка позиции
  if (layer.x < -1000 || layer.y < -1000) {
    warnings.push('Слой находится далеко за пределами холста');
  }

  // Проверка прозрачности
  if (layer.opacity < 0 || layer.opacity > 1) {
    errors.push('Прозрачность должна быть от 0 до 1');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Валидация изображения
export const validateImageLayer = (layer: ImageLayer): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Проверка источника изображения
  if (!layer.src) {
    errors.push('Источник изображения не указан');
  } else {
    try {
      new URL(layer.src);
    } catch {
      if (!layer.src.startsWith('data:')) {
        errors.push('Некорректный URL изображения');
      }
    }
  }

  // Проверка размеров
  if (layer.width <= 0 || layer.height <= 0) {
    errors.push('Размеры изображения должны быть положительными');
  }

  // Проверка фильтров
  if (layer.brightness < -100 || layer.brightness > 100) {
    errors.push('Яркость должна быть от -100 до 100');
  }

  if (layer.contrast < -100 || layer.contrast > 100) {
    errors.push('Контрастность должна быть от -100 до 100');
  }

  if (layer.saturation < -100 || layer.saturation > 100) {
    errors.push('Насыщенность должна быть от -100 до 100');
  }

  if (layer.blur < 0 || layer.blur > 20) {
    errors.push('Размытие должно быть от 0 до 20px');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Валидация фигуры
export const validateShapeLayer = (layer: ShapeLayer): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Проверка типа фигуры
  if (!['rectangle', 'circle', 'triangle'].includes(layer.shapeType)) {
    errors.push('Неподдерживаемый тип фигуры');
  }

  // Проверка размеров
  if (layer.width <= 0 || layer.height <= 0) {
    errors.push('Размеры фигуры должны быть положительными');
  }

  // Проверка цветов
  if (!isValidColor(layer.fillColor)) {
    errors.push('Некорректный цвет заливки');
  }

  if (!isValidColor(layer.strokeColor)) {
    errors.push('Некорректный цвет обводки');
  }

  // Проверка толщины обводки
  if (layer.strokeWidth < 0 || layer.strokeWidth > 50) {
    errors.push('Толщина обводки должна быть от 0 до 50px');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Валидация любого слоя
export const validateLayer = (layer: Layer): ValidationResult => {
  switch (layer.type) {
    case 'text':
      return validateTextLayer(layer);
    case 'image':
      return validateImageLayer(layer);
    case 'shape':
      return validateShapeLayer(layer);
    case 'group':
      return { isValid: true, errors: [], warnings: [] };
    default:
      return {
        isValid: false,
        errors: ['Неизвестный тип слоя'],
        warnings: []
      };
  }
};

// Валидация имени слоя
export const validateLayerName = (name: string, existingNames: string[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!name.trim()) {
    errors.push('Имя слоя не может быть пустым');
  }

  if (name.length > 50) {
    errors.push('Имя слоя слишком длинное (максимум 50 символов)');
  }

  if (existingNames.includes(name)) {
    warnings.push('Слой с таким именем уже существует');
  }

  // Проверка на специальные символы
  const invalidChars = /[<>:"/\\|?*]/;
  if (invalidChars.test(name)) {
    errors.push('Имя содержит недопустимые символы');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Валидация URL изображения
export const validateImageUrl = (url: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!url.trim()) {
    errors.push('URL изображения не может быть пустым');
    return { isValid: false, errors, warnings };
  }

  try {
    new URL(url);
  } catch {
    if (!url.startsWith('data:')) {
      errors.push('Некорректный URL изображения');
    }
  }

  // Проверка размера файла для data URLs
  if (url.startsWith('data:')) {
    const sizeInBytes = Math.ceil((url.length * 3) / 4);
    const sizeInMB = sizeInBytes / (1024 * 1024);
    
    if (sizeInMB > 10) {
      errors.push('Размер изображения превышает 10MB');
    } else if (sizeInMB > 5) {
      warnings.push('Изображение довольно большое, это может замедлить работу редактора');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Валидация цвета
export const isValidColor = (color: string): boolean => {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
};

// Валидация размеров холста
export const validateCanvasSize = (width: number, height: number): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (width <= 0 || height <= 0) {
    errors.push('Размеры холста должны быть положительными');
  }

  if (width > 5000 || height > 5000) {
    errors.push('Размеры холста слишком большие (максимум 5000x5000)');
  }

  if (width < 100 || height < 100) {
    warnings.push('Размеры холста довольно маленькие');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}; 