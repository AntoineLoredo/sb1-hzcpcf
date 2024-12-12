```vue
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-900">Sales</h2>
      <SearchInput
        v-model="search"
        placeholder="Search orders..."
        class="w-96"
      />
    </div>

    <SalesTable :sales="filteredSales" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '~/stores/mainStore';

const store = useMainStore();
const search = ref('');

const filteredSales = computed(() => {
  return store.sales.filter(
    (sale) =>
      sale.orderNumber.toLowerCase().includes(search.value.toLowerCase()) ||
      sale.customer.toLowerCase().includes(search.value.toLowerCase()) ||
      sale.items.some(item => item.sku.toLowerCase().includes(search.value.toLowerCase()))
  );
});
</script>
```