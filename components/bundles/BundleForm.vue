```vue
<template>
  <form @submit.prevent="handleSubmit" class="bg-white shadow rounded-lg p-6">
    <div class="space-y-6">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Bundle SKU</label>
          <input
            type="text"
            v-model="formData.sku"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Bundle Name</label>
          <input
            type="text"
            v-model="formData.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <select
          v-model="formData.status"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="discontinued">Discontinued</option>
        </select>
      </div>

      <div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Components</h3>
          <Button type="button" :icon="Plus" @click="addComponent">Add Component</Button>
        </div>

        <div class="space-y-4">
          <div v-for="(component, index) in formData.components" :key="index" class="flex items-end gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700">Variant SKU</label>
              <select
                v-model="component.variantSku"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a variant</option>
                <option v-for="variant in allVariants" :key="variant.sku" :value="variant.sku">
                  {{ variant.name }} ({{ variant.sku }})
                </option>
              </select>
            </div>
            <div class="w-32">
              <label class="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                min="1"
                v-model="component.quantity"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <Button
              type="button"
              variant="danger"
              size="sm"
              :icon="Trash2"
              @click="removeComponent(index)"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <Button variant="secondary" @click="$emit('close')">Cancel</Button>
        <Button type="submit">{{ bundle ? 'Update Bundle' : 'Create Bundle' }}</Button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { Plus, Trash2 } from 'lucide-vue-next';
import { useBundleForm } from '~/composables/useBundleForm';

const props = defineProps({
  bundle: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);

const {
  formData,
  allVariants,
  addComponent,
  removeComponent,
  handleSubmit
} = useBundleForm(props.bundle, () => emit('close'));
</script>
```