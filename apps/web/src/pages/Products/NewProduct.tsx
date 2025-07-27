import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import TextArea from "../../components/ui/TextArea";
import FileUpload from "../../components/ui/FileUpload";
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Image as ImageIcon,
  Package,
  Tag,
  DollarSign,
  Globe,
  AlertCircle
} from "lucide-react";
import type { Product, ProductCategory, Marketplace } from "../../types/design";

// Схема валидации на основе анализа дизайна
const productSchema = z.object({
  name: z.string()
    .min(3, "Название должно содержать минимум 3 символа")
    .max(100, "Название не должно превышать 100 символов"),
  description: z.string()
    .min(10, "Описание должно содержать минимум 10 символов")
    .max(500, "Описание не должно превышать 500 символов"),
  category: z.enum([
    'electronics', 'clothing', 'home-garden', 'sports', 
    'books', 'beauty', 'automotive', 'toys', 'food', 'other'
  ] as const),
  price: z.number()
    .min(0, "Цена не может быть отрицательной")
    .max(999999, "Цена не может превышать 999,999"),
  currency: z.enum(['RUB', 'USD', 'EUR'] as const),
  marketplace: z.enum([
    'wildberries', 'ozon', 'yandex-market', 
    'avito', 'aliexpress', 'amazon', 'other'
  ] as const),
  tags: z.array(z.string()).max(10, "Максимум 10 тегов"),
  images: z.array(z.object({
    file: z.instanceof(File),
    preview: z.string()
  })).min(1, "Загрузите хотя бы одно изображение")
});

type ProductFormData = z.infer<typeof productSchema>;

const categoryOptions = [
  { value: 'electronics', label: 'Электроника' },
  { value: 'clothing', label: 'Одежда' },
  { value: 'home-garden', label: 'Дом и сад' },
  { value: 'sports', label: 'Спорт' },
  { value: 'books', label: 'Книги' },
  { value: 'beauty', label: 'Красота' },
  { value: 'automotive', label: 'Авто' },
  { value: 'toys', label: 'Игрушки' },
  { value: 'food', label: 'Продукты' },
  { value: 'other', label: 'Другое' }
];

const marketplaceOptions = [
  { value: 'wildberries', label: 'Wildberries' },
  { value: 'ozon', label: 'Ozon' },
  { value: 'yandex-market', label: 'Яндекс.Маркет' },
  { value: 'avito', label: 'Avito' },
  { value: 'aliexpress', label: 'AliExpress' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'other', label: 'Другое' }
];

const currencyOptions = [
  { value: 'RUB', label: 'Рубль (₽)' },
  { value: 'USD', label: 'Доллар ($)' },
  { value: 'EUR', label: 'Евро (€)' }
];

const NewProduct: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{ file: File; preview: string }>>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      category: "electronics",
      price: 0,
      currency: "RUB",
      marketplace: "wildberries",
      tags: [],
      images: []
    }
  });

  const watchedCategory = watch("category");
  const watchedPrice = watch("price");

  // Обработка загрузки изображений
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setUploadedImages(prev => [...prev, ...newImages]);
    setValue("images", [...uploadedImages, ...newImages]);
  };

  // Удаление изображения
  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setValue("images", newImages);
  };

  // Обработка тегов
  const handleAddTag = (tag: string) => {
    const currentTags = watch("tags");
    if (!currentTags.includes(tag) && currentTags.length < 10) {
      setValue("tags", [...currentTags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = watch("tags");
    setValue("tags", currentTags.filter(tag => tag !== tagToRemove));
  };

  // Отправка формы
  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'lastEdit' | 'items' | 'cards' | 'status'> = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        currency: data.currency,
        marketplace: data.marketplace,
        images: data.images.map((img, index) => ({
          id: `img-${Date.now()}-${index}`,
          url: img.preview,
          alt: data.name,
          isPrimary: index === 0,
          width: 800,
          height: 600
        })),
        tags: data.tags
      };

      console.log("Создан новый продукт:", newProduct);
      
      toast.success("Продукт успешно создан!");
      navigate("/products");
    } catch (error) {
      toast.error("Ошибка при создании продукта");
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <Layout
      title="Новый продукт"
      subtitle="Создайте новый продукт для маркетплейса"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Навигация */}
        <div className="flex items-center gap-4">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к продуктам
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Основная информация */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Основная информация
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Название */}
              <div className="md:col-span-2">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Название продукта *
                      </label>
                      <Input
                        {...field}
                        placeholder="Введите название продукта"
                        error={errors.name?.message}
                      />
                    </div>
                  )}
                />
              </div>

              {/* Описание */}
              <div className="md:col-span-2">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Описание *
                      </label>
                      <TextArea
                        {...field}
                        placeholder="Опишите ваш продукт..."
                        rows={4}
                        error={errors.description?.message}
                      />
                    </div>
                  )}
                />
              </div>

              {/* Категория и Маркетплейс */}
              <div>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Категория *
                      </label>
                      <Select
                        {...field}
                        options={categoryOptions}
                        placeholder="Выберите категорию"
                        error={errors.category?.message}
                      />
                    </div>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="marketplace"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Маркетплейс *
                      </label>
                      <Select
                        {...field}
                        options={marketplaceOptions}
                        placeholder="Выберите маркетплейс"
                        error={errors.marketplace?.message}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Цена и валюта */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Цена и валюта
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Цена *
                      </label>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        error={errors.price?.message}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Валюта *
                      </label>
                      <Select
                        {...field}
                        options={currencyOptions}
                        placeholder="Выберите валюту"
                        error={errors.currency?.message}
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Предварительный просмотр цены */}
            {watchedPrice > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Предварительный просмотр:{" "}
                  <span className="font-semibold">
                    {watchedPrice.toLocaleString()} {watch("currency")}
                  </span>
                </p>
              </div>
            )}
          </Card>

          {/* Изображения */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Изображения продукта
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Загрузите изображения *
                </label>
                <FileUpload
                  onUpload={handleImageUpload}
                  accept="image/*"
                  multiple
                  maxFiles={10}
                  error={errors.images?.message}
                />
              </div>

              {/* Предварительный просмотр изображений */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                          Главное
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Теги */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Теги
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Добавить тег
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Введите тег"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          handleAddTag(input.value.trim());
                          input.value = '';
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Введите тег"]') as HTMLInputElement;
                      if (input?.value.trim()) {
                        handleAddTag(input.value.trim());
                        input.value = '';
                      }
                    }}
                  >
                    Добавить
                  </Button>
                </div>
              </div>

              {/* Отображение тегов */}
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <div>
                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 text-primary-600 hover:text-primary-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </Card>

          {/* Кнопки действий */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? "Создание..." : "Создать продукт"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewProduct; 