import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import { Bell, Plus, ChevronDown, Search } from "lucide-react";

const Header: React.FC = React.memo(() => (
  <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-8 h-[76px]">
    <div className="flex items-center gap-2 w-[300px]">
      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 w-full">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          className="flex-1 border-0 bg-transparent shadow-none p-0 text-gray-700"
          placeholder="Найти"
          type="search"
          aria-label="Поиск"
        />
      </div>
    </div>
    <div className="flex items-center gap-5">
      <div className="relative">
        <Button variant="outline" size="icon" className="w-10 h-10 rounded-full">
          <Bell className="w-5 h-5" />
        </Button>
        <Badge className="absolute -top-1.5 -right-1.5 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full">
          7
        </Badge>
      </div>
      <Button variant="primary" className="flex items-center gap-2 px-4 py-2 rounded-full" to="/new-product">
        <Plus className="w-5 h-5" />
        <span>Новый товар</span>
      </Button>
      <Button variant="outline" className="flex items-center gap-2 py-1 pl-1 pr-3 bg-gray-100 rounded-full">
        <Avatar src="/user.jpg" alt="User profile" size="md" />
        <ChevronDown className="w-6 h-6" />
      </Button>
    </div>
  </header>
));

export default Header; 