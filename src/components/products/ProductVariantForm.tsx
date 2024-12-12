import React from 'react';
import { ProductVariant } from '../../types/product';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ProductVariantFormProps {
  initialData?: Partial<ProductVariant>;
  onSubmit: (data: Partial<ProductVariant>) => void;
  onCancel: () => void;
}

export function ProductVariantForm({
  initialData,
  onSubmit,
  onCancel
}: ProductVariantFormProps) {
  const [formData, setFormData] = React.useState<Partial<ProductVariant>>(
    initialData || {
      name: '',
      sku: '',
      option1Type: '',
      option1Value: '',
      version: 1,
      status: 'active',
      isPrimary: false,
      supplier: '',
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0, unit: 'cm' },
      isBundle: false,
      isFromRawMaterial: false,
      moq: 1,
      leadTimeWeeks: 1,
      safetyStockWeeks: 2,
      purchasePrice: 0,
      logisticCost: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Variant Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Variant Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Variant Options</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Option 1 Type</label>
              <input
                type="text"
                value={formData.option1Type}
                onChange={(e) => setFormData({ ...formData, option1Type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Option 1 Value</label>
              <input
                type="text"
                value={formData.option1Value}
                onChange={(e) => setFormData({ ...formData, option1Value: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Supply Chain */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Supply Chain</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Supplier</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">MOQ</label>
              <input
                type="number"
                value={formData.moq}
                onChange={(e) => setFormData({ ...formData, moq: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pricing</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Purchase Price</label>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Logistic Cost</label>
              <input
                type="number"
                value={formData.logisticCost}
                onChange={(e) => setFormData({ ...formData, logisticCost: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Variant
          </Button>
        </div>
      </form>
    </Card>
  );
}