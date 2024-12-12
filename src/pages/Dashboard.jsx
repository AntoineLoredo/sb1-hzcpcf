import React from 'react';
import { useStore } from '../store/useStore';
import { AlertTriangle, Package, TrendingUp, Truck } from 'lucide-react';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { formatCurrency } from '../utils/formatters';

export default function Dashboard() {
  const { products } = useStore();

  // Calculate total variants and low stock items
  const totalVariants = products.reduce((sum, product) => sum + product.variants.length, 0);
  const lowStockVariants = products
    .flatMap(product => product.variants)
    .filter(variant => variant.moq <= variant.safetyStockWeeks);

  // Calculate total stock value
  const totalValue = products.reduce(
    (sum, product) => 
      sum + product.variants.reduce(
        (variantSum, variant) => variantSum + variant.purchasePrice,
        0
      ),
    0
  );

  // Get active suppliers count
  const uniqueSuppliers = new Set(
    products.flatMap(product => 
      product.variants.map(variant => variant.supplier)
    )
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Products"
          value={totalVariants}
          icon={Package}
        />
        <DashboardCard
          title="Low Stock Items"
          value={lowStockVariants.length}
          icon={AlertTriangle}
          alert={lowStockVariants.length > 0}
        />
        <DashboardCard
          title="Total Stock Value"
          value={formatCurrency(totalValue)}
          icon={TrendingUp}
        />
        <DashboardCard
          title="Active Suppliers"
          value={uniqueSuppliers.size}
          icon={Truck}
        />
      </div>

      {lowStockVariants.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Low Stock Alerts</h2>
          <div className="space-y-4">
            {lowStockVariants.map((variant) => (
              <div
                key={variant.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-medium">{variant.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {variant.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-medium">
                    MOQ: {variant.moq}
                  </p>
                  <p className="text-sm text-gray-500">
                    Safety Stock (weeks): {variant.safetyStockWeeks}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}