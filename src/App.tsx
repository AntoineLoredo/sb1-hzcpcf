import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import PriceLists from './pages/PriceLists';
import Forecast from './pages/Forecast';
import Replenishment from './pages/Replenishment';
import Manufacturing from './pages/Manufacturing';
import Report from './pages/Report';
import Contacts from './pages/Contacts';
import PurchaseOrders from './pages/PurchaseOrders';
import Adjustments from './pages/Adjustments';
import Transfers from './pages/Transfers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="sales" element={<Sales />} />
          <Route path="price-lists" element={<PriceLists />} />
          <Route path="inventory/products" element={<Products />} />
          <Route path="inventory/price-lists" element={<PriceLists />} />
          <Route path="stock/purchases" element={<PurchaseOrders />} />
          <Route path="stock/adjustments" element={<Adjustments />} />
          <Route path="stock/transfers" element={<Transfers />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="forecast/replenishment" element={<Replenishment />} />
          <Route path="manufacturing" element={<Manufacturing />} />
          <Route path="report" element={<Report />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;