import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  onUpload: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // в MB
  error?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = "*/*",
  multiple = false,
  maxFiles = 10,
  maxSize = 10, // 10MB по умолчанию
  error,
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    setDragError("");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const validateFiles = (files: FileList): string | null => {
    if (files.length > maxFiles) {
      return `Максимум ${maxFiles} файлов`;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Проверка размера
      if (file.size > maxSize * 1024 * 1024) {
        return `Файл ${file.name} слишком большой (максимум ${maxSize}MB)`;
      }

      // Проверка типа файла
      if (accept !== "*/*") {
        const acceptedTypes = accept.split(",").map(type => type.trim());
        const fileType = file.type;
        const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
        
        const isAccepted = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return fileExtension === type.toLowerCase();
          }
          return fileType.match(new RegExp(type.replace('*', '.*')));
        });

        if (!isAccepted) {
          return `Файл ${file.name} не поддерживается`;
        }
      }
    }

    return null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    const validationError = validateFiles(files);

    if (validationError) {
      setDragError(validationError);
      return;
    }

    onUpload(files);
    setDragError("");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validationError = validateFiles(files);
    if (validationError) {
      setDragError(validationError);
      return;
    }

    onUpload(files);
    setDragError("");
    
    // Сброс input для возможности повторной загрузки того же файла
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getAcceptDescription = () => {
    if (accept === "*/*") return "любые файлы";
    if (accept.includes("image/*")) return "изображения";
    if (accept.includes("video/*")) return "видео";
    if (accept.includes("audio/*")) return "аудио";
    return "файлы";
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${isDragOver 
            ? "border-primary-500 bg-primary-50" 
            : "border-gray-300 hover:border-gray-400"
          }
          ${error || dragError ? "border-red-300 bg-red-50" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-2">
          <div className="flex justify-center">
            {accept.includes("image/*") ? (
              <ImageIcon className="h-12 w-12 text-gray-400" />
            ) : (
              <Upload className="h-12 w-12 text-gray-400" />
            )}
          </div>

          <div className="text-sm text-gray-600">
            <p className="font-medium">
              Перетащите {getAcceptDescription()} сюда или{" "}
              <span className="text-primary-600 hover:text-primary-500 cursor-pointer">
                выберите файлы
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {multiple ? `Максимум ${maxFiles} файлов` : "Один файл"}, до {maxSize}MB каждый
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}

          {dragError && (
            <p className="text-sm text-red-600 mt-2">{dragError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload; 