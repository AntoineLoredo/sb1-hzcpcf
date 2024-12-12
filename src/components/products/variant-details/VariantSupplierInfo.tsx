import React from 'react';
import { ProductVariant } from '../../../types/product';
import { format } from 'date-fns';
import { formatCurrency } from '../../../utils/formatters';

interface VariantSupplierInfoProps {
  variant: ProductVariant;
  isEditing: boolean;
  editedVariant: ProductVariant | null;
  onEdit: (field: keyof ProductVariant, value: any) => void;
}

export function VariantSupplierInfo({ variant, isEditing, editedVariant, onEdit }: VariantSupplierInfoProps) {
  if (!isEditing) {
    return (
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500">Supplier Information</h4>
        <div className="mt-2 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Main Supplier</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{variant.supplierData.mainSupplier}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Purchase Date</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{variant.supplierData.lastPurchaseDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Purchase Price</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(variant.supplierData.lastPurchasePrice)}</p>
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-500">Alternative Suppliers</h5>
          <div className="mt-2 space-y-2">
            {variant.supplierData.alternativeSuppliers.map((supplier, index) => (
              <div key={index} className="grid grid-cols-3 text-sm">
                <span className="text-gray-900">{supplier.name}</span>
                <span className="text-gray-500">Lead Time: {supplier.leadTime} weeks</span>
                <span className="text-gray-500">MOQ: {supplier.moq}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-500">Supplier Information</h4>
      <div className="mt-2 grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500">Main Supplier</label>
          <input
            type="text"
            value={editedVariant?.supplierData.mainSupplier}
            onChange={(e) => onEdit('supplierData', {
              ...editedVariant?.supplierData,
              mainSupplier: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Last Purchase Date</label>
          <input
            type="date"
            value={editedVariant?.supplierData.lastPurchaseDate}
            onChange={(e) => onEdit('supplierData', {
              ...editedVariant?.supplierData,
              lastPurchaseDate: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Last Purchase Price</label>
          <input
            type="number"
            step="0.01"
            value={editedVariant?.supplierData.lastPurchasePrice}
            onChange={(e) => onEdit('supplierData', {
              ...editedVariant?.supplierData,
              lastPurchasePrice: Number(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <h5 className="text-sm font-medium text-gray-500">Alternative Suppliers</h5>
        {editedVariant?.supplierData.alternativeSuppliers.map((supplier, index) => (
          <div key={index} className="mt-2 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Supplier Name</label>
              <input
                type="text"
                value={supplier.name}
                onChange={(e) => {
                  const newSuppliers = [...editedVariant.supplierData.alternativeSuppliers];
                  newSuppliers[index] = { ...supplier, name: e.target.value };
                  onEdit('supplierData', {
                    ...editedVariant.supplierData,
                    alternativeSuppliers: newSuppliers
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Lead Time (weeks)</label>
              <input
                type="number"
                value={supplier.leadTime}
                onChange={(e) => {
                  const newSuppliers = [...editedVariant.supplierData.alternativeSuppliers];
                  newSuppliers[index] = { ...supplier, leadTime: Number(e.target.value) };
                  onEdit('supplierData', {
                    ...editedVariant.supplierData,
                    alternativeSuppliers: newSuppliers
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">MOQ</label>
              <input
                type="number"
                value={supplier.moq}
                onChange={(e) => {
                  const newSuppliers = [...editedVariant.supplierData.alternativeSuppliers];
                  newSuppliers[index] = { ...supplier, moq: Number(e.target.value) };
                  onEdit('supplierData', {
                    ...editedVariant.supplierData,
                    alternativeSuppliers: newSuppliers
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