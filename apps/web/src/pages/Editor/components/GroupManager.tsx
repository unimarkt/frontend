import React, { useState, useCallback } from 'react';
import type { Node } from '../types/canvas.types';

interface GroupManagerProps {
  nodes: Record<string, Node>;
  selectedNodeId: string | null;
  onGroupCreate: (nodeIds: string[]) => void;
  onGroupUngroup: (groupId: string) => void;
  onNodeSelect: (nodeId: string | null) => void;
}

export const GroupManager: React.FC<GroupManagerProps> = ({
  nodes,
  selectedNodeId,
  onGroupCreate,
  onGroupUngroup,
  onNodeSelect,
}) => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const handleNodeSelect = useCallback((nodeId: string, isMultiSelect: boolean) => {
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

  return (
    <div className="group-manager bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Группировка</h3>
      
      <div className="space-y-3">
        {/* Выбранные элементы */}
        {selectedNodes.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <h4 className="text-xs font-medium text-blue-900 mb-2">
              Выбрано элементов: {selectedNodes.length}
            </h4>
            <div className="space-y-1">
              {selectedNodes.map(nodeId => {
                const node = nodes[nodeId];
                return node ? (
                  <div key={nodeId} className="flex items-center justify-between text-xs">
                    <span className="text-blue-700">{node.displayName || node.type}</span>
                    <button
                      onClick={() => handleNodeSelect(nodeId, true)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✕
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Кнопки действий */}
        <div className="flex space-x-2">
          <button
            onClick={handleGroupCreate}
            disabled={!canGroup}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              canGroup
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Сгруппировать
          </button>
          
          <button
            onClick={handleGroupUngroup}
            disabled={!canUngroup}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              canUngroup
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Разгруппировать
          </button>
        </div>

        {/* Инструкции */}
        <div className="text-xs text-gray-500">
          <p>• Ctrl+Click для множественного выбора</p>
          <p>• Выберите несколько элементов для группировки</p>
          <p>• Выберите группу для разгруппировки</p>
        </div>
      </div>
    </div>
  );
}; 