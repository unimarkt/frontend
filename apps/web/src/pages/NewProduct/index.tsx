import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "../../components/ui/TextField";
import { Select } from "../../components/ui/Select";
import { TextArea } from "../../components/ui/TextArea";
import { FileUpload } from "../../components/ui/FileUpload";
import Button from "../../components/ui/Button";

interface FormValues {
  name: string;
  category: string;
  description: string;
  cover: File | null;
}

const categories = [
  { label: "Светильники", value: "lamp" },
  { label: "Люстры", value: "chandelier" },
];

const NewProductPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      cover: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    // TODO: handle form submit
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form
      className="max-w-xl mx-auto p-4 flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Создание нового продукта"
    >
      {/* Основная информация */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Основная информация</h2>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Название обязательно" }}
          render={({ field }) => (
            <TextField
              label="Название"
              required
              error={errors.name?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          rules={{ required: "Категория обязательна" }}
          render={({ field }) => (
            <Select
              label="Категория"
              options={categories}
              placeholder="Выберите категорию"
              error={errors.category?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              label="Описание"
              placeholder="Введите описание"
              rows={4}
              {...field}
            />
          )}
        />
        <Controller
          name="cover"
          control={control}
          render={({ field }) => (
            <FileUpload
              onFileChange={file => setValue("cover", file)}
            />
          )}
        />
      </div>

      {/* Компоненты и варианты */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Компоненты и варианты</h2>
        <div className="text-gray-400">Заглушка: здесь будет редактор компонентов и вариантов</div>
      </div>

      {/* Стили продукта */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Стили продукта</h2>
        <div className="text-gray-400">Заглушка: здесь будет редактор стилей</div>
      </div>

      {/* Действия */}
      <div className="flex gap-2 flex-wrap">
        <Button type="submit">Сохранить</Button>
        <Button type="button" disabled>Создать товары</Button>
      </div>
    </form>
  );
};

export default NewProductPage;

/**
 * Пример использования:
 * <NewProductPage />
 */ 