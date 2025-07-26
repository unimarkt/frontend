import { useEffect, useCallback } from 'react';

interface KeyboardShortcutsProps {
  onUndo?: () => void;
  onRedo?: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onSelectAll?: () => void;
  onSave?: () => void;
  onExport?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomFit?: () => void;
  onZoom100?: () => void;
  onDuplicate?: () => void;
  onCreateGroup?: () => void;
  onUngroup?: () => void;
  onToggleGrid?: () => void;
  onNudgeUp?: () => void;
  onNudgeDown?: () => void;
  onNudgeLeft?: () => void;
  onNudgeRight?: () => void;
  onNudgeUpLarge?: () => void;
  onNudgeDownLarge?: () => void;
  onNudgeLeftLarge?: () => void;
  onNudgeRightLarge?: () => void;
  onDeselect?: () => void;
  onShowHelp?: () => void;
  enabled?: boolean;
}

export const useKeyboardShortcuts = ({
  onUndo,
  onRedo,
  onDelete,
  onCopy,
  onPaste,
  onSelectAll,
  onSave,
  onExport,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  onZoom100,
  onDuplicate,
  onCreateGroup,
  onUngroup,
  onToggleGrid,
  onNudgeUp,
  onNudgeDown,
  onNudgeLeft,
  onNudgeRight,
  onNudgeUpLarge,
  onNudgeDownLarge,
  onNudgeLeftLarge,
  onNudgeRightLarge,
  onDeselect,
  onShowHelp,
  enabled = true,
}: KeyboardShortcutsProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const { key, ctrlKey, shiftKey, metaKey, altKey } = event;

      // Предотвращаем стандартные браузерные действия
      const preventDefault = () => {
        event.preventDefault();
        event.stopPropagation();
      };

      // Ctrl/Cmd + Z - Отменить
      if ((ctrlKey || metaKey) && key === 'z' && !shiftKey) {
        if (onUndo) {
          preventDefault();
          onUndo();
        }
      }

      // Ctrl/Cmd + Shift + Z или Ctrl/Cmd + Y - Повторить
      if ((ctrlKey || metaKey) && ((key === 'z' && shiftKey) || key === 'y')) {
        if (onRedo) {
          preventDefault();
          onRedo();
        }
      }

      // Delete или Backspace - Удалить
      if (key === 'Delete' || key === 'Backspace') {
        if (onDelete) {
          preventDefault();
          onDelete();
        }
      }

      // Ctrl/Cmd + C - Копировать
      if ((ctrlKey || metaKey) && key === 'c') {
        if (onCopy) {
          preventDefault();
          onCopy();
        }
      }

      // Ctrl/Cmd + V - Вставить
      if ((ctrlKey || metaKey) && key === 'v') {
        if (onPaste) {
          preventDefault();
          onPaste();
        }
      }

      // Ctrl/Cmd + A - Выбрать все
      if ((ctrlKey || metaKey) && key === 'a') {
        if (onSelectAll) {
          preventDefault();
          onSelectAll();
        }
      }

      // Ctrl/Cmd + D - Дублировать
      if ((ctrlKey || metaKey) && key === 'd') {
        if (onDuplicate) {
          preventDefault();
          onDuplicate();
        }
      }

      // Ctrl/Cmd + G - Создать группу
      if ((ctrlKey || metaKey) && key === 'g') {
        if (onCreateGroup) {
          preventDefault();
          onCreateGroup();
        }
      }

      // Ctrl/Cmd + Shift + G - Разгруппировать
      if ((ctrlKey || metaKey) && shiftKey && key === 'g') {
        if (onUngroup) {
          preventDefault();
          onUngroup();
        }
      }

      // Ctrl/Cmd + S - Сохранить
      if ((ctrlKey || metaKey) && key === 's') {
        if (onSave) {
          preventDefault();
          onSave();
        }
      }

      // Ctrl/Cmd + E - Экспорт
      if ((ctrlKey || metaKey) && key === 'e') {
        if (onExport) {
          preventDefault();
          onExport();
        }
      }

      // Ctrl/Cmd + Plus - Увеличить масштаб
      if ((ctrlKey || metaKey) && (key === '+' || key === '=')) {
        if (onZoomIn) {
          preventDefault();
          onZoomIn();
        }
      }

      // Ctrl/Cmd + Minus - Уменьшить масштаб
      if ((ctrlKey || metaKey) && key === '-') {
        if (onZoomOut) {
          preventDefault();
          onZoomOut();
        }
      }

      // Ctrl/Cmd + 0 - Подогнать под экран
      if ((ctrlKey || metaKey) && key === '0') {
        if (onZoomFit) {
          preventDefault();
          onZoomFit();
        }
      }

      // Ctrl/Cmd + 1 - 100% масштаб
      if ((ctrlKey || metaKey) && key === '1') {
        if (onZoom100) {
          preventDefault();
          onZoom100();
        }
      }

      // G - Переключить сетку
      if (key === 'g' && !ctrlKey && !metaKey && !shiftKey && !altKey) {
        if (onToggleGrid) {
          preventDefault();
          onToggleGrid();
        }
      }

      // Стрелки - Перемещение объектов
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        if (shiftKey) {
          // Shift + стрелки - большое перемещение
          switch (key) {
            case 'ArrowUp':
              if (onNudgeUpLarge) {
                preventDefault();
                onNudgeUpLarge();
              }
              break;
            case 'ArrowDown':
              if (onNudgeDownLarge) {
                preventDefault();
                onNudgeDownLarge();
              }
              break;
            case 'ArrowLeft':
              if (onNudgeLeftLarge) {
                preventDefault();
                onNudgeLeftLarge();
              }
              break;
            case 'ArrowRight':
              if (onNudgeRightLarge) {
                preventDefault();
                onNudgeRightLarge();
              }
              break;
          }
        } else {
          // Обычные стрелки - маленькое перемещение
          switch (key) {
            case 'ArrowUp':
              if (onNudgeUp) {
                preventDefault();
                onNudgeUp();
              }
              break;
            case 'ArrowDown':
              if (onNudgeDown) {
                preventDefault();
                onNudgeDown();
              }
              break;
            case 'ArrowLeft':
              if (onNudgeLeft) {
                preventDefault();
                onNudgeLeft();
              }
              break;
            case 'ArrowRight':
              if (onNudgeRight) {
                preventDefault();
                onNudgeRight();
              }
              break;
          }
        }
      }

      // Escape - Снять выделение
      if (key === 'Escape') {
        if (onDeselect) {
          preventDefault();
          onDeselect();
        }
      }

      // Space - Переключить панорамирование (заготовка)
      if (key === ' ' && !ctrlKey && !metaKey && !shiftKey && !altKey) {
        // TODO: Реализовать панорамирование canvas
        preventDefault();
      }

      // ? - Показать справку по горячим клавишам
      if (key === '?' && !ctrlKey && !metaKey && !shiftKey && !altKey) {
        if (onShowHelp) {
          preventDefault();
          onShowHelp();
        }
      }
    },
    [
      enabled,
      onUndo,
      onRedo,
      onDelete,
      onCopy,
      onPaste,
      onSelectAll,
      onSave,
      onExport,
      onZoomIn,
      onZoomOut,
      onZoomFit,
      onZoom100,
      onDuplicate,
      onCreateGroup,
      onUngroup,
      onToggleGrid,
      onNudgeUp,
      onNudgeDown,
      onNudgeLeft,
      onNudgeRight,
      onNudgeUpLarge,
      onNudgeDownLarge,
      onNudgeLeftLarge,
      onNudgeRightLarge,
      onDeselect,
      onShowHelp,
    ]
  );

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown, enabled]);

  return {
    // Функция для программного вызова действий
    triggerAction: (action: string) => {
      switch (action) {
        case 'undo':
          onUndo?.();
          break;
        case 'redo':
          onRedo?.();
          break;
        case 'delete':
          onDelete?.();
          break;
        case 'copy':
          onCopy?.();
          break;
        case 'paste':
          onPaste?.();
          break;
        case 'selectAll':
          onSelectAll?.();
          break;
        case 'duplicate':
          onDuplicate?.();
          break;
        case 'createGroup':
          onCreateGroup?.();
          break;
        case 'ungroup':
          onUngroup?.();
          break;
        case 'save':
          onSave?.();
          break;
        case 'export':
          onExport?.();
          break;
        case 'zoomIn':
          onZoomIn?.();
          break;
        case 'zoomOut':
          onZoomOut?.();
          break;
        case 'zoomFit':
          onZoomFit?.();
          break;
        case 'zoom100':
          onZoom100?.();
          break;
        case 'toggleGrid':
          onToggleGrid?.();
          break;
        case 'deselect':
          onDeselect?.();
          break;
        case 'showHelp':
          onShowHelp?.();
          break;
      }
    },
  };
}; 