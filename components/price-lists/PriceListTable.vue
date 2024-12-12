```vue
<template>
  <div class="bg-white shadow rounded-lg overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
            SKU
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
            Product Name
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
            Base Price
          </th>
          <th v-for="country in COUNTRIES" :key="country" 
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
            {{ country }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="variant in allVariants" :key="variant.sku" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
            {{ variant.sku }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ variant.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatCurrency(variant.purchasePrice) }}
          </td>
          <td v-for="country in COUNTRIES" :key="country" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <input
              type="number"
              step="0.01"
              :value="getPrice(variant.sku, country, variant.purchasePrice)"
              @input="handlePriceChange(variant.sku, country, $event)"
              class="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '~/stores/mainStore';
import { formatCurrency } from '~/utils/formatters';

const COUNTRIES = ['France', 'Germany', 'Italy', 'Spain', 'UK'];

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

const store = useMainStore();

const allVariants = computed(() => 
  props.products.flatMap(p => p.variants)
);

const getPrice = (sku, country, basePrice) => {
  if (store.prices[sku]?.[country] !== undefined) {
    return store.prices[sku][country];
  }
  // Default markup of 150% if no price is set
  return basePrice * 1.5;
};

const handlePriceChange = (sku, country, event) => {
  const price = parseFloat(event.target.value) || 0;
  store.updatePrice(sku, country, price);
};
</script>
```