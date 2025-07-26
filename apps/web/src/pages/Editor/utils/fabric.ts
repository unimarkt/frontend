import type { Layer, TextLayer, ImageLayer, ShapeLayer } from '../types/editor.types';

// Глобальная переменная для Fabric.js
declare global {
  interface Window {
    fabric: any;
  }
}

// Инициализация Fabric.js
export const initFabric = async (): Promise<any> => {
  try {
    // Динамический импорт Fabric.js
    const fabricModule = await import('fabric');
    return fabricModule.default;
  } catch (error) {
    console.error('Failed to load Fabric.js:', error);
    throw new Error('Не удалось загрузить Fabric.js');
  }
};

// Создание текстового объекта
export const createTextObject = (layer: TextLayer, fabric: any): any => {
  try {
    const textObject = new fabric.Text(layer.text, {
      left: layer.x,
      top: layer.y,
      fontSize: layer.fontSize,
      fontFamily: layer.fontFamily,
      fontWeight: layer.fontWeight,
      fill: layer.fontColor,
      textAlign: layer.textAlign,
      opacity: layer.opacity,
      selectable: !layer.locked,
      evented: !layer.locked,
      visible: layer.visible,
      angle: layer.rotation,
      width: layer.width,
      height: layer.height,
      lineHeight: layer.lineHeight,
      charSpacing: layer.letterSpacing,
    });

    // Устанавливаем ID для связи с нашим слоем
    textObject.layerId = layer.id;
    
    return textObject;
  } catch (error) {
    console.error('Error creating text object:', error);
    throw new Error('Ошибка создания текстового объекта');
  }
};

// Создание изображения
export const createImageObject = async (layer: ImageLayer, fabric: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      fabric.Image.fromURL(layer.src, (img: any) => {
        try {
          img.set({
            left: layer.x,
            top: layer.y,
            opacity: layer.opacity,
            selectable: !layer.locked,
            evented: !layer.locked,
            visible: layer.visible,
            angle: layer.rotation,
            width: layer.width,
            height: layer.height,
          });

          // Применяем фильтры
          applyImageFilters(img, layer);

          // Устанавливаем ID
          img.layerId = layer.id;
          
          resolve(img);
        } catch (error) {
          reject(new Error('Ошибка настройки изображения'));
        }
      }, { crossOrigin: 'anonymous' });
    } catch (error) {
      reject(new Error('Ошибка загрузки изображения'));
    }
  });
};

// Применение фильтров к изображению
export const applyImageFilters = (imageObject: any, layer: ImageLayer): void => {
  try {
    const filters: any[] = [];

    // Яркость
    if (layer.brightness !== 0) {
      filters.push(new window.fabric.Image.filters.Brightness({
        brightness: layer.brightness / 100
      }));
    }

    // Контрастность
    if (layer.contrast !== 0) {
      filters.push(new window.fabric.Image.filters.Contrast({
        contrast: layer.contrast / 100
      }));
    }

    // Насыщенность
    if (layer.saturation !== 0) {
      filters.push(new window.fabric.Image.filters.Saturation({
        saturation: layer.saturation / 100
      }));
    }

    // Размытие
    if (layer.blur > 0) {
      filters.push(new window.fabric.Image.filters.Blur({
        blur: layer.blur / 10
      }));
    }

    // Черно-белый
    if (layer.filters.grayscale) {
      filters.push(new window.fabric.Image.filters.Grayscale());
    }

    // Сепия
    if (layer.filters.sepia) {
      filters.push(new window.fabric.Image.filters.Sepia());
    }

    imageObject.filters = filters;
    imageObject.applyFilters();
  } catch (error) {
    console.error('Error applying filters:', error);
  }
};

// Создание фигуры
export const createShapeObject = (layer: ShapeLayer, fabric: any): any => {
  try {
    let shapeObject: any;

    switch (layer.shapeType) {
      case 'rectangle':
        shapeObject = new fabric.Rect({
          left: layer.x,
          top: layer.y,
          width: layer.width,
          height: layer.height,
          fill: layer.fillColor,
          stroke: layer.strokeColor,
          strokeWidth: layer.strokeWidth,
          opacity: layer.opacity,
          selectable: !layer.locked,
          evented: !layer.locked,
          visible: layer.visible,
          angle: layer.rotation,
        });
        break;

      case 'circle':
        shapeObject = new fabric.Circle({
          left: layer.x,
          top: layer.y,
          radius: Math.min(layer.width, layer.height) / 2,
          fill: layer.fillColor,
          stroke: layer.strokeColor,
          strokeWidth: layer.strokeWidth,
          opacity: layer.opacity,
          selectable: !layer.locked,
          evented: !layer.locked,
          visible: layer.visible,
          angle: layer.rotation,
        });
        break;

      case 'triangle':
        shapeObject = new fabric.Triangle({
          left: layer.x,
          top: layer.y,
          width: layer.width,
          height: layer.height,
          fill: layer.fillColor,
          stroke: layer.strokeColor,
          strokeWidth: layer.strokeWidth,
          opacity: layer.opacity,
          selectable: !layer.locked,
          evented: !layer.locked,
          visible: layer.visible,
          angle: layer.rotation,
        });
        break;

      default:
        throw new Error('Неподдерживаемый тип фигуры');
    }

    shapeObject.layerId = layer.id;
    return shapeObject;
  } catch (error) {
    console.error('Error creating shape object:', error);
    throw new Error('Ошибка создания фигуры');
  }
};

