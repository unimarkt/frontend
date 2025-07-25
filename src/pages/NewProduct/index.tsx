import React from "react";
import Layout from "../../components/Layout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import TextArea from "../../components/ui/TextArea";

const categories = [
  { label: "Детские игрушки", value: "toys" },
  { label: "Светильники", value: "lamp" },
  { label: "Люстры", value: "chandelier" },
];

const NewProduct: React.FC = () => {
  // TODO: заменить на useForm/useState по необходимости
  return (
    <Layout title="Создание нового продукта">
      <div className="flex flex-col md:flex-row gap-[32px]">
        {/* Левая колонка — превью/выбор шаблона */}
        <Card className="flex-1 flex flex-col items-center justify-center min-h-[400px] bg-blue-50">
          <div className="flex flex-col gap-6 items-center w-full">
            <Button className="w-full max-w-xs flex items-center justify-center gap-2 text-lg">
              <span className="text-2xl">＋</span> Создание с нуля
            </Button>
            <Button className="w-full max-w-xs flex items-center justify-center gap-2 text-lg bg-white text-primary-500 border border-primary-500 hover:bg-primary-50" style={{boxShadow:'none'}}>
              <span className="text-2xl">📄</span> Выбор шаблона
            </Button>
          </div>
        </Card>
        {/* Правая колонка — форма */}
        <Card className="flex-1">
          <div className="text-2xl font-bold mb-8">Создание нового продукта</div>
          <form className="flex flex-col gap-6">
            <Input placeholder="Введите название продукта" className="" />
            <Select options={categories} className="" />
            <TextArea placeholder="Опишите продукт" className="" />
            <Button className="mt-4">Сохранить</Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};
export default NewProduct; 