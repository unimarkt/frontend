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
      icon: <NewProductIcon className="w-6 h-6" />,
      label: "Новый продукт",
      onClick: () => navigate("/products/new")
    },
    {
      icon: <NewTemplateIcon className="w-6 h-6" />,
      label: "Новый шаблон",
      onClick: () => navigate("/templates")
    },
    {
      icon: <NewStyleIcon className="w-6 h-6" />,
      label: "Новый стиль",
      onClick: () => navigate("/styles")
    },
    {
      icon: <ImportImageIcon className="w-6 h-6" />,
      label: "Импортировать изображение",
      onClick: () => navigate("/constructor")
    },
    {
      icon: <TemplateGalleryIcon className="w-6 h-6" />,
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
      
      <div className="flex justify-center items-start gap-6">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex flex-col items-center gap-3 group w-[72px]"
          >
            <div className="w-[50px] h-[50px] bg-[#71a2ff] group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-200">
              <div className="text-white group-hover:text-black transition-colors duration-200">
                {action.icon}
              </div>
            </div>
            <div className="text-center min-h-[48px] flex flex-col justify-start">
              {action.label.includes(" ") ? (
                <div className="text-white text-xs font-semibold leading-tight group-hover:text-white/90 transition-colors">
                  {action.label.split(" ").map((word, i) => (
                    <div key={i} className="leading-tight">{word}</div>
                  ))}
                </div>
              ) : (
                <div className="text-white text-xs font-semibold group-hover:text-white/90 transition-colors">
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