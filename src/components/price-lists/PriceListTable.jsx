import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import { useStore } from '../../store/useStore';

const COUNTRIES = ['France', 'Germany', 'Italy', 'Spain', 'UK'];

export function PriceListTable({ products }) {
  const { prices, updatePrice } = useStore();

  const handlePriceChange = (sku, country, value) => {
    const price = parseFloat(value) || 0;
    updatePrice(sku, country, price);
  };

  const getPrice = (sku, country, basePrice) => {
    if (prices[sku]?.[country] !== undefined) {
      return prices[sku][country];
    }
    // Default markup of 150% if no price is set
    return basePrice * 1.5;
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
              SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Base Price
            </th>
            {COUNTRIES.map(country => (
              <th key={country} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                {country}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.flatMap(product =>
            product.variants.map(variant => (
              <tr key={variant.sku} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  {variant.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {variant.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(variant.purchasePrice)}
                </td>
                {COUNTRIES.map(country => (
                  <td key={country} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      step="0.01"
                      value={getPrice(variant.sku, country, variant.purchasePrice)}
                      onChange={(e) => handlePriceChange(variant.sku, country, e.target.value)}
                      className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}