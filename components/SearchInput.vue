```vue
<template>
  <div :class="`relative ${className}`">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search class="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="text"
      :placeholder="placeholder"
      class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next';

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  className: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>
```