/* TypeScript types generated from Figma design analysis */

// ===== PRODUCT TYPES =====
export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  currency: string;
  images: ProductImage[];
  marketplace: Marketplace;
  status: ProductStatus;
  items: number;
  cards: number;
  lastEdit: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  variants?: ProductVariant[];
  specifications?: ProductSpecification[];
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock?: number;
}

export interface ProductSpecification {
  key: string;
  value: string;
  unit?: string;
}

export type ProductStatus = 'active' | 'draft' | 'trash' | 'archived';

export type ProductCategory = 
  | 'electronics'
  | 'clothing'
  | 'home-garden'
  | 'sports'
  | 'books'
  | 'beauty'
  | 'automotive'
  | 'toys'
  | 'food'
  | 'other';

export type Marketplace = 
  | 'wildberries'
  | 'ozon'
  | 'yandex-market'
  | 'avito'
  | 'aliexpress'
  | 'amazon'
  | 'other';

// ===== TEMPLATE TYPES =====
export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  preview: string;
  thumbnail: string;
  isPremium: boolean;
  tags: string[];
  dimensions: {
    width: number;
    height: number;
  };
  elements: TemplateElement[];
  createdAt: string;
  updatedAt: string;
}

export interface TemplateElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'icon';
  properties: ElementProperties;
  position: Position;
  size: Size;
  style: ElementStyle;
}

export interface ElementProperties {
  text?: string;
  imageUrl?: string;
  iconName?: string;
  shapeType?: 'rectangle' | 'circle' | 'triangle';
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ElementStyle {
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  borderRadius?: number;
  opacity?: number;
  shadow?: Shadow;
}

export interface Shadow {
  x: number;
  y: number;
  blur: number;
  color: string;
}

export type TemplateCategory = 
  | 'basic'
  | 'marketing'
  | 'social'
  | 'ecommerce'
  | 'presentation'
  | 'custom';

// ===== EDITOR TYPES =====
export interface EditorState {
  canvas: CanvasState;
  selectedElements: string[];
  history: HistoryState;
  zoom: number;
  pan: Position;
  mode: EditorMode;
}

export interface CanvasState {
  id: string;
  elements: CanvasElement[];
  background: Background;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  properties: ElementProperties;
  position: Position;
  size: Size;
  style: ElementStyle;
  locked: boolean;
  visible: boolean;
  zIndex: number;
}

export type ElementType = 
  | 'text'
  | 'image'
  | 'shape'
  | 'icon'
  | 'group'
  | 'container';

export interface Background {
  type: 'color' | 'image' | 'gradient';
  value: string;
}

export interface HistoryState {
  past: CanvasState[];
  future: CanvasState[];
  maxSteps: number;
}

export type EditorMode = 
  | 'select'
  | 'text'
  | 'image'
  | 'shape'
  | 'move'
  | 'zoom';

// ===== USER INTERFACE TYPES =====
export interface UIState {
  sidebar: SidebarState;
  header: HeaderState;
  modals: ModalState[];
  notifications: Notification[];
  loading: LoadingState;
}

export interface SidebarState {
  isCollapsed: boolean;
  activeSection: string;
  expandedSections: string[];
}

export interface HeaderState {
  searchQuery: string;
  notifications: Notification[];
  userMenu: UserMenuState;
}

export interface ModalState {
  id: string;
  type: ModalType;
  isOpen: boolean;
  data?: any;
}

export type ModalType = 
  | 'create-product'
  | 'edit-product'
  | 'delete-confirmation'
  | 'image-upload'
  | 'template-preview'
  | 'settings';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: NotificationAction;
}

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface UserMenuState {
  isOpen: boolean;
  user?: User;
}

// ===== USER TYPES =====
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  preferences: UserPreferences;
  subscription: Subscription;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'user' | 'viewer';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

export interface Subscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  features: string[];
}

export type SubscriptionPlan = 'free' | 'basic' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending';

// ===== ANALYTICS TYPES =====
export interface Analytics {
  products: ProductAnalytics;
  templates: TemplateAnalytics;
  usage: UsageAnalytics;
  performance: PerformanceMetrics;
}

export interface ProductAnalytics {
  total: number;
  active: number;
  draft: number;
  archived: number;
  createdThisMonth: number;
  updatedThisMonth: number;
}

export interface TemplateAnalytics {
  total: number;
  used: number;
  popular: TemplateUsage[];
}

export interface TemplateUsage {
  templateId: string;
  templateName: string;
  usageCount: number;
}

export interface UsageAnalytics {
  storageUsed: number;
  storageLimit: number;
  apiCalls: number;
  apiLimit: number;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  editorLoadTime: number;
  imageUploadTime: number;
  exportTime: number;
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ===== FORM TYPES =====
export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  validation?: ValidationRule[];
  options?: FieldOption[];
}

export type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'textarea'
  | 'file'
  | 'date'
  | 'checkbox'
  | 'radio';

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'email' | 'url';
  value?: any;
  message: string;
}

export interface FieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// ===== UTILITY TYPES =====
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type EventHandler<T = any> = (event: T) => void;

export type AsyncFunction<T = any, R = any> = (params: T) => Promise<R>; 