import type { Canvas, Object as FabricObject } from 'fabric';

// Inspired by craft.js Node system: https://github.com/prevwong/craft.js/blob/master/packages/core/src/interfaces/Node.ts
// and react-page Cell system: https://github.com/react-page/react-page/blob/main/packages/editor/src/core/types/Cell.ts

export interface Node {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: string[];
  parentId?: string;
  isCanvas?: boolean;
  isResizable?: boolean;
  isDeletable?: boolean;
  displayName?: string;
  custom?: Record<string, any>;
}

export interface EditorState {
  nodes: Record<string, Node>;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  draggedNodeId: string | null;
  history: EditorHistoryItem[];
  historyIndex: number;
  zoom: number;
  showGrid: boolean;
  isLoading: boolean;
  error: string | null;
  mode: 'edit' | 'preview';
  canvasSize: { width: number; height: number };
}

export interface EditorHistoryItem {
  id: string;
  timestamp: number;
  nodes: Record<string, Node>;
  selectedNodeId: string | null;
  description: string;
}

export interface ComponentConfig {
  type: string;
  displayName: string;
  defaultProps: Record<string, any>;
  isCanvas?: boolean;
  isResizable?: boolean;
  isDeletable?: boolean;
  rules?: {
    canMoveIn?: (incoming: Node[], self: Node) => boolean;
    canMoveOut?: (outgoing: Node[], self: Node) => boolean;
    canDelete?: (self: Node) => boolean;
  };
  related?: {
    settings?: React.ComponentType<any>;
  };
}

export interface EditorContextValue {
  state: EditorState;
  actions: EditorActions;
  query: EditorQuery;
  registry: ComponentRegistry;
}

export interface EditorActions {
  // Node management
  addNode: (node: Node, parentId?: string, index?: number) => void;
  updateNode: (nodeId: string, updates: Partial<Node>) => void;
  removeNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  
  // Selection
  selectNode: (nodeId: string | null) => void;
  hoverNode: (nodeId: string | null) => void;
  
  // Drag & Drop
  setDraggedNode: (nodeId: string | null) => void;
  moveNode: (nodeId: string, targetParentId: string, index: number) => void;
  
  // Grouping
  createGroup: (nodeIds: string[]) => void;
  ungroup: (groupId: string) => void;
  
  // History
  undo: () => void;
  redo: () => void;
  saveToHistory: (description: string) => void;
  
  // Canvas
  setZoom: (zoom: number) => void;
  setShowGrid: (show: boolean) => void;
  setCanvasSize: (size: { width: number; height: number }) => void;
  
  // Mode
  setMode: (mode: 'edit' | 'preview') => void;
  
  // Import/Export
  importJSON: (json: string) => void;
  exportJSON: () => string;
  
  // Registry
  registerComponent: (config: ComponentConfig) => void;
  unregisterComponent: (type: string) => void;
}

export interface EditorQuery {
  getNode: (nodeId: string) => Node | null;
  getNodes: () => Record<string, Node>;
  getSelectedNode: () => Node | null;
  getHoveredNode: () => Node | null;
  getDraggedNode: () => Node | null;
  getNodeAncestors: (nodeId: string) => Node[];
  getNodeDescendants: (nodeId: string) => Node[];
  getNodeSiblings: (nodeId: string) => Node[];
  getNodeChildren: (nodeId: string) => Node[];
  getNodeParent: (nodeId: string) => Node | null;
  getNodeIndex: (nodeId: string) => number;
  canMoveNode: (nodeId: string, targetParentId: string) => boolean;
  canDeleteNode: (nodeId: string) => boolean;
}

export interface ComponentRegistry {
  components: Record<string, ComponentConfig>;
  register: (config: ComponentConfig) => void;
  unregister: (type: string) => void;
  get: (type: string) => ComponentConfig | null;
  getAll: () => ComponentConfig[];
}

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