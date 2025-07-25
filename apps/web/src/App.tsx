import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewProductPage from './pages/NewProduct';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-product" element={<NewProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
