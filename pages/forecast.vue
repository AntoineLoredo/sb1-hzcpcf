```vue
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-900">Stock Forecast</h2>
      <div class="flex items-center space-x-4">
        <SearchInput
          v-model="search"
          placeholder="Search by SKU..."
          class="w-96"
        />
        <SupplierFilter
          :products="products"
          v-model="selectedSupplier"
        />
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
              Variant code / SKU
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Existing stock
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Average sales per week
            </th>
            <template v-for="week in weekNumbers" :key="week">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Stock end of week+{{ week }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in filteredData" :key="item.sku" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
              {{ item.sku }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatNumber(item.existingStock) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatNumber(item.averageSalesPerWeek, 1) }}
            </td>
            <td
              v-for="(forecast, index) in item.weeklyForecast"
              :key="index"
              class="px-6 py-4 whitespace-nowrap text-sm"
              :class="getForecastClass(forecast, item.safetyStock)"
            >
              {{ formatNumber(forecast) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '~/stores/mainStore';
import { formatNumber } from '~/utils/formatters';

const store = useMainStore();
const search = ref('');
const selectedSupplier = ref('');
const weekNumbers = Array.from({ length: 23 }, (_, i) => i + 1);

const products = computed(() => store.products);

const forecastData = computed(() => {
  const variants = products.value.flatMap(p => p.variants);
  const weeklySales = calculateWeeklySales();
  
  return variants.map(variant => {
    const averageSalesPerWeek = weeklySales[variant.sku] || 0;
    const safetyStock = variant.moq * variant.safetyStockWeeks;
    let currentStock = variant.stockData?.currentStock || 0;
    
    const weeklyForecast = Array.from({ length: 23 }, () => {
      currentStock = currentStock - averageSalesPerWeek;
      return currentStock;
    });

    return {
      sku: variant.sku,
      supplier: variant.supplier,
      existingStock: variant.stockData?.currentStock || 0,
      averageSalesPerWeek,
      safetyStock,
      weeklyForecast
    };
  });
});

const filteredData = computed(() => {
  return forecastData.value.filter(item => {
    const matchesSearch = item.sku.toLowerCase().includes(search.value.toLowerCase());
    const matchesSupplier = !selectedSupplier.value || item.supplier === selectedSupplier.value;
    return matchesSearch && matchesSupplier;
  });
});

const calculateWeeklySales = () => {
  const salesBySku = {};
  const weeks = 4;
  
  store.sales.forEach(sale => {
    sale.items.forEach(item => {
      if (!salesBySku[item.sku]) {
        salesBySku[item.sku] = 0;
      }
      salesBySku[item.sku] += item.quantity;
    });
  });
  
  Object.keys(salesBySku).forEach(sku => {
    salesBySku[sku] = salesBySku[sku] / weeks;
  });
  
  return salesBySku;
};

const getForecastClass = (forecast, safetyStock) => {
  if (forecast < 0) {
    return 'text-red-600 font-medium';
  }
  if (forecast < safetyStock) {
    return 'text-yellow-600';
  }
  return 'text-gray-500';
};
</script>
```