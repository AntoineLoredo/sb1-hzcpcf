import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { SearchInput } from '../components/common/SearchInput';
import { SkuHistoricTable } from '../components/sales/SkuHistoricTable';
import { SupplierFilter } from '../components/products/SupplierFilter';

export default function SkuHistoric() {
  const { products } = useStore();
  const [search, setSearch] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.variants.some(v => 
        v.sku.toLowerCase().includes(search.toLowerCase()) ||
        v.name.toLowerCase().includes(search.toLowerCase())
      );

    const matchesSupplier = !selectedSupplier || 
      product.variants.some(v => v.supplier === selectedSupplier);

    return matchesSearch && matchesSupplier;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">SKU Historic</h2>
        <div className="flex items-center space-x-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search SKUs..."
            className="w-96"
          />
          <SupplierFilter
            products={products}
            selectedSupplier={selectedSupplier}
            onSupplierChange={setSelectedSupplier}
          />
        </div>
      </div>

      <SkuHistoricTable products={filteredProducts} />
    </div>
  );
}