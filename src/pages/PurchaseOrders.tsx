import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Plus } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SearchInput } from '../components/common/SearchInput';
import { formatCurrency } from '../utils/formatters';
import { PurchaseOrderForm } from '../components/purchase-orders/PurchaseOrderForm';
import { PurchaseOrderDetail } from '../components/purchase-orders/PurchaseOrderDetail';
import { PurchaseOrder } from '../types/purchaseOrder';

export default function PurchaseOrders() {
  const { purchaseOrders, products, addPurchaseOrder, updatePurchaseOrder } = useStore();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);

  const filteredOrders = purchaseOrders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.supplier.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some(item => 
        item.variant.sku.toLowerCase().includes(search.toLowerCase())
      )
  );

  const handleCreateOrder = (orderData: Omit<PurchaseOrder, 'id'>) => {
    addPurchaseOrder({
      ...orderData,
      id: crypto.randomUUID()
    });
    setShowForm(false);
  };

  const handleUpdateOrder = (order: PurchaseOrder) => {
    updatePurchaseOrder(order);
    setSelectedOrder(null);
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

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">New Purchase Order</h2>
        </div>
        <PurchaseOrderForm
          products={products}
          onSubmit={handleCreateOrder}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <PurchaseOrderDetail
        order={selectedOrder}
        products={products}
        onUpdate={handleUpdateOrder}
        onClose={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Purchase Orders</h2>
        <div className="flex items-center space-x-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search orders..."
            className="w-96"
          />
          <Button icon={Plus} onClick={() => setShowForm(true)}>
            New Purchase Order
          </Button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Est. Delivery
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(order.date, 'dd/MM/yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.items.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(order.totalAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(order.estimatedDeliveryDate, 'dd/MM/yyyy', { locale: fr })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}