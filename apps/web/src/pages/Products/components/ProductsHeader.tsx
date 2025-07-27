import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Plus } from "lucide-react";

interface ProductsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ 
  search, 
  onSearchChange 
}) => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate("/products/new");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex-1 max-w-md">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск продуктов..."
          className="w-full"
        />
      </div>
      <Button
        onClick={handleCreateProduct}
        className="flex items-center gap-2 bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-colors"
      >
        <Plus size={16} />
        Новый продукт
      </Button>
    </div>
  );
};

export default React.memo(ProductsHeader); 