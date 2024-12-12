```vue
<template>
  <form @submit.prevent="handleSubmit" class="bg-white shadow rounded-lg p-6">
    <div class="space-y-6">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            v-model="formData.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            v-model="formData.sku"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="formData.description"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          v-model="formData.category"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          v-model.number="formData.price"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div class="flex justify-end space-x-3">
        <Button variant="secondary" @click="$emit('cancel')">Cancel</Button>
        <Button type="submit">Save Product</Button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: '',
      sku: '',
      description: '',
      category: '',
      price: 0
    })
  }
});

const emit = defineEmits(['submit', 'cancel']);

const formData = ref({ ...props.initialData });

const handleSubmit = () => {
  emit('submit', { ...formData.value });
};
</script>
```