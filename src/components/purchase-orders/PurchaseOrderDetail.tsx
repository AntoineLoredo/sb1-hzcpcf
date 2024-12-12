import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PurchaseOrder, PurchaseOrderItem } from '../../types/purchaseOrder';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { X, Edit2, Check, XCircle, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Product } from '../../types/product';

interface PurchaseOrderDetailProps {
  order: PurchaseOrder;
  products: Product[];
  onClose: () => void;
  onUpdate: (order: PurchaseOrder) => void;
}

export function PurchaseOrderDetail({
  order,
  products,
  onClose,
  onUpdate
}: PurchaseOrderDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState<PurchaseOrder>(order);

  const allVariants = products.flatMap(p => p.variants);

  const handleAddItem = () => {
    setEditedOrder(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: crypto.randomUUID(),
          variant: allVariants[0],
          quantity: 1,
          unitPrice: allVariants[0].purchasePrice,
          totalPrice: allVariants[0].purchasePrice
        }
      ]
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setEditedOrder(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleUpdateItem = (itemId: string, updates: Partial<PurchaseOrderItem>) => {
    setEditedOrder(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, ...updates };
          // Recalculate total price if quantity or unit price changed
          if ('quantity' in updates || 'unitPrice' in updates) {
            updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const handleSave = () => {
    // Recalculate total amount
    const totalAmount = editedOrder.items.reduce((sum, item) => sum + item.totalPrice, 0);
    onUpdate({ ...editedOrder, totalAmount });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'ordered':
        return 'bg-blue-100 text-blue-800';
      case 'received':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Purchase Order {editedOrder.orderNumber}
          </h2>
          <p className="text-sm text-gray-500">
            Created on {format(editedOrder.date, 'dd/MM/yyyy', { locale: fr })}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button variant="primary" icon={Check} onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="secondary" icon={XCircle} onClick={() => {
                setEditedOrder(order);
                setIsEditing(false);
              }}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" icon={Edit2} onClick={() => setIsEditing(true)}>
                Edit Order
              </Button>
              <Button variant="secondary" icon={X} onClick={onClose}>
                Close
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Supplier</label>
            {isEditing ? (
              <input
                type="text"
                value={editedOrder.supplier}
                onChange={(e) => setEditedOrder(prev => ({ ...prev, supplier: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{editedOrder.supplier}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Status</label>
            {isEditing ? (
              <select
                value={editedOrder.status}
                onChange={(e) => setEditedOrder(prev => ({ ...prev, status: e.target.value as any }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="ordered">Ordered</option>
                <option value="received">Received</option>
              </select>
            ) : (
              <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(editedOrder.status)}`}>
                {editedOrder.status.charAt(0).toUpperCase() + editedOrder.status.slice(1)}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Estimated Delivery</label>
            {isEditing ? (
              <input
                type="date"
                value={format(editedOrder.estimatedDeliveryDate, 'yyyy-MM-dd')}
                onChange={(e) => setEditedOrder(prev => ({ ...prev, estimatedDeliveryDate: new Date(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-sm text-gray-900">
                {format(editedOrder.estimatedDeliveryDate, 'dd/MM/yyyy', { locale: fr })}
              </p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Location</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Location Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedOrder.deliveryLocation.name}
                  onChange={(e) => setEditedOrder(prev => ({
                    ...prev,
                    deliveryLocation: { ...prev.deliveryLocation, name: e.target.value }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{editedOrder.deliveryLocation.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedOrder.deliveryLocation.address}
                  onChange={(e) => setEditedOrder(prev => ({
                    ...prev,
                    deliveryLocation: { ...prev.deliveryLocation, address: e.target.value }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{editedOrder.deliveryLocation.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedOrder.deliveryLocation.city}
                    onChange={(e) => setEditedOrder(prev => ({
                      ...prev,
                      deliveryLocation: { ...prev.deliveryLocation, city: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{editedOrder.deliveryLocation.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Postal Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedOrder.deliveryLocation.postalCode}
                    onChange={(e) => setEditedOrder(prev => ({
                      ...prev,
                      deliveryLocation: { ...prev.deliveryLocation, postalCode: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{editedOrder.deliveryLocation.postalCode}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Country</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedOrder.deliveryLocation.country}
                  onChange={(e) => setEditedOrder(prev => ({
                    ...prev,
                    deliveryLocation: { ...prev.deliveryLocation, country: e.target.value }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{editedOrder.deliveryLocation.country}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {isEditing && (
          <div className="flex justify-end">
            <Button icon={Plus} onClick={handleAddItem}>
              Add Item
            </Button>
          </div>
        )}

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              {isEditing && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {editedOrder.items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing ? (
                    <select
                      value={item.variant.id}
                      onChange={(e) => {
                        const variant = allVariants.find(v => v.id === e.target.value)!;
                        handleUpdateItem(item.id, {
                          variant,
                          unitPrice: variant.purchasePrice
                        });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      {allVariants.map(variant => (
                        <option key={variant.id} value={variant.id}>
                          {variant.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center">
                      <img
                        src={item.variant.imageUrl}
                        alt={item.variant.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {item.variant.name}
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.variant.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing ? (
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(item.id, { quantity: parseInt(e.target.value) })}
                      className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{item.quantity}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => handleUpdateItem(item.id, { unitPrice: parseFloat(e.target.value) })}
                      className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{formatCurrency(item.unitPrice)}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(item.totalPrice)}
                </td>
                {isEditing && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={4} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                Total Amount:
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatCurrency(editedOrder.items.reduce((sum, item) => sum + item.totalPrice, 0))}
              </td>
              {isEditing && <td />}
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}