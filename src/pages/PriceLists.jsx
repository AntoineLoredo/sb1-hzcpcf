import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { SearchInput } from '../components/common/SearchInput';
import { PriceListTable } from '../components/price-lists/PriceListTable';
import { PriceListActions } from '../components/price-lists/PriceListActions';
import { SupplierFilter } from '../components/products/SupplierFilter';
import {
  generatePriceListTemplate,
  exportPriceList,
  parsePriceListCSV,
  downloadCSV
} from '../utils/priceListImportExport';

export default function PriceLists() {
  const { products, prices, updatePrices } = useStore();
  const [search, setSearch] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.variants.some(v => 
        v.sku.toLowerCase().includes(search.toLowerCase()) ||
        v.name.toLowerCase().includes(search.toLowerCase())
      );

    const matchesSupplier = !selectedSupplier || 
      product.variants.some(v => v.supplier === selectedSupplier);

    return matchesSearch && matchesSupplier;
  });

  const handleImport = async (file) => {
    try {
      const importedPrices = await parsePriceListCSV(file);
      updatePrices(importedPrices);
    } catch (error) {
      console.error('Error importing price list:', error);
    }
  };

  const handleExport = () => {
    const csv = exportPriceList(products, prices);
    downloadCSV(csv, 'price_list_export.csv');
  };

  const handleDownloadTemplate = () => {
    const template = generatePriceListTemplate();
    downloadCSV(template, 'price_list_template.csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
        <PriceListActions
          onImport={handleImport}
          onExport={handleExport}
          onDownloadTemplate={handleDownloadTemplate}
        />
      </div>

      <PriceListTable products={filteredProducts} />
    </div>
  );
}