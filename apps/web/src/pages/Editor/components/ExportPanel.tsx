import React, { useState, useCallback } from 'react';
import type { Node } from '../types/canvas.types';

interface ExportPanelProps {
  nodes: Record<string, Node>;
  canvasSize: { width: number; height: number };
  onExport: (format: string, options: ExportOptions) => void;
}

interface ExportOptions {
  format: 'png' | 'jpg' | 'svg' | 'json';
  quality: number;
  scale: number;
  includeBackground: boolean;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  nodes,
  canvasSize,
  onExport,
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'png',
    quality: 0.9,
    scale: 1,
    includeBackground: true,
  });

  const handleFormatChange = useCallback((format: string) => {
    setExportOptions(prev => ({ ...prev, format: format as any }));
  }, []);

  const handleQualityChange = useCallback((quality: number) => {
    setExportOptions(prev => ({ ...prev, quality }));
  }, []);

  const handleScaleChange = useCallback((scale: number) => {
    setExportOptions(prev => ({ ...prev, scale }));
  }, []);

  const handleBackgroundChange = useCallback((includeBackground: boolean) => {
    setExportOptions(prev => ({ ...prev, includeBackground }));
  }, []);

  const handleExport = useCallback(() => {
    onExport(exportOptions.format, exportOptions);
  }, [exportOptions, onExport]);

  const getExportPreview = () => {
    const nodeCount = Object.keys(nodes).length;
    const totalWidth = canvasSize.width * exportOptions.scale;
    const totalHeight = canvasSize.height * exportOptions.scale;
    
    return {
      format: exportOptions.format.toUpperCase(),
      size: `${Math.round(totalWidth)} × ${Math.round(totalHeight)}`,
      quality: `${Math.round(exportOptions.quality * 100)}%`,
      elements: nodeCount,
    };
  };

  const preview = getExportPreview();

  return (
    <div className="export-panel bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Экспорт</h3>
      
      <div className="space-y-4">
        {/* Формат экспорта */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Формат
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['png', 'jpg', 'svg', 'json'].map((format) => (
              <button
                key={format}
                onClick={() => handleFormatChange(format)}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  exportOptions.format === format
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Качество */}
        {exportOptions.format !== 'svg' && exportOptions.format !== 'json' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Качество: {Math.round(exportOptions.quality * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={exportOptions.quality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* Масштаб */}
        {exportOptions.format !== 'json' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Масштаб: {exportOptions.scale}x
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={exportOptions.scale}
              onChange={(e) => handleScaleChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* Фон */}
        {exportOptions.format !== 'json' && (
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includeBackground}
                onChange={(e) => handleBackgroundChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-xs font-medium text-gray-700">
                Включить фон
              </span>
            </label>
          </div>
        )}

        {/* Предварительный просмотр */}
        <div className="bg-gray-50 border border-gray-200 rounded p-3">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Предварительный просмотр</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Формат:</span>
              <span className="font-medium">{preview.format}</span>
            </div>
            <div className="flex justify-between">
              <span>Размер:</span>
              <span className="font-medium">{preview.size}</span>
            </div>
            {exportOptions.format !== 'svg' && exportOptions.format !== 'json' && (
              <div className="flex justify-between">
                <span>Качество:</span>
                <span className="font-medium">{preview.quality}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Элементов:</span>
              <span className="font-medium">{preview.elements}</span>
            </div>
          </div>
        </div>

        {/* Кнопка экспорта */}
        <button
          onClick={handleExport}
          className="w-full px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
        >
          Экспортировать
        </button>
      </div>
    </div>
  );
}; 