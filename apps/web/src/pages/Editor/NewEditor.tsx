// Inspired by craft.js Editor: https://github.com/prevwong/craft.js/blob/master/examples/playground/components/Editor/Editor.js
// and react-page Editor: https://github.com/react-page/react-page/blob/main/packages/editor/src/ui/Editor.tsx

import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { useEditor } from './hooks/useEditor';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { ComponentsPanel } from './components/ComponentsPanel';
import { NewLayersPanel } from './components/NewLayersPanel';
import { PropertiesPanel } from './components/PropertiesPanel';
import { DragIndicator } from './components/DragIndicator';
import { ExportPanel } from './components/ExportPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import type { Node, ComponentConfig } from './types/canvas.types';

// Default component configurations
const defaultComponents: ComponentConfig[] = [
  {
    type: 'text',
    displayName: 'Текст',
    defaultProps: {
      text: 'Новый текст',
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      color: '#000000',
      textAlign: 'left',
      lineHeight: 1.2,
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'image',
    displayName: 'Изображение',
    defaultProps: {
      src: 'https://via.placeholder.com/200x200',
      alt: 'Изображение',
      objectFit: 'contain',
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'rectangle',
    displayName: 'Прямоугольник',
    defaultProps: {
      fillColor: '#cccccc',
      strokeColor: '#000000',
      strokeWidth: 0,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'circle',
    displayName: 'Круг',
    defaultProps: {
      fillColor: '#cccccc',
      strokeColor: '#000000',
      strokeWidth: 0,
      radius: 50,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'button',
    displayName: 'Кнопка',
    defaultProps: {
      text: 'Кнопка',
      backgroundColor: '#007bff',
      color: '#ffffff',
      fontSize: 14,
      x: 100,
      y: 100,
      width: 120,
      height: 40,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'badge',
    displayName: 'Бейдж',
    defaultProps: {
      text: 'Бейдж',
      backgroundColor: '#ff6b6b',
      color: '#ffffff',
      fontSize: 12,
      x: 100,
      y: 100,
      width: 80,
      height: 24,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'group',
    displayName: 'Группа',
    defaultProps: {
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      rotation: 0,
    },
    isCanvas: true,
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'divider',
    displayName: 'Разделитель',
    defaultProps: {
      strokeColor: '#e5e7eb',
      strokeWidth: 2,
      x: 100,
      y: 100,
      width: 200,
      height: 2,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'heading',
    displayName: 'Заголовок',
    defaultProps: {
      text: 'Заголовок',
      fontSize: 24,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'left',
      x: 100,
      y: 100,
      width: 300,
      height: 40,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'paragraph',
    displayName: 'Параграф',
    defaultProps: {
      text: 'Это пример параграфа с длинным текстом для демонстрации возможностей редактора.',
      fontSize: 14,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      color: '#333333',
      textAlign: 'left',
      lineHeight: 1.5,
      x: 100,
      y: 100,
      width: 300,
      height: 80,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'icon',
    displayName: 'Иконка',
    defaultProps: {
      iconName: 'star',
      size: 24,
      color: '#000000',
      x: 100,
      y: 100,
      width: 24,
      height: 24,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'container',
    displayName: 'Контейнер',
    defaultProps: {
      backgroundColor: '#f8f9fa',
      borderColor: '#dee2e6',
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
      x: 100,
      y: 100,
      width: 200,
      height: 150,
      rotation: 0,
    },
    isCanvas: true,
    isResizable: true,
    isDeletable: true,
  },
  {
    type: 'spacer',
    displayName: 'Разделитель',
    defaultProps: {
      backgroundColor: 'transparent',
      x: 100,
      y: 100,
      width: 200,
      height: 20,
      rotation: 0,
    },
    isResizable: true,
    isDeletable: true,
  },
];

export const NewEditor: React.FC = () => {
  const { state, actions, query, registry } = useEditor();
  const { dragState, startComponentDrag, handleCanvasDrop, handleCanvasDragOver } = useDragAndDrop();
  const [leftPanel, setLeftPanel] = useState<'components' | 'layers'>('components');
  const [rightPanel, setRightPanel] = useState<'properties' | 'export'>('properties');
  const canvasRef = useRef<HTMLDivElement>(null);

  // Memoize components to prevent unnecessary re-renders
  const components = useMemo(() => registry.getAll(), [registry]);

  // Register default components
  useEffect(() => {
    console.log('Registering components:', defaultComponents.length);
    defaultComponents.forEach(component => {
      console.log('Registering component:', component.type);
      actions.registerComponent(component);
    });
    
    // Debug: Check registered components after registration
    setTimeout(() => {
      console.log('After registration - all components:', registry.getAll());
    }, 100);
  }, [actions]);

  // Debug: Log registered components
  useEffect(() => {
    const components = registry.getAll();
    console.log('Registered components:', components);
    console.log('Components count:', components.length);
  }, [registry]);

  // Handle drop on canvas
  const handleCanvasDropCallback = useCallback((data: any, position: { x: number; y: number }) => {
    console.log('Canvas drop callback:', data, position);
    
    if (data.dragType === 'component') {
      const newNode: Node = {
        id: `${data.type}-${Date.now()}`,
        type: data.type,
        displayName: data.displayName,
        props: {
          ...data.defaultProps,
          x: position.x,
          y: position.y,
        },
        isResizable: registry.get(data.type)?.isResizable ?? true,
        isDeletable: registry.get(data.type)?.isDeletable ?? true,
      };
      
      console.log('Creating new node:', newNode);
      actions.addNode(newNode);
      actions.selectNode(newNode.id);
    }
  }, [actions, registry]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              actions.redo();
            } else {
              actions.undo();
            }
            break;
          case 'd':
            e.preventDefault();
            if (state.selectedNodeId) {
              actions.duplicateNode(state.selectedNodeId);
            }
            break;
          case 's':
            e.preventDefault();
            // TODO: Implement save
            break;
        }
      } else {
        switch (e.key) {
          case 'Delete':
          case 'Backspace':
            if (state.selectedNodeId) {
              actions.removeNode(state.selectedNodeId);
            }
            break;
          case 'Escape':
            actions.selectNode(null);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [actions, state.selectedNodeId]);

  const handleExport = useCallback((format?: string, options?: any) => {
    if (format === 'json') {
      const json = actions.exportJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'editor-project.json';
      a.click();
      URL.revokeObjectURL(url);
    } else if (format) {
      // TODO: Implement image export using html2canvas
      console.log('Exporting as', format, 'with options:', options);
    } else {
      // Switch to export panel
      setRightPanel('export');
    }
  }, [actions]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          actions.importJSON(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [actions]);

  const handleGridToggle = useCallback(() => {
    console.log('Grid toggle clicked');
    const newGridState = !state.showGrid;
    console.log('Setting grid to:', newGridState);
    actions.setShowGrid(newGridState);
  }, [actions, state.showGrid]);

  // Memoize selected node to prevent unnecessary re-renders
  const selectedNode = useMemo(() => query.getSelectedNode(), [query]);

  return (
    <ErrorBoundary>
      <div className="editor h-screen flex flex-col bg-gray-50">
        {/* Drag Indicator */}
        <DragIndicator
          isVisible={dragState.isDragging}
          position={dragState.position}
          componentType={dragState.componentType}
          displayName={dragState.displayName}
        />
        {/* Toolbar */}
        <ErrorBoundary>
          <Toolbar
            key="toolbar"
            selectedNode={selectedNode}
            zoom={state.zoom}
            showGrid={state.showGrid}
            onZoomChange={actions.setZoom}
            onGridToggle={handleGridToggle}
            onUndo={actions.undo}
            onRedo={actions.redo}
            onDelete={() => state.selectedNodeId && actions.removeNode(state.selectedNodeId)}
            onDuplicate={() => state.selectedNodeId && actions.duplicateNode(state.selectedNodeId)}
            onExport={handleExport}
            onImport={handleImport}
            canUndo={state.historyIndex > 0}
            canRedo={state.historyIndex < state.history.length - 1}
            canDelete={state.selectedNodeId ? query.canDeleteNode(state.selectedNodeId) : false}
          />
        </ErrorBoundary>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel - Components and Layers */}
          <div className="w-64 flex flex-col border-r border-gray-200">
            {/* Tabs for switching between Components and Layers */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setLeftPanel('components')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  leftPanel === 'components'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                }`}
              >
                Компоненты
              </button>
              <button
                onClick={() => setLeftPanel('layers')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  leftPanel === 'layers'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                }`}
              >
                Слои
              </button>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-hidden">
              {leftPanel === 'components' && (
                <ErrorBoundary>
                  <ComponentsPanel
                    key="components-panel"
                    components={components}
                    onDragStart={(componentType, e) => {
                      const component = registry.get(componentType);
                      if (component) {
                        startComponentDrag(componentType, component.displayName, component.defaultProps, e);
                      }
                    }}
                  />
                </ErrorBoundary>
              )}

              {leftPanel === 'layers' && (
                <ErrorBoundary>
                  <NewLayersPanel
                    key="layers-panel"
                    nodes={state.nodes}
                    selectedNodeId={state.selectedNodeId}
                    onNodeSelect={actions.selectNode}
                    onNodeDelete={actions.removeNode}
                    onNodeDuplicate={actions.duplicateNode}
                    onNodeMove={actions.moveNode}
                    onNodeVisibilityToggle={() => {}} // TODO: implement visibility
                    onGroupCreate={actions.createGroup}
                    onGroupUngroup={actions.ungroup}
                  />
                </ErrorBoundary>
              )}
            </div>
          </div>

          {/* Canvas area */}
          <div className="flex-1 flex flex-col">
            <div
              ref={canvasRef}
              className="flex-1 relative overflow-auto bg-white"
              onDrop={(e) => handleCanvasDrop(e, handleCanvasDropCallback)}
              onDragOver={handleCanvasDragOver}
            >
              <ErrorBoundary>
                <Canvas
                  key="canvas"
                  nodes={state.nodes}
                  selectedNodeId={state.selectedNodeId}
                  onNodeSelect={actions.selectNode}
                  onNodeUpdate={actions.updateNode}
                  zoom={state.zoom}
                  showGrid={state.showGrid}
                  canvasSize={state.canvasSize}
                  mode={state.mode}
                />
              </ErrorBoundary>
            </div>
          </div>

          {/* Right panel - Properties and Export */}
          <div className="w-64 flex flex-col border-l border-gray-200">
            {/* Tabs for switching between Properties and Export */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setRightPanel('properties')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  rightPanel === 'properties'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                }`}
              >
                Свойства
              </button>
              <button
                onClick={() => setRightPanel('export')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  rightPanel === 'export'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                }`}
              >
                Экспорт
              </button>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-hidden">
              {rightPanel === 'properties' && (
                <ErrorBoundary>
                  <PropertiesPanel
                    key="properties-panel"
                    selectedNode={selectedNode}
                    onNodeUpdate={actions.updateNode}
                    componentRegistry={registry.components}
                  />
                </ErrorBoundary>
              )}

              {rightPanel === 'export' && (
                <ErrorBoundary>
                  <ExportPanel
                    key="export-panel"
                    nodes={state.nodes}
                    canvasSize={state.canvasSize}
                    onExport={(format, options) => {
                      handleExport(format, options);
                    }}
                  />
                </ErrorBoundary>
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}; 