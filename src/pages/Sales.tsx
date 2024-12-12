import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { SearchInput } from '../components/common/SearchInput';
import { SalesTable } from '../components/sales/SalesTable';

export default function Sales() {
  const { sales } = useStore();
  const [search, setSearch] = useState('');

  const filteredSales = sales.filter(
    (sale) =>
      sale.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      sale.customer.toLowerCase().includes(search.toLowerCase()) ||
      sale.items.some(item => item.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Sales</h2>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search orders..."
          className="w-96"
        />
      </div>

      <SalesTable sales={filteredSales} />
    </div>
  );
}