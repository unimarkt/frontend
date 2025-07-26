import { useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  itemsCount: number;
  cardsCount: number;
  lastEdit: string;
  status: 'published' | 'draft' | 'archived';
  thumbnail?: string;
  description?: string;
  createdAt: Date;
  tags?: string[];
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Светильник Luna",
    category: "Освещение",
    itemsCount: 5,
    cardsCount: 10,
    lastEdit: "2024-07-01",
    status: "published",
    thumbnail: "/mock/luna.jpg",
    description: "Современный светильник для дома.",
    createdAt: new Date("2024-06-01"),
    tags: ["новинка", "хит"]
  },
  {
    id: "2",
    name: "Люстра Aurora",
    category: "Освещение",
    itemsCount: 3,
    cardsCount: 7,
    lastEdit: "2024-07-02",
    status: "draft",
    thumbnail: "/mock/aurora.jpg",
    description: "Элегантная люстра для гостиной.",
    createdAt: new Date("2024-06-05"),
    tags: ["распродажа"]
  },
  // ...добавь больше продуктов для реалистичности
];

export function useProducts(tab: string, search: string) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = mockProducts;
      if (tab === "drafts") filtered = filtered.filter(p => p.status === "draft");
      if (tab === "trash") filtered = filtered.filter(p => p.status === "archived");
      if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      setProducts(filtered);
      setLoading(false);
    }, 600);
  }, [tab, search]);

  return { products, loading };
} 