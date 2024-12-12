import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { SearchInput } from '../components/common/SearchInput';
import { SalesTable } from '../components/sales/SalesTable';
import { SkuHistoricTable } from '../components/sales/SkuHistoricTable';
import { Button } from '../components/common/Button';

export default function Sales() {
  const { sales, products } = useStore();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('sales'); // 'sales' or 'sku-historic'

  const filteredSales = sales.filter(
    (sale) =>
      sale.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      sale.customer.toLowerCase().includes(search.toLowerCase()) ||
      sale.items.some(item => item.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.variants.some(v => v.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">Sales</h2>
          <div className="border-l pl-4 flex items-center space-x-2">
            <Button
              variant={activeTab === 'sales' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('sales')}
            >
              Sales Orders
            </Button>
            <Button
              variant={activeTab === 'sku-historic' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('sku-historic')}
            >
              SKU Historic
            </Button>
          </div>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={activeTab === 'sales' ? "Search orders..." : "Search SKUs..."}
          className="w-96"
        />
      </div>

      {activeTab === 'sales' ? (
        <SalesTable sales={filteredSales} />
      ) : (
        <SkuHistoricTable products={filteredProducts} />
      )}
    </div>
  );
}