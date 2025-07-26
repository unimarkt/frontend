import React from "react";
const LoadingGrid: React.FC = () => (
  <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 px-2 md:px-0">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl shadow-lg animate-pulse min-h-[260px] flex flex-col"
      >
        <div className="w-full aspect-[4/3] bg-gray-100 rounded-t-2xl" />
        <div className="flex-1 p-5 flex flex-col gap-2">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);
export default LoadingGrid; 