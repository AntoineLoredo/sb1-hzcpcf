import React, { useState } from 'react';
import { format } from 'date-fns';
import { ProductVariant } from '../../types/product';
import { PurchaseOrder, PurchaseOrderItem } from '../../types/purchaseOrder';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface PurchaseOrderFormProps {
  products: { variants: ProductVariant[] }[];
  onSubmit: (order: Omit<PurchaseOrder, 'id'>) => void;
  onCancel: () => void;
}

export function PurchaseOrderForm({ products, onSubmit, onCancel }: PurchaseOrderFormProps) {
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    supplier: '',
    estimatedDeliveryDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    deliveryLocation: {
      name: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'France'
    },
    items: [] as Array<{
      variantId: string;
      quantity: number;
      unitPrice: number;
    }>
  });

  const allVariants = products.flatMap(p => p.variants);
  const suppliers = [...new Set(allVariants.map(v => v.supplier))].sort();

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { variantId: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const items: PurchaseOrderItem[] = formData.items.map((item, index) => {
      const variant = allVariants.find(v => v.id === item.variantId)!;
      return {
        id: `new-${index}`,
        variant,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.quantity * item.unitPrice
      };
    });

    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

    onSubmit({
      date: new Date(formData.date),
      orderNumber: `PO-${format(new Date(), 'yyyyMMdd-HHmmss')}`,
      supplier: formData.supplier,
      status: 'pending',
      items,
      totalAmount,
      estimatedDeliveryDate: new Date(formData.estimatedDeliveryDate),
      deliveryLocation: formData.deliveryLocation
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier</label>
            <select
              value={formData.supplier}
              onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier} value={supplier}>{supplier}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Delivery Date</label>
            <input
              type="date"
              value={formData.estimatedDeliveryDate}
              onChange={(e) => setFormData(prev => ({ ...prev, estimatedDeliveryDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Delivery Location */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Delivery Location</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location Name</label>
              <input
                type="text"
                value={formData.deliveryLocation.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deliveryLocation: { ...prev.deliveryLocation, name: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                placeholder="e.g., Entrepôt Principal"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={formData.deliveryLocation.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deliveryLocation: { ...prev.deliveryLocation, address: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                placeholder="Street address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={formData.deliveryLocation.city}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deliveryLocation: { ...prev.deliveryLocation, city: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                value={formData.deliveryLocation.postalCode}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deliveryLocation: { ...prev.deliveryLocation, postalCode: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                value={formData.deliveryLocation.country}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deliveryLocation: { ...prev.deliveryLocation, country: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Order Items</h3>
            <Button type="button" icon={Plus} onClick={handleAddItem}>
              Add Item
            </Button>
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-end border-b pb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product</label>
                <select
                  value={item.variantId}
                  onChange={(e) => {
                    const variant = allVariants.find(v => v.id === e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      items: prev.items.map((i, idx) => 
                        idx === index 
                          ? { ...i, variantId: e.target.value, unitPrice: variant?.purchasePrice || 0 }
                          : i
                      )
                    }));
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a product</option>
                  {allVariants
                    .filter(v => !formData.supplier || v.supplier === formData.supplier)
                    .map(variant => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name} ({variant.sku})
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    items: prev.items.map((i, idx) => 
                      idx === index ? { ...i, quantity: parseInt(e.target.value) } : i
                    )
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.unitPrice}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    items: prev.items.map((i, idx) => 
                      idx === index ? { ...i, unitPrice: parseFloat(e.target.value) } : i
                    )
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <Button
                  type="button"
                  variant="danger"
                  icon={Trash2}
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-lg font-medium">
            Total: {formatCurrency(
              formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
            )}
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Create Order
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}