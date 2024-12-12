import { ref, computed } from 'vue';
import { useBundleStore } from '~/stores/bundleStore';
import type { Bundle } from '~/types/bundle';

export function useBundles() {
  const store = useBundleStore();
  const search = ref('');
  const showForm = ref(false);
  const selectedBundle = ref<Bundle | null>(null);

  const bundles = computed(() => store.bundles);

  const filteredBundles = computed(() => {
    const searchTerm = search.value.toLowerCase();
    return store.bundles.filter(bundle =>
      bundle.name.toLowerCase().includes(searchTerm) ||
      bundle.sku.toLowerCase().includes(searchTerm)
    );
  });

  const addBundle = (bundle: Bundle) => {
    store.addBundle(bundle);
  };

  const updateBundle = (bundle: Bundle) => {
    store.updateBundle(bundle);
  };

  const deleteBundle = (bundleId: string) => {
    store.deleteBundle(bundleId);
  };

  return {
    search,
    showForm,
    selectedBundle,
    bundles,
    filteredBundles,
    addBundle,
    updateBundle,
    deleteBundle
  };
}