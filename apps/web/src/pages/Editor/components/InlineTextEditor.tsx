import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { TextLayer } from '../types/editor.types';

interface InlineTextEditorProps {
  layer: TextLayer;
  isEditing: boolean;
  onStartEdit: () => void;
  onFinishEdit: (text: string) => void;
  onCancelEdit: () => void;
  onUpdate: (updates: Partial<TextLayer>) => void;
}

const InlineTextEditor: React.FC<InlineTextEditorProps> = ({
  layer,
  isEditing,
  onStartEdit,
  onFinishEdit,
  onCancelEdit,
  onUpdate,
}) => {
  const [text, setText] = useState(layer.text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Автоматически фокусируемся на textarea при начале редактирования
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  // Обновляем текст при изменении слоя
  useEffect(() => {
    setText(layer.text);
  }, [layer.text]);

  // Обработка клавиш
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onFinishEdit(text);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancelEdit();
    }
  }, [text, onFinishEdit, onCancelEdit]);

  // Автоматическое изменение размера textarea
  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    
    // Автоматически подстраиваем высоту
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  // Обработка потери фокуса
  const handleBlur = useCallback(() => {
    onFinishEdit(text);
  }, [text, onFinishEdit]);

  if (!isEditing) {
    return (
      <div
        className="w-full h-full cursor-text select-none"
        style={{
          fontSize: layer.fontSize,
          fontFamily: layer.fontFamily,
          fontWeight: layer.fontWeight,
          color: layer.fontColor,
          textAlign: layer.textAlign,
          lineHeight: layer.lineHeight,
          letterSpacing: layer.letterSpacing,
          textDecoration: layer.textDecoration,
          textShadow: layer.textShadow,
        }}
        onDoubleClick={onStartEdit}
        title="Двойной клик для редактирования"
      >
        {layer.text}
      </div>
    );
  }

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className="w-full h-full resize-none outline-none border-none bg-transparent"
      style={{
        fontSize: layer.fontSize,
        fontFamily: layer.fontFamily,
        fontWeight: layer.fontWeight,
        color: layer.fontColor,
        textAlign: layer.textAlign,
        lineHeight: layer.lineHeight,
        letterSpacing: layer.letterSpacing,
        textDecoration: layer.textDecoration,
        textShadow: layer.textShadow,
        minHeight: `${layer.fontSize * layer.lineHeight}px`,
      }}
      placeholder="Введите текст..."
    />
  );
};

export default InlineTextEditor; 