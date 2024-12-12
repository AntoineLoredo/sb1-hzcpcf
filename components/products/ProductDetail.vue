```vue
<template>
  <div class="bg-white shadow rounded-lg">
    <div class="flex justify-between items-center p-6 border-b">
      <h2 class="text-2xl font-semibold text-gray-900">{{ product.name }}</h2>
      <div class="flex space-x-4">
        <Button variant="secondary" :icon="X" @click="$emit('close')">
          Close
        </Button>
      </div>
    </div>

    <div class="p-6">
      <!-- Product Header -->
      <div class="grid grid-cols-3 gap-8 mb-8">
        <div class="col-span-2 space-y-4">
          <div>
            <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
            <p class="text-sm text-gray-500">Category: {{ product.category }}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-1">Description</h4>
            <p class="text-sm text-gray-600">{{ product.description }}</p>
          </div>
        </div>
        <div>
          <img
            v-if="primaryVariant?.imageUrl"
            :src="primaryVariant.imageUrl"
            :alt="product.name"
            class="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>

      <!-- Variants Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th v-for="header in tableHeaders" :key="header" 
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="variant in product.variants" :key="variant.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ variant.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.sku }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.option1Type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.option1Value }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.option2Type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.option2Value }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.option3Type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.option3Value }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatWeight(variant.weight) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDimensions(variant.dimensions.length, variant.dimensions.width, variant.dimensions.height, variant.dimensions.unit) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.moq }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.leadTimeWeeks }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ variant.safetyStockWeeks }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatCurrency(variant.purchasePrice) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatCurrency(variant.logisticCost) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { X } from 'lucide-vue-next';
import { formatCurrency, formatWeight, formatDimensions } from '~/utils/formatters';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['close', 'update']);

const primaryVariant = computed(() => 
  props.product.variants.find(v => v.isPrimary)
);

const tableHeaders = [
  'Product variant name',
  'Variant code / SKU',
  'Option 1 Type',
  'Option 1 Value', 
  'Option 2 Type',
  'Option 2 Value',
  'Option 3 Type',
  'Option 3 Value',
  'Weight',
  'Dimensions',
  'MOQ',
  'Lead time (weeks)',
  'Safety Stock (weeks)',
  'Purchase Price',
  'Logistic Cost'
];
</script>
```