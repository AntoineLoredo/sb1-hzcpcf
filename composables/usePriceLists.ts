import { ref, computed } from 'vue';
import { useMainStore } from '~/stores/mainStore';
import type { Product } from '~/types/product';

export function usePriceLists() {
  const store = useMainStore();
  const search = ref('');
  const selectedSupplier = ref('');

  const products = computed(() => store.products);
  const prices = computed(() => store.prices);

  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = 
        product.variants.some(v => 
          v.sku.toLowerCase().includes(search.value.toLowerCase()) ||
          v.name.toLowerCase().includes(search.value.toLowerCase())
        );

      const matchesSupplier = !selectedSupplier.value || 
        product.variants.some(v => v.supplier === selectedSupplier.value);

      return matchesSearch && matchesSupplier;
    });
  });

  const updatePrice = (sku: string, country: string, price: number) => {
    store.updatePrice(sku, country, price);
  };

  const updatePrices = (newPrices: Record<string, Record<string, number>>) => {
    store.updatePrices(newPrices);
  };

  return {
    search,
    selectedSupplier,
    products,
    prices,
    filteredProducts,
    updatePrice,
    updatePrices
  };
}