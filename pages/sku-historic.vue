<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-900">SKU Historic</h2>
      <div class="flex items-center space-x-4">
        <SearchInput
          v-model="search"
          placeholder="Search SKUs..."
          class="w-96"
        />
        <SupplierFilter
          :products="products"
          v-model="selectedSupplier"
        />
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product variant name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Version 1 SKU
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Version 2 SKU
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Version 3 SKU
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(group, baseSku) in groupedVariants" :key="baseSku" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <template v-if="editingRow === baseSku">
                <input
                  type="text"
                  v-model="editedData.productName"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </template>
              <template v-else>
                {{ group.productName }}
              </template>
            </td>
            <td v-for="version in [1, 2, 3]" :key="version" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <template v-if="editingRow === baseSku">
                <input
                  type="text"
                  v-model="editedData.skus[version - 1]"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </template>
              <template v-else>
                {{ getVariantSkuByVersion(group.variants, version) || '-' }}
              </template>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <template v-if="editingRow === baseSku">
                <div class="flex justify-end space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    :icon="Check"
                    @click="handleSave"
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    :icon="X"
                    @click="handleCancel"
                  >
                    Cancel
                  </Button>
                </div>
              </template>
              <template v-else>
                <Button
                  variant="secondary"
                  size="sm"
                  :icon="Edit2"
                  @click="handleEdit(baseSku, group)"
                >
                  Edit
                </Button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Edit2, Check, X } from 'lucide-vue-next';
import { useMainStore } from '~/stores/mainStore';

const store = useMainStore();
const search = ref('');
const selectedSupplier = ref('');
const editingRow = ref(null);
const editedData = ref(null);

const products = computed(() => store.products);

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(search.value.toLowerCase()) ||
      product.variants.some(v => 
        v.sku.toLowerCase().includes(search.value.toLowerCase()) ||
        v.name.toLowerCase().includes(search.value.toLowerCase())
      );

    const matchesSupplier = !selectedSupplier.value || 
      product.variants.some(v => v.supplier === selectedSupplier.value);

    return matchesSearch && matchesSupplier;
  });
});

const groupedVariants = computed(() => {
  const groups = {};
  filteredProducts.value.forEach(product => {
    product.variants.forEach(variant => {
      const baseSku = variant.sku.split('-v')[0];
      if (!groups[baseSku]) {
        groups[baseSku] = {
          id: product.id,
          productName: product.name,
          variants: []
        };
      }
      groups[baseSku].variants.push(variant);
    });
  });
  return groups;
});

const getVariantSkuByVersion = (variants, version) => {
  const variant = variants.find(v => v.version === version);
  return variant?.sku;
};

const handleEdit = (baseSku, group) => {
  editingRow.value = baseSku;
  editedData.value = {
    ...group,
    skus: Array(3).fill('').map((_, i) => {
      const variant = group.variants.find(v => v.version === i + 1);
      return variant?.sku || '';
    })
  };
};

const handleSave = () => {
  if (!editedData.value) return;

  const product = products.value.find(p => p.id === editedData.value.id);
  if (product) {
    const updatedProduct = {
      ...product,
      name: editedData.value.productName,
      variants: editedData.value.skus
        .map((sku, i) => {
          if (!sku) return null;
          const existingVariant = product.variants.find(v => v.version === i + 1);
          return existingVariant ? { ...existingVariant, sku } : null;
        })
        .filter(Boolean)
    };
    store.updateProduct(updatedProduct);
  }

  editingRow.value = null;
  editedData.value = null;
};

const handleCancel = () => {
  editingRow.value = null;
  editedData.value = null;
};
</script>