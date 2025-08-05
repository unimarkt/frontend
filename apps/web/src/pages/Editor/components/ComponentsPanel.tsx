// Inspired by craft.js ComponentsPanel: https://github.com/prevwong/craft.js/blob/master/examples/playground/components/Editor/ComponentsPanel.js

import React from 'react';
import type { ComponentConfig } from '../types/canvas.types';

interface ComponentsPanelProps {
  components: ComponentConfig[];
  onDragStart: (componentType: string, e: React.DragEvent) => void;
}

interface ComponentItemProps {
  component: ComponentConfig;
  onDragStart: (e: React.DragEvent) => void;
}

const getComponentCategory = (type: string) => {
  switch (type) {
    case 'text':
    case 'heading':
    case 'paragraph':
    case 'badge':
      return 'Текст';
    case 'image':
    case 'icon':
      return 'Медиа';
    case 'rectangle':
    case 'circle':
    case 'divider':
    case 'spacer':
      return 'Фигуры';
    case 'button':
      return 'Интерактивные';
    case 'group':
    case 'container':
      return 'Контейнеры';
    default:
      return 'Другие';
  }
};

const ComponentItem: React.FC<ComponentItemProps> = ({ component, onDragStart }) => {
  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'text':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case 'image':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'rectangle':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
          </svg>
        );
      case 'circle':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
          </svg>
        );
      case 'button':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
          </svg>
        );
      case 'badge':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      case 'group':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'divider':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
      case 'heading':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case 'paragraph':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case 'icon':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case 'container':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'spacer':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8M8 16h8" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
          </svg>
        );
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    console.log('Drag start for component:', component.type);
    const componentData = {
      type: component.type,
      displayName: component.displayName,
      defaultProps: component.defaultProps,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(componentData));
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(e);
  };

  return (
    <div
      className="p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:bg-gray-50 hover:border-blue-300 transition-colors"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 flex items-center justify-center text-blue-600 bg-blue-50 rounded-lg">
          {getComponentIcon(component.type)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {component.displayName}
          </h4>
          <p className="text-xs text-gray-500 truncate">
            {component.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ComponentsPanel: React.FC<ComponentsPanelProps> = ({
  components,
  onDragStart,
}) => {
  
  console.log('ComponentsPanel received components:', components);
  console.log('Components length:', components.length);
  console.log('Components types:', components.map(c => c.type));
  
  const groupedComponents = components.reduce((groups, component) => {
    const category = getComponentCategory(component.type);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(component);
    return groups;
  }, {} as Record<string, ComponentConfig[]>);

  console.log('Grouped components:', groupedComponents);
  console.log('Grouped components keys:', Object.keys(groupedComponents));

  const renderComponentsTab = () => {
    if (components.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm">Загрузка компонентов...</p>
            <p className="text-xs mt-2">Получено компонентов: {components.length}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
            <div key={`category-${category}`}>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                {category}
              </h4>
              <div className="space-y-2">
                {categoryComponents.map((component, index) => (
                  <ComponentItem
                    key={`${component.type}-${index}`}
                    component={component}
                    onDragStart={(e) => onDragStart(component.type, e)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };



  return (
    <div className="components-panel bg-white border-r border-gray-200 w-64 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Компоненты</h3>
        <p className="text-xs text-gray-500 mt-1">
          Перетащите элементы на холст
        </p>
      </div>

      {/* Components content */}
      {renderComponentsTab()}

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          {components.length} компонентов
        </div>
      </div>
    </div>
  );
}; 