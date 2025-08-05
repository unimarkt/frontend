// Inspired by craft.js useEditor hook: https://github.com/prevwong/craft.js/blob/master/packages/core/src/editor/useEditor.ts
// and react-page editor state management: https://github.com/react-page/react-page/blob/main/packages/editor/src/core/actions/index.ts

import { useState, useCallback, useRef, useMemo } from 'react';
import type { 
  EditorState, 
  Node, 
  EditorHistoryItem,
  ComponentConfig,
  ComponentRegistry,
  EditorActions,
  EditorQuery
} from '../types/canvas.types';

const MAX_HISTORY_SIZE = 50;

export const useEditor = () => {
  const [state, setState] = useState<EditorState>({
    nodes: {},
    selectedNodeId: null,
    hoveredNodeId: null,
    draggedNodeId: null,
    history: [],
    historyIndex: -1,
    zoom: 100,
    showGrid: true,
    isLoading: false,
    error: null,
    mode: 'edit',
    canvasSize: { width: 900, height: 1200 },
  });

  // Registry для компонентов
  const [components, setComponents] = useState<Record<string, ComponentConfig>>({});

  const registry: ComponentRegistry = {
    components,
    register: (config: ComponentConfig) => {
      console.log('Registering component:', config.type);
      setComponents(prev => ({
        ...prev, 
        [config.type]: config
      }));
    },
    unregister: (type: string) => {
      console.log('Unregistering component:', type);
      setComponents(prev => {
        const newComponents = { ...prev };
        delete newComponents[type];
        return newComponents;
      });
    },
    get: (type: string): ComponentConfig | null => {
      const component = components[type] || null;
      console.log('Getting component:', type, component);
      return component;
    },
    getAll: (): ComponentConfig[] => {
      const componentsArray = Object.values(components);
      console.log('Getting all components:', componentsArray);
      return componentsArray;
    },
  };

  // Сохранение в историю
  const saveToHistory = useCallback((description: string) => {
    setState(prev => {
      const newHistoryItem: EditorHistoryItem = {
        id: `history-${Date.now()}`,
        timestamp: Date.now(),
        nodes: { ...prev.nodes },
        selectedNodeId: prev.selectedNodeId,
        description,
      };

      const newHistory = [
        ...prev.history.slice(0, prev.historyIndex + 1),
        newHistoryItem,
      ].slice(-MAX_HISTORY_SIZE);

      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  // Undo/Redo
  const undo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex > 0) {
        const newIndex = prev.historyIndex - 1;
        const historyItem = prev.history[newIndex];
        return {
          ...prev,
          nodes: { ...historyItem.nodes },
          selectedNodeId: historyItem.selectedNodeId,
          historyIndex: newIndex,
        };
      }
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex < prev.history.length - 1) {
        const newIndex = prev.historyIndex + 1;
        const historyItem = prev.history[newIndex];
        return {
          ...prev,
          nodes: { ...historyItem.nodes },
          selectedNodeId: historyItem.selectedNodeId,
          historyIndex: newIndex,
        };
      }
      return prev;
    });
  }, []);

  // Управление узлами
  const addNode = useCallback((node: Node, parentId?: string, index?: number) => {
    console.log('Adding node:', node, 'parentId:', parentId, 'index:', index);
    setState(prev => {
      const newNodes = { ...prev.nodes };
      newNodes[node.id] = node;
      
      // Если указан родитель, добавляем узел как дочерний
      if (parentId) {
        const parent = newNodes[parentId];
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          const insertIndex = index !== undefined ? index : parent.children.length;
          parent.children.splice(insertIndex, 0, node.id);
          node.parentId = parentId;
        }
      }
      
      console.log('New state:', { ...prev, nodes: newNodes });
      return { ...prev, nodes: newNodes };
    });
    saveToHistory(`Добавлен ${node.displayName || node.type}`);
  }, [saveToHistory]);

  const updateNode = useCallback((nodeId: string, updates: Partial<Node>) => {
    console.log('Updating node:', nodeId, updates);
    setState(prev => {
      if (!prev.nodes[nodeId]) {
        console.log('Node not found:', nodeId);
        return prev;
      }
      
      const newNodes = { ...prev.nodes };
      const currentNode = newNodes[nodeId];
      
      // Если обновляются props, нужно правильно их объединить
      if (updates.props && currentNode.props) {
        console.log('Merging props:', currentNode.props, updates.props);
        newNodes[nodeId] = { 
          ...currentNode, 
          ...updates,
          props: { ...currentNode.props, ...updates.props }
        };
        console.log('Result:', newNodes[nodeId]);
      } else {
        newNodes[nodeId] = { ...currentNode, ...updates };
      }
      
      console.log('Updated node:', newNodes[nodeId]);
      return { ...prev, nodes: newNodes };
    });
    saveToHistory(`Обновлен элемент: ${updates.displayName || 'элемент'}`);
  }, [saveToHistory]);

  const removeNode = useCallback((nodeId: string) => {
    setState(prev => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      
      const newNodes = { ...prev.nodes };
      
      // Удаляем из родителя
      if (node.parentId && newNodes[node.parentId]) {
        const parent = newNodes[node.parentId];
        const children = (parent.children || []).filter(id => id !== nodeId);
        newNodes[node.parentId] = { ...parent, children };
      }
      
      // Удаляем узел и всех его потомков
      const descendants = getNodeDescendants(nodeId, newNodes);
      descendants.forEach(descId => delete newNodes[descId]);
      delete newNodes[nodeId];
      
      // Снимаем выделение если удаляемый узел был выбран
      const newSelectedNodeId = prev.selectedNodeId === nodeId ? null : prev.selectedNodeId;
      
      return { ...prev, nodes: newNodes, selectedNodeId: newSelectedNodeId };
    });
    saveToHistory('Удален элемент');
  }, [saveToHistory]);

  const duplicateNode = useCallback((nodeId: string) => {
    setState(prev => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      
      const newId = `${node.type}-${Date.now()}`;
      const duplicatedNode: Node = {
        ...node,
        id: newId,
        displayName: `${node.displayName || node.type} (копия)`,
      };
      
      const newNodes = { ...prev.nodes, [newId]: duplicatedNode };
      
      // Если есть родитель, добавляем в его children
      if (node.parentId && newNodes[node.parentId]) {
        const parent = newNodes[node.parentId];
        const children = [...(parent.children || []), newId];
        newNodes[node.parentId] = { ...parent, children };
        newNodes[newId] = { ...duplicatedNode, parentId: node.parentId };
      }
      
      return { ...prev, nodes: newNodes, selectedNodeId: newId };
    });
    saveToHistory('Дублирован элемент');
  }, [saveToHistory]);

  // Выделение и hover
  const selectNode = useCallback((nodeId: string | null) => {
    setState(prev => ({ ...prev, selectedNodeId: nodeId }));
  }, []);

  const hoverNode = useCallback((nodeId: string | null) => {
    setState(prev => ({ ...prev, hoveredNodeId: nodeId }));
  }, []);

  // Drag & Drop
  const setDraggedNode = useCallback((nodeId: string | null) => {
    setState(prev => ({ ...prev, draggedNodeId: nodeId }));
  }, []);

  const moveNode = useCallback((nodeId: string, targetParentId: string, index: number) => {
    setState(prev => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      
      const newNodes = { ...prev.nodes };
      
      // Удаляем из старого родителя
      if (node.parentId && newNodes[node.parentId]) {
        const oldParent = newNodes[node.parentId];
        const oldChildren = (oldParent.children || []).filter(id => id !== nodeId);
        newNodes[node.parentId] = { ...oldParent, children: oldChildren };
      }
      
      // Добавляем в нового родителя
      if (newNodes[targetParentId]) {
        const newParent = newNodes[targetParentId];
        const newChildren = [...(newParent.children || [])];
        newChildren.splice(index, 0, nodeId);
        newNodes[targetParentId] = { ...newParent, children: newChildren };
        newNodes[nodeId] = { ...node, parentId: targetParentId };
      }
      
      return { ...prev, nodes: newNodes };
    });
    saveToHistory('Перемещен элемент');
  }, [saveToHistory]);

  // Canvas настройки
  const setZoom = useCallback((zoom: number) => {
    setState(prev => ({ ...prev, zoom }));
  }, []);

  const setShowGrid = useCallback((show: boolean) => {
    setState(prev => {
      // Проверяем, действительно ли изменилось значение
      if (prev.showGrid === show) {
        return prev; // Возвращаем тот же объект, если значение не изменилось
      }
      return { ...prev, showGrid: show };
    });
  }, []);

  const setCanvasSize = useCallback((size: { width: number; height: number }) => {
    setState(prev => ({ ...prev, canvasSize: size }));
  }, []);

  // Режим редактора
  const setMode = useCallback((mode: 'edit' | 'preview') => {
    setState(prev => ({ ...prev, mode }));
  }, []);

  // Import/Export
  const importJSON = useCallback((json: string) => {
    try {
      const data = JSON.parse(json);
      setState(prev => ({
        ...prev,
        nodes: data.nodes || {},
        selectedNodeId: null,
        history: [],
        historyIndex: -1,
      }));
      saveToHistory('Импортирован проект');
    } catch (error) {
      console.error('Failed to import JSON:', error);
    }
  }, [saveToHistory]);

  const exportJSON = useCallback(() => {
    return JSON.stringify({
      nodes: state.nodes,
      canvasSize: state.canvasSize,
      version: '1.0.0',
    }, null, 2);
  }, [state.nodes, state.canvasSize]);

  // Registry
  const registerComponent = useCallback((config: ComponentConfig) => {
    registry.register(config);
  }, []);

  const unregisterComponent = useCallback((type: string) => {
    registry.unregister(type);
  }, []);

  // Query методы
  const query: EditorQuery = useMemo(() => ({
    getNode: (nodeId: string) => state.nodes[nodeId] || null,
    getNodes: () => state.nodes,
    getSelectedNode: () => state.selectedNodeId ? state.nodes[state.selectedNodeId] || null : null,
    getHoveredNode: () => state.hoveredNodeId ? state.nodes[state.hoveredNodeId] || null : null,
    getDraggedNode: () => state.draggedNodeId ? state.nodes[state.draggedNodeId] || null : null,
    getNodeAncestors: (nodeId: string) => {
      const ancestors: Node[] = [];
      let current = state.nodes[nodeId];
      while (current?.parentId) {
        const parent = state.nodes[current.parentId];
        if (parent) {
          ancestors.unshift(parent);
          current = parent;
        } else {
          break;
        }
      }
      return ancestors;
    },
    getNodeDescendants: (nodeId: string) => {
      const descendants: Node[] = [];
      const traverse = (id: string) => {
        const node = state.nodes[id];
        if (node) {
          descendants.push(node);
          (node.children || []).forEach(traverse);
        }
      };
      traverse(nodeId);
      return descendants;
    },
    getNodeSiblings: (nodeId: string) => {
      const node = state.nodes[nodeId];
      if (!node?.parentId) return [];
      
      const parent = state.nodes[node.parentId];
      if (!parent?.children) return [];
      
      return parent.children
        .filter(id => id !== nodeId)
        .map(id => state.nodes[id])
        .filter(Boolean) as Node[];
    },
    getNodeChildren: (nodeId: string) => {
      const node = state.nodes[nodeId];
      if (!node?.children) return [];
      
      return node.children
        .map(id => state.nodes[id])
        .filter(Boolean) as Node[];
    },
    getNodeParent: (nodeId: string) => {
      const node = state.nodes[nodeId];
      if (!node?.parentId) return null;
      return state.nodes[node.parentId] || null;
    },
    getNodeIndex: (nodeId: string) => {
      const node = state.nodes[nodeId];
      if (!node?.parentId) return 0;
      
      const parent = state.nodes[node.parentId];
      if (!parent?.children) return 0;
      
      return parent.children.indexOf(nodeId);
    },
    canMoveNode: (nodeId: string, targetParentId: string) => {
      // Проверяем что не пытаемся переместить родителя в его потомка
      const descendants: Node[] = [];
      const traverse = (id: string) => {
        const node = state.nodes[id];
        if (node) {
          descendants.push(node);
          (node.children || []).forEach(traverse);
        }
      };
      traverse(nodeId);
      return !descendants.some(desc => desc.id === targetParentId);
    },
    canDeleteNode: (nodeId: string) => {
      const node = state.nodes[nodeId];
      if (!node) return false;
      
      const config = registry.get(node.type);
      return config?.isDeletable !== false;
    },
  }), [state.nodes, state.selectedNodeId, state.hoveredNodeId, state.draggedNodeId]);

  // Группировка
  const createGroup = useCallback((nodeIds: string[]) => {
    if (nodeIds.length < 2) return;
    
    setState(prev => {
      const newNodes = { ...prev.nodes };
      
      // Вычисляем границы группы
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      
      nodeIds.forEach(nodeId => {
        const node = newNodes[nodeId];
        if (node) {
          const x = node.props.x || 0;
          const y = node.props.y || 0;
          const width = node.props.width || 0;
          const height = node.props.height || 0;
          
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x + width);
          maxY = Math.max(maxY, y + height);
        }
      });
      
      // Создаем группу
      const groupId = `group-${Date.now()}`;
      const groupNode: Node = {
        id: groupId,
        type: 'group',
        displayName: 'Группа',
        props: {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
          rotation: 0,
        },
        children: nodeIds,
        isCanvas: true,
        isResizable: true,
        isDeletable: true,
      };
      
      // Обновляем родителя для всех узлов в группе
      nodeIds.forEach(nodeId => {
        if (newNodes[nodeId]) {
          newNodes[nodeId] = { ...newNodes[nodeId], parentId: groupId };
        }
      });
      
      newNodes[groupId] = groupNode;
      
      return { ...prev, nodes: newNodes, selectedNodeId: groupId };
    });
    saveToHistory('Создана группа');
  }, [saveToHistory]);

  const ungroup = useCallback((groupId: string) => {
    setState(prev => {
      const group = prev.nodes[groupId];
      if (!group || group.type !== 'group') return prev;
      
      const newNodes = { ...prev.nodes };
      const children = group.children || [];
      
      // Удаляем ссылки на родителя у всех дочерних элементов
      children.forEach(childId => {
        if (newNodes[childId]) {
          newNodes[childId] = { ...newNodes[childId], parentId: undefined };
        }
      });
      
      // Удаляем группу
      delete newNodes[groupId];
      
      return { ...prev, nodes: newNodes, selectedNodeId: null };
    });
    saveToHistory('Разгруппирована группа');
  }, [saveToHistory]);

  // Actions
  const actions: EditorActions = useMemo(() => ({
    addNode,
    updateNode,
    removeNode,
    duplicateNode,
    selectNode,
    hoverNode,
    setDraggedNode,
    moveNode,
    createGroup,
    ungroup,
    undo,
    redo,
    saveToHistory,
    setZoom,
    setShowGrid,
    setCanvasSize,
    setMode,
    importJSON,
    exportJSON,
    registerComponent,
    unregisterComponent,
  }), [
    addNode, updateNode, removeNode, duplicateNode,
    selectNode, hoverNode, setDraggedNode, moveNode,
    createGroup, ungroup, undo, redo, saveToHistory, 
    setZoom, setShowGrid, setCanvasSize, setMode, 
    importJSON, exportJSON, registerComponent, unregisterComponent,
  ]);

  return {
    state,
    actions,
    query,
    registry: registry,
  };
};

// Вспомогательная функция для получения потомков узла
function getNodeDescendants(nodeId: string, nodes: Record<string, Node>): string[] {
  const descendants: string[] = [];
  const traverse = (id: string) => {
    const node = nodes[id];
    if (node) {
      descendants.push(id);
      (node.children || []).forEach(traverse);
    }
  };
  traverse(nodeId);
  return descendants;
} 