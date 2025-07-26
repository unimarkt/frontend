import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import { mockCategories } from "../../Dashboard/mockData";
import type { Product } from "../../Dashboard/mockData";

interface ProductEditFormProps {
  product: Product;
  onUpdate: (updates: Partial<Product>) => void;
}

interface ProductFormData {
  name: string;
  category: string;
  description: string;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({ 
  product, 
  onUpdate 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ProductFormData>({
    defaultValues: {
      name: product.name,
      category: product.category,
      description: product.description
    }
  });

  const selectedCategory = watch("category");

  const handleFormSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onUpdate(data);
      toast.success("Продукт обновлен успешно!");
    } catch (error) {
      toast.error("Ошибка при обновлении продукта");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExport = () => {
    // Имитация экспорта
    toast.success("Продукт экспортирован!");
    
    // Создаем dummy download
    const dataStr = JSON.stringify(product, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.name}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCategoryChange = (value: string) => {
    if (value === "new") {
      setShowNewCategory(true);
      setValue("category", "");
    } else {
      setShowNewCategory(false);
      setValue("category", value);
    }
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      setValue("category", newCategory);
      setShowNewCategory(false);
      setNewCategory("");
      toast.success(`Категория "${newCategory}" добавлена`);
    }
  };

  return (
    <Card className="h-full">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Редактирование продукта</h2>
          <p className="text-gray-600 mb-6">
            Измените информацию о продукте
          </p>
        </div>

        {/* Название */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название *
          </label>
          <Input
            {...register("name", { 
              required: "Название обязательно для заполнения",
              minLength: { value: 2, message: "Минимум 2 символа" }
            })}
            placeholder="Введите название продукта"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Категория */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Категория *
          </label>
          {!showNewCategory ? (
            <Select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              options={[
                { value: "", label: "Выберите категорию" },
                ...mockCategories.map(cat => ({ 
                  value: cat.name, 
                  label: cat.name 
                })),
                { value: "new", label: "+ Новая категория" }
              ]}
            />
          ) : (
            <div className="space-y-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Введите название новой категории"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleAddNewCategory}
                  className="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600"
                >
                  Добавить
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowNewCategory(false)}
                  className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Отмена
                </Button>
              </div>
            </div>
          )}
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Описание */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Описание
          </label>
          <TextArea
            {...register("description", {
              maxLength: { value: 500, message: "Максимум 500 символов" }
            })}
            placeholder="Опишите ваш продукт..."
            rows={4}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Кнопки */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Сохранение..." : "Сохранить"}
          </Button>
          <Button
            type="button"
            onClick={handleExport}
            className="flex-1 border border-primary-500 text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-lg transition-colors"
          >
            Экспортировать продукт
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default React.memo(ProductEditForm); 