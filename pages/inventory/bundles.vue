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
import { ref, computed } from 'vue';
import { Plus } from 'lucide-vue-next';
import { useMainStore } from '~/stores/mainStore';

const store = useMainStore();
const search = ref('');
const showForm = ref(false);
const selectedBundle = ref(null);

const filteredBundles = computed(() => {
  return store.bundles.filter(bundle =>
    bundle.name.toLowerCase().includes(search.value.toLowerCase()) ||
    bundle.sku.toLowerCase().includes(search.value.toLowerCase())
  );
});

const handleAddBundle = () => {
  selectedBundle.value = null;
  showForm.value = true;
};

const handleEdit = (bundle) => {
  selectedBundle.value = bundle;
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  selectedBundle.value = null;
};
</script>
```