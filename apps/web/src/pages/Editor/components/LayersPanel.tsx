// Inspired by craft.js LayerManager: https://github.com/prevwong/craft.js/blob/master/examples/playground/components/Editor/LayerManager.js
// and react-page CellTree: https://github.com/react-page/react-page/blob/main/packages/editor/src/ui/sidebar/CellTree.tsx

import React, { useState } from 'react';
import type { Node } from '../types/canvas.types';

interface LayersPanelProps {
  nodes: Record<string, Node>;
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string | null) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeDuplicate: (nodeId: string) => void;
  onNodeMove: (nodeId: string, targetParentId: string, index: number) => void;
  onNodeVisibilityToggle: (nodeId: string) => void;
}

interface LayerItemProps {
  node: Node;
  nodes: Record<string, Node>;
  level: number;
  isSelected: boolean;
  isVisible: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onVisibilityToggle: () => void;
  onDragStart: (e: React.DragEvent, nodeId: string) => void;
  onDrop: (e: React.DragEvent, nodeId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
}

const LayerItem: React.FC<LayerItemProps> = ({
  node,
  level,
  isSelected,
  isVisible,
  onSelect,
  onDelete,
  onDuplicate,
  onVisibilityToggle,
  onDragStart,
  onDrop,
  onDragOver,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return '📝';
      case 'image':
        return '🖼️';
      case 'rectangle':
        return '⬜';
      case 'circle':
        return '⭕';
      case 'group':
        return '📁';
      default:
        return '📄';
    }
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div
      className={`layer-item ${isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div
        className={`flex items-center px-3 py-2 border-l-4 ${
          isSelected ? 'border-blue-500' : 'border-transparent'
        }`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        {/* Expand/Collapse button */}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-4 h-4 mr-2 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
        
        {/* Visibility toggle */}
        <button
          onClick={onVisibilityToggle}
          className="w-4 h-4 mr-2 flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          {isVisible ? '👁️' : '👁️‍🗨️'}
        </button>

        {/* Node icon and name */}
        <div className="flex items-center flex-1 min-w-0" onClick={onSelect}>
          <span className="mr-2">{getNodeIcon(node.type)}</span>
          <span className="text-sm font-medium truncate">
            {node.displayName || node.type}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1">
          <button
            onClick={onDuplicate}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
            title="Дублировать"
          >
            📋
        </button>
        <button
            onClick={onDelete}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
            title="Удалить"
        >
          🗑️
        </button>
      </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="children">
          {node.children!.map((childId) => (
            <LayerItem
              key={childId}
              node={nodes[childId]}
              nodes={nodes}
              level={level + 1}
              isSelected={false} // TODO: implement selected state
              isVisible={true} // TODO: implement visibility state
              onSelect={() => {}} // TODO: implement select callback
              onDelete={() => {}} // TODO: implement delete callback
              onDuplicate={() => {}} // TODO: implement duplicate callback
              onVisibilityToggle={() => {}} // TODO: implement visibility toggle
              onDragStart={(e, nodeId) => onDragStart(e, nodeId)}
              onDrop={(e, nodeId) => onDrop(e, nodeId)}
              onDragOver={onDragOver}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const LayersPanel: React.FC<LayersPanelProps> = ({
  nodes,
  selectedNodeId,
  onNodeSelect,
  onNodeDelete,
  onNodeDuplicate,
  onNodeMove,
  onNodeVisibilityToggle,
}) => {
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  // Получаем корневые узлы (без родителя)
  const rootNodes = Object.values(nodes).filter(node => !node.parentId);

  const handleDragStart = (e: React.DragEvent, nodeId: string) => {
    setDraggedNodeId(nodeId);
    e.dataTransfer.setData('text/plain', nodeId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetNodeId: string) => {
    e.preventDefault();
    
    if (!draggedNodeId || draggedNodeId === targetNodeId) return;

    const targetNode = nodes[targetNodeId];
    if (!targetNode) return;

    // Определяем позицию вставки
    let insertIndex = 0;
    if (targetNode.children) {
      insertIndex = targetNode.children.length;
    }

    onNodeMove(draggedNodeId, targetNodeId, insertIndex);
    setDraggedNodeId(null);
  };

  const handleDropOnRoot = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedNodeId) return;

    // Перемещаем в корень
    onNodeMove(draggedNodeId, '', 0);
    setDraggedNodeId(null);
  };

  return (
    <div className="layers-panel bg-white border-r border-gray-200 w-64 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Слои</h3>
        </div>

      {/* Layers list */}
      <div className="flex-1 overflow-y-auto">
        <div
          className="min-h-full"
          onDragOver={handleDragOver}
          onDrop={handleDropOnRoot}
        >
          {rootNodes.map((node) => (
            <LayerItem
              key={node.id}
              node={node}
              level={0}
              isSelected={selectedNodeId === node.id}
              isVisible={true} // TODO: implement visibility state
              onSelect={() => onNodeSelect(node.id)}
              onDelete={() => onNodeDelete(node.id)}
              onDuplicate={() => onNodeDuplicate(node.id)}
              onVisibilityToggle={() => onNodeVisibilityToggle(node.id)}
              onDragStart={(e) => handleDragStart(e, node.id)}
              onDrop={(e) => handleDrop(e, node.id)}
              onDragOver={handleDragOver}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          {Object.keys(nodes).length} элементов
        </div>
      </div>
    </div>
  );
};