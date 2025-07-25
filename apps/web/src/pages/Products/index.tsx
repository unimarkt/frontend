import React, { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const tabs = [
  { label: "Все продукты", value: "all" },
  { label: "Черновики", value: "drafts" },
  { label: "Корзина", value: "trash" },
];

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: "Светильник",
  items: 5,
  cards: 10,
}));

const Products: React.FC = () => {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <Layout title="Каталог продуктов">
      <div className="flex flex-col gap-8">
        {/* Табы и действия */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Button className="h-[48px] px-6 text-base">+ Новый продукт</Button>
          <div className="flex gap-2 flex-1">
            {tabs.map(t => (
              <button
                key={t.value}
                className={`h-[48px] px-6 rounded-[12px] text-base font-medium transition border-none ${tab === t.value ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500"}`}
                onClick={() => setTab(t.value)}
              >
                {t.label}
                {t.value === "all" && <span className="ml-2 bg-white text-primary-500 rounded-full px-2 py-0.5 text-xs">23</span>}
                {t.value === "drafts" && <span className="ml-2 bg-white text-primary-500 rounded-full px-2 py-0.5 text-xs">4</span>}
              </button>
            ))}
          </div>
          <Input
            placeholder="Найти продукт..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
        {/* Сетка продуктов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <Card key={p.id} className="flex flex-col items-start gap-4 cursor-pointer hover:bg-primary-50 transition">
              <div className="w-full h-48 bg-gradient-to-b from-gray-100 to-gray-300 rounded-[16px] mb-2" />
              <div className="font-bold text-lg">{p.name}</div>
              <div className="text-sm text-gray-500">{p.items} товаров • {p.cards} карточек</div>
              <Button className="mt-auto h-[40px] px-4 text-sm">Редактировать</Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Products; 