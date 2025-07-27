import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Construction, Home, Package, ArrowLeft } from "lucide-react";

interface InDevelopmentProps {
  pageName: string;
  expectedDate?: string;
  features?: string[];
  showBackButton?: boolean;
}

const InDevelopment: React.FC<InDevelopmentProps> = ({ 
  pageName, 
  expectedDate = "Скоро", 
  features = [],
  showBackButton = true
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => navigate('/');
  const handleGoProducts = () => navigate('/products');
  const handleGoBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        {/* Иконка */}
        <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Construction className="w-10 h-10 text-primary-600" />
        </div>

        {/* Заголовок */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {pageName}
        </h1>

        {/* Описание */}
        <p className="text-gray-600 mb-6">
          Страница находится в активной разработке
        </p>

        {/* Планируемый функционал */}
        {features.length > 0 && (
          <div className="mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">
              Планируемый функционал:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Кнопки навигации */}
        <div className="space-y-3">
          {showBackButton && (
            <Button
              onClick={handleGoBack}
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleGoHome}
              className="flex-1"
              variant="outline"
            >
              <Home className="w-4 h-4 mr-2" />
              Главная
            </Button>
            
            <Button
              onClick={handleGoProducts}
              className="flex-1"
            >
              <Package className="w-4 h-4 mr-2" />
              Продукты
            </Button>
          </div>
        </div>

        {/* Дата релиза */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Ожидаемая дата: {expectedDate}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default InDevelopment; 