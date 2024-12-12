```js
import { ref, computed } from 'vue';
import { useBundleStore } from '~/stores/bundleStore';

export function useBundles() {
  const bundleStore = useBundleStore();
  const search = ref('');
  const showForm = ref(false);
  const selectedBundle = ref(null);

  const filteredBundles = computed(() => {
    const searchTerm = search.value.toLowerCase();
    return bundleStore.bundles.filter(bundle =>
      bundle.name.toLowerCase().includes(searchTerm) ||
      bundle.sku.toLowerCase().includes(searchTerm)
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

  return {
    search,
    showForm,
    selectedBundle,
    filteredBundles,
    handleAddBundle,
    handleEdit,
    closeForm
  };
}
```