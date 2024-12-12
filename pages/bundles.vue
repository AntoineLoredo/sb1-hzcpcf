```vue
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-900">Bundles</h2>
      <div class="flex items-center space-x-4">
        <SearchInput
          v-model="search"
          placeholder="Search bundles..."
          class="w-96"
        />
        <Button :icon="Plus" @click="handleAddBundle">
          New Bundle
        </Button>
      </div>
    </div>

    <BundleForm
      v-if="showForm"
      :bundle="selectedBundle"
      @close="closeForm"
    />

    <BundleList
      v-else
      :bundles="filteredBundles"
      @edit="handleEdit"
    />
  </div>
</template>

<script setup>
import { Plus } from 'lucide-vue-next';
import { useBundles } from '~/composables/useBundles';

const {
  search,
  showForm,
  selectedBundle,
  filteredBundles,
  handleAddBundle,
  handleEdit,
  closeForm
} = useBundles();
</script>
```