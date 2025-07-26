import type { Canvas, Object as FabricObject } from 'fabric';

export interface Layer {
  id: string;
  name: string;
  type: 'text' | 'image' | 'shape' | 'background';
  visible: boolean;
  locked: boolean;
  opacity: number;
  zIndex: number;
  fabricObject: FabricObject;
  selected?: boolean;
}

export interface CanvasState {
  layers: Layer[];
  selectedLayerId: string | null;
  canvas: Canvas | null;
  history: CanvasHistoryItem[];
  historyIndex: number;
  zoom: number;
  gridVisible: boolean;
}

export interface CanvasHistoryItem {
  id: string;
  timestamp: number;
  data: string; // JSON string of canvas state
}

export interface TextProperties {
  fontFamily: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontStyle: 'normal' | 'italic';
  textAlign: 'left' | 'center' | 'right' | 'justify';
  color: string;
  lineHeight: number;
  letterSpacing: number;
}

export interface ImageProperties {
  opacity: number;
  filters: string[];
  cropX: number;
  cropY: number;
  scaleX: number;
  scaleY: number;
  brightness: number;
  contrast: number;
  saturation: number;
}

export interface ShapeProperties {
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeDashArray: number[];
  cornerRadius: number;
}

export interface ToolbarButton {
  id: string;
  icon: string;
  tooltip: string;
  action: string;
  disabled?: boolean;
  active?: boolean;
}

export interface ExportOptions {
  format: 'png' | 'jpg' | 'svg';
  quality: number;
  width: number;
  height: number;
  backgroundColor: string;
}

export interface SaveData {
  productId: string;
  canvasData: string;
  layers: Layer[];
  timestamp: number;
  version: string;
} 