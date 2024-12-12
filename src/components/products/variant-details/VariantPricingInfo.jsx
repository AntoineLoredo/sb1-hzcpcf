import React from 'react';
import { formatCurrency } from '../../../utils/formatters';

export function VariantPricingInfo({ variant, isEditing, editedVariant, onEdit }) {
  if (!isEditing) {
    return (
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500">Pricing Information</h4>
        <div className="mt-2 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Base Price</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(variant.pricingData.basePrice)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Recommended Retail Price</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(variant.pricingData.recommendedRetailPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Minimum Margin</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{(variant.pricingData.minimumMargin * 100).toFixed(1)}%</p>
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-500">Country Prices</h5>
          <div className="mt-2 grid grid-cols-5 gap-4">
            {Object.entries(variant.pricingData.countryPrices).map(([country, price]) => (
              <div key={country}>
                <p className="text-sm text-gray-500">{country}</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-500">Pricing Information</h4>
      <div className="mt-2 grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500">Base Price</label>
          <input
            type="number"
            step="0.01"
            value={editedVariant?.pricingData.basePrice}
            onChange={(e) => onEdit('pricingData', {
              ...editedVariant?.pricingData,
              basePrice: Number(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Recommended Retail Price</label>
          <input
            type="number"
            step="0.01"
            value={editedVariant?.pricingData.recommendedRetailPrice}
            onChange={(e) => onEdit('pricingData', {
              ...editedVariant?.pricingData,
              recommendedRetailPrice: Number(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Minimum Margin (%)</label>
          <input
            type="number"
            step="0.1"
            value={editedVariant?.pricingData.minimumMargin * 100}
            onChange={(e) => onEdit('pricingData', {
              ...editedVariant?.pricingData,
              minimumMargin: Number(e.target.value) / 100
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <h5 className="text-sm font-medium text-gray-500">Country Prices</h5>
        <div className="mt-2 grid grid-cols-5 gap-4">
          {Object.entries(editedVariant?.pricingData.countryPrices || {}).map(([country, price]) => (
            <div key={country}>
              <label className="block text-xs text-gray-500">{country}</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => {
                  const newPrices = {
                    ...editedVariant?.pricingData.countryPrices,
                    [country]: Number(e.target.value)
                  };
                  onEdit('pricingData', {
                    ...editedVariant?.pricingData,
                    countryPrices: newPrices
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}