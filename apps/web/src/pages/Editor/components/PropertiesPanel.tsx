// Inspired by react-page Sidebar: https://github.com/react-page/react-page/blob/main/packages/editor/src/ui/sidebar/Sidebar.tsx
// and craft.js PropertyPanel: https://github.com/prevwong/craft.js/blob/master/examples/playground/components/Editor/PropertyPanel.js

import React from 'react';
import type { Node, ComponentConfig } from '../types/canvas.types';

interface PropertiesPanelProps {
  selectedNode: Node | null;
  onNodeUpdate: (nodeId: string, updates: Partial<Node>) => void;
  componentRegistry: Record<string, ComponentConfig>;
}

interface PropertyEditorProps {
  label: string;
  value: any;
  type: 'text' | 'number' | 'color' | 'select' | 'boolean' | 'range';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: any) => void;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({
  label,
  value,
  type,
  options,
  min,
  max,
  step,
  onChange,
}) => {
  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        );
      
      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={value || 0}
              min={min}
              max={max}
              step={step}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 text-center">
              {value || 0}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="property-editor mb-4">
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedNode,
  onNodeUpdate,
  componentRegistry,
}) => {
  if (!selectedNode) {
    return (
      <div className="properties-panel bg-white border-l border-gray-200 w-80 flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Свойства</h3>
          <p className="text-xs text-gray-500 mt-1">
            Выберите элемент для редактирования свойств
          </p>
        </div>

        {/* Empty state */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">Нет выбранного элемента</p>
            <p className="text-xs">Выберите элемент на холсте</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (property: string, value: any) => {
    console.log('Property change:', property, value, selectedNode);
    
    // Создаем обновление с сохранением всех существующих свойств
    const updatedProps = {
      ...selectedNode.props,
      [property]: value,
    };
    
    console.log('Updated props:', updatedProps);
    
    onNodeUpdate(selectedNode.id, {
      props: updatedProps,
    });
  };

  const renderLayoutProperties = () => (
    <div className="property-section">
      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
        Макет
      </h4>
      <div className="space-y-3">
        <PropertyEditor
          key="layout-x"
          label="X"
          value={selectedNode.props.x}
          type="number"
          onChange={(value) => handlePropertyChange('x', value)}
        />
        <PropertyEditor
          key="layout-y"
          label="Y"
          value={selectedNode.props.y}
          type="number"
          onChange={(value) => handlePropertyChange('y', value)}
        />
        <PropertyEditor
          key="layout-width"
          label="Ширина"
          value={selectedNode.props.width}
          type="number"
          min={1}
          onChange={(value) => handlePropertyChange('width', value)}
        />
        <PropertyEditor
          key="layout-height"
          label="Высота"
          value={selectedNode.props.height}
          type="number"
          min={1}
          onChange={(value) => handlePropertyChange('height', value)}
        />
        <PropertyEditor
          key="layout-rotation"
          label="Поворот"
          value={selectedNode.props.rotation}
          type="range"
          min={0}
          max={360}
          step={1}
          onChange={(value) => handlePropertyChange('rotation', value)}
        />
      </div>
    </div>
  );

  const renderTextProperties = () => {
    if (selectedNode.type !== 'text' && selectedNode.type !== 'button' && selectedNode.type !== 'badge' && selectedNode.type !== 'heading' && selectedNode.type !== 'paragraph') {
      return null;
    }

    return (
      <div className="property-section">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Текст
        </h4>
        <div className="space-y-3">
          <PropertyEditor
            key="text-content"
            label="Текст"
            value={selectedNode.props.text}
            type="text"
            onChange={(value) => handlePropertyChange('text', value)}
          />
          <PropertyEditor
            key="text-fontSize"
            label="Размер шрифта"
            value={selectedNode.props.fontSize}
            type="number"
            min={8}
            max={72}
            onChange={(value) => handlePropertyChange('fontSize', value)}
          />
          <PropertyEditor
            key="text-color"
            label="Цвет текста"
            value={selectedNode.props.color}
            type="color"
            onChange={(value) => handlePropertyChange('color', value)}
          />
          <PropertyEditor
            key="text-align"
            label="Выравнивание"
            value={selectedNode.props.textAlign}
            type="select"
            options={['left', 'center', 'right']}
            onChange={(value) => handlePropertyChange('textAlign', value)}
          />
          <PropertyEditor
            key="text-weight"
            label="Жирность"
            value={selectedNode.props.fontWeight}
            type="select"
            options={['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']}
            onChange={(value) => handlePropertyChange('fontWeight', value)}
          />
          {selectedNode.type === 'paragraph' && (
            <PropertyEditor
              key="text-lineHeight"
              label="Межстрочный интервал"
              value={selectedNode.props.lineHeight}
              type="range"
              min={0.5}
              max={3}
              step={0.1}
              onChange={(value) => handlePropertyChange('lineHeight', value)}
            />
          )}
        </div>
      </div>
    );
  };

  const renderImageProperties = () => {
    if (selectedNode.type !== 'image') {
      return null;
    }

    return (
      <div className="property-section">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Изображение
        </h4>
        <div className="space-y-3">
          <PropertyEditor
            key="image-src"
            label="URL изображения"
            value={selectedNode.props.src}
            type="text"
            onChange={(value) => handlePropertyChange('src', value)}
          />
          <PropertyEditor
            key="image-alt"
            label="Alt текст"
            value={selectedNode.props.alt}
            type="text"
            onChange={(value) => handlePropertyChange('alt', value)}
          />
          <PropertyEditor
            key="image-objectFit"
            label="Объект-фит"
            value={selectedNode.props.objectFit}
            type="select"
            options={['contain', 'cover', 'fill', 'none']}
            onChange={(value) => handlePropertyChange('objectFit', value)}
          />
        </div>
      </div>
    );
  };

  const renderShapeProperties = () => {
    if (selectedNode.type !== 'rectangle' && selectedNode.type !== 'circle' && selectedNode.type !== 'divider') {
      return null;
    }

    return (
      <div className="property-section">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Фигура
        </h4>
        <div className="space-y-3">
          {selectedNode.type !== 'divider' && (
            <PropertyEditor
              key="shape-fillColor"
              label="Цвет заливки"
              value={selectedNode.props.fillColor}
              type="color"
              onChange={(value) => handlePropertyChange('fillColor', value)}
            />
          )}
          <PropertyEditor
            key="shape-strokeColor"
            label="Цвет обводки"
            value={selectedNode.props.strokeColor}
            type="color"
            onChange={(value) => handlePropertyChange('strokeColor', value)}
          />
          <PropertyEditor
            key="shape-strokeWidth"
            label="Толщина обводки"
            value={selectedNode.props.strokeWidth}
            type="number"
            min={0}
            max={20}
            onChange={(value) => handlePropertyChange('strokeWidth', value)}
          />
        </div>
      </div>
    );
  };

  const renderButtonProperties = () => {
    if (selectedNode.type !== 'button') {
      return null;
    }

    return (
      <div className="property-section">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Кнопка
        </h4>
        <div className="space-y-3">
          <PropertyEditor
            key="button-backgroundColor"
            label="Цвет фона"
            value={selectedNode.props.backgroundColor}
            type="color"
            onChange={(value) => handlePropertyChange('backgroundColor', value)}
          />
        </div>
      </div>
    );
  };

  const renderBadgeProperties = () => {
    if (selectedNode.type !== 'badge') {
      return null;
    }

    return (
      <div className="property-section">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Бейдж
        </h4>
        <div className="space-y-3">
          <PropertyEditor
            key="badge-backgroundColor"
            label="Цвет фона"
            value={selectedNode.props.backgroundColor}
            type="color"
            onChange={(value) => handlePropertyChange('backgroundColor', value)}
          />
        </div>
      </div>
    );
  };

  const renderIconProperties = () => {
    if (selectedNode.type !== 'icon') {
      return null;
    }

    return (
      <div className="property-section">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Иконка
        </h4>
        <div className="space-y-3">
          <PropertyEditor
            key="icon-size"
            label="Размер"
            value={selectedNode.props.size}
            type="number"
            min={8}
            max={64}
            onChange={(value) => handlePropertyChange('size', value)}
          />
          <PropertyEditor
            key="icon-color"
            label="Цвет"
            value={selectedNode.props.color}
            type="color"
            onChange={(value) => handlePropertyChange('color', value)}
          />
        </div>
      </div>
    );
  };

  const renderContainerProperties = () => {
    if (selectedNode.type !== 'container') {
      return null;
    }

    return (
      <div className="property-section">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Контейнер
        </h4>
        <div className="space-y-3">
          <PropertyEditor
            key="container-backgroundColor"
            label="Цвет фона"
            value={selectedNode.props.backgroundColor}
            type="color"
            onChange={(value) => handlePropertyChange('backgroundColor', value)}
          />
          <PropertyEditor
            key="container-borderColor"
            label="Цвет границы"
            value={selectedNode.props.borderColor}
            type="color"
            onChange={(value) => handlePropertyChange('borderColor', value)}
          />
          <PropertyEditor
            key="container-borderWidth"
            label="Толщина границы"
            value={selectedNode.props.borderWidth}
            type="number"
            min={0}
            max={10}
            onChange={(value) => handlePropertyChange('borderWidth', value)}
          />
          <PropertyEditor
            key="container-borderRadius"
            label="Радиус скругления"
            value={selectedNode.props.borderRadius}
            type="number"
            min={0}
            max={50}
            onChange={(value) => handlePropertyChange('borderRadius', value)}
          />
          <PropertyEditor
            key="container-padding"
            label="Отступы"
            value={selectedNode.props.padding}
            type="number"
            min={0}
            max={50}
            onChange={(value) => handlePropertyChange('padding', value)}
          />
        </div>
      </div>
    );
  };

  const renderSpacerProperties = () => {
    if (selectedNode.type !== 'spacer') {
      return null;
    }

    return (
      <div className="property-section">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Разделитель
        </h4>
        <div className="space-y-3">
          <PropertyEditor
            key="spacer-height"
            label="Высота"
            value={selectedNode.props.height}
            type="number"
            min={1}
            max={100}
            onChange={(value) => handlePropertyChange('height', value)}
          />
          <PropertyEditor
            key="spacer-backgroundColor"
            label="Цвет фона"
            value={selectedNode.props.backgroundColor}
            type="color"
            onChange={(value) => handlePropertyChange('backgroundColor', value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="properties-panel bg-white border-l border-gray-200 w-80 flex flex-col">
      {/* Header с иконками */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Свойства</h3>
            <p className="text-xs text-gray-500 mt-1">
              {selectedNode ? (selectedNode.displayName || selectedNode.type) : 'Выберите элемент для редактирования свойств'}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors" title="Выравнивание">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors" title="Текст">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors" title="Стили">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Properties content */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedNode ? (
          <div className="space-y-6">
            {renderLayoutProperties()}
            {renderTextProperties()}
            {renderImageProperties()}
            {renderShapeProperties()}
            {renderButtonProperties()}
            {renderBadgeProperties()}
            {renderIconProperties()}
            {renderContainerProperties()}
            {renderSpacerProperties()}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">Нет выбранного элемента</p>
              <p className="text-xs">Выберите элемент на холсте</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 