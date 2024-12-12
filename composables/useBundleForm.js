```js
import { ref, computed } from 'vue';
import { useBundleStore } from '~/stores/bundleStore';
import { useMainStore } from '~/stores/mainStore';

export function useBundleForm(bundle, onClose) {
  const bundleStore = useBundleStore();
  const mainStore = useMainStore();

  const formData = ref({
    sku: bundle?.sku || '',
    name: bundle?.name || '',
    status: bundle?.status || 'active',
    components: bundle?.components || []
  });

  const allVariants = computed(() => 
    mainStore.products.flatMap(p => p.variants)
  );

  const addComponent = () => {
    formData.value.components.push({
      variantSku: '',
      quantity: 1
    });
  };

  const removeComponent = (index) => {
    formData.value.components.splice(index, 1);
  };

  const handleSubmit = () => {
    const bundleData = {
      ...formData.value,
      id: bundle?.id || crypto.randomUUID()
    };

    if (bundle) {
      bundleStore.updateBundle(bundleData);
    } else {
      bundleStore.addBundle(bundleData);
    }
    onClose();
  };

  return {
    formData,
    allVariants,
    addComponent,
    removeComponent,
    handleSubmit
  };
}
```