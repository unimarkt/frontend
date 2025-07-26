import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import { AvatarIcon } from "../../assets/icons";

const Header: React.FC = React.memo(() => (
  <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-8 h-[76px]">
    <div className="flex items-center gap-2 w-[300px]">
      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 w-full">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
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
        <Button className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 19.5a2.5 2.5 0 01-2.5-2.5V7a2.5 2.5 0 012.5-2.5h15a2.5 2.5 0 012.5 2.5v10a2.5 2.5 0 01-2.5 2.5h-15z" />
          </svg>
        </Button>
        <Badge className="absolute -top-1.5 -right-1.5 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full">
          7
        </Badge>
      </div>
      <Button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500 text-white hover:bg-primary-600">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Новый товар</span>
      </Button>
      <Button className="flex items-center gap-2 py-1 pl-1 pr-3 bg-gray-100 rounded-full border border-gray-300 hover:bg-gray-200">
        <AvatarIcon width={32} height={32} />
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
    </div>
  </header>
));

export default Header; 