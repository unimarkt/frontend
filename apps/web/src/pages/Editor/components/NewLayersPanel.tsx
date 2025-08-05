// Inspired by craft.js LayerManager: https://github.com/prevwong/craft.js/blob/master/examples/playground/components/Editor/LayerManager.js
// and react-page Layers: https://github.com/react-page/react-page/blob/main/packages/editor/src/ui/sidebar/Layers.tsx

import React, { useState, useCallback } from 'react';
import type { Node } from '../types/canvas.types';

interface NewLayersPanelProps {
  nodes: Record<string, Node>;
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string | null) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeDuplicate: (nodeId: string) => void;
  onNodeMove: (nodeId: string, targetParentId: string, index: number) => void;
  onNodeVisibilityToggle: (nodeId: string) => void;
  onGroupCreate: (nodeIds: string[]) => void;
  onGroupUngroup: (groupId: string) => void;
}

interface LayerItemProps {
  node: Node;
  nodes: Record<string, Node>;
  selectedNodeId: string | null;
  selectedNodes: string[];
  onNodeSelect: (nodeId: string | null) => void;
  onMultiNodeSelect: (nodeId: string, isMultiSelect: boolean) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeDuplicate: (nodeId: string) => void;
  onNodeMove: (nodeId: string, targetParentId: string, index: number) => void;
  onNodeVisibilityToggle: (nodeId: string) => void;
  depth?: number;
}

const LayerItem: React.FC<LayerItemProps> = ({
  node,
  nodes,
  selectedNodeId,
  selectedNodes,
  onNodeSelect,
  onMultiNodeSelect,
  onNodeDelete,
  onNodeDuplicate,
  onNodeMove,
  onNodeVisibilityToggle,
  depth = 0,
}) => {
  const isSelected = selectedNodeId === node.id;
  const isMultiSelected = selectedNodes.includes(node.id);
  const children = Object.values(nodes).filter(n => n.parentId === node.id);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case 'image':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'rectangle':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
          </svg>
        );
      case 'circle':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
          </svg>
        );
      case 'button':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122" />
          </svg>
        );
      case 'badge':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      case 'divider':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
      case 'heading':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case 'paragraph':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case 'group':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedNodeId = e.dataTransfer.getData('text/plain');
    if (draggedNodeId && draggedNodeId !== node.id) {
      onNodeMove(draggedNodeId, node.id, 0);
    }
  };

  const handleDropOnRoot = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedNodeId = e.dataTransfer.getData('text/plain');
    if (draggedNodeId) {
      onNodeMove(draggedNodeId, '', 0);
    }
  };

  return (
    <div className="layer-item">
      <div
        className={`flex items-center space-x-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
          isSelected
            ? 'bg-blue-100 text-blue-700'
            : isMultiSelected
            ? 'bg-blue-50 text-blue-600 border border-blue-200'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey) {
            onMultiNodeSelect(node.id, true);
          } else {
            onNodeSelect(node.id);
          }
        }}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Visibility toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNodeVisibilityToggle(node.id);
          }}
          className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>

        {/* Node icon */}
        <div className="w-4 h-4 flex items-center justify-center text-gray-500">
          {getNodeIcon(node.type)}
        </div>

        {/* Node name */}
        <span className="flex-1 text-sm truncate">
          {node.displayName || node.type}
        </span>

        {/* Actions */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNodeDuplicate(node.id);
            }}
            className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600"
            title="Дублировать"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNodeDelete(node.id);
            }}
            className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-red-600"
            title="Удалить"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Children */}
      {children.length > 0 && (
        <div className="ml-4">
          {children.map((child) => (
            <LayerItem
              key={child.id}
              node={child}
              nodes={nodes}
              selectedNodeId={selectedNodeId}
              selectedNodes={selectedNodes}
              onNodeSelect={onNodeSelect}
              onMultiNodeSelect={onMultiNodeSelect}
              onNodeDelete={onNodeDelete}
              onNodeDuplicate={onNodeDuplicate}
              onNodeMove={onNodeMove}
              onNodeVisibilityToggle={onNodeVisibilityToggle}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const NewLayersPanel: React.FC<NewLayersPanelProps> = ({
  nodes,
  selectedNodeId,
  onNodeSelect,
  onNodeDelete,
  onNodeDuplicate,
  onNodeMove,
  onNodeVisibilityToggle,
  onGroupCreate,
  onGroupUngroup,
}) => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const rootNodes = Object.values(nodes).filter(node => !node.parentId);

  const handleMultiNodeSelect = useCallback((nodeId: string, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      setSelectedNodes(prev => {
        if (prev.includes(nodeId)) {
          return prev.filter(id => id !== nodeId);
        } else {
          return [...prev, nodeId];
        }
      });
    } else {
      setSelectedNodes([nodeId]);
      onNodeSelect(nodeId);
    }
  }, [onNodeSelect]);

  const handleGroupCreate = useCallback(() => {
    if (selectedNodes.length > 1) {
      onGroupCreate(selectedNodes);
      setSelectedNodes([]);
    }
  }, [selectedNodes, onGroupCreate]);

  const handleGroupUngroup = useCallback(() => {
    if (selectedNodeId && nodes[selectedNodeId]?.type === 'group') {
      onGroupUngroup(selectedNodeId);
    }
  }, [selectedNodeId, nodes, onGroupUngroup]);

  const canGroup = selectedNodes.length > 1;
  const canUngroup = selectedNodeId && nodes[selectedNodeId]?.type === 'group';

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedNodeId = e.dataTransfer.getData('text/plain');
    if (draggedNodeId) {
      onNodeMove(draggedNodeId, '', 0);
    }
  };

  return (
    <div className="layers-panel bg-white border-r border-gray-200 w-64 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Слои</h3>
        <p className="text-xs text-gray-500 mt-1">
          Управление элементами
        </p>
      </div>

      {/* Layers list */}
      <div 
        className="flex-1 overflow-y-auto p-2"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {rootNodes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-sm">Нет элементов</p>
            <p className="text-xs">Перетащите компоненты на холст</p>
          </div>
        ) : (
          <div className="space-y-1">
            {rootNodes.map((node) => (
              <LayerItem
                key={node.id}
                node={node}
                nodes={nodes}
                selectedNodeId={selectedNodeId}
                selectedNodes={selectedNodes}
                onNodeSelect={onNodeSelect}
                onMultiNodeSelect={handleMultiNodeSelect}
                onNodeDelete={onNodeDelete}
                onNodeDuplicate={onNodeDuplicate}
                onNodeMove={onNodeMove}
                onNodeVisibilityToggle={onNodeVisibilityToggle}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200">
        {/* Group controls */}
        {(selectedNodes.length > 1 || canUngroup) && (
          <div className="mb-3 space-y-2">
            {selectedNodes.length > 1 && (
              <div className="bg-blue-50 border border-blue-200 rounded p-2">
                <div className="text-xs text-blue-700 mb-1">
                  Выбрано: {selectedNodes.length} элементов
                </div>
                <button
                  onClick={handleGroupCreate}
                  className="w-full px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition-colors"
                >
                  Сгруппировать
                </button>
              </div>
            )}
            
            {canUngroup && (
              <button
                onClick={handleGroupUngroup}
                className="w-full px-2 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors"
              >
                Разгруппировать
              </button>
            )}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          {Object.keys(nodes).length} элементов
        </div>
      </div>
    </div>
  );
}; 