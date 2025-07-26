// Базовые типы для редактора
export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

// Типы слоев
export type LayerType = 'text' | 'image' | 'shape' | 'group';

export interface BaseLayer {
  id: string;
  name: string;
  type: LayerType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  locked: boolean;
  zIndex: number;
  fabricObject?: any; // Fabric.js объект
}

export interface TextLayer extends BaseLayer {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontColor: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  letterSpacing: number;
  textDecoration?: 'none' | 'underline' | 'line-through';
  textShadow?: string;
  textShadowX?: number;
  textShadowY?: number;
  textShadowBlur?: number;
  textShadowColor?: string;
}

export interface ImageLayer extends BaseLayer {
  type: 'image';
  src: string;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  filters: {
    grayscale: boolean;
    sepia: boolean;
  };
}

export interface ShapeLayer extends BaseLayer {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'triangle';
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}

export interface GroupLayer extends BaseLayer {
  type: 'group';
  children: string[]; // ID дочерних слоев
}

export type Layer = TextLayer | ImageLayer | ShapeLayer | GroupLayer;

// Состояние редактора
export interface EditorState {
  layers: Layer[];
  selectedLayerId: string | null;
  zoom: number;
  showGrid: boolean;
  isLoading: boolean;
  error: string | null;
  history: EditorHistoryItem[];
  historyIndex: number;
}

export interface EditorHistoryItem {
  layers: Layer[];
  timestamp: number;
}

// События редактора
export interface EditorEvent {
  type: 'layer-added' | 'layer-updated' | 'layer-deleted' | 'layer-selected' | 'canvas-cleared';
  data?: any;
}

// Настройки экспорта
export interface ExportSettings {
  format: 'png' | 'jpg' | 'svg';
  quality: number;
  scale: number;
  backgroundColor?: string;
}

// Настройки проекта
export interface ProjectSettings {
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  gridSize: number;
  snapToGrid: boolean;
}

// Ошибки редактора
export interface EditorError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

// Состояние загрузки
export interface LoadingState {
  isLoading: boolean;
  message: string;
  progress?: number;
}

// Валидация
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} 