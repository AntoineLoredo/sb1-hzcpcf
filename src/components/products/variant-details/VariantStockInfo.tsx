import React from 'react';
import { ProductVariant } from '../../../types/product';
import { format } from 'date-fns';

interface VariantStockInfoProps {
  variant: ProductVariant;
  isEditing: boolean;
  editedVariant: ProductVariant | null;
  onEdit: (field: keyof ProductVariant, value: any) => void;
}

export function VariantStockInfo({ variant, isEditing, editedVariant, onEdit }: VariantStockInfoProps) {
  if (!isEditing) {
    return (
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500">Stock Information</h4>
        <div className="mt-2 grid grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Current Stock</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{variant.stockData.currentStock}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Incoming Stock</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{variant.stockData.incomingStock}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Reserved Stock</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{variant.stockData.reservedStock}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Available Stock</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{variant.stockData.availableStock}</p>
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-500">Stock Locations</h5>
          <div className="mt-2 space-y-2">
            {variant.stockData.stockLocations.map((location, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-500">{location.name}</span>
                <span className="font-medium text-gray-900">{location.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-500">Stock Information</h4>
      <div className="mt-2 grid grid-cols-4 gap-4">
        <div>
          <label className="block text-xs text-gray-500">Current Stock</label>
          <input
            type="number"
            value={editedVariant?.stockData.currentStock}
            onChange={(e) => onEdit('stockData', { 
              ...editedVariant?.stockData,
              currentStock: Number(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Incoming Stock</label>
          <input
            type="number"
            value={editedVariant?.stockData.incomingStock}
            onChange={(e) => onEdit('stockData', {
              ...editedVariant?.stockData,
              incomingStock: Number(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Reserved Stock</label>
          <input
            type="number"
            value={editedVariant?.stockData.reservedStock}
            onChange={(e) => onEdit('stockData', {
              ...editedVariant?.stockData,
              reservedStock: Number(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Available Stock</label>
          <input
            type="number"
            value={editedVariant?.stockData.availableStock}
            onChange={(e) => onEdit('stockData', {
              ...editedVariant?.stockData,
              availableStock: Number(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <h5 className="text-sm font-medium text-gray-500">Stock Locations</h5>
        {editedVariant?.stockData.stockLocations.map((location, index) => (
          <div key={index} className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Location Name</label>
              <input
                type="text"
                value={location.name}
                onChange={(e) => {
                  const newLocations = [...editedVariant.stockData.stockLocations];
                  newLocations[index] = { ...location, name: e.target.value };
                  onEdit('stockData', {
                    ...editedVariant.stockData,
                    stockLocations: newLocations
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Quantity</label>
              <input
                type="number"
                value={location.quantity}
                onChange={(e) => {
                  const newLocations = [...editedVariant.stockData.stockLocations];
                  newLocations[index] = { ...location, quantity: Number(e.target.value) };
                  onEdit('stockData', {
                    ...editedVariant.stockData,
                    stockLocations: newLocations
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}