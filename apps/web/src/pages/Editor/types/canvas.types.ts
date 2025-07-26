import type { Canvas, Object as FabricObject } from 'fabric';

export interface Layer {
  id: string;
  name: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  locked: boolean;
  zIndex: number;
  properties: TextProperties | ImageProperties | ShapeProperties;
}

export interface TextProperties {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  color?: string;
  textAlign?: string;
  lineHeight?: number;
  letterSpacing?: number;
}

export interface ImageProperties {
  src?: string;
  alt?: string;
  opacity?: number;
  scale?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

export interface ShapeProperties {
  shapeType?: 'rectangle' | 'circle' | 'triangle';
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface CanvasState {
  layers: Layer[];
  selectedLayerId: string | null;
  zoom: number;
  showGrid: boolean;
  history: Layer[][];
  historyIndex: number;
}

export interface CanvasHistoryItem {
  layers: Layer[];
  timestamp: number;
}

export interface ToolbarButton {
  id: string;
  icon: string;
  label: string;
  action: () => void;
  disabled?: boolean;
}

export interface ExportOptions {
  format: 'png' | 'jpg' | 'svg';
  quality: number;
  scale: number;
}

export interface SaveData {
  layers: Layer[];
  canvas: {
    zoom: number;
    showGrid: boolean;
  };
  metadata: {
    version: string;
    lastModified: number;
  };
} 