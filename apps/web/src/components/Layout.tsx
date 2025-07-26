import React from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

export interface BreadcrumbItem { label: string; to: string }
export interface LayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  hideSidebar?: boolean;
}
const Layout: React.FC<LayoutProps> = ({ title, subtitle, children, actions, breadcrumbs, hideSidebar = false }) => (
  <div className="flex min-h-screen bg-gray-50">
    {!hideSidebar && <Sidebar />}
    <div className="flex-1 flex flex-col">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4">
        {breadcrumbs && (
          <nav className="text-sm text-gray-400 mb-2">
            {breadcrumbs.map((b, i) => (
              <span key={b.to}>
                <a href={b.to} className="hover:underline text-primary-500">{b.label}</a>
                {i < breadcrumbs.length - 1 && " / "}
              </span>
            ))}
          </nav>
        )}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <div className="text-gray-500">{subtitle}</div>}
          </div>
          {actions}
        </div>
        {children}
      </div>
    </div>
  </div>
);
export default React.memo(Layout); 