// Создание объекта из слоя
export const createObjectFromLayer = async (layer: Layer, fabric: any): Promise<any> => {
  try {
    switch (layer.type) {
      case 'text':
        return createTextObject(layer, fabric);
      case 'image':
        return await createImageObject(layer, fabric);
      case 'shape':
        return createShapeObject(layer, fabric);
      default:
        throw new Error('Неподдерживаемый тип слоя');
    }
  } catch (error) {
    console.error('Error creating object from layer:', error);
    throw error;
  }
};

// Обновление объекта из слоя
export const updateObjectFromLayer = (object: any, layer: Layer, fabric: any): void => {
  try {
    // Общие свойства
    object.set({
      left: layer.x,
      top: layer.y,
      opacity: layer.opacity,
      selectable: !layer.locked,
      evented: !layer.locked,
      visible: layer.visible,
      angle: layer.rotation,
    });

    // Специфичные для типа свойства
    switch (layer.type) {
      case 'text':
        object.set({
          text: layer.text,
          fontSize: layer.fontSize,
          fontFamily: layer.fontFamily,
          fontWeight: layer.fontWeight,
          fill: layer.fontColor,
          textAlign: layer.textAlign,
          lineHeight: layer.lineHeight,
          charSpacing: layer.letterSpacing,
        });
        break;

      case 'image':
        object.set({
          width: layer.width,
          height: layer.height,
        });
        applyImageFilters(object, layer);
        break;

      case 'shape':
        if (layer.shapeType === 'circle') {
          object.set({
            radius: Math.min(layer.width, layer.height) / 2,
            fill: layer.fillColor,
            stroke: layer.strokeColor,
            strokeWidth: layer.strokeWidth,
          });
        } else {
          object.set({
            width: layer.width,
            height: layer.height,
            fill: layer.fillColor,
            stroke: layer.strokeColor,
            strokeWidth: layer.strokeWidth,
          });
        }
        break;
    }

    object.canvas?.renderAll();
  } catch (error) {
    console.error('Error updating object from layer:', error);
  }
};

// Получение слоя из объекта
export const getLayerFromObject = (object: any): Partial<Layer> => {
  try {
    const baseLayer = {
      id: object.layerId,
      x: object.left || 0,
      y: object.top || 0,
      width: object.width || 0,
      height: object.height || 0,
      rotation: object.angle || 0,
      opacity: object.opacity || 1,
      visible: object.visible !== false,
      locked: !object.selectable,
      zIndex: object.zIndex || 0,
    };

    if (object.type === 'text') {
      return {
        ...baseLayer,
        type: 'text' as const,
        text: object.text || '',
        fontSize: object.fontSize || 16,
        fontFamily: object.fontFamily || 'Arial',
        fontWeight: object.fontWeight || 'normal',
        fontColor: object.fill || '#000000',
        textAlign: object.textAlign || 'left',
        lineHeight: object.lineHeight || 1.2,
        letterSpacing: object.charSpacing || 0,
      };
    }

    if (object.type === 'image') {
      return {
        ...baseLayer,
        type: 'image' as const,
        src: object.src || '',
        brightness: 0,
        contrast: 0,
        saturation: 0,
        blur: 0,
        filters: {
          grayscale: false,
          sepia: false,
        },
      };
    }

    return baseLayer;
  } catch (error) {
    console.error('Error getting layer from object:', error);
    return {};
  }
};

// Оптимизация производительности
export const optimizeCanvas = (canvas: any): void => {
  try {
    // Отключаем рендеринг во время массовых операций
    canvas.renderOnAddRemove = false;
    
    // Устанавливаем оптимальные настройки
    canvas.selection = true;
    canvas.preserveObjectStacking = true;
    
    // Оптимизация для больших холстов
    if (canvas.width > 2000 || canvas.height > 2000) {
      canvas.enableRetinaScaling = false;
    }
  } catch (error) {
    console.error('Error optimizing canvas:', error);
  }
};

// Очистка ресурсов
export const cleanupCanvas = (canvas: any): void => {
  try {
    if (canvas) {
      canvas.dispose();
    }
  } catch (error) {
    console.error('Error cleaning up canvas:', error);
  }
}; 