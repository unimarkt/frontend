import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import NewProductPage from './pages/NewProduct';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/new-product" element={<NewProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
