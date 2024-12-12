```vue
<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Total Products"
        :value="totalVariants"
        :icon="Package"
      />
      <DashboardCard
        title="Low Stock Items"
        :value="lowStockVariants.length"
        :icon="AlertTriangle"
        :alert="lowStockVariants.length > 0"
      />
      <DashboardCard
        title="Total Stock Value"
        :value="formatCurrency(totalValue)"
        :icon="TrendingUp"
      />
      <DashboardCard
        title="Active Suppliers"
        :value="uniqueSuppliers.size"
        :icon="Truck"
      />
    </div>

    <div v-if="lowStockVariants.length > 0" class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium mb-4">Low Stock Alerts</h2>
      <div class="space-y-4">
        <div
          v-for="variant in lowStockVariants"
          :key="variant.id"
          class="flex items-center justify-between border-b pb-4"
        >
          <div>
            <h3 class="font-medium">{{ variant.name }}</h3>
            <p class="text-sm text-gray-500">SKU: {{ variant.sku }}</p>
          </div>
          <div class="text-right">
            <p class="text-red-600 font-medium">
              MOQ: {{ variant.moq }}
            </p>
            <p class="text-sm text-gray-500">
              Safety Stock (weeks): {{ variant.safetyStockWeeks }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangle, Package, TrendingUp, Truck } from 'lucide-vue-next';
import { useMainStore } from '~/stores/mainStore';

const store = useMainStore();

// Calculate total variants and low stock items
const totalVariants = computed(() => 
  store.products.reduce((sum, product) => sum + product.variants.length, 0)
);

const lowStockVariants = computed(() => 
  store.products
    .flatMap(product => product.variants)
    .filter(variant => variant.moq <= variant.safetyStockWeeks)
);

// Calculate total stock value
const totalValue = computed(() => 
  store.products.reduce(
    (sum, product) => 
      sum + product.variants.reduce(
        (variantSum, variant) => variantSum + variant.purchasePrice,
        0
      ),
    0
  )
);

// Get active suppliers count
const uniqueSuppliers = computed(() => {
  const suppliers = new Set(
    store.products.flatMap(product => 
      product.variants.map(variant => variant.supplier)
    )
  );
  return suppliers;
});
</script>
```