import React from 'react';
import { ProductVariant } from '../../../types/product';
import { formatCurrency } from '../../../utils/formatters';

interface VariantBasicInfoProps {
  variant: ProductVariant;
  isEditing: boolean;
  editedVariant: ProductVariant | null;
  onEdit: (field: keyof ProductVariant, value: any) => void;
}

export function VariantBasicInfo({ variant, isEditing, editedVariant, onEdit }: VariantBasicInfoProps) {
  if (!isEditing) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Basic Information</h4>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-900">Name: {variant.name}</p>
            <p className="text-sm text-gray-900">SKU: {variant.sku}</p>
            <p className="text-sm text-gray-900">Status: {variant.status}</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Options</h4>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-900">{variant.option1Type}: {variant.option1Value}</p>
            {variant.option2Type && (
              <p className="text-sm text-gray-900">{variant.option2Type}: {variant.option2Value}</p>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Specifications</h4>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-900">Weight: {variant.weight} kg</p>
            <p className="text-sm text-gray-900">
              Dimensions: {variant.dimensions.length}×{variant.dimensions.width}×{variant.dimensions.height} {variant.dimensions.unit}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h4 className="text-sm font-medium text-gray-500">Basic Information</h4>
        <div className="mt-2 space-y-2">
          <div>
            <label className="block text-xs text-gray-500">Name</label>
            <input
              type="text"
              value={editedVariant?.name}
              onChange={(e) => onEdit('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">SKU</label>
            <input
              type="text"
              value={editedVariant?.sku}
              onChange={(e) => onEdit('sku', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Status</label>
            <select
              value={editedVariant?.status}
              onChange={(e) => onEdit('status', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500">Options</h4>
        <div className="mt-2 space-y-2">
          <div>
            <label className="block text-xs text-gray-500">Option 1 Type</label>
            <input
              type="text"
              value={editedVariant?.option1Type}
              onChange={(e) => onEdit('option1Type', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Option 1 Value</label>
            <input
              type="text"
              value={editedVariant?.option1Value}
              onChange={(e) => onEdit('option1Value', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Option 2 Type</label>
            <input
              type="text"
              value={editedVariant?.option2Type || ''}
              onChange={(e) => onEdit('option2Type', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Option 2 Value</label>
            <input
              type="text"
              value={editedVariant?.option2Value || ''}
              onChange={(e) => onEdit('option2Value', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500">Specifications</h4>
        <div className="mt-2 space-y-2">
          <div>
            <label className="block text-xs text-gray-500">Weight (kg)</label>
            <input
              type="number"
              value={editedVariant?.weight}
              onChange={(e) => onEdit('weight', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-500">Length</label>
              <input
                type="number"
                value={editedVariant?.dimensions.length}
                onChange={(e) => onEdit('dimensions', { ...editedVariant?.dimensions, length: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Width</label>
              <input
                type="number"
                value={editedVariant?.dimensions.width}
                onChange={(e) => onEdit('dimensions', { ...editedVariant?.dimensions, width: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Height</label>
              <input
                type="number"
                value={editedVariant?.dimensions.height}
                onChange={(e) => onEdit('dimensions', { ...editedVariant?.dimensions, height: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}