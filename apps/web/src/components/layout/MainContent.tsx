import React from "react";
import Banner from "../Banner";
import TemplateList from "../TemplateList";
import Gallery from "../Gallery";
import ProductList from "../ProductList";

const MainContent: React.FC = React.memo(() => (
  <main className="flex-1 flex flex-col gap-8 p-6">
    <Banner />
    <div className="flex flex-col md:flex-row gap-8">
      <TemplateList />
      <Gallery />
    </div>
    <ProductList />
  </main>
));

export default MainContent; 