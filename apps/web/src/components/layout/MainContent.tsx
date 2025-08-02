import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 p-6 ml-24 mt-16">
        {children}
      </main>
    </div>
  );
};

export default MainContent; 