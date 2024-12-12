```vue
<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    class="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  >
    <option value="">All Suppliers</option>
    <option v-for="supplier in suppliers" :key="supplier" :value="supplier">
      {{ supplier }}
    </option>
  </select>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);

const suppliers = computed(() => {
  const uniqueSuppliers = new Set();
  props.products.forEach(product => {
    product.variants.forEach(variant => {
      uniqueSuppliers.add(variant.supplier);
    });
  });
  return Array.from(uniqueSuppliers).sort();
});
</script>
```