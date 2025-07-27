import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  NewProductIcon, 
  NewTemplateIcon, 
  NewStyleIcon, 
  ImportImageIcon, 
  TemplateGalleryIcon 
} from "../assets/icons";

const Banner: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <NewProductIcon className="w-8 h-8" />,
      label: "Новый продукт",
      onClick: () => navigate("/products/new")
    },
    {
      icon: <NewTemplateIcon className="w-8 h-8" />,
      label: "Новый шаблон",
      onClick: () => navigate("/templates")
    },
    {
      icon: <NewStyleIcon className="w-8 h-8" />,
      label: "Новый стиль",
      onClick: () => navigate("/styles")
    },
    {
      icon: <ImportImageIcon className="w-8 h-8" />,
      label: "Импортировать изображение",
      onClick: () => navigate("/constructor")
    },
    {
      icon: <TemplateGalleryIcon className="w-8 h-8" />,
      label: "Галерея шаблонов",
      onClick: () => navigate("/templates")
    }
  ];

  return (
    <div className="bg-primary-500 rounded-3xl p-8 mb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Сделай новый дизайн!
        </h1>
      </div>
      
      <div className="flex justify-center items-start gap-8">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-16 h-16 bg-white rounded-full border border-gray-300 flex items-center justify-center group-hover:shadow-lg group-hover:border-gray-400 transition-all duration-200">
              <div className="text-black group-hover:scale-110 transition-transform duration-200">
                {action.icon}
              </div>
            </div>
            <div className="text-center h-12 flex flex-col justify-start">
              {action.label.includes(" ") ? (
                <div className="text-white text-sm font-medium leading-tight group-hover:text-white/90 transition-colors">
                  {action.label.split(" ").map((word, i) => (
                    <div key={i} className="leading-tight">{word}</div>
                  ))}
                </div>
              ) : (
                <div className="text-white text-sm font-medium group-hover:text-white/90 transition-colors">
                  {action.label}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Banner; 