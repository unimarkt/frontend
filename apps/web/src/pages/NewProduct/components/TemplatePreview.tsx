import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const TemplatePreview: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateFromScratch = () => {
    navigate("/constructor/new-template");
  };

  const handleChooseTemplate = () => {
    navigate("/constructor/templates");
  };

  const handleCreateCard = () => {
    navigate("/editor/new");
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Создание продукта</h2>
        <p className="text-gray-600 mb-6">
          Выберите способ создания нового продукта
        </p>
        
        {/* Превью карточка */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 mb-6">
          <div className="w-full h-48 bg-white rounded-xl shadow-sm mb-4 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-sm text-gray-600">Превью продукта</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Здесь будет отображаться предварительный просмотр вашего продукта
          </p>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="space-y-3">
        <Button 
          onClick={handleCreateFromScratch}
          className="w-full bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-colors"
        >
          Создать с нуля
        </Button>
        <Button 
          onClick={handleCreateCard}
          className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
        >
          Создать карточку
        </Button>
        <Button 
          onClick={handleChooseTemplate}
          className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
        >
          Выбрать шаблон
        </Button>
      </div>
    </Card>
  );
};

export default React.memo(TemplatePreview); 