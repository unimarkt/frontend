import React, { useRef, useState } from "react";

export interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  accept = ".jpg,.jpeg,.png",
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!accept.split(",").some(type => file.name.endsWith(type.trim()))) {
        alert("Формат файла не поддерживается");
        return;
      }
      setPreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 transition cursor-pointer ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      tabIndex={0}
      aria-label="Загрузка файла"
      onClick={() => inputRef.current?.click()}
      onDragOver={e => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={e => {
        e.preventDefault();
        setDragActive(false);
      }}
      onDrop={e => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
        aria-label="Выберите файл"
      />
      {preview ? (
        <img src={preview} alt="Превью" className="max-h-32 mb-2 rounded" />
      ) : (
        <span className="text-gray-500">Перетащите файл или кликните для выбора (jpg, png)</span>
      )}
    </div>
  );
};

/**
 * Пример использования:
 * <FileUpload onFileChange={setFile} />
 */ 