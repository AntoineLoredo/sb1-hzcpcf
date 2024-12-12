import React from 'react';

export function SupplierFilter({ products, selectedSupplier, onSupplierChange }) {
  const suppliers = React.useMemo(() => {
    const uniqueSuppliers = new Set();
    products.forEach(product => {
      product.variants.forEach(variant => {
        uniqueSuppliers.add(variant.supplier);
      });
    });
    return Array.from(uniqueSuppliers).sort();
  }, [products]);

  return (
    <select
      value={selectedSupplier}
      onChange={(e) => onSupplierChange(e.target.value)}
      className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    >
      <option value="">All Suppliers</option>
      {suppliers.map((supplier) => (
        <option key={supplier} value={supplier}>
          {supplier}
        </option>
      ))}
    </select>
  );
}