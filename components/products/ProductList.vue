<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Product
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            EAN
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Variants
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Primary SKU
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="h-10 w-10 flex-shrink-0">
                <img
                  class="h-10 w-10 rounded object-cover"
                  :src="getPrimaryVariant(product)?.imageUrl"
                  :alt="product.name"
                />
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ product.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatCurrency(getPrimaryVariant(product)?.purchasePrice) }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.category }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.ean }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.variants.length }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ getPrimaryVariant(product)?.sku || 'N/A' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div class="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                :icon="Eye"
                @click="$emit('view', product)"
              >
                View
              </Button>
              <Button
                variant="secondary"
                size="sm"
                :icon="Edit"
                @click="$emit('edit', product)"
              >
                Edit
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { Eye, Edit } from 'lucide-vue-next';
import { formatCurrency } from '~/utils/formatters';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'view']);

const getPrimaryVariant = (product) => {
  return product.variants.find(v => v.isPrimary);
};
</script>