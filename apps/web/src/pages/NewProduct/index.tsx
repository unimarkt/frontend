import React from "react";
import Layout from "../../components/Layout";
import TemplatePreview from "./components/TemplatePreview";
import ProductInfoForm from "./components/ProductInfoForm";

const NewProductPage: React.FC = () => {
  return (
    <Layout
      title="Новый продукт"
      subtitle="Создайте новый продукт для вашего магазина"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
        {/* Левая панель - Превью шаблона */}
        <div className="h-full">
          <TemplatePreview />
        </div>
        
        {/* Правая панель - Форма информации */}
        <div className="h-full">
          <ProductInfoForm />
        </div>
      </div>
    </Layout>
  );
};

export default NewProductPage; 