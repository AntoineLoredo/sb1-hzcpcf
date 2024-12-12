```vue
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
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
      <PriceListActions
        @import="handleImport"
        @export="handleExport"
        @download-template="handleDownloadTemplate"
      />
    </div>

    <PriceListTable :products="filteredProducts" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '~/stores/mainStore';
import {
  generatePriceListTemplate,
  exportPriceList,
  parsePriceListCSV,
  downloadCSV
} from '~/utils/priceListImportExport';

const store = useMainStore();
const search = ref('');
const selectedSupplier = ref('');

const products = computed(() => store.products);

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = 
      product.variants.some(v => 
        v.sku.toLowerCase().includes(search.value.toLowerCase()) ||
        v.name.toLowerCase().includes(search.value.toLowerCase())
      );

    const matchesSupplier = !selectedSupplier.value || 
      product.variants.some(v => v.supplier === selectedSupplier.value);

    return matchesSearch && matchesSupplier;
  });
});

const handleImport = async (file) => {
  try {
    const importedPrices = await parsePriceListCSV(file);
    store.updatePrices(importedPrices);
  } catch (error) {
    console.error('Error importing price list:', error);
  }
};

const handleExport = () => {
  const csv = exportPriceList(products.value, store.prices);
  downloadCSV(csv, 'price_list_export.csv');
};

const handleDownloadTemplate = () => {
  const template = generatePriceListTemplate();
  downloadCSV(template, 'price_list_template.csv');
};
</script>
```