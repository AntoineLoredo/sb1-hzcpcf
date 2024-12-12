import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { SearchInput } from '../components/common/SearchInput';
import { ReplenishmentTable } from '../components/replenishment/ReplenishmentTable';
import { SupplierFilter } from '../components/products/SupplierFilter';
import { calculateReplenishment } from '../utils/replenishmentCalculations';
import { ReplenishmentData } from '../types/replenishment';
import { PurchaseOrder } from '../types/purchaseOrder';

export default function Replenishment() {
  const navigate = useNavigate();
  const { products, sales, addPurchaseOrder } = useStore();
  const [search, setSearch] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const replenishmentData = React.useMemo(() => {
    return calculateReplenishment(products, sales);
  }, [products, sales]);

  const filteredData = replenishmentData.filter(item => {
    const matchesSearch = item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesSupplier = !selectedSupplier || item.supplier === selectedSupplier;
    return matchesSearch && matchesSupplier;
  });

  const handleCreateOrder = (selectedItems: ReplenishmentData[]) => {
    if (selectedItems.length === 0) return;

    // Group items by supplier
    const itemsBySupplier = selectedItems.reduce((acc, item) => {
      if (!acc[item.supplier]) {
        acc[item.supplier] = [];
      }
      acc[item.supplier].push(item);
      return acc;
    }, {} as { [supplier: string]: ReplenishmentData[] });

    // Create a purchase order for each supplier
    Object.entries(itemsBySupplier).forEach(([supplier, items]) => {
      const orderItems = items.map(item => {
        const variant = products
          .flatMap(p => p.variants)
          .find(v => v.sku === item.sku)!;

        return {
          id: crypto.randomUUID(),
          variant,
          quantity: item.orderQuantity,
          unitPrice: variant.purchasePrice,
          totalPrice: variant.purchasePrice * item.orderQuantity
        };
      });

      const totalAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const latestSuggestedDate = new Date(Math.max(
        ...items.map(item => item.suggestedOrderDate.getTime())
      ));

      const order: PurchaseOrder = {
        id: crypto.randomUUID(),
        date: new Date(),
        orderNumber: `PO-${new Date().toISOString().slice(0, 10)}-${supplier.slice(0, 3)}`,
        supplier,
        status: 'pending',
        items: orderItems,
        totalAmount,
        estimatedDeliveryDate: latestSuggestedDate
      };

      addPurchaseOrder(order);
    });

    // Navigate to purchase orders page
    navigate('/stock/purchases');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Replenishment</h2>
        <div className="flex items-center space-x-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by SKU..."
            className="w-96"
          />
          <SupplierFilter
            products={products}
            selectedSupplier={selectedSupplier}
            onSupplierChange={setSelectedSupplier}
          />
        </div>
      </div>

      <ReplenishmentTable 
        data={filteredData}
        onCreateOrder={handleCreateOrder}
      />
    </div>
  );
}