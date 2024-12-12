import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { SearchInput } from '../components/common/SearchInput';
import { ForecastTable } from '../components/forecast/ForecastTable';
import { SupplierFilter } from '../components/products/SupplierFilter';
import { calculateForecast } from '../utils/forecastCalculations';

export default function Forecast() {
  const { products, sales } = useStore();
  const [search, setSearch] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const forecastData = React.useMemo(() => {
    return calculateForecast(products, sales);
  }, [products, sales]);

  const filteredData = forecastData.filter(item => {
    const matchesSearch = item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesSupplier = !selectedSupplier || item.supplier === selectedSupplier;
    return matchesSearch && matchesSupplier;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Stock Forecast</h2>
        <div className="flex items-center space-x-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by SKU..."
            className="w-96"
          />
          <SupplierFilter
            products={products}
            selectedSupplier={selectedSupplier}
            onSupplierChange={setSelectedSupplier}
          />
        </div>
      </div>

      <ForecastTable data={filteredData} />
    </div>
  );
}