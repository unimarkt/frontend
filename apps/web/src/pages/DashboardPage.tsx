import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const MainContent = lazy(() => import("../components/layout/MainContent"));

const DashboardPage: React.FC = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<div className="p-8 text-center">Загрузка...</div>}>
          <MainContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  </div>
);

export default React.memo(DashboardPage); 