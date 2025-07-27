import React, { useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as fabric from "fabric";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import TextArea from "../../components/ui/TextArea";
import { 
  Save, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  Layers,
  Settings,
  Download,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Move,
  Type,
  Image as ImageIcon,
  Square,
  Circle,
  Triangle
} from "lucide-react";
import type { EditorState, CanvasElement, ElementType } from "../../types/design";

interface ProductEditorProps {
  productId?: string;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ productId }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  
  const [editorState, setEditorState] = useState<EditorState>({
    canvas: {
      id: "canvas-1",
      elements: [],
      background: { type: "color", value: "#ffffff" },
      dimensions: { width: 800, height: 600 }
    },
    selectedElements: [],
    history: { past: [], future: [], maxSteps: 50 },
    zoom: 1,
    pan: { x: 0, y: 0 },
    mode: "select"
  });

  const [activePanel, setActivePanel] = useState<"layers" | "properties">("layers");
  const [showGrid, setShowGrid] = useState(true);
  const [showRulers, setShowRulers] = useState(true);

  // Инициализация Fabric.js canvas
  const initCanvas = useCallback(() => {
    if (!canvasRef.current) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: editorState.canvas.dimensions.width,
      height: editorState.canvas.dimensions.height,
      backgroundColor: editorState.canvas.background.value,
      selection: true,
      preserveObjectStacking: true
    });

    // Настройка событий canvas
    fabricCanvasRef.current.on("selection:created", handleSelectionChange);
    fabricCanvasRef.current.on("selection:updated", handleSelectionChange);
    fabricCanvasRef.current.on("selection:cleared", handleSelectionChange);
    fabricCanvasRef.current.on("object:modified", handleObjectModified);
    fabricCanvasRef.current.on("object:added", handleObjectAdded);
    fabricCanvasRef.current.on("object:removed", handleObjectRemoved);

    // Добавление сетки
    if (showGrid) {
      addGrid();
    }
  }, [editorState.canvas.dimensions, editorState.canvas.background, showGrid]);

  // Обработчики событий canvas
  const handleSelectionChange = useCallback(() => {
    if (!fabricCanvasRef.current) return;

    const activeObjects = fabricCanvasRef.current.getActiveObjects();
    const selectedIds = activeObjects.map(obj => obj.data?.id || "");
    
    setEditorState(prev => ({
      ...prev,
      selectedElements: selectedIds
    }));
  }, []);

  const handleObjectModified = useCallback(() => {
    saveToHistory();
  }, []);

  const handleObjectAdded = useCallback(() => {
    saveToHistory();
  }, []);

  const handleObjectRemoved = useCallback(() => {
    saveToHistory();
  }, []);

  // История изменений
  const saveToHistory = useCallback(() => {
    if (!fabricCanvasRef.current) return;

    const canvasState = fabricCanvasRef.current.toJSON();
    setEditorState(prev => ({
      ...prev,
      history: {
        ...prev.history,
        past: [...prev.history.past, canvasState],
        future: []
      }
    }));
  }, []);

  const undo = useCallback(() => {
    if (!fabricCanvasRef.current || editorState.history.past.length === 0) return;

    const currentState = fabricCanvasRef.current.toJSON();
    const previousState = editorState.history.past[editorState.history.past.length - 1];
    
    fabricCanvasRef.current.loadFromJSON(previousState, () => {
      fabricCanvasRef.current?.renderAll();
    });

    setEditorState(prev => ({
      ...prev,
      history: {
        past: prev.history.past.slice(0, -1),
        future: [currentState, ...prev.history.future]
      }
    }));
  }, [editorState.history.past]);

  const redo = useCallback(() => {
    if (!fabricCanvasRef.current || editorState.history.future.length === 0) return;

    const currentState = fabricCanvasRef.current.toJSON();
    const nextState = editorState.history.future[0];
    
    fabricCanvasRef.current.loadFromJSON(nextState, () => {
      fabricCanvasRef.current?.renderAll();
    });

    setEditorState(prev => ({
      ...prev,
      history: {
        past: [...prev.history.past, currentState],
        future: prev.history.future.slice(1)
      }
    }));
  }, [editorState.history.future]);

  // Инструменты
  const addText = useCallback(() => {
    if (!fabricCanvasRef.current) return;

    const text = new fabric.IText("Текст", {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "#000000",
      fontFamily: "Arial"
    });

    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
  }, []);

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !fabricCanvasRef.current) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        fabric.Image.fromURL(event.target?.result as string, (img) => {
          img.scaleToWidth(200);
          fabricCanvasRef.current?.add(img);
          fabricCanvasRef.current?.setActiveObject(img);
          fabricCanvasRef.current?.renderAll();
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, []);

  const addShape = useCallback((shapeType: "rect" | "circle" | "triangle") => {
    if (!fabricCanvasRef.current) return;

    let shape: fabric.Object;

    switch (shapeType) {
      case "rect":
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: "#ff0000"
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: "#00ff00"
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: "#0000ff"
        });
        break;
      default:
        return;
    }

    fabricCanvasRef.current.add(shape);
    fabricCanvasRef.current.setActiveObject(shape);
    fabricCanvasRef.current.renderAll();
  }, []);

  // Масштабирование
  const zoomIn = useCallback(() => {
    if (!fabricCanvasRef.current) return;
    const zoom = fabricCanvasRef.current.getZoom();
    fabricCanvasRef.current.setZoom(Math.min(zoom * 1.1, 5));
    setEditorState(prev => ({ ...prev, zoom: fabricCanvasRef.current!.getZoom() }));
  }, []);

  const zoomOut = useCallback(() => {
    if (!fabricCanvasRef.current) return;
    const zoom = fabricCanvasRef.current.getZoom();
    fabricCanvasRef.current.setZoom(Math.max(zoom / 1.1, 0.1));
    setEditorState(prev => ({ ...prev, zoom: fabricCanvasRef.current!.getZoom() }));
  }, []);

  // Сетка
  const addGrid = useCallback(() => {
    if (!fabricCanvasRef.current) return;

    const gridSize = 20;
    const width = fabricCanvasRef.current.width || 800;
    const height = fabricCanvasRef.current.height || 600;

    for (let i = 0; i <= width; i += gridSize) {
      const line = new fabric.Line([i, 0, i, height], {
        stroke: "#e5e7eb",
        selectable: false,
        evented: false
      });
      fabricCanvasRef.current.add(line);
    }

    for (let i = 0; i <= height; i += gridSize) {
      const line = new fabric.Line([0, i, width, i], {
        stroke: "#e5e7eb",
        selectable: false,
        evented: false
      });
      fabricCanvasRef.current.add(line);
    }
  }, []);

  // Сохранение
  const handleSave = useCallback(async () => {
    if (!fabricCanvasRef.current) return;

    try {
      const canvasData = fabricCanvasRef.current.toJSON();
      console.log("Сохранение canvas:", canvasData);
      
      toast.success("Проект сохранен!");
    } catch (error) {
      toast.error("Ошибка при сохранении");
      console.error("Save error:", error);
    }
  }, []);

  // Экспорт
  const handleExport = useCallback(() => {
    if (!fabricCanvasRef.current) return;

    const dataURL = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1
    });

    const link = document.createElement("a");
    link.download = `product-${id || "new"}.png`;
    link.href = dataURL;
    link.click();
  }, [id]);

  // Инициализация при монтировании
  React.useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  return (
    <Layout
      title="Редактор продукта"
      subtitle="Создайте потрясающую карточку товара"
      hideSidebar={true}
    >
      <div className="flex h-screen bg-gray-100">
        {/* Левая панель - Инструменты */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Инструменты</h3>
            
            {/* Основные инструменты */}
            <div className="space-y-2">
              <Button
                onClick={() => setEditorState(prev => ({ ...prev, mode: "select" }))}
                variant={editorState.mode === "select" ? "default" : "outline"}
                className="w-full justify-start"
                size="sm"
              >
                <Move className="w-4 h-4 mr-2" />
                Выделение
              </Button>
              
              <Button
                onClick={addText}
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Type className="w-4 h-4 mr-2" />
                Текст
              </Button>
              
              <Button
                onClick={addImage}
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Изображение
              </Button>
            </div>

            {/* Фигуры */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Фигуры</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => addShape("rect")}
                  variant="outline"
                  size="sm"
                  className="p-2"
                >
                  <Square className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => addShape("circle")}
                  variant="outline"
                  size="sm"
                  className="p-2"
                >
                  <Circle className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => addShape("triangle")}
                  variant="outline"
                  size="sm"
                  className="p-2"
                >
                  <Triangle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Панель слоев/свойств */}
          <div className="flex-1 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActivePanel("layers")}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  activePanel === "layers"
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Layers className="w-4 h-4 mr-2" />
                Слои
              </button>
              <button
                onClick={() => setActivePanel("properties")}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  activePanel === "properties"
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Свойства
              </button>
            </div>

            <div className="p-4">
              {activePanel === "layers" ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Слои будут здесь</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Свойства будут здесь</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Центральная область - Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                onClick={undo}
                disabled={editorState.history.past.length === 0}
                variant="outline"
                size="sm"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                onClick={redo}
                disabled={editorState.history.future.length === 0}
                variant="outline"
                size="sm"
              >
                <Redo className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={zoomOut}
                variant="outline"
                size="sm"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600">
                {Math.round(editorState.zoom * 100)}%
              </span>
              <Button
                onClick={zoomIn}
                variant="outline"
                size="sm"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={handleSave}
                className="flex items-center gap-2"
                size="sm"
              >
                <Save className="w-4 h-4" />
                Сохранить
              </Button>
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Canvas область */}
          <div className="flex-1 flex items-center justify-center bg-gray-100 overflow-auto">
            <div className="bg-white shadow-lg">
              <canvas
                ref={canvasRef}
                className="border border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductEditor; 