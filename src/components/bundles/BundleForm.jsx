import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../common/Button';
import { Plus, Trash2 } from 'lucide-react';
import { Bundle, BundleComponent } from '../../types/bundle';

export function BundleForm({ bundle, onClose }) {
  const { products, addBundle, updateBundle } = useStore();
  const [formData, setFormData] = useState(
    bundle || {
      sku: '',
      name: '',
      status: 'active',
      components: []
    }
  );

  const allVariants = products.flatMap(p => p.variants);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bundleData = new Bundle({
      ...formData,
      id: formData.id || crypto.randomUUID()
    });

    if (bundle) {
      updateBundle(bundleData);
    } else {
      addBundle(bundleData);
    }
    onClose();
  };

  const addComponent = () => {
    setFormData(prev => ({
      ...prev,
      components: [
        ...prev.components,
        new BundleComponent({ variantSku: '', quantity: 1 })
      ]
    }));
  };

  const removeComponent = (index) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index)
    }));
  };

  const updateComponent = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.map((component, i) =>
        i === index ? { ...component, [field]: value } : component
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bundle SKU
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bundle Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="discontinued">Discontinued</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Components</h3>
            <Button type="button" icon={Plus} onClick={addComponent}>
              Add Component
            </Button>
          </div>

          <div className="space-y-4">
            {formData.components.map((component, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Variant SKU
                  </label>
                  <select
                    value={component.variantSku}
                    onChange={(e) => updateComponent(index, 'variantSku', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a variant</option>
                    {allVariants.map(variant => (
                      <option key={variant.sku} value={variant.sku}>
                        {variant.name} ({variant.sku})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={component.quantity}
                    onChange={(e) => updateComponent(index, 'quantity', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  icon={Trash2}
                  onClick={() => removeComponent(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {bundle ? 'Update Bundle' : 'Create Bundle'}
          </Button>
        </div>
      </div>
    </form>
  );
}